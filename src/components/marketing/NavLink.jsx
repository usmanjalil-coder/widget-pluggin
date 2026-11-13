"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

export function NavLink({ href, pathname, activeSection, mobile = false, onClick, children }) {
  const [path, section] = href.split("#");
  const active = section
    ? pathname === "/" && path === "/" && activeSection === section
    : pathname === path || (path !== "/" && pathname?.startsWith(path + "/"));

  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      onClick={onClick}
      className={cn(
        "relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card",
        active ? "font-medium text-foreground" : "text-muted-foreground hover:text-foreground",
        mobile
          ? "rounded-lg px-2 py-2 hover:bg-background before:absolute before:inset-y-2 before:left-0 before:w-0.5 before:bg-primary before:content-['']"
          : "after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-full after:origin-left after:bg-primary after:transition-transform after:duration-200 after:content-[''] hover:after:scale-x-100 focus-visible:after:scale-x-100 motion-reduce:after:transition-none",
        mobile
          ? (active ? "before:opacity-100" : "before:opacity-0")
          : (active ? "after:scale-x-100" : "after:scale-x-0"),
      )}
    >
      {children}
    </Link>
  );
}
