import AuthenticatedRoute from "@/components/auth/AuthenticatedRoute";

export default function DashboardLayout({ children }) {
  return <AuthenticatedRoute>{children}</AuthenticatedRoute>;
}
