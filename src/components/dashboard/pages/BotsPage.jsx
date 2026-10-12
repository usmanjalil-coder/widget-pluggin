"use client";

import { useCallback, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
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
        }}
      />
      <CreateBotDialog
        createDialogOpen={localOpen || fromQuery}
        setCreateDialogOpen={setCreateDialogOpen}
        onCreated={onCreated}
      />
    </>
  );
}
