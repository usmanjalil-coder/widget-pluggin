"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import {
  ChevronLeft,
  ChevronRight,
  Download,
  Mail,
  Loader2,
  MoreHorizontal,
  Phone,
  Search,
} from "lucide-react";
import { Button, Card, EmptyState, Input, Skeleton } from "@/components/ui";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";
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
const relativeTime = (value, now) => {
  const days = Math.max(0, Math.floor((now - new Date(value).getTime()) / 86400000));
  return days === 0 ? "Today" : days === 1 ? "Yesterday" : `${days}d ago`;
};
const fullDate = (value) => value ? new Date(value).toLocaleString() : "";
const shortDate = (value) => value ? new Date(value).toLocaleString(undefined, {
  month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "2-digit",
}) : "";
const preferredDate = (value) => {
  if (!value) return { label: "Preferred date", value: "—" };
  const dateOnly = /^\d{4}-\d{2}-\d{2}$/.test(value);
  const date = new Date(dateOnly ? `${value}T00:00:00` : value);
  if (Number.isNaN(date.getTime())) return { label: "Preferred time", value };
  return {
    label: dateOnly ? "Preferred date" : "Preferred time",
    value: date.toLocaleString(undefined, {
      month: "short", day: "numeric", year: "numeric",
      ...(!dateOnly ? { hour: "numeric", minute: "2-digit" } : {}),
    }),
  };
};
const sourceLabel = (value) => value === "widget" ? "Chat widget" : value
  ? value.charAt(0).toUpperCase() + value.slice(1) : "—";
const escapeCsv = (value) =>
  `"${String(value ?? "")
    .replace(/^(\s*[=+@-])/, "'$1")
    .replaceAll('"', '""')}"`;

function Contact({ lead }) {
  if (!lead.email && !lead.phone) {
    return <span className="text-sm text-muted-foreground">No contact info</span>;
  }
  return <div className="space-y-1 text-sm">
    {lead.email && <a href={`mailto:${lead.email}`}
      className="flex items-center gap-1.5 break-all hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
      <Mail className="size-3.5 shrink-0" aria-hidden="true" />{lead.email}
    </a>}
    {lead.phone && <a href={`tel:${lead.phone}`}
      className="flex items-center gap-1.5 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
      <Phone className="size-3.5 shrink-0" aria-hidden="true" />{lead.phone}
    </a>}
  </div>;
}

function LeadName({ lead }) {
  return <span className={lead.status === "new" ? "inline-flex items-center gap-2 font-semibold" : "font-medium"}>
    {lead.status === "new" && <span className="size-2 shrink-0 rounded-full bg-primary" aria-hidden="true" />}
    {lead.name}
  </span>;
}

function StatusSelect({ lead, onChange, saving }) {
  return (
    <div data-no-row-click>
      <NativeSelect
        value={lead.status}
        onChange={(event) => onChange(lead.id, event.target.value)}
        disabled={saving}
        aria-label={`Status for ${lead.name}`}
        size="sm"
        className="w-32 cursor-pointer capitalize bg-card font-medium"
      >
        {statuses.slice(1).map((status) => (
          <NativeSelectOption key={status} value={status}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </NativeSelectOption>
        ))}
      </NativeSelect>
    </div>
  );
}

export default function LeadsPanel({
  leadCaptureEnabled = true,
  installHref,
  leads,
  counts,
  pagination,
  loading,
  refreshing,
  error,
  onRetry,
  query,
  onQueryChange,
  status,
  onFilterChange,
  page,
  onPageChange,
  selectedId,
  onSelect,
  onClose,
  selected,
  detailLoading,
  detailError,
  onDetailRetry,
  onStatusChange,
  onExport,
}) {
  const [now] = useState(() => Date.now());
  const [savingId, setSavingId] = useState(null);
  const [exporting, setExporting] = useState(false);
  const returnFocusRef = useRef(null);
  const openLead = (id, event) => {
    returnFocusRef.current = event.currentTarget;
    onSelect(id);
  };
  const selectedSummary = leads.find((lead) => lead.id === selectedId);
  const selectedCreatedAt = selectedSummary?.createdAt;
  const appointment = preferredDate(selected?.preferredTime);
  const pages = pagination?.pages ?? 1;
  const setLeadStatus = async (id, value) => {
    setSavingId(id);
    try {
      await onStatusChange(id, value);
    } finally {
      setSavingId(null);
    }
  };
  const exportCsv = async () => {
    setExporting(true);
    try {
      const exported = await onExport();
      const rows = [
        ["Name", "Email", "Phone", "Interest", "Status", "Created"],
        ...exported.map((lead) => [
          lead.name,
          lead.email,
          lead.phone,
          lead.interest,
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
    } catch (requestError) {
      toast.error(requestError.message || "Could not export leads.");
    } finally {
      setExporting(false);
    }
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
  if (!leads.length && !query && status === "all" && page === 1 && !counts?.all)
    return (
      <EmptyState
        title="No leads yet"
        body="Leads captured by your bot will appear here."
        action={<Button asChild><Link href={installHref}>Open Install</Link></Button>}
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
              onChange={(event) => onQueryChange(event.target.value)}
              aria-label="Search leads"
              placeholder="Search leads"
              className="pl-9"
            />
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {refreshing && (
              <span
                role="status"
                className="inline-flex items-center gap-1.5 text-xs text-muted-foreground"
              >
                <Loader2 className="size-3.5 animate-spin" aria-hidden="true" />
                Updating…
              </span>
            )}
            <div className="flex max-w-full gap-1 overflow-x-auto">
              {statuses.map((item) => (
                <Button
                  key={item}
                  type="button"
                  size="sm"
                  variant={status === item ? "default" : "ghost"}
                  onClick={() => onFilterChange(item)}
                  className="shrink-0 capitalize"
                >
                  {item} <span className="text-xs opacity-70">{counts?.[item] ?? 0}</span>
                </Button>
              ))}
            </div>
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={exportCsv}
              disabled={!pagination?.total || exporting}
            >
              <Download className="size-4" /> {exporting ? "Exporting…" : "Export CSV"}
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
              {leads.map((lead) => (
                <TableRow
                  key={lead.id}
                  tabIndex={0}
                  aria-label={`View lead ${lead.name}`}
                  className="cursor-pointer hover:bg-muted/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  onClick={(event) => {
                    if (event.target.closest('a, button, select, [role="combobox"], [role="menu"], [role="menuitem"], [role="option"], [data-no-row-click]')) return;
                    openLead(lead.id, event);
                  }}
                  onKeyDown={(event) => {
                    if (event.target !== event.currentTarget) return;
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      openLead(lead.id, event);
                    }
                  }}
                >
                  <TableCell><LeadName lead={lead} /></TableCell>
                  <TableCell>
                    <Contact lead={lead} />
                  </TableCell>
                  <TableCell>{lead.interest || "General inquiry"}</TableCell>
                  <TableCell>
                    <StatusSelect
                      lead={lead}
                      onChange={setLeadStatus}
                      saving={savingId === lead.id}
                    />
                  </TableCell>
                  <TableCell>
                    <span title={fullDate(lead.createdAt)}>
                      {relativeTime(lead.createdAt, now)}
                    </span>
                  </TableCell>
                  <TableCell data-no-row-click>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button size="icon" variant="ghost" aria-label={`Actions for ${lead.name}`}
                          onClick={(event) => { returnFocusRef.current = event.currentTarget.closest("tr"); }}
                          onFocus={(event) => { returnFocusRef.current = event.currentTarget.closest("tr"); }}>
                          <MoreHorizontal className="size-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onSelect={() => onSelect(lead.id)}>
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
          {leads.map((lead) => (
            <Card key={lead.id} className="space-y-2 p-4">
              <button
                type="button"
                onClick={(event) => openLead(lead.id, event)}
                className="w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <LeadName lead={lead} />
                <span className="block text-sm text-foreground">
                  {lead.interest || "General inquiry"}
                </span>
                <span
                  className="block text-xs text-muted-foreground"
                  title={fullDate(lead.createdAt)}
                >
                  {relativeTime(lead.createdAt, now)}
                </span>
              </button>
              <Contact lead={lead} />
              <StatusSelect lead={lead} onChange={setLeadStatus} saving={savingId === lead.id} />
            </Card>
          ))}
        </div>
        {!leads.length && (
          <EmptyState title="No leads match" body="Try another search or status."
            action={<Button variant="link" onClick={() => { onQueryChange(""); onFilterChange("all"); }}>Clear filters</Button>} />
        )}
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4 text-sm text-muted-foreground">
          <span>
            Showing {pagination?.from ?? 0}–{pagination?.to ?? 0} of {pagination?.total ?? 0}
          </span>
          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              size="icon"
              aria-label="Previous page"
              disabled={page <= 1}
              onClick={() => onPageChange(page - 1)}
            >
              <ChevronLeft className="size-4" />
            </Button>
            <span>
              {page} / {pages}
            </span>
            <Button
              variant="secondary"
              size="icon"
              aria-label="Next page"
              disabled={page >= pages}
              onClick={() => onPageChange(page + 1)}
            >
              <ChevronRight className="size-4" />
            </Button>
          </div>
        </div>
      </Card>
      <Sheet
        open={Boolean(selectedId)}
        onOpenChange={(open) => {
          if (!open) onClose();
        }}
      >
        <SheetContent className="w-full overflow-y-auto p-6 sm:max-w-md"
          onCloseAutoFocus={(event) => {
            if (returnFocusRef.current?.isConnected) {
              event.preventDefault();
              returnFocusRef.current.focus();
            }
          }}>
          <SheetHeader className="p-0 pr-8">
            <SheetTitle>{selected?.name || "Lead details"}</SheetTitle>
            <SheetDescription title={fullDate(selectedCreatedAt)}>
              {selectedCreatedAt ? `Created ${shortDate(selectedCreatedAt)}` : "Contact and appointment request"}
            </SheetDescription>
          </SheetHeader>
          {detailLoading && <Skeleton className="h-72 w-full rounded-xl" />}
          {detailError && (
            <div>
              <p className="text-sm text-destructive">{detailError}</p>
              <Button className="mt-3" onClick={onDetailRetry}>Retry</Button>
            </div>
          )}
          {selected && !detailError && (
            <div className="space-y-5 text-sm">
              <div className="flex flex-wrap gap-2">
                {selected.phone && <Button asChild size="sm" variant="secondary"><a href={`tel:${selected.phone}`}><Phone className="size-4" />Call</a></Button>}
                {selected.email && <Button asChild size="sm" variant="secondary"><a href={`mailto:${selected.email}`}><Mail className="size-4" />Email</a></Button>}
                {selected.phone && <Button size="sm" variant="secondary" onClick={async () => {
                  try { await navigator.clipboard.writeText(selected.phone); toast.success("Phone copied."); }
                  catch { toast.error("Could not copy phone."); }
                }}>Copy phone</Button>}
              </div>
              {[
                ["Email", selected.email || "—"],
                ["Phone", selected.phone || "—"],
                ["Interest", selected.interest || "General inquiry"],
                ["Source", sourceLabel(selected.source)],
                [appointment.label, appointment.value],
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
                <Button asChild>
                  <Link
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
