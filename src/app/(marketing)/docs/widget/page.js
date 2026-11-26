import Link from "next/link";
import { ApiCodeBlock } from "@/components/marketing/ApiCodeBlock";
import { Breadcrumbs } from "@/components/marketing/Breadcrumbs";
import { widgetOverviewDoc } from "@/content/widgetDocs";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Widget Installation",
  description:
    "Install the Tellvira chat widget on your website with a single script tag and configure allowed domains.",
  path: "/docs/widget",
});

export default function WidgetOverviewPage() {
  return (
    <article className="space-y-10">
      <div>
        <Breadcrumbs
          items={[
            { name: "Home", path: "/" },
            { name: "Docs", path: "/docs" },
            { name: "Widget", path: "/docs/widget" },
          ]}
        />
        <header className="max-w-3xl">
          <h1 className="text-4xl font-semibold leading-tight tracking-tight text-foreground sm:text-5xl">
            {widgetOverviewDoc.title}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            {widgetOverviewDoc.subtitle}
          </p>
        </header>
      </div>

      <section aria-labelledby="install-snippet" className="space-y-4">
        <h2 id="install-snippet" className="text-2xl font-semibold text-foreground">
          Install snippet
        </h2>
        <p className="text-base leading-7 text-muted-foreground">
          {widgetOverviewDoc.snippetNote}
        </p>
        <ApiCodeBlock label="Install snippet" code={widgetOverviewDoc.snippet} />
        <p className="text-sm text-muted-foreground">
          Replace <code>YOUR_BOT_ID</code> with your bot&apos;s public ID from{" "}
          <Link
            href="/dashboard/bots"
            className="font-medium text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Bots &gt; Install
          </Link>
          .
        </p>
      </section>

      <section aria-labelledby="allowed-domains" className="space-y-4">
        <h2 id="allowed-domains" className="text-2xl font-semibold text-foreground">
          {widgetOverviewDoc.allowedDomains.title}
        </h2>
        <p className="text-base leading-7 text-muted-foreground">
          {widgetOverviewDoc.allowedDomains.summary}
        </p>
        <ul className="list-disc space-y-2 pl-5 text-base leading-7 text-muted-foreground">
          {widgetOverviewDoc.allowedDomains.details.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>
    </article>
  );
}
