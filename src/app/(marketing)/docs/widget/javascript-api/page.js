import { ApiCodeBlock } from "@/components/marketing/ApiCodeBlock";
import { Breadcrumbs } from "@/components/marketing/Breadcrumbs";
import { javascriptApiDoc } from "@/content/widgetDocs";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Widget JavaScript API & Options",
  description:
    "Configure Tellvira widget data attributes, manual ChatbotWidget.init() options, and instance methods.",
  path: "/docs/widget/javascript-api",
});

export default function JavascriptApiDocsPage() {
  return (
    <article className="space-y-10">
      <div>
        <Breadcrumbs
          items={[
            { name: "Home", path: "/" },
            { name: "Docs", path: "/docs" },
            { name: "Widget", path: "/docs/widget" },
            { name: "JavaScript API", path: "/docs/widget/javascript-api" },
          ]}
        />
        <header className="max-w-3xl">
          <h1 className="text-4xl font-semibold leading-tight tracking-tight text-foreground sm:text-5xl">
            {javascriptApiDoc.title}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            {javascriptApiDoc.subtitle}
          </p>
        </header>
      </div>

      <section aria-labelledby="advanced-options" className="space-y-4">
        <h2 id="advanced-options" className="text-2xl font-semibold text-foreground">
          Advanced options
        </h2>
        <div className="overflow-x-auto rounded-xl border border-border bg-card">
          <table className="w-full min-w-[560px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th scope="col" className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Option</th>
                <th scope="col" className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Value</th>
                <th scope="col" className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Default</th>
                <th scope="col" className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {javascriptApiDoc.options.map((opt) => (
                <tr key={opt.name} className="align-top transition-colors hover:bg-muted/30">
                  <td className="px-4 py-3 font-medium text-foreground">
                    <code>{opt.name}</code>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{opt.value}</td>
                  <td className="px-4 py-3 text-muted-foreground">
                    <code>{opt.defaultValue}</code>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{opt.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-sm text-muted-foreground">{javascriptApiDoc.callbacksNote}</p>
      </section>

      <section aria-labelledby="data-attributes" className="space-y-4">
        <h2 id="data-attributes" className="text-2xl font-semibold text-foreground">
          Data attributes
        </h2>
        <p className="text-base leading-7 text-muted-foreground">
          {javascriptApiDoc.dataAttributesIntro}
        </p>
        <div className="overflow-x-auto rounded-xl border border-border bg-card">
          <table className="w-full min-w-[460px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th scope="col" className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Attribute</th>
                <th scope="col" className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Value</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {javascriptApiDoc.dataAttributes.map((attr) => (
                <tr key={attr.name} className="align-top transition-colors hover:bg-muted/30">
                  <td className="px-4 py-3 font-medium text-foreground">
                    <code>{attr.name}</code>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{attr.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <ApiCodeBlock
          label="Data attributes snippet"
          code={javascriptApiDoc.dataAttributesExample}
        />
      </section>

      <section aria-labelledby="javascript-api" className="space-y-4">
        <h2 id="javascript-api" className="text-2xl font-semibold text-foreground">
          JavaScript API
        </h2>
        <p className="text-base leading-7 text-muted-foreground">
          {javascriptApiDoc.methodsIntro}
        </p>
        <ul className="list-disc space-y-2 pl-5 text-base leading-7 text-muted-foreground">
          {javascriptApiDoc.methods.map((method) => (
            <li key={method.name}>
              <code className="font-medium text-foreground">{method.name}</code>: {method.description}
            </li>
          ))}
        </ul>
        <ApiCodeBlock label="JavaScript API example" code={javascriptApiDoc.methodsExample} />
      </section>
    </article>
  );
}
