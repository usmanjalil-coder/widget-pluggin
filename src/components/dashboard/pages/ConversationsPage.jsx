"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import ConversationsPanel from "../ConversationsPanel";
import PageHeader from "@/components/shared/PageHeader";
import { getConversation, listConversations } from "@/lib/api/bots.api";
import { useDashboard } from "../dashboard-context";

const EMPTY = [];

function BotConversations({ botId, linkedConversationId }) {
  const [query, setQuery] = useState("");
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [range, setRange] = useState("all");
  const [page, setPage] = useState(1);
  const [selectedId, setSelectedId] = useState(linkedConversationId);

  useEffect(() => {
    const timer = setTimeout(() => setSearch(query.trim()), 300);
    return () => clearTimeout(timer);
  }, [query]);

  const listQuery = useQuery({
    queryKey: ["conversations", botId, page, search, status, range],
    queryFn: ({ signal }) => listConversations(botId, { page, search, status, range }, signal),
    enabled: Boolean(botId),
    staleTime: 15000,
    retry: false,
  });
  const conversations = listQuery.data?.items ?? EMPTY;
  const activeId = selectedId || conversations[0]?.id;
  const detailQuery = useQuery({
    queryKey: ["conversation", botId, activeId],
    queryFn: ({ signal }) => getConversation(botId, activeId, signal),
    enabled: Boolean(botId && activeId),
    staleTime: 15000,
    retry: false,
  });

  const selectConversation = (id) => {
    setSelectedId(id);
  };
  const changeFilter = (setter) => (value) => {
    setter(value);
    setPage(1);
    setSelectedId(null);
  };
  const changePage = (value) => {
    setPage(value);
    setSelectedId(null);
  };

  return (
    <div>
      <div className="mb-6">
        <PageHeader title="Conversations" description="Review chats and follow up with visitors." />
      </div>
      <ConversationsPanel
        conversations={conversations}
        conversation={detailQuery.data ?? null}
        detailLoading={Boolean(activeId) && detailQuery.isPending}
        detailError={detailQuery.error?.message ?? ""}
        onDetailRetry={detailQuery.refetch}
        loading={Boolean(botId) && listQuery.isPending}
        error={listQuery.error?.message ?? ""}
        onRetry={listQuery.refetch}
        botId={botId}
        selectedId={activeId}
        onSelect={selectConversation}
        query={query}
        onQueryChange={changeFilter(setQuery)}
        status={status}
        onStatusChange={changeFilter(setStatus)}
        range={range}
        onRangeChange={changeFilter(setRange)}
        page={page}
        nextPage={listQuery.data?.nextPage}
        onPageChange={changePage}
      />
    </div>
  );
}

export default function ConversationsPage() {
  const { selectedBotId } = useDashboard();
  const linkedConversationId = useSearchParams().get("conversation");

  return (
    <BotConversations
      key={`${selectedBotId}:${linkedConversationId || ""}`}
      botId={selectedBotId}
      linkedConversationId={linkedConversationId}
    />
  );
}
