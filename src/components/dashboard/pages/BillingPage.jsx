"use client";

import BillingPanel from "../BillingPanel";
import { useDashboard } from "../dashboard-context";
export default function BillingPage() {
  const { usage, usageLoading, usageError, loadUsage } = useDashboard();
  return (
    <BillingPanel usage={usage} loading={usageLoading} error={usageError} onRetry={loadUsage} />
  );
}
