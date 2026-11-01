var ChatbotWidgetBundle=(()=>{var We=(()=>{try{return document.currentScript||Array.from(document.scripts).reverse().find(t=>{try{return new URL(t.src,document.baseURI).pathname.endsWith("/widget.js")&&t.dataset.botId}catch{return!1}})}catch{return null}})();var ct={lightPrimary:"#0f766e",darkPrimary:"#2dd4bf",mintAccent:"#5eead4",lightBackground:"#ffffff",darkBackground:"#18181b"};var $e=Object.freeze({botName:40,launcherLabel:24,greetingMessage:200,inputPlaceholder:60,offlineMessage:200,starterQuestion:60,starterQuestions:4,avatarUrl:2048}),lt=/^#(?:[0-9a-f]{3}|[0-9a-f]{6})$/i;var kt=/^\/api\/v1\/bot-logos\/[a-zA-Z0-9]{40}\.(?:jpg|jpeg|png|webp)$/,Ct=t=>t==="localhost"||t==="127.0.0.1"||t==="[::1]"||t.endsWith(".test");function He(t,r=""){if(typeof t!="string"||!t)return"";try{let e=new URL(t);if(!["http:","https:"].includes(e.protocol)||e.username||e.password)return"";let n=Ct(e.hostname)&&kt.test(e.pathname)&&!e.search&&!e.hash;if(n&&r){let c=new URL(r);c.protocol==="http:"&&c.host===e.host&&(e.protocol="http:")}return e.protocol==="https:"||e.protocol==="http:"&&n?e.href:""}catch{return""}}var ue={theme:{primaryColor:ct.lightPrimary,mode:"light",position:"right",borderRadius:16,fontFamily:"system"},texts:{botName:"Assistant",avatarUrl:"",greetingMessage:"Hi! How can I help?",inputPlaceholder:"Type your question...",launcherLabel:"",starterQuestions:[],offlineMessage:""},features:{leadCapture:!0,dentalNotice:!1},branding:{showBadge:!0,badgeText:""},limits:{conversationPrompts:15,messageCharacters:500,testPromptsPerHour:15,conversationInactivityHours:24},contactText:"the office",dir:"",zIndex:2147483647},Pe={system:'Inter, var(--font-inter, system-ui), -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',sans:"Arial, Helvetica, sans-serif",serif:"Georgia, serif",mono:"ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace"},Qe=(t,r,e)=>typeof t=="string"?t.slice(0,e):r;function ne(t,r){let e={...t};return Object.keys(r||{}).forEach(n=>{e[n]=r[n]&&typeof r[n]=="object"&&!Array.isArray(r[n])?ne(t[n]||{},r[n]):r[n]}),e}function Ye(t,r=!1){let e=ne(ue,t||{});e.theme.primaryColor=lt.test(e.theme.primaryColor)?e.theme.primaryColor:ue.theme.primaryColor,e.theme.mode=["light","dark","auto"].includes(e.theme.mode)?e.theme.mode:"light",e.theme.position=e.theme.position==="left"?"left":"right",e.theme.borderRadius=Math.max(0,Math.min(28,Number.isFinite(Number(e.theme.borderRadius))?Number(e.theme.borderRadius):ue.theme.borderRadius)),e.theme.fontFamily=Pe[e.theme.fontFamily]?Pe[e.theme.fontFamily]:Object.values(Pe).includes(e.theme.fontFamily)?e.theme.fontFamily:Pe.system,Object.keys(ue.texts).forEach(c=>{c!=="starterQuestions"&&(e.texts[c]=Qe(e.texts[c],ue.texts[c],$e[c]))});let n=r&&typeof window<"u"&&e.texts.avatarUrl.startsWith(`blob:${window.location.origin}/`);return e.texts.avatarUrl=n?e.texts.avatarUrl:He(e.texts.avatarUrl),e.texts.starterQuestions=Array.isArray(e.texts.starterQuestions)?e.texts.starterQuestions.filter(c=>typeof c=="string").slice(0,$e.starterQuestions).map(c=>c.slice(0,$e.starterQuestion)):[],e.features.leadCapture=!!e.features.leadCapture,e.features.dentalNotice=!!e.features.dentalNotice,e.branding.showBadge=!!e.branding.showBadge,e.branding.badgeText=Qe(e.branding.badgeText,"",80),e.limits.conversationPrompts=Math.max(1,Math.min(100,Number(e.limits.conversationPrompts)||15)),e.limits.messageCharacters=Math.max(1,Math.min(1e4,Number(e.limits.messageCharacters)||500)),e.limits.testPromptsPerHour=Math.max(1,Math.min(1e3,Number(e.limits.testPromptsPerHour)||15)),e.limits.conversationInactivityHours=Math.max(1,Math.min(720,Number(e.limits.conversationInactivityHours)||24)),e.contactText=Qe(e.contactText,"the office",120),e.dir=e.dir==="rtl"?"rtl":"",e.zIndex=Math.max(1,Math.min(2147483647,Number(e.zIndex)||2147483647)),e}function Ge(t){if(!t)return{};let r={},e={};return t.dataset.primaryColor!==void 0&&(r.primaryColor=t.dataset.primaryColor),t.dataset.position!==void 0&&(r.position=t.dataset.position),t.dataset.greeting!==void 0&&(e.greetingMessage=t.dataset.greeting),t.dataset.botName!==void 0&&(e.botName=t.dataset.botName),{theme:r,texts:e}}async function dt(t,r){let e=u=>({...u,texts:{...u.texts,avatarUrl:He(u.texts?.avatarUrl,t)}}),n=`cb-config-${r}`;try{let u=JSON.parse(sessionStorage.getItem(n)||"null");if(u&&u.expires>Date.now())return e(u.config)}catch{}let c=new AbortController,f=setTimeout(()=>c.abort(),5e3),d;try{let u=await fetch(`${t.replace(/\/$/,"")}/api/v1/widget/config/${encodeURIComponent(r)}`,{headers:{Accept:"application/json"},signal:c.signal});if(!u.ok)throw new Error("Configuration unavailable");let B=await u.json();d=B.data||B}finally{clearTimeout(f)}try{sessionStorage.setItem(n,JSON.stringify({config:d,expires:Date.now()+6e4}))}catch{}return e(d)}var ge=new Map,he=new Set,E={getItem(t){if(he.has(t))return ge.get(t);try{let r=window.localStorage.getItem(t);return ge.set(t,r),r}catch{return ge.get(t)??null}},setItem(t,r){ge.set(t,String(r)),he.add(t);try{window.localStorage.setItem(t,String(r)),he.delete(t)}catch{}},removeItem(t){ge.set(t,null),he.add(t);try{window.localStorage.removeItem(t),he.delete(t)}catch{}}};var bt=`
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
`;function At(t){let r=(t.match(/^event:\s*(.+)$/m)||[])[1]||"message",e=(t.match(/^data:\s*(.+)$/m)||[])[1]||"";try{return{event:r,data:JSON.parse(e)}}catch{return{event:r,data:e}}}async function pt({apiBase:t,botId:r,conversationId:e,message:n,onToken:c,onLeadForm:f,onUsage:d,signal:u,onConversation:B,test:b=!1,history:ie=[],authToken:g=null,assistantRules:A,botName:V}){let _=await fetch(`${t.replace(/\/$/,"")}/api/v1/${b?`bot/${encodeURIComponent(r)}/test-chat`:`chat/${encodeURIComponent(r)}`}`,{method:"POST",signal:u,headers:{"Content-Type":"application/json",Accept:"text/event-stream",...b&&g?{Authorization:`Bearer ${g}`}:{}},...b?{credentials:"include"}:{},body:JSON.stringify(b?{message:n,history:ie,assistantRules:A,botName:V}:{conversationId:e,message:n})});if(!_.ok){let U=(await _.json().catch(()=>null))?.message||(b&&_.status===409?"Test session limit reached. Reset chat to start a new session.":"Chat is temporarily unavailable."),P=new Error(U);throw P.status=_.status,P}if(!_.body)throw new Error("Chat is temporarily unavailable.");let v=_.body.getReader(),O=new TextDecoder,S="",L=null,z=null,Y=!1;for(;;){let{done:G,value:U}=await v.read();if(u?.throwIfAborted(),G)break;S+=O.decode(U,{stream:!0});let P=S.split(/\n\n/);S=P.pop(),P.forEach(xe=>{let M=At(xe);if(M.event==="token"&&c(M.data.token||""),M.event==="lead_form"&&(z=M.data),M.event==="usage"&&d?.(M.data),M.event==="conversation"&&(L=M.data.conversationId),M.event==="done"&&(Y=!0,!b&&L&&B?.(L),!b&&z&&f(z)),M.event==="error")throw new Error(M.data.message||"Chat is temporarily unavailable.")})}if(!Y)throw new Error("Chat connection ended before the reply was saved.")}function Lt(t){let r=t.length===4?`#${t[1]}${t[1]}${t[2]}${t[2]}${t[3]}${t[3]}`:t,e=[1,3,5].map(n=>parseInt(r.slice(n,n+2),16)/255).map(n=>n<=.03928?n/12.92:((n+.055)/1.055)**2.4);return e[0]*.2126+e[1]*.7152+e[2]*.0722>.179?"#18181b":"#ffffff"}function Te(t,r){let e=r.theme.mode==="dark"||r.theme.mode==="auto"&&window.matchMedia?.("(prefers-color-scheme: dark)").matches;t.style.setProperty("--cb-primary",r.theme.primaryColor),t.style.setProperty("--cb-on-primary",Lt(r.theme.primaryColor)),t.style.setProperty("--cb-bg",e?"#202023":"#ffffff"),t.style.setProperty("--cb-surface",e?"#18181b":"#fafafa"),t.style.setProperty("--cb-text",e?"#f4f4f5":"#18181b"),t.style.setProperty("--cb-muted",e?"#a1a1aa":"#71717a"),t.style.setProperty("--cb-success",e?"#6ee7b7":"#047857"),t.style.setProperty("--cb-danger",e?"#fca5a5":"#dc2626"),t.style.setProperty("--cb-radius",`${r.theme.borderRadius}px`),t.style.setProperty("--cb-font",r.theme.fontFamily),t.style.setProperty("--cb-z",String(r.zIndex||2147483647))}var Se={name:"Tellvira",tagline:"AI assistant for websites that answers questions and captures leads.",domain:"tellvira.com",iconPath:"/brand/tellvira-icon.svg",wordmarkPath:"/brand/tellvira-logo-transparent.png",widgetBadgeIconPath:"/brand/tellvira-widget-15.png",supportEmail:"support@tellvira.com",description:"Add an AI assistant to your website to answer visitor questions, capture leads, and book appointments without code."};var o=(t,r,e)=>{let n=document.createElement(t);return r&&(n.className=r),e!==void 0&&(n.textContent=e),n},fe=(t,r="")=>{let e=document.createElementNS("http://www.w3.org/2000/svg","svg");return e.setAttribute("viewBox","0 0 24 24"),e.setAttribute("aria-hidden","true"),r&&e.setAttribute("class",r),t.forEach(n=>{let c=document.createElementNS("http://www.w3.org/2000/svg",n.tag||"path");Object.keys(n).forEach(f=>{f!=="tag"&&c.setAttribute(f,n[f])}),e.append(c)}),e},Et=()=>fe([{d:"M20 11.5a7.5 7.5 0 0 1-7.8 7.49 8.7 8.7 0 0 1-3.12-.58L4 20l1.5-4.2A7.25 7.25 0 0 1 4 11.5 7.5 7.5 0 0 1 11.75 4 7.5 7.5 0 0 1 20 11.5Z"},{d:"M8.5 11.5h.01M12 11.5h.01M15.5 11.5h.01"}],"cb-icon cb-icon-chat"),Mt=()=>fe([{tag:"rect",x:3,y:7,width:18,height:14,rx:4},{d:"M12 7V4M10 3h4"},{d:"M8 13h.01M16 13h.01M9 17h6"}],"cb-bot-icon"),mt=(t="cb-icon cb-icon-close")=>fe([{d:"m7 7 10 10M17 7 7 17"}],t),It=()=>fe([{d:"M12 19V5M6.5 10.5 12 5l5.5 5.5"}]),$t=()=>fe([{d:"M3 12a9 9 0 1 0 2.6-6.4L3 8"},{d:"M3 3v5h5"}]),ut=()=>new Intl.DateTimeFormat(void 0,{hour:"numeric",minute:"2-digit"}).format(new Date);function Je(t,r){t.replaceChildren();let e=(c,f)=>f.split(/(\*\*[^*]+\*\*|\*[^*]+\*|https?:\/\/[^\s]+)/g).forEach(d=>{if(d)if(/^\*\*[^*]+\*\*$/.test(d))c.append(o("strong","",d.slice(2,-2)));else if(/^\*[^*]+\*$/.test(d))c.append(o("em","",d.slice(1,-1)));else if(/^https?:\/\//.test(d)){let u=o("a","",d);u.href=d,u.target="_blank",u.rel="noopener noreferrer",c.append(u)}else c.append(document.createTextNode(d))}),n;String(r||"").split(`
`).forEach(c=>{let f=/^\s*[-*]\s+(.+)$/.exec(c);if(f){n||(n=o("ul"),t.append(n));let d=o("li");e(d,f[1]),n.append(d)}else{n=null;let d=o("p");e(d,c),t.append(d)}})}function gt({container:t,botId:r,apiBase:e,brandBadgeIconUrl:n,getAuthToken:c=()=>null,config:f,failed:d,defaultOpen:u,onOpenChange:B,preview:b=!1,previewMessages:ie=[]}){let g=f,A=o("div","cb-host");t&&A.classList.add("cb-embedded-host");let V=A.attachShadow({mode:"open"}),_=o("style"),v=!1;_.textContent=bt,V.append(_),Te(A,g);let O=o("div",`cb-root ${t?"cb-embedded":"cb-fixed"}${b?" cb-preview":""} cb-${g.theme.position}`),S=o("div","cb-launch-area"),L=o("button","cb-launcher");L.type="button",L.setAttribute("aria-label",`Open ${g.texts.botName} chat`),L.setAttribute("aria-expanded","false"),L.append(Et(),mt()),g.texts.launcherLabel&&S.append(o("span","cb-launch-label",g.texts.launcherLabel)),S.append(L);let z=o("div","cb-teaser",g.texts.greetingMessage.slice(0,140)),Y=o("button","cb-teaser-close","\xD7");Y.type="button",Y.setAttribute("aria-label","Dismiss greeting"),z.append(Y),S.append(z),O.append(S),V.append(O);let G=t||document.body;if(!G)throw new Error("Widget mount target is unavailable.");G!==document.body&&G.replaceChildren(),G.append(A);let U=!1,P=null,xe=`cb-teaser-${r}`,M=null,Ke=()=>(P||(P=ht(g)),P),Z=J=>{if(!v)try{J&&Ke(),P?.setOpen(J)}catch{}};return E.getItem(xe)||(M=setTimeout(()=>{!v&&!U&&z.classList.add("cb-visible")},3e3)),Y.addEventListener("click",()=>{z.classList.remove("cb-visible"),E.setItem(xe,"seen")}),L.addEventListener("click",()=>Z(!U)),u&&Z(!0),{open:()=>Z(!0),close:()=>Z(!1),resetChat(){v||Ke().resetChat()},update(J){v||(g=J,P?P.update(J):(Te(A,g),O.classList.toggle("cb-left",g.theme.position==="left"),O.classList.toggle("cb-right",g.theme.position==="right"),L.setAttribute("aria-label",`Open ${g.texts.botName} chat`),S.querySelector(".cb-launch-label")?.remove(),g.texts.launcherLabel&&S.prepend(o("span","cb-launch-label",g.texts.launcherLabel)),z.firstChild.textContent=g.texts.greetingMessage.slice(0,140)))},destroy(){v||(v=!0,clearTimeout(M),P?.destroy(),A.remove())}};function ht(J){let i=J,F=o("section","cb-window");F.setAttribute("role","dialog"),F.setAttribute("aria-label",`${i.texts.botName} chat`),F.setAttribute("aria-modal","true");let Ve=o("header","cb-header"),ve=(a,s="cb-avatar",m="header")=>{if(!a){let w=o("span",`${s} cb-default-avatar`);return w.append(Mt()),w}let l=o("img",s);return l.src=a,l.alt="",l.width=m==="header"?36:28,l.height=l.width,l},Ne=ve(i.texts.avatarUrl),ze=o("div","cb-head-copy"),Ze=o("div","cb-title",i.texts.botName);ze.append(Ze);let et=o("div","cb-presence");et.append(o("span","cb-online"),document.createTextNode("Online")),ze.append(et);let se=o("button","cb-close");se.type="button",se.setAttribute("aria-label","Close chat"),se.append(mt("cb-icon cb-close-icon")),Ve.append(Ne,ze,se);let k=o("div","cb-messages");k.setAttribute("aria-live","polite");let ee=o("button","cb-scroll-bottom","\u2193");ee.type="button",ee.hidden=!0,ee.setAttribute("aria-label","Scroll to latest message");let X=o("div","cb-chips");X.setAttribute("role","group"),X.setAttribute("aria-label","Suggested questions");let H=o("div","cb-typing-row");H.hidden=!0;let tt=o("div","cb-typing-bubble");tt.append(o("span","cb-dot"),o("span","cb-dot"),o("span","cb-dot"));let rt=o("div","cb-message-avatar");rt.append(ve(i.texts.avatarUrl,"","reply")),H.append(rt,tt);let ce=o("span","cb-counter");ce.hidden=!0;let ye=o("div","cb-usage");ye.hidden=b;let we=o("form","cb-compose"),p=o("textarea","cb-input");p.rows=1,p.maxLength=i.limits.messageCharacters,p.placeholder=i.texts.inputPlaceholder,p.setAttribute("aria-label",i.texts.inputPlaceholder);let D=o("button","cb-send");D.type="submit",D.disabled=!0,D.setAttribute("aria-label","Send message"),D.append(It()),we.append(p,ce,D),F.append(Ve,k,H,X,ye,we);let ke=o("footer","cb-footer"),le=o("img","cb-brand-icon");le.src=n,le.alt="",le.width=15,le.height=15,ke.append(le,document.createTextNode(`Powered by ${Se.name}`)),ke.hidden=!i.branding.showBadge,F.append(ke),O.append(F);let R=0,te=null,Ce=Date.now(),Oe=0,de=!1,re="",Ue="",Re="",ae=!1,j=0,q=i.limits.conversationPrompts,I=!1,Ae=`cb-state-${r}`,je=()=>{if(!b)try{E.setItem(Ae,JSON.stringify({updatedAt:Ce,conversationId:E.getItem(`cb-conversation-${r}`),messages:Le,usage:{used:j,limit:q,reached:I}}))}catch{}},Le=[],Ee=[],ft=`cb-teaser-${r}`,be=null,Q=()=>{be===null&&(be=requestAnimationFrame(()=>{be=null,v||(k.scrollTop=k.scrollHeight)}))},at=()=>k.scrollHeight-k.scrollTop-k.clientHeight<80,ot=()=>{let a=o("div","cb-message-avatar");return a.append(ve(i.texts.avatarUrl,"","reply")),a},oe=(a,s,m=!0)=>{Oe+=1;let l=ut(),x=o("div",`cb-message-row cb-${a}-row${a===Ue&&l===Re?" cb-grouped":""}`),K=o("div","cb-message-wrap"),h=o("div",`cb-message cb-${a}`);return a==="bot"?(h.classList.add("cb-markdown"),Je(h,s),x.append(ot())):h.textContent=s,K.append(h,o("time","cb-timestamp",l)),x.append(K),k.append(x),s&&!b&&(Le.push({kind:a,content:s,stamp:l}),m&&je()),Ue=a,Re=l,Q(),{row:x,bubble:h,stamp:l}},qe=(a,s)=>{let m=o("div","cb-error-notice");if(m.setAttribute("role","alert"),m.append(o("span","cb-error-symbol","!"),o("span","cb-error-text",a)),s){let l=o("button","cb-retry");l.type="button",l.setAttribute("aria-label","Retry message"),l.title="Retry message",l.append($t()),l.addEventListener("click",()=>{m.remove(),Fe(s)}),m.append(l)}k.append(m),Q()},pe=()=>{ye.textContent=I?`${j} / ${q} questions \xB7 Limit reached`:`${j} / ${q} questions`,ye.classList.toggle("cb-usage-limit",I)},Be=()=>{if(k.querySelector(".cb-limit-notice"))return;let a=o("div","cb-limit-notice");a.setAttribute("role","status");let s=o("span","","This conversation has reached its limit. Start a new chat to continue."),m=o("button","cb-limit-action","New chat");m.type="button",m.addEventListener("click",()=>it()),a.append(s,m),k.append(a),Q()},xt=a=>{v||U===a||(U=a,F.classList.toggle("cb-open",a),L.classList.toggle("cb-active",a),L.setAttribute("aria-expanded",String(a)),a?(z.classList.remove("cb-visible"),E.setItem(ft,"seen"),b||setTimeout(()=>{!v&&U&&p.focus()},210)):L.focus(),B?.(a))},_e=()=>{X.replaceChildren(),i.texts.starterQuestions.forEach(a=>{let s=o("button","cb-chip",a);s.type="button",s.addEventListener("click",()=>Fe(a)),X.append(s)}),X.hidden=ae||!i.texts.starterQuestions.length},vt=()=>{ae||(ae=!0,X.hidden=!0)},Me=()=>{p.style.height="auto",p.style.height=`${Math.min(p.scrollHeight,96)}px`;let a=p.value.length;ce.hidden=a<Math.floor(i.limits.messageCharacters*.9),ce.textContent=`${a}/${i.limits.messageCharacters}`,ce.classList.toggle("cb-counter-limit",a>=i.limits.messageCharacters)},yt=a=>{let s=o("form","cb-form");s.noValidate=!0,s.append(o("p","cb-form-title","Request an appointment"));let m=o("p","cb-form-error");m.hidden=!0;let l=new Map;(a.fields||[]).forEach(h=>{let y=h.name||h.id;if(!y)return;let N=o("label"),C=o("span","cb-form-label",h.label||y);h.required!==!1&&C.append(o("span","cb-required"," *"));let $=o("input");$.name=y,$.required=h.required!==!1,$.type=["email","date","tel"].includes(h.type)?h.type:"text",$.autocomplete=y==="phone"?"tel":y==="email"?"email":"name",$.maxLength=y==="phone"?40:255;let T=o("span","cb-field-error");T.hidden=!0,$.setAttribute("aria-describedby",`cb-${y}-error`),T.id=`cb-${y}-error`,$.addEventListener("input",()=>{$.removeAttribute("aria-invalid"),T.hidden=!0,m.hidden=!0}),N.append(C,$,T),s.append(N),l.set(y,{control:$,error:T,label:h.label||y})});let w=(h,y)=>{let N=l.get(h);return N?(N.control.setAttribute("aria-invalid","true"),N.error.textContent=y,N.error.hidden=!1,!0):!1},x=()=>{let h=!0;l.forEach(({control:C,error:$,label:T})=>{C.removeAttribute("aria-invalid"),$.hidden=!0;let Ie=C.value.trim();C.required&&!Ie?(w(C.name,`${T} is required.`),h=!1):Ie&&!C.validity.valid&&(w(C.name,C.validity.typeMismatch?`Enter a valid ${C.name==="email"?"email address":T.toLowerCase()}.`:`${T} is invalid.`),h=!1)});let y=l.get("email")?.control.value.trim(),N=l.get("phone")?.control.value.trim();return l.has("email")&&l.has("phone")&&!y&&!N&&(w("email","Enter an email address or phone number."),h=!1),h},K=o("button","","Send request");K.type="submit",s.append(m,K),s.addEventListener("submit",async h=>{if(h.preventDefault(),m.hidden=!0,!!x()){K.disabled=!0;try{let y=Object.fromEntries(new FormData(s)),N=await fetch(`${e.replace(/\/$/,"")}/api/v1/leads/${encodeURIComponent(r)}`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({conversationId:E.getItem(`cb-conversation-${r}`),fields:y})});if(!N.ok){let C=await N.json().catch(()=>null),$=C?.errors&&typeof C.errors=="object"?Object.entries(C.errors):[],T=!1;if($.forEach(([Ie,De])=>{let wt=Ie.replace(/^fields\./,""),st=Array.isArray(De)?De[0]:De;typeof st=="string"&&(T=w(wt,st)||T)}),T)return;throw new Error(C?.message||"We could not send your request. Please try again.")}s.replaceWith(o("p","cb-form-success","Thanks! We'll contact you soon.")),Q()}catch(y){m.textContent=y.message||"We could not send your request. Please try again.",m.hidden=!1}finally{K.disabled=!1}}}),k.append(s),Q()},Fe=async a=>{if(!a.trim()||de||I)return;if(a.length>i.limits.messageCharacters){qe(`Please keep your message within ${i.limits.messageCharacters} characters.`);return}if(b&&Ee.length+2>q*2){qe("Test session limit reached. Reset chat to start a new session.");return}let s=R,m=new AbortController;te=m,re=a.trim(),vt(),oe("user",re),p.value="",Me(),de=!0,p.disabled=!0,D.disabled=!0,H.hidden=!1,Q();let l=null,w="";try{if(await pt({apiBase:e,botId:r,signal:m.signal,onConversation:x=>{!b&&!v&&s===R&&E.setItem(`cb-conversation-${r}`,x)},conversationId:b?null:E.getItem(`cb-conversation-${r}`),message:re,test:b,history:b?Ee:void 0,authToken:b?c():null,assistantRules:b?i.settings?.assistantRules:void 0,botName:b?i.texts.botName:void 0,onToken:x=>{v||s!==R||x&&(w+=x,w.trim()&&(H.hidden=!0,l??=oe("bot",""),Je(l.bubble,w),at()&&Q()))},onLeadForm:x=>{!v&&s===R&&yt(x)},onUsage:x=>{b||v||s!==R||(j=Number(x.used)||j,q=Number(x.limit)||q,I=!!x.reached,pe())}}),v||s!==R)return;w?b?Ee.push({role:"user",text:re},{role:"assistant",text:w.slice(0,1e5)}):(Ce=Date.now(),Le.push({kind:"bot",content:w,stamp:l?.stamp||ut()}),je()):l?.row.remove(),!b&&I&&Be()}catch(x){if(v||s!==R)return;H.hidden=!0,l?.row.remove(),!b&&x.status===409&&/message limit/i.test(x.message||"")?(j=q,I=!0,pe(),je(),Be()):qe(x.message||"Unable to send message.",re)}finally{if(v||s!==R)return;te=null,de=!1,p.disabled=I,I||p.focus(),D.disabled=I||!p.value.trim()||p.value.length>i.limits.messageCharacters,H.hidden=!0}},me,W=null;if(!b)try{let a=JSON.parse(E.getItem(Ae)||"null");a&&Date.now()-a.updatedAt<i.limits.conversationInactivityHours*36e5&&Array.isArray(a.messages)&&(W=a)}catch{}W?(W.conversationId&&E.setItem(`cb-conversation-${r}`,W.conversationId),Ce=W.updatedAt,W.messages.forEach(a=>{let s=oe(a.kind,a.content,!1);!me&&a.kind==="bot"&&(me=s)}),ae=W.messages.some(a=>a.kind==="user"),j=Number(W.usage?.used)||W.messages.filter(a=>a.kind==="user").length,I=j>=q):(b||(E.removeItem(`cb-conversation-${r}`),E.removeItem(Ae)),me=oe("bot",d&&i.texts.offlineMessage?i.texts.offlineMessage:i.texts.greetingMessage)),ie.forEach(({role:a,text:s})=>{typeof s=="string"&&s.trim()&&oe(a==="user"?"user":"bot",s)}),pe(),!b&&I&&Be(),_e(),se.addEventListener("click",()=>Z(!1)),we.addEventListener("submit",a=>{a.preventDefault(),Fe(p.value)}),p.addEventListener("input",()=>{Me(),D.disabled=de||!p.value.trim()}),p.addEventListener("keydown",a=>{a.key==="Enter"&&!a.shiftKey&&(a.preventDefault(),we.requestSubmit())}),k.addEventListener("scroll",()=>{ee.hidden=at()}),ee.addEventListener("click",Q),F.append(ee);let nt=a=>{a.key==="Escape"&&U&&Z(!1)};document.addEventListener("keydown",nt);function it(){R+=1,te?.abort(),te=null,Ce=Date.now(),de=!1,ae=!1,Ue="",Re="",re="",Oe=0,j=0,I=!1,b||(E.removeItem(`cb-conversation-${r}`),E.removeItem(Ae)),Le.length=0,Ee.length=0,k.replaceChildren(),me=oe("bot",d&&i.texts.offlineMessage?i.texts.offlineMessage:i.texts.greetingMessage),_e(),pe(),p.disabled=!1,p.value="",D.disabled=!0,H.hidden=!0,Me(),p.focus()}return{destroy(){R+=1,be!==null&&cancelAnimationFrame(be),te?.abort(),te=null,document.removeEventListener("keydown",nt)},setOpen:xt,resetChat(){it()},update(a){if(v)return;let s=i.texts.greetingMessage,m=k.scrollTop;i=a,p.maxLength=i.limits.messageCharacters,q=i.limits.conversationPrompts,I=j>=q,pe(),Te(A,i),O.classList.toggle("cb-left",i.theme.position==="left"),O.classList.toggle("cb-right",i.theme.position==="right"),L.setAttribute("aria-label",`Open ${i.texts.botName} chat`),F.setAttribute("aria-label",`${i.texts.botName} chat`),Ze.textContent=i.texts.botName;let l=ve(i.texts.avatarUrl);Ne.replaceWith(l),Ne=l,O.querySelectorAll(".cb-message-avatar").forEach(w=>{w.replaceWith(ot())}),S.querySelector(".cb-launch-label")?.remove(),i.texts.launcherLabel&&S.prepend(o("span","cb-launch-label",i.texts.launcherLabel)),z.firstChild.textContent=i.texts.greetingMessage.slice(0,140),p.placeholder=i.texts.inputPlaceholder,Me(),p.setAttribute("aria-label",i.texts.inputPlaceholder),ke.hidden=!i.branding.showBadge,Oe===1&&s!==i.texts.greetingMessage&&Je(me.bubble,d&&i.texts.offlineMessage?i.texts.offlineMessage:i.texts.greetingMessage),ae||_e(),k.scrollTop=m}}}}var Xe="2026-11-01-widget-env-api-1";async function Pt(){if(!document.body&&(document.readyState==="loading"&&await new Promise(t=>document.addEventListener("DOMContentLoaded",t,{once:!0})),!document.body))throw new Error("Widget mount target is unavailable.")}function Tt(){let t=Symbol.for("tellvira.widget.instances"),r=window[t]||=new Map;async function e(n={}){let c,f;try{let d=n.script,u=n.botId||d?.dataset.botId;return u?(c=n.container||"embed",r.has(c)?await r.get(c):(f=Promise.resolve().then(async()=>{let B=n.apiBase||d?.dataset.apiBase||"http://localhost:8000",b=new URL(Se.widgetBadgeIconPath,d?.src||window.location.href).href,ie=n.config||await dt(B,u),g=Ye(ne(ie,Ge(d)),!!n.preview);await Pt();let A=gt({container:n.container,botId:u,apiBase:B,brandBadgeIconUrl:b,getAuthToken:n.getAuthToken,config:g,defaultOpen:n.open??n.defaultOpen??!1,onOpenChange:n.onOpenChange,preview:n.preview,previewMessages:n.previewMessages});return{update(V){g=Ye(ne(ne(g,V),Ge(d)),!!n.preview),A.update(g)},open:()=>A.open(),close:()=>A.close(),resetChat:()=>A.resetChat(),destroy(){A.destroy(),r.get(c)===f&&r.delete(c)}}}),r.set(c,f),await f)):null}catch{return f&&r.get(c)===f&&r.delete(c),null}}if(window.__chatbot||={},window.ChatbotWidget||={},(!window.__chatbot.init||window.ChatbotWidget.version!==Xe)&&(window.__chatbot.init=e),window.ChatbotWidget.init=window.__chatbot.init,window.ChatbotWidget.version=Xe,We?.dataset.botId){let n=()=>{try{Promise.resolve(window.ChatbotWidget.init({script:We})).catch(()=>{})}catch{}};document.readyState==="loading"?document.addEventListener("DOMContentLoaded",n,{once:!0}):n()}}try{Tt()}catch{}})();
