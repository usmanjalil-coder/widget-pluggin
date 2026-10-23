import { EmptyState } from "@/components/ui";
import { PricingCards, PricingComparison } from "@/components/marketing/PricingCards";
import { getPublicPlans } from "@/lib/api/public-plans.api";

export default async function MarketingPlans({ compare = false }) {
  let plans;
  try {
    plans = await getPublicPlans();
  } catch {
    return (
      <EmptyState
        title="Pricing is temporarily unavailable"
        body="Please try again shortly."
      />
    );
  }

  if (plans.length === 0) {
    return <EmptyState title="No plans available" body="Please check back soon." />;
  }

  return (
    <>
      <PricingCards mode="marketing" plans={plans} />
      {compare && <PricingComparison plans={plans} />}
    </>
  );
}
