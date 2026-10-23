import Link from "next/link";
import {
  BookOpen,
  CalendarCheck,
  Gauge,
  Globe,
  MessageCircle,
  MessagesSquare,
  Palette,
  SearchX,
  Check,
  Smile,
  Scissors,
  Home,
  UtensilsCrossed,
  ShoppingBag,
  CircleCheck,
} from "lucide-react";
import { FaqAccordion } from "@/components/marketing/MarketingUI";
import MarketingPlans from "@/components/marketing/MarketingPlans";
import { MarketingAuthCta } from "@/components/marketing/MarketingAuth";
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
  {
    title: "Trained on your content",
    icon: BookOpen,
    description: "Upload docs or add your website and the bot answers from your real information.",
  },
  {
    title: "Your brand, your look",
    icon: Palette,
    description: "Custom colors, greeting and fonts with a live preview before you publish.",
  },
  {
    title: "Leads and appointments",
    icon: CalendarCheck,
    description: "Capture contact details and booking requests, with instant email alerts.",
  },
  {
    title: "Works on any website",
    icon: Globe,
    description: "Paste one script tag. Works with WordPress, Shopify, Webflow and custom sites.",
  },
  {
    title: "Conversation history",
    icon: MessagesSquare,
    description: "Read every chat and follow up with the people who reached out.",
  },
  {
    title: "Unanswered question insights",
    icon: SearchX,
    description: "See what visitors asked that the bot could not answer, and fix the gaps.",
  },
  {
    title: "Simple usage limits",
    icon: Gauge,
    description: "Clear monthly conversation limits per plan. No surprise charges.",
  },
  {
    title: "WhatsApp",
    icon: MessageCircle,
    description: "Answer customers on WhatsApp too.",
    comingSoon: true,
  },
];

function FeatureCard({ feature }) {
  const Icon = feature.icon;

  return (
    <div className="group relative h-full rounded-xl border border-border bg-card p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md motion-reduce:transform-none motion-reduce:transition-none">
      {feature.comingSoon && (
        <span className="absolute right-5 top-5 rounded-full bg-muted px-2.5 py-1 text-xs text-muted-foreground">
          Coming soon
        </span>
      )}
      <div
        className={`flex h-10 w-10 items-center justify-center rounded-lg transition-colors duration-200 motion-reduce:transition-none ${
          feature.comingSoon
            ? "bg-muted text-muted-foreground"
            : "bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground"
        }`}
      >
        <Icon size={20} strokeWidth={1.75} aria-hidden="true" />
      </div>
      <h3 className="mt-4 text-sm font-semibold text-foreground">{feature.title}</h3>
      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
    </div>
  );
}

const useCases = [
  {
    label: "Clinics",
    icon: <Smile className="size-5" aria-hidden="true" />,
    description: "Help patients find services and book their next visit.",
    questions: ["Can I book a consultation?", "Do you have evening appointments?"],
  },
  {
    label: "Salons",
    icon: <Scissors className="size-5" aria-hidden="true" />,
    description: "Turn service questions into straightforward bookings.",
    questions: ["Do you offer bridal packages?", "Can I book a color treatment?"],
  },
  {
    label: "Real estate",
    icon: <Home className="size-5" aria-hidden="true" />,
    description: "Qualify interested visitors before a viewing.",
    questions: ["What properties are available this week?", "Can I book a viewing?"],
  },
  {
    label: "Restaurants",
    icon: <UtensilsCrossed className="size-5" aria-hidden="true" />,
    description: "Answer menu and reservation questions in seconds.",
    questions: ["Do you offer vegetarian options?", "Can I reserve a table for Friday?"],
  },
  {
    label: "Online stores",
    icon: <ShoppingBag className="size-5" aria-hidden="true" />,
    description: "Guide shoppers through shipping and returns.",
    questions: ["Do you ship to my city?", "What is the returns policy?"],
  },
];

function OutcomeVisual() {
  const stats = [
    ["Conversations", "248"],
    ["Leads captured", "36"],
    ["Unanswered", "8"],
  ];
  const leads = [
    ["Maya Rahman", "Teeth whitening", "New", "4m ago"],
    ["Owen Taylor", "Dental implant", "Contacted", "18m ago"],
    ["Nora Patel", "Checkup", "New", "1h ago"],
  ];
  return (
    <div className="relative">
      <div
        className="absolute inset-8 -z-10 rounded-full bg-primary/15 blur-3xl"
        aria-hidden="true"
      />
      <div className="rounded-xl border border-border bg-card p-5 shadow-lg">
        <div className="flex items-center justify-between border-b border-border pb-4">
          <div>
            <p className="text-base font-semibold text-foreground">Overview</p>
            <p className="mt-1 text-xs text-muted-foreground">Sample data</p>
          </div>
          <span className="rounded-full border border-border bg-muted px-2.5 py-1 text-xs text-muted-foreground">
            Last 30 days
          </span>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-2">
          {stats.map(([label, value]) => (
            <div key={label} className="rounded-lg border border-border bg-muted/30 p-3">
              <p className="text-[11px] text-muted-foreground">{label}</p>
              <p className="mt-2 text-xl font-semibold tabular-nums text-foreground">{value}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 rounded-lg border border-border bg-background p-3">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-foreground">Conversations</p>
            <span className="text-xs text-primary">+18%</span>
          </div>
          <svg
            viewBox="0 0 320 100"
            className="mt-3 h-24 w-full"
            role="img"
            aria-label="Sample conversations trend"
          >
            <defs>
              <linearGradient id="overview-fill" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="currentColor" stopOpacity=".22" />
                <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              d="M0 84 C25 74 35 80 58 61 S93 71 118 48 S155 58 181 34 S218 47 243 22 S281 36 320 10 V100 H0Z"
              fill="url(#overview-fill)"
              className="text-primary"
            />
            <path
              d="M0 84 C25 74 35 80 58 61 S93 71 118 48 S155 58 181 34 S218 47 243 22 S281 36 320 10"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              className="text-primary"
            />
          </svg>
        </div>
        <div className="mt-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-foreground">Latest leads</p>
            <span className="text-xs text-muted-foreground">Sample data</span>
          </div>
          <div className="mt-2 divide-y divide-border rounded-lg border border-border">
            {leads.map(([name, interest, status, time]) => (
              <div key={name} className="flex items-center gap-3 px-3 py-2.5">
                <div className="flex size-7 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                  {name
                    .split(" ")
                    .map((part) => part[0])
                    .join("")}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-foreground">{name}</p>
                  <p className="truncate text-xs text-muted-foreground">{interest}</p>
                </div>
                <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[11px] text-primary">
                  {status}
                </span>
                <span className="text-xs text-muted-foreground">{time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="absolute -right-5 -top-4 hidden items-center gap-1.5 rounded-full border border-border bg-card px-3 py-2 text-xs font-medium text-foreground shadow-sm motion-safe:animate-pulse lg:flex">
        <CircleCheck className="size-4 text-success" aria-hidden="true" />
        New lead captured
      </div>
    </div>
  );
}

function UseCaseCards() {
  return (
    <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
      {useCases.map((item) => (
        <article
          key={item.label}
          className="flex h-full flex-col rounded-xl border border-border bg-card p-5 shadow-sm"
        >
          <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
            {item.icon}
          </div>
          <h3 className="mt-4 text-base font-semibold text-foreground">{item.label}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {item.questions.map((question) => (
              <span
                key={question}
                className="rounded-full bg-muted px-2.5 py-1 text-xs text-muted-foreground"
              >
                {question}
              </span>
            ))}
          </div>
        </article>
      ))}
    </div>
  );
}

export default function MarketingHome() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      ["How long does setup take?", "Most businesses are live in under 15 minutes."],
      [
        "What counts as a conversation?",
        "A conversation is one visitor chat session, however many messages it has.",
      ],
      [
        "What happens when I reach my plan limit?",
        "Visitors see a friendly unavailable message and you can upgrade anytime.",
      ],
    ].map(([name, text]) => ({
      "@type": "Question",
      name,
      acceptedAnswer: { "@type": "Answer", text },
    })),
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <section className="mx-auto max-w-6xl px-4 pb-16 pt-16 sm:px-6 lg:pb-20 lg:pt-20">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="mb-4 inline-flex rounded-full border border-primary/20 bg-accent px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-primary">
              Website AI assistant
            </p>
            <h1 className="max-w-xl text-4xl font-semibold leading-tight text-foreground sm:text-5xl">
              Answer visitor questions. Capture leads. From your own website.
            </h1>
            <p className="mt-5 max-w-xl text-lg text-muted-foreground">{brand.tagline}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <MarketingAuthCta
                className="rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
              />
              <a
                href="#features"
                className="rounded-full border border-border bg-card px-5 py-3 text-sm font-semibold text-foreground hover:bg-background"
              >
                See it in action
              </a>
            </div>
            <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
              {["Free plan, no credit card", "Set up in minutes", "One script tag"].map((item) => (
                <span key={item} className="inline-flex items-center gap-1.5">
                  <Check className="size-4 text-primary" aria-hidden="true" />
                  {item}
                </span>
              ))}
            </div>
          </div>

          <OutcomeVisual />
        </div>
      </section>

      <section id="how-it-works" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium uppercase tracking-[0.16em] text-muted-foreground">
            How it works
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-foreground">Three simple steps</h2>
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
              <h3 className="mt-3 text-xl font-semibold text-foreground">{step.title}</h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{step.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="features" className="border-y border-border bg-muted/30 py-20 lg:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              FEATURES
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-foreground">
              Everything you need to answer questions and capture leads
            </h2>
            <p className="mt-4 text-sm text-muted-foreground">
              Set up in minutes, configure everything from one dashboard.
            </p>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
            {features.map((feature) => (
              <FeatureCard key={feature.title} feature={feature} />
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
        <UseCaseCards />
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
        <MarketingPlans />
      </section>

      <section id="faq" className="bg-background py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-medium uppercase tracking-[0.16em] text-muted-foreground">
              FAQ
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-foreground">Common questions</h2>
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
              <h2 className="mt-2 text-3xl font-semibold">Start your website assistant today.</h2>
            </div>
            <div className="flex flex-wrap gap-3">
              <MarketingAuthCta
                className="rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
              />
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
