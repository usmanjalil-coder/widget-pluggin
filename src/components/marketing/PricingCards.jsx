"use client";

import { dashboardFeatures, dashboardPrice, featureDisplay } from "@/lib/plan-display";
import { memo } from "react";
import { MarketingPricingCards } from "./MarketingPricingCards";
export { PricingComparison } from "./MarketingPricingCards";
import { Check, Minus } from "lucide-react";
import { Badge, Button } from "@/components/ui";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
function DashboardFeatureRow({ feature }) {
  const { text, enabled } = featureDisplay(feature);
  return (
    <div className="flex items-start gap-2 text-sm">
      {enabled ? (
        <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
      ) : (
        <Minus className="mt-0.5 size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
      )}
      <span className={enabled ? "text-foreground" : "text-muted-foreground"}>{text}</span>
    </div>
  );
}

function AdditionalFeatures({ features, dashboard = false }) {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="more">
        <AccordionTrigger
          className={
            dashboard
              ? "min-h-10 rounded-lg px-2 py-2 text-primary hover:bg-primary/5 hover:no-underline focus-visible:ring-2 focus-visible:ring-ring"
              : "py-2 text-primary hover:no-underline"
          }
        >
          View more ({features.length})
        </AccordionTrigger>
        <AccordionContent className="space-y-3 pt-2">
          {features.map((feature) => (
            <DashboardFeatureRow key={feature.key} feature={feature} />
          ))}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

function DashboardPlanCard({ plan, currentPlan, onSelectPlan, pending, highestPrice }) {
  const isCurrent = plan.key === currentPlan.key;
  const isDowngrade = plan.priceCents < currentPlan.priceCents;
  const isPaidDowngrade = isDowngrade && plan.priceCents > 0;
  const scheduled = currentPlan.pendingPlanChange?.planKey === plan.key;
  const paymentBlocked = ["past_due", "paused"].includes(currentPlan.subscriptionStatus);
  const cancellationBlocksDowngrade = currentPlan.cancelAtPeriodEnd && isPaidDowngrade;
  const features = dashboardFeatures(plan);
  const featured = features.slice(0, 6);
  const extra = features.slice(6);
  const price = dashboardPrice(plan);
  const action = isCurrent
    ? "Current plan"
    : plan.priceCents > currentPlan.priceCents
      ? "Upgrade"
      : isDowngrade
        ? "Downgrade"
        : "Change plan";
  const cardClassName =
    "flex min-w-0 flex-col rounded-xl border p-6 shadow-sm " +
    (isCurrent
      ? "border-primary bg-primary/5 ring-2 ring-primary"
      : highestPrice
        ? "border-primary/30 bg-card"
        : "border-border bg-card");

  return (
    <article className={cardClassName}>
      <div className="flex flex-wrap items-start justify-between gap-2">
        <h3 className="text-lg font-semibold">{plan.name}</h3>
        {isCurrent && (
          <Badge tone="info">
            <Check aria-hidden="true" />
            Current plan
          </Badge>
        )}
        {scheduled && !isCurrent && <Badge tone="warning">Scheduled</Badge>}
      </div>
      {plan.description && (
        <p className="mt-3 min-h-10 text-[13px] leading-relaxed text-muted-foreground">
          {plan.description}
        </p>
      )}
      {price && (
        <p className="mt-5 text-3xl font-semibold tracking-tight">
          {price}
          <span className="ml-1 text-sm font-normal text-muted-foreground">
            / {plan.billingInterval}
          </span>
        </p>
      )}
      <div className="mt-6 flex-1 space-y-3 border-t pt-5">
        {featured.map((feature) => (
          <DashboardFeatureRow key={feature.key} feature={feature} />
        ))}
        {extra.length > 0 && <AdditionalFeatures features={extra} dashboard />}
      </div>
      {isCurrent ? (
        <p className="mt-7 flex min-h-10 items-center justify-center gap-2 text-sm font-medium text-primary">
          <Check className="size-4" aria-hidden="true" />
          Your current plan
        </p>
      ) : scheduled ? (
        <p className="mt-7 flex min-h-10 items-center justify-center text-sm font-medium text-warning-foreground">
          Change scheduled
        </p>
      ) : paymentBlocked ? (
        <div className="mt-7 space-y-2 text-center">
          <Button type="button" className="min-h-10 w-full" disabled>
            {action}
          </Button>
          <p className="text-[13px] text-muted-foreground">
            Update your payment method to change plans.{" "}
            <a
              href="#payment-method"
              className="font-medium text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              Payment settings
            </a>
          </p>
        </div>
      ) : cancellationBlocksDowngrade ? (
        <p className="mt-7 flex min-h-10 items-center justify-center text-center text-[13px] text-muted-foreground">
          Keep your subscription to change plans.
        </p>
      ) : (
        <Button
          type="button"
          variant={action === "Upgrade" ? "primary" : "secondary"}
          title={
            !plan.canCheckout ? "Online checkout isn’t configured for this plan yet." : undefined
          }
          disabled={pending || !plan.canCheckout}
          onClick={() => onSelectPlan?.(plan)}
          className="mt-7 min-h-10 w-full"
        >
          {pending ? "Updating…" : plan.canCheckout ? action : "Not configured"}
        </Button>
      )}
    </article>
  );
}
export const PricingCards = memo(function PricingCards({
  mode,
  plans,
  currentPlan,
  onSelectPlan,
  pendingPlanKey,
}) {
  if (mode === "dashboard") {
    return (
      <div className="grid gap-4 lg:grid-cols-3">
        {plans.map((plan) => (
          <DashboardPlanCard
            key={plan.key}
            plan={plan}
            highestPrice={plan.priceCents === Math.max(...plans.map((item) => item.priceCents))}
            currentPlan={currentPlan}
            onSelectPlan={onSelectPlan}
            pending={pendingPlanKey === plan.key}
          />
        ))}
      </div>
    );
  }

  return <MarketingPricingCards plans={plans} />;
});
