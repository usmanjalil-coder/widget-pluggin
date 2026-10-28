import Image from "next/image";
import { brand } from "@/lib/brand";

export function BrandWordmark({ className = "", size = "header" }) {
  const footer = size === "footer";

  return (
    <span className={`inline-flex h-[60px] w-[253px] shrink-0 items-center ${className}`}>
      <Image
        src={brand.wordmarkPath}
        alt="Tellvira"
        width={320}
        height={76}
        loading={footer ? "lazy" : "eager"}
        className="block h-[40px] w-auto"
      />
    </span>
  );
}
