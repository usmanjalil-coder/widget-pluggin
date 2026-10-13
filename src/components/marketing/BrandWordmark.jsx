import { brand } from "@/lib/brand";

export function BrandWordmark({ className = "" }) {
  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-background text-foreground">
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 text-primary">
          <path fill="currentColor" d="M12 2 3 7l9 5 9-5-9-5Zm-8 8 8 4 8-4v7l-8 4-8-4v-7Z" />
        </svg>
      </span>
      <span className="text-lg font-semibold text-foreground">{brand.name}</span>
    </div>
  );
}
