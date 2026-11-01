const memory = new Map();
const pending = new Set();

// Keep the widget usable when browser storage is blocked or its quota is exhausted.
export const storage = {
  getItem(key) {
    if (pending.has(key)) return memory.get(key);
    try {
      const value = window.localStorage.getItem(key);
      memory.set(key, value);
      return value;
    } catch {
      return memory.get(key) ?? null;
    }
  },
  setItem(key, value) {
    memory.set(key, String(value));
    pending.add(key);
    try {
      window.localStorage.setItem(key, String(value));
      pending.delete(key);
    } catch {}
  },
  removeItem(key) {
    memory.set(key, null);
    pending.add(key);
    try {
      window.localStorage.removeItem(key);
      pending.delete(key);
    } catch {}
  },
};
