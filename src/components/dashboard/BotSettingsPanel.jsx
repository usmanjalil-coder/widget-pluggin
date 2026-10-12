"use client";

import { Clock3, GripVertical, Mail } from "lucide-react";
import { Badge, Button, Card, Input, Label, Skeleton, Switch, Textarea } from "@/components/ui";

export default function BotSettingsPanel({
  draft,
  bot,
  updateDraftField,
  savingSettings,
  saveSettings,
}) {
  if (!draft) return <Skeleton className="h-72 w-full rounded-2xl" />;

  return (
    <div className="space-y-6">
      <Card title="Notifications" subtitle="Email alerts for leads and status changes.">
        <div className="space-y-4">
          <Label className="space-y-2 text-sm text-foreground">
            <span>Notification emails</span>
            <Input
              value={(draft.settings?.notificationEmails || []).join(", ")}
              onChange={(event) =>
                updateDraftField(
                  "settings",
                  "notificationEmails",
                  event.target.value
                    .split(",")
                    .map((item) => item.trim())
                    .filter(Boolean),
                )
              }
            />
          </Label>
          <div className="flex flex-wrap gap-2">
            {(draft.settings?.notificationEmails || []).map((email) => (
              <Badge key={email} tone="info">
                <Mail className="mr-1 size-3" />
                {email}
              </Badge>
            ))}
          </div>
          <Switch
            checked={Boolean(draft.settings?.sendConfirmationEmail)}
            label="Send confirmation email to visitors"
            onChange={(value) => updateDraftField("settings", "sendConfirmationEmail", value)}
          />
        </div>
      </Card>

      <Card title="Assistant rules" subtitle="Keep the bot aligned with your workflow.">
        <Textarea
          rows={5}
          value={draft.settings?.assistantRules || ""}
          onChange={(event) => updateDraftField("settings", "assistantRules", event.target.value)}
        />
      </Card>

      <Card title="Allowed domains" subtitle="Optional hosts for embed and CORS validation.">
        <Input
          value={(draft.settings?.allowedDomains || []).join(", ")}
          onChange={(event) =>
            updateDraftField(
              "settings",
              "allowedDomains",
              event.target.value
                .split(",")
                .map((item) => item.trim())
                .filter(Boolean),
            )
          }
        />
      </Card>
      <Card
        title="Booking form fields"
        subtitle="Fields visitors see when requesting an appointment"
      >
        <div className="space-y-2">
          {(draft.settings?.bookingFields || []).map((field) => (
            <div
              key={field.id}
              className="flex items-center gap-3 rounded-lg border border-border p-3 text-sm"
            >
              <GripVertical className="size-4 text-muted-foreground" />
              <span className="min-w-0 flex-1 truncate text-foreground">{field.label}</span>
              <Badge tone="default">{field.type}</Badge>
              {field.required && <Badge tone="info">Required</Badge>}
            </div>
          ))}
        </div>
      </Card>
      <Card title="Working hours" subtitle="Availability shown on the booking form">
        <div className="grid gap-2 sm:grid-cols-2">
          {Object.entries(draft.settings?.workingHours || {}).map(([day, hours]) => (
            <div
              key={day}
              className="flex items-center justify-between gap-3 rounded-lg border border-border p-3 text-sm"
            >
              <span className="flex items-center gap-2 capitalize text-foreground">
                <Clock3 className="size-4 text-muted-foreground" />
                {day}
              </span>
              <span className="text-muted-foreground">
                {hours.closed ? "Closed" : `${hours.open}–${hours.close}`}
              </span>
            </div>
          ))}
        </div>
      </Card>
      <div className="flex justify-end">
        <Button
          type="button"
          disabled={
            savingSettings || JSON.stringify(draft.settings) === JSON.stringify(bot?.settings)
          }
          onClick={saveSettings}
        >
          {savingSettings ? "Saving…" : "Save settings"}
        </Button>
      </div>
    </div>
  );
}
