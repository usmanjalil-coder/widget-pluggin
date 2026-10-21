"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Moon, RotateCcw, Smartphone, Sun, Monitor } from "lucide-react";
import { Button } from "@/components/ui";
import { dashboardAvatarUrl } from "@/lib/avatars";
import { getToken } from "@/lib/api";
import { WIDGET_VERSION } from "../../../widget/src/version.js";
import { Switch } from "@/components/ui/switch";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";

let widgetScriptPromise;
function loadWidget() {
  if (window.ChatbotWidget?.version === WIDGET_VERSION) return Promise.resolve();
  if (!widgetScriptPromise)
    widgetScriptPromise = new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = `/widget.js?v=${WIDGET_VERSION}`;
      script.onload = resolve;
      script.onerror = reject;
      document.head.append(script);
    });
  return widgetScriptPromise;
}

export default function AppearancePreview({
  botId,
  config,
  logoFile = null,
  mobileInline = false,
  compact = false,
  previewMessages = [],
}) {
  const desktopSlot = useRef(null);
  const mobileSlot = useRef(null);
  const host = useRef(null);
  const widget = useRef(null);
  const latestConfig = useRef(config);
  const initialPreviewMessages = useRef(previewMessages);
  const attachMobileSlot = useCallback((node) => {
    mobileSlot.current = node;
    if (node && host.current) node.appendChild(host.current);
  }, []);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [previewMode, setPreviewMode] = useState(null);
  const [device, setDevice] = useState("desktop");
  const [chatOpen, setChatOpen] = useState(true);
  const [updated, setUpdated] = useState(0);
  const [logoPreview, setLogoPreview] = useState(null);
  useEffect(() => {
    if (!logoFile) return;
    const url = URL.createObjectURL(logoFile);
    // eslint-disable-next-line react-hooks/set-state-in-effect -- Pair an external object URL with effect cleanup.
    setLogoPreview({ file: logoFile, url });
    return () => URL.revokeObjectURL(url);
  }, [logoFile]);
  const avatarUrl = logoFile && logoPreview?.file === logoFile
    ? logoPreview.url
    : dashboardAvatarUrl(config.texts?.avatarUrl);
  const effectiveConfig = useMemo(
    () => ({
      ...config,
      texts: { ...config.texts, avatarUrl },
      theme: { ...config.theme, mode: previewMode || config.theme.mode },
    }),
    [config, previewMode, avatarUrl],
  );

  useEffect(() => {
    latestConfig.current = effectiveConfig;
  }, [effectiveConfig]);

  useEffect(() => {
    if (!host.current) {
      host.current = document.createElement("div");
      host.current.className = "relative h-full w-full";
    }
    desktopSlot.current?.appendChild(host.current);
    return () => {
      host.current?.remove();
    };
  }, []);

  useEffect(() => {
    const slot = sheetOpen ? mobileSlot.current : desktopSlot.current;
    if (slot && host.current) slot.appendChild(host.current);
  }, [sheetOpen]);

  useEffect(() => {
    let cancelled = false;
    const timer = setTimeout(() => {
      void loadWidget()
        .then(async () => {
          if (cancelled || !host.current) return;
          const instance = await window.ChatbotWidget.init({
            botId,
            apiBase: process.env.NEXT_PUBLIC_API_BASE_URL,
            getAuthToken: getToken,
            container: host.current,
            config: latestConfig.current,
            defaultOpen: true,
            preview: true,
            previewMessages: initialPreviewMessages.current,
            onOpenChange: setChatOpen,
          });
          if (cancelled) instance.destroy();
          else {
            widget.current = instance;
            instance?.update(latestConfig.current);
          }
        })
        .catch(() => {
          widgetScriptPromise = undefined;
        });
    }, 0);
    return () => {
      cancelled = true;
      clearTimeout(timer);
      widget.current?.destroy();
      widget.current = null;
    };
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
    <div className="space-y-1.5">
      <div className="flex items-center justify-between gap-2">
        <h3 className="text-sm font-semibold text-foreground">Live preview</h3>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="mr-8 shrink-0 lg:mr-0"
          onClick={() => widget.current?.resetChat()}
        >
          <RotateCcw className="size-3.5" /> Reset chat
        </Button>
      </div>
      <p className="text-xs text-muted-foreground">15 test prompts per bot/hour; excluded from monthly usage.</p>
    </div>
  );

  const browserFrame = (slotRef, mobile = false) => {
    const stageHeight = compact
      ? "min-h-[700px]"
      : mobile || device === "mobile"
        ? "min-h-[700px]"
        : "min-h-[680px]";
    return (
      <div
        className={`relative mx-auto rounded-xl border border-border bg-card transition-[max-width] ${mobile ? "h-full max-w-[390px]" : device === "mobile" ? "max-w-[390px]" : "max-w-full"}`}
      >
        <div className={`relative ${mobile ? "h-full" : stageHeight}`}>
          <div ref={slotRef} className="absolute inset-0" />
        </div>
      </div>
    );
  };
  return (
    <>
      <aside
        className={
          compact
            ? "block"
            : mobileInline
              ? "block self-start"
              : "hidden self-start lg:block"
        }
      >
        <div
          className={
            compact
              ? "space-y-0"
              : "space-y-4 rounded-xl border border-border bg-card p-4 shadow-sm"
          }
        >
          {!compact && toolbar}
          <div className="rounded-xl border border-border bg-muted p-3">
            {browserFrame(desktopSlot)}
          </div>
        </div>
      </aside>
      {!mobileInline && (
        <Button
          type="button"
          className="fixed right-4 bottom-20 z-30 shadow-lg lg:hidden"
          onClick={() => setSheetOpen(true)}
        >
          Preview
        </Button>
      )}
      {!mobileInline && (
        <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
          <SheetContent
            side="bottom"
            className="h-[90dvh] w-full gap-2 rounded-t-xl p-4 lg:hidden"
            showCloseButton
          >
            <SheetHeader className="sr-only">
              <SheetTitle>Live preview</SheetTitle>
              <SheetDescription>See changes as you edit.</SheetDescription>
            </SheetHeader>
            {toolbar}
            <div className="min-h-0 flex-1 rounded-xl border border-border bg-muted p-2">
              <div className="relative mx-auto h-full max-w-[390px] overflow-hidden rounded-xl border border-border bg-card">
                <div ref={attachMobileSlot} className="relative h-full" />
              </div>
            </div>
          </SheetContent>
        </Sheet>
      )}
    </>
  );
}
