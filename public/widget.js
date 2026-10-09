var ChatbotWidgetBundle=(()=>{var ee=Object.freeze({botName:40,launcherLabel:24,greetingMessage:200,inputPlaceholder:60,offlineMessage:200,starterQuestion:60,starterQuestions:4,avatarUrl:2048}),Se=/^#(?:[0-9a-f]{3}|[0-9a-f]{6})$/i;var H={theme:{primaryColor:"#4F46E5",mode:"light",position:"right",borderRadius:16,fontFamily:"system"},texts:{botName:"Assistant",avatarUrl:"",greetingMessage:"Hi! How can I help?",inputPlaceholder:"Type your question...",launcherLabel:"",starterQuestions:[],offlineMessage:""},features:{leadCapture:!0,dentalNotice:!1},branding:{showBadge:!0,badgeText:""},contactText:"the office",dir:"",zIndex:2147483647},te={system:'Inter, var(--font-inter, system-ui), -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',sans:"Arial, Helvetica, sans-serif",serif:"Georgia, serif",mono:"ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace"},ue=(t,e,r)=>typeof t=="string"?t.slice(0,r):e;function R(t,e){let r={...t};return Object.keys(e||{}).forEach(i=>{r[i]=e[i]&&typeof e[i]=="object"&&!Array.isArray(e[i])?R(t[i]||{},e[i]):e[i]}),r}function ge(t){let e=R(H,t||{});return e.theme.primaryColor=Se.test(e.theme.primaryColor)?e.theme.primaryColor:H.theme.primaryColor,e.theme.mode=["light","dark","auto"].includes(e.theme.mode)?e.theme.mode:"light",e.theme.position=e.theme.position==="left"?"left":"right",e.theme.borderRadius=Math.max(0,Math.min(28,Number.isFinite(Number(e.theme.borderRadius))?Number(e.theme.borderRadius):H.theme.borderRadius)),e.theme.fontFamily=te[e.theme.fontFamily]?te[e.theme.fontFamily]:Object.values(te).includes(e.theme.fontFamily)?e.theme.fontFamily:te.system,Object.keys(H.texts).forEach(r=>{r!=="starterQuestions"&&(e.texts[r]=ue(e.texts[r],H.texts[r],ee[r]))}),e.texts.avatarUrl=/^https:\/\//i.test(e.texts.avatarUrl)?e.texts.avatarUrl:"",e.texts.starterQuestions=Array.isArray(e.texts.starterQuestions)?e.texts.starterQuestions.filter(r=>typeof r=="string").slice(0,ee.starterQuestions).map(r=>r.slice(0,ee.starterQuestion)):[],e.features.leadCapture=!!e.features.leadCapture,e.features.dentalNotice=!!e.features.dentalNotice,e.branding.showBadge=!!e.branding.showBadge,e.branding.badgeText=ue(e.branding.badgeText,"",80),e.contactText=ue(e.contactText,"the office",120),e.dir=e.dir==="rtl"?"rtl":"",e.zIndex=Math.max(1,Math.min(2147483647,Number(e.zIndex)||2147483647)),e}function fe(t){if(!t)return{};let e={},r={};return t.dataset.primaryColor!==void 0&&(e.primaryColor=t.dataset.primaryColor),t.dataset.position!==void 0&&(e.position=t.dataset.position),t.dataset.greeting!==void 0&&(r.greetingMessage=t.dataset.greeting),t.dataset.botName!==void 0&&(r.botName=t.dataset.botName),{theme:e,texts:r}}async function Ae(t,e){let r=`cb-config-${e}`;try{let c=JSON.parse(sessionStorage.getItem(r)||"null");if(c&&c.expires>Date.now())return c.config}catch{}let i=await fetch(`${t.replace(/\/$/,"")}/api/v1/widget/config/${encodeURIComponent(e)}`,{headers:{Accept:"application/json"}});if(!i.ok)throw new Error("Configuration unavailable");let l=await i.json(),p=l.data||l;try{sessionStorage.setItem(r,JSON.stringify({config:p,expires:Date.now()+6e4}))}catch{}return p}var Te=`
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
`;function Qe(t){let e=(t.match(/^event:\s*(.+)$/m)||[])[1]||"message",r=(t.match(/^data:\s*(.+)$/m)||[])[1]||"";try{return{event:e,data:JSON.parse(r)}}catch{return{event:e,data:r}}}async function Ie({apiBase:t,botId:e,conversationId:r,message:i,onToken:l,onLeadForm:p}){let c=await fetch(`${t.replace(/\/$/,"")}/api/v1/chat/${encodeURIComponent(e)}`,{method:"POST",headers:{"Content-Type":"application/json",Accept:"text/event-stream"},body:JSON.stringify({conversationId:r,message:i})});if(!c.ok||!c.body)throw new Error("Chat is temporarily unavailable.");let m=c.body.getReader(),k=new TextDecoder,o="";for(;;){let{done:h,value:A}=await m.read();if(h)break;o+=k.decode(A,{stream:!0});let j=o.split(/\n\n/);o=j.pop(),j.forEach(x=>{let v=Qe(x);v.event==="token"&&l(v.data.token||""),v.event==="lead_form"&&p(v.data),v.event==="conversation"&&localStorage.setItem(`cb-conversation-${e}`,v.data.conversationId)})}}function Re(t){let e=t.length===4?`#${t[1]}${t[1]}${t[2]}${t[2]}${t[3]}${t[3]}`:t,r=[1,3,5].map(i=>parseInt(e.slice(i,i+2),16)/255).map(i=>i<=.03928?i/12.92:((i+.055)/1.055)**2.4);return r[0]*.2126+r[1]*.7152+r[2]*.0722>.179?"#18181b":"#ffffff"}function xe(t,e){let r=e.theme.mode==="dark"||e.theme.mode==="auto"&&window.matchMedia?.("(prefers-color-scheme: dark)").matches;t.style.setProperty("--cb-primary",e.theme.primaryColor),t.style.setProperty("--cb-on-primary",Re(e.theme.primaryColor)),t.style.setProperty("--cb-bg",r?"#202023":"#ffffff"),t.style.setProperty("--cb-surface",r?"#18181b":"#fafafa"),t.style.setProperty("--cb-text",r?"#f4f4f5":"#18181b"),t.style.setProperty("--cb-muted",r?"#a1a1aa":"#71717a"),t.style.setProperty("--cb-success",r?"#6ee7b7":"#047857"),t.style.setProperty("--cb-danger",r?"#fca5a5":"#dc2626"),t.style.setProperty("--cb-radius",`${e.theme.borderRadius}px`),t.style.setProperty("--cb-font",e.theme.fontFamily),t.style.setProperty("--cb-z",String(e.zIndex||2147483647))}var he={name:"YourBrand",tagline:"AI assistant for websites that answers questions and captures leads.",domain:"yourbrand.example",supportEmail:"support@yourbrand.example",legalName:"YourBrand LLC",defaultTitle:"YourBrand | AI assistant for your website",description:"Add an AI assistant to your website to answer visitor questions, capture leads, and book appointments without code."},{name:Ke,tagline:Ve,domain:Ze,supportEmail:et,legalName:tt,defaultTitle:rt,description:at}=he;var a=(t,e,r)=>{let i=document.createElement(t);return e&&(i.className=e),r!==void 0&&(i.textContent=r),i},ye=(t,e="")=>{let r=document.createElementNS("http://www.w3.org/2000/svg","svg");return r.setAttribute("viewBox","0 0 24 24"),r.setAttribute("aria-hidden","true"),e&&r.setAttribute("class",e),t.forEach(i=>{let l=document.createElementNS("http://www.w3.org/2000/svg",i.tag||"path");Object.keys(i).forEach(p=>{p!=="tag"&&l.setAttribute(p,i[p])}),r.append(l)}),r},je=()=>ye([{d:"M20 11.5a7.5 7.5 0 0 1-7.8 7.49 8.7 8.7 0 0 1-3.12-.58L4 20l1.5-4.2A7.25 7.25 0 0 1 4 11.5 7.5 7.5 0 0 1 11.75 4 7.5 7.5 0 0 1 20 11.5Z"},{d:"M8.5 11.5h.01M12 11.5h.01M15.5 11.5h.01"}],"cb-icon cb-icon-chat"),Ne=(t="cb-icon cb-icon-close")=>ye([{d:"m7 7 10 10M17 7 7 17"}],t),_e=()=>ye([{d:"M12 19V5M6.5 10.5 12 5l5.5 5.5"}]),G=t=>t.split(/\s+/).filter(Boolean).slice(0,2).map(e=>e[0]).join("").toUpperCase()||"AI",De=()=>new Intl.DateTimeFormat(void 0,{hour:"numeric",minute:"2-digit"}).format(new Date);function ve(t,e){t.replaceChildren();let r=(l,p)=>p.split(/(\*\*[^*]+\*\*|\*[^*]+\*|https?:\/\/[^\s]+)/g).forEach(c=>{if(c)if(/^\*\*[^*]+\*\*$/.test(c))l.append(a("strong","",c.slice(2,-2)));else if(/^\*[^*]+\*$/.test(c))l.append(a("em","",c.slice(1,-1)));else if(/^https?:\/\//.test(c)){let m=a("a","",c);m.href=c,m.target="_blank",m.rel="noopener noreferrer",l.append(m)}else l.append(document.createTextNode(c))}),i;String(e||"").split(`
`).forEach(l=>{let p=/^\s*[-*]\s+(.+)$/.exec(l);if(p){i||(i=a("ul"),t.append(i));let c=a("li");r(c,p[1]),i.append(c)}else{i=null;let c=a("p");r(c,l),t.append(c)}})}function ze({container:t,botId:e,apiBase:r,config:i,failed:l,defaultOpen:p,onOpenChange:c,preview:m=!1,previewMessages:k=[]}){let o=i,h=a("div","cb-host");t&&h.classList.add("cb-embedded-host");let A=h.attachShadow({mode:"open"}),j=a("style"),x=!1;j.textContent=Te,A.append(j),xe(h,o);let v=a("div",`cb-root ${t?"cb-embedded":"cb-fixed"}${m?" cb-preview":""} cb-${o.theme.position}`),T=a("div","cb-launch-area"),C=a("button","cb-launcher");C.type="button",C.setAttribute("aria-label",`Open ${o.texts.botName} chat`),C.setAttribute("aria-expanded","false"),C.append(je(),Ne()),o.texts.launcherLabel&&T.append(a("span","cb-launch-label",o.texts.launcherLabel)),T.append(C);let I=a("div","cb-teaser",o.texts.greetingMessage.slice(0,140)),X=a("button","cb-teaser-close","\xD7");X.type="button",X.setAttribute("aria-label","Dismiss greeting"),I.append(X),T.append(I);let $=a("section","cb-window");$.setAttribute("role","dialog"),$.setAttribute("aria-label",`${o.texts.botName} chat`),$.setAttribute("aria-modal","true");let we=a("header","cb-header"),_=o.texts.avatarUrl?a("img","cb-avatar"):a("div","cb-avatar cb-avatar-initials",G(o.texts.botName));o.texts.avatarUrl&&(_.src=o.texts.avatarUrl,_.alt="");let ae=a("div","cb-head-copy"),ke=a("div","cb-title",o.texts.botName);ae.append(ke);let Ce=a("div","cb-presence");Ce.append(a("span","cb-online"),document.createTextNode("Online")),ae.append(Ce);let K=a("button","cb-header-action","Reset");K.type="button",K.setAttribute("aria-label","Reset chat");let D=a("button","cb-close");D.type="button",D.setAttribute("aria-label","Close chat"),D.append(Ne("cb-icon cb-close-icon")),we.append(_,ae,K,D);let g=a("div","cb-messages");g.setAttribute("aria-live","polite");let N=a("button","cb-scroll-bottom","\u2193");N.type="button",N.hidden=!0,N.setAttribute("aria-label","Scroll to latest message");let S=a("div","cb-chips");g.append(S);let M=a("div","cb-typing-row");M.hidden=!0;let $e=a("div","cb-typing-bubble");$e.append(a("span","cb-dot"),a("span","cb-dot"),a("span","cb-dot")),M.append(a("div","cb-message-avatar",G(o.texts.botName)),$e);let F=a("span","cb-counter");F.hidden=!0;let V=a("form","cb-compose"),d=a("textarea","cb-input");d.rows=1,d.maxLength=500,d.placeholder=o.texts.inputPlaceholder,d.setAttribute("aria-label",o.texts.inputPlaceholder);let L=a("button","cb-send");L.type="submit",L.disabled=!0,L.setAttribute("aria-label","Send message"),L.append(_e()),V.append(d,F,L),$.append(we,g,M,V);let oe=a("footer","cb-footer",`Powered by ${he.name}`);oe.hidden=!o.branding.showBadge,$.append(oe),v.append(T,$),A.append(v);let Z=t||document.body;Z&&Z!==document.body&&Z.replaceChildren(),Z.append(h);let z=!1,E=0,ne=0,q=!1,W="",ie="",se="",O=!1,ce=`cb-state-${e}`,Oe=()=>{if(!m)try{localStorage.setItem(ce,JSON.stringify({updatedAt:Date.now(),conversationId:localStorage.getItem(`cb-conversation-${e}`)||crypto.randomUUID?.()||String(Date.now()),messages:de}))}catch{}},de=[],le=`cb-teaser-${e}`,U=()=>{g.scrollTop=g.scrollHeight},Le=()=>g.scrollHeight-g.scrollTop-g.clientHeight<80,Ue=()=>{let n=a("div","cb-message-avatar");if(o.texts.avatarUrl){let s=a("img");s.src=o.texts.avatarUrl,s.alt="",n.append(s)}else n.textContent=G(o.texts.botName);return n},B=(n,s)=>{ne+=1;let b=De(),u=a("div",`cb-message-row cb-${n}-row${n===ie&&b===se?" cb-grouped":""}`),y=a("div","cb-message-wrap"),w=a("div",`cb-message cb-${n}`);return n==="bot"?(w.classList.add("cb-markdown"),ve(w,s),u.append(Ue())):w.textContent=s,y.append(w,a("time","cb-timestamp",b)),u.append(y),g.insertBefore(u,S),s&&!m&&(de.push({kind:n,content:s,stamp:b}),Oe()),ie=n,se=b,U(),{row:u,bubble:w}},P=n=>{x||z===n||(z=n,$.classList.toggle("cb-open",n),C.classList.toggle("cb-active",n),C.setAttribute("aria-expanded",String(n)),n?(I.classList.remove("cb-visible"),localStorage.setItem(le,"seen"),m||setTimeout(()=>{!x&&z&&d.focus()},210)):C.focus(),c?.(n))},be=()=>{S.replaceChildren(),o.texts.starterQuestions.forEach(n=>{let s=a("button","cb-chip",n);s.type="button",s.addEventListener("click",()=>me(n)),S.append(s)}),S.hidden=O||!o.texts.starterQuestions.length},Be=()=>{O||(O=!0,S.hidden=!0)},pe=()=>{d.style.height="auto",d.style.height=`${Math.min(d.scrollHeight,96)}px`;let n=d.value.length;F.hidden=n<450,F.textContent=`${n}/500`,F.classList.toggle("cb-counter-limit",n>=500)},Pe=n=>{let s=a("form","cb-form");s.noValidate=!0,s.append(a("p","cb-form-title","Request an appointment"));let b=a("p","cb-form-error");b.hidden=!0,(n.fields||[]).forEach(u=>{let y=a("label","",u.label||u.name),w=a("input");w.name=u.name,w.required=!0,w.autocomplete=u.name==="phone"?"tel":"name",y.append(w),s.append(y)});let f=a("button","","Send request");f.type="submit",s.append(b,f),s.addEventListener("submit",async u=>{if(u.preventDefault(),!s.reportValidity()){b.textContent="Please complete the required fields.",b.hidden=!1;return}f.disabled=!0,b.hidden=!0;try{let y=Object.fromEntries(new FormData(s));if(!(await fetch(`${r.replace(/\/$/,"")}/api/v1/leads/${encodeURIComponent(e)}`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({conversationId:localStorage.getItem(`cb-conversation-${e}`),fields:y})})).ok)throw new Error;s.replaceWith(a("p","cb-form-success","Thanks! We'll contact you soon.")),U()}catch{f.disabled=!1,b.textContent="We could not send your request. Please try again.",b.hidden=!1}}),g.append(s),U()},me=async n=>{if(!n.trim()||q)return;let s=E;W=n.trim(),Be(),B("user",W),d.value="",pe(),q=!0,d.disabled=!0,L.disabled=!0,M.hidden=!1,U();let b=B("bot",""),f="";try{if(await Ie({apiBase:r,botId:e,conversationId:localStorage.getItem(`cb-conversation-${e}`),message:W,onToken:u=>{x||s!==E||(M.hidden=!0,f+=u,ve(b.bubble,f),Le()&&U())},onLeadForm:u=>{!x&&s===E&&Pe(u)}}),x||s!==E)return;f||b.row.remove()}catch(u){if(x||s!==E)return;b.bubble.classList.add("cb-error"),b.bubble.replaceChildren(document.createTextNode(u.message||"Unable to send message."));let y=a("button","cb-retry","Retry");y.type="button",y.addEventListener("click",()=>{b.row.remove(),me(W)}),b.bubble.append(y)}finally{if(x||s!==E)return;q=!1,d.disabled=!1,d.focus(),L.disabled=!d.value.trim()||d.value.length>500,M.hidden=!0}},Y,Q=null;if(!m)try{let n=JSON.parse(localStorage.getItem(ce)||"null");n&&Date.now()-n.updatedAt<864e5&&Array.isArray(n.messages)&&(Q=n)}catch{}Q?(Q.conversationId&&localStorage.setItem(`cb-conversation-${e}`,Q.conversationId),Q.messages.forEach(n=>{let s=B(n.kind,n.content);!Y&&n.kind==="bot"&&(Y=s)}),O=Q.messages.some(n=>n.kind==="user")):Y=B("bot",l&&o.texts.offlineMessage?o.texts.offlineMessage:o.texts.greetingMessage),k.forEach(({role:n,text:s})=>{typeof s=="string"&&s.trim()&&B(n==="user"?"user":"bot",s)}),be(),p&&P(!0),localStorage.getItem(le)||setTimeout(()=>{z||I.classList.add("cb-visible")},3e3),X.addEventListener("click",()=>{I.classList.remove("cb-visible"),localStorage.setItem(le,"seen")}),C.addEventListener("click",()=>P(!z)),D.addEventListener("click",()=>P(!1)),K.addEventListener("click",()=>Ee.resetChat()),V.addEventListener("submit",n=>{n.preventDefault(),me(d.value)}),d.addEventListener("input",()=>{pe(),L.disabled=q||!d.value.trim()}),d.addEventListener("keydown",n=>{n.key==="Enter"&&!n.shiftKey&&(n.preventDefault(),V.requestSubmit())}),g.addEventListener("scroll",()=>{N.hidden=Le()}),N.addEventListener("click",U),$.append(N);let Me=n=>{n.key==="Escape"&&z&&P(!1)};document.addEventListener("keydown",Me);let Ee={destroy(){x||(x=!0,E+=1,document.removeEventListener("keydown",Me),h.remove())},open(){P(!0)},close(){P(!1)},resetChat(){E+=1,q=!1,O=!1,ie="",se="",W="",ne=0,localStorage.removeItem(`cb-conversation-${e}`),localStorage.removeItem(ce),de.length=0,g.replaceChildren(S),Y=B("bot",l&&o.texts.offlineMessage?o.texts.offlineMessage:o.texts.greetingMessage),be(),d.disabled=!1,d.value="",L.disabled=!0,M.hidden=!0,pe()},update(n){if(x)return;let s=o.texts.greetingMessage,b=g.scrollTop;o=n,xe(h,o),v.classList.toggle("cb-left",o.theme.position==="left"),v.classList.toggle("cb-right",o.theme.position==="right"),C.setAttribute("aria-label",`Open ${o.texts.botName} chat`),$.setAttribute("aria-label",`${o.texts.botName} chat`),ke.textContent=o.texts.botName;let f=o.texts.avatarUrl?a("img","cb-avatar"):a("div","cb-avatar cb-avatar-initials",G(o.texts.botName));o.texts.avatarUrl&&(f.src=o.texts.avatarUrl,f.alt=""),_.replaceWith(f),_=f,M.querySelector(".cb-message-avatar").textContent=G(o.texts.botName),T.querySelector(".cb-launch-label")?.remove(),o.texts.launcherLabel&&T.prepend(a("span","cb-launch-label",o.texts.launcherLabel)),I.firstChild.textContent=o.texts.greetingMessage.slice(0,140),d.placeholder=o.texts.inputPlaceholder,d.setAttribute("aria-label",o.texts.inputPlaceholder),oe.hidden=!o.branding.showBadge,ne===1&&s!==o.texts.greetingMessage&&ve(Y.bubble,l&&o.texts.offlineMessage?o.texts.offlineMessage:o.texts.greetingMessage),O||be(),g.scrollTop=b}};return Ee}var re=new Map;function Fe(t){try{return t&&t.src?new URL(t.src,window.location.href).origin:window.location.origin}catch{return window.location.origin}}async function qe(t={}){let e=t.script,r=t.botId||e&&e.dataset.botId;if(!r)throw new Error("ChatbotWidget requires a botId.");let i=t.container||r;if(re.has(i))return re.get(i);let l=t.apiBase||e&&e.dataset.apiBase||Fe(e),p=t.config,c=!1;if(!p)try{p=await Ae(l,r)}catch{return console.warn("ChatbotWidget: configuration unavailable."),null}let m=ge(R(p,fe(e))),k,h={update:A=>{m=ge(R(R(m,A),fe(e))),k?.update(m)},open:()=>k?.open(),close:()=>k?.close(),resetChat:()=>k?.resetChat(),destroy(){k?.destroy(),re.delete(i)}};return k=ze({container:t.container,botId:r,apiBase:l,config:m,defaultOpen:t.open??t.defaultOpen??!1,onOpenChange:t.onOpenChange,preview:t.preview,previewMessages:t.previewMessages}),re.set(i,h),h}window.__chatbot=window.__chatbot||{};window.ChatbotWidget=window.ChatbotWidget||{};window.__chatbot.init||(window.__chatbot.init=qe);window.ChatbotWidget.init=window.__chatbot.init;var J=document.currentScript;if(J&&J.dataset.botId){let t=()=>{J.dataset.cbLoaded||(J.dataset.cbLoaded="true",window.__chatbot.init({script:J}))};document.readyState==="loading"?document.addEventListener("DOMContentLoaded",t,{once:!0}):t()}})();
