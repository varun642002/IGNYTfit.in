import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * The button set.
 *
 * Four variants, and the restraint is the point: `flare` is the one warm
 * element on any given screen, so it is reserved for the single most important
 * action on a page — download, and nothing else. Two orange buttons in one
 * viewport means neither is the primary action.
 *
 * Every variant carries a specular sweep on hover: a soft white band that
 * crosses the surface once. It is a pseudo-element driven by `background-
 * position`, so it composites without a repaint, and it is what makes a flat
 * filled rectangle read as a physical, lit object.
 */

type Variant = "flare" | "arc" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

const VARIANTS: Record<Variant, string> = {
  /* The primary action. Deep orange with a lit top edge — the gradient runs
     bright-to-deep downward so the button looks lit from above, matching the
     highlight on every raised surface on the site. */
  flare: cn(
    "bg-[linear-gradient(180deg,var(--color-flare-bright),var(--color-flare)_46%,var(--color-flare-deep))]",
    "text-[#200800]",
    "shadow-[0_12px_38px_-14px_rgba(255,106,26,0.9),inset_0_1px_0_0_rgba(255,255,255,0.4)]",
    "hover:shadow-[0_18px_50px_-14px_rgba(255,106,26,1),inset_0_1px_0_0_rgba(255,255,255,0.55)]",
    "hover:brightness-[1.06]",
  ),
  /* Structural actions: explore, view, continue. */
  arc: cn(
    "bg-[linear-gradient(180deg,var(--color-arc-bright),var(--color-arc)_48%,var(--color-arc-deep))]",
    "text-[#00102e]",
    "shadow-[0_12px_38px_-14px_rgba(61,123,255,0.85),inset_0_1px_0_0_rgba(255,255,255,0.4)]",
    "hover:shadow-[0_18px_50px_-14px_rgba(61,123,255,1),inset_0_1px_0_0_rgba(255,255,255,0.55)]",
    "hover:brightness-[1.06]",
  ),
  outline: cn(
    "border border-hairline bg-carbon/70 text-chalk backdrop-blur-xl",
    "hover:border-arc/55 hover:bg-carbon-2/80",
  ),
  ghost: "text-ash hover:text-chalk",
};

const SIZES: Record<Size, string> = {
  sm: "h-10 px-4 text-[13.5px]",
  md: "h-12 px-6 text-[15px]",
  lg: "h-[58px] px-8 text-[16px]",
};

const BASE = cn(
  "group/btn relative isolate inline-flex select-none items-center justify-center gap-2",
  "overflow-hidden rounded-pill font-semibold tracking-[-0.01em]",
  "transition-[transform,box-shadow,background-color,border-color,filter]",
  "duration-300 ease-glide will-change-transform",
  "hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.985]",
  "disabled:pointer-events-none disabled:opacity-55",
  // The specular sweep. `translate-x` on a skewed gradient band, so it is a
  // single composited transform rather than a background repaint.
  "before:pointer-events-none before:absolute before:inset-y-0 before:-left-full before:-z-10 before:w-1/2",
  "before:skew-x-[-20deg] before:bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.28),transparent)]",
  "before:transition-transform before:duration-700 before:ease-glide",
  "hover:before:translate-x-[400%] motion-reduce:before:hidden",
);

interface CommonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
}

/**
 * A link styled as a button.
 *
 * `next/link` for internal routes, so Next prefetches them on viewport entry;
 * a plain anchor for external ones, where `rel="noopener noreferrer"` and the
 * new-tab behaviour matter.
 */
export function ButtonLink({
  href,
  variant = "flare",
  size = "md",
  className,
  children,
  ...rest
}: CommonProps &
  Omit<ComponentPropsWithoutRef<"a">, "href" | "className" | "children"> & {
    href: string;
  }) {
  const classes = cn(BASE, VARIANTS[variant], SIZES[size], className);
  const isExternal = /^https?:\/\//.test(href);

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
        {...rest}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...rest}>
      {children}
    </Link>
  );
}

export function Button({
  variant = "flare",
  size = "md",
  className,
  children,
  type = "button",
  ...rest
}: CommonProps &
  Omit<ComponentPropsWithoutRef<"button">, "className" | "children">) {
  return (
    <button
      type={type}
      className={cn(BASE, VARIANTS[variant], SIZES[size], className)}
      {...rest}
    >
      {children}
    </button>
  );
}
