import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Scroll reveals — implemented entirely in CSS.
 *
 * These are **server components**. There is no `"use client"`, no
 * IntersectionObserver and no animation library: the motion comes from a
 * scroll-driven CSS animation (`animation-timeline: view()`) declared in
 * globals.css, which the compositor runs without touching the main thread.
 *
 * That matters more than it sounds. A `whileInView` implementation pulls the
 * animation runtime into the initial bundle of every route that reveals
 * anything, and server-renders each wrapper at `opacity: 0` — so everything
 * below the fold waits on hydration before it can be seen at all, and with
 * scripting disabled it is never seen. Framer Motion is used heavily elsewhere
 * on this site, but for work that genuinely needs a runtime: gestures, pointer
 * tracking, layout animation. Not for "appear on scroll".
 *
 * Browsers without `animation-timeline`, and anyone who has asked for reduced
 * motion, simply see the content — the hidden start state lives inside the
 * `@supports` block, so unsupported degrades to visible rather than to blank.
 */

type Direction = "up" | "left" | "right" | "scale" | "none";

const DIRECTION_CLASS: Record<Direction, string> = {
  up: "",
  left: "rise-l",
  right: "rise-r",
  scale: "rise-scale",
  none: "",
};

/** Tags the wrappers may render as, so list and section semantics stay valid. */
type RevealTag =
  | "div"
  | "ul"
  | "ol"
  | "li"
  | "section"
  | "article"
  | "header"
  | "figure";

export function Reveal({
  children,
  direction = "up",
  className,
  as: Tag = "div",
}: {
  children: ReactNode;
  direction?: Direction;
  className?: string;
  as?: RevealTag;
}) {
  return (
    <Tag className={cn("rise", DIRECTION_CLASS[direction], className)}>
      {children}
    </Tag>
  );
}

/**
 * Parent for a staggered set. Purely a layout element — the stagger is produced
 * by each child's own scroll range rather than by a shared orchestrator, so
 * there is nothing here to coordinate.
 */
export function RevealGroup({
  children,
  className,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: RevealTag;
}) {
  return <Tag className={className}>{children}</Tag>;
}

/**
 * One staggered child.
 *
 * The stagger is a scroll offset, not a delay: `--i` widens this item's
 * animation range so it settles slightly after the one before it. Tying the
 * sequence to scroll position rather than to the clock means it follows the
 * reader's own pace — scroll slowly and it unfolds slowly; flick past and it is
 * already finished rather than still playing catch-up.
 *
 * The index is capped because beyond about ten steps the offset stops reading
 * as rhythm and starts reading as a card that will not load.
 */
export function RevealItem({
  children,
  className,
  index = 0,
  direction = "up",
  as: Tag = "div",
  style,
}: {
  children: ReactNode;
  className?: string;
  index?: number;
  direction?: Direction;
  as?: RevealTag;
  style?: CSSProperties;
}) {
  return (
    <Tag
      className={cn("rise-item", DIRECTION_CLASS[direction], className)}
      style={{ ...style, "--i": Math.min(index, 10) } as CSSProperties}
    >
      {children}
    </Tag>
  );
}
