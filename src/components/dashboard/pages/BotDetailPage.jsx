"use client";

import { lazy, Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui";
import DeleteBotDialog from "../DeleteBotDialog";
import PageHeader from "@/components/shared/PageHeader";
import { deleteBot, getBots } from "@/lib/api/bots.api";
import { useDashboard } from "../dashboard-context";
import { botTabs } from "../dashboard-navigation";

const loadAppearancePage = () => import("./AppearancePage");
const loadBotSettingsPage = () => import("./BotSettingsPage");
const loadKnowledgePage = () => import("./KnowledgePage");
const loadInstallPanel = () => import("../InstallPanel");

const AppearancePage = lazy(loadAppearancePage);
const BotSettingsPage = lazy(loadBotSettingsPage);
const KnowledgePage = lazy(loadKnowledgePage);
const InstallPanel = lazy(loadInstallPanel);

export default function BotDetailPage({ botId }) {
  const { selectedBot, setBots, setSelectedBotId } = useDashboard();
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab") || "knowledge";
  const currentPageLabel = botTabs.find((item) => item.value === tab)?.label || "Appearance";
  useEffect(() => {
    void Promise.all([
      loadAppearancePage(),
      loadBotSettingsPage(),
      loadKnowledgePage(),
      loadInstallPanel(),
    ]);
  }, []);
  const handleTabClick = (event, href) => {
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }

    event.preventDefault();
    window.history.pushState(null, "", href);
  };
  const handleDeleteBot = async () => {
    setDeleting(true);
    try {
      await deleteBot(botId);
      const nextBots = await getBots();
      setBots(nextBots.map(({ public_id, id, name, status }) => ({ id: public_id ?? id, name, status })));
      setSelectedBotId(nextBots[0]?.public_id ?? nextBots[0]?.id ?? "");
      toast("Bot deleted.");
      router.push("/dashboard/bots");
    } catch {
      toast("Bot could not be deleted.");
    } finally {
      setDeleting(false);
      setConfirmDelete(false);
    }
  };
  return (
    <div className="space-y-6">
      <PageHeader
        title={currentPageLabel}
        description={selectedBot?.name || "Bot details"}
      />
      <div className="flex gap-2 overflow-x-auto pb-1">
        {botTabs.map((item) => {
          const href = "/dashboard/bots/" + botId + "?tab=" + item.value;

          return (
            <Link
              key={item.value}
              aria-current={tab === item.value ? "page" : undefined}
              href={href}
              onClick={(event) => handleTabClick(event, href)}
              className={
                "shrink-0 rounded-full px-3 py-2 text-sm font-medium " +
                (tab === item.value
                  ? "bg-primary text-primary-foreground"
                  : "bg-card text-foreground ring-1 ring-border")
              }
            >
              {item.label}
            </Link>
          );
        })}
      </div>
      <Suspense fallback={<Skeleton className="h-96 w-full rounded-xl" />}>
        {tab === "knowledge" ? (
          <KnowledgePage key={botId} embedded />
        ) : tab === "settings" ? (
          <BotSettingsPage key={botId} onDelete={() => setConfirmDelete(true)} />
        ) : tab === "install" ? (
          <InstallPanel selectedBotId={botId} />
        ) : (
          <AppearancePage key={botId} />
        )}
      </Suspense>
      <DeleteBotDialog bot={confirmDelete ? selectedBot : null} deletingBot={deleting}
        onClose={() => setConfirmDelete(false)} onDelete={handleDeleteBot} />
    </div>
  );
}
