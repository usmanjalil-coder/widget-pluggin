"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Label as LabelPrimitive } from "radix-ui";

function Label({ className, ...props }) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn(
        "block text-sm leading-6 font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}

function RequiredIndicator() {
  return (
    <>
      <span aria-hidden="true" className="ml-1 text-destructive">*</span>
      <span className="sr-only"> (required)</span>
    </>
  );
}

export { Label, RequiredIndicator };
