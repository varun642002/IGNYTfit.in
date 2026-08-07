import { Aurora, Seam } from "@/components/ui/Aurora";
import { Container } from "@/components/ui/Container";
import { Counter } from "@/components/ui/Counter";
import { RevealItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/Section";
import { headlineMetrics, supportingFacts } from "@/lib/metrics";

/**
 * The numbers.
 *
 * Every figure is a checkable property of the shipped product — see the note in
 * `lib/metrics.ts` for why there are no install counts or "meals logged"
 * totals here, and why that is a deliberate decision rather than a gap.
 *
 * Each counter carries the evidence for its own number directly underneath it.
 * A large numeral with no way to verify it is the least trustworthy thing a
 * product page can display, and saying where it comes from costs one line.
 */
export function Stats() {
  return (
    <section
      id="stats"
      aria-labelledby="stats-heading"
      className="cv-auto relative border-y border-hairline-soft bg-void-2 py-16 sm:py-32"
    >
      <Seam tone="flare" />
      <Aurora tone="flare" className="opacity-45" drift={false} />

      <Container>
        <SectionHeading
          id="stats"
          eyebrow="By the numbers"
          tone="flare"
          title="Facts you can check"
          lead="Install counts and uptime percentages are easy to print and impossible to verify. These are properties of the application itself — open it and count them."
          className="mb-16"
        />

        <ul className="grid gap-px overflow-hidden rounded-card border border-hairline bg-hairline sm:grid-cols-2 lg:grid-cols-4">
          {headlineMetrics.map((metric, index) => (
            <RevealItem
              as="li"
              key={metric.label}
              index={index}
              className="flex flex-col justify-between gap-5 bg-carbon p-7 sm:p-8"
            >
              <Counter
                value={metric.value}
                prefix={metric.prefix}
                suffix={metric.suffix}
                className="text-flare-gradient block text-[clamp(2.6rem,6vw,3.6rem)] font-black leading-none tracking-[-0.04em]"
              />
              <div>
                <p className="text-[15.5px] font-bold tracking-[-0.015em] text-chalk">
                  {metric.label}
                </p>
                <p className="mt-2 text-[13px] leading-[1.55] text-ash-dim">
                  {metric.evidence}
                </p>
              </div>
            </RevealItem>
          ))}
        </ul>

        {/* Supporting facts as a plain row. These are answers, not achievements,
            so they get typography rather than counters. */}
        <ul className="mt-10 flex flex-wrap justify-center gap-x-10 gap-y-5">
          {supportingFacts.map((fact) => (
            <li key={fact.label} className="text-center">
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-ash-dim">
                {fact.label}
              </p>
              <p className="mt-1.5 text-[17px] font-bold text-chalk" data-numeric>
                {fact.value}
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
