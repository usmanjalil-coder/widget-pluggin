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
- Frontend calls the Laravel backend directly. Do not add Next.js API route handlers or mock data.

## Architecture
- Dashboard: Next.js (this repo), App Router, plain JS.
- Widget: standalone plain-JS bundle (`widget.js`), NOT part of the Next.js page bundle.
  Renders inside Shadow DOM (or iframe) so host-site CSS cannot break it.
- Backend: Laravel service in `../AI_ASSISTANT`.
- Multi-tenant: every record has `bot_id` / `tenant_id`.

---

# PART 1 — FRONTEND (build first)

## 1A. Widget (`widget.js`)
- Install snippet:
  `<script src="https://app.example.com/widget.js" data-bot-id="abc123"></script>`
- On load: read `data-bot-id`, fetch public config `GET /api/v1/widget/config/:botId`, apply theme,
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

## 1D. API workflow
Use `NEXT_PUBLIC_API_BASE_URL` and the Laravel `/api/v1` routes. Keep unsupported backend
features in honest loading, empty, or error states until Laravel implements their endpoints.

---

# PART 2 — BACKEND

## 2A. API contract (frontend and backend must agree on this)
Public (widget, no login, rate limited, CORS restricted per bot's allowed domains):
- `GET  /api/v1/widget/config/:botId` -> `{ theme, texts, features, branding: { showBadge } }`
- `POST /api/v1/chat/:botId` -> streams the answer (SSE). Body: `{ conversationId?, message }`
- `POST /api/v1/leads/:botId` -> `{ conversationId, fields: {...} }`

Authenticated (dashboard):
- Current Laravel routes include `/api/v1/auth/*`, `/api/v1/account`, and read-only `/api/v1/bots`.
- Bot mutations, documents, conversations, leads, public widget routes, and billing mutations
  require backend implementation before those features can work.

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
- Payment integration is undecided.

## 2D. Later
WordPress plugin (thin PHP wrapper that injects the script + bot-id setting), WhatsApp channel,
hosted chat page `/chat/:botId`, Google Calendar sync.

## Open decisions
Product name (invented, unique; check domain/Google/trademark) · LLM + embedding model ·
single-tenant demo first vs multi-tenant from day one.

## Frontend conventions
- Dashboard client requests go through `src/lib/api.js` and endpoint files in `src/lib/api/`;
  set `NEXT_PUBLIC_API_BASE_URL` to the Laravel origin.
- Appearance preview loads the standalone `public/widget.js` and mounts it with `ChatbotWidget.init({ config, container })`.

## Design system
- Tailwind v4 + shadcn/ui, JavaScript only (`components.json`: `tsx: false`); compose primitives from `src/components/ui`. Existing barrel exports adapt legacy props. Do not hand-build buttons, fields or modal dialogs.
- Self-hosted Inter via next/font/local. Semantic CSS tokens in `src/app/globals.css`: background #FAFAFA, card #FFFFFF, foreground #18181B, muted #71717A, border #E4E4E7, primary #4F46E5/white, ring primary at 40%, success #059669, warning #D97706, destructive #DC2626. Use tokens, except validated user-selected widget colors.
- Titles 24px semibold, sections 16px, body 14px, helpers 13px muted; marketing hero 56–64px with tight tracking/1.05 line height, sections 36–40px.
- 4/8px spacing; card padding and gaps 24px; max width 1152px; marketing vertical sections 96px. Controls radius 10px, cards 12px, panels 16px. Cards border/shadow-sm; only overlays/widget use larger shadows.
- Soft semantic badges, tinted stat icons, muted uppercase 12px table headers, hover rows, useful empty states and skeletons. Use Sonner notifications. Transitions 150ms ease and visible focus rings; respect reduced motion.
- Widget stays standalone in Shadow DOM; safe text rendering, strict hex/HTTPS/avatar/font validation, auto-contrast and full-screen mobile below 480px.
- Build the standalone bundle with `npm run build:widget`.
- Verification: `npm run lint` and `npm run build`.

## UI conventions
- Keep dashboard content within `max-w-6xl`; use the shared shell, grouped sidebar navigation, mobile Sheet, and section cards for forms.
- Compose controls from `src/components/ui` and its shadcn primitives. Use semantic tokens for color, focus, status, and surfaces; reserve direct color values for validated user-selected widget previews.
- Give lists and forms clear loading, empty, error, disabled, and saving states where the current API supports them. Keep marketing route content server-rendered and isolate interactive controls as client components.
- Review at desktop and mobile widths after visual changes. Keep temporary captures in ignored `docs/screenshots/` and remove them after review.
