import { absoluteUrl, isProductionSite } from "@/lib/seo";

export default function robots() {
  if (!isProductionSite) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/dashboard", "/api/"],
    },
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
