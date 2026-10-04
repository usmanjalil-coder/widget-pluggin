var ChatbotWidgetBundle=(()=>{var T={theme:{primaryColor:"#0a7cff",mode:"light",position:"right",borderRadius:16,fontFamily:"system"},texts:{botName:"Assistant",avatarUrl:"",greetingMessage:"Hi! How can I help?",inputPlaceholder:"Type your question...",launcherLabel:"",starterQuestions:[],offlineMessage:""},features:{leadCapture:!0},branding:{showBadge:!0}},fe=/^#(?:[0-9a-f]{3}|[0-9a-f]{6})$/i,ne={system:'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',sans:"Arial, Helvetica, sans-serif",serif:"Georgia, serif"},ve=(t,e)=>typeof t=="string"?t.slice(0,500):e;function I(t,e){let a={...t};return Object.keys(e||{}).forEach(r=>{a[r]=e[r]&&typeof e[r]=="object"&&!Array.isArray(e[r])?I(t[r]||{},e[r]):e[r]}),a}function Q(t){let e=I(T,t||{});return e.theme.primaryColor=fe.test(e.theme.primaryColor)?e.theme.primaryColor:T.theme.primaryColor,e.theme.mode=e.theme.mode==="dark"?"dark":"light",e.theme.position=e.theme.position==="left"?"left":"right",e.theme.borderRadius=Math.max(0,Math.min(32,Number(e.theme.borderRadius)||T.theme.borderRadius)),e.theme.fontFamily=ne[e.theme.fontFamily]?e.theme.fontFamily:ne.system,Object.keys(T.texts).forEach(a=>{a!=="starterQuestions"&&(e.texts[a]=ve(e.texts[a],T.texts[a]))}),e.texts.avatarUrl=/^https:\/\//i.test(e.texts.avatarUrl)?e.texts.avatarUrl:"",e.texts.starterQuestions=Array.isArray(e.texts.starterQuestions)?e.texts.starterQuestions.filter(a=>typeof a=="string").slice(0,6).map(a=>a.slice(0,160)):[],e.features.leadCapture=!!e.features.leadCapture,e.branding.showBadge=!!e.branding.showBadge,e}function ie(t){if(!t)return{};let e={},a={};return t.dataset.primaryColor!==void 0&&(e.primaryColor=t.dataset.primaryColor),t.dataset.position!==void 0&&(e.position=t.dataset.position),t.dataset.greeting!==void 0&&(a.greetingMessage=t.dataset.greeting),t.dataset.botName!==void 0&&(a.botName=t.dataset.botName),{theme:e,texts:a}}async function se(t,e){let a=await fetch(`${t.replace(/\/$/,"")}/api/widget/config/${encodeURIComponent(e)}`,{headers:{Accept:"application/json"}});if(!a.ok)throw new Error("Configuration unavailable");return a.json()}var ce=`
:host {
  all: initial;
  font-family: var(--cb-font);
  color: var(--cb-text);
}
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
  border-radius: 50%;
  color: var(--cb-on-primary);
  background:
    linear-gradient(
      145deg,
      color-mix(in srgb, var(--cb-primary) 72%, white),
      var(--cb-primary) 52%,
      color-mix(in srgb, var(--cb-primary) 82%, black));
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
  border-radius: 50%;
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
  border-radius: 999px;
  padding: 9px 13px;
  background: var(--cb-bg);
  color: var(--cb-text);
  box-shadow: 0 5px 18px rgba(15, 23, 42, .13);
  font-size: 13px;
  font-weight: 700;
  white-space: nowrap;
}
.cb-teaser {
  position: absolute;
  bottom: 72px;
  width: max-content;
  max-width: 270px;
  padding: 11px 37px 11px 13px;
  border: 1px solid color-mix(in srgb, var(--cb-text) 8%, transparent);
  border-radius: 13px;
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
  border-radius: 20px;
  box-shadow: 0 26px 65px rgba(15, 23, 42, .2), 0 5px 18px rgba(15, 23, 42, .1);
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
  opacity: 1;
  transform: none;
  pointer-events: auto;
}
.cb-header {
  min-height: 81px;
  padding: 14px 15px;
  display: flex;
  align-items: center;
  gap: 10px;
  color: var(--cb-on-primary);
  background:
    linear-gradient(
      135deg,
      color-mix(in srgb, var(--cb-primary) 70%, white),
      var(--cb-primary) 58%,
      color-mix(in srgb, var(--cb-primary) 82%, black));
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
  font-weight: 800;
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
  font-size: 15px;
  font-weight: 800;
}
.cb-presence {
  display: flex;
  align-items: center;
  gap: 5px;
  margin-top: 2px;
  font-size: 11px;
  opacity: .9;
  white-space: nowrap;
}
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
  width: 34px;
  height: 34px;
  border: 0;
  border-radius: 10px;
  color: inherit;
  background: rgba(255, 255, 255, .13);
}
.cb-close:hover {
  background: rgba(255, 255, 255, .24);
}
.cb-messages {
  position: relative;
  flex: 1;
  overflow-y: auto;
  padding: 18px 15px 10px;
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
  align-items: flex-end;
  gap: 7px;
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
  width: 25px;
  height: 25px;
  flex: none;
  overflow: hidden;
  border-radius: 50%;
  background: var(--cb-primary);
  color: var(--cb-on-primary);
  font-size: 9px;
  font-weight: 800;
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
  border-radius: 15px 15px 15px 5px;
  background: var(--cb-bg);
  color: var(--cb-text);
  box-shadow: 0 1px 1px rgba(15, 23, 42, .025);
  font-size: 14px;
  line-height: 1.5;
  overflow-wrap: anywhere;
}
.cb-user {
  border: 0;
  border-radius: 15px 15px 5px 15px;
  background: var(--cb-primary);
  color: var(--cb-on-primary);
}
.cb-error {
  border-color: #ef4444;
}
.cb-timestamp {
  display: block;
  height: 0;
  overflow: hidden;
  padding: 0 3px;
  color: var(--cb-muted);
  font-size: 10px;
  opacity: 0;
  transition: opacity .15s ease, height .15s ease;
}
.cb-message-row:hover .cb-timestamp {
  height: 15px;
  padding-top: 3px;
  opacity: 1;
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
  font-weight: 800;
}
.cb-markdown em {
  font-style: italic;
}
.cb-markdown a {
  color: inherit;
  text-decoration: underline;
  font-weight: 700;
}
.cb-markdown ul {
  margin: 7px 0 3px;
  padding-left: 18px;
}
.cb-typing-row {
  display: flex;
  align-items: flex-end;
  gap: 7px;
  padding: 0 0 11px;
}
.cb-typing-bubble {
  display: flex;
  gap: 4px;
  padding: 11px 13px;
  border: 1px solid color-mix(in srgb, var(--cb-text) 9%, transparent);
  border-radius: 15px 15px 15px 5px;
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
  padding: 4px 15px 13px;
  background: var(--cb-surface);
}
.cb-chip {
  border: 1px solid color-mix(in srgb, var(--cb-primary) 76%, transparent);
  border-radius: 999px;
  padding: 7px 10px;
  color: var(--cb-primary);
  background: var(--cb-bg);
  font-size: 12px;
  font-weight: 700;
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
  margin: 10px 11px 8px;
  padding: 5px 5px 5px 12px;
  border: 1px solid color-mix(in srgb, var(--cb-text) 14%, transparent);
  border-radius: 16px;
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
  border-radius: 50%;
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
  font-size: 10px;
}
.cb-scroll-bottom {
  position: absolute;
  right: 17px;
  bottom: 14px;
  display: grid;
  place-items: center;
  width: 32px;
  height: 32px;
  border: 1px solid color-mix(in srgb, var(--cb-text) 12%, transparent);
  border-radius: 50%;
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
  border-radius: 14px;
  background: var(--cb-bg);
  box-shadow: 0 3px 12px rgba(15, 23, 42, .05);
}
.cb-form-title {
  margin: 0;
  font-size: 14px;
  font-weight: 800;
}
.cb-form label {
  display: grid;
  gap: 5px;
  color: var(--cb-text);
  font-size: 12px;
  font-weight: 700;
}
.cb-form input {
  width: 100%;
  padding: 9px 10px;
  border: 1px solid color-mix(in srgb, var(--cb-text) 20%, transparent);
  border-radius: 9px;
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
  border-radius: 9px;
  padding: 10px;
  color: var(--cb-on-primary);
  background: var(--cb-primary);
  font-size: 13px;
  font-weight: 800;
}
.cb-form-error {
  margin: 0;
  color: #dc2626;
  font-size: 12px;
}
.cb-form-success {
  margin: 0 0 13px 32px;
  padding: 13px;
  border-radius: 13px;
  color: var(--cb-text);
  background: color-mix(in srgb, var(--cb-primary) 12%, var(--cb-bg));
  font-size: 13px;
  font-weight: 700;
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
  .cb-window {
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
`;function ye(t){let e=(t.match(/^event:\s*(.+)$/m)||[])[1]||"message",a=(t.match(/^data:\s*(.+)$/m)||[])[1]||"";try{return{event:e,data:JSON.parse(a)}}catch{return{event:e,data:a}}}async function pe({apiBase:t,botId:e,conversationId:a,message:r,onToken:c,onLeadForm:p}){let i=await fetch(`${t.replace(/\/$/,"")}/api/chat/${encodeURIComponent(e)}`,{method:"POST",headers:{"Content-Type":"application/json",Accept:"text/event-stream"},body:JSON.stringify({conversationId:a,message:r})});if(!i.ok||!i.body)throw new Error("Chat is temporarily unavailable.");let m=i.body.getReader(),v=new TextDecoder,u="";for(;;){let{done:w,value:k}=await m.read();if(w)break;u+=v.decode(k,{stream:!0});let x=u.split(/\n\n/);u=x.pop(),x.forEach(E=>{let g=ye(E);g.event==="token"&&c(g.data.token||""),g.event==="lead_form"&&p(g.data),g.event==="conversation"&&localStorage.setItem(`cb-conversation-${e}`,g.data.conversationId)})}}function we(t){let e=t.length===4?`#${t[1]}${t[1]}${t[2]}${t[2]}${t[3]}${t[3]}`:t,a=[1,3,5].map(r=>parseInt(e.slice(r,r+2),16)/255).map(r=>r<=.03928?r/12.92:((r+.055)/1.055)**2.4);return a[0]*.2126+a[1]*.7152+a[2]*.0722>.179?"#111827":"#ffffff"}function de(t,e){let a=e.theme.mode==="dark";t.style.setProperty("--cb-primary",e.theme.primaryColor),t.style.setProperty("--cb-on-primary",we(e.theme.primaryColor)),t.style.setProperty("--cb-bg",a?"#111827":"#ffffff"),t.style.setProperty("--cb-surface",a?"#1f2937":"#f8fafc"),t.style.setProperty("--cb-text",a?"#f9fafb":"#172033"),t.style.setProperty("--cb-muted",a?"#cbd5e1":"#64748b"),t.style.setProperty("--cb-radius",`${e.theme.borderRadius}px`),t.style.setProperty("--cb-font",e.theme.fontFamily)}var o=(t,e,a)=>{let r=document.createElement(t);return e&&(r.className=e),a!==void 0&&(r.textContent=a),r},J=(t,e="")=>{let a=document.createElementNS("http://www.w3.org/2000/svg","svg");return a.setAttribute("viewBox","0 0 24 24"),a.setAttribute("aria-hidden","true"),e&&a.setAttribute("class",e),t.forEach(r=>{let c=document.createElementNS("http://www.w3.org/2000/svg",r.tag||"path");Object.keys(r).forEach(p=>{p!=="tag"&&c.setAttribute(p,r[p])}),a.append(c)}),a},ke=()=>J([{d:"M20 11.5a7.5 7.5 0 0 1-7.8 7.49 8.7 8.7 0 0 1-3.12-.58L4 20l1.5-4.2A7.25 7.25 0 0 1 4 11.5 7.5 7.5 0 0 1 11.75 4 7.5 7.5 0 0 1 20 11.5Z"},{d:"M8.5 11.5h.01M12 11.5h.01M15.5 11.5h.01"}],"cb-icon cb-icon-chat"),be=(t="cb-icon cb-icon-close")=>J([{d:"m7 7 10 10M17 7 7 17"}],t),Ce=()=>J([{d:"M12 19V5M6.5 10.5 12 5l5.5 5.5"}]),G=t=>t.split(/\s+/).filter(Boolean).slice(0,2).map(e=>e[0]).join("").toUpperCase()||"AI",Ee=()=>new Intl.DateTimeFormat(void 0,{hour:"numeric",minute:"2-digit"}).format(new Date);function le(t,e){t.replaceChildren();let a=(c,p)=>p.split(/(\*\*[^*]+\*\*|\*[^*]+\*|https?:\/\/[^\s]+)/g).forEach(i=>{if(i)if(/^\*\*[^*]+\*\*$/.test(i))c.append(o("strong","",i.slice(2,-2)));else if(/^\*[^*]+\*$/.test(i))c.append(o("em","",i.slice(1,-1)));else if(/^https?:\/\//.test(i)){let m=o("a","",i);m.href=i,m.target="_blank",m.rel="noopener noreferrer",c.append(m)}else c.append(document.createTextNode(i))}),r;String(e||"").split(`
`).forEach(c=>{let p=/^\s*[-*]\s+(.+)$/.exec(c);if(p){r||(r=o("ul"),t.append(r));let i=o("li");a(i,p[1]),r.append(i)}else{r=null;let i=o("p");a(i,c),t.append(i)}})}function me({container:t,botId:e,apiBase:a,config:r,failed:c,onUpdate:p}){let i=o("div","cb-host"),m=i.attachShadow({mode:"open"}),v=o("style"),u=!1;v.textContent=ce,m.append(v),de(i,r);let w=o("div",`cb-root ${t?"":`cb-fixed cb-${r.theme.position}`}`),k=o("div","cb-launch-area"),x=o("button","cb-launcher");x.type="button",x.setAttribute("aria-label",`Open ${r.texts.botName} chat`),x.setAttribute("aria-expanded","false"),x.append(ke(),be()),r.texts.launcherLabel&&k.append(o("span","cb-launch-label",r.texts.launcherLabel)),k.append(x);let E=o("div","cb-teaser",r.texts.greetingMessage.slice(0,140)),g=o("button","cb-teaser-close","\xD7");g.type="button",g.setAttribute("aria-label","Dismiss greeting"),E.append(g),k.append(E);let $=o("section","cb-window");$.setAttribute("role","dialog"),$.setAttribute("aria-label",`${r.texts.botName} chat`),$.setAttribute("aria-modal","true");let _=o("header","cb-header"),D=r.texts.avatarUrl?o("img","cb-avatar"):o("div","cb-avatar cb-avatar-initials",G(r.texts.botName));r.texts.avatarUrl&&(D.src=r.texts.avatarUrl,D.alt="");let R=o("div","cb-head-copy");R.append(o("div","cb-title",r.texts.botName));let K=o("div","cb-presence");K.append(o("span","cb-online"),document.createTextNode("Online \xB7 Typically replies instantly")),R.append(K);let S=o("button","cb-close");S.type="button",S.setAttribute("aria-label","Close chat"),S.append(be("cb-icon cb-close-icon")),_.append(D,R,S);let h=o("div","cb-messages");h.setAttribute("aria-live","polite");let L=o("button","cb-scroll-bottom","\u2193");L.type="button",L.hidden=!0,L.setAttribute("aria-label","Scroll to latest message");let N=o("div","cb-chips"),z=o("div","cb-typing-row");z.hidden=!0;let X=o("div","cb-typing-bubble");X.append(o("span","cb-dot"),o("span","cb-dot"),o("span","cb-dot")),z.append(o("div","cb-message-avatar",G(r.texts.botName)),X);let U=o("form","cb-compose"),d=o("textarea","cb-input");d.rows=1,d.placeholder=r.texts.inputPlaceholder,d.setAttribute("aria-label",r.texts.inputPlaceholder);let C=o("button","cb-send");C.type="submit",C.disabled=!0,C.setAttribute("aria-label","Send message"),C.append(Ce()),U.append(d,C),$.append(_,h,N,z,U),r.branding.showBadge&&$.append(o("footer","cb-footer","Powered by Chatbot")),w.append(k,$),m.append(w);let O=t||document.body;O&&O!==document.body&&O.replaceChildren(),O.append(i);let P=!1,j=!1,B="",Z="",ee="",te=!1,W=`cb-teaser-${e}`,M=()=>{h.scrollTop=h.scrollHeight},re=()=>h.scrollHeight-h.scrollTop-h.clientHeight<80,ue=()=>{let n=o("div","cb-message-avatar");if(r.texts.avatarUrl){let s=o("img");s.src=r.texts.avatarUrl,s.alt="",n.append(s)}else n.textContent=G(r.texts.botName);return n},H=(n,s)=>{let b=Ee(),l=o("div",`cb-message-row cb-${n}-row${n===Z&&b===ee?" cb-grouped":""}`),A=o("div","cb-message-wrap"),f=o("div",`cb-message cb-${n}`);return n==="bot"?(f.classList.add("cb-markdown"),le(f,s),l.append(ue())):f.textContent=s,A.append(f,o("time","cb-timestamp",b)),l.append(A),h.append(l),Z=n,ee=b,M(),{row:l,bubble:f}},Y=n=>{P=n,$.classList.toggle("cb-open",n),x.classList.toggle("cb-active",n),x.setAttribute("aria-expanded",String(n)),n?(E.classList.remove("cb-visible"),localStorage.setItem(W,"seen"),setTimeout(()=>d.focus(),210)):x.focus()},ge=()=>{te||(te=!0,N.hidden=!0)},ae=()=>{d.style.height="auto",d.style.height=`${Math.min(d.scrollHeight,96)}px`},he=n=>{let s=o("form","cb-form");s.noValidate=!0,s.append(o("p","cb-form-title","Request an appointment"));let b=o("p","cb-form-error");b.hidden=!0,(n.fields||[]).forEach(l=>{let A=o("label","",l.label||l.name),f=o("input");f.name=l.name,f.required=!0,f.autocomplete=l.name==="phone"?"tel":"name",A.append(f),s.append(A)});let y=o("button","","Send request");y.type="submit",s.append(b,y),s.addEventListener("submit",async l=>{if(l.preventDefault(),!s.reportValidity()){b.textContent="Please complete the required fields.",b.hidden=!1;return}y.disabled=!0,b.hidden=!0;try{let A=Object.fromEntries(new FormData(s));if(!(await fetch(`${a.replace(/\/$/,"")}/api/leads/${encodeURIComponent(e)}`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({conversationId:localStorage.getItem(`cb-conversation-${e}`),fields:A})})).ok)throw new Error;s.replaceWith(o("p","cb-form-success","Thanks! We'll contact you soon.")),M()}catch{y.disabled=!1,b.textContent="We could not send your request. Please try again.",b.hidden=!1}}),h.append(s),M()},q=async n=>{if(!n.trim()||j)return;B=n.trim(),ge(),H("user",B),d.value="",ae(),j=!0,d.disabled=!0,C.disabled=!0,z.hidden=!1,M();let s=H("bot",""),b="";try{await pe({apiBase:a,botId:e,conversationId:localStorage.getItem(`cb-conversation-${e}`),message:B,onToken:y=>{b+=y,le(s.bubble,b),re()&&M()},onLeadForm:he}),b||s.row.remove()}catch(y){s.bubble.classList.add("cb-error"),s.bubble.replaceChildren(document.createTextNode(y.message||"Unable to send message."));let l=o("button","cb-retry","Retry");l.type="button",l.addEventListener("click",()=>{s.row.remove(),q(B)}),s.bubble.append(l)}finally{j=!1,d.disabled=!1,d.focus(),C.disabled=!d.value.trim(),z.hidden=!0}};H("bot",c&&r.texts.offlineMessage?r.texts.offlineMessage:r.texts.greetingMessage),r.texts.starterQuestions.forEach(n=>{let s=o("button","cb-chip",n);s.type="button",s.addEventListener("click",()=>q(n)),N.append(s)}),r.texts.starterQuestions.length||N.remove(),localStorage.getItem(W)||setTimeout(()=>{P||E.classList.add("cb-visible")},3e3),g.addEventListener("click",()=>{E.classList.remove("cb-visible"),localStorage.setItem(W,"seen")}),x.addEventListener("click",()=>Y(!P)),S.addEventListener("click",()=>Y(!1)),U.addEventListener("submit",n=>{n.preventDefault(),q(d.value)}),d.addEventListener("input",()=>{ae(),C.disabled=j||!d.value.trim()}),d.addEventListener("keydown",n=>{n.key==="Enter"&&!n.shiftKey&&(n.preventDefault(),U.requestSubmit())}),h.addEventListener("scroll",()=>{L.hidden=re()}),L.addEventListener("click",M),h.append(L);let oe=n=>{n.key==="Escape"&&P&&Y(!1)};return document.addEventListener("keydown",oe),{destroy(){u||(u=!0,document.removeEventListener("keydown",oe),i.remove())},update(n){u||p(n)}}}var F=new Map;function $e(t){try{return t&&t.src?new URL(t.src,window.location.href).origin:window.location.origin}catch{return window.location.origin}}async function xe(t={}){let e=t.script,a=t.botId||e&&e.dataset.botId;if(!a)throw new Error("ChatbotWidget requires a botId.");let r=t.container||a;if(F.has(r))return F.get(r);let c=t.apiBase||e&&e.dataset.apiBase||$e(e),p=t.config,i=!1;if(!p)try{p=await se(c,a)}catch{p={},i=!0}let m=Q(I(p,ie(e))),v,u=k=>{m=Q(I(m,k)),v&&v.destroy(),v=me({container:t.container,botId:a,apiBase:c,config:m,failed:i,onUpdate:u}),w.destroy=()=>{v.destroy(),F.delete(r)}},w={update:u,destroy(){}};return u({}),F.set(r,w),w}window.ChatbotWidget=window.ChatbotWidget||{};window.ChatbotWidget.init=xe;var V=document.currentScript;if(V&&V.dataset.botId){let t=()=>xe({script:V});document.readyState==="loading"?document.addEventListener("DOMContentLoaded",t,{once:!0}):t()}})();
