import { readDb } from "@/lib/store";

export async function GET(_request, { params }) {
  const { id } = await params;
  const db = readDb();
  return Response.json(
    db.conversations.filter((conversation) => conversation.botId === id),
  );
}
