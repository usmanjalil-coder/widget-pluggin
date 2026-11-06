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
} from "lucide-react";
import { FaqAccordion } from "@/components/marketing/FaqAccordion";
import MarketingPlans from "@/components/marketing/MarketingPlans";
import { MarketingAuthCta, MarketingLoginLink } from "@/components/marketing/MarketingAuth";
import { UseCaseTabs } from "@/components/marketing/UseCaseTabs";
import InstallExample from "@/components/marketing/InstallExample";
import HeroDemo from "@/components/marketing/HeroDemo";
import { buildMetadata, absoluteUrl, siteConfig, faqSchema, ORGANIZATION_PROFILES } from "@/lib/seo";
import { homeFaq } from "@/content/faqs";
import { JsonLd } from "@/components/marketing/JsonLd";

export const metadata = buildMetadata({
  title: { absolute: "AI Chatbot for Small Business Websites & Leads | Tellvira" },
  description:
    "Add an AI chatbot to your small business website. Answer visitor questions, capture leads and appointment requests around the clock. Start free with Tellvira.",
  path: "/",
});

const steps = [
  {
    title: "Add your content",
    text: "Use your website, FAQ, or uploaded files as the source material.",
    Visual: ContentSample,
  },
  {
    title: "Customize the look",
    text: "Match your brand colors, greeting, and placement in a live preview.",
    Visual: AppearanceSample,
  },
  {
    title: "Paste one line of code",
    text: "Add the snippet to any page and your assistant is live.",
    Visual: InstallExample,
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

function FeatureCard({ feature, highlight = false }) {
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
      {highlight && <div className="mt-4"><FeatureSample title={feature.title} /></div>}
      <h3 className="mt-4 text-sm font-semibold text-foreground">{feature.title}</h3>
      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
    </div>
  );
}

const useCases = [
  {
    label: "Clinics",
    href: "/solutions/dental-practices",
    icon: <Smile className="size-5" aria-hidden="true" />,
    description: "Help patients find services and book their next visit.",
    questions: ["Do you have evening appointments?", "Can I book a consultation?"],
  },
  {
    label: "Salons",
    href: "/solutions/salons",
    icon: <Scissors className="size-5" aria-hidden="true" />,
    description: "Turn service questions into straightforward bookings.",
    questions: ["Do you offer bridal packages?", "Can I book a color treatment?"],
  },
  {
    label: "Real estate",
    href: "/solutions/real-estate",
    icon: <Home className="size-5" aria-hidden="true" />,
    description: "Qualify interested visitors before a viewing.",
    questions: ["What properties are available this week?", "Can I book a viewing?"],
  },
  {
    label: "Restaurants",
    href: "/solutions/restaurants",
    icon: <UtensilsCrossed className="size-5" aria-hidden="true" />,
    description: "Answer menu and reservation questions in seconds.",
    questions: ["Do you offer vegetarian options?", "Can I reserve a table for Friday?"],
  },
  {
    label: "Online stores",
    href: "/solutions/online-stores",
    icon: <ShoppingBag className="size-5" aria-hidden="true" />,
    description: "Guide shoppers through shipping and returns.",
    questions: ["What is the returns policy?", "Do you ship to my city?"],
  },
];

const highlightTitles = ["Leads and appointments", "Unanswered question insights", "Your brand, your look"];
const previewClass = "rounded-xl border border-border bg-muted/30 p-4 text-xs";
const chipClass = "inline-flex rounded-md border border-border bg-card px-2 py-1";

function AppearanceSample() {
  return <div className={previewClass}>
    <div className="flex flex-wrap items-center gap-2">
      {["bg-primary", "bg-[var(--brand-300)]", "bg-muted-foreground", "bg-foreground"].map((color, i) => (
        <span key={color} className={"grid size-5 place-items-center rounded-full " + color}>
          {i === 0 && <Check className="size-3 text-primary-foreground" />}
        </span>
      ))}
      <span className={chipClass}>Inter</span>
    </div>
    <p className="mt-3 w-fit rounded-xl rounded-bl-sm bg-accent px-3 py-2 text-accent-foreground">Hi! How can I help?</p>
  </div>;
}

function ContentSample() {
  return <div className={previewClass}>
    <div className="flex flex-wrap items-center gap-2"><span className={chipClass}>yourbusiness.com</span>
      <span className="rounded-full bg-accent px-2 py-1 text-primary">Crawling...</span></div>
    <div className="mt-3 flex flex-wrap gap-2"><span className={chipClass}>FAQ.pdf</span><span className={chipClass}>Services.docx</span></div>
  </div>;
}

function FeatureSample({ title }) {
  if (title === "Your brand, your look") return <AppearanceSample />;
  if (title === "Leads and appointments") return <div className={previewClass}>
    <div className="flex items-center justify-between"><span>Sarah M.</span><span className="rounded-full bg-accent px-2 py-1 text-primary">New</span></div>
    <p className="mt-2 text-muted-foreground">Appointment request</p>
  </div>;
  return <div className={previewClass}><p className="font-semibold">Unanswered · 2</p>
    <ul className="mt-2 space-y-1"><li>Is parking available?</li><li>Do you open on Sundays?</li></ul>
  </div>;
}

export default function MarketingHome() {
  return (
    <main>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "Organization",
            name: siteConfig.name,
            url: absoluteUrl(),
            logo: absoluteUrl(siteConfig.logo),
            email: siteConfig.supportEmail,
            contactPoint: {
              "@type": "ContactPoint",
              contactType: "customer support",
              email: "hello@tellvira.com",
            },
            sameAs: ORGANIZATION_PROFILES,
          },
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: siteConfig.name,
            url: absoluteUrl(),
          },
          faqSchema(homeFaq),
        ]}
      />
      <section className="mx-auto flex h-auto min-h-0 max-w-7xl items-center px-4 pb-12 pt-16 sm:px-6 lg:min-h-[min(calc(100svh-5rem),880px)] lg:pt-8">
        <div className="grid w-full min-w-0 items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="min-w-0">
            <p className="mb-4 inline-flex rounded-full border border-primary/20 bg-accent px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-primary">
              Website AI assistant
            </p>
            <h1 className="max-w-xl text-4xl font-semibold leading-tight text-foreground sm:text-5xl lg:text-6xl">
              AI chatbot for small business websites
            </h1>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground">
              Answers visitor questions 24/7 from your own content, and turns them into leads. Set up in minutes with one script tag.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <MarketingAuthCta loggedOutLabel="Start free" reserveLabelSpace className="inline-flex h-12 w-full items-center justify-center rounded-full bg-primary px-7 text-sm font-semibold text-primary-foreground hover:bg-primary-hover sm:w-auto" />
              <MarketingLoginLink
                className="inline-flex h-12 w-full items-center justify-center rounded-full border border-border bg-card px-7 text-sm font-semibold text-foreground hover:bg-background sm:w-auto"
              />
            </div>
            <div className="mt-7 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
              {["Free plan, no credit card", "Your brand, your look", "Cancel anytime"].map((item) => (
                <span key={item} className="inline-flex items-center gap-1.5">
                  <Check className="size-4 text-primary" aria-hidden="true" />
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="h-auto min-w-0">
            <HeroDemo />
          </div>
        </div>
      </section>

      <section id="how-it-works" className="mx-auto max-w-6xl scroll-mt-20 px-4 pb-20 pt-8 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium uppercase tracking-[0.16em] text-muted-foreground">
            How it works
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-foreground">Three simple steps</h2>
        </div>
        <div className="mt-12 grid gap-x-6 gap-y-9 md:grid-cols-3">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className="group relative min-w-0 rounded-3xl border border-border bg-card p-6 shadow-sm motion-safe:transition-[transform,box-shadow] motion-safe:hover:-translate-y-0.5 hover:shadow-md"
            >
              <span
                aria-hidden="true"
                className="absolute right-6 top-0 grid size-8 -translate-y-1/2 place-items-center rounded-full bg-[var(--brand-600)] font-bold text-white ring-[3px] ring-background motion-safe:transition-transform motion-safe:group-hover:scale-105 md:size-9"
              >
                {index + 1}
              </span>
              <div className="mb-4 min-w-0 md:h-44 lg:h-36"><step.Visual /></div>
              <h3 className="text-xl font-semibold text-foreground md:min-h-[2lh] xl:min-h-0">
                <span className="sr-only">Step {index + 1}. </span>{step.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{step.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section
        id="features"
        className="scroll-mt-20 border-y border-border bg-muted/30 py-20 lg:py-24"
      >
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
          <div className="mt-10 grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-5">
            {highlightTitles.map((title) => (
              <FeatureCard key={title} feature={features.find((feature) => feature.title === title)} highlight />
            ))}
          </div>
          <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            {features.filter((feature) => !highlightTitles.includes(feature.title)).map((feature) => (
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
        <UseCaseTabs items={useCases} />
        <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm font-semibold text-primary">
          <Link href="/solutions">Explore AI chatbot solutions by industry</Link>
          <Link href="/solutions/dental-practices">AI chatbot for dental practices</Link>
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
        <MarketingPlans />
        <p className="mt-3 text-center text-sm text-muted-foreground">
          No credit card · Cancel anytime · 30-day money-back guarantee
        </p>
        <p className="mt-6 text-center">
          <Link href="/pricing" className="font-semibold text-primary">
            Compare Tellvira pricing and plans
          </Link>
        </p>
      </section>

      <section id="faq" className="scroll-mt-20 bg-background py-20">
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
        <div className="rounded-[32px] bg-foreground px-6 py-10 text-card shadow-sm sm:px-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.18em] text-card/70">
                Ready to try it?
              </p>
              <h2 className="mt-2 text-3xl font-semibold">Start your website assistant today.</h2>
            </div>
            <div className="flex flex-wrap gap-3">
              <MarketingAuthCta loggedOutLabel="Start free" reserveLabelSpace className="rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary-hover" />
              <Link
                href="/contact"
                className="rounded-full border border-border px-5 py-3 text-sm font-semibold text-card hover:bg-muted hover:text-foreground"
              >
                Talk to us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
