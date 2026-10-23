"use client";

import { useEffect, useState } from "react";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";
import Link from "next/link";
import { Info } from "lucide-react";
import { Button, Card } from "@/components/ui";
import { getBot } from "@/lib/api/bots.api";
import { botQueryKey } from "@/lib/query-client";
import LeadsPanel from "../LeadsPanel";
import PageHeader from "@/components/shared/PageHeader";
import { getLead, listLeads, updateLeadStatus } from "@/lib/api/leads.api";
import { useDashboard } from "../dashboard-context";

const EMPTY = [];

function BotLeads({ botId }) {
  const client = useQueryClient();
  const botQuery = useQuery({
    queryKey: botQueryKey(botId),
    queryFn: () => getBot(botId),
    enabled: Boolean(botId),
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
  });
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
      {botQuery.data?.features?.leadCapture === false && (
        <Card className="mb-6 border-warning/30 bg-warning-bg" role="status">
          <div className="flex items-start gap-3">
            <Info className="mt-0.5 size-5 shrink-0 text-warning-foreground" aria-hidden="true" />
            <div className="space-y-3">
              <h2 className="text-base font-semibold text-warning-foreground">This bot is set up for customer support</h2>
              <p className="text-sm text-warning-foreground">
                Lead capture is disabled. Enable it in Bot Settings to collect new contacts and
                appointment requests. Any previously captured leads remain available below.
              </p>
              <Button asChild variant="secondary" size="sm">
                <Link href={`/dashboard/bots/${encodeURIComponent(botId)}?tab=settings`}>
                  Open Bot Settings
                </Link>
              </Button>
            </div>
          </div>
        </Card>
      )}
      <LeadsPanel
        leadCaptureEnabled={botQuery.data?.features?.leadCapture !== false}
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
