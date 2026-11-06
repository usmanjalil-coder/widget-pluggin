"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Check, CircleCheck, RotateCcw, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { brand } from "@/lib/brand";
import styles from "./HeroDemo.module.css";

const HERO_DEMO_LOOPS = 3;
const QUESTION = "Do you have evening appointments?";
const LABELS = ["Visitor asks", "Bot answers", "Lead captured", "You follow up"];
const TIMELINE = [
  ...Array.from({ length: QUESTION.length + 1 }, (_, characters) => ({
    at: (characters / QUESTION.length) * 1900,
    characters,
  })),
  ...[2000, 4000, 4500, 5000, 5500, 6200, 6900, 7600, 8000, 9000, 12000].map(
    (at) => ({ at, characters: QUESTION.length }),
  ),
];
const FINAL_STEP = TIMELINE.findIndex(({ at }) => at === 9000);
const FIELDS = [
  ["Name", "Sarah M.", 5500],
  ["Email", "sarah@example.com", 6200],
  ["Preferred time", "Tue 6:00 PM", 6900],
];
const LEADS = [
  ["Alex R.", "Confirmed", "18m ago"],
  ["Jamie K.", "New", "1h ago"],
  ["Taylor B.", "Confirmed", "2h ago"],
];

export default function HeroDemo() {
  const frame = useRef(null);
  const [step, setStep] = useState(FINAL_STEP);

  const [run, setRun] = useState(0);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    const element = frame.current;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    let current = 0;
    let loops = 0;
    let visible = false;
    let timer = null;
    let startedAt = 0;
    let remaining = TIMELINE[1].at;

    const pause = () => {
      if (timer === null) return;
      window.clearTimeout(timer);
      timer = null;
      remaining = Math.max(0, remaining - (performance.now() - startedAt));
    };

    const advance = () => {
      timer = null;
      if (current === TIMELINE.length - 1 && ++loops === HERO_DEMO_LOOPS) {
        current = FINAL_STEP;
        setStep(current);
        setFinished(true);
        element.dataset.paused = "true";
        return;
      }
      current = (current + 1) % TIMELINE.length;
      setStep(current);
      remaining = (TIMELINE[current + 1]?.at ?? 13000) - TIMELINE[current].at;
      schedule();
    };

    const schedule = () => {
      const running = loops < HERO_DEMO_LOOPS && visible && !document.hidden && !media.matches;
      element.dataset.paused = String(!running);
      if (!running || timer !== null) return;
      startedAt = performance.now();
      timer = window.setTimeout(advance, remaining);
    };

    const updatePlayback = () => {
      pause();
      if (media.matches) setStep(FINAL_STEP);
      else setStep(current);
      schedule();
    };

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      updatePlayback();
    }, { threshold: 0.15 });

    observer.observe(element);
    document.addEventListener("visibilitychange", updatePlayback);
    media.addEventListener("change", updatePlayback);
    updatePlayback();

    return () => {
      pause();
      observer.disconnect();
      document.removeEventListener("visibilitychange", updatePlayback);
      media.removeEventListener("change", updatePlayback);
    };
  }, [run]);

  const { at, characters } = TIMELINE[step];
  const captured = at >= 9000;
  const confirmed = at >= 8000;
  const active = at < 2000 ? 0 : at < 5000 ? 1 : at < 9000 ? 2 : 3;

  return (
    <div className="relative min-w-0">
      <p className="sr-only">
        Sample demo of a visitor asking about evening appointments, the assistant answering,
        and a sample lead appearing in the dashboard for follow-up.
      </p>
      <div ref={frame} data-paused="true" className={styles.demo}>
        <div className="mb-3 flex items-center gap-1">
          {LABELS.map((label, index) => (
            <span
              key={label}
              aria-hidden="true"
              className={`hidden sm:flex items-center gap-1 rounded-md px-1 py-2 text-[10px] font-medium sm:text-[11px] ${index === active ? "bg-accent text-primary" : "text-muted-foreground"}`}
            >
              <span className="flex size-4 shrink-0 items-center justify-center rounded-full border border-current">
                {index + 1}
              </span>
              {label}
            </span>
          ))}
          <button
            type="button"
            aria-label="Replay demo"
            disabled={!finished}
            onClick={() => {
              setFinished(false);
              setStep(0);
              setRun((previous) => previous + 1);
            }}
            className={`ml-auto inline-flex shrink-0 items-center gap-1 rounded-md p-2 text-[11px] font-medium text-muted-foreground hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring motion-reduce:invisible ${finished ? "" : "invisible"}`}
          >
            <RotateCcw className="size-3.5" aria-hidden="true" />
            <span className="hidden sm:inline">Replay</span>
          </button>
        </div>
        <div aria-hidden="true" className="rounded-xl border border-border bg-card p-3 shadow-lg sm:p-4">
          <div className={`${styles.scene} ${at >= 12000 ? styles.fading : ""} grid h-[400px] min-w-0 gap-3 md:grid-cols-[1.15fr_1fr]`}>
            <div className="flex min-h-0 min-w-0 flex-col overflow-hidden rounded-xl border border-border bg-background">
              <div className="flex shrink-0 items-center gap-2 border-b border-border bg-card px-3 py-3">
                <Image src={brand.iconPath} alt="" width={28} height={28} unoptimized />
                <div>
                  <p className="text-xs font-semibold text-foreground">Tellvira assistant</p>
                  <p className="text-[10px] text-muted-foreground">Sample conversation</p>
                </div>
                <span className="ml-auto size-2 rounded-full bg-success" />
              </div>
              <div className="flex min-h-0 flex-1 flex-col justify-end overflow-hidden p-3">
                <div className="shrink-0 space-y-2 text-[11px] leading-[1.55] text-foreground sm:text-xs">
                  {at >= 2000 && (
                    <p className="ml-4 rounded-xl rounded-br-sm bg-primary px-3 py-2 text-primary-foreground">
                      {QUESTION}
                    </p>
                  )}
                  {at >= 2000 && at < 4000 && (
                    <div className={`${styles.dots} flex w-fit gap-1 rounded-xl bg-muted px-4 py-3`}>
                      <span /><span /><span />
                    </div>
                  )}
                  {at >= 4000 && (
                    <p className="mr-3 rounded-xl rounded-bl-sm bg-muted px-3 py-2">
                      Yes, we are open until 7 PM on Tuesdays and Thursdays. Would you like me to book a visit?
                    </p>
                  )}
                  {at >= 4500 && (
                    <p className="ml-auto w-fit rounded-xl rounded-br-sm bg-primary px-3 py-2 text-primary-foreground">
                      Yes please
                    </p>
                  )}
                  {at >= 5000 && !confirmed && (
                    <div key="form" className={`${styles.form} space-y-2 rounded-xl border border-border bg-card p-3`}>
                      {FIELDS.map(([label, value, filledAt]) => (
                        <div key={label}>
                          <p className="mb-0.5 text-[10px] text-muted-foreground">{label}</p>
                          <div className="flex h-7 items-center rounded-md border border-input bg-background px-2 text-[11px]">
                            {at >= filledAt ? value : <span className="text-muted-foreground">…</span>}
                          </div>
                        </div>
                      ))}
                      <Button
                        type="button"
                        tabIndex={-1}
                        size="sm"
                        className={`h-7 w-full pointer-events-none text-[11px] ${at >= 7600 ? styles.pressed : ""}`}
                      >
                        Submit
                      </Button>
                    </div>
                  )}
                  {confirmed && (
                    <p className="flex items-start gap-1.5 rounded-xl rounded-bl-sm bg-accent px-3 py-2 text-accent-foreground">
                      <CircleCheck className="mt-0.5 size-4 shrink-0 text-success" />
                      Thanks Sarah, we will confirm shortly.
                    </p>
                  )}
                </div>
              </div>
              <div className="flex h-11 shrink-0 items-center gap-2 border-t border-border px-3 text-[11px] text-muted-foreground">
                <span className="min-w-0 flex-1 truncate">
                  {at < 2000 ? QUESTION.slice(0, characters) : "Type your message…"}
                  {at < 2000 && <span className={styles.caret}>|</span>}
                </span>
                <Send className="size-3.5 shrink-0 text-primary" />
              </div>
            </div>
            <div className="relative hidden min-w-0 flex-col rounded-xl border border-border bg-background p-3 md:flex">
              <div className="rounded-lg border border-border bg-muted/30 p-3">
                <div className="flex items-start justify-between gap-2 text-muted-foreground">
                  <p className="text-xs">Leads captured</p>
                  <span className="text-[10px]">Sample</span>
                </div>
                <p className="mt-2 text-xl font-semibold tabular-nums">{captured ? 37 : 36}</p>
              </div>
              <p className="mb-2 mt-4 text-xs font-medium text-foreground">Latest leads</p>
              <div className="grid min-h-0 flex-1 auto-rows-fr overflow-hidden rounded-lg border border-border text-[11px]">
                {captured && (
                  <div className={`${styles.lead} flex items-center justify-between gap-1 border-b border-border bg-accent px-2 py-3 text-accent-foreground`}>
                    <span className="font-medium">Sarah M. - New</span>
                    <span className="text-[10px]">Just now</span>
                  </div>
                )}
                {LEADS.map(([name, status, time]) => (
                  <div key={name} className="flex items-center gap-1 border-b border-border px-2 py-3 last:border-0">
                    <span className="flex-1 font-medium text-foreground">{name}</span>
                    <span className="rounded-full bg-accent px-1 py-0.5 text-[9px] text-accent-foreground">{status}</span>
                    <span className="text-[9px] text-muted-foreground">{time}</span>
                  </div>
                ))}
              </div>
              <div className={`${styles.toast} ${captured ? styles.visible : ""} mt-3 flex shrink-0 items-center gap-2 rounded-lg border border-primary/20 bg-card p-3 text-xs font-medium text-foreground shadow-sm`}>
                <CircleCheck className="size-4 text-success" /> New lead captured
              </div>
            </div>
          </div>
          <div className={`${styles.scene} ${at >= 12000 ? styles.fading : ""} h-14 pt-3 md:hidden`}>
            <div className={`${styles.toast} ${captured ? styles.visible : ""} flex items-center gap-2 rounded-lg border border-primary/20 bg-accent px-3 py-2 text-xs text-accent-foreground`}>
              <Check className="size-4 text-success" />
              <span className="font-medium">New lead captured</span>
              <span className="ml-auto">Sarah M.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
