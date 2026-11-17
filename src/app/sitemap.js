import { publishedNiches } from "@/content/niches";
import { publishedPosts } from "@/content/posts";
import { absoluteUrl, isProductionSite } from "@/lib/seo";

// Content review dates, updated only when the corresponding page changes.
const pageDates = {
  "/": "2026-11-17",
  "/pricing": "2026-11-17",
  "/solutions": "2026-11-17",
  "/blog": "2026-11-17",
  "/wordpress-chatbot": "2026-11-17",
  "/terms": "2026-10-30",
  "/privacy": "2026-10-30",
  "/refunds": "2026-11-17",
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
    ...publishedPosts.map((post) => ({
      url: absoluteUrl(`/blog/${post.slug}`),
      lastModified: post.updatedAt,
    })),
  ];
}
