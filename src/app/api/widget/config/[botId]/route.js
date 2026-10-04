import { getBot } from "@/lib/store";
const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Cache-Control": "public, max-age=60",
};
export async function GET(_request, { params }) {
  const { botId } = await params;
  const bot = getBot(botId);
  return Response.json(
    bot
      ? {
          theme: bot.theme,
          texts: bot.texts,
          features: bot.features,
          branding: bot.branding,
        }
      : { error: "Not found" },
    { status: bot ? 200 : 404, headers },
  );
}
export function OPTIONS() {
  return new Response(null, { status: 204, headers });
}
