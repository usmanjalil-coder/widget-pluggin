"use client";

import OverviewPanel from "../OverviewPanel";
import { useDashboard } from "../dashboard-context";

export default function OverviewPage() {
  const { usage, bots, botsLoading, botsError, usageError, loadUsage } = useDashboard();
  return <OverviewPanel {...{ usage, bots, botsLoading, botsError, usageError, loadUsage }} />;
}
