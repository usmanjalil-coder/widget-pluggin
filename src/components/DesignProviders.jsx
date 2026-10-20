"use client";
import { useEffect } from "react";
import { ThemeProvider } from "next-themes";
import { QueryClientProvider } from "@tanstack/react-query";
import { clearQueryCache, getQueryClient } from "@/lib/query-client";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";

export default function DesignProviders({ children }) {
  useEffect(() => {
    const handleStorage = (event) => {
      if (event.key === "token" || event.key === null) clearQueryCache();
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  return (
    <QueryClientProvider client={getQueryClient()}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <TooltipProvider delayDuration={200}>
          {children}
          <Toaster position="bottom-right" closeButton />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
