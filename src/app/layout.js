import "./globals.css";
import { brand } from "@/lib/brand";
import localFont from "next/font/local";
import DesignProviders from "@/components/DesignProviders";

const inter = localFont({ src: "../assets/inter-latin.woff2", variable: "--font-inter", display: "swap", weight: "100 900" });

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
    <html lang="en" className={inter.variable}>
      <body className="min-h-full bg-background text-foreground"><DesignProviders>{children}</DesignProviders></body>
    </html>
  );
}
