import assert from "node:assert/strict";
import { afterEach, test } from "node:test";
import { mountWidget } from "../widget/src/ui.js";
import { DEFAULT_CONFIG } from "../widget/src/config.js";
import { storage } from "../widget/src/storage.js";

// Only the DOM operations used by the widget; these tests exercise session behavior.
class Element {
  children = [];
  handlers = {};
  value = "";
  style = { setProperty() {} };
  classList = { add() {}, remove() {}, toggle() {} };
  append(...children) { this.children.push(...children); }
  replaceChildren(...children) { this.children = children; }
  setAttribute() {}
  addEventListener(event, handler) { this.handlers[event] = handler; }
  removeEventListener() {}
  attachShadow() { return (this.shadowRoot = new Element()); }
  focus() {}
  remove() {}
  querySelector(selector) {
    for (const child of this.children) {
      if (child.className?.split(" ").includes(selector.slice(1))) return child;
      const match = child.querySelector?.(selector);
      if (match) return match;
    }
    return null;
  }
}

const originalWindow = globalThis.window;
const originalDocument = globalThis.document;
const originalFetch = globalThis.fetch;
const originalNow = Date.now;
let widget;
afterEach(() => {
  widget?.destroy();
  widget = null;
  globalThis.window = originalWindow;
  globalThis.document = originalDocument;
  globalThis.fetch = originalFetch;
  Date.now = originalNow;
});

function mount(botId, blocked = false) {
  const values = new Map();
  globalThis.window = {
    get localStorage() {
      if (blocked) throw new Error("Storage disabled");
      return {
        getItem: (key) => values.get(key) ?? null,
        setItem: (key, value) => values.set(key, value),
        removeItem: (key) => values.delete(key),
      };
    },
  };
  globalThis.document = {
    body: new Element(),
    createElement: () => new Element(),
    createElementNS: () => new Element(),
    createTextNode: (textContent) => ({ textContent }),
    addEventListener() {},
    removeEventListener() {},
  };
  storage.setItem(`cb-teaser-${botId}`, "seen");
  widget = mountWidget({ botId, apiBase: "https://api.example.com", config: structuredClone(DEFAULT_CONFIG) });
  return document.body.children[0].shadowRoot;
}

function savedState(updatedAt) {
  return {
    updatedAt,
    conversationId: "saved-conversation",
    messages: [{ kind: "bot", content: "Hello" }, { kind: "user", content: "Hi" }],
    usage: { used: 1 },
  };
}

test("reload preserves inactivity time and expired state clears the conversation", () => {
  const botId = "expiry-test";
  const timestamp = 100000000;
  storage.setItem(`cb-state-${botId}`, JSON.stringify(savedState(timestamp)));
  Date.now = () => timestamp + 3600000;
  mount(botId);
  assert.deepEqual(JSON.parse(storage.getItem(`cb-state-${botId}`)), savedState(timestamp));
  widget.destroy();
  Date.now = () => timestamp + 25 * 3600000;
  mount(botId);
  assert.equal(storage.getItem(`cb-conversation-${botId}`), null);
  assert.equal(JSON.parse(storage.getItem(`cb-state-${botId}`)).messages.length, 1);
});

test("blocked storage still allows mounting, opening, and resetting the widget", () => {
  const root = mount("blocked-test", true);
  assert.equal(typeof root.querySelector(".cb-compose").handlers.submit, "function");
  storage.setItem("blocked-key", "value");
  assert.equal(storage.getItem("blocked-key"), "value");
  widget.open();
  widget.resetChat();
  storage.removeItem("blocked-key");
  assert.equal(storage.getItem("blocked-key"), null);
  assert.equal(storage.getItem("cb-conversation-blocked-test"), null);
});

test("reset aborts the request and late completion cannot revive the old conversation", async () => {
  const root = mount("reset-test");
  let finish;
  let requestSignal;
  globalThis.fetch = async (_url, options) => {
    requestSignal = options.signal;
    return new Response(new ReadableStream({ start(controller) { finish = controller; } }));
  };
  root.querySelector(".cb-input").value = "Hello";
  root.querySelector(".cb-compose").handlers.submit({ preventDefault() {} });
  await new Promise((resolve) => setImmediate(resolve));
  widget.resetChat();
  assert.equal(requestSignal.aborted, true);
  // A buffered response may still arrive after cancellation.
  finish.enqueue(new TextEncoder().encode('event: conversation\ndata: {"conversationId":"old-id"}\n\nevent: done\ndata: {}\n\n'));
  finish.close();
  await new Promise((resolve) => setImmediate(resolve));
  assert.equal(storage.getItem("cb-conversation-reset-test"), null);
  assert.equal(JSON.parse(storage.getItem("cb-state-reset-test")).messages.length, 1);
});


test("successful chat retains its conversation ID when storage is blocked", async () => {
  const root = mount("blocked-chat-test", true);
  let sentBody;
  globalThis.fetch = async (_url, options) => {
    sentBody = JSON.parse(options.body);
    return new Response('event: conversation\ndata: {"conversationId":"new-id"}\n\nevent: token\ndata: {"token":"Hello back"}\n\nevent: done\ndata: {}\n\n');
  };
  const submit = () => {
    root.querySelector(".cb-input").value = "Hello";
    root.querySelector(".cb-compose").handlers.submit({ preventDefault() {} });
  };
  submit();
  await new Promise((resolve) => setImmediate(resolve));
  assert.equal(sentBody.conversationId, null);
  assert.equal(storage.getItem("cb-conversation-blocked-chat-test"), "new-id");
  const saved = JSON.parse(storage.getItem("cb-state-blocked-chat-test"));
  assert.equal(saved.messages.at(-1).content, "Hello back");
  submit();
  await new Promise((resolve) => setImmediate(resolve));
  assert.equal(sentBody.conversationId, "new-id");
});
