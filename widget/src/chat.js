function parseEvent(block) {
  const event = (block.match(/^event:\s*(.+)$/m) || [])[1] || "message";
  const data = (block.match(/^data:\s*(.+)$/m) || [])[1] || "";
  try {
    return { event, data: JSON.parse(data) };
  } catch {
    return { event, data };
  }
}
async function streamChat({
  apiBase, botId, conversationId, message, onToken, onLeadForm,
  test = false, history = [], authToken = null, assistantRules, botName,
}) {
  const response = await fetch(
    `${apiBase.replace(/\/$/, "")}/api/v1/${test ? `bot/${encodeURIComponent(botId)}/test-chat` : `chat/${encodeURIComponent(botId)}`}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "text/event-stream",
        ...(test && authToken ? { Authorization: `Bearer ${authToken}` } : {}),
      },
      ...(test ? { credentials: "include" } : {}),
      body: JSON.stringify(test
        ? { message, history, assistantRules, botName }
        : { conversationId, message }),
    },
  );
  if (!response.ok) {
    const payload = await response.json().catch(() => null);
    const message = test && response.status === 429
      ? "15 test prompts used for this bot. Try again in an hour."
      : test && response.status === 409
        ? "Test session limit reached. Reset chat to start a new session."
        : payload?.message || "Chat is temporarily unavailable.";
    throw new Error(message);
  }
  if (!response.body) throw new Error("Chat is temporarily unavailable.");
  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  let nextConversationId = null;
  let pendingLeadForm = null;
  let completed = false;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    const blocks = buffer.split(/\n\n/);
    buffer = blocks.pop();
    blocks.forEach((block) => {
      const item = parseEvent(block);
      if (item.event === "token") onToken(item.data.token || "");
      if (item.event === "lead_form") pendingLeadForm = item.data;
      if (item.event === "conversation") nextConversationId = item.data.conversationId;
      if (item.event === "done") {
        completed = true;
        if (!test && nextConversationId)
          localStorage.setItem(`cb-conversation-${botId}`, nextConversationId);
        if (!test && pendingLeadForm) onLeadForm(pendingLeadForm);
      }
      if (item.event === "error") throw new Error(item.data.message || "Chat is temporarily unavailable.");
    });
  }
  if (!completed) throw new Error("Chat connection ended before the reply was saved.");
}
export { streamChat };
