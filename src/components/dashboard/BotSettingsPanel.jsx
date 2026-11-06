"use client";

import { useState } from "react";
import { CircleHelp, Mail } from "lucide-react";
import { Badge, Button, Card, Input, Label, Skeleton, Switch } from "@/components/ui";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import AssistantRulesField from "@/components/shared/AssistantRulesField";
import BotPurposeField, { botPurpose } from "@/components/shared/BotPurposeField";

import { domainHelp } from "./domain-help";
import BotSaveBar from "./BotSaveBar";
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
  resetSettings,
  settingsDirty,
  onDelete,
  updateDraftField,
  savingSettings,
  saveSettings,
  settingsErrors = {},
}) {
  const [domainText, setDomainText] = useState(null);
  if (!draft) return <Skeleton className="h-72 w-full rounded-2xl" />;
  const notificationEmails = toList(draft.settings?.notificationEmails);
  const allowedDomains = toList(draft.settings?.allowedDomains);

  return (
    <form className="space-y-6 pb-20"
      onSubmit={(event) => {
        event.preventDefault();
        saveSettings();
      }}
    >
      <fieldset disabled={savingSettings} className="min-w-0 space-y-6">
        <Card title="Bot purpose & lead capture" subtitle="Choose how this assistant helps your visitors.">
          <div className="space-y-4">
            <BotPurposeField
              value={botPurpose(draft)}
              onChange={(value) => {
                updateDraftField("settings", "purpose", value);
                updateDraftField("features", "leadCapture", value !== "support");
              }}
            />
            <Switch
              label="Enable lead capture"
              checked={Boolean(draft.features?.leadCapture)}
              onChange={(enabled) => {
                updateDraftField("features", "leadCapture", enabled);
                updateDraftField("settings", "purpose", enabled
                  ? (draft.settings?.purpose === "leads" ? "leads" : "both") : "support");
              }}
            />
            <p className="text-xs text-muted-foreground">
              When disabled, this bot provides support without offering lead forms. Existing leads
              stay available in Leads. Conversations remain available for every purpose.
            </p>
          </div>
        </Card>
        <Card title="Conversation limits">
          <Switch
            label="Allow visitors to start a new chat after reaching the message limit"
            checked={draft.features?.allowRestartAfterLimit !== false}
            onChange={(enabled) => updateDraftField("features", "allowRestartAfterLimit", enabled)}
          />
        </Card>
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

        <Card title="Allowed domains">
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
              value={domainText ?? allowedDomains.join(", ")}
              onBlur={() => setDomainText(null)}
              placeholder="e.g. example.com, shop.example.com"
              autoCapitalize="none"
              autoCorrect="off"
              spellCheck={false}
              aria-describedby="allowed-domains-help"
              onChange={(event) => {
                setDomainText(event.target.value);
                updateDraftField("settings", "allowedDomains", toList(event.target.value));
              }}
            />
            <p id="allowed-domains-help" className="text-xs text-muted-foreground">
              {domainHelp}
            </p>
          </div>
        </Card>
        {draft.features?.leadCapture && (
          <BookingSettingsEditor
            settings={draft.settings ?? {}}
            updateDraftField={updateDraftField}
          />
        )}
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
        <Card title="Danger zone">
          <Button type="button" variant="destructive" onClick={onDelete}>Delete bot</Button>
        </Card>
      </fieldset>
      <BotSaveBar dirty={settingsDirty} saving={savingSettings} onDiscard={resetSettings} />
    </form>
  );
}
