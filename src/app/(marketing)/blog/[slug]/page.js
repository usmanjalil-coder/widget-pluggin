import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/marketing/Breadcrumbs";
import { JsonLd } from "@/components/marketing/JsonLd";
import { MarketingAuthCta } from "@/components/marketing/MarketingAuth";
import { PostBody, buildHeadingIds } from "@/components/marketing/PostBody";
import { publishedNiches } from "@/content/niches";
import { publishedPosts, readingMinutes } from "@/content/posts";
import { absoluteUrl, buildMetadata, faqSchema, siteConfig } from "@/lib/seo";

export const dynamicParams = false;
function formatDate(iso) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

export function generateStaticParams() {
  return publishedPosts.map(({ slug }) => ({ slug }));
}
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = publishedPosts.find((item) => item.slug === slug);
  if (!post) notFound();
  return buildMetadata({
    title: { absolute: post.metaTitle },
    description: post.metaDescription,
    path: `/blog/${slug}`,
  });
}

export default async function PostPage({ params }) {
  const { slug } = await params;
  const post = publishedPosts.find((item) => item.slug === slug);
  if (!post) notFound();
  const relatedNiches = post.relatedNicheSlugs
    .map((id) => publishedNiches.find((item) => item.slug === id))
    .filter(Boolean);
  const relatedPosts = post.relatedPostSlugs
    .map((id) => publishedPosts.find((item) => item.slug === id))
    .filter(Boolean);
  const headingIds = buildHeadingIds(post.body);
  const url = absoluteUrl(`/blog/${slug}`);
  const organization = { "@type": "Organization", name: "Tellvira", url: absoluteUrl("/") };
  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.metaDescription,
    image: [absoluteUrl("/opengraph-image")],
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author: organization,
    publisher: {
      ...organization,
      logo: { "@type": "ImageObject", url: absoluteUrl(siteConfig.logo) },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
  };
  return (
    <main className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <JsonLd data={article} />
      {post.faq?.length > 0 && <JsonLd data={faqSchema(post.faq)} />}
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
          { name: post.title, path: `/blog/${slug}` },
        ]}
      />
      <article className="max-w-3xl">
        <p className="text-sm font-medium text-primary">{post.category}</p>
        <h1 className="mt-4 text-4xl font-semibold leading-tight text-foreground sm:text-5xl">
          {post.title}
        </h1>
        <p className="mt-5 text-sm text-muted-foreground">
          By the Tellvira team · Published{" "}
          <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time> · Updated{" "}
          <time dateTime={post.updatedAt}>{formatDate(post.updatedAt)}</time> · {readingMinutes(post)} min read
        </p>
        <nav
          aria-label="Table of contents"
          className="my-10 rounded-xl border border-border bg-muted/30 p-6"
        >
          <h2 className="text-lg font-semibold text-foreground">On this page</h2>
          <ul className="mt-3 space-y-2 text-sm text-primary">
            {post.body
              .map((block, index) => ({ block, id: headingIds[index] }))
              .filter(({ block }) => block.type === "h2")
              .map(({ block, id }) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    className="underline underline-offset-4 hover:decoration-2"
                  >
                    {block.text}
                  </a>
                </li>
              ))}
          </ul>
        </nav>
        <PostBody blocks={post.body} />
        {post.faq?.length > 0 && (
          <section className="mt-16">
            <h2 className="text-3xl font-semibold text-foreground">Frequently asked questions</h2>
            <div className="mt-6 divide-y divide-border rounded-xl border border-border px-6">
              {post.faq.map(({ question, answer }) => (
                <div key={question} data-faq-item className="py-5">
                  <h3 data-faq-question className="font-semibold text-foreground">
                    {question}
                  </h3>
                  <p data-faq-answer className="mt-2 leading-7 text-muted-foreground">
                    {answer}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}
      </article>
      {(relatedNiches.length > 0 || relatedPosts.length > 0) && (
        <div className="mt-16 grid max-w-3xl gap-8 sm:grid-cols-2">
          {relatedNiches.length > 0 && (
            <section>
              <h2 className="text-xl font-semibold text-foreground">Related industries</h2>
              <ul className="mt-4 space-y-2">
                {relatedNiches.map((niche) => (
                  <li key={niche.slug}>
                    <Link href={`/solutions/${niche.slug}`} className="text-primary underline-offset-4 hover:underline">
                      {niche.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}
          {relatedPosts.length > 0 && (
            <section>
              <h2 className="text-xl font-semibold text-foreground">Related posts</h2>
              <ul className="mt-4 space-y-2">
                {relatedPosts.map((item) => (
                  <li key={item.slug}>
                    <Link href={`/blog/${item.slug}`} className="text-primary underline-offset-4 hover:underline">
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      )}
      <section className="mt-16 max-w-3xl rounded-2xl border border-border bg-muted/30 p-8">
        <h2 className="text-2xl font-semibold text-foreground">
          Ready to answer more website questions?
        </h2>
        <p className="mt-3 text-muted-foreground">
          Start with your existing pages and FAQs. Your team stays in charge of follow-up.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <MarketingAuthCta
            loggedOutLabel="Start free"
            className="rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground"
          />
          <Link
            href="/pricing"
            className="rounded-lg border border-border px-5 py-3 text-sm font-semibold text-foreground"
          >
            See pricing
          </Link>
        </div>
      </section>
    </main>
  );
}
