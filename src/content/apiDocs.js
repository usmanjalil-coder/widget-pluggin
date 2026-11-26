const configuredBase = (process.env.NEXT_PUBLIC_API_BASE_URL || "")
  .replace(/\/+$/, "")
  .replace(/\/api\/v1$/, "");

export const apiDocsBaseUrl = configuredBase || "https://api.tellvira.com";

export function buildCurlExample({
  baseUrl = apiDocsBaseUrl,
  botId = "01J...",
  includeConversationId = true,
} = {}) {
  const endpoint = `${baseUrl}/api/v1/public/chat`;
  const payload = includeConversationId
    ? `{\n    "bot_id": "${botId}",\n    "message": "Hello",\n    "conversation_id": null\n  }`
    : JSON.stringify({ bot_id: botId, message: "Hello" });

  return `curl -N -X POST "${endpoint}" \\
  -H "Authorization: Bearer <YOUR_API_KEY>" \\
  -H "Content-Type: application/json" \\
  -H "Accept: text/event-stream" \\
  -d '${payload}'`;
}

export function buildNodeExample({
  baseUrl = apiDocsBaseUrl,
  botId = "01J...",
} = {}) {
  const endpoint = `${baseUrl}/api/v1/public/chat`;

  return `// Run on the server only (browser EventSource does not support POST or custom headers).
const res = await fetch("${endpoint}", {
  method: "POST",
  headers: {
    Authorization: \`Bearer \${process.env.TELLVIRA_API_KEY}\`,
    "Content-Type": "application/json",
    Accept: "text/event-stream",
  },
  body: JSON.stringify({
    bot_id: "${botId}",
    message: "Hello",
  }),
});

if (!res.ok) {
  const err = await res.json().catch(() => ({}));
  throw new Error(err.message || \`HTTP \${res.status}\`);
}

const decoder = new TextDecoder();
let buffer = "";

for await (const chunk of res.body) {
  buffer += decoder.decode(chunk, { stream: true });
  const frames = buffer.split(/\\r?\\n\\r?\\n/);
  buffer = frames.pop() || "";

  for (const frame of frames) {
    let event = "";
    let rawData = "";
    for (const line of frame.split(/\\r?\\n/)) {
      if (line.startsWith("event:")) event = line.slice(6).trim();
      else if (line.startsWith("data:")) rawData += line.slice(5).trim();
    }
    if (!event || !rawData) continue;

    const data = JSON.parse(rawData);
    if (event === "token") process.stdout.write(data.token);
    else if (event === "error") console.error("\\n[error]", data.message);
    else if (event === "done") console.log("\\n[done]");
  }
}`;
}

export const apiDocs = {
  title: "Chat API Reference",
  subtitle:
    "Stream AI chatbot responses directly from your backend using Server-Sent Events (SSE).",
  planNote: "API access is available on Starter and Pro.",
  endpoint: {
    method: "POST",
    path: "/api/v1/public/chat",
    description:
      "Sends a visitor message to one of your active bots and streams the reply as Server-Sent Events.",
  },
  sections: [
    { id: "overview", text: "Overview" },
    { id: "before-you-start", text: "Before you start" },
    { id: "authentication", text: "Authentication" },
    { id: "base-url", text: "Base URL" },
    { id: "endpoint", text: "Endpoint" },
    { id: "headers", text: "Headers" },
    { id: "body-parameters", text: "Body parameters" },
    { id: "response", text: "Response" },
    { id: "errors", text: "Errors" },
    { id: "rate-limits", text: "Rate limits" },
    { id: "examples", text: "Examples" },
    { id: "best-practices", text: "Best practices" },
  ],
  overview: [
    "Use the public Chat API when you want to call your Tellvira bot from your own backend, server-side workflow, or custom integration instead of embedding the browser widget.",
    "Requests are server-to-server, do not require an Origin header, and reuse the same knowledge retrieval, conversation memory, and monthly plan quotas as the web widget.",
  ],
  beforeYouStart: [
    {
      label: "Create an API key",
      text: "Go to Account Settings > API keys to generate a secret key. API access is available on Starter and Pro plans.",
      href: "/dashboard/account#api-keys",
      linkLabel: "Open API keys",
    },
    {
      label: "Find your bot_id",
      text: "Open Bots, select your bot, and open its Install tab to copy the bot's public ID.",
      href: "/dashboard/bots",
      linkLabel: "Open Bots",
    },
  ],
  authentication: [
    "Authenticate every request with a secret API key in the Authorization header using the Bearer scheme.",
    "API keys use the format tv_live_ followed by 40 random characters (48 characters total). The full key is shown once at creation time in Account Settings > API keys. Up to 5 active keys are allowed per account.",
  ],
  headers: [
    {
      name: "Authorization",
      required: "Yes",
      value: "Bearer tv_live_<40 chars>",
      description:
        "Your secret API key. Requests with missing, revoked, or expired keys return 401.",
    },
    {
      name: "Content-Type",
      required: "Yes",
      value: "application/json",
      description: "JSON request body media type.",
    },
    {
      name: "Accept",
      required: "Recommended",
      value: "text/event-stream",
      description:
        "Indicates the client expects an SSE stream. Pre-stream auth or validation errors still return application/json.",
    },
  ],
  bodyParams: [
    {
      name: "bot_id",
      type: "string",
      required: "Yes",
      description:
        "Public ULID of the target bot (max 64 chars). The bot must belong to the API key owner and be active.",
    },
    {
      name: "message",
      type: "string",
      required: "Yes",
      description:
        "Visitor message text (trimmed, 1 to 500 characters by default).",
    },
    {
      name: "conversation_id",
      type: "string (UUID) | null",
      required: "No",
      description:
        "Existing conversation UUID returned by a prior conversation event. Must belong to the same bot. Conversations expire after 24 hours of inactivity.",
    },
  ],
  sseEvents: [
    {
      event: "conversation",
      payload: "conversationId: string (UUID)",
      whenSent:
        "Sent first on every stream. Store this ID after done arrives to continue the conversation.",
    },
    {
      event: "token",
      payload: "token: string",
      whenSent:
        "Sent zero or more times as the assistant generates text chunks.",
    },
    {
      event: "usage",
      payload: "used: number, limit: number, reached: boolean",
      whenSent:
        "Sent after the turn is saved; reports turns used vs the per-conversation turn limit (default 15 turns / 30 messages).",
    },
    {
      event: "lead_form",
      payload: "fields: Array<{ name: string, label: string, ... }>",
      whenSent:
        "Sent after usage when lead capture is enabled on the bot and the assistant triggers lead capture.",
    },
    {
      event: "done",
      payload: "{} (empty object)",
      whenSent:
        "Final event indicating the stream finished and messages and usage were committed.",
    },
    {
      event: "error",
      payload: "message: string",
      whenSent:
        "Sent if an internal error interrupts streaming after the 200 SSE response has started.",
    },
  ],
  errors: [
    {
      status: "401",
      code: "invalid_api_key",
      meaning: "Missing, malformed, revoked, or expired API key.",
      action: "Check the Bearer token or create a new API key in Account Settings.",
    },
    {
      status: "403",
      code: "account_suspended",
      meaning: "The API key owner's account is suspended or inactive.",
      action: "Contact support to restore account access.",
    },
    {
      status: "403",
      code: "plan_not_allowed",
      meaning: "The owner's current plan does not include API access.",
      action: "Upgrade to Starter or Pro in Billing.",
    },
    {
      status: "403",
      code: "bot_inactive",
      meaning: "The requested bot is paused or inactive.",
      action: "Set the bot status to Active in the dashboard.",
    },
    {
      status: "403",
      code: "—",
      meaning: "Monthly plan quota for conversations, AI messages, or AI tokens is reached.",
      action: "Wait for the next billing cycle or upgrade your plan.",
    },
    {
      status: "404",
      code: "bot_not_found",
      meaning: "No bot with that bot_id exists for the API key owner.",
      action: "Verify bot_id and ensure the API key belongs to the bot owner.",
    },
    {
      status: "404",
      code: "conversation_not_found",
      meaning: "The supplied conversation_id belongs to a different bot.",
      action: "Omit conversation_id to start fresh or pass one created for this bot.",
    },
    {
      status: "409",
      code: "—",
      meaning: "Conversation reached the maximum message limit (30 messages by default).",
      action: "Start a new conversation by omitting conversation_id.",
    },
    {
      status: "422",
      code: "—",
      meaning: "Request body validation failed (field details are returned in errors).",
      action: "Fix the invalid or missing fields listed in the errors object.",
    },
    {
      status: "429",
      code: "rate_limit_exceeded",
      meaning: "Per-API-key or per-conversation rate limit exceeded.",
      action: "Pause and retry after a short backoff.",
    },
    {
      status: "429",
      code: "—",
      meaning: "Another message is currently streaming for the same conversation_id.",
      action: "Wait for the in-flight stream to finish before sending the next turn.",
    },
    {
      status: "503",
      code: "—",
      meaning: "Upstream AI provider or knowledge search is temporarily unavailable.",
      action: "Retry with exponential backoff.",
    },
  ],
  rateLimits: [
    {
      scope: "Per API key",
      limit: "60 requests / minute (default)",
      notes: "Applies across all bots used with that key.",
    },
    {
      scope: "Per conversation",
      limit: "10 requests / minute (default)",
      notes: "Applies when conversation_id is supplied.",
    },
    {
      scope: "Concurrent stream lock",
      limit: "1 active turn per conversation",
      notes: "Concurrent requests to the same conversation_id return 429 until the active turn completes.",
    },
    {
      scope: "Message & session caps",
      limit: "500 chars / message, 30 messages / conversation, 24h inactivity expiry",
      notes: "Each new or expired conversation counts once toward your monthly plan conversation quota.",
    },
  ],
  examples: [
    {
      id: "curl",
      label: "cURL",
      code: buildCurlExample({ baseUrl: apiDocsBaseUrl, botId: "01J...", includeConversationId: true }),
    },
    {
      id: "node",
      label: "Node.js (fetch)",
      code: buildNodeExample({ baseUrl: apiDocsBaseUrl, botId: "01J..." }),
    },
    {
      id: "python",
      label: "Python (requests)",
      code: `import json
import os
import requests

response = requests.post(
    "${apiDocsBaseUrl}/api/v1/public/chat",
    headers={
        "Authorization": f"Bearer {os.environ['TELLVIRA_API_KEY']}",
        "Content-Type": "application/json",
        "Accept": "text/event-stream",
    },
    json={
        "bot_id": "01J...",
        "message": "What are your opening hours?",
    },
    stream=True,
    timeout=60,
)
response.raise_for_status()

event_name = None
for line in response.iter_lines(decode_unicode=True):
    if not line:
        continue
    if line.startswith("event:"):
        event_name = line.split(":", 1)[1].strip()
    elif line.startswith("data:"):
        payload = json.loads(line.split(":", 1)[1].strip())
        if event_name == "token":
            print(payload["token"], end="", flush=True)
        elif event_name == "done":
            print("\\n[done]")`,
    },
  ],
  bestPractices: [
    "Keep API keys on your server only—never ship tv_live_ keys in browser JavaScript, mobile app bundles, or public repositories.",
    "Save the conversationId from the conversation event only after you receive the done event, because messages and usage are committed when streaming completes.",
    "Disable client-side response buffering (for example pass -N in cURL) so tokens render incrementally.",
    "Use separate API keys per environment or integration so you can revoke one key without affecting others.",
    "Handle HTTP 429 and 503 responses with bounded exponential backoff rather than tight retry loops.",
  ],
};
