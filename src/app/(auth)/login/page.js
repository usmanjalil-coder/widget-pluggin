"use client";

import ThemeToggle from "@/components/shared/ThemeToggle";
import PasswordInput from "@/components/shared/PasswordInput";

/* eslint-disable react-hooks/set-state-in-effect -- Preserve existing client-only query/storage synchronization in this visual-only change. */

import { Button, Input, Label } from "@/components/ui";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AuthShowcase from "@/components/auth/AuthShowcase";
import ForgotPasswordDialog from "@/components/auth/ForgotPasswordDialog";
import { establishAuthSession, getCurrentUser, login } from "@/lib/api/auth.api";

export default function LoginPage() {
  const router = useRouter();
  const [plan, setPlan] = useState("free");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [forgotOpen, setForgotOpen] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);

  useEffect(() => {
    const nextPlan = new URLSearchParams(window.location.search).get("plan") || "free";
    setPlan(nextPlan);

    if (!window.localStorage.getItem("token")) {
      setCheckingSession(false);
      return;
    }

    let active = true;

    getCurrentUser()
      .then(() => {
        if (active) router.replace("/dashboard");
      })
      .catch(() => {
        window.localStorage.removeItem("token");
        if (active) setCheckingSession(false);
      });

    return () => {
      active = false;
    };
  }, [router]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const authResult = await login({ email, password });
      establishAuthSession(authResult);
      window.location.replace("/dashboard");
    } catch (loginError) {
      setError(loginError.message || "Unable to sign in right now.");
    } finally {
      setLoading(false);
    }
  };

  if (checkingSession) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background">
        <p role="status" className="text-sm text-muted-foreground">
          Checking your session…
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-muted">
      <div className="mx-auto grid min-h-screen max-w-6xl items-center gap-8 px-4 py-8 lg:grid-cols-[0.9fr_1.1fr]">
        <AuthShowcase
          title="Your website assistant, ready to help"
          description="Answer questions and capture leads with the content you already have."
          items={["Answer from your own docs", "Capture leads and requests", "Match your brand"]}
        />

        <div className="order-1 mx-auto w-full max-w-md rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8">
          <div className="mb-6 flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Welcome back</p>
              <h2 className="text-2xl font-semibold text-foreground">Log in</h2>
            </div>
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <Link href="/" className="text-sm font-medium text-primary">
                Back to home
              </Link>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label className="mb-1 block text-sm font-medium text-foreground">Email</Label>
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
              <Label
                htmlFor="login-password"
                className="mb-1 block text-sm font-medium text-foreground"
              >
                Password
              </Label>
              <PasswordInput
                id="login-password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="w-full"
                placeholder="••••••••"
              />
            </div>
            <div className="-mt-2 flex justify-end">
              <button
                type="button"
                onClick={() => setForgotOpen(true)}
                className="text-sm font-medium text-primary underline-offset-4 hover:underline"
              >
                Forgot password?
              </button>
            </div>

            {error && (
              <p className="rounded-xl border border-destructive/20 bg-destructive-bg px-3 py-2 text-sm text-destructive">
                {error}
              </p>
            )}

            <Button variant="primary" type="submit" disabled={loading} className="w-full">
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
      <ForgotPasswordDialog open={forgotOpen} onOpenChange={setForgotOpen} />
    </main>
  );
}
