import { brand } from "@/lib/brand";

export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `https://${brand.domain}/sitemap.xml`,
  };
}
