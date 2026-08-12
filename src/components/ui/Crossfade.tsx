"use client";

import { useEffect, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Two-layer crossfade, in CSS.
 *
 * This replaces `AnimatePresence mode="popLayout"`, and reproduces the one
 * property of it that actually mattered here: both halves of the transition
 * run at the same instant, rather than the incoming child waiting for the
 * outgoing one to finish. With `mode="wait"` a 0.62s transition takes a full
 * second and a quarter end to end, and the device finishes well after the copy
 * beside it — which reads as a bug rather than as a transition.
 *
 * It exists because framer-motion was 121KB of the home page's initial
 * JavaScript, and this was the only use of it that carried content rather than
 * a hover effect. Two mounted layers and a keyframe animation cost nothing by
 * comparison, and run on the compositor.
 *
 * ONLY FOR ABSOLUTELY-POSITIONED CONTENT OF A FIXED SIZE — which here means the
 * screen inside the phone. It briefly holds two children at once, so anything
 * in normal flow would resize its container mid-transition. The showcase copy
 * used to come through here for exactly that reason and cost 0.399 CLS; it now
 * stacks all its blocks in one grid cell instead, which reserves the height.
 * See the note in <PhoneScene>.
 *
 * The outgoing child is held for `durationMs` and then dropped. That timer is
 * the only JavaScript involved; the movement itself is entirely CSS, so it
 * also degrades correctly under `prefers-reduced-motion` via the global
 * reduced-motion rule.
 */
export function Crossfade({
  slotKey,
  children,
  durationMs,
  className,
}: {
  /** Changing this triggers the transition. */
  slotKey: string;
  children: ReactNode;
  durationMs: number;
  className?: string;
}) {
  /* The screen this scene opened on.

     It is rendered plainly, with no entrance at all. `xfade-screen-in` starts
     at `opacity: 0`, and this component runs on the server — so the hero
     device, the largest element on the home page, was shipped mid-fade and
     spent its first 620ms climbing out of transparent. Chrome will not take a
     transparent element as a largest-contentful-paint candidate, which is the
     same fault that `page-in` and `stage-in` each had.

     There is nothing to cross-fade from on the first paint in any case. The
     animation only means something once there is an outgoing screen. */
  const [openedOn] = useState(slotKey);

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
    <div className={cn("absolute inset-0", className)}>
      {leaving ? (
        <div
          key={leaving.key}
          aria-hidden
          style={duration}
          className="xfade-out absolute inset-0"
        >
          {leaving.node}
        </div>
      ) : null}

      <div
        key={shown.key}
        style={duration}
        className={cn(
          "absolute inset-0",
          shown.key !== openedOn && "xfade-in",
        )}
      >
        {shown.node}
      </div>
    </div>
  );
}
