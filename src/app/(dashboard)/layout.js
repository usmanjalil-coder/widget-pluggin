import { cookies } from "next/headers";
import { redirect } from "next/navigation";
export default async function DashboardLayout({ children }) {
  if (!(await cookies()).get("mock_session")) redirect("/login");
  return children;
}
