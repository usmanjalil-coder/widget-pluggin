import { publishedPosts } from "@/content/posts";
import { absoluteUrl } from "@/lib/seo";

export const dynamic = "force-static";

function escapeXml(value) {
  return String(value).replace(
    /[&<>"']/g,
    (character) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&apos;" })[character],
  );
}

export async function GET() {
  const items = publishedPosts
    .map(
      (post) =>
        `<item><title>${escapeXml(post.title)}</title><link>${escapeXml(absoluteUrl(`/blog/${post.slug}`))}</link><guid>${escapeXml(absoluteUrl(`/blog/${post.slug}`))}</guid><description>${escapeXml(post.excerpt)}</description><pubDate>${new Date(`${post.publishedAt}T00:00:00Z`).toUTCString()}</pubDate></item>`,
    )
    .join("");
  const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>Tellvira Blog</title><link>${absoluteUrl("/blog")}</link><description>Practical guides for small business websites.</description>${items}</channel></rss>`;
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
