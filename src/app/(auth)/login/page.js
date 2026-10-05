"use client";

/* eslint-disable react-hooks/set-state-in-effect -- Preserve existing client-only query/storage synchronization in this visual-only change. */

import { Button, Input, Label } from "@/components/ui";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import AuthShowcase from "@/components/auth/AuthShowcase";

export default function LoginPage() {
  const router = useRouter();
  const [plan, setPlan] = useState("free");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const nextPlan =
      new URLSearchParams(window.location.search).get("plan") || "free";
    setPlan(nextPlan);
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Invalid credentials");
      }

      const bots = await fetch("/api/bots").then((res) => res.json());
      router.push(
        bots.length
          ? "/dashboard"
          : `/onboarding?plan=${encodeURIComponent(plan)}`,
      );
    } catch (loginError) {
      setError(loginError.message || "Unable to sign in right now.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-muted">
      <div className="mx-auto grid min-h-screen max-w-6xl items-center gap-8 px-4 py-8 lg:grid-cols-[0.9fr_1.1fr]">
        <AuthShowcase title="Your website assistant, ready to help" description="Answer questions and capture leads with the content you already have." items={["Answer from your own docs", "Capture leads and requests", "Match your brand"]} />

        <div className="order-1 mx-auto w-full max-w-md rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8">
          <div className="mb-6 flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Welcome back</p>
              <h2 className="text-2xl font-semibold text-foreground">Log in</h2>
            </div>
            <Link href="/" className="text-sm font-medium text-primary">
              Back to home
            </Link>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label className="mb-1 block text-sm font-medium text-foreground">
                Email
              </Label>
              <Input
                type="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="w-full"
                placeholder="you@company.com"
              />
            </div>
            <div>
              <Label className="mb-1 block text-sm font-medium text-foreground">
                Password
              </Label>
              <Input
                type="password"
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="w-full"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <p className="rounded-xl border border-destructive/20 bg-destructive-bg px-3 py-2 text-sm text-destructive">
                {error}
              </p>
            )}

            <Button variant="primary"
              type="submit"
              disabled={loading}
              className="w-full"
            >
              {loading ? "Signing in…" : "Log in"}
            </Button>
          </form>

          <p className="mt-5 text-center text-sm text-muted-foreground">
            No account yet?{" "}
            <Link
              href={`/signup?plan=${encodeURIComponent(plan)}`}
              className="font-medium text-primary"
            >
              Create one
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
