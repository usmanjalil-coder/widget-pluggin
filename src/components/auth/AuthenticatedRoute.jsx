"use client";

import { useEffect, useState } from "react";
import { getCurrentUser } from "@/lib/api/auth.api";
import { clearQueryCache } from "@/lib/query-client";
import { loginUrl } from "@/lib/auth-redirect";
import FullPageLoader from "@/components/shared/FullPageLoader";

export default function AuthenticatedRoute({ children }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let active = true;
    if (!window.localStorage.getItem("token")) {
      clearQueryCache();
      window.location.replace(loginUrl(window.location.pathname + window.location.search));
      return;
    }

    getCurrentUser()
      .then(() => {
        if (active) setReady(true);
      })
      .catch(() => {
        clearQueryCache();
        window.localStorage.removeItem("token");
        if (active) window.location.replace(loginUrl(window.location.pathname + window.location.search));
      });

    return () => {
      active = false;
    };
  }, []);

  return ready ? children : <FullPageLoader />;
}
