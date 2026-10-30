import { buildMetadata } from "@/lib/seo";
import { brand } from "@/lib/brand";

export const metadata = buildMetadata({
  title: "AI Chatbot Privacy Notice & Data Practices",
  description:
    "Learn how Tellvira handles AI chatbot account, visitor and billing data. Review data processing, retention and how to contact us about privacy or deletion.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">Legal</p>
      <h1 className="mt-3 text-4xl font-semibold text-foreground">Privacy Notice</h1>
      <p className="mt-4 text-sm text-muted-foreground">Last updated: October 28, 2026</p>
      <div className="mt-8 rounded-2xl border border-warning/20 bg-warning-bg p-5 text-sm leading-6 text-warning-foreground">
        <strong>Review required before launch.</strong> Replace the legal name and provider
        placeholders, confirm hosting details, and implement the deletion schedule described below.
      </div>

      <div className="mt-10 space-y-10 text-sm leading-7 text-foreground">
        <section>
          <h2 className="text-xl font-semibold">Who we are</h2>
          <p className="mt-3">
            [YOUR FULL LEGAL NAME], a sole proprietor in Pakistan, operates {brand.name}. For
            privacy questions or data requests, email{" "}
            <a className="text-primary underline" href="mailto:legal@tellvira.com">
              legal@tellvira.com
            </a>
            .
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold">Information we handle</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5">
            <li>
              Account details such as name, email, password credentials, and notification
              preferences.
            </li>
            <li>
              Bot settings, website domains, uploaded files, pasted text, and selected website
              content.
            </li>
            <li>
              Visitor conversations, submitted lead or appointment details, and bot responses.
            </li>
            <li>
              Usage and billing records, subscription status, invoices, and payment identifiers.
              Paddle processes payment details at checkout.
            </li>
            <li>
              Technical data needed to operate and protect the service, including website origin, a
              hashed visitor IP address, and request or error logs.
            </li>
          </ul>
          <p className="mt-3">
            The dashboard uses browser storage for sign-in and preferences. The embedded widget uses
            browser storage to keep a conversation and its display state across visits.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold">Why we use it</h2>
          <p className="mt-3">
            We use this information to provide and secure accounts, operate configured bots, answer
            visitor questions, deliver leads and notifications, measure plan usage, manage billing,
            respond to support requests, and meet legal obligations. Bot owners choose the content
            and form fields they put in their bots and should provide their own visitor privacy
            notice.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold">Who receives data</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5">
            <li>
              <strong>Paddle</strong>, our merchant of record for paid purchases, receives billing
              and transaction information.
            </li>
            <li>
              <strong>Resend</strong> delivers service emails, including security, billing, lead,
              and appointment messages.
            </li>
            <li>
              <strong>Cloudflare</strong> provides DNS for our domain and, when enabled, CDN and
              security services for our website and API.
            </li>
            <li>
              <strong>Zoho Mail</strong> hosts our support and business mailboxes.
            </li>
            <li>
              <strong>Our hosting provider</strong> stores and processes application data. [HOSTING
              PROVIDER AND LOCATION TO CONFIRM]
            </li>
            <li>
              <strong>[LLM AND EMBEDDING PROVIDER TO CONFIRM]</strong> processes prompts, selected
              knowledge content, and visitor messages needed to generate answers.
            </li>
          </ul>
          <p className="mt-3">
            A bot owner receives visitor conversations and submitted contact details for that bot.
            We may also disclose information when required by law or to protect the service.
          </p>
          <p className="mt-3">
            These providers may process data in countries outside your own, where privacy laws may
            differ. We will confirm hosting and AI processing locations before launch.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold">Retention and deletion</h2>
          <p className="mt-3">
            We keep account and bot data while the account is active and as needed to provide the
            service. Our intended account deletion process removes the account, bots, knowledge
            sources, conversations, and leads within 30 days of a verified deletion request. Backup
            copies may remain for up to 30 additional days. Billing and invoice records may be kept
            longer where law requires.{" "}
            <strong>
              This deletion schedule is pending implementation and must be confirmed before launch.
            </strong>
          </p>
          <p className="mt-3">
            To request access, correction, or deletion, email{" "}
            <a className="text-primary underline" href="mailto:legal@tellvira.com">
              legal@tellvira.com
            </a>
            . Visitors should contact the business whose website hosts the bot first; we will help
            that business handle requests concerning its bot.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold">Health information</h2>
          <p className="mt-3">
            This service is not designed for medical records or protected health information. Do not
            submit patient health details through a bot or upload them as knowledge content.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold">Changes and contact</h2>
          <p className="mt-3">
            We may update this notice as the service changes. The date above shows the latest
            version. Contact{" "}
            <a className="text-primary underline" href="mailto:legal@tellvira.com">
              legal@tellvira.com
            </a>{" "}
            for privacy or legal questions, or{" "}
            <a className="text-primary underline" href={`mailto:${brand.supportEmail}`}>
              {brand.supportEmail}
            </a>{" "}
            for general support.
          </p>
        </section>
      </div>
    </main>
  );
}
