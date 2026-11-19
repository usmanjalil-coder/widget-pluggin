const AUTH_PATH = /^\/(?:login|signup|forgot-password|reset-password|verify-email|verify-otp)(?:\/|$)/i;

export function getSafeNext(next) {
  if (typeof next !== "string") return "/dashboard";
  try {
    let decoded = next;
    for (let i = 0; i < 5; i++) {
      if (!decoded.startsWith("/") || decoded.startsWith("//") ||
          decoded.includes("\\") || decoded.includes("://") || /[\u0000-\u0020\u007f]/.test(decoded)) {
        return "/dashboard";
      }
      const url = new URL(decoded, "https://internal.invalid");
      if (url.origin !== "https://internal.invalid" || AUTH_PATH.test(url.pathname)) return "/dashboard";
      const value = decodeURIComponent(decoded);
      if (value === decoded) return next.split("#")[0];
      decoded = value;
    }
  } catch {}
  return "/dashboard";
}

export function loginUrl(next) {
  return "/login?next=" + encodeURIComponent(getSafeNext(next));
}

export function getOnboardingNext(next) {
  const destination = getSafeNext(next);
  const { pathname } = new URL(destination, "https://internal.invalid");
  return /^\/onboarding\/?$/.test(decodeURIComponent(pathname)) ? "/dashboard" : destination;
}

export function onboardingUrl({ next, selectedPlanKey }) {
  const billing = selectedPlanKey
    ? "/dashboard/billing?plan=" + encodeURIComponent(selectedPlanKey)
    : null;
  const destination = getOnboardingNext(next || billing);
  return destination === "/dashboard" ? "/onboarding" : "/onboarding?next=" + encodeURIComponent(destination);
}
