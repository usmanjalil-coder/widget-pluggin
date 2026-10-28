import { buildMetadata } from "@/lib/seo";
import { ContactForm } from "@/components/marketing/ContactForm";
import { brand } from "@/lib/brand";

export const metadata = buildMetadata({
  title: "Contact",
  description:
    "Get in touch with Tellvira for support, billing or legal questions. Email support@tellvira.com or send us a message using the contact form.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.16em] text-muted-foreground">
            Contact
          </p>
          <h1 className="mt-3 text-4xl font-semibold text-foreground">Talk to the team</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Tell us about your website, your audience, and what you want the assistant to handle.
          </p>
          <div className="mt-6 space-y-3 text-sm text-foreground">
            <p>
              Billing:{" "}
              <a href="mailto:billing@tellvira.com" className="text-primary">
                billing@tellvira.com
              </a>
            </p>
            <p>
              Legal/privacy:{" "}
              <a href="mailto:legal@tellvira.com" className="text-primary">
                legal@tellvira.com
              </a>
            </p>
            <p>
              Support:{" "}
              <a href={`mailto:${brand.supportEmail}`} className="text-primary">
                {brand.supportEmail}
              </a>
            </p>
            <p>
              Website:{" "}
              <a href={`https://${brand.domain}`} className="text-primary">
                {brand.domain}
              </a>
            </p>
          </div>
        </div>

        <ContactForm />
      </div>
    </main>
  );
}
