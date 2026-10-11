import { AlertCircle, Check, FileText, FileUp, Globe } from "lucide-react";
import { Card, Input, Label } from "@/components/ui";
import CharLimitInput from "@/components/shared/CharLimitInput";
import { TEXT_LIMITS } from "@/lib/limits";

const knowledgeOptions = [
  ["website", "Import from website URL", Globe],
  ["files", "Upload files", FileUp],
  ["faq", "Paste FAQ text", FileText],
];
export default function KnowledgeStep({ state, update, later, onAddLater }) {
  return (
    <div className="space-y-5">
      <div className="grid gap-3 md:grid-cols-3">
        {knowledgeOptions.map(([id, label, Icon]) => (
          <button
            key={id}
            type="button"
            onClick={() => update({ knowledgeMethod: id })}
            className={
              "relative flex min-h-28 flex-col items-start rounded-xl border p-5 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring " +
              (state.knowledgeMethod === id
                ? "border-primary bg-accent"
                : "border-border bg-card hover:bg-muted")
            }
          >
            <Icon className="size-5 text-primary" />
            <span className="mt-3 text-sm font-semibold text-foreground">{label}</span>
            {state.knowledgeMethod === id && (
              <span className="absolute right-3 top-3 grid size-5 place-items-center rounded-full bg-primary text-primary-foreground">
                <Check className="size-3" />
              </span>
            )}
          </button>
        ))}
      </div>
      <Card className="p-6">
        <p className="text-sm text-muted-foreground">
          Knowledge uploads will be available when the Laravel documents API is connected. You can
          continue with your setup now.
        </p>
        {state.knowledgeMethod === "website" && (
          <div className="mt-4 space-y-2">
            <Label htmlFor="knowledge-website">Website to import later</Label>
            <Input
              id="knowledge-website"
              type="url"
              value={state.websiteSource}
              onChange={(event) => update({ websiteSource: event.target.value })}
              placeholder="https://your-site.com"
            />
          </div>
        )}
        {state.knowledgeMethod === "faq" && (
          <div className="mt-4">
            <CharLimitInput
              id="faq-text"
              label="FAQ draft"
              multiline
              rows={6}
              maxLength={TEXT_LIMITS.offlineMessage}
              value={state.faqText}
              onChange={(event) => update({ faqText: event.target.value })}
              placeholder="Paste common questions and answers here."
            />
          </div>
        )}
        {state.knowledgeMethod === "files" && (
          <p className="mt-4 text-sm text-muted-foreground">
            File upload is unavailable until the documents API is ready.
          </p>
        )}
      </Card>
      <button
        type="button"
        className="text-sm font-medium text-primary hover:underline"
        onClick={onAddLater}
      >
        I&apos;ll add content later
      </button>
      {later && (
        <p className="flex items-center gap-2 text-sm text-warning-foreground">
          <AlertCircle className="size-4" />
          The bot will answer poorly without content.
        </p>
      )}
    </div>
  );
}
