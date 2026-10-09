"use client";

/* eslint-disable react-hooks/set-state-in-effect -- Preserve existing client-only query/storage synchronization in this visual-only change. */

import { useCallback, useEffect, useMemo, useState } from "react";
import { toast as notify } from "sonner";
import Link from "next/link";
import {
  ArrowDown,
  ArrowUp,
  BarChart3,
  BookOpen,
  Check,
  ChevronRight,
  Clock3,
  Copy,
  CreditCard,
  GripVertical,
  LayoutDashboard,
  Mail,
  Menu,
  MessageSquare,
  Plus,
  Search,
  Settings2,
  Sparkles,
  UploadCloud,
  Users,
} from "lucide-react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Badge,
  Button,
  Card,
  EmptyState,
  Input,
  Label,
  Skeleton,
  Switch,
  Textarea,
} from "@/components/ui";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import CharLimitInput from "@/components/shared/CharLimitInput";
import PageHeader from "@/components/shared/PageHeader";
import AppearancePreview from "@/components/dashboard/AppearancePreview";
import KnowledgeBasePanel from "@/components/dashboard/KnowledgeBasePanel";
import BillingPanel from "@/components/dashboard/BillingPanel";
import AccountSettingsPanel from "@/components/dashboard/AccountSettingsPanel";
import ConversationsPanel from "@/components/dashboard/ConversationsPanel";
import LeadsPanel from "@/components/dashboard/LeadsPanel";
import BotCard from "@/components/bots/BotCard";
import BotSwitcher from "@/components/bots/BotSwitcher";
import { HEX_COLOR, TEXT_LIMITS } from "@/lib/limits";
import { DEFAULT_CONFIG } from "../../../widget/src/config.js";
import { brand } from "@/lib/brand";
import { endAuthSession } from "@/lib/api/auth.api";
import {
  createBot,
  addDocument,
  deleteDocument,
  deleteBot,
  getBots,
  getBot,
  listConversations,
  listDocuments,
  updateDocument,
  updateBot,
} from "@/lib/api/bots.api";
import { getAccount, updateAccount, updatePassword } from "@/lib/api/account.api";
import { listLeads, updateLeadStatus } from "@/lib/api/leads.api";
import { getUsage } from "@/lib/api/usage.api";

const navItems = [
  { label: "Overview", href: "/dashboard", icon: LayoutDashboard, group: "Workspace" },
  { label: "Bots", href: "/dashboard/bots", icon: Sparkles, group: "Workspace" },
  {
    label: "Conversations",
    href: "/dashboard/conversations",
    icon: MessageSquare,
    group: "Workspace",
  },
  { label: "Leads", href: "/dashboard/leads", icon: Users, group: "Workspace" },
  {
    label: "Knowledge Base",
    href: "/dashboard/knowledge",
    icon: BookOpen,
    group: "Workspace",
  },
  { label: "Usage & Billing", href: "/dashboard/billing", icon: CreditCard, group: "Manage" },
  { label: "Settings", href: "/dashboard/account", icon: Settings2, group: "Manage" },
];

const botTabs = [
  { label: "Appearance", value: "appearance" },
  { label: "Knowledge Base", value: "knowledge" },
  { label: "Settings", value: "settings" },
  { label: "Install", value: "install" },
];

const presetColors = [
  ["Blue", "#2563eb"],
  ["Slate", "#0f172a"],
  ["Cyan", "#0891b2"],
  ["Green", "#10b981"],
  ["Amber", "#f59e0b"],
  ["Red", "#ef4444"],
  ["Violet", "#7c3aed"],
  ["Pink", "#ec4899"],
];

function onColor(hex) {
  if (!HEX_COLOR.test(hex)) return "#ffffff";
  const full = hex.length === 4 ? `#${[1, 2, 3].map((i) => hex[i] + hex[i]).join("")}` : hex;
  const rgb = [1, 3, 5]
    .map((i) => parseInt(full.slice(i, i + 2), 16) / 255)
    .map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
  return rgb[0] * 0.2126 + rgb[1] * 0.7152 + rgb[2] * 0.0722 > 0.179 ? "#18181b" : "#ffffff";
}
const pickerColor = (hex) =>
  HEX_COLOR.test(hex || "")
    ? hex.length === 4
      ? `#${[1, 2, 3].map((i) => hex[i] + hex[i]).join("")}`
      : hex
    : "#2563eb";

function readStoredBot() {
  if (typeof window === "undefined") {
    return null;
  }
  return window.localStorage.getItem("chatbot-current-bot");
}

export default function DashboardApp({ page = "Overview", botId = null }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [bots, setBots] = useState([]);
  const [botsLoading, setBotsLoading] = useState(true);
  const [botsError, setBotsError] = useState("");
  const [botStats, setBotStats] = useState({});
  const [botSearch, setBotSearch] = useState("");
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [createError, setCreateError] = useState("");
  const [creatingBot, setCreatingBot] = useState(false);
  const [selectedBotId, setSelectedBotId] = useState(botId || "");
  const [bot, setBot] = useState(null);
  const [draft, setDraft] = useState(null);
  const [usage, setUsage] = useState(null);
  const [usageLoading, setUsageLoading] = useState(true);
  const [usageError, setUsageError] = useState("");
  const [leads, setLeads] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [detailError, setDetailError] = useState("");
  const [reloadKey, setReloadKey] = useState(0);
  const [account, setAccount] = useState(null);
  const [accountError, setAccountError] = useState("");
  const [accountLoading, setAccountLoading] = useState(false);
  const [toast, setToast] = useState("");
  const [newBotName, setNewBotName] = useState("");
  const [savingAppearance, setSavingAppearance] = useState(false);
  const [savingSettings, setSavingSettings] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [appOrigin, setAppOrigin] = useState("");

  useEffect(() => {
    setAppOrigin(window.location.origin);
  }, []);

  const loadBots = useCallback(async () => {
    setBotsLoading(true);
    setBotsError("");
    try {
      setBots((await getBots()) || []);
    } catch {
      setBotsError("Could not load bots. Please try again.");
    } finally {
      setBotsLoading(false);
    }
  }, []);

  const tabFromQuery = searchParams.get("tab") || "appearance";
  const selectedBot = bots.find((item) => item.id === selectedBotId) || bots[0];
  const dirty = useMemo(
    () =>
      Boolean(
        bot &&
        draft &&
        JSON.stringify({ theme: draft.theme, texts: draft.texts, branding: draft.branding }) !==
          JSON.stringify({ theme: bot.theme, texts: bot.texts, branding: bot.branding }),
      ),
    [bot, draft],
  );
  const visibleBots = useMemo(() => {
    const query = botSearch.trim().toLowerCase();
    return query ? bots.filter((item) => item.name.toLowerCase().includes(query)) : bots;
  }, [bots, botSearch]);

  const selectBot = useCallback(
    (nextId) => {
      if (dirty && !window.confirm("Discard unsaved appearance changes?")) return false;
      setSelectedBotId(nextId);
      window.localStorage.setItem("chatbot-current-bot", nextId);
      router.push(`/dashboard/bots/${nextId}?tab=appearance`);
      setMobileNavOpen(false);
      return true;
    },
    [dirty, router],
  );

  const openCreateFromSwitcher = useCallback(() => {
    if (dirty && !window.confirm("Discard unsaved appearance changes?")) return;
    if (page === "Bots") setCreateDialogOpen(true);
    else router.push("/dashboard/bots?create=1");
  }, [dirty, page, router]);

  const viewAllBots = useCallback(() => {
    if (!dirty || window.confirm("Discard unsaved appearance changes?")) {
      router.push("/dashboard/bots");
    }
  }, [dirty, router]);

  useEffect(() => {
    const storedBot = readStoredBot();
    if (!botId && storedBot) {
      setSelectedBotId(storedBot);
      return;
    }
    if (botId) {
      setSelectedBotId(botId);
    }
  }, [botId]);

  const loadUsage = useCallback(async () => {
    setUsageLoading(true);
    setUsageError("");
    try {
      setUsage(await getUsage());
    } catch {
      setUsageError("Could not load usage. Please try again.");
    } finally {
      setUsageLoading(false);
    }
  }, []);

  useEffect(() => {
    loadBots();
    loadUsage();
  }, [loadBots, loadUsage]);

  const loadAccount = useCallback(async () => {
    setAccountLoading(true);
    setAccountError("");
    try {
      setAccount(await getAccount());
    } catch {
      setAccountError("Could not load account settings.");
    } finally {
      setAccountLoading(false);
    }
  }, []);

  useEffect(() => {
    if (page === "Settings") loadAccount();
  }, [page, loadAccount]);

  useEffect(() => {
    if (page !== "Bots" || !bots.length) return;
    let cancelled = false;
    Promise.all(
      bots.map(async (item) => {
        const [conversationsResult, leadsResult] = await Promise.allSettled([
          listConversations(item.id),
          listLeads(item.id),
        ]);
        return [
          item.id,
          {
            conversations:
              conversationsResult.status === "fulfilled"
                ? (conversationsResult.value?.length ?? 0)
                : null,
            leads: leadsResult.status === "fulfilled" ? (leadsResult.value?.length ?? 0) : null,
            lastActiveAt:
              conversationsResult.status === "fulfilled"
                ? conversationsResult.value?.reduce((latest, entry) => {
                    const value = entry.updatedAt || entry.createdAt;
                    return value && (!latest || new Date(value) > new Date(latest))
                      ? value
                      : latest;
                  }, null)
                : null,
          },
        ];
      }),
    ).then((entries) => {
      if (!cancelled) setBotStats(Object.fromEntries(entries));
    });
    return () => {
      cancelled = true;
    };
  }, [bots, page]);

  useEffect(() => {
    if (page === "Bots" && searchParams.get("create") === "1") setCreateDialogOpen(true);
  }, [page, searchParams]);

  useEffect(() => {
    if (!bots.length) return;
    const fallback = botId || selectedBotId || readStoredBot() || bots[0].id;
    const nextId = bots.some((botItem) => botItem.id === fallback) ? fallback : bots[0].id;
    setSelectedBotId(nextId);
    if (typeof window !== "undefined") {
      window.localStorage.setItem("chatbot-current-bot", nextId);
    }
  }, [bots, botId, selectedBotId]);

  useEffect(() => {
    if (page === "Bots" || !selectedBotId) return;

    async function fetchBotDetails() {
      setLoading(true);
      setDetailError("");
      try {
        const [botResult, leadResult, documentResult, conversationResult] =
          await Promise.allSettled([
            getBot(selectedBotId),
            listLeads(selectedBotId),
            listDocuments(selectedBotId),
            listConversations(selectedBotId),
          ]);

        if (botResult.status === "rejected") throw botResult.reason;
        setBot(botResult.value);
        setDraft(botResult.value);
        setLeads(leadResult.status === "fulfilled" ? leadResult.value : []);
        setDocuments(documentResult.status === "fulfilled" ? documentResult.value : []);
        setConversations(conversationResult.status === "fulfilled" ? conversationResult.value : []);
        if (
          [leadResult, documentResult, conversationResult].some(
            (result) => result.status === "rejected",
          )
        ) {
          setDetailError("Some data is not available from the Laravel API yet.");
        }
      } catch (error) {
        setDetailError("Could not load this bot's data.");
      } finally {
        setLoading(false);
      }
    }

    fetchBotDetails();
  }, [page, selectedBotId, reloadKey]);

  useEffect(() => {
    if (!toast) return;
    notify(toast);
    const timer = setTimeout(() => setToast(""), 2800);
    return () => clearTimeout(timer);
  }, [toast]);

  useEffect(() => {
    if (!dirty || page !== "Appearance") return;
    const beforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = "";
    };
    const onClick = (event) => {
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      const anchor = event.target.closest?.("a[href]");
      if (
        !anchor ||
        anchor.origin !== window.location.origin ||
        anchor.href === window.location.href
      )
        return;
      if (!window.confirm("Discard unsaved appearance changes?")) {
        event.preventDefault();
        event.stopPropagation();
      } else setDraft(bot);
    };
    const currentUrl = window.location.href;
    const onPopState = () => {
      if (!window.confirm("Discard unsaved appearance changes?"))
        window.history.pushState(null, "", currentUrl);
      else setDraft(bot);
    };
    window.addEventListener("beforeunload", beforeUnload);
    document.addEventListener("click", onClick, true);
    window.addEventListener("popstate", onPopState);
    return () => {
      window.removeEventListener("beforeunload", beforeUnload);
      document.removeEventListener("click", onClick, true);
      window.removeEventListener("popstate", onPopState);
    };
  }, [dirty, page, bot]);

  const updateDraftField = (group, key, value) => {
    setDraft((current) => {
      if (!current) return current;
      return {
        ...current,
        [group]: {
          ...current[group],
          [key]: value,
        },
      };
    });
  };

  const saveAppearance = async () => {
    if (!selectedBotId || !draft) return;
    if (!HEX_COLOR.test(draft.theme.primaryColor)) {
      setToast("Enter a valid hex color before saving.");
      return;
    }
    setSavingAppearance(true);
    try {
      const saved = await updateBot(selectedBotId, {
        ...draft,
        name: draft.texts.botName.trim() || draft.name,
      });
      setBot(saved);
      setDraft(saved);
      setBots((current) => current.map((item) => (item.id === selectedBotId ? saved : item)));
      setToast("Appearance saved. The public widget is updated.");
    } catch (error) {
      setToast(error.message || "Unable to save this appearance yet.");
    } finally {
      setSavingAppearance(false);
    }
  };

  const resetAppearance = () => {
    setDraft(bot);
  };
  const saveSettings = async () => {
    if (!draft || !selectedBotId) return;
    setSavingSettings(true);
    try {
      const saved = await updateBot(selectedBotId, { settings: draft.settings });
      setBot(saved);
      setDraft(saved);
      setToast("Settings saved.");
    } catch {
      setToast("Unable to save settings.");
    } finally {
      setSavingSettings(false);
    }
  };
  const usageCount = usage?.conversations ?? 0;
  const usageLimit = usage?.limit ?? 0;
  const usagePercent = Math.min(100, (usageCount / Math.max(usageLimit, 1)) * 100);

  const handleBotCreate = async (event) => {
    event.preventDefault();
    if (!newBotName.trim()) {
      setCreateError("Enter a bot name.");
      return;
    }
    setCreateError("");
    setCreatingBot(true);

    try {
      const created = await createBot({ name: newBotName.trim() });
      const nextBots = await getBots();
      setBots(nextBots);
      setSelectedBotId(created.id);
      setNewBotName("");
      setCreateDialogOpen(false);
      notify.success("Bot created.");
      router.push(`/dashboard/bots/${created.id}?tab=appearance`);
    } catch (error) {
      setCreateError(error.message || "Could not create a bot right now.");
    } finally {
      setCreatingBot(false);
    }
  };

  const handleDeleteBot = async () => {
    if (!selectedBotId) return;
    try {
      await deleteBot(selectedBotId);
      const nextBots = await getBots();
      setBots(nextBots);
      setSelectedBotId(nextBots[0]?.id || "");
      setToast("Bot deleted.");
      router.push("/dashboard/bots");
    } catch (error) {
      setToast("Bot could not be deleted.");
    }
  };

  const renderOverview = () => {
    const metrics = [
      {
        label: "Conversations",
        value: usage?.conversations ?? "—",
        suffix: "this month",
        icon: MessageSquare,
        trend: "Across your bots",
      },
      {
        label: "Active bots",
        value:
          botsLoading || botsError ? "—" : bots.filter((item) => item.status === "active").length,
        suffix: "live",
        icon: BarChart3,
        trend: "Ready to answer",
      },
      {
        label: "Leads captured",
        value: usage?.leads ?? "—",
        suffix: "total",
        icon: Users,
        trend: "New contacts",
      },
    ];

    return (
      <div className="space-y-6">
        <PageHeader
          title="Good to see you"
          description="Here is what happened across your workspace."
        />

        {usageError && (
          <Card>
            <p role="alert" className="text-sm text-destructive">
              {usageError}
            </p>
            <Button className="mt-4" onClick={loadUsage}>
              Retry
            </Button>
          </Card>
        )}
        <div className="grid grid-cols-2 gap-3 sm:gap-6 xl:grid-cols-3">
          {metrics.map((metric) => (
            <Card key={metric.label} className="min-w-0 p-4 shadow-sm sm:p-6">
              <span className="mb-3 flex size-9 items-center justify-center rounded-xl bg-accent text-primary sm:mb-4 sm:size-10">
                <metric.icon className="size-4 sm:size-5" />
              </span>
              <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
                {metric.label}
              </p>
              <div className="mt-3 flex items-end justify-between gap-2">
                <span className="text-2xl font-semibold text-foreground sm:text-3xl">
                  {metric.value}
                </span>
                <span className="text-xs text-muted-foreground">{metric.suffix}</span>
              </div>
              <p className="mt-3 text-xs text-muted-foreground">{metric.trend}</p>
            </Card>
          ))}
        </div>

        <div className="grid gap-6">
          <Card title="Usage" subtitle="Current plan allowance">
            <div className="flex items-end justify-between">
              <span className="text-2xl font-semibold text-foreground">{usageCount}</span>
              <span className="text-sm text-muted-foreground">of {usageLimit} conversations</span>
            </div>
            <div className="mt-4 h-2 overflow-hidden rounded-full bg-muted">
              <div
                className={`h-full rounded-full ${usagePercent >= 100 ? "bg-destructive" : usagePercent >= 80 ? "bg-warning" : "bg-primary"}`}
                style={{
                  width: `${usagePercent}%`,
                }}
              />
            </div>
            {usagePercent >= 80 && (
              <p
                className={`mt-2 text-xs ${usagePercent >= 100 ? "text-destructive" : "text-warning-foreground"}`}
              >
                {usagePercent >= 100 ? "Plan limit reached" : "Approaching your plan limit"}
              </p>
            )}
            <Link
              href="/dashboard/billing"
              className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary"
            >
              View usage <ChevronRight className="size-4" />
            </Link>
          </Card>
        </div>
      </div>
    );
  };

  const renderBotsPage = () => {
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
                stats={botStats[item.id]}
                current={item.id === selectedBotId}
                onSwitch={selectBot}
              />
            ))}
          </div>
        )}
      </div>
    );
  };

  const renderAppearance = () => {
    if (detailError && !draft && !loading) {
      return (
        <Card>
          <p className="text-sm text-destructive">{detailError}</p>
          <Button className="mt-4" onClick={() => setReloadKey((value) => value + 1)}>
            Retry
          </Button>
        </Card>
      );
    }
    if (!draft || loading) {
      return (
        <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <Skeleton className="h-96 w-full rounded-2xl" />
          <Skeleton className="h-96 w-full rounded-2xl" />
        </div>
      );
    }

    return (
      <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(360px,0.9fr)]">
        <div className="flex min-w-0 flex-col gap-6">
          <Card title="Branding" subtitle="Your public widget identity." className="order-1">
            <div className="grid gap-4 md:grid-cols-2">
              <CharLimitInput
                id="appearance-bot-name"
                label="Bot name"
                maxLength={TEXT_LIMITS.botName}
                value={draft.texts.botName || ""}
                onChange={(event) => updateDraftField("texts", "botName", event.target.value)}
              />
              <CharLimitInput
                id="appearance-launcher-label"
                label="Launcher label"
                maxLength={TEXT_LIMITS.launcherLabel}
                value={draft.texts.launcherLabel || ""}
                onChange={(event) => updateDraftField("texts", "launcherLabel", event.target.value)}
              />
              <CharLimitInput
                id="appearance-avatar-url"
                label="Avatar URL"
                maxLength={TEXT_LIMITS.avatarUrl}
                className="md:col-span-2"
                value={draft.texts.avatarUrl || ""}
                onChange={(event) => updateDraftField("texts", "avatarUrl", event.target.value)}
                placeholder="https://example.com/avatar.png"
                error={
                  draft.texts.avatarUrl && !/^https:\/\//i.test(draft.texts.avatarUrl)
                    ? "Use an HTTPS URL."
                    : undefined
                }
              />
            </div>
          </Card>

          <Card title="Colors" subtitle="Review text contrast before saving." className="order-2">
            <TooltipProvider>
              <div className="flex flex-wrap gap-2">
                {presetColors.map(([name, color]) => (
                  <Tooltip key={color}>
                    <TooltipTrigger asChild>
                      <button
                        key={color}
                        type="button"
                        title={`${name} ${color}`}
                        aria-label={`${name} ${color}`}
                        aria-pressed={draft.theme.primaryColor?.toLowerCase() === color}
                        onClick={() => updateDraftField("theme", "primaryColor", color)}
                        className={`grid size-9 place-items-center rounded-full border-2 border-card shadow-sm outline-offset-2 ${draft.theme.primaryColor?.toLowerCase() === color ? "ring-2 ring-foreground" : "ring-1 ring-border"}`}
                        style={{ backgroundColor: color, color: onColor(color) }}
                      >
                        {draft.theme.primaryColor?.toLowerCase() === color && (
                          <Check className="size-4" />
                        )}
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>
                      {name} · {color}
                    </TooltipContent>
                  </Tooltip>
                ))}
                {!presetColors.some(
                  ([, color]) => color === draft.theme.primaryColor?.toLowerCase(),
                ) &&
                  HEX_COLOR.test(draft.theme.primaryColor || "") && (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          type="button"
                          aria-label={`Custom ${draft.theme.primaryColor}`}
                          aria-pressed="true"
                          className="grid size-9 place-items-center rounded-full border-2 border-card ring-2 ring-foreground"
                          style={{
                            backgroundColor: draft.theme.primaryColor,
                            color: onColor(draft.theme.primaryColor),
                          }}
                        >
                          <Check className="size-4" />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent>Custom · {draft.theme.primaryColor}</TooltipContent>
                    </Tooltip>
                  )}
              </div>
            </TooltipProvider>
            <div className="mt-4 grid gap-4 md:grid-cols-[1fr_auto]">
              <Label className="space-y-2 text-sm text-foreground">
                <span>Primary color</span>
                <span className="flex items-center gap-2">
                  <span
                    className="size-9 shrink-0 rounded-lg border border-border"
                    aria-hidden="true"
                    style={{ backgroundColor: pickerColor(draft.theme.primaryColor) }}
                  />
                  <Input
                    value={draft.theme.primaryColor || "#2563eb"}
                    aria-invalid={!HEX_COLOR.test(draft.theme.primaryColor || "")}
                    onChange={(event) =>
                      updateDraftField("theme", "primaryColor", event.target.value)
                    }
                  />
                </span>
                {!HEX_COLOR.test(draft.theme.primaryColor || "") && (
                  <span className="text-xs text-destructive">Use #RGB or #RRGGBB.</span>
                )}
              </Label>
              <Label className="space-y-2 text-sm text-foreground">
                <span>Picker</span>
                <Input
                  type="color"
                  value={pickerColor(draft.theme.primaryColor)}
                  onChange={(event) =>
                    updateDraftField("theme", "primaryColor", event.target.value)
                  }
                  className="h-11 min-w-16 cursor-pointer p-1"
                />
              </Label>
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              Text on this color will be{" "}
              {onColor(draft.theme.primaryColor) === "#18181b" ? "dark" : "light"}.
            </p>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-sm text-foreground">Light / dark mode</span>
              <div className="inline-flex rounded-xl border border-border bg-background p-1">
                {["light", "dark"].map((mode) => (
                  <Button
                    variant="ghost"
                    key={mode}
                    type="button"
                    onClick={() => updateDraftField("theme", "mode", mode)}
                    className={`rounded-lg px-3 py-1 text-sm ${draft.theme.mode === mode ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"}`}
                  >
                    {mode}
                  </Button>
                ))}
              </div>
            </div>
          </Card>

          <Card title="Messages" subtitle="Text the bot sends to customers." className="order-4">
            <div className="space-y-4">
              <CharLimitInput
                id="appearance-greeting"
                label="Greeting message"
                maxLength={TEXT_LIMITS.greetingMessage}
                multiline
                rows={4}
                value={draft.texts.greetingMessage || ""}
                onChange={(event) =>
                  updateDraftField("texts", "greetingMessage", event.target.value)
                }
              />
              <CharLimitInput
                id="appearance-placeholder"
                label="Input placeholder"
                maxLength={TEXT_LIMITS.inputPlaceholder}
                value={draft.texts.inputPlaceholder || ""}
                onChange={(event) =>
                  updateDraftField("texts", "inputPlaceholder", event.target.value)
                }
              />
              <CharLimitInput
                id="appearance-offline"
                label="Offline message"
                maxLength={TEXT_LIMITS.offlineMessage}
                multiline
                value={draft.texts.offlineMessage || ""}
                rows={3}
                onChange={(event) =>
                  updateDraftField("texts", "offlineMessage", event.target.value)
                }
              />
              <div className="space-y-3">
                <Label>
                  Starter questions ({(draft.texts.starterQuestions || []).length}/
                  {TEXT_LIMITS.starterQuestions})
                </Label>
                {(draft.texts.starterQuestions || []).map((question, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <CharLimitInput
                      id={`starter-${index}`}
                      label={`Question ${index + 1}`}
                      maxLength={TEXT_LIMITS.starterQuestion}
                      value={question}
                      className="min-w-0 flex-1"
                      onChange={(event) =>
                        updateDraftField(
                          "texts",
                          "starterQuestions",
                          draft.texts.starterQuestions.map((item, i) =>
                            i === index ? event.target.value : item,
                          ),
                        )
                      }
                    />
                    <div className="mt-6 flex shrink-0 gap-1">
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        aria-label={`Move question ${index + 1} up`}
                        disabled={index === 0}
                        onClick={() => {
                          const next = [...draft.texts.starterQuestions];
                          [next[index - 1], next[index]] = [next[index], next[index - 1]];
                          updateDraftField("texts", "starterQuestions", next);
                        }}
                      >
                        <ArrowUp className="size-4" />
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        aria-label={`Move question ${index + 1} down`}
                        disabled={index === draft.texts.starterQuestions.length - 1}
                        onClick={() => {
                          const next = [...draft.texts.starterQuestions];
                          [next[index + 1], next[index]] = [next[index], next[index + 1]];
                          updateDraftField("texts", "starterQuestions", next);
                        }}
                      >
                        <ArrowDown className="size-4" />
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          updateDraftField(
                            "texts",
                            "starterQuestions",
                            draft.texts.starterQuestions.filter((_, i) => i !== index),
                          )
                        }
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                ))}
                {(draft.texts.starterQuestions || []).length < TEXT_LIMITS.starterQuestions && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      updateDraftField("texts", "starterQuestions", [
                        ...(draft.texts.starterQuestions || []),
                        "",
                      ])
                    }
                  >
                    Add question
                  </Button>
                )}
              </div>
            </div>
          </Card>

          <Card
            title="Layout"
            subtitle="Set the widget position, shape and type."
            className="order-3"
          >
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Position</Label>
                <Select
                  value={draft.theme.position || "right"}
                  onValueChange={(value) => updateDraftField("theme", "position", value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="right">Right</SelectItem>
                    <SelectItem value="left">Left</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Label className="space-y-2 text-sm text-foreground">
                <span>Border radius: {draft.theme.borderRadius ?? 16}px</span>
                <Input
                  type="range"
                  min="0"
                  max="28"
                  value={draft.theme.borderRadius ?? 16}
                  onChange={(event) =>
                    updateDraftField("theme", "borderRadius", Number(event.target.value))
                  }
                  className="w-full"
                />
              </Label>
              <div className="space-y-2">
                <Label>Font family</Label>
                <Select
                  value={draft.theme.fontFamily || "system"}
                  onValueChange={(value) => updateDraftField("theme", "fontFamily", value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>System</SelectLabel>
                      <SelectItem value="system" style={{ fontFamily: "system-ui" }}>
                        System
                      </SelectItem>
                    </SelectGroup>
                    <SelectGroup>
                      <SelectLabel>Sans</SelectLabel>
                      <SelectItem value="sans" style={{ fontFamily: "Arial, sans-serif" }}>
                        Arial
                      </SelectItem>
                    </SelectGroup>
                    <SelectGroup>
                      <SelectLabel>Serif</SelectLabel>
                      <SelectItem value="serif" style={{ fontFamily: "Georgia, serif" }}>
                        Georgia
                      </SelectItem>
                    </SelectGroup>
                    <SelectGroup>
                      <SelectLabel>Mono</SelectLabel>
                      <SelectItem value="mono" style={{ fontFamily: "ui-monospace, monospace" }}>
                        Monospace
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <Switch
                checked={Boolean(draft.branding?.showBadge)}
                label="Show powered by badge"
                onChange={(value) => updateDraftField("branding", "showBadge", value)}
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() =>
                  setDraft((current) => ({
                    ...current,
                    theme: { ...current.theme, ...DEFAULT_CONFIG.theme },
                    texts: { ...current.texts, ...DEFAULT_CONFIG.texts },
                  }))
                }
              >
                Reset to defaults
              </Button>
            </div>
          </Card>
        </div>

        <AppearancePreview botId={selectedBotId} config={draft} />
        <div className="fixed inset-x-0 bottom-0 z-30 flex items-center justify-between gap-3 border-t border-border bg-card/95 p-3 shadow-sm backdrop-blur-sm lg:left-64">
          <span
            className={`flex items-center gap-2 text-sm ${dirty ? "text-foreground" : "text-muted-foreground"}`}
          >
            {dirty && <span className="size-2 rounded-full bg-warning" />}
            {dirty ? "Unsaved changes" : "All changes saved"}
          </span>
          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              disabled={!dirty || savingAppearance}
              onClick={resetAppearance}
            >
              Discard
            </Button>
            <Button
              type="button"
              disabled={
                !dirty || savingAppearance || !HEX_COLOR.test(draft.theme.primaryColor || "")
              }
              onClick={saveAppearance}
            >
              {savingAppearance ? "Saving…" : "Save changes"}
            </Button>
          </div>
        </div>
      </div>
    );
  };

  const renderKnowledge = () => (
    <KnowledgeBasePanel
      botId={selectedBotId}
      documents={documents}
      loading={loading}
      error={detailError}
      onReload={() => setReloadKey((value) => value + 1)}
      onAdd={async (payload) => {
        await addDocument(selectedBotId, payload);
        setDocuments(await listDocuments(selectedBotId));
      }}
      onUpdate={async (documentId, action) => {
        await updateDocument(selectedBotId, documentId, action);
        setDocuments(await listDocuments(selectedBotId));
        notify.success(action === "retry" ? "Source retry started." : "Source re-sync started.");
      }}
      onDelete={async (documentId) => {
        await deleteDocument(selectedBotId, documentId);
        setDocuments((current) => current.filter((document) => document.id !== documentId));
      }}
    />
  );

  const renderSettings = () => {
    if (!draft) return <Skeleton className="h-72 w-full rounded-2xl" />;

    return (
      <div className="space-y-6">
        <Card title="Notifications" subtitle="Email alerts for leads and status changes.">
          <div className="space-y-4">
            <Label className="space-y-2 text-sm text-foreground">
              <span>Notification emails</span>
              <Input
                value={(draft.settings?.notificationEmails || []).join(", ")}
                onChange={(event) =>
                  updateDraftField(
                    "settings",
                    "notificationEmails",
                    event.target.value
                      .split(",")
                      .map((item) => item.trim())
                      .filter(Boolean),
                  )
                }
              />
            </Label>
            <div className="flex flex-wrap gap-2">
              {(draft.settings?.notificationEmails || []).map((email) => (
                <Badge key={email} tone="info">
                  <Mail className="mr-1 size-3" />
                  {email}
                </Badge>
              ))}
            </div>
            <Switch
              checked={Boolean(draft.settings?.sendConfirmationEmail)}
              label="Send confirmation email to visitors"
              onChange={(value) => updateDraftField("settings", "sendConfirmationEmail", value)}
            />
          </div>
        </Card>

        <Card title="Assistant rules" subtitle="Keep the bot aligned with your workflow.">
          <Textarea
            rows={5}
            value={draft.settings?.assistantRules || ""}
            onChange={(event) => updateDraftField("settings", "assistantRules", event.target.value)}
          />
        </Card>

        <Card title="Allowed domains" subtitle="Optional hosts for embed and CORS validation.">
          <Input
            value={(draft.settings?.allowedDomains || []).join(", ")}
            onChange={(event) =>
              updateDraftField(
                "settings",
                "allowedDomains",
                event.target.value
                  .split(",")
                  .map((item) => item.trim())
                  .filter(Boolean),
              )
            }
          />
        </Card>
        <Card
          title="Booking form fields"
          subtitle="Fields visitors see when requesting an appointment"
        >
          <div className="space-y-2">
            {(draft.settings?.bookingFields || []).map((field) => (
              <div
                key={field.id}
                className="flex items-center gap-3 rounded-lg border border-border p-3 text-sm"
              >
                <GripVertical className="size-4 text-muted-foreground" />
                <span className="min-w-0 flex-1 truncate text-foreground">{field.label}</span>
                <Badge tone="default">{field.type}</Badge>
                {field.required && <Badge tone="info">Required</Badge>}
              </div>
            ))}
          </div>
        </Card>
        <Card title="Working hours" subtitle="Availability shown on the booking form">
          <div className="grid gap-2 sm:grid-cols-2">
            {Object.entries(draft.settings?.workingHours || {}).map(([day, hours]) => (
              <div
                key={day}
                className="flex items-center justify-between gap-3 rounded-lg border border-border p-3 text-sm"
              >
                <span className="flex items-center gap-2 capitalize text-foreground">
                  <Clock3 className="size-4 text-muted-foreground" />
                  {day}
                </span>
                <span className="text-muted-foreground">
                  {hours.closed ? "Closed" : `${hours.open}–${hours.close}`}
                </span>
              </div>
            ))}
          </div>
        </Card>
        <div className="flex justify-end">
          <Button
            type="button"
            disabled={
              savingSettings || JSON.stringify(draft.settings) === JSON.stringify(bot?.settings)
            }
            onClick={saveSettings}
          >
            {savingSettings ? "Saving…" : "Save settings"}
          </Button>
        </div>
      </div>
    );
  };

  const renderInstall = () => {
    const safeBotId = selectedBotId.replace(/[^a-zA-Z0-9_-]/g, "");
    const script =
      appOrigin && safeBotId
        ? `<script src="${appOrigin}/widget.js" data-bot-id="${safeBotId}" data-api-base="${process.env.NEXT_PUBLIC_API_BASE_URL || ""}"></script>`
        : "Loading install snippet…";

    return (
      <div className="space-y-6">
        <Tabs defaultValue="script">
          <TabsList>
            <TabsTrigger value="script">Script tag</TabsTrigger>
            <TabsTrigger value="wordpress">WordPress</TabsTrigger>
          </TabsList>
          <TabsContent value="script" className="mt-4">
            <Card title="Install script">
              <p className="mb-3 text-sm text-muted-foreground">
                Paste this snippet before the closing body tag.
              </p>
              <div className="relative">
                <pre className="overflow-x-auto rounded-xl bg-foreground p-4 pr-24 text-sm text-background">
                  <code>{script}</code>
                </pre>
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  className="absolute top-2 right-2"
                  onClick={async () => {
                    try {
                      await navigator.clipboard.writeText(script);
                      setToast("Snippet copied.");
                    } catch {
                      setToast("Copy failed. Select the snippet instead.");
                    }
                  }}
                >
                  <Copy className="size-3.5" /> Copy
                </Button>
              </div>
            </Card>
          </TabsContent>
          <TabsContent value="wordpress" className="mt-4">
            <Card title="WordPress plugin">
              <p className="text-sm text-muted-foreground">
                The plugin is planned. For now, add the script tag to your site footer or a custom
                HTML block.
              </p>
            </Card>
          </TabsContent>
        </Tabs>
        <Card title="Advanced override">
          <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
            <li>data-primary-color</li>
            <li>data-greeting</li>
            <li>data-position</li>
            <li>data-bot-name</li>
          </ul>
          <p className="mt-3 text-sm text-muted-foreground">
            Precedence is script attributes over saved dashboard config, then defaults.
          </p>
        </Card>
      </div>
    );
  };

  const renderConversations = () => (
    <ConversationsPanel
      conversations={conversations}
      leads={leads}
      loading={loading}
      error={detailError}
      onRetry={() => setReloadKey((value) => value + 1)}
      botId={selectedBotId}
      initialConversationId={searchParams.get("conversation")}
    />
  );

  const renderLeads = () => (
    <LeadsPanel
      leads={leads}
      loading={loading}
      error={detailError}
      onRetry={() => setReloadKey((value) => value + 1)}
      onStatusChange={async (leadId, status) => {
        try {
          const updated = await updateLeadStatus(leadId, status);
          setLeads((current) => current.map((lead) => (lead.id === leadId ? updated : lead)));
          notify.success("Lead status updated.");
        } catch (error) {
          notify.error(error.message || "Could not update lead.");
          throw error;
        }
      }}
    />
  );

  const renderBilling = () => (
    <BillingPanel usage={usage} loading={usageLoading} error={usageError} onRetry={loadUsage} />
  );

  const renderAccount = () => (
    <AccountSettingsPanel
      account={account}
      loading={accountLoading}
      error={accountError}
      onRetry={loadAccount}
      onSave={async (payload) => {
        const saved = await updateAccount(payload);
        setAccount(saved);
        return saved;
      }}
      onPassword={updatePassword}
    />
  );

  const renderContent = () => {
    if (page === "Overview") return renderOverview();
    if (page === "Bots") return renderBotsPage();
    if (page === "Conversations") return renderConversations();
    if (page === "Leads") return renderLeads();
    if (page === "Usage & Billing") return renderBilling();
    if (page === "Settings") return renderAccount();
    if (page === "Appearance") return renderAppearance();
    if (page === "Knowledge Base") return renderKnowledge();
    if (page === "Install") return renderInstall();
    return renderOverview();
  };

  const isBotDetailPage = page === "Appearance" || page === "Install";
  const currentPageLabel = isBotDetailPage
    ? botTabs.find((tab) => tab.value === tabFromQuery)?.label || "Appearance"
    : page;
  const botTabContent = isBotDetailPage
    ? (() => {
        if (tabFromQuery === "knowledge") return renderKnowledge();
        if (tabFromQuery === "settings") return renderSettings();
        if (tabFromQuery === "install") return renderInstall();
        return renderAppearance();
      })()
    : null;
  const sidebar = (
    <div className="flex h-full min-h-0 flex-col">
      <div className="flex items-center gap-3 px-5 pt-6 pb-7">
        <span className="grid size-9 place-items-center rounded-xl bg-primary text-primary-foreground">
          <MessageSquare className="size-5" />
        </span>
        <span className="truncate text-lg font-semibold tracking-tight text-foreground">
          {brand.name}
        </span>
      </div>
      <div className="px-3 pb-7">
        <BotSwitcher
          bots={bots}
          selectedId={selectedBotId}
          onSelect={selectBot}
          onCreate={openCreateFromSwitcher}
          onViewAll={viewAllBots}
        />
      </div>
      <nav className="flex-1 space-y-7 px-3" aria-label="Main navigation">
        {["Workspace", "Manage"].map((group) => (
          <div key={group} className="space-y-1">
            <p className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              {group}
            </p>
            {navItems
              .filter((item) => item.group === group)
              .map((item) => {
                const Icon = item.icon;
                const active =
                  item.label === page ||
                  (item.label === "Bots" &&
                    page === "Appearance" &&
                    tabFromQuery !== "knowledge") ||
                  (item.label === "Knowledge Base" && page === "Knowledge Base");
                const href = item.href;
                return (
                  <Link
                    key={item.label}
                    href={href}
                    onClick={() => setMobileNavOpen(false)}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${active ? "bg-accent text-primary" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`}
                  >
                    <Icon className="size-4 shrink-0" />
                    {item.label}
                  </Link>
                );
              })}
          </div>
        ))}
      </nav>
      <div className="border-t border-border p-3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              className="h-auto w-full justify-start gap-3 px-2 py-2"
            >
              <Avatar>
                <AvatarFallback className="bg-accent text-primary">U</AvatarFallback>
              </Avatar>
              <span className="min-w-0 flex-1 text-left">
                <span className="block truncate text-sm font-medium text-foreground">
                  {account?.name || "Account"}
                </span>
                <span className="block text-xs text-muted-foreground">Account menu</span>
              </span>
              <ChevronRight className="size-4 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem onSelect={() => router.push("/dashboard/account")}>
              Account settings
            </DropdownMenuItem>
            <DropdownMenuItem
              onSelect={async () => {
                await endAuthSession();
                window.location.replace("/login");
              }}
            >
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flex min-h-screen">
        <aside className="sticky top-0 hidden h-screen w-64 shrink-0 border-r border-border bg-card lg:block">
          {sidebar}
        </aside>

        <main className="min-w-0 flex-1">
          <header
            className={`${page === "Appearance" ? "relative" : "sticky top-0"} z-20 border-b border-border bg-card/90 backdrop-blur-sm`}
          >
            <div className="flex items-center justify-between gap-4 px-4 py-3 sm:px-6">
              <div className="flex min-w-0 items-center gap-3">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="lg:hidden"
                  aria-label="Open navigation"
                  onClick={() => setMobileNavOpen(true)}
                >
                  <Menu className="size-5" />
                </Button>
                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground">
                    {isBotDetailPage
                      ? `Bots / ${selectedBot?.name || "Bot"} / ${currentPageLabel}`
                      : `Workspace / ${currentPageLabel}`}
                  </p>
                  <p className="truncate text-sm font-semibold text-foreground">
                    {currentPageLabel}
                  </p>
                </div>
              </div>

              <div className="flex min-w-0 items-center gap-2 sm:gap-3">
                <div className="relative hidden xl:block">
                  <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    aria-label="Search coming soon"
                    placeholder="Search…"
                    disabled
                    className="w-48 pl-9"
                  />
                </div>
                <Badge
                  tone="default"
                  className="hidden border-border bg-transparent capitalize md:inline-flex"
                >
                  {usage?.plan || "free"}
                </Badge>
                <Avatar className="hidden sm:flex">
                  <AvatarFallback className="bg-accent text-primary">U</AvatarFallback>
                </Avatar>
              </div>
            </div>
          </header>
          <Sheet open={mobileNavOpen} onOpenChange={setMobileNavOpen}>
            <SheetContent side="left" className="w-64 gap-0 p-0" showCloseButton={false}>
              <SheetHeader className="sr-only">
                <SheetTitle>Navigation</SheetTitle>
              </SheetHeader>
              {sidebar}
            </SheetContent>
          </Sheet>

          <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
            {isBotDetailPage ? (
              <div className="space-y-6">
                <PageHeader
                  title={currentPageLabel}
                  description={selectedBot?.name || "Bot details"}
                  actions={
                    <Button type="button" variant="secondary" onClick={handleDeleteBot}>
                      Delete bot
                    </Button>
                  }
                />

                <div className="flex gap-2 overflow-x-auto pb-1">
                  {botTabs.map((tab) => (
                    <Link
                      key={tab.value}
                      href={`/dashboard/bots/${selectedBotId}?tab=${tab.value}`}
                      className={`shrink-0 rounded-full px-3 py-2 text-sm font-medium ${tabFromQuery === tab.value ? "bg-primary text-primary-foreground" : "bg-card text-foreground ring-1 ring-border"}`}
                    >
                      {tab.label}
                    </Link>
                  ))}
                </div>

                {botTabContent}
              </div>
            ) : (
              <div>
                {page !== "Overview" &&
                  page !== "Bots" &&
                  page !== "Knowledge Base" &&
                  page !== "Usage & Billing" &&
                  page !== "Settings" && (
                    <div className="mb-6">
                      <PageHeader
                        title={page}
                        description={
                          {
                            Conversations: "Review chats and follow up with visitors.",
                            Leads: "Manage contacts and appointment requests.",
                            "Usage & Billing": "Track your plan and conversation allowance.",
                            Settings: "Manage your account.",
                          }[page]
                        }
                      />
                    </div>
                  )}
                {renderContent()}
              </div>
            )}
          </div>
        </main>
      </div>
      <Dialog
        open={createDialogOpen}
        onOpenChange={(open) => {
          if (creatingBot) return;
          setCreateDialogOpen(open);
          if (!open) setCreateError("");
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create bot</DialogTitle>
            <DialogDescription>
              Give your chatbot a name. You can customize it after creating it.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleBotCreate} className="space-y-5">
            <CharLimitInput
              id="new-bot-name"
              label="Bot name"
              maxLength={TEXT_LIMITS.botName}
              value={newBotName}
              onChange={(event) => {
                setNewBotName(event.target.value);
                if (createError) setCreateError("");
              }}
              placeholder="e.g. Customer support"
              error={createError}
              autoFocus
              disabled={creatingBot}
            />
            <DialogFooter>
              <Button
                type="button"
                variant="secondary"
                disabled={creatingBot}
                onClick={() => setCreateDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={creatingBot}>
                {creatingBot ? "Creating…" : "Create bot"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
