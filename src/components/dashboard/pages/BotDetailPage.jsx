"use client";

import { lazy, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { Button, Skeleton } from "@/components/ui";
import PageHeader from "@/components/shared/PageHeader";
import { deleteBot, getBots } from "@/lib/api/bots.api";
import { useDashboard } from "../dashboard-context";
import { botTabs } from "../dashboard-navigation";

const AppearancePage = lazy(() => import("./AppearancePage"));
const BotSettingsPage = lazy(() => import("./BotSettingsPage"));
const KnowledgePage = lazy(() => import("./KnowledgePage"));
const InstallPanel = lazy(() => import("../InstallPanel"));

export default function BotDetailPage({ botId }) {
  const { selectedBot, setBots, setSelectedBotId } = useDashboard();
  const router = useRouter();
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab") || "appearance";
  const currentPageLabel = botTabs.find((item) => item.value === tab)?.label || "Appearance";
  const handleDeleteBot = async () => {
    try {
      await deleteBot(botId);
      const nextBots = await getBots();
      setBots(nextBots.map(({ id, name }) => ({ id, name })));
      setSelectedBotId(nextBots[0]?.id || "");
      toast("Bot deleted.");
      router.push("/dashboard/bots");
    } catch {
      toast("Bot could not be deleted.");
    }
  };
  return (
    <div className="space-y-6">
      <PageHeader
        title={currentPageLabel}
        description={selectedBot?.name || "Bot details"}
        actions={
          <Button type="button" variant="secondary" onClick={handleDeleteBot}>
            Delete bot
          </Button>
        }
      />
      <div className="flex gap-2 overflow-x-auto pb-1">
        {botTabs.map((item) => (
          <Link
            prefetch={false}
            key={item.value}
            href={"/dashboard/bots/" + botId + "?tab=" + item.value}
            className={
              "shrink-0 rounded-full px-3 py-2 text-sm font-medium " +
              (tab === item.value
                ? "bg-primary text-primary-foreground"
                : "bg-card text-foreground ring-1 ring-border")
            }
          >
            {item.label}
          </Link>
        ))}
      </div>
      <Suspense fallback={<Skeleton className="h-96 w-full rounded-xl" />}>
        {tab === "knowledge" ? (
          <KnowledgePage key={botId} />
        ) : tab === "settings" ? (
          <BotSettingsPage key={botId} />
        ) : tab === "install" ? (
          <InstallPanel selectedBotId={botId} />
        ) : (
          <AppearancePage key={botId} />
        )}
      </Suspense>
    </div>
  );
}
