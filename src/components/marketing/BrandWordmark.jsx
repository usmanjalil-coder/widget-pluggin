import Image from "next/image";
import { brand } from "@/lib/brand";

export function BrandWordmark({ className = "", size = "header" }) {
  const footer = size === "footer";

  return (
    <span
      className={`relative inline-block shrink-0 overflow-hidden ${footer ? "h-[32px] w-[128px]" : "h-10 w-40"} ${className}`}
    >
      <Image
        src={brand.wordmarkPath}
        alt="Tellvira"
        width={footer ? 160 : 200}
        height={footer ? 63 : 79}
        className={`absolute max-w-none ${footer ? "-left-[18px] -top-[17px]" : "-left-[22px] -top-[21px]"}`}
      />
    </span>
  );
}
