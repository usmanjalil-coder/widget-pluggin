export const metadata = {
  title: "Terms of Service",
  description: "Draft terms placeholder for Tellvira.",
};

export default function TermsPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <div className="rounded-2xl border border-warning/20 bg-warning-bg p-4 text-sm font-medium text-warning-foreground">
        Draft placeholder · Replace with reviewed legal text before launch.
      </div>
      <h1 className="mt-6 text-4xl font-semibold text-foreground">Terms of Service</h1>
      <p className="mt-4 text-sm text-muted-foreground">
        Draft placeholder. This page is not legal advice and should be reviewed before commercial
        use.
      </p>
      <div className="mt-8 space-y-5 text-sm leading-7 text-foreground">
        <h2 className="text-lg font-semibold">Topics to review</h2>
        <p>
          Service scope, acceptable use, subscriptions, cancellation, liability, and dispute terms
          need a reviewed agreement before launch.
        </p>
      </div>
    </main>
  );
}
