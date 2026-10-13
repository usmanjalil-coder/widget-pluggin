"use client";

import Link from "next/link";
import { memo, useCallback, useMemo, useState } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui";
import { PLANS, YEARLY_DISCOUNT_LABEL, formatPrice } from "@/lib/plans";

const PlanCard = memo(function PlanCard({ plan, billingMode }) {
  return (
    <div
      className={`flex min-h-[420px] flex-col rounded-xl border p-6 shadow-sm ${plan.highlight ? "border-primary bg-accent" : "border-border bg-card"}`}
    >
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-xl font-semibold text-foreground">{plan.name}</h3>
        {plan.id === "starter" && (
          <span className="rounded-full bg-primary px-2.5 py-1 text-xs font-medium text-primary-foreground">
            Most popular
          </span>
        )}
      </div>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{plan.description}</p>
      <div className="mt-5 flex items-end gap-2">
        <span className="text-4xl font-semibold text-foreground">
          {plan.monthlyPrice === 0 ? "$0" : formatPrice(plan.activePrice)}
        </span>
        {plan.monthlyPrice > 0 && <span className="pb-1 text-sm text-muted-foreground">/month</span>}
      </div>
      {billingMode === "yearly" && plan.monthlyPrice > 0 && (
        <p className="mt-2 text-xs font-medium text-success-foreground">
          {YEARLY_DISCOUNT_LABEL}
        </p>
      )}
      <div className="mt-6 space-y-3 text-sm text-foreground">
        {plan.features.map((feature) => (
          <p key={feature} className="flex gap-2">
            <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
            {feature}
          </p>
        ))}
      </div>
      <Link
        href={`/signup?plan=${plan.id}`}
        className={`mt-auto inline-flex w-full items-center justify-center rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${plan.highlight ? "bg-primary text-primary-foreground hover:bg-primary/90" : "border border-border bg-card text-foreground hover:bg-muted"}`}
      >
        {plan.id === "free" ? "Get started free" : "Get started"}
      </Link>
    </div>
  );
});

export const PricingCards = memo(function PricingCards({ defaultBillingMode = "monthly" }) {
  const [billingMode, setBillingMode] = useState(defaultBillingMode);
  const selectMonthly = useCallback(() => setBillingMode("monthly"), []);
  const selectYearly = useCallback(() => setBillingMode("yearly"), []);
  const pricingOptions = useMemo(
    () =>
      PLANS.map((plan) => ({
        ...plan,
        activePrice: billingMode === "yearly" ? plan.yearlyPrice : plan.monthlyPrice,
        features: [
          `${new Intl.NumberFormat("en-US").format(plan.conversations)} conversations / month`,
          `${plan.bots} bot${plan.bots > 1 ? "s" : ""}`,
          plan.id === "free" ? "Powered-by badge" : "No badge on the widget",
          "Lead capture + email alerts",
          "Knowledge sources",
        ],
      })),
    [billingMode],
  );

  return (
    <>
      <div className="mt-8 flex justify-center">
        <div className="inline-flex rounded-full border border-border bg-card p-1">
          <Button
            variant="ghost"
            type="button"
            onClick={selectMonthly}
            className={`rounded-full px-4 py-2 text-sm font-medium ${billingMode === "monthly" ? "bg-foreground text-primary-foreground" : "text-foreground"}`}
          >
            Monthly
          </Button>
          <Button
            variant="ghost"
            type="button"
            onClick={selectYearly}
            className={`rounded-full px-4 py-2 text-sm font-medium ${billingMode === "yearly" ? "bg-foreground text-primary-foreground" : "text-foreground"}`}
          >
            Yearly
          </Button>
        </div>
      </div>

      <div className="mt-10 grid gap-4 lg:grid-cols-3 lg:gap-5">
        {pricingOptions.map((plan) => (
          <PlanCard key={plan.id} plan={plan} billingMode={billingMode} />
        ))}
      </div>
      <p className="mt-6 text-center text-sm text-muted-foreground">
        A conversation is one visitor chat session, however many messages it has.
      </p>
    </>
  );
});
