import Link from "next/link";
import {
  BrandWordmark,
  FaqAccordion,
  LiveWidgetDemo,
  PricingCards,
  ThemeShowcase,
  UseCaseTabs,
} from "@/components/marketing/MarketingUI";
import { brand } from "@/lib/brand";

export const metadata = {
  title: "AI assistant for your website",
  description:
    "Answer visitor questions, capture leads, and book more appointments with a simple AI assistant for your website.",
  openGraph: {
    title: `${brand.name} | AI assistant for your website`,
    description:
      "Answer visitor questions, capture leads, and book more appointments with a simple AI assistant for your website.",
  },
  twitter: {
    card: "summary_large_image",
    title: `${brand.name} | AI assistant for your website`,
    description:
      "Answer visitor questions, capture leads, and book more appointments with a simple AI assistant for your website.",
  },
};

const steps = [
  {
    title: "Add your content",
    text: "Use your website, FAQ, or uploaded files as the source material.",
    icon: "▣",
  },
  {
    title: "Customize the look",
    text: "Match your brand colors, greeting, and placement in a live preview.",
    icon: "✦",
  },
  {
    title: "Paste one line of code",
    text: "Add the snippet to any page and your assistant is live.",
    icon: "</>",
  },
];

const features = [
  "Trained on your own docs and website",
  "Custom colors and greeting with live preview",
  "Lead and appointment capture with email alerts",
  "Works on any website",
  "Conversation history and follow-up trails",
  "Unanswered question insights",
  "Simple usage limits you can understand",
  "WhatsApp support coming soon",
];

const useCases = [
  {
    label: "Clinics",
    questions: ["What are your opening hours?", "Can I book a consultation?"],
  },
  {
    label: "Salons",
    questions: [
      "Do you offer bridal packages?",
      "Can I book a color treatment?",
    ],
  },
  {
    label: "Real estate",
    questions: [
      "What properties are available this week?",
      "Can I book a viewing?",
    ],
  },
  {
    label: "Restaurants",
    questions: [
      "Do you offer vegetarian options?",
      "Can I reserve a table for Friday?",
    ],
  },
  {
    label: "Online stores",
    questions: ["Do you ship to my city?", "What is the returns policy?"],
  },
];

export default function MarketingHome() {
  return (
    <>
      <section className="mx-auto max-w-6xl px-4 pb-16 pt-16 sm:px-6 lg:pb-20 lg:pt-20">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="mb-4 inline-flex rounded-full border border-primary/20 bg-accent px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-primary">
              Website AI assistant
            </p>
            <h1 className="max-w-xl text-4xl font-semibold leading-tight text-foreground sm:text-5xl">
              Answer visitor questions. Capture leads. From your own website.
            </h1>
            <p className="mt-5 max-w-xl text-lg text-muted-foreground">
              {brand.tagline}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/signup"
                className="rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
              >
                Get started free
              </Link>
              <a
                href="#demo"
                className="rounded-full border border-border bg-card px-5 py-3 text-sm font-semibold text-foreground hover:bg-background"
              >
                See it in action
              </a>
            </div>
          </div>

          <div className="rounded-[32px] border border-border bg-background p-5 shadow-sm">
            <div className="rounded-[28px] border border-border bg-card p-4">
              <div className="mb-4 flex items-center justify-between border-b border-border pb-3">
                <BrandWordmark className="gap-2" />
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-destructive" />
                  <span className="h-2.5 w-2.5 rounded-full bg-warning" />
                  <span className="h-2.5 w-2.5 rounded-full bg-success" />
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-[1.1fr_0.9fr]">
                <div className="rounded-2xl bg-muted p-4">
                  <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                    Live assistant
                  </p>
                  <div className="mt-4 rounded-2xl bg-card p-4 shadow-sm">
                    <p className="font-semibold text-foreground">
                      Hi! I can answer questions about your services.
                    </p>
                    <div className="mt-4 space-y-2 text-sm text-muted-foreground">
                      <div className="rounded-xl bg-muted p-2">
                        Can I book a visit?
                      </div>
                      <div className="rounded-xl bg-muted p-2">
                        What are your opening hours?
                      </div>
                    </div>
                  </div>
                </div>
                <div className="rounded-2xl bg-accent p-4">
                  <p className="text-sm font-semibold text-foreground">
                    Lead capture
                  </p>
                  <div className="mt-3 space-y-2">
                    <div className="rounded-xl border border-primary/20 bg-card p-2 text-xs text-muted-foreground">
                      Name
                    </div>
                    <div className="rounded-xl border border-primary/20 bg-card p-2 text-xs text-muted-foreground">
                      Email
                    </div>
                    <div className="rounded-xl border border-primary/20 bg-card p-2 text-xs text-muted-foreground">
                      Preferred time
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="demo"
        className="border-t border-border bg-background py-20"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-medium uppercase tracking-[0.16em] text-muted-foreground">
              Live demo
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-foreground">
              Try the widget on a sample website
            </h2>
          </div>
          <div className="mt-10">
            <LiveWidgetDemo />
          </div>
        </div>
      </section>

      <section
        id="how-it-works"
        className="mx-auto max-w-6xl px-4 py-20 sm:px-6"
      >
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium uppercase tracking-[0.16em] text-muted-foreground">
            How it works
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-foreground">
            Three simple steps
          </h2>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {steps.map((step) => (
            <div
              key={step.title}
              className="rounded-3xl border border-border bg-card p-6 shadow-sm"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-accent text-xl font-semibold text-primary">
                {step.icon}
              </div>
              <div className="text-sm font-medium uppercase tracking-[0.14em] text-muted-foreground">
                Step {steps.indexOf(step) + 1}
              </div>
              <h3 className="mt-3 text-xl font-semibold text-foreground">
                {step.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                {step.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section id="features" className="bg-background py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-medium uppercase tracking-[0.16em] text-muted-foreground">
              Features
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-foreground">
              Everything you need to answer questions and capture leads
            </h2>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {features.map((feature, index) => (
              <div
                key={feature}
                className={`rounded-2xl border border-border bg-card p-6 shadow-sm ${index === 0 || index === 2 ? "md:col-span-2" : ""}`}
              >
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-accent text-primary">
                  ✓
                </div>
                <p className="text-sm leading-6 text-foreground">{feature}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium uppercase tracking-[0.16em] text-muted-foreground">
            Use cases
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-foreground">
            Built for common business workflows
          </h2>
        </div>
        <UseCaseTabs items={useCases} />
      </section>

      <section className="bg-background py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-medium uppercase tracking-[0.16em] text-muted-foreground">
              Customization
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-foreground">
              Match the assistant to your brand
            </h2>
          </div>
          <div className="mt-10">
            <ThemeShowcase />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium uppercase tracking-[0.16em] text-muted-foreground">
            Pricing
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-foreground">
            Simple plans for early use
          </h2>
        </div>
        <PricingCards />
      </section>

      <section id="faq" className="bg-background py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-medium uppercase tracking-[0.16em] text-muted-foreground">
              FAQ
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-foreground">
              Common questions
            </h2>
          </div>
          <div className="mt-10">
            <FaqAccordion />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="rounded-[32px] bg-foreground px-6 py-10 text-primary-foreground shadow-sm sm:px-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.18em] text-primary-foreground/70">
                Ready to try it?
              </p>
              <h2 className="mt-2 text-3xl font-semibold">
                Start your website assistant today.
              </h2>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/signup"
                className="rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
              >
                Get started free
              </Link>
              <Link
                href="/contact"
                className="rounded-full border border-border px-5 py-3 text-sm font-semibold text-primary-foreground hover:bg-muted"
              >
                Talk to us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
