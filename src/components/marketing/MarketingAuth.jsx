"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";

function subscribeToAuthToken(callback) {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

function getAuthTokenSnapshot() {
  return Boolean(window.localStorage.getItem("token"));
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
}) {
  const authenticated = useAuthToken();

  return (
    <Link href={authenticated ? loggedInHref : loggedOutHref} className={className}>
      {authenticated ? loggedInLabel : loggedOutLabel}
    </Link>
  );
}

export function AuthActions({ mobile = false }) {
  const authenticated = useAuthToken();

  if (authenticated) {
    return (
      <Link
        href="/dashboard"
        className={`${mobile ? "mt-4 text-center" : ""} rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring`}
      >
        Go to dashboard
      </Link>
    );
  }

  return (
    <>
      <Link
        href="/login"
        className={`${mobile ? "mt-4 text-center" : ""} rounded-lg px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring`}
      >
        Log in
      </Link>
      <Link
        href="/signup"
        className="rounded-lg bg-primary px-4 py-2 text-center text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        Get started free
      </Link>
    </>
  );
}

