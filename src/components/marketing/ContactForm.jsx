"use client";

import { useCallback, useState } from "react";
import { Button, Input, Label, Textarea } from "@/components/ui";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = useCallback((event) => {
    event.preventDefault();
    setSubmitted(true);
  }, []);

  return (
    <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
      {submitted ? (
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-foreground">Thanks for reaching out</h3>
          <p className="text-sm text-muted-foreground">A member of the team will reply to your message soon.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Label className="block text-sm text-foreground"><span className="mb-1 block font-medium">Name</span><Input type="text" className="w-full rounded-xl border border-border bg-card px-3 py-2.5 text-foreground" placeholder="Your name" /></Label>
            <Label className="block text-sm text-foreground"><span className="mb-1 block font-medium">Email</span><Input type="email" className="w-full rounded-xl border border-border bg-card px-3 py-2.5 text-foreground" placeholder="Your email" /></Label>
          </div>
          <Label className="block text-sm text-foreground"><span className="mb-1 block font-medium">Message</span><Textarea rows={4} className="w-full rounded-xl border border-border bg-card px-3 py-2.5 text-foreground" placeholder="Tell us about your website and goals" /></Label>
          <Button variant="ghost" type="submit" className="rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90">Send message</Button>
        </form>
      )}
    </div>
  );
}
