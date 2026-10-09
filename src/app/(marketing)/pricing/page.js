import Link from "next/link";
import { Check, Minus } from "lucide-react";
import { FaqAccordion, PricingCards } from "@/components/marketing/MarketingUI";
import { PLANS } from "@/lib/plans";
import { brand } from "@/lib/brand";

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
        <PricingCards />
      </div>

      <section className="mt-20">
        <h2 className="text-2xl font-semibold text-foreground">Compare plans</h2>
        <div className="mt-6 overflow-x-auto rounded-xl border border-border bg-card">
          <table className="w-full min-w-[620px] text-left text-sm">
            <thead className="border-b border-border bg-muted/30 text-xs uppercase tracking-wide text-muted-foreground">
              <tr>
                <th className="px-5 py-3 font-medium">Feature</th>
                {PLANS.map((plan) => (
                  <th key={plan.id} className="px-5 py-3 font-medium">
                    {plan.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ["Conversations / month", "50", "500", "2,000"],
                ["Bots", "1", "1", "3"],
                ["Powered-by badge", true, false, false],
                ["Lead capture + email alerts", true, true, true],
                ["Knowledge sources", true, true, true],
              ].map(([name, ...values]) => (
                <tr key={name} className="border-b border-border last:border-0">
                  <td className="px-5 py-3 text-foreground">{name}</td>
                  {values.map((value, index) => (
                    <td key={PLANS[index].id} className="px-5 py-3 text-muted-foreground">
                      {typeof value === "boolean" ? (
                        value ? (
                          <Check className="size-4 text-primary" aria-label="Included" />
                        ) : (
                          <Minus className="size-4" aria-label="Not included" />
                        )
                      ) : (
                        value
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <section className="mx-auto mt-20 max-w-4xl">
        <h2 className="text-center text-2xl font-semibold text-foreground">
          Frequently asked questions
        </h2>
        <div className="mt-6">
          <FaqAccordion />
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
