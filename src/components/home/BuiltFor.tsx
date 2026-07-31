import { Aurora } from "@/components/ui/Aurora";
import { RevealItem } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Spotlight } from "@/components/ui/Spotlight";
import { Surface } from "@/components/ui/Surface";
import { audiences } from "@/lib/audiences";
import { cn } from "@/lib/utils";

/**
 * Built for.
 *
 * This section stands where a testimonial wall normally goes. IGNYT has no
 * published reviews to quote, and writing named users with invented praise
 * would be fabricating evidence on the page Google's OAuth reviewer reads — see
 * the note at the top of `lib/audiences.ts`.
 *
 * It also happens to answer a question the testimonials could not. OAuth
 * verification asks the home page to say who the application is for, and this
 * says it directly, six times over, in the reader's own situation rather than
 * in a demographic.
 *
 * Each card is a problem followed by the specific capability that answers it.
 * The problem is set in white and the answer in grey, so the eye lands on the
 * situation first — which is the one a reader recognises themselves in.
 */
export function BuiltFor() {
  return (
    <Section id="built-for" className="relative">
      <Aurora tone="mixed" className="opacity-55" />

      <SectionHeading
        id="built-for"
        eyebrow="Built for"
        title="Who this is actually for"
        lead="IGNYT is not trying to be everybody's fitness app. It is built around six specific situations, and it is unusually good in each of them."
        className="mb-16"
      />

      <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {audiences.map((audience, index) => {
          const Icon = audience.icon;
          const isFlare = audience.accent === "flare";

          return (
            <RevealItem as="li" key={audience.id} index={index % 3}>
              <Spotlight
                tone={audience.accent}
                className="h-full rounded-card"
              >
                <Surface
                  lit={index === 0 || index === 5 ? audience.accent : undefined}
                  className="flex h-full flex-col p-7"
                >
                  <span
                    className={cn(
                      "grid size-11 place-items-center rounded-panel border",
                      isFlare
                        ? "border-flare/30 bg-flare/12 text-flare"
                        : "border-arc/30 bg-arc/12 text-arc-bright",
                    )}
                  >
                    <Icon aria-hidden className="size-5" strokeWidth={2} />
                  </span>

                  <h3
                    className={cn(
                      "mt-6 text-[12px] font-bold uppercase tracking-[0.18em]",
                      isFlare ? "text-flare" : "text-arc",
                    )}
                  >
                    {audience.who}
                  </h3>

                  <p className="mt-3.5 text-[16px] font-semibold leading-[1.55] tracking-[-0.015em] text-chalk">
                    {audience.situation}
                  </p>

                  <p className="mt-4 text-[14.5px] leading-[1.68] text-ash">
                    {audience.answer}
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
