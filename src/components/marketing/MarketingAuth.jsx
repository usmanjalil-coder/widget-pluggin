"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";

function subscribeToAuthToken(callback) {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

function getAuthTokenSnapshot() {
  try {
    return Boolean(window.localStorage.getItem("token"));
  } catch {
    return false;
  }
}

function getServerAuthTokenSnapshot() {
  return false;
}

export function useAuthToken() {
  return useSyncExternalStore(
    subscribeToAuthToken,
    getAuthTokenSnapshot,
    getServerAuthTokenSnapshot,
  );
}

export function MarketingAuthCta({
  className,
  loggedOutHref = "/signup",
  loggedInHref = "/dashboard",
  loggedOutLabel = "Get started free",
  loggedInLabel = "Go to dashboard",
  reserveLabelSpace = false,
}) {
  const authenticated = useAuthToken();

  return (
    <Link href={authenticated ? loggedInHref : loggedOutHref} className={className}>
      {reserveLabelSpace ? (
        <span className="inline-grid text-center">
          <span className={`col-start-1 row-start-1 whitespace-nowrap ${authenticated ? "invisible" : ""}`} aria-hidden={authenticated}>
            {loggedOutLabel}
          </span>
          <span className={`col-start-1 row-start-1 whitespace-nowrap ${authenticated ? "" : "invisible"}`} aria-hidden={!authenticated}>
            {loggedInLabel}
          </span>
        </span>
      ) : authenticated ? loggedInLabel : loggedOutLabel}
    </Link>
  );
}

export function MarketingLoginLink({ className }) {
  const authenticated = useAuthToken();
  return (
    <Link
      href="/login"
      className={`${className} ${authenticated ? "invisible" : ""}`}
      aria-hidden={authenticated}
      tabIndex={authenticated ? -1 : undefined}
    >
      Log in
    </Link>
  );
}

export function AuthActions({ mobile = false }) {
  return (
    <>
      <MarketingLoginLink
        className={`${mobile ? "mt-4 text-center" : ""} rounded-lg px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring`}
      />
      <MarketingAuthCta
        loggedOutLabel="Start free"
        reserveLabelSpace
        className="rounded-lg bg-primary px-4 py-2 text-center text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      />
    </>
  );
}

