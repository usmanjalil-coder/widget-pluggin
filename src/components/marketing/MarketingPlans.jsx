import { MarketingPricingCards, PricingComparison } from "./MarketingPricingCards";
import { getMarketingPlans } from "@/lib/marketing-plans";
import { softwareSchema } from "@/lib/seo";
import { JsonLd } from "./JsonLd";

export default async function MarketingPlans({ compare = false }) {
  const plans = await getMarketingPlans();

  return (
    <>
      <JsonLd data={softwareSchema(plans)} />
      <MarketingPricingCards plans={plans} />
      {compare && <PricingComparison plans={plans} />}
    </>
  );
}
