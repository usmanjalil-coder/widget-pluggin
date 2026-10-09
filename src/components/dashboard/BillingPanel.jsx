"use client";

import { Badge, Button, Card, EmptyState, Skeleton } from "@/components/ui";
import PageHeader from "@/components/shared/PageHeader";

export default function BillingPanel({ usage, loading, error, onRetry }) {
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
        body="We could not load your plan and usage from the account API."
        action={<Button onClick={onRetry}>Retry</Button>}
      />
    );
  }

  const used = usage.conversations ?? 0;
  const limit = usage.limit ?? 0;
  const percent = limit > 0 ? Math.min(100, (used / limit) * 100) : 0;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Usage & Billing"
        description="Your current plan and usage from your account."
      />
      <Card title="Current usage" subtitle="Conversations in the current billing period">
        <div className="flex items-end justify-between gap-4">
          <p className="text-2xl font-semibold">
            {used}{" "}
            <span className="text-sm font-normal text-muted-foreground">
              of {limit} conversations
            </span>
          </p>
          <Badge tone="info" className="capitalize">
            {usage.currentPlan || usage.plan || "Plan unavailable"}
          </Badge>
        </div>
        <div
          className="mt-5 h-2 overflow-hidden rounded-full bg-muted"
          role="progressbar"
          aria-valuenow={used}
          aria-valuemin={0}
          aria-valuemax={limit || 1}
          aria-label="Conversation usage"
        >
          <div className="h-full rounded-full bg-primary" style={{ width: `${percent}%` }} />
        </div>
      </Card>
      <div className="grid gap-4 sm:grid-cols-3">
        <Card title="Messages">
          <p className="text-2xl font-semibold">{usage.messages ?? 0}</p>
        </Card>
        <Card title="Leads">
          <p className="text-2xl font-semibold">{usage.leads ?? 0}</p>
        </Card>
        <Card title="Bots">
          <p className="text-2xl font-semibold">{usage.botCount ?? 0}</p>
        </Card>
      </div>
    </div>
  );
}
