const DEFAULT_CONFIG = {
  theme: {
    primaryColor: "#4F46E5",
    mode: "light",
    position: "right",
    borderRadius: 16,
    fontFamily: "system",
  },
  texts: {
    botName: "Assistant",
    avatarUrl: "",
    greetingMessage: "Hi! How can I help?",
    inputPlaceholder: "Type your question...",
    launcherLabel: "",
    starterQuestions: [],
    offlineMessage: "",
  },
  features: { leadCapture: true, dentalNotice: false },
  branding: { showBadge: true, badgeText: "" },
  contactText: "the office",
  dir: "",
  zIndex: 2147483647,
};
import { HEX_COLOR, TEXT_LIMITS } from "../../src/lib/limits.js";
import { getAvatarUrl } from "../../src/lib/avatars.js";
const FONTS = {
  system:
    'Inter, var(--font-inter, system-ui), -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  sans: "Arial, Helvetica, sans-serif",
  serif: "Georgia, serif",
  mono: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
};
const text = (value, fallback, max) => (typeof value === "string" ? value.slice(0, max) : fallback);
function deepMerge(base, value) {
  const result = { ...base };
  Object.keys(value || {}).forEach((key) => {
    result[key] =
      value[key] && typeof value[key] === "object" && !Array.isArray(value[key])
        ? deepMerge(base[key] || {}, value[key])
        : value[key];
  });
  return result;
}
function sanitizeConfig(raw, preview = false) {
  const config = deepMerge(DEFAULT_CONFIG, raw || {});
  config.theme.primaryColor = HEX_COLOR.test(config.theme.primaryColor)
    ? config.theme.primaryColor
    : DEFAULT_CONFIG.theme.primaryColor;
  config.theme.mode = ["light", "dark", "auto"].includes(config.theme.mode)
    ? config.theme.mode
    : "light";
  config.theme.position = config.theme.position === "left" ? "left" : "right";
  config.theme.borderRadius = Math.max(
    0,
    Math.min(
      28,
      Number.isFinite(Number(config.theme.borderRadius))
        ? Number(config.theme.borderRadius)
        : DEFAULT_CONFIG.theme.borderRadius,
    ),
  );
  config.theme.fontFamily = FONTS[config.theme.fontFamily]
    ? FONTS[config.theme.fontFamily]
    : Object.values(FONTS).includes(config.theme.fontFamily)
      ? config.theme.fontFamily
      : FONTS.system;
  Object.keys(DEFAULT_CONFIG.texts).forEach((key) => {
    if (key !== "starterQuestions")
      config.texts[key] = text(config.texts[key], DEFAULT_CONFIG.texts[key], TEXT_LIMITS[key]);
  });
  const localPreview = preview && typeof window !== "undefined"
    && config.texts.avatarUrl.startsWith(`blob:${window.location.origin}/`);
  config.texts.avatarUrl = localPreview ? config.texts.avatarUrl : getAvatarUrl(config.texts.avatarUrl);
  config.texts.starterQuestions = Array.isArray(config.texts.starterQuestions)
    ? config.texts.starterQuestions
        .filter((item) => typeof item === "string")
        .slice(0, TEXT_LIMITS.starterQuestions)
        .map((item) => item.slice(0, TEXT_LIMITS.starterQuestion))
    : [];
  config.features.leadCapture = Boolean(config.features.leadCapture);
  config.features.dentalNotice = Boolean(config.features.dentalNotice);
  config.branding.showBadge = Boolean(config.branding.showBadge);
  config.branding.badgeText = text(config.branding.badgeText, "", 80);
  config.contactText = text(config.contactText, "the office", 120);
  config.dir = config.dir === "rtl" ? "rtl" : "";
  config.zIndex = Math.max(1, Math.min(2147483647, Number(config.zIndex) || 2147483647));
  return config;
}
function scriptOverrides(script) {
  if (!script) return {};
  const theme = {};
  const texts = {};
  if (script.dataset.primaryColor !== void 0) theme.primaryColor = script.dataset.primaryColor;
  if (script.dataset.position !== void 0) theme.position = script.dataset.position;
  if (script.dataset.greeting !== void 0) texts.greetingMessage = script.dataset.greeting;
  if (script.dataset.botName !== void 0) texts.botName = script.dataset.botName;
  return { theme, texts };
}
async function loadConfig(apiBase, botId) {
  const resolveLogo = (config) => ({
    ...config,
    texts: { ...config.texts, avatarUrl: getAvatarUrl(config.texts?.avatarUrl, apiBase) },
  });
  const key = `cb-config-${botId}`;
  try {
    const cached = JSON.parse(sessionStorage.getItem(key) || "null");
    if (cached && cached.expires > Date.now()) return resolveLogo(cached.config);
  } catch {}
  const response = await fetch(
    `${apiBase.replace(/\/$/, "")}/api/v1/widget/config/${encodeURIComponent(botId)}`,
    { headers: { Accept: "application/json" } },
  );
  if (!response.ok) throw new Error("Configuration unavailable");
  const payload = await response.json();
  const config = payload.data || payload;
  try {
    sessionStorage.setItem(key, JSON.stringify({ config, expires: Date.now() + 60000 }));
  } catch {}
  return resolveLogo(config);
}
export { DEFAULT_CONFIG, deepMerge, loadConfig, sanitizeConfig, scriptOverrides };
