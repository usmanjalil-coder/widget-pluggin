var ChatbotWidgetBundle=(()=>{var nt=/^\/api\/v1\/bot-logos\/[a-zA-Z0-9]{40}\.(?:jpg|jpeg|png|webp)$/,it=t=>t==="localhost"||t==="127.0.0.1"||t==="[::1]"||t.endsWith(".test");function ge(t,r=""){if(typeof t!="string"||!t)return"";try{let e=new URL(t);if(!["http:","https:"].includes(e.protocol)||e.username||e.password)return"";let i=it(e.hostname)&&nt.test(e.pathname)&&!e.search&&!e.hash;if(i&&r){let c=new URL(r);c.protocol==="http:"&&c.host===e.host&&(e.protocol="http:")}return e.protocol==="https:"||e.protocol==="http:"&&i?e.href:""}catch{return""}}var fe=Object.freeze({botName:40,launcherLabel:24,greetingMessage:200,inputPlaceholder:60,offlineMessage:200,starterQuestion:60,starterQuestions:4,avatarUrl:2048}),Je=/^#(?:[0-9a-f]{3}|[0-9a-f]{6})$/i;var ne={theme:{primaryColor:"#4F46E5",mode:"light",position:"right",borderRadius:16,fontFamily:"system"},texts:{botName:"Assistant",avatarUrl:"",greetingMessage:"Hi! How can I help?",inputPlaceholder:"Type your question...",launcherLabel:"",starterQuestions:[],offlineMessage:""},features:{leadCapture:!0,dentalNotice:!1},branding:{showBadge:!0,badgeText:""},limits:{conversationPrompts:15},contactText:"the office",dir:"",zIndex:2147483647},he={system:'Inter, var(--font-inter, system-ui), -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',sans:"Arial, Helvetica, sans-serif",serif:"Georgia, serif",mono:"ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace"},ze=(t,r,e)=>typeof t=="string"?t.slice(0,e):r;function K(t,r){let e={...t};return Object.keys(r||{}).forEach(i=>{e[i]=r[i]&&typeof r[i]=="object"&&!Array.isArray(r[i])?K(t[i]||{},r[i]):r[i]}),e}function Ue(t,r=!1){let e=K(ne,t||{});e.theme.primaryColor=Je.test(e.theme.primaryColor)?e.theme.primaryColor:ne.theme.primaryColor,e.theme.mode=["light","dark","auto"].includes(e.theme.mode)?e.theme.mode:"light",e.theme.position=e.theme.position==="left"?"left":"right",e.theme.borderRadius=Math.max(0,Math.min(28,Number.isFinite(Number(e.theme.borderRadius))?Number(e.theme.borderRadius):ne.theme.borderRadius)),e.theme.fontFamily=he[e.theme.fontFamily]?he[e.theme.fontFamily]:Object.values(he).includes(e.theme.fontFamily)?e.theme.fontFamily:he.system,Object.keys(ne.texts).forEach(c=>{c!=="starterQuestions"&&(e.texts[c]=ze(e.texts[c],ne.texts[c],fe[c]))});let i=r&&typeof window<"u"&&e.texts.avatarUrl.startsWith(`blob:${window.location.origin}/`);return e.texts.avatarUrl=i?e.texts.avatarUrl:ge(e.texts.avatarUrl),e.texts.starterQuestions=Array.isArray(e.texts.starterQuestions)?e.texts.starterQuestions.filter(c=>typeof c=="string").slice(0,fe.starterQuestions).map(c=>c.slice(0,fe.starterQuestion)):[],e.features.leadCapture=!!e.features.leadCapture,e.features.dentalNotice=!!e.features.dentalNotice,e.branding.showBadge=!!e.branding.showBadge,e.branding.badgeText=ze(e.branding.badgeText,"",80),e.limits.conversationPrompts=Math.max(1,Math.min(100,Number(e.limits.conversationPrompts)||15)),e.contactText=ze(e.contactText,"the office",120),e.dir=e.dir==="rtl"?"rtl":"",e.zIndex=Math.max(1,Math.min(2147483647,Number(e.zIndex)||2147483647)),e}function Oe(t){if(!t)return{};let r={},e={};return t.dataset.primaryColor!==void 0&&(r.primaryColor=t.dataset.primaryColor),t.dataset.position!==void 0&&(r.position=t.dataset.position),t.dataset.greeting!==void 0&&(e.greetingMessage=t.dataset.greeting),t.dataset.botName!==void 0&&(e.botName=t.dataset.botName),{theme:r,texts:e}}async function Xe(t,r){let e=d=>({...d,texts:{...d.texts,avatarUrl:ge(d.texts?.avatarUrl,t)}}),i=`cb-config-${r}`;try{let d=JSON.parse(sessionStorage.getItem(i)||"null");if(d&&d.expires>Date.now())return e(d.config)}catch{}let c=await fetch(`${t.replace(/\/$/,"")}/api/v1/widget/config/${encodeURIComponent(r)}`,{headers:{Accept:"application/json"}});if(!c.ok)throw new Error("Configuration unavailable");let f=await c.json(),g=f.data||f;try{sessionStorage.setItem(i,JSON.stringify({config:g,expires:Date.now()+6e4}))}catch{}return e(g)}var Ve=`
:host {
  all: initial;
  font-family: var(--cb-font);
  color: var(--cb-text);
}
[hidden] { display: none !important; }
button:focus-visible { outline: 3px solid color-mix(in srgb, var(--cb-primary) 40%, var(--cb-text)); outline-offset: 2px; }
*,
*:before,
*:after {
  box-sizing: border-box;
}
button,
input,
textarea {
  font: inherit;
}
button {
  cursor: pointer;
}
.cb-root {
  font-family: var(--cb-font);
  color: var(--cb-text);
  line-height: 1.4;
}
:host(.cb-embedded-host) { position: absolute; inset: 0; display: block; container-type: size; }
.cb-embedded { position: absolute; bottom: 16px; right: 16px; }
.cb-embedded:not(.cb-preview).cb-left { left: 16px; right: auto; }
.cb-root.cb-preview { position: absolute; inset: 0; }
.cb-preview .cb-launch-area { position: absolute; right: 16px; bottom: 16px; }
.cb-preview.cb-left .cb-launch-area { right: auto; left: 16px; }
.cb-preview .cb-window { top: 0; bottom: auto; width: min(350px, calc(100% - 32px)); height: min(580px, calc(100% - 92px)); min-height: 0; max-width: none; max-height: none; }
.cb-preview.cb-left .cb-window { left: 16px; right: auto; }
.cb-preview.cb-right .cb-window { right: 16px; left: auto; }
.cb-fixed {
  position: fixed;
  bottom: max(24px, env(safe-area-inset-bottom));
  z-index: var(--cb-z, 2147483647);
}
.cb-fixed.cb-left {
  left: max(24px, env(safe-area-inset-left));
}
.cb-fixed.cb-right {
  right: max(24px, env(safe-area-inset-right));
}
.cb-launch-area {
  position: relative;
  display: flex;
  align-items: center;
  gap: 10px;
}
.cb-right .cb-launch-area {
  justify-content: flex-end;
}
.cb-launcher {
  position: relative;
  display: grid;
  place-items: center;
  width: 60px;
  height: 60px;
  flex: none;
  border: 0;
  border-radius: var(--cb-radius);
  color: var(--cb-on-primary);
  background:
    linear-gradient(
      145deg,
      color-mix(in srgb, var(--cb-primary) 97%, white),
      var(--cb-primary) 52%,
      color-mix(in srgb, var(--cb-primary) 98%, black));
  box-shadow: 0 10px 22px color-mix(in srgb, var(--cb-primary) 27%, transparent), 0 3px 8px rgba(15, 23, 42, .16);
  transition: transform .18s ease, box-shadow .18s ease;
}
.cb-launcher:hover {
  transform: translateY(-2px) scale(1.04);
  box-shadow: 0 15px 28px color-mix(in srgb, var(--cb-primary) 35%, transparent), 0 3px 8px rgba(15, 23, 42, .14);
}
.cb-launcher:active {
  transform: scale(.94);
}
.cb-launcher:focus-visible,
.cb-close:focus-visible,
.cb-send:focus-visible,
.cb-chip:focus-visible,
.cb-scroll-bottom:focus-visible {
  outline: 3px solid color-mix(in srgb, var(--cb-primary) 38%, white);
  outline-offset: 3px;
}
.cb-launcher:after {
  content: "";
  position: absolute;
  inset: -7px;
  border: 2px solid var(--cb-primary);
  border-radius: calc(var(--cb-radius) + 7px);
  opacity: 0;
  animation: cb-pulse 1.4s ease-out .4s 1;
}
.cb-icon {
  width: 25px;
  height: 25px;
  fill: none;
  stroke: currentColor;
  stroke-width: 2.15;
  stroke-linecap: round;
  stroke-linejoin: round;
  position: absolute;
  transition: opacity .16s ease, transform .16s ease;
}
.cb-icon-close {
  opacity: 0;
  transform: rotate(-55deg) scale(.7);
}
.cb-launcher.cb-active .cb-icon-chat {
  opacity: 0;
  transform: rotate(55deg) scale(.7);
}
.cb-launcher.cb-active .cb-icon-close {
  opacity: 1;
  transform: none;
}
.cb-launch-label {
  border: 0;
  border-radius: var(--cb-radius);
  padding: 9px 13px;
  background: var(--cb-bg);
  color: var(--cb-text);
  box-shadow: 0 5px 18px rgba(15, 23, 42, .13);
  font-size: 13px;
  font-weight: 500;
  white-space: nowrap;
}
.cb-teaser {
  visibility: hidden;
  position: absolute;
  bottom: 72px;
  width: max-content;
  max-width: 270px;
  padding: 11px 37px 11px 13px;
  border: 1px solid color-mix(in srgb, var(--cb-text) 8%, transparent);
  border-radius: var(--cb-radius);
  background: var(--cb-bg);
  color: var(--cb-text);
  box-shadow: 0 10px 26px rgba(15, 23, 42, .15);
  font-size: 13px;
  line-height: 1.4;
  opacity: 0;
  transform: translateY(7px);
  pointer-events: none;
  transition: opacity .2s ease, transform .2s ease;
}
.cb-right .cb-teaser {
  right: 0;
}
.cb-left .cb-teaser {
  left: 0;
}
.cb-teaser.cb-visible {
  visibility: visible;
  opacity: 1;
  transform: none;
  pointer-events: auto;
}
.cb-teaser-close {
  position: absolute;
  top: 5px;
  right: 6px;
  border: 0;
  background: transparent;
  color: var(--cb-muted);
  font-size: 20px;
  line-height: 1;
}
.cb-window {
  visibility: hidden;
  position: absolute;
  bottom: 76px;
  width: min(380px, calc(100vw - 32px));
  height: min(600px, calc(100dvh - 120px));
  min-height: min(420px, calc(100dvh - 32px));
  max-height: none;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: var(--cb-bg);
  border: 1px solid color-mix(in srgb, var(--cb-text) 10%, transparent);
  border-radius: var(--cb-radius);
  box-shadow: 0 26px 65px rgba(24, 24, 27, .12), 0 5px 18px rgba(24, 24, 27, .06);
  transform: translateY(18px) scale(.94);
  transform-origin: bottom right;
  opacity: 0;
  pointer-events: none;
  transition: opacity .2s ease-out, transform .2s cubic-bezier(.2, .8, .2, 1);
}
.cb-left .cb-window {
  left: 0;
  transform-origin: bottom left;
}
.cb-right .cb-window {
  right: 0;
}
.cb-window.cb-open {
  visibility: visible;
  opacity: 1;
  transform: none;
  pointer-events: auto;
}
.cb-header {
  position: sticky;
  top: 0;
  z-index: 1;
  flex: none;
  min-height: 76px;
  padding: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--cb-on-primary);
  background:
    linear-gradient(
      135deg,
      color-mix(in srgb, var(--cb-primary) 98%, white),
      var(--cb-primary) 58%,
      color-mix(in srgb, var(--cb-primary) 98%, black));
}
.cb-avatar {
  width: 36px;
  height: 36px;
  flex: none;
  border-radius: 50%;
  object-fit: cover;
  background: rgba(255, 255, 255, .22);
  border: 1px solid rgba(255, 255, 255, .26);
}
.cb-avatar-initials {
  display: grid;
  place-items: center;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: .02em;
}
.cb-head-copy {
  flex: 1;
  min-width: 0;
}
.cb-title {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 14px;
  font-weight: 600;
}
.cb-presence {
  display: flex;
  align-items: center;
  gap: 5px;
  margin-top: 2px;
  font-size: 11px;
  flex-wrap: wrap;
}
.cb-reply-time { margin-top: 2px; font-size: 11px; line-height: 1.5; }
.cb-online {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #62e8a1;
  box-shadow: 0 0 0 3px rgba(98, 232, 161, .18);
}
.cb-close {
  position: relative;
  display: grid;
  place-items: center;
  width: 34px;
  height: 34px;
  flex: none;
  border: 0;
  border-radius: var(--cb-radius);
  color: inherit;
  background: rgba(255, 255, 255, .13);
}
.cb-close-icon { position: static; width: 18px; height: 18px; }
.cb-close:hover {
  background: rgba(255, 255, 255, .24);
}
.cb-messages {
  position: relative;
  flex: 1 1 auto;
  min-height: 0;
  overflow-y: auto;
  padding: 24px 20px 12px;
  background: var(--cb-surface);
  scrollbar-width: thin;
  scrollbar-color: color-mix(in srgb, var(--cb-text) 23%, transparent) transparent;
}
.cb-messages::-webkit-scrollbar {
  width: 7px;
}
.cb-messages::-webkit-scrollbar-thumb {
  border: 2px solid var(--cb-surface);
  border-radius: 8px;
  background: color-mix(in srgb, var(--cb-text) 23%, transparent);
}
.cb-message-row {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  margin: 0 0 12px;
  animation: cb-in .2s ease-out both;
}
.cb-message-row.cb-user-row {
  justify-content: flex-end;
}
.cb-message-row.cb-grouped {
  margin-top: -7px;
}
.cb-message-row.cb-grouped .cb-message-avatar {
  visibility: hidden;
}
.cb-message-avatar {
  display: grid;
  place-items: center;
  width: 28px;
  height: 28px;
  flex: none;
  overflow: hidden;
  border-radius: 50%;
  background: var(--cb-primary);
  color: var(--cb-on-primary);
  font-size: 10px;
  font-weight: 600;
  margin-top: 8px;
}
.cb-message-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.cb-message-wrap {
  max-width: 80%;
}
.cb-message {
  padding: 10px 12px;
  border: 1px solid color-mix(in srgb, var(--cb-text) 9%, transparent);
  border-radius: var(--cb-radius) var(--cb-radius) var(--cb-radius) min(4px, var(--cb-radius));
  background: var(--cb-bg);
  color: var(--cb-text);
  box-shadow: 0 1px 1px rgba(15, 23, 42, .025);
  font-size: 13px;
  line-height: 1.5;
  overflow-wrap: anywhere;
}
.cb-user {
  border: 0;
  border-radius: var(--cb-radius) var(--cb-radius) min(4px, var(--cb-radius)) var(--cb-radius);
  background: var(--cb-primary);
  color: var(--cb-on-primary);
}
.cb-error-notice {
  display: flex;
  align-items: center;
  gap: 8px;
  width: fit-content;
  max-width: 100%;
  margin: 12px auto;
  padding: 8px 9px;
  border: 1px solid color-mix(in srgb, var(--cb-danger) 25%, transparent);
  border-radius: 10px;
  background: color-mix(in srgb, var(--cb-danger) 6%, var(--cb-surface));
  color: var(--cb-muted);
  font-size: 12px;
  line-height: 1.4;
}
.cb-error-symbol {
  display: grid;
  place-items: center;
  width: 16px;
  height: 16px;
  flex: none;
  border-radius: 50%;
  background: var(--cb-danger);
  color: white;
  font-size: 11px;
  font-weight: 700;
}
.cb-error-text { overflow-wrap: anywhere; }
.cb-timestamp {
  display: block; padding: 4px 2px 0; color: var(--cb-muted); font-size: 11px;
}
.cb-user-row .cb-timestamp {
  text-align: right;
}
.cb-markdown p {
  margin: 0 0 8px;
}
.cb-markdown p:last-child {
  margin-bottom: 0;
}
.cb-markdown strong {
  font-weight: 600;
}
.cb-markdown em {
  font-style: italic;
}
.cb-markdown a {
  color: inherit;
  text-decoration: underline;
  font-weight: 500;
}
.cb-markdown ul {
  margin: 7px 0 3px;
  padding-left: 18px;
}
.cb-typing-row {
  flex: none;
  display: flex;
  align-items: flex-end;
  gap: 7px;
  padding: 8px 20px 12px; background: var(--cb-surface);
}
.cb-typing-bubble {
  display: flex;
  gap: 4px;
  padding: 11px 13px;
  border: 1px solid color-mix(in srgb, var(--cb-text) 9%, transparent);
  border-radius: var(--cb-radius) var(--cb-radius) var(--cb-radius) min(4px, var(--cb-radius));
  background: var(--cb-bg);
}
.cb-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--cb-muted);
  animation: cb-bounce 1s infinite;
}
.cb-dot:nth-child(2) {
  animation-delay: .14s;
}
.cb-dot:nth-child(3) {
  animation-delay: .28s;
}
.cb-chips {
  flex: none;
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
  padding: 12px 16px 0;
  background: var(--cb-bg);
}
.cb-chip {
  border: 1px solid color-mix(in srgb, var(--cb-text) 18%, var(--cb-bg));
  border-radius: var(--cb-radius);
  padding: 5px 9px;
  color: var(--cb-text);
  background: var(--cb-bg);
  font-size: 10px;
  font-weight: 500;
  transition:
    background .15s,
    color .15s,
    transform .15s;
}
.cb-chip:hover {
  color: var(--cb-on-primary);
  background: var(--cb-primary);
  transform: translateY(-1px);
}
.cb-counter { flex: none; color: var(--cb-muted); font-size: 10px; padding-bottom: 7px; }
.cb-counter-limit { color: var(--cb-danger); }
.cb-usage {
  flex: none;
  padding: 8px 16px 0;
  color: var(--cb-muted);
  background: var(--cb-bg);
  text-align: right;
  font-size: 10px;
}
.cb-usage-limit { color: var(--cb-danger); font-weight: 600; }
.cb-limit-notice {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin: 12px 0;
  padding: 10px 12px;
  border: 1px solid color-mix(in srgb, var(--cb-primary) 22%, transparent);
  border-radius: 10px;
  background: color-mix(in srgb, var(--cb-primary) 6%, var(--cb-surface));
  color: var(--cb-text);
  font-size: 12px;
  line-height: 1.4;
}
.cb-limit-action {
  flex: none;
  border: 0;
  border-radius: 7px;
  padding: 6px 9px;
  color: var(--cb-on-primary);
  background: var(--cb-primary);
  font-size: 11px;
  font-weight: 600;
}
.cb-compose {
  flex: none;
  display: flex;
  align-items: flex-end;
  gap: 8px;
  margin: 12px 16px 10px;
  padding: 5px 5px 5px 12px;
  border: 1px solid color-mix(in srgb, var(--cb-text) 14%, transparent);
  border-radius: var(--cb-radius);
  background: var(--cb-bg);
  box-shadow: 0 2px 7px rgba(15, 23, 42, .03);
}
.cb-compose:focus-within {
  border-color: var(--cb-primary);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--cb-primary) 17%, transparent);
}
.cb-input {
  width: 100%;
  min-height: 31px;
  max-height: 96px;
  padding: 7px 0;
  resize: none;
  border: 0;
  outline: 0;
  color: var(--cb-text);
  background: transparent;
  font-size: 14px;
  line-height: 1.4;
}
.cb-input::placeholder {
  color: var(--cb-muted);
}
.cb-send {
  display: grid;
  place-items: center;
  width: 34px;
  height: 34px;
  flex: none;
  border: 0;
  border-radius: var(--cb-radius);
  color: var(--cb-on-primary);
  background: var(--cb-primary);
  transition: transform .15s ease, background .15s ease;
}
.cb-send:hover:not(:disabled) {
  transform: scale(1.06);
}
.cb-send:disabled {
  color: var(--cb-muted);
  background: color-mix(in srgb, var(--cb-text) 10%, transparent);
  cursor: not-allowed;
}
.cb-send svg {
  width: 17px;
  height: 17px;
  fill: none;
  stroke: currentColor;
  stroke-width: 2.3;
  stroke-linecap: round;
  stroke-linejoin: round;
}
.cb-footer {
  flex: none;
  padding: 0 8px 10px;
  color: var(--cb-muted);
  background: var(--cb-bg);
  text-align: center;
  font-size: 11px;
}
.cb-scroll-bottom {
  position: absolute;
  right: 17px;
  bottom: 110px;
  display: grid;
  place-items: center;
  width: 32px;
  height: 32px;
  border: 1px solid color-mix(in srgb, var(--cb-text) 12%, transparent);
  border-radius: var(--cb-radius);
  color: var(--cb-text);
  background: var(--cb-bg);
  box-shadow: 0 4px 14px rgba(15, 23, 42, .14);
}
.cb-form {
  display: grid;
  gap: 10px;
  margin: 0 0 13px 32px;
  padding: 14px;
  border: 1px solid color-mix(in srgb, var(--cb-text) 10%, transparent);
  border-radius: var(--cb-radius);
  background: var(--cb-bg);
  box-shadow: 0 3px 12px rgba(15, 23, 42, .05);
}
.cb-form-title {
  margin: 0;
  font-size: 14px;
  font-weight: 600;
}
.cb-form label {
  display: grid;
  gap: 5px;
  color: var(--cb-text);
  font-size: 12px;
  font-weight: 500;
}
.cb-required,
.cb-field-error {
  color: var(--cb-danger);
}
.cb-field-error {
  font-size: 11px;
  font-weight: 400;
}
.cb-form input {
  width: 100%;
  padding: 9px 10px;
  border: 1px solid color-mix(in srgb, var(--cb-text) 20%, transparent);
  border-radius: var(--cb-radius);
  outline: 0;
  color: var(--cb-text);
  background: var(--cb-bg);
}
.cb-form input[aria-invalid="true"] {
  border-color: var(--cb-danger);
}
.cb-form input:focus {
  border-color: var(--cb-primary);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--cb-primary) 16%, transparent);
}
.cb-form button {
  border: 0;
  border-radius: var(--cb-radius);
  padding: 10px;
  color: var(--cb-on-primary);
  background: var(--cb-primary);
  font-size: 13px;
  font-weight: 600;
}
.cb-retry {
  display: grid;
  place-items: center;
  width: 24px;
  height: 24px;
  flex: none;
  padding: 3px;
  border: 0;
  border-radius: 6px;
  background: transparent;
  color: var(--cb-muted);
}
.cb-retry:hover { background: color-mix(in srgb, var(--cb-danger) 10%, transparent); color: var(--cb-danger); }
.cb-retry svg { width: 15px; height: 15px; fill: none; stroke: currentColor; stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round; }
.cb-form-error {
  margin: 0;
  color: var(--cb-danger);
  font-size: 12px;
}
.cb-form-success {
  margin: 0 0 13px 32px;
  padding: 13px;
  border-radius: var(--cb-radius);
  color: var(--cb-success);
  background: color-mix(in srgb, var(--cb-success) 10%, var(--cb-bg));
  font-size: 13px;
  font-weight: 500;
}
@keyframes cb-pulse {
  0% {
    opacity: .7;
    transform: scale(.7);
  }
  100% {
    opacity: 0;
    transform: scale(1.45);
  }
}
@keyframes cb-in {
  from {
    opacity: 0;
    transform: translateY(5px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}
@keyframes cb-bounce {
  0%, 65%, 100% {
    transform: translateY(0);
    opacity: .55;
  }
  32% {
    transform: translateY(-4px);
    opacity: 1;
  }
}
@media (max-width: 479px) {
  .cb-fixed {
    right: max(12px, env(safe-area-inset-right));
    bottom: max(12px, env(safe-area-inset-bottom));
    left: auto;
  }
  .cb-fixed.cb-left {
    left: max(12px, env(safe-area-inset-left));
    right: auto;
  }
  :where(.cb-fixed) .cb-window {
    position: fixed;
    inset: 0;
    width: 100vw;
    max-width: none;
    height: 100dvh;
    max-height: none;
    border: 0;
    border-radius: 0;
    padding-top: env(safe-area-inset-top);
    padding-bottom: env(safe-area-inset-bottom);
    transform: translateY(18px);
  }
  .cb-preview .cb-launch-area { right: 12px; bottom: 12px; }
  .cb-preview.cb-left .cb-launch-area { right: auto; left: 12px; }
  .cb-preview.cb-left .cb-window { left: 12px; right: auto; }
  .cb-preview.cb-right .cb-window { right: 12px; left: auto; }
  .cb-preview .cb-window { width: calc(100% - 24px); height: calc(100% - 84px); min-height: 0; }
  .cb-header { padding-left: max(16px, env(safe-area-inset-left)); padding-right: max(16px, env(safe-area-inset-right)); }
  .cb-form,
  .cb-form-success {
    margin-left: 0;
  }
}
@media (prefers-reduced-motion: reduce) {
  *,
  *:before,
  *:after {
    scroll-behavior: auto !important;
    animation: none !important;
    transition: none !important;
  }
}
`;function st(t){let r=(t.match(/^event:\s*(.+)$/m)||[])[1]||"message",e=(t.match(/^data:\s*(.+)$/m)||[])[1]||"";try{return{event:r,data:JSON.parse(e)}}catch{return{event:r,data:e}}}async function Ke({apiBase:t,botId:r,conversationId:e,message:i,onToken:c,onLeadForm:f,onUsage:g,test:d=!1,history:b=[],authToken:Z=null,assistantRules:n,botName:T}){let N=await fetch(`${t.replace(/\/$/,"")}/api/v1/${d?`bot/${encodeURIComponent(r)}/test-chat`:`chat/${encodeURIComponent(r)}`}`,{method:"POST",headers:{"Content-Type":"application/json",Accept:"text/event-stream",...d&&Z?{Authorization:`Bearer ${Z}`}:{}},...d?{credentials:"include"}:{},body:JSON.stringify(d?{message:i,history:b,assistantRules:n,botName:T}:{conversationId:e,message:i})});if(!N.ok){let q=await N.json().catch(()=>null),$=d&&N.status===429?"15 test prompts used for this bot. Try again in an hour.":d&&N.status===409?"Test session limit reached. Reset chat to start a new session.":q?.message||"Chat is temporarily unavailable.",_=new Error($);throw _.status=N.status,_}if(!N.body)throw new Error("Chat is temporarily unavailable.");let se=N.body.getReader(),E=new TextDecoder,P="",I=null,k=null,R=!1;for(;;){let{done:q,value:$}=await se.read();if(q)break;P+=E.decode($,{stream:!0});let _=P.split(/\n\n/);P=_.pop(),_.forEach(F=>{let w=st(F);if(w.event==="token"&&c(w.data.token||""),w.event==="lead_form"&&(k=w.data),w.event==="usage"&&g?.(w.data),w.event==="conversation"&&(I=w.data.conversationId),w.event==="done"&&(R=!0,!d&&I&&localStorage.setItem(`cb-conversation-${r}`,I),!d&&k&&f(k)),w.event==="error")throw new Error(w.data.message||"Chat is temporarily unavailable.")})}if(!R)throw new Error("Chat connection ended before the reply was saved.")}function ct(t){let r=t.length===4?`#${t[1]}${t[1]}${t[2]}${t[2]}${t[3]}${t[3]}`:t,e=[1,3,5].map(i=>parseInt(r.slice(i,i+2),16)/255).map(i=>i<=.03928?i/12.92:((i+.055)/1.055)**2.4);return e[0]*.2126+e[1]*.7152+e[2]*.0722>.179?"#18181b":"#ffffff"}function Pe(t,r){let e=r.theme.mode==="dark"||r.theme.mode==="auto"&&window.matchMedia?.("(prefers-color-scheme: dark)").matches;t.style.setProperty("--cb-primary",r.theme.primaryColor),t.style.setProperty("--cb-on-primary",ct(r.theme.primaryColor)),t.style.setProperty("--cb-bg",e?"#202023":"#ffffff"),t.style.setProperty("--cb-surface",e?"#18181b":"#fafafa"),t.style.setProperty("--cb-text",e?"#f4f4f5":"#18181b"),t.style.setProperty("--cb-muted",e?"#a1a1aa":"#71717a"),t.style.setProperty("--cb-success",e?"#6ee7b7":"#047857"),t.style.setProperty("--cb-danger",e?"#fca5a5":"#dc2626"),t.style.setProperty("--cb-radius",`${r.theme.borderRadius}px`),t.style.setProperty("--cb-font",r.theme.fontFamily),t.style.setProperty("--cb-z",String(r.zIndex||2147483647))}var Re={name:"YourBrand",tagline:"AI assistant for websites that answers questions and captures leads.",domain:"yourbrand.example",supportEmail:"support@yourbrand.example",legalName:"YourBrand LLC",defaultTitle:"YourBrand | AI assistant for your website",description:"Add an AI assistant to your website to answer visitor questions, capture leads, and book appointments without code."},{name:At,tagline:Et,domain:$t,supportEmail:Lt,legalName:Mt,defaultTitle:St,description:Tt}=Re;var a=(t,r,e)=>{let i=document.createElement(t);return r&&(i.className=r),e!==void 0&&(i.textContent=e),i},ve=(t,r="")=>{let e=document.createElementNS("http://www.w3.org/2000/svg","svg");return e.setAttribute("viewBox","0 0 24 24"),e.setAttribute("aria-hidden","true"),r&&e.setAttribute("class",r),t.forEach(i=>{let c=document.createElementNS("http://www.w3.org/2000/svg",i.tag||"path");Object.keys(i).forEach(f=>{f!=="tag"&&c.setAttribute(f,i[f])}),e.append(c)}),e},lt=()=>ve([{d:"M20 11.5a7.5 7.5 0 0 1-7.8 7.49 8.7 8.7 0 0 1-3.12-.58L4 20l1.5-4.2A7.25 7.25 0 0 1 4 11.5 7.5 7.5 0 0 1 11.75 4 7.5 7.5 0 0 1 20 11.5Z"},{d:"M8.5 11.5h.01M12 11.5h.01M15.5 11.5h.01"}],"cb-icon cb-icon-chat"),Ze=(t="cb-icon cb-icon-close")=>ve([{d:"m7 7 10 10M17 7 7 17"}],t),dt=()=>ve([{d:"M12 19V5M6.5 10.5 12 5l5.5 5.5"}]),bt=()=>ve([{d:"M3 12a9 9 0 1 0 2.6-6.4L3 8"},{d:"M3 3v5h5"}]),xe=t=>t.split(/\s+/).filter(Boolean).slice(0,2).map(r=>r[0]).join("").toUpperCase()||"AI",et=()=>new Intl.DateTimeFormat(void 0,{hour:"numeric",minute:"2-digit"}).format(new Date);function Be(t,r){t.replaceChildren();let e=(c,f)=>f.split(/(\*\*[^*]+\*\*|\*[^*]+\*|https?:\/\/[^\s]+)/g).forEach(g=>{if(g)if(/^\*\*[^*]+\*\*$/.test(g))c.append(a("strong","",g.slice(2,-2)));else if(/^\*[^*]+\*$/.test(g))c.append(a("em","",g.slice(1,-1)));else if(/^https?:\/\//.test(g)){let d=a("a","",g);d.href=g,d.target="_blank",d.rel="noopener noreferrer",c.append(d)}else c.append(document.createTextNode(g))}),i;String(r||"").split(`
`).forEach(c=>{let f=/^\s*[-*]\s+(.+)$/.exec(c);if(f){i||(i=a("ul"),t.append(i));let g=a("li");e(g,f[1]),i.append(g)}else{i=null;let g=a("p");e(g,c),t.append(g)}})}function tt({container:t,botId:r,apiBase:e,getAuthToken:i=()=>null,config:c,failed:f,defaultOpen:g,onOpenChange:d,preview:b=!1,previewMessages:Z=[]}){let n=c,T=a("div","cb-host");t&&T.classList.add("cb-embedded-host");let N=T.attachShadow({mode:"open"}),se=a("style"),E=!1;se.textContent=Ve,N.append(se),Pe(T,n);let P=a("div",`cb-root ${t?"cb-embedded":"cb-fixed"}${b?" cb-preview":""} cb-${n.theme.position}`),I=a("div","cb-launch-area"),k=a("button","cb-launcher");k.type="button",k.setAttribute("aria-label",`Open ${n.texts.botName} chat`),k.setAttribute("aria-expanded","false"),k.append(lt(),Ze()),n.texts.launcherLabel&&I.append(a("span","cb-launch-label",n.texts.launcherLabel)),I.append(k);let R=a("div","cb-teaser",n.texts.greetingMessage.slice(0,140)),q=a("button","cb-teaser-close","\xD7");q.type="button",q.setAttribute("aria-label","Dismiss greeting"),R.append(q),I.append(R);let $=a("section","cb-window");$.setAttribute("role","dialog"),$.setAttribute("aria-label",`${n.texts.botName} chat`),$.setAttribute("aria-modal","true");let _=a("header","cb-header"),F=n.texts.avatarUrl?a("img","cb-avatar"):a("div","cb-avatar cb-avatar-initials",xe(n.texts.botName));n.texts.avatarUrl&&(F.src=n.texts.avatarUrl,F.alt="");let w=a("div","cb-head-copy"),qe=a("div","cb-title",n.texts.botName);w.append(qe);let _e=a("div","cb-presence");_e.append(a("span","cb-online"),document.createTextNode("Online")),w.append(_e);let ee=a("button","cb-close");ee.type="button",ee.setAttribute("aria-label","Close chat"),ee.append(Ze("cb-icon cb-close-icon")),_.append(F,w,ee);let v=a("div","cb-messages");v.setAttribute("aria-live","polite");let H=a("button","cb-scroll-bottom","\u2193");H.type="button",H.hidden=!0,H.setAttribute("aria-label","Scroll to latest message");let W=a("div","cb-chips");W.setAttribute("role","group"),W.setAttribute("aria-label","Suggested questions");let Q=a("div","cb-typing-row");Q.hidden=!0;let Qe=a("div","cb-typing-bubble");Qe.append(a("span","cb-dot"),a("span","cb-dot"),a("span","cb-dot")),Q.append(a("div","cb-message-avatar",xe(n.texts.botName)),Qe);let te=a("span","cb-counter");te.hidden=!0;let ce=a("div","cb-usage");ce.hidden=b;let le=a("form","cb-compose"),u=a("textarea","cb-input");u.rows=1,u.maxLength=500,u.placeholder=n.texts.inputPlaceholder,u.setAttribute("aria-label",n.texts.inputPlaceholder);let B=a("button","cb-send");B.type="submit",B.disabled=!0,B.setAttribute("aria-label","Send message"),B.append(dt()),le.append(u,te,B),$.append(_,v,Q,W,ce,le);let we=a("footer","cb-footer",`Powered by ${Re.name}`);we.hidden=!n.branding.showBadge,$.append(we),P.append(I,$),N.append(P);let de=t||document.body;de&&de!==document.body&&de.replaceChildren(),de.append(T);let Y=!1,j=0,ke=0,re=!1,G="",Ce="",Ae="",J=!1,z=0,S=n.limits.conversationPrompts,C=!1,Ee=`cb-state-${r}`,$e=()=>{if(!b)try{localStorage.setItem(Ee,JSON.stringify({updatedAt:Date.now(),conversationId:localStorage.getItem(`cb-conversation-${r}`)||crypto.randomUUID?.()||String(Date.now()),messages:be,usage:{used:z,limit:S,reached:C}}))}catch{}},be=[],pe=[],Le=`cb-teaser-${r}`,D=()=>{v.scrollTop=v.scrollHeight},De=()=>v.scrollHeight-v.scrollTop-v.clientHeight<80,Fe=()=>{let o=a("div","cb-message-avatar");if(n.texts.avatarUrl){let s=a("img");s.src=n.texts.avatarUrl,s.alt="",o.append(s)}else o.textContent=xe(n.texts.botName);return o},X=(o,s)=>{ke+=1;let l=et(),m=a("div",`cb-message-row cb-${o}-row${o===Ce&&l===Ae?" cb-grouped":""}`),ue=a("div","cb-message-wrap"),O=a("div",`cb-message cb-${o}`);return o==="bot"?(O.classList.add("cb-markdown"),Be(O,s),m.append(Fe())):O.textContent=s,ue.append(O,a("time","cb-timestamp",l)),m.append(ue),v.append(m),s&&!b&&(be.push({kind:o,content:s,stamp:l}),$e()),Ce=o,Ae=l,D(),{row:m,bubble:O,stamp:l}},We=(o,s)=>{let l=a("div","cb-error-notice");if(l.setAttribute("role","alert"),l.append(a("span","cb-error-symbol","!"),a("span","cb-error-text",o)),s){let p=a("button","cb-retry");p.type="button",p.setAttribute("aria-label","Retry message"),p.title="Retry message",p.append(bt()),p.addEventListener("click",()=>{l.remove(),Ne(s)}),l.append(p)}v.append(l),D()},ae=()=>{ce.textContent=C?`${z} / ${S} questions \xB7 Limit reached`:`${z} / ${S} questions`,ce.classList.toggle("cb-usage-limit",C)},Me=()=>{if(v.querySelector(".cb-limit-notice"))return;let o=a("div","cb-limit-notice");o.setAttribute("role","status");let s=a("span","","This conversation has reached its limit. Start a new chat to continue."),l=a("button","cb-limit-action","New chat");l.type="button",l.addEventListener("click",()=>Ye()),o.append(s,l),v.append(o),D()},V=o=>{E||Y===o||(Y=o,$.classList.toggle("cb-open",o),k.classList.toggle("cb-active",o),k.setAttribute("aria-expanded",String(o)),o?(R.classList.remove("cb-visible"),localStorage.setItem(Le,"seen"),b||setTimeout(()=>{!E&&Y&&u.focus()},210)):k.focus(),d?.(o))},Se=()=>{W.replaceChildren(),n.texts.starterQuestions.forEach(o=>{let s=a("button","cb-chip",o);s.type="button",s.addEventListener("click",()=>Ne(o)),W.append(s)}),W.hidden=J||!n.texts.starterQuestions.length},rt=()=>{J||(J=!0,W.hidden=!0)},Te=()=>{u.style.height="auto",u.style.height=`${Math.min(u.scrollHeight,96)}px`;let o=u.value.length;te.hidden=o<450,te.textContent=`${o}/500`,te.classList.toggle("cb-counter-limit",o>=500)},at=o=>{let s=a("form","cb-form");s.noValidate=!0,s.append(a("p","cb-form-title","Request an appointment"));let l=a("p","cb-form-error");l.hidden=!0;let p=new Map;(o.fields||[]).forEach(x=>{let h=x.name||x.id;if(!h)return;let M=a("label"),y=a("span","cb-form-label",x.label||h);x.required!==!1&&y.append(a("span","cb-required"," *"));let A=a("input");A.name=h,A.required=x.required!==!1,A.type=["email","date","tel"].includes(x.type)?x.type:"text",A.autocomplete=h==="phone"?"tel":h==="email"?"email":"name",A.maxLength=h==="phone"?40:255;let L=a("span","cb-field-error");L.hidden=!0,A.setAttribute("aria-describedby",`cb-${h}-error`),L.id=`cb-${h}-error`,A.addEventListener("input",()=>{A.removeAttribute("aria-invalid"),L.hidden=!0,l.hidden=!0}),M.append(y,A,L),s.append(M),p.set(h,{control:A,error:L,label:x.label||h})});let m=(x,h)=>{let M=p.get(x);return M?(M.control.setAttribute("aria-invalid","true"),M.error.textContent=h,M.error.hidden=!1,!0):!1},ue=()=>{let x=!0;p.forEach(({control:y,error:A,label:L})=>{y.removeAttribute("aria-invalid"),A.hidden=!0;let me=y.value.trim();y.required&&!me?(m(y.name,`${L} is required.`),x=!1):me&&!y.validity.valid&&(m(y.name,y.validity.typeMismatch?`Enter a valid ${y.name==="email"?"email address":L.toLowerCase()}.`:`${L} is invalid.`),x=!1)});let h=p.get("email")?.control.value.trim(),M=p.get("phone")?.control.value.trim();return p.has("email")&&p.has("phone")&&!h&&!M&&(m("email","Enter an email address or phone number."),x=!1),x},O=a("button","","Send request");O.type="submit",s.append(l,O),s.addEventListener("submit",async x=>{if(x.preventDefault(),l.hidden=!0,!!ue()){O.disabled=!0;try{let h=Object.fromEntries(new FormData(s)),M=await fetch(`${e.replace(/\/$/,"")}/api/v1/leads/${encodeURIComponent(r)}`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({conversationId:localStorage.getItem(`cb-conversation-${r}`),fields:h})});if(!M.ok){let y=await M.json().catch(()=>null),A=y?.errors&&typeof y.errors=="object"?Object.entries(y.errors):[],L=!1;if(A.forEach(([me,Ie])=>{let ot=me.replace(/^fields\./,""),Ge=Array.isArray(Ie)?Ie[0]:Ie;typeof Ge=="string"&&(L=m(ot,Ge)||L)}),L)return;throw new Error(y?.message||"We could not send your request. Please try again.")}s.replaceWith(a("p","cb-form-success","Thanks! We'll contact you soon.")),D()}catch(h){l.textContent=h.message||"We could not send your request. Please try again.",l.hidden=!1}finally{O.disabled=!1}}}),v.append(s),D()},Ne=async o=>{if(!o.trim()||re||C)return;if(b&&pe.length>=30){We("Test session limit reached. Reset chat to start a new session.");return}let s=j;G=o.trim(),rt(),X("user",G),u.value="",Te(),re=!0,u.disabled=!0,B.disabled=!0,Q.hidden=!1,D();let l=null,p="";try{if(await Ke({apiBase:e,botId:r,conversationId:b?null:localStorage.getItem(`cb-conversation-${r}`),message:G,test:b,history:b?pe:void 0,authToken:b?i():null,assistantRules:b?n.settings?.assistantRules:void 0,botName:b?n.texts.botName:void 0,onToken:m=>{E||s!==j||m&&(p+=m,p.trim()&&(Q.hidden=!0,l??=X("bot",""),Be(l.bubble,p),De()&&D()))},onLeadForm:m=>{!E&&s===j&&at(m)},onUsage:m=>{b||E||s!==j||(z=Number(m.used)||z,S=Number(m.limit)||S,C=!!m.reached,ae())}}),E||s!==j)return;p?b?pe.push({role:"user",text:G},{role:"assistant",text:p.slice(0,1e3)}):(be.push({kind:"bot",content:p,stamp:l?.stamp||et()}),$e()):l?.row.remove(),!b&&C&&Me()}catch(m){if(E||s!==j)return;Q.hidden=!0,l?.row.remove(),!b&&m.status===409&&/message limit/i.test(m.message||"")?(z=S,C=!0,ae(),$e(),Me()):We(m.message||"Unable to send message.",G)}finally{if(E||s!==j)return;re=!1,u.disabled=C,C||u.focus(),B.disabled=C||!u.value.trim()||u.value.length>500,Q.hidden=!0}},oe,U=null;if(!b)try{let o=JSON.parse(localStorage.getItem(Ee)||"null");o&&Date.now()-o.updatedAt<864e5&&Array.isArray(o.messages)&&(U=o)}catch{}U?(U.conversationId&&localStorage.setItem(`cb-conversation-${r}`,U.conversationId),U.messages.forEach(o=>{let s=X(o.kind,o.content);!oe&&o.kind==="bot"&&(oe=s)}),J=U.messages.some(o=>o.kind==="user"),z=Number(U.usage?.used)||U.messages.filter(o=>o.kind==="user").length,S=Number(U.usage?.limit)||S,C=!!U.usage?.reached||z>=S):oe=X("bot",f&&n.texts.offlineMessage?n.texts.offlineMessage:n.texts.greetingMessage),Z.forEach(({role:o,text:s})=>{typeof s=="string"&&s.trim()&&X(o==="user"?"user":"bot",s)}),ae(),!b&&C&&Me(),Se(),g&&V(!0),localStorage.getItem(Le)||setTimeout(()=>{Y||R.classList.add("cb-visible")},3e3),q.addEventListener("click",()=>{R.classList.remove("cb-visible"),localStorage.setItem(Le,"seen")}),k.addEventListener("click",()=>V(!Y)),ee.addEventListener("click",()=>V(!1)),le.addEventListener("submit",o=>{o.preventDefault(),Ne(u.value)}),u.addEventListener("input",()=>{Te(),B.disabled=re||!u.value.trim()}),u.addEventListener("keydown",o=>{o.key==="Enter"&&!o.shiftKey&&(o.preventDefault(),le.requestSubmit())}),v.addEventListener("scroll",()=>{H.hidden=De()}),H.addEventListener("click",D),$.append(H);let He=o=>{o.key==="Escape"&&Y&&V(!1)};document.addEventListener("keydown",He);function Ye(){j+=1,re=!1,J=!1,Ce="",Ae="",G="",ke=0,z=0,C=!1,b||(localStorage.removeItem(`cb-conversation-${r}`),localStorage.removeItem(Ee)),be.length=0,pe.length=0,v.replaceChildren(),oe=X("bot",f&&n.texts.offlineMessage?n.texts.offlineMessage:n.texts.greetingMessage),Se(),ae(),u.disabled=!1,u.value="",B.disabled=!0,Q.hidden=!0,Te(),u.focus()}return{destroy(){E||(E=!0,j+=1,document.removeEventListener("keydown",He),T.remove())},open(){V(!0)},close(){V(!1)},resetChat(){Ye()},update(o){if(E)return;let s=n.texts.greetingMessage,l=v.scrollTop;n=o,S=n.limits.conversationPrompts,C=z>=S,ae(),Pe(T,n),P.classList.toggle("cb-left",n.theme.position==="left"),P.classList.toggle("cb-right",n.theme.position==="right"),k.setAttribute("aria-label",`Open ${n.texts.botName} chat`),$.setAttribute("aria-label",`${n.texts.botName} chat`),qe.textContent=n.texts.botName;let p=n.texts.avatarUrl?a("img","cb-avatar"):a("div","cb-avatar cb-avatar-initials",xe(n.texts.botName));n.texts.avatarUrl&&(p.src=n.texts.avatarUrl,p.alt=""),F.replaceWith(p),F=p,P.querySelectorAll(".cb-message-avatar").forEach(m=>{m.replaceWith(Fe())}),I.querySelector(".cb-launch-label")?.remove(),n.texts.launcherLabel&&I.prepend(a("span","cb-launch-label",n.texts.launcherLabel)),R.firstChild.textContent=n.texts.greetingMessage.slice(0,140),u.placeholder=n.texts.inputPlaceholder,u.setAttribute("aria-label",n.texts.inputPlaceholder),we.hidden=!n.branding.showBadge,ke===1&&s!==n.texts.greetingMessage&&Be(oe.bubble,f&&n.texts.offlineMessage?n.texts.offlineMessage:n.texts.greetingMessage),J||Se(),v.scrollTop=l}}}var je="2026-10-21-error-notice-1";var ye=new Map;function pt(t){try{return t&&t.src?new URL(t.src,window.location.href).origin:window.location.origin}catch{return window.location.origin}}async function ut(t={}){let r=t.script,e=t.botId||r&&r.dataset.botId;if(!e)throw new Error("ChatbotWidget requires a botId.");let i=t.container||e;if(ye.has(i))return ye.get(i);let c=t.apiBase||r&&r.dataset.apiBase||pt(r),f=t.config,g=!1;if(!f)try{f=await Xe(c,e)}catch{return console.warn("ChatbotWidget: configuration unavailable."),null}let d=Ue(K(f,Oe(r)),!!t.preview),b,n={update:T=>{d=Ue(K(K(d,T),Oe(r)),!!t.preview),b?.update(d)},open:()=>b?.open(),close:()=>b?.close(),resetChat:()=>b?.resetChat(),destroy(){b?.destroy(),ye.delete(i)}};return b=tt({container:t.container,botId:e,apiBase:c,getAuthToken:t.getAuthToken,config:d,defaultOpen:t.open??t.defaultOpen??!1,onOpenChange:t.onOpenChange,preview:t.preview,previewMessages:t.previewMessages}),ye.set(i,n),n}window.__chatbot=window.__chatbot||{};window.ChatbotWidget=window.ChatbotWidget||{};(!window.__chatbot.init||window.ChatbotWidget.version!==je)&&(window.__chatbot.init=ut);window.ChatbotWidget.init=window.__chatbot.init;window.ChatbotWidget.version=je;var ie=document.currentScript;if(ie&&ie.dataset.botId){let t=()=>{ie.dataset.cbLoaded||(ie.dataset.cbLoaded="true",window.__chatbot.init({script:ie}))};document.readyState==="loading"?document.addEventListener("DOMContentLoaded",t,{once:!0}):t()}})();
