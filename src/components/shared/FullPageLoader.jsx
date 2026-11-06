"use client";

import { useEffect, useRef, useState } from "react";

export default function FullPageLoader({ ready, children }) {
  const [visible, setVisible] = useState(false);
  const [released, setReleased] = useState(false);
  const visibleAt = useRef(null);

  useEffect(() => {
    if (ready || visible) return undefined;
    const timer = window.setTimeout(() => {
      visibleAt.current = Date.now();
      setVisible(true);
    }, 150);
    return () => window.clearTimeout(timer);
  }, [ready, visible]);

  useEffect(() => {
    if (!ready) return undefined;
    const remaining = Math.max(0, 300 - (Date.now() - (visibleAt.current ?? Date.now())));
    if (!visible) {
      // A fast load can reveal the page without ever showing the loader.
      const timer = window.setTimeout(() => setReleased(true), 0);
      return () => window.clearTimeout(timer);
    }
    const timer = window.setTimeout(() => setReleased(true), remaining);
    return () => window.clearTimeout(timer);
  }, [ready, visible]);

  if (released) return children;

  return (
    <main role="status" aria-live="polite" className="flex min-h-screen items-center justify-center bg-background">
      <span className="sr-only">Loading your dashboard</span>
      <span className={`relative grid size-52 place-items-center [perspective:700px] transition-opacity duration-150 motion-reduce:transition-none ${visible ? "opacity-100" : "opacity-0"}`}>
        <span aria-hidden="true" className="tellvira-loader-glow absolute size-40 rounded-full bg-[#5EEAD4]/15 blur-2xl" />
        <img
          src="/brand/tellvira-icon.svg"
          alt=""
          aria-hidden="true"
          width="168"
          height="168"
          className="tellvira-loader-icon relative size-[168px] object-contain"
        />
      </span>
    </main>
  );
}
