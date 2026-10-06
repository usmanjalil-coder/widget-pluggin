var ChatbotWidgetBundle=(()=>{var X=Object.freeze({botName:40,launcherLabel:24,greetingMessage:200,inputPlaceholder:60,offlineMessage:200,starterQuestion:60,starterQuestions:4,avatarUrl:2048}),ke=/^#(?:[0-9a-f]{3}|[0-9a-f]{6})$/i;var Y={theme:{primaryColor:"#4F46E5",mode:"light",position:"right",borderRadius:16,fontFamily:"system"},texts:{botName:"Assistant",avatarUrl:"",greetingMessage:"Hi! How can I help?",inputPlaceholder:"Type your question...",launcherLabel:"",starterQuestions:[],offlineMessage:""},features:{leadCapture:!0},branding:{showBadge:!0}},J={system:'Inter, var(--font-inter, system-ui), -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',sans:"Arial, Helvetica, sans-serif",serif:"Georgia, serif",mono:"ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace"},Ne=(t,e,r)=>typeof t=="string"?t.slice(0,r):e;function P(t,e){let r={...t};return Object.keys(e||{}).forEach(n=>{r[n]=e[n]&&typeof e[n]=="object"&&!Array.isArray(e[n])?P(t[n]||{},e[n]):e[n]}),r}function se(t){let e=P(Y,t||{});return e.theme.primaryColor=ke.test(e.theme.primaryColor)?e.theme.primaryColor:Y.theme.primaryColor,e.theme.mode=e.theme.mode==="dark"?"dark":"light",e.theme.position=e.theme.position==="left"?"left":"right",e.theme.borderRadius=Math.max(0,Math.min(28,Number.isFinite(Number(e.theme.borderRadius))?Number(e.theme.borderRadius):Y.theme.borderRadius)),e.theme.fontFamily=J[e.theme.fontFamily]?J[e.theme.fontFamily]:Object.values(J).includes(e.theme.fontFamily)?e.theme.fontFamily:J.system,Object.keys(Y.texts).forEach(r=>{r!=="starterQuestions"&&(e.texts[r]=Ne(e.texts[r],Y.texts[r],X[r]))}),e.texts.avatarUrl=/^https:\/\//i.test(e.texts.avatarUrl)?e.texts.avatarUrl:"",e.texts.starterQuestions=Array.isArray(e.texts.starterQuestions)?e.texts.starterQuestions.filter(r=>typeof r=="string").slice(0,X.starterQuestions).map(r=>r.slice(0,X.starterQuestion)):[],e.features.leadCapture=!!e.features.leadCapture,e.branding.showBadge=!!e.branding.showBadge,e}function ce(t){if(!t)return{};let e={},r={};return t.dataset.primaryColor!==void 0&&(e.primaryColor=t.dataset.primaryColor),t.dataset.position!==void 0&&(e.position=t.dataset.position),t.dataset.greeting!==void 0&&(r.greetingMessage=t.dataset.greeting),t.dataset.botName!==void 0&&(r.botName=t.dataset.botName),{theme:e,texts:r}}async function Ce(t,e){let r=await fetch(`${t.replace(/\/$/,"")}/api/widget/config/${encodeURIComponent(e)}`,{headers:{Accept:"application/json"}});if(!r.ok)throw new Error("Configuration unavailable");return r.json()}var Ee=`
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
  .cb-preview .cb-launch-area { right: 12px; bottom: 12px; }
  .cb-preview.cb-left .cb-launch-area { right: auto; left: 12px; }
  .cb-preview .cb-window { width: calc(100% - 24px); height: calc(100% - 84px); min-height: 0; }
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
`;function Ie(t){let e=(t.match(/^event:\s*(.+)$/m)||[])[1]||"message",r=(t.match(/^data:\s*(.+)$/m)||[])[1]||"";try{return{event:e,data:JSON.parse(r)}}catch{return{event:e,data:r}}}async function Me({apiBase:t,botId:e,conversationId:r,message:n,onToken:l,onLeadForm:p}){let c=await fetch(`${t.replace(/\/$/,"")}/api/chat/${encodeURIComponent(e)}`,{method:"POST",headers:{"Content-Type":"application/json",Accept:"text/event-stream"},body:JSON.stringify({conversationId:r,message:n})});if(!c.ok||!c.body)throw new Error("Chat is temporarily unavailable.");let m=c.body.getReader(),h=new TextDecoder,a="";for(;;){let{done:v,value:L}=await m.read();if(v)break;a+=h.decode(L,{stream:!0});let Q=a.split(/\n\n/);a=Q.pop(),Q.forEach(g=>{let y=Ie(g);y.event==="token"&&l(y.data.token||""),y.event==="lead_form"&&p(y.data),y.event==="conversation"&&localStorage.setItem(`cb-conversation-${e}`,y.data.conversationId)})}}function Oe(t){let e=t.length===4?`#${t[1]}${t[1]}${t[2]}${t[2]}${t[3]}${t[3]}`:t,r=[1,3,5].map(n=>parseInt(e.slice(n,n+2),16)/255).map(n=>n<=.03928?n/12.92:((n+.055)/1.055)**2.4);return r[0]*.2126+r[1]*.7152+r[2]*.0722>.179?"#18181b":"#ffffff"}function de(t,e){let r=e.theme.mode==="dark";t.style.setProperty("--cb-primary",e.theme.primaryColor),t.style.setProperty("--cb-on-primary",Oe(e.theme.primaryColor)),t.style.setProperty("--cb-bg",r?"#202023":"#ffffff"),t.style.setProperty("--cb-surface",r?"#18181b":"#fafafa"),t.style.setProperty("--cb-text",r?"#f4f4f5":"#18181b"),t.style.setProperty("--cb-muted",r?"#a1a1aa":"#71717a"),t.style.setProperty("--cb-success",r?"#6ee7b7":"#047857"),t.style.setProperty("--cb-danger",r?"#fca5a5":"#dc2626"),t.style.setProperty("--cb-radius",`${e.theme.borderRadius}px`),t.style.setProperty("--cb-font",e.theme.fontFamily)}var be={name:"YourBrand",tagline:"AI assistant for websites that answers questions and captures leads.",domain:"yourbrand.example",supportEmail:"support@yourbrand.example",legalName:"YourBrand LLC",defaultTitle:"YourBrand | AI assistant for your website",description:"Add an AI assistant to your website to answer visitor questions, capture leads, and book appointments without code."},{name:Ye,tagline:He,domain:We,supportEmail:Ge,legalName:_e,defaultTitle:Xe,description:Je}=be;var o=(t,e,r)=>{let n=document.createElement(t);return e&&(n.className=e),r!==void 0&&(n.textContent=r),n},pe=(t,e="")=>{let r=document.createElementNS("http://www.w3.org/2000/svg","svg");return r.setAttribute("viewBox","0 0 24 24"),r.setAttribute("aria-hidden","true"),e&&r.setAttribute("class",e),t.forEach(n=>{let l=document.createElementNS("http://www.w3.org/2000/svg",n.tag||"path");Object.keys(n).forEach(p=>{p!=="tag"&&l.setAttribute(p,n[p])}),r.append(l)}),r},ze=()=>pe([{d:"M20 11.5a7.5 7.5 0 0 1-7.8 7.49 8.7 8.7 0 0 1-3.12-.58L4 20l1.5-4.2A7.25 7.25 0 0 1 4 11.5 7.5 7.5 0 0 1 11.75 4 7.5 7.5 0 0 1 20 11.5Z"},{d:"M8.5 11.5h.01M12 11.5h.01M15.5 11.5h.01"}],"cb-icon cb-icon-chat"),$e=(t="cb-icon cb-icon-close")=>pe([{d:"m7 7 10 10M17 7 7 17"}],t),Ue=()=>pe([{d:"M12 19V5M6.5 10.5 12 5l5.5 5.5"}]),H=t=>t.split(/\s+/).filter(Boolean).slice(0,2).map(e=>e[0]).join("").toUpperCase()||"AI",Be=()=>new Intl.DateTimeFormat(void 0,{hour:"numeric",minute:"2-digit"}).format(new Date);function le(t,e){t.replaceChildren();let r=(l,p)=>p.split(/(\*\*[^*]+\*\*|\*[^*]+\*|https?:\/\/[^\s]+)/g).forEach(c=>{if(c)if(/^\*\*[^*]+\*\*$/.test(c))l.append(o("strong","",c.slice(2,-2)));else if(/^\*[^*]+\*$/.test(c))l.append(o("em","",c.slice(1,-1)));else if(/^https?:\/\//.test(c)){let m=o("a","",c);m.href=c,m.target="_blank",m.rel="noopener noreferrer",l.append(m)}else l.append(document.createTextNode(c))}),n;String(e||"").split(`
`).forEach(l=>{let p=/^\s*[-*]\s+(.+)$/.exec(l);if(p){n||(n=o("ul"),t.append(n));let c=o("li");r(c,p[1]),n.append(c)}else{n=null;let c=o("p");r(c,l),t.append(c)}})}function Le({container:t,botId:e,apiBase:r,config:n,failed:l,defaultOpen:p,onOpenChange:c,preview:m=!1,previewMessages:h=[]}){let a=n,v=o("div","cb-host");t&&v.classList.add("cb-embedded-host");let L=v.attachShadow({mode:"open"}),Q=o("style"),g=!1;Q.textContent=Ee,L.append(Q),de(v,a);let y=o("div",`cb-root ${t?"cb-embedded":"cb-fixed"}${m?" cb-preview":""} cb-${a.theme.position}`),I=o("div","cb-launch-area"),C=o("button","cb-launcher");C.type="button",C.setAttribute("aria-label",`Open ${a.texts.botName} chat`),C.setAttribute("aria-expanded","false"),C.append(ze(),$e()),a.texts.launcherLabel&&I.append(o("span","cb-launch-label",a.texts.launcherLabel)),I.append(C);let O=o("div","cb-teaser",a.texts.greetingMessage.slice(0,140)),W=o("button","cb-teaser-close","\xD7");W.type="button",W.setAttribute("aria-label","Dismiss greeting"),O.append(W),I.append(O);let M=o("section","cb-window");M.setAttribute("role","dialog"),M.setAttribute("aria-label",`${a.texts.botName} chat`),M.setAttribute("aria-modal","true");let me=o("header","cb-header"),j=a.texts.avatarUrl?o("img","cb-avatar"):o("div","cb-avatar cb-avatar-initials",H(a.texts.botName));a.texts.avatarUrl&&(j.src=a.texts.avatarUrl,j.alt="");let K=o("div","cb-head-copy"),ge=o("div","cb-title",a.texts.botName);K.append(ge);let fe=o("div","cb-presence");fe.append(o("span","cb-online"),document.createTextNode("Online")),K.append(fe);let R=o("button","cb-close");R.type="button",R.setAttribute("aria-label","Close chat"),R.append($e("cb-icon cb-close-icon")),me.append(j,K,R);let f=o("div","cb-messages");f.setAttribute("aria-live","polite");let z=o("button","cb-scroll-bottom","\u2193");z.type="button",z.hidden=!0,z.setAttribute("aria-label","Scroll to latest message");let S=o("div","cb-chips");f.append(S);let E=o("div","cb-typing-row");E.hidden=!0;let xe=o("div","cb-typing-bubble");xe.append(o("span","cb-dot"),o("span","cb-dot"),o("span","cb-dot")),E.append(o("div","cb-message-avatar",H(a.texts.botName)),xe);let G=o("form","cb-compose"),d=o("textarea","cb-input");d.rows=1,d.placeholder=a.texts.inputPlaceholder,d.setAttribute("aria-label",a.texts.inputPlaceholder);let $=o("button","cb-send");$.type="submit",$.disabled=!0,$.setAttribute("aria-label","Send message"),$.append(Ue()),G.append(d,$),M.append(me,f,E,G);let Z=o("footer","cb-footer",`Powered by ${be.name}`);Z.hidden=!a.branding.showBadge,M.append(Z),y.append(I,M),L.append(y);let _=t||document.body;_&&_!==document.body&&_.replaceChildren(),_.append(v);let U=!1,A=0,ee=0,F=!1,D="",te="",re="",q=!1,ae=`cb-teaser-${e}`,T=()=>{f.scrollTop=f.scrollHeight},he=()=>f.scrollHeight-f.scrollTop-f.clientHeight<80,Te=()=>{let i=o("div","cb-message-avatar");if(a.texts.avatarUrl){let s=o("img");s.src=a.texts.avatarUrl,s.alt="",i.append(s)}else i.textContent=H(a.texts.botName);return i},N=(i,s)=>{ee+=1;let b=Be(),u=o("div",`cb-message-row cb-${i}-row${i===te&&b===re?" cb-grouped":""}`),w=o("div","cb-message-wrap"),k=o("div",`cb-message cb-${i}`);return i==="bot"?(k.classList.add("cb-markdown"),le(k,s),u.append(Te())):k.textContent=s,w.append(k,o("time","cb-timestamp",b)),u.append(w),f.insertBefore(u,S),te=i,re=b,T(),{row:u,bubble:k}},B=i=>{g||U===i||(U=i,M.classList.toggle("cb-open",i),C.classList.toggle("cb-active",i),C.setAttribute("aria-expanded",String(i)),i?(O.classList.remove("cb-visible"),localStorage.setItem(ae,"seen"),m||setTimeout(()=>{!g&&U&&d.focus()},210)):C.focus(),c?.(i))},oe=()=>{S.replaceChildren(),a.texts.starterQuestions.forEach(i=>{let s=o("button","cb-chip",i);s.type="button",s.addEventListener("click",()=>ne(i)),S.append(s)}),S.hidden=q||!a.texts.starterQuestions.length},ve=()=>{q||(q=!0,S.hidden=!0)},ie=()=>{d.style.height="auto",d.style.height=`${Math.min(d.scrollHeight,96)}px`},Se=i=>{let s=o("form","cb-form");s.noValidate=!0,s.append(o("p","cb-form-title","Request an appointment"));let b=o("p","cb-form-error");b.hidden=!0,(i.fields||[]).forEach(u=>{let w=o("label","",u.label||u.name),k=o("input");k.name=u.name,k.required=!0,k.autocomplete=u.name==="phone"?"tel":"name",w.append(k),s.append(w)});let x=o("button","","Send request");x.type="submit",s.append(b,x),s.addEventListener("submit",async u=>{if(u.preventDefault(),!s.reportValidity()){b.textContent="Please complete the required fields.",b.hidden=!1;return}x.disabled=!0,b.hidden=!0;try{let w=Object.fromEntries(new FormData(s));if(!(await fetch(`${r.replace(/\/$/,"")}/api/leads/${encodeURIComponent(e)}`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({conversationId:localStorage.getItem(`cb-conversation-${e}`),fields:w})})).ok)throw new Error;s.replaceWith(o("p","cb-form-success","Thanks! We'll contact you soon.")),T()}catch{x.disabled=!1,b.textContent="We could not send your request. Please try again.",b.hidden=!1}}),f.append(s),T()},ne=async i=>{if(!i.trim()||F)return;let s=A;D=i.trim(),ve(),N("user",D),d.value="",ie(),F=!0,d.disabled=!0,$.disabled=!0,E.hidden=!1,T();let b=N("bot",""),x="";try{if(await Me({apiBase:r,botId:e,conversationId:localStorage.getItem(`cb-conversation-${e}`),message:D,onToken:u=>{g||s!==A||(E.hidden=!0,x+=u,le(b.bubble,x),he()&&T())},onLeadForm:u=>{!g&&s===A&&Se(u)}}),g||s!==A)return;x||b.row.remove()}catch(u){if(g||s!==A)return;b.bubble.classList.add("cb-error"),b.bubble.replaceChildren(document.createTextNode(u.message||"Unable to send message."));let w=o("button","cb-retry","Retry");w.type="button",w.addEventListener("click",()=>{b.row.remove(),ne(D)}),b.bubble.append(w)}finally{if(g||s!==A)return;F=!1,d.disabled=!1,d.focus(),$.disabled=!d.value.trim(),E.hidden=!0}},ye=N("bot",l&&a.texts.offlineMessage?a.texts.offlineMessage:a.texts.greetingMessage);h.forEach(({role:i,text:s})=>{typeof s=="string"&&s.trim()&&N(i==="user"?"user":"bot",s)}),oe(),p&&B(!0),localStorage.getItem(ae)||setTimeout(()=>{U||O.classList.add("cb-visible")},3e3),W.addEventListener("click",()=>{O.classList.remove("cb-visible"),localStorage.setItem(ae,"seen")}),C.addEventListener("click",()=>B(!U)),R.addEventListener("click",()=>B(!1)),G.addEventListener("submit",i=>{i.preventDefault(),ne(d.value)}),d.addEventListener("input",()=>{ie(),$.disabled=F||!d.value.trim()}),d.addEventListener("keydown",i=>{i.key==="Enter"&&!i.shiftKey&&(i.preventDefault(),G.requestSubmit())}),f.addEventListener("scroll",()=>{z.hidden=he()}),z.addEventListener("click",T),M.append(z);let we=i=>{i.key==="Escape"&&U&&B(!1)};return document.addEventListener("keydown",we),{destroy(){g||(g=!0,A+=1,document.removeEventListener("keydown",we),v.remove())},open(){B(!0)},close(){B(!1)},resetChat(){A+=1,F=!1,q=!1,te="",re="",D="",ee=0,localStorage.removeItem(`cb-conversation-${e}`),f.replaceChildren(S),ye=N("bot",l&&a.texts.offlineMessage?a.texts.offlineMessage:a.texts.greetingMessage),oe(),d.disabled=!1,d.value="",$.disabled=!0,E.hidden=!0,ie()},playDemo({user:i,reply:s}){this.resetChat(),!(!i||!s)&&window.setTimeout(()=>{g||(ve(),N("user",i),E.hidden=!1,T(),window.setTimeout(()=>{g||(E.hidden=!0,N("bot",s),T())},650))},180)},update(i){if(g)return;let s=a.texts.greetingMessage,b=f.scrollTop;a=i,de(v,a),y.classList.toggle("cb-left",a.theme.position==="left"),y.classList.toggle("cb-right",a.theme.position==="right"),C.setAttribute("aria-label",`Open ${a.texts.botName} chat`),M.setAttribute("aria-label",`${a.texts.botName} chat`),ge.textContent=a.texts.botName;let x=a.texts.avatarUrl?o("img","cb-avatar"):o("div","cb-avatar cb-avatar-initials",H(a.texts.botName));a.texts.avatarUrl&&(x.src=a.texts.avatarUrl,x.alt=""),j.replaceWith(x),j=x,E.querySelector(".cb-message-avatar").textContent=H(a.texts.botName),I.querySelector(".cb-launch-label")?.remove(),a.texts.launcherLabel&&I.prepend(o("span","cb-launch-label",a.texts.launcherLabel)),O.firstChild.textContent=a.texts.greetingMessage.slice(0,140),d.placeholder=a.texts.inputPlaceholder,d.setAttribute("aria-label",a.texts.inputPlaceholder),Z.hidden=!a.branding.showBadge,ee===1&&s!==a.texts.greetingMessage&&le(ye.bubble,l&&a.texts.offlineMessage?a.texts.offlineMessage:a.texts.greetingMessage),q||oe(),f.scrollTop=b}}}var V=new Map;function Pe(t){try{return t&&t.src?new URL(t.src,window.location.href).origin:window.location.origin}catch{return window.location.origin}}async function Ae(t={}){let e=t.script,r=t.botId||e&&e.dataset.botId;if(!r)throw new Error("ChatbotWidget requires a botId.");let n=t.container||r;if(V.has(n))return V.get(n);let l=t.apiBase||e&&e.dataset.apiBase||Pe(e),p=t.config,c=!1;if(!p)try{p=await Ce(l,r)}catch{p={},c=!0}let m=se(P(p,ce(e))),h,v={update:L=>{m=se(P(P(m,L),ce(e))),h?.update(m)},open:()=>h?.open(),close:()=>h?.close(),resetChat:()=>h?.resetChat(),playDemo:L=>h?.playDemo(L),destroy(){h?.destroy(),V.delete(n)}};return h=Le({container:t.container,botId:r,apiBase:l,config:m,failed:c,defaultOpen:t.open??t.defaultOpen??!1,onOpenChange:t.onOpenChange,preview:t.preview,previewMessages:t.previewMessages}),V.set(n,v),v}window.ChatbotWidget=window.ChatbotWidget||{};window.ChatbotWidget.init=Ae;var ue=document.currentScript;if(ue&&ue.dataset.botId){let t=()=>Ae({script:ue});document.readyState==="loading"?document.addEventListener("DOMContentLoaded",t,{once:!0}):t()}})();
