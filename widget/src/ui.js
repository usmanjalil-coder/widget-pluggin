import { styles } from "./styles.js";
import { streamChat } from "./chat.js";
import { applyTheme } from "./theme.js";
import { brand } from "../../src/lib/brand.js";
const make = (tag, className, value) => {
  const el = document.createElement(tag);
  if (className) el.className = className;
  if (value !== void 0) el.textContent = value;
  return el;
};
const svg = (paths, className = "") => {
  const el = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  el.setAttribute("viewBox", "0 0 24 24");
  el.setAttribute("aria-hidden", "true");
  if (className) el.setAttribute("class", className);
  paths.forEach((attrs) => {
    const path = document.createElementNS("http://www.w3.org/2000/svg", attrs.tag || "path");
    Object.keys(attrs).forEach((key) => {
      if (key !== "tag") path.setAttribute(key, attrs[key]);
    });
    el.append(path);
  });
  return el;
};
const chatIcon = () =>
  svg(
    [
      {
        d: "M20 11.5a7.5 7.5 0 0 1-7.8 7.49 8.7 8.7 0 0 1-3.12-.58L4 20l1.5-4.2A7.25 7.25 0 0 1 4 11.5 7.5 7.5 0 0 1 11.75 4 7.5 7.5 0 0 1 20 11.5Z",
      },
      { d: "M8.5 11.5h.01M12 11.5h.01M15.5 11.5h.01" },
    ],
    "cb-icon cb-icon-chat",
  );
const xIcon = (className = "cb-icon cb-icon-close") =>
  svg([{ d: "m7 7 10 10M17 7 7 17" }], className);
const sendIcon = () => svg([{ d: "M12 19V5M6.5 10.5 12 5l5.5 5.5" }]);
const retryIcon = () => svg([
  { d: "M3 12a9 9 0 1 0 2.6-6.4L3 8" },
  { d: "M3 3v5h5" },
]);
const initials = (name) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase() || "AI";
const time = () =>
  new Intl.DateTimeFormat(void 0, {
    hour: "numeric",
    minute: "2-digit",
  }).format(/* @__PURE__ */ new Date());
function markdown(target, value) {
  target.replaceChildren();
  const inline = (parent, text) =>
    text.split(/(\*\*[^*]+\*\*|\*[^*]+\*|https?:\/\/[^\s]+)/g).forEach((part) => {
      if (!part) return;
      if (/^\*\*[^*]+\*\*$/.test(part)) parent.append(make("strong", "", part.slice(2, -2)));
      else if (/^\*[^*]+\*$/.test(part)) parent.append(make("em", "", part.slice(1, -1)));
      else if (/^https?:\/\//.test(part)) {
        const link = make("a", "", part);
        link.href = part;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        parent.append(link);
      } else parent.append(document.createTextNode(part));
    });
  let list;
  String(value || "")
    .split("\n")
    .forEach((line) => {
      const bullet = /^\s*[-*]\s+(.+)$/.exec(line);
      if (bullet) {
        if (!list) {
          list = make("ul");
          target.append(list);
        }
        const item = make("li");
        inline(item, bullet[1]);
        list.append(item);
      } else {
        list = null;
        const p = make("p");
        inline(p, line);
        target.append(p);
      }
    });
}
function mountWidget({
  container,
  botId,
  apiBase,
  getAuthToken = () => null,
  config: initialConfig,
  failed,
  defaultOpen,
  onOpenChange,
  preview = false,
  previewMessages = [],
}) {
  let config = initialConfig;
  const host = make("div", "cb-host");
  if (container) host.classList.add("cb-embedded-host");
  const shadow = host.attachShadow({ mode: "open" });
  const style = make("style");
  let destroyed = false;
  style.textContent = styles;
  shadow.append(style);
  applyTheme(host, config);
  const root = make(
    "div",
    `cb-root ${container ? "cb-embedded" : "cb-fixed"}${preview ? " cb-preview" : ""} cb-${config.theme.position}`,
  );
  const launchArea = make("div", "cb-launch-area");
  const launcher = make("button", "cb-launcher");
  launcher.type = "button";
  launcher.setAttribute("aria-label", `Open ${config.texts.botName} chat`);
  launcher.setAttribute("aria-expanded", "false");
  launcher.append(chatIcon(), xIcon());
  if (config.texts.launcherLabel)
    launchArea.append(make("span", "cb-launch-label", config.texts.launcherLabel));
  launchArea.append(launcher);
  const teaser = make("div", "cb-teaser", config.texts.greetingMessage.slice(0, 140));
  const teaserClose = make("button", "cb-teaser-close", "\xD7");
  teaserClose.type = "button";
  teaserClose.setAttribute("aria-label", "Dismiss greeting");
  teaser.append(teaserClose);
  launchArea.append(teaser);
  const win = make("section", "cb-window");
  win.setAttribute("role", "dialog");
  win.setAttribute("aria-label", `${config.texts.botName} chat`);
  win.setAttribute("aria-modal", "true");
  const header = make("header", "cb-header");
  let avatar = config.texts.avatarUrl
    ? make("img", "cb-avatar")
    : make("div", "cb-avatar cb-avatar-initials", initials(config.texts.botName));
  if (config.texts.avatarUrl) {
    avatar.src = config.texts.avatarUrl;
    avatar.alt = "";
  }
  const copy = make("div", "cb-head-copy");
  const title = make("div", "cb-title", config.texts.botName);
  copy.append(title);
  const presence = make("div", "cb-presence");
  presence.append(make("span", "cb-online"), document.createTextNode("Online"));
  copy.append(presence);
  // copy.append(make("div", "cb-reply-time", "Typically replies instantly"));
  const close = make("button", "cb-close");
  close.type = "button";
  close.setAttribute("aria-label", "Close chat");
  close.append(xIcon("cb-icon cb-close-icon"));
  header.append(avatar, copy, close);
  const messages = make("div", "cb-messages");
  messages.setAttribute("aria-live", "polite");
  const scrollButton = make("button", "cb-scroll-bottom", "\u2193");
  scrollButton.type = "button";
  scrollButton.hidden = true;
  scrollButton.setAttribute("aria-label", "Scroll to latest message");
  const chips = make("div", "cb-chips");
  chips.setAttribute("role", "group");
  chips.setAttribute("aria-label", "Suggested questions");
  const typing = make("div", "cb-typing-row");
  typing.hidden = true;
  const typeDots = make("div", "cb-typing-bubble");
  typeDots.append(make("span", "cb-dot"), make("span", "cb-dot"), make("span", "cb-dot"));
  typing.append(make("div", "cb-message-avatar", initials(config.texts.botName)), typeDots);
  const counter = make("span", "cb-counter");
  counter.hidden = true;
  const usage = make("div", "cb-usage");
  usage.hidden = preview;
  const compose = make("form", "cb-compose");
  const input = make("textarea", "cb-input");
  input.rows = 1;
  input.maxLength = config.limits.messageCharacters;
  input.placeholder = config.texts.inputPlaceholder;
  input.setAttribute("aria-label", config.texts.inputPlaceholder);
  const send = make("button", "cb-send");
  send.type = "submit";
  send.disabled = true;
  send.setAttribute("aria-label", "Send message");
  send.append(sendIcon());
  compose.append(input, counter, send);
  win.append(header, messages, typing, chips, usage, compose);
  const footer = make("footer", "cb-footer");
  const footerIcon = make("img", "cb-brand-icon");
  footerIcon.src = new URL(brand.iconPath, apiBase).href;
  footerIcon.alt = "";
  footer.append(footerIcon, document.createTextNode(`Powered by ${brand.name}`));
  footer.hidden = !config.branding.showBadge;
  win.append(footer);
  root.append(launchArea, win);
  shadow.append(root);
  const mountTarget = container || document.body;
  if (mountTarget && mountTarget !== document.body) mountTarget.replaceChildren();
  mountTarget.append(host);
  let open = false;
  let generation = 0;
  let messageCount = 0;
  let sending = false;
  let lastMessage = "";
  let lastSender = "";
  let lastMinute = "";
  let chipsUsed = false;
  let promptsUsed = 0;
  let promptLimit = config.limits.conversationPrompts;
  let limitReached = false;
  const stateKey = `cb-state-${botId}`;
  const persist = () => {
    if (preview) return;
    try {
      localStorage.setItem(
        stateKey,
        JSON.stringify({
          updatedAt: Date.now(),
          conversationId:
            localStorage.getItem(`cb-conversation-${botId}`) ||
            crypto.randomUUID?.() ||
            String(Date.now()),
          messages: history,
          usage: { used: promptsUsed, limit: promptLimit, reached: limitReached },
        }),
      );
    } catch {}
  };
  const history = [];
  const testHistory = [];
  const teaserKey = `cb-teaser-${botId}`;
  const scroll = () => {
    messages.scrollTop = messages.scrollHeight;
  };
  const nearBottom = () => messages.scrollHeight - messages.scrollTop - messages.clientHeight < 80;
  const botAvatar = () => {
    const node = make("div", "cb-message-avatar");
    if (config.texts.avatarUrl) {
      const image = make("img");
      image.src = config.texts.avatarUrl;
      image.alt = "";
      node.append(image);
    } else node.textContent = initials(config.texts.botName);
    return node;
  };
  const addMessage = (kind, content) => {
    messageCount += 1;
    const stamp = time();
    const grouped = kind === lastSender && stamp === lastMinute;
    const row = make("div", `cb-message-row cb-${kind}-row${grouped ? " cb-grouped" : ""}`);
    const wrap = make("div", "cb-message-wrap");
    const bubble = make("div", `cb-message cb-${kind}`);
    if (kind === "bot") {
      bubble.classList.add("cb-markdown");
      markdown(bubble, content);
      row.append(botAvatar());
    } else bubble.textContent = content;
    wrap.append(bubble, make("time", "cb-timestamp", stamp));
    row.append(wrap);
    messages.append(row);
    if (content && !preview) {
      history.push({ kind, content, stamp });
      persist();
    }
    lastSender = kind;
    lastMinute = stamp;
    scroll();
    return { row, bubble, stamp };
  };
  const addError = (message, retryMessage) => {
    const notice = make("div", "cb-error-notice");
    notice.setAttribute("role", "alert");
    notice.append(
      make("span", "cb-error-symbol", "!"),
      make("span", "cb-error-text", message),
    );
    if (retryMessage) {
      const retry = make("button", "cb-retry");
      retry.type = "button";
      retry.setAttribute("aria-label", "Retry message");
      retry.title = "Retry message";
      retry.append(retryIcon());
      retry.addEventListener("click", () => {
        notice.remove();
        sendMessage(retryMessage);
      });
      notice.append(retry);
    }
    messages.append(notice);
    scroll();
  };
  const renderUsage = () => {
    usage.textContent = limitReached
      ? `${promptsUsed} / ${promptLimit} questions · Limit reached`
      : `${promptsUsed} / ${promptLimit} questions`;
    usage.classList.toggle("cb-usage-limit", limitReached);
  };
  const addLimitNotice = () => {
    if (messages.querySelector(".cb-limit-notice")) return;
    const notice = make("div", "cb-limit-notice");
    notice.setAttribute("role", "status");
    const text = make(
      "span",
      "",
      "This conversation has reached its limit. Start a new chat to continue.",
    );
    const action = make("button", "cb-limit-action", "New chat");
    action.type = "button";
    action.addEventListener("click", () => resetChat());
    notice.append(text, action);
    messages.append(notice);
    scroll();
  };
  const setOpen = (value) => {
    if (destroyed || open === value) return;
    open = value;
    win.classList.toggle("cb-open", value);
    launcher.classList.toggle("cb-active", value);
    launcher.setAttribute("aria-expanded", String(value));
    if (value) {
      teaser.classList.remove("cb-visible");
      localStorage.setItem(teaserKey, "seen");
      if (!preview)
        setTimeout(() => {
          if (!destroyed && open) input.focus();
        }, 210);
    } else launcher.focus();
    onOpenChange?.(value);
  };
  const renderChips = () => {
    chips.replaceChildren();
    config.texts.starterQuestions.forEach((question) => {
      const chip = make("button", "cb-chip", question);
      chip.type = "button";
      chip.addEventListener("click", () => sendMessage(question));
      chips.append(chip);
    });
    chips.hidden = chipsUsed || !config.texts.starterQuestions.length;
  };
  const hideChips = () => {
    if (!chipsUsed) {
      chipsUsed = true;
      chips.hidden = true;
    }
  };
  const autoGrow = () => {
    input.style.height = "auto";
    input.style.height = `${Math.min(input.scrollHeight, 96)}px`;
    const length = input.value.length;
    counter.hidden = length < Math.floor(config.limits.messageCharacters * 0.9);
    counter.textContent = `${length}/${config.limits.messageCharacters}`;
    counter.classList.toggle("cb-counter-limit", length >= config.limits.messageCharacters);
  };
  const renderLeadForm = (payload) => {
    const form = make("form", "cb-form");
    form.noValidate = true;
    form.append(make("p", "cb-form-title", "Request an appointment"));
    const error = make("p", "cb-form-error");
    error.hidden = true;
    const controls = new Map();
    (payload.fields || []).forEach((field) => {
      const name = field.name || field.id;
      if (!name) return;
      const label = make("label");
      const labelText = make("span", "cb-form-label", field.label || name);
      if (field.required !== false) {
        labelText.append(make("span", "cb-required", " *"));
      }
      const control = make("input");
      control.name = name;
      control.required = field.required !== false;
      control.type = ["email", "date", "tel"].includes(field.type) ? field.type : "text";
      control.autocomplete = name === "phone" ? "tel" : name === "email" ? "email" : "name";
      control.maxLength = name === "phone" ? 40 : 255;
      const fieldError = make("span", "cb-field-error");
      fieldError.hidden = true;
      control.setAttribute("aria-describedby", `cb-${name}-error`);
      fieldError.id = `cb-${name}-error`;
      control.addEventListener("input", () => {
        control.removeAttribute("aria-invalid");
        fieldError.hidden = true;
        error.hidden = true;
      });
      label.append(labelText, control, fieldError);
      form.append(label);
      controls.set(name, { control, error: fieldError, label: field.label || name });
    });
    const showFieldError = (name, message) => {
      const field = controls.get(name);
      if (!field) return false;
      field.control.setAttribute("aria-invalid", "true");
      field.error.textContent = message;
      field.error.hidden = false;
      return true;
    };
    const validate = () => {
      let valid = true;
      controls.forEach(({ control, error: fieldError, label }) => {
        control.removeAttribute("aria-invalid");
        fieldError.hidden = true;
        const value = control.value.trim();
        if (control.required && !value) {
          showFieldError(control.name, `${label} is required.`);
          valid = false;
        } else if (value && !control.validity.valid) {
          showFieldError(
            control.name,
            control.validity.typeMismatch
              ? `Enter a valid ${control.name === "email" ? "email address" : label.toLowerCase()}.`
              : `${label} is invalid.`,
          );
          valid = false;
        }
      });
      const email = controls.get("email")?.control.value.trim();
      const phone = controls.get("phone")?.control.value.trim();
      if (controls.has("email") && controls.has("phone") && !email && !phone) {
        showFieldError("email", "Enter an email address or phone number.");
        valid = false;
      }
      return valid;
    };
    const submit = make("button", "", "Send request");
    submit.type = "submit";
    form.append(error, submit);
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      error.hidden = true;
      if (!validate()) return;
      submit.disabled = true;
      try {
        const fields = Object.fromEntries(new FormData(form));
        const response = await fetch(
          `${apiBase.replace(/\/$/, "")}/api/v1/leads/${encodeURIComponent(botId)}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              conversationId: localStorage.getItem(`cb-conversation-${botId}`),
              fields,
            }),
          },
        );
        if (!response.ok) {
          const body = await response.json().catch(() => null);
          const validationErrors = body?.errors && typeof body.errors === "object"
            ? Object.entries(body.errors)
            : [];
          let displayed = false;
          validationErrors.forEach(([key, messages]) => {
            const name = key.replace(/^fields\./, "");
            const message = Array.isArray(messages) ? messages[0] : messages;
            if (typeof message === "string") displayed = showFieldError(name, message) || displayed;
          });
          if (displayed) return;
          throw new Error(body?.message || "We could not send your request. Please try again.");
        }
        form.replaceWith(make("p", "cb-form-success", "Thanks! We'll contact you soon."));
        scroll();
      } catch (requestError) {
        error.textContent = requestError.message || "We could not send your request. Please try again.";
        error.hidden = false;
      } finally {
        submit.disabled = false;
      }
    });
    messages.append(form);
    scroll();
  };
  const sendMessage = async (message) => {
    if (!message.trim() || sending || limitReached) return;
    if (message.length > config.limits.messageCharacters) {
      addError(`Please keep your message within ${config.limits.messageCharacters} characters.`);
      return;
    }
    if (preview && testHistory.length + 2 > promptLimit * 2) {
      addError("Test session limit reached. Reset chat to start a new session.");
      return;
    }
    const requestGeneration = generation;
    lastMessage = message.trim();
    hideChips();
    addMessage("user", lastMessage);
    input.value = "";
    autoGrow();
    sending = true;
    input.disabled = true;
    send.disabled = true;
    typing.hidden = false;
    scroll();
    let reply = null;
    let answer = "";
    try {
      await streamChat({
        apiBase,
        botId,
        conversationId: preview ? null : localStorage.getItem(`cb-conversation-${botId}`),
        message: lastMessage,
        test: preview,
        history: preview ? testHistory : undefined,
        authToken: preview ? getAuthToken() : null,
        assistantRules: preview ? config.settings?.assistantRules : undefined,
        botName: preview ? config.texts.botName : undefined,
        onToken: (token) => {
          if (destroyed || requestGeneration !== generation) return;
          if (!token) return;
          answer += token;
          if (!answer.trim()) return;
          typing.hidden = true;
          reply ??= addMessage("bot", "");
          markdown(reply.bubble, answer);
          if (nearBottom()) scroll();
        },
        onLeadForm: (payload) => {
          if (!destroyed && requestGeneration === generation) renderLeadForm(payload);
        },
        onUsage: (nextUsage) => {
          if (preview || destroyed || requestGeneration !== generation) return;
          promptsUsed = Number(nextUsage.used) || promptsUsed;
          promptLimit = Number(nextUsage.limit) || promptLimit;
          limitReached = Boolean(nextUsage.reached);
          renderUsage();
        },
      });
      if (destroyed || requestGeneration !== generation) return;
      if (!answer) reply?.row.remove();
      else if (preview) testHistory.push(
        { role: "user", text: lastMessage },
        { role: "assistant", text: answer.slice(0, 100000) },
      );
      else {
        history.push({ kind: "bot", content: answer, stamp: reply?.stamp || time() });
        persist();
      }
      if (!preview && limitReached) addLimitNotice();
    } catch (err) {
      if (destroyed || requestGeneration !== generation) return;
      typing.hidden = true;
      reply?.row.remove();
      if (!preview && err.status === 409 && /message limit/i.test(err.message || "")) {
        promptsUsed = promptLimit;
        limitReached = true;
        renderUsage();
        persist();
        addLimitNotice();
      } else addError(err.message || "Unable to send message.", lastMessage);
    } finally {
      if (destroyed || requestGeneration !== generation) return;
      sending = false;
      input.disabled = limitReached;
      if (!limitReached) input.focus();
      send.disabled = limitReached || !input.value.trim() || input.value.length > config.limits.messageCharacters;
      typing.hidden = true;
    }
  };
  let greeting;
  let restored = null;
  if (!preview) {
    try {
      const saved = JSON.parse(localStorage.getItem(stateKey) || "null");
      if (saved && Date.now() - saved.updatedAt < config.limits.conversationInactivityHours * 3600000 && Array.isArray(saved.messages))
        restored = saved;
    } catch {}
  }
  if (restored) {
    if (restored.conversationId)
      localStorage.setItem(`cb-conversation-${botId}`, restored.conversationId);
    restored.messages.forEach((item) => {
      const entry = addMessage(item.kind, item.content);
      if (!greeting && item.kind === "bot") greeting = entry;
    });
    chipsUsed = restored.messages.some((item) => item.kind === "user");
    promptsUsed = Number(restored.usage?.used)
      || restored.messages.filter((item) => item.kind === "user").length;
    limitReached = promptsUsed >= promptLimit;
  } else
    greeting = addMessage(
      "bot",
      failed && config.texts.offlineMessage
        ? config.texts.offlineMessage
        : config.texts.greetingMessage,
    );
  previewMessages.forEach(({ role, text }) => {
    if (typeof text === "string" && text.trim()) addMessage(role === "user" ? "user" : "bot", text);
  });
  renderUsage();
  if (!preview && limitReached) addLimitNotice();
  renderChips();
  if (defaultOpen) setOpen(true);
  if (!localStorage.getItem(teaserKey))
    setTimeout(() => {
      if (!open) teaser.classList.add("cb-visible");
    }, 3e3);
  teaserClose.addEventListener("click", () => {
    teaser.classList.remove("cb-visible");
    localStorage.setItem(teaserKey, "seen");
  });
  launcher.addEventListener("click", () => setOpen(!open));
  close.addEventListener("click", () => setOpen(false));
  compose.addEventListener("submit", (event) => {
    event.preventDefault();
    sendMessage(input.value);
  });
  input.addEventListener("input", () => {
    autoGrow();
    send.disabled = sending || !input.value.trim();
  });
  input.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      compose.requestSubmit();
    }
  });
  messages.addEventListener("scroll", () => {
    scrollButton.hidden = nearBottom();
  });
  scrollButton.addEventListener("click", scroll);
  win.append(scrollButton);
  const escape = (event) => {
    if (event.key === "Escape" && open) setOpen(false);
  };
  document.addEventListener("keydown", escape);
  function resetChat() {
    generation += 1;
    sending = false;
    chipsUsed = false;
    lastSender = "";
    lastMinute = "";
    lastMessage = "";
    messageCount = 0;
    promptsUsed = 0;
    limitReached = false;
    if (!preview) {
      localStorage.removeItem(`cb-conversation-${botId}`);
      localStorage.removeItem(stateKey);
    }
    history.length = 0;
    testHistory.length = 0;
    messages.replaceChildren();
    greeting = addMessage(
      "bot",
      failed && config.texts.offlineMessage
        ? config.texts.offlineMessage
        : config.texts.greetingMessage,
    );
    renderChips();
    renderUsage();
    input.disabled = false;
    input.value = "";
    send.disabled = true;
    typing.hidden = true;
    autoGrow();
    input.focus();
  }
  const widget = {
    destroy() {
      if (destroyed) return;
      destroyed = true;
      generation += 1;
      document.removeEventListener("keydown", escape);
      host.remove();
    },
    open() {
      setOpen(true);
    },
    close() {
      setOpen(false);
    },
    resetChat() {
      resetChat();
    },
    update(nextConfig) {
      if (destroyed) return;
      const oldGreeting = config.texts.greetingMessage;
      const scrollTop = messages.scrollTop;
      config = nextConfig;
      input.maxLength = config.limits.messageCharacters;
      promptLimit = config.limits.conversationPrompts;
      limitReached = promptsUsed >= promptLimit;
      renderUsage();
      applyTheme(host, config);
      root.classList.toggle("cb-left", config.theme.position === "left");
      root.classList.toggle("cb-right", config.theme.position === "right");
      launcher.setAttribute("aria-label", `Open ${config.texts.botName} chat`);
      win.setAttribute("aria-label", `${config.texts.botName} chat`);
      title.textContent = config.texts.botName;
      const nextAvatar = config.texts.avatarUrl
        ? make("img", "cb-avatar")
        : make("div", "cb-avatar cb-avatar-initials", initials(config.texts.botName));
      if (config.texts.avatarUrl) {
        nextAvatar.src = config.texts.avatarUrl;
        nextAvatar.alt = "";
      }
      avatar.replaceWith(nextAvatar);
      avatar = nextAvatar;
      root.querySelectorAll(".cb-message-avatar").forEach((node) => {
        node.replaceWith(botAvatar());
      });
      launchArea.querySelector(".cb-launch-label")?.remove();
      if (config.texts.launcherLabel)
        launchArea.prepend(make("span", "cb-launch-label", config.texts.launcherLabel));
      teaser.firstChild.textContent = config.texts.greetingMessage.slice(0, 140);
      input.placeholder = config.texts.inputPlaceholder;
      autoGrow();
      input.setAttribute("aria-label", config.texts.inputPlaceholder);
      footer.hidden = !config.branding.showBadge;
      if (messageCount === 1 && oldGreeting !== config.texts.greetingMessage)
        markdown(
          greeting.bubble,
          failed && config.texts.offlineMessage
            ? config.texts.offlineMessage
            : config.texts.greetingMessage,
        );
      if (!chipsUsed) renderChips();
      messages.scrollTop = scrollTop;
    },
  };
  return widget;
}
export { mountWidget };
