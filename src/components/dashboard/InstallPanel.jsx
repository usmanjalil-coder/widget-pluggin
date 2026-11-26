"use client";

import Link from "next/link";
import { toast as notify } from "sonner";
import { ArrowRight, Copy } from "lucide-react";
import { Button, Card } from "@/components/ui";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { domainHelp } from "./domain-help";
import { buildCurlExample } from "@/content/apiDocs";
import { dashboardInstallGuides } from "@/content/widgetDocs";
import { getWidgetSnippet } from "@/lib/widget-script-url";
import { useQuery } from "@tanstack/react-query";
import { getBot } from "@/lib/api/bots.api";
import { botQueryKey } from "@/lib/query-client";

export default function InstallPanel({ selectedBotId }) {
  const { data: bot } = useQuery({
    queryKey: botQueryKey(selectedBotId),
    queryFn: () => getBot(selectedBotId),
    enabled: Boolean(selectedBotId),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
  const safeBotId = (bot?.public_id || selectedBotId).replace(/[^a-zA-Z0-9_-]/g, "");
  const apiBase = (process.env.NEXT_PUBLIC_API_BASE_URL || "")
    .replace(/\/+$/, "")
    .replace(/\/api\/v1$/, "");
  const script = safeBotId
    ? getWidgetSnippet(safeBotId)
    : "Loading install snippet…";
  const exampleBase = apiBase || "https://<api-host>";
  const exampleBotId = safeBotId || "<YOUR_BOT_ID>";
  const curlExample = buildCurlExample({
    baseUrl: exampleBase,
    botId: exampleBotId,
    includeConversationId: false,
  });

  return (
    <div className="min-w-0 space-y-6">
      <Card title="Install" className="min-w-0">
        <Tabs defaultValue="widget" className="min-w-0">
          <TabsList
            aria-label="Install method"
            className="mb-4 w-full flex-wrap justify-start gap-1 group-data-[orientation=horizontal]/tabs:h-auto sm:w-fit"
          >
            <TabsTrigger value="widget" className="h-auto flex-none px-3 py-2 text-foreground">
              Widget snippet
            </TabsTrigger>
            <TabsTrigger value="api" className="h-auto flex-none px-3 py-2 text-foreground">
              API
            </TabsTrigger>
          </TabsList>
          <TabsContent value="widget" className="mt-0 space-y-3">
            <p className="text-sm text-muted-foreground">
              Paste this snippet before the closing body tag. The defer attribute keeps the script from
              slowing down your page.
            </p>
            <p className="text-sm text-muted-foreground">{domainHelp}</p>
            <div className="relative min-w-0">
              <pre className="whitespace-pre-wrap break-all rounded-xl bg-foreground p-4 pr-24 text-sm text-background">
                <code>{script}</code>
              </pre>
              <Button
                type="button"
                variant="secondary"
                size="sm"
                className="absolute top-2 right-2 bg-card text-card-foreground dark:bg-card dark:hover:bg-accent"
                onClick={async () => {
                  try {
                    await navigator.clipboard.writeText(script);
                    notify("Snippet copied.");
                  } catch {
                    notify("Copy failed. Select the snippet instead.");
                  }
                }}
              >
                <Copy className="size-3.5" /> Copy
              </Button>
            </div>
          </TabsContent>
          <TabsContent value="api" className="mt-0 space-y-4">
            <p className="text-sm text-muted-foreground">
              Server-side only — never put your API key in browser or client-side code.
            </p>
            <div className="relative min-w-0">
              <pre className="overflow-x-auto whitespace-pre-wrap break-all rounded-xl bg-foreground p-4 pr-24 text-sm text-background">
                <code>{curlExample}</code>
              </pre>
              <Button
                type="button"
                variant="secondary"
                size="sm"
                className="absolute top-2 right-2 bg-card text-card-foreground dark:bg-card dark:hover:bg-accent"
                onClick={async () => {
                  try {
                    await navigator.clipboard.writeText(curlExample);
                    notify("cURL example copied.");
                  } catch {
                    notify("Copy failed. Select the example instead.");
                  }
                }}
              >
                <Copy className="size-3.5" /> Copy
              </Button>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <Link
                href="/docs/api"
                className="font-medium text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                Full API reference
              </Link>
              <Link
                href="/dashboard/account#api-keys"
                className="font-medium text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                Manage API keys
              </Link>
            </div>
          </TabsContent>
        </Tabs>
      </Card>

      <Card
        title="Guides"
        subtitle="Step-by-step setup instructions and developer references."
        className="min-w-0"
      >
        <div className="divide-y divide-border rounded-xl border border-border">
          {dashboardInstallGuides.map((guide) => (
            <Link
              key={guide.href}
              href={guide.href}
              className="flex items-center justify-between gap-4 px-4 py-3 text-sm transition-colors hover:bg-muted/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <div className="min-w-0">
                <p className="font-medium text-foreground">{guide.label}</p>
                <p className="text-xs text-muted-foreground">{guide.description}</p>
              </div>
              <ArrowRight className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
            </Link>
          ))}
        </div>
      </Card>
    </div>
  );
}
