var ChatbotWidgetBundle=(()=>{var ve=Object.freeze({botName:40,launcherLabel:24,greetingMessage:200,inputPlaceholder:60,offlineMessage:200,starterQuestion:60,starterQuestions:4,avatarUrl:2048}),Ke=/^#(?:[0-9a-f]{3}|[0-9a-f]{6})$/i;var ct=/^\/api\/v1\/bot-logos\/[a-zA-Z0-9]{40}\.(?:jpg|jpeg|png|webp)$/,dt=t=>t==="localhost"||t==="127.0.0.1"||t==="[::1]"||t.endsWith(".test");function Ue(t,r=""){if(typeof t!="string"||!t)return"";try{let e=new URL(t);if(!["http:","https:"].includes(e.protocol)||e.username||e.password)return"";let n=dt(e.hostname)&&ct.test(e.pathname)&&!e.search&&!e.hash;if(n&&r){let c=new URL(r);c.protocol==="http:"&&c.host===e.host&&(e.protocol="http:")}return e.protocol==="https:"||e.protocol==="http:"&&n?e.href:""}catch{return""}}var ae={theme:{primaryColor:"#4F46E5",mode:"light",position:"right",borderRadius:16,fontFamily:"system"},texts:{botName:"Assistant",avatarUrl:"",greetingMessage:"Hi! How can I help?",inputPlaceholder:"Type your question...",launcherLabel:"",starterQuestions:[],offlineMessage:""},features:{leadCapture:!0,dentalNotice:!1},branding:{showBadge:!0,badgeText:""},limits:{conversationPrompts:15,messageCharacters:500,testPromptsPerHour:15,conversationInactivityHours:24},contactText:"the office",dir:"",zIndex:2147483647},we={system:'Inter, var(--font-inter, system-ui), -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',sans:"Arial, Helvetica, sans-serif",serif:"Georgia, serif",mono:"ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace"},Re=(t,r,e)=>typeof t=="string"?t.slice(0,e):r;function V(t,r){let e={...t};return Object.keys(r||{}).forEach(n=>{e[n]=r[n]&&typeof r[n]=="object"&&!Array.isArray(r[n])?V(t[n]||{},r[n]):r[n]}),e}function je(t,r=!1){let e=V(ae,t||{});e.theme.primaryColor=Ke.test(e.theme.primaryColor)?e.theme.primaryColor:ae.theme.primaryColor,e.theme.mode=["light","dark","auto"].includes(e.theme.mode)?e.theme.mode:"light",e.theme.position=e.theme.position==="left"?"left":"right",e.theme.borderRadius=Math.max(0,Math.min(28,Number.isFinite(Number(e.theme.borderRadius))?Number(e.theme.borderRadius):ae.theme.borderRadius)),e.theme.fontFamily=we[e.theme.fontFamily]?we[e.theme.fontFamily]:Object.values(we).includes(e.theme.fontFamily)?e.theme.fontFamily:we.system,Object.keys(ae.texts).forEach(c=>{c!=="starterQuestions"&&(e.texts[c]=Re(e.texts[c],ae.texts[c],ve[c]))});let n=r&&typeof window<"u"&&e.texts.avatarUrl.startsWith(`blob:${window.location.origin}/`);return e.texts.avatarUrl=n?e.texts.avatarUrl:Ue(e.texts.avatarUrl),e.texts.starterQuestions=Array.isArray(e.texts.starterQuestions)?e.texts.starterQuestions.filter(c=>typeof c=="string").slice(0,ve.starterQuestions).map(c=>c.slice(0,ve.starterQuestion)):[],e.features.leadCapture=!!e.features.leadCapture,e.features.dentalNotice=!!e.features.dentalNotice,e.branding.showBadge=!!e.branding.showBadge,e.branding.badgeText=Re(e.branding.badgeText,"",80),e.limits.conversationPrompts=Math.max(1,Math.min(100,Number(e.limits.conversationPrompts)||15)),e.limits.messageCharacters=Math.max(1,Math.min(1e4,Number(e.limits.messageCharacters)||500)),e.limits.testPromptsPerHour=Math.max(1,Math.min(1e3,Number(e.limits.testPromptsPerHour)||15)),e.limits.conversationInactivityHours=Math.max(1,Math.min(720,Number(e.limits.conversationInactivityHours)||24)),e.contactText=Re(e.contactText,"the office",120),e.dir=e.dir==="rtl"?"rtl":"",e.zIndex=Math.max(1,Math.min(2147483647,Number(e.zIndex)||2147483647)),e}function _e(t){if(!t)return{};let r={},e={};return t.dataset.primaryColor!==void 0&&(r.primaryColor=t.dataset.primaryColor),t.dataset.position!==void 0&&(r.position=t.dataset.position),t.dataset.greeting!==void 0&&(e.greetingMessage=t.dataset.greeting),t.dataset.botName!==void 0&&(e.botName=t.dataset.botName),{theme:r,texts:e}}async function Ze(t,r){let e=g=>({...g,texts:{...g.texts,avatarUrl:Ue(g.texts?.avatarUrl,t)}}),n=`cb-config-${r}`;try{let g=JSON.parse(sessionStorage.getItem(n)||"null");if(g&&g.expires>Date.now())return e(g.config)}catch{}let c=await fetch(`${t.replace(/\/$/,"")}/api/v1/widget/config/${encodeURIComponent(r)}`,{headers:{Accept:"application/json"}});if(!c.ok)throw new Error("Configuration unavailable");let f=await c.json(),p=f.data||f;try{sessionStorage.setItem(n,JSON.stringify({config:p,expires:Date.now()+6e4}))}catch{}return e(p)}var et=`
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
.cb-default-avatar {
  display: grid;
  place-items: center;
  background: var(--cb-primary);
  color: var(--cb-on-primary);
}
.cb-bot-icon {
  width: 20px;
  height: 20px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.8;
  stroke-linecap: round;
  stroke-linejoin: round;
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
.cb-message-avatar .cb-default-avatar {
  width: 100%;
  height: 100%;
}
.cb-message-avatar .cb-bot-icon {
  width: 17px;
  height: 17px;
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
  width: 15px;
  height: 15px;
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
`;function lt(t){let r=(t.match(/^event:\s*(.+)$/m)||[])[1]||"message",e=(t.match(/^data:\s*(.+)$/m)||[])[1]||"";try{return{event:r,data:JSON.parse(e)}}catch{return{event:r,data:e}}}async function tt({apiBase:t,botId:r,conversationId:e,message:n,onToken:c,onLeadForm:f,onUsage:p,test:g=!1,history:j=[],authToken:b=null,assistantRules:ne,botName:i}){let k=await fetch(`${t.replace(/\/$/,"")}/api/v1/${g?`bot/${encodeURIComponent(r)}/test-chat`:`chat/${encodeURIComponent(r)}`}`,{method:"POST",headers:{"Content-Type":"application/json",Accept:"text/event-stream",...g&&b?{Authorization:`Bearer ${b}`}:{}},...g?{credentials:"include"}:{},body:JSON.stringify(g?{message:n,history:j,assistantRules:ne,botName:i}:{conversationId:e,message:n})});if(!k.ok){let _=(await k.json().catch(()=>null))?.message||(g&&k.status===409?"Test session limit reached. Reset chat to start a new session.":"Chat is temporarily unavailable."),E=new Error(_);throw E.status=k.status,E}if(!k.body)throw new Error("Chat is temporarily unavailable.");let se=k.body.getReader(),ce=new TextDecoder,C="",z=null,S=null,L=!1;for(;;){let{done:O,value:_}=await se.read();if(O)break;C+=ce.decode(_,{stream:!0});let E=C.split(/\n\n/);C=E.pop(),E.forEach(de=>{let v=lt(de);if(v.event==="token"&&c(v.data.token||""),v.event==="lead_form"&&(S=v.data),v.event==="usage"&&p?.(v.data),v.event==="conversation"&&(z=v.data.conversationId),v.event==="done"&&(L=!0,!g&&z&&localStorage.setItem(`cb-conversation-${r}`,z),!g&&S&&f(S)),v.event==="error")throw new Error(v.data.message||"Chat is temporarily unavailable.")})}if(!L)throw new Error("Chat connection ended before the reply was saved.")}function bt(t){let r=t.length===4?`#${t[1]}${t[1]}${t[2]}${t[2]}${t[3]}${t[3]}`:t,e=[1,3,5].map(n=>parseInt(r.slice(n,n+2),16)/255).map(n=>n<=.03928?n/12.92:((n+.055)/1.055)**2.4);return e[0]*.2126+e[1]*.7152+e[2]*.0722>.179?"#18181b":"#ffffff"}function qe(t,r){let e=r.theme.mode==="dark"||r.theme.mode==="auto"&&window.matchMedia?.("(prefers-color-scheme: dark)").matches;t.style.setProperty("--cb-primary",r.theme.primaryColor),t.style.setProperty("--cb-on-primary",bt(r.theme.primaryColor)),t.style.setProperty("--cb-bg",e?"#202023":"#ffffff"),t.style.setProperty("--cb-surface",e?"#18181b":"#fafafa"),t.style.setProperty("--cb-text",e?"#f4f4f5":"#18181b"),t.style.setProperty("--cb-muted",e?"#a1a1aa":"#71717a"),t.style.setProperty("--cb-success",e?"#6ee7b7":"#047857"),t.style.setProperty("--cb-danger",e?"#fca5a5":"#dc2626"),t.style.setProperty("--cb-radius",`${r.theme.borderRadius}px`),t.style.setProperty("--cb-font",r.theme.fontFamily),t.style.setProperty("--cb-z",String(r.zIndex||2147483647))}var ye={name:"Tellvira",tagline:"AI assistant for websites that answers questions and captures leads.",domain:"tellvira.com",iconPath:"/brand/tellvira-icon.svg",wordmarkPath:"/brand/tellvira-logo-transparent.png",widgetBadgeIconPath:"/brand/tellvira-widget-15.png",supportEmail:"support@tellvira.com",description:"Add an AI assistant to your website to answer visitor questions, capture leads, and book appointments without code."};var o=(t,r,e)=>{let n=document.createElement(t);return r&&(n.className=r),e!==void 0&&(n.textContent=e),n},oe=(t,r="")=>{let e=document.createElementNS("http://www.w3.org/2000/svg","svg");return e.setAttribute("viewBox","0 0 24 24"),e.setAttribute("aria-hidden","true"),r&&e.setAttribute("class",r),t.forEach(n=>{let c=document.createElementNS("http://www.w3.org/2000/svg",n.tag||"path");Object.keys(n).forEach(f=>{f!=="tag"&&c.setAttribute(f,n[f])}),e.append(c)}),e},pt=()=>oe([{d:"M20 11.5a7.5 7.5 0 0 1-7.8 7.49 8.7 8.7 0 0 1-3.12-.58L4 20l1.5-4.2A7.25 7.25 0 0 1 4 11.5 7.5 7.5 0 0 1 11.75 4 7.5 7.5 0 0 1 20 11.5Z"},{d:"M8.5 11.5h.01M12 11.5h.01M15.5 11.5h.01"}],"cb-icon cb-icon-chat"),mt=()=>oe([{tag:"rect",x:3,y:7,width:18,height:14,rx:4},{d:"M12 7V4M10 3h4"},{d:"M8 13h.01M16 13h.01M9 17h6"}],"cb-bot-icon"),rt=(t="cb-icon cb-icon-close")=>oe([{d:"m7 7 10 10M17 7 7 17"}],t),ut=()=>oe([{d:"M12 19V5M6.5 10.5 12 5l5.5 5.5"}]),gt=()=>oe([{d:"M3 12a9 9 0 1 0 2.6-6.4L3 8"},{d:"M3 3v5h5"}]),at=()=>new Intl.DateTimeFormat(void 0,{hour:"numeric",minute:"2-digit"}).format(new Date);function Be(t,r){t.replaceChildren();let e=(c,f)=>f.split(/(\*\*[^*]+\*\*|\*[^*]+\*|https?:\/\/[^\s]+)/g).forEach(p=>{if(p)if(/^\*\*[^*]+\*\*$/.test(p))c.append(o("strong","",p.slice(2,-2)));else if(/^\*[^*]+\*$/.test(p))c.append(o("em","",p.slice(1,-1)));else if(/^https?:\/\//.test(p)){let g=o("a","",p);g.href=p,g.target="_blank",g.rel="noopener noreferrer",c.append(g)}else c.append(document.createTextNode(p))}),n;String(r||"").split(`
`).forEach(c=>{let f=/^\s*[-*]\s+(.+)$/.exec(c);if(f){n||(n=o("ul"),t.append(n));let p=o("li");e(p,f[1]),n.append(p)}else{n=null;let p=o("p");e(p,c),t.append(p)}})}function ot({container:t,botId:r,apiBase:e,brandBadgeIconUrl:n,getAuthToken:c=()=>null,config:f,failed:p,defaultOpen:g,onOpenChange:j,preview:b=!1,previewMessages:ne=[]}){let i=f,k=o("div","cb-host");t&&k.classList.add("cb-embedded-host");let se=k.attachShadow({mode:"open"}),ce=o("style"),C=!1;ce.textContent=et,se.append(ce),qe(k,i);let z=o("div",`cb-root ${t?"cb-embedded":"cb-fixed"}${b?" cb-preview":""} cb-${i.theme.position}`),S=o("div","cb-launch-area"),L=o("button","cb-launcher");L.type="button",L.setAttribute("aria-label",`Open ${i.texts.botName} chat`),L.setAttribute("aria-expanded","false"),L.append(pt(),rt()),i.texts.launcherLabel&&S.append(o("span","cb-launch-label",i.texts.launcherLabel)),S.append(L);let O=o("div","cb-teaser",i.texts.greetingMessage.slice(0,140)),_=o("button","cb-teaser-close","\xD7");_.type="button",_.setAttribute("aria-label","Dismiss greeting"),O.append(_),S.append(O);let E=o("section","cb-window");E.setAttribute("role","dialog"),E.setAttribute("aria-label",`${i.texts.botName} chat`),E.setAttribute("aria-modal","true");let de=o("header","cb-header"),v=(a,s="cb-avatar",d="header")=>{if(!a){let m=o("span",`${s} cb-default-avatar`);return m.append(mt()),m}let l=o("img",s);return l.src=a,l.alt="",l.width=d==="header"?36:28,l.height=l.width,l},Ce=v(i.texts.avatarUrl),Ee=o("div","cb-head-copy"),Fe=o("div","cb-title",i.texts.botName);Ee.append(Fe);let We=o("div","cb-presence");We.append(o("span","cb-online"),document.createTextNode("Online")),Ee.append(We);let X=o("button","cb-close");X.type="button",X.setAttribute("aria-label","Close chat"),X.append(rt("cb-icon cb-close-icon")),de.append(Ce,Ee,X);let w=o("div","cb-messages");w.setAttribute("aria-live","polite");let W=o("button","cb-scroll-bottom","\u2193");W.type="button",W.hidden=!0,W.setAttribute("aria-label","Scroll to latest message");let F=o("div","cb-chips");F.setAttribute("role","group"),F.setAttribute("aria-label","Suggested questions");let q=o("div","cb-typing-row");q.hidden=!0;let He=o("div","cb-typing-bubble");He.append(o("span","cb-dot"),o("span","cb-dot"),o("span","cb-dot"));let Qe=o("div","cb-message-avatar");Qe.append(v(i.texts.avatarUrl,"","reply")),q.append(Qe,He);let K=o("span","cb-counter");K.hidden=!0;let le=o("div","cb-usage");le.hidden=b;let be=o("form","cb-compose"),u=o("textarea","cb-input");u.rows=1,u.maxLength=i.limits.messageCharacters,u.placeholder=i.texts.inputPlaceholder,u.setAttribute("aria-label",i.texts.inputPlaceholder);let U=o("button","cb-send");U.type="submit",U.disabled=!0,U.setAttribute("aria-label","Send message"),U.append(ut()),be.append(u,K,U),E.append(de,w,q,F,le,be);let pe=o("footer","cb-footer"),Z=o("img","cb-brand-icon");Z.src=n,Z.alt="",Z.width=15,Z.height=15,pe.append(Z,document.createTextNode(`Powered by ${ye.name}`)),pe.hidden=!i.branding.showBadge,E.append(pe),z.append(S,E),se.append(z);let me=t||document.body;me&&me!==document.body&&me.replaceChildren(),me.append(k);let H=!1,R=0,Me=0,ee=!1,Q="",Ae="",Le="",Y=!1,T=0,N=i.limits.conversationPrompts,M=!1,$e=`cb-state-${r}`,Ie=()=>{if(!b)try{localStorage.setItem($e,JSON.stringify({updatedAt:Date.now(),conversationId:localStorage.getItem(`cb-conversation-${r}`)||crypto.randomUUID?.()||String(Date.now()),messages:ue,usage:{used:T,limit:N,reached:M}}))}catch{}},ue=[],ge=[],Se=`cb-teaser-${r}`,B=()=>{w.scrollTop=w.scrollHeight},Ye=()=>w.scrollHeight-w.scrollTop-w.clientHeight<80,Ge=()=>{let a=o("div","cb-message-avatar");return a.append(v(i.texts.avatarUrl,"","reply")),a},G=(a,s)=>{Me+=1;let d=at(),m=o("div",`cb-message-row cb-${a}-row${a===Ae&&d===Le?" cb-grouped":""}`),fe=o("div","cb-message-wrap"),P=o("div",`cb-message cb-${a}`);return a==="bot"?(P.classList.add("cb-markdown"),Be(P,s),m.append(Ge())):P.textContent=s,fe.append(P,o("time","cb-timestamp",d)),m.append(fe),w.append(m),s&&!b&&(ue.push({kind:a,content:s,stamp:d}),Ie()),Ae=a,Le=d,B(),{row:m,bubble:P,stamp:d}},Te=(a,s)=>{let d=o("div","cb-error-notice");if(d.setAttribute("role","alert"),d.append(o("span","cb-error-symbol","!"),o("span","cb-error-text",a)),s){let l=o("button","cb-retry");l.type="button",l.setAttribute("aria-label","Retry message"),l.title="Retry message",l.append(gt()),l.addEventListener("click",()=>{d.remove(),ze(s)}),d.append(l)}w.append(d),B()},te=()=>{le.textContent=M?`${T} / ${N} questions \xB7 Limit reached`:`${T} / ${N} questions`,le.classList.toggle("cb-usage-limit",M)},Ne=()=>{if(w.querySelector(".cb-limit-notice"))return;let a=o("div","cb-limit-notice");a.setAttribute("role","status");let s=o("span","","This conversation has reached its limit. Start a new chat to continue."),d=o("button","cb-limit-action","New chat");d.type="button",d.addEventListener("click",()=>Ve()),a.append(s,d),w.append(a),B()},J=a=>{C||H===a||(H=a,E.classList.toggle("cb-open",a),L.classList.toggle("cb-active",a),L.setAttribute("aria-expanded",String(a)),a?(O.classList.remove("cb-visible"),localStorage.setItem(Se,"seen"),b||setTimeout(()=>{!C&&H&&u.focus()},210)):L.focus(),j?.(a))},Pe=()=>{F.replaceChildren(),i.texts.starterQuestions.forEach(a=>{let s=o("button","cb-chip",a);s.type="button",s.addEventListener("click",()=>ze(a)),F.append(s)}),F.hidden=Y||!i.texts.starterQuestions.length},it=()=>{Y||(Y=!0,F.hidden=!0)},he=()=>{u.style.height="auto",u.style.height=`${Math.min(u.scrollHeight,96)}px`;let a=u.value.length;K.hidden=a<Math.floor(i.limits.messageCharacters*.9),K.textContent=`${a}/${i.limits.messageCharacters}`,K.classList.toggle("cb-counter-limit",a>=i.limits.messageCharacters)},nt=a=>{let s=o("form","cb-form");s.noValidate=!0,s.append(o("p","cb-form-title","Request an appointment"));let d=o("p","cb-form-error");d.hidden=!0;let l=new Map;(a.fields||[]).forEach(x=>{let h=x.name||x.id;if(!h)return;let I=o("label"),y=o("span","cb-form-label",x.label||h);x.required!==!1&&y.append(o("span","cb-required"," *"));let A=o("input");A.name=h,A.required=x.required!==!1,A.type=["email","date","tel"].includes(x.type)?x.type:"text",A.autocomplete=h==="phone"?"tel":h==="email"?"email":"name",A.maxLength=h==="phone"?40:255;let $=o("span","cb-field-error");$.hidden=!0,A.setAttribute("aria-describedby",`cb-${h}-error`),$.id=`cb-${h}-error`,A.addEventListener("input",()=>{A.removeAttribute("aria-invalid"),$.hidden=!0,d.hidden=!0}),I.append(y,A,$),s.append(I),l.set(h,{control:A,error:$,label:x.label||h})});let m=(x,h)=>{let I=l.get(x);return I?(I.control.setAttribute("aria-invalid","true"),I.error.textContent=h,I.error.hidden=!1,!0):!1},fe=()=>{let x=!0;l.forEach(({control:y,error:A,label:$})=>{y.removeAttribute("aria-invalid"),A.hidden=!0;let xe=y.value.trim();y.required&&!xe?(m(y.name,`${$} is required.`),x=!1):xe&&!y.validity.valid&&(m(y.name,y.validity.typeMismatch?`Enter a valid ${y.name==="email"?"email address":$.toLowerCase()}.`:`${$} is invalid.`),x=!1)});let h=l.get("email")?.control.value.trim(),I=l.get("phone")?.control.value.trim();return l.has("email")&&l.has("phone")&&!h&&!I&&(m("email","Enter an email address or phone number."),x=!1),x},P=o("button","","Send request");P.type="submit",s.append(d,P),s.addEventListener("submit",async x=>{if(x.preventDefault(),d.hidden=!0,!!fe()){P.disabled=!0;try{let h=Object.fromEntries(new FormData(s)),I=await fetch(`${e.replace(/\/$/,"")}/api/v1/leads/${encodeURIComponent(r)}`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({conversationId:localStorage.getItem(`cb-conversation-${r}`),fields:h})});if(!I.ok){let y=await I.json().catch(()=>null),A=y?.errors&&typeof y.errors=="object"?Object.entries(y.errors):[],$=!1;if(A.forEach(([xe,Oe])=>{let st=xe.replace(/^fields\./,""),Xe=Array.isArray(Oe)?Oe[0]:Oe;typeof Xe=="string"&&($=m(st,Xe)||$)}),$)return;throw new Error(y?.message||"We could not send your request. Please try again.")}s.replaceWith(o("p","cb-form-success","Thanks! We'll contact you soon.")),B()}catch(h){d.textContent=h.message||"We could not send your request. Please try again.",d.hidden=!1}finally{P.disabled=!1}}}),w.append(s),B()},ze=async a=>{if(!a.trim()||ee||M)return;if(a.length>i.limits.messageCharacters){Te(`Please keep your message within ${i.limits.messageCharacters} characters.`);return}if(b&&ge.length+2>N*2){Te("Test session limit reached. Reset chat to start a new session.");return}let s=R;Q=a.trim(),it(),G("user",Q),u.value="",he(),ee=!0,u.disabled=!0,U.disabled=!0,q.hidden=!1,B();let d=null,l="";try{if(await tt({apiBase:e,botId:r,conversationId:b?null:localStorage.getItem(`cb-conversation-${r}`),message:Q,test:b,history:b?ge:void 0,authToken:b?c():null,assistantRules:b?i.settings?.assistantRules:void 0,botName:b?i.texts.botName:void 0,onToken:m=>{C||s!==R||m&&(l+=m,l.trim()&&(q.hidden=!0,d??=G("bot",""),Be(d.bubble,l),Ye()&&B()))},onLeadForm:m=>{!C&&s===R&&nt(m)},onUsage:m=>{b||C||s!==R||(T=Number(m.used)||T,N=Number(m.limit)||N,M=!!m.reached,te())}}),C||s!==R)return;l?b?ge.push({role:"user",text:Q},{role:"assistant",text:l.slice(0,1e5)}):(ue.push({kind:"bot",content:l,stamp:d?.stamp||at()}),Ie()):d?.row.remove(),!b&&M&&Ne()}catch(m){if(C||s!==R)return;q.hidden=!0,d?.row.remove(),!b&&m.status===409&&/message limit/i.test(m.message||"")?(T=N,M=!0,te(),Ie(),Ne()):Te(m.message||"Unable to send message.",Q)}finally{if(C||s!==R)return;ee=!1,u.disabled=M,M||u.focus(),U.disabled=M||!u.value.trim()||u.value.length>i.limits.messageCharacters,q.hidden=!0}},re,D=null;if(!b)try{let a=JSON.parse(localStorage.getItem($e)||"null");a&&Date.now()-a.updatedAt<i.limits.conversationInactivityHours*36e5&&Array.isArray(a.messages)&&(D=a)}catch{}D?(D.conversationId&&localStorage.setItem(`cb-conversation-${r}`,D.conversationId),D.messages.forEach(a=>{let s=G(a.kind,a.content);!re&&a.kind==="bot"&&(re=s)}),Y=D.messages.some(a=>a.kind==="user"),T=Number(D.usage?.used)||D.messages.filter(a=>a.kind==="user").length,M=T>=N):re=G("bot",p&&i.texts.offlineMessage?i.texts.offlineMessage:i.texts.greetingMessage),ne.forEach(({role:a,text:s})=>{typeof s=="string"&&s.trim()&&G(a==="user"?"user":"bot",s)}),te(),!b&&M&&Ne(),Pe(),g&&J(!0),localStorage.getItem(Se)||setTimeout(()=>{H||O.classList.add("cb-visible")},3e3),_.addEventListener("click",()=>{O.classList.remove("cb-visible"),localStorage.setItem(Se,"seen")}),L.addEventListener("click",()=>J(!H)),X.addEventListener("click",()=>J(!1)),be.addEventListener("submit",a=>{a.preventDefault(),ze(u.value)}),u.addEventListener("input",()=>{he(),U.disabled=ee||!u.value.trim()}),u.addEventListener("keydown",a=>{a.key==="Enter"&&!a.shiftKey&&(a.preventDefault(),be.requestSubmit())}),w.addEventListener("scroll",()=>{W.hidden=Ye()}),W.addEventListener("click",B),E.append(W);let Je=a=>{a.key==="Escape"&&H&&J(!1)};document.addEventListener("keydown",Je);function Ve(){R+=1,ee=!1,Y=!1,Ae="",Le="",Q="",Me=0,T=0,M=!1,b||(localStorage.removeItem(`cb-conversation-${r}`),localStorage.removeItem($e)),ue.length=0,ge.length=0,w.replaceChildren(),re=G("bot",p&&i.texts.offlineMessage?i.texts.offlineMessage:i.texts.greetingMessage),Pe(),te(),u.disabled=!1,u.value="",U.disabled=!0,q.hidden=!0,he(),u.focus()}return{destroy(){C||(C=!0,R+=1,document.removeEventListener("keydown",Je),k.remove())},open(){J(!0)},close(){J(!1)},resetChat(){Ve()},update(a){if(C)return;let s=i.texts.greetingMessage,d=w.scrollTop;i=a,u.maxLength=i.limits.messageCharacters,N=i.limits.conversationPrompts,M=T>=N,te(),qe(k,i),z.classList.toggle("cb-left",i.theme.position==="left"),z.classList.toggle("cb-right",i.theme.position==="right"),L.setAttribute("aria-label",`Open ${i.texts.botName} chat`),E.setAttribute("aria-label",`${i.texts.botName} chat`),Fe.textContent=i.texts.botName;let l=v(i.texts.avatarUrl);Ce.replaceWith(l),Ce=l,z.querySelectorAll(".cb-message-avatar").forEach(m=>{m.replaceWith(Ge())}),S.querySelector(".cb-launch-label")?.remove(),i.texts.launcherLabel&&S.prepend(o("span","cb-launch-label",i.texts.launcherLabel)),O.firstChild.textContent=i.texts.greetingMessage.slice(0,140),u.placeholder=i.texts.inputPlaceholder,he(),u.setAttribute("aria-label",i.texts.inputPlaceholder),pe.hidden=!i.branding.showBadge,Me===1&&s!==i.texts.greetingMessage&&Be(re.bubble,p&&i.texts.offlineMessage?i.texts.offlineMessage:i.texts.greetingMessage),Y||Pe(),w.scrollTop=d}}}var De="2026-10-23-admin-chat-settings-1";var ke=new Map;function ht(t){try{return t&&t.src?new URL(t.src,window.location.href).origin:window.location.origin}catch{return window.location.origin}}async function ft(t={}){let r=t.script,e=t.botId||r&&r.dataset.botId;if(!e)throw new Error("ChatbotWidget requires a botId.");let n=t.container||e;if(ke.has(n))return ke.get(n);let c=t.apiBase||r&&r.dataset.apiBase||ht(r),f=new URL(ye.widgetBadgeIconPath,r?.src||window.location.href).href,p=t.config,g=!1;if(!p)try{p=await Ze(c,e)}catch{return console.warn("ChatbotWidget: configuration unavailable."),null}let j=je(V(p,_e(r)),!!t.preview),b,i={update:k=>{j=je(V(V(j,k),_e(r)),!!t.preview),b?.update(j)},open:()=>b?.open(),close:()=>b?.close(),resetChat:()=>b?.resetChat(),destroy(){b?.destroy(),ke.delete(n)}};return b=ot({container:t.container,botId:e,apiBase:c,brandBadgeIconUrl:f,getAuthToken:t.getAuthToken,config:j,defaultOpen:t.open??t.defaultOpen??!1,onOpenChange:t.onOpenChange,preview:t.preview,previewMessages:t.previewMessages}),ke.set(n,i),i}window.__chatbot=window.__chatbot||{};window.ChatbotWidget=window.ChatbotWidget||{};(!window.__chatbot.init||window.ChatbotWidget.version!==De)&&(window.__chatbot.init=ft);window.ChatbotWidget.init=window.__chatbot.init;window.ChatbotWidget.version=De;var ie=document.currentScript;if(ie&&ie.dataset.botId){let t=()=>{ie.dataset.cbLoaded||(ie.dataset.cbLoaded="true",window.__chatbot.init({script:ie}))};document.readyState==="loading"?document.addEventListener("DOMContentLoaded",t,{once:!0}):t()}})();
