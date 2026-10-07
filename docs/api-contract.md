# Current mock API contract

This is the contract implemented by the current Next.js mock routes and used by `src/lib/api.js`, onboarding, and the standalone widget. Laravel should preserve these paths and JSON field names while the dashboard is migrated. All request bodies are JSON unless noted. Dates are ISO-8601 strings. Route placeholders use Laravel syntax such as `{id}`.

## Conventions

- Base URL: `NEXT_PUBLIC_API_BASE` + the path below; an empty base means the current origin.
- Auth is mock-cookie based today. The dashboard helper throws `Error(responseText)` for any non-2xx response.
- Current collection routes return arrays, **not** `{ data, meta }`. There is no server pagination yet.
- Common error body: `{ "error": "Human-readable message." }`.
- IDs are strings. Current lead status enum: `new | confirmed | done`. Bot status currently seeded as `active`. Document type enum: `file | url | text`; status is `ready | processing | failed` (the mock creates `processing` and automatically changes it to `ready` after about 2.5 seconds).

## Auth

### `POST /api/auth/login`

No body is read by the mock. It sets the `mock_session` HTTP-only cookie.

```json
{ "ok": true }
```

### `POST /api/auth/signup`

Aliases the login route; body is currently ignored.

```json
{ "ok": true }
```

### `POST /api/auth/logout`

No body. Clears `mock_session` and returns **204 No Content**.

## Bots

### `GET /api/bots`

Returns an array of full bot records.

```json
[
  {
    "id": "demo",
    "name": "Demo Dental Assistant",
    "status": "active",
    "theme": { "primaryColor": "#2563eb", "mode": "light", "position": "right", "borderRadius": 16, "fontFamily": "system" },
    "texts": { "botName": "Demo Dental Assistant", "avatarUrl": "", "greetingMessage": "Hi! How can I help with your visit today?", "inputPlaceholder": "Ask a question…", "launcherLabel": "Chat with us", "starterQuestions": ["Book an appointment", "What services do you offer?"], "offlineMessage": "We are offline right now." },
    "features": { "leadCapture": true },
    "branding": { "showBadge": true },
    "settings": { "notificationEmails": ["hello@demodental.example"], "whatsappNumber": "", "sendConfirmationEmail": true, "allowedDomains": ["example.com"], "assistantRules": "Never provide medical advice. Always redirect to the dental office for clinical questions.", "workingHours": { "monday": { "open": "09:00", "close": "17:00", "closed": false }, "sunday": { "open": "00:00", "close": "00:00", "closed": true } }, "bookingFields": [{ "id": "name", "label": "Full name", "type": "text", "required": true }, { "id": "phone", "label": "Phone", "type": "phone", "required": true }, { "id": "preferred_time", "label": "Preferred time", "type": "date", "required": false }] }
  }
]
```

### `POST /api/bots`

The mock accepts a partial create payload and copies missing nested fields from the first seeded bot.

```json
{ "name": "Salon", "primaryColor": "#f59e0b", "greetingMessage": "Hi! I can help with services, booking, and prices.", "launcherLabel": "Chat with us", "showBadge": true, "allowedDomains": ["example.com"] }
```

Returns **201** and a full Bot record. Validation errors return **400**, for example:

```json
{ "error": "name must be text of at most 40 characters." }
```

### `GET /api/bots/{id}`

Returns the full Bot record above. Missing bots return **404**:

```json
{ "error": "Not found" }
```

### `PUT /api/bots/{id}`

Accepts a partial full Bot patch. The mock shallow-merges `theme`, `texts`, `features`, `branding`, and `settings`; it does not replace omitted nested keys.

```json
{ "name": "Demo Dental Assistant", "theme": { "primaryColor": "#4f46e5", "borderRadius": 20 }, "texts": { "greetingMessage": "Welcome — how can we help?" }, "settings": { "notificationEmails": ["team@example.com"] } }
```

Returns the updated full Bot record. Errors are **400** validation or **404** `{ "error": "Not found" }`.

### `DELETE /api/bots/{id}`

Returns **204 No Content**. The mock also deletes that bot's leads, conversations, and documents. Missing bot: **404** common error.

## Bot config and validation

Widget/dashboard config is the nested `theme`, `texts`, `features`, and `branding` portion of a Bot. Validated values:

| Key | Type / allowed value | Limit |
| --- | --- | --- |
| `theme.primaryColor` | `#RGB` or `#RRGGBB` | strict hex |
| `theme.mode` | `light`, `dark`, or widget `auto` | enum |
| `theme.position` | `left` or `right` | enum |
| `theme.borderRadius` | number | 0–28 in widget sanitizer |
| `theme.fontFamily` | supported safe font key/value | widget safe list |
| `texts.botName` (or create `name`) | string | 40 chars |
| `texts.launcherLabel` | string | 24 chars |
| `texts.greetingMessage` | string | 200 chars |
| `texts.inputPlaceholder` | string | 60 chars |
| `texts.offlineMessage` | string | 200 chars |
| `texts.starterQuestions` | string array | maximum 4; each maximum 60 chars |
| `texts.avatarUrl` | HTTPS URL string | 2048 chars |

Invalid text/config returns **400** `{ "error": "…" }`, such as `{ "error": "primaryColor must be a valid #RGB or #RRGGBB hex color." }`.

## Knowledge / documents

### `GET /api/bots/{id}/documents`

Returns `Document[]`; polling this endpoint changes a processing document to `ready` after about 2.5 seconds.

```json
[{ "id": "doc-1", "botId": "demo", "name": "Welcome FAQ.pdf", "type": "file", "status": "ready", "size": "12 KB", "updatedAt": "2026-10-06T10:01:03.562Z", "source": "Upload" }]
```

`error` is optional and is cleared by retry/re-sync. Laravel should include it as `string | null` when available.

### `POST /api/bots/{id}/documents`

Current mock accepts JSON, not multipart upload:

```json
{ "name": "About the clinic", "type": "url", "status": "processing", "size": "0 KB", "source": "Website" }
```

Returns **201** Document. Defaults: name `New knowledge item`, type `file`, status `processing`, size `0 KB`, source `Upload`.

### `PATCH /api/bots/{id}/documents`

```json
{ "documentId": "doc-1", "action": "retry" }
```

`action` can be `retry` or `resync`; returns the Document with `status: "processing"`. Missing source returns **404** `{ "error": "Source not found." }`.

### `DELETE /api/bots/{id}/documents?documentId={documentId}`

Returns **204 No Content**. Missing source returns the same **404** error.

## Conversations and unanswered

### `GET /api/bots/{id}/conversations`

Returns an unpaginated `Conversation[]`.

```json
[{ "id": "conv-1", "botId": "demo", "visitor": "Visitor 1", "preview": "Can I book a cleaning for next Tuesday?", "createdAt": "2026-10-06T10:01:03.562Z", "unanswered": false, "transcript": [{ "role": "user", "text": "Can I book a cleaning for next Tuesday?", "time": "09:14 AM" }, { "role": "assistant", "text": "I can help with that. Please leave your contact details and the clinic will follow up.", "time": "09:15 AM" }] }]
```

`role` is `user | assistant`; `unanswered` is the current unanswered-question signal. There is **no separate unanswered endpoint**; the dashboard filters this collection with `unanswered === true`.

## Leads

### `GET /api/leads?botId={botId}`

`botId` is optional. Returns an unpaginated `Lead[]`.

```json
[{ "id": "lead-1", "botId": "demo", "conversationId": "conv-1", "name": "Maya Reed", "phone": "(555) 010-1200", "email": "maya.reed@example.com", "intent": "Cleaning", "status": "new", "source": "Website widget", "createdAt": "2026-10-06T10:01:03.562Z", "fields": { "preferred_time": "Next Tuesday", "concern": "Cleaning" } }]
```

`conversationId`, `email`, `intent`, `source`, and `fields` may be absent/null for widget-submitted leads in the current mock.

### `GET /api/leads/{botId}`

Legacy per-bot collection route used by the widget family. Returns the same Lead array.

### `POST /api/leads/{botId}`

Used by the widget inline lead form.

```json
{ "conversationId": "mock-abc", "fields": { "name": "Maya Reed", "phone": "(555) 010-1200", "preferred_time": "Next Tuesday" } }
```

Returns:

```json
{ "ok": true, "lead": { "id": "lead-1760000000000", "botId": "demo", "name": "Maya Reed", "phone": "(555) 010-1200", "status": "new", "createdAt": "2026-10-06T10:01:03.562Z", "preferred_time": "Next Tuesday" } }
```

The current mock spreads `fields` at top level; it does not preserve `conversationId` or a nested `fields` object for newly submitted leads.

### `PATCH /api/leads/{leadId}`

This route name is overloaded by the mock: `{botId}` is actually interpreted as `leadId` for PATCH.

```json
{ "status": "confirmed" }
```

Returns the updated Lead. Invalid status returns **400**:

```json
{ "error": "Status must be new, confirmed, or done." }
```

Missing lead returns **404** `{ "error": "Lead not found." }`.

## Overview

There is **no `GET /api/overview` endpoint**. Overview derives its cards from `GET /api/bots`, `GET /api/usage`, `GET /api/leads?botId=…`, and `GET /api/bots/{id}/conversations`.

## Usage

### `GET /api/usage`

```json
{ "conversations": 32, "messages": 184, "leads": 12, "limit": 50, "plan": "free", "botCount": 3, "currentPlan": "free" }
```

The UI unit is conversations. `messages` remains in the mock payload for compatibility.

## Plans and billing

There is no plans, checkout, invoice, payment method, or billing mutation route in the mock. The dashboard plan cards are local UI data; the current tenant plan is the `plan` / `currentPlan` value from `GET /api/usage` (`free` in seed data). No pagination shape exists for invoices because invoices are not mocked.

## Account and settings

### `GET /api/account`

```json
{ "name": "Alex Morgan", "email": "alex@example.com", "notifications": { "newLead": false, "usageWarning": false, "weeklySummary": false } }
```

### `PATCH /api/account`

```json
{ "name": "Alex Morgan", "notifications": { "newLead": true, "usageWarning": true, "weeklySummary": false } }
```

Returns the full account record. Invalid/blank names or names longer than 80 return **400** `{ "error": "Enter a name up to 80 characters." }`.

### `POST /api/account/password`

```json
{ "currentPassword": "old-password", "newPassword": "new-password" }
```

Success: `{ "ok": true }`. Errors: **400** `{ "error": "Enter your current password." }` or `{ "error": "Use at least 8 characters for your new password." }`. The mock does not check confirmation or persist a password.

### `DELETE /api/account`

Returns **204 No Content** and sets the mock user’s `deleted` flag.

## Onboarding

### `GET /api/onboarding`

```json
{ "skipped": false, "step": 4, "checklist": { "botCreated": false, "knowledgeAdded": false, "lookCustomized": false, "snippetInstalled": false, "firstTestDone": false }, "botCreated": true, "botId": "salon-muwif5fz", "businessName": "Salon", "websiteUrl": "https://palsome.com", "industry": "salon", "knowledgeAdded": false, "lookCustomized": true, "primaryColor": "#f59e0b", "greeting": "Hi! I can help with services, booking, and prices.", "snippetInstalled": true }
```

### `PATCH /api/onboarding`

Accepts any partial onboarding object. Top-level fields are merged; `checklist` is also merged rather than replaced. Returns the resulting onboarding object.

```json
{ "step": 3, "checklist": { "knowledgeAdded": true }, "botId": "demo" }
```

## Widget public API

### `GET /api/widget/config/{botId}`

CORS permits `GET, OPTIONS`, and the mock sends `Cache-Control: public, max-age=60`.

```json
{ "theme": { "primaryColor": "#2563eb", "mode": "light", "position": "right", "borderRadius": 16, "fontFamily": "system" }, "texts": { "botName": "Demo Dental Assistant", "avatarUrl": "", "greetingMessage": "Hi! How can I help with your visit today?", "inputPlaceholder": "Ask a question…", "launcherLabel": "Chat with us", "starterQuestions": ["Book an appointment", "What services do you offer?"], "offlineMessage": "We are offline right now." }, "features": { "leadCapture": true }, "branding": { "showBadge": true } }
```

Unknown bot: **404** `{ "error": "Not found" }`.

### `POST /api/chat/{botId}`

Request:

```json
{ "conversationId": "mock-abc", "message": "Can I book an appointment?" }
```

Response is `text/event-stream`, not JSON. Current events are:

```text
event: conversation
data: {"conversationId":"mock-abc"}

event: token
data: {"token":"I "}

event: token
data: {"token":"can "}

event: lead_form
data: {"fields":[{"name":"name","label":"Your name"},{"name":"phone","label":"Phone number"},{"name":"preferred_time","label":"Preferred time"}]}
```

`conversation` occurs first, `token` occurs zero or more times, and `lead_form` is emitted only when the message matches `/appointment/i`. `appointment_form` is **not emitted by the current mock**, but Laravel may add it using the same payload shape: `{ "fields": [{ "name": "preferred_time", "label": "Preferred time" }] }`.

Widget lead submission uses `POST /api/leads/{botId}` above. The public config/chat routes also support **OPTIONS 204** for CORS.
