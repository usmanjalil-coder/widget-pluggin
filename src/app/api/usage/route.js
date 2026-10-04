import { readDb } from "@/lib/store";

export async function GET() {
  const db = readDb();
  return Response.json({
    ...db.usage,
    plan: db.plan,
    botCount: db.bots.length,
    currentPlan: db.plan,
  });
}
