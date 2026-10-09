"use client";
import { Button as PrimitiveButton } from "./button";
import { Card as PrimitiveCard, CardTitle, CardDescription } from "./card";
import { Badge as PrimitiveBadge } from "./badge";
import { Switch as PrimitiveSwitch } from "./switch";
import { NativeSelect } from "./native-select";
import { Inbox } from "lucide-react";
import { cn } from "@/lib/utils";
export { Input } from "./input";
export { Textarea } from "./textarea";
export { Label } from "./label";
export { Skeleton } from "./skeleton";
export function Button({ variant = "primary", ...props }) {
  return (
    <PrimitiveButton
      variant={variant === "primary" ? "default" : variant === "secondary" ? "outline" : variant}
      {...props}
    />
  );
}
export function Select({ className, ...props }) {
  return <NativeSelect className={cn("w-full bg-card", className)} {...props} />;
}
export function Card({ title, subtitle, children, className, ...props }) {
  return (
    <PrimitiveCard className={cn("block p-6", className)} {...props}>
      {(title || subtitle) && (
        <div className="mb-6 space-y-2">
          {title && <CardTitle className="text-base leading-6">{title}</CardTitle>}
          {subtitle && <CardDescription className="text-[13px]">{subtitle}</CardDescription>}
        </div>
      )}
      {children}
    </PrimitiveCard>
  );
}
const tones = {
  default: "bg-muted text-muted-foreground border-border",
  success: "bg-success-bg text-success-foreground border-success/20",
  warning: "bg-warning-bg text-warning-foreground border-warning/20",
  danger: "bg-destructive-bg text-destructive border-destructive/20",
  info: "bg-accent text-accent-foreground border-primary/20",
};
export function Badge({ tone = "default", className, ...props }) {
  return (
    <PrimitiveBadge
      variant="outline"
      className={cn("rounded-full px-2.5 py-1 text-xs", tones[tone] || tones.default, className)}
      {...props}
    />
  );
}
export function Switch({ checked, onChange, label, id, ...props }) {
  const control = (
    <PrimitiveSwitch
      id={id}
      checked={checked}
      onCheckedChange={onChange}
      aria-label={label}
      {...props}
    />
  );
  return label ? (
    <label className="flex items-center justify-between gap-3 text-sm">
      {label}
      {control}
    </label>
  ) : (
    control
  );
}
export function EmptyState({ title, body, action }) {
  return (
    <div className="rounded-xl border border-dashed bg-muted/40 p-8 text-center">
      <span className="mx-auto mb-4 flex size-12 items-center justify-center rounded-xl border bg-card text-muted-foreground">
        <Inbox className="size-5" />
      </span>
      <h3 className="text-base font-semibold">{title}</h3>
      {body && <p className="mx-auto mt-2 max-w-sm text-[13px] text-muted-foreground">{body}</p>}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
