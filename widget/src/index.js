import { deepMerge, loadConfig, sanitizeConfig, scriptOverrides } from "./config.js";
import { mountWidget } from "./ui.js";
import { WIDGET_VERSION } from "./version.js";
const instances = /* @__PURE__ */ new Map();
function inferApiBase(script) {
  try {
    return script && script.src
      ? new URL(script.src, window.location.href).origin
      : window.location.origin;
  } catch {
    return window.location.origin;
  }
}
async function init(options = {}) {
  const script = options.script;
  const botId = options.botId || (script && script.dataset.botId);
  if (!botId) throw new Error("ChatbotWidget requires a botId.");
  const key = options.container || botId;
  if (instances.has(key)) return instances.get(key);
  const apiBase = options.apiBase || (script && script.dataset.apiBase) || inferApiBase(script);
  let raw = options.config;
  let failed = false;
  if (!raw) {
    try {
      raw = await loadConfig(apiBase, botId);
    } catch {
      console.warn("ChatbotWidget: configuration unavailable.");
      return null;
    }
  }
  let config = sanitizeConfig(deepMerge(raw, scriptOverrides(script)), Boolean(options.preview));
  let mounted;
  const update = (partial) => {
    config = sanitizeConfig(deepMerge(deepMerge(config, partial), scriptOverrides(script)), Boolean(options.preview));
    mounted?.update(config);
  };
  const instance = {
    update,
    open: () => mounted?.open(),
    close: () => mounted?.close(),
    resetChat: () => mounted?.resetChat(),
    destroy() {
      mounted?.destroy();
      instances.delete(key);
    },
  };
  mounted = mountWidget({
    container: options.container,
    botId,
    apiBase,
    config,
    defaultOpen: options.open ?? options.defaultOpen ?? false,
    onOpenChange: options.onOpenChange,
    preview: options.preview,
    previewMessages: options.previewMessages,
  });
  instances.set(key, instance);
  return instance;
}
window.__chatbot = window.__chatbot || {};
window.ChatbotWidget = window.ChatbotWidget || {};
if (!window.__chatbot.init || window.ChatbotWidget.version !== WIDGET_VERSION) {
  window.__chatbot.init = init;
}
window.ChatbotWidget.init = window.__chatbot.init;
window.ChatbotWidget.version = WIDGET_VERSION;
const current = document.currentScript;
if (current && current.dataset.botId) {
  const start = () => {
    if (!current.dataset.cbLoaded) {
      current.dataset.cbLoaded = "true";
      window.__chatbot.init({ script: current });
    }
  };
  document.readyState === "loading"
    ? document.addEventListener("DOMContentLoaded", start, { once: true })
    : start();
}
