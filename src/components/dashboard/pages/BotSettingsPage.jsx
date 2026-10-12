"use client";
import BotSettingsPanel from "../BotSettingsPanel";
import { Button, Card } from "@/components/ui";
import useBotEditor from "../useBotEditor";
import { useDashboard } from "../dashboard-context";
export default function BotSettingsPage() {
  const { selectedBotId, setBots } = useDashboard();
  const editor = useBotEditor({ selectedBotId, setBots });
  if (editor.detailError)
    return (
      <Card>
        <p role="alert" className="text-sm text-destructive">
          {editor.detailError}
        </p>
        <Button onClick={editor.reload} className="mt-4">
          Retry
        </Button>
      </Card>
    );
  return <BotSettingsPanel {...editor} />;
}
