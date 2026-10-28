import { createSocialImage } from "@/components/marketing/SocialImage";

export const alt = "Tellvira: AI chatbot for small business websites";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return createSocialImage();
}
