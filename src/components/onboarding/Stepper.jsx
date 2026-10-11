import { Check } from "lucide-react";
import { STEPS } from "./constants";

export default function Stepper({ step }) {
  return (
    <>
      <ol className="hidden items-start sm:flex" aria-label="Onboarding progress">
        {STEPS.map((label, index) => {
          const complete = index < step;
          const current = index === step;
          return (
            <li key={label} className="flex min-w-0 flex-1 flex-col items-center">
              <div className="flex w-full items-center">
                {index > 0 && (
                  <span className={"h-px flex-1 " + (complete ? "bg-primary" : "bg-border")} />
                )}
                <span
                  aria-current={current ? "step" : undefined}
                  className={
                    "grid size-8 shrink-0 place-items-center rounded-full border text-xs font-semibold " +
                    (complete
                      ? "border-primary bg-primary text-primary-foreground"
                      : current
                        ? "border-primary bg-card text-primary ring-2 ring-primary/30"
                        : "border-border bg-muted text-muted-foreground")
                  }
                >
                  {complete ? <Check className="size-4" /> : index + 1}
                </span>
                {index < STEPS.length - 1 && (
                  <span className={"h-px flex-1 " + (complete ? "bg-primary" : "bg-border")} />
                )}
              </div>
              <span
                className={
                  "mt-2 text-center text-xs " +
                  (current ? "font-medium text-foreground" : "text-muted-foreground")
                }
              >
                {label}
              </span>
            </li>
          );
        })}
      </ol>
      <p className="text-center text-sm text-muted-foreground sm:hidden">
        Step {step + 1} of 5 · {STEPS[step]}
      </p>
    </>
  );
}
