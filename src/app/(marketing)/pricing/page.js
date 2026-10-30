import Link from "next/link";
import { FaqAccordion } from "@/components/marketing/FaqAccordion";
import MarketingPlans from "@/components/marketing/MarketingPlans";
import { buildMetadata, faqSchema } from "@/lib/seo";
import { billingFaq } from "@/content/faqs";
import { JsonLd } from "@/components/marketing/JsonLd";
import { Breadcrumbs } from "@/components/marketing/Breadcrumbs";

export const metadata = buildMetadata({
  title: "AI Chatbot Pricing: Free, Starter & Pro Plans",
  description:
    "Compare Tellvira AI chatbot pricing for Free, Starter and Pro plans. Explore monthly conversation limits, lead capture and features to find your website's fit.",
  path: "/pricing",
});

export default function PricingPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <JsonLd data={faqSchema(billingFaq)} />
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Pricing", path: "/pricing" },
        ]}
      />
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

      <section className="mt-10" aria-labelledby="plans-heading">
        <h2 id="plans-heading" className="text-2xl font-semibold">
          Monthly plans
        </h2>
        <MarketingPlans compare />
      </section>
      <p className="mt-8 text-center text-sm text-muted-foreground">
        Review our{" "}
        <Link className="font-medium text-primary underline-offset-4 hover:underline" href="/terms">
          Terms
        </Link>
        ,{" "}
        <Link
          className="font-medium text-primary underline-offset-4 hover:underline"
          href="/privacy"
        >
          Privacy Notice
        </Link>
        , and{" "}
        <Link
          className="font-medium text-primary underline-offset-4 hover:underline"
          href="/refunds"
        >
          Refund Policy
        </Link>
        .
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
