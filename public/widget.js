var ChatbotWidgetBundle=(()=>{var _=Object.freeze({botName:40,launcherLabel:24,greetingMessage:200,inputPlaceholder:60,offlineMessage:200,starterQuestion:60,starterQuestions:4,avatarUrl:2048}),he=/^#(?:[0-9a-f]{3}|[0-9a-f]{6})$/i;var F={theme:{primaryColor:"#4F46E5",mode:"light",position:"right",borderRadius:16,fontFamily:"system"},texts:{botName:"Assistant",avatarUrl:"",greetingMessage:"Hi! How can I help?",inputPlaceholder:"Type your question...",launcherLabel:"",starterQuestions:[],offlineMessage:""},features:{leadCapture:!0},branding:{showBadge:!0}},X={system:'Inter, var(--font-inter, system-ui), -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',sans:"Arial, Helvetica, sans-serif",serif:"Georgia, serif",mono:"ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace"},Ae=(t,e,a)=>typeof t=="string"?t.slice(0,a):e;function I(t,e){let a={...t};return Object.keys(e||{}).forEach(n=>{a[n]=e[n]&&typeof e[n]=="object"&&!Array.isArray(e[n])?I(t[n]||{},e[n]):e[n]}),a}function ne(t){let e=I(F,t||{});return e.theme.primaryColor=he.test(e.theme.primaryColor)?e.theme.primaryColor:F.theme.primaryColor,e.theme.mode=e.theme.mode==="dark"?"dark":"light",e.theme.position=e.theme.position==="left"?"left":"right",e.theme.borderRadius=Math.max(0,Math.min(28,Number.isFinite(Number(e.theme.borderRadius))?Number(e.theme.borderRadius):F.theme.borderRadius)),e.theme.fontFamily=X[e.theme.fontFamily]?X[e.theme.fontFamily]:Object.values(X).includes(e.theme.fontFamily)?e.theme.fontFamily:X.system,Object.keys(F.texts).forEach(a=>{a!=="starterQuestions"&&(e.texts[a]=Ae(e.texts[a],F.texts[a],_[a]))}),e.texts.avatarUrl=/^https:\/\//i.test(e.texts.avatarUrl)?e.texts.avatarUrl:"",e.texts.starterQuestions=Array.isArray(e.texts.starterQuestions)?e.texts.starterQuestions.filter(a=>typeof a=="string").slice(0,_.starterQuestions).map(a=>a.slice(0,_.starterQuestion)):[],e.features.leadCapture=!!e.features.leadCapture,e.branding.showBadge=!!e.branding.showBadge,e}function se(t){if(!t)return{};let e={},a={};return t.dataset.primaryColor!==void 0&&(e.primaryColor=t.dataset.primaryColor),t.dataset.position!==void 0&&(e.position=t.dataset.position),t.dataset.greeting!==void 0&&(a.greetingMessage=t.dataset.greeting),t.dataset.botName!==void 0&&(a.botName=t.dataset.botName),{theme:e,texts:a}}async function ve(t,e){let a=await fetch(`${t.replace(/\/$/,"")}/api/widget/config/${encodeURIComponent(e)}`,{headers:{Accept:"application/json"}});if(!a.ok)throw new Error("Configuration unavailable");return a.json()}var ye=`
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
.cb-embedded .cb-window { width: min(380px, calc(100cqw - 32px)); height: min(600px, calc(100cqh - 108px)); max-width: none; max-height: none; }
.cb-fixed {
  position: fixed;
  bottom: 24px;
  z-index: 2147483647;
}
.cb-left {
  left: 24px;
}
.cb-right {
  right: 24px;
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
  width: 380px;
  max-width: calc(100vw - 32px);
  height: 600px;
  max-height: 80vh;
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
  flex: 1;
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
  padding: 7px 10px;
  color: var(--cb-text);
  background: var(--cb-bg);
  font-size: 13px;
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
.cb-compose {
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
    right: 12px;
    bottom: 12px;
    left: auto;
  }
  .cb-left {
    left: 12px;
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
    transform: translateY(18px);
  }
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
`;function Te(t){let e=(t.match(/^event:\s*(.+)$/m)||[])[1]||"message",a=(t.match(/^data:\s*(.+)$/m)||[])[1]||"";try{return{event:e,data:JSON.parse(a)}}catch{return{event:e,data:a}}}async function we({apiBase:t,botId:e,conversationId:a,message:n,onToken:l,onLeadForm:p}){let c=await fetch(`${t.replace(/\/$/,"")}/api/chat/${encodeURIComponent(e)}`,{method:"POST",headers:{"Content-Type":"application/json",Accept:"text/event-stream"},body:JSON.stringify({conversationId:a,message:n})});if(!c.ok||!c.body)throw new Error("Chat is temporarily unavailable.");let r=c.body.getReader(),g=new TextDecoder,E="";for(;;){let{done:L,value:f}=await r.read();if(L)break;E+=g.decode(f,{stream:!0});let A=E.split(/\n\n/);E=A.pop(),A.forEach(C=>{let m=Te(C);m.event==="token"&&l(m.data.token||""),m.event==="lead_form"&&p(m.data),m.event==="conversation"&&localStorage.setItem(`cb-conversation-${e}`,m.data.conversationId)})}}function Se(t){let e=t.length===4?`#${t[1]}${t[1]}${t[2]}${t[2]}${t[3]}${t[3]}`:t,a=[1,3,5].map(n=>parseInt(e.slice(n,n+2),16)/255).map(n=>n<=.03928?n/12.92:((n+.055)/1.055)**2.4);return a[0]*.2126+a[1]*.7152+a[2]*.0722>.179?"#18181b":"#ffffff"}function ie(t,e){let a=e.theme.mode==="dark";t.style.setProperty("--cb-primary",e.theme.primaryColor),t.style.setProperty("--cb-on-primary",Se(e.theme.primaryColor)),t.style.setProperty("--cb-bg",a?"#202023":"#ffffff"),t.style.setProperty("--cb-surface",a?"#18181b":"#fafafa"),t.style.setProperty("--cb-text",a?"#f4f4f5":"#18181b"),t.style.setProperty("--cb-muted",a?"#a1a1aa":"#71717a"),t.style.setProperty("--cb-success",a?"#6ee7b7":"#047857"),t.style.setProperty("--cb-danger",a?"#fca5a5":"#dc2626"),t.style.setProperty("--cb-radius",`${e.theme.borderRadius}px`),t.style.setProperty("--cb-font",e.theme.fontFamily)}var o=(t,e,a)=>{let n=document.createElement(t);return e&&(n.className=e),a!==void 0&&(n.textContent=a),n},de=(t,e="")=>{let a=document.createElementNS("http://www.w3.org/2000/svg","svg");return a.setAttribute("viewBox","0 0 24 24"),a.setAttribute("aria-hidden","true"),e&&a.setAttribute("class",e),t.forEach(n=>{let l=document.createElementNS("http://www.w3.org/2000/svg",n.tag||"path");Object.keys(n).forEach(p=>{p!=="tag"&&l.setAttribute(p,n[p])}),a.append(l)}),a},Ne=()=>de([{d:"M20 11.5a7.5 7.5 0 0 1-7.8 7.49 8.7 8.7 0 0 1-3.12-.58L4 20l1.5-4.2A7.25 7.25 0 0 1 4 11.5 7.5 7.5 0 0 1 11.75 4 7.5 7.5 0 0 1 20 11.5Z"},{d:"M8.5 11.5h.01M12 11.5h.01M15.5 11.5h.01"}],"cb-icon cb-icon-chat"),ke=(t="cb-icon cb-icon-close")=>de([{d:"m7 7 10 10M17 7 7 17"}],t),Oe=()=>de([{d:"M12 19V5M6.5 10.5 12 5l5.5 5.5"}]),q=t=>t.split(/\s+/).filter(Boolean).slice(0,2).map(e=>e[0]).join("").toUpperCase()||"AI",ze=()=>new Intl.DateTimeFormat(void 0,{hour:"numeric",minute:"2-digit"}).format(new Date);function ce(t,e){t.replaceChildren();let a=(l,p)=>p.split(/(\*\*[^*]+\*\*|\*[^*]+\*|https?:\/\/[^\s]+)/g).forEach(c=>{if(c)if(/^\*\*[^*]+\*\*$/.test(c))l.append(o("strong","",c.slice(2,-2)));else if(/^\*[^*]+\*$/.test(c))l.append(o("em","",c.slice(1,-1)));else if(/^https?:\/\//.test(c)){let r=o("a","",c);r.href=c,r.target="_blank",r.rel="noopener noreferrer",l.append(r)}else l.append(document.createTextNode(c))}),n;String(e||"").split(`
`).forEach(l=>{let p=/^\s*[-*]\s+(.+)$/.exec(l);if(p){n||(n=o("ul"),t.append(n));let c=o("li");a(c,p[1]),n.append(c)}else{n=null;let c=o("p");a(c,l),t.append(c)}})}function Ce({container:t,botId:e,apiBase:a,config:n,failed:l,defaultOpen:p,onOpenChange:c}){let r=n,g=o("div","cb-host");t&&g.classList.add("cb-embedded-host");let E=g.attachShadow({mode:"open"}),L=o("style"),f=!1;L.textContent=ye,E.append(L),ie(g,r);let A=o("div",`cb-root ${t?"cb-embedded":"cb-fixed"} cb-${r.theme.position}`),C=o("div","cb-launch-area"),m=o("button","cb-launcher");m.type="button",m.setAttribute("aria-label",`Open ${r.texts.botName} chat`),m.setAttribute("aria-expanded","false"),m.append(Ne(),ke()),r.texts.launcherLabel&&C.append(o("span","cb-launch-label",r.texts.launcherLabel)),C.append(m);let T=o("div","cb-teaser",r.texts.greetingMessage.slice(0,140)),D=o("button","cb-teaser-close","\xD7");D.type="button",D.setAttribute("aria-label","Dismiss greeting"),T.append(D),C.append(T);let w=o("section","cb-window");w.setAttribute("role","dialog"),w.setAttribute("aria-label",`${r.texts.botName} chat`),w.setAttribute("aria-modal","true");let le=o("header","cb-header"),U=r.texts.avatarUrl?o("img","cb-avatar"):o("div","cb-avatar cb-avatar-initials",q(r.texts.botName));r.texts.avatarUrl&&(U.src=r.texts.avatarUrl,U.alt="");let H=o("div","cb-head-copy"),pe=o("div","cb-title",r.texts.botName);H.append(pe);let me=o("div","cb-presence");me.append(o("span","cb-online"),document.createTextNode("Online")),H.append(me),H.append(o("div","cb-reply-time","Typically replies instantly"));let P=o("button","cb-close");P.type="button",P.setAttribute("aria-label","Close chat"),P.append(ke("cb-icon cb-close-icon")),le.append(U,H,P);let h=o("div","cb-messages");h.setAttribute("aria-live","polite");let S=o("button","cb-scroll-bottom","\u2193");S.type="button",S.hidden=!0,S.setAttribute("aria-label","Scroll to latest message");let Q=o("div","cb-chips"),M=o("div","cb-typing-row");M.hidden=!0;let ue=o("div","cb-typing-bubble");ue.append(o("span","cb-dot"),o("span","cb-dot"),o("span","cb-dot")),M.append(o("div","cb-message-avatar",q(r.texts.botName)),ue);let W=o("form","cb-compose"),d=o("textarea","cb-input");d.rows=1,d.placeholder=r.texts.inputPlaceholder,d.setAttribute("aria-label",r.texts.inputPlaceholder);let k=o("button","cb-send");k.type="submit",k.disabled=!0,k.setAttribute("aria-label","Send message"),k.append(Oe()),W.append(d,k),w.append(le,h,Q,M,W);let V=o("footer","cb-footer","Powered by Chatbot");V.hidden=!r.branding.showBadge,w.append(V),A.append(C,w),E.append(A);let G=t||document.body;G&&G!==document.body&&G.replaceChildren(),G.append(g);let N=!1,$=0,K=0,j=!1,B="",Z="",ee="",R=!1,te=`cb-teaser-${e}`,O=()=>{h.scrollTop=h.scrollHeight},ge=()=>h.scrollHeight-h.scrollTop-h.clientHeight<80,$e=()=>{let s=o("div","cb-message-avatar");if(r.texts.avatarUrl){let i=o("img");i.src=r.texts.avatarUrl,i.alt="",s.append(i)}else s.textContent=q(r.texts.botName);return s},Y=(s,i)=>{K+=1;let b=ze(),u=o("div",`cb-message-row cb-${s}-row${s===Z&&b===ee?" cb-grouped":""}`),v=o("div","cb-message-wrap"),y=o("div",`cb-message cb-${s}`);return s==="bot"?(y.classList.add("cb-markdown"),ce(y,i),u.append($e())):y.textContent=i,v.append(y,o("time","cb-timestamp",b)),u.append(v),h.append(u),Z=s,ee=b,O(),{row:u,bubble:y}},z=s=>{f||N===s||(N=s,w.classList.toggle("cb-open",s),m.classList.toggle("cb-active",s),m.setAttribute("aria-expanded",String(s)),s?(T.classList.remove("cb-visible"),localStorage.setItem(te,"seen"),setTimeout(()=>{!f&&N&&d.focus()},210)):m.focus(),c?.(s))},re=()=>{Q.replaceChildren(),r.texts.starterQuestions.forEach(s=>{let i=o("button","cb-chip",s);i.type="button",i.addEventListener("click",()=>oe(s)),Q.append(i)}),Q.hidden=R||!r.texts.starterQuestions.length},Ee=()=>{R||(R=!0,Q.hidden=!0)},ae=()=>{d.style.height="auto",d.style.height=`${Math.min(d.scrollHeight,96)}px`},Le=s=>{let i=o("form","cb-form");i.noValidate=!0,i.append(o("p","cb-form-title","Request an appointment"));let b=o("p","cb-form-error");b.hidden=!0,(s.fields||[]).forEach(u=>{let v=o("label","",u.label||u.name),y=o("input");y.name=u.name,y.required=!0,y.autocomplete=u.name==="phone"?"tel":"name",v.append(y),i.append(v)});let x=o("button","","Send request");x.type="submit",i.append(b,x),i.addEventListener("submit",async u=>{if(u.preventDefault(),!i.reportValidity()){b.textContent="Please complete the required fields.",b.hidden=!1;return}x.disabled=!0,b.hidden=!0;try{let v=Object.fromEntries(new FormData(i));if(!(await fetch(`${a.replace(/\/$/,"")}/api/leads/${encodeURIComponent(e)}`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({conversationId:localStorage.getItem(`cb-conversation-${e}`),fields:v})})).ok)throw new Error;i.replaceWith(o("p","cb-form-success","Thanks! We'll contact you soon.")),O()}catch{x.disabled=!1,b.textContent="We could not send your request. Please try again.",b.hidden=!1}}),h.append(i),O()},oe=async s=>{if(!s.trim()||j)return;let i=$;B=s.trim(),Ee(),Y("user",B),d.value="",ae(),j=!0,d.disabled=!0,k.disabled=!0,M.hidden=!1,O();let b=Y("bot",""),x="";try{if(await we({apiBase:a,botId:e,conversationId:localStorage.getItem(`cb-conversation-${e}`),message:B,onToken:u=>{f||i!==$||(M.hidden=!0,x+=u,ce(b.bubble,x),ge()&&O())},onLeadForm:u=>{!f&&i===$&&Le(u)}}),f||i!==$)return;x||b.row.remove()}catch(u){if(f||i!==$)return;b.bubble.classList.add("cb-error"),b.bubble.replaceChildren(document.createTextNode(u.message||"Unable to send message."));let v=o("button","cb-retry","Retry");v.type="button",v.addEventListener("click",()=>{b.row.remove(),oe(B)}),b.bubble.append(v)}finally{if(f||i!==$)return;j=!1,d.disabled=!1,d.focus(),k.disabled=!d.value.trim(),M.hidden=!0}},fe=Y("bot",l&&r.texts.offlineMessage?r.texts.offlineMessage:r.texts.greetingMessage);re(),p&&z(!0),localStorage.getItem(te)||setTimeout(()=>{N||T.classList.add("cb-visible")},3e3),D.addEventListener("click",()=>{T.classList.remove("cb-visible"),localStorage.setItem(te,"seen")}),m.addEventListener("click",()=>z(!N)),P.addEventListener("click",()=>z(!1)),W.addEventListener("submit",s=>{s.preventDefault(),oe(d.value)}),d.addEventListener("input",()=>{ae(),k.disabled=j||!d.value.trim()}),d.addEventListener("keydown",s=>{s.key==="Enter"&&!s.shiftKey&&(s.preventDefault(),W.requestSubmit())}),h.addEventListener("scroll",()=>{S.hidden=ge()}),S.addEventListener("click",O),w.append(S);let xe=s=>{s.key==="Escape"&&N&&z(!1)};return document.addEventListener("keydown",xe),{destroy(){f||(f=!0,$+=1,document.removeEventListener("keydown",xe),g.remove())},open(){z(!0)},close(){z(!1)},resetChat(){$+=1,j=!1,R=!1,Z="",ee="",B="",K=0,localStorage.removeItem(`cb-conversation-${e}`),h.replaceChildren(),fe=Y("bot",l&&r.texts.offlineMessage?r.texts.offlineMessage:r.texts.greetingMessage),re(),d.disabled=!1,d.value="",k.disabled=!0,M.hidden=!0,ae()},update(s){if(f)return;let i=r.texts.greetingMessage,b=h.scrollTop;r=s,ie(g,r),A.classList.toggle("cb-left",r.theme.position==="left"),A.classList.toggle("cb-right",r.theme.position==="right"),m.setAttribute("aria-label",`Open ${r.texts.botName} chat`),w.setAttribute("aria-label",`${r.texts.botName} chat`),pe.textContent=r.texts.botName;let x=r.texts.avatarUrl?o("img","cb-avatar"):o("div","cb-avatar cb-avatar-initials",q(r.texts.botName));r.texts.avatarUrl&&(x.src=r.texts.avatarUrl,x.alt=""),U.replaceWith(x),U=x,M.querySelector(".cb-message-avatar").textContent=q(r.texts.botName),C.querySelector(".cb-launch-label")?.remove(),r.texts.launcherLabel&&C.prepend(o("span","cb-launch-label",r.texts.launcherLabel)),T.firstChild.textContent=r.texts.greetingMessage.slice(0,140),d.placeholder=r.texts.inputPlaceholder,d.setAttribute("aria-label",r.texts.inputPlaceholder),V.hidden=!r.branding.showBadge,K===1&&i!==r.texts.greetingMessage&&ce(fe.bubble,l&&r.texts.offlineMessage?r.texts.offlineMessage:r.texts.greetingMessage),R||re(),h.scrollTop=b}}}var J=new Map;function Ie(t){try{return t&&t.src?new URL(t.src,window.location.href).origin:window.location.origin}catch{return window.location.origin}}async function Me(t={}){let e=t.script,a=t.botId||e&&e.dataset.botId;if(!a)throw new Error("ChatbotWidget requires a botId.");let n=t.container||a;if(J.has(n))return J.get(n);let l=t.apiBase||e&&e.dataset.apiBase||Ie(e),p=t.config,c=!1;if(!p)try{p=await ve(l,a)}catch{p={},c=!0}let r=ne(I(p,se(e))),g,L={update:f=>{r=ne(I(I(r,f),se(e))),g?.update(r)},open:()=>g?.open(),close:()=>g?.close(),resetChat:()=>g?.resetChat(),destroy(){g?.destroy(),J.delete(n)}};return g=Ce({container:t.container,botId:a,apiBase:l,config:r,failed:c,defaultOpen:t.open??t.defaultOpen??!1,onOpenChange:t.onOpenChange}),J.set(n,L),L}window.ChatbotWidget=window.ChatbotWidget||{};window.ChatbotWidget.init=Me;var be=document.currentScript;if(be&&be.dataset.botId){let t=()=>Me({script:be});document.readyState==="loading"?document.addEventListener("DOMContentLoaded",t,{once:!0}):t()}})();
