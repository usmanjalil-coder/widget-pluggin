import Link from "next/link";
import { notFound } from "next/navigation";
import { MarketingAuthCta } from "@/components/marketing/MarketingAuth";
import { publishedNiches as niches } from "@/content/niches";
import { buildMetadata, faqSchema } from "@/lib/seo";
import { JsonLd } from "@/components/marketing/JsonLd";
import { Breadcrumbs } from "@/components/marketing/Breadcrumbs";

export const dynamicParams = false;

export function generateStaticParams() {
  return niches.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const niche = niches.find((item) => item.slug === slug);
  if (!niche) notFound();
  return buildMetadata({
    title: niche.metaTitle,
    description: niche.metaDescription,
    path: `/solutions/${slug}`,
  });
}

export default async function NichePage({ params }) {
  const { slug } = await params;
  const niche = niches.find((item) => item.slug === slug);
  if (!niche) notFound();

  const related = niche.relatedSlugs
    .map((relatedSlug) => niches.find((item) => item.slug === relatedSlug))
    .filter(Boolean);

  return (
    <main>
      <JsonLd data={faqSchema(niche.faq)} />
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
        <Breadcrumbs
          items={[
            { name: "Home", path: "/" },
            { name: "Solutions", path: "/solutions" },
            { name: niche.name, path: `/solutions/${niche.slug}` },
          ]}
        />
        <div className="max-w-3xl">
          <p className="text-sm font-medium uppercase tracking-[0.16em] text-primary">
            {niche.name}
          </p>
          <h1 className="mt-4 text-4xl font-semibold leading-tight text-foreground sm:text-5xl">
            {niche.h1}
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">{niche.intro}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <MarketingAuthCta className="rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90" />
            <Link
              href="/pricing"
              className="rounded-lg border border-border px-5 py-3 text-sm font-semibold text-foreground hover:bg-muted"
            >
              View pricing
            </Link>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-muted/30 py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="text-3xl font-semibold text-foreground">
            {niche.painPointsHeading || "Questions this helps with"}
          </h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {niche.painPoints.map((point) => (
              <article
                key={point.title}
                className="rounded-xl border border-border bg-card p-6 shadow-sm"
              >
                <h3 className="text-lg font-semibold text-foreground">{point.title}</h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{point.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <h2 className="text-3xl font-semibold text-foreground">
          {niche.useCasesHeading || "What your assistant can handle"}
        </h2>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {niche.useCases.map((useCase) => (
            <article
              key={useCase.title}
              className="rounded-xl border border-border bg-card p-6 shadow-sm"
            >
              <h3 className="text-lg font-semibold text-foreground">{useCase.title}</h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">{useCase.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-background py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="text-3xl font-semibold text-foreground">
            {niche.howItWorksHeading || "Set up and install"}
          </h2>
          <ol className="mt-8 grid gap-5 md:grid-cols-3">
            {niche.howItWorks.map((step, index) => (
              <li
                key={step.title}
                className="rounded-xl border border-border bg-card p-6 shadow-sm"
              >
                <span className="text-sm font-semibold text-primary">Step {index + 1}</span>
                <h3 className="mt-3 text-lg font-semibold text-foreground">{step.title}</h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
        <h2 className="text-3xl font-semibold text-foreground">Frequently asked questions</h2>
        <div className="mt-8 divide-y divide-border rounded-xl border border-border bg-card px-6">
          {niche.faq.map(({ question, answer }) => (
            <div data-faq-item key={question} className="py-5">
              <h3 data-faq-question className="font-semibold text-foreground">
                {question}
              </h3>
              <p data-faq-answer className="mt-2 text-sm leading-7 text-muted-foreground">
                {answer}
              </p>
            </div>
          ))}
        </div>
        {niche.safetyNote && (
          <p className="mt-6 rounded-xl border border-warning/20 bg-warning-bg p-4 text-sm leading-6 text-warning-foreground">
            {niche.safetyNote}
          </p>
        )}
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
        <div className="rounded-2xl border border-border bg-muted/30 p-8">
          <h2 className="text-2xl font-semibold text-foreground">Ready to try Tellvira?</h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Start free and set up your assistant from the dashboard.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <MarketingAuthCta className="rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90" />
            <Link
              href="/pricing"
              className="rounded-lg border border-border px-5 py-3 text-sm font-semibold text-foreground hover:bg-card"
            >
              Compare plans
            </Link>
          </div>
        </div>
        <div className="mt-8 text-sm text-muted-foreground">
          <h2 className="font-semibold text-foreground">Related solutions</h2>
          <div className="mt-2 flex flex-wrap gap-4">
            {related.map((item) => (
              <Link
                key={item.slug}
                href={`/solutions/${item.slug}`}
                className="text-primary underline-offset-4 hover:underline"
              >
                {item.name}
              </Link>
            ))}
            <Link href="/solutions" className="text-primary underline-offset-4 hover:underline">
              Explore all solutions
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
