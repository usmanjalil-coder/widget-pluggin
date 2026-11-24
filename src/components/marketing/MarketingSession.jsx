"use client";

import { useEffect } from "react";
import { getCurrentUser } from "@/lib/api/auth.api";
import { AUTH_TOKEN_KEY, removeAuthToken, syncAuthAppearance } from "@/lib/auth-storage";
import { clearQueryCache } from "@/lib/query-client";

export default function MarketingSession() {
  useEffect(() => {
    let active = true;
    let revision = 0;

    async function syncSession() {
      const check = ++revision;
      syncAuthAppearance();
      try {
        const token = window.localStorage.getItem(AUTH_TOKEN_KEY);
        if (token === null) return;

        try {
          await getCurrentUser();
        } catch (error) {
          if (
            active && check === revision && [401, 403].includes(error.status)
            && window.localStorage.getItem(AUTH_TOKEN_KEY) === token
          ) {
            clearQueryCache();
            removeAuthToken();
          }
        }
      } catch {
        // Storage can be blocked by browser settings.
      }
    }

    function onStorage(event) {
      if (event.key === AUTH_TOKEN_KEY || event.key === null) syncSession();
    }

    window.addEventListener("storage", onStorage);
    syncSession();
    return () => {
      active = false;
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  return null;
}
