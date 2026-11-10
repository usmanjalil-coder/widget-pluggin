"use client";

import { useEffect, useState } from "react";
import styles from "./FullPageLoader.module.css";

export default function FullPageLoader({ label = "Loading", ready = false, children }) {
  const [visible, setVisible] = useState(false);

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
          <g className={styles.all}>
            <path
              className={styles.bubble}
              fill="#0F766E"
              d="M180 110H332A72 72 0 0 1 404 182V273A72 72 0 0 1 332 345H300L228 394Q213 402 213 384V345H180A72 72 0 0 1 108 273V182A72 72 0 0 1 180 110Z"
            />
            <rect
              className={styles.bar}
              fill="#fff"
              x="148"
              y="160"
              width="218"
              height="55"
              rx="27.5"
            />
            <path
              className={styles.stem}
              fill="#fff"
              d="M228 200H295V322L236 369Q228 375 228 365Z"
            />
            <path
              className={styles.leaf}
              fill="#5EEAD4"
              d="M297 330V270C297 246 312 232 336 232H386V262C386 300 362 330 322 330Z"
            />
          </g>
        </svg>
      )}
      <span className={styles.srOnly}>{label}</span>
    </div>
  );
}
