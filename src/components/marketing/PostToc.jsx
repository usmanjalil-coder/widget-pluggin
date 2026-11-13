"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export function PostToc({ items }) {
  const [active, setActive] = useState("");
  const root = useRef(null);
  const sidebar = useRef(null);
  const details = useRef(null);
  const selected = useRef(null);

  useEffect(() => {
    const headings = items.map(({ id }) => document.getElementById(id)).filter(Boolean);
    const article = root.current.closest("article");
    const header = document.querySelector("header");
    let observer;
    let offset = 96;
    const update = () => {
      if (selected.current > Date.now()) return;
      if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2) {
        setActive(items.at(-1)?.id || "");
        return;
      }
      const current = headings.filter((heading) => heading.getBoundingClientRect().top <= offset + 24);
      setActive(current.at(-1)?.id || "");
    };
    const observe = () => {
      offset = Math.ceil(header?.getBoundingClientRect().height || 72) + 24;
      article.style.setProperty("--toc-offset", `${offset}px`);
      observer?.disconnect();
      observer = new IntersectionObserver(update, { rootMargin: `-${offset}px 0px -65% 0px` });
      headings.forEach((heading) => observer.observe(heading));
    };
    const readHash = () => {
      try {
        const id = decodeURIComponent(window.location.hash.slice(1));
        if (items.some((item) => item.id === id)) {
          selected.current = Date.now() + 1500;
          setActive(id);
          return;
        }
      } catch {}
      update();
    };
    const closeDetails = () => { if (details.current) details.current.open = false; };
    const desktop = window.matchMedia("(min-width: 1024px)");
    const resizeDetails = () => { if (desktop.matches) closeDetails(); };
    const escapeDetails = (event) => {
      if (event.key === "Escape" && details.current?.open) {
        closeDetails();
        details.current.querySelector("summary")?.focus();
      }
    };
    desktop.addEventListener("change", resizeDetails);
    window.addEventListener("hashchange", closeDetails);
    window.addEventListener("keydown", escapeDetails);
    const finishScroll = () => { selected.current = null; update(); };
    const interruptScroll = () => { selected.current = null; };
    observe();
    readHash();
    const resize = new ResizeObserver(observe);
    if (header) resize.observe(header);
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("scrollend", finishScroll);
    window.addEventListener("wheel", interruptScroll, { passive: true });
    window.addEventListener("touchstart", interruptScroll, { passive: true });
    window.addEventListener("keydown", interruptScroll);
    window.addEventListener("hashchange", readHash);
    return () => {
      observer?.disconnect();
      resize.disconnect();
      desktop.removeEventListener("change", resizeDetails);
      window.removeEventListener("hashchange", closeDetails);
      window.removeEventListener("keydown", escapeDetails);
      window.removeEventListener("scroll", update);
      window.removeEventListener("scrollend", finishScroll);
      window.removeEventListener("wheel", interruptScroll);
      window.removeEventListener("touchstart", interruptScroll);
      window.removeEventListener("keydown", interruptScroll);
      window.removeEventListener("hashchange", readHash);
    };
  }, [items]);

  useEffect(() => {
    const container = sidebar.current;
    const link = container.querySelector('[aria-current="location"]');
    if (!link || !container.clientHeight) return;
    const bounds = container.getBoundingClientRect();
    const target = link.getBoundingClientRect();
    if (target.top < bounds.top) container.scrollTop += target.top - bounds.top;
    else if (target.bottom > bounds.bottom) container.scrollTop += target.bottom - bounds.bottom;
  }, [active]);

  const navigate = (event, id) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
    const heading = document.getElementById(id);
    if (!heading) return;
    event.preventDefault();
    details.current.open = false;
    selected.current = Date.now() + 1500;
    setActive(id);
    window.history.replaceState(window.history.state, "", `#${encodeURIComponent(id)}`);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    heading.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
    if (reduced) selected.current = null;
  };

  const links = () => (
    <nav aria-label="On this page">
      <ul className="space-y-1">
        {items.map(({ id, text }) => (
          <li key={id}>
            <Link
              href={`#${id}`}
              aria-current={active === id ? "location" : undefined}
              onClick={(event) => navigate(event, id)}
              className={`block border-l-2 px-3 py-2 text-sm leading-6 [overflow-wrap:anywhere] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring ${active === id
                ? "border-primary font-semibold text-primary dark:border-ring dark:text-ring"
                : "border-transparent text-muted-foreground hover:border-border hover:text-foreground"}`}
            >
              {text}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );

  return (
    <aside ref={root} className="min-w-0 self-start lg:sticky lg:top-[var(--toc-offset,96px)]">
      <details ref={details} className="rounded-lg border border-border p-3 lg:hidden">
        <summary className="cursor-pointer text-sm font-semibold focus-visible:outline-2 focus-visible:outline-ring">
          On this page
        </summary>
        <div className="mt-3">{links()}</div>
      </details>
      <div ref={sidebar} className="hidden max-h-[calc(100dvh-var(--toc-offset,96px)-24px)] overflow-y-auto [scrollbar-gutter:stable] [scrollbar-width:thin] lg:block">
        <p className="mb-3 px-3 text-sm font-semibold text-foreground">On this page</p>
        {links()}
      </div>
    </aside>
  );
}
