var ChatbotWidgetBundle=(()=>{var Xe=(()=>{try{return document.currentScript||Array.from(document.scripts).reverse().find(t=>{try{return new URL(t.src,document.baseURI).pathname.endsWith("/widget.js")&&t.dataset.botId}catch{return!1}})}catch{return null}})();var mt={lightPrimary:"#0f766e",darkPrimary:"#2dd4bf",mintAccent:"#5eead4",lightBackground:"#ffffff",darkBackground:"#18181b"};var ze=Object.freeze({botName:40,launcherLabel:24,greetingMessage:200,inputPlaceholder:60,offlineMessage:200,starterQuestion:60,starterQuestions:4,avatarUrl:2048}),ut=/^#(?:[0-9a-f]{3}|[0-9a-f]{6})$/i;var St=/^\/api\/v1\/bot-logos\/[a-zA-Z0-9]{40}\.(?:jpg|jpeg|png|webp)$/,Tt=t=>t==="localhost"||t==="127.0.0.1"||t==="[::1]"||t.endsWith(".test");function Ke(t,r=""){if(typeof t!="string"||!t)return"";try{let e=new URL(t);if(!["http:","https:"].includes(e.protocol)||e.username||e.password)return"";let a=Tt(e.hostname)&&St.test(e.pathname)&&!e.search&&!e.hash;if(a&&r){let s=new URL(r);s.protocol==="http:"&&s.host===e.host&&(e.protocol="http:")}return e.protocol==="https:"||e.protocol==="http:"&&a?e.href:""}catch{return""}}var ge={theme:{primaryColor:mt.lightPrimary,mode:"light",position:"right",borderRadius:16,fontFamily:"system"},texts:{botName:"Assistant",avatarUrl:"",greetingMessage:"Hi! How can I help?",inputPlaceholder:"Type your question...",launcherLabel:"",starterQuestions:[],offlineMessage:""},features:{allowRestartAfterLimit:!0,leadCapture:!0,dentalNotice:!1},branding:{showBadge:!0,badgeText:""},limits:{conversationPrompts:15,messageCharacters:500,testPromptsPerHour:15,conversationInactivityHours:24},contactText:"the office",dir:"",zIndex:2147483647},Re={system:'Inter, var(--font-inter, system-ui), -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',sans:"Arial, Helvetica, sans-serif",serif:"Georgia, serif",mono:"ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace"},Ge=(t,r,e)=>typeof t=="string"?t.slice(0,e):r;function se(t,r){let e={...t};return Object.keys(r||{}).forEach(a=>{e[a]=r[a]&&typeof r[a]=="object"&&!Array.isArray(r[a])?se(t[a]||{},r[a]):r[a]}),e}function Ve(t,r=!1){let e=se(ge,t||{});e.theme.primaryColor=ut.test(e.theme.primaryColor)?e.theme.primaryColor:ge.theme.primaryColor,e.theme.mode=["light","dark","auto"].includes(e.theme.mode)?e.theme.mode:"light",e.theme.position=e.theme.position==="left"?"left":"right",e.theme.borderRadius=Math.max(0,Math.min(28,Number.isFinite(Number(e.theme.borderRadius))?Number(e.theme.borderRadius):ge.theme.borderRadius)),e.theme.fontFamily=Re[e.theme.fontFamily]?Re[e.theme.fontFamily]:Object.values(Re).includes(e.theme.fontFamily)?e.theme.fontFamily:Re.system,Object.keys(ge.texts).forEach(s=>{s!=="starterQuestions"&&(e.texts[s]=Ge(e.texts[s],ge.texts[s],ze[s]))});let a=r&&typeof window<"u"&&e.texts.avatarUrl.startsWith(`blob:${window.location.origin}/`);return e.texts.avatarUrl=a?e.texts.avatarUrl:Ke(e.texts.avatarUrl),e.texts.starterQuestions=Array.isArray(e.texts.starterQuestions)?e.texts.starterQuestions.filter(s=>typeof s=="string").slice(0,ze.starterQuestions).map(s=>s.slice(0,ze.starterQuestion)):[],e.features.leadCapture=!!e.features.leadCapture,e.features.dentalNotice=!!e.features.dentalNotice,e.branding.showBadge=!!e.branding.showBadge,e.branding.badgeText=Ge(e.branding.badgeText,"",80),e.limits.conversationPrompts=Math.max(1,Math.min(100,Number(e.limits.conversationPrompts)||15)),e.limits.messageCharacters=Math.max(1,Math.min(1e4,Number(e.limits.messageCharacters)||500)),e.limits.testPromptsPerHour=Math.max(1,Math.min(1e3,Number(e.limits.testPromptsPerHour)||15)),e.limits.conversationInactivityHours=Math.max(1,Math.min(720,Number(e.limits.conversationInactivityHours)||24)),e.contactText=Ge(e.contactText,"the office",120),e.dir=e.dir==="rtl"?"rtl":"",e.zIndex=Math.max(1,Math.min(2147483647,Number(e.zIndex)||2147483647)),e}function Ze(t){if(!t)return{};let r={},e={};return t.dataset.primaryColor!==void 0&&(r.primaryColor=t.dataset.primaryColor),t.dataset.position!==void 0&&(r.position=t.dataset.position),t.dataset.greeting!==void 0&&(e.greetingMessage=t.dataset.greeting),t.dataset.botName!==void 0&&(e.botName=t.dataset.botName),{theme:r,texts:e}}async function ft(t,r){let e=v=>({...v,texts:{...v.texts,avatarUrl:Ke(v.texts?.avatarUrl,t)}}),a=`cb-config-${r}`;try{let v=JSON.parse(sessionStorage.getItem(a)||"null");if(v&&v.expires>Date.now())return e(v.config)}catch{}let s=new AbortController,f=setTimeout(()=>s.abort(),5e3),g;try{let v=await fetch(`${t.replace(/\/$/,"")}/api/v1/widget/config/${encodeURIComponent(r)}`,{headers:{Accept:"application/json"},signal:s.signal});if(!v.ok)throw new Error("Configuration unavailable");let F=await v.json();g=F.data||F}finally{clearTimeout(f)}try{sessionStorage.setItem(a,JSON.stringify({config:g,expires:Date.now()+6e4}))}catch{}return e(g)}var he=new Map,xe=new Set,x={getItem(t){if(xe.has(t))return he.get(t);try{let r=window.localStorage.getItem(t);return he.set(t,r),r}catch{return he.get(t)??null}},setItem(t,r){he.set(t,String(r)),xe.add(t);try{window.localStorage.setItem(t,String(r)),xe.delete(t)}catch{}},removeItem(t){he.set(t,null),xe.add(t);try{window.localStorage.removeItem(t),xe.delete(t)}catch{}}};var gt=`
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
.cb-embedded { position: absolute; bottom: calc(16px + var(--cb-offset-y, 0px)); right: calc(16px + var(--cb-offset-x, 0px)); }
.cb-embedded:not(.cb-preview).cb-left { left: calc(16px + var(--cb-offset-x, 0px)); right: auto; }
.cb-root.cb-preview { position: absolute; inset: 0; }
.cb-preview .cb-launch-area { position: absolute; right: calc(16px + var(--cb-offset-x, 0px)); bottom: calc(16px + var(--cb-offset-y, 0px)); }
.cb-preview.cb-left .cb-launch-area { right: auto; left: calc(16px + var(--cb-offset-x, 0px)); }
.cb-preview .cb-window { top: 0; bottom: auto; width: min(350px, calc(100% - 32px)); height: min(580px, calc(100% - 92px)); min-height: 0; max-width: none; max-height: none; }
.cb-preview.cb-left .cb-window { left: 16px; right: auto; }
.cb-preview.cb-right .cb-window { right: 16px; left: auto; }
.cb-fixed {
  position: fixed;
  bottom: max(calc(24px + var(--cb-offset-y, 0px)), env(safe-area-inset-bottom));
  z-index: var(--cb-z, 2147483647);
}
.cb-fixed.cb-left {
  left: max(calc(24px + var(--cb-offset-x, 0px)), env(safe-area-inset-left));
}
.cb-fixed.cb-right {
  right: max(calc(24px + var(--cb-offset-x, 0px)), env(safe-area-inset-right));
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
.cb-footer a { color: inherit; text-decoration: underline; }
.cb-form button:disabled { cursor: wait; }
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
    right: max(calc(12px + var(--cb-offset-x, 0px)), env(safe-area-inset-right));
    bottom: max(calc(12px + var(--cb-offset-y, 0px)), env(safe-area-inset-bottom));
    left: auto;
  }
  .cb-fixed.cb-left {
    left: max(calc(12px + var(--cb-offset-x, 0px)), env(safe-area-inset-left));
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
  .cb-preview .cb-launch-area { right: calc(12px + var(--cb-offset-x, 0px)); bottom: calc(12px + var(--cb-offset-y, 0px)); }
  .cb-preview.cb-left .cb-launch-area { right: auto; left: calc(12px + var(--cb-offset-x, 0px)); }
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
`;function Nt(t){let r=(t.match(/^event:\s*(.+)$/m)||[])[1]||"message",e=(t.match(/^data:\s*(.+)$/m)||[])[1]||"";try{return{event:r,data:JSON.parse(e)}}catch{return{event:r,data:e}}}async function ht({apiBase:t,botId:r,conversationId:e,message:a,onToken:s,onLeadForm:f,onUsage:g,signal:v,onConversation:F,test:l=!1,history:J=[],authToken:u=null,assistantRules:N,botName:ye}){let W=await fetch(`${t.replace(/\/$/,"")}/api/v1/${l?`bot/${encodeURIComponent(r)}/test-chat`:`chat/${encodeURIComponent(r)}`}`,{method:"POST",signal:v,headers:{"Content-Type":"application/json",Accept:"text/event-stream",...l&&u?{Authorization:`Bearer ${u}`}:{}},...l?{credentials:"include"}:{},body:JSON.stringify(l?{message:a,history:J,assistantRules:N,botName:ye}:{conversationId:e,message:a})});if(!W.ok){let O=(await W.json().catch(()=>null))?.message||(l&&W.status===409?"Test session limit reached. Reset chat to start a new session.":"Chat is temporarily unavailable."),$=new Error(O);throw $.status=W.status,$}if(!W.body)throw new Error("Chat is temporarily unavailable.");let y=W.body.getReader(),R=new TextDecoder,S="",L=null,z=null,K=!1;for(;;){let{done:G,value:O}=await y.read();if(v?.throwIfAborted(),G)break;S+=R.decode(O,{stream:!0});let $=S.split(/\n\n/);S=$.pop(),$.forEach(we=>{let E=Nt(we);if(E.event==="token"&&s(E.data.token||""),E.event==="lead_form"&&(z=E.data),E.event==="usage"&&g?.(E.data),E.event==="conversation"&&(L=E.data.conversationId),E.event==="done"&&(K=!0,!l&&L&&F?.(L),!l&&z&&f(z)),E.event==="error")throw new Error(E.data.message||"Chat is temporarily unavailable.")})}if(!K)throw new Error("Chat connection ended before the reply was saved.")}function zt(t){let r=t.length===4?`#${t[1]}${t[1]}${t[2]}${t[2]}${t[3]}${t[3]}`:t,e=[1,3,5].map(a=>parseInt(r.slice(a,a+2),16)/255).map(a=>a<=.03928?a/12.92:((a+.055)/1.055)**2.4);return e[0]*.2126+e[1]*.7152+e[2]*.0722>.179?"#18181b":"#ffffff"}function Oe(t,r){let e=r.theme.mode==="dark"||r.theme.mode==="auto"&&window.matchMedia?.("(prefers-color-scheme: dark)").matches;for(let[a,s]of[["offsetX","x"],["offsetY","y"]]){let f=Number(r.theme[a]),g=Number.isInteger(f)?Math.min(64,Math.max(0,f)):0;t.style.setProperty(`--cb-offset-${s}`,`${g}px`)}t.style.setProperty("--cb-primary",r.theme.primaryColor),t.style.setProperty("--cb-on-primary",zt(r.theme.primaryColor)),t.style.setProperty("--cb-bg",e?"#202023":"#ffffff"),t.style.setProperty("--cb-surface",e?"#18181b":"#fafafa"),t.style.setProperty("--cb-text",e?"#f4f4f5":"#18181b"),t.style.setProperty("--cb-muted",e?"#a1a1aa":"#71717a"),t.style.setProperty("--cb-success",e?"#6ee7b7":"#047857"),t.style.setProperty("--cb-danger",e?"#fca5a5":"#dc2626"),t.style.setProperty("--cb-radius",`${r.theme.borderRadius}px`),t.style.setProperty("--cb-font",r.theme.fontFamily),t.style.setProperty("--cb-z",String(r.zIndex||2147483647))}var xt={name:"Tellvira",tagline:"AI assistant for websites that answers questions and captures leads.",domain:"tellvira.com",iconPath:"/brand/tellvira-icon.svg",wordmarkPath:"/brand/tellvira-logo-transparent.png",widgetBadgeIconPath:"/brand/tellvira-widget-15.png",supportEmail:"support@tellvira.com",description:"Add an AI assistant to your website to answer visitor questions, capture leads, and book appointments without code."};function vt(t,r){let e=r.split(/(\*\*[^*]+\*\*|\*[^*]+\*|https?:\/\/[^\s]+)/g);for(let a of e){if(!a)continue;let s;if(/^\*\*[^*]+\*\*$/.test(a))s=document.createElement("strong"),s.textContent=a.slice(2,-2);else if(/^\*[^*]+\*$/.test(a))s=document.createElement("em"),s.textContent=a.slice(1,-1);else if(/^https?:\/\//.test(a))s=document.createElement("a"),s.href=a,s.target="_blank",s.rel="noopener noreferrer",s.textContent=a;else{t.append(a);continue}t.append(s)}}function Ue(t,r){let e=document.createDocumentFragment(),a;for(let s of String(r??"").split(/\r?\n/)){let f=/^\s*[-*]\s+(.+)$/.exec(s);if(f){a||(a=document.createElement("ul"),e.append(a));let g=document.createElement("li");vt(g,f[1]),a.append(g)}else{a=null;let g=document.createElement("p");vt(g,s),e.append(g)}}t.replaceChildren(e)}var n=(t,r,e)=>{let a=document.createElement(t);return r&&(a.className=r),e!==void 0&&(a.textContent=e),a},ve=(t,r="")=>{let e=document.createElementNS("http://www.w3.org/2000/svg","svg");return e.setAttribute("viewBox","0 0 24 24"),e.setAttribute("aria-hidden","true"),r&&e.setAttribute("class",r),t.forEach(a=>{let s=document.createElementNS("http://www.w3.org/2000/svg",a.tag||"path");Object.keys(a).forEach(f=>{f!=="tag"&&s.setAttribute(f,a[f])}),e.append(s)}),e},Rt=()=>ve([{d:"M20 11.5a7.5 7.5 0 0 1-7.8 7.49 8.7 8.7 0 0 1-3.12-.58L4 20l1.5-4.2A7.25 7.25 0 0 1 4 11.5 7.5 7.5 0 0 1 11.75 4 7.5 7.5 0 0 1 20 11.5Z"},{d:"M8.5 11.5h.01M12 11.5h.01M15.5 11.5h.01"}],"cb-icon cb-icon-chat"),Ot=()=>ve([{tag:"rect",x:3,y:7,width:18,height:14,rx:4},{d:"M12 7V4M10 3h4"},{d:"M8 13h.01M16 13h.01M9 17h6"}],"cb-bot-icon"),yt=(t="cb-icon cb-icon-close")=>ve([{d:"m7 7 10 10M17 7 7 17"}],t),Ut=()=>ve([{d:"M12 19V5M6.5 10.5 12 5l5.5 5.5"}]),qt=()=>ve([{d:"M3 12a9 9 0 1 0 2.6-6.4L3 8"},{d:"M3 3v5h5"}]),wt=()=>new Intl.DateTimeFormat(void 0,{hour:"numeric",minute:"2-digit"}).format(new Date);function Ct({container:t,botId:r,apiBase:e,brandBadgeIconUrl:a,getAuthToken:s=()=>null,config:f,failed:g,defaultOpen:v,onOpenChange:F,preview:l=!1,previewMessages:J=[]}){let u=f,N=n("div","cb-host");t&&N.classList.add("cb-embedded-host");let ye=N.attachShadow({mode:"open"}),W=n("style"),y=!1;W.textContent=gt,ye.append(W),Oe(N,u);let R=n("div",`cb-root ${t?"cb-embedded":"cb-fixed"}${l?" cb-preview":""} cb-${u.theme.position}`),S=n("div","cb-launch-area"),L=n("button","cb-launcher");L.type="button",L.setAttribute("aria-label",`Open ${u.texts.botName} chat`),L.setAttribute("aria-expanded","false"),L.append(Rt(),yt()),u.texts.launcherLabel&&S.append(n("span","cb-launch-label",u.texts.launcherLabel)),S.append(L);let z=n("div","cb-teaser",u.texts.greetingMessage.slice(0,140)),K=n("button","cb-teaser-close","\xD7");K.type="button",K.setAttribute("aria-label","Dismiss greeting"),z.append(K),S.append(z),R.append(S),ye.append(R);let G=t||document.body;if(!G)throw new Error("Widget mount target is unavailable.");G!==document.body&&G.replaceChildren(),G.append(N);let O=!1,$=null,we=`cb-teaser-${r}`,E=null,tt=()=>($||($=At(u)),$),te=V=>{if(!y)try{V&&tt(),$?.setOpen(V)}catch{}};return x.getItem(we)||(E=setTimeout(()=>{!y&&!O&&z.classList.add("cb-visible")},3e3)),K.addEventListener("click",()=>{z.classList.remove("cb-visible"),x.setItem(we,"seen")}),L.addEventListener("click",()=>te(!O)),v&&te(!0),{open:()=>te(!0),close:()=>te(!1),resetChat(){y||tt().resetChat()},update(V){y||(u=V,$?$.update(V):(Oe(N,u),R.classList.toggle("cb-left",u.theme.position==="left"),R.classList.toggle("cb-right",u.theme.position==="right"),L.setAttribute("aria-label",`Open ${u.texts.botName} chat`),S.querySelector(".cb-launch-label")?.remove(),u.texts.launcherLabel&&S.prepend(n("span","cb-launch-label",u.texts.launcherLabel)),z.firstChild.textContent=u.texts.greetingMessage.slice(0,140)))},destroy(){y||(y=!0,clearTimeout(E),$?.destroy(),N.remove())}};function At(V){let i=V,H=n("section","cb-window");H.setAttribute("role","dialog"),H.setAttribute("aria-label",`${i.texts.botName} chat`),H.setAttribute("aria-modal","true");let rt=n("header","cb-header"),Ce=(o,c="cb-avatar",h="header")=>{if(!o){let m=n("span",`${c} cb-default-avatar`);return m.append(Ot()),m}let d=n("img",c);return d.src=o,d.alt="",d.width=h==="header"?36:28,d.height=d.width,d},qe=Ce(i.texts.avatarUrl),je=n("div","cb-head-copy"),at=n("div","cb-title",i.texts.botName);je.append(at);let ot=n("div","cb-presence");ot.append(n("span","cb-online"),document.createTextNode("Online")),je.append(ot);let ce=n("button","cb-close");ce.type="button",ce.setAttribute("aria-label","Close chat"),ce.append(yt("cb-icon cb-close-icon")),rt.append(qe,je,ce);let w=n("div","cb-messages");w.setAttribute("aria-live","polite");let re=n("button","cb-scroll-bottom","\u2193");re.type="button",re.hidden=!0,re.setAttribute("aria-label","Scroll to latest message");let Z=n("div","cb-chips");Z.setAttribute("role","group"),Z.setAttribute("aria-label","Suggested questions");let X=n("div","cb-typing-row");X.hidden=!0;let nt=n("div","cb-typing-bubble");nt.append(n("span","cb-dot"),n("span","cb-dot"),n("span","cb-dot"));let it=n("div","cb-message-avatar");it.append(Ce(i.texts.avatarUrl,"","reply")),X.append(it,nt);let le=n("span","cb-counter");le.hidden=!0;let ke=n("div","cb-usage");ke.hidden=l;let Ae=n("form","cb-compose"),b=n("textarea","cb-input");b.rows=1,b.maxLength=i.limits.messageCharacters,b.placeholder=i.texts.inputPlaceholder,b.setAttribute("aria-label",i.texts.inputPlaceholder);let Q=n("button","cb-send");Q.type="submit",Q.disabled=!0,Q.setAttribute("aria-label","Send message"),Q.append(Ut()),Ae.append(b,le,Q),H.append(rt,w,X,Z,ke,Ae);let Ie=n("footer","cb-footer"),de=n("img","cb-brand-icon");de.src=a,de.alt="",de.width=15,de.height=15;let Le=n("a","",xt.name);Le.href="http://192.168.1.33:3000/",Le.target="_blank",Le.rel="noopener noreferrer";let st=n("span");st.append("Powered by ",Le),Ie.append(de,st),Ie.hidden=!i.branding.showBadge,H.append(Ie),R.append(H);let U=0,ae=null,Ee=Date.now(),Be=0,be=!1,oe="",_e="",De="",ne=!1,q=0,j=i.limits.conversationPrompts,A=!1,Me=`cb-state-${r}`,pe=`cb-submitted-lead-${r}`,$e=()=>x.getItem(`cb-conversation-${r}`),Fe=()=>{if(!l)try{x.setItem(Me,JSON.stringify({updatedAt:Ee,conversationId:x.getItem(`cb-conversation-${r}`),messages:Pe,usage:{used:q,limit:j,reached:A}}))}catch{}},Pe=[],Se=[],It=`cb-teaser-${r}`,me=null,Y=()=>{me===null&&(me=requestAnimationFrame(()=>{me=null,y||(w.scrollTop=w.scrollHeight)}))},ct=()=>w.scrollHeight-w.scrollTop-w.clientHeight<80,lt=()=>{let o=n("div","cb-message-avatar");return o.append(Ce(i.texts.avatarUrl,"","reply")),o},ie=(o,c,h=!0)=>{Be+=1;let d=wt(),p=n("div",`cb-message-row cb-${o}-row${o===_e&&d===De?" cb-grouped":""}`),_=n("div","cb-message-wrap"),D=n("div",`cb-message cb-${o}`);return o==="bot"?(D.classList.add("cb-markdown"),Ue(D,c),p.append(lt())):D.textContent=c,_.append(D,n("time","cb-timestamp",d)),p.append(_),w.append(p),c&&!l&&(Pe.push({kind:o,content:c,stamp:d}),h&&Fe()),_e=o,De=d,Y(),{row:p,bubble:D,stamp:d}},We=(o,c)=>{let h=n("div","cb-error-notice");if(h.setAttribute("role","alert"),h.append(n("span","cb-error-symbol","!"),n("span","cb-error-text",o)),c){let d=n("button","cb-retry");d.type="button",d.setAttribute("aria-label","Retry message"),d.title="Retry message",d.append(qt()),d.addEventListener("click",()=>{h.remove(),Ye(c)}),h.append(d)}w.append(h),Y()},ue=()=>{ke.textContent=A?`${q} / ${j} questions \xB7 Limit reached`:`${q} / ${j} questions`,ke.classList.toggle("cb-usage-limit",A)},He=()=>{if(w.querySelector(".cb-limit-notice"))return;let o=n("div","cb-limit-notice");o.setAttribute("role","status");let c=n("span","",i.features.allowRestartAfterLimit?"This conversation has reached its limit. Start a new chat to continue.":"This conversation has reached its limit.");if(o.append(c),i.features.allowRestartAfterLimit){let h=n("button","cb-limit-action","New chat");h.type="button",h.addEventListener("click",()=>bt()),o.append(h)}w.append(o),Y()},Lt=o=>{y||O===o||(O=o,H.classList.toggle("cb-open",o),L.classList.toggle("cb-active",o),L.setAttribute("aria-expanded",String(o)),o?(z.classList.remove("cb-visible"),x.setItem(It,"seen"),l||setTimeout(()=>{!y&&O&&b.focus()},210)):L.focus(),F?.(o))},Qe=()=>{Z.replaceChildren(),i.texts.starterQuestions.forEach(o=>{let c=n("button","cb-chip",o);c.type="button",c.addEventListener("click",()=>Ye(o)),Z.append(c)}),Z.hidden=ne||!i.texts.starterQuestions.length},Et=()=>{ne||(ne=!0,Z.hidden=!0)},Te=()=>{b.style.height="auto",b.style.height=`${Math.min(b.scrollHeight,96)}px`;let o=b.value.length;le.hidden=o<Math.floor(i.limits.messageCharacters*.9),le.textContent=`${o}/${i.limits.messageCharacters}`,le.classList.toggle("cb-counter-limit",o>=i.limits.messageCharacters)},Mt=o=>{let c=$e(),h=()=>!l&&c&&x.getItem(pe)===c,d=()=>n("p","cb-form-success","Your request has already been submitted.");if(h()){w.append(d()),Y();return}if(w.querySelector("form.cb-form"))return;let m=n("form","cb-form");m.noValidate=!0,m.append(n("p","cb-form-title","Request an appointment"));let p=n("p","cb-form-error");p.hidden=!0;let _=new Map;(o.fields||[]).forEach(k=>{let C=k.name||k.id;if(!C)return;let T=n("label"),I=n("span","cb-form-label",k.label||C);k.required!==!1&&I.append(n("span","cb-required"," *"));let M=n("input");M.name=C,M.required=k.required!==!1,M.type=["email","date","tel"].includes(k.type)?k.type:"text",M.autocomplete=C==="phone"?"tel":C==="email"?"email":"name",M.maxLength=C==="phone"?40:255;let P=n("span","cb-field-error");P.hidden=!0,M.setAttribute("aria-describedby",`cb-${C}-error`),P.id=`cb-${C}-error`,M.addEventListener("input",()=>{M.removeAttribute("aria-invalid"),P.hidden=!0,p.hidden=!0}),T.append(I,M,P),m.append(T),_.set(C,{control:M,error:P,label:k.label||C})});let D=(k,C)=>{let T=_.get(k);return T?(T.control.setAttribute("aria-invalid","true"),T.error.textContent=C,T.error.hidden=!1,!0):!1},$t=()=>{let k=!0;_.forEach(({control:I,error:M,label:P})=>{I.removeAttribute("aria-invalid"),M.hidden=!0;let Ne=I.value.trim();I.required&&!Ne?(D(I.name,`${P} is required.`),k=!1):Ne&&!I.validity.valid&&(D(I.name,I.validity.typeMismatch?`Enter a valid ${I.name==="email"?"email address":P.toLowerCase()}.`:`${P} is invalid.`),k=!1)});let C=_.get("email")?.control.value.trim(),T=_.get("phone")?.control.value.trim();return _.has("email")&&_.has("phone")&&!C&&!T&&(D("email","Enter an email address or phone number."),k=!1),k},ee=n("button","","Send request");ee.type="submit",m.append(p,ee),m.addEventListener("submit",async k=>{if(k.preventDefault(),p.hidden=!0,c!==$e()){m.remove();return}if(h()){m.replaceWith(d());return}if(!(ee.disabled||!$t())){ee.disabled=!0,ee.textContent="Submitting\u2026",m.setAttribute("aria-busy","true");try{let C=Object.fromEntries(new FormData(m)),T=await fetch(`${e.replace(/\/$/,"")}/api/v1/leads/${encodeURIComponent(r)}`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({conversationId:c,fields:C})});if(!T.ok){let I=await T.json().catch(()=>null),M=I?.errors&&typeof I.errors=="object"?Object.entries(I.errors):[],P=!1;if(M.forEach(([Ne,Je])=>{let Pt=Ne.replace(/^fields\./,""),pt=Array.isArray(Je)?Je[0]:Je;typeof pt=="string"&&(P=D(Pt,pt)||P)}),P)return;throw new Error(I?.message||"We could not send your request. Please try again.")}!l&&c&&$e()===c&&x.setItem(pe,c),m.replaceWith(n("p","cb-form-success","Thanks! We'll contact you soon.")),Y()}catch(C){p.textContent=C.message||"We could not send your request. Please try again.",p.hidden=!1}finally{m.removeAttribute("aria-busy"),ee.textContent="Send request",ee.disabled=!1}}}),w.append(m),Y()},Ye=async o=>{if(!o.trim()||be||A)return;if(o.length>i.limits.messageCharacters){We(`Please keep your message within ${i.limits.messageCharacters} characters.`);return}if(l&&Se.length+2>j*2){We("Test session limit reached. Reset chat to start a new session.");return}let c=U,h=new AbortController;ae=h,oe=o.trim(),Et(),ie("user",oe),b.value="",Te(),be=!0,b.disabled=!0,Q.disabled=!0,X.hidden=!1,Y();let d=null,m="";try{if(await ht({apiBase:e,botId:r,signal:h.signal,onConversation:p=>{!l&&!y&&c===U&&(p!==$e()&&(x.removeItem(pe),w.querySelector("form.cb-form")?.remove()),x.setItem(`cb-conversation-${r}`,p))},conversationId:l?null:x.getItem(`cb-conversation-${r}`),message:oe,test:l,history:l?Se:void 0,authToken:l?s():null,assistantRules:l?i.settings?.assistantRules:void 0,botName:l?i.texts.botName:void 0,onToken:p=>{y||c!==U||p&&(m+=p,m.trim()&&(X.hidden=!0,d??=ie("bot",""),Ue(d.bubble,m),ct()&&Y()))},onLeadForm:p=>{!y&&c===U&&Mt(p)},onUsage:p=>{l||y||c!==U||(q=Number(p.used)||q,j=Number(p.limit)||j,A=!!p.reached,ue())}}),y||c!==U)return;m?l?Se.push({role:"user",text:oe},{role:"assistant",text:m.slice(0,1e5)}):(Ee=Date.now(),Pe.push({kind:"bot",content:m,stamp:d?.stamp||wt()}),Fe()):d?.row.remove(),!l&&A&&He()}catch(p){if(y||c!==U)return;X.hidden=!0,d?.row.remove(),!l&&p.status===409&&/message limit/i.test(p.message||"")?(q=j,A=!0,ue(),Fe(),He()):We(p.message||"Unable to send message.",oe)}finally{if(y||c!==U)return;ae=null,be=!1,b.disabled=A,A||b.focus(),Q.disabled=A||!b.value.trim()||b.value.length>i.limits.messageCharacters,X.hidden=!0}},fe,B=null;if(!l)try{let o=JSON.parse(x.getItem(Me)||"null");o&&Date.now()-o.updatedAt<i.limits.conversationInactivityHours*36e5&&Array.isArray(o.messages)&&(B=o)}catch{}B?(B.conversationId&&x.setItem(`cb-conversation-${r}`,B.conversationId),Ee=B.updatedAt,B.messages.forEach(o=>{let c=ie(o.kind,o.content,!1);!fe&&o.kind==="bot"&&(fe=c)}),ne=B.messages.some(o=>o.kind==="user"),q=Number(B.usage?.used)||B.messages.filter(o=>o.kind==="user").length,A=!!B.usage?.reached||q>=j,b.disabled=A):(l||(x.removeItem(`cb-conversation-${r}`),x.removeItem(Me),x.removeItem(pe)),fe=ie("bot",g&&i.texts.offlineMessage?i.texts.offlineMessage:i.texts.greetingMessage)),J.forEach(({role:o,text:c})=>{typeof c=="string"&&c.trim()&&ie(o==="user"?"user":"bot",c)}),ue(),!l&&A&&He(),Qe(),ce.addEventListener("click",()=>te(!1)),Ae.addEventListener("submit",o=>{o.preventDefault(),Ye(b.value)}),b.addEventListener("input",()=>{Te(),Q.disabled=be||!b.value.trim()}),b.addEventListener("keydown",o=>{o.key==="Enter"&&!o.shiftKey&&(o.preventDefault(),Ae.requestSubmit())}),w.addEventListener("scroll",()=>{re.hidden=ct()}),re.addEventListener("click",Y),H.append(re);let dt=o=>{o.key==="Escape"&&O&&te(!1)};document.addEventListener("keydown",dt);function bt(){!l&&A&&!i.features.allowRestartAfterLimit||(U+=1,ae?.abort(),ae=null,Ee=Date.now(),be=!1,ne=!1,_e="",De="",oe="",Be=0,q=0,A=!1,l||(x.removeItem(`cb-conversation-${r}`),x.removeItem(Me),x.removeItem(pe)),Pe.length=0,Se.length=0,w.replaceChildren(),fe=ie("bot",g&&i.texts.offlineMessage?i.texts.offlineMessage:i.texts.greetingMessage),Qe(),ue(),b.disabled=!1,b.value="",Q.disabled=!0,X.hidden=!0,Te(),b.focus())}return{destroy(){U+=1,me!==null&&cancelAnimationFrame(me),ae?.abort(),ae=null,document.removeEventListener("keydown",dt)},setOpen:Lt,resetChat(){bt()},update(o){if(y)return;let c=i.texts.greetingMessage,h=w.scrollTop;i=o,b.maxLength=i.limits.messageCharacters,j=i.limits.conversationPrompts,A=q>=j,ue(),Oe(N,i),R.classList.toggle("cb-left",i.theme.position==="left"),R.classList.toggle("cb-right",i.theme.position==="right"),L.setAttribute("aria-label",`Open ${i.texts.botName} chat`),H.setAttribute("aria-label",`${i.texts.botName} chat`),at.textContent=i.texts.botName;let d=Ce(i.texts.avatarUrl);qe.replaceWith(d),qe=d,R.querySelectorAll(".cb-message-avatar").forEach(m=>{m.replaceWith(lt())}),S.querySelector(".cb-launch-label")?.remove(),i.texts.launcherLabel&&S.prepend(n("span","cb-launch-label",i.texts.launcherLabel)),z.firstChild.textContent=i.texts.greetingMessage.slice(0,140),b.placeholder=i.texts.inputPlaceholder,Te(),b.setAttribute("aria-label",i.texts.inputPlaceholder),Ie.hidden=!i.branding.showBadge,Be===1&&c!==i.texts.greetingMessage&&Ue(fe.bubble,g&&i.texts.offlineMessage?i.texts.offlineMessage:i.texts.greetingMessage),ne||Qe(),w.scrollTop=h}}}}var et="2026-11-13-ember-badge-1";var kt="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAACXBIWXMAAAsSAAALEgHS3X78AAABqElEQVQokZWSv0tbURTHT9697z1rhod27upg6aSDEDRCtOFVawfRFsVBhGokUh0KEodYUkro0B9SXMQtHSqijYtjXZ39C3RwkEK1mvjuvXnvKzF5IZE0Nl84cO4593PuOZdDVCUkScMWsRobu2NEgWqmBNYLNiNnx+hwttkzJ8NsZ5PZzhrZKs1slSBbvaGoM0svnCnqqDxWbK14yO0az2XWEPhpAN+5hw0GfGZAisF9yzzMM7jTPC8n9C5/xArs7vMtHJiQe+alzHAhv3El3jElFrnCjK4waUCOGMlbcKzEVGCV5Rns6MAnXeUS3Psd19zzmFY4e8ncvyP8B4ZaEhcReljzP0DJcb5Sp4jTl8tx+ph/TYdXMcLJEKnjkIbTHh4u3vkVJv7PD/Pbya1SSs0Q/kSZkFEDKmIONISRJM1bILPoXy9TGksMatQUMtLqqVCwv2bWevKTaiXwATEdcrA1h5AFdFsD/w/Psfd41QL0WSh0tR/lH7c9us0TaffC7oSZxnAQottaxxOrrQw23kC/snz6ICZ6g5N+rKnV9Ys0DfotNpyvrBvhstB8cSmRrgAAAABJRU5ErkJggg==";async function Bt(){if(!document.body&&(document.readyState==="loading"&&await new Promise(t=>document.addEventListener("DOMContentLoaded",t,{once:!0})),!document.body))throw new Error("Widget mount target is unavailable.")}function _t(){let t=Symbol.for("tellvira.widget.instances"),r=window[t]||=new Map;async function e(a={}){let s,f;try{let g=a.script,v=a.botId||g?.dataset.botId;return v?(s=a.container||"embed",r.has(s)?await r.get(s):(f=Promise.resolve().then(async()=>{let F=a.apiBase||g?.dataset.apiBase||"http://192.168.1.33:8000",l=a.config||await ft(F,v),J=Ve(se(l,Ze(g)),!!a.preview);await Bt();let u=Ct({container:a.container,botId:v,apiBase:F,brandBadgeIconUrl:kt,getAuthToken:a.getAuthToken,config:J,defaultOpen:a.open??a.defaultOpen??!1,onOpenChange:a.onOpenChange,preview:a.preview,previewMessages:a.previewMessages});return{update(N){J=Ve(se(se(J,N),Ze(g)),!!a.preview),u.update(J)},open:()=>u.open(),close:()=>u.close(),resetChat:()=>u.resetChat(),destroy(){u.destroy(),r.get(s)===f&&r.delete(s)}}}),r.set(s,f),await f)):null}catch{return f&&r.get(s)===f&&r.delete(s),null}}if(window.__chatbot||={},window.ChatbotWidget||={},(!window.__chatbot.init||window.ChatbotWidget.version!==et)&&(window.__chatbot.init=e),window.ChatbotWidget.init=window.__chatbot.init,window.ChatbotWidget.version=et,Xe?.dataset.botId){let a=()=>{try{Promise.resolve(window.ChatbotWidget.init({script:Xe})).catch(()=>{})}catch{}};document.readyState==="loading"?document.addEventListener("DOMContentLoaded",a,{once:!0}):a()}}try{_t()}catch{}})();
