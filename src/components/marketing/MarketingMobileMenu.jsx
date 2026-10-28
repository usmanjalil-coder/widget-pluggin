"use client";

import Link from "next/link";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { AuthActions } from "./MarketingAuth";

export default function MarketingMobileMenu({ open, onOpenChange, navigation }) {
  return (
      <Sheet open={open} onOpenChange={onOpenChange}>
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
  );
}
