"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { getWidgetSnippet } from "@/lib/widget-script-url";

const snippet = getWidgetSnippet();

export default function InstallExample() {
  const code = useRef(null);
  const timer = useRef(null);
  const [status, setStatus] = useState("Copy");
  useEffect(() => () => clearTimeout(timer.current), []);

  async function copy() {
    let copied = false;
    try {
      await navigator.clipboard.writeText(snippet);
      copied = true;
    } catch {
      if (!code.current) return;
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(code.current);
      selection?.removeAllRanges();
      selection?.addRange(range);
      try {
        copied = document.execCommand("copy");
      } catch {
        // The snippet stays selected for manual copying.
      }
    }
    if (!code.current) return;
    setStatus(copied ? "Copied" : "Copy selected text");
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setStatus("Copy"), 2000);
  }

  return (
    <div className="rounded-xl border border-border bg-muted/30 p-3">
      <pre className="whitespace-pre-wrap break-all text-xs"><code ref={code}>{snippet}</code></pre>
      <Button size="sm" variant="outline" onClick={copy} className="mt-2 motion-reduce:transition-none">
        <span aria-live="polite">{status}</span>
      </Button>
    </div>
  );
}
