import {
  deepMerge,
  loadConfig,
  sanitizeConfig,
  scriptOverrides,
} from "./config.js";
import { mountWidget } from "./ui.js";
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
  const apiBase =
    options.apiBase ||
    (script && script.dataset.apiBase) ||
    inferApiBase(script);
  let raw = options.config;
  let failed = false;
  if (!raw) {
    try {
      raw = await loadConfig(apiBase, botId);
    } catch {
      raw = {};
      failed = true;
    }
  }
  let config = sanitizeConfig(deepMerge(raw, scriptOverrides(script)));
  let mounted;
  const rebuild = (partial) => {
    config = sanitizeConfig(deepMerge(config, partial));
    if (mounted) mounted.destroy();
    mounted = mountWidget({
      container: options.container,
      botId,
      apiBase,
      config,
      failed,
      onUpdate: rebuild,
    });
    instance.destroy = () => {
      mounted.destroy();
      instances.delete(key);
    };
  };
  const instance = { update: rebuild, destroy() {} };
  rebuild({});
  instances.set(key, instance);
  return instance;
}
window.ChatbotWidget = window.ChatbotWidget || {};
window.ChatbotWidget.init = init;
const current = document.currentScript;
if (current && current.dataset.botId) {
  const start = () => init({ script: current });
  document.readyState === "loading"
    ? document.addEventListener("DOMContentLoaded", start, { once: true })
    : start();
}
