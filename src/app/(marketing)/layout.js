import Link from "next/link";
import { MarketingNav } from "@/components/marketing/MarketingNav";
import { BrandWordmark } from "@/components/marketing/BrandWordmark";
import { brand } from "@/lib/brand";
import { publishedNiches } from "@/content/niches";

export const dynamic = "error";
export const revalidate = 300;

export default function MarketingLayout({ children }) {
  return (
    <div className="min-h-screen bg-card text-foreground">
      <MarketingNav />
      {children}
      <footer className="border-t border-border bg-background">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1.4fr_0.8fr_0.8fr_0.8fr]">
          <div>
            <Link href="/" aria-label="Tellvira homepage" className="inline-flex">
              <BrandWordmark size="footer" />
            </Link>
            <p className="mt-4 max-w-sm text-sm text-muted-foreground">{brand.tagline}</p>
          </div>
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              Product
            </h2>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/#features">Features</Link>
              </li>
              <li>
                <Link href="/#how-it-works">How it works</Link>
              </li>
              <li>
                <Link href="/pricing">Pricing</Link>
              </li>
              <li>
                <Link href="/#faq">FAQ</Link>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              Company
            </h2>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/contact">Contact</Link>
              </li>
              <li>
                <Link href="/solutions">Solutions</Link>
              </li>
              {publishedNiches.map((niche) => (
                <li key={niche.slug}>
                  <Link href={`/solutions/${niche.slug}`}>{niche.name}</Link>
                </li>
              ))}
              <li>
                <a href={`mailto:${brand.supportEmail}`}>{brand.supportEmail}</a>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              Legal
            </h2>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/privacy">Privacy</Link>
              </li>
              <li>
                <Link href="/terms">Terms</Link>
              </li>
              <li>
                <Link href="/refunds">Refund Policy</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border">
          <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-4 text-sm text-muted-foreground sm:px-6 md:flex-row md:items-center md:justify-between">
            <p>
              © {new Date().getFullYear()} {brand.name}. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
