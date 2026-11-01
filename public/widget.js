var ChatbotWidgetBundle=(()=>{var He=(()=>{try{return document.currentScript||Array.from(document.scripts).reverse().find(t=>{try{return new URL(t.src,document.baseURI).pathname.endsWith("/widget.js")&&t.dataset.botId}catch{return!1}})}catch{return null}})();var st={lightPrimary:"#0f766e",darkPrimary:"#2dd4bf",mintAccent:"#5eead4",lightBackground:"#ffffff",darkBackground:"#18181b"};var $e=Object.freeze({botName:40,launcherLabel:24,greetingMessage:200,inputPlaceholder:60,offlineMessage:200,starterQuestion:60,starterQuestions:4,avatarUrl:2048}),ct=/^#(?:[0-9a-f]{3}|[0-9a-f]{6})$/i;var kt=/^\/api\/v1\/bot-logos\/[a-zA-Z0-9]{40}\.(?:jpg|jpeg|png|webp)$/,At=t=>t==="localhost"||t==="127.0.0.1"||t==="[::1]"||t.endsWith(".test");function Fe(t,r=""){if(typeof t!="string"||!t)return"";try{let e=new URL(t);if(!["http:","https:"].includes(e.protocol)||e.username||e.password)return"";let n=At(e.hostname)&&kt.test(e.pathname)&&!e.search&&!e.hash;if(n&&r){let c=new URL(r);c.protocol==="http:"&&c.host===e.host&&(e.protocol="http:")}return e.protocol==="https:"||e.protocol==="http:"&&n?e.href:""}catch{return""}}var me={theme:{primaryColor:st.lightPrimary,mode:"light",position:"right",borderRadius:16,fontFamily:"system"},texts:{botName:"Assistant",avatarUrl:"",greetingMessage:"Hi! How can I help?",inputPlaceholder:"Type your question...",launcherLabel:"",starterQuestions:[],offlineMessage:""},features:{leadCapture:!0,dentalNotice:!1},branding:{showBadge:!0,badgeText:""},limits:{conversationPrompts:15,messageCharacters:500,testPromptsPerHour:15,conversationInactivityHours:24},contactText:"the office",dir:"",zIndex:2147483647},Pe={system:'Inter, var(--font-inter, system-ui), -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',sans:"Arial, Helvetica, sans-serif",serif:"Georgia, serif",mono:"ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace"},We=(t,r,e)=>typeof t=="string"?t.slice(0,e):r;function ne(t,r){let e={...t};return Object.keys(r||{}).forEach(n=>{e[n]=r[n]&&typeof r[n]=="object"&&!Array.isArray(r[n])?ne(t[n]||{},r[n]):r[n]}),e}function Qe(t,r=!1){let e=ne(me,t||{});e.theme.primaryColor=ct.test(e.theme.primaryColor)?e.theme.primaryColor:me.theme.primaryColor,e.theme.mode=["light","dark","auto"].includes(e.theme.mode)?e.theme.mode:"light",e.theme.position=e.theme.position==="left"?"left":"right",e.theme.borderRadius=Math.max(0,Math.min(28,Number.isFinite(Number(e.theme.borderRadius))?Number(e.theme.borderRadius):me.theme.borderRadius)),e.theme.fontFamily=Pe[e.theme.fontFamily]?Pe[e.theme.fontFamily]:Object.values(Pe).includes(e.theme.fontFamily)?e.theme.fontFamily:Pe.system,Object.keys(me.texts).forEach(c=>{c!=="starterQuestions"&&(e.texts[c]=We(e.texts[c],me.texts[c],$e[c]))});let n=r&&typeof window<"u"&&e.texts.avatarUrl.startsWith(`blob:${window.location.origin}/`);return e.texts.avatarUrl=n?e.texts.avatarUrl:Fe(e.texts.avatarUrl),e.texts.starterQuestions=Array.isArray(e.texts.starterQuestions)?e.texts.starterQuestions.filter(c=>typeof c=="string").slice(0,$e.starterQuestions).map(c=>c.slice(0,$e.starterQuestion)):[],e.features.leadCapture=!!e.features.leadCapture,e.features.dentalNotice=!!e.features.dentalNotice,e.branding.showBadge=!!e.branding.showBadge,e.branding.badgeText=We(e.branding.badgeText,"",80),e.limits.conversationPrompts=Math.max(1,Math.min(100,Number(e.limits.conversationPrompts)||15)),e.limits.messageCharacters=Math.max(1,Math.min(1e4,Number(e.limits.messageCharacters)||500)),e.limits.testPromptsPerHour=Math.max(1,Math.min(1e3,Number(e.limits.testPromptsPerHour)||15)),e.limits.conversationInactivityHours=Math.max(1,Math.min(720,Number(e.limits.conversationInactivityHours)||24)),e.contactText=We(e.contactText,"the office",120),e.dir=e.dir==="rtl"?"rtl":"",e.zIndex=Math.max(1,Math.min(2147483647,Number(e.zIndex)||2147483647)),e}function Ge(t){if(!t)return{};let r={},e={};return t.dataset.primaryColor!==void 0&&(r.primaryColor=t.dataset.primaryColor),t.dataset.position!==void 0&&(r.position=t.dataset.position),t.dataset.greeting!==void 0&&(e.greetingMessage=t.dataset.greeting),t.dataset.botName!==void 0&&(e.botName=t.dataset.botName),{theme:r,texts:e}}async function lt(t,r){let e=u=>({...u,texts:{...u.texts,avatarUrl:Fe(u.texts?.avatarUrl,t)}}),n=`cb-config-${r}`;try{let u=JSON.parse(sessionStorage.getItem(n)||"null");if(u&&u.expires>Date.now())return e(u.config)}catch{}let c=new AbortController,f=setTimeout(()=>c.abort(),5e3),b;try{let u=await fetch(`${t.replace(/\/$/,"")}/api/v1/widget/config/${encodeURIComponent(r)}`,{headers:{Accept:"application/json"},signal:c.signal});if(!u.ok)throw new Error("Configuration unavailable");let D=await u.json();b=D.data||D}finally{clearTimeout(f)}try{sessionStorage.setItem(n,JSON.stringify({config:b,expires:Date.now()+6e4}))}catch{}return e(b)}var ue=new Map,ge=new Set,E={getItem(t){if(ge.has(t))return ue.get(t);try{let r=window.localStorage.getItem(t);return ue.set(t,r),r}catch{return ue.get(t)??null}},setItem(t,r){ue.set(t,String(r)),ge.add(t);try{window.localStorage.setItem(t,String(r)),ge.delete(t)}catch{}},removeItem(t){ue.set(t,null),ge.add(t);try{window.localStorage.removeItem(t),ge.delete(t)}catch{}}};var dt=`
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
`;function Et(t){let r=(t.match(/^event:\s*(.+)$/m)||[])[1]||"message",e=(t.match(/^data:\s*(.+)$/m)||[])[1]||"";try{return{event:r,data:JSON.parse(e)}}catch{return{event:r,data:e}}}async function bt({apiBase:t,botId:r,conversationId:e,message:n,onToken:c,onLeadForm:f,onUsage:b,signal:u,onConversation:D,test:d=!1,history:W=[],authToken:g=null,assistantRules:S,botName:fe}){let q=await fetch(`${t.replace(/\/$/,"")}/api/v1/${d?`bot/${encodeURIComponent(r)}/test-chat`:`chat/${encodeURIComponent(r)}`}`,{method:"POST",signal:u,headers:{"Content-Type":"application/json",Accept:"text/event-stream",...d&&g?{Authorization:`Bearer ${g}`}:{}},...d?{credentials:"include"}:{},body:JSON.stringify(d?{message:n,history:W,assistantRules:S,botName:fe}:{conversationId:e,message:n})});if(!q.ok){let R=(await q.json().catch(()=>null))?.message||(d&&q.status===409?"Test session limit reached. Reset chat to start a new session.":"Chat is temporarily unavailable."),$=new Error(R);throw $.status=q.status,$}if(!q.body)throw new Error("Chat is temporarily unavailable.");let v=q.body.getReader(),z=new TextDecoder,T="",A=null,O=null,Y=!1;for(;;){let{done:J,value:R}=await v.read();if(u?.throwIfAborted(),J)break;T+=z.decode(R,{stream:!0});let $=T.split(/\n\n/);T=$.pop(),$.forEach(xe=>{let I=Et(xe);if(I.event==="token"&&c(I.data.token||""),I.event==="lead_form"&&(O=I.data),I.event==="usage"&&b?.(I.data),I.event==="conversation"&&(A=I.data.conversationId),I.event==="done"&&(Y=!0,!d&&A&&D?.(A),!d&&O&&f(O)),I.event==="error")throw new Error(I.data.message||"Chat is temporarily unavailable.")})}if(!Y)throw new Error("Chat connection ended before the reply was saved.")}function It(t){let r=t.length===4?`#${t[1]}${t[1]}${t[2]}${t[2]}${t[3]}${t[3]}`:t,e=[1,3,5].map(n=>parseInt(r.slice(n,n+2),16)/255).map(n=>n<=.03928?n/12.92:((n+.055)/1.055)**2.4);return e[0]*.2126+e[1]*.7152+e[2]*.0722>.179?"#18181b":"#ffffff"}function Te(t,r){let e=r.theme.mode==="dark"||r.theme.mode==="auto"&&window.matchMedia?.("(prefers-color-scheme: dark)").matches;t.style.setProperty("--cb-primary",r.theme.primaryColor),t.style.setProperty("--cb-on-primary",It(r.theme.primaryColor)),t.style.setProperty("--cb-bg",e?"#202023":"#ffffff"),t.style.setProperty("--cb-surface",e?"#18181b":"#fafafa"),t.style.setProperty("--cb-text",e?"#f4f4f5":"#18181b"),t.style.setProperty("--cb-muted",e?"#a1a1aa":"#71717a"),t.style.setProperty("--cb-success",e?"#6ee7b7":"#047857"),t.style.setProperty("--cb-danger",e?"#fca5a5":"#dc2626"),t.style.setProperty("--cb-radius",`${r.theme.borderRadius}px`),t.style.setProperty("--cb-font",r.theme.fontFamily),t.style.setProperty("--cb-z",String(r.zIndex||2147483647))}var pt={name:"Tellvira",tagline:"AI assistant for websites that answers questions and captures leads.",domain:"tellvira.com",iconPath:"/brand/tellvira-icon.svg",wordmarkPath:"/brand/tellvira-logo-transparent.png",widgetBadgeIconPath:"/brand/tellvira-widget-15.png",supportEmail:"support@tellvira.com",description:"Add an AI assistant to your website to answer visitor questions, capture leads, and book appointments without code."};var o=(t,r,e)=>{let n=document.createElement(t);return r&&(n.className=r),e!==void 0&&(n.textContent=e),n},he=(t,r="")=>{let e=document.createElementNS("http://www.w3.org/2000/svg","svg");return e.setAttribute("viewBox","0 0 24 24"),e.setAttribute("aria-hidden","true"),r&&e.setAttribute("class",r),t.forEach(n=>{let c=document.createElementNS("http://www.w3.org/2000/svg",n.tag||"path");Object.keys(n).forEach(f=>{f!=="tag"&&c.setAttribute(f,n[f])}),e.append(c)}),e},Lt=()=>he([{d:"M20 11.5a7.5 7.5 0 0 1-7.8 7.49 8.7 8.7 0 0 1-3.12-.58L4 20l1.5-4.2A7.25 7.25 0 0 1 4 11.5 7.5 7.5 0 0 1 11.75 4 7.5 7.5 0 0 1 20 11.5Z"},{d:"M8.5 11.5h.01M12 11.5h.01M15.5 11.5h.01"}],"cb-icon cb-icon-chat"),Mt=()=>he([{tag:"rect",x:3,y:7,width:18,height:14,rx:4},{d:"M12 7V4M10 3h4"},{d:"M8 13h.01M16 13h.01M9 17h6"}],"cb-bot-icon"),mt=(t="cb-icon cb-icon-close")=>he([{d:"m7 7 10 10M17 7 7 17"}],t),$t=()=>he([{d:"M12 19V5M6.5 10.5 12 5l5.5 5.5"}]),Pt=()=>he([{d:"M3 12a9 9 0 1 0 2.6-6.4L3 8"},{d:"M3 3v5h5"}]),ut=()=>new Intl.DateTimeFormat(void 0,{hour:"numeric",minute:"2-digit"}).format(new Date);function Ye(t,r){t.replaceChildren();let e=(c,f)=>f.split(/(\*\*[^*]+\*\*|\*[^*]+\*|https?:\/\/[^\s]+)/g).forEach(b=>{if(b)if(/^\*\*[^*]+\*\*$/.test(b))c.append(o("strong","",b.slice(2,-2)));else if(/^\*[^*]+\*$/.test(b))c.append(o("em","",b.slice(1,-1)));else if(/^https?:\/\//.test(b)){let u=o("a","",b);u.href=b,u.target="_blank",u.rel="noopener noreferrer",c.append(u)}else c.append(document.createTextNode(b))}),n;String(r||"").split(`
`).forEach(c=>{let f=/^\s*[-*]\s+(.+)$/.exec(c);if(f){n||(n=o("ul"),t.append(n));let b=o("li");e(b,f[1]),n.append(b)}else{n=null;let b=o("p");e(b,c),t.append(b)}})}function gt({container:t,botId:r,apiBase:e,brandBadgeIconUrl:n,getAuthToken:c=()=>null,config:f,failed:b,defaultOpen:u,onOpenChange:D,preview:d=!1,previewMessages:W=[]}){let g=f,S=o("div","cb-host");t&&S.classList.add("cb-embedded-host");let fe=S.attachShadow({mode:"open"}),q=o("style"),v=!1;q.textContent=dt,fe.append(q),Te(S,g);let z=o("div",`cb-root ${t?"cb-embedded":"cb-fixed"}${d?" cb-preview":""} cb-${g.theme.position}`),T=o("div","cb-launch-area"),A=o("button","cb-launcher");A.type="button",A.setAttribute("aria-label",`Open ${g.texts.botName} chat`),A.setAttribute("aria-expanded","false"),A.append(Lt(),mt()),g.texts.launcherLabel&&T.append(o("span","cb-launch-label",g.texts.launcherLabel)),T.append(A);let O=o("div","cb-teaser",g.texts.greetingMessage.slice(0,140)),Y=o("button","cb-teaser-close","\xD7");Y.type="button",Y.setAttribute("aria-label","Dismiss greeting"),O.append(Y),T.append(O),z.append(T),fe.append(z);let J=t||document.body;if(!J)throw new Error("Widget mount target is unavailable.");J!==document.body&&J.replaceChildren(),J.append(S);let R=!1,$=null,xe=`cb-teaser-${r}`,I=null,Xe=()=>($||($=ft(g)),$),Z=X=>{if(!v)try{X&&Xe(),$?.setOpen(X)}catch{}};return E.getItem(xe)||(I=setTimeout(()=>{!v&&!R&&O.classList.add("cb-visible")},3e3)),Y.addEventListener("click",()=>{O.classList.remove("cb-visible"),E.setItem(xe,"seen")}),A.addEventListener("click",()=>Z(!R)),u&&Z(!0),{open:()=>Z(!0),close:()=>Z(!1),resetChat(){v||Xe().resetChat()},update(X){v||(g=X,$?$.update(X):(Te(S,g),z.classList.toggle("cb-left",g.theme.position==="left"),z.classList.toggle("cb-right",g.theme.position==="right"),A.setAttribute("aria-label",`Open ${g.texts.botName} chat`),T.querySelector(".cb-launch-label")?.remove(),g.texts.launcherLabel&&T.prepend(o("span","cb-launch-label",g.texts.launcherLabel)),O.firstChild.textContent=g.texts.greetingMessage.slice(0,140)))},destroy(){v||(v=!0,clearTimeout(I),$?.destroy(),S.remove())}};function ft(X){let i=X,_=o("section","cb-window");_.setAttribute("role","dialog"),_.setAttribute("aria-label",`${i.texts.botName} chat`),_.setAttribute("aria-modal","true");let Ve=o("header","cb-header"),ve=(a,s="cb-avatar",m="header")=>{if(!a){let w=o("span",`${s} cb-default-avatar`);return w.append(Mt()),w}let l=o("img",s);return l.src=a,l.alt="",l.width=m==="header"?36:28,l.height=l.width,l},Ne=ve(i.texts.avatarUrl),Se=o("div","cb-head-copy"),Ke=o("div","cb-title",i.texts.botName);Se.append(Ke);let Ze=o("div","cb-presence");Ze.append(o("span","cb-online"),document.createTextNode("Online")),Se.append(Ze);let ie=o("button","cb-close");ie.type="button",ie.setAttribute("aria-label","Close chat"),ie.append(mt("cb-icon cb-close-icon")),Ve.append(Ne,Se,ie);let C=o("div","cb-messages");C.setAttribute("aria-live","polite");let ee=o("button","cb-scroll-bottom","\u2193");ee.type="button",ee.hidden=!0,ee.setAttribute("aria-label","Scroll to latest message");let V=o("div","cb-chips");V.setAttribute("role","group"),V.setAttribute("aria-label","Suggested questions");let Q=o("div","cb-typing-row");Q.hidden=!0;let et=o("div","cb-typing-bubble");et.append(o("span","cb-dot"),o("span","cb-dot"),o("span","cb-dot"));let tt=o("div","cb-message-avatar");tt.append(ve(i.texts.avatarUrl,"","reply")),Q.append(tt,et);let se=o("span","cb-counter");se.hidden=!0;let ye=o("div","cb-usage");ye.hidden=d;let we=o("form","cb-compose"),p=o("textarea","cb-input");p.rows=1,p.maxLength=i.limits.messageCharacters,p.placeholder=i.texts.inputPlaceholder,p.setAttribute("aria-label",i.texts.inputPlaceholder);let H=o("button","cb-send");H.type="submit",H.disabled=!0,H.setAttribute("aria-label","Send message"),H.append($t()),we.append(p,se,H),_.append(Ve,C,Q,V,ye,we);let Ce=o("footer","cb-footer"),ce=o("img","cb-brand-icon");ce.src=n,ce.alt="",ce.width=15,ce.height=15,Ce.append(ce,document.createTextNode(`Powered by ${pt.name}`)),Ce.hidden=!i.branding.showBadge,_.append(Ce),z.append(_);let U=0,te=null,ke=Date.now(),Oe=0,le=!1,re="",ze="",Re="",ae=!1,j=0,B=i.limits.conversationPrompts,L=!1,Ae=`cb-state-${r}`,Ue=()=>{if(!d)try{E.setItem(Ae,JSON.stringify({updatedAt:ke,conversationId:E.getItem(`cb-conversation-${r}`),messages:Ee,usage:{used:j,limit:B,reached:L}}))}catch{}},Ee=[],Ie=[],xt=`cb-teaser-${r}`,de=null,G=()=>{de===null&&(de=requestAnimationFrame(()=>{de=null,v||(C.scrollTop=C.scrollHeight)}))},rt=()=>C.scrollHeight-C.scrollTop-C.clientHeight<80,at=()=>{let a=o("div","cb-message-avatar");return a.append(ve(i.texts.avatarUrl,"","reply")),a},oe=(a,s,m=!0)=>{Oe+=1;let l=ut(),x=o("div",`cb-message-row cb-${a}-row${a===ze&&l===Re?" cb-grouped":""}`),K=o("div","cb-message-wrap"),h=o("div",`cb-message cb-${a}`);return a==="bot"?(h.classList.add("cb-markdown"),Ye(h,s),x.append(at())):h.textContent=s,K.append(h,o("time","cb-timestamp",l)),x.append(K),C.append(x),s&&!d&&(Ee.push({kind:a,content:s,stamp:l}),m&&Ue()),ze=a,Re=l,G(),{row:x,bubble:h,stamp:l}},je=(a,s)=>{let m=o("div","cb-error-notice");if(m.setAttribute("role","alert"),m.append(o("span","cb-error-symbol","!"),o("span","cb-error-text",a)),s){let l=o("button","cb-retry");l.type="button",l.setAttribute("aria-label","Retry message"),l.title="Retry message",l.append(Pt()),l.addEventListener("click",()=>{m.remove(),qe(s)}),m.append(l)}C.append(m),G()},be=()=>{ye.textContent=L?`${j} / ${B} questions \xB7 Limit reached`:`${j} / ${B} questions`,ye.classList.toggle("cb-usage-limit",L)},Be=()=>{if(C.querySelector(".cb-limit-notice"))return;let a=o("div","cb-limit-notice");a.setAttribute("role","status");let s=o("span","","This conversation has reached its limit. Start a new chat to continue."),m=o("button","cb-limit-action","New chat");m.type="button",m.addEventListener("click",()=>nt()),a.append(s,m),C.append(a),G()},vt=a=>{v||R===a||(R=a,_.classList.toggle("cb-open",a),A.classList.toggle("cb-active",a),A.setAttribute("aria-expanded",String(a)),a?(O.classList.remove("cb-visible"),E.setItem(xt,"seen"),d||setTimeout(()=>{!v&&R&&p.focus()},210)):A.focus(),D?.(a))},De=()=>{V.replaceChildren(),i.texts.starterQuestions.forEach(a=>{let s=o("button","cb-chip",a);s.type="button",s.addEventListener("click",()=>qe(a)),V.append(s)}),V.hidden=ae||!i.texts.starterQuestions.length},yt=()=>{ae||(ae=!0,V.hidden=!0)},Le=()=>{p.style.height="auto",p.style.height=`${Math.min(p.scrollHeight,96)}px`;let a=p.value.length;se.hidden=a<Math.floor(i.limits.messageCharacters*.9),se.textContent=`${a}/${i.limits.messageCharacters}`,se.classList.toggle("cb-counter-limit",a>=i.limits.messageCharacters)},wt=a=>{let s=o("form","cb-form");s.noValidate=!0,s.append(o("p","cb-form-title","Request an appointment"));let m=o("p","cb-form-error");m.hidden=!0;let l=new Map;(a.fields||[]).forEach(h=>{let y=h.name||h.id;if(!y)return;let N=o("label"),k=o("span","cb-form-label",h.label||y);h.required!==!1&&k.append(o("span","cb-required"," *"));let M=o("input");M.name=y,M.required=h.required!==!1,M.type=["email","date","tel"].includes(h.type)?h.type:"text",M.autocomplete=y==="phone"?"tel":y==="email"?"email":"name",M.maxLength=y==="phone"?40:255;let P=o("span","cb-field-error");P.hidden=!0,M.setAttribute("aria-describedby",`cb-${y}-error`),P.id=`cb-${y}-error`,M.addEventListener("input",()=>{M.removeAttribute("aria-invalid"),P.hidden=!0,m.hidden=!0}),N.append(k,M,P),s.append(N),l.set(y,{control:M,error:P,label:h.label||y})});let w=(h,y)=>{let N=l.get(h);return N?(N.control.setAttribute("aria-invalid","true"),N.error.textContent=y,N.error.hidden=!1,!0):!1},x=()=>{let h=!0;l.forEach(({control:k,error:M,label:P})=>{k.removeAttribute("aria-invalid"),M.hidden=!0;let Me=k.value.trim();k.required&&!Me?(w(k.name,`${P} is required.`),h=!1):Me&&!k.validity.valid&&(w(k.name,k.validity.typeMismatch?`Enter a valid ${k.name==="email"?"email address":P.toLowerCase()}.`:`${P} is invalid.`),h=!1)});let y=l.get("email")?.control.value.trim(),N=l.get("phone")?.control.value.trim();return l.has("email")&&l.has("phone")&&!y&&!N&&(w("email","Enter an email address or phone number."),h=!1),h},K=o("button","","Send request");K.type="submit",s.append(m,K),s.addEventListener("submit",async h=>{if(h.preventDefault(),m.hidden=!0,!!x()){K.disabled=!0;try{let y=Object.fromEntries(new FormData(s)),N=await fetch(`${e.replace(/\/$/,"")}/api/v1/leads/${encodeURIComponent(r)}`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({conversationId:E.getItem(`cb-conversation-${r}`),fields:y})});if(!N.ok){let k=await N.json().catch(()=>null),M=k?.errors&&typeof k.errors=="object"?Object.entries(k.errors):[],P=!1;if(M.forEach(([Me,_e])=>{let Ct=Me.replace(/^fields\./,""),it=Array.isArray(_e)?_e[0]:_e;typeof it=="string"&&(P=w(Ct,it)||P)}),P)return;throw new Error(k?.message||"We could not send your request. Please try again.")}s.replaceWith(o("p","cb-form-success","Thanks! We'll contact you soon.")),G()}catch(y){m.textContent=y.message||"We could not send your request. Please try again.",m.hidden=!1}finally{K.disabled=!1}}}),C.append(s),G()},qe=async a=>{if(!a.trim()||le||L)return;if(a.length>i.limits.messageCharacters){je(`Please keep your message within ${i.limits.messageCharacters} characters.`);return}if(d&&Ie.length+2>B*2){je("Test session limit reached. Reset chat to start a new session.");return}let s=U,m=new AbortController;te=m,re=a.trim(),yt(),oe("user",re),p.value="",Le(),le=!0,p.disabled=!0,H.disabled=!0,Q.hidden=!1,G();let l=null,w="";try{if(await bt({apiBase:e,botId:r,signal:m.signal,onConversation:x=>{!d&&!v&&s===U&&E.setItem(`cb-conversation-${r}`,x)},conversationId:d?null:E.getItem(`cb-conversation-${r}`),message:re,test:d,history:d?Ie:void 0,authToken:d?c():null,assistantRules:d?i.settings?.assistantRules:void 0,botName:d?i.texts.botName:void 0,onToken:x=>{v||s!==U||x&&(w+=x,w.trim()&&(Q.hidden=!0,l??=oe("bot",""),Ye(l.bubble,w),rt()&&G()))},onLeadForm:x=>{!v&&s===U&&wt(x)},onUsage:x=>{d||v||s!==U||(j=Number(x.used)||j,B=Number(x.limit)||B,L=!!x.reached,be())}}),v||s!==U)return;w?d?Ie.push({role:"user",text:re},{role:"assistant",text:w.slice(0,1e5)}):(ke=Date.now(),Ee.push({kind:"bot",content:w,stamp:l?.stamp||ut()}),Ue()):l?.row.remove(),!d&&L&&Be()}catch(x){if(v||s!==U)return;Q.hidden=!0,l?.row.remove(),!d&&x.status===409&&/message limit/i.test(x.message||"")?(j=B,L=!0,be(),Ue(),Be()):je(x.message||"Unable to send message.",re)}finally{if(v||s!==U)return;te=null,le=!1,p.disabled=L,L||p.focus(),H.disabled=L||!p.value.trim()||p.value.length>i.limits.messageCharacters,Q.hidden=!0}},pe,F=null;if(!d)try{let a=JSON.parse(E.getItem(Ae)||"null");a&&Date.now()-a.updatedAt<i.limits.conversationInactivityHours*36e5&&Array.isArray(a.messages)&&(F=a)}catch{}F?(F.conversationId&&E.setItem(`cb-conversation-${r}`,F.conversationId),ke=F.updatedAt,F.messages.forEach(a=>{let s=oe(a.kind,a.content,!1);!pe&&a.kind==="bot"&&(pe=s)}),ae=F.messages.some(a=>a.kind==="user"),j=Number(F.usage?.used)||F.messages.filter(a=>a.kind==="user").length,L=j>=B):(d||(E.removeItem(`cb-conversation-${r}`),E.removeItem(Ae)),pe=oe("bot",b&&i.texts.offlineMessage?i.texts.offlineMessage:i.texts.greetingMessage)),W.forEach(({role:a,text:s})=>{typeof s=="string"&&s.trim()&&oe(a==="user"?"user":"bot",s)}),be(),!d&&L&&Be(),De(),ie.addEventListener("click",()=>Z(!1)),we.addEventListener("submit",a=>{a.preventDefault(),qe(p.value)}),p.addEventListener("input",()=>{Le(),H.disabled=le||!p.value.trim()}),p.addEventListener("keydown",a=>{a.key==="Enter"&&!a.shiftKey&&(a.preventDefault(),we.requestSubmit())}),C.addEventListener("scroll",()=>{ee.hidden=rt()}),ee.addEventListener("click",G),_.append(ee);let ot=a=>{a.key==="Escape"&&R&&Z(!1)};document.addEventListener("keydown",ot);function nt(){U+=1,te?.abort(),te=null,ke=Date.now(),le=!1,ae=!1,ze="",Re="",re="",Oe=0,j=0,L=!1,d||(E.removeItem(`cb-conversation-${r}`),E.removeItem(Ae)),Ee.length=0,Ie.length=0,C.replaceChildren(),pe=oe("bot",b&&i.texts.offlineMessage?i.texts.offlineMessage:i.texts.greetingMessage),De(),be(),p.disabled=!1,p.value="",H.disabled=!0,Q.hidden=!0,Le(),p.focus()}return{destroy(){U+=1,de!==null&&cancelAnimationFrame(de),te?.abort(),te=null,document.removeEventListener("keydown",ot)},setOpen:vt,resetChat(){nt()},update(a){if(v)return;let s=i.texts.greetingMessage,m=C.scrollTop;i=a,p.maxLength=i.limits.messageCharacters,B=i.limits.conversationPrompts,L=j>=B,be(),Te(S,i),z.classList.toggle("cb-left",i.theme.position==="left"),z.classList.toggle("cb-right",i.theme.position==="right"),A.setAttribute("aria-label",`Open ${i.texts.botName} chat`),_.setAttribute("aria-label",`${i.texts.botName} chat`),Ke.textContent=i.texts.botName;let l=ve(i.texts.avatarUrl);Ne.replaceWith(l),Ne=l,z.querySelectorAll(".cb-message-avatar").forEach(w=>{w.replaceWith(at())}),T.querySelector(".cb-launch-label")?.remove(),i.texts.launcherLabel&&T.prepend(o("span","cb-launch-label",i.texts.launcherLabel)),O.firstChild.textContent=i.texts.greetingMessage.slice(0,140),p.placeholder=i.texts.inputPlaceholder,Le(),p.setAttribute("aria-label",i.texts.inputPlaceholder),Ce.hidden=!i.branding.showBadge,Oe===1&&s!==i.texts.greetingMessage&&Ye(pe.bubble,b&&i.texts.offlineMessage?i.texts.offlineMessage:i.texts.greetingMessage),ae||De(),C.scrollTop=m}}}}var Je="2026-11-01-widget-badge-inline-1";var ht="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAACXBIWXMAAAsSAAALEgHS3X78AAACjklEQVQoz21TW0iTYRj+lkhaOcRQqKgughI1oTK66KKoiyCCbqIiI0INt6kT3FEndsC2xAlJkotM18FOGER2mAe68EolmNtyJWZrmrpwOSpo7fj0fp9bGfTCw/v///c87/H7WTweRyQaxe2RYRxou4bcy43/YBv3xiW/n86txON8rmO/ImEct3aBycohkSvAKiuWoTKBKuElCjnx5DjW1YlgOAxm6usDKy1BVq0eRWYzdjRzNGMnYRe9L8ducwuy9LVgZWVotNnA8qgcVq1Er8sJqgU/QyGEwhFEqTSOSCSCEIFn4tbrcoEpq7HdaALL1OuQodPC4/eLwxgF+J8lv3PeauJnEli2wUCRqnCQhtE2NISmwUHY3G5B5EOJxmLosdthfGVDS/8A9lL5TCZDNrXJcgz1SKlRQaJUQsKHREORqlXwLn4VAYY/eQQ5w3gJWx7cQn7PHeQ/smL9xfNga+vqkKJSIU2rxSqthrwG6SR+Nz8vxC+dLuSYTSj1T6D8+0fIfnhw8rMDm68YwTY2NFDmGqRp1FhJSKVA6RoV3vt8S+IxBwoeW3Hu2xSKZ5w4+8WNo5MjyG2igZ3iO1YosEavFwFS1RSIMk8kxC/sDuQ97ERZYBLFs05UBL0oeHYfJzpugvEMG+oNoldegWiBxO65OSF+bh9DIfUpD07jtG8cRa+fYh31Oz47B8YJb4l4+IYFvH+pTkc9qzGe6PmM1YoVdVoU3u3A1uutONTeDsf0jDhjfH/xxFpmAouYWljAHlrHG68XJd3dkNIA742OwuHx4sO8j/YdE3yuE5n5LjmSF2Ff61VsutCAIxYLZgOBPztPXpZo4pklb5D4uygAt+onPTAN9P8lJwInq0zab/p/kfcEGEnpAAAAAElFTkSuQmCC";async function Nt(){if(!document.body&&(document.readyState==="loading"&&await new Promise(t=>document.addEventListener("DOMContentLoaded",t,{once:!0})),!document.body))throw new Error("Widget mount target is unavailable.")}function St(){let t=Symbol.for("tellvira.widget.instances"),r=window[t]||=new Map;async function e(n={}){let c,f;try{let b=n.script,u=n.botId||b?.dataset.botId;return u?(c=n.container||"embed",r.has(c)?await r.get(c):(f=Promise.resolve().then(async()=>{let D=n.apiBase||b?.dataset.apiBase||"http://localhost:8000",d=n.config||await lt(D,u),W=Qe(ne(d,Ge(b)),!!n.preview);await Nt();let g=gt({container:n.container,botId:u,apiBase:D,brandBadgeIconUrl:ht,getAuthToken:n.getAuthToken,config:W,defaultOpen:n.open??n.defaultOpen??!1,onOpenChange:n.onOpenChange,preview:n.preview,previewMessages:n.previewMessages});return{update(S){W=Qe(ne(ne(W,S),Ge(b)),!!n.preview),g.update(W)},open:()=>g.open(),close:()=>g.close(),resetChat:()=>g.resetChat(),destroy(){g.destroy(),r.get(c)===f&&r.delete(c)}}}),r.set(c,f),await f)):null}catch{return f&&r.get(c)===f&&r.delete(c),null}}if(window.__chatbot||={},window.ChatbotWidget||={},(!window.__chatbot.init||window.ChatbotWidget.version!==Je)&&(window.__chatbot.init=e),window.ChatbotWidget.init=window.__chatbot.init,window.ChatbotWidget.version=Je,He?.dataset.botId){let n=()=>{try{Promise.resolve(window.ChatbotWidget.init({script:He})).catch(()=>{})}catch{}};document.readyState==="loading"?document.addEventListener("DOMContentLoaded",n,{once:!0}):n()}}try{St()}catch{}})();
