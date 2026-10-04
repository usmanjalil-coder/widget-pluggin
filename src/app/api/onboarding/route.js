import { readDb, writeDb } from "@/lib/store";

export async function GET() {
  return Response.json(
    readDb().onboarding || { checklist: {}, step: 0, skipped: false },
  );
}

export async function PATCH(request) {
  const db = readDb();
  const patch = await request.json();
  const current = db.onboarding || { checklist: {}, step: 0, skipped: false };
  const next = {
    ...current,
    ...patch,
    checklist: {
      ...(current.checklist || {}),
      ...(patch.checklist || {}),
    },
  };

  db.onboarding = next;
  writeDb(db);

  return Response.json(next);
}
