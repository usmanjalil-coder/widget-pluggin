"use client";

import { useCallback, useEffect, useState } from "react";
import { keepPreviousData, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import KnowledgeBasePanel from "../KnowledgeBasePanel";
import { listDocuments, addDocument, updateDocument, deleteDocument } from "@/lib/api/bots.api";
import { useDashboard } from "../dashboard-context";

const EMPTY = [];
const EMPTY_STATS = { sources: 0, ready: 0, needs_attention: 0 };

function BotKnowledge({ botId }) {
  const client = useQueryClient();
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({ page: 1, per_page: 10, search: "", status: "all" });

  useEffect(() => {
    const timer = setTimeout(() => {
      setFilters((current) =>
        current.search === search.trim() ? current : { ...current, search: search.trim(), page: 1 },
      );
    }, 300);
    return () => clearTimeout(timer);
  }, [search]);

  const query = useQuery({
    queryKey: ["documents", botId, filters],
    queryFn: ({ signal }) => listDocuments(botId, filters, signal),
    enabled: Boolean(botId),
    placeholderData: keepPreviousData,
    staleTime: 30000,
    retry: false,
    refetchOnWindowFocus: false,
    refetchInterval: (query) =>
      query.state.data?.data.some((item) => item.status === "processing") ? 3000 : false,
  });
  const invalidate = useCallback(
    () => client.invalidateQueries({ queryKey: ["documents", botId] }),
    [client, botId],
  );
  const onAdd = useCallback(
    async (payload) => {
      await addDocument(botId, payload);
      setFilters((current) => ({ ...current, page: 1 }));
      await invalidate();
    },
    [botId, invalidate],
  );
  const onUpdate = useCallback(
    async (documentId, action) => {
      try {
        await updateDocument(botId, documentId, action);
        await invalidate();
        toast.success(action === "retry" ? "Source retry started." : "Source re-sync started.");
      } catch (error) {
        toast.error(error.message);
      }
    },
    [botId, invalidate],
  );
  const onDelete = useCallback(
    async (documentId) => {
      await deleteDocument(botId, documentId);
      if (query.data?.data.length === 1 && filters.page > 1) {
        setFilters((current) => ({ ...current, page: current.page - 1 }));
      }
      await invalidate();
    },
    [botId, filters.page, query.data, invalidate],
  );
  const onStatusChange = useCallback((status) => {
    setFilters((current) => ({ ...current, status, page: 1 }));
  }, []);
  const onPageChange = useCallback((page) => {
    setFilters((current) => ({ ...current, page }));
  }, []);

  return (
    <KnowledgeBasePanel
      documents={query.data?.data ?? EMPTY}
      stats={query.data?.stats ?? EMPTY_STATS}
      pagination={query.data}
      query={search}
      onSearchChange={setSearch}
      status={filters.status}
      onStatusChange={onStatusChange}
      onPageChange={onPageChange}
      refreshing={query.isFetching}
      loading={Boolean(botId) && query.isPending}
      error={query.error?.message ?? ""}
      onReload={query.refetch}
      onAdd={onAdd}
      onUpdate={onUpdate}
      onDelete={onDelete}
    />
  );
}

export default function KnowledgePage() {
  const { selectedBotId } = useDashboard();
  return <BotKnowledge key={selectedBotId} botId={selectedBotId} />;
}
