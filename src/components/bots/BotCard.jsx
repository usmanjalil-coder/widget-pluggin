"use client";

import { memo } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { Copy, MessageSquare, MoreHorizontal, Trash2, Users } from "lucide-react";
import { Badge, Button } from "@/components/ui";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import BotAvatar from "./BotAvatar";
import StatusBadge from "./StatusBadge";

function relativeTime(value) {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  const minutes = Math.max(0, Math.floor((Date.now() - date.getTime()) / 60000));
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes}m ago`;
  if (minutes < 1440) return `${Math.floor(minutes / 60)}h ago`;
  return `${Math.floor(minutes / 1440)}d ago`;
}

function BotCard({ bot, current, onSwitch, onDelete }) {
  const href = `/dashboard/bots/${encodeURIComponent(bot.id)}?tab=appearance`;
  const menus = [
    ["Open", href],
    ["Appearance", href],
    ["Knowledge Base", `/dashboard/bots/${encodeURIComponent(bot.id)}?tab=knowledge`],
    ["Settings", `/dashboard/bots/${encodeURIComponent(bot.id)}?tab=settings`],
    ["Install", `/dashboard/bots/${encodeURIComponent(bot.id)}?tab=install`],
  ];
  const copyId = async (event) => {
    event.stopPropagation();
    try {
      await navigator.clipboard.writeText(bot.id);
      toast.success("Copied");
    } catch {
      toast.error("Could not copy bot ID");
    }
  };
  return (
    <article
      className={`group relative flex min-w-0 flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-[border-color,box-shadow] duration-150 hover:border-primary/30 hover:shadow-md focus-within:border-primary/30 focus-within:shadow-md ${current ? "ring-1 ring-primary/40" : ""}`}
    >
      {current && (
        <div
          className="absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-accent to-transparent"
          aria-hidden="true"
        />
      )}
      <Link
        prefetch={false}
        href={href}
        className="absolute inset-0 z-0 rounded-xl focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-ring"
        aria-label={`Open ${bot.name} Appearance`}
      />
      <div className="relative z-10 flex min-w-0 items-start gap-3 p-5 pointer-events-none">
        <BotAvatar bot={bot} />
        <div className="min-w-0 flex-1">
          <h2 className="truncate text-sm font-semibold text-foreground" title={bot.name}>
            {bot.name}
          </h2>
          <div className="mt-1 flex min-w-0 items-center gap-1">
            <span
              className="min-w-0 truncate font-mono text-xs text-muted-foreground"
              title={bot.id}
            >
              {bot.id}
            </span>
            <Button
              type="button"
              size="icon"
              variant="ghost"
              className="pointer-events-auto size-6 shrink-0 text-muted-foreground"
              aria-label={`Copy ${bot.name} bot ID`}
              onClick={copyId}
            >
              <Copy className="size-3.5" />
            </Button>
          </div>
        </div>
        <div className="pointer-events-auto flex shrink-0 items-start gap-1">
          <StatusBadge status={bot.status} />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="size-7"
                aria-label="Bot actions"
                onClick={(event) => event.stopPropagation()}
              >
                <MoreHorizontal className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {menus.map(([label, link]) => (
                <DropdownMenuItem key={label} asChild>
                  <Link prefetch={false} href={link}>
                    {label}
                  </Link>
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem
                variant="destructive"
                onSelect={(event) => {
                  event.preventDefault();
                  onDelete(bot);
                }}
              >
                <Trash2 className="size-4" />
                Delete bot
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="pointer-events-none relative z-0 mx-5 grid grid-cols-[1fr_auto_1fr] items-center gap-4 border-t border-border py-5">
        <div className="flex min-w-0 items-center gap-2">
          <MessageSquare className="size-4 shrink-0 text-muted-foreground" />
          <div>
            <p className="text-lg font-semibold tabular-nums leading-6 text-foreground">
              {bot?.conversations_count ?? "—"}
            </p>
            <p className="text-xs text-muted-foreground">Conversations</p>
          </div>
        </div>
        <span className="h-9 w-px bg-border" aria-hidden="true" />
        <div className="flex min-w-0 items-center gap-2">
          <Users className="size-4 shrink-0 text-muted-foreground" />
          <div>
            <p className="text-lg font-semibold tabular-nums leading-6 text-foreground">
              {bot?.leads_count ?? "—"}
            </p>
            <p className="text-xs text-muted-foreground">Leads</p>
          </div>
        </div>
      </div>
      <div className="relative z-10 mt-auto flex min-h-16 items-center justify-between gap-2 border-t border-border px-5 py-3 pointer-events-none">
        <span className="min-w-0 truncate text-xs text-muted-foreground">
          {bot?.last_activity ? `Last active ${relativeTime(bot?.last_activity)}` : ""}
        </span>
        {current ? (
          <Badge tone="info" className="shrink-0">
            Current
          </Badge>
        ) : (
          <Button
            type="button"
            size="sm"
            variant="ghost"
            className="pointer-events-auto shrink-0"
            onClick={(event) => {
              event.stopPropagation();
              onSwitch(bot.id);
            }}
          >
            Switch to this bot
          </Button>
        )}
      </div>
    </article>
  );
}

export default memo(BotCard);
