"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useParams, usePathname, useRouter, useSearchParams } from "next/navigation";
import { Menu, Search } from "lucide-react";
import { Badge, Button, Input } from "@/components/ui";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getBots } from "@/lib/api/bots.api";
import { getAccount } from "@/lib/api/account.api";
import { getUsage } from "@/lib/api/usage.api";
import DashboardSidebar from "./DashboardSidebar";
import { DashboardContext } from "./dashboard-context";
import { botTabs, dashboardPages } from "./dashboard-navigation";
import useDashboardResource from "./useDashboardResource";

const EMPTY_BOTS = [];

// Shared chrome only. Route content is supplied by Next.js through children.
export default function DashboardApp({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const searchParams = useSearchParams();
  const botsResource = useDashboardResource(getBots);
  const usageResource = useDashboardResource(getUsage);
  const accountResource = useDashboardResource(getAccount);
  const bots = botsResource.data || EMPTY_BOTS;
  const usage = usageResource.data;
  const account = accountResource.data;
  const [storedBotId, setStoredBotId] = useState("");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const navigationGuard = useRef(null);
  const routeBotId = typeof params.id === "string" ? params.id : "";
  const selectedBotId =
    routeBotId || (bots.some((bot) => bot.id === storedBotId) ? storedBotId : bots[0]?.id || "");
  const selectedBot = useMemo(
    () => bots.find((bot) => bot.id === selectedBotId),
    [bots, selectedBotId],
  );
  const isBotDetailPage = Boolean(routeBotId);
  const page = isBotDetailPage ? "Appearance" : dashboardPages[pathname] || "Overview";
  const tabFromQuery = searchParams.get("tab") || "appearance";
  const currentPageLabel = isBotDetailPage
    ? botTabs.find((tab) => tab.value === tabFromQuery)?.label || "Appearance"
    : page;

  useEffect(() => {
    // Read browser persistence only after hydration.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setStoredBotId(window.localStorage.getItem("chatbot-current-bot") || "");
  }, []);
  useEffect(() => {
    if (!selectedBotId) return;
    window.localStorage.setItem("chatbot-current-bot", selectedBotId);
  }, [selectedBotId]);
  useEffect(() => {
    if (routeBotId) {
      // Retain the last detail-page selection when returning to a collection route.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setStoredBotId(routeBotId);
    }
  }, [routeBotId]);

  const selectBot = useCallback(
    (id) => {
      if (navigationGuard.current && !navigationGuard.current()) return false;
      setStoredBotId(id);
      window.localStorage.setItem("chatbot-current-bot", id);
      router.push("/dashboard/bots/" + id + "?tab=appearance");
      setMobileNavOpen(false);
      return true;
    },
    [router],
  );
  const openCreateFromSwitcher = useCallback(() => {
    if (navigationGuard.current && !navigationGuard.current()) return;
    router.push("/dashboard/bots?create=1");
    setMobileNavOpen(false);
  }, [router]);
  const viewAllBots = useCallback(() => {
    if (navigationGuard.current && !navigationGuard.current()) return;
    router.push("/dashboard/bots");
    setMobileNavOpen(false);
  }, [router]);
  const registerNavigationGuard = useCallback((guard) => {
    navigationGuard.current = guard;
    return () => {
      if (navigationGuard.current === guard) navigationGuard.current = null;
    };
  }, []);
  const context = useMemo(
    () => ({
      bots,
      botsLoading: botsResource.loading,
      botsError: botsResource.error,
      loadBots: botsResource.reload,
      setBots: botsResource.setData,
      selectedBotId,
      setSelectedBotId: setStoredBotId,
      selectedBot,
      selectBot,
      usage,
      usageLoading: usageResource.loading,
      usageError: usageResource.error,
      loadUsage: usageResource.reload,
      account,
      accountLoading: accountResource.loading,
      accountError: accountResource.error,
      loadAccount: accountResource.reload,
      setAccount: accountResource.setData,
      registerNavigationGuard,
    }),
    [
      bots,
      botsResource.loading,
      botsResource.error,
      botsResource.reload,
      botsResource.setData,
      selectedBotId,
      selectedBot,
      selectBot,
      usage,
      usageResource.loading,
      usageResource.error,
      usageResource.reload,
      account,
      accountResource.loading,
      accountResource.error,
      accountResource.reload,
      accountResource.setData,
      registerNavigationGuard,
    ],
  );

  const closeNavigation = useCallback(() => setMobileNavOpen(false), []);
  const sidebar = (
    <DashboardSidebar
      bots={bots}
      selectedBotId={selectedBotId}
      selectBot={selectBot}
      openCreateFromSwitcher={openCreateFromSwitcher}
      viewAllBots={viewAllBots}
      page={page}
      tabFromQuery={tabFromQuery}
      account={account}
      onNavigate={closeNavigation}
    />
  );

  return (
    <DashboardContext.Provider value={context}>
      <div className="min-h-screen bg-background text-foreground">
        <div className="flex min-h-screen">
          <aside className="sticky top-0 hidden h-screen w-64 shrink-0 border-r border-border bg-card lg:block">
            {sidebar}
          </aside>

          <main className="min-w-0 flex-1">
            <header
              className={`${page === "Appearance" ? "relative" : "sticky top-0"} z-20 border-b border-border bg-card/90 backdrop-blur-sm`}
            >
              <div className="flex items-center justify-between gap-4 px-4 py-3 sm:px-6">
                <div className="flex min-w-0 items-center gap-3">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="lg:hidden"
                    aria-label="Open navigation"
                    onClick={() => setMobileNavOpen(true)}
                  >
                    <Menu className="size-5" />
                  </Button>
                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground">
                      {isBotDetailPage
                        ? `Bots / ${selectedBot?.name || "Bot"} / ${currentPageLabel}`
                        : `Workspace / ${currentPageLabel}`}
                    </p>
                    <p className="truncate text-sm font-semibold text-foreground">
                      {currentPageLabel}
                    </p>
                  </div>
                </div>

                <div className="flex min-w-0 items-center gap-2 sm:gap-3">
                  <div className="relative hidden xl:block">
                    <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      aria-label="Search coming soon"
                      placeholder="Search…"
                      disabled
                      className="w-48 pl-9"
                    />
                  </div>
                  <Badge
                    tone="default"
                    className="hidden border-border bg-transparent capitalize md:inline-flex"
                  >
                    {usage?.plan || "free"}
                  </Badge>
                  <Avatar className="hidden sm:flex">
                    <AvatarFallback className="bg-accent text-primary">U</AvatarFallback>
                  </Avatar>
                </div>
              </div>
            </header>
            <Sheet open={mobileNavOpen} onOpenChange={setMobileNavOpen}>
              <SheetContent side="left" className="w-64 gap-0 p-0" showCloseButton={false}>
                <SheetHeader className="sr-only">
                  <SheetTitle>Navigation</SheetTitle>
                </SheetHeader>
                {sidebar}
              </SheetContent>
            </Sheet>

            <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">{children}</div>
          </main>
        </div>
      </div>
    </DashboardContext.Provider>
  );
}
