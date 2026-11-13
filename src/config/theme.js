const configuredTheme = process.env.NEXT_PUBLIC_SITE_THEME;

export const siteTheme = ["teal", "ember"].includes(configuredTheme)
  ? configuredTheme
  : "ember";

// Browser chrome and installed-app colors mirror the site CSS palette.
const browserColors = {
  teal: { light: "#0f766e", dark: "#18181b", background: "#fafafa" },
  ember: { light: "#d97706", dark: "#0e0e0f", background: "#fafaf9" },
};

export const siteBrowserColors = browserColors[siteTheme];
