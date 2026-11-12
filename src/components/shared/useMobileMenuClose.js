"use client";
import { useEffect, useRef } from "react";
import { flushSync } from "react-dom";
import { usePathname } from "next/navigation";

export default function useMobileMenuClose(open, setOpen, breakpoint, query = "") {
  const pathname = usePathname();
  const previous = useRef(pathname + query);
  const toggle = useRef(null);
  const escape = useRef(false);
  useEffect(() => {
    if (previous.current !== pathname + query) setOpen(false);
    previous.current = pathname + query;
  }, [pathname, query, setOpen]);
  useEffect(() => {
    if (!open) return;
    toggle.current = document.querySelector('button[aria-expanded="true"][aria-label="Toggle navigation"], button[aria-expanded="true"][aria-label="Open navigation"]') || document.activeElement;
    const media = window.matchMedia("(min-width: " + breakpoint + "px)");
    const close = () => setOpen(false);
    const resize = () => { if (media.matches) close(); };
    resize();
    window.addEventListener("hashchange", close);
    media.addEventListener("change", resize);
    return () => {
      window.removeEventListener("hashchange", close);
      media.removeEventListener("change", resize);
    };
  }, [open, setOpen, breakpoint]);
  return {
    onClick(event) {
      if (event.target.closest("a[href]")) {
        escape.current = false;
        flushSync(() => setOpen(false));
      }
    },
    onEscapeKeyDown() { escape.current = true; },
    onCloseAutoFocus(event) {
      event.preventDefault();
      if (escape.current) toggle.current?.focus();
      escape.current = false;
    },
  };
}
