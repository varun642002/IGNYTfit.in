import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { WordReveal } from "@/components/ui/WordReveal";
import { cn } from "@/lib/utils";

/**
 * Vertical rhythm for a page section.
 *
 * `id` does triple duty: anchor target, `aria-labelledby` hook, and the id the
 * heading derives its own from. Passing it means the section is a properly
 * labelled landmark, which is how a screen-reader user skims this page.
 *
 * Spacing is large and increases with viewport width. Generous vertical space
 * is most of what separates a product launch page from a documentation site,
 * and it is the first thing to get eroded — resist tightening these.
 */
export function Section({
  id,
  className,
  containerClassName,
  children,
  as = "section",
  wide = false,
  /** Skips content-visibility. Set on any section holding a pinned scene. */
  eager = false,
}: {
  id?: string;
  className?: string;
  containerClassName?: string;
  children: ReactNode;
  as?: "section" | "div";
  wide?: boolean;
  eager?: boolean;
}) {
  const Tag = as;
  return (
    <Tag
      id={id}
      aria-labelledby={id ? `${id}-heading` : undefined}
      className={cn(
        "relative py-24 sm:py-32 lg:py-40",
        !eager && "cv-auto",
        className,
      )}
    >
      <Container wide={wide} className={containerClassName}>
        {children}
      </Container>
    </Tag>
  );
}

/**
 * Eyebrow + title + optional lead, in the single arrangement used site-wide.
 *
 * The display sizes are `clamp()`ed rather than stepped through breakpoints, so
 * the heading scales continuously with the viewport instead of jumping at
 * arbitrary widths. `text-fade-down` gives long headings a subtle top-to-bottom
 * falloff, which reads as depth on a black page.
 */
export function SectionHeading({
  id,
  eyebrow,
  title,
  lead,
  align = "center",
  className,
  as: Tag = "h2",
  tone = "arc",
}: {
  /** Must match the parent Section's id so `aria-labelledby` resolves. */
  id?: string;
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: "center" | "left";
  className?: string;
  as?: "h1" | "h2";
  tone?: "arc" | "flare";
}) {
  return (
    <Reveal
      className={cn(
        align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl",
        className,
      )}
    >
      {eyebrow ? (
        <Eyebrow tone={tone} className="mb-5">
          {eyebrow}
        </Eyebrow>
      ) : null}

      {/*
        A plain-string heading is upgraded to the word-mask reveal
        automatically; anything containing JSX (a gradient span, a line break)
        is rendered as given, because it cannot be split on whitespace without
        destroying the markup.

        This is why the reveal is confined to marketing sections without anyone
        having to remember: the legal suite and the forms use their own heading
        markup and never go through SectionHeading at all.
      */}
      {typeof title === "string" ? (
        <WordReveal
          as={Tag}
          id={id ? `${id}-heading` : undefined}
          text={title}
          className={cn(
            "text-fade-down font-black leading-[1.04]",
            Tag === "h1"
              ? "text-[clamp(2.6rem,7vw,4.75rem)]"
              : "text-[clamp(2rem,4.8vw,3.35rem)]",
          )}
        />
      ) : (
        <Tag
          id={id ? `${id}-heading` : undefined}
          className={cn(
            "text-fade-down font-black leading-[1.04]",
            Tag === "h1"
              ? "text-[clamp(2.6rem,7vw,4.75rem)]"
              : "text-[clamp(2rem,4.8vw,3.35rem)]",
          )}
        >
          {title}
        </Tag>
      )}

      {lead ? (
        <p
          className={cn(
            "mt-6 text-[16px] leading-[1.7] text-ash sm:text-[18px]",
            align === "center" && "mx-auto max-w-2xl",
          )}
        >
          {lead}
        </p>
      ) : null}
    </Reveal>
  );
}
