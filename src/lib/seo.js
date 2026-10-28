export const isProductionSite = process.env.SITE_ENV === "production";

const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL;
if (isProductionSite && !configuredUrl) {
  throw new Error("NEXT_PUBLIC_SITE_URL is required when SITE_ENV=production.");
}

const siteUrl = new URL(configuredUrl || "http://localhost:3000");
if (
  !["http:", "https:"].includes(siteUrl.protocol) ||
  siteUrl.username ||
  siteUrl.password ||
  siteUrl.search ||
  siteUrl.hash ||
  siteUrl.pathname !== "/"
) {
  throw new Error("NEXT_PUBLIC_SITE_URL must be an HTTP(S) origin without a path or credentials.");
}
if (isProductionSite && (siteUrl.protocol !== "https:" || siteUrl.hostname.startsWith("www."))) {
  throw new Error("Production NEXT_PUBLIC_SITE_URL must use HTTPS and the non-www host.");
}

export const SITE_URL = siteUrl.origin;

export const siteConfig = {
  name: "Tellvira",
  tagline: "AI chatbot for small business websites",
  SITE_URL,
  locale: "en_US",
  supportEmail: "support@tellvira.com",
  logo: "/web-app-manifest-192x192.png",
  description:
    "Add an AI chatbot to your website in minutes. Answer visitor questions, capture leads and appointment requests 24/7. Start free.",
};

export function absoluteUrl(path = "/") {
  const url = new URL(path, `${SITE_URL}/`);
  url.pathname = url.pathname.replace(/\/+$/, "") || "/";
  url.search = "";
  url.hash = "";
  return url.href.replace(/\/$/, "");
}

export function buildMetadata({
  title,
  description = siteConfig.description,
  path,
  image,
  noindex = false,
} = {}) {
  const fullTitle =
    typeof title === "object"
      ? title.absolute
      : title
        ? `${title} | ${siteConfig.name}`
        : siteConfig.name;
  const index = isProductionSite && !noindex;
  const shareImage = {
    url: absoluteUrl(image || "/opengraph-image"),
    width: 1200,
    height: 630,
    alt: `${siteConfig.name}: ${siteConfig.tagline}`,
  };

  return {
    title,
    description,
    ...(path !== undefined ? { alternates: { canonical: absoluteUrl(path) } } : {}),
    openGraph: {
      type: "website",
      siteName: siteConfig.name,
      title: fullTitle,
      description,
      locale: siteConfig.locale,
      ...(path !== undefined ? { url: absoluteUrl(path) } : {}),
      images: [shareImage],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [{ ...shareImage, url: absoluteUrl(image || "/twitter-image") }],
    },
    robots: { index, follow: index },
  };
}

export function faqSchema(items) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  };
}

export function softwareSchema(plans) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": `${absoluteUrl()}#software`,
    name: siteConfig.name,
    url: absoluteUrl(),
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    offers: plans
      .filter(
        (plan) =>
          Number.isInteger(plan.priceCents) &&
          plan.priceCents >= 0 &&
          plan.currency === "USD" &&
          plan.billingInterval === "month",
      )
      .map((plan) => ({
        "@type": "Offer",
        name: plan.name,
        url: absoluteUrl("/pricing"),
        price: (plan.priceCents / 100).toFixed(2),
        priceCurrency: plan.currency,
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: (plan.priceCents / 100).toFixed(2),
          priceCurrency: plan.currency,
          billingDuration: "P1M",
        },
      })),
  };
}
