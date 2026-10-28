import Link from "next/link";

export const metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-24 text-center">
      <p className="text-sm font-semibold text-primary">404</p>
      <h1 className="mt-4 text-4xl font-semibold">This page could not be found</h1>
      <p className="mt-4 text-muted-foreground">
        The link may have changed or the page may no longer exist.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex font-semibold text-primary underline underline-offset-4"
      >
        Return to the Tellvira homepage
      </Link>
    </main>
  );
}
