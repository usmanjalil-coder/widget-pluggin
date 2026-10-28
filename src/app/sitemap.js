import { publishedNiches } from "@/content/niches";
import { absoluteUrl, isProductionSite } from "@/lib/seo";

// Content review dates, updated only when the corresponding page changes.
const pageDates = {
  "/": "2026-10-28",
  "/pricing": "2026-10-28",
  "/solutions": "2026-10-28",
  "/terms": "2026-10-28",
  "/privacy": "2026-10-28",
  "/refunds": "2026-10-28",
  "/contact": "2026-10-28",
};

export default function sitemap() {
  if (!isProductionSite) return [];
  return [
    ...Object.entries(pageDates).map(([path, lastModified]) => ({
      url: absoluteUrl(path),
      lastModified,
    })),
    ...publishedNiches.map((niche) => ({
      url: absoluteUrl(`/solutions/${niche.slug}`),
      lastModified: niche.updatedAt,
    })),
  ];
}
