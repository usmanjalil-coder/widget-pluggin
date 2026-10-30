"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { initializePaddle } from "@paddle/paddle-js";

let paddleInitialization;
let currentHandler = () => {};

function initializePaddleOnce(options) {
  if (!paddleInitialization) {
    paddleInitialization = initializePaddle({
      ...options,
      eventCallback: (event) => currentHandler(event),
    }).catch((error) => {
      paddleInitialization = undefined;
      throw error;
    });
  }

  return paddleInitialization;
}

export default function PaddleCheckoutPage() {
  const router = useRouter();
  const [state, setState] = useState("loading");

  useEffect(() => {
    let active = true;
    let checkoutCompleted = false;

    currentHandler = (event) => {
      if (!active) return;

      if (event?.name === "checkout.loaded") setState("ready");
      if (event?.name === "checkout.error") setState("checkout-error");
      if (event?.name === "checkout.completed") {
        checkoutCompleted = true;
        setState("completed");
      }
      if (event?.name === "checkout.closed" && !checkoutCompleted) {
        router.replace("/dashboard/billing");
      }
    };

    async function initializeCheckout() {
      const transactionId = new URLSearchParams(window.location.search).get("_ptxn");
      if (!transactionId) {
        setState("missing-transaction");
        return;
      }

      const token = process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN;
      const environment = process.env.NEXT_PUBLIC_PADDLE_ENV || "sandbox";
      if (!token || !["sandbox", "production"].includes(environment)) {
        setState("configuration-error");
        return;
      }

      try {
        let timeoutId;
        const paddle = await Promise.race([
          initializePaddleOnce({
            token,
            environment,
            checkout: {
              settings: {
                displayMode: "overlay",
                successUrl: `${window.location.origin}/dashboard/billing?checkout=success`,
              },
            },
          }),
          new Promise((_, reject) => {
            timeoutId = window.setTimeout(
              () => reject(new Error("Timed out loading Paddle.js.")),
              15_000,
            );
          }),
        ]).finally(() => window.clearTimeout(timeoutId));
        if (!paddle) throw new Error("Paddle.js did not initialize.");
        if (active) setState((current) => (current === "loading" ? "opening" : current));
      } catch {
        if (active) setState("load-error");
      }
    }

    initializeCheckout();

    return () => {
      active = false;
      currentHandler = () => {};
    };
  }, [router]);

  const message = {
    loading: "Loading secure Paddle checkout…",
    opening: "Opening checkout…",
    ready: "Complete your payment in the secure Paddle window.",
    completed: "Payment completed. Returning to billing…",
    "missing-transaction": "This page opens Paddle checkout links. Start checkout from your billing page.",
    "configuration-error": "Checkout is not configured. Please contact support.",
    "load-error": "Paddle.js did not load. Check your connection to cdn.paddle.com, then retry checkout.",
    "checkout-error": "Paddle could not open this checkout. Return to billing and try again.",
  }[state];
  const showActions = !["loading", "opening", "ready", "completed"].includes(state);

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4 py-12">
      <section className="w-full max-w-md rounded-xl border border-border bg-card p-8 text-center shadow-sm">
        <h1 className="text-xl font-semibold">Secure checkout</h1>
        <p className="mt-3 text-sm text-muted-foreground" role="status" aria-live="polite">
          {message}
        </p>
        {showActions && (
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            {state === "load-error" && (
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="inline-flex min-h-10 items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground outline-none transition-colors hover:bg-primary-hover focus-visible:ring-2 focus-visible:ring-ring"
              >
                Retry checkout
              </button>
            )}
            <Link
              href="/dashboard/billing"
              className="inline-flex min-h-10 items-center justify-center rounded-lg border border-border px-4 py-2 text-sm font-medium outline-none transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring"
            >
              Return to billing
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}

