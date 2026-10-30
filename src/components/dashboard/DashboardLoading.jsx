import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardLoading() {
  return (
    <div role="status" aria-label="Loading dashboard page" className="space-y-6">
      <span className="sr-only">Loading dashboard page…</span>
      <div aria-hidden="true" className="space-y-6">
        <div className="space-y-2">
          <Skeleton className="h-7 w-48 motion-reduce:animate-none" />
          <Skeleton className="h-5 w-64 max-w-full motion-reduce:animate-none" />
        </div>
        <Skeleton className="h-96 w-full rounded-xl motion-reduce:animate-none" />
      </div>
    </div>
  );
}
