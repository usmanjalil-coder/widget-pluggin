"use client";

import { memo, useState } from "react";
import { HEX_COLOR } from "@/lib/limits";
import Image from "next/image";

function BotAvatar({ bot, className = "size-10" }) {
  const [failedSrc, setFailedSrc] = useState(null);
  const name = bot?.name || bot?.texts?.botName || "Bot";
  const initials =
    name
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part[0])
      .join("")
      .toUpperCase() || "B";
  const raw = bot?.theme?.primaryColor;
  const color = HEX_COLOR.test(raw || "") ? raw : "var(--primary)";
  const hex = HEX_COLOR.test(raw || "")
    ? raw.length === 4
      ? `#${[1, 2, 3].map((i) => raw[i] + raw[i]).join("")}`
      : raw
    : null;
  const rgb = hex ? [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255) : null;
  const linear = rgb?.map((v) => (v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
  const onColor =
    linear && linear[0] * 0.2126 + linear[1] * 0.7152 + linear[2] * 0.0722 > 0.179
      ? "var(--contrast-dark)"
      : "var(--contrast-light)";
  return (
    <span
      className={`grid shrink-0 place-items-center overflow-hidden rounded-lg border border-border/30 text-xs font-semibold ${className}`}
      style={{ backgroundColor: color, color: onColor || "var(--primary-foreground)" }}
      aria-hidden="true"
    >
      {bot?.texts?.avatarUrl?.startsWith("https://") && failedSrc !== bot.texts.avatarUrl ? (
        <Image
          src={bot.texts.avatarUrl}
          alt=""
          width={40}
          height={40}
          unoptimized
          className="size-full object-cover"
          onError={() => setFailedSrc(bot.texts.avatarUrl)}
        />
      ) : (
        initials
      )}
    </span>
  );
}

export default memo(BotAvatar);
