"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AlertTriangle, CreditCard, FileText } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Badge, Button, Card, EmptyState, Skeleton } from "@/components/ui";
import PageHeader from "@/components/shared/PageHeader";
import { PricingCards } from "@/components/marketing/PricingCards";
import {
  cancelBillingPlan,
  changeBillingPlan,
  getBillingInvoices,
  getBillingOverview,
  getInvoicePdfUrl,
  getPaymentMethodUrl,
  resumeBillingPlan,
} from "@/lib/api/billing.api";

const number = new Intl.NumberFormat("en-US");

function feature(plan, key) {
  return plan?.features?.find((item) => item.key === key);
}

function numericFeature(plan, key) {
  const item = feature(plan, key);
  return typeof item?.value === "number" && Number.isFinite(item.value) ? item : null;
}

function price(plan) {
  if (typeof plan?.priceCents !== "number" || !plan.currency) return null;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: plan.currency,
    maximumFractionDigits: 0,
  }).format(plan.priceCents / 100);
}

function periodLabel(period) {
  if (!/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/.test(period || "")) return null;
  const [year, month, day] = period.split("-").map(Number);
  return `Cycle starts ${new Intl.DateTimeFormat("en-US", {
    month: "short", day: "numeric", year: "numeric", timeZone: "UTC",
  }).format(new Date(Date.UTC(year, month - 1, day)))}`;
}

function UsageMeter({ item, onUpgrade, upgradeDisabled }) {
  if (!item || typeof item.used !== "number") return null;
  const percent = item.value > 0 ? Math.min(100, (item.used / item.value) * 100) : 100;
  const reached = item.used >= item.value;
  const high = percent >= 80;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-end justify-between gap-2">
        <div>
          <p className="text-[13px] font-medium text-muted-foreground">Conversations this billing cycle</p>
          <p className="mt-1 text-3xl font-semibold tracking-tight sm:text-4xl">
            {number.format(item.used)} <span className="text-lg font-normal text-muted-foreground">of {number.format(item.value)} conversations</span>
          </p>
        </div>
        <p className="text-sm font-medium text-muted-foreground">
          {number.format(Math.max(0, item.value - item.used))} left this cycle
        </p>
      </div>
      <div
        role="progressbar"
        aria-label="Conversation usage this billing cycle"
        aria-valuemin={0}
        aria-valuemax={item.value}
        aria-valuenow={Math.min(item.used, item.value)}
        aria-valuetext={`${number.format(item.used)} of ${number.format(item.value)} conversations`}
        className="h-2.5 overflow-hidden rounded-full bg-muted"
      >
        <div
          className={`h-full rounded-full transition-[width] motion-reduce:transition-none ${reached ? "bg-destructive" : high ? "bg-warning" : "bg-primary"}`}
          style={{ width: `${percent}%` }}
        />
      </div>
      {high && (
        <div
          role="status"
          className={`flex flex-wrap items-center justify-between gap-3 rounded-xl border p-4 text-sm ${reached ? "border-destructive/25 bg-destructive-bg text-destructive" : "border-warning/25 bg-warning-bg text-warning-foreground"}`}
        >
          <span className="flex items-start gap-2">
            <AlertTriangle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
            {reached
              ? "Limit reached. New visitors will see an unavailable message."
            : "You are approaching your conversation limit for this cycle."}
          </span>
          <Button type="button" variant="secondary" onClick={onUpgrade} disabled={upgradeDisabled}>Upgrade</Button>
        </div>
      )}
    </div>
  );
}

function CurrentPlan({ plan, period, onCancel, onResume, actionPending, onUpgrade, upgradeDisabled }) {
  const conversations = numericFeature(plan, "conversations");
  const bots = numericFeature(plan, "bots");
  const messages = numericFeature(plan, "messages_per_conversation");
  const branding = feature(plan, "remove_branding");
  const planPrice = price(plan);

  return (
    <Card className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-lg font-semibold">{plan.name}</h2>
            <Badge tone="info">Current plan</Badge>
          </div>
          {planPrice && <p className="text-sm text-muted-foreground">{planPrice} / {plan.billingInterval}</p>}
        </div>
        {periodLabel(period) && <span className="text-[13px] text-muted-foreground">{periodLabel(period)}</span>}
      </div>

      {plan.canManageSubscription && (
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border bg-muted/30 p-4">
          <div className="space-y-1 text-sm">
            <p className="font-medium">Subscription status: {plan.subscriptionStatus || "active"}</p>
            {plan.cancelAtPeriodEnd && <p className="text-muted-foreground">Your plan remains active until the current period ends.</p>}
          </div>
          <Button
            type="button"
            variant="secondary"
            onClick={plan.cancelAtPeriodEnd ? onResume : onCancel}
            disabled={actionPending}
          >
            {actionPending ? "Updating…" : plan.cancelAtPeriodEnd ? "Keep subscription" : "Cancel at period end"}
          </Button>
        </div>
      )}

      {conversations ? <UsageMeter item={conversations} onUpgrade={onUpgrade} upgradeDisabled={upgradeDisabled} /> : (
        <p className="text-sm text-muted-foreground">Conversation usage is not available yet.</p>
      )}

      <div className="grid gap-4 border-t pt-5 sm:grid-cols-3">
        {bots && typeof bots.used === "number" && (
          <div>
            <p className="text-[13px] text-muted-foreground">Bots</p>
            <p className="mt-1 text-base font-semibold">{number.format(bots.used)} of {number.format(bots.value)}</p>
            {bots.used > bots.value && (
              <p className="mt-2 text-[13px] font-medium text-destructive">
                You have more bots than this plan allows.
              </p>
            )}
          </div>
        )}
        {messages && (
          <div>
            <p className="text-[13px] text-muted-foreground">Max messages per conversation</p>
            <p className="mt-1 text-base font-semibold">{number.format(messages.value)}</p>
          </div>
        )}
        {typeof branding?.value === "boolean" && (
          <div>
            <p className="text-[13px] text-muted-foreground">Powered-by badge</p>
            <p className="mt-1 text-base font-semibold">{branding.value ? "Removed" : "Shown"}</p>
          </div>
        )}
      </div>
    </Card>
  );
}

function BillingSkeleton() {
  return (
    <div className="mx-auto max-w-5xl space-y-6" aria-label="Loading billing information">
      <Skeleton className="h-16 rounded-xl" />
      <Skeleton className="h-72 rounded-xl" />
      <div className="grid gap-4 lg:grid-cols-3">
        {[0, 1, 2].map((item) => <Skeleton key={item} className="h-72 rounded-xl" />)}
      </div>
    </div>
  );
}

export default function BillingPage() {
  const queryClient = useQueryClient();
  const [pendingAction, setPendingAction] = useState("");
  const query = useQuery({
    queryKey: ["billing", "overview"],
    queryFn: ({ signal }) => getBillingOverview(signal),
    staleTime: 30_000,
    retry: false,
  });
  const invoicesQuery = useQuery({
    queryKey: ["billing", "invoices"],
    queryFn: ({ signal }) => getBillingInvoices(signal),
    staleTime: 30_000,
    retry: false,
  });
  const changePlan = useMutation({
    mutationFn: changeBillingPlan,
    onSuccess: async (result) => {
      if (result.action === "checkout" && result.checkoutUrl) {
        window.location.assign(result.checkoutUrl);
        return;
      }
      const message = {
        updated: "Your plan change is being confirmed by Paddle.",
        canceled_at_period_end: "Your subscription will end after the current billing period.",
        cancellation_pending: "Your subscription is already set to end this billing period.",
        unchanged: "You are already on this plan.",
      }[result.action] || "Billing settings updated.";
      toast.success(message);
      await queryClient.invalidateQueries({ queryKey: ["billing"] });
    },
    onError: (error) => toast.error(error.message || "Could not update your plan."),
  });
  const runBillingAction = async (name, action, successMessage) => {
    setPendingAction(name);
    try {
      await action();
      toast.success(successMessage);
      await queryClient.invalidateQueries({ queryKey: ["billing"] });
    } catch (error) {
      toast.error(error.message || "Could not update billing settings.");
    } finally {
      setPendingAction("");
    }
  };

  if (query.isPending) return <BillingSkeleton />;
  if (query.isError) {
    return (
      <div className="mx-auto max-w-5xl space-y-6">
        <PageHeader title="Usage & Billing" description="Your plan and conversation usage this billing cycle." />
        <EmptyState
          title="Billing unavailable"
          body={query.error?.message || "Please try again."}
          action={<Button type="button" onClick={() => query.refetch()} disabled={query.isFetching}>
            {query.isFetching ? "Retrying..." : "Retry"}
          </Button>}
        />
      </div>
    );
  }

  const { currentPlan, availablePlans = [], period } = query.data || {};
  if (!currentPlan) {
    return (
      <div className="mx-auto max-w-5xl space-y-6">
        <PageHeader title="Usage & Billing" description="Your plan and conversation usage this billing cycle." />
        <EmptyState title="No plan details yet" body="Your billing information is not available right now." />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <PageHeader
        title="Usage & Billing"
        description="Your plan and conversation usage this billing cycle."
        actions={query.isFetching ? <span role="status" className="text-[13px] text-muted-foreground">Refreshing...</span> : null}
      />
      <CurrentPlan
        plan={currentPlan}
        period={period}
        onCancel={() => runBillingAction("cancel", cancelBillingPlan, "Cancellation scheduled for the end of this billing period.")}
        onResume={() => runBillingAction("resume", resumeBillingPlan, "Your subscription will continue.")}
        actionPending={pendingAction === "cancel" || pendingAction === "resume"}
        upgradeDisabled={!availablePlans.some((plan) => plan.canCheckout && plan.priceCents > currentPlan.priceCents)}
        onUpgrade={() => {
          const plan = availablePlans.find((candidate) => candidate.canCheckout && candidate.priceCents > currentPlan.priceCents);
          if (plan) changePlan.mutate(plan.key);
        }}
      />

      <section aria-labelledby="plans-heading" className="space-y-4">
        <div>
          <h2 id="plans-heading" className="text-base font-semibold">Plans</h2>
          <p className="mt-1 text-[13px] text-muted-foreground">Choose the plan that fits your visitors. Changes to an active Paddle subscription are prorated immediately.</p>
        </div>
        {availablePlans.length ? (
          <PricingCards
            mode="dashboard"
            plans={availablePlans}
            currentPlan={currentPlan}
            onSelectPlan={(plan) => changePlan.mutate(plan.key)}
            pendingPlanKey={changePlan.isPending ? changePlan.variables : ""}
          />
        ) : (
          <EmptyState title="No plans available" body="Available plans will appear here when published." />
        )}
      </section>

      <section aria-labelledby="billing-heading" className="space-y-4">
        <h2 id="billing-heading" className="text-base font-semibold">Billing</h2>
        <div className="grid gap-4 lg:grid-cols-2">
          <Card>
            <div className="mb-5 flex items-center gap-2">
              <CreditCard className="size-4 text-primary" aria-hidden="true" />
              <h3 className="text-base font-semibold">Payment method</h3>
            </div>
            {!currentPlan.canManageSubscription && <EmptyState title="No payment method yet" body="A payment method is added securely during Paddle checkout." />}
            <Button
              type="button"
              variant="secondary"
              disabled={!currentPlan.canManageSubscription || pendingAction === "payment"}
              onClick={async () => {
                setPendingAction("payment");
                try {
                  const url = await getPaymentMethodUrl();
                  window.location.assign(url);
                } catch (error) {
                  toast.error(error.message || "Could not open payment settings.");
                  setPendingAction("");
                }
              }}
              className="mt-4 w-full"
            >
              {pendingAction === "payment" ? "Opening…" : "Update payment method"}
            </Button>
          </Card>
          <Card>
            <div className="mb-5 flex items-center gap-2">
              <FileText className="size-4 text-primary" aria-hidden="true" />
              <h3 className="text-base font-semibold">Invoices</h3>
            </div>
            {invoicesQuery.isPending ? <Skeleton className="h-24 rounded-lg" /> : invoicesQuery.isError ? (
              <EmptyState title="Invoices unavailable" body="Please refresh the page to try again." />
            ) : invoicesQuery.data?.length ? (
              <div className="space-y-3">
                {invoicesQuery.data.map((invoice) => (
                  <div key={invoice.id} className="flex flex-wrap items-center justify-between gap-3 border-t pt-3 first:border-0 first:pt-0">
                    <div>
                      <p className="text-sm font-medium">{invoice.number || `Invoice ${invoice.id}`}</p>
                      <p className="text-[13px] text-muted-foreground">
                        {new Intl.DateTimeFormat("en-US", { dateStyle: "medium" }).format(new Date(invoice.issuedAt))}
                        {" · "}{new Intl.NumberFormat("en-US", { style: "currency", currency: invoice.currency }).format(invoice.amountCents / 100)}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge tone={invoice.status === "paid" ? "success" : invoice.status === "open" ? "warning" : "default"}>{invoice.status}</Badge>
                      <Button
                        type="button"
                        variant="secondary"
                        disabled={pendingAction === `invoice-${invoice.id}` || !invoice.downloadUrl}
                        onClick={async () => {
                          setPendingAction(`invoice-${invoice.id}`);
                          try {
                            window.location.assign(invoice.provider === "paddle"
                              ? await getInvoicePdfUrl(invoice.id)
                              : invoice.downloadUrl);
                          } catch (error) {
                            toast.error(error.message || "Could not open invoice PDF.");
                            setPendingAction("");
                          }
                        }}
                      >
                        {pendingAction === `invoice-${invoice.id}` ? "Opening…" : "PDF"}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : <EmptyState title="No invoices yet" />}
          </Card>
        </div>
      </section>
    </div>
  );
}
