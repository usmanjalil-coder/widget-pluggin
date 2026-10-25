"use client";

import Link from "next/link";
import { memo } from "react";
import { Check, Minus } from "lucide-react";
import { Badge, Button } from "@/components/ui";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
const PlanCard = memo(function PlanCard({ plan }) {
  const features = dashboardFeatures(plan);
  const featured = features.slice(0, 6);
  const extra = features.slice(6);
  const price = dashboardPrice(plan);

  return (
    <article className="flex min-w-0 flex-col rounded-xl border border-border bg-card p-6 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-xl font-semibold text-foreground">{plan.name}</h3>
      </div>
      {plan.description && (
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{plan.description}</p>
      )}
      <div className="mt-5 flex flex-wrap items-end gap-2">
        {price && <span className="text-4xl font-semibold text-foreground">{price}</span>}
        {plan.billingInterval && (
          <span className="pb-1 text-sm text-muted-foreground">/ {plan.billingInterval}</span>
        )}
      </div>
      <div className="mt-6 flex-1 space-y-3 border-t pt-5">
        {featured.map((feature) => (
          <DashboardFeatureRow key={feature.key} feature={feature} />
        ))}
        {extra.length > 0 && <AdditionalFeatures features={extra} />}
      </div>
      <Link
        href={`/signup?plan=${encodeURIComponent(plan.key)}`}
        className="mt-7 inline-flex w-full items-center justify-center rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        Get started
      </Link>
    </article>
  );
});

const MarketingPricingCards = memo(function MarketingPricingCards({ plans }) {
  return (
    <>
      <div className="mt-8 grid gap-4 lg:grid-cols-3 lg:gap-5">
        {plans.map((plan) => (
          <PlanCard key={plan.key} plan={plan} />
        ))}
      </div>
      <p className="mt-6 text-center text-sm text-muted-foreground">
        A conversation is one visitor chat session, however many messages it has.
      </p>
    </>
  );
});

const dashboardNumber = new Intl.NumberFormat("en-US");

const featuredKeys = [
  "conversations",
  "bots",
  "messages_per_conversation",
  "domains",
  "remove_branding",
  "lead_capture",
  "website_crawling",
];

function dashboardFeatures(plan) {
  const features = Array.isArray(plan.features) ? plan.features : [];
  const priority = featuredKeys
    .map((key) => features.find((feature) => feature.key === key))
    .filter(Boolean);
  const remaining = features.filter((feature) => !priority.includes(feature));

  return [...priority, ...remaining];
}

function featureDisplay(feature) {
  if (feature.key === "remove_branding" && typeof feature.value === "boolean") {
    return {
      text: feature.value ? "Powered-by badge removed" : "Powered-by badge shown",
      enabled: true,
    };
  }
  if (feature.type === "boolean") {
    return {
      text: feature.value ? feature.name : `${feature.name} unavailable`,
      enabled: feature.value === true,
    };
  }
  if (feature.type === "number") {
    if (feature.value === null) {
      return { text: `${feature.name}: No set limit`, enabled: true };
    }
    if (typeof feature.value === "number") {
      const count = dashboardNumber.format(feature.value);
      const text = {
        conversations: `${count} conversations / month`,
        bots: `${count} ${feature.value === 1 ? "bot" : "bots"}`,
        messages_per_conversation: `${count} messages / conversation`,
        domains: `${count} allowed ${feature.value === 1 ? "domain" : "domains"}`,
      }[feature.key];
      return { text: text || `${feature.name}: ${count}`, enabled: true };
    }
  }
  return {
    text: feature.value ? `${feature.name}: ${feature.value}` : `${feature.name}: Not configured`,
    enabled: Boolean(feature.value),
  };
}

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

function dashboardPrice(plan) {
  if (typeof plan.priceCents !== "number" || !plan.currency) return null;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: plan.currency,
    maximumFractionDigits: 0,
  }).format(plan.priceCents / 100);
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

export function PricingComparison({ plans }) {
  const features = Array.from(
    new Map(
      plans.flatMap((plan) => plan.features || []).map((feature) => [feature.key, feature]),
    ).values(),
  );
  if (features.length === 0) return null;

  return (
    <section className="mt-20">
      <h2 className="text-2xl font-semibold text-foreground">Compare plans</h2>
      <div className="mt-6 overflow-x-auto rounded-xl border border-border bg-card">
        <table className="w-full min-w-[620px] text-left text-sm">
          <thead className="border-b bg-muted/30">
            <tr>
              <th scope="col" className="px-5 py-3">
                Feature
              </th>
              {plans.map((plan) => (
                <th scope="col" key={plan.key} className="px-5 py-3">
                  {plan.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {features.map((feature) => (
              <tr key={feature.key} className="border-b last:border-0">
                <th
                  scope="row"
                  className="px-5 py-3 text-left font-medium normal-case tracking-normal text-foreground"
                >
                  {feature.key === "remove_branding" ? "Powered-by badge" : feature.name}
                </th>
                {plans.map((plan) => {
                  const entry = plan.features?.find((item) => item.key === feature.key);
                  return (
                    <td key={plan.key} className="px-5 py-3 text-muted-foreground">
                      {entry?.key === "remove_branding" ? (
                        entry.value ? (
                          "Removed"
                        ) : (
                          "Shown"
                        )
                      ) : entry?.type === "boolean" ? (
                        entry.value ? (
                          <Check className="size-4 text-primary" aria-label="Available" />
                        ) : (
                          <Minus className="size-4" aria-label="Unavailable" />
                        )
                      ) : entry?.type === "number" ? (
                        entry.value === null ? (
                          "No set limit"
                        ) : (
                          dashboardNumber.format(entry.value)
                        )
                      ) : (
                        entry?.value || "Not configured"
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function DashboardPlanCard({ plan, currentPlan, onSelectPlan, pending, highestPrice }) {
  const isCurrent = plan.key === currentPlan.key;
  const features = dashboardFeatures(plan);
  const featured = features.slice(0, 6);
  const extra = features.slice(6);
  const price = dashboardPrice(plan);
  const action = isCurrent
    ? "Current plan"
    : plan.priceCents > currentPlan.priceCents
      ? "Upgrade"
      : plan.priceCents < currentPlan.priceCents
        ? "Downgrade"
        : "Change plan";

  return (
    <article
      className={`flex min-w-0 flex-col rounded-xl border p-6 shadow-sm ${isCurrent ? "border-primary bg-primary/5 ring-2 ring-primary" : highestPrice ? "border-primary/30 bg-card" : "border-border bg-card"}`}
    >
      <div className="flex flex-wrap items-start justify-between gap-2">
        <h3 className="text-lg font-semibold">{plan.name}</h3>
        {isCurrent && (
          <Badge tone="info">
            <Check aria-hidden="true" />
            Current plan
          </Badge>
        )}
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
          {pending ? "Opening checkout…" : plan.canCheckout ? action : "Not configured"}
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
