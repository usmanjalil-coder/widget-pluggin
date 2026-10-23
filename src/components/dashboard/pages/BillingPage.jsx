"use client";

import { Fragment } from "react";
import { useQuery } from "@tanstack/react-query";
import { Badge, Button, Card, EmptyState, Skeleton } from "@/components/ui";
import PageHeader from "@/components/shared/PageHeader";
import { getBillingOverview } from "@/lib/api/billing.api";

function formatAmount(feature, amount) {
  if (feature.key === "storage_bytes") {
    const unit = amount >= 1024 ** 3 ? "GB" : "MB";
    const divisor = unit === "GB" ? 1024 ** 3 : 1024 ** 2;
    return `${(amount / divisor).toLocaleString(undefined, { maximumFractionDigits: 1 })} ${unit}`;
  }
  return Number(amount).toLocaleString();
}

function formatValue(feature) {
  if (feature.type === "boolean") return feature.value ? "Included" : "Not included";
  if (feature.type === "number") return feature.value === null ? "Unlimited" : formatAmount(feature, feature.value);
  return feature.value || "—";
}

function FeatureRow({ feature, showUsage = false }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-2 border-b py-3 last:border-0">
      <div>
        <p className="text-sm font-medium">{feature.name}</p>
        {feature.description && <p className="text-xs text-muted-foreground">{feature.description}</p>}
      </div>
      <div className="flex items-center gap-2 text-sm">
        {showUsage && feature.used !== null && (
          <span className="text-muted-foreground">
            {formatAmount(feature, feature.used)} used
            {feature.remaining !== null && ` · ${formatAmount(feature, feature.remaining)} left`}
          </span>
        )}
        {showUsage && feature.reached ? <Badge tone="danger">Limit reached</Badge>
          : showUsage && feature.warning ? <Badge tone="warning">Near limit</Badge> : null}
        <span className="font-semibold">{formatValue(feature)}</span>
      </div>
    </div>
  );
}

function FeatureList({ features, showUsage = false }) {
  let previousCategory = null;
  return features.map((feature) => {
    const category = feature.category !== previousCategory ? feature.category : null;
    previousCategory = feature.category;
    return (
      <Fragment key={feature.key}>
        {category && <h3 className="border-b pt-5 pb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground first:pt-0">{category}</h3>}
        <FeatureRow feature={feature} showUsage={showUsage} />
      </Fragment>
    );
  });
}

export default function BillingPage() {
  const query = useQuery({
    queryKey: ["billing", "overview"],
    queryFn: ({ signal }) => getBillingOverview(signal),
    staleTime: 30_000,
    retry: false,
  });

  if (query.isPending) {
    return <div className="space-y-4"><Skeleton className="h-20 rounded-xl" /><Skeleton className="h-72 rounded-xl" /></div>;
  }
  if (query.isError) {
    return <EmptyState title="Billing unavailable" body={query.error?.message || "Please try again."}
      action={<Button onClick={() => query.refetch()}>Retry</Button>} />;
  }

  const { currentPlan, availablePlans, period } = query.data;
  const price = (plan) => new Intl.NumberFormat("en-US", {
    style: "currency", currency: plan.currency,
  }).format(plan.priceCents / 100);

  return (
    <div className="space-y-6">
      <PageHeader title="Usage & Billing" description={`Plan entitlements and usage for ${period}.`} />
      <Card title={currentPlan.name} subtitle={`${price(currentPlan)} / ${currentPlan.billingInterval}`}>
        <div className="divide-y">
          <FeatureList features={currentPlan.features} showUsage />
        </div>
      </Card>
      <div>
        <h2 className="mb-2 text-lg font-semibold">Available plans</h2>
        <p className="mb-4 text-sm text-muted-foreground">Compare features before requesting a plan change.</p>
        <div className="grid gap-4 lg:grid-cols-2">
          {availablePlans.map((plan) => (
            <Card key={plan.key} title={plan.name} subtitle={`${price(plan)} / ${plan.billingInterval}`}>
              {plan.key === currentPlan.key && <Badge tone="success">Current plan</Badge>}
              {plan.description && <p className="mt-3 text-sm text-muted-foreground">{plan.description}</p>}
              <div className="mt-4 divide-y">
                <FeatureList features={plan.features} />
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
