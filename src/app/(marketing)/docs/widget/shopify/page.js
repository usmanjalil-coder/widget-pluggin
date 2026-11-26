import { ApiCodeBlock } from "@/components/marketing/ApiCodeBlock";
import { Breadcrumbs } from "@/components/marketing/Breadcrumbs";
import { shopifyDoc, widgetOverviewDoc } from "@/content/widgetDocs";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Shopify Widget Installation",
  description:
    "Add the Tellvira chat widget to your Shopify store by pasting the snippet into theme.liquid.",
  path: "/docs/widget/shopify",
});

export default function ShopifyDocsPage() {
  return (
    <article className="space-y-10">
      <div>
        <Breadcrumbs
          items={[
            { name: "Home", path: "/" },
            { name: "Docs", path: "/docs" },
            { name: "Widget", path: "/docs/widget" },
            { name: "Shopify", path: "/docs/widget/shopify" },
          ]}
        />
        <header className="max-w-3xl">
          <h1 className="text-4xl font-semibold leading-tight tracking-tight text-foreground sm:text-5xl">
            {shopifyDoc.title}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            {shopifyDoc.subtitle}
          </p>
        </header>
      </div>

      <ApiCodeBlock label="Install snippet" code={widgetOverviewDoc.snippet} />

      <section aria-labelledby="shopify-steps" className="space-y-3">
        <h2 id="shopify-steps" className="text-2xl font-semibold text-foreground">
          Installation steps
        </h2>
        <ol className="list-decimal space-y-2.5 pl-5 text-base leading-7 text-muted-foreground">
          {shopifyDoc.steps.map((step) => (
            <li key={step.lead}>
              <strong className="font-semibold text-foreground">{step.lead}</strong> {step.body}
            </li>
          ))}
        </ol>
      </section>
    </article>
  );
}
