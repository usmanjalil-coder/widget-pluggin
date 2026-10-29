import { MarketingAuthCta } from "./MarketingAuth";
import { Check, Minus } from "lucide-react";
import { dashboardFeatures, dashboardPrice, dashboardNumber, featureDisplay } from "@/lib/plan-display";
import { PlanFeatureDisclosure } from "./PlanFeatureDisclosure";

function PlanCard({ plan }) {
  const features = dashboardFeatures(plan);
  const featured = features.slice(0, 6);
  const extra = features.slice(6);
  const price = dashboardPrice(plan);

  return (
    <article
      data-plan-price={plan.priceCents}
      data-plan-currency={plan.currency}
      className="flex min-w-0 flex-col rounded-xl border border-border bg-card p-6 shadow-sm"
    >
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
        {extra.length > 0 && <PlanFeatureDisclosure count={extra.length}>{extra.map((feature) => <DashboardFeatureRow key={feature.key} feature={feature} />)}</PlanFeatureDisclosure>}
      </div>
      <MarketingAuthCta
        loggedOutHref={`/signup?plan=${encodeURIComponent(plan.key)}`}
        loggedInHref={`/dashboard/billing?plan=${encodeURIComponent(plan.key)}`}
        loggedOutLabel="Get started"
        loggedInLabel="Select plan"
        className="mt-7 inline-flex w-full items-center justify-center rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      />
    </article>
  );
}

export function MarketingPricingCards({ plans }) {
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

export function PricingComparison({ plans }) {
  const comparisonKeys = ["bots", "conversations", "messages_per_conversation"];
  const features = Array.from(
    new Map(
      plans.flatMap((plan) => plan.features || []).map((feature) => [feature.key, feature]),
    ).values(),
  ).filter((feature) => comparisonKeys.includes(feature.key));
  if (features.length === 0) return null;

  return (
    <section className="mt-20">
      <h2 className="text-2xl font-semibold text-foreground">Compare plan limits</h2>
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

