"use client";

import { useParams } from "next/navigation";
import BotDetailPage from "@/components/dashboard/pages/BotDetailPage";

export default function Page() {
  const { id } = useParams();
  return <BotDetailPage botId={id} />;
}
