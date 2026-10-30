import { brandColors } from "@/config/brand";
import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/seo";

export function createSocialImage() {
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        padding: "80px",
        background: brandColors.lightPrimary,
        color: "white",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", fontSize: 112, fontWeight: 700 }}>{siteConfig.name}</div>
      <div style={{ display: "flex", fontSize: 48, marginTop: 32, maxWidth: 1000 }}>
        {siteConfig.tagline}
      </div>
      <div style={{ display: "flex", fontSize: 28, marginTop: 48 }}>
        Answer questions. Capture leads. Start free.
      </div>
    </div>,
    { width: 1200, height: 630 },
  );
}
