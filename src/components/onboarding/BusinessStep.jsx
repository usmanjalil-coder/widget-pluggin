import { Card, Input, Label } from "@/components/ui";
import AppearancePreview from "@/components/dashboard/AppearancePreview";
import { INDUSTRIES } from "./constants";
import { validUrl } from "./validation";
import BotPurposeField from "@/components/shared/BotPurposeField";

export default function BusinessStep({ state, config, update, setIndustry }) {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card className="gap-5 p-6">
        <div className="space-y-2">
          <Label htmlFor="business-name">Business name</Label>
          <Input
            id="business-name"
            value={state.businessName}
            onChange={(event) => update({ businessName: event.target.value })}
            placeholder="Example: BrightSmile Dental"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="website-url">
            Website URL <span className="text-muted-foreground">(optional)</span>
          </Label>
          <Input
            id="website-url"
            type="url"
            value={state.websiteUrl}
            onChange={(event) => update({ websiteUrl: event.target.value })}
            placeholder="https://example.com"
            aria-invalid={Boolean(state.websiteUrl && !validUrl(state.websiteUrl))}
          />
          {state.websiteUrl && !validUrl(state.websiteUrl) && (
            <p className="text-xs text-destructive">Enter a complete http or https URL.</p>
          )}
        </div>
        <BotPurposeField value={state.purpose} onChange={(purpose) => update({ purpose })} />
        <fieldset>
          <legend className="mb-3 text-sm font-medium text-foreground">Industry</legend>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {INDUSTRIES.map(([id, label, Icon]) => (
              <button
                key={id}
                type="button"
                onClick={() => setIndustry(id)}
                className={
                  "flex items-center gap-2 rounded-lg border p-3 text-left text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring " +
                  (state.industry === id
                    ? "border-primary bg-accent text-primary"
                    : "border-border bg-card text-foreground hover:bg-muted")
                }
              >
                <Icon className="size-4" />
                {label}
              </button>
            ))}
          </div>
        </fieldset>
      </Card>
      <AppearancePreview botId={state.botId} config={config} mobileInline />
    </div>
  );
}
