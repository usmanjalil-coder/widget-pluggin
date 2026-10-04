import { brand } from "@/lib/brand";

export const metadata = {
  title: "Privacy Policy",
  description: "Draft privacy policy placeholder for YourBrand.",
};

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <div className="rounded-3xl border border-amber-200 bg-amber-50 p-4 text-sm font-medium text-amber-800">
        Replace with reviewed legal text before launch.
      </div>
      <h1 className="mt-6 text-4xl font-semibold text-slate-900">
        Privacy Policy
      </h1>
      <p className="mt-4 text-sm text-slate-600">
        Draft placeholder. This page is not legal advice and should be reviewed
        by counsel before publication.
      </p>
      <div className="mt-8 space-y-5 text-sm leading-7 text-slate-700">
        <p>
          {brand.name} collects contact data, site usage information, and
          conversation content only as needed to provide the chatbot service.
          The service may process submitted messages and uploaded documents for
          product functionality, support, and customer service. We keep this
          information for as long as required for the service, security, and
          legal obligations.
        </p>
        <p>
          Visitors should not submit sensitive personal data or protected health
          information through the assistant. If you use the service for
          regulated workflows, review your own compliance obligations and
          retention schedules before launch.
        </p>
        <p>
          Contact the team at{" "}
          <a href={`mailto:${brand.supportEmail}`} className="text-blue-600">
            {brand.supportEmail}
          </a>{" "}
          for privacy questions.
        </p>
      </div>
    </main>
  );
}
