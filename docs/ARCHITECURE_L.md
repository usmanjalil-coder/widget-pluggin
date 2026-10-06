# Project handoff: Embeddable AI chatbot SaaS (admin dashboard + widget)

## How to reply
- I'm a full-stack dev (Laravel/PHP, React/Next.js, Python FastAPI, AWS, Docker, LangChain/RAG), based in Pakistan.
- Reply in Roman Urdu mixed with English, concise. Give ready-to-paste code/prompts. Plain JavaScript (.js/.jsx), NOT TypeScript.
- I build with OpenAI Codex using AGENTS.md (the Next.js block between BEGIN/END markers is auto-generated, never edit it).
- When I ask for a "document", give it inside a fenced markdown code block (plain-text copy loses formatting).

## Product
- Embeddable AI chatbot for any business (script tag now, WordPress plugin later), fully configured from a dashboard with live preview.
- First outreach niche: US dental practices (12 verified owner leads). Parallel idea: website + chatbot bundle.
- Goal: ~$250/month first (5-6 customers at $39-79/month). Expected initial scale: 10-30 bots.
- Pricing draft: Free ($0, 50 convs, 1 bot, badge) / Starter ($29, 500 convs) / Pro ($79, 2000 convs, 3 bots, no badge).
- Brand name still undecided (placeholder in lib/brand.js). Payments: Stripe not available for Pakistan (verify) -> Lemon Squeezy/Paddle.

## Final stack (decided: Laravel-only backend, NO FastAPI for now)
- Widget: vanilla JS + Shadow DOM, esbuild -> widget.js (already built).
- Frontend: Next.js (plain JS) + Tailwind + shadcn/ui + lucide + Recharts + sonner, Inter font. Marketing = SSR/SSG for SEO, dashboard = client-side.
- Backend: Laravel does everything: auth (Sanctum cookie), onboarding, tenants, bots CRUD, bot config, plans/billing webhooks, dashboard APIs, emails, queues, migrations, AND the AI side (embeddings, RAG retrieval, LLM calls, SSE chat streaming, tool calling, usage counting, ingestion jobs).
- Database: ONE MariaDB 11.8 LTS (built-in VECTOR type, VECTOR INDEX, VEC_DISTANCE_COSINE). Plain MySQL Community has no usable vector search, so not used.
- Infra: one VPS, Docker Compose (caddy, next, laravel php-fpm/octane, mariadb, queue worker, scheduler), Cloudflare/CDN for widget.js, Sentry, daily mariadb-dump to R2/S3.
- Domains: domain.com (marketing), app. (dashboard), api. (Laravel: API + public chat/config/leads), cdn./widget.js.
- Later, only if needed: a small Python service just for ingestion (OCR/scanned PDFs, complex files) or advanced RAG.

## Laravel AI code structure (keep swappable)
- app/Services/Ai/: Retriever (ALL vector SQL in this one class), Embedder, Chunker, LlmClient (provider-agnostic), ChatService (orchestrates). Chat controller only calls ChatService.
- LLM/embedding calls via provider HTTP API (Laravel Http client) or an AI package (Prism / Laravel AI SDK, verify). PDF text via poppler `pdftotext` (Spatie wrapper); scanned PDFs are a weak spot.
- Chat streaming: response()->stream() (SSE). Give the chat route its own PHP-FPM pool / enough pm.max_children (or Octane/FrankenPHP later) so streaming doesn't slow the dashboard.
- Bot config cached with Laravel Cache (60s TTL), Cache::forget on bot/plan update. No service-to-service JWT needed.

## Architecture rules
1. Every query filters by bot_id. Plan limits enforced server-side before chat.
2. Slow work async via queue jobs (ingestion, emails, billing sync). Messages/usage/leads saved AFTER the stream ends.
3. Keep the existing mock API contract (response shapes) so lib/api.js swap is easy.
4. Vector code only in the Retriever class so the DB/engine can be swapped later.
5. Public endpoints: CORS per bot allowed_domains + Origin check, rate limit per IP + bot + conversation, message size limit, hard monthly cap.

## Tenancy
- Separate `tenants` table (do NOT use tenant_id = user_id). Signup auto-creates user -> tenant -> tenant_user(owner) -> default bot + free plan. UI never shows the word "tenant".
- Schema: users, tenants, tenant_user, plans, subscriptions, bots (tenant_id, allowed_domains JSON, public_id), bot_configs (JSON config + version), documents, conversations, messages, leads, usage_counters (unique bot_id+period), chunks.

## chunks table (MariaDB)
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
-- search: WHERE bot_id=? ORDER BY VEC_DISTANCE_COSINE(embedding, VEC_FromText(?)) LIMIT 4
```
Index is used only if ORDER BY uses the distance function directly with the same metric + LIMIT. Dimension depends on the embedding model (confirm). Index optional at small scale. Vector column needs raw SQL in Laravel migrations.

## Key flows
- Widget load: GET api./widget/config/:botId (ETag, max-age 60); merge script attrs > dashboard config > defaults.
- Ingestion: upload/URL -> documents row (queued) -> queue job: extract, chunk (500-800 tokens, 10-15% overlap), hash dedupe, batch embed, insert -> status ready/failed; dashboard polls status.
- Chat: checks (bot active, origin, rate limit, plan limit) -> embed query (skip for greetings) -> top 3-4 chunks -> prompt (rules + chunks + last 5-6 msgs) -> LLM stream -> tools capture_lead/request_appointment -> async save + usage increment (INSERT ... ON DUPLICATE KEY UPDATE) + owner email job.
- Billing: provider webhook -> signature + idempotency -> plan update -> Cache::forget.
- Safety (dental): no medical advice, emergency message ("call the office or 911"), don't collect health details, widget notice, legal review before real clinics.

## Frontend redesign status (Codex, all on MOCK backend)
Design system: neutral zinc + indigo accent (#4f46e5), CSS variable tokens in globals.css, 14px body, 4px grid, radius 8/12/16, subtle shadows, light + dark, every page needs skeleton/empty/error states. AGENTS.md has a "Design system rules" block.
- DONE: Prompt 1 foundation (shadcn, tokens, sidebar shell, shared components PageHeader/StatCard/EmptyState/StatusBadge, dark mode).
- GIVEN TO CODEX, status unknown (verify): Bots list redesign (new BotCard, create-bot dialog, sidebar icons, bot switcher); Appearance tab fixes (chat open by default in preview, update() instead of remount, sticky preview, selected-color indicator, working border radius, char limits via lib/limits.js + CharLimitInput, shadcn Select for fonts, unified BotSwitcher, unsaved-changes save bar).
- NOT STARTED: Overview page redesign (Getting started checklist, 4 stat cards, conversations chart, recent conversations + latest leads), then Conversations, Leads, Usage & Billing, Account, marketing home/pricing, onboarding, widget polish (separate pass, Shadow DOM).
- Housekeeping: delete .screenshots/ and Codex's ui-audit/ui-visual-review notes (keep Playwright browser cache); tell Codex "do not create report/notes markdown files in repo root" and "delete .screenshots/ after verifying".

## Build order
1. Finish frontend redesign on mock API.
2. Laravel + MariaDB: schema, auth, tenants, bots CRUD, config, plans (exact mock contract shapes).
3. Laravel chat: config/leads/chat endpoints (no RAG first), SSE, usage limits.
4. Ingestion + RAG (queue jobs, Chunker/Embedder/Retriever).
5. Tools + emails.
6. Billing.
7. Hardening (rate limits, monitoring, backups, legal pages).
8. Later: WordPress plugin, WhatsApp, hosted chat page, calendar sync, optional Python ingestion service.

## Open items to verify
LLM provider/model + prices (Grok vs others), embedding model + dimension, payment provider availability, MariaDB vector query from Laravel (VEC_FromText param passing), AI package choice (Prism / Laravel AI SDK / plain Http), legal text (Privacy/Terms/HIPAA).

## What I want next
Continue step by step: first check the status of the Bots list + Appearance work (I'll share screenshots), then Overview page prompt, then the remaining pages; after the frontend, the first Laravel Codex prompt (MariaDB schema + auth + bots CRUD).