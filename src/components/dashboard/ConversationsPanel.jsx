"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ContactRound, Loader2, Search } from "lucide-react";
import { Badge, Button, Card, EmptyState, Input, Skeleton } from "@/components/ui";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";

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
  if (!conversation) {
    return <EmptyState title="No transcript" body="Select a conversation to view its details." />;
  }

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="border-b border-border p-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="font-semibold text-foreground">{conversation.visitor || "Visitor"}</h2>
          <Select
            value={conversation.status}
            onValueChange={onStatusChange}
            disabled={statusSaving}
          >
            <SelectTrigger aria-label="Update conversation status" className="w-44">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="open">Open</SelectItem>
              <SelectItem value="needs_followup">Needs follow-up</SelectItem>
              <SelectItem value="resolved">Resolved</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <p className="mt-1 text-xs text-muted-foreground">
          Started {new Date(conversation.createdAt).toLocaleString()} ·{" "}
          {conversation.messageUsage?.used ?? conversation.transcript?.length ?? 0}
          /{conversation.messageUsage?.limit ?? "—"} messages
          {conversation.messageUsage?.reached && (
            <span className="ml-2 font-medium text-destructive">Limit reached</span>
          )}
        </p>
      </div>
      <div className="min-h-0 flex-1 space-y-4 overflow-y-auto p-5">
        {conversation.transcript?.map((message, index) => (
          <div
            key={`${conversation.id}-${index}`}
            className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                message.role === "user"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-foreground"
              }`}
            >
              <p>{message.text}</p>
              <p
                className={`mt-1 text-[11px] ${message.role === "user" ? "text-primary-foreground/75" : "text-muted-foreground"}`}
              >
                {new Date(message.time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </p>
            </div>
          </div>
        ))}
        {conversation.lead && (
          <Card className="mt-6 p-4">
            <div className="flex items-center gap-2 font-semibold text-foreground">
              <ContactRound className="size-4 text-primary" />
              Lead captured
            </div>
            <dl className="mt-3 grid gap-2 text-sm sm:grid-cols-3">
              <div>
                <dt className="text-muted-foreground">Name</dt>
                <dd>{conversation.lead.name}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Email</dt>
                <dd className="break-all">{conversation.lead.email || "—"}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Phone</dt>
                <dd>{conversation.lead.phone || "—"}</dd>
              </div>
            </dl>
          </Card>
        )}
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
  page,
  nextPage,
  onPageChange,
}) {
  const [now] = useState(() => Date.now());
  const [mobileOpen, setMobileOpen] = useState(false);

  if (loading) {
    return (
      <div className="grid gap-4 lg:grid-cols-[380px_minmax(0,1fr)]">
        <Skeleton className="h-[600px] rounded-xl" />
        <Skeleton className="hidden h-[600px] rounded-xl lg:block" />
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
  if (!conversations.length && !query && status === "all" && range === "all" && page === 1 && !selectedId) {
    return (
      <EmptyState
        title="No conversations yet"
        body="Install your bot to start receiving chats."
        action={
          <Button asChild>
            <Link prefetch={false} href={`/dashboard/bots/${botId}?tab=install`}>
              Open Install tab
            </Link>
          </Button>
        }
      />
    );
  }

  return (
    <>
      <div className="grid min-h-[min(680px,calc(100vh-13rem))] min-w-0 gap-4 lg:h-[calc(100vh-13rem)] lg:grid-cols-[380px_minmax(0,1fr)]">
        <Card className="flex min-h-0 min-w-0 flex-col overflow-hidden p-0">
          <div className="space-y-3 border-b border-border p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                aria-label="Search conversations"
                placeholder="Search conversations"
                value={query}
                onChange={(event) => onQueryChange(event.target.value)}
                className="pl-9"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Select value={status} onValueChange={onStatusChange}>
                <SelectTrigger aria-label="Filter by status" className="w-full">
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
                <SelectTrigger aria-label="Filter by date" className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Any date</SelectItem>
                  <SelectItem value="7">Last 7 days</SelectItem>
                  <SelectItem value="30">Last 30 days</SelectItem>
                </SelectContent>
              </Select>
            </div>
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
            {conversations.map((item, index) => (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  onSelect(item.id);
                  if (window.matchMedia("(max-width: 1023px)").matches) setMobileOpen(true);
                }}
                className={`block w-full p-4 text-left transition-colors hover:bg-muted/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${selectedId === item.id ? "bg-accent/60" : ""}`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="truncate text-sm font-semibold text-foreground">
                    {item.visitor || `Visitor ${index + 1}`}
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
                    <ContactRound className="size-4 text-primary" aria-label="Lead captured" />
                  )}
                  <span className={`ml-auto text-xs ${item.messageUsage?.reached ? "font-medium text-destructive" : "text-muted-foreground"}`}>
                    {item.messageUsage?.used ?? 0}/{item.messageUsage?.limit ?? "—"}
                    {item.messageUsage?.reached ? " reached" : " messages"}
                  </span>
                </div>
              </button>
            ))}
            {!conversations.length && (
              <p className="p-6 text-center text-sm text-muted-foreground">
                No matching conversations.
              </p>
            )}
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
        <Card className="hidden min-h-0 min-w-0 overflow-hidden p-0 lg:block">
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
          className="w-full max-w-none gap-0 p-0 sm:max-w-none lg:hidden"
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
