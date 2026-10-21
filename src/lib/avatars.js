const managedLogoPath = /^\/api\/v1\/bot-logos\/[a-zA-Z0-9]{40}\.(?:jpg|jpeg|png|webp)$/;
const localHost = (host) =>
  host === "localhost" || host === "127.0.0.1" || host === "[::1]" || host.endsWith(".test");

export function getAvatarUrl(value, apiBase = "") {
  if (typeof value !== "string" || !value) return "";
  try {
    const url = new URL(value);
    if (!["http:", "https:"].includes(url.protocol) || url.username || url.password) return "";
    const localLogo =
      localHost(url.hostname) && managedLogoPath.test(url.pathname) && !url.search && !url.hash;
    // Correct old forced-HTTPS URLs only for this explicitly configured local API.
    if (localLogo && apiBase) {
      const api = new URL(apiBase);
      if (api.protocol === "http:" && api.host === url.host) url.protocol = "http:";
    }
    return url.protocol === "https:" || (url.protocol === "http:" && localLogo)
      ? url.href
      : "";
  } catch {
    return "";
  }
}

export function dashboardAvatarUrl(value) {
  return getAvatarUrl(value, process.env.NEXT_PUBLIC_API_BASE_URL || "");
}
