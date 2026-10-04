import Link from "next/link";
import { PricingCards } from "@/components/marketing/MarketingUI";
import { brand } from "@/lib/brand";

export const metadata = {
  title: "Pricing",
  description: `Simple pricing for ${brand.name}. Choose a plan for your website assistant.`,
};

export default function PricingPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-medium uppercase tracking-[0.16em] text-slate-500">
          Pricing
        </p>
        <h1 className="mt-3 text-4xl font-semibold text-slate-900">
          Choose a plan that fits your traffic
        </h1>
        <p className="mt-4 text-lg text-slate-600">
          Simple tiers with a clear monthly cap and no hidden fees.
        </p>
      </div>

      <div className="mt-10">
        <PricingCards />
      </div>

      <p className="mt-8 text-center text-sm text-slate-500">
        Need a custom setup for a larger site?{" "}
        <Link href="/contact" className="font-medium text-blue-600">
          Contact us
        </Link>
      </p>
    </main>
  );
}
