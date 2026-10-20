"use client";

import Link from "next/link";
import ThemeToggle from "@/components/shared/ThemeToggle";

import { useCallback, useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { BrandWordmark } from "./BrandWordmark";
import { useAuthToken } from "./MarketingAuth";

const navigation = [
  { href: "/#features", label: "Features" },
  { href: "/#how-it-works", label: "How it works" },
  { href: "/pricing", label: "Pricing" },
  { href: "/#faq", label: "FAQ" },
];

function AuthActions({ mobile = false }) {
  const authenticated = useAuthToken();

  if (authenticated) {
    return (
      <Link
        href="/dashboard"
        className={`${mobile ? "mt-4 text-center" : ""} rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring`}
      >
        Go to dashboard
      </Link>
    );
  }

  return (
    <>
      <Link
        href="/login"
        className={`${mobile ? "mt-4 text-center" : ""} rounded-lg px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring`}
      >
        Log in
      </Link>
      <Link
        href="/signup"
        className="rounded-lg bg-primary px-4 py-2 text-center text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        Get started free
      </Link>
    </>
  );
}

export function MarketingNav() {
  const [open, setOpen] = useState(false);
  const toggleMenu = useCallback(() => setOpen((current) => !current), []);
  const handleOpenChange = useCallback((nextOpen) => setOpen(nextOpen), []);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-card/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
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
          >
            <Menu className="size-5" aria-hidden="true" />
          </Button>
        </div>
      </div>

      <Sheet open={open} onOpenChange={handleOpenChange}>
        <SheetContent side="right" className="w-[min(22rem,90vw)] p-6 md:hidden">
          <SheetHeader>
            <SheetTitle>Menu</SheetTitle>
          </SheetHeader>
          <div className="flex flex-col gap-2 text-sm text-foreground">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-lg px-2 py-2 hover:bg-background"
              >
                {item.label}
              </Link>
            ))}
            <AuthActions mobile />
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
}
