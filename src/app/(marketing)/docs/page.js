import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Breadcrumbs } from "@/components/marketing/Breadcrumbs";
import { Card } from "@/components/ui";
import { docsHubGroups } from "@/content/widgetDocs";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Documentation",
  description:
    "Guides for installing the Tellvira chat widget on WordPress, Shopify, React Native, or custom sites, plus the server-to-server Chat API reference.",
  path: "/docs",
});

export default function DocsHubPage() {
  return (
    <div>
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Docs", path: "/docs" },
        ]}
      />
      <header className="max-w-3xl">
        <h1 className="text-4xl font-semibold leading-tight tracking-tight text-foreground sm:text-5xl">
          Documentation
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
          Embed the Tellvira widget on your website or call the Chat API directly from your backend.
        </p>
      </header>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {docsHubGroups.map((group) => (
          <Card key={group.title} title={group.title} subtitle={group.description}>
            <ul className="space-y-2 text-sm">
              {group.links.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="inline-flex items-center gap-1.5 font-medium text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    {item.label}
                    <ArrowRight className="size-3.5" aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>
    </div>
  );
}
