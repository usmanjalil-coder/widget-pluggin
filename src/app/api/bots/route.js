import { readDb, writeDb } from "@/lib/store";
import { validateBotText } from "@/lib/limits";

export async function GET() {
  return Response.json(readDb().bots);
}

export async function POST(request) {
  const db = readDb();
  const body = await request.json();
  const error = validateBotText(body);
  if (error) return Response.json({ error }, { status: 400 });
  const seedName = (body.name || "new-bot")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-");
  const source = db.bots[0];
  const bot = {
    ...source,
    id: `${seedName}-${Date.now().toString(36)}`,
    name: body.name || "New bot",
    theme: {
      ...source.theme,
      primaryColor: body.primaryColor || source.theme.primaryColor,
    },
    texts: {
      ...source.texts,
      botName: body.name || "New bot",
      greetingMessage: body.greetingMessage || source.texts.greetingMessage,
      launcherLabel: body.launcherLabel || source.texts.launcherLabel,
    },
    branding: {
      ...source.branding,
      showBadge: body.showBadge ?? source.branding.showBadge,
    },
    settings: {
      ...source.settings,
      allowedDomains: body.allowedDomains || source.settings.allowedDomains,
    },
  };

  db.bots.push(bot);
  writeDb(db);
  return Response.json(bot, { status: 201 });
}
