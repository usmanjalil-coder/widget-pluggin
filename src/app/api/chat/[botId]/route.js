const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Content-Type": "text/event-stream; charset=utf-8",
  "Cache-Control": "no-cache",
};
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
export async function POST(request, { params }) {
  const { botId } = await params;
  const body = await request.json();
  const appointment = /appointment/i.test(body.message || "");
  const answer = appointment
    ? "I can help with an appointment. Please share your details and our team will follow up shortly."
    : `Thanks for your message. This is a streaming mock reply from ${botId || "your assistant"}. How else can I help?`;
  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      const id = body.conversationId || `mock-${crypto.randomUUID()}`;
      controller.enqueue(
        encoder.encode(
          `event: conversation\ndata: ${JSON.stringify({ conversationId: id })}\n\n`,
        ),
      );
      for (const word of answer.split(/(\s+)/)) {
        controller.enqueue(
          encoder.encode(
            `event: token\ndata: ${JSON.stringify({ token: word })}\n\n`,
          ),
        );
        await sleep(45);
      }
      if (appointment)
        controller.enqueue(
          encoder.encode(
            `event: lead_form\ndata: ${JSON.stringify({
              fields: [
                { name: "name", label: "Your name" },
                { name: "phone", label: "Phone number" },
                { name: "preferred_time", label: "Preferred time" },
              ],
            })}\n\n`,
          ),
        );
      controller.close();
    },
  });
  return new Response(stream, { headers });
}
export function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: { ...headers, "Content-Type": "" },
  });
}
