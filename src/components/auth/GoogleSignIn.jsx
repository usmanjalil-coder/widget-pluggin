"use client";

import Script from "next/script";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import { completeLogin, googleLogin } from "@/lib/api/auth.api";

const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
const failure = "Unable to sign in with Google. Please try again.";

export default function GoogleSignIn({ destination }) {
  const router = useRouter();
  const { resolvedTheme } = useTheme();
  const wrapper = useRef(null);
  const host = useRef(null);
  const pending = useRef(false);
  const destinationRef = useRef(destination);
  const [ready, setReady] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    destinationRef.current = destination;
  }, [destination]);

  useEffect(() => {
    const id = window.google?.accounts?.id;
    if (!ready || !id) return;
    let active = true;
    id.initialize({
      client_id: clientId,
      use_fedcm_for_button: true,
      callback: async ({ credential }) => {
        if (!active || pending.current) return;
        const next = destinationRef.current;
        pending.current = true;
        setBusy(true);
        setError("");
        try {
          const result = await googleLogin(credential);
          if (active) await completeLogin(result, router, next);
        } catch {
          if (active) setError(failure);
        } finally {
          pending.current = false;
          setBusy(false);
        }
      },
    });
    return () => { active = false; };
  }, [ready, router]);

  useEffect(() => {
    const id = window.google?.accounts?.id;
    const container = wrapper.current;
    const button = host.current;
    if (!ready || !id || !container || !button) return;

    let lastWidth;
    const renderButton = () => {
      const width = Math.min(400, Math.max(200, Math.floor(container.getBoundingClientRect().width)));
      if (width === lastWidth) return;
      lastWidth = width;
      button.replaceChildren();
      id.renderButton(button, {
        type: "standard",
        theme: resolvedTheme === "dark" ? "filled_black" : "outline",
        size: "large",
        text: "continue_with",
        shape: "rectangular",
        logo_alignment: "left",
        width,
      });
    };

    renderButton();
    const observer = new ResizeObserver(renderButton);
    observer.observe(container);
    return () => {
      observer.disconnect();
      button.replaceChildren();
    };
  }, [ready, resolvedTheme]);

  if (!clientId) return null;
  return (
    <div className="mb-4 w-full">
      <Script src="https://accounts.google.com/gsi/client" strategy="afterInteractive"
        onReady={() => setReady(true)} onError={() => setError(failure)} />
      <div ref={wrapper} className="flex min-h-11 w-full items-center justify-center" aria-busy={busy}>
        <div ref={host} inert={busy} className={busy ? "opacity-50" : undefined} />
      </div>
      {busy && <p role="status" className="mt-2 text-center text-sm text-muted-foreground">Signing in…</p>}
      {error && <p role="alert" className="mt-2 text-sm text-destructive">{error}</p>}
      <div className="mt-4 flex items-center gap-3 text-sm text-muted-foreground">
        <span className="h-px flex-1 bg-border" />
        or
        <span className="h-px flex-1 bg-border" />
      </div>
    </div>
  );
}
