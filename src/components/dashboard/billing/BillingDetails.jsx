"use client";

import { useEffect, useRef } from "react";
import {
  AlertTriangle,
  Check,
  CreditCard,
  Download,
  ExternalLink,
  LoaderCircle,
} from "lucide-react";
import { Badge, Button, Card, EmptyState } from "@/components/ui";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function billingDate(value) {
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? null
    : new Intl.DateTimeFormat("en-US", { dateStyle: "medium" }).format(date);
}

export function SubscriptionBanner({
  plan,
  onResume,
  onCancel,
  onPayment,
  actionPending,
  paymentPending,
}) {
  const end = billingDate(plan.currentPeriodEnd);
  const failed = plan.subscriptionStatus === "past_due";
  const ending = plan.cancelAtPeriodEnd;
  return (
    <div
      className={`flex flex-wrap items-center justify-between gap-3 rounded-xl border p-4 ${failed ? "border-destructive/25 bg-destructive-bg" : ending ? "border-warning/25 bg-warning-bg" : "border-primary/10 bg-card/70"}`}
    >
      <div className="min-w-0 space-y-2" role="status">
        {failed && (
          <p className="flex items-start gap-2 text-sm font-medium text-destructive">
            <AlertTriangle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
            Payment failed. Update your payment method to keep your plan.
          </p>
        )}
        {ending && (
          <p className="flex items-start gap-2 text-sm font-medium text-warning-foreground">
            <AlertTriangle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
            Your plan is set to end{end ? ` on ${end}` : " at the end of this billing period"}.
          </p>
        )}
        {!failed && !ending && (
          <div className="flex flex-wrap items-center gap-3">
            {plan.subscriptionStatus && (
              <Badge tone={plan.subscriptionStatus === "active" ? "success" : "default"}>
                {plan.subscriptionStatus === "active" && <Check aria-hidden="true" />}
                {{ active: "Active", trialing: "Trial", canceled: "Canceled" }[
                  plan.subscriptionStatus
                ] || plan.subscriptionStatus}
              </Badge>
            )}
            {end && ["active", "trialing"].includes(plan.subscriptionStatus) && (
              <span className="text-[13px] text-muted-foreground">
                {plan.subscriptionStatus === "trialing"
                  ? "Trial ends"
                  : plan.canManageSubscription
                    ? "Renews"
                    : "Period ends"}{" "}
                {end}
              </span>
            )}
            {!plan.subscriptionStatus && (
              <span className="text-sm text-muted-foreground">Your current plan and usage</span>
            )}
          </div>
        )}
      </div>
      {plan.canManageSubscription && (
        <div className="flex flex-wrap gap-2">
          {failed && (
            <Button className="min-h-10" onClick={onPayment} disabled={paymentPending}>
              {paymentPending ? "Opening…" : "Update payment method"}
            </Button>
          )}
          {ending ? (
            <Button className="min-h-10" onClick={onResume} disabled={actionPending}>
              {actionPending ? "Updating…" : "Keep subscription"}
            </Button>
          ) : (
            <Button
              className="min-h-10 text-muted-foreground"
              variant="ghost"
              onClick={onCancel}
              disabled={actionPending}
            >
              Cancel subscription
            </Button>
          )}
        </div>
      )}
    </div>
  );
}

export function ConfirmCancellation({ confirmation, plan, onClose, onConfirm }) {
  const end = billingDate(plan.currentPeriodEnd);
  const downgrade = Boolean(confirmation?.plan);
  const triggerRef = useRef(null);
  useEffect(() => {
    if (confirmation?.trigger) triggerRef.current = confirmation.trigger;
  }, [confirmation]);
  return (
    <Dialog
      open={Boolean(confirmation)}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DialogContent
        showCloseButton={false}
        onCloseAutoFocus={(event) => {
          event.preventDefault();
          triggerRef.current?.focus();
        }}
      >
        <DialogHeader>
          <DialogTitle>{downgrade ? "Switch to Free?" : "Cancel subscription?"}</DialogTitle>
          <DialogDescription className="leading-relaxed">
            Your {plan.name} plan stays available{" "}
            {end ? `until ${end}` : "until the end of your current billing period"}. After that,
            your subscription ends and Free plan limits apply. You can keep your subscription before
            then.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button className="min-h-10" onClick={onClose}>
            Keep subscription
          </Button>
          <Button className="min-h-10" variant="secondary" onClick={onConfirm}>
            {downgrade ? "Switch at period end" : "Confirm cancellation"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function PaymentMethodCard({ canManage, pending, onManage }) {
  return (
    <Card className="min-w-0 space-y-4 self-start">
      <div className="flex items-center gap-3">
        <span className="rounded-lg bg-primary/10 p-2 text-primary">
          <CreditCard className="size-5" aria-hidden="true" />
        </span>
        <h3 className="text-base font-semibold">Payment method</h3>
      </div>
      {canManage ? (
        <p className="text-sm leading-relaxed text-muted-foreground">
          Update your card and billing details in Paddle&apos;s secure portal.
        </p>
      ) : (
        <div className="[&>div]:p-4 [&>div>span]:mb-2 [&>div>span]:size-8">
          <EmptyState
            title="No payment method yet"
            body="A payment method is added securely during Paddle checkout."
          />
        </div>
      )}
      <Button
        type="button"
        variant="secondary"
        className="min-h-10 w-full"
        disabled={!canManage || pending}
        onClick={onManage}
      >
        {pending ? "Opening…" : "Manage payment method"}
        <ExternalLink className="size-4" aria-hidden="true" />
      </Button>
    </Card>
  );
}

export function InvoiceRow({ invoice, pending, onDownload }) {
  const date = billingDate(invoice.issuedAt);
  // The current API also uses `number` for Paddle transaction IDs.
  const invoiceNumber = invoice.number && !/^txn_/i.test(invoice.number) ? invoice.number : null;
  const title = invoiceNumber || `Invoice${date ? ` · ${date}` : ""}`;
  return (
    <li className="grid min-w-0 grid-cols-[minmax(0,1fr)_auto_2.5rem] items-center gap-x-3 gap-y-2 py-4">
      <div className="min-w-0">
        <p className="break-words text-sm font-medium">{title}</p>
        <p className="mt-1 text-xs text-muted-foreground">
          {invoiceNumber && date ? date : "Subscription billing"}
        </p>
      </div>
      <div className="flex flex-col items-end gap-1.5">
        <p className="text-sm font-semibold tabular-nums">
          {new Intl.NumberFormat("en-US", { style: "currency", currency: invoice.currency }).format(
            invoice.amountCents / 100,
          )}
        </p>
        <Badge
          className="capitalize"
          tone={
            invoice.status === "paid"
              ? "success"
              : invoice.status === "open"
                ? "warning"
                : "default"
          }
        >
          {invoice.status}
        </Badge>
      </div>
      <Button
        type="button"
        variant="ghost"
        size="icon-lg"
        aria-label="Download invoice PDF"
        aria-busy={pending}
        title={pending ? "Opening…" : "Download invoice PDF"}
        disabled={pending || !invoice.downloadUrl}
        onClick={onDownload}
      >
        {pending ? (
          <LoaderCircle
            className="size-4 animate-spin motion-reduce:animate-none"
            aria-hidden="true"
          />
        ) : (
          <Download className="size-4" aria-hidden="true" />
        )}
      </Button>
    </li>
  );
}
