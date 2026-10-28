import Link from "next/link";
import { brand } from "@/lib/brand";

export const metadata = {
  title: "Refund Policy",
  description: `${brand.name}'s 30-day money-back policy for paid subscriptions.`,
};

export default function RefundsPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">Legal</p>
      <h1 className="mt-3 text-4xl font-semibold text-foreground">Refund Policy</h1>
      <p className="mt-4 text-sm text-muted-foreground">Last updated: October 28, 2026</p>
      <div className="mt-8 rounded-2xl border border-warning/20 bg-warning-bg p-5 text-sm leading-6 text-warning-foreground">
        <strong>Review required before launch.</strong> Confirm this policy and its 30-day guarantee
        with Paddle before accepting live payments.
      </div>

      <div className="mt-10 space-y-10 text-sm leading-7 text-foreground">
        <section>
          <h2 className="text-xl font-semibold">30-day money-back guarantee</h2>
          <p className="mt-3">
            If you are unhappy with a paid {brand.name} subscription, request a refund within 30
            calendar days of the charge. This applies to paid subscription charges, including
            renewals. Tell us which charge you want refunded and the email used at checkout.
            Nothing here limits any refund or withdrawal rights you have under applicable law.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold">How to request a refund</h2>
          <p className="mt-3">
            Paddle is the merchant of record for paid purchases and processes refunds. Submit a
            request through <a className="text-primary underline" href="https://paddle.net">Paddle buyer support</a>,
            use the support link in your receipt, or email{" "}
            <a className="text-primary underline" href="mailto:support@tellvira.com">
              support@tellvira.com
            </a>{" "}
            and we will help route the request. For billing questions, email{" "}
            <a className="text-primary underline" href="mailto:billing@tellvira.com">
              billing@tellvira.com
            </a>.
          </p>
          <p className="mt-3">
            Approved refunds are issued by Paddle to the original payment method where possible.
            Processing time depends on Paddle and your payment provider. Paddle&apos;s{" "}
            <a className="text-primary underline" href="https://www.paddle.com/legal/refund-policy">
              buyer refund policy
            </a>{" "}
            also applies.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold">Cancellation</h2>
          <p className="mt-3">
            You can cancel from the dashboard or Paddle&apos;s customer portal. Cancellation stops
            future renewals and takes effect at the end of the current paid period. Access continues
            until then. Canceling does not itself submit a refund request; please use one of the
            methods above if you want a refund. See the{" "}
            <Link className="text-primary underline" href="/terms">Terms of Service</Link> for more
            about subscriptions.
          </p>
        </section>
      </div>
    </main>
  );
}
