import Link from "next/link";
import { publishedNiches } from "@/content/niches";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/marketing/Breadcrumbs";

export const metadata = buildMetadata({
  title: "AI Chatbot Solutions for Business by Industry",
  description:
    "Explore AI chatbot solutions for business websites. See how Tellvira answers routine questions, captures leads and collects appointment requests for your team.",
  path: "/solutions",
});

export default function SolutionsPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Solutions", path: "/solutions" },
        ]}
      />
      <div className="max-w-2xl">
        <p className="text-sm font-medium uppercase tracking-[0.16em] text-primary">Solutions</p>
        <h1 className="mt-3 text-4xl font-semibold text-foreground">
          AI chatbot solutions by industry
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          See how a website assistant can answer routine questions and pass inquiries to your team.
          {" "}Explore <Link href="/pricing" className="text-primary">AI chatbot pricing</Link>
          {" "}or <Link href="/contact" className="text-primary">contact Tellvira</Link> for help.
        </p>
      </div>
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {publishedNiches.map((niche) => (
          <article
            key={niche.slug}
            className="rounded-xl border border-border bg-card p-6 shadow-sm"
          >
            <h2 className="text-xl font-semibold text-foreground">{niche.name}</h2>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">{niche.intro}</p>
            <Link
              href={`/solutions/${niche.slug}`}
              className="mt-6 inline-flex text-sm font-semibold text-primary underline-offset-4 hover:underline"
            >
              Explore {niche.name.toLowerCase()}
            </Link>
          </article>
        ))}
      </div>
    </main>
  );
}
