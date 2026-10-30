import { brandColors } from "@/config/brand";
import "./globals.css";
import { brand } from "@/lib/brand";
import localFont from "next/font/local";
import ThemeProvider from "@/components/ThemeProvider";
import { buildMetadata, siteConfig, SITE_URL } from "@/lib/seo";

const inter = localFont({
  src: "../assets/inter-latin.woff2",
  variable: "--font-inter",
  display: "swap",
  weight: "100 900",
});

export const metadata = {
  ...buildMetadata(),
  metadataBase: new URL(SITE_URL),
  applicationName: siteConfig.name,
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    title: brand.name,
  },
  title: {
    default: "Tellvira: AI Chatbot for Small Business Websites",
    template: "%s | Tellvira",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: brandColors.lightPrimary },
    { media: "(prefers-color-scheme: dark)", color: brandColors.darkBackground },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="min-h-full bg-background text-foreground">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
