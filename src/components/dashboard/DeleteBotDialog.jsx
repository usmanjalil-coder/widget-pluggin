import { Button } from "@/components/ui";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function DeleteBotDialog({ bot, deletingBot, onClose, onDelete }) {
  return (
    <Dialog
      open={Boolean(bot)}
      onOpenChange={(open) => {
        if (!open && !deletingBot) onClose();
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete {bot?.name}?</DialogTitle>
          <DialogDescription>
            This permanently removes the bot and its dashboard configuration.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            type="button"
            variant="secondary"
            disabled={deletingBot}
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="destructive"
            disabled={deletingBot}
            onClick={onDelete}
          >
            {deletingBot ? "Deleting…" : "Delete bot"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
