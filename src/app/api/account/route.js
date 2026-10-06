import { readDb, writeDb } from "@/lib/store";

export async function GET() {
  const db = readDb();
  return Response.json({ ...db.user, notifications: db.user.notifications || { newLead: true, usageWarning: true, weeklySummary: false } });
}

export async function PATCH(request) {
  const db = readDb();
  const patch = await request.json();
  if (patch.name !== undefined && (!String(patch.name).trim() || String(patch.name).length > 80)) {
    return Response.json({ error: "Enter a name up to 80 characters." }, { status: 400 });
  }
  db.user = {
    ...db.user,
    ...patch,
    name: patch.name === undefined ? db.user.name : String(patch.name).trim(),
    notifications: { ...(db.user.notifications || {}), ...(patch.notifications || {}) },
  };
  writeDb(db);
  return Response.json(db.user);
}

export async function DELETE() {
  const db = readDb();
  db.user = { ...db.user, deleted: true };
  writeDb(db);
  return new Response(null, { status: 204 });
}
