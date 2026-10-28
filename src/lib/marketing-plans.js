import "server-only";
import { cache } from "react";
import fallback from "@/content/plan-fallback.json";
import { createPlanCatalog } from "./plan-catalog";

const getCatalog = createPlanCatalog({
  fallback: fallback.plans,
  async fetchPlans() {
    const base = process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, "");
    if (!base) throw new Error("Public API origin is not configured.");
    const response = await fetch(`${base}/api/v1/plans`, {
      headers: { Accept: "application/json" },
      cache: "force-cache",
      next: { revalidate: 300 },
      signal: AbortSignal.timeout(5000),
    });
    if (!response.ok) throw new Error("Public plan request failed.");
    return response.json();
  },
});

export const getMarketingPlans = cache(getCatalog);
