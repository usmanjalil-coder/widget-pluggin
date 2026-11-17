import Link from "next/link";
import { Breadcrumbs } from "@/components/marketing/Breadcrumbs";
import { FaqAccordion } from "@/components/marketing/FaqAccordion";
import { JsonLd } from "@/components/marketing/JsonLd";
import InstallExample from "@/components/marketing/InstallExample";
import { MarketingAuthCta } from "@/components/marketing/MarketingAuth";
import { buildMetadata, faqSchema } from "@/lib/seo";

export const metadata = buildMetadata({
  title: { absolute: "WordPress Chatbot – Add AI Chat Without a Plugin | Tellvira" },
  description:
    "Add a WordPress chatbot with one snippet, no heavy plugin needed. Answer visitor questions and capture leads from your content. Start free.",
  path: "/wordpress-chatbot",
});

const faq = [
  {
    question: "Is Tellvira a WordPress chatbot plugin?",
    answer:
      "No. Tellvira is a hosted assistant installed with a script snippet. You can use your theme's footer code option or a code-snippet plugin to place it on your site.",
  },
  {
    question: "Will this WordPress chat bot work with my theme?",
    answer:
      "The snippet does not depend on a particular theme. Your site must allow custom scripts. Test the published site on desktop and mobile, especially if you use caching or script-blocking tools.",
  },
  {
    question: "Does adding the snippet affect performance?",
    answer:
      "You do not need a dedicated chatbot plugin running in WordPress. The script uses defer, but it still adds a network request and browser work. Check your site's performance after installation.",
  },
  {
    question: "Can I try it for free?",
    answer:
      "Yes. Create a bot on the Free plan, add your public website content, and test answers and lead capture before choosing a paid plan. Staff confirm appointment requests directly.",
  },
];
const steps = [
  {
    title: "Create your bot",
    text: "Add your public pages, FAQs, or approved documents. Choose a greeting and the contact details your team needs for follow-up.",
  },
  {
    title: "Copy your install snippet",
    text: "Open your bot's Install tab in the dashboard and copy its snippet. The example below uses YOUR_BOT_ID; use the actual snippet from your dashboard.",
  },
  {
    title: "Add the snippet to your footer",
    text: "Use your theme's header/footer code option or a code-snippet plugin to paste it before the closing body tag. Add it once in a shared footer so it appears across your site.",
  },
  {
    title: "Test your published website",
    text: "Check desktop and mobile, ask a routine question, and submit a test inquiry. Confirm that your team receives it and remove any duplicate script installations.",
  },
];

export default function WordPressPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <JsonLd data={faqSchema(faq)} />
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "WordPress chatbot", path: "/wordpress-chatbot" },
        ]}
      />
      <div className="max-w-3xl">
        <h1 className="mt-4 text-4xl font-semibold leading-tight sm:text-5xl">
          Add an AI chatbot to <span className="text-highlight">WordPress</span>
        </h1>
        <p className="mt-6 text-lg leading-8 text-muted-foreground">
          A WordPress chatbot answers visitor questions from your content and captures leads while
          your team is away. Install Tellvira with one snippet, without a dedicated chatbot plugin
          to maintain.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <MarketingAuthCta
            loggedOutLabel="Start free"
            className="rounded-lg btn-primary-gradient px-5 py-3 text-sm font-semibold text-primary-foreground"
          />
          <Link
            href="/pricing"
            className="rounded-lg border border-border px-5 py-3 text-sm font-semibold"
          >
            See pricing
          </Link>
        </div>
      </div>
      <section className="mt-16 max-w-3xl">
        <h2 className="text-3xl font-semibold">A snippet that works with your theme</h2>
        <p className="mt-5 leading-8 text-muted-foreground">
          Tellvira runs as a hosted website widget. There is no dedicated WordPress chatbot plugin
          to update or run on your server. It works independently of your theme when custom scripts
          are allowed. The widget still uses browser resources, so check your pages after
          installation rather than assuming no performance impact.
        </p>
      </section>
      <section className="mt-16">
        <h2 className="text-3xl font-semibold">How to add the chatbot to your WordPress site</h2>
        <ol className="mt-8 grid gap-5 md:grid-cols-2">
          {steps.map((step, index) => (
            <li key={step.title} className="rounded-xl border border-border bg-card p-6 shadow-sm">
              <h3 className="text-lg font-semibold">
                {index + 1}. {step.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">{step.text}</p>
            </li>
          ))}
        </ol>
        <div className="mt-8 max-w-3xl">
          <InstallExample />
        </div>
      </section>
      <p className="mt-8 text-sm leading-7 text-muted-foreground">
        For platform-specific installation details, read our{" "}
        <Link href="/blog/how-to-add-an-ai-chatbot-to-wordpress-or-shopify" className="text-primary">
          WordPress and Shopify installation guide
        </Link>.
      </p>
      <section className="mt-16 max-w-4xl">
        <h2 className="text-3xl font-semibold">Frequently asked questions</h2>
        <div className="mt-8">
          <FaqAccordion items={faq} />
        </div>
      </section>
      <p className="mt-10 text-muted-foreground">
        Need help adding the snippet?{" "}
        <Link href="/contact" className="text-primary">
          Contact Tellvira
        </Link>{" "}
        or{" "}
        <Link href="/pricing" className="text-primary">
          compare the Free, Starter, and Pro plans
        </Link>
        .
      </p>
    </main>
  );
}
