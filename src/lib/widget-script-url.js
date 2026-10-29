export function getWidgetScriptUrl(version) {
  const configuredUrl = process.env.NEXT_PUBLIC_WIDGET_SCRIPT_URL;
  const scriptUrl =
    configuredUrl ||
    (process.env.NODE_ENV === "development" ? "http://localhost:3000/widget.js" : "");

  if (!scriptUrl) {
    throw new Error("NEXT_PUBLIC_WIDGET_SCRIPT_URL is required for production builds.");
  }

  const url = new URL(scriptUrl);
  if (version) url.searchParams.set("v", version);
  return url.toString();
}
