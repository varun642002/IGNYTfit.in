import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ScreenRail } from "@/components/screenshots/ScreenRail";
import { Aurora } from "@/components/ui/Aurora";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/Section";
import { Spotlight } from "@/components/ui/Spotlight";
import { Surface } from "@/components/ui/Surface";
import { ACCENT_CLASSES, features } from "@/lib/features";
import { cn } from "@/lib/utils";

/**
 * The capability rail.
 *
 * Twenty-five features as a static three-column grid was nine rows of identical
 * cards — a wall the reader scrolls past rather than reads. It is now a
 * horizontal rail: two rows deep, swiped sideways, with the cards sized so the
 * next one is always half-visible at the edge. That overlap is what tells you
 * there is more without needing a label to say so.
 *
 * The scrolling is native — `scroll-snap-type: x mandatory` on a real
 * overflow container — so touch momentum, keyboard, trackpad and screen-reader
 * focus all behave correctly. <ScreenRail> adds only the arrow buttons and
 * their disabled states, which is the one thing native scrolling does not
 * provide for a mouse.
 *
 * `grid-flow-col` with two rows is what makes it two-deep: cards fill downward
 * then across, so the DOM order still reads sensibly for anyone tabbing through
 * it.
 */
export function Features() {
  return (
    <section
      id="features"
      aria-labelledby="features-heading"
      className="cv-auto relative scroll-mt-24 py-16 sm:py-32 lg:py-40"
    >
      <Aurora tone="flare" className="opacity-60" />

      <Container>
        <SectionHeading
          id="features"
          eyebrow="Everything it tracks"
          tone="flare"
          title="One app instead of five"
          lead="Training, nutrition, body composition and the platform features that hold them together. No feature here is a placeholder — each one ships in the current release."
          className="mb-14"
        />
      </Container>

      {/* Full-bleed: the rail runs off both edges of the page, with the
          container's gutter as its padding so the first card still lines up
          with the heading above it. */}
      <div className="px-5 sm:px-8">
        <div className="mx-auto max-w-[1440px]">
          <ScreenRail label="IGNYT features">
            <ul className="grid grid-flow-col grid-rows-2 gap-4">
              {features.map((feature) => {
                const accent = ACCENT_CLASSES[feature.accent];
                const Icon = feature.icon;

                return (
                  <li
                    key={feature.id}
                    className="w-[264px] shrink-0 snap-start sm:w-[292px]"
                  >
                    <Spotlight
                      tone={feature.accent === "flare" ? "flare" : "arc"}
                      className="h-full rounded-card"
                    >
                      <Surface
                        as={Link}
                        interactive
                        href="/features"
                        className="flex h-full flex-col p-6"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <span
                            className={cn(
                              "grid size-11 shrink-0 place-items-center rounded-panel border",
                              accent.bg,
                              accent.border,
                              accent.text,
                            )}
                          >
                            <Icon
                              aria-hidden
                              className="size-5"
                              strokeWidth={2}
                            />
                          </span>
                          <ArrowUpRight
                            aria-hidden
                            className="size-4 shrink-0 text-ash-dim transition-[color,transform] duration-300 ease-glide group-hover/spot:-translate-y-0.5 group-hover/spot:translate-x-0.5 group-hover/spot:text-chalk"
                          />
                        </div>

                        <h3 className="mt-5 text-[17px] font-bold tracking-[-0.02em] text-chalk">
                          {feature.title}
                        </h3>
                        <p className="mt-2.5 text-[14px] leading-[1.6] text-ash">
                          {feature.description}
                        </p>
                      </Surface>
                    </Spotlight>
                  </li>
                );
              })}
            </ul>
          </ScreenRail>
        </div>
      </div>

      <Container>
        <Reveal className="mt-2 text-center">
          <Link
            href="/features"
            className="inline-flex min-h-11 items-center gap-2 text-[15px] font-semibold text-flare transition-colors hover:text-flare-bright"
          >
            See all {features.length} features
            <ArrowUpRight aria-hidden className="size-4" />
          </Link>
        </Reveal>
      </Container>
    </section>
  );
}
