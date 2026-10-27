var ChatbotWidgetBundle=(()=>{var it=/^\/api\/v1\/bot-logos\/[a-zA-Z0-9]{40}\.(?:jpg|jpeg|png|webp)$/,nt=t=>t==="localhost"||t==="127.0.0.1"||t==="[::1]"||t.endsWith(".test");function fe(t,a=""){if(typeof t!="string"||!t)return"";try{let e=new URL(t);if(!["http:","https:"].includes(e.protocol)||e.username||e.password)return"";let n=nt(e.hostname)&&it.test(e.pathname)&&!e.search&&!e.hash;if(n&&a){let c=new URL(a);c.protocol==="http:"&&c.host===e.host&&(e.protocol="http:")}return e.protocol==="https:"||e.protocol==="http:"&&n?e.href:""}catch{return""}}var he=Object.freeze({botName:40,launcherLabel:24,greetingMessage:200,inputPlaceholder:60,offlineMessage:200,starterQuestion:60,starterQuestions:4,avatarUrl:2048}),Je=/^#(?:[0-9a-f]{3}|[0-9a-f]{6})$/i;var ie={theme:{primaryColor:"#4F46E5",mode:"light",position:"right",borderRadius:16,fontFamily:"system"},texts:{botName:"Assistant",avatarUrl:"",greetingMessage:"Hi! How can I help?",inputPlaceholder:"Type your question...",launcherLabel:"",starterQuestions:[],offlineMessage:""},features:{leadCapture:!0,dentalNotice:!1},branding:{showBadge:!0,badgeText:""},limits:{conversationPrompts:15,messageCharacters:500,testPromptsPerHour:15,conversationInactivityHours:24},contactText:"the office",dir:"",zIndex:2147483647},xe={system:'Inter, var(--font-inter, system-ui), -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',sans:"Arial, Helvetica, sans-serif",serif:"Georgia, serif",mono:"ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace"},Pe=(t,a,e)=>typeof t=="string"?t.slice(0,e):a;function K(t,a){let e={...t};return Object.keys(a||{}).forEach(n=>{e[n]=a[n]&&typeof a[n]=="object"&&!Array.isArray(a[n])?K(t[n]||{},a[n]):a[n]}),e}function Ue(t,a=!1){let e=K(ie,t||{});e.theme.primaryColor=Je.test(e.theme.primaryColor)?e.theme.primaryColor:ie.theme.primaryColor,e.theme.mode=["light","dark","auto"].includes(e.theme.mode)?e.theme.mode:"light",e.theme.position=e.theme.position==="left"?"left":"right",e.theme.borderRadius=Math.max(0,Math.min(28,Number.isFinite(Number(e.theme.borderRadius))?Number(e.theme.borderRadius):ie.theme.borderRadius)),e.theme.fontFamily=xe[e.theme.fontFamily]?xe[e.theme.fontFamily]:Object.values(xe).includes(e.theme.fontFamily)?e.theme.fontFamily:xe.system,Object.keys(ie.texts).forEach(c=>{c!=="starterQuestions"&&(e.texts[c]=Pe(e.texts[c],ie.texts[c],he[c]))});let n=a&&typeof window<"u"&&e.texts.avatarUrl.startsWith(`blob:${window.location.origin}/`);return e.texts.avatarUrl=n?e.texts.avatarUrl:fe(e.texts.avatarUrl),e.texts.starterQuestions=Array.isArray(e.texts.starterQuestions)?e.texts.starterQuestions.filter(c=>typeof c=="string").slice(0,he.starterQuestions).map(c=>c.slice(0,he.starterQuestion)):[],e.features.leadCapture=!!e.features.leadCapture,e.features.dentalNotice=!!e.features.dentalNotice,e.branding.showBadge=!!e.branding.showBadge,e.branding.badgeText=Pe(e.branding.badgeText,"",80),e.limits.conversationPrompts=Math.max(1,Math.min(100,Number(e.limits.conversationPrompts)||15)),e.limits.messageCharacters=Math.max(1,Math.min(1e4,Number(e.limits.messageCharacters)||500)),e.limits.testPromptsPerHour=Math.max(1,Math.min(1e3,Number(e.limits.testPromptsPerHour)||15)),e.limits.conversationInactivityHours=Math.max(1,Math.min(720,Number(e.limits.conversationInactivityHours)||24)),e.contactText=Pe(e.contactText,"the office",120),e.dir=e.dir==="rtl"?"rtl":"",e.zIndex=Math.max(1,Math.min(2147483647,Number(e.zIndex)||2147483647)),e}function Oe(t){if(!t)return{};let a={},e={};return t.dataset.primaryColor!==void 0&&(a.primaryColor=t.dataset.primaryColor),t.dataset.position!==void 0&&(a.position=t.dataset.position),t.dataset.greeting!==void 0&&(e.greetingMessage=t.dataset.greeting),t.dataset.botName!==void 0&&(e.botName=t.dataset.botName),{theme:a,texts:e}}async function Xe(t,a){let e=b=>({...b,texts:{...b.texts,avatarUrl:fe(b.texts?.avatarUrl,t)}}),n=`cb-config-${a}`;try{let b=JSON.parse(sessionStorage.getItem(n)||"null");if(b&&b.expires>Date.now())return e(b.config)}catch{}let c=await fetch(`${t.replace(/\/$/,"")}/api/v1/widget/config/${encodeURIComponent(a)}`,{headers:{Accept:"application/json"}});if(!c.ok)throw new Error("Configuration unavailable");let f=await c.json(),g=f.data||f;try{sessionStorage.setItem(n,JSON.stringify({config:g,expires:Date.now()+6e4}))}catch{}return e(g)}var Ve=`
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
`;function st(t){let a=(t.match(/^event:\s*(.+)$/m)||[])[1]||"message",e=(t.match(/^data:\s*(.+)$/m)||[])[1]||"";try{return{event:a,data:JSON.parse(e)}}catch{return{event:a,data:e}}}async function Ke({apiBase:t,botId:a,conversationId:e,message:n,onToken:c,onLeadForm:f,onUsage:g,test:b=!1,history:d=[],authToken:Z=null,assistantRules:r,botName:I}){let P=await fetch(`${t.replace(/\/$/,"")}/api/v1/${b?`bot/${encodeURIComponent(a)}/test-chat`:`chat/${encodeURIComponent(a)}`}`,{method:"POST",headers:{"Content-Type":"application/json",Accept:"text/event-stream",...b&&Z?{Authorization:`Bearer ${Z}`}:{}},...b?{credentials:"include"}:{},body:JSON.stringify(b?{message:n,history:d,assistantRules:r,botName:I}:{conversationId:e,message:n})});if(!P.ok){let $=(await P.json().catch(()=>null))?.message||(b&&P.status===409?"Test session limit reached. Reset chat to start a new session.":"Chat is temporarily unavailable."),B=new Error($);throw B.status=P.status,B}if(!P.body)throw new Error("Chat is temporarily unavailable.");let se=P.body.getReader(),E=new TextDecoder,U="",N=null,k=null,O=!1;for(;;){let{done:D,value:$}=await se.read();if(D)break;U+=E.decode($,{stream:!0});let B=U.split(/\n\n/);U=B.pop(),B.forEach(F=>{let w=st(F);if(w.event==="token"&&c(w.data.token||""),w.event==="lead_form"&&(k=w.data),w.event==="usage"&&g?.(w.data),w.event==="conversation"&&(N=w.data.conversationId),w.event==="done"&&(O=!0,!b&&N&&localStorage.setItem(`cb-conversation-${a}`,N),!b&&k&&f(k)),w.event==="error")throw new Error(w.data.message||"Chat is temporarily unavailable.")})}if(!O)throw new Error("Chat connection ended before the reply was saved.")}function ct(t){let a=t.length===4?`#${t[1]}${t[1]}${t[2]}${t[2]}${t[3]}${t[3]}`:t,e=[1,3,5].map(n=>parseInt(a.slice(n,n+2),16)/255).map(n=>n<=.03928?n/12.92:((n+.055)/1.055)**2.4);return e[0]*.2126+e[1]*.7152+e[2]*.0722>.179?"#18181b":"#ffffff"}function Re(t,a){let e=a.theme.mode==="dark"||a.theme.mode==="auto"&&window.matchMedia?.("(prefers-color-scheme: dark)").matches;t.style.setProperty("--cb-primary",a.theme.primaryColor),t.style.setProperty("--cb-on-primary",ct(a.theme.primaryColor)),t.style.setProperty("--cb-bg",e?"#202023":"#ffffff"),t.style.setProperty("--cb-surface",e?"#18181b":"#fafafa"),t.style.setProperty("--cb-text",e?"#f4f4f5":"#18181b"),t.style.setProperty("--cb-muted",e?"#a1a1aa":"#71717a"),t.style.setProperty("--cb-success",e?"#6ee7b7":"#047857"),t.style.setProperty("--cb-danger",e?"#fca5a5":"#dc2626"),t.style.setProperty("--cb-radius",`${a.theme.borderRadius}px`),t.style.setProperty("--cb-font",a.theme.fontFamily),t.style.setProperty("--cb-z",String(a.zIndex||2147483647))}var je={name:"Tellvira",tagline:"AI assistant for websites that answers questions and captures leads.",domain:"yourbrand.example",supportEmail:"support@yourbrand.example",legalName:"Tellvira LLC",defaultTitle:"Tellvira | AI assistant for your website",description:"Add an AI assistant to your website to answer visitor questions, capture leads, and book appointments without code."},{name:At,tagline:Et,domain:$t,supportEmail:Lt,legalName:Mt,defaultTitle:It,description:Nt}=je;var o=(t,a,e)=>{let n=document.createElement(t);return a&&(n.className=a),e!==void 0&&(n.textContent=e),n},ye=(t,a="")=>{let e=document.createElementNS("http://www.w3.org/2000/svg","svg");return e.setAttribute("viewBox","0 0 24 24"),e.setAttribute("aria-hidden","true"),a&&e.setAttribute("class",a),t.forEach(n=>{let c=document.createElementNS("http://www.w3.org/2000/svg",n.tag||"path");Object.keys(n).forEach(f=>{f!=="tag"&&c.setAttribute(f,n[f])}),e.append(c)}),e},lt=()=>ye([{d:"M20 11.5a7.5 7.5 0 0 1-7.8 7.49 8.7 8.7 0 0 1-3.12-.58L4 20l1.5-4.2A7.25 7.25 0 0 1 4 11.5 7.5 7.5 0 0 1 11.75 4 7.5 7.5 0 0 1 20 11.5Z"},{d:"M8.5 11.5h.01M12 11.5h.01M15.5 11.5h.01"}],"cb-icon cb-icon-chat"),Ze=(t="cb-icon cb-icon-close")=>ye([{d:"m7 7 10 10M17 7 7 17"}],t),dt=()=>ye([{d:"M12 19V5M6.5 10.5 12 5l5.5 5.5"}]),bt=()=>ye([{d:"M3 12a9 9 0 1 0 2.6-6.4L3 8"},{d:"M3 3v5h5"}]),ve=t=>t.split(/\s+/).filter(Boolean).slice(0,2).map(a=>a[0]).join("").toUpperCase()||"AI",et=()=>new Intl.DateTimeFormat(void 0,{hour:"numeric",minute:"2-digit"}).format(new Date);function Be(t,a){t.replaceChildren();let e=(c,f)=>f.split(/(\*\*[^*]+\*\*|\*[^*]+\*|https?:\/\/[^\s]+)/g).forEach(g=>{if(g)if(/^\*\*[^*]+\*\*$/.test(g))c.append(o("strong","",g.slice(2,-2)));else if(/^\*[^*]+\*$/.test(g))c.append(o("em","",g.slice(1,-1)));else if(/^https?:\/\//.test(g)){let b=o("a","",g);b.href=g,b.target="_blank",b.rel="noopener noreferrer",c.append(b)}else c.append(document.createTextNode(g))}),n;String(a||"").split(`
`).forEach(c=>{let f=/^\s*[-*]\s+(.+)$/.exec(c);if(f){n||(n=o("ul"),t.append(n));let g=o("li");e(g,f[1]),n.append(g)}else{n=null;let g=o("p");e(g,c),t.append(g)}})}function tt({container:t,botId:a,apiBase:e,getAuthToken:n=()=>null,config:c,failed:f,defaultOpen:g,onOpenChange:b,preview:d=!1,previewMessages:Z=[]}){let r=c,I=o("div","cb-host");t&&I.classList.add("cb-embedded-host");let P=I.attachShadow({mode:"open"}),se=o("style"),E=!1;se.textContent=Ve,P.append(se),Re(I,r);let U=o("div",`cb-root ${t?"cb-embedded":"cb-fixed"}${d?" cb-preview":""} cb-${r.theme.position}`),N=o("div","cb-launch-area"),k=o("button","cb-launcher");k.type="button",k.setAttribute("aria-label",`Open ${r.texts.botName} chat`),k.setAttribute("aria-expanded","false"),k.append(lt(),Ze()),r.texts.launcherLabel&&N.append(o("span","cb-launch-label",r.texts.launcherLabel)),N.append(k);let O=o("div","cb-teaser",r.texts.greetingMessage.slice(0,140)),D=o("button","cb-teaser-close","\xD7");D.type="button",D.setAttribute("aria-label","Dismiss greeting"),O.append(D),N.append(O);let $=o("section","cb-window");$.setAttribute("role","dialog"),$.setAttribute("aria-label",`${r.texts.botName} chat`),$.setAttribute("aria-modal","true");let B=o("header","cb-header"),F=r.texts.avatarUrl?o("img","cb-avatar"):o("div","cb-avatar cb-avatar-initials",ve(r.texts.botName));r.texts.avatarUrl&&(F.src=r.texts.avatarUrl,F.alt="");let w=o("div","cb-head-copy"),_e=o("div","cb-title",r.texts.botName);w.append(_e);let Qe=o("div","cb-presence");Qe.append(o("span","cb-online"),document.createTextNode("Online")),w.append(Qe);let ee=o("button","cb-close");ee.type="button",ee.setAttribute("aria-label","Close chat"),ee.append(Ze("cb-icon cb-close-icon")),B.append(F,w,ee);let v=o("div","cb-messages");v.setAttribute("aria-live","polite");let W=o("button","cb-scroll-bottom","\u2193");W.type="button",W.hidden=!0,W.setAttribute("aria-label","Scroll to latest message");let H=o("div","cb-chips");H.setAttribute("role","group"),H.setAttribute("aria-label","Suggested questions");let q=o("div","cb-typing-row");q.hidden=!0;let De=o("div","cb-typing-bubble");De.append(o("span","cb-dot"),o("span","cb-dot"),o("span","cb-dot")),q.append(o("div","cb-message-avatar",ve(r.texts.botName)),De);let te=o("span","cb-counter");te.hidden=!0;let ce=o("div","cb-usage");ce.hidden=d;let le=o("form","cb-compose"),m=o("textarea","cb-input");m.rows=1,m.maxLength=r.limits.messageCharacters,m.placeholder=r.texts.inputPlaceholder,m.setAttribute("aria-label",r.texts.inputPlaceholder);let R=o("button","cb-send");R.type="submit",R.disabled=!0,R.setAttribute("aria-label","Send message"),R.append(dt()),le.append(m,te,R),$.append(B,v,q,H,ce,le);let ke=o("footer","cb-footer",`Powered by ${je.name}`);ke.hidden=!r.branding.showBadge,$.append(ke),U.append(N,$),P.append(U);let de=t||document.body;de&&de!==document.body&&de.replaceChildren(),de.append(I);let Y=!1,j=0,Ce=0,re=!1,G="",Ae="",Ee="",J=!1,S=0,T=r.limits.conversationPrompts,C=!1,$e=`cb-state-${a}`,Le=()=>{if(!d)try{localStorage.setItem($e,JSON.stringify({updatedAt:Date.now(),conversationId:localStorage.getItem(`cb-conversation-${a}`)||crypto.randomUUID?.()||String(Date.now()),messages:be,usage:{used:S,limit:T,reached:C}}))}catch{}},be=[],pe=[],Me=`cb-teaser-${a}`,_=()=>{v.scrollTop=v.scrollHeight},Fe=()=>v.scrollHeight-v.scrollTop-v.clientHeight<80,He=()=>{let i=o("div","cb-message-avatar");if(r.texts.avatarUrl){let s=o("img");s.src=r.texts.avatarUrl,s.alt="",i.append(s)}else i.textContent=ve(r.texts.botName);return i},X=(i,s)=>{Ce+=1;let l=et(),u=o("div",`cb-message-row cb-${i}-row${i===Ae&&l===Ee?" cb-grouped":""}`),ue=o("div","cb-message-wrap"),z=o("div",`cb-message cb-${i}`);return i==="bot"?(z.classList.add("cb-markdown"),Be(z,s),u.append(He())):z.textContent=s,ue.append(z,o("time","cb-timestamp",l)),u.append(ue),v.append(u),s&&!d&&(be.push({kind:i,content:s,stamp:l}),Le()),Ae=i,Ee=l,_(),{row:u,bubble:z,stamp:l}},Ie=(i,s)=>{let l=o("div","cb-error-notice");if(l.setAttribute("role","alert"),l.append(o("span","cb-error-symbol","!"),o("span","cb-error-text",i)),s){let p=o("button","cb-retry");p.type="button",p.setAttribute("aria-label","Retry message"),p.title="Retry message",p.append(bt()),p.addEventListener("click",()=>{l.remove(),Te(s)}),l.append(p)}v.append(l),_()},ae=()=>{ce.textContent=C?`${S} / ${T} questions \xB7 Limit reached`:`${S} / ${T} questions`,ce.classList.toggle("cb-usage-limit",C)},Ne=()=>{if(v.querySelector(".cb-limit-notice"))return;let i=o("div","cb-limit-notice");i.setAttribute("role","status");let s=o("span","","This conversation has reached its limit. Start a new chat to continue."),l=o("button","cb-limit-action","New chat");l.type="button",l.addEventListener("click",()=>Ye()),i.append(s,l),v.append(i),_()},V=i=>{E||Y===i||(Y=i,$.classList.toggle("cb-open",i),k.classList.toggle("cb-active",i),k.setAttribute("aria-expanded",String(i)),i?(O.classList.remove("cb-visible"),localStorage.setItem(Me,"seen"),d||setTimeout(()=>{!E&&Y&&m.focus()},210)):k.focus(),b?.(i))},Se=()=>{H.replaceChildren(),r.texts.starterQuestions.forEach(i=>{let s=o("button","cb-chip",i);s.type="button",s.addEventListener("click",()=>Te(i)),H.append(s)}),H.hidden=J||!r.texts.starterQuestions.length},rt=()=>{J||(J=!0,H.hidden=!0)},me=()=>{m.style.height="auto",m.style.height=`${Math.min(m.scrollHeight,96)}px`;let i=m.value.length;te.hidden=i<Math.floor(r.limits.messageCharacters*.9),te.textContent=`${i}/${r.limits.messageCharacters}`,te.classList.toggle("cb-counter-limit",i>=r.limits.messageCharacters)},at=i=>{let s=o("form","cb-form");s.noValidate=!0,s.append(o("p","cb-form-title","Request an appointment"));let l=o("p","cb-form-error");l.hidden=!0;let p=new Map;(i.fields||[]).forEach(x=>{let h=x.name||x.id;if(!h)return;let M=o("label"),y=o("span","cb-form-label",x.label||h);x.required!==!1&&y.append(o("span","cb-required"," *"));let A=o("input");A.name=h,A.required=x.required!==!1,A.type=["email","date","tel"].includes(x.type)?x.type:"text",A.autocomplete=h==="phone"?"tel":h==="email"?"email":"name",A.maxLength=h==="phone"?40:255;let L=o("span","cb-field-error");L.hidden=!0,A.setAttribute("aria-describedby",`cb-${h}-error`),L.id=`cb-${h}-error`,A.addEventListener("input",()=>{A.removeAttribute("aria-invalid"),L.hidden=!0,l.hidden=!0}),M.append(y,A,L),s.append(M),p.set(h,{control:A,error:L,label:x.label||h})});let u=(x,h)=>{let M=p.get(x);return M?(M.control.setAttribute("aria-invalid","true"),M.error.textContent=h,M.error.hidden=!1,!0):!1},ue=()=>{let x=!0;p.forEach(({control:y,error:A,label:L})=>{y.removeAttribute("aria-invalid"),A.hidden=!0;let ge=y.value.trim();y.required&&!ge?(u(y.name,`${L} is required.`),x=!1):ge&&!y.validity.valid&&(u(y.name,y.validity.typeMismatch?`Enter a valid ${y.name==="email"?"email address":L.toLowerCase()}.`:`${L} is invalid.`),x=!1)});let h=p.get("email")?.control.value.trim(),M=p.get("phone")?.control.value.trim();return p.has("email")&&p.has("phone")&&!h&&!M&&(u("email","Enter an email address or phone number."),x=!1),x},z=o("button","","Send request");z.type="submit",s.append(l,z),s.addEventListener("submit",async x=>{if(x.preventDefault(),l.hidden=!0,!!ue()){z.disabled=!0;try{let h=Object.fromEntries(new FormData(s)),M=await fetch(`${e.replace(/\/$/,"")}/api/v1/leads/${encodeURIComponent(a)}`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({conversationId:localStorage.getItem(`cb-conversation-${a}`),fields:h})});if(!M.ok){let y=await M.json().catch(()=>null),A=y?.errors&&typeof y.errors=="object"?Object.entries(y.errors):[],L=!1;if(A.forEach(([ge,ze])=>{let ot=ge.replace(/^fields\./,""),Ge=Array.isArray(ze)?ze[0]:ze;typeof Ge=="string"&&(L=u(ot,Ge)||L)}),L)return;throw new Error(y?.message||"We could not send your request. Please try again.")}s.replaceWith(o("p","cb-form-success","Thanks! We'll contact you soon.")),_()}catch(h){l.textContent=h.message||"We could not send your request. Please try again.",l.hidden=!1}finally{z.disabled=!1}}}),v.append(s),_()},Te=async i=>{if(!i.trim()||re||C)return;if(i.length>r.limits.messageCharacters){Ie(`Please keep your message within ${r.limits.messageCharacters} characters.`);return}if(d&&pe.length+2>T*2){Ie("Test session limit reached. Reset chat to start a new session.");return}let s=j;G=i.trim(),rt(),X("user",G),m.value="",me(),re=!0,m.disabled=!0,R.disabled=!0,q.hidden=!1,_();let l=null,p="";try{if(await Ke({apiBase:e,botId:a,conversationId:d?null:localStorage.getItem(`cb-conversation-${a}`),message:G,test:d,history:d?pe:void 0,authToken:d?n():null,assistantRules:d?r.settings?.assistantRules:void 0,botName:d?r.texts.botName:void 0,onToken:u=>{E||s!==j||u&&(p+=u,p.trim()&&(q.hidden=!0,l??=X("bot",""),Be(l.bubble,p),Fe()&&_()))},onLeadForm:u=>{!E&&s===j&&at(u)},onUsage:u=>{d||E||s!==j||(S=Number(u.used)||S,T=Number(u.limit)||T,C=!!u.reached,ae())}}),E||s!==j)return;p?d?pe.push({role:"user",text:G},{role:"assistant",text:p.slice(0,1e5)}):(be.push({kind:"bot",content:p,stamp:l?.stamp||et()}),Le()):l?.row.remove(),!d&&C&&Ne()}catch(u){if(E||s!==j)return;q.hidden=!0,l?.row.remove(),!d&&u.status===409&&/message limit/i.test(u.message||"")?(S=T,C=!0,ae(),Le(),Ne()):Ie(u.message||"Unable to send message.",G)}finally{if(E||s!==j)return;re=!1,m.disabled=C,C||m.focus(),R.disabled=C||!m.value.trim()||m.value.length>r.limits.messageCharacters,q.hidden=!0}},oe,Q=null;if(!d)try{let i=JSON.parse(localStorage.getItem($e)||"null");i&&Date.now()-i.updatedAt<r.limits.conversationInactivityHours*36e5&&Array.isArray(i.messages)&&(Q=i)}catch{}Q?(Q.conversationId&&localStorage.setItem(`cb-conversation-${a}`,Q.conversationId),Q.messages.forEach(i=>{let s=X(i.kind,i.content);!oe&&i.kind==="bot"&&(oe=s)}),J=Q.messages.some(i=>i.kind==="user"),S=Number(Q.usage?.used)||Q.messages.filter(i=>i.kind==="user").length,C=S>=T):oe=X("bot",f&&r.texts.offlineMessage?r.texts.offlineMessage:r.texts.greetingMessage),Z.forEach(({role:i,text:s})=>{typeof s=="string"&&s.trim()&&X(i==="user"?"user":"bot",s)}),ae(),!d&&C&&Ne(),Se(),g&&V(!0),localStorage.getItem(Me)||setTimeout(()=>{Y||O.classList.add("cb-visible")},3e3),D.addEventListener("click",()=>{O.classList.remove("cb-visible"),localStorage.setItem(Me,"seen")}),k.addEventListener("click",()=>V(!Y)),ee.addEventListener("click",()=>V(!1)),le.addEventListener("submit",i=>{i.preventDefault(),Te(m.value)}),m.addEventListener("input",()=>{me(),R.disabled=re||!m.value.trim()}),m.addEventListener("keydown",i=>{i.key==="Enter"&&!i.shiftKey&&(i.preventDefault(),le.requestSubmit())}),v.addEventListener("scroll",()=>{W.hidden=Fe()}),W.addEventListener("click",_),$.append(W);let We=i=>{i.key==="Escape"&&Y&&V(!1)};document.addEventListener("keydown",We);function Ye(){j+=1,re=!1,J=!1,Ae="",Ee="",G="",Ce=0,S=0,C=!1,d||(localStorage.removeItem(`cb-conversation-${a}`),localStorage.removeItem($e)),be.length=0,pe.length=0,v.replaceChildren(),oe=X("bot",f&&r.texts.offlineMessage?r.texts.offlineMessage:r.texts.greetingMessage),Se(),ae(),m.disabled=!1,m.value="",R.disabled=!0,q.hidden=!0,me(),m.focus()}return{destroy(){E||(E=!0,j+=1,document.removeEventListener("keydown",We),I.remove())},open(){V(!0)},close(){V(!1)},resetChat(){Ye()},update(i){if(E)return;let s=r.texts.greetingMessage,l=v.scrollTop;r=i,m.maxLength=r.limits.messageCharacters,T=r.limits.conversationPrompts,C=S>=T,ae(),Re(I,r),U.classList.toggle("cb-left",r.theme.position==="left"),U.classList.toggle("cb-right",r.theme.position==="right"),k.setAttribute("aria-label",`Open ${r.texts.botName} chat`),$.setAttribute("aria-label",`${r.texts.botName} chat`),_e.textContent=r.texts.botName;let p=r.texts.avatarUrl?o("img","cb-avatar"):o("div","cb-avatar cb-avatar-initials",ve(r.texts.botName));r.texts.avatarUrl&&(p.src=r.texts.avatarUrl,p.alt=""),F.replaceWith(p),F=p,U.querySelectorAll(".cb-message-avatar").forEach(u=>{u.replaceWith(He())}),N.querySelector(".cb-launch-label")?.remove(),r.texts.launcherLabel&&N.prepend(o("span","cb-launch-label",r.texts.launcherLabel)),O.firstChild.textContent=r.texts.greetingMessage.slice(0,140),m.placeholder=r.texts.inputPlaceholder,me(),m.setAttribute("aria-label",r.texts.inputPlaceholder),ke.hidden=!r.branding.showBadge,Ce===1&&s!==r.texts.greetingMessage&&Be(oe.bubble,f&&r.texts.offlineMessage?r.texts.offlineMessage:r.texts.greetingMessage),J||Se(),v.scrollTop=l}}}var qe="2026-10-23-admin-chat-settings-1";var we=new Map;function pt(t){try{return t&&t.src?new URL(t.src,window.location.href).origin:window.location.origin}catch{return window.location.origin}}async function mt(t={}){let a=t.script,e=t.botId||a&&a.dataset.botId;if(!e)throw new Error("ChatbotWidget requires a botId.");let n=t.container||e;if(we.has(n))return we.get(n);let c=t.apiBase||a&&a.dataset.apiBase||pt(a),f=t.config,g=!1;if(!f)try{f=await Xe(c,e)}catch{return console.warn("ChatbotWidget: configuration unavailable."),null}let b=Ue(K(f,Oe(a)),!!t.preview),d,r={update:I=>{b=Ue(K(K(b,I),Oe(a)),!!t.preview),d?.update(b)},open:()=>d?.open(),close:()=>d?.close(),resetChat:()=>d?.resetChat(),destroy(){d?.destroy(),we.delete(n)}};return d=tt({container:t.container,botId:e,apiBase:c,getAuthToken:t.getAuthToken,config:b,defaultOpen:t.open??t.defaultOpen??!1,onOpenChange:t.onOpenChange,preview:t.preview,previewMessages:t.previewMessages}),we.set(n,r),r}window.__chatbot=window.__chatbot||{};window.ChatbotWidget=window.ChatbotWidget||{};(!window.__chatbot.init||window.ChatbotWidget.version!==qe)&&(window.__chatbot.init=mt);window.ChatbotWidget.init=window.__chatbot.init;window.ChatbotWidget.version=qe;var ne=document.currentScript;if(ne&&ne.dataset.botId){let t=()=>{ne.dataset.cbLoaded||(ne.dataset.cbLoaded="true",window.__chatbot.init({script:ne}))};document.readyState==="loading"?document.addEventListener("DOMContentLoaded",t,{once:!0}):t()}})();
