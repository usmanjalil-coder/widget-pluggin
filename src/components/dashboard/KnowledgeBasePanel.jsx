"use client";

import { useState } from "react";
import {
  AlertCircle,
  FileText,
  FileUp,
  Globe,
  LoaderCircle,
  MoreHorizontal,
  Plus,
  RotateCw,
  Search,
  Trash2,
  Type,
} from "lucide-react";
import { toast } from "sonner";
import { Badge, Button, Card, EmptyState, Input, Skeleton } from "@/components/ui";
import PageHeader from "@/components/shared/PageHeader";
import StatCard from "@/components/shared/StatCard";
import StatusBadge from "@/components/bots/StatusBadge";
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const typeDetails = {
  file: { label: "File", icon: FileText },
  url: { label: "URL", icon: Globe },
  text: { label: "Text", icon: Type },
};
const sourceLink = (item) => {
  if (item.type !== "url") return null;
  try {
    const url = new URL(item.sourceUrl ?? item.name);
    return url.protocol === "https:" || url.protocol === "http:" ? url.href : null;
  } catch {
    return null;
  }
};

function DocumentName({ item, Icon }) {
  const url = sourceLink(item);

  return (
    <div className="min-w-0">
      <div className="flex items-center gap-2 font-medium">
        <Icon className="size-4 shrink-0 text-primary" />
        <span className="min-w-0 truncate" title={item.name}>
          {item.name}
        </span>
      </div>
      {url && (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-1 block break-all text-xs text-primary underline-offset-2 hover:underline focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          {item.sourceUrl ?? item.name}
        </a>
      )}
    </div>
  );
}

const sourceSize = ({ size, chunks }) => size ?? `${chunks} chunks`;
const relativeTime = (value) => {
  const minutes = Math.max(0, Math.floor((Date.now() - new Date(value).getTime()) / 60000));
  if (minutes < 60) return minutes + "m ago";
  if (minutes < 1440) return Math.floor(minutes / 60) + "h ago";
  return Math.floor(minutes / 1440) + "d ago";
};

export default function KnowledgeBasePanel({
  documents,
  stats,
  pagination,
  query,
  onSearchChange,
  status,
  onStatusChange,
  onPageChange,
  refreshing,
  loading,
  error,
  onReload,
  onAdd,
  onUpdate,
  onDelete,
}) {
  const [dialog, setDialog] = useState("");
  const [url, setUrl] = useState("");
  const [urlScope, setUrlScope] = useState("page");
  const [files, setFiles] = useState([]);
  const [dragging, setDragging] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [saving, setSaving] = useState(false);
  const [urlError, setUrlError] = useState("");
  const [fileError, setFileError] = useState("");
  const add = async (payload) => {
    if (saving) return;
    if (payload.type === "url") {
      try {
        const parsed = new URL(payload.url);
        if (!["http:", "https:"].includes(parsed.protocol) || parsed.username || parsed.password) {
          throw new Error();
        }
      } catch {
        setUrlError("Enter a valid public HTTP or HTTPS page URL.");
        return;
      }
    }
    setUrlError("");
    setSaving(true);
    try {
      await onAdd(payload);
      setDialog("");
      setUrl("");
      setUrlScope("page");
      setFiles([]);
      toast.success("Source accepted. Check its status in Knowledge Base.");
    } catch (nextError) {
      if (payload.type === "url") {
        setUrlError(
          nextError.errors?.url?.[0] || nextError.message || "Could not import this URL.",
        );
      }
      toast.error(nextError.message || "Could not add this source.");
    } finally {
      setSaving(false);
    }
  };
  const actions = (compact = false) => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button type="button" variant={compact ? "secondary" : "default"} size="sm">
          <Plus className="size-4" />
          Add content
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onSelect={() => setDialog("url")}>
          <Globe />
          Website URL
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => setDialog("file")}>
          <FileUp />
          Upload files
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  if (loading)
    return (
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-3">
          {[1, 2, 3].map((item) => (
            <Skeleton key={item} className="h-28 rounded-xl" />
          ))}
        </div>
        <Skeleton className="h-80 rounded-xl" />
      </div>
    );
  if (error)
    return (
      <Card>
        <p className="text-destructive">{error}</p>
        <Button className="mt-4" onClick={onReload}>
          Retry
        </Button>
      </Card>
    );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Knowledge Base"
        description="What your assistant knows. Add content so it can answer accurately."
        actions={
          <div className="flex flex-wrap items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={refreshing}
              onClick={() => void onReload()}
            >
              <RotateCw
                className={refreshing ? "size-4 animate-spin motion-reduce:animate-none" : "size-4"}
              />
              {refreshing ? "Refreshing..." : "Refresh"}
            </Button>
            {actions()}
          </div>
        }
      />
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard
          label="Sources"
          value={stats.sources}
          icon={FileText}
          description="All content sources"
        />
        <StatCard
          label="Ready"
          value={stats.ready}
          icon={Globe}
          description="Available to answer from"
        />
        <StatCard
          label="Needs attention"
          value={stats.needs_attention}
          icon={AlertCircle}
          description="Processing or failed"
        />
      </div>
      {stats.sources || query || status !== "all" ? (
        <>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative w-full sm:max-w-sm">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={query}
                onChange={(event) => onSearchChange(event.target.value)}
                className="pl-9"
                placeholder="Search sources"
                aria-label="Search sources"
              />
            </div>
            <Select value={status} onValueChange={onStatusChange}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All statuses</SelectItem>
                <SelectItem value="ready">Ready</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Card className="p-0" aria-busy={refreshing}>
            <div className="hidden overflow-x-auto md:block">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Size / chunks</TableHead>
                    <TableHead>Updated</TableHead>
                    <TableHead>
                      <span className="sr-only">Actions</span>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {documents.map((item) => {
                    const detail = typeDetails[item.type];
                    const Icon = detail.icon;
                    return (
                      <TableRow key={item.id}>
                        <TableCell className="max-w-72 lg:max-w-96">
                          <DocumentName item={item} Icon={Icon} />
                        </TableCell>
                        <TableCell>
                          <Badge tone="default">{detail.label}</Badge>
                        </TableCell>
                        <TableCell>
                          {item.status === "processing" ? (
                            <Badge tone="info">
                              <LoaderCircle className="size-3 animate-spin" />
                              Processing
                            </Badge>
                          ) : item.status === "failed" ? (
                            <span className="flex items-center gap-2">
                              <Badge tone="danger">Failed</Badge>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <button type="button" className="text-muted-foreground">
                                    <AlertCircle className="size-4" />
                                  </button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  {item.error || "We could not read this source."}
                                </TooltipContent>
                              </Tooltip>
                            </span>
                          ) : (
                            <StatusBadge status="ready" />
                          )}
                        </TableCell>
                        <TableCell>{sourceSize(item)}</TableCell>
                        <TableCell title={new Date(item.updatedAt).toLocaleString()}>
                          {relativeTime(item.updatedAt)}
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                aria-label={"Actions for " + item.name}
                              >
                                <MoreHorizontal className="size-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              {item.type === "url" && (
                                <DropdownMenuItem onSelect={() => void onUpdate(item.id, "resync")}>
                                  <RotateCw />
                                  Re-sync
                                </DropdownMenuItem>
                              )}
                              {item.status === "failed" && (
                                <DropdownMenuItem onSelect={() => void onUpdate(item.id, "retry")}>
                                  <RotateCw />
                                  Retry
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuItem
                                variant="destructive"
                                onSelect={() => setDeleteTarget(item)}
                              >
                                <Trash2 />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
            <div className="space-y-3 p-4 md:hidden">
              {documents.map((item) => {
                const detail = typeDetails[item.type];
                const Icon = detail.icon;
                return (
                  <Card key={item.id} className="gap-3 p-4">
                    <div className="min-w-0">
                      <DocumentName item={item} Icon={Icon} />
                      <div className="min-w-0 pl-6">
                        <p className="mt-1 text-xs text-muted-foreground">
                          {detail.label} · {sourceSize(item)} · {relativeTime(item.updatedAt)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      {item.status === "processing" ? (
                        <Badge tone="info">
                          <LoaderCircle className="size-3 animate-spin" />
                          Processing
                        </Badge>
                      ) : item.status === "failed" ? (
                        <Badge tone="danger">Failed</Badge>
                      ) : (
                        <StatusBadge status="ready" />
                      )}
                      <div className="flex items-center gap-1">
                        {item.status === "failed" && item.type !== "file" && (
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => void onUpdate(item.id, "retry")}
                          >
                            Retry
                          </Button>
                        )}
                        <Button size="sm" variant="ghost" onClick={() => setDeleteTarget(item)}>
                          Delete
                        </Button>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </Card>
          <div
            className="flex flex-wrap items-center justify-between gap-3"
            aria-label="Source pagination"
          >
            <p className="text-sm text-muted-foreground" role="status">
              {refreshing
                ? "Updating sources..."
                : `Showing ${pagination?.from ?? 0}-${pagination?.to ?? 0} of ${pagination?.total ?? 0}`}
            </p>
            <div className="flex flex-wrap items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={refreshing || !pagination || pagination.current_page <= 1}
                onClick={() => onPageChange(pagination.current_page - 1)}
              >
                Previous
              </Button>
              <span className="text-sm text-muted-foreground">
                Page {pagination?.current_page ?? 1} of {pagination?.last_page ?? 1}
              </span>
              <Button
                variant="outline"
                size="sm"
                disabled={
                  refreshing || !pagination || pagination.current_page >= pagination.last_page
                }
                onClick={() => onPageChange(pagination.current_page + 1)}
              >
                Next
              </Button>
            </div>
          </div>
          {!documents.length && (
            <EmptyState title="No matching sources" body="Try another search or status filter." />
          )}
        </>
      ) : (
        <EmptyState
          title="No knowledge added yet"
          body="Add a website or upload a file so your assistant can answer from real content."
          action={<div className="flex flex-wrap justify-center gap-2">{actions(true)}</div>}
        />
      )}

      <Dialog
        open={Boolean(dialog)}
        onOpenChange={(open) => {
          if (!open && !saving) {
            setDialog("");
            setUrlError("");
            setFileError("");
            setFiles([]);
            setDragging(false);
          }
        }}
      >
        <DialogContent className="max-h-[calc(100dvh-2rem)] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{dialog === "url" ? "Import website" : "Upload files"}</DialogTitle>
            <DialogDescription>
              {dialog === "url"
                ? "Choose a single page or discover pages across this website. Processing runs in the background."
                : "Upload PDF, DOCX, or UTF-8 TXT files, up to 10 MB each."}
            </DialogDescription>
          </DialogHeader>
          {dialog === "url" && (
            <form
              id="import-url-form"
              className="space-y-2"
              onSubmit={(event) => {
                event.preventDefault();
                if (!saving) void add({ type: "url", url: url.trim(), scope: urlScope });
              }}
            >
              <fieldset className="space-y-2">
                <legend className="text-sm font-medium">Import scope</legend>
                <div className="grid gap-2 sm:grid-cols-2">
                  {[
                    { value: "page", title: "Single page", description: "Only this URL" },
                    {
                      value: "site",
                      title: "Website",
                      description: "Up to 10 pages linked from this URL",
                    },
                  ].map((option) => (
                    <label
                      key={option.value}
                      className={`flex cursor-pointer gap-3 rounded-lg border p-3 ${urlScope === option.value ? "border-primary bg-primary/5" : "border-border"}`}
                    >
                      <input
                        type="radio"
                        name="scope"
                        value={option.value}
                        checked={urlScope === option.value}
                        onChange={() => setUrlScope(option.value)}
                        disabled={saving}
                        className="accent-primary"
                      />
                      <span>
                        <span className="block text-sm font-medium">{option.title}</span>
                        <span className="text-xs text-muted-foreground">{option.description}</span>
                      </span>
                    </label>
                  ))}
                </div>
              </fieldset>
              <label htmlFor="knowledge-url" className="block pt-2 text-sm font-medium">
                Website URL
              </label>
              <Input
                id="knowledge-url"
                value={url}
                onChange={(event) => {
                  setUrl(event.target.value);
                  setUrlError("");
                }}
                placeholder="https://example.com/about"
                type="url"
                maxLength={2048}
                required
                disabled={saving}
                aria-invalid={Boolean(urlError)}
                aria-describedby={urlError ? "knowledge-url-error" : undefined}
              />
              {urlError && (
                <p id="knowledge-url-error" role="alert" className="text-sm text-destructive">
                  {urlError}
                </p>
              )}
            </form>
          )}
          {dialog === "file" && (
            <div className="space-y-3">
              <label
                className={`flex cursor-pointer flex-col items-center rounded-lg border border-dashed p-8 text-center ${dragging ? "border-primary bg-primary/5" : "border-border bg-muted/30"}`}
                onDragOver={(event) => {
                  event.preventDefault();
                  setDragging(true);
                }}
                onDragLeave={() => setDragging(false)}
                onDrop={(event) => {
                  event.preventDefault();
                  setDragging(false);
                  setFileError("");
                  setFiles((current) => [...current, ...Array.from(event.dataTransfer.files)]);
                }}
              >
                <FileUp className="size-6 text-primary" />
                <span className="mt-3 text-sm font-medium">Drop files here or choose files</span>
                <span className="mt-1 text-xs text-muted-foreground">
                  PDF, DOCX, TXT · max 10 MB each
                </span>
                <input
                  className="sr-only"
                  type="file"
                  multiple
                  accept=".pdf,.docx,.txt,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain"
                  onChange={(event) => {
                    setFileError("");
                    setFiles((current) => [...current, ...Array.from(event.target.files || [])]);
                    event.target.value = "";
                  }}
                />
              </label>
              {files.map((file, index) => (
                <div
                  key={`${file.name}-${index}`}
                  className="flex items-center justify-between gap-2 rounded-lg border px-3 py-2 text-sm"
                >
                  <span className="min-w-0 truncate">
                    {file.name} · {Math.ceil(file.size / 1024)} KB
                  </span>
                  <Button
                    type="button"
                    size="sm"
                    variant="ghost"
                    onClick={() =>
                      setFiles((current) => current.filter((_, position) => position !== index))
                    }
                  >
                    Remove
                  </Button>
                </div>
              ))}
              {fileError && (
                <p role="alert" className="text-sm text-destructive">
                  {fileError}
                </p>
              )}
            </div>
          )}
          <DialogFooter>
            <Button
              type="button"
              variant="secondary"
              disabled={saving}
              onClick={() => {
                setDialog("");
                setUrlError("");
                setFileError("");
                setFiles([]);
              }}
            >
              Cancel
            </Button>
            <Button
              type={dialog === "url" ? "submit" : "button"}
              form={dialog === "url" ? "import-url-form" : undefined}
              onClick={
                dialog === "file"
                  ? async () => {
                      if (!files.length) return;
                      for (const file of files) {
                        if (
                          !/\.(pdf|docx|txt)$/i.test(file.name) ||
                          file.size > 10 * 1024 * 1024 ||
                          file.size === 0
                        ) {
                          setFileError(
                            `${file.name}: choose a PDF, DOCX, or TXT file under 10 MB.`,
                          );
                          return;
                        }
                      }
                      setSaving(true);
                      try {
                        for (const [index, file] of files.entries()) {
                          const data = new FormData();
                          data.set("type", "file");
                          data.set("file", file);
                          try {
                            await onAdd(data);
                          } catch (error) {
                            setFiles(files.slice(index));
                            throw error;
                          }
                        }
                        setFiles([]);
                        setDialog("");
                        toast.success("Files accepted for processing.");
                      } catch (error) {
                        setFileError(error.errors?.file?.[0] || error.message);
                      } finally {
                        setSaving(false);
                      }
                    }
                  : undefined
              }
              disabled={saving || (dialog === "url" ? !url.trim() : !files.length)}
            >
              {saving ? "Adding..." : dialog === "url" ? "Import" : "Upload files"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Dialog open={Boolean(deleteTarget)} onOpenChange={(open) => !open && setDeleteTarget(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete source?</DialogTitle>
            <DialogDescription>
              This removes {deleteTarget?.name} from this assistant.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="secondary" onClick={() => setDeleteTarget(null)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              disabled={saving || refreshing}
              onClick={async () => {
                try {
                  setSaving(true);
                  await onDelete(deleteTarget.id);
                  setDeleteTarget(null);
                  toast.success("Source deleted.");
                } catch (error) {
                  toast.error(error.message);
                } finally {
                  setSaving(false);
                }
              }}
            >
              Delete source
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
