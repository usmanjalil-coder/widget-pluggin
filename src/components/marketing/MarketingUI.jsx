"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { brand } from "@/lib/brand";
import { PLANS, YEARLY_DISCOUNT_LABEL, formatPrice } from "@/lib/plans";

export function BrandWordmark({ className = "" }) {
  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-900">
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="h-5 w-5 text-blue-600"
        >
          <path
            fill="currentColor"
            d="M12 2 3 7l9 5 9-5-9-5Zm-8 8 8 4 8-4v7l-8 4-8-4v-7Z"
          />
        </svg>
      </span>
      <span className="text-lg font-semibold text-slate-900">{brand.name}</span>
    </div>
  );
}

export function MarketingNav({ loggedIn = false }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <Link href="/" aria-label="Home" className="flex items-center">
          <BrandWordmark />
        </Link>

        <nav className="hidden items-center gap-8 text-sm text-slate-600 md:flex">
          <a href="/#features" className="hover:text-slate-900">
            Features
          </a>
          <a href="/#how-it-works" className="hover:text-slate-900">
            How it works
          </a>
          <a href="/pricing" className="hover:text-slate-900">
            Pricing
          </a>
          <a href="/#faq" className="hover:text-slate-900">
            FAQ
          </a>
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          {loggedIn ? (
            <Link
              href="/dashboard"
              className="rounded-full border border-slate-200 px-4 py-2 font-medium text-slate-700 hover:bg-slate-50"
            >
              Go to dashboard
            </Link>
          ) : (
            <>
              <Link
                href="/login"
                className="rounded-full px-4 py-2 font-medium text-slate-700 hover:bg-slate-50"
              >
                Log in
              </Link>
              <Link
                href="/signup"
                className="rounded-full bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-500"
              >
                Get started free
              </Link>
            </>
          )}
        </div>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-700 md:hidden"
          onClick={() => setOpen((current) => !current)}
          aria-label="Toggle navigation"
        >
          <span className="text-xl">☰</span>
        </button>
      </div>

      {open && (
        <div className="border-t border-slate-200 bg-white px-4 py-4 md:hidden">
          <div className="flex flex-col gap-2 text-sm text-slate-700">
            <a
              href="/#features"
              className="rounded-lg px-2 py-2 hover:bg-slate-50"
            >
              Features
            </a>
            <a
              href="/#how-it-works"
              className="rounded-lg px-2 py-2 hover:bg-slate-50"
            >
              How it works
            </a>
            <a
              href="/pricing"
              className="rounded-lg px-2 py-2 hover:bg-slate-50"
            >
              Pricing
            </a>
            <a href="/#faq" className="rounded-lg px-2 py-2 hover:bg-slate-50">
              FAQ
            </a>
            {loggedIn ? (
              <Link
                href="/dashboard"
                className="mt-2 rounded-xl bg-slate-900 px-3 py-2 text-center font-medium text-white"
              >
                Go to dashboard
              </Link>
            ) : (
              <>
                <Link
                  href="/login"
                  className="mt-2 rounded-xl border border-slate-200 px-3 py-2 text-center"
                >
                  Log in
                </Link>
                <Link
                  href="/signup"
                  className="rounded-xl bg-blue-600 px-3 py-2 text-center font-medium text-white"
                >
                  Get started free
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

export function PricingCards({ defaultBillingMode = "monthly" }) {
  const [billingMode, setBillingMode] = useState(defaultBillingMode);

  return (
    <>
      <div className="mt-8 flex justify-center">
        <div className="inline-flex rounded-full border border-slate-200 bg-white p-1">
          <button
            type="button"
            onClick={() => setBillingMode("monthly")}
            className={`rounded-full px-4 py-2 text-sm font-medium ${billingMode === "monthly" ? "bg-slate-900 text-white" : "text-slate-700"}`}
          >
            Monthly
          </button>
          <button
            type="button"
            onClick={() => setBillingMode("yearly")}
            className={`rounded-full px-4 py-2 text-sm font-medium ${billingMode === "yearly" ? "bg-slate-900 text-white" : "text-slate-700"}`}
          >
            Yearly
          </button>
        </div>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        {PLANS.map((plan) => {
          const activePrice =
            billingMode === "yearly" ? plan.yearlyPrice : plan.monthlyPrice;
          const isPopular = plan.id === "starter";

          return (
            <div
              key={plan.id}
              className={`rounded-3xl border p-6 shadow-sm ${plan.highlight ? "border-blue-200 bg-blue-50" : "border-slate-200 bg-white"}`}
            >
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-xl font-semibold text-slate-900">
                  {plan.name}
                </h3>
                {isPopular && (
                  <span className="rounded-full bg-blue-600 px-2.5 py-1 text-xs font-medium text-white">
                    Most popular
                  </span>
                )}
              </div>
              <p className="mt-4 text-sm text-slate-600">{plan.description}</p>
              <div className="mt-5 flex items-end gap-2">
                <span className="text-4xl font-semibold text-slate-900">
                  {plan.monthlyPrice === 0 ? "$0" : formatPrice(activePrice)}
                </span>
                {plan.monthlyPrice > 0 && (
                  <span className="pb-1 text-sm text-slate-500">/month</span>
                )}
              </div>
              {billingMode === "yearly" && plan.monthlyPrice > 0 && (
                <p className="mt-2 text-xs font-medium text-emerald-700">
                  {YEARLY_DISCOUNT_LABEL}
                </p>
              )}
              <div className="mt-5 space-y-2 text-sm text-slate-700">
                <p>
                  <span className="font-semibold">{plan.conversations}</span>{" "}
                  conversations / month
                </p>
                <p>
                  <span className="font-semibold">{plan.bots}</span> bot
                  {plan.bots > 1 ? "s" : ""}
                </p>
                {plan.badge && (
                  <p>
                    {plan.badge === "Powered by"
                      ? "Powered-by badge included"
                      : "No badge on the widget"}
                  </p>
                )}
              </div>
              <Link
                href={`/signup?plan=${plan.id}`}
                className={`mt-6 inline-flex w-full items-center justify-center rounded-xl px-4 py-3 text-sm font-semibold transition ${plan.highlight ? "bg-blue-600 text-white hover:bg-blue-500" : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"}`}
              >
                {plan.cta}
              </Link>
            </div>
          );
        })}
      </div>
    </>
  );
}

export function LiveWidgetDemo() {
  const [isVisible, setIsVisible] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [activePrompt, setActivePrompt] = useState("Ask about opening hours");
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { rootMargin: "200px" },
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible || !containerRef.current) return;
    setMounted(true);

    if (window.ChatbotWidget) {
      window.ChatbotWidget.init({
        botId: "demo",
        container: containerRef.current,
      });
      return;
    }

    const script = document.createElement("script");
    script.src = "/widget.js";
    script.async = true;
    script.onload = () => {
      if (window.ChatbotWidget) {
        window.ChatbotWidget.init({
          botId: "demo",
          container: containerRef.current,
        });
      }
    };
    document.head.appendChild(script);

    return () => script.remove();
  }, [isVisible]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {[
          "Ask about opening hours",
          "Book an appointment",
          "Tell me about services",
        ].map((prompt) => (
          <button
            type="button"
            key={prompt}
            onClick={() => setActivePrompt(prompt)}
            className={`rounded-full border px-3 py-1.5 text-xs font-medium ${activePrompt === prompt ? "border-blue-600 bg-blue-50 text-blue-700" : "border-slate-200 bg-white text-slate-600"}`}
          >
            {prompt}
          </button>
        ))}
      </div>
      <div className="rounded-3xl border border-slate-200 bg-slate-100 p-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="mb-3 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <div className="h-2.5 w-2.5 rounded-full bg-rose-400" />
              <div className="h-2.5 w-2.5 rounded-full bg-amber-400" />
              <div className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
            </div>
            <span className="text-xs text-slate-500">demo website</span>
          </div>
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-[#f6f7fb]">
            <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3 text-sm font-medium text-slate-700">
              <span>BrightSmile Dental</span>
              <span className="text-xs text-slate-500">10:24 AM</span>
            </div>
            <div className="grid gap-3 p-4 md:grid-cols-[1.2fr_0.8fr]">
              <div className="space-y-3 rounded-2xl bg-white p-4 shadow-sm">
                <h3 className="text-lg font-semibold text-slate-900">
                  Book an appointment
                </h3>
                <p className="text-sm text-slate-600">
                  Friendly answers for hours, visits, and services.
                </p>
                <div className="rounded-xl bg-slate-100 p-3 text-sm text-slate-700">
                  {activePrompt}
                </div>
              </div>
              <div
                ref={containerRef}
                className="min-h-[250px] rounded-2xl border border-slate-200 bg-slate-50"
                aria-label="Live chatbot widget demo"
              />
            </div>
          </div>
        </div>
      </div>
      <p className="text-center text-xs text-slate-500">
        This is the actual widget running on our demo bot.
      </p>
      {!mounted && (
        <p className="text-center text-xs text-slate-400">Loading widget…</p>
      )}
    </div>
  );
}

export function FaqAccordion() {
  const items = [
    {
      q: "How long does setup take?",
      a: "Most businesses are live in under 15 minutes. Import your docs, match the colors, and add your script snippet.",
    },
    {
      q: "Which websites does it work on?",
      a: "It works on custom sites, landing pages, WordPress, Shopify, Wix, and other hosted pages that allow a script tag.",
    },
    {
      q: "What happens if the bot does not know the answer?",
      a: "It answers from your imported content and politely says it does not know when it is outside the source material. You can review the conversation later and improve the knowledge base.",
    },
    {
      q: "Can I change colors and messages?",
      a: "Yes. The dashboard includes a live preview so you can update brand colors, greeting text, launch label, and placement before saving.",
    },
    {
      q: "Can I cancel anytime?",
      a: "Yes. There is no long-term contract required. You can pause or cancel at the end of a billing cycle.",
    },
    {
      q: "Is it HIPAA compliant?",
      a: "The product is not designed to collect or store protected health information. Businesses should not have visitors share medical details in the chat and should consult their own legal advisor.",
    },
    {
      q: "Do you train AI models on my data?",
      a: "TODO: confirm final backend and provider policy before launch, including whether prompt data or training is used for model improvements.",
    },
  ];

  return (
    <div className="space-y-3">
      {items.map((item) => (
        <details
          key={item.q}
          className="group rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
          open={item.q === "How long does setup take?"}
        >
          <summary className="cursor-pointer list-none text-left text-base font-medium text-slate-900">
            {item.q}
          </summary>
          <p className="mt-3 text-sm leading-6 text-slate-600">{item.a}</p>
        </details>
      ))}
    </div>
  );
}

export function ThemeShowcase() {
  const [primaryColor, setPrimaryColor] = useState("#2563eb");
  const [greeting, setGreeting] = useState(
    "Hi! Can I help with your visit today?",
  );

  const bubbleStyle = useMemo(
    () => ({
      background: primaryColor,
      color: "#ffffff",
    }),
    [primaryColor],
  );

  return (
    <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
      <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
        <label className="block text-sm font-medium text-slate-700">
          Primary color
        </label>
        <div className="mt-3 flex items-center gap-3">
          <input
            type="color"
            value={primaryColor}
            onChange={(event) => setPrimaryColor(event.target.value)}
            className="h-12 w-16 cursor-pointer rounded-xl border border-slate-200 bg-white p-1"
          />
          <input
            type="text"
            value={primaryColor}
            onChange={(event) => setPrimaryColor(event.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900"
            aria-label="Primary color"
          />
        </div>
        <label className="mt-5 block text-sm font-medium text-slate-700">
          Greeting
        </label>
        <textarea
          value={greeting}
          onChange={(event) => setGreeting(event.target.value)}
          rows={3}
          className="mt-3 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900"
        />
      </div>

      <div className="rounded-3xl border border-slate-200 bg-slate-100 p-4 shadow-sm">
        <div className="rounded-2xl bg-white p-4 shadow-sm">
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-2.5 w-2.5 rounded-full bg-rose-400" />
              <div className="h-2.5 w-2.5 rounded-full bg-amber-400" />
              <div className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
            </div>
            <span className="text-xs text-slate-500">website mock</span>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-4">
              <div className="mb-3 flex items-center gap-3">
                <div
                  className="flex h-9 w-9 items-center justify-center rounded-full text-sm font-medium text-white"
                  style={bubbleStyle}
                >
                  A
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    Assistant
                  </p>
                  <p className="text-xs text-slate-500">online now</p>
                </div>
              </div>
              <div className="rounded-2xl bg-slate-100 p-3 text-sm text-slate-700">
                {greeting}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      {submitted ? (
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-slate-900">
            Thanks for reaching out
          </h3>
          <p className="text-sm text-slate-600">
            A member of the team will reply to your message soon.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <label className="block text-sm text-slate-700">
              <span className="mb-1 block font-medium">Name</span>
              <input
                type="text"
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-slate-900"
                placeholder="Your name"
              />
            </label>
            <label className="block text-sm text-slate-700">
              <span className="mb-1 block font-medium">Email</span>
              <input
                type="email"
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-slate-900"
                placeholder="Your email"
              />
            </label>
          </div>
          <label className="block text-sm text-slate-700">
            <span className="mb-1 block font-medium">Message</span>
            <textarea
              rows={4}
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-slate-900"
              placeholder="Tell us about your website and goals"
            />
          </label>
          <button
            type="submit"
            className="rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-500"
          >
            Send message
          </button>
        </form>
      )}
    </div>
  );
}
