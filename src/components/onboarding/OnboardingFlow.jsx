"use client";

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
    window.location.href = "/dashboard";
  };

  const renderStep = () => {
    if (currentStep === 0) {
      return (
        <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
          <div className="space-y-5 rounded-3xl border border-slate-200 bg-white p-6">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Business name
              </label>
              <input
                value={state.businessName}
                onChange={(event) =>
                  updateState({ businessName: event.target.value })
                }
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-slate-900"
                placeholder="Example: BrightSmile Dental"
              />
              {errors.businessName && (
                <p className="mt-2 text-sm text-rose-600">
                  {errors.businessName}
                </p>
              )}
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Website URL (optional)
              </label>
              <input
                value={state.websiteUrl}
                onChange={(event) =>
                  updateState({ websiteUrl: event.target.value })
                }
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-slate-900"
                placeholder="https://yourwebsite.com"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Industry
              </label>
              <select
                value={state.industry}
                onChange={(event) => {
                  const nextIndustry = event.target.value;
                  updateState({
                    industry: nextIndustry,
                    greeting: industryDefaults[nextIndustry]?.greeting || "",
                    botName:
                      industryDefaults[nextIndustry]?.botName ||
                      state.botName ||
                      "Assistant",
                  });
                }}
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-slate-900"
              >
                <option value="dental">Dental</option>
                <option value="salon">Salon</option>
                <option value="real-estate">Real estate</option>
                <option value="restaurant">Restaurant</option>
                <option value="ecommerce">E-commerce</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
            <p className="text-sm uppercase tracking-[0.18em] text-slate-500">
              Preview
            </p>
            <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-4">
              <p className="text-lg font-semibold text-slate-900">
                {state.businessName || "Your business"}
              </p>
              <p className="mt-3 rounded-2xl bg-slate-100 p-3 text-sm text-slate-700">
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
            <button
              key={option.id}
              type="button"
              onClick={() => updateState({ knowledgeMethod: option.id })}
              className={`rounded-3xl border p-5 text-left transition ${state.knowledgeMethod === option.id ? "border-blue-300 bg-blue-50" : "border-slate-200 bg-white"}`}
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-lg font-semibold text-slate-900">
                {option.id === "website"
                  ? "↗"
                  : option.id === "files"
                    ? "▣"
                    : "✎"}
              </div>
              <h3 className="text-lg font-semibold text-slate-900">
                {option.title}
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                {option.description}
              </p>
            </button>
          ))}
        </div>
      );
    }

    if (currentStep === 2) {
      return (
        <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
          <div className="space-y-5 rounded-3xl border border-slate-200 bg-white p-6">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Assistant name
              </label>
              <input
                value={state.botName}
                onChange={(event) =>
                  updateState({ botName: event.target.value })
                }
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-slate-900"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Greeting
              </label>
              <textarea
                value={
                  state.greeting ||
                  industryDefaults[state.industry]?.greeting ||
                  ""
                }
                onChange={(event) =>
                  updateState({ greeting: event.target.value })
                }
                rows={4}
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-slate-900"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Position
              </label>
              <div className="flex gap-2">
                {["left", "right"].map((position) => (
                  <button
                    key={position}
                    type="button"
                    onClick={() => updateState({ position })}
                    className={`rounded-xl px-4 py-2 text-sm font-medium ${state.position === position ? "bg-slate-900 text-white" : "border border-slate-200 bg-white text-slate-700"}`}
                  >
                    {position}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Primary color
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={state.primaryColor}
                  onChange={(event) =>
                    updateState({ primaryColor: event.target.value })
                  }
                  className="h-12 w-16 rounded-xl border border-slate-200 bg-white p-1"
                />
                <input
                  type="text"
                  value={state.primaryColor}
                  onChange={(event) =>
                    updateState({ primaryColor: event.target.value })
                  }
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-slate-900"
                />
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
            <p className="text-sm uppercase tracking-[0.18em] text-slate-500">
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
        <div className="space-y-5 rounded-3xl border border-slate-200 bg-white p-6">
          <div className="rounded-2xl bg-slate-100 p-4 text-sm text-slate-700">
            <p className="font-medium text-slate-900">Install code</p>
            <pre className="mt-3 overflow-x-auto rounded-xl bg-slate-900 p-3 text-xs text-slate-100">{`<script src="https://app.example.com/widget.js" data-bot-id="${state.botId || "demo"}"></script>`}</pre>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() =>
                navigator.clipboard.writeText(
                  `<script src="https://app.example.com/widget.js" data-bot-id="${state.botId || "demo"}"></script>`,
                )
              }
              className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white"
            >
              Copy snippet
            </button>
            <button
              type="button"
              className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700"
            >
              Send me instructions by email
            </button>
            <Link
              href="/test.html"
              className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700"
            >
              Test it on a sample page
            </Link>
          </div>
          <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
            WordPress and custom site setups are the same: install the script,
            set the bot ID, and publish the page.
          </div>
        </div>
      );
    }

    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center">
        <p className="text-sm uppercase tracking-[0.18em] text-emerald-600">
          Setup complete
        </p>
        <h3 className="mt-3 text-3xl font-semibold text-slate-900">
          Your assistant is ready
        </h3>
        <p className="mt-3 text-slate-600">
          Your bot is created, branded, and ready for its first test on your
          website.
        </p>
        <div className="mt-6 grid gap-3 text-left md:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
            ✓ Bot created and configured
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
            ✓ Knowledge source ready
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
            ✓ Branding customized
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
            ✓ Script installed
          </div>
        </div>
      </div>
    );
  };

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-8">
      <div className="mx-auto max-w-5xl rounded-[32px] border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
        <div className="flex items-center justify-between gap-3 pb-6">
          <div>
            <p className="text-sm uppercase tracking-[0.18em] text-slate-500">
              Onboarding
            </p>
            <h1 className="mt-2 text-3xl font-semibold text-slate-900">
              Set up {brand.name}
            </h1>
          </div>
          <button
            type="button"
            onClick={handleSkip}
            className="rounded-full border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700"
          >
            Skip for now
          </button>
        </div>

        <div className="mb-8 grid grid-cols-5 gap-2">
          {steps.map((stepLabel, index) => (
            <div
              key={stepLabel}
              className={`rounded-full px-2 py-2 text-center text-xs font-medium ${index <= currentStep ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-500"}`}
            >
              {stepLabel}
            </div>
          ))}
        </div>

        {errors.general && (
          <div className="mb-5 rounded-2xl border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">
            {errors.general}
          </div>
        )}

        {renderStep()}

        {currentStep === 1 && (
          <p className="mt-4 text-sm text-slate-500">
            The bot will answer poorly without content, so adding a source is
            the fastest way to improve accuracy.
          </p>
        )}

        <div className="mt-8 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={handleBack}
            disabled={currentStep === 0}
            className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Back
          </button>
          <div className="flex items-center gap-3">
            {currentStep < steps.length - 1 ? (
              <button
                type="button"
                onClick={handleNext}
                disabled={isSaving}
                className="rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSaving ? "Saving…" : "Next"}
              </button>
            ) : (
              <Link
                href="/dashboard"
                className="rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white"
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
