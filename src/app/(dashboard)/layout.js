import AuthenticatedRoute from "@/components/auth/AuthenticatedRoute";
import DesignProviders from "@/components/DesignProviders";

export const metadata = { robots: { index: false, follow: false } };

export default function DashboardLayout({ children }) {
  return <DesignProviders><AuthenticatedRoute>{children}</AuthenticatedRoute></DesignProviders>;
}
