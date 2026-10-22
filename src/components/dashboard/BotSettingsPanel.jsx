"use client";

import { CircleHelp, Mail } from "lucide-react";
import { Badge, Button, Card, Input, Label, Skeleton, Switch } from "@/components/ui";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import AssistantRulesField from "@/components/shared/AssistantRulesField";

import BookingSettingsEditor from "./BookingSettingsEditor";

function toList(value) {
  if (Array.isArray(value)) return value;
  if (typeof value !== "string") return [];
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

export default function BotSettingsPanel({
  draft,
  bot,
  updateDraftField,
  savingSettings,
  saveSettings,
  settingsErrors = {},
}) {
  if (!draft) return <Skeleton className="h-72 w-full rounded-2xl" />;
  const notificationEmails = toList(draft.settings?.notificationEmails);
  const allowedDomains = toList(draft.settings?.allowedDomains);

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        saveSettings();
      }}
    >
      <fieldset disabled={savingSettings} className="min-w-0 space-y-6">
        <Card title="Notifications" subtitle="Email alerts for leads and status changes.">
          <div className="space-y-4">
            <Label className="space-y-2 text-sm text-foreground">
              <span>Notification emails</span>
              <Input
                value={notificationEmails.join(", ")}
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
              {notificationEmails.map((email) => (
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
          <AssistantRulesField
            value={draft.settings?.assistantRules || ""}
            onChange={(event) => updateDraftField("settings", "assistantRules", event.target.value)}
          />
        </Card>

        <Card title="Allowed domains" subtitle="Optional hosts for embed and CORS validation.">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Label htmlFor="allowed-domains">Domain hosts</Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      type="button"
                      aria-label="Allowed domains format"
                      className="rounded-full text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <CircleHelp className="size-4" aria-hidden="true" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent side="top" sideOffset={6} className="max-w-72">
                    Enter hostnames only, without http://, https://, paths or trailing slashes.
                    Separate multiple hosts with commas. Add each subdomain separately because
                    matching is exact.
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <Input
              id="allowed-domains"
              value={allowedDomains.join(", ")}
              placeholder="e.g. example.com, shop.example.com"
              autoCapitalize="none"
              autoCorrect="off"
              spellCheck={false}
              aria-describedby="allowed-domains-help"
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
            <p id="allowed-domains-help" className="text-xs text-muted-foreground">
              Visitors can use this bot only from the listed website hosts.
            </p>
          </div>
        </Card>
        <BookingSettingsEditor
          settings={draft.settings ?? {}}
          updateDraftField={updateDraftField}
        />
        {Object.keys(settingsErrors).length > 0 && (
          <div
            role="alert"
            className="space-y-1 rounded-lg border border-destructive/30 p-4 text-sm text-destructive"
          >
            {Object.entries(settingsErrors).map(([field, messages]) => (
              <p key={field}>{Array.isArray(messages) ? messages.join(" ") : messages}</p>
            ))}
          </div>
        )}
        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={
              savingSettings || JSON.stringify(draft.settings) === JSON.stringify(bot?.settings)
            }
          >
            {savingSettings ? "Saving…" : "Save settings"}
          </Button>
        </div>
      </fieldset>
    </form>
  );
}
