"use client";

import { useEffect, useRef } from "react";

export default function AppearancePreview({ botId, config, className = "" }) {
  const containerRef = useRef(null);
  const instanceRef = useRef(null);

  useEffect(() => {
    if (!botId || !containerRef.current) return;

    const mountPreview = async () => {
      if (!window.ChatbotWidget) return;
      if (
        instanceRef.current &&
        typeof instanceRef.current.destroy === "function"
      ) {
        instanceRef.current.destroy();
      }

      const instance = await window.ChatbotWidget.init({
        botId,
        config,
        container: containerRef.current,
      });

      instanceRef.current = instance;
    };

    if (window.ChatbotWidget) {
      void mountPreview();
      return () => {
        if (
          instanceRef.current &&
          typeof instanceRef.current.destroy === "function"
        ) {
          instanceRef.current.destroy();
        }
      };
    }

    const script = document.createElement("script");
    script.src = "/widget.js";
    script.async = true;
    script.onload = () => {
      void mountPreview();
    };
    document.head.appendChild(script);

    return () => {
      if (
        instanceRef.current &&
        typeof instanceRef.current.destroy === "function"
      ) {
        instanceRef.current.destroy();
      }
      script.remove();
    };
  }, [botId, config]);

  return (
    <div
      className={`overflow-hidden rounded-2xl border border-slate-200 bg-white ${className}`}
    >
      <div ref={containerRef} className="h-[420px] w-full" />
    </div>
  );
}
