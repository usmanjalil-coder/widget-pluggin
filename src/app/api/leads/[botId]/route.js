import { readDb, writeDb } from "@/lib/store";
export async function GET(_request, { params }) {
  const { botId } = await params;
  return Response.json(readDb().leads.filter((lead) => lead.botId === botId));
}
export async function POST(request, { params }) {
  const { botId } = await params;
  const body = await request.json();
  const db = readDb();
  const lead = {
    id: `lead-${Date.now()}`,
    botId,
    name: body.fields?.name || "Website visitor",
    phone: body.fields?.phone || "",
    status: "new",
    createdAt: new Date().toISOString(),
    ...body.fields,
  };
  db.leads.unshift(lead);
  writeDb(db);
  return Response.json({ ok: true, lead });
}

export async function PATCH(request, { params }) {
  const { botId: leadId } = await params;
  const { status } = await request.json();
  if (!["new", "confirmed", "done"].includes(status)) {
    return Response.json({ error: "Status must be new, confirmed, or done." }, { status: 400 });
  }
  const db = readDb();
  const lead = db.leads.find((entry) => entry.id === leadId);
  if (!lead) return Response.json({ error: "Lead not found." }, { status: 404 });
  lead.status = status;
  writeDb(db);
  return Response.json(lead);
}
