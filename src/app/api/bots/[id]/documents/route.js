import { readDb, writeDb } from "@/lib/store";

export async function GET(_request, { params }) {
  const { id } = await params;
  const db = readDb();
  let changed = false;
  const now = Date.now();
  db.documents.forEach((document) => {
    if (document.botId === id && document.status === "processing" && now - new Date(document.updatedAt).getTime() > 2500) {
      document.status = "ready";
      document.updatedAt = new Date().toISOString();
      changed = true;
    }
  });
  if (changed) writeDb(db);
  return Response.json(db.documents.filter((document) => document.botId === id));
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
    status: body.status || "processing",
    size: body.size || "0 KB",
    updatedAt: new Date().toISOString(),
    source: body.source || "Upload",
  };

  db.documents.unshift(document);
  writeDb(db);
  return Response.json(document, { status: 201 });
}

export async function PATCH(request, { params }) {
  const { id } = await params;
  const { documentId, action } = await request.json();
  const db = readDb();
  const document = db.documents.find((item) => item.id === documentId && item.botId === id);
  if (!document) return Response.json({ error: "Source not found." }, { status: 404 });
  if (action === "retry" || action === "resync") {
    document.status = "processing";
    document.updatedAt = new Date().toISOString();
    document.error = "";
  }
  writeDb(db);
  return Response.json(document);
}

export async function DELETE(request, { params }) {
  const { id } = await params;
  const documentId = new URL(request.url).searchParams.get("documentId");
  const db = readDb();
  const before = db.documents.length;
  db.documents = db.documents.filter((document) => !(document.id === documentId && document.botId === id));
  if (db.documents.length === before) return Response.json({ error: "Source not found." }, { status: 404 });
  writeDb(db);
  return new Response(null, { status: 204 });
}
