"use client";


import { usePathname } from "next/navigation";
import { NavLink } from "./NavLink";
import ThemeToggle from "@/components/shared/ThemeToggle";

import { useCallback, useEffect, useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";


import { AuthActions } from "./MarketingAuth";

const MarketingMobileMenu = dynamic(() => import("./MarketingMobileMenu"), { ssr: false });

const navigation = [
  { href: "/#features", label: "Features" },
  { href: "/#how-it-works", label: "How it works" },
  { href: "/pricing", label: "Pricing" },
  { href: "/blog", label: "Blog" },
  { href: "/#faq", label: "FAQ" },
];

export default function MarketingNavControls({ brand }) {
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState(null);

  useEffect(() => {
    if (pathname !== "/" || typeof IntersectionObserver === "undefined") return;
    const sections = navigation
      .filter(({ href }) => href.startsWith("/#"))
      .map(({ href }) => document.getElementById(href.slice(2)))
      .filter(Boolean);
    const visible = new Set();
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) visible.add(entry.target);
        else visible.delete(entry.target);
      }
      const current = [...visible].sort((a, b) =>
        Math.abs(a.getBoundingClientRect().top - 80) - Math.abs(b.getBoundingClientRect().top - 80),
      )[0];
      setActiveSection(current?.id ?? null);
    }, { rootMargin: "-80px 0px -35% 0px", threshold: 0 });
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [pathname]);

  const [open, setOpen] = useState(false);
  const [menuLoaded, setMenuLoaded] = useState(false);
  const toggleMenu = useCallback(() => {
    setMenuLoaded(true);
    setOpen((current) => !current);
  }, []);
  const handleOpenChange = useCallback((nextOpen) => setOpen(nextOpen), []);

  return (
    <>
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-[9.5px] sm:px-6">
        {brand}

        <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
          {navigation.map((item) => (
            <NavLink key={item.label} href={item.href} pathname={pathname} activeSection={activeSection}>
              {item.label}
            </NavLink>
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

      {menuLoaded && <MarketingMobileMenu open={open} onOpenChange={handleOpenChange} navigation={navigation} pathname={pathname} activeSection={activeSection} />}
    </>
  );
}
