import Link from "next/link";
import { cookies } from "next/headers";
import {
  MarketingNav,
  BrandWordmark,
} from "@/components/marketing/MarketingUI";
import { brand } from "@/lib/brand";

export const metadata = {
  title: {
    default: brand.name,
    template: `%s | ${brand.name}`,
  },
  description: brand.description,
  openGraph: {
    title: brand.name,
    description: brand.description,
    siteName: brand.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: brand.name,
    description: brand.description,
  },
};

export default async function MarketingLayout({ children }) {
  const loggedIn = Boolean((await cookies()).get("mock_session"));

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <MarketingNav loggedIn={loggedIn} />
      {children}
      <footer className="border-t border-slate-200 bg-slate-50">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1.2fr_0.8fr_0.8fr_1fr]">
          <div>
            <BrandWordmark />
            <p className="mt-4 max-w-sm text-sm text-slate-600">
              {brand.tagline}
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-500">
              Product
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
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
                <Link href="/contact">Contact</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-500">
              Company
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li>
                <Link href="/privacy">Privacy</Link>
              </li>
              <li>
                <Link href="/terms">Terms</Link>
              </li>
              <li>
                <Link href="/contact">Support</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-500">
              Contact
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li>
                <a href={`mailto:${brand.supportEmail}`}>
                  {brand.supportEmail}
                </a>
              </li>
              <li>
                <a href={`https://${brand.domain}`}>{brand.domain}</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-200">
          <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-4 text-sm text-slate-500 sm:px-6 md:flex-row md:items-center md:justify-between">
            <p>
              © {new Date().getFullYear()} {brand.name}. All rights reserved.
            </p>
            <div className="flex gap-4">
              <Link href="/privacy">Privacy</Link>
              <Link href="/terms">Terms</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
