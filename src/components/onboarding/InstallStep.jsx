import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Check, Clipboard } from "lucide-react";
import { Button, Card } from "@/components/ui";

const INSTRUCTIONS = {
  HTML: [
    "Copy the snippet below.",
    "Paste it before the closing </body> tag.",
    "Publish your site.",
  ],
  WordPress: [
    "Open your theme footer or a header/footer plugin.",
    "Paste the snippet in the footer.",
    "Save and clear any cache.",
  ],
  Shopify: [
    "Open Online Store, Themes, then Edit code.",
    "Open theme.liquid.",
    "Paste the snippet before </body> and save.",
  ],
  Webflow: [
    "Open Project settings and Custom code.",
    "Paste the snippet in Footer code.",
    "Publish your Webflow site.",
  ],
};

export default function InstallStep({ state, update }) {
  const [platform, setPlatform] = useState("HTML");
  const [snippet, setSnippet] = useState("");
  useEffect(() => {
    const timer = window.setTimeout(() => {
      setSnippet(
        `<script src="${window.location.origin}/widget.js" data-bot-id="${state.botId}"></script>`,
      );
    }, 0);
    return () => window.clearTimeout(timer);
  }, [state.botId]);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(snippet);
      update({ snippetCopied: true });
      toast.success("Snippet copied.");
    } catch {
      toast.error("Copy failed. Select the snippet instead.");
    }
  };
  return (
    <div className="space-y-5">
      <div className="flex gap-1 overflow-x-auto rounded-lg border border-border bg-muted p-1">
        {Object.keys(INSTRUCTIONS).map((item) => (
          <Button
            key={item}
            type="button"
            size="sm"
            variant={platform === item ? "secondary" : "ghost"}
            onClick={() => setPlatform(item)}
          >
            {item}
          </Button>
        ))}
      </div>
      <Card className="p-6">
        <div className="flex items-start justify-between gap-3 rounded-lg bg-foreground p-4 text-primary-foreground">
          <code className="min-w-0 break-all text-xs leading-5">{snippet}</code>
          <Button type="button" size="sm" variant="secondary" onClick={copy}>
            {state.snippetCopied ? (
              <>
                <Check className="size-4" />
                Copied
              </>
            ) : (
              <>
                <Clipboard className="size-4" />
                Copy
              </>
            )}
          </Button>
        </div>
        <ol className="mt-5 list-decimal space-y-2 pl-5 text-sm text-muted-foreground">
          {INSTRUCTIONS[platform].map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
      </Card>
      <p className="text-sm text-muted-foreground">
        Copy the snippet when the public widget API is available.
      </p>
    </div>
  );
}
