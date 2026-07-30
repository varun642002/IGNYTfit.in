import type { ReactNode } from "react";
import { Surface } from "@/components/ui/Surface";
import { cn } from "@/lib/utils";

/**
 * Kept as a thin alias over <Surface> so the pages that were already written
 * against `Card` keep working.
 *
 * There is exactly one card implementation on this site, and it is Surface.
 * Prefer it directly in new code; this exists so a rebuild did not have to
 * touch every list item on every page to rename one component.
 */
export function Card({
  children,
  className,
  interactive = false,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  interactive?: boolean;
  as?: "div" | "li" | "article";
}) {
  return (
    <Surface as={as} interactive={interactive} className={className}>
      {children}
    </Surface>
  );
}

/**
 * Small uppercase status pill.
 *
 * `neutral` is the default for a reason: a badge that is always coloured stops
 * distinguishing anything. Reserve `flare` for the one status on a page that
 * actually matters.
 */
export function Badge({
  children,
  className,
  tone = "neutral",
}: {
  children: ReactNode;
  className?: string;
  tone?: "flare" | "arc" | "good" | "warn" | "neutral";
}) {
  const tones = {
    flare: "border-flare/35 bg-flare/12 text-flare",
    arc: "border-arc/35 bg-arc/12 text-arc-bright",
    good: "border-good/35 bg-good/12 text-good",
    warn: "border-warn/35 bg-warn/12 text-warn",
    neutral: "border-hairline bg-carbon-2 text-ash",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-pill border px-3 py-1",
        "text-[11px] font-bold uppercase tracking-[0.16em]",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
