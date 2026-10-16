"use client";

import { useEffect, useState } from "react";
import { getCurrentUser } from "@/lib/api/auth.api";
import { clearQueryCache } from "@/lib/query-client";

export default function AuthenticatedRoute({ children }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let active = true;
    if (!window.localStorage.getItem("token")) {
      clearQueryCache();
      window.location.replace("/login");
      return;
    }

    getCurrentUser()
      .then(() => {
        if (active) setReady(true);
      })
      .catch(() => {
        clearQueryCache();
        window.localStorage.removeItem("token");
        if (active) window.location.replace("/login");
      });

    return () => {
      active = false;
    };
  }, []);

  if (!ready) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background">
        <p role="status" className="text-sm text-muted-foreground">
          Loading your account…
        </p>
      </main>
    );
  }

  return children;
}
