"use client";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";

export default function DesignProviders({ children }) {
  return <TooltipProvider delayDuration={200}>{children}<Toaster theme="light" position="bottom-right" closeButton /></TooltipProvider>;
}
