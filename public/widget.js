var ChatbotWidgetBundle=(()=>{var ee=Object.freeze({botName:40,launcherLabel:24,greetingMessage:200,inputPlaceholder:60,offlineMessage:200,starterQuestion:60,starterQuestions:4,avatarUrl:2048}),Ae=/^#(?:[0-9a-f]{3}|[0-9a-f]{6})$/i;var H={theme:{primaryColor:"#4F46E5",mode:"light",position:"right",borderRadius:16,fontFamily:"system"},texts:{botName:"Assistant",avatarUrl:"",greetingMessage:"Hi! How can I help?",inputPlaceholder:"Type your question...",launcherLabel:"",starterQuestions:[],offlineMessage:""},features:{leadCapture:!0,dentalNotice:!1},branding:{showBadge:!0,badgeText:""},contactText:"the office",dir:"",zIndex:2147483647},te={system:'Inter, var(--font-inter, system-ui), -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',sans:"Arial, Helvetica, sans-serif",serif:"Georgia, serif",mono:"ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace"},me=(t,e,r)=>typeof t=="string"?t.slice(0,r):e;function D(t,e){let r={...t};return Object.keys(e||{}).forEach(i=>{r[i]=e[i]&&typeof e[i]=="object"&&!Array.isArray(e[i])?D(t[i]||{},e[i]):e[i]}),r}function ge(t){let e=D(H,t||{});return e.theme.primaryColor=Ae.test(e.theme.primaryColor)?e.theme.primaryColor:H.theme.primaryColor,e.theme.mode=["light","dark","auto"].includes(e.theme.mode)?e.theme.mode:"light",e.theme.position=e.theme.position==="left"?"left":"right",e.theme.borderRadius=Math.max(0,Math.min(28,Number.isFinite(Number(e.theme.borderRadius))?Number(e.theme.borderRadius):H.theme.borderRadius)),e.theme.fontFamily=te[e.theme.fontFamily]?te[e.theme.fontFamily]:Object.values(te).includes(e.theme.fontFamily)?e.theme.fontFamily:te.system,Object.keys(H.texts).forEach(r=>{r!=="starterQuestions"&&(e.texts[r]=me(e.texts[r],H.texts[r],ee[r]))}),e.texts.avatarUrl=/^https:\/\//i.test(e.texts.avatarUrl)?e.texts.avatarUrl:"",e.texts.starterQuestions=Array.isArray(e.texts.starterQuestions)?e.texts.starterQuestions.filter(r=>typeof r=="string").slice(0,ee.starterQuestions).map(r=>r.slice(0,ee.starterQuestion)):[],e.features.leadCapture=!!e.features.leadCapture,e.features.dentalNotice=!!e.features.dentalNotice,e.branding.showBadge=!!e.branding.showBadge,e.branding.badgeText=me(e.branding.badgeText,"",80),e.contactText=me(e.contactText,"the office",120),e.dir=e.dir==="rtl"?"rtl":"",e.zIndex=Math.max(1,Math.min(2147483647,Number(e.zIndex)||2147483647)),e}function fe(t){if(!t)return{};let e={},r={};return t.dataset.primaryColor!==void 0&&(e.primaryColor=t.dataset.primaryColor),t.dataset.position!==void 0&&(e.position=t.dataset.position),t.dataset.greeting!==void 0&&(r.greetingMessage=t.dataset.greeting),t.dataset.botName!==void 0&&(r.botName=t.dataset.botName),{theme:e,texts:r}}async function Te(t,e){let r=`cb-config-${e}`;try{let p=JSON.parse(sessionStorage.getItem(r)||"null");if(p&&p.expires>Date.now())return p.config}catch{}let i=await fetch(`${t.replace(/\/$/,"")}/api/widget/config/${encodeURIComponent(e)}`,{headers:{Accept:"application/json"}});if(!i.ok)throw new Error("Configuration unavailable");let d=await i.json();try{sessionStorage.setItem(r,JSON.stringify({config:d,expires:Date.now()+6e4}))}catch{}return d}var Ie=`
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
.cb-embedded.cb-left { left: 16px; right: auto; }
.cb-preview { position: absolute; inset: 0; }
.cb-preview .cb-launch-area { position: absolute; right: 16px; bottom: 16px; }
.cb-preview.cb-left .cb-launch-area { right: auto; left: 16px; }
.cb-preview .cb-window { width: min(380px, calc(100% - 32px)); height: min(560px, calc(100% - 92px)); max-width: none; max-height: none; }
.cb-fixed {
  position: fixed;
  bottom: max(24px, env(safe-area-inset-bottom));
  z-index: var(--cb-z, 2147483647);
}
.cb-left {
  left: max(24px, env(safe-area-inset-left));
}
.cb-right {
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
.cb-header-action {
  flex: none;
  border: 1px solid rgba(255,255,255,.32);
  border-radius: calc(var(--cb-radius) * .72);
  padding: 7px 8px;
  color: inherit;
  background: rgba(255,255,255,.12);
  font-size: 11px;
}
.cb-header-action:hover { background: rgba(255,255,255,.24); }
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
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
  padding: 4px 20px 20px;
  background: var(--cb-surface);
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
  .cb-left {
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
`;function Qe(t){let e=(t.match(/^event:\s*(.+)$/m)||[])[1]||"message",r=(t.match(/^data:\s*(.+)$/m)||[])[1]||"";try{return{event:e,data:JSON.parse(r)}}catch{return{event:e,data:r}}}async function Ne({apiBase:t,botId:e,conversationId:r,message:i,onToken:d,onLeadForm:p}){let l=await fetch(`${t.replace(/\/$/,"")}/api/chat/${encodeURIComponent(e)}`,{method:"POST",headers:{"Content-Type":"application/json",Accept:"text/event-stream"},body:JSON.stringify({conversationId:r,message:i})});if(!l.ok||!l.body)throw new Error("Chat is temporarily unavailable.");let u=l.body.getReader(),h=new TextDecoder,n="";for(;;){let{done:v,value:E}=await u.read();if(v)break;n+=h.decode(E,{stream:!0});let R=n.split(/\n\n/);n=R.pop(),R.forEach(g=>{let y=Qe(g);y.event==="token"&&d(y.data.token||""),y.event==="lead_form"&&p(y.data),y.event==="conversation"&&localStorage.setItem(`cb-conversation-${e}`,y.data.conversationId)})}}function De(t){let e=t.length===4?`#${t[1]}${t[1]}${t[2]}${t[2]}${t[3]}${t[3]}`:t,r=[1,3,5].map(i=>parseInt(e.slice(i,i+2),16)/255).map(i=>i<=.03928?i/12.92:((i+.055)/1.055)**2.4);return r[0]*.2126+r[1]*.7152+r[2]*.0722>.179?"#18181b":"#ffffff"}function xe(t,e){let r=e.theme.mode==="dark"||e.theme.mode==="auto"&&window.matchMedia?.("(prefers-color-scheme: dark)").matches;t.style.setProperty("--cb-primary",e.theme.primaryColor),t.style.setProperty("--cb-on-primary",De(e.theme.primaryColor)),t.style.setProperty("--cb-bg",r?"#202023":"#ffffff"),t.style.setProperty("--cb-surface",r?"#18181b":"#fafafa"),t.style.setProperty("--cb-text",r?"#f4f4f5":"#18181b"),t.style.setProperty("--cb-muted",r?"#a1a1aa":"#71717a"),t.style.setProperty("--cb-success",r?"#6ee7b7":"#047857"),t.style.setProperty("--cb-danger",r?"#fca5a5":"#dc2626"),t.style.setProperty("--cb-radius",`${e.theme.borderRadius}px`),t.style.setProperty("--cb-font",e.theme.fontFamily),t.style.setProperty("--cb-z",String(e.zIndex||2147483647))}var he={name:"YourBrand",tagline:"AI assistant for websites that answers questions and captures leads.",domain:"yourbrand.example",supportEmail:"support@yourbrand.example",legalName:"YourBrand LLC",defaultTitle:"YourBrand | AI assistant for your website",description:"Add an AI assistant to your website to answer visitor questions, capture leads, and book appointments without code."},{name:Ke,tagline:Ve,domain:Ze,supportEmail:et,legalName:tt,defaultTitle:rt,description:at}=he;var o=(t,e,r)=>{let i=document.createElement(t);return e&&(i.className=e),r!==void 0&&(i.textContent=r),i},ye=(t,e="")=>{let r=document.createElementNS("http://www.w3.org/2000/svg","svg");return r.setAttribute("viewBox","0 0 24 24"),r.setAttribute("aria-hidden","true"),e&&r.setAttribute("class",e),t.forEach(i=>{let d=document.createElementNS("http://www.w3.org/2000/svg",i.tag||"path");Object.keys(i).forEach(p=>{p!=="tag"&&d.setAttribute(p,i[p])}),r.append(d)}),r},Re=()=>ye([{d:"M20 11.5a7.5 7.5 0 0 1-7.8 7.49 8.7 8.7 0 0 1-3.12-.58L4 20l1.5-4.2A7.25 7.25 0 0 1 4 11.5 7.5 7.5 0 0 1 11.75 4 7.5 7.5 0 0 1 20 11.5Z"},{d:"M8.5 11.5h.01M12 11.5h.01M15.5 11.5h.01"}],"cb-icon cb-icon-chat"),ze=(t="cb-icon cb-icon-close")=>ye([{d:"m7 7 10 10M17 7 7 17"}],t),je=()=>ye([{d:"M12 19V5M6.5 10.5 12 5l5.5 5.5"}]),G=t=>t.split(/\s+/).filter(Boolean).slice(0,2).map(e=>e[0]).join("").toUpperCase()||"AI",_e=()=>new Intl.DateTimeFormat(void 0,{hour:"numeric",minute:"2-digit"}).format(new Date);function ve(t,e){t.replaceChildren();let r=(d,p)=>p.split(/(\*\*[^*]+\*\*|\*[^*]+\*|https?:\/\/[^\s]+)/g).forEach(l=>{if(l)if(/^\*\*[^*]+\*\*$/.test(l))d.append(o("strong","",l.slice(2,-2)));else if(/^\*[^*]+\*$/.test(l))d.append(o("em","",l.slice(1,-1)));else if(/^https?:\/\//.test(l)){let u=o("a","",l);u.href=l,u.target="_blank",u.rel="noopener noreferrer",d.append(u)}else d.append(document.createTextNode(l))}),i;String(e||"").split(`
`).forEach(d=>{let p=/^\s*[-*]\s+(.+)$/.exec(d);if(p){i||(i=o("ul"),t.append(i));let l=o("li");r(l,p[1]),i.append(l)}else{i=null;let l=o("p");r(l,d),t.append(l)}})}function Oe({container:t,botId:e,apiBase:r,config:i,failed:d,defaultOpen:p,onOpenChange:l,preview:u=!1,previewMessages:h=[]}){let n=i,v=o("div","cb-host");t&&v.classList.add("cb-embedded-host");let E=v.attachShadow({mode:"open"}),R=o("style"),g=!1;R.textContent=Ie,E.append(R),xe(v,n);let y=o("div",`cb-root ${t?"cb-embedded":"cb-fixed"}${u?" cb-preview":""} cb-${n.theme.position}`),N=o("div","cb-launch-area"),C=o("button","cb-launcher");C.type="button",C.setAttribute("aria-label",`Open ${n.texts.botName} chat`),C.setAttribute("aria-expanded","false"),C.append(Re(),ze()),n.texts.launcherLabel&&N.append(o("span","cb-launch-label",n.texts.launcherLabel)),N.append(C);let z=o("div","cb-teaser",n.texts.greetingMessage.slice(0,140)),X=o("button","cb-teaser-close","\xD7");X.type="button",X.setAttribute("aria-label","Dismiss greeting"),z.append(X),N.append(z);let L=o("section","cb-window");L.setAttribute("role","dialog"),L.setAttribute("aria-label",`${n.texts.botName} chat`),L.setAttribute("aria-modal","true");let we=o("header","cb-header"),j=n.texts.avatarUrl?o("img","cb-avatar"):o("div","cb-avatar cb-avatar-initials",G(n.texts.botName));n.texts.avatarUrl&&(j.src=n.texts.avatarUrl,j.alt="");let ae=o("div","cb-head-copy"),ke=o("div","cb-title",n.texts.botName);ae.append(ke);let Ce=o("div","cb-presence");Ce.append(o("span","cb-online"),document.createTextNode("Online")),ae.append(Ce);let K=o("button","cb-header-action","Reset");K.type="button",K.setAttribute("aria-label","Reset chat");let _=o("button","cb-close");_.type="button",_.setAttribute("aria-label","Close chat"),_.append(ze("cb-icon cb-close-icon")),we.append(j,ae,K,_);let f=o("div","cb-messages");f.setAttribute("aria-live","polite");let O=o("button","cb-scroll-bottom","\u2193");O.type="button",O.hidden=!0,O.setAttribute("aria-label","Scroll to latest message");let I=o("div","cb-chips");f.append(I);let $=o("div","cb-typing-row");$.hidden=!0;let $e=o("div","cb-typing-bubble");$e.append(o("span","cb-dot"),o("span","cb-dot"),o("span","cb-dot")),$.append(o("div","cb-message-avatar",G(n.texts.botName)),$e);let F=o("span","cb-counter");F.hidden=!0;let V=o("form","cb-compose"),c=o("textarea","cb-input");c.rows=1,c.maxLength=500,c.placeholder=n.texts.inputPlaceholder,c.setAttribute("aria-label",n.texts.inputPlaceholder);let M=o("button","cb-send");M.type="submit",M.disabled=!0,M.setAttribute("aria-label","Send message"),M.append(je()),V.append(c,F,M),L.append(we,f,$,V);let oe=o("footer","cb-footer",`Powered by ${he.name}`);oe.hidden=!n.branding.showBadge,L.append(oe),y.append(N,L),E.append(y);let Z=t||document.body;Z&&Z!==document.body&&Z.replaceChildren(),Z.append(v);let U=!1,S=0,ne=0,q=!1,W="",ie="",se="",B=!1,ce=`cb-state-${e}`,Ue=()=>{if(!u)try{localStorage.setItem(ce,JSON.stringify({updatedAt:Date.now(),conversationId:localStorage.getItem(`cb-conversation-${e}`)||crypto.randomUUID?.()||String(Date.now()),messages:de}))}catch{}},de=[],le=`cb-teaser-${e}`,A=()=>{f.scrollTop=f.scrollHeight},Le=()=>f.scrollHeight-f.scrollTop-f.clientHeight<80,Be=()=>{let a=o("div","cb-message-avatar");if(n.texts.avatarUrl){let s=o("img");s.src=n.texts.avatarUrl,s.alt="",a.append(s)}else a.textContent=G(n.texts.botName);return a},T=(a,s)=>{ne+=1;let b=_e(),m=o("div",`cb-message-row cb-${a}-row${a===ie&&b===se?" cb-grouped":""}`),w=o("div","cb-message-wrap"),k=o("div",`cb-message cb-${a}`);return a==="bot"?(k.classList.add("cb-markdown"),ve(k,s),m.append(Be())):k.textContent=s,w.append(k,o("time","cb-timestamp",b)),m.append(w),f.insertBefore(m,I),s&&!u&&(de.push({kind:a,content:s,stamp:b}),Ue()),ie=a,se=b,A(),{row:m,bubble:k}},P=a=>{g||U===a||(U=a,L.classList.toggle("cb-open",a),C.classList.toggle("cb-active",a),C.setAttribute("aria-expanded",String(a)),a?(z.classList.remove("cb-visible"),localStorage.setItem(le,"seen"),u||setTimeout(()=>{!g&&U&&c.focus()},210)):C.focus(),l?.(a))},be=()=>{I.replaceChildren(),n.texts.starterQuestions.forEach(a=>{let s=o("button","cb-chip",a);s.type="button",s.addEventListener("click",()=>ue(a)),I.append(s)}),I.hidden=B||!n.texts.starterQuestions.length},Me=()=>{B||(B=!0,I.hidden=!0)},pe=()=>{c.style.height="auto",c.style.height=`${Math.min(c.scrollHeight,96)}px`;let a=c.value.length;F.hidden=a<450,F.textContent=`${a}/500`,F.classList.toggle("cb-counter-limit",a>=500)},Pe=a=>{let s=o("form","cb-form");s.noValidate=!0,s.append(o("p","cb-form-title","Request an appointment"));let b=o("p","cb-form-error");b.hidden=!0,(a.fields||[]).forEach(m=>{let w=o("label","",m.label||m.name),k=o("input");k.name=m.name,k.required=!0,k.autocomplete=m.name==="phone"?"tel":"name",w.append(k),s.append(w)});let x=o("button","","Send request");x.type="submit",s.append(b,x),s.addEventListener("submit",async m=>{if(m.preventDefault(),!s.reportValidity()){b.textContent="Please complete the required fields.",b.hidden=!1;return}x.disabled=!0,b.hidden=!0;try{let w=Object.fromEntries(new FormData(s));if(!(await fetch(`${r.replace(/\/$/,"")}/api/leads/${encodeURIComponent(e)}`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({conversationId:localStorage.getItem(`cb-conversation-${e}`),fields:w})})).ok)throw new Error;s.replaceWith(o("p","cb-form-success","Thanks! We'll contact you soon.")),A()}catch{x.disabled=!1,b.textContent="We could not send your request. Please try again.",b.hidden=!1}}),f.append(s),A()},ue=async a=>{if(!a.trim()||q)return;let s=S;W=a.trim(),Me(),T("user",W),c.value="",pe(),q=!0,c.disabled=!0,M.disabled=!0,$.hidden=!1,A();let b=T("bot",""),x="";try{if(await Ne({apiBase:r,botId:e,conversationId:localStorage.getItem(`cb-conversation-${e}`),message:W,onToken:m=>{g||s!==S||($.hidden=!0,x+=m,ve(b.bubble,x),Le()&&A())},onLeadForm:m=>{!g&&s===S&&Pe(m)}}),g||s!==S)return;x||b.row.remove()}catch(m){if(g||s!==S)return;b.bubble.classList.add("cb-error"),b.bubble.replaceChildren(document.createTextNode(m.message||"Unable to send message."));let w=o("button","cb-retry","Retry");w.type="button",w.addEventListener("click",()=>{b.row.remove(),ue(W)}),b.bubble.append(w)}finally{if(g||s!==S)return;q=!1,c.disabled=!1,c.focus(),M.disabled=!c.value.trim()||c.value.length>500,$.hidden=!0}},Y,Q=null;if(!u)try{let a=JSON.parse(localStorage.getItem(ce)||"null");a&&Date.now()-a.updatedAt<864e5&&Array.isArray(a.messages)&&(Q=a)}catch{}Q?(Q.conversationId&&localStorage.setItem(`cb-conversation-${e}`,Q.conversationId),Q.messages.forEach(a=>{let s=T(a.kind,a.content);!Y&&a.kind==="bot"&&(Y=s)}),B=Q.messages.some(a=>a.kind==="user")):Y=T("bot",d&&n.texts.offlineMessage?n.texts.offlineMessage:n.texts.greetingMessage),h.forEach(({role:a,text:s})=>{typeof s=="string"&&s.trim()&&T(a==="user"?"user":"bot",s)}),be(),p&&P(!0),localStorage.getItem(le)||setTimeout(()=>{U||z.classList.add("cb-visible")},3e3),X.addEventListener("click",()=>{z.classList.remove("cb-visible"),localStorage.setItem(le,"seen")}),C.addEventListener("click",()=>P(!U)),_.addEventListener("click",()=>P(!1)),K.addEventListener("click",()=>Se.resetChat()),V.addEventListener("submit",a=>{a.preventDefault(),ue(c.value)}),c.addEventListener("input",()=>{pe(),M.disabled=q||!c.value.trim()}),c.addEventListener("keydown",a=>{a.key==="Enter"&&!a.shiftKey&&(a.preventDefault(),V.requestSubmit())}),f.addEventListener("scroll",()=>{O.hidden=Le()}),O.addEventListener("click",A),L.append(O);let Ee=a=>{a.key==="Escape"&&U&&P(!1)};document.addEventListener("keydown",Ee);let Se={destroy(){g||(g=!0,S+=1,document.removeEventListener("keydown",Ee),v.remove())},open(){P(!0)},close(){P(!1)},resetChat(){S+=1,q=!1,B=!1,ie="",se="",W="",ne=0,localStorage.removeItem(`cb-conversation-${e}`),localStorage.removeItem(ce),de.length=0,f.replaceChildren(I),Y=T("bot",d&&n.texts.offlineMessage?n.texts.offlineMessage:n.texts.greetingMessage),be(),c.disabled=!1,c.value="",M.disabled=!0,$.hidden=!0,pe()},playDemo({user:a,reply:s}){this.resetChat(),!(!a||!s)&&window.setTimeout(()=>{g||(Me(),T("user",a),$.hidden=!1,A(),window.setTimeout(()=>{g||($.hidden=!0,T("bot",s),A())},650))},180)},update(a){if(g)return;let s=n.texts.greetingMessage,b=f.scrollTop;n=a,xe(v,n),y.classList.toggle("cb-left",n.theme.position==="left"),y.classList.toggle("cb-right",n.theme.position==="right"),C.setAttribute("aria-label",`Open ${n.texts.botName} chat`),L.setAttribute("aria-label",`${n.texts.botName} chat`),ke.textContent=n.texts.botName;let x=n.texts.avatarUrl?o("img","cb-avatar"):o("div","cb-avatar cb-avatar-initials",G(n.texts.botName));n.texts.avatarUrl&&(x.src=n.texts.avatarUrl,x.alt=""),j.replaceWith(x),j=x,$.querySelector(".cb-message-avatar").textContent=G(n.texts.botName),N.querySelector(".cb-launch-label")?.remove(),n.texts.launcherLabel&&N.prepend(o("span","cb-launch-label",n.texts.launcherLabel)),z.firstChild.textContent=n.texts.greetingMessage.slice(0,140),c.placeholder=n.texts.inputPlaceholder,c.setAttribute("aria-label",n.texts.inputPlaceholder),oe.hidden=!n.branding.showBadge,ne===1&&s!==n.texts.greetingMessage&&ve(Y.bubble,d&&n.texts.offlineMessage?n.texts.offlineMessage:n.texts.greetingMessage),B||be(),f.scrollTop=b}};return Se}var re=new Map;function Fe(t){try{return t&&t.src?new URL(t.src,window.location.href).origin:window.location.origin}catch{return window.location.origin}}async function qe(t={}){let e=t.script,r=t.botId||e&&e.dataset.botId;if(!r)throw new Error("ChatbotWidget requires a botId.");let i=t.container||r;if(re.has(i))return re.get(i);let d=t.apiBase||e&&e.dataset.apiBase||Fe(e),p=t.config,l=!1;if(!p)try{p=await Te(d,r)}catch{return console.warn("ChatbotWidget: configuration unavailable."),null}let u=ge(D(p,fe(e))),h,v={update:E=>{u=ge(D(D(u,E),fe(e))),h?.update(u)},open:()=>h?.open(),close:()=>h?.close(),resetChat:()=>h?.resetChat(),playDemo:E=>h?.playDemo(E),destroy(){h?.destroy(),re.delete(i)}};return h=Oe({container:t.container,botId:r,apiBase:d,config:u,defaultOpen:t.open??t.defaultOpen??!1,onOpenChange:t.onOpenChange,preview:t.preview,previewMessages:t.previewMessages}),re.set(i,v),v}window.__chatbot=window.__chatbot||{};window.ChatbotWidget=window.ChatbotWidget||{};window.__chatbot.init||(window.__chatbot.init=qe);window.ChatbotWidget.init=window.__chatbot.init;var J=document.currentScript;if(J&&J.dataset.botId){let t=()=>{J.dataset.cbLoaded||(J.dataset.cbLoaded="true",window.__chatbot.init({script:J}))};document.readyState==="loading"?document.addEventListener("DOMContentLoaded",t,{once:!0}):t()}})();
