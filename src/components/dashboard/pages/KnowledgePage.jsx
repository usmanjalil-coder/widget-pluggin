"use client";

import { useCallback } from "react";
import { toast } from "sonner";
import KnowledgeBasePanel from "../KnowledgeBasePanel";
import { listDocuments, addDocument, updateDocument, deleteDocument } from "@/lib/api/bots.api";
import { useDashboard } from "../dashboard-context";
import useDashboardResource from "../useDashboardResource";
const EMPTY = [];
export default function KnowledgePage() {
  const { selectedBotId } = useDashboard();
  const loader = useCallback(() => listDocuments(selectedBotId), [selectedBotId]);
  const { data, loading, error, reload, setData } = useDashboardResource(
    loader,
    Boolean(selectedBotId),
  );
  const onAdd = useCallback(
    async (payload) => {
      await addDocument(selectedBotId, payload);
      setData(await listDocuments(selectedBotId));
    },
    [selectedBotId, setData],
  );
  const onUpdate = useCallback(
    async (documentId, action) => {
      await updateDocument(selectedBotId, documentId, action);
      setData(await listDocuments(selectedBotId));
      toast.success(action === "retry" ? "Source retry started." : "Source re-sync started.");
    },
    [selectedBotId, setData],
  );
  const onDelete = useCallback(
    async (documentId) => {
      await deleteDocument(selectedBotId, documentId);
      setData((current) => (current || []).filter((document) => document.id !== documentId));
    },
    [selectedBotId, setData],
  );
  return (
    <KnowledgeBasePanel
      botId={selectedBotId}
      documents={data || EMPTY}
      loading={loading}
      error={error}
      onReload={reload}
      onAdd={onAdd}
      onUpdate={onUpdate}
      onDelete={onDelete}
    />
  );
}
