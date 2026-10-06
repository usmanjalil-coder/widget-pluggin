"use client";

import { useEffect, useMemo, useState } from "react";
import {
  AlertCircle, FileText, FileUp, Globe, LoaderCircle, MoreHorizontal,
  Plus, RotateCw, Search, Trash2, Type,
} from "lucide-react";
import { toast } from "sonner";
import { Badge, Button, Card, EmptyState, Input, Skeleton } from "@/components/ui";
import CharLimitInput from "@/components/shared/CharLimitInput";
import PageHeader from "@/components/shared/PageHeader";
import StatCard from "@/components/shared/StatCard";
import StatusBadge from "@/components/bots/StatusBadge";
import { TEXT_LIMITS } from "@/lib/limits";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const typeDetails = {
  file: { label: "File", icon: FileText },
  url: { label: "URL", icon: Globe },
  text: { label: "Text", icon: Type },
};
const relativeTime = (value) => {
  const minutes = Math.max(0, Math.floor((Date.now() - new Date(value).getTime()) / 60000));
  if (minutes < 60) return minutes + "m ago";
  if (minutes < 1440) return Math.floor(minutes / 60) + "h ago";
  return Math.floor(minutes / 1440) + "d ago";
};

export default function KnowledgeBasePanel({
  botId, documents, loading, error, onReload, onAdd, onUpdate, onDelete,
}) {
  const [dialog, setDialog] = useState("");
  const [url, setUrl] = useState("");
  const [faqTitle, setFaqTitle] = useState("");
  const [faqText, setFaqText] = useState("");
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [saving, setSaving] = useState(false);
  const filtered = useMemo(() => documents.filter((item) => {
    const queryMatches = item.name.toLowerCase().includes(query.toLowerCase());
    return queryMatches && (status === "all" || item.status === status);
  }), [documents, query, status]);
  const ready = documents.filter((item) => item.status === "ready").length;
  const attention = documents.filter((item) => item.status === "processing" || item.status === "failed").length;

  useEffect(() => {
    if (!documents.some((item) => item.status === "processing")) return undefined;
    const timer = setInterval(onReload, 3000);
    return () => clearInterval(timer);
  }, [documents, onReload]);

  const add = async (payload) => {
    setSaving(true);
    try {
      await onAdd(payload);
      setDialog("");
      setUrl("");
      setFaqTitle("");
      setFaqText("");
      toast.success("Source added. We are preparing it now.");
    } catch (nextError) {
      toast.error(nextError.message || "Could not add this source.");
    } finally {
      setSaving(false);
    }
  };
  const iconFor = (type) => typeDetails[type] || typeDetails.file;
  const actions = (compact = false) => <DropdownMenu>
    <DropdownMenuTrigger asChild><Button type="button" variant={compact ? "secondary" : "default"} size="sm"><Plus className="size-4" />Add content</Button></DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuItem onSelect={() => setDialog("url")}><Globe />Website URL</DropdownMenuItem>
      <DropdownMenuItem onSelect={() => setDialog("file")}><FileUp />Upload files</DropdownMenuItem>
      <DropdownMenuItem onSelect={() => setDialog("text")}><Type />Paste text / FAQ</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>;

  if (loading) return <div className="space-y-6"><div className="grid gap-4 md:grid-cols-3">{[1, 2, 3].map((item) => <Skeleton key={item} className="h-28 rounded-xl" />)}</div><Skeleton className="h-80 rounded-xl" /></div>;
  if (error) return <Card><p className="text-destructive">{error}</p><Button className="mt-4" onClick={onReload}>Retry</Button></Card>;

  return <div className="space-y-6">
    <PageHeader title="Knowledge Base" description="What your assistant knows. Add content so it can answer accurately." actions={actions()} />
    <div className="grid gap-4 sm:grid-cols-3">
      <StatCard label="Sources" value={documents.length} icon={FileText} description="All content sources" />
      <StatCard label="Ready" value={ready} icon={Globe} description="Available to answer from" />
      <StatCard label="Needs attention" value={attention} icon={AlertCircle} description="Processing or failed" />
    </div>
    {documents.length ? <>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-sm"><Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" /><Input value={query} onChange={(event) => setQuery(event.target.value)} className="pl-9" placeholder="Search sources" aria-label="Search sources" /></div>
        <Select value={status} onValueChange={setStatus}><SelectTrigger className="w-full sm:w-40"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="all">All statuses</SelectItem><SelectItem value="ready">Ready</SelectItem><SelectItem value="processing">Processing</SelectItem><SelectItem value="failed">Failed</SelectItem></SelectContent></Select>
      </div>
      <Card className="p-0">
        <div className="hidden overflow-x-auto md:block"><Table><TableHeader><TableRow><TableHead>Name</TableHead><TableHead>Type</TableHead><TableHead>Status</TableHead><TableHead>Size / chunks</TableHead><TableHead>Updated</TableHead><TableHead><span className="sr-only">Actions</span></TableHead></TableRow></TableHeader><TableBody>
          {filtered.map((item) => {
            const detail = iconFor(item.type);
            const Icon = detail.icon;
            return <TableRow key={item.id}><TableCell><span className="flex items-center gap-2 font-medium"><Icon className="size-4 text-primary" />{item.name}</span></TableCell><TableCell><Badge tone="default">{detail.label}</Badge></TableCell><TableCell>{item.status === "processing" ? <Badge tone="info"><LoaderCircle className="size-3 animate-spin" />Processing</Badge> : item.status === "failed" ? <span className="flex items-center gap-2"><Badge tone="danger">Failed</Badge><Tooltip><TooltipTrigger asChild><button type="button" className="text-muted-foreground"><AlertCircle className="size-4" /></button></TooltipTrigger><TooltipContent>{item.error || "We could not read this source."}</TooltipContent></Tooltip></span> : <StatusBadge status="ready" />}</TableCell><TableCell>{item.size || item.chunks || "—"}</TableCell><TableCell title={new Date(item.updatedAt).toLocaleString()}>{relativeTime(item.updatedAt)}</TableCell><TableCell><DropdownMenu><DropdownMenuTrigger asChild><Button variant="ghost" size="icon" aria-label={"Actions for " + item.name}><MoreHorizontal className="size-4" /></Button></DropdownMenuTrigger><DropdownMenuContent align="end"><DropdownMenuItem onSelect={() => toast("Content preview is not available in the mock.")}>View content</DropdownMenuItem>{item.type === "url" && <DropdownMenuItem onSelect={() => void onUpdate(item.id, "resync") }><RotateCw />Re-sync</DropdownMenuItem>}{item.status === "failed" && <DropdownMenuItem onSelect={() => void onUpdate(item.id, "retry") }><RotateCw />Retry</DropdownMenuItem>}<DropdownMenuItem variant="destructive" onSelect={() => setDeleteTarget(item)}><Trash2 />Delete</DropdownMenuItem></DropdownMenuContent></DropdownMenu></TableCell></TableRow>;
          })}
        </TableBody></Table></div>
        <div className="space-y-3 p-4 md:hidden">{filtered.map((item) => { const detail = iconFor(item.type); const Icon = detail.icon; return <Card key={item.id} className="gap-3 p-4"><div className="flex items-start gap-2"><Icon className="mt-0.5 size-4 text-primary" /><div className="min-w-0 flex-1"><p className="truncate font-medium">{item.name}</p><p className="mt-1 text-xs text-muted-foreground">{detail.label} · {item.size || item.chunks || "—"} · {relativeTime(item.updatedAt)}</p></div></div><div className="flex items-center justify-between">{item.status === "processing" ? <Badge tone="info"><LoaderCircle className="size-3 animate-spin" />Processing</Badge> : item.status === "failed" ? <Badge tone="danger">Failed</Badge> : <StatusBadge status="ready" />}<Button size="sm" variant="ghost" onClick={() => setDeleteTarget(item)}>Delete</Button></div></Card>; })}</div>
      </Card>
      {!filtered.length && <EmptyState title="No matching sources" body="Try another search or status filter." />}
    </> : <EmptyState title="No knowledge added yet" body="Add a website, file, or FAQ so your assistant can answer from real content." action={<div className="flex flex-wrap justify-center gap-2">{actions(true)}</div>} />}

    <Dialog open={Boolean(dialog)} onOpenChange={(open) => !open && setDialog("")}><DialogContent><DialogHeader><DialogTitle>{dialog === "url" ? "Import website URL" : dialog === "file" ? "Upload files" : "Paste text or FAQ"}</DialogTitle><DialogDescription>{dialog === "url" ? "We will import pages from this website." : dialog === "file" ? "PDF, DOCX, or TXT up to 10 MB each." : "Add a title and text for this knowledge source."}</DialogDescription></DialogHeader>
      {dialog === "url" && <Input value={url} onChange={(event) => setUrl(event.target.value)} placeholder="https://example.com" type="url" />}
      {dialog === "file" && <label className="flex cursor-pointer flex-col items-center rounded-lg border border-dashed border-border bg-muted/30 p-8 text-center"><FileUp className="size-6 text-primary" /><span className="mt-3 text-sm font-medium">Drop files here or choose files</span><span className="mt-1 text-xs text-muted-foreground">PDF, DOCX, TXT · max 10 MB each</span><input className="sr-only" type="file" multiple accept=".pdf,.docx,.txt" onChange={(event) => { Array.from(event.target.files || []).forEach((file) => void add({ name: file.name, type: "file", source: "Upload", size: Math.max(1, Math.round(file.size / 1024)) + " KB" })); event.target.value = ""; }} /></label>}
      {dialog === "text" && <div className="space-y-4"><Input value={faqTitle} onChange={(event) => setFaqTitle(event.target.value)} placeholder="Source title" /><CharLimitInput id="knowledge-text" label="Text or FAQ" multiline rows={6} maxLength={TEXT_LIMITS.offlineMessage} value={faqText} onChange={(event) => setFaqText(event.target.value)} /></div>}
      {dialog !== "file" && <DialogFooter><Button type="button" variant="secondary" onClick={() => setDialog("")}>Cancel</Button><Button type="button" disabled={saving || (dialog === "url" ? !url : !faqTitle || !faqText)} onClick={() => void add(dialog === "url" ? { name: url, type: "url", source: "Website" } : { name: faqTitle, type: "text", source: "Manual", size: Math.ceil(faqText.length / 4) + " chunks" })}>{saving ? "Adding..." : dialog === "url" ? "Import" : "Add text"}</Button></DialogFooter>}
    </DialogContent></Dialog>
    <Dialog open={Boolean(deleteTarget)} onOpenChange={(open) => !open && setDeleteTarget(null)}><DialogContent><DialogHeader><DialogTitle>Delete source?</DialogTitle><DialogDescription>This removes {deleteTarget?.name} from this assistant.</DialogDescription></DialogHeader><DialogFooter><Button variant="secondary" onClick={() => setDeleteTarget(null)}>Cancel</Button><Button variant="destructive" onClick={async () => { await onDelete(deleteTarget.id); setDeleteTarget(null); toast.success("Source deleted."); }}>Delete source</Button></DialogFooter></DialogContent></Dialog>
  </div>;
}
