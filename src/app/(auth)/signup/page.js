"use client";

import ThemeToggle from "@/components/shared/ThemeToggle";
import PasswordInput from "@/components/shared/PasswordInput";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Check, LoaderCircle } from "lucide-react";
import { Button, Input, Label } from "@/components/ui";
import AuthShowcase from "@/components/auth/AuthShowcase";
import {
  register,
  verifyRegistration,
  resendRegistrationCode,
  establishAuthSession,
} from "@/lib/api/auth.api";

const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRules = [
  ["8 characters", (value) => value.length >= 8],
  ["one uppercase letter", (value) => /[A-Z]/.test(value)],
  ["one lowercase letter", (value) => /[a-z]/.test(value)],
  ["one number", (value) => /\d/.test(value)],
];

function validationMessages(errors) {
  if (!errors || typeof errors !== "object") return {};
  return Object.fromEntries(
    Object.entries(errors).map(([field, messages]) => [
      field,
      (Array.isArray(messages) ? messages : [messages]).filter(Boolean).map(String),
    ]),
  );
}

export default function SignupPage() {
  const inputRefs = useRef([]);
  const [plan, setPlan] = useState("free");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [resendIn, setResendIn] = useState(0);

  /* eslint-disable react-hooks/set-state-in-effect -- Sync the selected plan from the browser URL after hydration. */
  useEffect(() => {
    setPlan(new URLSearchParams(window.location.search).get("plan") || "free");
  }, []);

  useEffect(() => {
    if (step === 2) inputRefs.current[0]?.focus();
  }, [step]);

  useEffect(() => {
    if (!resendIn) return;
    const timer = setTimeout(() => setResendIn((current) => Math.max(0, current - 1)), 1000);
    return () => clearTimeout(timer);
  }, [resendIn]);

  const enterOtpStep = (seconds = 60) => {
    setStep(2);
    setOtp("");
    setError("");
    setResendIn(seconds);
  };
  const createAccount = async (event) => {
    event.preventDefault();
    setError("");
    setFieldErrors({});
    if (!validEmail.test(email.trim())) {
      setFieldErrors({ email: ["Enter a valid email address."] });
      return;
    }
    const missingRules = passwordRules
      .filter(([, check]) => !check(password))
      .map(([label]) => label);
    if (missingRules.length) {
      setFieldErrors({ password: [`Password must include ${missingRules.join(", ")}.`] });
      return;
    }
    if (password !== confirmPassword) {
      setFieldErrors({ password_confirmation: ["Passwords do not match."] });
      return;
    }
    setLoading(true);
    try {
      const result = await register({
        name,
        email: email.trim(),
        password,
        password_confirmation: confirmPassword,
        plan,
      });
      enterOtpStep(result.resend_available_in ?? 60);
    } catch (err) {
      const nextFieldErrors = validationMessages(err.errors);
      setFieldErrors(nextFieldErrors);
      if (err.status === 429) setError("Too many attempts. Please wait and try again.");
      else if (!Object.keys(nextFieldErrors).length)
        setError(err.message || "Unable to create your account.");
    } finally {
      setLoading(false);
    }
  };

  const finishVerify = async (code) => {
    if (loading || code.length !== 6) return;
    setLoading(true);
    setError("");
    let result;
    try {
      result = await verifyRegistration({ email: email.trim(), otp: code });
    } catch (err) {
      const detail = String(err.errors?.otp?.[0] || err.message || "");
      const lowerDetail = detail.toLowerCase();
      if (lowerDetail.includes("expired"))
        setError("This code has expired. Request a new code to continue.");
      else if (lowerDetail.includes("locked"))
        setError("Too many incorrect attempts. Your code is locked; request a new one.");
      else
        setError(
          detail && detail !== "Validation failed."
            ? detail
            : "That code doesn’t match. Please try again.",
        );
      setOtp("");
      inputRefs.current[0]?.focus();
      setLoading(false);
      return;
    }

    try {
      establishAuthSession(result);
      window.location.replace("/onboarding");
    } catch (err) {
      setError(
        err.message || "Your email was verified, but the session could not start. Please sign in.",
      );
      setLoading(false);
    }
  };

  const changeDigit = (index, raw) => {
    const digits = raw.replace(/\D/g, "");
    if (digits.length > 1) {
      const next = digits.slice(0, 6);
      setOtp(next);
      inputRefs.current[Math.min(next.length, 5)]?.focus();
      if (next.length === 6) finishVerify(next);
      return;
    }
    const next = `${otp.slice(0, index)}${digits}${otp.slice(index + 1)}`.slice(0, 6);
    setOtp(next);
    setError("");
    if (digits && index < 5) inputRefs.current[index + 1]?.focus();
    if (next.length === 6) finishVerify(next);
  };

  const resend = async () => {
    setLoading(true);
    setError("");
    try {
      const result = await resendRegistrationCode({ email: email.trim() });
      setResendIn(result.resend_available_in ?? 60);
      setOtp("");
      inputRefs.current[0]?.focus();
    } catch (err) {
      if (err.status === 429) {
        const retry = Number(err.retryAfter) || 60;
        setResendIn(retry);
        setError(`Please wait ${retry} seconds before requesting another code.`);
      } else setError(err.message || "Unable to resend the code.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-muted">
      <div className="mx-auto grid min-h-screen max-w-6xl items-center gap-8 px-4 py-8 lg:grid-cols-[0.9fr_1.1fr]">
        <AuthShowcase
          title="Start with your content. Make it yours."
          description="Set up an assistant that answers questions and fits your site."
          items={[
            "Train on your own content",
            "Customize the look and voice",
            "Track leads and requests",
          ]}
        />
        <section
          className="order-1 mx-auto w-full max-w-md rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8"
          aria-labelledby="signup-title"
        >
          <header className="mb-6 flex items-start justify-between gap-3">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Start free</p>
              <h1 id="signup-title" className="text-2xl font-semibold">
                {step === 1 ? "Create account" : "Verify your email"}
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <Link href="/" className="text-sm font-medium text-primary">
                Back to home
              </Link>
            </div>
          </header>
          <div className="mb-5 flex items-center gap-3" aria-label={`Step ${step} of 2`}>
            {["Account", "Verify email"].map((label, index) => (
              <div key={label} className="flex flex-1 items-center gap-2">
                <span
                  className={`flex size-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${step > index ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
                >
                  {step > index + 1 ? <Check className="size-4" /> : index + 1}
                </span>
                <span
                  className={`text-xs sm:text-sm ${step === index + 1 ? "font-medium text-foreground" : "text-muted-foreground"}`}
                >
                  {label}
                </span>
                {index === 0 && <span className="h-px flex-1 bg-border" />}
              </div>
            ))}
          </div>
          <div className="mb-5 rounded-2xl border border-primary/20 bg-accent px-3 py-2 text-sm text-accent-foreground">
            Selected plan: <span className="font-semibold capitalize">{plan}</span>
          </div>
          {step === 1 ? (
            <form onSubmit={createAccount} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="register-name">Name</Label>
                <Input
                  id="register-name"
                  autoComplete="name"
                  value={name}
                  onChange={(event) => {
                    setName(event.target.value);
                    setFieldErrors((current) => ({ ...current, name: undefined }));
                  }}
                  placeholder="Your name"
                  aria-invalid={!!fieldErrors.name?.length}
                  aria-describedby={fieldErrors.name?.length ? "register-name-error" : undefined}
                  required
                />
                {fieldErrors.name?.length > 0 && (
                  <p id="register-name-error" role="alert" className="text-sm text-destructive">
                    {fieldErrors.name.join(" ")}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="register-email">Work email</Label>
                <Input
                  id="register-email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                    setFieldErrors((current) => ({ ...current, email: undefined }));
                  }}
                  placeholder="hello@company.com"
                  aria-invalid={!!fieldErrors.email?.length}
                  aria-describedby={fieldErrors.email?.length ? "register-email-error" : undefined}
                  required
                />
                {fieldErrors.email?.length > 0 && (
                  <p id="register-email-error" role="alert" className="text-sm text-destructive">
                    {fieldErrors.email.join(" ")}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="register-password">Password</Label>
                <PasswordInput
                  id="register-password"
                  type="password"
                  autoComplete="new-password"
                  value={password}
                  onChange={(event) => {
                    setPassword(event.target.value);
                    setFieldErrors((current) => ({ ...current, password: undefined }));
                  }}
                  placeholder="Create a password"
                  aria-invalid={!!fieldErrors.password?.length}
                  aria-describedby={
                    fieldErrors.password?.length ? "register-password-error" : undefined
                  }
                  required
                />
                <ul className="space-y-1 text-xs text-muted-foreground">
                  {passwordRules.map(([label, check]) => (
                    <li key={label} className={check(password) ? "text-success" : ""}>
                      {check(password) ? "✓" : "•"} {label}
                    </li>
                  ))}
                </ul>
                {fieldErrors.password?.length > 0 && (
                  <p id="register-password-error" role="alert" className="text-sm text-destructive">
                    {fieldErrors.password.join(" ")}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="register-confirm">Confirm password</Label>
                <PasswordInput
                  id="register-confirm"
                  type="password"
                  autoComplete="new-password"
                  value={confirmPassword}
                  onChange={(event) => {
                    setConfirmPassword(event.target.value);
                    setFieldErrors((current) => ({
                      ...current,
                      password_confirmation: undefined,
                      password: undefined,
                    }));
                  }}
                  placeholder="Re-enter your password"
                  aria-invalid={!!fieldErrors.password_confirmation?.length}
                  aria-describedby={
                    fieldErrors.password_confirmation?.length ? "register-confirm-error" : undefined
                  }
                  required
                />
                {fieldErrors.password_confirmation?.length > 0 && (
                  <p id="register-confirm-error" role="alert" className="text-sm text-destructive">
                    {fieldErrors.password_confirmation.join(" ")}
                  </p>
                )}
              </div>
              {Object.entries(fieldErrors)
                .filter(
                  ([field, messages]) =>
                    !["name", "email", "password", "password_confirmation"].includes(field) &&
                    messages?.length,
                )
                .map(([field, messages]) => (
                  <p key={field} role="alert" className="text-sm text-destructive">
                    {messages.join(" ")}
                  </p>
                ))}
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
                {loading ? "Creating…" : "Create account"}
              </Button>
            </form>
          ) : (
            <div
              className="space-y-5"
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  finishVerify(otp);
                }
              }}
            >
              <p className="text-sm text-muted-foreground">
                We sent a 6-digit code to{" "}
                <span className="font-medium text-foreground">{email}</span>
              </p>
              <div
                className="flex justify-between gap-2"
                role="group"
                aria-label="6-digit verification code"
              >
                {Array.from({ length: 6 }, (_, index) => (
                  <Input
                    key={index}
                    ref={(node) => {
                      inputRefs.current[index] = node;
                    }}
                    aria-label={`Verification code digit ${index + 1}`}
                    autoComplete={index === 0 ? "one-time-code" : "off"}
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={1}
                    value={otp[index] || ""}
                    onChange={(event) => changeDigit(index, event.target.value)}
                    onPaste={(event) => {
                      event.preventDefault();
                      changeDigit(index, event.clipboardData.getData("text"));
                    }}
                    onKeyDown={(event) => {
                      if (event.key === "Backspace" && !otp[index] && index > 0)
                        inputRefs.current[index - 1]?.focus();
                    }}
                    className="h-12 w-11 px-0 text-center text-lg font-semibold sm:w-12"
                  />
                ))}
              </div>
              {loading && (
                <p className="flex items-center gap-2 text-sm text-muted-foreground" role="status">
                  <LoaderCircle className="size-4 animate-spin" /> Verifying code…
                </p>
              )}
              {error && (
                <p
                  role="alert"
                  aria-live="polite"
                  className="rounded-xl border border-destructive/20 bg-destructive-bg px-3 py-2 text-sm text-destructive"
                >
                  {error}
                </p>
              )}
              <div className="flex items-center justify-between text-sm">
                <button
                  type="button"
                  onClick={resend}
                  disabled={loading || resendIn > 0}
                  className="font-medium text-primary disabled:cursor-not-allowed disabled:text-muted-foreground"
                >
                  {resendIn ? `Resend code in ${resendIn}s` : "Resend code"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setStep(1);
                    setPassword("");
                    setConfirmPassword("");
                    setOtp("");
                    setError("");
                  }}
                  className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground"
                >
                  <ArrowLeft className="size-3.5" /> Change email
                </button>
              </div>
            </div>
          )}
          <p className="mt-5 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              href={`/login?plan=${encodeURIComponent(plan)}`}
              className="font-medium text-primary"
            >
              Log in
            </Link>
          </p>
        </section>
      </div>
    </main>
  );
}
