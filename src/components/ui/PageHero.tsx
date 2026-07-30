import type { CSSProperties, ReactNode } from "react";
import { Aurora } from "@/components/ui/Aurora";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Particles } from "@/components/ui/Particles";
import { cn } from "@/lib/utils";

/**
 * The hero for every page except the home page.
 *
 * One component means the eyebrow, heading scale, lead width, grid field and
 * ambient light are identical across /features, /screenshots, /about,
 * /contact, /download and the whole legal suite — the sort of consistency that
 * is otherwise extremely easy to lose one page at a time.
 *
 * The faint grid behind it is the only texture on the site. It is masked to an
 * ellipse so it never reaches the edges, which keeps it reading as depth rather
 * than as a pattern.
 */
export function PageHero({
  eyebrow,
  title,
  lead,
  children,
  className,
  tone = "arc",
}: {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  /** Buttons or badges rendered under the lead. */
  children?: ReactNode;
  className?: string;
  tone?: "arc" | "flare";
}) {
  return (
    <section
      aria-labelledby="page-hero-heading"
      className={cn(
        "relative overflow-hidden border-b border-hairline-soft py-24 sm:py-32",
        className,
      )}
    >
      <Aurora tone={tone} drift={false} />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage:
            "radial-gradient(ellipse 78% 68% at 50% 28%, #000 18%, transparent 74%)",
        }}
      />

      {/* The same drifting ember field as the home hero. Renders nothing below
          the "full" motion tier, so a low-power device or a reduced-motion
          preference pays nothing for it. */}
      <Particles className="pointer-events-none absolute inset-0 -z-10 size-full" count={30} />

      <Container className="text-center">
        {/*
          The staged entrance from the home page, applied here so every page
          opens the same way: eyebrow, heading, lead, then the actions, each
          90ms after the last.

          `.stage` is a plain CSS animation on load — NOT a scroll reveal. That
          distinction is load-bearing for a hero: a scroll reveal starts its
          children hidden and clears that only when the element enters the
          viewport, which for content already in view on load means the largest
          contentful paint waits on something that may never fire. This plays
          during first paint instead.
        */}
        <div className="mx-auto max-w-3xl">
          {eyebrow ? (
            <div className="stage" style={{ "--d": 0 } as CSSProperties}>
              <Eyebrow tone={tone} className="mb-6">
                {eyebrow}
              </Eyebrow>
            </div>
          ) : null}

          <h1
            id="page-hero-heading"
            className="stage text-fade-down text-[clamp(2.4rem,6vw,4.15rem)] font-black leading-[1.04] tracking-[-0.04em]"
            style={{ "--d": 1 } as CSSProperties}
          >
            {title}
          </h1>

          {lead ? (
            <p
              className="stage mx-auto mt-7 max-w-2xl text-[16.5px] leading-[1.72] text-ash sm:text-[18px]"
              style={{ "--d": 2 } as CSSProperties}
            >
              {lead}
            </p>
          ) : null}

          {children ? (
            <div
              className="stage mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
              style={{ "--d": 3 } as CSSProperties}
            >
              {children}
            </div>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
