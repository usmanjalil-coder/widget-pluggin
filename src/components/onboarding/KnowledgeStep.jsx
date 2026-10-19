import { AlertCircle, Check, FileUp, Globe } from "lucide-react";
import { Card } from "@/components/ui";

const knowledgeOptions = [
  ["website", "Import from website URL", Globe],
  ["files", "Upload files", FileUp],
];
export default function KnowledgeStep({ state, update, later, onAddLater }) {
  return (
    <div className="space-y-5">
      <div className="grid gap-3 md:grid-cols-2">
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
          After setup, add knowledge from the Knowledge Base page. Import a website or upload a PDF,
          DOCX, or TXT file containing your questions and answers.
        </p>
        {state.knowledgeMethod === "website" && (
          <p className="mt-4 text-sm text-muted-foreground">
            Choose one page or up to 10 linked pages from the website.
          </p>
        )}
        {state.knowledgeMethod === "files" && (
          <p className="mt-4 text-sm text-muted-foreground">
            PDF, DOCX, and TXT files up to 10 MB are supported.
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
