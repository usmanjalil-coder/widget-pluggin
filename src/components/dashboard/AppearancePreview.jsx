"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Moon, RotateCcw, Smartphone, Sun, Monitor } from "lucide-react";
import { Button } from "@/components/ui";
import { Switch } from "@/components/ui/switch";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";

let widgetScriptPromise;
function loadWidget() {
  if (window.ChatbotWidget) return Promise.resolve();
  if (!widgetScriptPromise) widgetScriptPromise = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "/widget.js";
    script.onload = resolve;
    script.onerror = reject;
    document.head.append(script);
  });
  return widgetScriptPromise;
}

export default function AppearancePreview({ botId, config }) {
  const desktopSlot = useRef(null);
  const mobileSlot = useRef(null);
  const host = useRef(null);
  const widget = useRef(null);
  const latestConfig = useRef(config);
  const attachMobileSlot = useCallback((node) => { mobileSlot.current = node; if (node && host.current) node.appendChild(host.current); }, []);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [previewMode, setPreviewMode] = useState(null);
  const [device, setDevice] = useState("desktop");
  const [chatOpen, setChatOpen] = useState(true);
  const [updated, setUpdated] = useState(0);
  const effectiveConfig = useMemo(() => ({ ...config, theme: { ...config.theme, mode: previewMode || config.theme.mode } }), [config, previewMode]);

  useEffect(() => { latestConfig.current = effectiveConfig; }, [effectiveConfig]);

  useEffect(() => {
    if (!host.current) {
      host.current = document.createElement("div");
      host.current.className = "relative h-full w-full";
    }
    desktopSlot.current?.appendChild(host.current);
    return () => { host.current?.remove(); };
  }, []);

  useEffect(() => {
    const slot = sheetOpen ? mobileSlot.current : desktopSlot.current;
    if (slot && host.current) slot.appendChild(host.current);
  }, [sheetOpen]);

  useEffect(() => {
    let cancelled = false;
    const timer = setTimeout(() => { void loadWidget().then(async () => {
      if (cancelled || !host.current) return;
      const instance = await window.ChatbotWidget.init({
        botId, container: host.current, config: latestConfig.current, defaultOpen: true,
        onOpenChange: setChatOpen,
      });
      if (cancelled) instance.destroy();
      else widget.current = instance;
    }).catch(() => { widgetScriptPromise = undefined; }); }, 0);
    return () => { cancelled = true; clearTimeout(timer); widget.current?.destroy(); widget.current = null; };
  }, [botId]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!widget.current) return;
      widget.current.update(effectiveConfig);
      setUpdated(Date.now());
    }, 150);
    return () => clearTimeout(timer);
  }, [effectiveConfig]);

  const toolbar = (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="text-sm font-semibold text-foreground">Live preview</h3>
        <Button type="button" variant="outline" size="sm" className="mr-8 lg:mr-0" onClick={() => widget.current?.resetChat()}>
          <RotateCcw className="size-3.5" /> Reset chat
        </Button>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <div className="inline-flex rounded-lg border border-border bg-muted p-1" aria-label="Preview theme">
          {[["light", Sun], ["dark", Moon]].map(([mode, Icon]) => <Button key={mode} type="button" variant="ghost" size="sm" aria-pressed={(previewMode || config.theme.mode) === mode} onClick={() => setPreviewMode(mode)} className={(previewMode || config.theme.mode) === mode ? "bg-card shadow-sm" : "text-muted-foreground"}><Icon className="size-3.5" /> {mode}</Button>)}
        </div>
        <div className="inline-flex rounded-lg border border-border bg-muted p-1" aria-label="Preview size">
          {[["desktop", Monitor], ["mobile", Smartphone]].map(([size, Icon]) => <Button key={size} type="button" variant="ghost" size="sm" aria-pressed={device === size} onClick={() => setDevice(size)} className={device === size ? "bg-card shadow-sm" : "text-muted-foreground"}><Icon className="size-3.5" /> {size}</Button>)}
        </div>
      </div>
      <div className="flex items-center justify-between gap-3 text-xs text-muted-foreground"><span>Open chat</span><Switch aria-label="Open chat in preview" checked={chatOpen} onCheckedChange={(value) => { setChatOpen(value); if (value) widget.current?.open(); else widget.current?.close(); }} /></div>
      <p role="status" className="text-xs text-muted-foreground">Live preview • {updated ? "updated just now" : "ready"}</p>
    </div>
  );

  const browserFrame = (slotRef, mobile = false) => <div className={`relative mx-auto overflow-hidden rounded-xl border border-border bg-card transition-[max-width] ${mobile ? "h-full max-w-[390px]" : device === "mobile" ? "max-w-[390px]" : "max-w-full"}`}><div className="flex h-9 items-center gap-1.5 border-b border-border bg-muted/60 px-3"><span className="size-1.5 rounded-full bg-border" /><span className="size-1.5 rounded-full bg-border" /><span className="size-1.5 rounded-full bg-border" /><span className="ml-3 truncate rounded-md border border-border bg-card px-3 py-0.5 text-[10px] text-muted-foreground">example.com</span></div><div className={mobile ? "relative h-[calc(100%-2.25rem)]" : "relative h-[min(540px,calc(100vh-22rem))] min-h-[350px]"}><div className="pointer-events-none absolute inset-0 p-6"><div className="h-2 w-20 rounded-full bg-border/70" /><div className="mt-6 h-4 w-2/3 rounded-full bg-border/70" /><div className="mt-2 h-2 w-1/2 rounded-full bg-border/50" /></div><div ref={slotRef} className="relative h-full w-full" /></div></div>;
  return <>
    <aside className="hidden max-h-[calc(100vh-3rem)] self-start lg:sticky lg:top-6 lg:block">
      <div className="space-y-4 rounded-xl border border-border bg-card p-4 shadow-sm">
        {toolbar}
        <div className="rounded-xl border border-border bg-muted p-3">{browserFrame(desktopSlot)}</div>
      </div>
    </aside>
    <Button type="button" className="fixed right-4 bottom-20 z-30 shadow-lg lg:hidden" onClick={() => setSheetOpen(true)}>Preview</Button>
    <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
      <SheetContent side="bottom" className="h-[90dvh] w-full gap-2 rounded-t-xl p-4 lg:hidden" showCloseButton>
        <SheetHeader className="sr-only"><SheetTitle>Live preview</SheetTitle><SheetDescription>See changes as you edit.</SheetDescription></SheetHeader>
        {toolbar}
        <div className="min-h-0 flex-1 rounded-xl border border-border bg-muted p-2"><div className="relative mx-auto h-full max-w-[390px] overflow-hidden rounded-xl border border-border bg-card"><div className="flex h-9 items-center gap-1.5 border-b border-border bg-muted/60 px-3"><span className="size-1.5 rounded-full bg-border" /><span className="size-1.5 rounded-full bg-border" /><span className="size-1.5 rounded-full bg-border" /><span className="ml-3 rounded-md border border-border bg-card px-3 py-0.5 text-[10px] text-muted-foreground">example.com</span></div><div ref={attachMobileSlot} className="relative h-[calc(100%-2.25rem)]" /></div></div>
      </SheetContent>
    </Sheet>
  </>;
}
