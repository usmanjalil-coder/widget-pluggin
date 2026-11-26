import { ApiCodeBlock } from "@/components/marketing/ApiCodeBlock";
import { Breadcrumbs } from "@/components/marketing/Breadcrumbs";
import { otherSitesDoc, widgetOverviewDoc } from "@/content/widgetDocs";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Install on Other Sites",
  description:
    "Add the Tellvira chat widget to Wix, Squarespace, Webflow, or any custom HTML website.",
  path: "/docs/widget/other-sites",
});

export default function OtherSitesDocsPage() {
  return (
    <article className="space-y-10">
      <div>
        <Breadcrumbs
          items={[
            { name: "Home", path: "/" },
            { name: "Docs", path: "/docs" },
            { name: "Widget", path: "/docs/widget" },
            { name: "Other sites", path: "/docs/widget/other-sites" },
          ]}
        />
        <header className="max-w-3xl">
          <h1 className="text-4xl font-semibold leading-tight tracking-tight text-foreground sm:text-5xl">
            {otherSitesDoc.title}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            {otherSitesDoc.subtitle}
          </p>
        </header>
      </div>

      <ApiCodeBlock label="Install snippet" code={widgetOverviewDoc.snippet} />

      <p className="max-w-3xl text-base leading-7 text-muted-foreground">{otherSitesDoc.body}</p>
    </article>
  );
}
