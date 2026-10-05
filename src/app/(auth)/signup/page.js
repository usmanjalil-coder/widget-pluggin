"use client";

/* eslint-disable react-hooks/set-state-in-effect -- Preserve existing client-only query/storage synchronization in this visual-only change. */

import { Button, Input, Label } from "@/components/ui";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import AuthShowcase from "@/components/auth/AuthShowcase";

export default function SignupPage() {
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
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, plan }),
      });

      if (!response.ok) {
        throw new Error("Unable to create your account.");
      }

      router.push(`/onboarding?plan=${encodeURIComponent(plan)}`);
    } catch (signupError) {
      setError(signupError.message || "Unable to create an account right now.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-muted">
      <div className="mx-auto grid min-h-screen max-w-6xl items-center gap-8 px-4 py-8 lg:grid-cols-[0.9fr_1.1fr]">
        <AuthShowcase title="Start with your content. Make it yours." description="Set up an assistant that answers questions and fits your site." items={["Train on your own content", "Customize the look and voice", "Track leads and requests"]} />

        <div className="order-1 mx-auto w-full max-w-md rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8">
          <div className="mb-6 flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Start free</p>
              <h2 className="text-2xl font-semibold text-foreground">
                Create account
              </h2>
            </div>
            <Link href="/" className="text-sm font-medium text-primary">
              Back to home
            </Link>
          </div>

          <div className="mb-5 rounded-2xl border border-primary/20 bg-accent px-3 py-2 text-sm text-accent-foreground">
            Selected plan:{" "}
            <span className="font-semibold capitalize">{plan}</span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label className="mb-1 block text-sm font-medium text-foreground">
                Work email
              </Label>
              <Input
                type="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="w-full"
                placeholder="hello@company.com"
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
                placeholder="Create a password"
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
              {loading ? "Creating…" : "Create account"}
            </Button>
          </form>

          <p className="mt-5 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              href={`/login?plan=${encodeURIComponent(plan)}`}
              className="font-medium text-primary"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
