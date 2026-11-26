import { domainHelp } from "@/components/dashboard/domain-help";
import { getWidgetSnippet } from "@/lib/widget-script-url";

export const docsSidebarGroups = [
  {
    title: "Widget",
    items: [
      { href: "/docs/widget", label: "Overview" },
      { href: "/docs/widget/wordpress", label: "WordPress" },
      { href: "/docs/widget/shopify", label: "Shopify" },
      { href: "/docs/widget/other-sites", label: "Other sites" },
      { href: "/docs/widget/react-native", label: "React Native" },
      { href: "/docs/widget/javascript-api", label: "JavaScript API" },
    ],
  },
  {
    title: "Chat API",
    items: [{ href: "/docs/api", label: "API reference" }],
  },
];

export const dashboardInstallGuides = [
  {
    href: "/docs/widget/wordpress",
    label: "WordPress",
    description: "Add the snippet with WPCode or your theme footer.",
  },
  {
    href: "/docs/widget/shopify",
    label: "Shopify",
    description: "Paste the snippet into theme.liquid before </body>.",
  },
  {
    href: "/docs/widget/other-sites",
    label: "Other sites",
    description: "Wix, Squarespace, Webflow, and custom HTML sites.",
  },
  {
    href: "/docs/widget/react-native",
    label: "React Native",
    description: "Embed the widget inside a WebView screen.",
  },
  {
    href: "/docs/widget/javascript-api",
    label: "JavaScript API",
    description: "Manual init() options, data attributes, and widget methods.",
  },
  {
    href: "/docs/api",
    label: "Chat API reference",
    description: "Server-to-server SSE streaming endpoint, auth, and examples.",
  },
];

export const docsHubGroups = [
  {
    title: "Widget",
    description: "Embed the chat bubble on your website or mobile app and control it with JavaScript.",
    href: "/docs/widget",
    links: docsSidebarGroups[0].items,
  },
  {
    title: "Chat API",
    description: "Stream replies directly from your backend server using Server-Sent Events.",
    href: "/docs/api",
    links: docsSidebarGroups[1].items,
  },
];

export const widgetOverviewDoc = {
  title: "Widget installation",
  subtitle:
    "Paste one script tag before the closing body tag to add the Tellvira chat widget to your site.",
  snippetNote:
    "Paste this snippet before the closing body tag. The defer attribute keeps the script from slowing down your page.",
  snippet: getWidgetSnippet("YOUR_BOT_ID"),
  allowedDomains: {
    title: "Allowed domains",
    summary: domainHelp,
    details: [
      "The widget checks the browser Origin header against your bot's Allowed domains list on every config, chat, and lead request.",
      "List each exact hostname (for example example.com and www.example.com). Requests from unlisted origins return HTTP 403.",
    ],
  },
};

export const wordpressDoc = {
  title: "Add Tellvira to WordPress",
  subtitle: "Paste the snippet once in your site's footer so the chat loads on every page.",
  methodA: {
    title: "Method A (recommended): Use a footer-scripts plugin",
    note: "No code editing needed.",
    steps: [
      {
        lead: "Install.",
        body: 'In WordPress admin go to Plugins, Add New, search "WPCode", then Install and Activate.',
      },
      {
        lead: "Open.",
        body: "Open the plugin's Header & Footer settings (menu names can differ slightly between versions).",
      },
      {
        lead: "Paste.",
        body: "Paste your snippet from above into the Footer box.",
      },
      {
        lead: "Save.",
        body: "Click Save.",
      },
    ],
    footer:
      "Any other footer-scripts plugin works the same way: paste into its Footer scripts field.",
  },
  methodB: {
    title: "Method B (classic themes): Edit the theme footer",
    steps: [
      { lead: "Open.", body: "Go to Appearance, Theme File Editor and open footer.php." },
      { lead: "Paste.", body: "Paste the snippet on a new line just before </body>." },
      { lead: "Save.", body: "Click Update File." },
    ],
    warning:
      "Theme updates can overwrite this. Use a child theme, or prefer Method A. Block themes have no footer.php, so use Method A.",
  },
  afterInstalling: [
    "Open your site in a private window and look for the chat bubble.",
    "If you use a caching or optimization plugin (or Cloudflare), clear the cache once. If the bubble still does not appear, exclude our script from combine, minify or delay JavaScript options.",
    "Do not paste the snippet into a page or post editor. Use the footer so it loads site-wide.",
  ],
};

export const shopifyDoc = {
  title: "Add Tellvira to Shopify",
  subtitle: "Add the widget snippet to your active Shopify theme.",
  steps: [
    { lead: "Open.", body: "In Shopify admin go to Online Store, Themes." },
    {
      lead: "Edit.",
      body: "Open your active theme's three dots menu and choose Edit code.",
    },
    { lead: "Find.", body: "Open theme.liquid." },
    { lead: "Paste.", body: "Paste the snippet from above just before </body>." },
    { lead: "Save.", body: "Click Save." },
  ],
};

export const otherSitesDoc = {
  title: "Add Tellvira to other sites",
  subtitle: "Works with Wix, Squarespace, Webflow and custom sites.",
  body: "Paste the snippet into your site's custom code or footer code area (site-wide, end of body), or just before </body> in your HTML, then publish. Works with Wix, Squarespace, Webflow and custom sites.",
};

export const reactNativeDoc = {
  title: "Add Tellvira to React Native",
  subtitle:
    "In a native app, the widget runs inside a WebView. Use the same Bot ID as your website snippet.",
  installCommand: "npx expo install react-native-webview",
  code: `import { KeyboardAvoidingView, Platform, SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

// Replace these values
const BOT_ID = 'YOUR_BOT_ID';
const WIDGET_SCRIPT_URL = 'YOUR_WIDGET_URL';
const API_BASE = 'YOUR_API_HOST';
const SITE_URL = 'YOUR_ALLOWED_SITE_URL'; // must be one of your bot's Allowed domains
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
});`,
  notes: [
    "SITE_URL must be one of the bot's Allowed domains in the dashboard, otherwise the chat returns 403.",
    "Using React Navigation? It works as is (closing the chat calls goBack). Otherwise pass an onClose prop.",
    "Production must use HTTPS. For local HTTP testing only, add mixedContentMode='always' to the WebView.",
  ],
};

export const javascriptApiDoc = {
  title: "Advanced options & JavaScript API",
  subtitle: "Customize script tag attributes or control the widget programmatically with init().",
  options: [
    {
      name: "botId",
      value: "string",
      defaultValue: "required",
      notes: "Bot ID. Also accepts data-bot-id on the script tag. An ID passed to init() takes priority.",
    },
    {
      name: "script",
      value: "The <script> element",
      defaultValue: "none",
      notes: "Pass script: this in manual init() to apply the data attributes below. Without it, data attributes are ignored.",
    },
    {
      name: "apiBase",
      value: "API origin, without /api/v1",
      defaultValue: "data-api-base, then build default",
      notes: "Only needed when the widget should use a different API origin.",
    },
    {
      name: "open (alias defaultOpen)",
      value: "boolean",
      defaultValue: "false",
      notes: "Start with the chat panel open.",
    },
    {
      name: "onOpenChange(open)",
      value: "function",
      defaultValue: "none",
      notes: "Called when the panel opens or closes. Manual init() only.",
    },
    {
      name: "container",
      value: "DOM element; selector and ID strings are not supported",
      defaultValue: "none (floating widget on the page)",
      notes: "Mounts inside this element and removes its existing children. The launcher still appears. The parent needs position: relative and an explicit height. Initializing the same element again does not apply new options.",
    },
  ],
  callbacksNote:
    "Callbacks such as onOpenChange work only with manual init(), not with the <script> tag install.",
  dataAttributesIntro: "These attributes override dashboard settings.",
  dataAttributes: [
    {
      name: "data-primary-color",
      value: "#RGB or #RRGGBB; invalid values use #0f766e.",
    },
    {
      name: "data-position",
      value: "left or right (default: right).",
    },
    {
      name: "data-greeting",
      value: "Text, maximum 200 characters.",
    },
    {
      name: "data-bot-name",
      value: "Text, maximum 40 characters.",
    },
  ],
  dataAttributesExample: `<script src="YOUR_WIDGET_URL" defer data-bot-id="YOUR_BOT_ID" data-primary-color="#0F766E" data-greeting="Hello!"></script>`,
  methodsIntro:
    "ChatbotWidget.init(options) returns a Promise that resolves to a widget instance, or null if setup fails (it never throws). Always check the result.",
  methods: [
    { name: "open()", description: "Open the chat panel." },
    { name: "close()", description: "Close the chat panel." },
    {
      name: "resetChat()",
      description: "Clear the visitor's local chat history. Nothing is deleted from the backend.",
    },
    {
      name: "destroy()",
      description: "Remove the widget, for example on an SPA route change.",
    },
  ],
  methodsExample: `const widget = await window.ChatbotWidget.init({ script: document.currentScript, botId: 'YOUR_BOT_ID' });
if (widget) widget.open();`,
};
