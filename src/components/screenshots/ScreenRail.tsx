"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Horizontal gallery rail.
 *
 * The scrolling itself is native: a flex row with `scroll-snap-type: x
 * mandatory`. That gives correct momentum on touch, correct keyboard behaviour,
 * correct behaviour when a screen reader moves focus into an off-screen card,
 * and correct behaviour with a trackpad — all of which a JavaScript carousel
 * has to reimplement, usually incompletely.
 *
 * This component adds only what native scrolling does not provide: two arrow
 * buttons for mouse users, and the disabled states that tell you when you have
 * reached an end. `scrollBy` with `behavior: smooth` does the movement, so even
 * that is the platform's own animation.
 *
 * The children are server-rendered phone mockups passed straight through, so
 * none of the sixteen app screens becomes a client component to appear here.
 */
export function ScreenRail({
  children,
  className,
  label,
}: {
  children: ReactNode;
  className?: string;
  /** Accessible name for the scrollable region. */
  label: string;
}) {
  const railRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const sync = useCallback(() => {
    const rail = railRef.current;
    if (!rail) return;
    const max = rail.scrollWidth - rail.clientWidth;
    setAtStart(rail.scrollLeft <= 4);
    setAtEnd(rail.scrollLeft >= max - 4);
  }, []);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    sync();
    rail.addEventListener("scroll", sync, { passive: true });
    const observer = new ResizeObserver(sync);
    observer.observe(rail);
    return () => {
      rail.removeEventListener("scroll", sync);
      observer.disconnect();
    };
  }, [sync]);

  const nudge = (direction: 1 | -1) => {
    const rail = railRef.current;
    if (!rail) return;
    /* Scroll by a little less than one viewport so the card at the edge stays
       partly visible — that overlap is what tells a reader the rail continues
       rather than ending. */
    rail.scrollBy({ left: direction * rail.clientWidth * 0.8, behavior: "smooth" });
  };

  return (
    <div className={cn("relative", className)}>
      <div
        ref={railRef}
        role="region"
        aria-label={label}
        tabIndex={0}
        /* Lenis must not intercept this: a horizontal rail inside a smooth
           vertical scroller otherwise fights the wheel handler. */
        data-lenis-prevent
        className="no-scrollbar flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth px-1 pb-4 pt-2"
      >
        {children}
      </div>

      {/* Edge fades, so cards dissolve at the rail's boundary instead of being
          chopped off by it. */}
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-y-0 left-0 w-16 bg-[linear-gradient(90deg,var(--color-void),transparent)] transition-opacity duration-300",
          atStart ? "opacity-0" : "opacity-100",
        )}
      />
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-y-0 right-0 w-16 bg-[linear-gradient(270deg,var(--color-void),transparent)] transition-opacity duration-300",
          atEnd ? "opacity-0" : "opacity-100",
        )}
      />

      <div className="mt-8 flex items-center justify-center gap-3">
        <RailButton
          direction="left"
          disabled={atStart}
          onClick={() => nudge(-1)}
        />
        <RailButton direction="right" disabled={atEnd} onClick={() => nudge(1)} />
      </div>
    </div>
  );
}

function RailButton({
  direction,
  disabled,
  onClick,
}: {
  direction: "left" | "right";
  disabled: boolean;
  onClick: () => void;
}) {
  const Icon = direction === "left" ? ChevronLeft : ChevronRight;
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={direction === "left" ? "Previous screens" : "Next screens"}
      className={cn(
        "grid size-11 place-items-center rounded-pill border border-hairline bg-carbon text-ash",
        "transition-[color,border-color,transform,opacity] duration-300 ease-glide",
        "hover:border-arc/55 hover:text-chalk active:scale-95",
        "disabled:pointer-events-none disabled:opacity-35",
      )}
    >
      <Icon aria-hidden className="size-5" />
    </button>
  );
}
