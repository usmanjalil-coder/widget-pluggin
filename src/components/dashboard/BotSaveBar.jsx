import { Button } from "@/components/ui";

export default function BotSaveBar({ dirty, saving, onDiscard, onSave, invalid }) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 flex items-center justify-between gap-2 border-t border-border bg-card p-3 shadow-sm lg:left-64">
      <span role="status" className="text-sm text-muted-foreground">
        {dirty ? "Unsaved changes" : "All changes saved"}
      </span>
      <div className="flex gap-2">
        <Button type="button" variant="outline" disabled={!dirty || saving} onClick={onDiscard}>
          Discard
        </Button>
        <Button type={onSave ? "button" : "submit"} onClick={onSave}
          disabled={!dirty || saving || invalid}>
          {saving ? "Saving…" : "Save"}
        </Button>
      </div>
    </div>
  );
}
