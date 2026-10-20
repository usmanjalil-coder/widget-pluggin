import Link from "next/link";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { AlertCircle, Check, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { Button, Card } from "@/components/ui";
import { completeOnboarding } from "@/lib/api/onboarding.api";

export default function DoneStep({ state, assistant, greeting, headingRef }) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const checklist = [
    ["Assistant created by registration", Boolean(state.botId)],
    ["Knowledge uploaded", false],
    ["Branding published", false],
    ["Snippet copied", state.snippetCopied],
  ];

  const handleGotoDashboardAfterOnBoard = useCallback(async () => {
    if (saving) return;

    setSaving(true);
    setError("");

    try {
      await completeOnboarding({ ...state, botName: assistant, greeting });
      toast.success("Onboarding completed.");
      router.push("/dashboard");
    } catch (saveError) {
      const fieldError = Object.entries(saveError?.errors || {})[0];
      const message = fieldError
        ? `${fieldError[0]}: ${fieldError[1][0]}`
        : saveError?.message || "Could not finish onboarding. Please try again.";
      setError(message);
      toast.error(message);
    } finally {
      setSaving(false);
    }
  }, [router, saving, state, assistant, greeting]);

  return (
    <div className="mx-auto max-w-xl py-8 text-center">
      <span className="mx-auto grid size-14 place-items-center rounded-xl bg-success-bg text-success-foreground">
        <CheckCircle2 className="size-7" />
      </span>
      <h1
        ref={headingRef}
        tabIndex={-1}
        className="mt-5 text-2xl font-semibold text-foreground focus:outline-none"
      >
        Your setup draft is saved
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Your setup is ready. Save these choices to your account to continue to the dashboard.
      </p>
      {error && (
        <p role="alert" aria-live="polite" className="mt-4 text-sm text-destructive">
          {error}
        </p>
      )}
      <Card className="mt-7 gap-0 p-0 text-left">
        {checklist.map(([label, complete], index) => (
          <div
            key={label}
            className={
              "flex items-center gap-3 px-5 py-4 " + (index ? "border-t border-border" : "")
            }
          >
            {complete ? (
              <Check className="size-5 text-success" />
            ) : (
              <AlertCircle className="size-5 text-warning" />
            )}
            <span className="flex-1 text-sm text-foreground">{label}</span>
            <span
              className={
                "text-xs " + (complete ? "text-muted-foreground" : "text-warning-foreground")
              }
            >
              {complete ? "Complete" : "Needs attention"}
            </span>
          </div>
        ))}
      </Card>
      <div className="mt-7 flex flex-col items-center gap-3">
        <Button onClick={handleGotoDashboardAfterOnBoard} disabled={saving}>
          {saving ? "Saving setup..." : "Go to dashboard"}
        </Button>
        <Link
          className="text-sm font-medium text-primary hover:underline"
          href={state.botId ? "/dashboard/bots/" + state.botId + "?tab=knowledge" : "/dashboard"}
        >
          Add more knowledge
        </Link>
      </div>
    </div>
  );
}
