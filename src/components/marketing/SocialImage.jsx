import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { siteConfig } from "@/lib/seo";

// ImageResponse renders independently of the site's CSS theme tokens.
const ember = {
  background: "#0e0e0f",
  foreground: "#ffffff",
  primary: "#f59e0b",
  accent: "#fde68a",
  gradient: "linear-gradient(90deg, #f59e0b 0%, #ff5722 100%)",
};

export async function createSocialImage() {
  const logo = await readFile(join(process.cwd(), "public/web-app-manifest-192x192.png"));
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        padding: "80px",
        background: ember.background,
        color: ember.foreground,
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: 12,
          backgroundImage: ember.gradient,
        }}
      />
      <div style={{ display: "flex", alignItems: "center", gap: 24, fontSize: 112, fontWeight: 700 }}>
        <img src={logoSrc} alt="" width={128} height={128} />
        <div style={{ display: "flex" }}>
        {siteConfig.name.slice(0, 4)}<span style={{ color: ember.primary }}>{siteConfig.name.slice(4)}</span>
        </div>
      </div>
      <div style={{ display: "flex", fontSize: 48, marginTop: 32, maxWidth: 1000 }}>
        {siteConfig.tagline}
      </div>
      <div style={{ display: "flex", fontSize: 28, marginTop: 48, color: ember.accent }}>
        Answer questions. Capture leads. Start free.
      </div>
    </div>,
    { width: 1200, height: 630 },
  );
}
