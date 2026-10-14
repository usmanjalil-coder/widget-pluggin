"use client";

import { useMemo, useState } from "react";
import { Plus, Search } from "lucide-react";
import { Button, Card, EmptyState, Input, Skeleton } from "@/components/ui";
import PageHeader from "@/components/shared/PageHeader";
import BotCard from "@/components/bots/BotCard";

export default function BotsPanel({
  bots,
  botsLoading,
  botsError,
  selectedBotId,
  selectBot,
  loadBots,
  setCreateDialogOpen,
  onDelete,
  onToggleStatus,
}) {
  const [botSearch, setBotSearch] = useState("");
  const visibleBots = useMemo(() => {
    const query = botSearch.trim().toLowerCase();
    return query ? bots.filter((item) => item.name.toLowerCase().includes(query)) : bots;
  }, [bots, botSearch]);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Bots"
        description="Create and manage your chatbots."
        actions={
          <Button type="button" onClick={() => setCreateDialogOpen(true)}>
            <Plus className="size-4" />
            Create bot
          </Button>
        }
      />
      {bots.length > 6 && (
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={botSearch}
            onChange={(event) => setBotSearch(event.target.value)}
            placeholder="Search bots by name"
            aria-label="Search bots by name"
            className="pl-9"
          />
        </div>
      )}
      {botsLoading ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3 xl:gap-6">
          {Array.from({ length: 3 }, (_, index) => (
            <Card key={index} className="space-y-5">
              <div className="flex gap-3">
                <Skeleton className="size-10 rounded-lg" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-2/3" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
              </div>
              <Skeleton className="h-16 w-full" />
              <Skeleton className="h-8 w-full" />
            </Card>
          ))}
        </div>
      ) : botsError ? (
        <Card className="border-destructive/20">
          <p className="font-medium text-destructive">{botsError}</p>
          <Button type="button" variant="secondary" className="mt-4" onClick={loadBots}>
            Retry
          </Button>
        </Card>
      ) : !bots.length ? (
        <EmptyState
          title="No bots yet"
          body="Create your first bot to get started"
          action={
            <Button type="button" onClick={() => setCreateDialogOpen(true)}>
              <Plus className="size-4" />
              Create bot
            </Button>
          }
        />
      ) : !visibleBots.length ? (
        <EmptyState title="No matching bots" body="Try a different name." />
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3 xl:gap-6">
          {visibleBots.map((item) => (
            <BotCard
              key={item.id}
              bot={item}
              current={item.id === selectedBotId}
              onSwitch={selectBot}
              onDelete={onDelete}
              onToggleStatus={onToggleStatus}
            />
          ))}
        </div>
      )}
    </div>
  );
}
