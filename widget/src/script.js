// Capture the tag during evaluation; currentScript is unavailable in async callbacks.
export const current = (() => {
  try {
    return document.currentScript || Array.from(document.scripts).reverse().find((script) => {
      try {
        return new URL(script.src, document.baseURI).pathname.endsWith("/widget.js")
          && script.dataset.botId;
      } catch {
        return false;
      }
    });
  } catch {
    return null;
  }
})();
