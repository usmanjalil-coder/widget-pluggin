"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CheckCircle2, LoaderCircle, RefreshCw } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Button } from "@/components/ui";
import { syncBilling } from "@/lib/api/billing.api";

const POLL_INTERVAL = 3_000;
const POLL_TIMEOUT = 30_000;

function wait(milliseconds, signal) {
  return new Promise((resolve, reject) => {
    const timer = window.setTimeout(resolve, milliseconds);
    signal.addEventListener(
      "abort",
      () => {
        window.clearTimeout(timer);
        reject(new DOMException("Aborted", "AbortError"));
      },
      { once: true },
    );
  });
}

export default function CheckoutSyncStatus({ currentPlan }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();
  const checkoutSuccess = searchParams.get("checkout") === "success";
  const [state, setState] = useState(checkoutSuccess ? "confirming" : "idle");
  const [refreshing, setRefreshing] = useState(false);
  const manualController = useRef(null);

  const isConfirmed = useCallback((overview) => {
    const plan = overview?.currentPlan;
    return plan?.key !== "free" || plan?.subscriptionStatus === "active";
  }, []);

  const finish = useCallback(async () => {
    await queryClient.invalidateQueries({ queryKey: ["billing"] });
    toast.success("Payment confirmed. Your plan is active.");
    router.replace("/dashboard/billing", { scroll: false });
  }, [queryClient, router]);

  useEffect(() => {
    if (!checkoutSuccess) return undefined;

    const controller = new AbortController();
    const deadline = Date.now() + POLL_TIMEOUT;
    let active = true;
    let completed = false;
    let timedOut = false;
    const timeoutId = window.setTimeout(() => {
      timedOut = true;
      controller.abort();
    }, POLL_TIMEOUT);

    async function poll() {
      try {
        while (active && Date.now() < deadline) {
          try {
            const overview = await syncBilling(controller.signal);
            if (isConfirmed(overview)) {
              completed = true;
              await finish();
              return;
            }
          } catch (error) {
            if (error?.name === "AbortError") return;
          }

          const remaining = deadline - Date.now();
          if (remaining <= 0) return;

          try {
            await wait(Math.min(POLL_INTERVAL, remaining), controller.signal);
          } catch {
            return;
          }
        }
      } finally {
        window.clearTimeout(timeoutId);
        if (active && !completed && (timedOut || Date.now() >= deadline)) {
          setState("delayed");
        }
      }
    }

    poll();

    return () => {
      active = false;
      window.clearTimeout(timeoutId);
      controller.abort();
    };
  }, [checkoutSuccess, finish, isConfirmed]);

  useEffect(
    () => () => {
      manualController.current?.abort();
    },
    [],
  );

  const refresh = async () => {
    manualController.current?.abort();
    const controller = new AbortController();
    manualController.current = controller;
    setRefreshing(true);

    try {
      const overview = await syncBilling(controller.signal);
      if (isConfirmed(overview)) {
        await finish();
      } else {
        await queryClient.invalidateQueries({ queryKey: ["billing"] });
        toast.info("Your plan is still being confirmed.");
      }
    } catch (error) {
      toast.error(error?.message || "Could not refresh billing.");
    } finally {
      if (manualController.current === controller) {
        manualController.current = null;
        setRefreshing(false);
      }
    }
  };

  if (!checkoutSuccess || state === "idle") return null;

  return (
    <div
      className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-primary/20 bg-primary/5 p-4"
      aria-live="polite"
      role="status"
    >
      <p className="flex items-center gap-2 text-sm">
        {state === "confirming" ? (
          <LoaderCircle
            className="size-4 animate-spin text-primary motion-reduce:animate-none"
            aria-hidden="true"
          />
        ) : (
          <CheckCircle2 className="size-4 text-primary" aria-hidden="true" />
        )}
        {state === "confirming"
          ? "Confirming your payment…"
          : "Payment received. Your plan will update shortly."}
      </p>
      {state === "delayed" && (
        <Button
          type="button"
          variant="secondary"
          className="min-h-10"
          onClick={refresh}
          disabled={refreshing}
        >
          <RefreshCw
            className={refreshing ? "size-4 animate-spin motion-reduce:animate-none" : "size-4"}
            aria-hidden="true"
          />
          {refreshing ? "Refreshing…" : "Refresh"}
        </Button>
      )}
    </div>
  );
}
