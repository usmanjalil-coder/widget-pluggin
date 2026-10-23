"use client";

import Link from "next/link";
import { BarChart3, ChevronRight, MessageSquare, Users } from "lucide-react";
import { Button, Card, Skeleton } from "@/components/ui";
import PageHeader from "@/components/shared/PageHeader";

export default function OverviewPanel({
  usage,
  account,
  loading,
  error,
  onRetry,
}) {
  const usagePercent = usage?.percent;
  const metricValue = (value) => (loading || error ? "—" : (value ?? 0));

  const metrics = [
    {
      label: "Conversations",
      value: metricValue(account?.total_conversations),
      suffix: "total",
      icon: MessageSquare,
      trend: "Across your bots",
    },
    {
      label: "Total bots",
      value: metricValue(account?.total_bots),
      suffix: "created",
      icon: BarChart3,
      trend: "Ready to answer",
    },
    {
      label: "Leads captured",
      value: metricValue(account?.total_leads),
      suffix: "total",
      icon: Users,
      trend: "New contacts",
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Good to see you"
        description="Here is what happened across your bots."
      />

      {error && (
        <Card>
          <p role="alert" className="text-sm text-destructive">
            {error}
          </p>
          <Button className="mt-4" onClick={onRetry}>
            Retry
          </Button>
        </Card>
      )}
      <div className="grid grid-cols-2 gap-3 sm:gap-6 xl:grid-cols-3">
        {metrics.map((metric) => (
          <Card key={metric.label} className="min-w-0 p-4 shadow-sm sm:p-6">
            <span className="mb-3 flex size-9 items-center justify-center rounded-xl bg-accent text-primary sm:mb-4 sm:size-10">
              <metric.icon className="size-4 sm:size-5" />
            </span>
            <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
              {metric.label}
            </p>
            <div className="mt-3 flex items-end justify-between gap-2">
              <span className="text-2xl font-semibold text-foreground sm:text-3xl">
                {metric.value}
              </span>
              <span className="text-xs text-muted-foreground">{metric.suffix}</span>
            </div>
            <p className="mt-3 text-xs text-muted-foreground">{metric.trend}</p>
          </Card>
        ))}
      </div>

      <div className="grid gap-6">
        <Card title="Usage" subtitle="Current plan allowance" aria-busy={loading}>
          {loading ? (
            <div role="status" className="space-y-4">
              <div className="flex items-end justify-between gap-4">
                <Skeleton className="h-8 w-16 motion-reduce:animate-none" />
                <span className="text-sm text-muted-foreground">Loading usage...</span>
              </div>
              <Skeleton className="h-2 w-full rounded-full motion-reduce:animate-none" />
            </div>
          ) : error ? (
            <p className="text-sm text-muted-foreground">Usage unavailable. Please retry above.</p>
          ) : (
            <>
          <div className="flex items-end justify-between">
            <span className="text-2xl font-semibold text-foreground">
              {Math.round(usagePercent)}%
            </span>
            <span className="text-sm text-muted-foreground">
              of monthly conversations used
            </span>
          </div>
          <div
            className="mt-4 h-2 overflow-hidden rounded-full bg-muted"
            role="progressbar"
            aria-label="Monthly conversation usage"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={usagePercent}
          >
            <div
              className={`h-full rounded-full ${usagePercent >= 100 ? "bg-destructive" : usagePercent >= 80 ? "bg-warning" : "bg-primary"}`}
              style={{
                width: `${usagePercent}%`,
              }}
            />
          </div>
          {usagePercent >= 80 && (
            <p
              className={`mt-2 text-xs ${usagePercent >= 100 ? "text-destructive" : "text-warning-foreground"}`}
            >
              {usagePercent >= 100 ? "Plan limit reached" : "Approaching your plan limit"}
            </p>
          )}
            </>
          )}
          <Link
            prefetch={false}
            href="/dashboard/billing"
            className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary"
          >
            View usage <ChevronRight className="size-4" />
          </Link>
        </Card>
      </div>
    </div>
  );
}
