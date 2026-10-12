"use client";
import AppearancePanel from "../AppearancePanel";
import useBotEditor from "../useBotEditor";
import { useDashboard } from "../dashboard-context";
export default function AppearancePage() {
  const { selectedBotId, setBots } = useDashboard();
  const editor = useBotEditor({ selectedBotId, setBots });
  return <AppearancePanel {...editor} selectedBotId={selectedBotId} onRetry={editor.reload} />;
}
