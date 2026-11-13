"use client";

import { useId } from "react";

export default function Logo({ size = 32, showWordmark = true, className = "", alignIconLeft = false }) {
  const gradientId = `tellvira-gradient-${useId().replaceAll(":", "")}`;

  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <svg width={size * (alignIconLeft ? 400 : 481) / 437} height={size} viewBox={alignIconLeft ? "81 0 400 437" : "0 0 481 437"} aria-hidden="true" focusable="false" className="shrink-0">
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="var(--logo-from)" />
            <stop offset="100%" stopColor="var(--logo-to)" />
          </linearGradient>
        </defs>
        <path d="M 389 80 L 376 74 L 360 70 L 187 69 L 158 70 L 137 76 L 117 88 L 104 100 L 93 115 L 87 127 L 81 150 L 81 256 L 88 281 L 99 299 L 118 316 L 143 327 L 159 330 L 200 330 L 203 332 L 206 337 L 206 389 L 212 397 L 218 399 L 229 396 L 302 345 L 313 339 L 321 337 L 356 337 L 367 335 L 389 326 L 405 315 L 424 293 L 432 277 L 436 262 L 437 149 L 432 129 L 422 110 L 405 91 Z M 367 132 L 376 141 L 381 153 L 379 168 L 371 179 L 360 186 L 352 188 L 313 188 L 298 195 L 288 208 L 285 219 L 284 317 L 281 323 L 274 330 L 235 360 L 233 360 L 231 358 L 231 221 L 228 208 L 220 197 L 206 189 L 160 187 L 149 182 L 140 173 L 136 164 L 135 155 L 139 143 L 149 132 L 160 127 L 356 127 Z" fill={`url(#${gradientId})`} fillRule="evenodd" />
        <path d="M 412 215 L 346 215 L 335 218 L 326 223 L 314 236 L 309 250 L 309 317 L 352 316 L 370 310 L 384 301 L 396 289 L 402 280 L 410 261 L 412 250 Z" fill="var(--logo-accent)" />
      </svg>
      {showWordmark && <span className="font-sans text-[1.8rem] font-bold leading-none tracking-tight text-current">Tell<span className="text-highlight">vira</span></span>}
    </span>
  );
}
