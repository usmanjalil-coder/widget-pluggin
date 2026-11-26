import Link from "next/link";
import { ApiCodeBlock } from "@/components/marketing/ApiCodeBlock";
import { Breadcrumbs } from "@/components/marketing/Breadcrumbs";
import { widgetOverviewDoc, wordpressDoc } from "@/content/widgetDocs";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "WordPress Widget Installation",
  description:
    "Add the Tellvira chat widget to WordPress using WPCode or your classic theme footer.php file.",
  path: "/docs/widget/wordpress",
});

export default function WordPressDocsPage() {
  return (
    <article className="space-y-10">
      <div>
        <Breadcrumbs
          items={[
            { name: "Home", path: "/" },
            { name: "Docs", path: "/docs" },
            { name: "Widget", path: "/docs/widget" },
            { name: "WordPress", path: "/docs/widget/wordpress" },
          ]}
        />
        <header className="max-w-3xl">
          <h1 className="text-4xl font-semibold leading-tight tracking-tight text-foreground sm:text-5xl">
            {wordpressDoc.title}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            {wordpressDoc.subtitle}
          </p>
        </header>
      </div>

      <ApiCodeBlock label="Install snippet" code={widgetOverviewDoc.snippet} />

      <section aria-labelledby="method-a" className="space-y-3">
        <h2 id="method-a" className="text-2xl font-semibold text-foreground">
          {wordpressDoc.methodA.title}
        </h2>
        <p className="text-sm text-muted-foreground">{wordpressDoc.methodA.note}</p>
        <ol className="list-decimal space-y-2.5 pl-5 text-base leading-7 text-muted-foreground">
          {wordpressDoc.methodA.steps.map((step) => (
            <li key={step.lead}>
              <strong className="font-semibold text-foreground">{step.lead}</strong> {step.body}
            </li>
          ))}
        </ol>
        <p className="text-sm text-muted-foreground">{wordpressDoc.methodA.footer}</p>
      </section>

      <section aria-labelledby="method-b" className="space-y-3">
        <h2 id="method-b" className="text-2xl font-semibold text-foreground">
          {wordpressDoc.methodB.title}
        </h2>
        <ol className="list-decimal space-y-2.5 pl-5 text-base leading-7 text-muted-foreground">
          {wordpressDoc.methodB.steps.map((step) => (
            <li key={step.lead}>
              <strong className="font-semibold text-foreground">{step.lead}</strong> {step.body}
            </li>
          ))}
        </ol>
        <aside
          aria-label="Theme editing warning"
          className="rounded-xl border border-warning/25 bg-warning-bg p-4 text-sm text-warning-foreground"
        >
          {wordpressDoc.methodB.warning}
        </aside>
      </section>

      <section aria-labelledby="after-installing" className="space-y-3">
        <h2 id="after-installing" className="text-2xl font-semibold text-foreground">
          After installing
        </h2>
        <ul className="list-disc space-y-2.5 pl-5 text-base leading-7 text-muted-foreground">
          {wordpressDoc.afterInstalling.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p className="text-sm text-muted-foreground">
          Still stuck?{" "}
          <Link
            href="/contact"
            className="font-medium text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Contact support
          </Link>
        </p>
      </section>
    </article>
  );
}
