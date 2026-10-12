import BotDetailPage from "@/components/dashboard/pages/BotDetailPage";
export default async function Page({ params }) {
  const { id } = await params;
  return <BotDetailPage botId={id} />;
}
