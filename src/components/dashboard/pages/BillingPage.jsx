"use client";

import BillingPanel from "../BillingPanel";
import { useDashboard } from "../dashboard-context";
export default function BillingPage() {
  const { usage, account, usageLoading, usageError, loadUsage } = useDashboard();
  return (
    <BillingPanel usage={usage} account={account} loading={usageLoading} error={usageError} onRetry={loadUsage} />
  );
}
