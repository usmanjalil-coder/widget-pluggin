"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Badge,
  Button,
  Card,
  EmptyState,
  Input,
  Select,
  Skeleton,
  Switch,
  Textarea,
} from "@/components/ui";
import {
  createBot,
  deleteBot,
  getBots,
  getBot,
  getOnboarding,
  getUsage,
  listConversations,
  listDocuments,
  listLeads,
  updateBot,
} from "@/lib/api";

const navItems = [
  { label: "Overview", href: "/dashboard" },
  { label: "Bots", href: "/dashboard/bots" },
  { label: "Conversations", href: "/dashboard/conversations" },
  { label: "Leads", href: "/dashboard/leads" },
  { label: "Knowledge Base", href: "/dashboard/bots/demo?tab=knowledge" },
  { label: "Usage & Billing", href: "/dashboard/billing" },
  { label: "Settings", href: "/dashboard/account" },
];

const botTabs = [
  { label: "Appearance", value: "appearance" },
  { label: "Knowledge Base", value: "knowledge" },
  { label: "Settings", value: "settings" },
  { label: "Install", value: "install" },
];

const presetColors = [
  "#2563eb",
  "#0f172a",
  "#0891b2",
  "#10b981",
  "#f59e0b",
  "#ef4444",
  "#7c3aed",
  "#ec4899",
];

function readStoredBot() {
  if (typeof window === "undefined") {
    return null;
  }
  return window.localStorage.getItem("chatbot-current-bot");
}

export default function DashboardApp({ page = "Overview", botId = null }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const previewRef = useRef(null);
  const previewInstance = useRef(null);

  const [bots, setBots] = useState([]);
  const [selectedBotId, setSelectedBotId] = useState(botId || "demo");
  const [bot, setBot] = useState(null);
  const [draft, setDraft] = useState(null);
  const [usage, setUsage] = useState(null);
  const [leads, setLeads] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [onboarding, setOnboarding] = useState(null);
  const [toast, setToast] = useState("");
  const [dirty, setDirty] = useState(false);
  const [selectedConversationId, setSelectedConversationId] = useState(null);
  const [newBotName, setNewBotName] = useState("");
  const [leadFilter, setLeadFilter] = useState("all");
  const [chatPreviewOpen, setChatPreviewOpen] = useState(true);

  const tabFromQuery = searchParams.get("tab") || "appearance";
  const selectedBot = bots.find((item) => item.id === selectedBotId) || bots[0];
  const activeConversation =
    conversations.find((conv) => conv.id === selectedConversationId) ||
    conversations[0];

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

  useEffect(() => {
    async function fetchData() {
      try {
        const [botList, usageData, onboardingData] = await Promise.all([
          getBots(),
          getUsage(),
          getOnboarding(),
        ]);
        setBots(botList || []);
        setUsage(usageData || {});
        setOnboarding(onboardingData || { checklist: {} });
      } catch (error) {
        setToast("Could not load dashboard data.");
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    if (!bots.length) return;
    const fallback = botId || selectedBotId || readStoredBot() || bots[0].id;
    const nextId = bots.some((botItem) => botItem.id === fallback)
      ? fallback
      : bots[0].id;
    setSelectedBotId(nextId);
    if (typeof window !== "undefined") {
      window.localStorage.setItem("chatbot-current-bot", nextId);
    }
  }, [bots, botId, selectedBotId]);

  useEffect(() => {
    if (!selectedBotId) return;

    async function fetchBotDetails() {
      setLoading(true);
      try {
        const [
          botResponse,
          leadResponse,
          documentResponse,
          conversationResponse,
        ] = await Promise.all([
          getBot(selectedBotId),
          listLeads(selectedBotId),
          listDocuments(selectedBotId),
          listConversations(selectedBotId),
        ]);

        setBot(botResponse);
        setDraft(botResponse);
        setLeads(leadResponse || []);
        setDocuments(documentResponse || []);
        setConversations(conversationResponse || []);
        setSelectedConversationId((conversationResponse || [])[0]?.id || null);
      } catch (error) {
        setToast("Failed to load this bot.");
      } finally {
        setLoading(false);
      }
    }

    fetchBotDetails();
  }, [selectedBotId]);

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(""), 2800);
    return () => clearTimeout(timer);
  }, [toast]);

  useEffect(() => {
    if (page !== "Appearance" || !draft || !previewRef.current) return;

    const initPreview = async () => {
      if (!window.ChatbotWidget) return;
      if (
        previewInstance.current &&
        typeof previewInstance.current.destroy === "function"
      ) {
        previewInstance.current.destroy();
      }

      const instance = await window.ChatbotWidget.init({
        botId: selectedBotId,
        config: {
          ...draft,
          theme: { ...draft.theme },
          texts: { ...draft.texts },
          branding: { ...draft.branding },
        },
        container: previewRef.current,
      });

      previewInstance.current = instance;
    };

    if (window.ChatbotWidget) {
      void initPreview();
      return () => {
        if (
          previewInstance.current &&
          typeof previewInstance.current.destroy === "function"
        ) {
          previewInstance.current.destroy();
        }
      };
    }

    const script = document.createElement("script");
    script.src = "/widget.js";
    script.async = true;
    script.onload = () => {
      void initPreview();
    };
    document.head.appendChild(script);

    return () => {
      if (
        previewInstance.current &&
        typeof previewInstance.current.destroy === "function"
      ) {
        previewInstance.current.destroy();
      }
      script.remove();
    };
  }, [page, draft, selectedBotId]);

  useEffect(() => {
    if (!previewInstance.current || !draft) return;
    if (typeof previewInstance.current.update === "function") {
      previewInstance.current.update({
        ...draft,
        theme: { ...draft.theme },
        texts: { ...draft.texts },
        branding: { ...draft.branding },
      });
    }
  }, [draft]);

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
    setDirty(true);
  };

  const saveAppearance = async () => {
    if (!selectedBotId || !draft) return;
    try {
      const saved = await updateBot(selectedBotId, draft);
      setBot(saved);
      setDraft(saved);
      setDirty(false);
      setToast("Appearance saved. The public widget is updated.");
    } catch (error) {
      setToast("Unable to save this appearance yet.");
    }
  };

  const resetAppearance = () => {
    setDraft(bot);
    setDirty(false);
  };

  const filteredLeads = useMemo(() => {
    if (leadFilter === "all") return leads;
    return leads.filter((lead) => lead.status === leadFilter);
  }, [leadFilter, leads]);

  const onboardingChecklist = [
    { key: "botCreated", label: "Bot created", href: "/onboarding" },
    {
      key: "knowledgeAdded",
      label: "Knowledge added",
      href: `/dashboard/bots/${selectedBotId || "demo"}?tab=knowledge`,
    },
    {
      key: "lookCustomized",
      label: "Look customized",
      href: `/dashboard/bots/${selectedBotId || "demo"}?tab=appearance`,
    },
    {
      key: "snippetInstalled",
      label: "Snippet installed",
      href: `/dashboard/bots/${selectedBotId || "demo"}?tab=install`,
    },
    { key: "firstTestDone", label: "First test chat done", href: "/test.html" },
  ];

  const completedChecklistCount = onboardingChecklist.filter(
    (item) => onboarding?.checklist?.[item.key],
  ).length;

  const handleBotCreate = async (event) => {
    event.preventDefault();
    if (!newBotName.trim()) return;

    try {
      const created = await createBot({ name: newBotName.trim() });
      const nextBots = await getBots();
      setBots(nextBots);
      setSelectedBotId(created.id);
      setNewBotName("");
      setToast("New bot created.");
      router.push(`/dashboard/bots/${created.id}?tab=appearance`);
    } catch (error) {
      setToast("Could not create a bot right now.");
    }
  };

  const handleDeleteBot = async () => {
    if (!selectedBotId) return;
    try {
      await deleteBot(selectedBotId);
      const nextBots = await getBots();
      setBots(nextBots);
      setSelectedBotId(nextBots[0]?.id || "demo");
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
        value: usage?.conversations || 32,
        suffix: "this month",
      },
      { label: "Messages", value: usage?.messages || 184, suffix: "sent" },
      {
        label: "Leads captured",
        value: leads.length || usage?.leads || 15,
        suffix: "total",
      },
      {
        label: "Unanswered",
        value: conversations.filter((item) => item.unanswered).length || 6,
        suffix: "queued",
      },
    ];

    return (
      <div className="space-y-6">
        {!onboarding?.skipped && (
          <Card
            title="Getting started"
            subtitle={`${completedChecklistCount}/${onboardingChecklist.length} complete`}
          >
            <div className="mt-4 space-y-3">
              {onboardingChecklist.map((item) => (
                <div
                  key={item.key}
                  className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 p-3"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-semibold ${onboarding?.checklist?.[item.key] ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-500"}`}
                    >
                      {onboarding?.checklist?.[item.key] ? "✓" : "•"}
                    </span>
                    <span className="text-sm text-slate-700">{item.label}</span>
                  </div>
                  <Link
                    href={item.href}
                    className="text-xs font-medium text-blue-600"
                  >
                    Open
                  </Link>
                </div>
              ))}
            </div>
          </Card>
        )}

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {metrics.map((metric) => (
            <Card key={metric.label} className="p-4">
              <p className="text-xs uppercase tracking-[0.14em] text-slate-500">
                {metric.label}
              </p>
              <div className="mt-4 flex items-end justify-between gap-2">
                <span className="text-3xl font-semibold text-slate-900">
                  {metric.value}
                </span>
                <span className="text-xs text-slate-500">{metric.suffix}</span>
              </div>
            </Card>
          ))}
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.5fr_0.7fr]">
          <Card
            title="30-day conversations"
            subtitle="Estimated traffic and engagement"
          >
            <svg
              viewBox="0 0 800 220"
              className="mt-4 h-52 w-full"
              preserveAspectRatio="none"
            >
              <path
                d="M0 180 C120 180, 180 150, 220 120 S350 60, 420 90 S560 170, 800 50 L800 220 L0 220Z"
                fill="#dbeafe"
                opacity="0.7"
              />
              <path
                d="M0 170 C120 170, 180 130, 220 110 S350 70, 420 95 S560 160, 800 45"
                fill="none"
                stroke="#2563eb"
                strokeWidth="4"
                strokeLinecap="round"
              />
              <path
                d="M0 170 L0 220 L800 220"
                fill="none"
                stroke="#dfe7f4"
                strokeWidth="1.5"
              />
            </svg>
          </Card>

          <Card title="Recent leads">
            <div className="space-y-3 mt-4">
              {leads.slice(0, 4).map((lead) => (
                <div
                  key={lead.id}
                  className="flex items-center justify-between rounded-xl border border-slate-200 p-3"
                >
                  <div>
                    <p className="font-medium text-slate-800">{lead.name}</p>
                    <p className="text-xs text-slate-500">{lead.email}</p>
                  </div>
                  <Badge
                    tone={
                      lead.status === "done"
                        ? "success"
                        : lead.status === "confirmed"
                          ? "info"
                          : "warning"
                    }
                  >
                    {lead.status}
                  </Badge>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    );
  };

  const renderBotsPage = () => (
    <div className="space-y-6">
      <Card
        title="Create a new bot"
        subtitle="Set up a bot and configure its appearance or knowledge base next."
      >
        <form
          onSubmit={handleBotCreate}
          className="flex flex-col gap-3 md:flex-row"
        >
          <Input
            value={newBotName}
            onChange={(event) => setNewBotName(event.target.value)}
            placeholder="Bot name"
            className="md:max-w-sm"
          />
          <Button type="submit">Create bot</Button>
        </form>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {bots.map((botItem) => (
          <Card key={botItem.id} className="flex flex-col justify-between">
            <div>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">
                    {botItem.name}
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">{botItem.id}</p>
                </div>
                <Badge tone="success">{botItem.status}</Badge>
              </div>
              <div className="mt-4 space-y-2 text-sm text-slate-600">
                <p>
                  {
                    (
                      conversations.filter(
                        (item) => item.botId === botItem.id,
                      ) || []
                    ).length
                  }{" "}
                  conversations
                </p>
                <p>
                  {
                    (leads.filter((item) => item.botId === botItem.id) || [])
                      .length
                  }{" "}
                  leads
                </p>
              </div>
            </div>
            <div className="mt-5 flex gap-2">
              <Link
                href={`/dashboard/bots/${botItem.id}?tab=appearance`}
                className="inline-flex items-center rounded-xl border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                Edit
              </Link>
              <button
                type="button"
                onClick={() => setSelectedBotId(botItem.id)}
                className="inline-flex items-center rounded-xl bg-slate-900 px-3 py-2 text-sm font-medium text-white hover:bg-slate-800"
              >
                Select
              </button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderAppearance = () => {
    if (!draft || loading) {
      return (
        <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <Skeleton className="h-96 w-full rounded-2xl" />
          <Skeleton className="h-96 w-full rounded-2xl" />
        </div>
      );
    }

    return (
      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6">
          <Card title="Branding" subtitle="Your public widget identity.">
            <div className="grid gap-4 md:grid-cols-2">
              <label className="space-y-2 text-sm text-slate-700">
                <span>Bot name</span>
                <Input
                  value={draft.texts.botName || ""}
                  onChange={(event) =>
                    updateDraftField("texts", "botName", event.target.value)
                  }
                />
              </label>
              <label className="space-y-2 text-sm text-slate-700">
                <span>Launcher label</span>
                <Input
                  value={draft.texts.launcherLabel || ""}
                  onChange={(event) =>
                    updateDraftField(
                      "texts",
                      "launcherLabel",
                      event.target.value,
                    )
                  }
                />
              </label>
              <label className="space-y-2 text-sm text-slate-700 md:col-span-2">
                <span>Avatar URL</span>
                <Input
                  value={draft.texts.avatarUrl || ""}
                  onChange={(event) =>
                    updateDraftField("texts", "avatarUrl", event.target.value)
                  }
                  placeholder="https://example.com/avatar.png"
                />
              </label>
            </div>
          </Card>

          <Card title="Colors" subtitle="Review text contrast before saving.">
            <div className="flex flex-wrap gap-2">
              {presetColors.map((color) => (
                <button
                  key={color}
                  type="button"
                  aria-label={`Select ${color}`}
                  onClick={() =>
                    updateDraftField("theme", "primaryColor", color)
                  }
                  className="h-8 w-8 rounded-full border-2 border-white shadow-sm ring-1 ring-slate-200"
                  style={{ background: color }}
                />
              ))}
            </div>
            <div className="mt-4 grid gap-4 md:grid-cols-[1fr_auto]">
              <label className="space-y-2 text-sm text-slate-700">
                <span>Primary color</span>
                <Input
                  value={draft.theme.primaryColor || "#2563eb"}
                  onChange={(event) =>
                    updateDraftField(
                      "theme",
                      "primaryColor",
                      event.target.value,
                    )
                  }
                />
              </label>
              <label className="space-y-2 text-sm text-slate-700">
                <span>Picker</span>
                <Input
                  type="color"
                  value={draft.theme.primaryColor || "#2563eb"}
                  onChange={(event) =>
                    updateDraftField(
                      "theme",
                      "primaryColor",
                      event.target.value,
                    )
                  }
                  className="h-11 min-w-16 cursor-pointer p-1"
                />
              </label>
            </div>
            <p className="mt-3 text-xs text-slate-500">
              Text on this color will be{" "}
              {draft.theme.primaryColor?.toLowerCase() === "#ffffff"
                ? "dark"
                : "light"}
              .
            </p>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-sm text-slate-700">Light / dark mode</span>
              <div className="inline-flex rounded-xl border border-slate-200 bg-slate-50 p-1">
                {["light", "dark"].map((mode) => (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => updateDraftField("theme", "mode", mode)}
                    className={`rounded-lg px-3 py-1 text-sm ${draft.theme.mode === mode ? "bg-white text-slate-900 shadow-sm" : "text-slate-500"}`}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </div>
          </Card>

          <Card title="Messages" subtitle="Text the bot sends to customers.">
            <div className="space-y-4">
              <label className="space-y-2 text-sm text-slate-700">
                <span>Greeting message</span>
                <Textarea
                  value={draft.texts.greetingMessage || ""}
                  maxLength={200}
                  rows={4}
                  onChange={(event) =>
                    updateDraftField(
                      "texts",
                      "greetingMessage",
                      event.target.value,
                    )
                  }
                />
                <span className="text-xs text-slate-500">
                  {(draft.texts.greetingMessage || "").length}/200
                </span>
              </label>
              <label className="space-y-2 text-sm text-slate-700">
                <span>Input placeholder</span>
                <Input
                  value={draft.texts.inputPlaceholder || ""}
                  onChange={(event) =>
                    updateDraftField(
                      "texts",
                      "inputPlaceholder",
                      event.target.value,
                    )
                  }
                />
              </label>
              <label className="space-y-2 text-sm text-slate-700">
                <span>Offline message</span>
                <Textarea
                  value={draft.texts.offlineMessage || ""}
                  rows={3}
                  onChange={(event) =>
                    updateDraftField(
                      "texts",
                      "offlineMessage",
                      event.target.value,
                    )
                  }
                />
              </label>
            </div>
          </Card>

          <Card title="Layout" subtitle="Small tweaks to the embed experience.">
            <div className="space-y-4">
              <label className="space-y-2 text-sm text-slate-700">
                <span>Position</span>
                <Select
                  value={draft.theme.position || "right"}
                  onChange={(event) =>
                    updateDraftField("theme", "position", event.target.value)
                  }
                >
                  <option value="right">Right</option>
                  <option value="left">Left</option>
                </Select>
              </label>
              <label className="space-y-2 text-sm text-slate-700">
                <span>Border radius: {draft.theme.borderRadius || 16}px</span>
                <input
                  type="range"
                  min="0"
                  max="24"
                  value={draft.theme.borderRadius || 16}
                  onChange={(event) =>
                    updateDraftField(
                      "theme",
                      "borderRadius",
                      Number(event.target.value),
                    )
                  }
                  className="w-full"
                />
              </label>
              <label className="space-y-2 text-sm text-slate-700">
                <span>Font family</span>
                <Select
                  value={draft.theme.fontFamily || "system"}
                  onChange={(event) =>
                    updateDraftField("theme", "fontFamily", event.target.value)
                  }
                >
                  <option value="system">System</option>
                  <option value="serif">Serif</option>
                  <option value="rounded">Rounded</option>
                  <option value="mono">Mono</option>
                </Select>
              </label>
              <Switch
                checked={Boolean(draft.branding?.showBadge)}
                label="Show powered by badge"
                onChange={(value) =>
                  updateDraftField("branding", "showBadge", value)
                }
              />
            </div>
          </Card>
        </div>

        <div className="space-y-4">
          <Card className="!p-4">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-slate-800">
                Live preview
              </h3>
              <Button
                type="button"
                variant="secondary"
                className="!px-2 !py-1.5 text-xs"
                onClick={() => setChatPreviewOpen((current) => !current)}
              >
                {chatPreviewOpen ? "Close chat" : "Open the chat"}
              </Button>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-100 p-3">
              <div className="mb-2 flex items-center justify-between">
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setChatPreviewOpen(false)}
                    className={`rounded-lg px-2 py-1 text-xs ${!chatPreviewOpen ? "bg-slate-900 text-white" : "bg-slate-200 text-slate-600"}`}
                  >
                    Display
                  </button>
                  <button
                    type="button"
                    onClick={() => setChatPreviewOpen(true)}
                    className={`rounded-lg px-2 py-1 text-xs ${chatPreviewOpen ? "bg-slate-900 text-white" : "bg-slate-200 text-slate-600"}`}
                  >
                    Open
                  </button>
                </div>
                <span className="text-xs text-slate-500">Desktop</span>
              </div>
              <div
                ref={previewRef}
                className="h-[420px] overflow-hidden rounded-xl border border-slate-200 bg-white"
              />
            </div>
          </Card>
          <Card title="Quick actions">
            <div className="flex flex-wrap gap-3">
              <Button type="button" onClick={saveAppearance}>
                Save
              </Button>
              <Button
                type="button"
                variant="secondary"
                onClick={resetAppearance}
              >
                Reset draft
              </Button>
              <Button
                type="button"
                variant="secondary"
                onClick={() => setDraft(bot || draft)}
              >
                Reset to defaults
              </Button>
            </div>
            {dirty && (
              <div className="mt-3 inline-flex rounded-full bg-amber-100 px-2.5 py-1 text-xs font-medium text-amber-700">
                Unsaved changes
              </div>
            )}
          </Card>
        </div>
      </div>
    );
  };

  const renderKnowledge = () => (
    <div className="space-y-6">
      <Card
        title="Knowledge base"
        subtitle="Add URLs, documents, and FAQs to help the assistant answer accurately."
      >
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <Input placeholder="Paste a website URL" />
          <Button type="button">Add URL</Button>
        </div>
      </Card>
      {documents.length ? (
        <Card>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm text-slate-700">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500">
                  <th className="pb-3 pr-6">Name</th>
                  <th className="pb-3 pr-6">Type</th>
                  <th className="pb-3 pr-6">Status</th>
                  <th className="pb-3 pr-6">Updated</th>
                </tr>
              </thead>
              <tbody>
                {documents.map((document) => (
                  <tr
                    key={document.id}
                    className="border-b border-slate-100 last:border-none"
                  >
                    <td className="py-3 pr-6">{document.name}</td>
                    <td className="py-3 pr-6">{document.type}</td>
                    <td className="py-3 pr-6">
                      <Badge
                        tone={
                          document.status === "ready"
                            ? "success"
                            : document.status === "processing"
                              ? "info"
                              : "danger"
                        }
                      >
                        {document.status}
                      </Badge>
                    </td>
                    <td className="py-3 pr-6">
                      {new Date(document.updatedAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      ) : (
        <EmptyState
          title="No knowledge added yet"
          body="Link a site or upload a document to get the bot answering from real content."
        />
      )}
    </div>
  );

  const renderSettings = () => {
    if (!draft) return <Skeleton className="h-72 w-full rounded-2xl" />;

    return (
      <div className="space-y-6">
        <Card
          title="Notifications"
          subtitle="Email alerts for leads and status changes."
        >
          <div className="space-y-4">
            <label className="space-y-2 text-sm text-slate-700">
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
            </label>
            <Switch
              checked={Boolean(draft.settings?.sendConfirmationEmail)}
              label="Send confirmation email to visitors"
              onChange={(value) =>
                updateDraftField("settings", "sendConfirmationEmail", value)
              }
            />
          </div>
        </Card>

        <Card
          title="Assistant rules"
          subtitle="Keep the bot aligned with your workflow."
        >
          <Textarea
            rows={5}
            value={draft.settings?.assistantRules || ""}
            onChange={(event) =>
              updateDraftField("settings", "assistantRules", event.target.value)
            }
          />
        </Card>

        <Card
          title="Allowed domains"
          subtitle="Optional hosts for embed and CORS validation."
        >
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
      </div>
    );
  };

  const renderInstall = () => {
    const script = `<script src="https://app.example.com/widget.js" data-bot-id="${selectedBotId || "demo"}"></script>`;

    return (
      <div className="space-y-6">
        <Card title="Install script">
          <p className="mb-3 text-sm text-slate-600">
            Copy this snippet into your website or CMS.
          </p>
          <pre className="overflow-x-auto rounded-xl bg-slate-900 p-4 text-sm text-slate-100">
            {script}
          </pre>
        </Card>
        <Card title="Advanced override">
          <ul className="list-disc space-y-2 pl-5 text-sm text-slate-600">
            <li>data-primary-color</li>
            <li>data-greeting</li>
            <li>data-position</li>
            <li>data-bot-name</li>
          </ul>
          <p className="mt-3 text-sm text-slate-600">
            Precedence is script attributes over saved dashboard config, then
            defaults.
          </p>
        </Card>
      </div>
    );
  };

  const renderConversations = () => (
    <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
      <Card
        title="Conversations"
        subtitle="Recent interactions for selected bot"
      >
        <div className="mt-4 space-y-3">
          {conversations.map((conversation) => (
            <button
              key={conversation.id}
              type="button"
              onClick={() => setSelectedConversationId(conversation.id)}
              className={`w-full rounded-xl border p-3 text-left transition ${selectedConversationId === conversation.id ? "border-blue-200 bg-blue-50" : "border-slate-200 bg-white hover:bg-slate-50"}`}
            >
              <div className="flex items-center justify-between gap-3">
                <span className="font-medium text-slate-800">
                  {conversation.visitor}
                </span>
                <Badge tone={conversation.unanswered ? "warning" : "success"}>
                  {conversation.unanswered ? "Needs follow-up" : "Resolved"}
                </Badge>
              </div>
              <p className="mt-2 text-sm text-slate-600">
                {conversation.preview}
              </p>
            </button>
          ))}
        </div>
      </Card>

      <Card
        title="Transcript"
        subtitle={
          activeConversation
            ? `${activeConversation.visitor} • ${new Date(activeConversation.createdAt).toLocaleDateString()}`
            : "No conversation selected"
        }
      >
        {activeConversation ? (
          <div className="mt-4 space-y-3">
            {activeConversation.transcript?.map((item, index) => (
              <div
                key={`${item.role}-${index}`}
                className={`rounded-2xl px-3 py-2 text-sm ${item.role === "assistant" ? "bg-slate-100 text-slate-700" : "bg-blue-50 text-blue-900"}`}
              >
                <div className="mb-1 flex items-center justify-between text-[11px] uppercase tracking-[0.12em] text-slate-500">
                  <span>{item.role}</span>
                  <span>{item.time}</span>
                </div>
                {item.text}
              </div>
            ))}
          </div>
        ) : (
          <EmptyState
            title="No transcript"
            body="Select a conversation to view its details."
          />
        )}
      </Card>
    </div>
  );

  const renderLeads = () => (
    <div className="space-y-6">
      <Card
        title="Leads"
        subtitle="Track visitor intent and conversion status."
      >
        <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex gap-2">
            {["all", "new", "confirmed", "done"].map((status) => (
              <button
                key={status}
                type="button"
                onClick={() => setLeadFilter(status)}
                className={`rounded-full px-3 py-1.5 text-xs font-medium ${leadFilter === status ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-600"}`}
              >
                {status}
              </button>
            ))}
          </div>
          <Button type="button" variant="secondary">
            Export CSV
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm text-slate-700">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500">
                <th className="pb-3 pr-6">Name</th>
                <th className="pb-3 pr-6">Contact</th>
                <th className="pb-3 pr-6">Status</th>
                <th className="pb-3 pr-6">Created</th>
              </tr>
            </thead>
            <tbody>
              {filteredLeads.map((lead) => (
                <tr
                  key={lead.id}
                  className="border-b border-slate-100 last:border-none"
                >
                  <td className="py-3 pr-6">{lead.name}</td>
                  <td className="py-3 pr-6">{lead.email}</td>
                  <td className="py-3 pr-6">
                    <Badge
                      tone={
                        lead.status === "done"
                          ? "success"
                          : lead.status === "confirmed"
                            ? "info"
                            : "warning"
                      }
                    >
                      {lead.status}
                    </Badge>
                  </td>
                  <td className="py-3 pr-6">
                    {new Date(lead.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );

  const renderBilling = () => (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        {[
          {
            label: "Free",
            price: "$0",
            limit: "50 conversations / 1 bot",
            featured: false,
          },
          {
            label: "Starter",
            price: "$29",
            limit: "500 conversations / 1 bot",
            featured: false,
          },
          {
            label: "Pro",
            price: "$79",
            limit: "2,000 conversations / 3 bots",
            featured: true,
          },
        ].map((plan) => (
          <Card
            key={plan.label}
            className={plan.featured ? "border-blue-500 bg-blue-50" : ""}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-slate-900">
                {plan.label}
              </h3>
              {plan.featured && <Badge tone="info">Current</Badge>}
            </div>
            <div className="mt-4 text-3xl font-semibold text-slate-900">
              {plan.price}
              <span className="text-sm text-slate-500">/mo</span>
            </div>
            <p className="mt-2 text-sm text-slate-600">{plan.limit}</p>
            <Button
              type="button"
              className="mt-5 w-full"
              variant={plan.featured ? "primary" : "secondary"}
            >
              Upgrade
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderAccount = () => (
    <div className="space-y-6">
      <Card title="Account details">
        <div className="grid gap-4 md:grid-cols-2">
          <label className="space-y-2 text-sm text-slate-700">
            <span>Name</span>
            <Input value="Alex Morgan" readOnly />
          </label>
          <label className="space-y-2 text-sm text-slate-700">
            <span>Email</span>
            <Input value="alex@example.com" readOnly />
          </label>
        </div>
      </Card>
      <Card title="Security">
        <div className="space-y-4">
          <Input placeholder="New password" type="password" />
          <Button type="button">Update password</Button>
        </div>
      </Card>
    </div>
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

  const botTabContent = (() => {
    if (tabFromQuery === "knowledge") return renderKnowledge();
    if (tabFromQuery === "settings") return renderSettings();
    if (tabFromQuery === "install") return renderInstall();
    return renderAppearance();
  })();

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <div className="flex min-h-screen flex-col lg:flex-row">
        <aside className="w-full border-b border-slate-200 bg-slate-900 p-4 text-slate-100 lg:w-72 lg:border-b-0 lg:border-r">
          <div className="flex items-center justify-between lg:block">
            <div className="mb-0 flex items-center gap-3 lg:mb-6">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 font-semibold text-white">
                C
              </div>
              <div>
                <div className="text-xl font-semibold">Chatbot</div>
              </div>
            </div>
          </div>

          <nav className="mt-6 flex flex-col gap-2">
            {navItems.map((item) => {
              const isActive =
                item.label === page ||
                (item.label === "Knowledge Base" &&
                  page === "Appearance" &&
                  selectedBotId);
              const href =
                item.label === "Knowledge Base"
                  ? `/dashboard/bots/${selectedBotId || "demo"}?tab=knowledge`
                  : item.href;
              return (
                <Link
                  key={item.label}
                  href={href}
                  className={`rounded-xl px-3 py-2 text-sm font-medium transition ${isActive ? "bg-slate-800 text-white" : "text-slate-300 hover:bg-slate-800 hover:text-white"}`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </aside>

        <main className="flex-1">
          <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur-sm">
            <div className="flex items-center justify-between gap-4 px-4 py-3 sm:px-6">
              <div className="flex items-center gap-3">
                <Select
                  value={selectedBotId || "demo"}
                  onChange={(event) => {
                    const nextId = event.target.value;
                    setSelectedBotId(nextId);
                    if (typeof window !== "undefined")
                      window.localStorage.setItem(
                        "chatbot-current-bot",
                        nextId,
                      );
                    router.push(`/dashboard/bots/${nextId}?tab=appearance`);
                  }}
                  className="min-w-[180px]"
                >
                  {bots.map((botItem) => (
                    <option key={botItem.id} value={botItem.id}>
                      {botItem.name}
                    </option>
                  ))}
                </Select>
              </div>

              <div className="flex items-center gap-3">
                <Badge tone="info">{usage?.plan || "free"}</Badge>
                <button
                  type="button"
                  onClick={async () => {
                    await fetch("/api/auth/logout", { method: "POST" });
                    router.push("/login");
                  }}
                  className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                >
                  Log out
                </button>
              </div>
            </div>
          </header>

          <div className="px-4 py-6 sm:px-6">
            {page === "Appearance" ||
            page === "Knowledge Base" ||
            page === "Settings" ||
            page === "Install" ? (
              <div className="space-y-6">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm uppercase tracking-[0.16em] text-slate-500">
                      Bot detail
                    </p>
                    <h1 className="mt-1 text-2xl font-semibold text-slate-900">
                      {selectedBot?.name || "Bot details"}
                    </h1>
                  </div>
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={handleDeleteBot}
                  >
                    Delete bot
                  </Button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {botTabs.map((tab) => (
                    <Link
                      key={tab.value}
                      href={`/dashboard/bots/${selectedBotId || "demo"}?tab=${tab.value}`}
                      className={`rounded-full px-3 py-2 text-sm font-medium ${tabFromQuery === tab.value ? "bg-blue-600 text-white" : "bg-white text-slate-700 ring-1 ring-slate-200"}`}
                    >
                      {tab.label}
                    </Link>
                  ))}
                </div>

                {botTabContent}
              </div>
            ) : (
              <div>
                <div className="mb-6 flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm uppercase tracking-[0.16em] text-slate-500">
                      Dashboard
                    </p>
                    <h1 className="mt-1 text-3xl font-semibold text-slate-900">
                      {page}
                    </h1>
                  </div>
                </div>
                {renderContent()}
              </div>
            )}
          </div>
        </main>
      </div>

      {toast && (
        <div className="fixed bottom-5 right-5 rounded-xl bg-slate-900 px-4 py-3 text-sm font-medium text-white shadow-lg">
          {toast}
        </div>
      )}
    </div>
  );
}
