"use client";

/* eslint-disable react-hooks/set-state-in-effect -- Preserve existing client-only query/storage synchronization in this visual-only change. */

import { Button, Input, Textarea, Label } from "@/components/ui";
import CharLimitInput from "@/components/shared/CharLimitInput";
import { TEXT_LIMITS } from "@/lib/limits";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import AppearancePreview from "@/components/appearance/AppearancePreview";
import { brand } from "@/lib/brand";

const STORAGE_KEY = "brand-onboarding";
const industryDefaults = {
  dental: {
    botName: "Dental Assistant",
    greeting:
      "Hi! I can help with opening hours, booking, and common questions about your practice.",
  },
  salon: {
    botName: "Salon Assistant",
    greeting:
      "Hi! I can help with services, pricing, and booking availability.",
  },
  "real-estate": {
    botName: "Property Assistant",
    greeting:
      "Hi! I can answer questions about listings, pricing, and scheduling a visit.",
  },
  restaurant: {
    botName: "Dining Assistant",
    greeting:
      "Hi! I can help with menu questions, reservations, and opening times.",
  },
  ecommerce: {
    botName: "Shop Assistant",
    greeting: "Hi! I can help with products, shipping, and order questions.",
  },
  other: {
    botName: "Assistant",
    greeting:
      "Hi! I can answer questions about your business and help visitors get started.",
  },
};

const defaultState = {
  businessName: "",
  websiteUrl: "",
  industry: "dental",
  knowledgeMethod: "website",
  botId: "",
  botName: "",
  primaryColor: "#2563eb",
  position: "right",
  greeting: "",
  completed: false,
  step: 0,
};

const steps = [
  "About your business",
  "Add knowledge",
  "Make it yours",
  "Install",
  "Done",
];

async function patchOnboarding(payload) {
  const response = await fetch("/api/onboarding", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Unable to save onboarding data.");
  }

  return response.json();
}

export default function OnboardingFlow() {
  const [state, setState] = useState(defaultState);
  const [errors, setErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [showSkipNote, setShowSkipNote] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (!saved) return;

    try {
      const parsed = JSON.parse(saved);
      setState((current) => ({ ...current, ...parsed }));
    } catch (_error) {
      // ignore invalid local storage payload
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const currentStep = Math.min(Math.max(state.step, 0), steps.length - 1);
  const previewConfig = useMemo(
    () => ({
      theme: {
        primaryColor: state.primaryColor,
        mode: "light",
        position: state.position,
        borderRadius: 16,
        fontFamily: "system",
      },
      texts: {
        botName: state.botName || "Assistant",
        greetingMessage:
          state.greeting || "Hi! I can help with your questions.",
        inputPlaceholder: "Ask a question…",
        launcherLabel: "Chat with us",
        starterQuestions: [
          "Book an appointment",
          "What services do you offer?",
        ],
        offlineMessage: "We are offline right now.",
      },
      features: { leadCapture: true },
      branding: { showBadge: true },
    }),
    [state.botName, state.greeting, state.position, state.primaryColor],
  );

  const validateStep = () => {
    const nextErrors = {};
    if (currentStep === 0 && !state.businessName.trim()) {
      nextErrors.businessName = "Business name is required.";
    }
    if (currentStep === 3 && !state.botId) {
      nextErrors.botId = "Create your bot before installing the snippet.";
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const updateState = (patch) => {
    setState((current) => ({ ...current, ...patch }));
  };

  const handleNext = async () => {
    if (!validateStep()) return;

    if (currentStep === 0) {
      setIsSaving(true);
      try {
        const greeting =
          state.greeting ||
          industryDefaults[state.industry]?.greeting ||
          "Hi! I can help with your business questions.";
        const response = await fetch("/api/bots", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: state.businessName.trim() || "My Business",
            greetingMessage: greeting,
            primaryColor: state.primaryColor,
          }),
        });

        const bot = await response.json();
        const defaultName = bot.name || state.businessName || "My Business";
        updateState({
          botId: bot.id,
          botName: defaultName,
          greeting,
          step: currentStep + 1,
        });
        await patchOnboarding({
          botCreated: true,
          botId: bot.id,
          businessName: state.businessName,
          websiteUrl: state.websiteUrl,
          industry: state.industry,
        });
      } catch (_error) {
        setErrors({
          general: "We could not create your bot. Please try again.",
        });
      } finally {
        setIsSaving(false);
      }
      return;
    }

    if (currentStep === 2) {
      setIsSaving(true);
      try {
        await fetch(`/api/bots/${state.botId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: state.botName || state.businessName || "My Assistant",
            theme: {
              primaryColor: state.primaryColor,
              position: state.position,
            },
            texts: {
              botName: state.botName || state.businessName || "My Assistant",
              greetingMessage:
                state.greeting || industryDefaults[state.industry]?.greeting,
            },
          }),
        });
        await patchOnboarding({
          lookCustomized: true,
          primaryColor: state.primaryColor,
          greeting: state.greeting,
        });
      } catch (_error) {
        // no-op for mock flow
      } finally {
        setIsSaving(false);
      }
    }

    if (currentStep === 3) {
      await patchOnboarding({ snippetInstalled: true, dismissed: false });
    }

    setState((current) => ({
      ...current,
      step: Math.min(current.step + 1, steps.length - 1),
    }));
  };

  const handleBack = () => {
    setState((current) => ({
      ...current,
      step: Math.max(current.step - 1, 0),
    }));
  };

  const handleSkip = async () => {
    await patchOnboarding({ skipped: true, step: "skipped" });
    // eslint-disable-next-line @next/next/no-location-assign-relative-destination -- Existing onboarding uses a full navigation after session creation.
      window.location.href = "/dashboard";
  };

  const renderStep = () => {
    if (currentStep === 0) {
      return (
        <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
          <div className="space-y-5 rounded-3xl border border-border bg-card p-6">
            <div>
              <Label className="mb-2 block text-sm font-medium text-foreground">
                Business name
              </Label>
              <Input
                value={state.businessName}
                onChange={(event) =>
                  updateState({ businessName: event.target.value })
                }
                className="w-full rounded-xl border border-border bg-card px-3 py-2.5 text-foreground"
                placeholder="Example: BrightSmile Dental"
              />
              {errors.businessName && (
                <p className="mt-2 text-sm text-destructive">
                  {errors.businessName}
                </p>
              )}
            </div>

            <div>
              <Label className="mb-2 block text-sm font-medium text-foreground">
                Website URL (optional)
              </Label>
              <Input
                value={state.websiteUrl}
                onChange={(event) =>
                  updateState({ websiteUrl: event.target.value })
                }
                className="w-full rounded-xl border border-border bg-card px-3 py-2.5 text-foreground"
                placeholder="https://yourwebsite.com"
              />
            </div>

            <div>
              <Label className="mb-2 block text-sm font-medium text-foreground">
                Industry
              </Label>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">{[["dental","Dental"],["salon","Salon"],["real-estate","Real estate"],["restaurant","Restaurant"],["ecommerce","E-commerce"],["other","Other"]].map(([value,label]) => <Button key={value} type="button" variant="outline" aria-pressed={state.industry === value} onClick={() => updateState({ industry: value, greeting: industryDefaults[value]?.greeting || "", botName: industryDefaults[value]?.botName || state.botName || "Assistant" })} className={`justify-start ${state.industry === value ? "border-primary bg-accent text-primary" : ""}`}>{label}</Button>)}</div>
            </div>
          </div>

          <div className="rounded-3xl border border-border bg-background p-6">
            <p className="text-sm uppercase tracking-[0.18em] text-muted-foreground">
              Preview
            </p>
            <div className="mt-5 rounded-2xl border border-border bg-card p-4">
              <p className="text-lg font-semibold text-foreground">
                {state.businessName || "Your business"}
              </p>
              <p className="mt-3 rounded-2xl bg-muted p-3 text-sm text-foreground">
                {state.greeting || industryDefaults[state.industry]?.greeting}
              </p>
            </div>
          </div>
        </div>
      );
    }

    if (currentStep === 1) {
      return (
        <div className="grid gap-4 md:grid-cols-3">
          {[
            {
              id: "website",
              title: "Import from my website URL",
              description: "Pull in your content automatically.",
            },
            {
              id: "files",
              title: "Upload files",
              description: "PDFs, docs, and FAQs.",
            },
            {
              id: "faq",
              title: "Paste FAQ text",
              description: "Add a written FAQ quickly.",
            },
          ].map((option) => (
            <Button variant="ghost"
              key={option.id}
              type="button"
              onClick={() => updateState({ knowledgeMethod: option.id })}
              className={`block h-auto whitespace-normal rounded-xl border p-6 text-left transition ${state.knowledgeMethod === option.id ? "border-primary/30 bg-accent" : "border-border bg-card"}`}
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-muted text-lg font-semibold text-foreground">
                {option.id === "website"
                  ? "↗"
                  : option.id === "files"
                    ? "▣"
                    : "✎"}
              </div>
              <h3 className="text-lg font-semibold text-foreground">
                {option.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {option.description}
              </p>
            </Button>
          ))}
        </div>
      );
    }

    if (currentStep === 2) {
      return (
        <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
          <div className="space-y-5 rounded-3xl border border-border bg-card p-6">
            <div>
              <CharLimitInput id="onboarding-bot-name" label="Assistant name" maxLength={TEXT_LIMITS.botName}
                value={state.botName}
                onChange={(event) =>
                  updateState({ botName: event.target.value })
                }
              />
            </div>

            <div>
              <Label className="mb-2 block text-sm font-medium text-foreground">
                Greeting
              </Label>
              <Textarea
                value={
                  state.greeting ||
                  industryDefaults[state.industry]?.greeting ||
                  ""
                }
                onChange={(event) =>
                  updateState({ greeting: event.target.value })
                }
                rows={4}
                className="w-full rounded-xl border border-border bg-card px-3 py-2.5 text-foreground"
              />
            </div>

            <div>
              <Label className="mb-2 block text-sm font-medium text-foreground">
                Position
              </Label>
              <div className="flex gap-2">
                {["left", "right"].map((position) => (
                  <Button variant="ghost"
                    key={position}
                    type="button"
                    onClick={() => updateState({ position })}
                    className={`rounded-xl px-4 py-2 text-sm font-medium ${state.position === position ? "bg-primary text-primary-foreground" : "border border-border bg-card text-foreground"}`}
                  >
                    {position}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <Label className="mb-2 block text-sm font-medium text-foreground">
                Primary color
              </Label>
              <div className="flex items-center gap-3">
                <Input
                  type="color"
                  value={state.primaryColor}
                  onChange={(event) =>
                    updateState({ primaryColor: event.target.value })
                  }
                  className="h-12 w-16 rounded-xl border border-border bg-card p-1"
                />
                <Input
                  type="text"
                  value={state.primaryColor}
                  onChange={(event) =>
                    updateState({ primaryColor: event.target.value })
                  }
                  className="w-full rounded-xl border border-border bg-card px-3 py-2.5 text-foreground"
                />
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-border bg-background p-5">
            <p className="text-sm uppercase tracking-[0.18em] text-muted-foreground">
              Preview
            </p>
            <div className="mt-4">
              <AppearancePreview
                botId={state.botId || "demo"}
                config={previewConfig}
                className="mt-4"
              />
            </div>
          </div>
        </div>
      );
    }

    if (currentStep === 3) {
      return (
        <div className="space-y-5 rounded-3xl border border-border bg-card p-6">
          <div className="rounded-2xl bg-muted p-4 text-sm text-foreground">
            <p className="font-medium text-foreground">Install code</p>
            <pre className="mt-3 overflow-x-auto rounded-xl bg-foreground p-3 text-xs text-background">{`<script src="https://app.example.com/widget.js" data-bot-id="${state.botId || "demo"}"></script>`}</pre>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button variant="ghost"
              type="button"
              onClick={() =>
                navigator.clipboard.writeText(
                  `<script src="https://app.example.com/widget.js" data-bot-id="${state.botId || "demo"}"></script>`,
                )
              }
              className="rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
            >
              Copy snippet
            </Button>
            <Button variant="outline"
              type="button"
              disabled
            >
              Send me instructions by email
            </Button>
            <Link
              href="/test.html"
              className="rounded-xl border border-border bg-card px-4 py-2 text-sm font-medium text-foreground"
            >
              Test it on a sample page
            </Link>
          </div>
          <div className="rounded-2xl border border-dashed border-border bg-background p-4 text-sm text-muted-foreground">
            WordPress and custom site setups are the same: install the script,
            set the bot ID, and publish the page.
          </div>
        </div>
      );
    }

    return (
      <div className="rounded-3xl border border-border bg-card p-8 text-center">
        <p className="text-sm uppercase tracking-[0.18em] text-success">
          Setup complete
        </p>
        <h3 className="mt-3 text-3xl font-semibold text-foreground">
          Your assistant is ready
        </h3>
        <p className="mt-3 text-muted-foreground">
          Your bot is created, branded, and ready for its first test on your
          website.
        </p>
        <div className="mt-6 grid gap-3 text-left md:grid-cols-2">
          <div className="rounded-2xl border border-border bg-background p-4 text-sm text-foreground">
            ✓ Bot created and configured
          </div>
          <div className="rounded-2xl border border-border bg-background p-4 text-sm text-foreground">
            ✓ Knowledge source ready
          </div>
          <div className="rounded-2xl border border-border bg-background p-4 text-sm text-foreground">
            ✓ Branding customized
          </div>
          <div className="rounded-2xl border border-border bg-background p-4 text-sm text-foreground">
            ✓ Install snippet ready
          </div>
        </div>
      </div>
    );
  };

  return (
    <main className="min-h-screen bg-muted px-4 py-8">
      <div className="mx-auto max-w-5xl rounded-[32px] border border-border bg-card p-4 shadow-sm sm:p-6">
        <div className="flex items-center justify-between gap-3 pb-6">
          <div>
            <p className="text-sm uppercase tracking-[0.18em] text-muted-foreground">
              Onboarding
            </p>
            <h1 className="mt-2 text-3xl font-semibold text-foreground">
              Set up {brand.name}
            </h1>
          </div>
          <Button variant="ghost"
            type="button"
            onClick={handleSkip}
            className="rounded-full border border-border bg-card px-3 py-2 text-sm font-medium text-foreground"
          >
            Skip for now
          </Button>
        </div>

        <div className="mb-8 grid grid-cols-5 gap-2">
          {steps.map((stepLabel, index) => (
            <div
              key={stepLabel}
              className={`rounded-full px-2 py-2 text-center text-xs font-medium ${index <= currentStep ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
            >
              <span className="sm:hidden">{index + 1}</span>
              <span className="hidden sm:inline">{stepLabel}</span>
            </div>
          ))}
          <p className="col-span-5 mt-1 text-center text-[13px] text-muted-foreground sm:hidden">
            Step {currentStep + 1} of {steps.length} · {steps[currentStep]}
          </p>
          <div className="col-span-5 h-1 overflow-hidden rounded-full bg-muted"><div className="h-full rounded-full bg-primary transition-[width]" style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }} /></div>
        </div>

        {errors.general && (
          <div className="mb-5 rounded-2xl border border-destructive/20 bg-destructive-bg px-3 py-2 text-sm text-rose-700">
            {errors.general}
          </div>
        )}

        {renderStep()}

        {currentStep === 1 && (
          <p className="mt-4 text-sm text-muted-foreground">
            The bot will answer poorly without content, so adding a source is
            the fastest way to improve accuracy.
          </p>
        )}

        <div className="mt-8 flex items-center justify-between gap-3">
          <Button variant="ghost"
            type="button"
            onClick={handleBack}
            disabled={currentStep === 0}
            className="rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-medium text-foreground disabled:cursor-not-allowed disabled:opacity-40"
          >
            Back
          </Button>
          <div className="flex items-center gap-3">
            {currentStep < steps.length - 1 ? (
              <Button variant="ghost"
                type="button"
                onClick={handleNext}
                disabled={isSaving}
                className="rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSaving ? "Saving…" : "Next"}
              </Button>
            ) : (
              <Link
                href="/dashboard"
                className="rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground"
              >
                Go to dashboard
              </Link>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
