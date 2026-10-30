import { absoluteUrl, isProductionSite } from "@/lib/seo";

export default function robots() {
  if (!isProductionSite) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/dashboard",
        "/api/",
        "/login",
        "/signup",
        "/reset-password",
        "/onboarding",
        "/pay",
      ],
    },
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
