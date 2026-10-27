import { brand } from "@/lib/brand";

export const metadata = {
  title: "Privacy Policy",
  description: "Draft privacy policy placeholder for Tellvira.",
};

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <div className="rounded-2xl border border-warning/20 bg-warning-bg p-4 text-sm font-medium text-warning-foreground">
        Draft placeholder · Replace with reviewed legal text before launch.
      </div>
      <h1 className="mt-6 text-4xl font-semibold text-foreground">Privacy Policy</h1>
      <p className="mt-4 text-sm text-muted-foreground">
        Draft placeholder. This page is not legal advice and should be reviewed by counsel before
        publication.
      </p>
      <div className="mt-8 space-y-5 text-sm leading-7 text-foreground">
        <h2 className="text-lg font-semibold">Topics to review</h2>
        <p>
          Data collected, processing purposes, service providers, retention periods, user rights,
          and contact details need a reviewed policy before launch.
        </p>
        <p>
          For privacy questions about {brand.name}, contact{" "}
          <a
            href={`mailto:${brand.supportEmail}`}
            className="text-primary underline-offset-4 hover:underline"
          >
            {brand.supportEmail}
          </a>
          .
        </p>
      </div>
    </main>
  );
}
