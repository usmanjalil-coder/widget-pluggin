import { ContactForm } from "@/components/marketing/MarketingUI";
import { brand } from "@/lib/brand";

export const metadata = {
  title: "Contact",
  description: `Contact ${brand.name} about onboarding and website assistant support.`,
};

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.16em] text-slate-500">
            Contact
          </p>
          <h1 className="mt-3 text-4xl font-semibold text-slate-900">
            Talk to the team
          </h1>
          <p className="mt-4 text-lg text-slate-600">
            Tell us about your website, your audience, and what you want the
            assistant to handle.
          </p>
          <div className="mt-6 space-y-3 text-sm text-slate-700">
            <p>
              Email:{" "}
              <a
                href={`mailto:${brand.supportEmail}`}
                className="text-blue-600"
              >
                {brand.supportEmail}
              </a>
            </p>
            <p>
              Website:{" "}
              <a href={`https://${brand.domain}`} className="text-blue-600">
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
