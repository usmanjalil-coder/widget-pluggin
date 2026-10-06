import { Badge } from "@/components/ui";

export default function StatusBadge({ status }) {
  const active = status === "active" || status === "ready";
  return (
    <Badge tone={active ? "success" : "default"} className="gap-1.5 capitalize">
      <span
        className={`size-1.5 rounded-full ${active ? "bg-success" : "bg-muted-foreground"}`}
        aria-hidden="true"
      />
      {status || "draft"}
    </Badge>
  );
}
