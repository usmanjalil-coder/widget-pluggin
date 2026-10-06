"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import {
  AlertCircle, Check, CheckCircle2, ChevronLeft, Clipboard, FileText, FileUp,
  Globe, Home, LoaderCircle, MessageSquare, Scissors, ShoppingBag, Smile,
  Sparkles, UtensilsCrossed,
} from "lucide-react";
import { Button, Card, Input, Label } from "@/components/ui";
import CharLimitInput from "@/components/shared/CharLimitInput";
import AppearancePreview from "@/components/dashboard/AppearancePreview";
import StatusBadge from "@/components/bots/StatusBadge";
import { brand } from "@/lib/brand";
import { HEX_COLOR, TEXT_LIMITS } from "@/lib/limits";

const STORAGE_KEY = "brand-onboarding";
const WIDGET_URL = process.env.NEXT_PUBLIC_WIDGET_URL || "/widget.js";
const STEPS = ["About your business", "Add knowledge", "Make it yours", "Install", "Done"];
const COLORS = ["#2563eb", "#0f172a", "#0891b2", "#10b981", "#f59e0b", "#ef4444", "#7c3aed", "#ec4899"];
const INDUSTRIES = [
  ["dental", "Dental", Smile], ["salon", "Salon", Scissors], ["real-estate", "Real estate", Home],
  ["restaurant", "Restaurant", UtensilsCrossed], ["ecommerce", "E-commerce", ShoppingBag], ["other", "Other", Sparkles],
];
const CONTENT = {
  dental: ["Dental Assistant", "Hi! I can help with opening hours, booking, and services.", ["What are your opening hours?", "Can I book an appointment?", "What services do you offer?"]],
  salon: ["Salon Assistant", "Hi! I can help with services, booking, and prices.", ["What services do you offer?", "Can I book an appointment?", "What are your prices?"]],
  "real-estate": ["Property Assistant", "Hi! I can help with listings, viewings, and pricing.", ["What listings are available?", "Can I book a viewing?", "What are the prices?"]],
  restaurant: ["Dining Assistant", "Hi! I can help with the menu, reservations, and opening hours.", ["Can I see the menu?", "Can I make a reservation?", "What are your opening hours?"]],
  ecommerce: ["Shop Assistant", "Hi! I can help with orders, shipping, and returns.", ["Where is my order?", "What are the shipping options?", "What is your returns policy?"]],
  other: ["Assistant", "Hi! I can answer questions about your business and help visitors get started.", ["What do you offer?", "How can I get started?", "How can I contact you?"]],
};
const INITIAL = {
  step: 0, businessName: "", websiteUrl: "", industry: "dental", botId: "", botName: "",
  greeting: "", position: "right", primaryColor: "#2563eb", knowledgeMethod: "website",
  websiteSource: "", faqText: "", sources: [], snippetCopied: false, installDetected: false,
};

function validUrl(value) {
  if (!value) return true;
  try {
    const parsed = new URL(value);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch { return false; }
}

async function patchOnboarding(payload) {
  const response = await fetch("/api/onboarding", {
    method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload),
  });
  if (!response.ok) throw new Error("Could not save onboarding progress.");
  return response.json();
}

function Stepper({ step }) {
  return <><ol className="hidden items-start sm:flex" aria-label="Onboarding progress">
    {STEPS.map((label, index) => {
      const complete = index < step;
      const current = index === step;
      return <li key={label} className="flex min-w-0 flex-1 flex-col items-center">
        <div className="flex w-full items-center">
          {index > 0 && <span className={"h-px flex-1 " + (complete ? "bg-primary" : "bg-border")} />}
          <span aria-current={current ? "step" : undefined} className={"grid size-8 shrink-0 place-items-center rounded-full border text-xs font-semibold " + (complete ? "border-primary bg-primary text-primary-foreground" : current ? "border-primary bg-card text-primary ring-2 ring-primary/30" : "border-border bg-muted text-muted-foreground")}>
            {complete ? <Check className="size-4" /> : index + 1}
          </span>
          {index < STEPS.length - 1 && <span className={"h-px flex-1 " + (complete ? "bg-primary" : "bg-border")} />}
        </div>
        <span className={"mt-2 text-center text-xs " + (current ? "font-medium text-foreground" : "text-muted-foreground")}>{label}</span>
      </li>;
    })}
  </ol><p className="text-center text-sm text-muted-foreground sm:hidden">Step {step + 1} of 5 · {STEPS[step]}</p></>;
}

function SourceList({ sources, onRemove }) {
  if (!sources.length) return null;
  return <div className="space-y-2"><p className="text-sm font-medium text-foreground">Added sources</p>
    {sources.map((source) => <div key={source.id} className="flex items-center gap-3 rounded-lg border border-border bg-card px-3 py-2">
      <FileText className="size-4 shrink-0 text-primary" /><span className="min-w-0 flex-1 truncate text-sm text-foreground">{source.name}</span>
      <StatusBadge status={source.status === "ready" ? "active" : "draft"} />
      <Button type="button" size="xs" variant="ghost" onClick={() => onRemove(source.id)}>Remove</Button>
    </div>)}
  </div>;
}

function InstallStep({ state, update }) {
  const [platform, setPlatform] = useState("HTML");
  const [email, setEmail] = useState("");
  const snippet = '<script src="' + WIDGET_URL + '" data-bot-id="' + state.botId + '"></script>';
  const instructions = {
    HTML: ["Copy the snippet below.", "Paste it before the closing </body> tag.", "Publish your site."],
    WordPress: ["Open your theme footer or a header/footer plugin.", "Paste the snippet in the footer.", "Save and clear any cache."],
    Shopify: ["Open Online Store, Themes, then Edit code.", "Open theme.liquid.", "Paste the snippet before </body> and save."],
    Webflow: ["Open Project settings and Custom code.", "Paste the snippet in Footer code.", "Publish your Webflow site."],
  };
  useEffect(() => {
    const timer = setTimeout(() => update({ installDetected: true }), 3500);
    return () => clearTimeout(timer);
  }, [update]);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(snippet);
      update({ snippetCopied: true });
      toast.success("Snippet copied.");
    } catch { toast.error("Copy failed. Select the snippet instead."); }
  };
  return <div className="space-y-5">
    <div className="flex gap-1 overflow-x-auto rounded-lg border border-border bg-muted p-1">
      {Object.keys(instructions).map((item) => <Button key={item} type="button" size="sm" variant={platform === item ? "secondary" : "ghost"} onClick={() => setPlatform(item)}>{item}</Button>)}
    </div>
    <Card className="p-6">
      <div className="flex items-start justify-between gap-3 rounded-lg bg-foreground p-4 text-primary-foreground">
        <code className="min-w-0 break-all text-xs leading-5">{snippet}</code>
        <Button type="button" size="sm" variant="secondary" onClick={copy}>{state.snippetCopied ? <><Check className="size-4" />Copied</> : <><Clipboard className="size-4" />Copy</>}</Button>
      </div>
      <ol className="mt-5 list-decimal space-y-2 pl-5 text-sm text-muted-foreground">
        {instructions[platform].map((item) => <li key={item}>{item}</li>)}
      </ol>
      <div className="mt-6 flex flex-col gap-2 border-t border-border pt-5 sm:flex-row">
        <Input value={email} onChange={(event) => setEmail(event.target.value)} type="email" placeholder="developer@example.com" aria-label="Developer email" />
        <Button type="button" variant="secondary" disabled={!email.includes("@")} onClick={() => { setEmail(""); toast.success("Instructions sent to your developer."); }}>Send</Button>
      </div>
    </Card>
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-border bg-card p-4">
      <span className="flex items-center gap-2 text-sm text-muted-foreground">{state.installDetected ? <CheckCircle2 className="size-4 text-success" /> : <LoaderCircle className="size-4 animate-spin text-primary" />}{state.installDetected ? "Widget detected" : "Waiting for first load..."}</span>
      <Button asChild variant="secondary"><a href="/test.html" target="_blank" rel="noreferrer">Test on a sample page</a></Button>
    </div>
  </div>;
}

export default function OnboardingFlow() {
  const router = useRouter();
  const [state, setState] = useState(INITIAL);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [later, setLater] = useState(false);
  const headingRef = useRef(null);
  const step = Math.min(Math.max(Number(state.step) || 0, 0), 4);
  const update = (patch) => setState((current) => ({ ...current, ...patch }));
  const assistant = state.botName || CONTENT[state.industry][0];
  const greeting = state.greeting || CONTENT[state.industry][1];

  useEffect(() => {
    let mounted = true;
    Promise.allSettled([
      fetch("/api/onboarding").then((response) => response.ok ? response.json() : {}),
      Promise.resolve(window.localStorage.getItem(STORAGE_KEY)),
    ]).then(([remote, local]) => {
      if (!mounted) return;
      let stored = {};
      try { stored = local.status === "fulfilled" && local.value ? JSON.parse(local.value) : {}; } catch {}
      setState({ ...INITIAL, ...(remote.value || {}), ...stored });
      setLoading(false);
    });
    return () => { mounted = false; };
  }, []);

  useEffect(() => {
    if (!loading) window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [loading, state]);
  useEffect(() => { headingRef.current?.focus(); }, [step]);

  const config = useMemo(() => ({
    theme: { primaryColor: state.primaryColor, mode: "light", position: state.position, borderRadius: 16, fontFamily: "system" },
    texts: { botName: assistant, greetingMessage: greeting, inputPlaceholder: "Ask a question...", launcherLabel: "Chat with us", starterQuestions: CONTENT[state.industry][2], offlineMessage: "We are offline right now." },
    features: { leadCapture: true }, branding: { showBadge: true },
  }), [state.primaryColor, state.position, state.industry, assistant, greeting]);

  const createBot = async () => {
    if (state.botId) return state.botId;
    const response = await fetch("/api/bots", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: state.businessName.trim() || "My Business", primaryColor: state.primaryColor, greetingMessage: greeting }),
    });
    if (!response.ok) throw new Error("Could not create your assistant.");
    const bot = await response.json();
    update({ botId: bot.id, botName: bot.name });
    return bot.id;
  };
  const addSource = async (source) => {
    setSaving(true);
    setError("");
    const tempId = "source-" + Date.now();
    try {
      const botId = await createBot();
      update({ sources: state.sources.concat([{ ...source, id: tempId, status: "queued" }]) });
      setTimeout(() => setState((current) => ({ ...current, sources: current.sources.map((item) => item.id === tempId ? { ...item, status: "processing" } : item) })), 250);
      const response = await fetch("/api/bots/" + botId + "/documents", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: source.name, type: source.type, source: source.source, size: source.size }),
      });
      if (!response.ok) throw new Error("Could not add this knowledge source.");
      const document = await response.json();
      setTimeout(() => setState((current) => ({ ...current, sources: current.sources.map((item) => item.id === tempId ? { ...item, id: document.id, status: "ready" } : item) })), 600);
    } catch (sourceError) {
      setError(sourceError.message || "Could not add this knowledge source.");
    } finally {
      setSaving(false);
    }
  };
  const validate = () => {
    if (step === 0 && !state.businessName.trim()) return "Enter your business name to continue.";
    if (step === 0 && !validUrl(state.websiteUrl)) return "Enter a valid website URL or leave it blank.";
    if (step === 1 && !state.sources.length && !later) return "Add a knowledge source or choose to add content later.";
    if (step === 2 && !assistant.trim()) return "Enter an assistant name to continue.";
    if (step === 2 && !HEX_COLOR.test(state.primaryColor)) return "Enter a valid hex color.";
    return "";
  };
  const next = async () => {
    const validation = validate();
    if (validation) { setError(validation); return; }
    setSaving(true); setError("");
    try {
      if (step === 0) {
        const botId = await createBot();
        await patchOnboarding({ botCreated: true, botId, businessName: state.businessName, websiteUrl: state.websiteUrl, industry: state.industry, step: 1 });
        update({ botId, step: 1 });
      } else if (step === 2) {
        const botId = await createBot();
        const response = await fetch("/api/bots/" + botId, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: assistant, theme: config.theme, texts: config.texts }) });
        if (!response.ok) throw new Error("Could not save your branding.");
        await patchOnboarding({ lookCustomized: true, botId, primaryColor: state.primaryColor, greeting, step: 3 });
        update({ step: 3 });
      } else if (step === 3) {
        await patchOnboarding({ snippetInstalled: state.snippetCopied || state.installDetected, botId: state.botId, step: 4 });
        update({ step: 4 });
      } else {
        await patchOnboarding({ step: Math.min(step + 1, 4), botId: state.botId, knowledgeAdded: state.sources.length > 0 });
        update({ step: Math.min(step + 1, 4) });
      }
    } catch (nextError) { setError(nextError.message || "Could not save your progress. Please try again."); }
    finally { setSaving(false); }
  };
  const skip = async () => {
    setSaving(true);
    try {
      const botId = await createBot();
      await patchOnboarding({ skipped: true, botCreated: true, botId, step: "skipped" });
      window.localStorage.removeItem(STORAGE_KEY);
      router.push("/dashboard");
    } catch (nextError) { setError(nextError.message || "Could not skip onboarding."); setSaving(false); }
  };
  const setIndustry = (industry) => {
    const defaults = CONTENT[industry];
    update({ industry, botName: state.botName || defaults[0], greeting: state.greeting || defaults[1] });
  };
  const stepValid = step === 0
    ? Boolean(state.businessName.trim() && validUrl(state.websiteUrl))
    : step === 1
      ? Boolean(state.sources.length || later)
      : step === 2
        ? Boolean(assistant.trim() && HEX_COLOR.test(state.primaryColor))
        : true;

  if (loading) return <main className="min-h-screen bg-background"><div className="mx-auto max-w-4xl px-4 py-10 sm:px-6"><div className="h-8 w-40 animate-pulse rounded bg-muted" /><div className="mt-8 h-96 animate-pulse rounded-xl bg-muted" /></div></main>;

  const about = <div className="grid gap-6 lg:grid-cols-2">
    <Card className="gap-5 p-6">
      <div className="space-y-2"><Label htmlFor="business-name">Business name</Label><Input id="business-name" value={state.businessName} onChange={(event) => update({ businessName: event.target.value })} placeholder="Example: BrightSmile Dental" /></div>
      <div className="space-y-2"><Label htmlFor="website-url">Website URL <span className="text-muted-foreground">(optional)</span></Label><Input id="website-url" type="url" value={state.websiteUrl} onChange={(event) => update({ websiteUrl: event.target.value })} placeholder="https://example.com" aria-invalid={Boolean(state.websiteUrl && !validUrl(state.websiteUrl))} />{state.websiteUrl && !validUrl(state.websiteUrl) && <p className="text-xs text-destructive">Enter a complete http or https URL.</p>}</div>
      <fieldset><legend className="mb-3 text-sm font-medium text-foreground">Industry</legend><div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {INDUSTRIES.map(([id, label, Icon]) => <button key={id} type="button" onClick={() => setIndustry(id)} className={"flex items-center gap-2 rounded-lg border p-3 text-left text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring " + (state.industry === id ? "border-primary bg-accent text-primary" : "border-border bg-card text-foreground hover:bg-muted")}><Icon className="size-4" />{label}</button>)}
      </div></fieldset>
    </Card>
    <AppearancePreview botId={state.botId || "demo"} config={config} mobileInline />
  </div>;
  const knowledgeOptions = [["website", "Import from website URL", Globe], ["files", "Upload files", FileUp], ["faq", "Paste FAQ text", FileText]];
  const knowledge = <div className="space-y-5">
    <div className="grid gap-3 md:grid-cols-3">{knowledgeOptions.map(([id, label, Icon]) => <button key={id} type="button" onClick={() => update({ knowledgeMethod: id })} className={"relative flex min-h-28 flex-col items-start rounded-xl border p-5 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring " + (state.knowledgeMethod === id ? "border-primary bg-accent" : "border-border bg-card hover:bg-muted")}><Icon className="size-5 text-primary" /><span className="mt-3 text-sm font-semibold text-foreground">{label}</span>{state.knowledgeMethod === id && <span className="absolute right-3 top-3 grid size-5 place-items-center rounded-full bg-primary text-primary-foreground"><Check className="size-3" /></span>}</button>)}</div>
    <Card className="p-6">
      {state.knowledgeMethod === "website" && <div className="flex flex-col gap-3 sm:flex-row"><Input value={state.websiteSource || state.websiteUrl} onChange={(event) => update({ websiteSource: event.target.value })} placeholder="https://your-site.com" /><Button type="button" disabled={!(state.websiteSource || state.websiteUrl) || !validUrl(state.websiteSource || state.websiteUrl) || saving} onClick={() => void addSource({ type: "url", name: state.websiteSource || state.websiteUrl, source: "Website" })}>Import</Button></div>}
      {state.knowledgeMethod === "files" && <label className="flex cursor-pointer flex-col items-center rounded-lg border border-dashed border-border bg-muted/30 p-8 text-center hover:bg-muted"><FileUp className="size-6 text-primary" /><span className="mt-3 text-sm font-medium text-foreground">Drop files here or choose files</span><span className="mt-1 text-xs text-muted-foreground">PDF, DOCX, TXT · max 10 MB each</span><input className="sr-only" type="file" multiple accept=".pdf,.docx,.txt" onChange={(event) => { Array.from(event.target.files || []).forEach((file) => void addSource({ type: "file", name: file.name, size: Math.max(1, Math.round(file.size / 1024)) + " KB", source: "Upload" })); event.target.value = ""; }} /></label>}
      {state.knowledgeMethod === "faq" && <div className="space-y-3"><CharLimitInput id="faq-text" label="FAQ text" multiline rows={6} maxLength={TEXT_LIMITS.offlineMessage} value={state.faqText} onChange={(event) => update({ faqText: event.target.value })} placeholder="Paste common questions and answers here." /><Button type="button" disabled={!state.faqText.trim() || saving} onClick={() => { void addSource({ type: "text", name: "Pasted FAQ", source: "Manual" }); update({ faqText: "" }); }}>Add FAQ</Button></div>}
    </Card>
    <SourceList sources={state.sources} onRemove={(id) => update({ sources: state.sources.filter((source) => source.id !== id) })} />
    <button type="button" className="text-sm font-medium text-primary hover:underline" onClick={() => { setLater(true); setError(""); }}>I&apos;ll add content later</button>
    {later && <p className="flex items-center gap-2 text-sm text-warning-foreground"><AlertCircle className="size-4" />The bot will answer poorly without content.</p>}
  </div>;
  const customize = <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(320px,.9fr)]">
    <Card className="gap-5 p-6">
      <CharLimitInput id="assistant-name" label="Assistant name" maxLength={TEXT_LIMITS.botName} value={assistant} onChange={(event) => update({ botName: event.target.value })} />
      <CharLimitInput id="assistant-greeting" label="Greeting" multiline rows={4} maxLength={TEXT_LIMITS.greetingMessage} value={greeting} onChange={(event) => update({ greeting: event.target.value })} />
      <fieldset><legend className="mb-2 text-sm font-medium text-foreground">Position</legend><div className="inline-flex rounded-lg border border-border bg-muted p-1">{["left", "right"].map((item) => <Button key={item} type="button" size="sm" variant={state.position === item ? "secondary" : "ghost"} onClick={() => update({ position: item })} className="capitalize">{item}</Button>)}</div></fieldset>
      <div><Label htmlFor="primary-color">Primary color</Label><div className="mt-3 flex flex-wrap gap-2">{COLORS.map((color) => <button key={color} type="button" aria-label={"Use " + color} aria-pressed={state.primaryColor.toLowerCase() === color} onClick={() => update({ primaryColor: color })} className={"grid size-8 place-items-center rounded-lg border-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring " + (state.primaryColor.toLowerCase() === color ? "border-foreground" : "border-transparent")} style={{ backgroundColor: color }}>{state.primaryColor.toLowerCase() === color && <Check className="size-4 text-white" />}</button>)}</div><div className="mt-3 flex gap-2"><Input id="primary-color" value={state.primaryColor} onChange={(event) => update({ primaryColor: event.target.value })} aria-invalid={!HEX_COLOR.test(state.primaryColor)} /><input type="color" value={HEX_COLOR.test(state.primaryColor) ? state.primaryColor : "#2563eb"} onChange={(event) => update({ primaryColor: event.target.value })} className="size-9 rounded-lg border border-border bg-card p-1" aria-label="Choose primary color" /></div></div>
    </Card>
    <AppearancePreview botId={state.botId || "demo"} config={config} mobileInline />
  </div>;
  const checklist = [
    ["Bot created", Boolean(state.botId)],
    [state.sources.length ? "Knowledge added" : "No knowledge yet", state.sources.length > 0],
    ["Branding customized", Boolean(state.botName || state.greeting)],
    ["Snippet copied or installed", state.snippetCopied || state.installDetected],
  ];
  const done = <div className="mx-auto max-w-xl py-8 text-center"><span className="mx-auto grid size-14 place-items-center rounded-xl bg-success-bg text-success-foreground"><CheckCircle2 className="size-7" /></span><h1 ref={headingRef} tabIndex={-1} className="mt-5 text-2xl font-semibold text-foreground focus:outline-none">Your assistant is ready</h1><p className="mt-2 text-sm text-muted-foreground">You can finish the details anytime from your dashboard.</p><Card className="mt-7 gap-0 p-0 text-left">{checklist.map(([label, complete], index) => <div key={label} className={"flex items-center gap-3 px-5 py-4 " + (index ? "border-t border-border" : "")}>{complete ? <Check className="size-5 text-success" /> : <AlertCircle className="size-5 text-warning" />}<span className="flex-1 text-sm text-foreground">{label}</span><span className={"text-xs " + (complete ? "text-muted-foreground" : "text-warning-foreground")}>{complete ? "Complete" : "Needs attention"}</span></div>)}</Card><div className="mt-7 flex flex-col items-center gap-3"><Button asChild><Link href="/dashboard">Go to dashboard</Link></Button><Button asChild variant="secondary"><a href="/test.html" target="_blank" rel="noreferrer">Test your assistant</a></Button><Link className="text-sm font-medium text-primary hover:underline" href={"/dashboard/bots/" + (state.botId || "demo") + "?tab=knowledge"}>Add more knowledge</Link></div></div>;
  const content = step === 0 ? about : step === 1 ? knowledge : step === 2 ? customize : step === 3 ? <InstallStep state={state} update={update} /> : done;
  const descriptions = ["Tell us a little about the business your assistant will represent.", "Give the assistant information it can use to answer accurately.", "Adjust the name, greeting, placement, and color before you publish.", "Add one snippet to make your assistant available on your website."];

  return <main className="min-h-screen bg-background" onKeyDown={(event) => {
    if (event.key === "Enter" && event.target.tagName !== "TEXTAREA" && event.target.tagName !== "BUTTON" && step < 4 && stepValid && !saving) {
      event.preventDefault();
      void next();
    }
  }}>
    <header className="border-b border-border"><div className="mx-auto flex h-16 max-w-4xl items-center justify-between px-4 sm:px-6"><Link href="/" className="flex items-center gap-2 font-semibold text-foreground"><span className="grid size-8 place-items-center rounded-lg bg-primary text-primary-foreground"><MessageSquare className="size-4" /></span>{brand.name}</Link>{step < 4 && <Button type="button" variant="ghost" onClick={skip} disabled={saving}>Skip for now</Button>}</div></header>
    <div className="mx-auto max-w-4xl px-4 py-8 pb-28 sm:px-6 sm:py-10">
      {step < 4 && <Stepper step={step} />}
      {step < 4 && <div className="mt-9"><h1 ref={headingRef} tabIndex={-1} className="text-2xl font-semibold tracking-tight text-foreground focus:outline-none">{STEPS[step]}</h1><p className="mt-2 text-sm text-muted-foreground">{descriptions[step]}</p></div>}
      {error && <div role="alert" className="mt-5 flex items-center gap-2 rounded-lg border border-destructive/20 bg-destructive-bg p-3 text-sm text-destructive"><AlertCircle className="size-4" />{error}</div>}
      <div className="mt-6 motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-right-1 motion-safe:duration-200">{content}</div>
      {step < 4 && <footer className="sticky bottom-0 mt-8 flex items-center justify-between border-t border-border bg-background/95 py-4 backdrop-blur"><Button type="button" variant="ghost" onClick={() => { setError(""); update({ step: Math.max(0, step - 1) }); }} disabled={step === 0 || saving}><ChevronLeft className="size-4" />Back</Button><Button type="button" onClick={next} disabled={saving || !stepValid}>{saving && <LoaderCircle className="size-4 animate-spin" />}{saving ? "Saving" : step === 3 ? "Continue" : "Next"}</Button></footer>}
    </div>
  </main>;
}
