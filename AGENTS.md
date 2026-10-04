<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Project: Embeddable AI chatbot widget + admin dashboard (SaaS)

Do not edit anything between the BEGIN/END markers above. Everything below is project context.

## Product
An AI chatbot that other businesses embed on their website (script tag now, WordPress plugin later),
fully configured from a dashboard. Product stays GENERAL (any industry); first outreach niche is
US dental practices. Owner uploads docs/FAQ or a URL, bot answers via RAG, captures leads and
appointment requests, and emails the owner.

## Working rules
- Plain JavaScript only: `.js` / `.jsx`. No TypeScript. Use `jsconfig.json` for path aliases.
- Reply in concise Roman Urdu + English; give ready-to-paste code blocks, not step-by-step prose.
- Check `node_modules/next/dist/docs/` before using any Next.js API (App Router conventions may differ).
- Build order: FRONTEND FIRST (against a mock API), then BACKEND. Keep the API contract below stable.

## Architecture
- Dashboard: Next.js (this repo), App Router, plain JS.
- Widget: standalone plain-JS bundle (`widget.js`), NOT part of the Next.js page bundle.
  Renders inside Shadow DOM (or iframe) so host-site CSS cannot break it.
- Backend (later, separate service): FastAPI + RAG (LangChain/LlamaIndex), Postgres + pgvector.
- Multi-tenant: every record has `bot_id` / `tenant_id`.

---

# PART 1 — FRONTEND (build first)

## 1A. Widget (`widget.js`)
- Install snippet:
  `<script src="https://app.example.com/widget.js" data-bot-id="abc123"></script>`
- On load: read `data-bot-id`, fetch public config `GET /api/widget/config/:botId`, apply theme,
  then mount launcher bubble + chat window. Cache config briefly (about 60s or ETag).
- UI: launcher button, chat window, message list with streaming text, input, typing indicator,
  quick-reply chips (starter questions), lead/appointment form inside the chat, offline message,
  "Powered by" badge (hidden on paid plans via config flag).
- Theming through CSS variables inside the shadow root, e.g. `--cb-primary`, `--cb-on-primary`,
  `--cb-bg`, `--cb-radius`. Pick `on-primary` text color automatically from luminance
  (contrast check) so a light primary color never produces unreadable text.
- Mobile responsive; position left/right; z-index high; no global CSS leakage; small bundle.

## 1B. Customization (user-facing)
Primary method: DASHBOARD with LIVE PREVIEW. Optional: code-level override on the script tag.

Customizable fields (stored per bot as `theme` + `texts`):
- `primaryColor` (hex), `mode` (light | dark), `fontFamily` (small safe list), `borderRadius`
- `botName`, `avatarUrl`, `launcherLabel`, `position` (left | right)
- `greetingMessage` (first bot message, fully custom), `inputPlaceholder`,
  `starterQuestions[]` (quick-reply chips), `offlineMessage`

Dashboard "Appearance" page:
- Left: form controls (color picker + hex input, toggles, text fields).
- Right: LIVE PREVIEW = the SAME widget component/bundle mounted with the unsaved draft config
  (local state), on a fake website background (toggle desktop/mobile).
- "Save" publishes config to the API; "Reset" restores defaults. Show unsaved-changes indicator.

Code-level override (advanced, optional): data attributes on the script tag, e.g.
`data-primary-color="#0a7cff"`, `data-greeting="Hi! Ask us anything"`, `data-position="left"`.
Precedence: script attributes > dashboard config > defaults. Document this in the Install page.

Security: validate colors with a strict hex regex; render greeting/bot name as TEXT only
(never innerHTML); restrict avatar URLs to https; never trust config values in CSS strings.

## 1C. Dashboard pages
Auth (login/signup) · Bots list/create · Appearance (live preview) · Knowledge base
(upload docs / URL / re-index status) · Conversations log · Leads/Appointments (status:
new/confirmed/done) · Settings (notification emails, booking form fields, working hours,
rules) · Install (snippet + WordPress plugin instructions) · Usage and Billing (plan limits).
Super-admin later: tenants, usage, plans, abuse control.

## 1D. Frontend-first workflow
Use mock route handlers or a JSON mock for the API below so the dashboard and widget are fully
usable before the backend exists. Swap the base URL via env var when the backend is ready.

---

# PART 2 — BACKEND (after frontend)

## 2A. API contract (frontend and backend must agree on this)
Public (widget, no login, rate limited, CORS restricted per bot's allowed domains):
- `GET  /api/widget/config/:botId` -> `{ theme, texts, features, branding: { showBadge } }`
- `POST /api/chat/:botId` -> streams the answer (SSE). Body: `{ conversationId?, message }`
- `POST /api/leads/:botId` -> `{ conversationId, fields: {...} }`

Authenticated (dashboard):
- `GET/PUT /api/bots/:id` (theme, texts, settings), `POST /api/bots`
- `POST /api/bots/:id/documents` (upload / URL), `GET /api/bots/:id/documents`, `DELETE ...`
- `GET /api/bots/:id/conversations`, `GET /api/bots/:id/leads`, `PATCH /api/leads/:id` (status)
- `GET /api/usage`, billing webhooks

Example config JSON:
```json
{
  "theme": { "primaryColor": "#0a7cff", "mode": "light", "position": "right", "borderRadius": 16 },
  "texts": { "botName": "Assistant", "greetingMessage": "Hi! How can I help?",
             "inputPlaceholder": "Type your question...", "starterQuestions": [] },
  "features": { "leadCapture": true },
  "branding": { "showBadge": true }
}
```

## 2B. RAG and chat
- Ingest: extract text, chunk, embed, store in pgvector under `bot_id`.
- Query: retrieve top 3-4 chunks for that bot, build prompt (system rules + chunks + last 5-6
  messages), call LLM (Grok or alternative; verify current pricing), stream the reply.
- Tool calling: `capture_lead` / `request_appointment` using the bot's configured form fields;
  email owner (Resend/Postmark) and save to DB.
- Safety: no medical advice; emergency message; do not collect health details; refuse
  out-of-knowledge questions politely instead of guessing.

## 2C. Data, limits, billing
- Tables (idea): tenants, users, bots (theme/texts JSON), bot_settings (notify_emails,
  booking_fields, working_hours), documents, chunks, conversations, messages, leads, plans, usage.
- Plan limits per month (conversations, bots, doc size); hard-stop and upgrade prompt.
- Plans: Free (~50 msgs, "Powered by" badge) · Starter (~$19-29) · Pro (~$49-79, no badge).
- Payments: Stripe is not available for Pakistan-based businesses (verify); use Lemon Squeezy/Paddle
  or PayPal/Wise/Payoneer.

## 2D. Later
WordPress plugin (thin PHP wrapper that injects the script + bot-id setting), WhatsApp channel,
hosted chat page `/chat/:botId`, Google Calendar sync.

## Open decisions
Product name (invented, unique; check domain/Google/trademark) · LLM + embedding model ·
single-tenant demo first vs multi-tenant from day one.

## Frontend conventions
- Dashboard client requests go through `src/lib/api.js`; set `NEXT_PUBLIC_API_BASE` when replacing mock handlers with FastAPI.
- Temporary handler data lives in ignored `.mock-data/db.json`; `npm run mock:reset` recreates seed data on next request.
- Appearance preview loads the standalone `public/widget.js` and mounts it with `ChatbotWidget.init({ config, container })`.
