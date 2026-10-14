"use client";

import { Button, Card, EmptyState, Skeleton } from "@/components/ui";
import PageHeader from "@/components/shared/PageHeader";

export default function BillingPanel({ usage, account, loading, error, onRetry }) {
  if (loading && !usage) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-20 rounded-xl" />
        <Skeleton className="h-48 rounded-xl" />
      </div>
    );
  }

  if (error && !usage) {
    return (
      <Card>
        <p className="text-sm text-destructive">{error}</p>
        <Button className="mt-4" onClick={onRetry}>
          Retry
        </Button>
      </Card>
    );
  }

  if (!usage) {
    return (
      <EmptyState
        title="Usage unavailable"
        body="We could not load your conversation usage."
        action={<Button onClick={onRetry}>Retry</Button>}
      />
    );
  }

  const percent = usage.percent;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Usage & Billing"
        description="Your conversation usage this month."
      />
      <Card title="Current usage" subtitle="Conversations in the current billing period">
        <div className="flex items-end justify-between gap-4">
          <p className="text-2xl font-semibold">
            {percent}%{" "}
            <span className="text-sm font-normal text-muted-foreground">
              of monthly conversations used
            </span>
          </p>
        </div>
        <div
          className="mt-5 h-2 overflow-hidden rounded-full bg-muted"
          role="progressbar"
          aria-valuenow={percent}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Conversation usage"
        >
          <div className="h-full rounded-full bg-primary" style={{ width: `${percent}%` }} />
        </div>
      </Card>
      <div className="grid gap-4 sm:grid-cols-3">
        <Card title="Total conversations">
          <p className="text-2xl font-semibold">{account.total_conversations}</p>
        </Card>
        <Card title="Leads">
          <p className="text-2xl font-semibold">{account.total_leads}</p>
        </Card>
        <Card title="Bots">
          <p className="text-2xl font-semibold">{account.total_bots}</p>
        </Card>
      </div>
    </div>
  );
}
