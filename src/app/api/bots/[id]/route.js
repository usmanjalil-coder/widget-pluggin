import { readDb, writeDb } from "@/lib/store";
import { validateBotText } from "@/lib/limits";

export async function GET(_request, { params }) {
  const { id } = await params;
  const bot = readDb().bots.find((item) => item.id === id);
  return bot
    ? Response.json(bot)
    : Response.json({ error: "Not found" }, { status: 404 });
}

export async function PUT(request, { params }) {
  const { id } = await params;
  const db = readDb();
  const index = db.bots.findIndex((item) => item.id === id);

  if (index < 0) {
    return Response.json({ error: "Not found" }, { status: 404 });
  }

  const patch = await request.json();
  const error = validateBotText(patch);
  if (error) return Response.json({ error }, { status: 400 });
  db.bots[index] = {
    ...db.bots[index],
    ...patch,
    theme: { ...db.bots[index].theme, ...patch.theme },
    texts: { ...db.bots[index].texts, ...patch.texts },
    features: { ...db.bots[index].features, ...patch.features },
    branding: { ...db.bots[index].branding, ...patch.branding },
    settings: { ...db.bots[index].settings, ...patch.settings },
  };

  writeDb(db);
  return Response.json(db.bots[index]);
}

export async function DELETE(_request, { params }) {
  const { id } = await params;
  const db = readDb();
  const nextBots = db.bots.filter((item) => item.id !== id);

  if (nextBots.length === db.bots.length) {
    return Response.json({ error: "Not found" }, { status: 404 });
  }

  db.bots = nextBots;
  db.leads = db.leads.filter((lead) => lead.botId !== id);
  db.conversations = db.conversations.filter((conv) => conv.botId !== id);
  db.documents = db.documents.filter((document) => document.botId !== id);
  writeDb(db);

  return new Response(null, { status: 204 });
}
