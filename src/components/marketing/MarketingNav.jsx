import Link from "next/link";
import { BrandWordmark } from "./BrandWordmark";
import MarketingNavControls from "./MarketingNavControls";

export function MarketingNav() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-card/90 backdrop-blur">
      <MarketingNavControls brand={
        <Link href="/" aria-label="Tellvira home" className="flex items-center">
          <BrandWordmark />
        </Link>
      } />
    </header>
  );
}
