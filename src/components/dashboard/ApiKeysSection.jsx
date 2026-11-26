"use client";

import { useState } from "react";
import Link from "next/link";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AlertTriangle, Check, Copy, KeyRound, Lock, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Badge, Button, Card, EmptyState, Input, Label, Skeleton } from "@/components/ui";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { createApiKey, listApiKeys, revokeApiKey } from "@/lib/api/apiKeys.api";

function formatDate(value, emptyLabel = "—") {
  if (!value) return emptyLabel;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return emptyLabel;
  return date.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function getCreateErrorMessage(error) {
  if (error?.code === "plan_not_allowed" || error?.status === 403) {
    return "API access requires a Starter or Pro plan. Upgrade your plan to create API keys.";
  }
  if (error?.code === "max_api_keys_reached" || error?.status === 422) {
    return error?.message || "You can have at most 5 active API keys. Revoke an unused key first.";
  }
  return error?.message || "Could not create API key. Please try again.";
}

export default function ApiKeysSection({ planKey, planLoading }) {
  const queryClient = useQueryClient();
  const isFreePlan = !planLoading && planKey === "free";

  const [createOpen, setCreateOpen] = useState(false);
  const [keyName, setKeyName] = useState("");
  const [createError, setCreateError] = useState("");
  const [createdKey, setCreatedKey] = useState("");
  const [copied, setCopied] = useState(false);
  const [revokeTarget, setRevokeTarget] = useState(null);

  const keysQuery = useQuery({
    queryKey: ["api-keys"],
    queryFn: ({ signal }) => listApiKeys(signal),
    enabled: !planLoading && !isFreePlan,
    staleTime: 30_000,
    retry: false,
  });

  const createMutation = useMutation({
    mutationFn: (name) => createApiKey(name),
    onSuccess: (created) => {
      setCreatedKey(created?.key || "");
      setKeyName("");
      setCreateError("");
      setCopied(false);
      queryClient.invalidateQueries({ queryKey: ["api-keys"] });
      toast.success("API key created.");
    },
    onError: (error) => {
      const message = getCreateErrorMessage(error);
      setCreateError(message);
      toast.error(message);
    },
  });

  const revokeMutation = useMutation({
    mutationFn: (id) => revokeApiKey(id),
    onSuccess: () => {
      setRevokeTarget(null);
      queryClient.invalidateQueries({ queryKey: ["api-keys"] });
      toast.success("API key revoked.");
    },
    onError: (error) => {
      toast.error(error?.message || "Could not revoke API key.");
    },
  });

  const handleCloseCreate = (open) => {
    setCreateOpen(open);
    if (!open) {
      setKeyName("");
      setCreateError("");
      setCreatedKey("");
      setCopied(false);
      createMutation.reset();
    }
  };

  const handleCopy = async () => {
    if (!createdKey) return;
    try {
      await navigator.clipboard.writeText(createdKey);
      setCopied(true);
      toast.success("API key copied.");
    } catch {
      toast.error("Copy failed. Please select and copy the key manually.");
    }
  };

  const handleSubmitCreate = (event) => {
    event.preventDefault();
    const trimmed = keyName.trim();
    if (!trimmed || createMutation.isPending) return;
    setCreateError("");
    createMutation.mutate(trimmed);
  };

  if (planLoading) {
    return (
      <section aria-label="API keys">
        <Card title="API keys" subtitle="Manage server-to-server keys for the direct chat API.">
          <div className="space-y-3">
            <Skeleton className="h-10 w-36" />
            <Skeleton className="h-32 w-full" />
          </div>
        </Card>
      </section>
    );
  }

  if (isFreePlan) {
    return (
      <section aria-label="API keys">
        <Card title="API keys" subtitle="Manage server-to-server keys for the direct chat API.">
          <div className="flex flex-col items-start gap-4 rounded-xl border border-dashed bg-muted/40 p-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-lg border bg-card text-muted-foreground">
                <Lock className="size-4" aria-hidden="true" />
              </span>
              <div className="space-y-1">
                <p className="text-sm font-semibold text-foreground">
                  API access is locked on the Free plan
                </p>
                <p className="text-[13px] text-muted-foreground">
                  Upgrade to Starter or Pro to generate API keys and stream chat responses directly
                  from your backend.
                </p>
              </div>
            </div>
            <Button asChild className="shrink-0">
              <Link href="/dashboard/billing">Upgrade</Link>
            </Button>
          </div>
        </Card>
      </section>
    );
  }

  const keys = Array.isArray(keysQuery.data) ? keysQuery.data : [];

  return (
    <section aria-label="API keys" className="space-y-4">
      <Card title="API keys" subtitle="Manage server-to-server keys for the direct chat API.">
        <div className="space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-muted-foreground">
              You can have up to 5 active API keys at a time.
            </p>
            <Button type="button" onClick={() => setCreateOpen(true)}>
              <Plus className="size-4" aria-hidden="true" />
              Create API key
            </Button>
          </div>

          {keysQuery.isPending ? (
            <div className="space-y-2" aria-label="Loading API keys">
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
          ) : keysQuery.isError ? (
            <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-4">
              <p role="alert" className="text-sm text-destructive">
                {keysQuery.error?.message || "Could not load API keys."}
              </p>
              <Button
                type="button"
                variant="secondary"
                size="sm"
                className="mt-3"
                onClick={() => keysQuery.refetch()}
              >
                Retry
              </Button>
            </div>
          ) : keys.length === 0 ? (
            <EmptyState
              title="No API keys yet"
              body="Create an API key to call the chat API directly from your server."
              action={
                <Button type="button" onClick={() => setCreateOpen(true)}>
                  <KeyRound className="size-4" aria-hidden="true" />
                  Create API key
                </Button>
              }
            />
          ) : (
            <div className="overflow-x-auto rounded-xl border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Key</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Last used</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {keys.map((item) => {
                    const revoked = Boolean(item.revoked_at);
                    return (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium text-foreground">
                          <div className="flex items-center gap-2">
                            <span>{item.name}</span>
                            {revoked && <Badge tone="default">Revoked</Badge>}
                          </div>
                        </TableCell>
                        <TableCell>
                          <code className="rounded bg-muted px-2 py-0.5 text-xs text-foreground">
                            {item.key_prefix}...
                          </code>
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {formatDate(item.created_at)}
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {formatDate(item.last_used_at, "Never")}
                        </TableCell>
                        <TableCell className="text-right">
                          {revoked ? (
                            <span className="text-xs text-muted-foreground">Revoked</span>
                          ) : (
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                              onClick={() => setRevokeTarget(item)}
                            >
                              <Trash2 className="size-3.5" aria-hidden="true" />
                              Revoke
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </Card>

      <Dialog open={createOpen} onOpenChange={handleCloseCreate}>
        <DialogContent>
          {createdKey ? (
            <>
              <DialogHeader>
                <DialogTitle>API key created</DialogTitle>
                <DialogDescription>
                  Copy it now, you won&apos;t see it again.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-3">
                <div className="flex items-start gap-2 rounded-lg border border-warning/30 bg-warning-bg p-3 text-xs text-warning-foreground">
                  <AlertTriangle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                  <span>
                    Copy it now, you won&apos;t see it again. Store it securely in your server
                    environment variables.
                  </span>
                </div>
                <div className="flex items-center gap-2 rounded-lg border bg-muted p-3">
                  <code className="min-w-0 flex-1 break-all text-xs text-foreground">
                    {createdKey}
                  </code>
                  <Button type="button" variant="secondary" size="sm" onClick={handleCopy}>
                    {copied ? (
                      <>
                        <Check className="size-3.5" aria-hidden="true" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy className="size-3.5" aria-hidden="true" />
                        Copy
                      </>
                    )}
                  </Button>
                </div>
              </div>
              <DialogFooter>
                <Button type="button" onClick={() => handleCloseCreate(false)}>
                  Done
                </Button>
              </DialogFooter>
            </>
          ) : (
            <form onSubmit={handleSubmitCreate} className="space-y-4">
              <DialogHeader>
                <DialogTitle>Create API key</DialogTitle>
                <DialogDescription>
                  Give this key a descriptive name to identify where it is used.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-2">
                <Label htmlFor="api-key-name">Key name</Label>
                <Input
                  id="api-key-name"
                  placeholder="e.g. Production Server"
                  maxLength={80}
                  value={keyName}
                  disabled={createMutation.isPending}
                  onChange={(event) => {
                    setKeyName(event.target.value);
                    if (createError) setCreateError("");
                  }}
                />
                {createError && (
                  <p role="alert" className="text-sm text-destructive">
                    {createError}
                  </p>
                )}
              </div>
              <DialogFooter>
                <Button
                  type="button"
                  variant="secondary"
                  disabled={createMutation.isPending}
                  onClick={() => handleCloseCreate(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={!keyName.trim() || createMutation.isPending}>
                  {createMutation.isPending ? "Creating…" : "Create key"}
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={Boolean(revokeTarget)} onOpenChange={(open) => !open && setRevokeTarget(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Revoke API key</DialogTitle>
            <DialogDescription>
              Are you sure you want to revoke{" "}
              <span className="font-medium text-foreground">{revokeTarget?.name}</span>? Any
              server or script using this key will immediately lose access.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              type="button"
              variant="secondary"
              disabled={revokeMutation.isPending}
              onClick={() => setRevokeTarget(null)}
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="destructive"
              disabled={revokeMutation.isPending}
              onClick={() => revokeTarget && revokeMutation.mutate(revokeTarget.id)}
            >
              {revokeMutation.isPending ? "Revoking…" : "Revoke key"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
}
