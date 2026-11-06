"use client";

import { useEffect, useState } from "react";
import { getCurrentUser } from "@/lib/api/auth.api";
import { clearQueryCache } from "@/lib/query-client";
import FullPageLoader from "@/components/shared/FullPageLoader";

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

  return <FullPageLoader ready={ready}>{children}</FullPageLoader>;
}
