"use client";

import { Button, Input, Textarea, Label } from "@/components/ui";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { CalendarCheck, Check, Clock, Menu, Moon, Stethoscope, Sun } from "lucide-react";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { brand } from "@/lib/brand";
import { PLANS, YEARLY_DISCOUNT_LABEL, formatPrice } from "@/lib/plans";
import AppearancePreview from "@/components/dashboard/AppearancePreview";

const LIVE_DEMO_SCRIPTS = {
  "Ask about opening hours": { user: "What are your opening hours?", reply: "We are open Monday to Friday, 9am to 6pm. Would you like to book a visit?" },
  "Book an appointment": { user: "I'd like to book an appointment.", reply: "I can help with that. Please share your name and phone number and our team will confirm a time." },
  "Tell me about services": { user: "What services do you offer?", reply: "We offer checkups, cleaning, fillings, and cosmetic consultations. What would you like to know about?" },
};
const LIVE_DEMO_COLORS = ["#4F46E5", "#2563EB", "#0F766E", "#9333EA", "#C2410C", "#BE123C"];
const LIVE_DEMO_SCENARIOS = [
  { label: "Ask about opening hours", icon: Clock },
  { label: "Book an appointment", icon: CalendarCheck },
  { label: "Tell me about services", icon: Stethoscope },
];

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

function ThemeToggle() {
  const [dark, setDark] = useState(() => typeof document !== "undefined" && document.documentElement.classList.contains("dark"));
  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };
  return <Button type="button" variant="ghost" size="icon" className="rounded-lg" onClick={toggle} aria-label="Toggle color theme">
    {dark ? <Sun className="size-4" /> : <Moon className="size-4" />}
  </Button>;
}

export function MarketingNav() {
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

        <div className="hidden items-center gap-2 md:flex">
          <ThemeToggle />
          <Link href="/login" className="rounded-lg px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">Log in</Link>
          <Link href="/signup" className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">Get started free</Link>
        </div>

        <div className="flex items-center gap-1 md:hidden">
        <ThemeToggle />
        <Button variant="ghost"
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground md:hidden"
          onClick={() => setOpen((current) => !current)}
          aria-label="Toggle navigation"
        >
          <Menu className="size-5" aria-hidden="true" />
        </Button>
        </div>
      </div>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="right" className="w-[min(22rem,90vw)] p-6 md:hidden">
          <SheetHeader><SheetTitle>Menu</SheetTitle></SheetHeader>
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
            <Link href="/login" className="mt-4 rounded-lg px-3 py-2 text-center font-medium hover:bg-muted">Log in</Link>
            <Link href="/signup" className="rounded-lg bg-primary px-3 py-2 text-center font-medium text-primary-foreground hover:bg-primary/90">Get started free</Link>
          </div>
        </SheetContent>
      </Sheet>
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

      <div className="mt-10 grid gap-4 lg:grid-cols-3 lg:gap-5">
        {PLANS.map((plan) => {
          const activePrice =
            billingMode === "yearly" ? plan.yearlyPrice : plan.monthlyPrice;
          const isPopular = plan.id === "starter";

          return (
            <div
              key={plan.id}
              className={`flex min-h-[420px] flex-col rounded-xl border p-6 shadow-sm ${plan.highlight ? "border-primary bg-accent" : "border-border bg-card"}`}
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
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{plan.description}</p>
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
              <div className="mt-6 space-y-3 text-sm text-foreground">
                {[`${new Intl.NumberFormat("en-US").format(plan.conversations)} conversations / month`, `${plan.bots} bot${plan.bots > 1 ? "s" : ""}`, plan.id === "free" ? "Powered-by badge" : "No badge on the widget", "Lead capture + email alerts", "Knowledge sources"].map((feature) => <p key={feature} className="flex gap-2"><Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />{feature}</p>)}
              </div>
              <Link
                href={`/signup?plan=${plan.id}`}
                className={`mt-auto inline-flex w-full items-center justify-center rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${plan.highlight ? "bg-primary text-primary-foreground hover:bg-primary/90" : "border border-border bg-card text-foreground hover:bg-muted"}`}
              >
                {plan.id === "free" ? "Get started free" : "Get started"}
              </Link>
            </div>
          );
        })}
      </div>
      <p className="mt-6 text-center text-sm text-muted-foreground">A conversation is one visitor chat session, however many messages it has.</p>
    </>
  );
}

export function LiveWidgetDemo() {
  const [isVisible, setIsVisible] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [activePrompt, setActivePrompt] = useState("Ask about opening hours");
  const [primaryColor, setPrimaryColor] = useState(LIVE_DEMO_COLORS[0]);
  const containerRef = useRef(null);
  const instanceRef = useRef(null);
  const activePromptRef = useRef(activePrompt);
  const primaryColorRef = useRef(primaryColor);

  useEffect(() => { activePromptRef.current = activePrompt; }, [activePrompt]);
  useEffect(() => { primaryColorRef.current = primaryColor; }, [primaryColor]);

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) setIsVisible(true);
    }, { rootMargin: "800px" });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible || !containerRef.current) return;
    setMounted(true);
    const mount = () => window.ChatbotWidget.init({
      botId: "demo",
      container: containerRef.current,
      config: {
        theme: { primaryColor: primaryColorRef.current },
        texts: {
          botName: "BrightSmile assistant",
          greetingMessage: "Hi! Ask BrightSmile about appointments, services, or opening hours.",
          starterQuestions: [activePromptRef.current],
        },
        branding: { showBadge: true },
      },
      defaultOpen: true,
      preview: true,
    }).then((instance) => {
      instanceRef.current = instance;
      instance.playDemo(LIVE_DEMO_SCRIPTS[activePromptRef.current]);
    });
    if (window.ChatbotWidget) { void mount(); return; }
    const script = document.createElement("script");
    script.src = "/widget.js";
    script.async = true;
    script.onload = () => { if (window.ChatbotWidget) void mount(); };
    document.head.appendChild(script);
    return () => script.remove();
  }, [isVisible]);

  useEffect(() => {
    if (!instanceRef.current) return;
    instanceRef.current.update({
      texts: {
        botName: "BrightSmile assistant",
        greetingMessage: "Hi! Ask BrightSmile about appointments, services, or opening hours.",
        starterQuestions: [activePrompt],
      },
      branding: { showBadge: true },
    });
    instanceRef.current.playDemo(LIVE_DEMO_SCRIPTS[activePrompt]);
  }, [activePrompt]);

  useEffect(() => {
    instanceRef.current?.update({ theme: { primaryColor } });
  }, [primaryColor]);

  return (
    <div>
      <div className="rounded-2xl border border-border bg-muted p-3">
        <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
          <div className="mb-3 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <div className="h-2.5 w-2.5 rounded-full bg-destructive" />
              <div className="h-2.5 w-2.5 rounded-full bg-warning" />
              <div className="h-2.5 w-2.5 rounded-full bg-success" />
            </div>
            <span className="text-xs text-muted-foreground">demo website</span>
          </div>
          <div className="rounded-2xl border border-border bg-muted">
            <div className="flex items-center justify-between border-b border-border px-4 py-3 text-sm font-medium text-foreground">
              <span>BrightSmile Dental</span>
              <span className="text-xs text-muted-foreground">10:24 AM</span>
            </div>
            <div className="grid items-stretch gap-3 p-4 md:grid-cols-[1.2fr_0.8fr]">
              <div className="flex flex-col rounded-xl bg-card p-5 shadow-sm md:min-h-[680px]">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-primary">Care that fits your schedule</p>
                  <h3 className="mt-2 text-xl font-semibold text-foreground">A more comfortable dental visit.</h3>
                  <p className="mt-2 text-sm text-muted-foreground">Clear answers for new and returning patients.</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {["Checkups", "Cleaning", "Cosmetic care"].map((service) => <span key={service} className="rounded-full bg-muted px-2.5 py-1 text-xs text-muted-foreground">{service}</span>)}
                  </div>
                </div>
                <div className="mt-6 rounded-xl border border-border bg-muted/30 p-4">
                  <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Try asking</p>
                  <div className="mt-3 flex gap-2 overflow-x-auto pb-1 md:flex-col md:overflow-visible">
                    {LIVE_DEMO_SCENARIOS.map(({ label, icon: Icon }) => {
                      const selected = activePrompt === label;
                      return <Button key={label} type="button" variant="ghost" aria-pressed={selected} onClick={() => setActivePrompt(label)} className={`h-auto min-h-10 shrink-0 justify-start gap-2 rounded-lg border px-3 py-2 text-left text-sm md:w-full ${selected ? "border-primary bg-primary/5 text-foreground hover:bg-primary/10" : "border-border bg-card text-muted-foreground hover:bg-muted"}`}>
                        <Icon className="size-4 shrink-0 text-primary" aria-hidden="true" />
                        <span className="whitespace-nowrap">{label}</span>
                        {selected && <Check className="ml-auto size-4 shrink-0 text-primary" aria-hidden="true" />}
                      </Button>;
                    })}
                  </div>
                  <div className="my-4 border-t border-border" />
                  <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Widget colour</p>
                  <div className="mt-3 flex items-center gap-2" aria-label="Widget colour">
                    {LIVE_DEMO_COLORS.map((color) => <button key={color} type="button" aria-label={`Use ${color}`} aria-pressed={primaryColor === color} onClick={() => setPrimaryColor(color)} className={`flex size-7 shrink-0 items-center justify-center rounded-full border-2 transition-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${primaryColor === color ? "border-foreground ring-2 ring-ring/40" : "border-transparent"}`} style={{ backgroundColor: color }}>{primaryColor === color && <Check className="size-3.5 text-primary-foreground" aria-hidden="true" />}</button>)}
                  </div>
                </div>
              </div>
              <div ref={containerRef} className="relative min-h-[680px] rounded-2xl border border-border bg-background" aria-label="Live chatbot widget demo" />
            </div>
          </div>
        </div>
      </div>
      {!mounted && <p className="mt-3 text-center text-xs text-muted-foreground">Loading widget…</p>}
    </div>
  );
}
export function UseCaseTabs({ items }) {
  return <Tabs defaultValue={items[0].label} className="mt-10">
    <TabsList className="h-auto w-full flex-wrap justify-start gap-1 p-1">
      {items.map((item) => <TabsTrigger key={item.label} value={item.label} className="min-h-10 flex-1 px-3 text-sm">{item.label}</TabsTrigger>)}
    </TabsList>
    {items.map((item) => <TabsContent key={item.label} value={item.label} className="mt-4 rounded-xl border border-border bg-card p-6 shadow-sm data-[state=active]:animate-in data-[state=active]:fade-in-0 data-[state=active]:duration-150">
      <div className="grid gap-6 md:grid-cols-[0.7fr_1.3fr] md:items-center">
        <div><div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">{item.icon}</div><p className="mt-4 text-xs font-medium uppercase tracking-widest text-primary">Example workflow</p><h3 className="mt-2 text-xl font-semibold text-foreground">{item.label}</h3><p className="mt-2 text-base text-muted-foreground">{item.description}</p></div>
        <div className="space-y-2 rounded-xl border border-border bg-muted/30 p-4">{item.questions.slice(0, 3).map((question, index) => <div key={question} className={`max-w-[85%] rounded-xl p-3 text-sm ${index === 1 ? "ml-auto bg-primary text-primary-foreground" : "bg-card text-foreground shadow-sm"}`}>{question}</div>)}</div>
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
    { q: "What counts as a conversation?", a: "A conversation is one visitor chat session, however many messages it has." },
    { q: "What happens when I reach my plan limit?", a: "Visitors see a friendly unavailable message. You get an email at 80% and 100%, and can upgrade anytime." },
    { q: "Can I cancel anytime?", a: "Yes. There is no long-term contract required. You can pause or cancel at the end of a billing cycle." },
  ];

  return (
    <Accordion type="single" collapsible defaultValue="faq-0" className="rounded-xl border border-border bg-card px-5 shadow-sm">
      {items.map((item, index) => <AccordionItem key={item.q} value={`faq-${index}`}><AccordionTrigger className="text-base">{item.q}</AccordionTrigger><AccordionContent className="text-sm leading-6 text-muted-foreground">{item.a}</AccordionContent></AccordionItem>)}
    </Accordion>
  );
}

export function ThemeShowcase() {
  const [primaryColor, setPrimaryColor] = useState("#4F46E5");
  const [position, setPosition] = useState("right");
  const [greeting, setGreeting] = useState(
    "Hi! Can I help with your visit today?",
  );

  const validColor = /^#[0-9a-fA-F]{6}$/.test(primaryColor);
  return (
    <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
      <div className="rounded-3xl border border-border bg-card p-5 shadow-sm">
        <Label className="block text-sm font-medium text-foreground">
          Primary color
        </Label>
        <div className="mt-3 flex flex-wrap gap-2">{["#4F46E5", "#0F766E", "#2563EB", "#9333EA", "#C2410C", "#BE123C", "#0369A1", "#475569"].map((color) => <button key={color} type="button" onClick={() => setPrimaryColor(color)} aria-label={`Use ${color}`} aria-pressed={primaryColor.toLowerCase() === color.toLowerCase()} className={`flex size-8 items-center justify-center rounded-full border-2 ${primaryColor.toLowerCase() === color.toLowerCase() ? "border-foreground ring-2 ring-ring/40" : "border-transparent"}`} style={{ backgroundColor: color }}>{primaryColor.toLowerCase() === color.toLowerCase() && <Check className="size-4 text-primary-foreground" />}</button>)}</div>
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
        <div className="mt-5"><p className="text-sm font-medium text-foreground">Widget position</p><div className="mt-2 inline-flex rounded-lg border border-border bg-muted p-1"><Button type="button" variant="ghost" size="sm" onClick={() => setPosition("left")} aria-pressed={position === "left"} className={position === "left" ? "bg-card shadow-sm" : ""}>Left</Button><Button type="button" variant="ghost" size="sm" onClick={() => setPosition("right")} aria-pressed={position === "right"} className={position === "right" ? "bg-card shadow-sm" : ""}>Right</Button></div></div>
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

      <div className="min-h-[420px] rounded-xl border border-border bg-muted p-3 shadow-sm">
        <AppearancePreview compact botId="demo-customization" config={{ theme: { primaryColor: validColor ? primaryColor : "#4F46E5", mode: "light", position, borderRadius: 16, fontFamily: "system" }, texts: { botName: "Assistant", greetingMessage: greeting, inputPlaceholder: "Type your message", starterQuestions: [] }, branding: { showBadge: true } }} />
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
