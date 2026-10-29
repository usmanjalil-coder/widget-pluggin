"use client";

import { toast as notify } from "sonner";
import { Copy } from "lucide-react";
import { Button, Card } from "@/components/ui";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getWidgetScriptUrl } from "@/lib/widget-script-url";

export default function InstallPanel({ selectedBotId }) {
  const safeBotId = selectedBotId.replace(/[^a-zA-Z0-9_-]/g, "");
  const script =
    safeBotId
      ? `<script src="${getWidgetScriptUrl()}" data-bot-id="${safeBotId}" data-api-base="${process.env.NEXT_PUBLIC_API_BASE_URL || ""}"></script>`
      : "Loading install snippet…";

  return (
    <div className="space-y-6">
      <Tabs defaultValue="script">
        <TabsList>
          <TabsTrigger value="script">Script tag</TabsTrigger>
          <TabsTrigger value="wordpress">WordPress</TabsTrigger>
        </TabsList>
        <TabsContent value="script" className="mt-4">
          <Card title="Install script">
            <p className="mb-3 text-sm text-muted-foreground">
              Paste this snippet before the closing body tag.
            </p>
            <div className="relative">
              <pre className="overflow-x-auto rounded-xl bg-foreground p-4 pr-24 text-sm text-background">
                <code>{script}</code>
              </pre>
              <Button
                type="button"
                variant="secondary"
                size="sm"
                className="absolute top-2 right-2"
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
          </Card>
        </TabsContent>
        <TabsContent value="wordpress" className="mt-4">
          <Card title="WordPress plugin">
            <p className="text-sm text-muted-foreground">
              The plugin is planned. For now, add the script tag to your site footer or a custom
              HTML block.
            </p>
          </Card>
        </TabsContent>
      </Tabs>
      <Card title="Advanced override">
        <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
          <li>data-primary-color</li>
          <li>data-greeting</li>
          <li>data-position</li>
          <li>data-bot-name</li>
        </ul>
        <p className="mt-3 text-sm text-muted-foreground">
          Precedence is script attributes over saved dashboard config, then defaults.
        </p>
      </Card>
    </div>
  );
}
