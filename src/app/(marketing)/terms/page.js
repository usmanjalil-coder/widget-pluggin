import { buildMetadata } from "@/lib/seo";
import Link from "next/link";
import { brand } from "@/lib/brand";

export const metadata = buildMetadata({
  title: "AI Chatbot Terms of Service & Account Rules",
  description:
    "Read Tellvira's AI chatbot terms of service covering account responsibilities, content ownership, billing, cancellation and use of the website assistant.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">Legal</p>
      <h1 className="mt-3 text-4xl font-semibold text-foreground">Terms of Service</h1>
      <p className="mt-4 text-sm text-muted-foreground">Last updated: October 28, 2026</p>
      <div className="mt-8 rounded-2xl border border-warning/20 bg-warning-bg p-5 text-sm leading-6 text-warning-foreground">
        For privacy questions or data requests, contact legal@tellvira.com.
      </div>
      <div className="mt-10 space-y-10 text-sm leading-7 text-foreground">
        <section>
          <h2 className="text-xl font-semibold">Operator and service</h2>
          <p className="mt-3">
            Usman Jaleel, a sole proprietor in Pakistan operating as {brand.name},
            provides an embeddable AI assistant for websites. Customers configure bots, supply
            knowledge content, receive conversations and leads, and manage usage through a
            dashboard. You must have authority to use the content, domains, and contact information
            you provide.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold">Accounts and acceptable use</h2>
          <p className="mt-3">
            Keep account credentials secure and use the service lawfully. Do not submit unlawful
            content, attempt unauthorized access, abuse service limits, or use a bot to mislead
            visitors. You are responsible for your bot configuration, the information you upload,
            and notices or consent required on your website. Tellvira is intended for business
            websites and is not directed at children under 18.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold">Intellectual property and your content</h2>
          <p className="mt-3">
            {brand.name} owns the service, including its software and design. You keep your rights
            to content you provide. You give us a limited license to store and process that content
            only to provide and support the service. You may not copy, resell, or reverse engineer
            the service, except where the law expressly allows it.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold">AI responses and health information</h2>
          <p className="mt-3">
            AI responses may be incomplete or inaccurate. Review bot content and do not rely on it
            for professional, medical, emergency, or legal decisions. The service is not intended to
            receive protected health information or patient records. We do not offer a HIPAA
            Business Associate Agreement. Configure your bot so visitors do not submit health
            details.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold">Plans, payments, and cancellation</h2>
          <p className="mt-3">
            The plan and price shown at checkout govern your purchase. Paid subscriptions renew for
            the selected billing period until canceled.{" "}
            <strong>Paddle is the merchant of record</strong> for paid purchases and handles
            checkout, payment processing, taxes, receipts, and eligible refunds. Paddle&apos;s buyer
            terms also apply to the transaction.
          </p>
          <p className="mt-3">
            Our order process is conducted by our online reseller Paddle.com. Paddle.com is the
            Merchant of Record for all our orders.
          </p>
          <p className="mt-3">
            You can cancel from the dashboard or Paddle&apos;s customer portal. Cancellation takes
            effect at the end of the current paid period, and access continues until then. Paid plan
            upgrades may take effect immediately with a prorated charge. Paid plan downgrades are
            currently scheduled for the end of the billing period. Any charge or credit is shown
            before you confirm a plan change.
          </p>
          <p className="mt-3">
            See our{" "}
            <Link className="text-primary underline" href="/refunds">
              Refund Policy
            </Link>{" "}
            for the 15-day money-back guarantee and request process.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold">Availability and account action</h2>
          <p className="mt-3">
            We may limit or suspend access to protect visitors, investigate misuse, enforce these
            terms, or address security or legal concerns. We may change service features or plan
            limits; material changes to a paid subscription will be communicated as applicable.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold">Warranties and liability</h2>
          <p className="mt-3">
            We provide the service as available. To the extent the law allows, we do not promise
            that it will always be uninterrupted, error-free, or suitable for every purpose.
          </p>
          <p className="mt-3">
            To the extent the law allows, our total liability for claims related to the service is
            limited to the fees you paid for {brand.name} in the 12 months before the claim. This
            limit does not affect any liability or consumer right that cannot legally be limited.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold">Law and contact</h2>
          <p className="mt-3">
            These terms are governed by the laws of Pakistan, subject to any mandatory rights that
            apply where you live. Disputes concerning our service are subject to the courts, Pakistan. Paddle&apos;s buyer terms govern payment transactions with Paddle. For
            support email{" "}
            <a className="text-primary underline" href={`mailto:${brand.supportEmail}`}>
              {brand.supportEmail}
            </a>
            ; for billing email{" "}
            <a className="text-primary underline" href="mailto:billing@tellvira.com">
              billing@tellvira.com
            </a>
            ; for legal matters email{" "}
            <a className="text-primary underline" href="mailto:legal@tellvira.com">
              legal@tellvira.com
            </a>
            .
          </p>
        </section>
      </div>
    </main>
  );
}
