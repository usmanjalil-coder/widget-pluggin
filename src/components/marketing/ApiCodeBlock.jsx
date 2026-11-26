"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui";

export function ApiCodeBlock({ code, label = "Code" }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      toast.success(`${label} copied.`);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      toast.error("Copy failed. Select the code block instead.");
    }
  };

  return (
    <div className="relative min-w-0">
      <pre className="overflow-x-auto rounded-xl border border-border bg-foreground p-4 pr-24 text-sm leading-relaxed text-background">
        <code>{code}</code>
      </pre>
      <Button
        type="button"
        variant="secondary"
        size="sm"
        className="absolute top-2.5 right-2.5 bg-card text-card-foreground dark:bg-card dark:hover:bg-accent"
        onClick={handleCopy}
      >
        {copied ? (
          <>
            <Check className="size-3.5" aria-hidden="true" />
            Copied
          </>
        ) : (
          <>
            <Copy className="size-3.5" aria-hidden="true" />
            Copy
          </>
        )}
      </Button>
    </div>
  );
}
