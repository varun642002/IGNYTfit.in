import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * The site's single horizontal measure.
 *
 * Every full-width section paints its own background and then puts a Container
 * inside it, so content lines up all the way down the page while backgrounds
 * still bleed edge to edge. Nothing else should set a max-width.
 *
 * `wide` exists for the two layouts that genuinely need the extra room — the
 * screenshot rail and the feature mosaic — and for nothing else.
 */
export function Container({
  as: Tag = "div",
  className,
  children,
  wide = false,
}: {
  as?: ElementType;
  className?: string;
  children: ReactNode;
  wide?: boolean;
}) {
  return (
    <Tag
      className={cn(
        "mx-auto w-full px-5 sm:px-8",
        wide ? "max-w-[1440px]" : "max-w-[1180px]",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
