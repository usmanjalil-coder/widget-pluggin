import Link from "next/link";
import { ApiCodeBlock } from "@/components/marketing/ApiCodeBlock";
import { Breadcrumbs } from "@/components/marketing/Breadcrumbs";
import { reactNativeDoc } from "@/content/widgetDocs";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "React Native Widget Installation",
  description:
    "Embed the Tellvira chat widget inside a React Native WebView or use the Chat API for a fully native UI.",
  path: "/docs/widget/react-native",
});

export default function ReactNativeDocsPage() {
  return (
    <article className="space-y-10">
      <div>
        <Breadcrumbs
          items={[
            { name: "Home", path: "/" },
            { name: "Docs", path: "/docs" },
            { name: "Widget", path: "/docs/widget" },
            { name: "React Native", path: "/docs/widget/react-native" },
          ]}
        />
        <header className="max-w-3xl">
          <h1 className="text-4xl font-semibold leading-tight tracking-tight text-foreground sm:text-5xl">
            {reactNativeDoc.title}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            {reactNativeDoc.subtitle}
          </p>
        </header>
      </div>

      <section aria-labelledby="rn-steps" className="space-y-4">
        <h2 id="rn-steps" className="text-2xl font-semibold text-foreground">
          WebView setup
        </h2>
        <ol className="list-decimal space-y-4 pl-5 text-base leading-7 text-muted-foreground">
          <li>
            <strong className="font-semibold text-foreground">Install.</strong>
            <div className="mt-2">
              <ApiCodeBlock label="Install command" code={reactNativeDoc.installCommand} />
            </div>
          </li>
          <li>
            <strong className="font-semibold text-foreground">Add the screen.</strong> Paste the
            component into your screen file and replace the four placeholder values (
            <code>YOUR_BOT_ID</code>, <code>YOUR_WIDGET_URL</code>, <code>YOUR_API_HOST</code>,
            and <code>YOUR_ALLOWED_SITE_URL</code>).
          </li>
        </ol>
        <ApiCodeBlock label="React Native component" code={reactNativeDoc.code} />
      </section>

      <section aria-labelledby="rn-notes" className="space-y-3">
        <h2 id="rn-notes" className="text-2xl font-semibold text-foreground">
          Notes
        </h2>
        <ul className="list-disc space-y-2.5 pl-5 text-base leading-7 text-muted-foreground">
          {reactNativeDoc.notes.map((note) => (
            <li key={note}>{note}</li>
          ))}
        </ul>
        <p className="text-base leading-7 text-muted-foreground">
          For a fully native UI instead of a WebView, use the{" "}
          <Link
            href="/docs/api"
            className="font-medium text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Chat API
          </Link>
          .
        </p>
      </section>
    </article>
  );
}
