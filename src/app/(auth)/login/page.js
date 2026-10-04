"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { brand } from "@/lib/brand";

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
    <main className="min-h-screen bg-slate-100">
      <div className="mx-auto grid min-h-screen max-w-6xl items-center gap-8 px-4 py-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="hidden rounded-3xl bg-slate-900 p-8 text-white shadow-xl lg:flex lg:min-h-[620px] lg:flex-col lg:justify-between">
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-3 text-lg font-semibold"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-700 bg-slate-800">
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5 text-blue-400"
                  aria-hidden="true"
                >
                  <path
                    fill="currentColor"
                    d="M12 2 3 7l9 5 9-5-9-5Zm-8 8 8 4 8-4v7l-8 4-8-4v-7Z"
                  />
                </svg>
              </span>
              {brand.name}
            </Link>
            <h1 className="mt-10 max-w-sm text-4xl font-semibold leading-tight">
              Set up an AI assistant for your website in minutes.
            </h1>
            <p className="mt-5 max-w-sm text-slate-300">
              Answer questions, capture leads, and reduce repetitive support
              work without adding a full support team.
            </p>
          </div>

          <div className="space-y-3">
            {[
              "Answer questions with your own docs",
              "Capture leads and appointments",
              "Work on any website",
            ].map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 rounded-2xl border border-slate-700 bg-slate-800/70 p-3"
              >
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-500 text-xs font-bold text-white">
                  ✓
                </span>
                <span className="text-sm text-slate-200">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mx-auto w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="mb-6 flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-medium text-slate-500">Welcome back</p>
              <h2 className="text-2xl font-semibold text-slate-900">Log in</h2>
            </div>
            <Link href="/" className="text-sm font-medium text-blue-600">
              Back to home
            </Link>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                placeholder="you@company.com"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <p className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? "Signing in…" : "Log in"}
            </button>
          </form>

          <p className="mt-5 text-center text-sm text-slate-600">
            No account yet?{" "}
            <Link
              href={`/signup?plan=${encodeURIComponent(plan)}`}
              className="font-medium text-blue-600"
            >
              Create one
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
