"use client";

import Link from "next/link";
import ThemeToggle from "@/components/shared/ThemeToggle";

import { useCallback, useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";

import { BrandWordmark } from "./BrandWordmark";
import { AuthActions } from "./MarketingAuth";

const MarketingMobileMenu = dynamic(() => import("./MarketingMobileMenu"), { ssr: false });

const navigation = [
  { href: "/#features", label: "Features" },
  { href: "/#how-it-works", label: "How it works" },
  { href: "/pricing", label: "Pricing" },
  { href: "/blog", label: "Blog" },
  { href: "/#faq", label: "FAQ" },
];

export function MarketingNav() {
  const [open, setOpen] = useState(false);
  const [menuLoaded, setMenuLoaded] = useState(false);
  const toggleMenu = useCallback(() => {
    setMenuLoaded(true);
    setOpen((current) => !current);
  }, []);
  const handleOpenChange = useCallback((nextOpen) => setOpen(nextOpen), []);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-card/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-[9.5px] sm:px-6">
        <Link href="/" aria-label="Home" className="flex items-center">
          <BrandWordmark />
        </Link>

        <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
          {navigation.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-foreground">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <ThemeToggle />
          <AuthActions />
        </div>

        <div className="flex items-center gap-1 md:hidden">
          <ThemeToggle />
          <Button
            variant="ghost"
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground md:hidden"
            onClick={toggleMenu}
            aria-label="Toggle navigation"
            aria-expanded={open}
          >
            <Menu className="size-5" aria-hidden="true" />
          </Button>
        </div>
      </div>

      {menuLoaded && <MarketingMobileMenu open={open} onOpenChange={handleOpenChange} navigation={navigation} />}
    </header>
  );
}
