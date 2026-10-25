"use client";

import { useQuery } from "@tanstack/react-query";
import { getBillingOverview } from "@/lib/api/billing.api";
import OverviewPanel from "../OverviewPanel";
import { useDashboard } from "../dashboard-context";

export default function OverviewPage() {
  const { usage, account, accountLoading, accountError, loadAccount, selectedBotId } =
    useDashboard();
  const billingQuery = useQuery({
    queryKey: ["billing", "overview"],
    queryFn: ({ signal }) => getBillingOverview(signal),
    staleTime: 30_000,
    retry: false,
  });

  return (
    <OverviewPanel
      usage={usage}
      billing={billingQuery.data}
      billingLoading={billingQuery.isPending}
      billingError={billingQuery.isError}
      selectedBotId={selectedBotId}
      account={account}
      loading={accountLoading}
      error={accountError}
      onRetry={loadAccount}
    />
  );
}
