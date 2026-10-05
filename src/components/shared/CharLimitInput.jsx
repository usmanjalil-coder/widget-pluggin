"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export default function CharLimitInput({ label, id, value = "", maxLength, multiline = false, rows, className, error, ...props }) {
  const count = value.length;
  const ratio = Math.min(100, (count / maxLength) * 100);
  const tone = count >= maxLength ? "text-destructive" : ratio >= 90 ? "text-warning-foreground" : "text-muted-foreground";
  const Field = multiline ? Textarea : Input;
  return (
    <div className={cn("space-y-2", className)}>
      {label && <Label htmlFor={id}>{label}</Label>}
      <Field id={id} value={value} maxLength={maxLength} rows={multiline ? rows : undefined} aria-invalid={Boolean(error)} aria-describedby={error ? `${id}-error` : undefined} {...props} />
      <div className="flex items-center gap-3">
        <div className="h-0.5 flex-1 overflow-hidden rounded-full bg-border" aria-hidden="true">
          <div className={cn("h-full transition-all", count >= maxLength ? "bg-destructive" : ratio >= 90 ? "bg-warning" : "bg-primary")} style={{ width: `${ratio}%` }} />
        </div>
        <span className={cn("min-w-12 text-right text-xs tabular-nums", tone)}>{count}/{maxLength}</span>
      </div>
      {error && <p id={`${id}-error`} className="text-xs text-destructive">{error}</p>}
    </div>
  );
}
