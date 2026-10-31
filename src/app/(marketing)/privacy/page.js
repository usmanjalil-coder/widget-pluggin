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
        For privacy questions or data requests, contact legal@tellvira.com.
      </div>

      <div className="mt-10 space-y-10 text-sm leading-7 text-foreground">
        <section>
          <h2 className="text-xl font-semibold">Who we are</h2>
          <p className="mt-3">
            Usman Jaleel, a sole proprietor in Pakistan, operates {brand.name}. For
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
              <strong>xAI</strong> processes visitor messages and bot-owner content to generate chat
              responses.
            </li>
            <li>
              <strong>Google</strong> processes bot-owner content to generate embeddings for searching
              that content.
            </li>
            <li>
              <strong>Our hosting provider</strong> stores and processes application data. Amazon Web Services (AWS), where our application servers.
            </li>
          </ul>
          <p className="mt-3">
            Visitor messages and bot-owner content are sent to xAI and Google to generate answers
            and search your content. Under their API terms, this data is not used to train their
            models. These providers may retain API requests for a limited period (up to 30 days)
            for abuse monitoring, and processing may take place in the United States.
          </p>
          <p className="mt-3">
            A bot owner receives visitor conversations and submitted contact details for that bot.
            We may also disclose information when required by law or to protect the service.
          </p>
          <p className="mt-3">
            These providers may process data in countries outside your own, where privacy laws may
            differ.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold">Retention and deletion</h2>
          <p className="mt-3">
            You can ask us to delete your account and associated data at any time by emailing
            legal@tellvira.com from your account email address. We will delete your account data
            within 30 days of a verified request. Copies in encrypted backups may remain for up to
            30 additional days before they are overwritten. Where we are required to keep certain
            records (for example billing and tax records), we keep them for the period the law
            requires. Billing records held by Paddle are governed by Paddle&apos;s own privacy notice.
          </p>
          <p className="mt-3">
            If you are a visitor who chatted with a bot on a customer&apos;s website, please contact
            that website owner about your data. We process that data on the owner&apos;s behalf and will
            help them respond to your request.
          </p>
          <p className="mt-3">
            To request access or correction, email{" "}
            <a className="text-primary underline" href="mailto:legal@tellvira.com">
              legal@tellvira.com
            </a>
            .
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
