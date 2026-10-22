"use client";

import { useEffect, useState } from "react";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";
import LeadsPanel from "../LeadsPanel";
import PageHeader from "@/components/shared/PageHeader";
import { getLead, listLeads, updateLeadStatus } from "@/lib/api/leads.api";
import { useDashboard } from "../dashboard-context";

const EMPTY = [];

function BotLeads({ botId }) {
  const client = useQueryClient();
  const [query, setQuery] = useState("");
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [page, setPage] = useState(1);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => setSearch(query.trim()), 300);
    return () => clearTimeout(timer);
  }, [query]);

  const listQuery = useQuery({
    queryKey: ["leads", botId, page, search, status],
    queryFn: ({ signal }) => listLeads(botId, { page, search, status }, signal),
    enabled: Boolean(botId),
    placeholderData: keepPreviousData,
    staleTime: 15000,
    retry: false,
  });
  const detailQuery = useQuery({
    queryKey: ["lead", botId, selectedId],
    queryFn: ({ signal }) => getLead(botId, selectedId, signal),
    enabled: Boolean(botId && selectedId),
    staleTime: 15000,
    retry: false,
  });
  const updateMutation = useMutation({
    mutationFn: ({ leadId, value }) => updateLeadStatus(botId, leadId, value),
    onSuccess: async (updated) => {
      client.setQueryData(["lead", botId, updated.id], (current) =>
        current ? { ...current, status: updated.status } : current,
      );
      await client.invalidateQueries({ queryKey: ["leads", botId] });
    },
  });

  const onStatusChange = async (leadId, value) => {
    try {
      await updateMutation.mutateAsync({ leadId, value });
      toast.success("Lead status updated.");
    } catch (error) {
      toast.error(error.message || "Could not update lead.");
    }
  };
  const onExport = async () => {
    const rows = [];
    let exportPage = 1;
    let pages = 1;
    do {
      const result = await listLeads(botId, {
        page: exportPage,
        per_page: 100,
        search,
        status,
        with_counts: 0,
      });
      rows.push(...result.items);
      pages = result.pages;
      exportPage += 1;
    } while (exportPage <= pages);
    return rows;
  };

  return (
    <div>
      <div className="mb-6">
        <PageHeader title="Leads" description="Manage contacts and appointment requests." />
      </div>
      <LeadsPanel
        leads={listQuery.data?.items ?? EMPTY}
        counts={listQuery.data?.counts}
        pagination={listQuery.data}
        loading={Boolean(botId) && listQuery.isPending}
        refreshing={listQuery.isFetching && !listQuery.isPending}
        error={listQuery.error?.message ?? ""}
        onRetry={listQuery.refetch}
        query={query}
        onQueryChange={(value) => {
          setQuery(value);
          setPage(1);
        }}
        status={status}
        onFilterChange={(value) => {
          setStatus(value);
          setPage(1);
        }}
        page={page}
        onPageChange={setPage}
        selectedId={selectedId}
        onSelect={setSelectedId}
        onClose={() => setSelectedId(null)}
        selected={detailQuery.data}
        detailLoading={Boolean(selectedId) && detailQuery.isPending}
        detailError={detailQuery.error?.message ?? ""}
        onDetailRetry={detailQuery.refetch}
        onStatusChange={onStatusChange}
        onExport={onExport}
      />
    </div>
  );
}

export default function LeadsPage() {
  const { selectedBotId } = useDashboard();
  return <BotLeads key={selectedBotId} botId={selectedBotId} />;
}
