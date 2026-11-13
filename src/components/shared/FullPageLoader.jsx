"use client";

import { useEffect, useId, useState } from "react";
import styles from "./FullPageLoader.module.css";

export default function FullPageLoader({ label = "Loading", ready = false, children }) {
  const [visible, setVisible] = useState(false);
  const gradientId = `loader-logo-gradient-${useId().replaceAll(":", "")}`;

  // 150ms delay: tez loads par flash na ho
  useEffect(() => {
    const id = setTimeout(() => setVisible(true), 150);
    return () => clearTimeout(id);
  }, []);

  if (ready) return children;

  return (
    <div className={styles.wrap} role="status" aria-live="polite">
      {visible && (
        <svg
          className={styles.logo}
          viewBox="108 110 296 292"
          width="88"
          height="88"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="var(--logo-from)" />
              <stop offset="100%" stopColor="var(--logo-to)" />
            </linearGradient>
          </defs>
          <g className={styles.all}>
            <path
              className={styles.bubble}
              fill={`url(#${gradientId})`}
              d="M180 110H332A72 72 0 0 1 404 182V273A72 72 0 0 1 332 345H300L228 394Q213 402 213 384V345H180A72 72 0 0 1 108 273V182A72 72 0 0 1 180 110Z"
            />
            <rect
              className={styles.bar}
              fill="var(--background)"
              x="148"
              y="160"
              width="218"
              height="55"
              rx="27.5"
            />
            <path
              className={styles.stem}
              fill="var(--background)"
              d="M228 200H295V322L236 369Q228 375 228 365Z"
            />
            <path
              className={styles.leaf}
              fill="var(--logo-accent)"
              d="M297 330V270C297 246 312 232 336 232H386V262C386 300 362 330 322 330Z"
            />
          </g>
        </svg>
      )}
      <span className={styles.srOnly}>{label}</span>
    </div>
  );
}
