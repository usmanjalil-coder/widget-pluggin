import { current } from "./script.js";
import { deepMerge, loadConfig, sanitizeConfig, scriptOverrides } from "./config.js";
import { mountWidget } from "./ui.js";
import { WIDGET_VERSION } from "./version.js";
import brandBadgeIconUrl from "../../public/brand/tellvira-widget-15.png";

async function waitForBody() {
  if (document.body) return;
  if (document.readyState === "loading")
    await new Promise((resolve) => document.addEventListener("DOMContentLoaded", resolve, { once: true }));
  if (!document.body) throw new Error("Widget mount target is unavailable.");
}
function bootstrap() {
  // Shared across duplicate bundle evaluations, including simultaneous config requests.
  const registryKey = Symbol.for("tellvira.widget.instances");
  const instances = window[registryKey] ||= new Map();
  async function init(options = {}) {
    let key;
    let pending;
    try {
      const script = options.script;
      const botId = options.botId || script?.dataset.botId;
      if (!botId) return null;
      key = options.container || "embed";
      if (instances.has(key)) return await instances.get(key);
      // Reserve before any asynchronous work starts.
      pending = Promise.resolve().then(async () => {
        const apiBase = options.apiBase || script?.dataset.apiBase
          || process.env.NEXT_PUBLIC_API_BASE_URL;
        const raw = options.config || await loadConfig(apiBase, botId);
        let config = sanitizeConfig(deepMerge(raw, scriptOverrides(script)), Boolean(options.preview));
        await waitForBody();
        const mounted = mountWidget({
          container: options.container,
          botId,
          apiBase,
          brandBadgeIconUrl,
          getAuthToken: options.getAuthToken,
          config,
          defaultOpen: options.open ?? options.defaultOpen ?? false,
          onOpenChange: options.onOpenChange,
          preview: options.preview,
          previewMessages: options.previewMessages,
        });
        return {
          update(partial) {
            config = sanitizeConfig(deepMerge(deepMerge(config, partial), scriptOverrides(script)), Boolean(options.preview));
            mounted.update(config);
          },
          open: () => mounted.open(),
          close: () => mounted.close(),
          resetChat: () => mounted.resetChat(),
          destroy() {
            mounted.destroy();
            if (instances.get(key) === pending) instances.delete(key);
          },
        };
      });
      instances.set(key, pending);
      return await pending;
    } catch {
      if (pending && instances.get(key) === pending) instances.delete(key);
      return null;
    }
  }
  window.__chatbot ||= {};
  window.ChatbotWidget ||= {};
  if (!window.__chatbot.init || window.ChatbotWidget.version !== WIDGET_VERSION)
    window.__chatbot.init = init;
  window.ChatbotWidget.init = window.__chatbot.init;
  window.ChatbotWidget.version = WIDGET_VERSION;
  if (current?.dataset.botId) {
    const start = () => {
      try {
        Promise.resolve(window.ChatbotWidget.init({ script: current })).catch(() => {});
      } catch {
        // Fail silently when embedding on a third-party site.
      }
    };
    if (document.readyState === "loading")
      document.addEventListener("DOMContentLoaded", start, { once: true });
    else start();
  }
}
try {
  bootstrap();
} catch {
  // A widget initialization failure must not interrupt the host page.
}
