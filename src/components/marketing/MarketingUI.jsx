"use client";

import { Button, Input, Textarea, Label } from "@/components/ui";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Menu } from "lucide-react";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { brand } from "@/lib/brand";
import { PLANS, YEARLY_DISCOUNT_LABEL, formatPrice } from "@/lib/plans";

export function BrandWordmark({ className = "" }) {
  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-background text-foreground">
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="h-5 w-5 text-primary"
        >
          <path
            fill="currentColor"
            d="M12 2 3 7l9 5 9-5-9-5Zm-8 8 8 4 8-4v7l-8 4-8-4v-7Z"
          />
        </svg>
      </span>
      <span className="text-lg font-semibold text-foreground">{brand.name}</span>
    </div>
  );
}

export function MarketingNav({ loggedIn = false }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-card/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <Link href="/" aria-label="Home" className="flex items-center">
          <BrandWordmark />
        </Link>

        <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
          <Link href="/#features" className="hover:text-foreground">
            Features
          </Link>
          <Link href="/#how-it-works" className="hover:text-foreground">
            How it works
          </Link>
          <Link href="/pricing" className="hover:text-foreground">
            Pricing
          </Link>
          <Link href="/#faq" className="hover:text-foreground">
            FAQ
          </Link>
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          {loggedIn ? (
            <Link
              href="/dashboard"
              className="rounded-full border border-border px-4 py-2 font-medium text-foreground hover:bg-background"
            >
              Go to dashboard
            </Link>
          ) : (
            <>
              <Link
                href="/login"
                className="rounded-full px-4 py-2 font-medium text-foreground hover:bg-background"
              >
                Log in
              </Link>
              <Link
                href="/signup"
                className="rounded-full bg-primary px-4 py-2 font-medium text-primary-foreground hover:bg-primary/90"
              >
                Get started free
              </Link>
            </>
          )}
        </div>

        <Button variant="ghost"
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground md:hidden"
          onClick={() => setOpen((current) => !current)}
          aria-label="Toggle navigation"
        >
          <Menu className="size-5" aria-hidden="true" />
        </Button>
      </div>

      {open && (
        <div className="border-t border-border bg-card px-4 py-4 md:hidden">
          <div className="flex flex-col gap-2 text-sm text-foreground">
            <Link
              href="/#features"
              className="rounded-lg px-2 py-2 hover:bg-background"
            >
              Features
            </Link>
            <Link
              href="/#how-it-works"
              className="rounded-lg px-2 py-2 hover:bg-background"
            >
              How it works
            </Link>
            <Link
              href="/pricing"
              className="rounded-lg px-2 py-2 hover:bg-background"
            >
              Pricing
            </Link>
            <Link href="/#faq" className="rounded-lg px-2 py-2 hover:bg-background">
              FAQ
            </Link>
            {loggedIn ? (
              <Link
                href="/dashboard"
                className="mt-2 rounded-xl bg-foreground px-3 py-2 text-center font-medium text-primary-foreground"
              >
                Go to dashboard
              </Link>
            ) : (
              <>
                <Link
                  href="/login"
                  className="mt-2 rounded-xl border border-border px-3 py-2 text-center"
                >
                  Log in
                </Link>
                <Link
                  href="/signup"
                  className="rounded-xl bg-primary px-3 py-2 text-center font-medium text-primary-foreground"
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
        <div className="inline-flex rounded-full border border-border bg-card p-1">
          <Button variant="ghost"
            type="button"
            onClick={() => setBillingMode("monthly")}
            className={`rounded-full px-4 py-2 text-sm font-medium ${billingMode === "monthly" ? "bg-foreground text-primary-foreground" : "text-foreground"}`}
          >
            Monthly
          </Button>
          <Button variant="ghost"
            type="button"
            onClick={() => setBillingMode("yearly")}
            className={`rounded-full px-4 py-2 text-sm font-medium ${billingMode === "yearly" ? "bg-foreground text-primary-foreground" : "text-foreground"}`}
          >
            Yearly
          </Button>
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
              className={`rounded-3xl border p-6 shadow-sm ${plan.highlight ? "border-primary/20 bg-accent" : "border-border bg-card"}`}
            >
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-xl font-semibold text-foreground">
                  {plan.name}
                </h3>
                {isPopular && (
                  <span className="rounded-full bg-primary px-2.5 py-1 text-xs font-medium text-primary-foreground">
                    Most popular
                  </span>
                )}
              </div>
              <p className="mt-4 text-sm text-muted-foreground">{plan.description}</p>
              <div className="mt-5 flex items-end gap-2">
                <span className="text-4xl font-semibold text-foreground">
                  {plan.monthlyPrice === 0 ? "$0" : formatPrice(activePrice)}
                </span>
                {plan.monthlyPrice > 0 && (
                  <span className="pb-1 text-sm text-muted-foreground">/month</span>
                )}
              </div>
              {billingMode === "yearly" && plan.monthlyPrice > 0 && (
                <p className="mt-2 text-xs font-medium text-success-foreground">
                  {YEARLY_DISCOUNT_LABEL}
                </p>
              )}
              <div className="mt-5 space-y-2 text-sm text-foreground">
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
                className={`mt-6 inline-flex w-full items-center justify-center rounded-xl px-4 py-3 text-sm font-semibold transition ${plan.highlight ? "bg-primary text-primary-foreground hover:bg-primary/90" : "border border-border bg-card text-foreground hover:bg-background"}`}
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
        open: true,
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
          open: true,
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
          <Button variant="ghost"
            type="button"
            key={prompt}
            onClick={() => setActivePrompt(prompt)}
            className={`rounded-full border px-3 py-1.5 text-xs font-medium ${activePrompt === prompt ? "border-primary bg-accent text-primary" : "border-border bg-card text-muted-foreground"}`}
          >
            {prompt}
          </Button>
        ))}
      </div>
      <div className="rounded-3xl border border-border bg-muted p-3">
        <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
          <div className="mb-3 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <div className="h-2.5 w-2.5 rounded-full bg-destructive" />
              <div className="h-2.5 w-2.5 rounded-full bg-warning" />
              <div className="h-2.5 w-2.5 rounded-full bg-success" />
            </div>
            <span className="text-xs text-muted-foreground">demo website</span>
          </div>
          <div className="overflow-hidden rounded-2xl border border-border bg-muted">
            <div className="flex items-center justify-between border-b border-border px-4 py-3 text-sm font-medium text-foreground">
              <span>BrightSmile Dental</span>
              <span className="text-xs text-muted-foreground">10:24 AM</span>
            </div>
            <div className="grid gap-3 p-4 md:grid-cols-[1.2fr_0.8fr]">
              <div className="space-y-3 rounded-2xl bg-card p-4 shadow-sm">
                <h3 className="text-lg font-semibold text-foreground">
                  Book an appointment
                </h3>
                <p className="text-sm text-muted-foreground">
                  Friendly answers for hours, visits, and services.
                </p>
                <div className="rounded-xl bg-muted p-3 text-sm text-foreground">
                  {activePrompt}
                </div>
              </div>
              <div
                ref={containerRef}
                className="relative h-[420px] overflow-hidden rounded-2xl border border-border bg-background sm:h-[460px]"
                aria-label="Live chatbot widget demo"
              />
            </div>
          </div>
        </div>
      </div>
      <p className="text-center text-xs text-muted-foreground">
        This is the actual widget running on our demo bot.
      </p>
      {!mounted && (
        <p className="text-center text-xs text-muted-foreground">Loading widget…</p>
      )}
    </div>
  );
}

export function UseCaseTabs({ items }) {
  return <Tabs defaultValue={items[0].label} className="mt-10">
    <TabsList className="h-auto w-full flex-wrap justify-start gap-1 p-1 sm:w-fit">
      {items.map((item) => <TabsTrigger key={item.label} value={item.label} className="min-h-10 flex-none px-3">{item.label}</TabsTrigger>)}
    </TabsList>
    {items.map((item) => <TabsContent key={item.label} value={item.label} className="mt-4 rounded-2xl border border-border bg-card p-6 shadow-sm">
      <div className="grid gap-6 md:grid-cols-[0.7fr_1.3fr] md:items-center">
        <div><p className="text-xs font-medium uppercase tracking-widest text-primary">Example workflow</p><h3 className="mt-2 text-xl font-semibold text-foreground">{item.label}</h3><p className="mt-2 text-sm text-muted-foreground">Answer common questions using your own content.</p></div>
        <div className="space-y-2">{item.questions.map((question) => <div key={question} className="rounded-xl border border-border bg-background p-3 text-sm text-foreground">{question}</div>)}</div>
      </div>
    </TabsContent>)}
  </Tabs>;
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
  ];

  return (
    <div className="space-y-3">
      {items.map((item) => (
        <details
          key={item.q}
          className="group rounded-2xl border border-border bg-card p-4 shadow-sm"
          open={item.q === "How long does setup take?"}
        >
          <summary className="cursor-pointer list-none text-left text-base font-medium text-foreground">
            {item.q}
          </summary>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">{item.a}</p>
        </details>
      ))}
    </div>
  );
}

export function ThemeShowcase() {
  const [primaryColor, setPrimaryColor] = useState("#4F46E5");
  const [greeting, setGreeting] = useState(
    "Hi! Can I help with your visit today?",
  );

  const validColor = /^#[0-9a-fA-F]{6}$/.test(primaryColor);
  const bubbleStyle = useMemo(() => {
    if (!validColor) return {};
    const channels = [1, 3, 5].map((index) => parseInt(primaryColor.slice(index, index + 2), 16) / 255);
    const luminance = channels.map((value) => value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4);
    return { background: primaryColor, color: luminance[0] * 0.2126 + luminance[1] * 0.7152 + luminance[2] * 0.0722 > 0.45 ? "var(--contrast-dark)" : "var(--contrast-light)" };
  }, [primaryColor, validColor]);

  return (
    <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
      <div className="rounded-3xl border border-border bg-card p-5 shadow-sm">
        <Label className="block text-sm font-medium text-foreground">
          Primary color
        </Label>
        <div className="mt-3 flex items-center gap-3">
          <Input
            type="color"
            value={validColor ? primaryColor : "#4F46E5"}
            onChange={(event) => setPrimaryColor(event.target.value)}
            className="h-12 w-16 cursor-pointer rounded-xl border border-border bg-card p-1"
          />
          <Input
            type="text"
            value={primaryColor}
            onChange={(event) => setPrimaryColor(event.target.value)}
            maxLength={7}
            aria-invalid={!validColor}
            className="w-full rounded-xl border border-border bg-card px-3 py-2.5 text-sm text-foreground"
            aria-label="Primary color"
          />
        </div>
        {!validColor && <p className="mt-2 text-xs text-destructive">Enter a six-digit hex color, such as #4F46E5.</p>}
        <Label className="mt-5 block text-sm font-medium text-foreground">
          Greeting
        </Label>
        <Textarea
          value={greeting}
          onChange={(event) => setGreeting(event.target.value)}
          rows={3}
          className="mt-3 w-full rounded-xl border border-border bg-card px-3 py-2.5 text-sm text-foreground"
        />
      </div>

      <div className="rounded-3xl border border-border bg-muted p-4 shadow-sm">
        <div className="rounded-2xl bg-card p-4 shadow-sm">
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-2.5 w-2.5 rounded-full bg-destructive" />
              <div className="h-2.5 w-2.5 rounded-full bg-warning" />
              <div className="h-2.5 w-2.5 rounded-full bg-success" />
            </div>
            <span className="text-xs text-muted-foreground">website mock</span>
          </div>
          <div className="rounded-2xl border border-border bg-background p-4">
            <div className="rounded-2xl border border-border bg-card p-4">
              <div className="mb-3 flex items-center gap-3">
                <div
                  className="flex h-9 w-9 items-center justify-center rounded-full text-sm font-medium text-primary-foreground"
                  style={bubbleStyle}
                >
                  A
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    Assistant
                  </p>
                  <p className="text-xs text-muted-foreground">online now</p>
                </div>
              </div>
              <div className="rounded-2xl bg-muted p-3 text-sm text-foreground">
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
    <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
      {submitted ? (
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-foreground">
            Thanks for reaching out
          </h3>
          <p className="text-sm text-muted-foreground">
            A member of the team will reply to your message soon.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Label className="block text-sm text-foreground">
              <span className="mb-1 block font-medium">Name</span>
              <Input
                type="text"
                className="w-full rounded-xl border border-border bg-card px-3 py-2.5 text-foreground"
                placeholder="Your name"
              />
            </Label>
            <Label className="block text-sm text-foreground">
              <span className="mb-1 block font-medium">Email</span>
              <Input
                type="email"
                className="w-full rounded-xl border border-border bg-card px-3 py-2.5 text-foreground"
                placeholder="Your email"
              />
            </Label>
          </div>
          <Label className="block text-sm text-foreground">
            <span className="mb-1 block font-medium">Message</span>
            <Textarea
              rows={4}
              className="w-full rounded-xl border border-border bg-card px-3 py-2.5 text-foreground"
              placeholder="Tell us about your website and goals"
            />
          </Label>
          <Button variant="ghost"
            type="submit"
            className="rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
          >
            Send message
          </Button>
        </form>
      )}
    </div>
  );
}
