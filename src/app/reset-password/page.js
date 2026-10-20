"use client";

import ThemeToggle from "@/components/shared/ThemeToggle";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { Button, Input, Label } from "@/components/ui";
import ForgotPasswordDialog from "@/components/auth/ForgotPasswordDialog";
import { resetPassword } from "@/lib/api/auth.api";

const rules = [
  (value) => value.length >= 8,
  (value) => /[A-Z]/.test(value),
  (value) => /\d/.test(value),
];

export default function ResetPasswordPage() {
  const router = useRouter();
  const [token, setToken] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [invalid, setInvalid] = useState(false);
  const [error, setError] = useState("");
  const [forgotOpen, setForgotOpen] = useState(false);

  /* eslint-disable react-hooks/set-state-in-effect -- Read reset credentials from the browser URL after hydration. */
  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    setToken(query.get("token") || "");
    setEmail(query.get("email") || "");
  }, []);
  const ready = !!token && !!email;
  const submit = async (event) => {
    event.preventDefault();
    setError("");
    if (!rules.every((rule) => rule(password))) {
      setError(
        "Password must be at least 8 characters and include an uppercase letter and a number.",
      );
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }
    setLoading(true);
    try {
      await resetPassword({ token, email, password, password_confirmation: confirm });
      toast.success("Password updated successfully.");
      router.replace("/login");
    } catch (err) {
      const code = err.code.toLowerCase();
      if (code.includes("invalid_reset_token") || code.includes("expired")) setInvalid(true);
      else setError(err.message || "Unable to reset your password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-muted px-4 py-8">
      <section
        className="w-full max-w-md rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8"
        aria-labelledby="reset-title"
      >
        <header className="mb-6 flex items-start justify-between gap-3">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Account security</p>
            <h1 id="reset-title" className="mt-1 text-2xl font-semibold">
              Reset password
            </h1>
          </div>
          <ThemeToggle />
        </header>
        {!ready ? (
          <div className="space-y-4">
            <p className="rounded-xl border border-warning/20 bg-warning-bg p-3 text-sm text-warning-foreground">
              This reset link is incomplete or invalid. Request a new link to continue.
            </p>
            <Button asChild className="w-full">
              <Link href="/login">Back to login</Link>
            </Button>
            <button
              type="button"
              onClick={() => setForgotOpen(true)}
              className="w-full text-sm font-medium text-primary"
            >
              Request a new link
            </button>
          </div>
        ) : invalid ? (
          <div className="space-y-4">
            <p
              role="alert"
              className="rounded-xl border border-destructive/20 bg-destructive-bg p-3 text-sm text-destructive"
            >
              This reset link is invalid or has expired. Request a new link to continue.
            </p>
            <Button onClick={() => setForgotOpen(true)} className="w-full">
              Request a new link
            </Button>
            <Button variant="secondary" asChild className="w-full">
              <Link href="/login">Back to login</Link>
            </Button>
          </div>
        ) : (
          <form onSubmit={submit} className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Choose a new password for <span className="font-medium text-foreground">{email}</span>
              .
            </p>
            <div className="space-y-2">
              <Label htmlFor="reset-password">New password</Label>
              <div className="relative">
                <Input
                  id="reset-password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                  className="pr-11"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((value) => !value)}
                  className="absolute inset-y-0 right-3 text-muted-foreground"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
              <ul className="space-y-1 text-xs text-muted-foreground">
                {["8 characters", "one uppercase letter", "one number"].map((label, index) => (
                  <li key={label} className={rules[index](password) ? "text-success" : ""}>
                    {rules[index](password) ? "✓" : "•"} {label}
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-2">
              <Label htmlFor="reset-confirm">Confirm new password</Label>
              <div className="relative">
                <Input
                  id="reset-confirm"
                  type={showConfirm ? "text" : "password"}
                  autoComplete="new-password"
                  value={confirm}
                  onChange={(event) => setConfirm(event.target.value)}
                  required
                  className="pr-11"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm((value) => !value)}
                  className="absolute inset-y-0 right-3 text-muted-foreground"
                  aria-label={showConfirm ? "Hide password" : "Show password"}
                >
                  {showConfirm ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
            </div>
            {error && (
              <p
                role="alert"
                aria-live="polite"
                className="rounded-xl border border-destructive/20 bg-destructive-bg px-3 py-2 text-sm text-destructive"
              >
                {error}
              </p>
            )}
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? "Updating…" : "Update password"}
            </Button>
          </form>
        )}
        <p className="mt-5 text-center text-sm text-muted-foreground">
          Remember your password?{" "}
          <Link href="/login" className="font-medium text-primary">
            Log in
          </Link>
        </p>
      </section>
      <ForgotPasswordDialog open={forgotOpen} onOpenChange={setForgotOpen} />
    </main>
  );
}
