"use client";

import { useMemo, useState } from "react";
import { Check, CreditCard, Download, LoaderCircle } from "lucide-react";
import { toast } from "sonner";
import { Badge, Button, Card, EmptyState, Skeleton } from "@/components/ui";
import PageHeader from "@/components/shared/PageHeader";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const plans = [
  { id: "free", name: "Free", price: "$0", conversations: "50 conversations", bots: "1 bot", extras: ["Email alerts"] },
  { id: "starter", name: "Starter", price: "$29", conversations: "500 conversations", bots: "3 bots", extras: ["Email alerts", "Priority support"] },
  { id: "pro", name: "Pro", price: "$79", conversations: "2,000 conversations", bots: "10 bots", extras: ["Remove branding badge", "Email alerts", "Priority support"] },
];

export default function BillingPanel({ usage, bots, conversations, leads, loading, error, onRetry }) {
  const [chosenPlan, setChosenPlan] = useState(null);
  const [changing, setChanging] = useState(false);
  const plan = usage?.plan || "free";
  const used = usage?.conversations || 0;
  const limit = usage?.limit || 50;
  const percent = Math.min(100, used / Math.max(limit, 1) * 100);
  const breakdown = useMemo(() => {
    const raw = bots.map((bot) => {
      const count = conversations.filter((item) => item.botId === bot.id).length;
      const botLeads = leads.filter((item) => item.botId === bot.id).length;
      return { bot, count, botLeads };
    });
    const remainder = Math.max(0, used - raw.reduce((sum, item) => sum + item.count, 0));
    return raw.map((item, index) => index === 0 ? { ...item, count: item.count + remainder } : item);
  }, [bots, conversations, leads, used]);
  if (loading) return <div className="space-y-6"><Skeleton className="h-44 rounded-xl" /><div className="grid gap-4 md:grid-cols-3">{[1, 2, 3].map((item) => <Skeleton key={item} className="h-72 rounded-xl" />)}</div></div>;
  if (error) return <Card><p className="text-destructive">{error}</p><Button className="mt-4" onClick={onRetry}>Retry</Button></Card>;
  const confirm = async () => {
    setChanging(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    setChanging(false);
    setChosenPlan(null);
    toast.success("Plan change ready for secure checkout.");
  };
  return <div className="space-y-6">
    <PageHeader title="Usage & Billing" description="Your plan and conversation usage this month." actions={<Badge tone="default">Resets on Nov 1</Badge>} />
    <Card className="p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"><div><p className="text-sm text-muted-foreground">Current usage</p><p className="mt-2 text-3xl font-semibold text-foreground">{used} of {limit} conversations</p></div><Badge tone="info" className="capitalize">{plan} plan</Badge></div>
      <div className="mt-5 h-3 overflow-hidden rounded-full bg-muted"><div className={"h-full rounded-full " + (percent >= 100 ? "bg-destructive" : percent >= 80 ? "bg-warning" : "bg-primary")} style={{ width: percent + "%" }} /></div>
      {percent >= 80 && <div className={"mt-5 flex flex-col gap-3 rounded-lg border p-4 sm:flex-row sm:items-center sm:justify-between " + (percent >= 100 ? "border-destructive/20 bg-destructive-bg" : "border-warning/20 bg-warning-bg")}><p className={percent >= 100 ? "text-sm text-destructive" : "text-sm text-warning-foreground"}>{percent >= 100 ? "You have reached your conversation limit." : "You are approaching your conversation limit."}</p><Button size="sm" onClick={() => setChosenPlan(plans.find((item) => item.id === "starter"))}>Upgrade</Button></div>}
    </Card>
    <Card title="Usage by bot" subtitle="Plan limits apply across your whole workspace.">
      <div className="overflow-x-auto"><Table><TableHeader><TableRow><TableHead>Bot</TableHead><TableHead>Conversations this month</TableHead><TableHead>Leads</TableHead><TableHead>Share</TableHead></TableRow></TableHeader><TableBody>{breakdown.map(({ bot, count, botLeads }) => <TableRow key={bot.id}><TableCell className="font-medium">{bot.name}</TableCell><TableCell>{count}</TableCell><TableCell>{botLeads}</TableCell><TableCell className="min-w-36"><div className="h-2 overflow-hidden rounded-full bg-muted"><div className="h-full rounded-full bg-primary" style={{ width: (used ? count / used * 100 : 0) + "%" }} /></div></TableCell></TableRow>)}</TableBody></Table></div>
      <p className="mt-4 text-sm text-muted-foreground">Total conversations: {used}</p>
    </Card>
    <div className="grid gap-4 md:grid-cols-3">{plans.map((item) => {
      const current = item.id === plan;
      const order = plans.findIndex((candidate) => candidate.id === item.id) - plans.findIndex((candidate) => candidate.id === plan);
      return <Card key={item.id} className={"relative p-6 " + (current ? "border-primary bg-accent" : "")}>{item.id === "starter" && <Badge tone="info" className="absolute right-4 top-4">Most popular</Badge>}<h2 className="text-lg font-semibold">{item.name}</h2><p className="mt-3 text-3xl font-semibold">{item.price}<span className="text-sm text-muted-foreground">/mo</span></p><ul className="mt-5 space-y-2 text-sm text-muted-foreground">{[item.conversations, item.bots].concat(item.extras).map((feature) => <li key={feature} className="flex gap-2"><Check className="size-4 shrink-0 text-success" />{feature}</li>)}</ul><Button className="mt-6 w-full" variant={current ? "secondary" : "default"} disabled={current} onClick={() => setChosenPlan(item)}>{current ? "Current plan" : order > 0 ? "Upgrade" : "Downgrade"}</Button></Card>;
    })}</div>
    <div className="grid gap-6 lg:grid-cols-2"><Card title="Payment method"><EmptyState title="No payment method yet" body="A payment method is added during secure checkout." /></Card><Card title="Invoices">{plan === "free" ? <EmptyState title="No invoices yet" body="Invoices appear here after you choose a paid plan." /> : <Table><TableHeader><TableRow><TableHead>Date</TableHead><TableHead>Amount</TableHead><TableHead /></TableRow></TableHeader><TableBody>{["Oct 1", "Sep 1", "Aug 1"].map((date) => <TableRow key={date}><TableCell>{date}</TableCell><TableCell>$29.00</TableCell><TableCell><Button size="sm" variant="ghost"><Download className="size-4" />Download</Button></TableCell></TableRow>)}</TableBody></Table>}</Card></div>
    <Dialog open={Boolean(chosenPlan)} onOpenChange={(open) => !open && setChosenPlan(null)}><DialogContent><DialogHeader><DialogTitle>{chosenPlan?.name} plan</DialogTitle><DialogDescription>Continue to secure checkout to change your workspace plan.</DialogDescription></DialogHeader><DialogFooter><Button variant="secondary" onClick={() => setChosenPlan(null)}>Cancel</Button><Button onClick={confirm} disabled={changing}>{changing && <LoaderCircle className="size-4 animate-spin" />}Continue</Button></DialogFooter></DialogContent></Dialog>
  </div>;
}
