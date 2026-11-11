"use client";

import { toast as notify } from "sonner";
import { Copy } from "lucide-react";
import { Button, Card } from "@/components/ui";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { domainHelp } from "./domain-help";
import { WIDGET_SCRIPT_URL, getWidgetSnippet } from "@/lib/widget-script-url";
import { useQuery } from "@tanstack/react-query";
import { getBot } from "@/lib/api/bots.api";
import { botQueryKey } from "@/lib/query-client";

export default function InstallPanel({ selectedBotId }) {
  const { data: bot, isPending, isError } = useQuery({
    queryKey: botQueryKey(selectedBotId),
    queryFn: () => getBot(selectedBotId),
    enabled: Boolean(selectedBotId),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
  const safeBotId = (bot?.public_id || selectedBotId).replace(/[^a-zA-Z0-9_-]/g, "");
  const domain = bot?.settings?.allowedDomains?.[0]?.trim();
  const siteUrl = domain
    ? `https://${domain.replace(/^https?:\/\//i, "").replace(/\/+$/, "")}`
    : "https://your-allowed-domain.com";
  const mobileScript = `import React from "react";
import { KeyboardAvoidingView, Platform } from "react-native";
import { WebView } from "react-native-webview";

const SITE_URL = ${JSON.stringify(siteUrl)};
const html = \`<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>html, body { margin: 0; height: 100%; }</style>
</head>
<body>
  <p id="widget-status" role="status" style="padding:24px;font:16px system-ui">
    Loading chat…
  </p>
  <script src="https://tellvira.com/widget.js"
    data-bot-id="${safeBotId}"
    onload="window.ChatbotWidget.init({
      script: this,
      open: true,
      onOpenChange: function (open) {
        if (!open) window.ReactNativeWebView.postMessage('tellvira-close');
      }
    }).then(function (widget) {
      var status = document.getElementById('widget-status');
      if (widget) {
        status.remove();
      } else {
        status.textContent = 'Chat could not start. Check the Bot ID, Allowed domains, and the API URL used to build widget.js.';
      }
    }).catch(function () {
      document.getElementById('widget-status').textContent = 'Chat initialization failed. Check the WebView console and network requests.';
    })"
    onerror="document.getElementById('widget-status').textContent = 'Could not load. Check the script URL and network connection.';"></script>
</body>
</html>\`;

export default function ChatScreen({ navigation }) {
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <WebView
        originWhitelist={['*']}
        source={{ html, baseUrl: SITE_URL }}
        javaScriptEnabled
        domStorageEnabled
        style={{ flex: 1 }}
        onMessage={(event) => {
          if (event.nativeEvent.data === "tellvira-close") navigation.goBack();
        }}
      />
    </KeyboardAvoidingView>
  );
}`;
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
        <p className="mb-3 text-sm text-muted-foreground">{domainHelp}</p>
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
          <TabsList aria-label="Installation platform" className="w-full flex-wrap justify-start gap-1 group-data-[orientation=horizontal]/tabs:h-auto sm:w-fit">
            <TabsTrigger value="wordpress" className="h-auto flex-none px-3 py-2 text-foreground">
              WordPress
            </TabsTrigger>
            <TabsTrigger value="shopify" className="h-auto flex-none px-3 py-2 text-foreground">
              Shopify
            </TabsTrigger>
            <TabsTrigger value="other" className="h-auto flex-none px-3 py-2 text-foreground">
              Other sites
            </TabsTrigger>
            <TabsTrigger value="mobile" className="h-auto flex-none px-3 py-2 text-foreground">
              Mobile app (React Native)
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
          <TabsContent value="mobile" className="mt-4 space-y-4 text-sm">
            <h3 className="text-base font-semibold">Add Tellvira to React Native</h3>
            <p>
              In a native app, the widget runs inside a WebView. Use the same Bot ID as your website snippet.
            </p>
            <ol className="list-decimal space-y-3 pl-5">
              <li>
                <strong>Install.</strong>
                <pre className="mt-2 whitespace-pre-wrap break-all rounded-xl bg-foreground p-4 text-background">
                  <code>{"npm install react-native-webview\n\n# Expo\nnpx expo install react-native-webview"}</code>
                </pre>
              </li>
              <li><strong>Add the screen.</strong> Use this component as a React Navigation screen.</li>
            </ol>
            {isPending || isError ? (
              <p role="status" className="text-muted-foreground">
                {isError ? "Bot settings could not be loaded. Reopen this tab to try again." : "Loading mobile snippet…"}
              </p>
            ) : (
              <div className="relative min-w-0">
                <pre className="whitespace-pre-wrap break-all rounded-xl bg-foreground p-4 pr-24 text-sm text-background">
                  <code>{mobileScript}</code>
                </pre>
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  className="absolute top-2 right-2 bg-card text-card-foreground dark:bg-card dark:hover:bg-accent"
                  onClick={async () => {
                    try {
                      await navigator.clipboard.writeText(mobileScript);
                      notify("Snippet copied.");
                    } catch {
                      notify("Copy failed. Select the snippet instead.");
                    }
                  }}
                >
                  <Copy className="size-3.5" /> Copy
                </Button>
              </div>
            )}
            <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
              <li>Add the SITE_URL domain to your bot&apos;s Allowed domains, or the widget will return a 403 error.</li>
              <li>If you do not use React Navigation, replace navigation.goBack() with your app&apos;s own close or back action.</li>
              <li>Wrap the screen in KeyboardAvoidingView, especially on iOS (included in the example).</li>
              <li>Chat history remains in WebView storage after an app restart unless storage is cleared. A new chat starts after the inactivity limit.</li>
              <li>Direct API calls without a WebView are not currently supported.</li>
              <li>The chat opens automatically. In this example, tapping X returns to the previous screen. Keep your app&apos;s own header or back button available too.</li>
              <li>The chat fills the screen at viewport widths of 479px or less.</li>
              <li>Test on real iOS and Android devices: chat replies, the lead form, the close button, and chat history after restarting the app.</li>
            </ul>
          </TabsContent>
        </Tabs>
      </Card>
      <details className="rounded-xl border bg-card p-4">
        <summary className="cursor-pointer rounded-sm font-medium focus-visible:outline-ring">Advanced override</summary>
        <pre className="my-3 whitespace-pre-wrap break-all rounded-lg bg-muted p-3 text-sm">
          <code>{`<script src="${WIDGET_SCRIPT_URL}" defer data-bot-id="${safeBotId || "YOUR_BOT_ID"}" data-primary-color="#0F766E" data-greeting="Hello!"></script>`}</code>
        </pre>
        <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
          <li>data-primary-color</li>
          <li>data-greeting</li>
          <li>data-position</li>
          <li>data-bot-name</li>
        </ul>
        <p className="mt-3 text-sm text-muted-foreground">
          Precedence is script attributes over saved dashboard config, then defaults.
        </p>
      </details>
    </div>
  );
}
