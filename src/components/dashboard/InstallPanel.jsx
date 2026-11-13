"use client";

import { toast as notify } from "sonner";
import { Copy } from "lucide-react";
import { Button, Card } from "@/components/ui";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
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
  const apiBase = (process.env.NEXT_PUBLIC_API_BASE_URL || "")
    .replace(/\/+$/, "")
    .replace(/\/api\/v1$/, "");
  const escapeSnippetValue = (value) => JSON.stringify(value).slice(1, -1).replace(/'/g, "\\'");
  const mobileScript = `import { KeyboardAvoidingView, Platform, SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

// Replace these values
const BOT_ID = '${safeBotId}';
const WIDGET_SCRIPT_URL = '${escapeSnippetValue(WIDGET_SCRIPT_URL)}';
const API_BASE = '${escapeSnippetValue(apiBase)}';
const SITE_URL = 'https://your-allowed-domain.com'; // must be one of your bot's Allowed domains
const html = \`<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>html, body { margin: 0; height: 100%; }</style>
</head>
<body>
  <p id="widget-status" role="status" style="padding:24px;font:16px system-ui">Loading chat…</p>
  <script
    src="\${WIDGET_SCRIPT_URL}"
    data-bot-id="\${BOT_ID}"
    onload="window.ChatbotWidget.init({
      script: this,
      apiBase: '\${API_BASE}',
      open: true,
      onOpenChange: function (open) {
        if (!open) window.ReactNativeWebView.postMessage('tellvira-close');
      }
    }).then(function (widget) {
      var s = document.getElementById('widget-status');
      if (widget) { s.remove(); } else { s.textContent = 'Chat could not start. Check the Bot ID, Allowed domains, and the API URL.'; }
    }).catch(function () {
      document.getElementById('widget-status').textContent = 'Chat initialization failed.';
    })"
    onerror="document.getElementById('widget-status').textContent = 'Could not load the chat script.';"
  ></script>
</body>
</html>\`;

export default function TellviraChatScreen({ navigation, onClose }) {
  const close = () => (onClose ? onClose() : navigation?.goBack());

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <WebView
          style={styles.flex}
          originWhitelist={['*']}
          source={{ html, baseUrl: SITE_URL }}
          javaScriptEnabled
          domStorageEnabled
          onMessage={({ nativeEvent }) => {
            if (nativeEvent.data === 'tellvira-close') close();
          }}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  flex: {
    flex: 1,
  },
});`;
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
                  <code>{"npx expo install react-native-webview"}</code>
                </pre>
              </li>
              <li><strong>Add the screen.</strong> Paste the component into your screen file and replace the four values.</li>
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
              <li>SITE_URL must be one of the bot&apos;s Allowed domains in the dashboard, otherwise the chat returns 403.</li>
              <li>Using React Navigation? It works as is (closing the chat calls goBack). Otherwise pass an onClose prop.</li>
              <li>Production must use HTTPS. For local HTTP testing only, add <code>mixedContentMode=&apos;always&apos;</code> to the WebView.</li>
            </ul>
          </TabsContent>
        </Tabs>
      </Card>
      <details className="min-w-0 rounded-xl border bg-card p-4">
        <summary className="cursor-pointer rounded-sm font-medium focus-visible:outline-ring">
          Advanced options &amp; JavaScript API
        </summary>
        <div className="mt-4 min-w-0 space-y-6 text-sm">
          <section className="space-y-3" aria-label="Advanced options">
            <h3 className="text-base font-semibold">Advanced options</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Option</TableHead>
                  <TableHead>Value</TableHead>
                  <TableHead>Default</TableHead>
                  <TableHead>Notes</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="[&_td]:whitespace-normal [&_td]:align-top">
                <TableRow>
                  <TableCell><code>botId</code></TableCell>
                  <TableCell>string</TableCell>
                  <TableCell>required</TableCell>
                  <TableCell>Bot ID. Also accepts <code>data-bot-id</code> on the script tag. An ID passed to <code>init()</code> takes priority.</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><code>script</code></TableCell>
                  <TableCell>The <code>{"<script>"}</code> element</TableCell>
                  <TableCell>none</TableCell>
                  <TableCell>Pass <code>script: this</code> in manual <code>init()</code> to apply the data attributes below. Without it, data attributes are ignored.</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><code>apiBase</code></TableCell>
                  <TableCell>API origin, without <code>/api/v1</code></TableCell>
                  <TableCell><code>data-api-base</code>, then build default</TableCell>
                  <TableCell>Only needed when the widget should use a different API origin.</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><code>open</code> (alias <code>defaultOpen</code>)</TableCell>
                  <TableCell>boolean</TableCell>
                  <TableCell><code>false</code></TableCell>
                  <TableCell>Start with the chat panel open.</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><code>onOpenChange(open)</code></TableCell>
                  <TableCell>function</TableCell>
                  <TableCell>none</TableCell>
                  <TableCell>Called when the panel opens or closes. Manual init() only.</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><code>container</code></TableCell>
                  <TableCell>DOM element; selector and ID strings are not supported</TableCell>
                  <TableCell>none (floating widget on the page)</TableCell>
                  <TableCell>Mounts inside this element and removes its existing children. The launcher still appears. The parent needs <code>position: relative</code> and an explicit height. Initializing the same element again does not apply new options.</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </section>
          <p className="text-muted-foreground">
            Callbacks such as onOpenChange work only with manual init(), not with the &lt;script&gt; tag install.
          </p>
          <section className="space-y-3" aria-label="Script tag data attributes">
            <h3 className="text-base font-semibold">Data attributes</h3>
            <p className="text-muted-foreground">These attributes override dashboard settings.</p>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Attribute</TableHead>
                  <TableHead>Value</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="[&_td]:whitespace-normal">
                <TableRow>
                  <TableCell><code>data-primary-color</code></TableCell>
                  <TableCell><code>#RGB</code> or <code>#RRGGBB</code>; invalid values use <code>#0f766e</code>.</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><code>data-position</code></TableCell>
                  <TableCell><code>left</code> or <code>right</code> (default: <code>right</code>).</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><code>data-greeting</code></TableCell>
                  <TableCell>Text, maximum 200 characters.</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><code>data-bot-name</code></TableCell>
                  <TableCell>Text, maximum 40 characters.</TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <pre className="whitespace-pre-wrap break-all rounded-lg bg-muted p-3 text-sm">
              <code>{`<script src="${WIDGET_SCRIPT_URL}" defer data-bot-id="${safeBotId || "YOUR_BOT_ID"}" data-primary-color="#0F766E" data-greeting="Hello!"></script>`}</code>
            </pre>
          </section>
          <section className="space-y-3" aria-label="JavaScript API">
            <h3 className="text-base font-semibold">JavaScript API</h3>
            <p className="text-muted-foreground">
              <code>ChatbotWidget.init(options)</code> returns a Promise that resolves to a widget
              instance, or <code>null</code> if setup fails (it never throws). Always check the result.
            </p>
            <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
              <li><code>open()</code>: Open the chat panel.</li>
              <li><code>close()</code>: Close the chat panel.</li>
              <li><code>resetChat()</code>: Clear the visitor&apos;s local chat history. Nothing is deleted from the backend.</li>
              <li><code>destroy()</code>: Remove the widget, for example on an SPA route change.</li>
            </ul>
            <pre className="whitespace-pre-wrap break-all rounded-lg bg-muted p-3 text-sm">
              <code>{`const widget = await window.ChatbotWidget.init({ script: document.currentScript, botId: 'YOUR_BOT_ID' });
if (widget) widget.open();`}</code>
            </pre>
          </section>
        </div>
      </details>
    </div>
  );
}
