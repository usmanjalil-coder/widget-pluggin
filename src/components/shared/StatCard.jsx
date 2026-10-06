import { Card } from "@/components/ui";

export default function StatCard({ label, value, icon: Icon, description }) {
  return (
    <Card className="gap-0 p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="mt-2 text-2xl font-semibold tabular-nums text-foreground">{value}</p>
        </div>
        {Icon && <span className="grid size-10 place-items-center rounded-lg bg-accent text-primary"><Icon className="size-5" /></span>}
      </div>
      {description && <p className="mt-3 text-xs text-muted-foreground">{description}</p>}
    </Card>
  );
}
