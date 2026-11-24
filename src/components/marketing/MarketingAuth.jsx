import Link from "next/link";

export function MarketingAuthCta({
  className,
  loggedOutHref = "/signup",
  loggedInHref = "/dashboard",
  loggedOutLabel = "Start free",
  loggedInLabel = "Go to dashboard",
}) {
  return (
    <>
      <Link href={loggedOutHref} className={className} data-marketing-auth="out">
        <CtaLabel label={loggedOutLabel} otherLabel={loggedInLabel} />
      </Link>
      <Link href={loggedInHref} className={className} data-marketing-auth="in">
        <CtaLabel label={loggedInLabel} otherLabel={loggedOutLabel} />
      </Link>
    </>
  );
}

function CtaLabel({ label, otherLabel }) {
  return (
    <span className="inline-grid text-center">
      <span className="col-start-1 row-start-1 whitespace-nowrap">{label}</span>
      <span className="invisible col-start-1 row-start-1 whitespace-nowrap" aria-hidden="true">
        {otherLabel}
      </span>
    </span>
  );
}

export function AuthActions({ mobile = false }) {
  return (
    <div className={mobile ? "mt-4 min-h-20" : "flex min-w-56 justify-end"}>
      <div className={mobile ? "flex flex-col gap-2" : "flex items-center gap-2"}>
        <Link
          href="/login"
          data-marketing-auth="out"
          className="rounded-lg px-3 py-2 text-center text-sm font-medium text-foreground motion-safe:transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          Log in
        </Link>
        <MarketingAuthCta
          className="rounded-lg btn-primary-gradient px-4 py-2 text-center text-sm font-medium text-primary-foreground motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
      </div>
    </div>
  );
}
