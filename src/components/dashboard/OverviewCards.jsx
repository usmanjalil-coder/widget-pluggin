"use client";

import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  Check,
  ChevronRight,
  Code2,
  MessageSquare,
  Sparkles,
  Users,
} from "lucide-react";
import { Button, Card, Skeleton } from "@/components/ui";

const number = new Intl.NumberFormat("en-US");

export function StatCard({ label, value, icon: Icon, href, helper }) {
  return (
    <Link
      href={href}
      aria-label={`${label}: ${number.format(value)}. ${helper}`}
      className="group block min-w-0 rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      <Card className="h-full min-w-0 p-5 transition-[border-color,box-shadow] group-hover:border-primary/40 group-hover:shadow-md group-focus-visible:border-primary motion-reduce:transition-none sm:p-6">
        <div className="flex items-center justify-between gap-3">
          <span className="flex min-w-0 items-center gap-2 text-sm font-medium text-muted-foreground">
            <Icon className="size-4 shrink-0 text-primary" aria-hidden="true" />
            {label}
          </span>
          <ArrowRight
            className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1 motion-reduce:transition-none"
            aria-hidden="true"
          />
        </div>
        <p className="mt-5 text-3xl font-semibold tracking-tight tabular-nums text-foreground sm:text-4xl">
          {number.format(value)}
        </p>
        <p className="mt-2 text-[13px] text-muted-foreground">{helper}</p>
      </Card>
    </Link>
  );
}

function cycleDate(period) {
  if (!/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/.test(period || "")) return null;
  const [year, month, day] = period.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  if (date.getUTCMonth() !== month - 1 || date.getUTCDate() !== day) return null;
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

export function UsageCard({ billing, billingLoading, billingError, usagePercent }) {
  const plan = billing?.currentPlan;
  const conversations = plan?.features?.find((item) => item.key === "conversations");
  const used = conversations?.used;
  const limit = conversations?.value;
  const hasCounts = typeof used === "number" && typeof limit === "number";
  const percent = hasCounts
    ? limit > 0
      ? Math.min(100, Math.max(0, (used / limit) * 100))
      : 100
    : typeof usagePercent === "number"
      ? Math.min(100, Math.max(0, usagePercent))
      : null;
  const reached = hasCounts ? used >= limit : percent >= 100;
  const high = percent >= 80;
  const start = cycleDate(billing?.period);

  return (
    <Card className="min-w-0 space-y-6" aria-busy={billingLoading}>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-base font-semibold">Usage this cycle</h2>
          <p className="mt-1 text-[13px] text-muted-foreground">
            {plan?.name ? `${plan.name} plan · Across all bots` : "Across all bots"}
          </p>
        </div>
        {start && <span className="text-xs text-muted-foreground">Cycle started {start}</span>}
      </div>
      {billingLoading ? (
        <div role="status" aria-label="Loading usage" className="space-y-4">
          <Skeleton className="h-9 w-56 motion-reduce:animate-none" />
          <Skeleton className="h-3 w-full rounded-full motion-reduce:animate-none" />
          <Skeleton className="h-4 w-24 motion-reduce:animate-none" />
        </div>
      ) : (
        <>
          <div className="space-y-2">
            {hasCounts ? (
              <>
                <p className="text-2xl font-semibold tracking-tight tabular-nums sm:text-3xl">
                  {number.format(used)}{" "}
                  <span className="text-base font-normal text-muted-foreground">
                    of {number.format(limit)} conversations
                  </span>
                </p>
                <p className="text-[13px] text-muted-foreground">
                  {number.format(Math.max(0, limit - used))} left this billing cycle
                </p>
              </>
            ) : percent !== null ? (
              <p className="text-2xl font-semibold tracking-tight tabular-nums">
                {Math.round(percent)}%{" "}
                <span className="text-base font-normal text-muted-foreground">
                  of conversation allowance used
                </span>
              </p>
            ) : (
              <p className="text-sm text-muted-foreground">
                {billingError
                  ? "Usage details are temporarily unavailable."
                  : "Usage details are not available yet."}
              </p>
            )}
          </div>
          {percent !== null && (
            <div
              role="progressbar"
              aria-label="Conversation usage this billing cycle"
              aria-valuemin={0}
              aria-valuemax={hasCounts ? Math.max(1, limit) : 100}
              aria-valuenow={hasCounts ? Math.min(used, Math.max(1, limit)) : percent}
              aria-valuetext={
                hasCounts
                  ? `${number.format(used)} of ${number.format(limit)} conversations`
                  : `${Math.round(percent)}% of conversation allowance used`
              }
              className="h-2.5 overflow-hidden rounded-full bg-primary/15 ring-1 ring-inset ring-primary/10"
            >
              <div
                className={`h-full rounded-full transition-[width] motion-reduce:transition-none ${reached ? "bg-destructive" : high ? "bg-warning" : "bg-primary"}`}
                style={{ width: `${percent}%` }}
              />
            </div>
          )}
          <div className="flex flex-wrap items-center justify-between gap-3">
            {high && (
              <p
                role="status"
                className={`text-[13px] font-medium ${reached ? "text-destructive" : "text-warning-foreground"}`}
              >
                {reached ? "Conversation limit reached." : "Approaching your conversation limit."}
              </p>
            )}
            <Button
              asChild
              variant={high ? "primary" : "ghost"}
              className={`min-h-10 ${!high ? "-ml-3 text-primary" : ""}`}
            >
              <Link href="/dashboard/billing">
                {high ? "Upgrade" : "Manage plan"}
                <ChevronRight className="size-4" aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </>
      )}
    </Card>
  );
}

export function GetStartedChecklist({ botCount, botId }) {
  const botPage = botId
    ? `/dashboard/bots/${encodeURIComponent(botId)}`
    : "/dashboard/bots?create=1";
  const steps = [
    {
      label: "Create your bot",
      href: "/dashboard/bots?create=1",
      done: botCount > 0,
      icon: Sparkles,
    },
    { label: "Add knowledge", href: "/dashboard/knowledge", icon: BookOpen },
    {
      label: "Test your bot",
      href: botId ? `${botPage}?tab=appearance` : botPage,
      icon: MessageSquare,
    },
    {
      label: "Install the widget on your website",
      href: botId ? `${botPage}?tab=install` : botPage,
      icon: Code2,
    },
  ];
  return (
    <Card className="min-w-0">
      <h2 className="text-base font-semibold">Get started</h2>
      <p className="mt-1 text-[13px] text-muted-foreground">
        Set up your bot and share it with visitors.
      </p>
      <ul className="mt-5 divide-y">
        {steps.map(({ label, href, done, icon: Icon }) => (
          <li key={label}>
            <Link
              href={href}
              className="group flex min-h-14 items-center gap-3 rounded-lg py-2 outline-none hover:text-primary focus-visible:ring-2 focus-visible:ring-ring"
            >
              <span
                className={`flex size-8 shrink-0 items-center justify-center rounded-lg ${done ? "bg-success-bg text-success-foreground" : "bg-primary/10 text-primary"}`}
              >
                {done ? (
                  <Check className="size-4" aria-hidden="true" />
                ) : (
                  <Icon className="size-4" aria-hidden="true" />
                )}
              </span>
              <span className="min-w-0 flex-1 text-sm font-medium">{label}</span>
              {done && <span className="text-xs text-success-foreground">Done</span>}
              <ChevronRight
                className="size-4 shrink-0 text-muted-foreground group-hover:text-primary"
                aria-hidden="true"
              />
            </Link>
          </li>
        ))}
      </ul>
    </Card>
  );
}

export function WorkspaceLinks() {
  const items = [
    { label: "Conversations", href: "/dashboard/conversations", icon: MessageSquare },
    { label: "Leads", href: "/dashboard/leads", icon: Users },
    { label: "Knowledge base", href: "/dashboard/knowledge", icon: BookOpen },
  ];
  return (
    <Card className="min-w-0">
      <h2 className="text-base font-semibold">Your workspace</h2>
      <p className="mt-1 text-[13px] text-muted-foreground">Pick up where you left off.</p>
      <div className="mt-5 grid gap-3">
        {items.map(({ label, href, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className="group flex min-h-14 items-center gap-3 rounded-lg border px-4 text-sm font-medium outline-none transition-colors hover:border-primary/40 hover:bg-primary/5 focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transition-none"
          >
            <Icon className="size-4 text-primary" aria-hidden="true" />
            <span className="flex-1">{label}</span>
            <ArrowRight
              className="size-4 text-muted-foreground group-hover:text-primary"
              aria-hidden="true"
            />
          </Link>
        ))}
      </div>
    </Card>
  );
}

export function OverviewSkeleton() {
  return (
    <div className="space-y-8" aria-label="Loading overview" role="status">
      <div className="space-y-2">
        <Skeleton className="h-8 w-64 motion-reduce:animate-none" />
        <Skeleton className="h-5 w-80 max-w-full motion-reduce:animate-none" />
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {[0, 1, 2].map((item) => (
          <Skeleton key={item} className="h-40 rounded-xl motion-reduce:animate-none" />
        ))}
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <Skeleton className="h-72 rounded-xl motion-reduce:animate-none" />
        <Skeleton className="h-72 rounded-xl motion-reduce:animate-none" />
      </div>
    </div>
  );
}

export const overviewMetrics = [
  {
    label: "Conversations",
    key: "total_conversations",
    icon: MessageSquare,
    href: "/dashboard/conversations",
    zero: "No conversations yet",
    helper: "Across all bots",
  },
  {
    label: "Bots",
    key: "total_bots",
    icon: BarChart3,
    href: "/dashboard/bots",
    zero: "Create your first bot",
    helper: "Ready to answer",
  },
  {
    label: "Leads",
    key: "total_leads",
    icon: Users,
    href: "/dashboard/leads",
    zero: "No leads yet",
    helper: "New contacts",
  },
];
