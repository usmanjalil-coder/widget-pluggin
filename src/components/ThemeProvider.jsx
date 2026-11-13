"use client";

import { useEffect } from "react";
import { ThemeProvider as NextThemeProvider, useTheme } from "next-themes";
import { siteBrowserColors } from "@/config/theme";

function BrowserThemeColor() {
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    if (!resolvedTheme) return;
    const color = resolvedTheme === "dark" ? siteBrowserColors.dark : siteBrowserColors.light;
    const tags = document.querySelectorAll('meta[name="theme-color"]');
    const previous = Array.from(tags, (tag) => [tag, tag.getAttribute("content")]);
    tags.forEach((tag) => tag.setAttribute("content", color));
    return () => {
      previous.forEach(([tag, content]) => {
        if (content === null) tag.removeAttribute("content");
        else tag.setAttribute("content", content);
      });
    };
  }, [resolvedTheme]);

  return null;
}

export default function ThemeProvider({ children }) {
  return (
    <NextThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <BrowserThemeColor />
      {children}
    </NextThemeProvider>
  );
}
