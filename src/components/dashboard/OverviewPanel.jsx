"use client";

import { Button, Card } from "@/components/ui";
import PageHeader from "@/components/shared/PageHeader";
import {
  GetStartedChecklist,
  OverviewSkeleton,
  overviewMetrics,
  StatCard,
  UsageCard,
  WorkspaceLinks,
} from "./OverviewCards";

export default function OverviewPanel({
  usage,
  account,
  loading,
  error,
  onRetry,
  billing,
  billingLoading,
  billingError,
  selectedBotId,
}) {
  if (loading) return <OverviewSkeleton />;

  const counts = overviewMetrics.map((metric) => ({
    ...metric,
    value: Number(account?.[metric.key] ?? 0),
  }));
  const firstRun = !error && counts[0].value === 0 && counts[2].value === 0;

  return (
    <section aria-label="Overview" className="space-y-8">
      <PageHeader title="Welcome back" description="Your activity and usage across all bots." />
      {error && (
        <Card>
          <p role="alert" className="text-sm text-destructive">
            {error}
          </p>
          <Button type="button" className="mt-4 min-h-10" onClick={onRetry}>
            Retry
          </Button>
        </Card>
      )}
      {!error && (
        <>
          <div className="grid gap-4 md:grid-cols-3" aria-label="Account statistics">
            {counts.map((metric) => (
              <StatCard
                key={metric.key}
                label={metric.label}
                value={metric.value}
                icon={metric.icon}
                href={metric.href}
                helper={metric.value === 0 ? metric.zero : metric.helper}
              />
            ))}
          </div>
          <div className="grid items-start gap-6 lg:grid-cols-2">
            <UsageCard
              billing={billing}
              billingLoading={billingLoading}
              billingError={billingError}
              usagePercent={usage?.percent}
            />
            {firstRun ? (
              <GetStartedChecklist botCount={counts[1].value} botId={selectedBotId} />
            ) : (
              <WorkspaceLinks />
            )}
          </div>
        </>
      )}
    </section>
  );
}
