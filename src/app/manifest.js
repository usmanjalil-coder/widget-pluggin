import { brandColors } from "@/config/brand";

export default function manifest() {
  return {
    name: "Tellvira",
    short_name: "Tellvira",
    icons: [
      {
        src: "/web-app-manifest-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/web-app-manifest-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    display: "standalone",
    theme_color: brandColors.lightPrimary,
    background_color: brandColors.lightBackground,
  };
}
