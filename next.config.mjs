import { isProductionSite, SITE_URL } from "./src/lib/seo.js";

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  allowedDevOrigins: ["rigid-drainpipe-uphill.ngrok-free.dev"],
  reactCompiler: true,
  reactStrictMode: false,
  async headers() {
    return [
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
    ];
  },
  async redirects() {
    if (!isProductionSite) return [];
    const host = new URL(SITE_URL).host.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    return [
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
