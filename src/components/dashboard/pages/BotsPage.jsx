"use client";

import { useCallback, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { deleteBot, getBots, toggleBotStatus } from "@/lib/api/bots.api";
import BotsPanel from "../BotsPanel";
import CreateBotDialog from "../CreateBotDialog";
import { useDashboard } from "../dashboard-context";
import useDashboardResource from "../useDashboardResource";

const EMPTY_BOTS = [];
const toBotOptions = (bots) => bots.map(({ id, name }) => ({ id, name }));

export default function BotsPage() {
  const {
    selectedBotId,
    selectBot,
    setBots: setDashboardBots,
    setSelectedBotId,
  } = useDashboard();
  const botsResource = useDashboardResource(getBots);
  const {
    data: botsData,
    loading: botsLoading,
    error: botsError,
    reload: loadBots,
    setData: setBots,
  } = botsResource;
  const bots = Array.isArray(botsData) ? botsData : EMPTY_BOTS;
  const [localOpen, setLocalOpen] = useState(false);
  const [botToDelete, setBotToDelete] = useState(null);
  const [deletingBot, setDeletingBot] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const fromQuery = searchParams.get("create") === "1";
  const setCreateDialogOpen = useCallback(
    (open) => {
      setLocalOpen(open);
      if (!open && fromQuery) router.replace("/dashboard/bots");
    },
    [fromQuery, router],
  );
  const onCreated = useCallback(
    (created, nextBots) => {
      setBots(nextBots);
      setDashboardBots(toBotOptions(nextBots));
      setSelectedBotId(created.id);
    },
    [setBots, setDashboardBots, setSelectedBotId],
  );
  const handleDelete = useCallback(async () => {
    if (!botToDelete) return;

    setDeletingBot(true);
    try {
      await deleteBot(botToDelete.id);
      const nextBots = await getBots();
      setBots(nextBots);
      setDashboardBots(toBotOptions(nextBots));
      if (selectedBotId === botToDelete.id) setSelectedBotId(nextBots[0]?.id || "");
      setBotToDelete(null);
      toast.success("Bot deleted.");
    } catch (error) {
      toast.error(error.message || "Bot could not be deleted.");
    } finally {
      setDeletingBot(false);
    }
  }, [
    botToDelete,
    selectedBotId,
    setBots,
    setDashboardBots,
    setSelectedBotId,
  ]);
  const handleToggleStatus = useCallback(
    async (bot) => {
      try {
        const result = await toggleBotStatus(bot.id);
        const returnedBot = result?.bot ?? result;
        const nextStatus =
          returnedBot?.status ?? (bot.status === "active" ? "paused" : "active");
        const nextBots = bots.map((item) =>
          String(item.id) === String(bot.id)
            ? { ...item, ...(returnedBot?.id ? returnedBot : {}), status: nextStatus }
            : item,
        );

        setBots(nextBots);
        setDashboardBots(toBotOptions(nextBots));
        toast.success(nextStatus === "active" ? "Bot resumed." : "Bot paused.");
      } catch (error) {
        toast.error(error.message || "Bot status could not be updated.");
        throw error;
      }
    },
    [bots, setBots, setDashboardBots],
  );
  return (
    <>
      <BotsPanel
        {...{
          bots,
          botsLoading,
          botsError,
          selectedBotId,
          selectBot,
          loadBots,
          setCreateDialogOpen,
          onDelete: setBotToDelete,
          onToggleStatus: handleToggleStatus,
        }}
      />
      <CreateBotDialog
        createDialogOpen={localOpen || fromQuery}
        setCreateDialogOpen={setCreateDialogOpen}
        onCreated={onCreated}
      />
      <Dialog
        open={Boolean(botToDelete)}
        onOpenChange={(open) => {
          if (!open && !deletingBot) setBotToDelete(null);
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete {botToDelete?.name}?</DialogTitle>
            <DialogDescription>
              This permanently removes the bot and its dashboard configuration.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              type="button"
              variant="secondary"
              disabled={deletingBot}
              onClick={() => setBotToDelete(null)}
            >
              Cancel
            </Button>
            <Button type="button" variant="destructive" disabled={deletingBot} onClick={handleDelete}>
              {deletingBot ? "Deleting…" : "Delete bot"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
