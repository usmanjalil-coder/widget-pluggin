"use client";

import { useState } from "react";
import { toast as notify } from "sonner";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import CharLimitInput from "@/components/shared/CharLimitInput";
import BotPurposeField from "@/components/shared/BotPurposeField";
import { TEXT_LIMITS } from "@/lib/limits";
import { createBot, getBots } from "@/lib/api/bots.api";

export default function CreateBotDialog({ createDialogOpen, setCreateDialogOpen, onCreated }) {
  const router = useRouter();
  const [newBotName, setNewBotName] = useState("");
  const [purpose, setPurpose] = useState("support");
  const [createError, setCreateError] = useState("");
  const [creatingBot, setCreatingBot] = useState(false);
  const handleBotCreate = async (event) => {
    event.preventDefault();
    if (!newBotName.trim()) {
      setCreateError("Enter a bot name.");
      return;
    }
    setCreateError("");
    setCreatingBot(true);

    try {
      const created = await createBot({ name: newBotName.trim(), purpose });
      const nextBots = await getBots();
      onCreated(created, nextBots);
      setNewBotName("");
      setPurpose("support");
      setCreateDialogOpen(false);
      notify.success("Bot created.");
      router.push(`/dashboard/bots/${encodeURIComponent(created.public_id ?? created.id)}?tab=appearance`);
    } catch (error) {
      setCreateError(error.message || "Could not create a bot right now.");
    } finally {
      setCreatingBot(false);
    }
  };

  return (
    <Dialog
      open={createDialogOpen}
      onOpenChange={(open) => {
        if (creatingBot) return;
        setCreateDialogOpen(open);
        if (!open) setCreateError("");
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create bot</DialogTitle>
          <DialogDescription>
            Give your chatbot a name. You can customize it after creating it.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleBotCreate} className="space-y-5">
          <CharLimitInput
            id="new-bot-name"
            label="Bot name"
            maxLength={TEXT_LIMITS.botName}
            value={newBotName}
            onChange={(event) => {
              setNewBotName(event.target.value);
              if (createError) setCreateError("");
            }}
            placeholder="e.g. Customer support"
            error={createError}
            autoFocus
            disabled={creatingBot}
          />
          <BotPurposeField value={purpose} onChange={setPurpose} disabled={creatingBot} />
          <DialogFooter>
            <Button
              type="button"
              variant="secondary"
              disabled={creatingBot}
              onClick={() => setCreateDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={creatingBot}>
              {creatingBot ? "Creating…" : "Create bot"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
