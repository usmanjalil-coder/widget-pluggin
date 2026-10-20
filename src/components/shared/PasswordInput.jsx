"use client";

import { useId, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export default function PasswordInput({ id, className, disabled, ...props }) {
  const generatedId = useId();
  const inputId = id || generatedId;
  const [visible, setVisible] = useState(false);

  return (
    <div className="relative">
      <Input
        {...props}
        id={inputId}
        type={visible ? "text" : "password"}
        disabled={disabled}
        className={cn(className, "pr-11")}
      />
      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        className="absolute top-1/2 right-1 -translate-y-1/2"
        disabled={disabled}
        aria-label={visible ? "Hide password" : "Show password"}
        aria-controls={inputId}
        aria-pressed={visible}
        onClick={() => setVisible((current) => !current)}
      >
        {visible ? <EyeOff aria-hidden="true" /> : <Eye aria-hidden="true" />}
      </Button>
    </div>
  );
}
