"use client";

import { useCallback } from "react";
import { toast } from "sonner";
import LeadsPanel from "../LeadsPanel";
import PageHeader from "@/components/shared/PageHeader";
import { listLeads, updateLeadStatus } from "@/lib/api/leads.api";
import { useDashboard } from "../dashboard-context";
import useDashboardResource from "../useDashboardResource";
const EMPTY = [];
export default function LeadsPage() {
  const { selectedBotId } = useDashboard();
  const loader = useCallback(() => listLeads(selectedBotId), [selectedBotId]);
  const { data, loading, error, reload, setData } = useDashboardResource(
    loader,
    Boolean(selectedBotId),
  );
  const onStatusChange = useCallback(
    async (leadId, status) => {
      try {
        const updated = await updateLeadStatus(leadId, status);
        setData((current) => (current || []).map((lead) => (lead.id === leadId ? updated : lead)));
        toast.success("Lead status updated.");
      } catch (error) {
        toast.error(error.message || "Could not update lead.");
        throw error;
      }
    },
    [setData],
  );
  return (
    <div>
      <div className="mb-6">
        <PageHeader title="Leads" description="Manage contacts and appointment requests." />
      </div>
      <LeadsPanel
        leads={data || EMPTY}
        loading={loading}
        error={error}
        onRetry={reload}
        onStatusChange={onStatusChange}
      />
    </div>
  );
}
