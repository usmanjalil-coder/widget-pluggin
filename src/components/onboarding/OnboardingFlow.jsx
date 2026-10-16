"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AlertCircle, ChevronLeft, MessageSquare } from "lucide-react";
import { Button, Card } from "@/components/ui";
import { getOnboarding } from "@/lib/api/onboarding.api";
import { brand } from "@/lib/brand";
import AppearanceStep from "./AppearanceStep";
import BusinessStep from "./BusinessStep";
import DoneStep from "./DoneStep";
import InstallStep from "./InstallStep";
import KnowledgeStep from "./KnowledgeStep";
import Stepper from "./Stepper";
import { CONTENT, INITIAL, STEPS } from "./constants";
import { validateStep } from "./validation";

const STORAGE_KEY = "onboarding-draft";
const DESCRIPTIONS = [
  "Tell us a little about the business your assistant will represent.",
  "Give the assistant information it can use to answer accurately.",
  "Adjust the name, greeting, placement, and color before you publish.",
  "Add one snippet to make your assistant available on your website.",
];

export default function OnboardingFlow() {
  const router = useRouter();
  const [state, setState] = useState(INITIAL);
  const [loading, setLoading] = useState(true);
  const [loadFailed, setLoadFailed] = useState(false);
  const [error, setError] = useState("");
  const [later, setLater] = useState(false);
  const [storageKey, setStorageKey] = useState("");
  const headingRef = useRef(null);
  const step = Math.min(Math.max(Number(state.step) || 0, 0), 4);
  const update = useCallback((patch) => setState((current) => ({ ...current, ...patch })), []);
  const defaults = CONTENT[state.industry] || CONTENT.other;
  const assistant = state.botName || defaults[0];
  const greeting = state.greeting || defaults[1];

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        const { public_bot_id } = await getOnboarding();
        if (!mounted) return;
        if (!public_bot_id) {
          setState(INITIAL);
          return;
        }
        const storageKey = `${STORAGE_KEY}:${public_bot_id}`;
        let stored = {};
        try {
          stored = JSON.parse(window.localStorage.getItem(storageKey) || "{}");
        } catch {}
        setState({ ...INITIAL, ...stored, botId: public_bot_id });
        setStorageKey(storageKey);
      } catch (loadError) {
        if (mounted) {
          setError(loadError.message || "Could not load onboarding.");
          setLoadFailed(true);
        }
      } finally {
        if (mounted) setLoading(false);
      }
    }
    void load();
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (!loading && storageKey) window.localStorage.setItem(storageKey, JSON.stringify(state));
  }, [loading, state, storageKey]);
  useEffect(() => {
    headingRef.current?.focus();
  }, [step]);

  const config = useMemo(
    () => ({
      theme: {
        primaryColor: state.primaryColor,
        mode: "light",
        position: state.position,
        borderRadius: 16,
        fontFamily: "system",
      },
      texts: {
        botName: assistant,
        greetingMessage: greeting,
        inputPlaceholder: "Ask a question...",
        launcherLabel: "Chat with us",
        starterQuestions: defaults[2],
        offlineMessage: "We are offline right now.",
      },
      features: { leadCapture: true },
      branding: { showBadge: true },
    }),
    [state.primaryColor, state.position, assistant, greeting, defaults],
  );

  const validationError = validateStep(step, state, assistant);
  const stepValid = !validationError;

  const next = useCallback(() => {
    if (validationError) {
      setError(validationError);
      return;
    }
    setError("");
    update({ step: Math.min(step + 1, 4) });
  }, [step, update, validationError]);

  const back = useCallback(() => {
    setError("");
    update({ step: Math.max(0, step - 1) });
  }, [step, update]);

  const skip = useCallback(() => {
    if (storageKey) window.localStorage.setItem(`${storageKey}:skipped`, "true");
    router.push("/dashboard");
  }, [router, storageKey]);

  const setIndustry = useCallback((industry) => {
    if (!CONTENT[industry]) return;
    setState((current) => ({
      ...current,
      industry,
      botName:
        !current.botName || current.botName === CONTENT[current.industry]?.[0]
          ? CONTENT[industry][0]
          : current.botName,
      greeting:
        !current.greeting || current.greeting === CONTENT[current.industry]?.[1]
          ? CONTENT[industry][1]
          : current.greeting,
    }));
  }, []);

  const addLater = useCallback(() => {
    setLater(true);
    setError("");
  }, []);

  const handleKeyDown = useCallback(
    (event) => {
      if (
        event.key === "Enter" &&
        event.target.tagName !== "TEXTAREA" &&
        event.target.tagName !== "BUTTON" &&
        step < 4 &&
        stepValid
      ) {
        event.preventDefault();
        next();
      }
    },
    [step, stepValid, next],
  );

  if (loading)
    return (
      <main className="min-h-screen bg-background">
        <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
          <div className="h-8 w-40 animate-pulse rounded bg-muted" />
          <div className="mt-8 h-96 animate-pulse rounded-xl bg-muted" />
        </div>
      </main>
    );

  if (loadFailed || !state.botId)
    return (
      <main className="flex min-h-screen items-center justify-center bg-background p-4">
        <Card className="w-full max-w-md p-6 text-center">
          <h1 className="text-2xl font-semibold">Onboarding is unavailable</h1>
          <p role="alert" className="text-sm text-muted-foreground">
            {error || "No assistant was found for this account."}
          </p>
          <Button type="button" onClick={() => window.location.reload()}>
            Try again
          </Button>
          <Button asChild variant="secondary">
            <Link href="/dashboard">Go to dashboard</Link>
          </Button>
        </Card>
      </main>
    );

  const content = [
    <BusinessStep
      key="business"
      state={state}
      config={config}
      update={update}
      setIndustry={setIndustry}
    />,
    <KnowledgeStep
      key="knowledge"
      state={state}
      update={update}
      later={later}
      onAddLater={addLater}
    />,
    <AppearanceStep
      key="appearance"
      state={state}
      config={config}
      assistant={assistant}
      greeting={greeting}
      update={update}
    />,
    <InstallStep key="install" state={state} update={update} />,
    <DoneStep key="done" state={state} headingRef={headingRef} />,
  ][step];

  return (
    <main className="min-h-screen bg-background" onKeyDown={handleKeyDown}>
      <header className="border-b border-border">
        <div className="mx-auto flex h-16 max-w-4xl items-center justify-between px-4 sm:px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold text-foreground">
            <span className="grid size-8 place-items-center rounded-lg bg-primary text-primary-foreground">
              <MessageSquare className="size-4" />
            </span>
            {brand.name}
          </Link>
          {step < 4 && (
            <Button type="button" variant="ghost" onClick={skip}>
              Skip for now
            </Button>
          )}
        </div>
      </header>
      <div className="mx-auto max-w-4xl px-4 py-8 pb-28 sm:px-6 sm:py-10">
        {step < 4 && <Stepper step={step} />}
        {step < 4 && (
          <div className="mt-9">
            <h1
              ref={headingRef}
              tabIndex={-1}
              className="text-2xl font-semibold tracking-tight text-foreground focus:outline-none"
            >
              {STEPS[step]}
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">{DESCRIPTIONS[step]}</p>
          </div>
        )}
        {error && (
          <div
            role="alert"
            className="mt-5 flex items-center gap-2 rounded-lg border border-destructive/20 bg-destructive-bg p-3 text-sm text-destructive"
          >
            <AlertCircle className="size-4" />
            {error}
          </div>
        )}
        <div className="mt-6 motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-right-1 motion-safe:duration-200">
          {content}
        </div>
        {step < 4 && (
          <footer className="sticky bottom-0 mt-8 flex items-center justify-between border-t border-border bg-background/95 py-4 backdrop-blur">
            <Button type="button" variant="ghost" onClick={back} disabled={step === 0}>
              <ChevronLeft className="size-4" />
              Back
            </Button>
            <Button type="button" onClick={next} disabled={!stepValid}>
              {step === 3 ? "Continue" : "Next"}
            </Button>
          </footer>
        )}
      </div>
    </main>
  );
}
