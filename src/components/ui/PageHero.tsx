import type { ReactNode } from "react";
import { Aurora } from "@/components/ui/Aurora";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
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

      <Container className="text-center">
        {/*
          Above-the-fold text renders directly, never inside a Reveal.

          A scroll reveal starts its children hidden and clears that on scroll;
          for a hero — which is already in view on load — that means the largest
          contentful paint is gated on something that may never fire. Only the
          call-to-action row below animates.
        */}
        <div className="mx-auto max-w-3xl">
          {eyebrow ? (
            <Eyebrow tone={tone} className="mb-6">
              {eyebrow}
            </Eyebrow>
          ) : null}

          <h1
            id="page-hero-heading"
            className="text-fade-down text-[clamp(2.4rem,6vw,4.15rem)] font-black leading-[1.04] tracking-[-0.04em]"
          >
            {title}
          </h1>

          {lead ? (
            <p className="mx-auto mt-7 max-w-2xl text-[16.5px] leading-[1.72] text-ash sm:text-[18px]">
              {lead}
            </p>
          ) : null}

          {children ? (
            <Reveal className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              {children}
            </Reveal>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
