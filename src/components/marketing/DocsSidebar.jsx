"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef } from "react";
import { ChevronDown } from "lucide-react";
import { docsSidebarGroups } from "@/content/widgetDocs";

function SidebarLinks({ pathname, onNavigate }) {
  return (
    <div className="space-y-6">
      {docsSidebarGroups.map((group) => (
        <div key={group.title}>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            {group.title}
          </p>
          <ul className="mt-2.5 space-y-1 border-l border-border">
            {group.items.map((item) => {
              const active = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    onClick={onNavigate}
                    className={`-ml-px block border-l-2 py-1.5 pl-3 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                      active
                        ? "border-primary font-medium text-primary"
                        : "border-transparent text-muted-foreground hover:border-border hover:text-foreground"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
}

export function DocsSidebar() {
  const pathname = usePathname();
  const detailsRef = useRef(null);
  const closeMobile = () => {
    if (detailsRef.current) detailsRef.current.open = false;
  };

  return (
    <aside aria-label="Documentation navigation" className="min-w-0">
      <details
        ref={detailsRef}
        className="rounded-xl border border-border bg-card p-3 lg:hidden"
      >
        <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-semibold text-foreground [&::-webkit-details-marker]:hidden">
          <span>Documentation menu</span>
          <ChevronDown className="size-4 text-muted-foreground" aria-hidden="true" />
        </summary>
        <nav aria-label="Mobile documentation navigation" className="mt-4">
          <SidebarLinks pathname={pathname} onNavigate={closeMobile} />
        </nav>
      </details>

      <nav
        aria-label="Desktop documentation navigation"
        className="hidden lg:sticky lg:top-24 lg:block lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto lg:pr-2"
      >
        <SidebarLinks pathname={pathname} />
      </nav>
    </aside>
  );
}
