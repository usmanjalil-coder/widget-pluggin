var ChatbotWidgetBundle=(()=>{var at={lightPrimary:"#0f766e",darkPrimary:"#2dd4bf",mintAccent:"#5eead4",lightBackground:"#ffffff",darkBackground:"#18181b"};var Ie=Object.freeze({botName:40,launcherLabel:24,greetingMessage:200,inputPlaceholder:60,offlineMessage:200,starterQuestion:60,starterQuestions:4,avatarUrl:2048}),ot=/^#(?:[0-9a-f]{3}|[0-9a-f]{6})$/i;var ut=/^\/api\/v1\/bot-logos\/[a-zA-Z0-9]{40}\.(?:jpg|jpeg|png|webp)$/,gt=t=>t==="localhost"||t==="127.0.0.1"||t==="[::1]"||t.endsWith(".test");function Be(t,r=""){if(typeof t!="string"||!t)return"";try{let e=new URL(t);if(!["http:","https:"].includes(e.protocol)||e.username||e.password)return"";let n=gt(e.hostname)&&ut.test(e.pathname)&&!e.search&&!e.hash;if(n&&r){let l=new URL(r);l.protocol==="http:"&&l.host===e.host&&(e.protocol="http:")}return e.protocol==="https:"||e.protocol==="http:"&&n?e.href:""}catch{return""}}var le={theme:{primaryColor:at.lightPrimary,mode:"light",position:"right",borderRadius:16,fontFamily:"system"},texts:{botName:"Assistant",avatarUrl:"",greetingMessage:"Hi! How can I help?",inputPlaceholder:"Type your question...",launcherLabel:"",starterQuestions:[],offlineMessage:""},features:{leadCapture:!0,dentalNotice:!1},branding:{showBadge:!0,badgeText:""},limits:{conversationPrompts:15,messageCharacters:500,testPromptsPerHour:15,conversationInactivityHours:24},contactText:"the office",dir:"",zIndex:2147483647},Le={system:'Inter, var(--font-inter, system-ui), -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',sans:"Arial, Helvetica, sans-serif",serif:"Georgia, serif",mono:"ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace"},De=(t,r,e)=>typeof t=="string"?t.slice(0,e):r;function re(t,r){let e={...t};return Object.keys(r||{}).forEach(n=>{e[n]=r[n]&&typeof r[n]=="object"&&!Array.isArray(r[n])?re(t[n]||{},r[n]):r[n]}),e}function Fe(t,r=!1){let e=re(le,t||{});e.theme.primaryColor=ot.test(e.theme.primaryColor)?e.theme.primaryColor:le.theme.primaryColor,e.theme.mode=["light","dark","auto"].includes(e.theme.mode)?e.theme.mode:"light",e.theme.position=e.theme.position==="left"?"left":"right",e.theme.borderRadius=Math.max(0,Math.min(28,Number.isFinite(Number(e.theme.borderRadius))?Number(e.theme.borderRadius):le.theme.borderRadius)),e.theme.fontFamily=Le[e.theme.fontFamily]?Le[e.theme.fontFamily]:Object.values(Le).includes(e.theme.fontFamily)?e.theme.fontFamily:Le.system,Object.keys(le.texts).forEach(l=>{l!=="starterQuestions"&&(e.texts[l]=De(e.texts[l],le.texts[l],Ie[l]))});let n=r&&typeof window<"u"&&e.texts.avatarUrl.startsWith(`blob:${window.location.origin}/`);return e.texts.avatarUrl=n?e.texts.avatarUrl:Be(e.texts.avatarUrl),e.texts.starterQuestions=Array.isArray(e.texts.starterQuestions)?e.texts.starterQuestions.filter(l=>typeof l=="string").slice(0,Ie.starterQuestions).map(l=>l.slice(0,Ie.starterQuestion)):[],e.features.leadCapture=!!e.features.leadCapture,e.features.dentalNotice=!!e.features.dentalNotice,e.branding.showBadge=!!e.branding.showBadge,e.branding.badgeText=De(e.branding.badgeText,"",80),e.limits.conversationPrompts=Math.max(1,Math.min(100,Number(e.limits.conversationPrompts)||15)),e.limits.messageCharacters=Math.max(1,Math.min(1e4,Number(e.limits.messageCharacters)||500)),e.limits.testPromptsPerHour=Math.max(1,Math.min(1e3,Number(e.limits.testPromptsPerHour)||15)),e.limits.conversationInactivityHours=Math.max(1,Math.min(720,Number(e.limits.conversationInactivityHours)||24)),e.contactText=De(e.contactText,"the office",120),e.dir=e.dir==="rtl"?"rtl":"",e.zIndex=Math.max(1,Math.min(2147483647,Number(e.zIndex)||2147483647)),e}function We(t){if(!t)return{};let r={},e={};return t.dataset.primaryColor!==void 0&&(r.primaryColor=t.dataset.primaryColor),t.dataset.position!==void 0&&(r.position=t.dataset.position),t.dataset.greeting!==void 0&&(e.greetingMessage=t.dataset.greeting),t.dataset.botName!==void 0&&(e.botName=t.dataset.botName),{theme:r,texts:e}}async function it(t,r){let e=h=>({...h,texts:{...h.texts,avatarUrl:Be(h.texts?.avatarUrl,t)}}),n=`cb-config-${r}`;try{let h=JSON.parse(sessionStorage.getItem(n)||"null");if(h&&h.expires>Date.now())return e(h.config)}catch{}let l=await fetch(`${t.replace(/\/$/,"")}/api/v1/widget/config/${encodeURIComponent(r)}`,{headers:{Accept:"application/json"}});if(!l.ok)throw new Error("Configuration unavailable");let x=await l.json(),b=x.data||x;try{sessionStorage.setItem(n,JSON.stringify({config:b,expires:Date.now()+6e4}))}catch{}return e(b)}var be=new Map,pe=new Set,C={getItem(t){if(pe.has(t))return be.get(t);try{let r=window.localStorage.getItem(t);return be.set(t,r),r}catch{return be.get(t)??null}},setItem(t,r){be.set(t,String(r)),pe.add(t);try{window.localStorage.setItem(t,String(r)),pe.delete(t)}catch{}},removeItem(t){be.set(t,null),pe.add(t);try{window.localStorage.removeItem(t),pe.delete(t)}catch{}}};var nt=`
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
`;function ht(t){let r=(t.match(/^event:\s*(.+)$/m)||[])[1]||"message",e=(t.match(/^data:\s*(.+)$/m)||[])[1]||"";try{return{event:r,data:JSON.parse(e)}}catch{return{event:r,data:e}}}async function st({apiBase:t,botId:r,conversationId:e,message:n,onToken:l,onLeadForm:x,onUsage:b,signal:h,onConversation:B,test:c=!1,history:ge=[],authToken:i=null,assistantRules:T,botName:he}){let j=await fetch(`${t.replace(/\/$/,"")}/api/v1/${c?`bot/${encodeURIComponent(r)}/test-chat`:`chat/${encodeURIComponent(r)}`}`,{method:"POST",signal:h,headers:{"Content-Type":"application/json",Accept:"text/event-stream",...c&&i?{Authorization:`Bearer ${i}`}:{}},...c?{credentials:"include"}:{},body:JSON.stringify(c?{message:n,history:ge,assistantRules:T,botName:he}:{conversationId:e,message:n})});if(!j.ok){let G=(await j.json().catch(()=>null))?.message||(c&&j.status===409?"Test session limit reached. Reset chat to start a new session.":"Chat is temporarily unavailable."),z=new Error(G);throw z.status=j.status,z}if(!j.body)throw new Error("Chat is temporarily unavailable.");let A=j.body.getReader(),W=new TextDecoder,N="",M=null,S=null,H=!1;for(;;){let{done:$,value:G}=await A.read();if(h?.throwIfAborted(),$)break;N+=W.decode(G,{stream:!0});let z=N.split(/\n\n/);N=z.pop(),z.forEach(ae=>{let k=ht(ae);if(k.event==="token"&&l(k.data.token||""),k.event==="lead_form"&&(S=k.data),k.event==="usage"&&b?.(k.data),k.event==="conversation"&&(M=k.data.conversationId),k.event==="done"&&(H=!0,!c&&M&&B?.(M),!c&&S&&x(S)),k.event==="error")throw new Error(k.data.message||"Chat is temporarily unavailable.")})}if(!H)throw new Error("Chat connection ended before the reply was saved.")}function ft(t){let r=t.length===4?`#${t[1]}${t[1]}${t[2]}${t[2]}${t[3]}${t[3]}`:t,e=[1,3,5].map(n=>parseInt(r.slice(n,n+2),16)/255).map(n=>n<=.03928?n/12.92:((n+.055)/1.055)**2.4);return e[0]*.2126+e[1]*.7152+e[2]*.0722>.179?"#18181b":"#ffffff"}function He(t,r){let e=r.theme.mode==="dark"||r.theme.mode==="auto"&&window.matchMedia?.("(prefers-color-scheme: dark)").matches;t.style.setProperty("--cb-primary",r.theme.primaryColor),t.style.setProperty("--cb-on-primary",ft(r.theme.primaryColor)),t.style.setProperty("--cb-bg",e?"#202023":"#ffffff"),t.style.setProperty("--cb-surface",e?"#18181b":"#fafafa"),t.style.setProperty("--cb-text",e?"#f4f4f5":"#18181b"),t.style.setProperty("--cb-muted",e?"#a1a1aa":"#71717a"),t.style.setProperty("--cb-success",e?"#6ee7b7":"#047857"),t.style.setProperty("--cb-danger",e?"#fca5a5":"#dc2626"),t.style.setProperty("--cb-radius",`${r.theme.borderRadius}px`),t.style.setProperty("--cb-font",r.theme.fontFamily),t.style.setProperty("--cb-z",String(r.zIndex||2147483647))}var $e={name:"Tellvira",tagline:"AI assistant for websites that answers questions and captures leads.",domain:"tellvira.com",iconPath:"/brand/tellvira-icon.svg",wordmarkPath:"/brand/tellvira-logo-transparent.png",widgetBadgeIconPath:"/brand/tellvira-widget-15.png",supportEmail:"support@tellvira.com",description:"Add an AI assistant to your website to answer visitor questions, capture leads, and book appointments without code."};var o=(t,r,e)=>{let n=document.createElement(t);return r&&(n.className=r),e!==void 0&&(n.textContent=e),n},me=(t,r="")=>{let e=document.createElementNS("http://www.w3.org/2000/svg","svg");return e.setAttribute("viewBox","0 0 24 24"),e.setAttribute("aria-hidden","true"),r&&e.setAttribute("class",r),t.forEach(n=>{let l=document.createElementNS("http://www.w3.org/2000/svg",n.tag||"path");Object.keys(n).forEach(x=>{x!=="tag"&&l.setAttribute(x,n[x])}),e.append(l)}),e},xt=()=>me([{d:"M20 11.5a7.5 7.5 0 0 1-7.8 7.49 8.7 8.7 0 0 1-3.12-.58L4 20l1.5-4.2A7.25 7.25 0 0 1 4 11.5 7.5 7.5 0 0 1 11.75 4 7.5 7.5 0 0 1 20 11.5Z"},{d:"M8.5 11.5h.01M12 11.5h.01M15.5 11.5h.01"}],"cb-icon cb-icon-chat"),vt=()=>me([{tag:"rect",x:3,y:7,width:18,height:14,rx:4},{d:"M12 7V4M10 3h4"},{d:"M8 13h.01M16 13h.01M9 17h6"}],"cb-bot-icon"),ct=(t="cb-icon cb-icon-close")=>me([{d:"m7 7 10 10M17 7 7 17"}],t),wt=()=>me([{d:"M12 19V5M6.5 10.5 12 5l5.5 5.5"}]),yt=()=>me([{d:"M3 12a9 9 0 1 0 2.6-6.4L3 8"},{d:"M3 3v5h5"}]),dt=()=>new Intl.DateTimeFormat(void 0,{hour:"numeric",minute:"2-digit"}).format(new Date);function Qe(t,r){t.replaceChildren();let e=(l,x)=>x.split(/(\*\*[^*]+\*\*|\*[^*]+\*|https?:\/\/[^\s]+)/g).forEach(b=>{if(b)if(/^\*\*[^*]+\*\*$/.test(b))l.append(o("strong","",b.slice(2,-2)));else if(/^\*[^*]+\*$/.test(b))l.append(o("em","",b.slice(1,-1)));else if(/^https?:\/\//.test(b)){let h=o("a","",b);h.href=b,h.target="_blank",h.rel="noopener noreferrer",l.append(h)}else l.append(document.createTextNode(b))}),n;String(r||"").split(`
`).forEach(l=>{let x=/^\s*[-*]\s+(.+)$/.exec(l);if(x){n||(n=o("ul"),t.append(n));let b=o("li");e(b,x[1]),n.append(b)}else{n=null;let b=o("p");e(b,l),t.append(b)}})}function lt({container:t,botId:r,apiBase:e,brandBadgeIconUrl:n,getAuthToken:l=()=>null,config:x,failed:b,defaultOpen:h,onOpenChange:B,preview:c=!1,previewMessages:ge=[]}){let i=x,T=o("div","cb-host");t&&T.classList.add("cb-embedded-host");let he=T.attachShadow({mode:"open"}),j=o("style"),A=!1;j.textContent=nt,he.append(j),He(T,i);let W=o("div",`cb-root ${t?"cb-embedded":"cb-fixed"}${c?" cb-preview":""} cb-${i.theme.position}`),N=o("div","cb-launch-area"),M=o("button","cb-launcher");M.type="button",M.setAttribute("aria-label",`Open ${i.texts.botName} chat`),M.setAttribute("aria-expanded","false"),M.append(xt(),ct()),i.texts.launcherLabel&&N.append(o("span","cb-launch-label",i.texts.launcherLabel)),N.append(M);let S=o("div","cb-teaser",i.texts.greetingMessage.slice(0,140)),H=o("button","cb-teaser-close","\xD7");H.type="button",H.setAttribute("aria-label","Dismiss greeting"),S.append(H),N.append(S);let $=o("section","cb-window");$.setAttribute("role","dialog"),$.setAttribute("aria-label",`${i.texts.botName} chat`),$.setAttribute("aria-modal","true");let G=o("header","cb-header"),z=(a,s="cb-avatar",m="header")=>{if(!a){let v=o("span",`${s} cb-default-avatar`);return v.append(vt()),v}let d=o("img",s);return d.src=a,d.alt="",d.width=m==="header"?36:28,d.height=d.width,d},ae=z(i.texts.avatarUrl),k=o("div","cb-head-copy"),Ge=o("div","cb-title",i.texts.botName);k.append(Ge);let Je=o("div","cb-presence");Je.append(o("span","cb-online"),document.createTextNode("Online")),k.append(Je);let oe=o("button","cb-close");oe.type="button",oe.setAttribute("aria-label","Close chat"),oe.append(ct("cb-icon cb-close-icon")),G.append(ae,k,oe);let w=o("div","cb-messages");w.setAttribute("aria-live","polite");let J=o("button","cb-scroll-bottom","\u2193");J.type="button",J.hidden=!0,J.setAttribute("aria-label","Scroll to latest message");let Q=o("div","cb-chips");Q.setAttribute("role","group"),Q.setAttribute("aria-label","Suggested questions");let D=o("div","cb-typing-row");D.hidden=!0;let Ve=o("div","cb-typing-bubble");Ve.append(o("span","cb-dot"),o("span","cb-dot"),o("span","cb-dot"));let Xe=o("div","cb-message-avatar");Xe.append(z(i.texts.avatarUrl,"","reply")),D.append(Xe,Ve);let ie=o("span","cb-counter");ie.hidden=!0;let fe=o("div","cb-usage");fe.hidden=c;let xe=o("form","cb-compose"),p=o("textarea","cb-input");p.rows=1,p.maxLength=i.limits.messageCharacters,p.placeholder=i.texts.inputPlaceholder,p.setAttribute("aria-label",i.texts.inputPlaceholder);let q=o("button","cb-send");q.type="submit",q.disabled=!0,q.setAttribute("aria-label","Send message"),q.append(wt()),xe.append(p,ie,q),$.append(G,w,D,Q,fe,xe);let ve=o("footer","cb-footer"),ne=o("img","cb-brand-icon");ne.src=n,ne.alt="",ne.width=15,ne.height=15,ve.append(ne,document.createTextNode(`Powered by ${$e.name}`)),ve.hidden=!i.branding.showBadge,$.append(ve),W.append(N,$),he.append(W);let we=t||document.body;we&&we!==document.body&&we.replaceChildren(),we.append(T);let V=!1,O=0,X=null,ye=Date.now(),Te=0,se=!1,K="",Ne="",Se="",Z=!1,U=0,R=i.limits.conversationPrompts,E=!1,ke=`cb-state-${r}`,ze=()=>{if(!c)try{C.setItem(ke,JSON.stringify({updatedAt:ye,conversationId:C.getItem(`cb-conversation-${r}`),messages:Ce,usage:{used:U,limit:R,reached:E}}))}catch{}},Ce=[],Ae=[],Oe=`cb-teaser-${r}`,F=()=>{w.scrollTop=w.scrollHeight},Ke=()=>w.scrollHeight-w.scrollTop-w.clientHeight<80,Ze=()=>{let a=o("div","cb-message-avatar");return a.append(z(i.texts.avatarUrl,"","reply")),a},ee=(a,s,m=!0)=>{Te+=1;let d=dt(),g=o("div",`cb-message-row cb-${a}-row${a===Ne&&d===Se?" cb-grouped":""}`),Y=o("div","cb-message-wrap"),u=o("div",`cb-message cb-${a}`);return a==="bot"?(u.classList.add("cb-markdown"),Qe(u,s),g.append(Ze())):u.textContent=s,Y.append(u,o("time","cb-timestamp",d)),g.append(Y),w.append(g),s&&!c&&(Ce.push({kind:a,content:s,stamp:d}),m&&ze()),Ne=a,Se=d,F(),{row:g,bubble:u,stamp:d}},Ue=(a,s)=>{let m=o("div","cb-error-notice");if(m.setAttribute("role","alert"),m.append(o("span","cb-error-symbol","!"),o("span","cb-error-text",a)),s){let d=o("button","cb-retry");d.type="button",d.setAttribute("aria-label","Retry message"),d.title="Retry message",d.append(yt()),d.addEventListener("click",()=>{m.remove(),qe(s)}),m.append(d)}w.append(m),F()},ce=()=>{fe.textContent=E?`${U} / ${R} questions \xB7 Limit reached`:`${U} / ${R} questions`,fe.classList.toggle("cb-usage-limit",E)},Re=()=>{if(w.querySelector(".cb-limit-notice"))return;let a=o("div","cb-limit-notice");a.setAttribute("role","status");let s=o("span","","This conversation has reached its limit. Start a new chat to continue."),m=o("button","cb-limit-action","New chat");m.type="button",m.addEventListener("click",()=>tt()),a.append(s,m),w.append(a),F()},te=a=>{A||V===a||(V=a,$.classList.toggle("cb-open",a),M.classList.toggle("cb-active",a),M.setAttribute("aria-expanded",String(a)),a?(S.classList.remove("cb-visible"),C.setItem(Oe,"seen"),c||setTimeout(()=>{!A&&V&&p.focus()},210)):M.focus(),B?.(a))},je=()=>{Q.replaceChildren(),i.texts.starterQuestions.forEach(a=>{let s=o("button","cb-chip",a);s.type="button",s.addEventListener("click",()=>qe(a)),Q.append(s)}),Q.hidden=Z||!i.texts.starterQuestions.length},bt=()=>{Z||(Z=!0,Q.hidden=!0)},Me=()=>{p.style.height="auto",p.style.height=`${Math.min(p.scrollHeight,96)}px`;let a=p.value.length;ie.hidden=a<Math.floor(i.limits.messageCharacters*.9),ie.textContent=`${a}/${i.limits.messageCharacters}`,ie.classList.toggle("cb-counter-limit",a>=i.limits.messageCharacters)},pt=a=>{let s=o("form","cb-form");s.noValidate=!0,s.append(o("p","cb-form-title","Request an appointment"));let m=o("p","cb-form-error");m.hidden=!0;let d=new Map;(a.fields||[]).forEach(u=>{let f=u.name||u.id;if(!f)return;let P=o("label"),y=o("span","cb-form-label",u.label||f);u.required!==!1&&y.append(o("span","cb-required"," *"));let I=o("input");I.name=f,I.required=u.required!==!1,I.type=["email","date","tel"].includes(u.type)?u.type:"text",I.autocomplete=f==="phone"?"tel":f==="email"?"email":"name",I.maxLength=f==="phone"?40:255;let L=o("span","cb-field-error");L.hidden=!0,I.setAttribute("aria-describedby",`cb-${f}-error`),L.id=`cb-${f}-error`,I.addEventListener("input",()=>{I.removeAttribute("aria-invalid"),L.hidden=!0,m.hidden=!0}),P.append(y,I,L),s.append(P),d.set(f,{control:I,error:L,label:u.label||f})});let v=(u,f)=>{let P=d.get(u);return P?(P.control.setAttribute("aria-invalid","true"),P.error.textContent=f,P.error.hidden=!1,!0):!1},g=()=>{let u=!0;d.forEach(({control:y,error:I,label:L})=>{y.removeAttribute("aria-invalid"),I.hidden=!0;let Ee=y.value.trim();y.required&&!Ee?(v(y.name,`${L} is required.`),u=!1):Ee&&!y.validity.valid&&(v(y.name,y.validity.typeMismatch?`Enter a valid ${y.name==="email"?"email address":L.toLowerCase()}.`:`${L} is invalid.`),u=!1)});let f=d.get("email")?.control.value.trim(),P=d.get("phone")?.control.value.trim();return d.has("email")&&d.has("phone")&&!f&&!P&&(v("email","Enter an email address or phone number."),u=!1),u},Y=o("button","","Send request");Y.type="submit",s.append(m,Y),s.addEventListener("submit",async u=>{if(u.preventDefault(),m.hidden=!0,!!g()){Y.disabled=!0;try{let f=Object.fromEntries(new FormData(s)),P=await fetch(`${e.replace(/\/$/,"")}/api/v1/leads/${encodeURIComponent(r)}`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({conversationId:C.getItem(`cb-conversation-${r}`),fields:f})});if(!P.ok){let y=await P.json().catch(()=>null),I=y?.errors&&typeof y.errors=="object"?Object.entries(y.errors):[],L=!1;if(I.forEach(([Ee,_e])=>{let mt=Ee.replace(/^fields\./,""),rt=Array.isArray(_e)?_e[0]:_e;typeof rt=="string"&&(L=v(mt,rt)||L)}),L)return;throw new Error(y?.message||"We could not send your request. Please try again.")}s.replaceWith(o("p","cb-form-success","Thanks! We'll contact you soon.")),F()}catch(f){m.textContent=f.message||"We could not send your request. Please try again.",m.hidden=!1}finally{Y.disabled=!1}}}),w.append(s),F()},qe=async a=>{if(!a.trim()||se||E)return;if(a.length>i.limits.messageCharacters){Ue(`Please keep your message within ${i.limits.messageCharacters} characters.`);return}if(c&&Ae.length+2>R*2){Ue("Test session limit reached. Reset chat to start a new session.");return}let s=O,m=new AbortController;X=m,K=a.trim(),bt(),ee("user",K),p.value="",Me(),se=!0,p.disabled=!0,q.disabled=!0,D.hidden=!1,F();let d=null,v="";try{if(await st({apiBase:e,botId:r,signal:m.signal,onConversation:g=>{!c&&!A&&s===O&&C.setItem(`cb-conversation-${r}`,g)},conversationId:c?null:C.getItem(`cb-conversation-${r}`),message:K,test:c,history:c?Ae:void 0,authToken:c?l():null,assistantRules:c?i.settings?.assistantRules:void 0,botName:c?i.texts.botName:void 0,onToken:g=>{A||s!==O||g&&(v+=g,v.trim()&&(D.hidden=!0,d??=ee("bot",""),Qe(d.bubble,v),Ke()&&F()))},onLeadForm:g=>{!A&&s===O&&pt(g)},onUsage:g=>{c||A||s!==O||(U=Number(g.used)||U,R=Number(g.limit)||R,E=!!g.reached,ce())}}),A||s!==O)return;v?c?Ae.push({role:"user",text:K},{role:"assistant",text:v.slice(0,1e5)}):(ye=Date.now(),Ce.push({kind:"bot",content:v,stamp:d?.stamp||dt()}),ze()):d?.row.remove(),!c&&E&&Re()}catch(g){if(A||s!==O)return;D.hidden=!0,d?.row.remove(),!c&&g.status===409&&/message limit/i.test(g.message||"")?(U=R,E=!0,ce(),ze(),Re()):Ue(g.message||"Unable to send message.",K)}finally{if(A||s!==O)return;X=null,se=!1,p.disabled=E,E||p.focus(),q.disabled=E||!p.value.trim()||p.value.length>i.limits.messageCharacters,D.hidden=!0}},de,_=null;if(!c)try{let a=JSON.parse(C.getItem(ke)||"null");a&&Date.now()-a.updatedAt<i.limits.conversationInactivityHours*36e5&&Array.isArray(a.messages)&&(_=a)}catch{}_?(_.conversationId&&C.setItem(`cb-conversation-${r}`,_.conversationId),ye=_.updatedAt,_.messages.forEach(a=>{let s=ee(a.kind,a.content,!1);!de&&a.kind==="bot"&&(de=s)}),Z=_.messages.some(a=>a.kind==="user"),U=Number(_.usage?.used)||_.messages.filter(a=>a.kind==="user").length,E=U>=R):(c||(C.removeItem(`cb-conversation-${r}`),C.removeItem(ke)),de=ee("bot",b&&i.texts.offlineMessage?i.texts.offlineMessage:i.texts.greetingMessage)),ge.forEach(({role:a,text:s})=>{typeof s=="string"&&s.trim()&&ee(a==="user"?"user":"bot",s)}),ce(),!c&&E&&Re(),je(),h&&te(!0),C.getItem(Oe)||setTimeout(()=>{V||S.classList.add("cb-visible")},3e3),H.addEventListener("click",()=>{S.classList.remove("cb-visible"),C.setItem(Oe,"seen")}),M.addEventListener("click",()=>te(!V)),oe.addEventListener("click",()=>te(!1)),xe.addEventListener("submit",a=>{a.preventDefault(),qe(p.value)}),p.addEventListener("input",()=>{Me(),q.disabled=se||!p.value.trim()}),p.addEventListener("keydown",a=>{a.key==="Enter"&&!a.shiftKey&&(a.preventDefault(),xe.requestSubmit())}),w.addEventListener("scroll",()=>{J.hidden=Ke()}),J.addEventListener("click",F),$.append(J);let et=a=>{a.key==="Escape"&&V&&te(!1)};document.addEventListener("keydown",et);function tt(){O+=1,X?.abort(),X=null,ye=Date.now(),se=!1,Z=!1,Ne="",Se="",K="",Te=0,U=0,E=!1,c||(C.removeItem(`cb-conversation-${r}`),C.removeItem(ke)),Ce.length=0,Ae.length=0,w.replaceChildren(),de=ee("bot",b&&i.texts.offlineMessage?i.texts.offlineMessage:i.texts.greetingMessage),je(),ce(),p.disabled=!1,p.value="",q.disabled=!0,D.hidden=!0,Me(),p.focus()}return{destroy(){A||(A=!0,O+=1,X?.abort(),X=null,document.removeEventListener("keydown",et),T.remove())},open(){te(!0)},close(){te(!1)},resetChat(){tt()},update(a){if(A)return;let s=i.texts.greetingMessage,m=w.scrollTop;i=a,p.maxLength=i.limits.messageCharacters,R=i.limits.conversationPrompts,E=U>=R,ce(),He(T,i),W.classList.toggle("cb-left",i.theme.position==="left"),W.classList.toggle("cb-right",i.theme.position==="right"),M.setAttribute("aria-label",`Open ${i.texts.botName} chat`),$.setAttribute("aria-label",`${i.texts.botName} chat`),Ge.textContent=i.texts.botName;let d=z(i.texts.avatarUrl);ae.replaceWith(d),ae=d,W.querySelectorAll(".cb-message-avatar").forEach(v=>{v.replaceWith(Ze())}),N.querySelector(".cb-launch-label")?.remove(),i.texts.launcherLabel&&N.prepend(o("span","cb-launch-label",i.texts.launcherLabel)),S.firstChild.textContent=i.texts.greetingMessage.slice(0,140),p.placeholder=i.texts.inputPlaceholder,Me(),p.setAttribute("aria-label",i.texts.inputPlaceholder),ve.hidden=!i.branding.showBadge,Te===1&&s!==i.texts.greetingMessage&&Qe(de.bubble,b&&i.texts.offlineMessage?i.texts.offlineMessage:i.texts.greetingMessage),Z||je(),w.scrollTop=m}}}var Ye="2026-11-01-widget-session-1";var Pe=new Map;function kt(t){try{return t&&t.src?new URL(t.src,window.location.href).origin:window.location.origin}catch{return window.location.origin}}async function Ct(t={}){let r=t.script,e=t.botId||r&&r.dataset.botId;if(!e)throw new Error("ChatbotWidget requires a botId.");let n=t.container||e;if(Pe.has(n))return Pe.get(n);let l=t.apiBase||r&&r.dataset.apiBase||kt(r),x=new URL($e.widgetBadgeIconPath,r?.src||window.location.href).href,b=t.config,h=!1;if(!b)try{b=await it(l,e)}catch{return console.warn("ChatbotWidget: configuration unavailable."),null}let B=Fe(re(b,We(r)),!!t.preview),c,i={update:T=>{B=Fe(re(re(B,T),We(r)),!!t.preview),c?.update(B)},open:()=>c?.open(),close:()=>c?.close(),resetChat:()=>c?.resetChat(),destroy(){c?.destroy(),Pe.delete(n)}};return c=lt({container:t.container,botId:e,apiBase:l,brandBadgeIconUrl:x,getAuthToken:t.getAuthToken,config:B,defaultOpen:t.open??t.defaultOpen??!1,onOpenChange:t.onOpenChange,preview:t.preview,previewMessages:t.previewMessages}),Pe.set(n,i),i}window.__chatbot=window.__chatbot||{};window.ChatbotWidget=window.ChatbotWidget||{};(!window.__chatbot.init||window.ChatbotWidget.version!==Ye)&&(window.__chatbot.init=Ct);window.ChatbotWidget.init=window.__chatbot.init;window.ChatbotWidget.version=Ye;var ue=document.currentScript;if(ue&&ue.dataset.botId){let t=()=>{ue.dataset.cbLoaded||(ue.dataset.cbLoaded="true",window.__chatbot.init({script:ue}))};document.readyState==="loading"?document.addEventListener("DOMContentLoaded",t,{once:!0}):t()}})();
