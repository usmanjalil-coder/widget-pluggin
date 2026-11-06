"use client";

import { toast as notify } from "sonner";
import { Copy } from "lucide-react";
import { Button, Card } from "@/components/ui";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getWidgetSnippet } from "@/lib/widget-script-url";

export default function InstallPanel({ selectedBotId }) {
  const safeBotId = selectedBotId.replace(/[^a-zA-Z0-9_-]/g, "");
  const script = safeBotId
    ? getWidgetSnippet(safeBotId)
    : "Loading install snippet…";

  return (
    <div className="min-w-0 space-y-6">
      <Card title="Install script">
        <p className="mb-3 text-sm text-muted-foreground">
          Paste this snippet before the closing body tag. The defer attribute keeps the script from
          slowing down your page.
        </p>
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
      </Card>
      <Card title="Install on your platform" className="min-w-0">
        <Tabs defaultValue="wordpress" className="min-w-0">
          <TabsList aria-label="Installation platform" className="w-full sm:w-fit">
            <TabsTrigger value="wordpress" className="min-w-0 text-foreground">
              WordPress
            </TabsTrigger>
            <TabsTrigger value="shopify" className="min-w-0 text-foreground">
              Shopify
            </TabsTrigger>
            <TabsTrigger value="other" className="min-w-0 text-foreground">
              Other sites
            </TabsTrigger>
          </TabsList>
          <TabsContent value="wordpress" className="mt-4 space-y-6 text-sm">
            <div className="space-y-2">
              <h3 className="text-base font-semibold">Add Tellvira to WordPress</h3>
              <p>
                Paste the snippet once in your site&apos;s footer so the chat loads on every page.
              </p>
            </div>
            <section className="space-y-3" aria-label="WordPress method A">
              <h4 className="font-semibold">Method A (recommended): Use a footer-scripts plugin</h4>
              <p className="text-muted-foreground">No code editing needed.</p>
              <ol className="list-decimal space-y-2 pl-5">
                <li>
                  <strong>Install.</strong> In WordPress admin go to Plugins, Add New, search
                  &quot;WPCode&quot;, then Install and Activate.
                </li>
                <li>
                  <strong>Open.</strong> Open the plugin&apos;s Header &amp; Footer settings (menu
                  names can differ slightly between versions).
                </li>
                <li>
                  <strong>Paste.</strong> Paste your snippet from above into the Footer box.
                </li>
                <li>
                  <strong>Save.</strong> Click Save.
                </li>
              </ol>
              <p className="text-muted-foreground">
                Any other footer-scripts plugin works the same way: paste into its Footer scripts
                field.
              </p>
            </section>
            <section className="space-y-3" aria-label="WordPress method B">
              <h4 className="font-semibold">Method B (classic themes): Edit the theme footer</h4>
              <ol className="list-decimal space-y-2 pl-5">
                <li>
                  <strong>Open.</strong> Go to Appearance, Theme File Editor and open{" "}
                  <code>footer.php</code>.
                </li>
                <li>
                  <strong>Paste.</strong> Paste the snippet on a new line just before{" "}
                  <code>{"</body>"}</code>.
                </li>
                <li>
                  <strong>Save.</strong> Click Update File.
                </li>
              </ol>
              <aside
                aria-label="Theme editing warning"
                className="rounded-xl border border-warning/25 bg-warning-bg p-4 text-warning-foreground"
              >
                Theme updates can overwrite this. Use a child theme, or prefer Method A. Block
                themes have no <code>footer.php</code>, so use Method A.
              </aside>
            </section>
            <section className="space-y-3" aria-label="After installing">
              <h4 className="font-semibold">After installing</h4>
              <ul className="list-disc space-y-2 pl-5">
                <li>Open your site in a private window and look for the chat bubble.</li>
                <li>
                  If you use a caching or optimization plugin (or Cloudflare), clear the cache once.
                  If the bubble still does not appear, exclude our script from combine, minify or
                  delay JavaScript options.
                </li>
                <li>
                  Do not paste the snippet into a page or post editor. Use the footer so it loads
                  site-wide.
                </li>
                <li>
                  Add your website&apos;s domain (with and without www) to your bot&apos;s{" "}
                  <strong>Allowed domains</strong>, otherwise the chat will not load.
                </li>
              </ul>
              <p>
                Still stuck?{" "}
                <a
                  href="/contact"
                  className="rounded-sm underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                >
                  Contact support
                </a>
              </p>
            </section>
            <p className="text-muted-foreground">A Tellvira WordPress plugin is on our roadmap.</p>
          </TabsContent>
          <TabsContent value="shopify" className="mt-4 space-y-3 text-sm">
            <h3 className="text-base font-semibold">Add Tellvira to Shopify</h3>
            <ol className="list-decimal space-y-2 pl-5">
              <li>
                <strong>Open.</strong> In Shopify admin go to Online Store, Themes.
              </li>
              <li>
                <strong>Edit.</strong> Open your active theme&apos;s three dots menu and choose Edit
                code.
              </li>
              <li>
                <strong>Find.</strong> Open <code>theme.liquid</code>.
              </li>
              <li>
                <strong>Paste.</strong> Paste the snippet from above just before{" "}
                <code>{"</body>"}</code>.
              </li>
              <li>
                <strong>Save.</strong> Click Save.
              </li>
            </ol>
          </TabsContent>
          <TabsContent value="other" className="mt-4 space-y-3 text-sm">
            <h3 className="text-base font-semibold">Add Tellvira to other sites</h3>
            <p>
              Paste the snippet into your site&apos;s custom code or footer code area (site-wide,
              end of body), or just before <code>{"</body>"}</code> in your HTML, then publish.
              Works with Wix, Squarespace, Webflow and custom sites.
            </p>
          </TabsContent>
        </Tabs>
      </Card>
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
