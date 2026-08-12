"use client";

import { useEffect, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Two-layer crossfade, in CSS.
 *
 * This replaces `AnimatePresence mode="popLayout"`, and reproduces the one
 * property of it that actually mattered here: both halves of the transition
 * run at the same instant, rather than the incoming child waiting for the
 * outgoing one to finish. With `mode="wait"` a 0.5s transition takes a full
 * second end to end, and the copy finishes a third of a second after the
 * device beside it — which reads as a bug rather than as a transition.
 *
 * It exists because framer-motion was 121KB of the home page's initial
 * JavaScript, and this was the only use of it that carried content rather than
 * a hover effect. Two mounted layers and a keyframe animation cost nothing by
 * comparison, and run on the compositor.
 *
 * The outgoing child is held for `durationMs` and then dropped. That timer is
 * the only JavaScript involved; the movement itself is entirely CSS, so it
 * also degrades correctly under `prefers-reduced-motion` via the global
 * reduced-motion rule.
 */
export function Crossfade({
  slotKey,
  children,
  variant,
  durationMs,
  className,
}: {
  /** Changing this triggers the transition. */
  slotKey: string;
  children: ReactNode;
  /**
   * `screen` layers both children absolutely, for the device display.
   * `copy` keeps the incoming child in flow so it still sets the block's
   * height, and takes the outgoing one out of flow so it cannot push layout.
   */
  variant: "screen" | "copy";
  durationMs: number;
  className?: string;
}) {
  const [shown, setShown] = useState<{ key: string; node: ReactNode }>({
    key: slotKey,
    node: children,
  });
  const [leaving, setLeaving] = useState<{
    key: string;
    node: ReactNode;
  } | null>(null);

  /* Adjusting state during render — the pattern React documents for deriving
     from a changed prop. An effect here would paint the new child once before
     the outgoing one was registered, which shows as a flash. */
  if (slotKey !== shown.key) {
    setLeaving(shown);
    setShown({ key: slotKey, node: children });
  }

  useEffect(() => {
    if (!leaving) return;
    const timer = window.setTimeout(() => setLeaving(null), durationMs);
    return () => window.clearTimeout(timer);
  }, [leaving, durationMs]);

  const duration = { animationDuration: `${durationMs}ms` };

  return (
    <div className={cn(variant === "screen" ? "absolute inset-0" : "relative", className)}>
      {leaving ? (
        <div
          key={leaving.key}
          aria-hidden
          data-variant={variant}
          style={duration}
          className={cn(
            "xfade-out",
            variant === "screen" ? "absolute inset-0" : "absolute inset-x-0 top-0",
          )}
        >
          {leaving.node}
        </div>
      ) : null}

      <div
        key={shown.key}
        style={duration}
        className={cn("xfade-in", variant === "screen" && "absolute inset-0")}
        data-variant={variant}
      >
        {shown.node}
      </div>
    </div>
  );
}
