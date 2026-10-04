import { brand } from "@/lib/brand";

export const metadata = {
  title: "Terms of Service",
  description: "Draft terms placeholder for YourBrand.",
};

export default function TermsPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <div className="rounded-3xl border border-amber-200 bg-amber-50 p-4 text-sm font-medium text-amber-800">
        Replace with reviewed legal text before launch.
      </div>
      <h1 className="mt-6 text-4xl font-semibold text-slate-900">
        Terms of Service
      </h1>
      <p className="mt-4 text-sm text-slate-600">
        Draft placeholder. This page is not legal advice and should be reviewed
        before commercial use.
      </p>
      <div className="mt-8 space-y-5 text-sm leading-7 text-slate-700">
        <p>
          {brand.name} provides a website AI assistant service designed to
          answer customer questions, capture leads, and help businesses automate
          common conversational tasks.
        </p>
        <p>
          Customers are responsible for the content they add, the consent they
          gather, and any other legal or compliance review for their own use
          cases. The service does not replace professional legal, medical, or
          compliance advice.
        </p>
        <p>
          Customers should not send protected health information or other
          sensitive data through the assistant without reviewing their legal and
          security requirements.
        </p>
      </div>
    </main>
  );
}
