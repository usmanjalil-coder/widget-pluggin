import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  CalendarCheck,
  Globe,
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
import { MarketingAuthCta } from "@/components/marketing/MarketingAuth";
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
    text: "Add your website, FAQs, or files.",
    Visual: ContentSample,
  },
  {
    title: "Customize the look",
    text: "Preview your colors, greeting, and widget placement.",
    Visual: AppearanceSample,
  },
  {
    title: "Paste one line of code",
    text: "Paste the snippet into your website to go live.",
    Visual: InstallExample,
  },
];

const features = [
  {
    title: "Trained on your content",
    icon: BookOpen,
    description: "Answer questions using your website and documents.",
  },
  {
    title: "Your brand, your look",
    icon: Palette,
    description: "Preview your colors, fonts, and greeting.",
  },
  {
    title: "Leads and appointments",
    icon: CalendarCheck,
    description: "Get contact details and booking requests by email.",
  },
  {
    title: "Works on any website",
    icon: Globe,
    description: "Add one script to your existing site.",
  },
  {
    title: "Conversation history",
    icon: MessagesSquare,
    description: "Read past chats and follow up with visitors.",
  },
  {
    title: "Unanswered question insights",
    icon: SearchX,
    description: "See which questions your content leaves unanswered.",
  },
];

const useCases = [
  {
    label: "Clinics",
    href: "/solutions/dental-practices",
    icon: <Smile className="size-5" aria-hidden="true" />,
  },
  {
    label: "Salons",
    href: "/solutions/salons",
    icon: <Scissors className="size-5" aria-hidden="true" />,
  },
  {
    label: "Real estate",
    href: "/solutions/real-estate",
    icon: <Home className="size-5" aria-hidden="true" />,
  },
  {
    label: "Restaurants",
    href: "/solutions/restaurants",
    icon: <UtensilsCrossed className="size-5" aria-hidden="true" />,
  },
  {
    label: "Online stores",
    href: "/solutions/online-stores",
    icon: <ShoppingBag className="size-5" aria-hidden="true" />,
  },
];

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
      <section className="mx-auto flex h-auto min-h-0 max-w-7xl items-center px-4 pb-2 pt-12 sm:px-6">
        <div className="grid w-full min-w-0 items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="min-w-0">
            <h1 className="max-w-xl text-4xl font-semibold leading-tight text-foreground sm:text-5xl lg:text-6xl">
              AI chatbot for small business websites
            </h1>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground">
              Answers visitor questions 24/7 from your own content, and turns them into leads. Set up in minutes with one script tag.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <MarketingAuthCta className="inline-flex h-12 w-full items-center justify-center rounded-full bg-primary px-7 text-sm font-semibold text-primary-foreground hover:bg-primary-hover sm:w-auto" />
              <Link href="#how-it-works"
                className="inline-flex h-12 w-full items-center justify-center rounded-full border border-border bg-card px-7 text-sm font-semibold text-foreground hover:bg-background sm:w-auto"
              >See how it works</Link>
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

      <section id="how-it-works" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-10 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold text-foreground">How it works</h2>
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
        className="scroll-mt-20 border-y border-border bg-muted/30 py-10"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="text-center text-3xl font-semibold">Features</h2>
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {features.map(({ title, description, icon: Icon }) => (
              <article key={title} className="rounded-xl border border-border bg-card p-5 shadow-sm">
                <Icon className="size-5 text-primary" aria-hidden="true" />
                <h3 className="mt-3 font-semibold">{title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold text-foreground">Use cases</h2>
        </div>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {useCases.map(({ label, href, icon }) => (
            <Link key={label} href={href} className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-3 text-base font-medium hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-safe:transition-transform motion-safe:hover:-translate-y-0.5">
              {icon}{label}<ArrowRight className="size-4 text-primary" aria-hidden="true" />
            </Link>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm font-semibold text-primary">
          <Link href="/solutions">Explore AI chatbot solutions by industry</Link>
          <Link href="/solutions/dental-practices">AI chatbot for dental practices</Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold text-foreground">Pricing</h2>
        </div>
        <MarketingPlans />
        <p className="mt-3 text-center text-sm text-muted-foreground">
          30-day money-back guarantee
        </p>
        <p className="mt-6 text-center">
          <Link href="/pricing" className="font-semibold text-primary">
            Compare Tellvira pricing and plans
          </Link>
        </p>
      </section>

      <section id="faq" className="scroll-mt-20 bg-background py-10">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-semibold text-foreground">FAQ</h2>
          </div>
          <div className="mt-10">
            <FaqAccordion />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="rounded-[32px] bg-foreground px-6 py-10 text-card shadow-sm sm:px-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <h2 className="text-3xl font-semibold">Start your website assistant today.</h2>
            <div className="flex flex-wrap gap-3">
              <MarketingAuthCta className="rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary-hover" />
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
