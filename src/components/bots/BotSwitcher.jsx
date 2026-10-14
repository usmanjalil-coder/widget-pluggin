"use client";

import { memo, useState } from "react";
import { Check, ChevronDown, Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import BotAvatar from "./BotAvatar";
import { cn } from "@/lib/utils";

function BotSwitcher({ bots = [], selectedId, onSelect, onCreate, onViewAll, triggerClassName }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const selected = bots.find((bot) => String(bot.public_id ?? bot.id) === String(selectedId)) || bots[0];
  const visible = bots.filter((bot) =>
    `${bot.name} ${bot.public_id ?? bot.id}`.toLowerCase().includes(query.toLowerCase()),
  );
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn("max-w-[230px] justify-between gap-2", triggerClassName)}
          aria-label={`Current bot: ${selected?.name || "none"}${selected?.status ? `, ${selected.status}` : ""}. Switch bot`}
        >
          <BotAvatar bot={selected} className="size-8" />
          <span className="min-w-0 truncate text-sm">{selected?.name || "Select bot"}</span>
          <span
            title={selected?.status || "Status unavailable"}
            aria-hidden="true"
            className={`size-1.5 shrink-0 rounded-full ${selected?.status === "active" ? "bg-success" : "bg-muted-foreground"}`}
          />
          <ChevronDown className="size-3.5 shrink-0 text-muted-foreground" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-72 p-1">
        {bots.length > 6 && (
          <div className="relative p-2">
            <Search className="absolute top-4 left-4 size-4 text-muted-foreground" />
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search bots"
              className="pl-8"
              aria-label="Search bots"
            />
          </div>
        )}
        <div role="listbox" aria-label="Bots" className="max-h-64 overflow-y-auto p-1">
          {visible.map((bot) => (
            <button
              key={bot.public_id ?? bot.id}
              type="button"
              role="option"
              aria-selected={String(bot.public_id ?? bot.id) === String(selectedId)}
              className="flex w-full items-center gap-2 rounded-md px-2 py-2 text-left text-sm hover:bg-accent"
              onClick={() => {
                if (onSelect(bot.public_id ?? bot.id) !== false) setOpen(false);
              }}
            >
              <BotAvatar bot={bot} className="size-8" />
              <span className="min-w-0 flex-1 truncate">{bot.name}</span>
              <span
                title={bot.status || "Status unavailable"}
                aria-hidden="true"
                className={`size-1.5 shrink-0 rounded-full ${bot.status === "active" ? "bg-success" : "bg-muted-foreground"}`}
              />
              <span className="sr-only">{bot.status || "Status unavailable"}</span>
              {String(bot.public_id ?? bot.id) === String(selectedId) && <Check className="size-4 text-primary" />}
            </button>
          ))}
          {!visible.length && <p className="p-3 text-sm text-muted-foreground">No bots found.</p>}
        </div>
        <div className="border-t border-border p-1">
          <button
            type="button"
            className="flex w-full items-center gap-2 rounded-md px-2 py-2 text-sm hover:bg-accent"
            onClick={() => {
              setOpen(false);
              onCreate();
            }}
          >
            <Plus className="size-4" /> Create bot
          </button>
          <button
            type="button"
            className="flex w-full items-center gap-2 rounded-md px-2 py-2 text-sm hover:bg-accent"
            onClick={() => {
              setOpen(false);
              onViewAll();
            }}
          >
            View all bots
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default memo(BotSwitcher);
