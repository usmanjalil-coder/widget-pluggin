"use client";

import { onPrimary } from "../../../widget/src/theme.js";

import { brandColors } from "@/config/brand";

import { memo, useCallback, useMemo, useState } from "react";
import { Check } from "lucide-react";
import { Button, Input, Label, Textarea } from "@/components/ui";
import AppearancePreview from "@/components/dashboard/AppearancePreview";

const colors = ["#4F46E5", brandColors.lightPrimary, "#2563EB", "#9333EA", "#C2410C", "#BE123C", "#0369A1", "#475569"];

const ColorSwatch = memo(function ColorSwatch({ color, selected, onSelect }) {
  const handleClick = useCallback(() => onSelect(color), [color, onSelect]);

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={`Use ${color}`}
      aria-pressed={selected}
      className={`flex size-8 items-center justify-center rounded-full border-2 ${selected ? "border-foreground ring-2 ring-ring" : "border-transparent"}`}
      style={{ backgroundColor: color, color: onPrimary(color) }}
    >
      {selected && <Check className="size-4" />}
    </button>
  );
});

export const ThemeShowcase = memo(function ThemeShowcase() {
  const [primaryColor, setPrimaryColor] = useState(brandColors.lightPrimary);
  const [position, setPosition] = useState("right");
  const [greeting, setGreeting] = useState("Hi! Can I help with your visit today?");
  const validColor = /^#[0-9a-fA-F]{6}$/.test(primaryColor);
  const normalizedPrimaryColor = primaryColor.toLowerCase();
  const selectColor = useCallback((color) => setPrimaryColor(color), []);
  const handleColorChange = useCallback((event) => setPrimaryColor(event.target.value), []);
  const handleGreetingChange = useCallback((event) => setGreeting(event.target.value), []);
  const selectLeft = useCallback(() => setPosition("left"), []);
  const selectRight = useCallback(() => setPosition("right"), []);
  const previewConfig = useMemo(
    () => ({
      theme: { primaryColor: validColor ? primaryColor : brandColors.lightPrimary, mode: "light", position, borderRadius: 16, fontFamily: "system" },
      texts: { botName: "Assistant", greetingMessage: greeting, inputPlaceholder: "Type your message", starterQuestions: [] },
      branding: { showBadge: true },
    }),
    [greeting, position, primaryColor, validColor],
  );

  return (
    <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
      <div className="rounded-3xl border border-border bg-card p-5 shadow-sm">
        <Label className="block text-sm font-medium text-foreground">Primary color</Label>
        <div className="mt-3 flex flex-wrap gap-2">
          {colors.map((color) => (
            <ColorSwatch
              key={color}
              color={color}
              selected={normalizedPrimaryColor === color.toLowerCase()}
              onSelect={selectColor}
            />
          ))}
        </div>
        <div className="mt-3 flex items-center gap-3">
          <Input type="color" value={validColor ? primaryColor : brandColors.lightPrimary} onChange={handleColorChange} className="h-12 w-16 cursor-pointer rounded-xl border border-border bg-card p-1" />
          <Input type="text" value={primaryColor} onChange={handleColorChange} maxLength={7} aria-invalid={!validColor} className="w-full rounded-xl border border-border bg-card px-3 py-2.5 text-sm text-foreground" aria-label="Primary color" />
        </div>
        {!validColor && <p className="mt-2 text-xs text-destructive">Enter a six-digit hex color, such as #4F46E5.</p>}
        <div className="mt-5">
          <p className="text-sm font-medium text-foreground">Widget position</p>
          <div className="mt-2 inline-flex rounded-lg border border-border bg-muted p-1">
            <Button type="button" variant="ghost" size="sm" onClick={selectLeft} aria-pressed={position === "left"} className={position === "left" ? "bg-card shadow-sm" : ""}>Left</Button>
            <Button type="button" variant="ghost" size="sm" onClick={selectRight} aria-pressed={position === "right"} className={position === "right" ? "bg-card shadow-sm" : ""}>Right</Button>
          </div>
        </div>
        <Label className="mt-5 block text-sm font-medium text-foreground">Greeting</Label>
        <Textarea value={greeting} onChange={handleGreetingChange} rows={3} className="mt-3 w-full rounded-xl border border-border bg-card px-3 py-2.5 text-sm text-foreground" />
      </div>
      <div className="min-h-[420px] rounded-xl border border-border bg-muted p-3 shadow-sm">
        <AppearancePreview compact botId="demo-customization" config={previewConfig} />
      </div>
    </div>
  );
});
