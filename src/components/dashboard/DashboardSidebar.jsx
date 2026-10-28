"use client";

import { memo } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  BookOpen,
  ChevronRight,
  CreditCard,
  LayoutDashboard,
  MessageSquare,
  Settings2,
  Sparkles,
  Users,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import BotSwitcher from "@/components/bots/BotSwitcher";
import { brand } from "@/lib/brand";
import { endAuthSession } from "@/lib/api/auth.api";

const navItems = [
  { label: "Overview", href: "/dashboard", icon: LayoutDashboard, group: "Menu" },
  { label: "Bots", href: "/dashboard/bots", icon: Sparkles, group: "Menu" },
  {
    label: "Conversations",
    href: "/dashboard/conversations",
    icon: MessageSquare,
    group: "Menu",
  },
  { label: "Leads", href: "/dashboard/leads", icon: Users, group: "Menu" },
  {
    label: "Knowledge Base",
    href: "/dashboard/knowledge",
    icon: BookOpen,
    group: "Menu",
  },
  { label: "Usage & Billing", href: "/dashboard/billing", icon: CreditCard, group: "Manage" },
  { label: "Settings", href: "/dashboard/account", icon: Settings2, group: "Manage" },
];

function DashboardSidebar({
  bots,
  selectedBotId,
  selectBot,
  openCreateFromSwitcher,
  viewAllBots,
  page,
  tabFromQuery,
  account,
  onNavigate,
}) {
  const router = useRouter();
  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="flex items-center gap-3 px-5 pt-6 pb-7">
        <Image src={brand.iconPath} alt="" width={36} height={36} className="size-9 rounded-xl bg-white object-contain" />
        <span className="truncate text-lg font-semibold tracking-tight text-foreground">
          {brand.name}
        </span>
      </div>
      <div className="px-3 pb-7">
        <BotSwitcher
          bots={bots}
          selectedId={selectedBotId}
          onSelect={selectBot}
          onCreate={openCreateFromSwitcher}
          onViewAll={viewAllBots}
        />
      </div>
      <nav className="flex-1 space-y-7 px-3" aria-label="Main navigation">
        {["Menu", "Manage"].map((group) => (
          <div key={group} className="space-y-1">
            <p className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              {group}
            </p>
            {navItems
              .filter((item) => item.group === group)
              .map((item) => {
                const Icon = item.icon;
                const active =
                  item.label === page ||
                  (item.label === "Bots" &&
                    page === "Appearance" &&
                    tabFromQuery !== "knowledge") ||
                  (item.label === "Knowledge Base" && page === "Knowledge Base");
                const href = item.href;
                return (
                  <Link
                    prefetch={false}
                    key={item.label}
                    href={href}
                    onClick={() => onNavigate()}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${active ? "bg-accent text-primary" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`}
                  >
                    <Icon className="size-4 shrink-0" />
                    {item.label}
                  </Link>
                );
              })}
          </div>
        ))}
      </nav>
      <div className="border-t border-border p-3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              className="h-auto w-full justify-start gap-3 px-2 py-2"
            >
              <Avatar>
                <AvatarFallback className="bg-accent text-primary">U</AvatarFallback>
              </Avatar>
              <span className="min-w-0 flex-1 text-left">
                <span className="block truncate text-sm font-medium text-foreground">
                  {account?.name || "Account"}
                </span>
                <span className="block text-xs text-muted-foreground">Account menu</span>
              </span>
              <ChevronRight className="size-4 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem onSelect={() => router.push("/dashboard/account")}>
              Account settings
            </DropdownMenuItem>
            <DropdownMenuItem
              onSelect={async () => {
                await endAuthSession();
                window.location.replace("/login");
              }}
            >
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

export default memo(DashboardSidebar);
