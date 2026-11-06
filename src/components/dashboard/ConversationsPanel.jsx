"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ContactRound, Copy, Loader2, Search } from "lucide-react";
import { Badge, Button, Card, EmptyState, Input, Skeleton } from "@/components/ui";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { renderChatMessage } from "@/lib/render-chat-message";

const relativeTime = (value, now) => {
  const minutes = Math.max(0, Math.floor((now - new Date(value).getTime()) / 60000));
  if (minutes < 60) return `${minutes}m ago`;
  if (minutes < 1440) return `${Math.floor(minutes / 60)}h ago`;
  return `${Math.floor(minutes / 1440)}d ago`;
};

const statusLabel = {
  open: "Open",
  needs_followup: "Needs follow-up",
  resolved: "Resolved",
};
const statusTone = (status) =>
  status === "needs_followup" ? "warning" : status === "resolved" ? "success" : "info";
const conversationTitle = (item) => item?.lead?.name
  || item?.transcript?.find((message) => message.role === "user")?.text?.trim()
  || "Visitor";
const shortDateTime = (value) => new Date(value).toLocaleString(undefined, {
  month: "short", day: "numeric", hour: "numeric", minute: "2-digit",
});
const fullDateTime = (value) => new Date(value).toLocaleString(undefined, {
  dateStyle: "full", timeStyle: "medium",
});
const messageDay = (value) => new Date(value).toDateString();

function AssistantMessage({ text }) {
  const render = useCallback((node) => {
    if (node) renderChatMessage(node, text);
  }, [text]);

  return (
    <div
      ref={render}
      className="[&_p:not(:last-child)]:mb-2 [&_strong]:font-semibold [&_em]:italic [&_a]:font-medium [&_a]:underline [&_ul]:mt-[7px] [&_ul]:mb-[3px] [&_ul]:list-disc [&_ul]:pl-[18px]"
    />
  );
}

function Transcript({
  conversation,
  loading,
  error,
  onRetry,
  onStatusChange,
  statusSaving,
}) {
  if (loading) return <Skeleton className="m-5 h-[440px] rounded-xl" />;
  if (error) {
    return (
      <div className="p-5">
        <p className="text-sm text-destructive">{error}</p>
        <Button className="mt-3" onClick={onRetry}>Retry</Button>
      </div>
    );
  }
  if (!conversation) return <EmptyState title="Select a conversation" />;

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="shrink-0 border-b border-border p-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="min-w-0 flex-1 truncate font-semibold text-foreground" title={conversationTitle(conversation)}>
            {conversationTitle(conversation)}
          </h2>
          <div className="flex items-center gap-2">
            {conversation.status !== "resolved" && (
              <Button type="button" size="sm" variant="secondary" disabled={statusSaving}
                onClick={() => onStatusChange("resolved")}
              >Mark as resolved</Button>
            )}
            <Select value={conversation.status} onValueChange={onStatusChange} disabled={statusSaving}>
              <SelectTrigger aria-label="Update conversation status" className="w-40">
                <Badge tone={statusTone(conversation.status)}>
                  {statusLabel[conversation.status] || "Open"}
                </Badge>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="open">Open</SelectItem>
                <SelectItem value="needs_followup">Needs follow-up</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <p className="mt-1 text-xs text-muted-foreground" title={fullDateTime(conversation.createdAt)}>
          Started {shortDateTime(conversation.createdAt)} ·{" "}
          {conversation.messageUsage?.used ?? conversation.transcript?.length ?? 0} messages
          {conversation.messageUsage?.reached && (
            <span className="ml-2 font-medium text-destructive">· Message limit reached</span>
          )}
        </p>
        <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
          <span className="truncate" title={conversation.id}>ID: {conversation.id}</span>
          <button type="button" title="Copy conversation ID" aria-label="Copy conversation ID"
            className="rounded p-1 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            onClick={() => navigator.clipboard?.writeText(conversation.id).catch(() => {})}
          ><Copy className="size-3.5" /></button>
        </div>
      </div>
      {conversation.lead && (
        <div className="shrink-0 border-b border-border p-3">
          <div className="rounded-lg border border-border bg-muted/30 p-3 text-sm">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="font-semibold text-foreground">{conversation.lead.name || "Lead captured"}</span>
              <Link href="/dashboard/leads" className="text-xs font-medium text-primary underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">Open in Leads</Link>
            </div>
            <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
              {conversation.lead.phone && <a className="hover:text-primary hover:underline" href={`tel:${conversation.lead.phone}`}>{conversation.lead.phone}</a>}
              {conversation.lead.email && <a className="break-all hover:text-primary hover:underline" href={`mailto:${conversation.lead.email}`}>{conversation.lead.email}</a>}
            </div>
          </div>
        </div>
      )}
      <div className="min-h-0 flex-1 space-y-4 overflow-y-auto p-4">
        {conversation.transcript?.map((message, index) => (
          <div key={`${conversation.id}-${index}`}>
            {(index === 0 || messageDay(message.time) !== messageDay(conversation.transcript[index - 1].time)) && (
              <div className="my-4 text-center text-xs text-muted-foreground">
                {new Date(message.time).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}
              </div>
            )}
            <div className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed wrap-anywhere ${
                  message.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-foreground"
                }`}
              >
                {message.role === "assistant" ? <AssistantMessage text={message.text} /> : <p>{message.text}</p>}
                <p
                  className={`mt-1 text-[11px] ${message.role === "user" ? "text-primary-foreground" : "text-muted-foreground"}`}
                >
                  {new Date(message.time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ConversationsPanel({
  conversations,
  conversation,
  detailLoading,
  detailError,
  onDetailRetry,
  onConversationStatusChange,
  statusSaving,
  loading,
  refreshing,
  error,
  onRetry,
  botId,
  selectedId,
  onSelect,
  query,
  onQueryChange,
  status,
  onStatusChange,
  range,
  onRangeChange,
  onClearFilters,
  page,
  nextPage,
  onPageChange,
}) {
  const [now] = useState(() => Date.now());
  const [mobileOpen, setMobileOpen] = useState(false);
  const filtersActive = Boolean(query || status !== "all" || range !== "all");
  useEffect(() => {
    if (selectedId && window.innerWidth < 768) setMobileOpen(true);
    const closeOnDesktop = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };
    window.addEventListener("resize", closeOnDesktop);
    return () => window.removeEventListener("resize", closeOnDesktop);
  }, []);

  if (loading) {
    return (
      <div className="grid gap-4 md:min-h-0 md:flex-1 md:grid-cols-[minmax(300px,36%)_minmax(0,1fr)] md:grid-rows-[minmax(0,1fr)]">
        <Skeleton className="h-[600px] rounded-xl md:h-full" />
        <Skeleton className="hidden h-[600px] rounded-xl md:block md:h-full" />
      </div>
    );
  }
  if (error) {
    return (
      <Card>
        <p className="text-destructive">{error}</p>
        <Button className="mt-4" onClick={onRetry}>
          Retry
        </Button>
      </Card>
    );
  }
  return (
    <>
      <div className="grid min-h-[min(680px,calc(100dvh-13rem))] min-w-0 gap-4 md:min-h-0 md:flex-1 md:grid-cols-[minmax(300px,36%)_minmax(0,1fr)] md:grid-rows-[minmax(0,1fr)]">
        <Card className="flex min-h-0 min-w-0 flex-col overflow-hidden p-0">
          <div className="border-b border-border p-3">
            <div className="flex flex-wrap gap-2">
            <div className="relative min-w-[150px] flex-1">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                aria-label="Search conversations"
                placeholder="Search conversations"
                value={query}
                onChange={(event) => onQueryChange(event.target.value)}
                className="pl-9"
              />
            </div>
            <div className="flex gap-2">
              <Select value={status} onValueChange={onStatusChange}>
                <SelectTrigger aria-label="Filter by status" className="w-[132px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All statuses</SelectItem>
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="needs_followup">Needs follow-up</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                </SelectContent>
              </Select>
              <Select value={range} onValueChange={onRangeChange}>
                <SelectTrigger aria-label="Filter by date" className="w-[112px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Any date</SelectItem>
                  <SelectItem value="7">Last 7 days</SelectItem>
                  <SelectItem value="30">Last 30 days</SelectItem>
                </SelectContent>
              </Select>
            </div>
            </div>
            {filtersActive && (
              <button type="button" onClick={onClearFilters}
                className="mt-2 text-xs text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >Clear filters</button>
            )}
            {refreshing && (
              <span
                role="status"
                className="inline-flex items-center gap-1.5 text-xs text-muted-foreground"
              >
                <Loader2 className="size-3.5 animate-spin" aria-hidden="true" />
                Updating…
              </span>
            )}
          </div>
          <div className="min-h-0 flex-1 divide-y divide-border overflow-y-auto">
            {conversations.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  onSelect(item.id);
                  if (window.matchMedia("(max-width: 767px)").matches) setMobileOpen(true);
                }}
                className={`block w-full p-4 text-left transition-colors hover:bg-muted/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${selectedId === item.id ? "bg-primary/10 shadow-[inset_3px_0_0_var(--primary)] hover:bg-primary/15" : ""}`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="min-w-0 truncate text-sm font-semibold text-foreground">
                    {conversationTitle(item.id === conversation?.id ? conversation : item)}
                  </span>
                  <span className="shrink-0 text-xs text-muted-foreground">
                    {relativeTime(item.createdAt, now)}
                  </span>
                </div>
                <p className="mt-1 truncate text-sm text-muted-foreground">{item.preview}</p>
                <div className="mt-2 flex items-center gap-2">
                  <Badge tone={statusTone(item.status)}>
                    {statusLabel[item.status] || "Open"}
                  </Badge>
                  {item.hasLead && (
                    <span title="Lead captured"><Badge tone="info" className="gap-1">
                      <ContactRound className="size-3" aria-hidden="true" /> Lead
                    </Badge></span>
                  )}
                  <span className={`ml-auto text-xs ${item.messageUsage?.reached ? "font-medium text-destructive" : "text-muted-foreground"}`}>
                    {item.messageUsage?.reached
                      ? "Limit reached"
                      : `${item.messageUsage?.used ?? 0}/${item.messageUsage?.limit ?? "—"} messages`}
                  </span>
                </div>
              </button>
            ))}
            {!conversations.length && (filtersActive || page > 1
              ? <EmptyState title="No results" body="Try changing or clearing your filters." />
              : <EmptyState title="No conversations yet"
                  body="Conversations will appear here once visitors chat with your bot."
                  action={<Button asChild><Link href={`/dashboard/bots/${botId}?tab=install`}>Open Install tab</Link></Button>}
                />)}
          </div>
          <div className="flex items-center justify-between border-t border-border px-4 py-3 text-sm">
            <Button variant="outline" size="sm" disabled={page <= 1} onClick={() => onPageChange(page - 1)}>
              Previous
            </Button>
            <span className="text-muted-foreground">Page {page}</span>
            <Button variant="outline" size="sm" disabled={!nextPage} onClick={() => onPageChange(nextPage)}>
              Next
            </Button>
          </div>
        </Card>
        <Card className="hidden min-h-0 min-w-0 overflow-hidden p-0 md:block">
          <Transcript
            conversation={conversation}
            loading={detailLoading}
            error={detailError}
            onRetry={onDetailRetry}
            onStatusChange={onConversationStatusChange}
            statusSaving={statusSaving}
          />
        </Card>
      </div>
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent
          side="right"
          className="w-full max-w-none gap-0 p-0 sm:max-w-none md:hidden"
          showCloseButton={false}
        >
          <SheetHeader className="sr-only">
            <SheetTitle>Conversation transcript</SheetTitle>
          </SheetHeader>
          <Button variant="ghost" onClick={() => setMobileOpen(false)} className="m-3 w-fit">
            <ArrowLeft className="size-4" /> Back
          </Button>
          <div className="min-h-0 flex-1">
            <Transcript
              conversation={conversation}
              loading={detailLoading}
              error={detailError}
              onRetry={onDetailRetry}
              onStatusChange={onConversationStatusChange}
              statusSaving={statusSaving}
            />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
