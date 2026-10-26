"use client";

import { CalendarClock } from "lucide-react";
import { Button } from "@/components/ui";
import { billingDate } from "./BillingDetails";

export default function PendingChangeBanner({
  currentPlan,
  targetPlan,
  pending,
  onKeepCurrent,
}) {
  const pendingChange = currentPlan?.pendingPlanChange;
  if (!pendingChange) return null;

  const effectiveDate = billingDate(pendingChange.effectiveAt);
  const targetName = targetPlan?.name || pendingChange.planKey;

  return (
    <div
      className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-warning/25 bg-warning-bg p-4"
      role="status"
    >
      <p className="flex min-w-0 items-start gap-2 text-sm text-warning-foreground">
        <CalendarClock className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
        <span>
          Switching to <strong>{targetName}</strong>
          {effectiveDate ? " on " + effectiveDate : " at the end of this billing period"}. You keep{" "}
          <strong>{currentPlan.name}</strong> until then.
        </span>
      </p>
      <Button
        type="button"
        variant="secondary"
        className="min-h-10 shrink-0"
        onClick={onKeepCurrent}
        disabled={pending}
      >
        {pending ? "Updating…" : "Keep " + currentPlan.name}
      </Button>
    </div>
  );
}
