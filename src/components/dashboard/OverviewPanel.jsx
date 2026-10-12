"use client";

import Link from "next/link";
import { BarChart3, ChevronRight, MessageSquare, Users } from "lucide-react";
import { Button, Card } from "@/components/ui";
import PageHeader from "@/components/shared/PageHeader";

export default function OverviewPanel({
  usage,
  bots,
  botsLoading,
  botsError,
  usageError,
  loadUsage,
}) {
  const usageCount = usage?.conversations ?? 0;
  const usageLimit = usage?.limit ?? 0;
  const usagePercent = Math.min(100, (usageCount / Math.max(usageLimit, 1)) * 100);

  const metrics = [
    {
      label: "Conversations",
      value: usage?.conversations ?? "—",
      suffix: "this month",
      icon: MessageSquare,
      trend: "Across your bots",
    },
    {
      label: "Active bots",
      value:
        botsLoading || botsError ? "—" : bots.filter((item) => item.status === "active").length,
      suffix: "live",
      icon: BarChart3,
      trend: "Ready to answer",
    },
    {
      label: "Leads captured",
      value: usage?.leads ?? "—",
      suffix: "total",
      icon: Users,
      trend: "New contacts",
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Good to see you"
        description="Here is what happened across your workspace."
      />

      {usageError && (
        <Card>
          <p role="alert" className="text-sm text-destructive">
            {usageError}
          </p>
          <Button className="mt-4" onClick={loadUsage}>
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
        <Card title="Usage" subtitle="Current plan allowance">
          <div className="flex items-end justify-between">
            <span className="text-2xl font-semibold text-foreground">{usageCount}</span>
            <span className="text-sm text-muted-foreground">of {usageLimit} conversations</span>
          </div>
          <div className="mt-4 h-2 overflow-hidden rounded-full bg-muted">
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
