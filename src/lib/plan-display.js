export const dashboardNumber = new Intl.NumberFormat("en-US");

export function dashboardFeatures(plan) {
  return Array.isArray(plan.features) ? plan.features : [];
}

export function featureDisplay(feature) {
  if (feature.key === "remove_branding" && typeof feature.value === "boolean") {
    return {
      text: feature.value ? "Powered-by badge removed" : "Powered-by badge shown",
      enabled: true,
    };
  }
  if (feature.type === "boolean") {
    return {
      text: feature.value ? feature.name : `${feature.name} unavailable`,
      enabled: feature.value === true,
    };
  }
  if (feature.type === "number") {
    if (feature.value === null) {
      return { text: `${feature.name}: No set limit`, enabled: true };
    }
    if (typeof feature.value === "number") {
      const count = dashboardNumber.format(feature.value);
      const text = {
        conversations: `${count} conversations / month`,
        bots: `${count} ${feature.value === 1 ? "bot" : "bots"}`,
        messages_per_conversation: `${count} messages / conversation`,
        domains: `${count} allowed ${feature.value === 1 ? "domain" : "domains"}`,
      }[feature.key];
      return { text: text || `${feature.name}: ${count}`, enabled: true };
    }
  }
  return {
    text: feature.value ? `${feature.name}: ${feature.value}` : `${feature.name}: Not configured`,
    enabled: Boolean(feature.value),
  };
}

export function dashboardPrice(plan) {
  if (typeof plan.priceCents !== "number" || !plan.currency) return null;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: plan.currency,
    maximumFractionDigits: 0,
  }).format(plan.priceCents / 100);
}

