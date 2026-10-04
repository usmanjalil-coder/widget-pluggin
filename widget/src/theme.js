function onPrimary(hex) {
  const value =
    hex.length === 4
      ? `#${hex[1]}${hex[1]}${hex[2]}${hex[2]}${hex[3]}${hex[3]}`
      : hex;
  const rgb = [1, 3, 5]
    .map((start) => parseInt(value.slice(start, start + 2), 16) / 255)
    .map((channel) =>
      channel <= 0.03928 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4,
    );
  return rgb[0] * 0.2126 + rgb[1] * 0.7152 + rgb[2] * 0.0722 > 0.179
    ? "#111827"
    : "#ffffff";
}
function applyTheme(host, config) {
  const dark = config.theme.mode === "dark";
  host.style.setProperty("--cb-primary", config.theme.primaryColor);
  host.style.setProperty(
    "--cb-on-primary",
    onPrimary(config.theme.primaryColor),
  );
  host.style.setProperty("--cb-bg", dark ? "#111827" : "#ffffff");
  host.style.setProperty("--cb-surface", dark ? "#1f2937" : "#f8fafc");
  host.style.setProperty("--cb-text", dark ? "#f9fafb" : "#172033");
  host.style.setProperty("--cb-muted", dark ? "#cbd5e1" : "#64748b");
  host.style.setProperty("--cb-radius", `${config.theme.borderRadius}px`);
  host.style.setProperty("--cb-font", config.theme.fontFamily);
}
export { applyTheme, onPrimary };
