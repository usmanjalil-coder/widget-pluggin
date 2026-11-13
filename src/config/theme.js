const configuredTheme = process.env.NEXT_PUBLIC_SITE_THEME;

export const siteTheme = ["teal", "ember"].includes(configuredTheme)
  ? configuredTheme
  : "ember";
