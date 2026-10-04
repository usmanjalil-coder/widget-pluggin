import { readDb, writeDb } from "@/lib/store";

export async function GET(_request, { params }) {
  const { id } = await params;
  const db = readDb();
  return Response.json(
    db.documents.filter((document) => document.botId === id),
  );
}

export async function POST(request, { params }) {
  const { id } = await params;
  const db = readDb();
  const body = await request.json();
  const document = {
    id: `doc-${Date.now()}`,
    botId: id,
    name: body.name || "New knowledge item",
    type: body.type || "file",
    status: "ready",
    size: body.size || "0 KB",
    updatedAt: new Date().toISOString(),
    source: body.source || "Upload",
  };

  db.documents.unshift(document);
  writeDb(db);
  return Response.json(document, { status: 201 });
}
