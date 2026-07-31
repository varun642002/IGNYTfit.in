import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export interface AccordionItem {
  question: string;
  answer: string;
}

/**
 * FAQ accordion built on native `<details>` / `<summary>`.
 *
 * A **server component** with no JavaScript at all. A client-side version
 * holding open/closed state means pages like `/contact` mount ten stateful
 * components — enough hydration work to show up in total blocking time on a
 * throttled mobile profile, to do something the browser already does.
 *
 * Native disclosure gives keyboard handling, correct ARIA semantics and
 * find-in-page support for free, and the answers stay in the DOM whether or not
 * a row is open, so they are always available to search engines.
 *
 * `name` makes the group exclusive — opening one row closes the others — in
 * browsers that support it. Elsewhere rows open independently, which is still a
 * perfectly good accordion.
 *
 * The marker is a plus that rotates into a minus, rather than a chevron: at
 * this size the 45° rotation is far more legible than a 180° flip, where the
 * before and after states look nearly identical.
 */
export function Accordion({
  items,
  className,
  /** Groups rows so only one opens at a time. Must be unique per accordion. */
  name,
}: {
  items: AccordionItem[];
  className?: string;
  name?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-2.5", className)}>
      {items.map((item) => (
        <details
          key={item.question}
          name={name}
          className={cn(
            "group overflow-hidden rounded-panel border border-hairline-soft bg-carbon/70",
            "transition-[border-color,background-color] duration-300 ease-glide",
            "hover:border-hairline hover:bg-carbon-2/70",
            "open:border-arc/35 open:bg-carbon-2/80",
          )}
        >
          <summary
            className={cn(
              "flex cursor-pointer items-center justify-between gap-5 px-5 py-4.5",
              // Hide the default disclosure triangle across engines.
              "list-none [&::-webkit-details-marker]:hidden",
            )}
          >
            <span className="text-[15.5px] font-semibold tracking-[-0.015em] text-chalk">
              {item.question}
            </span>
            <span className="grid size-7 shrink-0 place-items-center rounded-pill border border-hairline bg-void/60 text-ash transition-colors duration-300 group-open:border-arc/45 group-open:text-arc">
              <Plus
                aria-hidden
                className="size-3.5 transition-transform duration-300 ease-glide group-open:rotate-45"
                strokeWidth={2.6}
              />
            </span>
          </summary>

          <p className="px-5 pb-5 text-[14.5px] leading-[1.7] text-ash">
            {item.answer}
          </p>
        </details>
      ))}
    </div>
  );
}
