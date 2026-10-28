import Image from "next/image";
import { brand } from "@/lib/brand";

export function BrandWordmark({ className = "" }) {
  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      <Image src={brand.iconPath} alt="" width={36} height={36} className="size-9 rounded-xl bg-white object-contain" />
      <span className="text-lg font-semibold text-foreground">{brand.name}</span>
    </div>
  );
}
