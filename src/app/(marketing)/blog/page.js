import Link from "next/link";
import { Breadcrumbs } from "@/components/marketing/Breadcrumbs";
import { publishedPosts, readingMinutes } from "@/content/posts";
import { absoluteUrl, buildMetadata } from "@/lib/seo";

function formatDate(iso) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

export const metadata = {
  ...buildMetadata({
    title: "Small Business Website Chatbot Guides | Tellvira",
    description:
      "Practical guides on website FAQs, lead capture, live chat, and installing a content-based assistant for small businesses, written by the Tellvira team.",
    path: "/blog",
  }),
  alternates: {
    canonical: absoluteUrl("/blog"),
    types: { "application/rss+xml": absoluteUrl("/blog/rss.xml") },
  },
};

export default function BlogPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
        ]}
      />
      <div className="max-w-3xl">
        <p className="text-sm font-medium uppercase tracking-[0.16em] text-primary">
          Tellvira blog
        </p>
        <h1 className="mt-4 text-4xl font-semibold text-foreground sm:text-5xl">
          Practical guides for small business websites
        </h1>
        <p className="mt-6 text-lg leading-8 text-muted-foreground">
          Learn how to answer visitor questions and handle inquiries. Explore{" "}
          <Link href="/solutions" className="text-primary">
            solutions by industry
          </Link>{" "}
          and{" "}
          <Link href="/pricing" className="text-primary">
            Tellvira pricing
          </Link>
          .
        </p>
      </div>
      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {publishedPosts.map((post) => (
          <article
            key={post.slug}
            className="rounded-xl border border-border bg-card p-6 shadow-sm"
          >
            <p className="text-sm font-medium text-primary">
              {post.category} ·{" "}
              <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time> ·{" "}
              {readingMinutes(post)} min read
            </p>
            <h2 className="mt-3 text-xl font-semibold text-foreground">
              <Link href={`/blog/${post.slug}`} className="hover:text-primary">
                {post.title}
              </Link>
            </h2>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">{post.excerpt}</p>
            <Link
              href={`/blog/${post.slug}`}
              className="mt-5 inline-flex font-semibold text-primary"
            >
              Read {post.title.toLowerCase()}
            </Link>
          </article>
        ))}
      </div>
    </main>
  );
}
