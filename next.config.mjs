import { isProductionSite, SITE_URL } from "./src/lib/seo.js";

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  allowedDevOrigins: ["rigid-drainpipe-uphill.ngrok-free.dev"],
  reactCompiler: true,
  // reactStrictMode: false,
  experimental: {
    optimizePackageImports: ["lucide-react", "radix-ui"],
  },
  async headers() {
    return [
      {
        source: "/widget.js",
        headers: [
          { key: "Cache-Control", value: "public, max-age=3600, stale-while-revalidate=86400" },
        ],
      },
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          ...(!isProductionSite ? [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] : []),
        ],
      },
      {
        source: "/dashboard/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
      {
        source: "/:authPage(login|signup)",
        headers: [{ key: "Cross-Origin-Opener-Policy", value: "same-origin-allow-popups" }],
      },
    ];
  },
  async redirects() {
    const solutionRedirects = [
      {
        source: "/solutions/salons",
        destination: "/solutions",
        permanent: true,
      },
      {
        source: "/solutions/online-stores",
        destination: "/solutions",
        permanent: true,
      },
    ];
    if (!isProductionSite) return solutionRedirects;
    const host = new URL(SITE_URL).host.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    return [
      ...solutionRedirects,
      {
        source: "/:path*",
        has: [{ type: "host", value: `www\\.${host}` }],
        destination: `${SITE_URL}/:path*`,
        permanent: true,
      },
      {
        source: "/:path*",
        has: [
          { type: "host", value: host },
          { type: "header", key: "x-forwarded-proto", value: "http" },
        ],
        destination: `${SITE_URL}/:path*`,
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
