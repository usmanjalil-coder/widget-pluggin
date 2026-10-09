function parseEvent(block) {
  const event = (block.match(/^event:\s*(.+)$/m) || [])[1] || "message";
  const data = (block.match(/^data:\s*(.+)$/m) || [])[1] || "";
  try {
    return { event, data: JSON.parse(data) };
  } catch {
    return { event, data };
  }
}
async function streamChat({ apiBase, botId, conversationId, message, onToken, onLeadForm }) {
  const response = await fetch(
    `${apiBase.replace(/\/$/, "")}/api/v1/chat/${encodeURIComponent(botId)}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "text/event-stream",
      },
      body: JSON.stringify({ conversationId, message }),
    },
  );
  if (!response.ok || !response.body) throw new Error("Chat is temporarily unavailable.");
  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    const blocks = buffer.split(/\n\n/);
    buffer = blocks.pop();
    blocks.forEach((block) => {
      const item = parseEvent(block);
      if (item.event === "token") onToken(item.data.token || "");
      if (item.event === "lead_form") onLeadForm(item.data);
      if (item.event === "conversation")
        localStorage.setItem(`cb-conversation-${botId}`, item.data.conversationId);
    });
  }
}
export { streamChat };
