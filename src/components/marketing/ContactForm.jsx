"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const initialValues = { name: "", email: "", message: "" };
const CONTACT_COOLDOWN_KEY = "contact:last-success-at";

function secondsUntilNextSubmission() {
  try {
    const sentAt = Number(window.localStorage.getItem(CONTACT_COOLDOWN_KEY));
    return sentAt ? Math.max(0, Math.ceil((sentAt + 60_000 - Date.now()) / 1000)) : 0;
  } catch {
    return 0;
  }
}

function rememberSubmission() {
  try {
    window.localStorage.setItem(CONTACT_COOLDOWN_KEY, String(Date.now()));
  } catch {
    // The backend still enforces the limit when browser storage is unavailable.
  }
}

function cooldownMessage(seconds) {
  return `You can send one contact message per minute. Please try again in ${seconds} second${seconds === 1 ? "" : "s"}.`;
}

export function ContactForm() {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [requestError, setRequestError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function update(field, value) {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    setRequestError("");
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (isSubmitting) return;

    const waitSeconds = secondsUntilNextSubmission();
    if (waitSeconds > 0) {
      setRequestError(cooldownMessage(waitSeconds));
      return;
    }

    setIsSubmitting(true);
    setErrors({});
    setRequestError("");

    try {
      const { submitContactMessage } = await import("@/lib/api/contact.api");
      await submitContactMessage({
        name: values.name.trim(),
        email: values.email.trim(),
        message: values.message.trim(),
      });
      rememberSubmission();
      setSubmitted(true);
    } catch (error) {
      setErrors(error.errors && typeof error.errors === "object" ? error.errors : {});
      const remainingSeconds = secondsUntilNextSubmission();
      setRequestError(
        error.status === 429
          ? error.message || "You can send one contact message per minute. Please wait before trying again."
          : remainingSeconds > 0
            ? cooldownMessage(remainingSeconds)
            : error.status === 422
              ? "Please correct the highlighted fields and try again."
              : "We couldn't send your message. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
      {submitted ? (
        <div className="space-y-2" role="status">
          <h2 className="text-xl font-semibold text-foreground">Thanks for reaching out</h2>
          <p className="text-sm text-muted-foreground">Your message was received. A member of the team will reply soon.</p>
        </div>
      ) : (
        <form method="post" onSubmit={handleSubmit} className="space-y-4">
          {requestError && (
            <p role="alert" className="rounded-lg border border-destructive/20 bg-destructive-bg p-3 text-sm text-destructive">
              {requestError}
            </p>
          )}
          <div className="grid gap-4 md:grid-cols-2">
            <Label className="block text-sm text-foreground">
              <span className="mb-1 block font-medium">Name <span aria-hidden="true">*</span></span>
              <Input name="name" autoComplete="name" type="text" required minLength={2} maxLength={100} value={values.name} onChange={(event) => update("name", event.target.value)} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "contact-name-error" : undefined} className="w-full rounded-xl border border-border bg-card px-3 py-2.5 text-foreground" placeholder="Your name" />
              {errors.name && <span id="contact-name-error" className="mt-1 block text-xs text-destructive">{errors.name[0]}</span>}
            </Label>
            <Label className="block text-sm text-foreground">
              <span className="mb-1 block font-medium">Email <span aria-hidden="true">*</span></span>
              <Input name="email" autoComplete="email" type="email" required maxLength={254} value={values.email} onChange={(event) => update("email", event.target.value)} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "contact-email-error" : undefined} className="w-full rounded-xl border border-border bg-card px-3 py-2.5 text-foreground" placeholder="Your email" />
              {errors.email && <span id="contact-email-error" className="mt-1 block text-xs text-destructive">{errors.email[0]}</span>}
            </Label>
          </div>
          <Label className="block text-sm text-foreground">
            <span className="mb-1 block font-medium">Message <span aria-hidden="true">*</span></span>
            <Textarea name="message" rows={4} required minLength={10} maxLength={5000} value={values.message} onChange={(event) => update("message", event.target.value)} aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? "contact-message-error" : undefined} className="w-full rounded-xl border border-border bg-card px-3 py-2.5 text-foreground" placeholder="Tell us about your website and goals" />
            {errors.message && <span id="contact-message-error" className="mt-1 block text-xs text-destructive">{errors.message[0]}</span>}
          </Label>
          <Button type="submit" disabled={isSubmitting} className="min-h-10 rounded-xl px-4 text-sm font-semibold">
            {isSubmitting ? "Sending…" : "Send message"}
          </Button>
        </form>
      )}
    </div>
  );
}
