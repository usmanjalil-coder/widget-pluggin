export const styles = `
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
`;
