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
  loggedOutLabel = "Get started free",
  loggedInLabel = "Go to dashboard",
}) {
  const authenticated = useAuthToken();

  return (
    <Link href={authenticated ? "/dashboard" : loggedOutHref} className={className}>
      {authenticated ? loggedInLabel : loggedOutLabel}
    </Link>
  );
}
