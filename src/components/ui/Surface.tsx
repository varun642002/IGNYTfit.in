import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * The card.
 *
 * One component, because a site with four subtly different card treatments
 * looks like a site nobody was in charge of. Depth comes from the `.plane`
 * utility — a 1px inset white line along the top edge plus a long soft drop
 * shadow — which is what stops a charcoal rectangle on a black page reading as
 * a plain div.
 *
 * `lit` adds a single graded hairline in the accent colour, as though the arc
 * is grazing one corner. Use it on the two or three cards in a grid that
 * deserve emphasis, never on all of them.
 */
export function Surface({
  children,
  className,
  as: Tag = "div",
  lit,
  interactive = false,
  ...rest
}: {
  children: ReactNode;
  className?: string;
  /** Render as something else — `Link`, `article`, `li`, `button`. */
  as?: ElementType;
  /** Graded accent hairline around the card. */
  lit?: "arc" | "flare";
  /** Adds the hover lift. Only for cards that are themselves a link or button. */
  interactive?: boolean;
} & Omit<ComponentPropsWithoutRef<"div">, "className" | "children"> & {
    /* Present so a caller can render this as a link without a cast. Anything
       else it needs — `target`, `rel`, `aria-*` — rides along in `rest`. */
    href?: string;
  }) {
  return (
    <Tag
      {...rest}
      className={cn(
        "plane relative rounded-card",
        lit === "arc" && "edge-arc",
        lit === "flare" && "edge-flare",
        interactive &&
          cn(
            "transition-[transform,border-color,box-shadow] duration-500 ease-glide",
            "hover:-translate-y-1 hover:border-hairline",
            "hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.10),0_1px_2px_0_rgb(0_0_0/0.9),0_36px_80px_-40px_rgb(0_0_0/1)]",
          ),
        className,
      )}
    >
      {children}
    </Tag>
  );
}
