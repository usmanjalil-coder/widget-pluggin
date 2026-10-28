var ChatbotWidgetBundle=(()=>{var fe=Object.freeze({botName:40,launcherLabel:24,greetingMessage:200,inputPlaceholder:60,offlineMessage:200,starterQuestion:60,starterQuestions:4,avatarUrl:2048}),Xe=/^#(?:[0-9a-f]{3}|[0-9a-f]{6})$/i;var nt=/^\/api\/v1\/bot-logos\/[a-zA-Z0-9]{40}\.(?:jpg|jpeg|png|webp)$/,st=t=>t==="localhost"||t==="127.0.0.1"||t==="[::1]"||t.endsWith(".test");function Pe(t,o=""){if(typeof t!="string"||!t)return"";try{let e=new URL(t);if(!["http:","https:"].includes(e.protocol)||e.username||e.password)return"";let n=st(e.hostname)&&nt.test(e.pathname)&&!e.search&&!e.hash;if(n&&o){let c=new URL(o);c.protocol==="http:"&&c.host===e.host&&(e.protocol="http:")}return e.protocol==="https:"||e.protocol==="http:"&&n?e.href:""}catch{return""}}var ie={theme:{primaryColor:"#4F46E5",mode:"light",position:"right",borderRadius:16,fontFamily:"system"},texts:{botName:"Assistant",avatarUrl:"",greetingMessage:"Hi! How can I help?",inputPlaceholder:"Type your question...",launcherLabel:"",starterQuestions:[],offlineMessage:""},features:{leadCapture:!0,dentalNotice:!1},branding:{showBadge:!0,badgeText:""},limits:{conversationPrompts:15,messageCharacters:500,testPromptsPerHour:15,conversationInactivityHours:24},contactText:"the office",dir:"",zIndex:2147483647},xe={system:'Inter, var(--font-inter, system-ui), -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',sans:"Arial, Helvetica, sans-serif",serif:"Georgia, serif",mono:"ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace"},Ue=(t,o,e)=>typeof t=="string"?t.slice(0,e):o;function K(t,o){let e={...t};return Object.keys(o||{}).forEach(n=>{e[n]=o[n]&&typeof o[n]=="object"&&!Array.isArray(o[n])?K(t[n]||{},o[n]):o[n]}),e}function Oe(t,o=!1){let e=K(ie,t||{});e.theme.primaryColor=Xe.test(e.theme.primaryColor)?e.theme.primaryColor:ie.theme.primaryColor,e.theme.mode=["light","dark","auto"].includes(e.theme.mode)?e.theme.mode:"light",e.theme.position=e.theme.position==="left"?"left":"right",e.theme.borderRadius=Math.max(0,Math.min(28,Number.isFinite(Number(e.theme.borderRadius))?Number(e.theme.borderRadius):ie.theme.borderRadius)),e.theme.fontFamily=xe[e.theme.fontFamily]?xe[e.theme.fontFamily]:Object.values(xe).includes(e.theme.fontFamily)?e.theme.fontFamily:xe.system,Object.keys(ie.texts).forEach(c=>{c!=="starterQuestions"&&(e.texts[c]=Ue(e.texts[c],ie.texts[c],fe[c]))});let n=o&&typeof window<"u"&&e.texts.avatarUrl.startsWith(`blob:${window.location.origin}/`);return e.texts.avatarUrl=n?e.texts.avatarUrl:Pe(e.texts.avatarUrl),e.texts.starterQuestions=Array.isArray(e.texts.starterQuestions)?e.texts.starterQuestions.filter(c=>typeof c=="string").slice(0,fe.starterQuestions).map(c=>c.slice(0,fe.starterQuestion)):[],e.features.leadCapture=!!e.features.leadCapture,e.features.dentalNotice=!!e.features.dentalNotice,e.branding.showBadge=!!e.branding.showBadge,e.branding.badgeText=Ue(e.branding.badgeText,"",80),e.limits.conversationPrompts=Math.max(1,Math.min(100,Number(e.limits.conversationPrompts)||15)),e.limits.messageCharacters=Math.max(1,Math.min(1e4,Number(e.limits.messageCharacters)||500)),e.limits.testPromptsPerHour=Math.max(1,Math.min(1e3,Number(e.limits.testPromptsPerHour)||15)),e.limits.conversationInactivityHours=Math.max(1,Math.min(720,Number(e.limits.conversationInactivityHours)||24)),e.contactText=Ue(e.contactText,"the office",120),e.dir=e.dir==="rtl"?"rtl":"",e.zIndex=Math.max(1,Math.min(2147483647,Number(e.zIndex)||2147483647)),e}function Re(t){if(!t)return{};let o={},e={};return t.dataset.primaryColor!==void 0&&(o.primaryColor=t.dataset.primaryColor),t.dataset.position!==void 0&&(o.position=t.dataset.position),t.dataset.greeting!==void 0&&(e.greetingMessage=t.dataset.greeting),t.dataset.botName!==void 0&&(e.botName=t.dataset.botName),{theme:o,texts:e}}async function Ve(t,o){let e=b=>({...b,texts:{...b.texts,avatarUrl:Pe(b.texts?.avatarUrl,t)}}),n=`cb-config-${o}`;try{let b=JSON.parse(sessionStorage.getItem(n)||"null");if(b&&b.expires>Date.now())return e(b.config)}catch{}let c=await fetch(`${t.replace(/\/$/,"")}/api/v1/widget/config/${encodeURIComponent(o)}`,{headers:{Accept:"application/json"}});if(!c.ok)throw new Error("Configuration unavailable");let h=await c.json(),g=h.data||h;try{sessionStorage.setItem(n,JSON.stringify({config:g,expires:Date.now()+6e4}))}catch{}return e(g)}var Ke=`
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
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  font-size: 11px;
}
.cb-brand-icon {
  width: 16px;
  height: 16px;
  border-radius: 4px;
  background: #fff;
  object-fit: contain;
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
`;function ct(t){let o=(t.match(/^event:\s*(.+)$/m)||[])[1]||"message",e=(t.match(/^data:\s*(.+)$/m)||[])[1]||"";try{return{event:o,data:JSON.parse(e)}}catch{return{event:o,data:e}}}async function Ze({apiBase:t,botId:o,conversationId:e,message:n,onToken:c,onLeadForm:h,onUsage:g,test:b=!1,history:d=[],authToken:Z=null,assistantRules:r,botName:I}){let P=await fetch(`${t.replace(/\/$/,"")}/api/v1/${b?`bot/${encodeURIComponent(o)}/test-chat`:`chat/${encodeURIComponent(o)}`}`,{method:"POST",headers:{"Content-Type":"application/json",Accept:"text/event-stream",...b&&Z?{Authorization:`Bearer ${Z}`}:{}},...b?{credentials:"include"}:{},body:JSON.stringify(b?{message:n,history:d,assistantRules:r,botName:I}:{conversationId:e,message:n})});if(!P.ok){let L=(await P.json().catch(()=>null))?.message||(b&&P.status===409?"Test session limit reached. Reset chat to start a new session.":"Chat is temporarily unavailable."),j=new Error(L);throw j.status=P.status,j}if(!P.body)throw new Error("Chat is temporarily unavailable.");let se=P.body.getReader(),A=new TextDecoder,U="",S=null,k=null,O=!1;for(;;){let{done:B,value:L}=await se.read();if(B)break;U+=A.decode(L,{stream:!0});let j=U.split(/\n\n/);U=j.pop(),j.forEach(W=>{let w=ct(W);if(w.event==="token"&&c(w.data.token||""),w.event==="lead_form"&&(k=w.data),w.event==="usage"&&g?.(w.data),w.event==="conversation"&&(S=w.data.conversationId),w.event==="done"&&(O=!0,!b&&S&&localStorage.setItem(`cb-conversation-${o}`,S),!b&&k&&h(k)),w.event==="error")throw new Error(w.data.message||"Chat is temporarily unavailable.")})}if(!O)throw new Error("Chat connection ended before the reply was saved.")}function lt(t){let o=t.length===4?`#${t[1]}${t[1]}${t[2]}${t[2]}${t[3]}${t[3]}`:t,e=[1,3,5].map(n=>parseInt(o.slice(n,n+2),16)/255).map(n=>n<=.03928?n/12.92:((n+.055)/1.055)**2.4);return e[0]*.2126+e[1]*.7152+e[2]*.0722>.179?"#18181b":"#ffffff"}function _e(t,o){let e=o.theme.mode==="dark"||o.theme.mode==="auto"&&window.matchMedia?.("(prefers-color-scheme: dark)").matches;t.style.setProperty("--cb-primary",o.theme.primaryColor),t.style.setProperty("--cb-on-primary",lt(o.theme.primaryColor)),t.style.setProperty("--cb-bg",e?"#202023":"#ffffff"),t.style.setProperty("--cb-surface",e?"#18181b":"#fafafa"),t.style.setProperty("--cb-text",e?"#f4f4f5":"#18181b"),t.style.setProperty("--cb-muted",e?"#a1a1aa":"#71717a"),t.style.setProperty("--cb-success",e?"#6ee7b7":"#047857"),t.style.setProperty("--cb-danger",e?"#fca5a5":"#dc2626"),t.style.setProperty("--cb-radius",`${o.theme.borderRadius}px`),t.style.setProperty("--cb-font",o.theme.fontFamily),t.style.setProperty("--cb-z",String(o.zIndex||2147483647))}var je={name:"Tellvira",tagline:"AI assistant for websites that answers questions and captures leads.",domain:"tellvira.com",iconPath:"/assets/images/tellvira_only_icon.png",wordmarkPath:"/assets/images/tellvira_icon_text.png",supportEmail:"support@tellvira.com",description:"Add an AI assistant to your website to answer visitor questions, capture leads, and book appointments without code."};var a=(t,o,e)=>{let n=document.createElement(t);return o&&(n.className=o),e!==void 0&&(n.textContent=e),n},ye=(t,o="")=>{let e=document.createElementNS("http://www.w3.org/2000/svg","svg");return e.setAttribute("viewBox","0 0 24 24"),e.setAttribute("aria-hidden","true"),o&&e.setAttribute("class",o),t.forEach(n=>{let c=document.createElementNS("http://www.w3.org/2000/svg",n.tag||"path");Object.keys(n).forEach(h=>{h!=="tag"&&c.setAttribute(h,n[h])}),e.append(c)}),e},dt=()=>ye([{d:"M20 11.5a7.5 7.5 0 0 1-7.8 7.49 8.7 8.7 0 0 1-3.12-.58L4 20l1.5-4.2A7.25 7.25 0 0 1 4 11.5 7.5 7.5 0 0 1 11.75 4 7.5 7.5 0 0 1 20 11.5Z"},{d:"M8.5 11.5h.01M12 11.5h.01M15.5 11.5h.01"}],"cb-icon cb-icon-chat"),et=(t="cb-icon cb-icon-close")=>ye([{d:"m7 7 10 10M17 7 7 17"}],t),bt=()=>ye([{d:"M12 19V5M6.5 10.5 12 5l5.5 5.5"}]),pt=()=>ye([{d:"M3 12a9 9 0 1 0 2.6-6.4L3 8"},{d:"M3 3v5h5"}]),ve=t=>t.split(/\s+/).filter(Boolean).slice(0,2).map(o=>o[0]).join("").toUpperCase()||"AI",tt=()=>new Intl.DateTimeFormat(void 0,{hour:"numeric",minute:"2-digit"}).format(new Date);function qe(t,o){t.replaceChildren();let e=(c,h)=>h.split(/(\*\*[^*]+\*\*|\*[^*]+\*|https?:\/\/[^\s]+)/g).forEach(g=>{if(g)if(/^\*\*[^*]+\*\*$/.test(g))c.append(a("strong","",g.slice(2,-2)));else if(/^\*[^*]+\*$/.test(g))c.append(a("em","",g.slice(1,-1)));else if(/^https?:\/\//.test(g)){let b=a("a","",g);b.href=g,b.target="_blank",b.rel="noopener noreferrer",c.append(b)}else c.append(document.createTextNode(g))}),n;String(o||"").split(`
`).forEach(c=>{let h=/^\s*[-*]\s+(.+)$/.exec(c);if(h){n||(n=a("ul"),t.append(n));let g=a("li");e(g,h[1]),n.append(g)}else{n=null;let g=a("p");e(g,c),t.append(g)}})}function rt({container:t,botId:o,apiBase:e,getAuthToken:n=()=>null,config:c,failed:h,defaultOpen:g,onOpenChange:b,preview:d=!1,previewMessages:Z=[]}){let r=c,I=a("div","cb-host");t&&I.classList.add("cb-embedded-host");let P=I.attachShadow({mode:"open"}),se=a("style"),A=!1;se.textContent=Ke,P.append(se),_e(I,r);let U=a("div",`cb-root ${t?"cb-embedded":"cb-fixed"}${d?" cb-preview":""} cb-${r.theme.position}`),S=a("div","cb-launch-area"),k=a("button","cb-launcher");k.type="button",k.setAttribute("aria-label",`Open ${r.texts.botName} chat`),k.setAttribute("aria-expanded","false"),k.append(dt(),et()),r.texts.launcherLabel&&S.append(a("span","cb-launch-label",r.texts.launcherLabel)),S.append(k);let O=a("div","cb-teaser",r.texts.greetingMessage.slice(0,140)),B=a("button","cb-teaser-close","\xD7");B.type="button",B.setAttribute("aria-label","Dismiss greeting"),O.append(B),S.append(O);let L=a("section","cb-window");L.setAttribute("role","dialog"),L.setAttribute("aria-label",`${r.texts.botName} chat`),L.setAttribute("aria-modal","true");let j=a("header","cb-header"),W=r.texts.avatarUrl?a("img","cb-avatar"):a("div","cb-avatar cb-avatar-initials",ve(r.texts.botName));r.texts.avatarUrl&&(W.src=r.texts.avatarUrl,W.alt="");let w=a("div","cb-head-copy"),Fe=a("div","cb-title",r.texts.botName);w.append(Fe);let Be=a("div","cb-presence");Be.append(a("span","cb-online"),document.createTextNode("Online")),w.append(Be);let ee=a("button","cb-close");ee.type="button",ee.setAttribute("aria-label","Close chat"),ee.append(et("cb-icon cb-close-icon")),j.append(W,w,ee);let v=a("div","cb-messages");v.setAttribute("aria-live","polite");let Q=a("button","cb-scroll-bottom","\u2193");Q.type="button",Q.hidden=!0,Q.setAttribute("aria-label","Scroll to latest message");let H=a("div","cb-chips");H.setAttribute("role","group"),H.setAttribute("aria-label","Suggested questions");let q=a("div","cb-typing-row");q.hidden=!0;let We=a("div","cb-typing-bubble");We.append(a("span","cb-dot"),a("span","cb-dot"),a("span","cb-dot")),q.append(a("div","cb-message-avatar",ve(r.texts.botName)),We);let te=a("span","cb-counter");te.hidden=!0;let ce=a("div","cb-usage");ce.hidden=d;let le=a("form","cb-compose"),m=a("textarea","cb-input");m.rows=1,m.maxLength=r.limits.messageCharacters,m.placeholder=r.texts.inputPlaceholder,m.setAttribute("aria-label",r.texts.inputPlaceholder);let R=a("button","cb-send");R.type="submit",R.disabled=!0,R.setAttribute("aria-label","Send message"),R.append(bt()),le.append(m,te,R),L.append(j,v,q,H,ce,le);let de=a("footer","cb-footer"),ke=a("img","cb-brand-icon");ke.src=new URL(je.iconPath,e).href,ke.alt="",de.append(ke,document.createTextNode(`Powered by ${je.name}`)),de.hidden=!r.branding.showBadge,L.append(de),U.append(S,L),P.append(U);let be=t||document.body;be&&be!==document.body&&be.replaceChildren(),be.append(I);let Y=!1,_=0,Ce=0,re=!1,G="",Ee="",Ae="",J=!1,N=0,T=r.limits.conversationPrompts,C=!1,Le=`cb-state-${o}`,$e=()=>{if(!d)try{localStorage.setItem(Le,JSON.stringify({updatedAt:Date.now(),conversationId:localStorage.getItem(`cb-conversation-${o}`)||crypto.randomUUID?.()||String(Date.now()),messages:pe,usage:{used:N,limit:T,reached:C}}))}catch{}},pe=[],me=[],Me=`cb-teaser-${o}`,D=()=>{v.scrollTop=v.scrollHeight},He=()=>v.scrollHeight-v.scrollTop-v.clientHeight<80,Qe=()=>{let i=a("div","cb-message-avatar");if(r.texts.avatarUrl){let s=a("img");s.src=r.texts.avatarUrl,s.alt="",i.append(s)}else i.textContent=ve(r.texts.botName);return i},X=(i,s)=>{Ce+=1;let l=tt(),u=a("div",`cb-message-row cb-${i}-row${i===Ee&&l===Ae?" cb-grouped":""}`),ge=a("div","cb-message-wrap"),z=a("div",`cb-message cb-${i}`);return i==="bot"?(z.classList.add("cb-markdown"),qe(z,s),u.append(Qe())):z.textContent=s,ge.append(z,a("time","cb-timestamp",l)),u.append(ge),v.append(u),s&&!d&&(pe.push({kind:i,content:s,stamp:l}),$e()),Ee=i,Ae=l,D(),{row:u,bubble:z,stamp:l}},Ie=(i,s)=>{let l=a("div","cb-error-notice");if(l.setAttribute("role","alert"),l.append(a("span","cb-error-symbol","!"),a("span","cb-error-text",i)),s){let p=a("button","cb-retry");p.type="button",p.setAttribute("aria-label","Retry message"),p.title="Retry message",p.append(pt()),p.addEventListener("click",()=>{l.remove(),Te(s)}),l.append(p)}v.append(l),D()},ae=()=>{ce.textContent=C?`${N} / ${T} questions \xB7 Limit reached`:`${N} / ${T} questions`,ce.classList.toggle("cb-usage-limit",C)},Se=()=>{if(v.querySelector(".cb-limit-notice"))return;let i=a("div","cb-limit-notice");i.setAttribute("role","status");let s=a("span","","This conversation has reached its limit. Start a new chat to continue."),l=a("button","cb-limit-action","New chat");l.type="button",l.addEventListener("click",()=>Ge()),i.append(s,l),v.append(i),D()},V=i=>{A||Y===i||(Y=i,L.classList.toggle("cb-open",i),k.classList.toggle("cb-active",i),k.setAttribute("aria-expanded",String(i)),i?(O.classList.remove("cb-visible"),localStorage.setItem(Me,"seen"),d||setTimeout(()=>{!A&&Y&&m.focus()},210)):k.focus(),b?.(i))},Ne=()=>{H.replaceChildren(),r.texts.starterQuestions.forEach(i=>{let s=a("button","cb-chip",i);s.type="button",s.addEventListener("click",()=>Te(i)),H.append(s)}),H.hidden=J||!r.texts.starterQuestions.length},at=()=>{J||(J=!0,H.hidden=!0)},ue=()=>{m.style.height="auto",m.style.height=`${Math.min(m.scrollHeight,96)}px`;let i=m.value.length;te.hidden=i<Math.floor(r.limits.messageCharacters*.9),te.textContent=`${i}/${r.limits.messageCharacters}`,te.classList.toggle("cb-counter-limit",i>=r.limits.messageCharacters)},ot=i=>{let s=a("form","cb-form");s.noValidate=!0,s.append(a("p","cb-form-title","Request an appointment"));let l=a("p","cb-form-error");l.hidden=!0;let p=new Map;(i.fields||[]).forEach(x=>{let f=x.name||x.id;if(!f)return;let M=a("label"),y=a("span","cb-form-label",x.label||f);x.required!==!1&&y.append(a("span","cb-required"," *"));let E=a("input");E.name=f,E.required=x.required!==!1,E.type=["email","date","tel"].includes(x.type)?x.type:"text",E.autocomplete=f==="phone"?"tel":f==="email"?"email":"name",E.maxLength=f==="phone"?40:255;let $=a("span","cb-field-error");$.hidden=!0,E.setAttribute("aria-describedby",`cb-${f}-error`),$.id=`cb-${f}-error`,E.addEventListener("input",()=>{E.removeAttribute("aria-invalid"),$.hidden=!0,l.hidden=!0}),M.append(y,E,$),s.append(M),p.set(f,{control:E,error:$,label:x.label||f})});let u=(x,f)=>{let M=p.get(x);return M?(M.control.setAttribute("aria-invalid","true"),M.error.textContent=f,M.error.hidden=!1,!0):!1},ge=()=>{let x=!0;p.forEach(({control:y,error:E,label:$})=>{y.removeAttribute("aria-invalid"),E.hidden=!0;let he=y.value.trim();y.required&&!he?(u(y.name,`${$} is required.`),x=!1):he&&!y.validity.valid&&(u(y.name,y.validity.typeMismatch?`Enter a valid ${y.name==="email"?"email address":$.toLowerCase()}.`:`${$} is invalid.`),x=!1)});let f=p.get("email")?.control.value.trim(),M=p.get("phone")?.control.value.trim();return p.has("email")&&p.has("phone")&&!f&&!M&&(u("email","Enter an email address or phone number."),x=!1),x},z=a("button","","Send request");z.type="submit",s.append(l,z),s.addEventListener("submit",async x=>{if(x.preventDefault(),l.hidden=!0,!!ge()){z.disabled=!0;try{let f=Object.fromEntries(new FormData(s)),M=await fetch(`${e.replace(/\/$/,"")}/api/v1/leads/${encodeURIComponent(o)}`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({conversationId:localStorage.getItem(`cb-conversation-${o}`),fields:f})});if(!M.ok){let y=await M.json().catch(()=>null),E=y?.errors&&typeof y.errors=="object"?Object.entries(y.errors):[],$=!1;if(E.forEach(([he,ze])=>{let it=he.replace(/^fields\./,""),Je=Array.isArray(ze)?ze[0]:ze;typeof Je=="string"&&($=u(it,Je)||$)}),$)return;throw new Error(y?.message||"We could not send your request. Please try again.")}s.replaceWith(a("p","cb-form-success","Thanks! We'll contact you soon.")),D()}catch(f){l.textContent=f.message||"We could not send your request. Please try again.",l.hidden=!1}finally{z.disabled=!1}}}),v.append(s),D()},Te=async i=>{if(!i.trim()||re||C)return;if(i.length>r.limits.messageCharacters){Ie(`Please keep your message within ${r.limits.messageCharacters} characters.`);return}if(d&&me.length+2>T*2){Ie("Test session limit reached. Reset chat to start a new session.");return}let s=_;G=i.trim(),at(),X("user",G),m.value="",ue(),re=!0,m.disabled=!0,R.disabled=!0,q.hidden=!1,D();let l=null,p="";try{if(await Ze({apiBase:e,botId:o,conversationId:d?null:localStorage.getItem(`cb-conversation-${o}`),message:G,test:d,history:d?me:void 0,authToken:d?n():null,assistantRules:d?r.settings?.assistantRules:void 0,botName:d?r.texts.botName:void 0,onToken:u=>{A||s!==_||u&&(p+=u,p.trim()&&(q.hidden=!0,l??=X("bot",""),qe(l.bubble,p),He()&&D()))},onLeadForm:u=>{!A&&s===_&&ot(u)},onUsage:u=>{d||A||s!==_||(N=Number(u.used)||N,T=Number(u.limit)||T,C=!!u.reached,ae())}}),A||s!==_)return;p?d?me.push({role:"user",text:G},{role:"assistant",text:p.slice(0,1e5)}):(pe.push({kind:"bot",content:p,stamp:l?.stamp||tt()}),$e()):l?.row.remove(),!d&&C&&Se()}catch(u){if(A||s!==_)return;q.hidden=!0,l?.row.remove(),!d&&u.status===409&&/message limit/i.test(u.message||"")?(N=T,C=!0,ae(),$e(),Se()):Ie(u.message||"Unable to send message.",G)}finally{if(A||s!==_)return;re=!1,m.disabled=C,C||m.focus(),R.disabled=C||!m.value.trim()||m.value.length>r.limits.messageCharacters,q.hidden=!0}},oe,F=null;if(!d)try{let i=JSON.parse(localStorage.getItem(Le)||"null");i&&Date.now()-i.updatedAt<r.limits.conversationInactivityHours*36e5&&Array.isArray(i.messages)&&(F=i)}catch{}F?(F.conversationId&&localStorage.setItem(`cb-conversation-${o}`,F.conversationId),F.messages.forEach(i=>{let s=X(i.kind,i.content);!oe&&i.kind==="bot"&&(oe=s)}),J=F.messages.some(i=>i.kind==="user"),N=Number(F.usage?.used)||F.messages.filter(i=>i.kind==="user").length,C=N>=T):oe=X("bot",h&&r.texts.offlineMessage?r.texts.offlineMessage:r.texts.greetingMessage),Z.forEach(({role:i,text:s})=>{typeof s=="string"&&s.trim()&&X(i==="user"?"user":"bot",s)}),ae(),!d&&C&&Se(),Ne(),g&&V(!0),localStorage.getItem(Me)||setTimeout(()=>{Y||O.classList.add("cb-visible")},3e3),B.addEventListener("click",()=>{O.classList.remove("cb-visible"),localStorage.setItem(Me,"seen")}),k.addEventListener("click",()=>V(!Y)),ee.addEventListener("click",()=>V(!1)),le.addEventListener("submit",i=>{i.preventDefault(),Te(m.value)}),m.addEventListener("input",()=>{ue(),R.disabled=re||!m.value.trim()}),m.addEventListener("keydown",i=>{i.key==="Enter"&&!i.shiftKey&&(i.preventDefault(),le.requestSubmit())}),v.addEventListener("scroll",()=>{Q.hidden=He()}),Q.addEventListener("click",D),L.append(Q);let Ye=i=>{i.key==="Escape"&&Y&&V(!1)};document.addEventListener("keydown",Ye);function Ge(){_+=1,re=!1,J=!1,Ee="",Ae="",G="",Ce=0,N=0,C=!1,d||(localStorage.removeItem(`cb-conversation-${o}`),localStorage.removeItem(Le)),pe.length=0,me.length=0,v.replaceChildren(),oe=X("bot",h&&r.texts.offlineMessage?r.texts.offlineMessage:r.texts.greetingMessage),Ne(),ae(),m.disabled=!1,m.value="",R.disabled=!0,q.hidden=!0,ue(),m.focus()}return{destroy(){A||(A=!0,_+=1,document.removeEventListener("keydown",Ye),I.remove())},open(){V(!0)},close(){V(!1)},resetChat(){Ge()},update(i){if(A)return;let s=r.texts.greetingMessage,l=v.scrollTop;r=i,m.maxLength=r.limits.messageCharacters,T=r.limits.conversationPrompts,C=N>=T,ae(),_e(I,r),U.classList.toggle("cb-left",r.theme.position==="left"),U.classList.toggle("cb-right",r.theme.position==="right"),k.setAttribute("aria-label",`Open ${r.texts.botName} chat`),L.setAttribute("aria-label",`${r.texts.botName} chat`),Fe.textContent=r.texts.botName;let p=r.texts.avatarUrl?a("img","cb-avatar"):a("div","cb-avatar cb-avatar-initials",ve(r.texts.botName));r.texts.avatarUrl&&(p.src=r.texts.avatarUrl,p.alt=""),W.replaceWith(p),W=p,U.querySelectorAll(".cb-message-avatar").forEach(u=>{u.replaceWith(Qe())}),S.querySelector(".cb-launch-label")?.remove(),r.texts.launcherLabel&&S.prepend(a("span","cb-launch-label",r.texts.launcherLabel)),O.firstChild.textContent=r.texts.greetingMessage.slice(0,140),m.placeholder=r.texts.inputPlaceholder,ue(),m.setAttribute("aria-label",r.texts.inputPlaceholder),de.hidden=!r.branding.showBadge,Ce===1&&s!==r.texts.greetingMessage&&qe(oe.bubble,h&&r.texts.offlineMessage?r.texts.offlineMessage:r.texts.greetingMessage),J||Ne(),v.scrollTop=l}}}var De="2026-10-23-admin-chat-settings-1";var we=new Map;function mt(t){try{return t&&t.src?new URL(t.src,window.location.href).origin:window.location.origin}catch{return window.location.origin}}async function ut(t={}){let o=t.script,e=t.botId||o&&o.dataset.botId;if(!e)throw new Error("ChatbotWidget requires a botId.");let n=t.container||e;if(we.has(n))return we.get(n);let c=t.apiBase||o&&o.dataset.apiBase||mt(o),h=t.config,g=!1;if(!h)try{h=await Ve(c,e)}catch{return console.warn("ChatbotWidget: configuration unavailable."),null}let b=Oe(K(h,Re(o)),!!t.preview),d,r={update:I=>{b=Oe(K(K(b,I),Re(o)),!!t.preview),d?.update(b)},open:()=>d?.open(),close:()=>d?.close(),resetChat:()=>d?.resetChat(),destroy(){d?.destroy(),we.delete(n)}};return d=rt({container:t.container,botId:e,apiBase:c,getAuthToken:t.getAuthToken,config:b,defaultOpen:t.open??t.defaultOpen??!1,onOpenChange:t.onOpenChange,preview:t.preview,previewMessages:t.previewMessages}),we.set(n,r),r}window.__chatbot=window.__chatbot||{};window.ChatbotWidget=window.ChatbotWidget||{};(!window.__chatbot.init||window.ChatbotWidget.version!==De)&&(window.__chatbot.init=ut);window.ChatbotWidget.init=window.__chatbot.init;window.ChatbotWidget.version=De;var ne=document.currentScript;if(ne&&ne.dataset.botId){let t=()=>{ne.dataset.cbLoaded||(ne.dataset.cbLoaded="true",window.__chatbot.init({script:ne}))};document.readyState==="loading"?document.addEventListener("DOMContentLoaded",t,{once:!0}):t()}})();
