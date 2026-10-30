import { onPrimary } from "../../../widget/src/theme.js";
import { brandColors } from "@/config/brand";
import { Check } from "lucide-react";
import { Button, Card, Input, Label } from "@/components/ui";
import CharLimitInput from "@/components/shared/CharLimitInput";
import AppearancePreview from "@/components/dashboard/AppearancePreview";
import { HEX_COLOR, TEXT_LIMITS } from "@/lib/limits";
import { COLORS } from "./constants";

export default function AppearanceStep({ state, config, assistant, greeting, update }) {
  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(320px,.9fr)]">
      <Card className="gap-5 p-6">
        <CharLimitInput
          id="assistant-name"
          label="Assistant name"
          maxLength={TEXT_LIMITS.botName}
          value={assistant}
          onChange={(event) => update({ botName: event.target.value })}
        />
        <CharLimitInput
          id="assistant-greeting"
          label="Greeting"
          multiline
          rows={4}
          maxLength={TEXT_LIMITS.greetingMessage}
          value={greeting}
          onChange={(event) => update({ greeting: event.target.value })}
        />
        <fieldset>
          <legend className="mb-2 text-sm font-medium text-foreground">Position</legend>
          <div className="inline-flex rounded-lg border border-border bg-muted p-1">
            {["left", "right"].map((item) => (
              <Button
                key={item}
                type="button"
                size="sm"
                variant={state.position === item ? "secondary" : "ghost"}
                onClick={() => update({ position: item })}
                className="capitalize"
              >
                {item}
              </Button>
            ))}
          </div>
        </fieldset>
        <div>
          <Label htmlFor="primary-color">Primary color</Label>
          <div className="mt-3 flex flex-wrap gap-2">
            {COLORS.map((color) => (
              <button
                key={color}
                type="button"
                aria-label={"Use " + color}
                aria-pressed={state.primaryColor.toLowerCase() === color}
                onClick={() => update({ primaryColor: color })}
                className={
                  "grid size-8 place-items-center rounded-lg border-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring " +
                  (state.primaryColor.toLowerCase() === color
                    ? "border-foreground"
                    : "border-transparent")
                }
                style={{ backgroundColor: color, color: onPrimary(color) }}
              >
                {state.primaryColor.toLowerCase() === color && (
                  <Check className="size-4" />
                )}
              </button>
            ))}
          </div>
          <div className="mt-3 flex gap-2">
            <Input
              id="primary-color"
              value={state.primaryColor}
              onChange={(event) => update({ primaryColor: event.target.value })}
              aria-invalid={!HEX_COLOR.test(state.primaryColor)}
            />
            <input
              type="color"
              value={HEX_COLOR.test(state.primaryColor) ? state.primaryColor : brandColors.lightPrimary}
              onChange={(event) => update({ primaryColor: event.target.value })}
              className="size-9 rounded-lg border border-border bg-card p-1"
              aria-label="Choose primary color"
            />
          </div>
        </div>
      </Card>
      <AppearancePreview botId={state.botId} config={config} mobileInline />
    </div>
  );
}
