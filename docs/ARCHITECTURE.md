# Architecture: Embeddable AI Chatbot SaaS (Final)

## 1. Principles

1. **One source of truth:** Laravel owns business data (users, bots, plans). FastAPI owns AI/chat data.
2. **Keep the chat hot path short:** widget -> FastAPI -> stream. Laravel is not in this path.
3. **Slow work is async:** ingestion, emails, and billing sync never run inside a request.
4. **One database (MariaDB 11.8 LTS):** relational data and vectors live together, and every query filters by `bot_id`.
5. **Keep the API contract:** responses follow the existing mock route shapes so swapping `lib/api.js` is easy.
6. **Enforce plan limits server-side**, before the chat runs.
7. **Keep vector code in one file** (`retrieval.py`) so changing the database later only touches that file.

## 2. Components

| Component | Tech | Responsibility |
|---|---|---|
| Widget | Vanilla JS, Shadow DOM, esbuild -> `widget.js` | Chat UI, config fetch, SSE streaming |
| Web app | Next.js (plain JS) + Tailwind + shadcn/ui | Marketing site (SSR/SSG, SEO) + dashboard UI |
| Core API | Laravel | Auth, onboarding, tenants, bots CRUD, customization config, plans, billing webhooks, dashboard APIs, emails, queues, migrations |
| AI service | FastAPI | Ingestion, RAG, chat streaming, tool calling, usage counting |
| Database | MariaDB 11.8 LTS (or a newer LTS) | All data + vector search |
| Edge | Caddy (+ Cloudflare) | HTTPS, routing, CDN for `widget.js` |
| Email | Resend / Postmark | Lead notifications, auth emails |
| Payments | Lemon Squeezy / Paddle (verify) | Subscriptions |

**Domains:**

- `domain.com` -> Next.js marketing site
- `app.domain.com` -> Next.js dashboard
- `api.domain.com` -> Laravel
- `chat.domain.com` -> FastAPI (public chat/config/leads + internal endpoints)
- `cdn.domain.com/widget.js` -> static, versioned

Dashboard auth: Laravel Sanctum cookie (same root domain).

## 3. Data Model (MariaDB)

A single database. Laravel runs all migrations (raw SQL where vectors are involved).

**Business tables (Laravel):**

- `users`, `tenants`, `tenant_user`
- `plans` (conversations/month, bots, document size, badge removal)
- `subscriptions` (provider ids, status, period)
- `bots` (tenant_id, name, status, `allowed_domains` JSON, public_id)
- `bot_configs` (bot_id, `config` JSON: appearance, texts, starter questions, lead form fields, notification emails, `version`)
- `documents` (bot_id, type file/url, source, status, error, content_hash, bytes)
- `conversations`, `messages` (bot_id, role, content, tokens, created_at)
- `leads` (bot_id, conversation_id, fields JSON, status)
- `usage_counters` (bot_id, period, conversations, tokens), unique on `(bot_id, period)`

**Vector table:**

```sql
CREATE TABLE chunks (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  bot_id BIGINT UNSIGNED NOT NULL,
  document_id BIGINT UNSIGNED NOT NULL,
  content TEXT NOT NULL,
  token_count INT NOT NULL,
  content_hash CHAR(64) NOT NULL,
  embedding VECTOR(1536) NOT NULL,
  KEY idx_chunks_bot (bot_id),
  KEY idx_chunks_doc (document_id),
  VECTOR INDEX (embedding) DISTANCE=cosine
);
```

- The dimension depends on the embedding model (1536 is only an example). Confirm it once the model is chosen.
- A table can have only one vector index.
- At the start (10-30 bots, a few thousand chunks) the index is optional; exact search is fast enough. You can add it later.

**Search query (`retrieval.py`):**

```sql
SELECT id, content
FROM chunks
WHERE bot_id = ?
ORDER BY VEC_DISTANCE_COSINE(embedding, VEC_FromText(?))
LIMIT 4;
```

Rule: the index is only used when `ORDER BY` uses the distance function directly, the metric matches the one the index was built with (cosine), and a `LIMIT` is present. Verify once with `EXPLAIN`.

**Other indexes:** `messages(conversation_id, created_at)`, `conversations(bot_id, created_at)`, `leads(bot_id, created_at)`.

**Who writes conversations/messages?** FastAPI (hot path). Laravel only reads them.

## 4. Service-to-Service Communication

- Internal endpoints use a short-lived signed JWT (60s expiry, shared secret in env) or stay on a private Docker network.
- Internal endpoints are never exposed on a public Caddy route.
- Laravel -> FastAPI: `POST /internal/ingest` (document id), `POST /internal/cache/invalidate/{bot_id}`.
- FastAPI -> Laravel: rarely needed, since the database is shared. Document status is updated through a DB column.
- Use separate DB users for the two services, and give FastAPI access only to the tables it needs.

## 5. Flows

### 5.1 Signup / Onboarding

Next -> Laravel (`register`, Sanctum cookie) -> tenant + default bot + free plan -> onboarding step settings saved into `bot_configs`.

### 5.2 Widget Load (cacheable)

1. The site includes `<script src="cdn.../widget.js?v=HASH" data-bot-id>`.
2. The widget calls `GET chat.domain.com/api/widget/config/:botId` (ETag + `Cache-Control: max-age=60`).
3. Config merge order: script attributes > dashboard config > defaults.
4. FastAPI serves config from an in-memory cache (DB on a miss).

### 5.3 Document Ingestion (async)

1. Dashboard upload/URL -> Laravel stores the file + creates a `documents` row (`status=queued`).
2. Laravel -> `POST /internal/ingest`.
3. FastAPI background worker: extract text -> clean -> chunk -> dedupe by hash -> batch embed -> bulk insert -> `status=ready` (or `failed` + error).
4. The dashboard polls for status.
5. Re-index: only re-embed chunks whose content hash changed.

**Chunking defaults:** 500-800 tokens, 10-15% overlap, respect heading/paragraph boundaries. For URL ingestion, strip nav/footer, respect robots.txt, and limit crawling to the same domain.

### 5.4 Chat (hot path)

1. `POST chat.domain.com/api/chat/:botId` (SSE).
2. Checks (from memory cache): bot is active, origin is allowed, rate limit (IP + bot), plan conversation limit.
3. Embed the query. Skip retrieval for greetings/small talk.
4. Fetch the top 3-4 chunks (`WHERE bot_id` + cosine distance + `LIMIT`).
5. Prompt: system rules + bot persona + chunks + last 5-6 messages.
6. Stream the LLM response as SSE tokens. Tool calls (`capture_lead`, `request_appointment`) emit `lead_form` / `lead_saved` events.
7. **After** the stream ends (background): save messages, atomically increment the usage counter, save the lead, queue the owner email.

Usage counter:

```sql
INSERT INTO usage_counters (bot_id, period, conversations, tokens)
VALUES (?, ?, 1, ?)
ON DUPLICATE KEY UPDATE conversations = conversations + 1, tokens = tokens + VALUES(tokens);
```

### 5.5 Lead Capture

Tool call -> validate fields against the bot's config -> insert into `leads` -> email job -> dashboard entry.

### 5.6 Billing

Provider webhook -> Laravel (verify signature, idempotency key) -> update plan -> call FastAPI to invalidate cache. New limits apply from the next request.

## 6. Performance Playbook

| Area | What to do |
|---|---|
| First token | Target ~1-1.5s. Keep retrieval and prompt small, start streaming immediately |
| Config | In-process TTL cache (60s) + invalidate endpoint |
| DB | Async connection pool (SQLAlchemy), query timeouts, slow query log on |
| Retrieval | Top 3-4, `bot_id` filter, matching cosine metric, check with `EXPLAIN` |
| Embeddings | Cheap model, batch during ingestion, small LRU cache for query embeddings |
| LLM | Cheap model by default, trim history, prompt caching (stable system prompt), `max_tokens` cap, timeout + one retry + friendly fallback message |
| Repeated questions | Optional: normalized-question cache (bot_id + hash) for 10-30 min |
| Writes | Async, after the stream |
| Widget | gzip/brotli, versioned URL, `immutable` cache, CDN, small bundle |
| Laravel | Config/route cache, OPcache, separate queue workers |
| Next.js | Marketing via SSG/ISR, dashboard fetches data client-side |

## 7. Security

- Per-bot CORS using `allowed_domains` + `Origin` check.
- Rate limits: per IP + bot + conversation. Message size limit (max 1000 chars).
- The bot id is public, so abuse limits and a hard monthly cap are essential.
- Prompt injection: instruct the model to answer only from the provided context, treat retrieved text as untrusted, validate tool arguments server-side.
- Dental/healthcare: no medical advice, an emergency message ("call the office or 911"), do not collect health details, show a widget notice. Get legal review before launch.
- Widget: render text with `textContent`, strict hex validation, https avatars only.
- Secrets live only in env; LLM keys never reach the client. Validate upload type and size.
- GDPR basics: conversation delete/export, retention policy.

## 8. Deployment

A single VPS with Docker Compose:

```
caddy (443) -> next | laravel (php-fpm/octane) | fastapi (uvicorn, 2 workers)
mariadb (image: mariadb:11.8) | laravel-queue-worker | laravel-scheduler
```

- Only Laravel runs migrations (as a deploy step), including `chunks`.
- `/health` endpoint on every service, with a restart policy.
- Backups: daily `mariadb-dump` (or `mariabackup`) -> R2/S3, with a restore test once a month.
- Monitoring: Sentry (3 services), uptime check, LLM latency/token cost logging.
- CI: lint + test + build, then Docker deploy.
- Sizing (10-30 bots): data of ~100-300 MB, so a small VPS is enough.

## 9. Scaling Path

1. Upgrade the VPS.
2. Add Redis for rate limiting, cache, and queues.
3. Move FastAPI to a separate VPS and MariaDB to a managed/separate server.
4. Run the ingestion worker as a separate process.
5. At thousands of bots, tune vector search or move `retrieval.py` to pgvector or a dedicated vector DB.

## 10. Build Order

1. **Frontend redesign** (dashboard, marketing site, widget polish) on the mock API.
2. **MariaDB schema + Laravel:** auth, tenants, bots CRUD, config, plans (matching the mock contract's exact shapes).
3. **FastAPI:** config/leads/chat (no RAG at first), SSE, usage limits.
4. **Ingestion + RAG:** upload/URL -> chunks -> retrieval.
5. **Tools:** capture_lead/appointment + emails.
6. **Billing:** provider + webhooks + plan enforcement.
7. **Hardening:** rate limits, monitoring, backups, legal pages.
8. **Later:** WordPress plugin, WhatsApp, hosted chat page, calendar sync.

## 11. Verify Before Building

- LLM provider/model, prices, tool-calling quality.
- Embedding model and its dimension.
- Payment provider (availability from Pakistan).
- Vector parameter passing (`VEC_FromText`) from FastAPI's MariaDB driver: confirm with a small test.
- Legal text (Privacy/Terms/HIPAA scope).