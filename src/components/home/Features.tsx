import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Aurora } from "@/components/ui/Aurora";
import { RevealItem } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Spotlight } from "@/components/ui/Spotlight";
import { Surface } from "@/components/ui/Surface";
import { ACCENT_CLASSES, features } from "@/lib/features";
import { cn } from "@/lib/utils";

/**
 * The full capability grid.
 *
 * Every card links to its own anchor on `/features`, so this doubles as the
 * site's index of what the product does — which is the thing a visitor
 * evaluating a fitness app actually came to find out.
 *
 * The hover treatment is a cursor-following spotlight rather than a lift plus a
 * border colour. With eighteen cards in view a per-card lift makes the grid
 * ripple as the pointer crosses it; a light that follows the cursor reads as
 * one surface being lit rather than eighteen objects reacting.
 */
export function Features() {
  return (
    <Section id="features" className="relative scroll-mt-24">
      <Aurora tone="flare" className="opacity-60" />

      <SectionHeading
        id="features"
        eyebrow="Everything it tracks"
        tone="flare"
        title="One app instead of five"
        lead="Training, nutrition, body composition and the platform features that hold them together. No feature here is a placeholder — each one ships in the current release."
        className="mb-16"
      />

      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, index) => {
          const accent = ACCENT_CLASSES[feature.accent];
          const Icon = feature.icon;

          return (
            <RevealItem as="li" key={feature.id} index={index % 3}>
              <Spotlight
                tone={feature.accent === "flare" ? "flare" : "arc"}
                className="h-full rounded-card"
              >
                <Surface
                  as={Link}
                  interactive
                  href={`/features#${feature.id}`}
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
                      <Icon aria-hidden className="size-5" strokeWidth={2} />
                    </span>
                    <ArrowUpRight
                      aria-hidden
                      className="size-4 shrink-0 text-ash-dim transition-[color,transform] duration-300 ease-glide group-hover/spot:-translate-y-0.5 group-hover/spot:translate-x-0.5 group-hover/spot:text-chalk"
                    />
                  </div>

                  <h3 className="mt-5 text-[17.5px] font-bold tracking-[-0.02em] text-chalk">
                    {feature.title}
                  </h3>
                  <p className="mt-2.5 text-[14.5px] leading-[1.65] text-ash">
                    {feature.description}
                  </p>
                </Surface>
              </Spotlight>
            </RevealItem>
          );
        })}
      </ul>
    </Section>
  );
}
