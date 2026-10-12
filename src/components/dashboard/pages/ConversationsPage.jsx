"use client";

import { useCallback } from "react";
import { useSearchParams } from "next/navigation";
import ConversationsPanel from "../ConversationsPanel";
import PageHeader from "@/components/shared/PageHeader";
import { listConversations } from "@/lib/api/bots.api";
import { listLeads } from "@/lib/api/leads.api";
import { useDashboard } from "../dashboard-context";
import useDashboardResource from "../useDashboardResource";
const EMPTY = [];
export default function ConversationsPage() {
  const { selectedBotId } = useDashboard();
  const searchParams = useSearchParams();
  const loader = useCallback(async () => {
    const [conversations, leads] = await Promise.all([
      listConversations(selectedBotId),
      listLeads(selectedBotId),
    ]);
    return { conversations, leads };
  }, [selectedBotId]);
  const { data, loading, error, reload } = useDashboardResource(loader, Boolean(selectedBotId));
  return (
    <div>
      <div className="mb-6">
        <PageHeader title="Conversations" description="Review chats and follow up with visitors." />
      </div>
      <ConversationsPanel
        conversations={data?.conversations || EMPTY}
        leads={data?.leads || EMPTY}
        loading={loading}
        error={error}
        onRetry={reload}
        botId={selectedBotId}
        initialConversationId={searchParams.get("conversation")}
      />
    </div>
  );
}
