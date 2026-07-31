"use client";

import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useRichMotion } from "@/components/providers/MotionProvider";

/**
 * A soft highlight that follows the cursor across a card.
 *
 * This is the site's standard card hover. It is deliberately *not* a framer-
 * motion component: the pointer position is written straight to two CSS custom
 * properties on the element, and a `radial-gradient` in the overlay reads them.
 * No React state, no re-render, no spring — one style mutation per pointer
 * event, which the compositor absorbs.
 *
 * That matters because these appear twelve-to-sixteen at a time on the features
 * grid. A spring per card would be a hundred-odd motion values updating during
 * a scroll, for an effect nobody looks directly at.
 *
 * The overlay only becomes visible on hover, so a card that has never been
 * pointed at paints nothing extra.
 */
export function Spotlight({
  children,
  className,
  tone = "arc",
  radius = 320,
}: {
  children: ReactNode;
  className?: string;
  tone?: "arc" | "flare";
  /** Radius of the highlight in pixels. */
  radius?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const rich = useRichMotion();

  const colour =
    tone === "arc" ? "rgba(61,123,255,0.16)" : "rgba(255,106,26,0.15)";

  return (
    <div
      ref={ref}
      className={cn("group/spot relative", className)}
      onPointerMove={
        rich
          ? (event) => {
              const node = ref.current;
              if (!node || event.pointerType !== "mouse") return;
              const rect = node.getBoundingClientRect();
              node.style.setProperty("--spot-x", `${event.clientX - rect.left}px`);
              node.style.setProperty("--spot-y", `${event.clientY - rect.top}px`);
            }
          : undefined
      }
    >
      {rich ? (
        <div
          aria-hidden
          data-decor="rich"
          className={cn(
            "pointer-events-none absolute inset-0 rounded-[inherit] opacity-0",
            "transition-opacity duration-500 ease-glide group-hover/spot:opacity-100",
          )}
          style={{
            background: `radial-gradient(${radius}px circle at var(--spot-x, 50%) var(--spot-y, 50%), ${colour}, transparent 72%)`,
          }}
        />
      ) : null}
      {children}
    </div>
  );
}
