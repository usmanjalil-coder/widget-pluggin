import "./globals.css";
import { brand } from "@/lib/brand";

export const metadata = {
  metadataBase: new URL("https://yourbrand.example"),
  title: {
    default: brand.name,
    template: `%s | ${brand.name}`,
  },
  description: brand.description,
  openGraph: {
    title: brand.name,
    description: brand.description,
    url: "https://yourbrand.example",
    siteName: brand.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: brand.name,
    description: brand.description,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-full bg-slate-50 text-slate-900">{children}</body>
    </html>
  );
}
