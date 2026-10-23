"use client";

import { useQuery } from "@tanstack/react-query";
import { AlertTriangle, CreditCard, FileText } from "lucide-react";
import { Badge, Button, Card, EmptyState, Skeleton } from "@/components/ui";
import PageHeader from "@/components/shared/PageHeader";
import { PricingCards, AvailableSoonButton } from "@/components/marketing/PricingCards";
import { getBillingOverview } from "@/lib/api/billing.api";

const number = new Intl.NumberFormat("en-US");

function feature(plan, key) {
  return plan?.features?.find((item) => item.key === key);
}

function numericFeature(plan, key) {
  const item = feature(plan, key);
  return typeof item?.value === "number" && Number.isFinite(item.value) ? item : null;
}

function price(plan) {
  if (typeof plan?.priceCents !== "number" || !plan.currency) return null;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: plan.currency,
    maximumFractionDigits: 0,
  }).format(plan.priceCents / 100);
}

function periodLabel(period) {
  if (!/^\d{4}-(0[1-9]|1[0-2])$/.test(period || "")) return null;
  const [year, month] = period.split("-").map(Number);
  return new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric", timeZone: "UTC" })
    .format(new Date(Date.UTC(year, month - 1, 1)));
}

function UsageMeter({ item }) {
  if (!item || typeof item.used !== "number") return null;
  const percent = item.value > 0 ? Math.min(100, (item.used / item.value) * 100) : 100;
  const reached = item.used >= item.value;
  const high = percent >= 80;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-end justify-between gap-2">
        <div>
          <p className="text-[13px] font-medium text-muted-foreground">Conversations this month</p>
          <p className="mt-1 text-3xl font-semibold tracking-tight sm:text-4xl">
            {number.format(item.used)} <span className="text-lg font-normal text-muted-foreground">of {number.format(item.value)} conversations</span>
          </p>
        </div>
        <p className="text-sm font-medium text-muted-foreground">
          {number.format(Math.max(0, item.value - item.used))} left this month
        </p>
      </div>
      <div
        role="progressbar"
        aria-label="Monthly conversation usage"
        aria-valuemin={0}
        aria-valuemax={item.value}
        aria-valuenow={Math.min(item.used, item.value)}
        aria-valuetext={`${number.format(item.used)} of ${number.format(item.value)} conversations`}
        className="h-2.5 overflow-hidden rounded-full bg-muted"
      >
        <div
          className={`h-full rounded-full transition-[width] motion-reduce:transition-none ${reached ? "bg-destructive" : high ? "bg-warning" : "bg-primary"}`}
          style={{ width: `${percent}%` }}
        />
      </div>
      {high && (
        <div
          role="status"
          className={`flex flex-wrap items-center justify-between gap-3 rounded-xl border p-4 text-sm ${reached ? "border-destructive/25 bg-destructive-bg text-destructive" : "border-warning/25 bg-warning-bg text-warning-foreground"}`}
        >
          <span className="flex items-start gap-2">
            <AlertTriangle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
            {reached
              ? "Limit reached. New visitors will see an unavailable message."
              : "You are approaching your monthly conversation limit."}
          </span>
          <AvailableSoonButton label="Upgrade" />
        </div>
      )}
    </div>
  );
}

function CurrentPlan({ plan, period }) {
  const conversations = numericFeature(plan, "conversations");
  const bots = numericFeature(plan, "bots");
  const messages = numericFeature(plan, "messages_per_conversation");
  const branding = feature(plan, "remove_branding");
  const planPrice = price(plan);

  return (
    <Card className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-lg font-semibold">{plan.name}</h2>
            <Badge tone="info">Current plan</Badge>
          </div>
          {planPrice && <p className="text-sm text-muted-foreground">{planPrice} / {plan.billingInterval}</p>}
        </div>
        {periodLabel(period) && <span className="text-[13px] text-muted-foreground">{periodLabel(period)}</span>}
      </div>

      {conversations ? <UsageMeter item={conversations} /> : (
        <p className="text-sm text-muted-foreground">Conversation usage is not available yet.</p>
      )}

      <div className="grid gap-4 border-t pt-5 sm:grid-cols-3">
        {bots && typeof bots.used === "number" && (
          <div>
            <p className="text-[13px] text-muted-foreground">Bots</p>
            <p className="mt-1 text-base font-semibold">{number.format(bots.used)} of {number.format(bots.value)}</p>
            {bots.used > bots.value && (
              <p className="mt-2 text-[13px] font-medium text-destructive">
                You have more bots than this plan allows.
              </p>
            )}
          </div>
        )}
        {messages && (
          <div>
            <p className="text-[13px] text-muted-foreground">Max messages per conversation</p>
            <p className="mt-1 text-base font-semibold">{number.format(messages.value)}</p>
          </div>
        )}
        {typeof branding?.value === "boolean" && (
          <div>
            <p className="text-[13px] text-muted-foreground">Powered-by badge</p>
            <p className="mt-1 text-base font-semibold">{branding.value ? "Removed" : "Shown"}</p>
          </div>
        )}
      </div>
    </Card>
  );
}

function BillingSkeleton() {
  return (
    <div className="mx-auto max-w-5xl space-y-6" aria-label="Loading billing information">
      <Skeleton className="h-16 rounded-xl" />
      <Skeleton className="h-72 rounded-xl" />
      <div className="grid gap-4 lg:grid-cols-3">
        {[0, 1, 2].map((item) => <Skeleton key={item} className="h-72 rounded-xl" />)}
      </div>
    </div>
  );
}

export default function BillingPage() {
  const query = useQuery({
    queryKey: ["billing", "overview"],
    queryFn: ({ signal }) => getBillingOverview(signal),
    staleTime: 30_000,
    retry: false,
  });

  if (query.isPending) return <BillingSkeleton />;
  if (query.isError) {
    return (
      <div className="mx-auto max-w-5xl space-y-6">
        <PageHeader title="Usage & Billing" description="Your plan and conversation usage this month." />
        <EmptyState
          title="Billing unavailable"
          body={query.error?.message || "Please try again."}
          action={<Button type="button" onClick={() => query.refetch()} disabled={query.isFetching}>
            {query.isFetching ? "Retrying..." : "Retry"}
          </Button>}
        />
      </div>
    );
  }

  const { currentPlan, availablePlans = [], period } = query.data || {};
  if (!currentPlan) {
    return (
      <div className="mx-auto max-w-5xl space-y-6">
        <PageHeader title="Usage & Billing" description="Your plan and conversation usage this month." />
        <EmptyState title="No plan details yet" body="Your billing information is not available right now." />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <PageHeader
        title="Usage & Billing"
        description="Your plan and conversation usage this month."
        actions={query.isFetching ? <span role="status" className="text-[13px] text-muted-foreground">Refreshing...</span> : null}
      />
      <CurrentPlan plan={currentPlan} period={period} />

      <section aria-labelledby="plans-heading" className="space-y-4">
        <div>
          <h2 id="plans-heading" className="text-base font-semibold">Plans</h2>
          <p className="mt-1 text-[13px] text-muted-foreground">Choose the coverage that fits your visitors.</p>
        </div>
        {availablePlans.length ? (
          <PricingCards mode="dashboard" plans={availablePlans} currentPlan={currentPlan} />
        ) : (
          <EmptyState title="No plans available" body="Available plans will appear here when published." />
        )}
      </section>

      <section aria-labelledby="billing-heading" className="space-y-4">
        <h2 id="billing-heading" className="text-base font-semibold">Billing</h2>
        <div className="grid gap-4 lg:grid-cols-2">
          <Card>
            <div className="mb-5 flex items-center gap-2">
              <CreditCard className="size-4 text-primary" aria-hidden="true" />
              <h3 className="text-base font-semibold">Payment method</h3>
            </div>
            <EmptyState title="No payment method yet" />
            <Button type="button" variant="secondary" disabled className="mt-4 w-full">Add payment method</Button>
          </Card>
          <Card>
            <div className="mb-5 flex items-center gap-2">
              <FileText className="size-4 text-primary" aria-hidden="true" />
              <h3 className="text-base font-semibold">Invoices</h3>
            </div>
            <EmptyState title="No invoices yet" />
          </Card>
        </div>
      </section>
    </div>
  );
}
