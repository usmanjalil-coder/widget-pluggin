import { Suspense } from "react";
import DashboardApp from "@/components/dashboard/DashboardApp";

export default function Layout({ children }) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <DashboardApp>{children}</DashboardApp>
    </Suspense>
  );
}
