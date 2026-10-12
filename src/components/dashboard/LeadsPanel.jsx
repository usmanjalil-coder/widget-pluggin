"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Download, MoreHorizontal, Search } from "lucide-react";
import { Badge, Button, Card, EmptyState, Input, Skeleton } from "@/components/ui";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

const statuses = ["all", "new", "confirmed", "done"];
const tone = (status) =>
  status === "done" ? "success" : status === "confirmed" ? "info" : "warning";
const relativeTime = (value, now) => {
  const days = Math.max(0, Math.floor((now - new Date(value).getTime()) / 86400000));
  return days === 0 ? "Today" : days === 1 ? "Yesterday" : `${days}d ago`;
};
const escapeCsv = (value) =>
  `"${String(value ?? "")
    .replace(/^[=+@-]/, "'$&")
    .replaceAll('"', '""')}"`;

function StatusSelect({ lead, onChange, saving }) {
  return (
    <div
      onClick={(event) => event.stopPropagation()}
      onKeyDown={(event) => event.stopPropagation()}
    >
      <Select
        value={lead.status}
        onValueChange={(value) => onChange(lead.id, value)}
        disabled={saving}
      >
        <SelectTrigger
          aria-label={`Status for ${lead.name}`}
          className="h-8 w-32 border-0 bg-transparent px-1 shadow-none"
        >
          <Badge tone={tone(lead.status)} className="capitalize">
            {lead.status}
          </Badge>
        </SelectTrigger>
        <SelectContent>
          {statuses.slice(1).map((status) => (
            <SelectItem key={status} value={status} className="capitalize">
              {status}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export default function LeadsPanel({ leads, loading, error, onRetry, onStatusChange }) {
  const [now] = useState(() => Date.now());
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");
  const [page, setPage] = useState(1);
  const [selectedId, setSelectedId] = useState(null);
  const [savingId, setSavingId] = useState(null);
  const counts = useMemo(
    () =>
      Object.fromEntries(
        statuses.map((item) => [
          item,
          item === "all" ? leads.length : leads.filter((lead) => lead.status === item).length,
        ]),
      ),
    [leads],
  );
  const filtered = useMemo(
    () =>
      leads.filter((lead) => {
        const matchesStatus = status === "all" || lead.status === status;
        const matchesQuery =
          `${lead.name} ${lead.email} ${lead.phone} ${lead.intent || lead.fields?.concern || ""}`
            .toLowerCase()
            .includes(query.toLowerCase());
        return matchesStatus && matchesQuery;
      }),
    [leads, status, query],
  );
  const pages = Math.max(1, Math.ceil(filtered.length / 10));
  const currentPage = Math.min(page, pages);
  const visible = filtered.slice((currentPage - 1) * 10, currentPage * 10);
  const selected = leads.find((lead) => lead.id === selectedId);
  const setLeadStatus = async (id, value) => {
    setSavingId(id);
    try {
      await onStatusChange(id, value);
    } finally {
      setSavingId(null);
    }
  };
  const exportCsv = () => {
    const rows = [
      ["Name", "Email", "Phone", "Interest", "Status", "Created"],
      ...filtered.map((lead) => [
        lead.name,
        lead.email,
        lead.phone,
        lead.intent || lead.fields?.concern,
        lead.status,
        lead.createdAt,
      ]),
    ];
    const blob = new Blob([rows.map((row) => row.map(escapeCsv).join(",")).join("\r\n")], {
      type: "text/csv;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "leads.csv";
    anchor.click();
    URL.revokeObjectURL(url);
  };

  if (loading)
    return (
      <Card className="space-y-4">
        {Array.from({ length: 6 }, (_, index) => (
          <Skeleton key={index} className="h-14 w-full" />
        ))}
      </Card>
    );
  if (error)
    return (
      <Card>
        <p className="text-destructive">{error}</p>
        <Button className="mt-4" onClick={onRetry}>
          Retry
        </Button>
      </Card>
    );
  if (!leads.length)
    return (
      <EmptyState
        title="No leads yet"
        body="Contact details captured by your bot will appear here."
      />
    );

  return (
    <>
      <Card className="min-w-0">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full lg:max-w-xs">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setPage(1);
              }}
              aria-label="Search leads"
              placeholder="Search leads"
              className="pl-9"
            />
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex max-w-full gap-1 overflow-x-auto">
              {statuses.map((item) => (
                <Button
                  key={item}
                  type="button"
                  size="sm"
                  variant={status === item ? "default" : "ghost"}
                  onClick={() => {
                    setStatus(item);
                    setPage(1);
                  }}
                  className="shrink-0 capitalize"
                >
                  {item} <span className="text-xs opacity-70">{counts[item]}</span>
                </Button>
              ))}
            </div>
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={exportCsv}
              disabled={!filtered.length}
            >
              <Download className="size-4" /> Export CSV
            </Button>
          </div>
        </div>
        <div className="mt-5 hidden overflow-x-auto md:block">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Interest / Intent</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="w-10">
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {visible.map((lead) => (
                <TableRow
                  key={lead.id}
                  tabIndex={0}
                  aria-label={`View lead ${lead.name}`}
                  className="cursor-pointer hover:bg-muted/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  onClick={() => setSelectedId(lead.id)}
                  onKeyDown={(event) => {
                    if (event.target !== event.currentTarget) return;
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      setSelectedId(lead.id);
                    }
                  }}
                >
                  <TableCell className="font-medium">{lead.name}</TableCell>
                  <TableCell>
                    <span className="block">{lead.email || "—"}</span>
                    <span className="text-xs text-muted-foreground">{lead.phone || "—"}</span>
                  </TableCell>
                  <TableCell>{lead.intent || lead.fields?.concern || "General inquiry"}</TableCell>
                  <TableCell>
                    <StatusSelect
                      lead={lead}
                      onChange={setLeadStatus}
                      saving={savingId === lead.id}
                    />
                  </TableCell>
                  <TableCell>
                    <span title={new Date(lead.createdAt).toLocaleString()}>
                      {relativeTime(lead.createdAt, now)}
                    </span>
                  </TableCell>
                  <TableCell onClick={(event) => event.stopPropagation()}>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button size="icon" variant="ghost" aria-label={`Actions for ${lead.name}`}>
                          <MoreHorizontal className="size-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onSelect={() => setSelectedId(lead.id)}>
                          View details
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="mt-5 space-y-3 md:hidden">
          {visible.map((lead) => (
            <Card key={lead.id} className="space-y-2 p-4">
              <button
                type="button"
                onClick={() => setSelectedId(lead.id)}
                className="w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <span className="block font-semibold text-foreground">{lead.name}</span>
                <span className="block break-all text-sm text-muted-foreground">
                  {lead.email || lead.phone || "No contact"}
                </span>
                <span className="block text-sm text-foreground">
                  {lead.intent || lead.fields?.concern || "General inquiry"}
                </span>
                <span
                  className="block text-xs text-muted-foreground"
                  title={new Date(lead.createdAt).toLocaleString()}
                >
                  {relativeTime(lead.createdAt, now)}
                </span>
              </button>
              <StatusSelect lead={lead} onChange={setLeadStatus} saving={savingId === lead.id} />
            </Card>
          ))}
        </div>
        {!filtered.length && (
          <EmptyState title="No leads found" body="Try another search or status." />
        )}
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4 text-sm text-muted-foreground">
          <span>
            Showing {filtered.length ? (currentPage - 1) * 10 + 1 : 0}–
            {Math.min(currentPage * 10, filtered.length)} of {filtered.length}
          </span>
          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              size="icon"
              aria-label="Previous page"
              disabled={currentPage === 1}
              onClick={() => setPage(currentPage - 1)}
            >
              <ChevronLeft className="size-4" />
            </Button>
            <span>
              {currentPage} / {pages}
            </span>
            <Button
              variant="secondary"
              size="icon"
              aria-label="Next page"
              disabled={currentPage === pages}
              onClick={() => setPage(currentPage + 1)}
            >
              <ChevronRight className="size-4" />
            </Button>
          </div>
        </div>
      </Card>
      <Sheet
        open={Boolean(selected)}
        onOpenChange={(open) => {
          if (!open) setSelectedId(null);
        }}
      >
        <SheetContent className="w-full overflow-y-auto p-6 sm:max-w-md">
          <SheetHeader className="p-0 pr-8">
            <SheetTitle>{selected?.name || "Lead details"}</SheetTitle>
            <SheetDescription>Contact and appointment request</SheetDescription>
          </SheetHeader>
          {selected && (
            <div className="space-y-5 text-sm">
              {[
                ["Email", selected.email || "—"],
                ["Phone", selected.phone || "—"],
                ["Interest", selected.intent || selected.fields?.concern || "General inquiry"],
                ["Source", selected.source || "Website widget"],
                ["Preferred time", selected.fields?.preferred_time || "—"],
                ["Notes", selected.notes || "No notes yet."],
              ].map(([label, value]) => (
                <div key={label}>
                  <p className="text-xs uppercase tracking-wide text-muted-foreground">{label}</p>
                  <p className="mt-1 break-all text-foreground">{value}</p>
                </div>
              ))}
              <div>
                <p className="mb-1 text-xs uppercase tracking-wide text-muted-foreground">Status</p>
                <StatusSelect
                  lead={selected}
                  onChange={setLeadStatus}
                  saving={savingId === selected.id}
                />
              </div>
              {selected.conversationId && (
                <Button asChild variant="secondary">
                  <Link
                    prefetch={false}
                    href={`/dashboard/conversations?conversation=${encodeURIComponent(selected.conversationId)}`}
                  >
                    View conversation
                  </Link>
                </Button>
              )}
            </div>
          )}
        </SheetContent>
      </Sheet>
    </>
  );
}
