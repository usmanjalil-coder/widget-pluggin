var ChatbotWidgetBundle=(()=>{var _e=/^\/api\/v1\/bot-logos\/[a-zA-Z0-9]{40}\.(?:jpg|jpeg|png|webp)$/,Re=t=>t==="localhost"||t==="127.0.0.1"||t==="[::1]"||t.endsWith(".test");function K(t,r=""){if(typeof t!="string"||!t)return"";try{let e=new URL(t);if(!["http:","https:"].includes(e.protocol)||e.username||e.password)return"";let i=Re(e.hostname)&&_e.test(e.pathname)&&!e.search&&!e.hash;if(i&&r){let c=new URL(r);c.protocol==="http:"&&c.host===e.host&&(e.protocol="http:")}return e.protocol==="https:"||e.protocol==="http:"&&i?e.href:""}catch{return""}}var Z=Object.freeze({botName:40,launcherLabel:24,greetingMessage:200,inputPlaceholder:60,offlineMessage:200,starterQuestion:60,starterQuestions:4,avatarUrl:2048}),Me=/^#(?:[0-9a-f]{3}|[0-9a-f]{6})$/i;var Y={theme:{primaryColor:"#4F46E5",mode:"light",position:"right",borderRadius:16,fontFamily:"system"},texts:{botName:"Assistant",avatarUrl:"",greetingMessage:"Hi! How can I help?",inputPlaceholder:"Type your question...",launcherLabel:"",starterQuestions:[],offlineMessage:""},features:{leadCapture:!0,dentalNotice:!1},branding:{showBadge:!0,badgeText:""},contactText:"the office",dir:"",zIndex:2147483647},ee={system:'Inter, var(--font-inter, system-ui), -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',sans:"Arial, Helvetica, sans-serif",serif:"Georgia, serif",mono:"ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace"},me=(t,r,e)=>typeof t=="string"?t.slice(0,e):r;function R(t,r){let e={...t};return Object.keys(r||{}).forEach(i=>{e[i]=r[i]&&typeof r[i]=="object"&&!Array.isArray(r[i])?R(t[i]||{},r[i]):r[i]}),e}function ge(t,r=!1){let e=R(Y,t||{});e.theme.primaryColor=Me.test(e.theme.primaryColor)?e.theme.primaryColor:Y.theme.primaryColor,e.theme.mode=["light","dark","auto"].includes(e.theme.mode)?e.theme.mode:"light",e.theme.position=e.theme.position==="left"?"left":"right",e.theme.borderRadius=Math.max(0,Math.min(28,Number.isFinite(Number(e.theme.borderRadius))?Number(e.theme.borderRadius):Y.theme.borderRadius)),e.theme.fontFamily=ee[e.theme.fontFamily]?ee[e.theme.fontFamily]:Object.values(ee).includes(e.theme.fontFamily)?e.theme.fontFamily:ee.system,Object.keys(Y.texts).forEach(c=>{c!=="starterQuestions"&&(e.texts[c]=me(e.texts[c],Y.texts[c],Z[c]))});let i=r&&typeof window<"u"&&e.texts.avatarUrl.startsWith(`blob:${window.location.origin}/`);return e.texts.avatarUrl=i?e.texts.avatarUrl:K(e.texts.avatarUrl),e.texts.starterQuestions=Array.isArray(e.texts.starterQuestions)?e.texts.starterQuestions.filter(c=>typeof c=="string").slice(0,Z.starterQuestions).map(c=>c.slice(0,Z.starterQuestion)):[],e.features.leadCapture=!!e.features.leadCapture,e.features.dentalNotice=!!e.features.dentalNotice,e.branding.showBadge=!!e.branding.showBadge,e.branding.badgeText=me(e.branding.badgeText,"",80),e.contactText=me(e.contactText,"the office",120),e.dir=e.dir==="rtl"?"rtl":"",e.zIndex=Math.max(1,Math.min(2147483647,Number(e.zIndex)||2147483647)),e}function fe(t){if(!t)return{};let r={},e={};return t.dataset.primaryColor!==void 0&&(r.primaryColor=t.dataset.primaryColor),t.dataset.position!==void 0&&(r.position=t.dataset.position),t.dataset.greeting!==void 0&&(e.greetingMessage=t.dataset.greeting),t.dataset.botName!==void 0&&(e.botName=t.dataset.botName),{theme:r,texts:e}}async function Ie(t,r){let e=l=>({...l,texts:{...l.texts,avatarUrl:K(l.texts?.avatarUrl,t)}}),i=`cb-config-${r}`;try{let l=JSON.parse(sessionStorage.getItem(i)||"null");if(l&&l.expires>Date.now())return e(l.config)}catch{}let c=await fetch(`${t.replace(/\/$/,"")}/api/v1/widget/config/${encodeURIComponent(r)}`,{headers:{Accept:"application/json"}});if(!c.ok)throw new Error("Configuration unavailable");let u=await c.json(),d=u.data||u;try{sessionStorage.setItem(i,JSON.stringify({config:d,expires:Date.now()+6e4}))}catch{}return e(d)}var Te=`
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
.cb-preview .cb-window { width: min(380px, calc(100% - 32px)); height: min(560px, calc(100% - 92px)); min-height: 0; max-width: none; max-height: none; }
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
  flex: none;
  min-height: 96px;
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
  color: var(--cb-on-primary);
  background:
    linear-gradient(
      135deg,
      color-mix(in srgb, var(--cb-primary) 98%, white),
      var(--cb-primary) 58%,
      color-mix(in srgb, var(--cb-primary) 98%, black));
}
.cb-avatar {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  object-fit: cover;
  background: rgba(255, 255, 255, .22);
  border: 1px solid rgba(255, 255, 255, .26);
}
.cb-avatar-initials {
  display: grid;
  place-items: center;
  font-size: 14px;
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
  font-size: 16px;
  font-weight: 600;
}
.cb-presence {
  display: flex;
  align-items: center;
  gap: 5px;
  margin-top: 2px;
  font-size: 12px;
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
  display: grid;
  place-items: center;
  width: 42px;
  height: 42px;
  flex: none;
  border: 0;
  border-radius: var(--cb-radius);
  color: inherit;
  background: rgba(255, 255, 255, .13);
}
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
  font-size: 14px;
  line-height: 1.5;
  overflow-wrap: anywhere;
}
.cb-user {
  border: 0;
  border-radius: var(--cb-radius) var(--cb-radius) min(4px, var(--cb-radius)) var(--cb-radius);
  background: var(--cb-primary);
  color: var(--cb-on-primary);
}
.cb-error {
  border-color: var(--cb-danger);
}
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
.cb-form button,
.cb-retry {
  border: 0;
  border-radius: var(--cb-radius);
  padding: 10px;
  color: var(--cb-on-primary);
  background: var(--cb-primary);
  font-size: 13px;
  font-weight: 600;
}
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
  .cb-header { padding-left: max(20px, env(safe-area-inset-left)); padding-right: max(20px, env(safe-area-inset-right)); }
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
`;function Qe(t){let r=(t.match(/^event:\s*(.+)$/m)||[])[1]||"message",e=(t.match(/^data:\s*(.+)$/m)||[])[1]||"";try{return{event:r,data:JSON.parse(e)}}catch{return{event:r,data:e}}}async function Ne({apiBase:t,botId:r,conversationId:e,message:i,onToken:c,onLeadForm:u}){let d=await fetch(`${t.replace(/\/$/,"")}/api/v1/chat/${encodeURIComponent(r)}`,{method:"POST",headers:{"Content-Type":"application/json",Accept:"text/event-stream"},body:JSON.stringify({conversationId:e,message:i})});if(!d.ok||!d.body)throw new Error("Chat is temporarily unavailable.");let l=d.body.getReader(),k=new TextDecoder,o="";for(;;){let{done:v,value:M}=await l.read();if(v)break;o+=k.decode(M,{stream:!0});let Q=o.split(/\n\n/);o=Q.pop(),Q.forEach(x=>{let h=Qe(x);h.event==="token"&&c(h.data.token||""),h.event==="lead_form"&&u(h.data),h.event==="conversation"&&localStorage.setItem(`cb-conversation-${r}`,h.data.conversationId)})}}function je(t){let r=t.length===4?`#${t[1]}${t[1]}${t[2]}${t[2]}${t[3]}${t[3]}`:t,e=[1,3,5].map(i=>parseInt(r.slice(i,i+2),16)/255).map(i=>i<=.03928?i/12.92:((i+.055)/1.055)**2.4);return e[0]*.2126+e[1]*.7152+e[2]*.0722>.179?"#18181b":"#ffffff"}function xe(t,r){let e=r.theme.mode==="dark"||r.theme.mode==="auto"&&window.matchMedia?.("(prefers-color-scheme: dark)").matches;t.style.setProperty("--cb-primary",r.theme.primaryColor),t.style.setProperty("--cb-on-primary",je(r.theme.primaryColor)),t.style.setProperty("--cb-bg",e?"#202023":"#ffffff"),t.style.setProperty("--cb-surface",e?"#18181b":"#fafafa"),t.style.setProperty("--cb-text",e?"#f4f4f5":"#18181b"),t.style.setProperty("--cb-muted",e?"#a1a1aa":"#71717a"),t.style.setProperty("--cb-success",e?"#6ee7b7":"#047857"),t.style.setProperty("--cb-danger",e?"#fca5a5":"#dc2626"),t.style.setProperty("--cb-radius",`${r.theme.borderRadius}px`),t.style.setProperty("--cb-font",r.theme.fontFamily),t.style.setProperty("--cb-z",String(r.zIndex||2147483647))}var he={name:"YourBrand",tagline:"AI assistant for websites that answers questions and captures leads.",domain:"yourbrand.example",supportEmail:"support@yourbrand.example",legalName:"YourBrand LLC",defaultTitle:"YourBrand | AI assistant for your website",description:"Add an AI assistant to your website to answer visitor questions, capture leads, and book appointments without code."},{name:at,tagline:ot,domain:nt,supportEmail:it,legalName:st,defaultTitle:ct,description:dt}=he;var a=(t,r,e)=>{let i=document.createElement(t);return r&&(i.className=r),e!==void 0&&(i.textContent=e),i},we=(t,r="")=>{let e=document.createElementNS("http://www.w3.org/2000/svg","svg");return e.setAttribute("viewBox","0 0 24 24"),e.setAttribute("aria-hidden","true"),r&&e.setAttribute("class",r),t.forEach(i=>{let c=document.createElementNS("http://www.w3.org/2000/svg",i.tag||"path");Object.keys(i).forEach(u=>{u!=="tag"&&c.setAttribute(u,i[u])}),e.append(c)}),e},De=()=>we([{d:"M20 11.5a7.5 7.5 0 0 1-7.8 7.49 8.7 8.7 0 0 1-3.12-.58L4 20l1.5-4.2A7.25 7.25 0 0 1 4 11.5 7.5 7.5 0 0 1 11.75 4 7.5 7.5 0 0 1 20 11.5Z"},{d:"M8.5 11.5h.01M12 11.5h.01M15.5 11.5h.01"}],"cb-icon cb-icon-chat"),Ue=(t="cb-icon cb-icon-close")=>we([{d:"m7 7 10 10M17 7 7 17"}],t),Fe=()=>we([{d:"M12 19V5M6.5 10.5 12 5l5.5 5.5"}]),te=t=>t.split(/\s+/).filter(Boolean).slice(0,2).map(r=>r[0]).join("").toUpperCase()||"AI",We=()=>new Intl.DateTimeFormat(void 0,{hour:"numeric",minute:"2-digit"}).format(new Date);function ve(t,r){t.replaceChildren();let e=(c,u)=>u.split(/(\*\*[^*]+\*\*|\*[^*]+\*|https?:\/\/[^\s]+)/g).forEach(d=>{if(d)if(/^\*\*[^*]+\*\*$/.test(d))c.append(a("strong","",d.slice(2,-2)));else if(/^\*[^*]+\*$/.test(d))c.append(a("em","",d.slice(1,-1)));else if(/^https?:\/\//.test(d)){let l=a("a","",d);l.href=d,l.target="_blank",l.rel="noopener noreferrer",c.append(l)}else c.append(document.createTextNode(d))}),i;String(r||"").split(`
`).forEach(c=>{let u=/^\s*[-*]\s+(.+)$/.exec(c);if(u){i||(i=a("ul"),t.append(i));let d=a("li");e(d,u[1]),i.append(d)}else{i=null;let d=a("p");e(d,c),t.append(d)}})}function Oe({container:t,botId:r,apiBase:e,config:i,failed:c,defaultOpen:u,onOpenChange:d,preview:l=!1,previewMessages:k=[]}){let o=i,v=a("div","cb-host");t&&v.classList.add("cb-embedded-host");let M=v.attachShadow({mode:"open"}),Q=a("style"),x=!1;Q.textContent=Te,M.append(Q),xe(v,o);let h=a("div",`cb-root ${t?"cb-embedded":"cb-fixed"}${l?" cb-preview":""} cb-${o.theme.position}`),I=a("div","cb-launch-area"),C=a("button","cb-launcher");C.type="button",C.setAttribute("aria-label",`Open ${o.texts.botName} chat`),C.setAttribute("aria-expanded","false"),C.append(De(),Ue()),o.texts.launcherLabel&&I.append(a("span","cb-launch-label",o.texts.launcherLabel)),I.append(C);let T=a("div","cb-teaser",o.texts.greetingMessage.slice(0,140)),J=a("button","cb-teaser-close","\xD7");J.type="button",J.setAttribute("aria-label","Dismiss greeting"),T.append(J),I.append(T);let A=a("section","cb-window");A.setAttribute("role","dialog"),A.setAttribute("aria-label",`${o.texts.botName} chat`),A.setAttribute("aria-modal","true");let ke=a("header","cb-header"),j=o.texts.avatarUrl?a("img","cb-avatar"):a("div","cb-avatar cb-avatar-initials",te(o.texts.botName));o.texts.avatarUrl&&(j.src=o.texts.avatarUrl,j.alt="");let ae=a("div","cb-head-copy"),Ce=a("div","cb-title",o.texts.botName);ae.append(Ce);let Ae=a("div","cb-presence");Ae.append(a("span","cb-online"),document.createTextNode("Online")),ae.append(Ae);let D=a("button","cb-close");D.type="button",D.setAttribute("aria-label","Close chat"),D.append(Ue("cb-icon cb-close-icon")),ke.append(j,ae,D);let f=a("div","cb-messages");f.setAttribute("aria-live","polite");let N=a("button","cb-scroll-bottom","\u2193");N.type="button",N.hidden=!0,N.setAttribute("aria-label","Scroll to latest message");let $=a("div","cb-chips");$.setAttribute("role","group"),$.setAttribute("aria-label","Suggested questions");let S=a("div","cb-typing-row");S.hidden=!0;let Le=a("div","cb-typing-bubble");Le.append(a("span","cb-dot"),a("span","cb-dot"),a("span","cb-dot")),S.append(a("div","cb-message-avatar",te(o.texts.botName)),Le);let F=a("span","cb-counter");F.hidden=!0;let V=a("form","cb-compose"),b=a("textarea","cb-input");b.rows=1,b.maxLength=500,b.placeholder=o.texts.inputPlaceholder,b.setAttribute("aria-label",o.texts.inputPlaceholder);let L=a("button","cb-send");L.type="submit",L.disabled=!0,L.setAttribute("aria-label","Send message"),L.append(Fe()),V.append(b,F,L),A.append(ke,f,S,$,V);let oe=a("footer","cb-footer",`Powered by ${he.name}`);oe.hidden=!o.branding.showBadge,A.append(oe),h.append(I,A),M.append(h);let X=t||document.body;X&&X!==document.body&&X.replaceChildren(),X.append(v);let U=!1,E=0,ne=0,W=!1,q="",ie="",se="",O=!1,ce=`cb-state-${r}`,ze=()=>{if(!l)try{localStorage.setItem(ce,JSON.stringify({updatedAt:Date.now(),conversationId:localStorage.getItem(`cb-conversation-${r}`)||crypto.randomUUID?.()||String(Date.now()),messages:de}))}catch{}},de=[],le=`cb-teaser-${r}`,z=()=>{f.scrollTop=f.scrollHeight},Ee=()=>f.scrollHeight-f.scrollTop-f.clientHeight<80,$e=()=>{let n=a("div","cb-message-avatar");if(o.texts.avatarUrl){let s=a("img");s.src=o.texts.avatarUrl,s.alt="",n.append(s)}else n.textContent=te(o.texts.botName);return n},P=(n,s)=>{ne+=1;let p=We(),m=a("div",`cb-message-row cb-${n}-row${n===ie&&p===se?" cb-grouped":""}`),w=a("div","cb-message-wrap"),y=a("div",`cb-message cb-${n}`);return n==="bot"?(y.classList.add("cb-markdown"),ve(y,s),m.append($e())):y.textContent=s,w.append(y,a("time","cb-timestamp",p)),m.append(w),f.append(m),s&&!l&&(de.push({kind:n,content:s,stamp:p}),ze()),ie=n,se=p,z(),{row:m,bubble:y}},B=n=>{x||U===n||(U=n,A.classList.toggle("cb-open",n),C.classList.toggle("cb-active",n),C.setAttribute("aria-expanded",String(n)),n?(T.classList.remove("cb-visible"),localStorage.setItem(le,"seen"),l||setTimeout(()=>{!x&&U&&b.focus()},210)):C.focus(),d?.(n))},be=()=>{$.replaceChildren(),o.texts.starterQuestions.forEach(n=>{let s=a("button","cb-chip",n);s.type="button",s.addEventListener("click",()=>ue(n)),$.append(s)}),$.hidden=O||!o.texts.starterQuestions.length},Pe=()=>{O||(O=!0,$.hidden=!0)},pe=()=>{b.style.height="auto",b.style.height=`${Math.min(b.scrollHeight,96)}px`;let n=b.value.length;F.hidden=n<450,F.textContent=`${n}/500`,F.classList.toggle("cb-counter-limit",n>=500)},Be=n=>{let s=a("form","cb-form");s.noValidate=!0,s.append(a("p","cb-form-title","Request an appointment"));let p=a("p","cb-form-error");p.hidden=!0,(n.fields||[]).forEach(m=>{let w=a("label","",m.label||m.name),y=a("input");y.name=m.name,y.required=!0,y.autocomplete=m.name==="phone"?"tel":"name",w.append(y),s.append(w)});let g=a("button","","Send request");g.type="submit",s.append(p,g),s.addEventListener("submit",async m=>{if(m.preventDefault(),!s.reportValidity()){p.textContent="Please complete the required fields.",p.hidden=!1;return}g.disabled=!0,p.hidden=!0;try{let w=Object.fromEntries(new FormData(s));if(!(await fetch(`${e.replace(/\/$/,"")}/api/v1/leads/${encodeURIComponent(r)}`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({conversationId:localStorage.getItem(`cb-conversation-${r}`),fields:w})})).ok)throw new Error;s.replaceWith(a("p","cb-form-success","Thanks! We'll contact you soon.")),z()}catch{g.disabled=!1,p.textContent="We could not send your request. Please try again.",p.hidden=!1}}),f.append(s),z()},ue=async n=>{if(!n.trim()||W)return;let s=E;q=n.trim(),Pe(),P("user",q),b.value="",pe(),W=!0,b.disabled=!0,L.disabled=!0,S.hidden=!1,z();let p=P("bot",""),g="";try{if(await Ne({apiBase:e,botId:r,conversationId:localStorage.getItem(`cb-conversation-${r}`),message:q,onToken:m=>{x||s!==E||(S.hidden=!0,g+=m,ve(p.bubble,g),Ee()&&z())},onLeadForm:m=>{!x&&s===E&&Be(m)}}),x||s!==E)return;g||p.row.remove()}catch(m){if(x||s!==E)return;p.bubble.classList.add("cb-error"),p.bubble.replaceChildren(document.createTextNode(m.message||"Unable to send message."));let w=a("button","cb-retry","Retry");w.type="button",w.addEventListener("click",()=>{p.row.remove(),ue(q)}),p.bubble.append(w)}finally{if(x||s!==E)return;W=!1,b.disabled=!1,b.focus(),L.disabled=!b.value.trim()||b.value.length>500,S.hidden=!0}},H,_=null;if(!l)try{let n=JSON.parse(localStorage.getItem(ce)||"null");n&&Date.now()-n.updatedAt<864e5&&Array.isArray(n.messages)&&(_=n)}catch{}_?(_.conversationId&&localStorage.setItem(`cb-conversation-${r}`,_.conversationId),_.messages.forEach(n=>{let s=P(n.kind,n.content);!H&&n.kind==="bot"&&(H=s)}),O=_.messages.some(n=>n.kind==="user")):H=P("bot",c&&o.texts.offlineMessage?o.texts.offlineMessage:o.texts.greetingMessage),k.forEach(({role:n,text:s})=>{typeof s=="string"&&s.trim()&&P(n==="user"?"user":"bot",s)}),be(),u&&B(!0),localStorage.getItem(le)||setTimeout(()=>{U||T.classList.add("cb-visible")},3e3),J.addEventListener("click",()=>{T.classList.remove("cb-visible"),localStorage.setItem(le,"seen")}),C.addEventListener("click",()=>B(!U)),D.addEventListener("click",()=>B(!1)),V.addEventListener("submit",n=>{n.preventDefault(),ue(b.value)}),b.addEventListener("input",()=>{pe(),L.disabled=W||!b.value.trim()}),b.addEventListener("keydown",n=>{n.key==="Enter"&&!n.shiftKey&&(n.preventDefault(),V.requestSubmit())}),f.addEventListener("scroll",()=>{N.hidden=Ee()}),N.addEventListener("click",z),A.append(N);let Se=n=>{n.key==="Escape"&&U&&B(!1)};return document.addEventListener("keydown",Se),{destroy(){x||(x=!0,E+=1,document.removeEventListener("keydown",Se),v.remove())},open(){B(!0)},close(){B(!1)},resetChat(){E+=1,W=!1,O=!1,ie="",se="",q="",ne=0,localStorage.removeItem(`cb-conversation-${r}`),localStorage.removeItem(ce),de.length=0,f.replaceChildren(),H=P("bot",c&&o.texts.offlineMessage?o.texts.offlineMessage:o.texts.greetingMessage),be(),b.disabled=!1,b.value="",L.disabled=!0,S.hidden=!0,pe()},update(n){if(x)return;let s=o.texts.greetingMessage,p=f.scrollTop;o=n,xe(v,o),h.classList.toggle("cb-left",o.theme.position==="left"),h.classList.toggle("cb-right",o.theme.position==="right"),C.setAttribute("aria-label",`Open ${o.texts.botName} chat`),A.setAttribute("aria-label",`${o.texts.botName} chat`),Ce.textContent=o.texts.botName;let g=o.texts.avatarUrl?a("img","cb-avatar"):a("div","cb-avatar cb-avatar-initials",te(o.texts.botName));o.texts.avatarUrl&&(g.src=o.texts.avatarUrl,g.alt=""),j.replaceWith(g),j=g,h.querySelectorAll(".cb-message-avatar").forEach(m=>{m.replaceWith($e())}),I.querySelector(".cb-launch-label")?.remove(),o.texts.launcherLabel&&I.prepend(a("span","cb-launch-label",o.texts.launcherLabel)),T.firstChild.textContent=o.texts.greetingMessage.slice(0,140),b.placeholder=o.texts.inputPlaceholder,b.setAttribute("aria-label",o.texts.inputPlaceholder),oe.hidden=!o.branding.showBadge,ne===1&&s!==o.texts.greetingMessage&&ve(H.bubble,c&&o.texts.offlineMessage?o.texts.offlineMessage:o.texts.greetingMessage),O||be(),f.scrollTop=p}}}var ye="2026-10-21-input-questions-3";var re=new Map;function qe(t){try{return t&&t.src?new URL(t.src,window.location.href).origin:window.location.origin}catch{return window.location.origin}}async function He(t={}){let r=t.script,e=t.botId||r&&r.dataset.botId;if(!e)throw new Error("ChatbotWidget requires a botId.");let i=t.container||e;if(re.has(i))return re.get(i);let c=t.apiBase||r&&r.dataset.apiBase||qe(r),u=t.config,d=!1;if(!u)try{u=await Ie(c,e)}catch{return console.warn("ChatbotWidget: configuration unavailable."),null}let l=ge(R(u,fe(r)),!!t.preview),k,v={update:M=>{l=ge(R(R(l,M),fe(r)),!!t.preview),k?.update(l)},open:()=>k?.open(),close:()=>k?.close(),resetChat:()=>k?.resetChat(),destroy(){k?.destroy(),re.delete(i)}};return k=Oe({container:t.container,botId:e,apiBase:c,config:l,defaultOpen:t.open??t.defaultOpen??!1,onOpenChange:t.onOpenChange,preview:t.preview,previewMessages:t.previewMessages}),re.set(i,v),v}window.__chatbot=window.__chatbot||{};window.ChatbotWidget=window.ChatbotWidget||{};(!window.__chatbot.init||window.ChatbotWidget.version!==ye)&&(window.__chatbot.init=He);window.ChatbotWidget.init=window.__chatbot.init;window.ChatbotWidget.version=ye;var G=document.currentScript;if(G&&G.dataset.botId){let t=()=>{G.dataset.cbLoaded||(G.dataset.cbLoaded="true",window.__chatbot.init({script:G}))};document.readyState==="loading"?document.addEventListener("DOMContentLoaded",t,{once:!0}):t()}})();
