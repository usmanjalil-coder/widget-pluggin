import { publishedNiches } from "@/content/niches";
import { absoluteUrl, isProductionSite } from "@/lib/seo";

// Content review dates, updated only when the corresponding page changes.
const pageDates = {
  "/": "2026-10-30",
  "/pricing": "2026-10-30",
  "/solutions": "2026-10-30",
  "/terms": "2026-10-30",
  "/privacy": "2026-10-30",
  "/refunds": "2026-10-30",
  "/contact": "2026-10-30",
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
