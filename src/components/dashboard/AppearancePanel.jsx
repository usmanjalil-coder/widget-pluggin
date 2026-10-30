"use client";

import { brandColors } from "@/config/brand";

import { useEffect, useRef } from "react";
import { ArrowDown, ArrowUp, Check } from "lucide-react";
import { RequiredIndicator } from "@/components/ui/label";
import { Button, Card, Input, Label, Skeleton, Switch } from "@/components/ui";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import CharLimitInput from "@/components/shared/CharLimitInput";
import AppearancePreview from "@/components/dashboard/AppearancePreview";
import LogoPicker from "@/components/dashboard/LogoPicker";
import AssistantRulesField from "@/components/shared/AssistantRulesField";
import { HEX_COLOR, TEXT_LIMITS } from "@/lib/limits";
import { DEFAULT_CONFIG } from "../../../widget/src/config.js";

const presetColors = [
  ["Blue", "#2563eb"],
  ["Slate", "#0f172a"],
  ["Cyan", "#0891b2"],
  ["Green", "#10b981"],
  ["Amber", "#f59e0b"],
  ["Red", "#ef4444"],
  ["Violet", "#7c3aed"],
  ["Pink", "#ec4899"],
];

function onColor(hex) {
  if (!HEX_COLOR.test(hex)) return "#ffffff";
  const full = hex.length === 4 ? `#${[1, 2, 3].map((i) => hex[i] + hex[i]).join("")}` : hex;
  const rgb = [1, 3, 5]
    .map((i) => parseInt(full.slice(i, i + 2), 16) / 255)
    .map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
  return rgb[0] * 0.2126 + rgb[1] * 0.7152 + rgb[2] * 0.0722 > 0.179 ? "#18181b" : "#ffffff";
}
const pickerColor = (hex) =>
  HEX_COLOR.test(hex || "")
    ? hex.length === 4
      ? `#${[1, 2, 3].map((i) => hex[i] + hex[i]).join("")}`
      : hex
    : brandColors.lightPrimary;

export default function AppearancePanel({
  detailError,
  draft,
  loading,
  onRetry,
  updateDraftField,
  setDraft,
  selectedBotId,
  dirty,
  savingAppearance,
  resetAppearance,
  saveAppearance,
  logoFile,
  setLogoFile,
  appearanceErrors = {},
}) {
  const errorSummaryRef = useRef(null);

  useEffect(() => {
    if (Object.keys(appearanceErrors).length === 0) return;
    errorSummaryRef.current?.focus({ preventScroll: true });
    errorSummaryRef.current?.scrollIntoView({ block: "start" });
  }, [appearanceErrors]);

  if (detailError && !draft && !loading) {
    return (
      <Card>
        <p className="text-sm text-destructive">{detailError}</p>
        <Button className="mt-4" onClick={onRetry}>
          Retry
        </Button>
      </Card>
    );
  }
  if (!draft || loading) {
    return (
      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <Skeleton className="h-96 w-full rounded-2xl" />
        <Skeleton className="h-96 w-full rounded-2xl" />
      </div>
    );
  }

  return (
    <div className="grid items-start gap-6 pb-20 lg:grid-cols-[minmax(0,1.1fr)_minmax(360px,0.9fr)]">
      {Object.keys(appearanceErrors).length > 0 && (
        <div
          ref={errorSummaryRef}
          role="alert"
          tabIndex={-1}
          aria-labelledby="appearance-errors-title"
          className="scroll-mt-24 space-y-2 rounded-lg border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive focus-visible:outline-2 focus-visible:outline-destructive lg:col-span-2"
        >
          <p id="appearance-errors-title" className="font-medium">
            Please correct the following errors and save again.
          </p>
          <ul className="list-disc space-y-1 pl-5">
            {Object.entries(appearanceErrors).map(([field, messages]) => (
              <li key={field}>{Array.isArray(messages) ? messages.join(" ") : messages}</li>
            ))}
          </ul>
        </div>
      )}
      <fieldset disabled={savingAppearance} className="flex min-w-0 flex-col gap-6">
        <Card title="Branding" subtitle="Your public widget identity." className="order-1">
          <div className="grid gap-4 md:grid-cols-2">
            <CharLimitInput
              id="appearance-bot-name"
              label="Bot name"
              required
              maxLength={TEXT_LIMITS.botName}
              value={draft.texts.botName || ""}
              onChange={(event) => updateDraftField("texts", "botName", event.target.value)}
            />
            <CharLimitInput
              id="appearance-launcher-label"
              label="Launcher label"
              maxLength={TEXT_LIMITS.launcherLabel}
              value={draft.texts.launcherLabel || ""}
              onChange={(event) => updateDraftField("texts", "launcherLabel", event.target.value)}
            />
            <LogoPicker
              key={selectedBotId}
              value={draft.texts.avatarUrl || ""}
              file={logoFile}
              onFileChange={setLogoFile}
              onUrlChange={(value) => updateDraftField("texts", "avatarUrl", value)}
            />
          </div>
        </Card>

        <Card
          title="Assistant rules"
          subtitle="Tell your assistant how to respond. You can also edit these same rules in Settings."
          className="order-5"
        >
          <AssistantRulesField
            id="appearance-assistant-rules"
            value={draft.settings?.assistantRules}
            onChange={(event) => updateDraftField("settings", "assistantRules", event.target.value)}
          />
        </Card>

        <Card title="Colors" subtitle="Review text contrast before saving." className="order-2">
          <TooltipProvider>
            <div className="flex flex-wrap gap-2">
              {presetColors.map(([name, color]) => (
                <Tooltip key={color}>
                  <TooltipTrigger asChild>
                    <button
                      key={color}
                      type="button"
                      title={`${name} ${color}`}
                      aria-label={`${name} ${color}`}
                      aria-pressed={draft.theme.primaryColor?.toLowerCase() === color}
                      onClick={() => updateDraftField("theme", "primaryColor", color)}
                      className={`grid size-9 place-items-center rounded-full border-2 border-card shadow-sm outline-offset-2 ${draft.theme.primaryColor?.toLowerCase() === color ? "ring-2 ring-foreground" : "ring-1 ring-border"}`}
                      style={{ backgroundColor: color, color: onColor(color) }}
                    >
                      {draft.theme.primaryColor?.toLowerCase() === color && (
                        <Check className="size-4" />
                      )}
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    {name} · {color}
                  </TooltipContent>
                </Tooltip>
              ))}
              {!presetColors.some(
                ([, color]) => color === draft.theme.primaryColor?.toLowerCase(),
              ) &&
                HEX_COLOR.test(draft.theme.primaryColor || "") && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        type="button"
                        aria-label={`Custom ${draft.theme.primaryColor}`}
                        aria-pressed="true"
                        className="grid size-9 place-items-center rounded-full border-2 border-card ring-2 ring-foreground"
                        style={{
                          backgroundColor: draft.theme.primaryColor,
                          color: onColor(draft.theme.primaryColor),
                        }}
                      >
                        <Check className="size-4" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>Custom · {draft.theme.primaryColor}</TooltipContent>
                  </Tooltip>
                )}
            </div>
          </TooltipProvider>
          <div className="mt-4 grid gap-4 md:grid-cols-[1fr_auto]">
            <Label className="space-y-2 text-sm text-foreground">
              <span>Primary color<RequiredIndicator /></span>
              <span className="flex items-center gap-2">
                <span
                  className="size-9 shrink-0 rounded-lg border border-border"
                  aria-hidden="true"
                  style={{ backgroundColor: pickerColor(draft.theme.primaryColor) }}
                />
                <Input
                  required
                  value={draft.theme.primaryColor || brandColors.lightPrimary}
                  aria-invalid={!HEX_COLOR.test(draft.theme.primaryColor || "")}
                  onChange={(event) =>
                    updateDraftField("theme", "primaryColor", event.target.value)
                  }
                />
              </span>
              {!HEX_COLOR.test(draft.theme.primaryColor || "") && (
                <span className="text-xs text-destructive">Use #RGB or #RRGGBB.</span>
              )}
            </Label>
            <Label className="space-y-2 text-sm text-foreground">
              <span>Picker</span>
              <Input
                type="color"
                value={pickerColor(draft.theme.primaryColor)}
                onChange={(event) => updateDraftField("theme", "primaryColor", event.target.value)}
                className="h-11 min-w-16 cursor-pointer p-1"
              />
            </Label>
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            Text on this color will be{" "}
            {onColor(draft.theme.primaryColor) === "#18181b" ? "dark" : "light"}.
          </p>
          <div className="mt-4 flex items-center justify-between">
            <span className="text-sm text-foreground">Light / dark mode<RequiredIndicator /></span>
            <div className="inline-flex rounded-xl border border-border bg-background p-1">
              {["light", "dark"].map((mode) => (
                <Button
                  variant="ghost"
                  key={mode}
                  type="button"
                  onClick={() => updateDraftField("theme", "mode", mode)}
                  className={`rounded-lg px-3 py-1 text-sm ${draft.theme.mode === mode ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"}`}
                >
                  {mode}
                </Button>
              ))}
            </div>
          </div>
        </Card>

        <Card title="Messages" subtitle="Text the bot sends to customers." className="order-4">
          <div className="space-y-4">
            <CharLimitInput
              id="appearance-greeting"
              label="Greeting message"
              required
              maxLength={TEXT_LIMITS.greetingMessage}
              multiline
              rows={4}
              value={draft.texts.greetingMessage || ""}
              onChange={(event) => updateDraftField("texts", "greetingMessage", event.target.value)}
            />
            <CharLimitInput
              id="appearance-placeholder"
              label="Input placeholder"
              required
              maxLength={TEXT_LIMITS.inputPlaceholder}
              value={draft.texts.inputPlaceholder || ""}
              onChange={(event) =>
                updateDraftField("texts", "inputPlaceholder", event.target.value)
              }
            />
            <CharLimitInput
              id="appearance-offline"
              label="Offline message"
              maxLength={TEXT_LIMITS.offlineMessage}
              multiline
              value={draft.texts.offlineMessage || ""}
              rows={3}
              onChange={(event) => updateDraftField("texts", "offlineMessage", event.target.value)}
            />
            <div className="space-y-3">
              <Label>
                Starter questions ({(draft.texts.starterQuestions || []).length}/
                {TEXT_LIMITS.starterQuestions})
              </Label>
              {(draft.texts.starterQuestions || []).map((question, index) => (
                <div key={index} className="flex items-start gap-2">
                  <CharLimitInput
                    id={`starter-${index}`}
                    label={`Question ${index + 1}`}
                    maxLength={TEXT_LIMITS.starterQuestion}
                    value={question}
                    className="min-w-0 flex-1"
                    onChange={(event) =>
                      updateDraftField(
                        "texts",
                        "starterQuestions",
                        draft.texts.starterQuestions.map((item, i) =>
                          i === index ? event.target.value : item,
                        ),
                      )
                    }
                  />
                  <div className="mt-6 flex shrink-0 gap-1">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      aria-label={`Move question ${index + 1} up`}
                      disabled={index === 0}
                      onClick={() => {
                        const next = [...draft.texts.starterQuestions];
                        [next[index - 1], next[index]] = [next[index], next[index - 1]];
                        updateDraftField("texts", "starterQuestions", next);
                      }}
                    >
                      <ArrowUp className="size-4" />
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      aria-label={`Move question ${index + 1} down`}
                      disabled={index === draft.texts.starterQuestions.length - 1}
                      onClick={() => {
                        const next = [...draft.texts.starterQuestions];
                        [next[index + 1], next[index]] = [next[index], next[index + 1]];
                        updateDraftField("texts", "starterQuestions", next);
                      }}
                    >
                      <ArrowDown className="size-4" />
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        updateDraftField(
                          "texts",
                          "starterQuestions",
                          draft.texts.starterQuestions.filter((_, i) => i !== index),
                        )
                      }
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              ))}
              {(draft.texts.starterQuestions || []).length < TEXT_LIMITS.starterQuestions && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    updateDraftField("texts", "starterQuestions", [
                      ...(draft.texts.starterQuestions || []),
                      "",
                    ])
                  }
                >
                  Add question
                </Button>
              )}
            </div>
          </div>
        </Card>

        <Card
          title="Layout"
          subtitle="Set the widget position, shape and type."
          className="order-3"
        >
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="appearance-position">Position<RequiredIndicator /></Label>
              <Select
                required
                value={draft.theme.position || "right"}
                onValueChange={(value) => updateDraftField("theme", "position", value)}
              >
                <SelectTrigger id="appearance-position" className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="right">Right</SelectItem>
                  <SelectItem value="left">Left</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Label className="space-y-2 text-sm text-foreground">
              <span>Border radius: {draft.theme.borderRadius ?? 16}px<RequiredIndicator /></span>
              <Input
                type="range"
                min="0"
                max="28"
                value={draft.theme.borderRadius ?? 16}
                onChange={(event) =>
                  updateDraftField("theme", "borderRadius", Number(event.target.value))
                }
                className="w-full"
              />
            </Label>
            <div className="space-y-2">
              <Label htmlFor="appearance-font-family">Font family<RequiredIndicator /></Label>
              <Select
                required
                value={draft.theme.fontFamily || "system"}
                onValueChange={(value) => updateDraftField("theme", "fontFamily", value)}
              >
                <SelectTrigger id="appearance-font-family" className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>System</SelectLabel>
                    <SelectItem value="system" style={{ fontFamily: "system-ui" }}>
                      System
                    </SelectItem>
                  </SelectGroup>
                  <SelectGroup>
                    <SelectLabel>Sans</SelectLabel>
                    <SelectItem value="sans" style={{ fontFamily: "Arial, sans-serif" }}>
                      Arial
                    </SelectItem>
                  </SelectGroup>
                  <SelectGroup>
                    <SelectLabel>Serif</SelectLabel>
                    <SelectItem value="serif" style={{ fontFamily: "Georgia, serif" }}>
                      Georgia
                    </SelectItem>
                  </SelectGroup>
                  <SelectGroup>
                    <SelectLabel>Mono</SelectLabel>
                    <SelectItem value="mono" style={{ fontFamily: "ui-monospace, monospace" }}>
                      Monospace
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <Switch
              checked={Boolean(draft.branding?.showBadge)}
              label="Show powered by badge"
              onChange={(value) => updateDraftField("branding", "showBadge", value)}
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => {
                setLogoFile(null);
                setDraft((current) => ({
                  ...current,
                  theme: { ...current.theme, ...DEFAULT_CONFIG.theme },
                  texts: { ...current.texts, ...DEFAULT_CONFIG.texts },
                }));
              }}
            >
              Reset to defaults
            </Button>
          </div>
        </Card>
      </fieldset>

      <AppearancePreview botId={selectedBotId} config={draft} logoFile={logoFile} />
      <div className="fixed inset-x-0 bottom-0 z-30 flex items-center justify-between gap-3 border-t border-border bg-card/95 p-3 shadow-sm backdrop-blur-sm lg:left-64">
        <span
          className={`flex items-center gap-2 text-sm ${dirty ? "text-foreground" : "text-muted-foreground"}`}
        >
          {dirty && <span className="size-2 rounded-full bg-warning" />}
          {dirty ? "Unsaved changes" : "All changes saved"}
        </span>
        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            disabled={!dirty || savingAppearance}
            onClick={resetAppearance}
          >
            Discard
          </Button>
          <Button
            type="button"
            disabled={!dirty || savingAppearance || !HEX_COLOR.test(draft.theme.primaryColor || "")}
            onClick={saveAppearance}
          >
            {savingAppearance ? "Saving…" : "Save changes"}
          </Button>
        </div>
      </div>
    </div>
  );
}
