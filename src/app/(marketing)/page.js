import Link from "next/link";
import {
  BrandWordmark,
  FaqAccordion,
  LiveWidgetDemo,
  PricingCards,
  ThemeShowcase,
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
            <p className="mb-4 inline-flex rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-blue-700">
              Website AI assistant
            </p>
            <h1 className="max-w-xl text-4xl font-semibold leading-tight text-slate-900 sm:text-5xl">
              An AI assistant that answers your visitors&apos; questions and
              captures leads on your website, set up in minutes, no code.
            </h1>
            <p className="mt-5 max-w-xl text-lg text-slate-600">
              {brand.tagline}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/signup"
                className="rounded-full bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-500"
              >
                Get started free
              </Link>
              <a
                href="#demo"
                className="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                See it in action
              </a>
            </div>
          </div>

          <div className="rounded-[32px] border border-slate-200 bg-slate-50 p-5 shadow-sm">
            <div className="rounded-[28px] border border-slate-200 bg-white p-4">
              <div className="mb-4 flex items-center justify-between border-b border-slate-200 pb-3">
                <div className="flex items-center gap-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100">
                    <BrandWordmark className="gap-2" />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-[1.1fr_0.9fr]">
                <div className="rounded-2xl bg-slate-100 p-4">
                  <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-500">
                    Live assistant
                  </p>
                  <div className="mt-4 rounded-2xl bg-white p-4 shadow-sm">
                    <p className="font-semibold text-slate-900">
                      Hi! I can answer questions about your services.
                    </p>
                    <div className="mt-4 space-y-2 text-sm text-slate-600">
                      <div className="rounded-xl bg-slate-100 p-2">
                        Can I book a visit?
                      </div>
                      <div className="rounded-xl bg-slate-100 p-2">
                        What are your opening hours?
                      </div>
                    </div>
                  </div>
                </div>
                <div className="rounded-2xl bg-blue-50 p-4">
                  <p className="text-sm font-semibold text-slate-900">
                    Lead capture
                  </p>
                  <div className="mt-3 space-y-2">
                    <div className="rounded-xl border border-blue-100 bg-white p-2 text-xs text-slate-600">
                      Name
                    </div>
                    <div className="rounded-xl border border-blue-100 bg-white p-2 text-xs text-slate-600">
                      Email
                    </div>
                    <div className="rounded-xl border border-blue-100 bg-white p-2 text-xs text-slate-600">
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
        className="border-t border-slate-200 bg-slate-50 py-20"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-medium uppercase tracking-[0.16em] text-slate-500">
              Live demo
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-slate-900">
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
          <p className="text-sm font-medium uppercase tracking-[0.16em] text-slate-500">
            How it works
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-slate-900">
            Three simple steps
          </h2>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {steps.map((step) => (
            <div
              key={step.title}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-xl font-semibold text-blue-700">
                {step.icon}
              </div>
              <div className="text-sm font-medium uppercase tracking-[0.14em] text-slate-500">
                Step {steps.indexOf(step) + 1}
              </div>
              <h3 className="mt-3 text-xl font-semibold text-slate-900">
                {step.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                {step.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section id="features" className="bg-slate-50 py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-medium uppercase tracking-[0.16em] text-slate-500">
              Features
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-slate-900">
              Everything you need to answer questions and capture leads
            </h2>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {features.map((feature) => (
              <div
                key={feature}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  ✓
                </div>
                <p className="text-sm leading-6 text-slate-700">{feature}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium uppercase tracking-[0.16em] text-slate-500">
            Use cases
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-slate-900">
            Built for common business workflows
          </h2>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-5">
          {useCases.map((item) => (
            <div
              key={item.label}
              className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <h3 className="text-lg font-semibold text-slate-900">
                {item.label}
              </h3>
              <ul className="mt-4 space-y-2 text-sm text-slate-600">
                {item.questions.map((question) => (
                  <li key={question} className="rounded-xl bg-slate-50 p-2">
                    {question}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-medium uppercase tracking-[0.16em] text-slate-500">
              Customization
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-slate-900">
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
          <p className="text-sm font-medium uppercase tracking-[0.16em] text-slate-500">
            Pricing
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-slate-900">
            Simple plans for early use
          </h2>
        </div>
        <PricingCards />
      </section>

      <section id="faq" className="bg-slate-50 py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-medium uppercase tracking-[0.16em] text-slate-500">
              FAQ
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-slate-900">
              Common questions
            </h2>
          </div>
          <div className="mt-10">
            <FaqAccordion />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="rounded-[32px] bg-slate-900 px-6 py-10 text-white shadow-lg sm:px-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.18em] text-slate-300">
                Ready to try it?
              </p>
              <h2 className="mt-2 text-3xl font-semibold">
                Start your website assistant today.
              </h2>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/signup"
                className="rounded-full bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-500"
              >
                Get started free
              </Link>
              <Link
                href="/contact"
                className="rounded-full border border-slate-700 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800"
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
