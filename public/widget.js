var ChatbotWidgetBundle=(()=>{var Qe=/^\/api\/v1\/bot-logos\/[a-zA-Z0-9]{40}\.(?:jpg|jpeg|png|webp)$/,De=t=>t==="localhost"||t==="127.0.0.1"||t==="[::1]"||t.endsWith(".test");function te(t,r=""){if(typeof t!="string"||!t)return"";try{let e=new URL(t);if(!["http:","https:"].includes(e.protocol)||e.username||e.password)return"";let i=De(e.hostname)&&Qe.test(e.pathname)&&!e.search&&!e.hash;if(i&&r){let c=new URL(r);c.protocol==="http:"&&c.host===e.host&&(e.protocol="http:")}return e.protocol==="https:"||e.protocol==="http:"&&i?e.href:""}catch{return""}}var re=Object.freeze({botName:40,launcherLabel:24,greetingMessage:200,inputPlaceholder:60,offlineMessage:200,starterQuestion:60,starterQuestions:4,avatarUrl:2048}),Ne=/^#(?:[0-9a-f]{3}|[0-9a-f]{6})$/i;var H={theme:{primaryColor:"#4F46E5",mode:"light",position:"right",borderRadius:16,fontFamily:"system"},texts:{botName:"Assistant",avatarUrl:"",greetingMessage:"Hi! How can I help?",inputPlaceholder:"Type your question...",launcherLabel:"",starterQuestions:[],offlineMessage:""},features:{leadCapture:!0,dentalNotice:!1},branding:{showBadge:!0,badgeText:""},contactText:"the office",dir:"",zIndex:2147483647},ae={system:'Inter, var(--font-inter, system-ui), -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',sans:"Arial, Helvetica, sans-serif",serif:"Georgia, serif",mono:"ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace"},xe=(t,r,e)=>typeof t=="string"?t.slice(0,e):r;function Q(t,r){let e={...t};return Object.keys(r||{}).forEach(i=>{e[i]=r[i]&&typeof r[i]=="object"&&!Array.isArray(r[i])?Q(t[i]||{},r[i]):r[i]}),e}function ve(t,r=!1){let e=Q(H,t||{});e.theme.primaryColor=Ne.test(e.theme.primaryColor)?e.theme.primaryColor:H.theme.primaryColor,e.theme.mode=["light","dark","auto"].includes(e.theme.mode)?e.theme.mode:"light",e.theme.position=e.theme.position==="left"?"left":"right",e.theme.borderRadius=Math.max(0,Math.min(28,Number.isFinite(Number(e.theme.borderRadius))?Number(e.theme.borderRadius):H.theme.borderRadius)),e.theme.fontFamily=ae[e.theme.fontFamily]?ae[e.theme.fontFamily]:Object.values(ae).includes(e.theme.fontFamily)?e.theme.fontFamily:ae.system,Object.keys(H.texts).forEach(c=>{c!=="starterQuestions"&&(e.texts[c]=xe(e.texts[c],H.texts[c],re[c]))});let i=r&&typeof window<"u"&&e.texts.avatarUrl.startsWith(`blob:${window.location.origin}/`);return e.texts.avatarUrl=i?e.texts.avatarUrl:te(e.texts.avatarUrl),e.texts.starterQuestions=Array.isArray(e.texts.starterQuestions)?e.texts.starterQuestions.filter(c=>typeof c=="string").slice(0,re.starterQuestions).map(c=>c.slice(0,re.starterQuestion)):[],e.features.leadCapture=!!e.features.leadCapture,e.features.dentalNotice=!!e.features.dentalNotice,e.branding.showBadge=!!e.branding.showBadge,e.branding.badgeText=xe(e.branding.badgeText,"",80),e.contactText=xe(e.contactText,"the office",120),e.dir=e.dir==="rtl"?"rtl":"",e.zIndex=Math.max(1,Math.min(2147483647,Number(e.zIndex)||2147483647)),e}function we(t){if(!t)return{};let r={},e={};return t.dataset.primaryColor!==void 0&&(r.primaryColor=t.dataset.primaryColor),t.dataset.position!==void 0&&(r.position=t.dataset.position),t.dataset.greeting!==void 0&&(e.greetingMessage=t.dataset.greeting),t.dataset.botName!==void 0&&(e.botName=t.dataset.botName),{theme:r,texts:e}}async function Ue(t,r){let e=f=>({...f,texts:{...f.texts,avatarUrl:te(f.texts?.avatarUrl,t)}}),i=`cb-config-${r}`;try{let f=JSON.parse(sessionStorage.getItem(i)||"null");if(f&&f.expires>Date.now())return e(f.config)}catch{}let c=await fetch(`${t.replace(/\/$/,"")}/api/v1/widget/config/${encodeURIComponent(r)}`,{headers:{Accept:"application/json"}});if(!c.ok)throw new Error("Configuration unavailable");let g=await c.json(),l=g.data||g;try{sessionStorage.setItem(i,JSON.stringify({config:l,expires:Date.now()+6e4}))}catch{}return e(l)}var ze=`
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
.cb-form input {
  width: 100%;
  padding: 9px 10px;
  border: 1px solid color-mix(in srgb, var(--cb-text) 20%, transparent);
  border-radius: var(--cb-radius);
  outline: 0;
  color: var(--cb-text);
  background: var(--cb-bg);
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
`;function Fe(t){let r=(t.match(/^event:\s*(.+)$/m)||[])[1]||"message",e=(t.match(/^data:\s*(.+)$/m)||[])[1]||"";try{return{event:r,data:JSON.parse(e)}}catch{return{event:r,data:e}}}async function Oe({apiBase:t,botId:r,conversationId:e,message:i,onToken:c,onLeadForm:g,test:l=!1,history:f=[],authToken:b=null,assistantRules:G,botName:o}){let h=await fetch(`${t.replace(/\/$/,"")}/api/v1/${l?`bot/${encodeURIComponent(r)}/test-chat`:`chat/${encodeURIComponent(r)}`}`,{method:"POST",headers:{"Content-Type":"application/json",Accept:"text/event-stream",...l&&b?{Authorization:`Bearer ${b}`}:{}},...l?{credentials:"include"}:{},body:JSON.stringify(l?{message:i,history:f,assistantRules:G,botName:o}:{conversationId:e,message:i})});if(!h.ok){let E=await h.json().catch(()=>null),S=l&&h.status===429?"15 test prompts used for this bot. Try again in an hour.":l&&h.status===409?"Test session limit reached. Reset chat to start a new session.":E?.message||"Chat is temporarily unavailable.";throw new Error(S)}if(!h.body)throw new Error("Chat is temporarily unavailable.");let J=h.body.getReader(),V=new TextDecoder,v="",L=null,A=null,y=!1;for(;;){let{done:E,value:S}=await J.read();if(E)break;v+=V.decode(S,{stream:!0});let k=v.split(/\n\n/);v=k.pop(),k.forEach(X=>{let x=Fe(X);if(x.event==="token"&&c(x.data.token||""),x.event==="lead_form"&&(A=x.data),x.event==="conversation"&&(L=x.data.conversationId),x.event==="done"&&(y=!0,!l&&L&&localStorage.setItem(`cb-conversation-${r}`,L),!l&&A&&g(A)),x.event==="error")throw new Error(x.data.message||"Chat is temporarily unavailable.")})}if(!y)throw new Error("Chat connection ended before the reply was saved.")}function We(t){let r=t.length===4?`#${t[1]}${t[1]}${t[2]}${t[2]}${t[3]}${t[3]}`:t,e=[1,3,5].map(i=>parseInt(r.slice(i,i+2),16)/255).map(i=>i<=.03928?i/12.92:((i+.055)/1.055)**2.4);return e[0]*.2126+e[1]*.7152+e[2]*.0722>.179?"#18181b":"#ffffff"}function ye(t,r){let e=r.theme.mode==="dark"||r.theme.mode==="auto"&&window.matchMedia?.("(prefers-color-scheme: dark)").matches;t.style.setProperty("--cb-primary",r.theme.primaryColor),t.style.setProperty("--cb-on-primary",We(r.theme.primaryColor)),t.style.setProperty("--cb-bg",e?"#202023":"#ffffff"),t.style.setProperty("--cb-surface",e?"#18181b":"#fafafa"),t.style.setProperty("--cb-text",e?"#f4f4f5":"#18181b"),t.style.setProperty("--cb-muted",e?"#a1a1aa":"#71717a"),t.style.setProperty("--cb-success",e?"#6ee7b7":"#047857"),t.style.setProperty("--cb-danger",e?"#fca5a5":"#dc2626"),t.style.setProperty("--cb-radius",`${r.theme.borderRadius}px`),t.style.setProperty("--cb-font",r.theme.fontFamily),t.style.setProperty("--cb-z",String(r.zIndex||2147483647))}var ke={name:"YourBrand",tagline:"AI assistant for websites that answers questions and captures leads.",domain:"yourbrand.example",supportEmail:"support@yourbrand.example",legalName:"YourBrand LLC",defaultTitle:"YourBrand | AI assistant for your website",description:"Add an AI assistant to your website to answer visitor questions, capture leads, and book appointments without code."},{name:st,tagline:ct,domain:lt,supportEmail:dt,legalName:bt,defaultTitle:pt,description:ut}=ke;var a=(t,r,e)=>{let i=document.createElement(t);return r&&(i.className=r),e!==void 0&&(i.textContent=e),i},ne=(t,r="")=>{let e=document.createElementNS("http://www.w3.org/2000/svg","svg");return e.setAttribute("viewBox","0 0 24 24"),e.setAttribute("aria-hidden","true"),r&&e.setAttribute("class",r),t.forEach(i=>{let c=document.createElementNS("http://www.w3.org/2000/svg",i.tag||"path");Object.keys(i).forEach(g=>{g!=="tag"&&c.setAttribute(g,i[g])}),e.append(c)}),e},qe=()=>ne([{d:"M20 11.5a7.5 7.5 0 0 1-7.8 7.49 8.7 8.7 0 0 1-3.12-.58L4 20l1.5-4.2A7.25 7.25 0 0 1 4 11.5 7.5 7.5 0 0 1 11.75 4 7.5 7.5 0 0 1 20 11.5Z"},{d:"M8.5 11.5h.01M12 11.5h.01M15.5 11.5h.01"}],"cb-icon cb-icon-chat"),Re=(t="cb-icon cb-icon-close")=>ne([{d:"m7 7 10 10M17 7 7 17"}],t),He=()=>ne([{d:"M12 19V5M6.5 10.5 12 5l5.5 5.5"}]),Ye=()=>ne([{d:"M3 12a9 9 0 1 0 2.6-6.4L3 8"},{d:"M3 3v5h5"}]),oe=t=>t.split(/\s+/).filter(Boolean).slice(0,2).map(r=>r[0]).join("").toUpperCase()||"AI",Ge=()=>new Intl.DateTimeFormat(void 0,{hour:"numeric",minute:"2-digit"}).format(new Date);function Ce(t,r){t.replaceChildren();let e=(c,g)=>g.split(/(\*\*[^*]+\*\*|\*[^*]+\*|https?:\/\/[^\s]+)/g).forEach(l=>{if(l)if(/^\*\*[^*]+\*\*$/.test(l))c.append(a("strong","",l.slice(2,-2)));else if(/^\*[^*]+\*$/.test(l))c.append(a("em","",l.slice(1,-1)));else if(/^https?:\/\//.test(l)){let f=a("a","",l);f.href=l,f.target="_blank",f.rel="noopener noreferrer",c.append(f)}else c.append(document.createTextNode(l))}),i;String(r||"").split(`
`).forEach(c=>{let g=/^\s*[-*]\s+(.+)$/.exec(c);if(g){i||(i=a("ul"),t.append(i));let l=a("li");e(l,g[1]),i.append(l)}else{i=null;let l=a("p");e(l,c),t.append(l)}})}function Pe({container:t,botId:r,apiBase:e,getAuthToken:i=()=>null,config:c,failed:g,defaultOpen:l,onOpenChange:f,preview:b=!1,previewMessages:G=[]}){let o=c,h=a("div","cb-host");t&&h.classList.add("cb-embedded-host");let J=h.attachShadow({mode:"open"}),V=a("style"),v=!1;V.textContent=ze,J.append(V),ye(h,o);let L=a("div",`cb-root ${t?"cb-embedded":"cb-fixed"}${b?" cb-preview":""} cb-${o.theme.position}`),A=a("div","cb-launch-area"),y=a("button","cb-launcher");y.type="button",y.setAttribute("aria-label",`Open ${o.texts.botName} chat`),y.setAttribute("aria-expanded","false"),y.append(qe(),Re()),o.texts.launcherLabel&&A.append(a("span","cb-launch-label",o.texts.launcherLabel)),A.append(y);let E=a("div","cb-teaser",o.texts.greetingMessage.slice(0,140)),S=a("button","cb-teaser-close","\xD7");S.type="button",S.setAttribute("aria-label","Dismiss greeting"),E.append(S),A.append(E);let k=a("section","cb-window");k.setAttribute("role","dialog"),k.setAttribute("aria-label",`${o.texts.botName} chat`),k.setAttribute("aria-modal","true");let X=a("header","cb-header"),x=o.texts.avatarUrl?a("img","cb-avatar"):a("div","cb-avatar cb-avatar-initials",oe(o.texts.botName));o.texts.avatarUrl&&(x.src=o.texts.avatarUrl,x.alt="");let se=a("div","cb-head-copy"),Ee=a("div","cb-title",o.texts.botName);se.append(Ee);let Le=a("div","cb-presence");Le.append(a("span","cb-online"),document.createTextNode("Online")),se.append(Le);let D=a("button","cb-close");D.type="button",D.setAttribute("aria-label","Close chat"),D.append(Re("cb-icon cb-close-icon")),X.append(x,se,D);let w=a("div","cb-messages");w.setAttribute("aria-live","polite");let z=a("button","cb-scroll-bottom","\u2193");z.type="button",z.hidden=!0,z.setAttribute("aria-label","Scroll to latest message");let M=a("div","cb-chips");M.setAttribute("role","group"),M.setAttribute("aria-label","Suggested questions");let T=a("div","cb-typing-row");T.hidden=!0;let $e=a("div","cb-typing-bubble");$e.append(a("span","cb-dot"),a("span","cb-dot"),a("span","cb-dot")),T.append(a("div","cb-message-avatar",oe(o.texts.botName)),$e);let F=a("span","cb-counter");F.hidden=!0;let K=a("form","cb-compose"),p=a("textarea","cb-input");p.rows=1,p.maxLength=500,p.placeholder=o.texts.inputPlaceholder,p.setAttribute("aria-label",o.texts.inputPlaceholder);let $=a("button","cb-send");$.type="submit",$.disabled=!0,$.setAttribute("aria-label","Send message"),$.append(He()),K.append(p,F,$),k.append(X,w,T,M,K);let ce=a("footer","cb-footer",`Powered by ${ke.name}`);ce.hidden=!o.branding.showBadge,k.append(ce),L.append(A,k),J.append(L);let Z=t||document.body;Z&&Z!==document.body&&Z.replaceChildren(),Z.append(h);let O=!1,I=0,le=0,W=!1,R="",de="",be="",P=!1,pe=`cb-state-${r}`,Be=()=>{if(!b)try{localStorage.setItem(pe,JSON.stringify({updatedAt:Date.now(),conversationId:localStorage.getItem(`cb-conversation-${r}`)||crypto.randomUUID?.()||String(Date.now()),messages:ue}))}catch{}},ue=[],ee=[],me=`cb-teaser-${r}`,N=()=>{w.scrollTop=w.scrollHeight},Se=()=>w.scrollHeight-w.scrollTop-w.clientHeight<80,Te=()=>{let n=a("div","cb-message-avatar");if(o.texts.avatarUrl){let s=a("img");s.src=o.texts.avatarUrl,s.alt="",n.append(s)}else n.textContent=oe(o.texts.botName);return n},B=(n,s)=>{le+=1;let d=Ge(),u=a("div",`cb-message-row cb-${n}-row${n===de&&d===be?" cb-grouped":""}`),U=a("div","cb-message-wrap"),C=a("div",`cb-message cb-${n}`);return n==="bot"?(C.classList.add("cb-markdown"),Ce(C,s),u.append(Te())):C.textContent=s,U.append(C,a("time","cb-timestamp",d)),u.append(U),w.append(u),s&&!b&&(ue.push({kind:n,content:s,stamp:d}),Be()),de=n,be=d,N(),{row:u,bubble:C}},Ie=(n,s)=>{let d=a("div","cb-error-notice");if(d.setAttribute("role","alert"),d.append(a("span","cb-error-symbol","!"),a("span","cb-error-text",n)),s){let m=a("button","cb-retry");m.type="button",m.setAttribute("aria-label","Retry message"),m.title="Retry message",m.append(Ye()),m.addEventListener("click",()=>{d.remove(),he(s)}),d.append(m)}w.append(d),N()},_=n=>{v||O===n||(O=n,k.classList.toggle("cb-open",n),y.classList.toggle("cb-active",n),y.setAttribute("aria-expanded",String(n)),n?(E.classList.remove("cb-visible"),localStorage.setItem(me,"seen"),b||setTimeout(()=>{!v&&O&&p.focus()},210)):y.focus(),f?.(n))},ge=()=>{M.replaceChildren(),o.texts.starterQuestions.forEach(n=>{let s=a("button","cb-chip",n);s.type="button",s.addEventListener("click",()=>he(n)),M.append(s)}),M.hidden=P||!o.texts.starterQuestions.length},_e=()=>{P||(P=!0,M.hidden=!0)},fe=()=>{p.style.height="auto",p.style.height=`${Math.min(p.scrollHeight,96)}px`;let n=p.value.length;F.hidden=n<450,F.textContent=`${n}/500`,F.classList.toggle("cb-counter-limit",n>=500)},je=n=>{let s=a("form","cb-form");s.noValidate=!0,s.append(a("p","cb-form-title","Request an appointment"));let d=a("p","cb-form-error");d.hidden=!0,(n.fields||[]).forEach(u=>{let U=a("label","",u.label||u.name),C=a("input");C.name=u.name,C.required=u.required!==!1,C.type=["email","date","tel"].includes(u.type)?u.type:"text",C.autocomplete=u.name==="phone"?"tel":u.name==="email"?"email":"name",U.append(C),s.append(U)});let m=a("button","","Send request");m.type="submit",s.append(d,m),s.addEventListener("submit",async u=>{if(u.preventDefault(),!s.reportValidity()){d.textContent="Please complete the required fields.",d.hidden=!1;return}m.disabled=!0,d.hidden=!0;try{let U=Object.fromEntries(new FormData(s));if(!(await fetch(`${e.replace(/\/$/,"")}/api/v1/leads/${encodeURIComponent(r)}`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({conversationId:localStorage.getItem(`cb-conversation-${r}`),fields:U})})).ok)throw new Error;s.replaceWith(a("p","cb-form-success","Thanks! We'll contact you soon.")),N()}catch{m.disabled=!1,d.textContent="We could not send your request. Please try again.",d.hidden=!1}}),w.append(s),N()},he=async n=>{if(!n.trim()||W)return;if(b&&ee.length>=30){Ie("Test session limit reached. Reset chat to start a new session.");return}let s=I;R=n.trim(),_e(),B("user",R),p.value="",fe(),W=!0,p.disabled=!0,$.disabled=!0,T.hidden=!1,N();let d=null,m="";try{if(await Oe({apiBase:e,botId:r,conversationId:b?null:localStorage.getItem(`cb-conversation-${r}`),message:R,test:b,history:b?ee:void 0,authToken:b?i():null,assistantRules:b?o.settings?.assistantRules:void 0,botName:b?o.texts.botName:void 0,onToken:u=>{v||s!==I||u&&(m+=u,m.trim()&&(T.hidden=!0,d??=B("bot",""),Ce(d.bubble,m),Se()&&N()))},onLeadForm:u=>{!v&&s===I&&je(u)}}),v||s!==I)return;m?b&&ee.push({role:"user",text:R},{role:"assistant",text:m.slice(0,1e3)}):d?.row.remove()}catch(u){if(v||s!==I)return;T.hidden=!0,d?.row.remove(),Ie(u.message||"Unable to send message.",R)}finally{if(v||s!==I)return;W=!1,p.disabled=!1,p.focus(),$.disabled=!p.value.trim()||p.value.length>500,T.hidden=!0}},q,j=null;if(!b)try{let n=JSON.parse(localStorage.getItem(pe)||"null");n&&Date.now()-n.updatedAt<864e5&&Array.isArray(n.messages)&&(j=n)}catch{}j?(j.conversationId&&localStorage.setItem(`cb-conversation-${r}`,j.conversationId),j.messages.forEach(n=>{let s=B(n.kind,n.content);!q&&n.kind==="bot"&&(q=s)}),P=j.messages.some(n=>n.kind==="user")):q=B("bot",g&&o.texts.offlineMessage?o.texts.offlineMessage:o.texts.greetingMessage),G.forEach(({role:n,text:s})=>{typeof s=="string"&&s.trim()&&B(n==="user"?"user":"bot",s)}),ge(),l&&_(!0),localStorage.getItem(me)||setTimeout(()=>{O||E.classList.add("cb-visible")},3e3),S.addEventListener("click",()=>{E.classList.remove("cb-visible"),localStorage.setItem(me,"seen")}),y.addEventListener("click",()=>_(!O)),D.addEventListener("click",()=>_(!1)),K.addEventListener("submit",n=>{n.preventDefault(),he(p.value)}),p.addEventListener("input",()=>{fe(),$.disabled=W||!p.value.trim()}),p.addEventListener("keydown",n=>{n.key==="Enter"&&!n.shiftKey&&(n.preventDefault(),K.requestSubmit())}),w.addEventListener("scroll",()=>{z.hidden=Se()}),z.addEventListener("click",N),k.append(z);let Me=n=>{n.key==="Escape"&&O&&_(!1)};return document.addEventListener("keydown",Me),{destroy(){v||(v=!0,I+=1,document.removeEventListener("keydown",Me),h.remove())},open(){_(!0)},close(){_(!1)},resetChat(){I+=1,W=!1,P=!1,de="",be="",R="",le=0,b||(localStorage.removeItem(`cb-conversation-${r}`),localStorage.removeItem(pe)),ue.length=0,ee.length=0,w.replaceChildren(),q=B("bot",g&&o.texts.offlineMessage?o.texts.offlineMessage:o.texts.greetingMessage),ge(),p.disabled=!1,p.value="",$.disabled=!0,T.hidden=!0,fe()},update(n){if(v)return;let s=o.texts.greetingMessage,d=w.scrollTop;o=n,ye(h,o),L.classList.toggle("cb-left",o.theme.position==="left"),L.classList.toggle("cb-right",o.theme.position==="right"),y.setAttribute("aria-label",`Open ${o.texts.botName} chat`),k.setAttribute("aria-label",`${o.texts.botName} chat`),Ee.textContent=o.texts.botName;let m=o.texts.avatarUrl?a("img","cb-avatar"):a("div","cb-avatar cb-avatar-initials",oe(o.texts.botName));o.texts.avatarUrl&&(m.src=o.texts.avatarUrl,m.alt=""),x.replaceWith(m),x=m,L.querySelectorAll(".cb-message-avatar").forEach(u=>{u.replaceWith(Te())}),A.querySelector(".cb-launch-label")?.remove(),o.texts.launcherLabel&&A.prepend(a("span","cb-launch-label",o.texts.launcherLabel)),E.firstChild.textContent=o.texts.greetingMessage.slice(0,140),p.placeholder=o.texts.inputPlaceholder,p.setAttribute("aria-label",o.texts.inputPlaceholder),ce.hidden=!o.branding.showBadge,le===1&&s!==o.texts.greetingMessage&&Ce(q.bubble,g&&o.texts.offlineMessage?o.texts.offlineMessage:o.texts.greetingMessage),P||ge(),w.scrollTop=d}}}var Ae="2026-10-21-error-notice-1";var ie=new Map;function Je(t){try{return t&&t.src?new URL(t.src,window.location.href).origin:window.location.origin}catch{return window.location.origin}}async function Ve(t={}){let r=t.script,e=t.botId||r&&r.dataset.botId;if(!e)throw new Error("ChatbotWidget requires a botId.");let i=t.container||e;if(ie.has(i))return ie.get(i);let c=t.apiBase||r&&r.dataset.apiBase||Je(r),g=t.config,l=!1;if(!g)try{g=await Ue(c,e)}catch{return console.warn("ChatbotWidget: configuration unavailable."),null}let f=ve(Q(g,we(r)),!!t.preview),b,o={update:h=>{f=ve(Q(Q(f,h),we(r)),!!t.preview),b?.update(f)},open:()=>b?.open(),close:()=>b?.close(),resetChat:()=>b?.resetChat(),destroy(){b?.destroy(),ie.delete(i)}};return b=Pe({container:t.container,botId:e,apiBase:c,getAuthToken:t.getAuthToken,config:f,defaultOpen:t.open??t.defaultOpen??!1,onOpenChange:t.onOpenChange,preview:t.preview,previewMessages:t.previewMessages}),ie.set(i,o),o}window.__chatbot=window.__chatbot||{};window.ChatbotWidget=window.ChatbotWidget||{};(!window.__chatbot.init||window.ChatbotWidget.version!==Ae)&&(window.__chatbot.init=Ve);window.ChatbotWidget.init=window.__chatbot.init;window.ChatbotWidget.version=Ae;var Y=document.currentScript;if(Y&&Y.dataset.botId){let t=()=>{Y.dataset.cbLoaded||(Y.dataset.cbLoaded="true",window.__chatbot.init({script:Y}))};document.readyState==="loading"?document.addEventListener("DOMContentLoaded",t,{once:!0}):t()}})();
