import Link from "next/link";
import { FaqAccordion } from "@/components/marketing/MarketingUI";
import MarketingPlans from "@/components/marketing/MarketingPlans";
import { brand } from "@/lib/brand";

const billingFaq = [
  [
    "How does billing work?",
    "Paid plans are billed monthly. Paddle handles payments and taxes as Merchant of Record; applicable taxes may be added at checkout depending on your location.",
  ],
  [
    "Can I cancel anytime?",
    "Yes. Cancel anytime from the dashboard or Paddle portal. Your paid access continues until the end of the current billing period.",
  ],
  [
    "What happens when I change plans?",
    "Upgrades take effect immediately with a prorated charge. Downgrades are scheduled for the end of the current billing period.",
  ],
  [
    "Is there a money-back guarantee?",
    "Yes. Request a refund within 30 days of a paid subscription charge. See the Refund Policy for how to contact Paddle or our support team.",
  ],
];

export const metadata = {
  title: "Pricing",
  description: `Simple pricing for ${brand.name}. Choose a plan for your website assistant.`,
};

export default function PricingPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-medium uppercase tracking-[0.16em] text-muted-foreground">
          Pricing
        </p>
        <h1 className="mt-3 text-4xl font-semibold text-foreground">
          Choose a plan that fits your traffic
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Simple tiers with a clear monthly cap and no hidden fees.
        </p>
      </div>

      <div className="mt-10">
        <MarketingPlans compare />
      </div>
      <p className="mt-8 text-center text-sm text-muted-foreground">
        Review our <Link className="font-medium text-primary underline-offset-4 hover:underline" href="/terms">Terms</Link>,{" "}
        <Link className="font-medium text-primary underline-offset-4 hover:underline" href="/privacy">Privacy Notice</Link>, and{" "}
        <Link className="font-medium text-primary underline-offset-4 hover:underline" href="/refunds">Refund Policy</Link>.
      </p>
      <section className="mx-auto mt-20 max-w-4xl">
        <h2 className="text-center text-2xl font-semibold text-foreground">
          Frequently asked questions
        </h2>
        <div className="mt-6">
          <FaqAccordion items={billingFaq} />
        </div>
      </section>
      <p className="mt-8 text-center text-sm text-muted-foreground">
        Need a custom setup for a larger site?{" "}
        <Link href="/contact" className="font-medium text-primary">
          Contact us
        </Link>
      </p>
    </main>
  );
}
