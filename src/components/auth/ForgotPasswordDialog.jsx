"use client";

import { useState } from "react";
import { forgotPassword } from "@/lib/api/auth.api";
import { Button, Input, Label } from "@/components/ui";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ForgotPasswordDialog({ open, onOpenChange }) {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submit = async (event) => {
    event.preventDefault();
    if (!emailPattern.test(email.trim())) {
      setError("Enter a valid email address.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      await forgotPassword(email.trim());
      setSuccess(true);
    } catch (err) {
      setError(
        err.status === 429
          ? "Too many requests. Please wait a little and try again."
          : "We couldn’t send the reset link. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const close = (next) => {
    onOpenChange(next);
    if (!next) {
      setSuccess(false);
      setError("");
    }
  };
  return (
    <Dialog open={open} onOpenChange={close}>
      <DialogContent className="sm:max-w-md">
        {success ? (
          <>
            <DialogHeader>
              <DialogTitle>Check your inbox</DialogTitle>
              <DialogDescription>
                If an account exists for this email, we&apos;ve sent a reset link.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="flex-col-reverse sm:flex-row">
              <button
                type="button"
                onClick={() => {
                  setSuccess(false);
                  setError("");
                }}
                className="text-sm font-medium text-primary underline-offset-4 hover:underline"
              >
                Use a different email
              </button>
              <Button onClick={() => close(false)}>Close</Button>
            </DialogFooter>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Forgot password?</DialogTitle>
              <DialogDescription>
                Enter your account email and we&apos;ll send a reset link.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={submit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="forgot-email">Email</Label>
                <Input
                  id="forgot-email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  aria-invalid={!!error}
                  required
                />
              </div>
              {error && (
                <p
                  role="alert"
                  aria-live="polite"
                  className="rounded-lg border border-destructive/20 bg-destructive-bg px-3 py-2 text-sm text-destructive"
                >
                  {error}
                </p>
              )}
              <Button type="submit" disabled={loading} className="w-full">
                {loading ? "Sending…" : "Send reset link"}
              </Button>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
