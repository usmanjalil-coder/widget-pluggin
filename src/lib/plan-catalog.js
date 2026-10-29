function isFeature(feature) {
  if (!feature || typeof feature.key !== "string" || typeof feature.name !== "string") return false;
  if (feature.type === "boolean") return typeof feature.value === "boolean";
  if (feature.type === "number") {
    return feature.value === null || (Number.isFinite(feature.value) && feature.value >= 0);
  }
  return feature.type === "text" && (feature.value === null || typeof feature.value === "string");
}

export function isPlanCatalog(plans) {
  return Array.isArray(plans) && plans.length > 0 &&
    new Set(plans.map((plan) => plan?.key)).size === plans.length &&
    plans.every((plan) => plan &&
      typeof plan.key === "string" && /^[a-z0-9_-]+$/.test(plan.key) &&
      typeof plan.name === "string" && plan.name.trim().length > 0 &&
      (plan.description == null || typeof plan.description === "string") &&
      Number.isSafeInteger(plan.priceCents) && plan.priceCents >= 0 &&
      plan.currency === "USD" && plan.billingInterval === "month" &&
      Array.isArray(plan.features) && plan.features.every(isFeature));
}

/** One validated catalog supplies both rendered prices and their structured data. */
export function createPlanCatalog({ fallback, fetchPlans, warn = console.warn }) {
  if (!isPlanCatalog(fallback)) throw new Error("Invalid bundled plan fallback.");
  let lastGood;
  let pending;

  return function getPlans() {
    if (pending) return pending;
    pending = Promise.resolve().then(async () => {
      try {
        const response = await fetchPlans();
        if (response?.success === false || Number(response?.responseCode) >= 400 || !isPlanCatalog(response?.data)) {
          throw new Error("Invalid public plan response.");
        }
        lastGood = structuredClone(response.data);
        return structuredClone(lastGood);
      } catch {
        warn(`[marketing-plans] API unavailable or invalid; using ${lastGood ? "last known good" : "bundled fallback"} catalog.`);
        return structuredClone(lastGood || fallback);
      }
    }).finally(() => { pending = undefined; });
    return pending;
  };
}
