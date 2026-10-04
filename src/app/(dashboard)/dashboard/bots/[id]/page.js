import DashboardApp from "@/components/dashboard/DashboardApp";
export default async function Page({ params }) {
  const { id } = await params;
  return <DashboardApp page="Appearance" botId={id} />;
}
