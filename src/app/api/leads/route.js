import { readDb } from "@/lib/store";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const botId = searchParams.get("botId");
  const db = readDb();
  const leads = botId
    ? db.leads.filter((lead) => lead.botId === botId)
    : db.leads;
  return Response.json(leads);
}
