function appendInline(parent, text) {
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*|https?:\/\/[^\s]+)/g);
  for (const part of parts) {
    if (!part) continue;
    let element;
    if (/^\*\*[^*]+\*\*$/.test(part)) {
      element = document.createElement("strong");
      element.textContent = part.slice(2, -2);
    } else if (/^\*[^*]+\*$/.test(part)) {
      element = document.createElement("em");
      element.textContent = part.slice(1, -1);
    } else if (/^https?:\/\//.test(part)) {
      element = document.createElement("a");
      element.href = part;
      element.target = "_blank";
      element.rel = "noopener noreferrer";
      element.textContent = part;
    } else {
      parent.append(part);
      continue;
    }
    parent.append(element);
  }
}

export function renderChatMessage(target, value) {
  const content = document.createDocumentFragment();
  let list;
  for (const line of String(value ?? "").split(/\r?\n/)) {
    const bullet = /^\s*[-*]\s+(.+)$/.exec(line);
    if (bullet) {
      if (!list) {
        list = document.createElement("ul");
        content.append(list);
      }
      const item = document.createElement("li");
      appendInline(item, bullet[1]);
      list.append(item);
    } else {
      list = null;
      const paragraph = document.createElement("p");
      appendInline(paragraph, line);
      content.append(paragraph);
    }
  }
  target.replaceChildren(content);
}
