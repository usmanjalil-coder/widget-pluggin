"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AlertTriangle, LoaderCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { previewBillingPlanChange } from "@/lib/api/billing.api";
import { billingDate } from "./BillingDetails";

function money(cents, currency) {
  if (typeof cents !== "number" || !currency) return null;

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(cents / 100);
}

function previewCopy(preview) {
  const effectiveAt = billingDate(preview?.effectiveAt);

  if (preview?.action === "upgrade") {
    return (
      "You'll be charged " +
      money(preview.immediateChargeCents, preview.currency) +
      " today. Next renewal: " +
      money(preview.nextRenewalCents, preview.currency) +
      "."
    );
  }
  if (preview?.action === "downgrade_scheduled") {
    return (
      "Your plan changes" +
      (effectiveAt ? " on " + effectiveAt : " at the end of this billing period") +
      ". You keep your current plan until then. No charge today."
    );
  }
  if (preview?.action === "cancel_at_period_end") {
    return (
      "Your subscription ends" +
      (effectiveAt ? " on " + effectiveAt : " at the end of this billing period") +
      ". You keep access until then."
    );
  }
  if (preview?.action === "checkout") {
    return "You'll complete payment in Paddle's secure checkout.";
  }
  if (preview?.action === "unchanged") {
    return "No billing change is required.";
  }

  return null;
}

function confirmLabel(action, planName) {
  return (
    {
      upgrade: "Upgrade to " + planName,
      downgrade_scheduled: "Schedule downgrade",
      cancel_at_period_end: "Switch to Free",
      checkout: "Continue to secure checkout",
      unchanged: "Confirm",
    }[action] || "Confirm change"
  );
}

export default function PlanChangeDialog({
  plan,
  currentPlan,
  pending,
  onClose,
  onConfirm,
}) {
  const [result, setResult] = useState({ planKey: null, preview: null, error: "" });
  const [attempt, setAttempt] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const triggerRef = useRef(null);
  const submittingRef = useRef(false);
  const mountedRef = useRef(true);
  const alreadyScheduled = currentPlan?.pendingPlanChange?.planKey === plan?.key
    || (plan?.key === "free" && currentPlan?.cancelAtPeriodEnd);
  const alreadyCurrent = currentPlan?.key === plan?.key;
  const informational = alreadyScheduled || alreadyCurrent;
  const preview = informational ? { action: "unchanged" } : result.planKey === plan?.key ? result.preview : null;
  const error = !informational && result.planKey === plan?.key ? result.error : "";

  useEffect(() => {
    if (plan?.trigger) triggerRef.current = plan.trigger;
  }, [plan]);

  useEffect(
    () => () => {
      mountedRef.current = false;
    },
    [],
  );

  const loadPreview = useCallback(() => {
    setResult({ planKey: plan?.key, preview: null, error: "" });
    setAttempt((value) => value + 1);
  }, [plan?.key]);

  useEffect(() => {
    if (!plan?.key || informational) return undefined;

    const controller = new AbortController();

    previewBillingPlanChange(plan.key, controller.signal)
      .then((previewResult) => {
        setResult({ planKey: plan.key, preview: previewResult, error: "" });
      })
      .catch((requestError) => {
        if (requestError?.name !== "AbortError") {
          setResult({
            planKey: plan.key,
            preview: null,
            error: requestError?.message || "Could not preview this plan change.",
          });
        }
      });

    return () => controller.abort();
  }, [plan?.key, attempt, informational]);

  const scheduledDate = billingDate(currentPlan?.pendingPlanChange?.effectiveAt || currentPlan?.currentPeriodEnd);
  const message = alreadyScheduled
    ? `You have already scheduled a change to ${plan.name}${scheduledDate ? " on " + scheduledDate : " at the end of this billing period"}. You keep your current plan until then.`
    : alreadyCurrent
      ? `You are already on ${plan.name}.${currentPlan?.pendingPlanChange || currentPlan?.cancelAtPeriodEnd ? " Your scheduled change remains in place. Use Keep current plan on the billing page to cancel it." : ""}`
      : previewCopy(preview);

  const confirm = async () => {
    if (informational || preview?.action === "unchanged") {
      onClose();
      return;
    }
    if (!preview || pending || submittingRef.current) return;

    submittingRef.current = true;
    setSubmitting(true);

    try {
      await onConfirm(plan, preview);
    } catch {
      submittingRef.current = false;
      if (mountedRef.current) setSubmitting(false);
    }
  };

  return (
    <Dialog open={Boolean(plan)} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        onCloseAutoFocus={(event) => {
          event.preventDefault();
          triggerRef.current?.focus();
        }}
      >
        <DialogHeader>
          <DialogTitle>{alreadyScheduled ? "Plan change already scheduled" : alreadyCurrent ? "Your current plan" : plan ? "Change to " + plan.name + "?" : "Change plan"}</DialogTitle>
          <DialogDescription>
            Review the billing impact before confirming your plan change.
          </DialogDescription>
        </DialogHeader>

        <div className="min-h-20 rounded-xl border bg-muted/30 p-4" aria-live="polite">
          {!preview && !error && (
            <p className="flex items-center gap-2 text-sm text-muted-foreground">
              <LoaderCircle
                className="size-4 animate-spin motion-reduce:animate-none"
                aria-hidden="true"
              />
              Calculating your plan change…
            </p>
          )}
          {error && (
            <div className="space-y-3">
              <p className="flex items-start gap-2 text-sm text-destructive">
                <AlertTriangle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                {error}
              </p>
              <Button
                type="button"
                variant="secondary"
                className="min-h-10"
                onClick={loadPreview}
              >
                <RefreshCw className="size-4" aria-hidden="true" />
                Retry
              </Button>
            </div>
          )}
          {preview && (
            <div className="space-y-3">
              <p className="text-sm leading-relaxed">{message}</p>
              {preview.botsOverLimit > 0 && (
                <p className="flex items-start gap-2 rounded-lg border border-warning/25 bg-warning-bg p-3 text-sm text-warning-foreground">
                  <AlertTriangle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                  {preview.botsOverLimit} of your bots will be paused when this change takes effect.
                  Your data is kept.
                </p>
              )}
            </div>
          )}
        </div>

        <DialogFooter>
          <Button type="button" variant="secondary" className="min-h-10" onClick={onClose}>
            Go back
          </Button>
          <Button
            type="button"
            className="min-h-10"
            disabled={!preview || Boolean(error) || pending || submitting}
            onClick={confirm}
          >
            {informational || preview?.action === "unchanged" ? "Got it" : pending ? "Updating…" : confirmLabel(preview?.action, plan?.name)}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
