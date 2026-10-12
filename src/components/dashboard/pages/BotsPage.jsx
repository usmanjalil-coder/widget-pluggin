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
import { deleteBot, getBots } from "@/lib/api/bots.api";
import BotsPanel from "../BotsPanel";
import CreateBotDialog from "../CreateBotDialog";
import { useDashboard } from "../dashboard-context";

export default function BotsPage() {
  const {
    bots,
    botsLoading,
    botsError,
    selectedBotId,
    selectBot,
    loadBots,
    setBots,
    setSelectedBotId,
  } = useDashboard();
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
      setSelectedBotId(created.id);
    },
    [setBots, setSelectedBotId],
  );
  const handleDelete = useCallback(async () => {
    if (!botToDelete) return;

    setDeletingBot(true);
    try {
      await deleteBot(botToDelete.id);
      const nextBots = await getBots();
      setBots(nextBots);
      if (selectedBotId === botToDelete.id) setSelectedBotId(nextBots[0]?.id || "");
      setBotToDelete(null);
      toast.success("Bot deleted.");
    } catch (error) {
      toast.error(error.message || "Bot could not be deleted.");
    } finally {
      setDeletingBot(false);
    }
  }, [botToDelete, selectedBotId, setBots, setSelectedBotId]);
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
