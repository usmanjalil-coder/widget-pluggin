"use client";

import OverviewPanel from "../OverviewPanel";
import { useDashboard } from "../dashboard-context";

export default function OverviewPage() {
  const { usage, account, accountLoading, accountError, loadAccount } = useDashboard();

  return (
    <OverviewPanel
      usage={usage}
      account={account}
      loading={accountLoading}
      error={accountError}
      onRetry={loadAccount}
    />
  );
}
