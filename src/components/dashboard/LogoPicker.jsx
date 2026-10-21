"use client";

import { useEffect, useRef, useState } from "react";
import { Link as LinkIcon, Upload } from "lucide-react";
import { Button, Input, Label } from "@/components/ui";
import CharLimitInput from "@/components/shared/CharLimitInput";
import { TEXT_LIMITS } from "@/lib/limits";
import { dashboardAvatarUrl } from "@/lib/avatars";

function LocalLogoPreview({ file }) {
  const image = useRef(null);
  useEffect(() => {
    const url = URL.createObjectURL(file);
    image.current.src = url;
    return () => URL.revokeObjectURL(url);
  }, [file]);
  // eslint-disable-next-line @next/next/no-img-element -- Local file thumbnail before upload.
  return <img ref={image} alt="Selected logo preview" className="size-full object-contain" />;
}

export default function LogoPicker({ value = "", file, onFileChange, onUrlChange }) {
  const [choice, setChoice] = useState(null);
  const [error, setError] = useState("");
  const mode = file ? "upload" : choice || (value.includes("/bot-logos/") ? "upload" : "link");
  const source = dashboardAvatarUrl(value);

  return (
    <div className="space-y-3 md:col-span-2">
      <Label>Logo / avatar</Label>
      <div className="flex gap-2" role="group" aria-label="Logo source">
        {[
          ["upload", "Upload image", Upload],
          ["link", "Use link", LinkIcon],
        ].map(([key, label, Icon]) => (
          <Button
            key={key}
            type="button"
            variant={mode === key ? "primary" : "outline"}
            aria-pressed={mode === key}
            size="sm"
            onClick={() => {
              setChoice(key);
              setError("");
              if (key === "link") onFileChange(null);
            }}
          >
            <Icon className="size-4" aria-hidden="true" />
            {label}
          </Button>
        ))}
      </div>
      {mode === "upload" ? (
        <div className="space-y-2">
          <Label htmlFor="appearance-logo-file">Choose logo image</Label>
          <Input
            id="appearance-logo-file"
            type="file"
            accept="image/png,image/jpeg,image/webp"
            aria-invalid={Boolean(error)}
            aria-describedby={
              error ? "appearance-logo-error appearance-logo-help" : "appearance-logo-help"
            }
            onChange={(event) => {
              const next = event.target.files?.[0];
              event.target.value = "";
              if (!next) return;
              if (!["image/png", "image/jpeg", "image/webp"].includes(next.type)) {
                setError("Choose a PNG, JPG or WebP image.");
                return;
              }
              if (next.size > 2 * 1024 * 1024) {
                setError("Choose an image smaller than 2 MB.");
                return;
              }
              setError("");
              onFileChange(next);
            }}
          />
          <p id="appearance-logo-help" className="text-xs text-muted-foreground">
            PNG, JPG or WebP. Maximum 2 MB and 2048 × 2048 pixels. Your upload replaces the logo
            link when you save.
          </p>
          {file && <p className="break-all text-sm">{file.name} · Ready to save</p>}
        </div>
      ) : (
        <CharLimitInput
          id="appearance-avatar-url"
          label="Logo URL"
          maxLength={TEXT_LIMITS.avatarUrl}
          value={value}
          onChange={(event) => onUrlChange(event.target.value)}
          placeholder="https://example.com/logo.png"
          error={value && !source ? "Use an HTTPS URL." : undefined}
        />
      )}
      {error && (
        <p id="appearance-logo-error" role="alert" className="text-xs text-destructive">
          {error}
        </p>
      )}
      {(source || file) && (
        <div className="flex items-center gap-3 rounded-lg border border-border p-3">
          <div className="grid size-12 shrink-0 place-items-center overflow-hidden rounded-lg bg-muted">
            {file ? (
              <LocalLogoPreview file={file} />
            ) : (
              // Uploaded local logos may use HTTP; external links require HTTPS.
              // eslint-disable-next-line @next/next/no-img-element
              <img src={source} alt="Logo preview" className="size-full object-contain" />
            )}
          </div>
          <span className="flex-1 text-xs text-muted-foreground">
            {file ? "New logo shown in the live preview. Save to publish." : "Current logo"}
          </span>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => {
              onFileChange(null);
              onUrlChange("");
              setError("");
            }}
          >
            Remove
          </Button>
        </div>
      )}
    </div>
  );
}
