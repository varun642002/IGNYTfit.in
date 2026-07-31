import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * The small capitalised label that sits above a section heading.
 *
 * It carries a live dot on the left — a 3px arc-blue point with an expanding
 * halo behind it. That dot is the site's smallest recurring signature: it
 * appears here, in the navbar status pill and beside the phone mockup's active
 * screen, and it is the one element allowed to animate continuously.
 */
export function Eyebrow({
  children,
  className,
  tone = "arc",
  live = true,
}: {
  children: ReactNode;
  className?: string;
  tone?: "arc" | "flare";
  live?: boolean;
}) {
  const color = tone === "arc" ? "text-arc" : "text-flare";
  const dot = tone === "arc" ? "bg-arc" : "bg-flare";

  return (
    <p
      className={cn(
        "inline-flex items-center gap-2.5 text-[11px] font-bold uppercase tracking-[0.22em]",
        color,
        className,
      )}
    >
      {live ? (
        <span aria-hidden className="relative flex size-1.5 shrink-0">
          <span
            data-decor="ambient"
            className={cn(
              "absolute inset-0 rounded-pill animate-halo",
              dot,
            )}
          />
          <span className={cn("relative size-1.5 rounded-pill", dot)} />
        </span>
      ) : null}
      {children}
    </p>
  );
}
