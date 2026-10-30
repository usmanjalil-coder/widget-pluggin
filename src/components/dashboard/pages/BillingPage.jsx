"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AlertTriangle, Check, ExternalLink, FileText } from "lucide-react";
import { Suspense, useEffect, useState } from "react";
import { toast } from "sonner";
import { Badge, Button, Card, EmptyState, Skeleton } from "@/components/ui";
import {
  ConfirmCancellation,
  InvoiceRow,
  PaymentMethodCard,
  SubscriptionBanner,
} from "../billing/BillingDetails";
import CheckoutSyncStatus from "../billing/CheckoutSyncStatus";
import PendingChangeBanner from "../billing/PendingChangeBanner";
import dynamic from "next/dynamic";
import UsageByBot from "../billing/UsageByBot";
import PageHeader from "@/components/shared/PageHeader";
import { PricingCards } from "@/components/marketing/PricingCards";
import {
  cancelBillingPlan,
  changeBillingPlan,
  getBillingInvoices,
  getBillingOverview,
  getBillingPortalUrl,
  getInvoicePdfUrl,
  getPaymentMethodUrl,
  resumeBillingPlan,
} from "@/lib/api/billing.api";

const number = new Intl.NumberFormat("en-US");
const PlanChangeDialog = dynamic(() => import("../billing/PlanChangeDialog"), {
  ssr: false,
  loading: () => <p role="status" className="sr-only">Loading plan preview…</p>,
});

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
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
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
          <p className="text-[13px] font-medium text-muted-foreground">
            Conversations this billing cycle
          </p>
          <p className="mt-1 text-3xl font-semibold tracking-tight sm:text-4xl">
            {number.format(item.used)}{" "}
            <span className="text-lg font-normal text-muted-foreground">
              of {number.format(item.value)} conversations
            </span>
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
        className="h-2.5 overflow-hidden rounded-full bg-primary/15 ring-1 ring-inset ring-primary/10"
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
          <Button
            type="button"
            variant="secondary"
            className="min-h-10"
            onClick={onUpgrade}
            disabled={upgradeDisabled}
          >
            Upgrade
          </Button>
        </div>
      )}
    </div>
  );
}

function CurrentPlan({
  plan,
  period,
  pendingTargetPlan,
  pendingChange,
  onKeepCurrent,
  onCancel,
  onResume,
  actionPending,
  onUpgrade,
  upgradeDisabled,
  onPayment,
  paymentPending,
}) {
  const conversations = numericFeature(plan, "conversations");
  const bots = numericFeature(plan, "bots");
  const messages = numericFeature(plan, "messages_per_conversation");
  const branding = feature(plan, "remove_branding");
  const planPrice = price(plan);

  return (
    <Card className="min-w-0 space-y-6 border-l-4 border-l-primary bg-primary/5">
      <SubscriptionBanner
        plan={plan}
        onCancel={onCancel}
        onResume={onResume}
        onPayment={onPayment}
        actionPending={actionPending}
        paymentPending={paymentPending}
      />
      <PendingChangeBanner
        currentPlan={plan}
        targetPlan={pendingTargetPlan}
        pending={pendingChange}
        onKeepCurrent={onKeepCurrent}
      />
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-3xl font-semibold tracking-tight">{plan.name}</h2>
            <Badge tone="info">
              <Check aria-hidden="true" />
              Current plan
            </Badge>
          </div>
          {planPrice && (
            <p className="pt-2 text-3xl font-semibold tracking-tight">
              {planPrice}
              <span className="ml-1 text-sm font-normal text-muted-foreground">
                / {plan.billingInterval}
              </span>
            </p>
          )}
        </div>
        {periodLabel(period) && (
          <span className="text-[13px] text-muted-foreground">{periodLabel(period)}</span>
        )}
      </div>

      {conversations ? (
        <UsageMeter item={conversations} onUpgrade={onUpgrade} upgradeDisabled={upgradeDisabled} />
      ) : (
        <p className="text-sm text-muted-foreground">Conversation usage is not available yet.</p>
      )}

      <div className="grid gap-4 border-t pt-5 sm:grid-cols-3">
        {bots && typeof bots.used === "number" && (
          <div>
            <p className="text-[13px] text-muted-foreground">Bots</p>
            <p className="mt-1 text-lg font-semibold">
              {number.format(bots.used)} of {number.format(bots.value)}
            </p>
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
            <p className="mt-1 text-lg font-semibold">{number.format(messages.value)}</p>
          </div>
        )}
        {typeof branding?.value === "boolean" && (
          <div>
            <p className="text-[13px] text-muted-foreground">Powered-by badge</p>
            <p className="mt-1 text-lg font-semibold">{branding.value ? "Removed" : "Shown"}</p>
          </div>
        )}
      </div>
    </Card>
  );
}

function BillingSkeleton() {
  return (
    <div className="mx-auto max-w-6xl space-y-8" aria-label="Loading billing information">
      <Skeleton className="h-16 rounded-xl" />
      <Skeleton className="h-96 rounded-xl" />
      <div className="grid gap-4 lg:grid-cols-3">
        {[0, 1, 2].map((item) => (
          <Skeleton key={item} className="h-72 rounded-xl" />
        ))}
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <Skeleton className="h-48 rounded-xl" />
        <Skeleton className="h-72 rounded-xl" />
      </div>
    </div>
  );
}

export default function BillingPage() {
  const queryClient = useQueryClient();
  const [pendingAction, setPendingAction] = useState("");
  const [confirmation, setConfirmation] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showAllInvoices, setShowAllInvoices] = useState(false);
  const query = useQuery({
    queryKey: ["billing", "overview"],
    queryFn: ({ signal }) => getBillingOverview(signal),
    staleTime: 30_000,
    retry: false,
  });
  useEffect(() => {
    if (!query.data?.currentPlan || query.isFetching) return;

    const url = new URL(window.location.href);
    const planKey = url.searchParams.get("plan");
    if (!planKey) return;

    const plan = query.data.availablePlans?.find((item) => item.key === planKey);
    url.searchParams.delete("plan");
    window.history.replaceState(window.history.state, "", url.pathname + url.search + url.hash);

    if (plan) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- Open the requested pricing plan after billing loads.
      setSelectedPlan({ ...plan, trigger: document.activeElement });
    }
  }, [query.data, query.isFetching]);

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
      setSelectedPlan(null);
      const message =
        {
          updated: "Your plan has been updated.",
          canceled_at_period_end: "Your subscription will end after the current billing period.",
          cancellation_pending: "Your subscription is already set to end this billing period.",
          downgrade_scheduled: "Your plan change is scheduled for the end of this billing period.",
          pending_change_canceled: "Your scheduled plan change has been canceled.",
          unchanged: "You are already on this plan.",
        }[result.action] || "Billing settings updated.";
      toast.success(message);
      await queryClient.invalidateQueries({ queryKey: ["billing"] });
    },
    onError: (error) => toast.error(error.message || "Could not update your plan."),
  });
  const runBillingAction = async (name, action, successMessage, updateOverview) => {
    setPendingAction(name);
    try {
      await action();
      if (updateOverview) {
        queryClient.setQueryData(["billing", "overview"], updateOverview);
      }
      toast.success(successMessage);
      await queryClient.invalidateQueries({ queryKey: ["billing"] });
      if (updateOverview) {
        queryClient.setQueryData(["billing", "overview"], updateOverview);
      }
    } catch (error) {
      toast.error(error.message || "Could not update billing settings.");
    } finally {
      setPendingAction("");
    }
  };

  const managePayment = async () => {
    setPendingAction("payment");
    let paymentTab;
    try {
      paymentTab = window.open("about:blank", "_blank");
      if (!paymentTab) throw new Error("Please allow pop-ups to open payment settings.");
      paymentTab.opener = null;
      const url = await getPaymentMethodUrl();
      paymentTab.location.assign(url);
    } catch (error) {
      paymentTab?.close();
      toast.error(error.message || "Could not open payment settings.");
    } finally {
      setPendingAction("");
    }
  };

  const manageBillingAccount = async () => {
    setPendingAction("portal");
    let portalTab;
    try {
      portalTab = window.open("about:blank", "_blank");
      if (!portalTab) throw new Error("Please allow pop-ups to open your billing account.");
      portalTab.opener = null;
      const url = await getBillingPortalUrl();
      portalTab.location.assign(url);
    } catch (error) {
      portalTab?.close();
      toast.error(error.message || "Could not open your billing account.");
    } finally {
      setPendingAction("");
    }
  };

  if (query.isPending) return <BillingSkeleton />;
  if (query.isError) {
    return (
      <div className="mx-auto max-w-6xl space-y-8">
        <PageHeader
          title="Usage & Billing"
          description="Your plan and conversation usage this billing cycle."
        />
        <EmptyState
          title="Billing unavailable"
          body={query.error?.message || "Please try again."}
          action={
            <Button type="button" onClick={() => query.refetch()} disabled={query.isFetching}>
              {query.isFetching ? "Retrying..." : "Retry"}
            </Button>
          }
        />
      </div>
    );
  }

  const { currentPlan, availablePlans = [], period, usageByBot } = query.data || {};
  if (!currentPlan) {
    return (
      <div className="mx-auto max-w-6xl space-y-8">
        <PageHeader
          title="Usage & Billing"
          description="Your plan and conversation usage this billing cycle."
        />
        <EmptyState
          title="No plan details yet"
          body="Your billing information is not available right now."
        />
      </div>
    );
  }

  const pendingTargetPlan = currentPlan.pendingPlanChange
    ? availablePlans.find((plan) => plan.key === currentPlan.pendingPlanChange.planKey)
    : null;

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <PageHeader
        title="Usage & Billing"
        description="Your plan and conversation usage this billing cycle."
        actions={
          <div className="flex flex-wrap items-center gap-3">
            {query.isFetching && (
              <span role="status" className="text-[13px] text-muted-foreground">
                Refreshing...
              </span>
            )}
            {currentPlan.canManageSubscription && (
              <Button
                type="button"
                variant="secondary"
                className="min-h-10"
                onClick={manageBillingAccount}
                disabled={pendingAction === "portal"}
              >
                {pendingAction === "portal" ? "Opening..." : "Manage billing account"}
                <ExternalLink className="size-4" aria-hidden="true" />
              </Button>
            )}
          </div>
        }
      />
      <Suspense fallback={null}>
        <CheckoutSyncStatus currentPlan={currentPlan} />
      </Suspense>
      <CurrentPlan
        plan={currentPlan}
        period={period}
        pendingTargetPlan={pendingTargetPlan}
        pendingChange={changePlan.isPending && changePlan.variables === currentPlan.key}
        onKeepCurrent={() => changePlan.mutate(currentPlan.key)}
        onCancel={() => setConfirmation({ trigger: document.activeElement })}
        onPayment={managePayment}
        paymentPending={pendingAction === "payment"}
        onResume={() =>
          runBillingAction(
            "resume",
            resumeBillingPlan,
            "Your subscription will continue.",
            (overview) =>
              overview
                ? {
                    ...overview,
                    currentPlan: {
                      ...overview.currentPlan,
                      cancelAtPeriodEnd: false,
                    },
                  }
                : overview,
          )
        }
        actionPending={pendingAction === "cancel" || pendingAction === "resume"}
        upgradeDisabled={
          !availablePlans.some(
            (plan) => plan.canCheckout && plan.priceCents > currentPlan.priceCents,
          )
        }
        onUpgrade={() => {
          const plan = availablePlans.find(
            (candidate) => candidate.canCheckout && candidate.priceCents > currentPlan.priceCents,
          );
          if (plan) setSelectedPlan({ ...plan, trigger: document.activeElement });
        }}
      />

      <UsageByBot
        items={usageByBot}
        conversationTotal={numericFeature(currentPlan, "conversations")?.used}
      />

      <section aria-labelledby="plans-heading" className="space-y-4">
        <div>
          <h2 id="plans-heading" className="text-base font-semibold">
            Plans
          </h2>
          <p className="mt-1 text-[13px] text-muted-foreground">
            Choose the plan that fits your visitors. Upgrades apply immediately; downgrades and
            switching to Free take effect at period end.
          </p>
        </div>
        {availablePlans.length ? (
          <PricingCards
            mode="dashboard"
            plans={availablePlans}
            currentPlan={currentPlan}
            onSelectPlan={(plan) =>
              setSelectedPlan({ ...plan, trigger: document.activeElement })
            }
            pendingPlanKey={changePlan.isPending ? changePlan.variables : ""}
          />
        ) : (
          <EmptyState
            title="No plans available"
            body="Available plans will appear here when published."
          />
        )}
      </section>

      <section aria-labelledby="billing-heading" className="space-y-4">
        <div>
          <h2 id="billing-heading" className="text-base font-semibold">
            Billing
          </h2>
          <p className="mt-1 text-[13px] text-muted-foreground">
            Manage payment details and download your invoices.
          </p>
        </div>
        <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
          <PaymentMethodCard
            canManage={currentPlan.canManageSubscription}
            pending={pendingAction === "payment"}
            onManage={managePayment}
          />
          <Card className="min-w-0">
            <div className="mb-5 flex items-center gap-2">
              <FileText className="size-4 text-primary" aria-hidden="true" />
              <h3 className="text-base font-semibold">Invoices</h3>
            </div>
            {invoicesQuery.isPending ? (
              <Skeleton className="h-24 rounded-lg" />
            ) : invoicesQuery.isError ? (
              <EmptyState
                title="Invoices unavailable"
                body="Please refresh the page to try again."
              />
            ) : invoicesQuery.data?.length ? (
              <div>
                <ul id="billing-invoices" className="divide-y">
                  {(showAllInvoices ? invoicesQuery.data : invoicesQuery.data.slice(0, 5)).map(
                    (invoice) => (
                      <InvoiceRow
                        key={invoice.id}
                        invoice={invoice}
                        pending={pendingAction === `invoice-${invoice.id}`}
                        onDownload={async () => {
                          setPendingAction(`invoice-${invoice.id}`);
                          try {
                            window.location.assign(
                              invoice.provider === "paddle"
                                ? await getInvoicePdfUrl(invoice.id)
                                : invoice.downloadUrl,
                            );
                          } catch (error) {
                            toast.error(error.message || "Could not open invoice PDF.");
                          } finally {
                            setPendingAction("");
                          }
                        }}
                      />
                    ),
                  )}
                </ul>
                {invoicesQuery.data.length > 5 && (
                  <Button
                    type="button"
                    variant="ghost"
                    className="mt-3 min-h-10 w-full"
                    aria-expanded={showAllInvoices}
                    aria-controls="billing-invoices"
                    onClick={() => setShowAllInvoices((value) => !value)}
                  >
                    {showAllInvoices ? "Show less" : `Show all (${invoicesQuery.data.length})`}
                  </Button>
                )}
              </div>
            ) : (
              <EmptyState title="No invoices yet" />
            )}
          </Card>
        </div>
      </section>
      {selectedPlan && (
        <PlanChangeDialog
          plan={selectedPlan}
          currentPlan={currentPlan}
          pending={changePlan.isPending}
          onClose={() => setSelectedPlan(null)}
          onConfirm={(plan) => changePlan.mutateAsync(plan.key)}
        />
      )}
      <ConfirmCancellation
        confirmation={confirmation}
        plan={currentPlan}
        onClose={() => setConfirmation(null)}
        onConfirm={() => {
          const selected = confirmation?.plan;
          setConfirmation(null);
          if (selected) changePlan.mutate(selected.key);
          else
            runBillingAction(
              "cancel",
              cancelBillingPlan,
              "Cancellation scheduled for the end of this billing period.",
            );
        }}
      />
    </div>
  );
}


