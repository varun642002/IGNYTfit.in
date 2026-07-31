import {
  Boxes,
  Download,
  HeartPulse,
  LineChart,
  Lock,
  Zap,
} from "lucide-react";
import { Aurora } from "@/components/ui/Aurora";
import { RevealItem } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Surface } from "@/components/ui/Surface";
import { cn } from "@/lib/utils";

/**
 * Why IGNYT.
 *
 * Six claims, each written so it can be argued with. "Fast performance" is a
 * slogan; "search returns from a database on the device, so aeroplane mode
 * changes nothing" is a statement that is either true or false — and it is
 * true, which is the only reason it is here.
 *
 * The layout is an asymmetric mosaic rather than a six-up grid: the first card
 * spans two columns, because "everything in one app" is the argument the other
 * five support and it should not look like a peer of them.
 */
const REASONS = [
  {
    id: "one-app",
    icon: Boxes,
    title: "Everything in one app",
    body: "Training, food, macros, micronutrients, fasting, hydration, supplements, weight, measurements and progress — logged in one place, against one set of targets. Most people run four apps that each know a quarter of the picture and none of which can do the arithmetic across it.",
    span: true,
    accent: "flare" as const,
  },
  {
    id: "analytics",
    icon: LineChart,
    title: "Analytics that answer something",
    body: "Twelve weeks of training volume, a smoothed 90-day weight trend, protein per kilogram of bodyweight, adherence scored against your actual plan.",
    accent: "arc" as const,
  },
  {
    id: "health-connect",
    icon: HeartPulse,
    title: "Real Health Connect",
    body: "17 data types read through Android's own layer, each permission granted separately, exchanged on-device. Deny one and the rest still sync.",
    accent: "arc" as const,
  },
  {
    id: "fast",
    icon: Zap,
    title: "Fast because it is local",
    body: "Food search reads a database on the device, not an API. That is why it returns instantly in a basement gym, and why it never shows a spinner between sets.",
    accent: "flare" as const,
  },
  {
    id: "secure",
    icon: Lock,
    title: "Your data stays yours",
    body: "Cloud backup is opt-in and off by default. Nothing is sold, nothing is shared with data brokers, and nothing trains a model. Export to JSON or CSV whenever you like.",
    accent: "arc" as const,
  },
  {
    id: "long-term",
    icon: Download,
    title: "Designed for the long run",
    body: "Streaks, records and twelve-week blocks — the units fitness actually happens in. Built to still be useful in a year, not to be impressive in a week.",
    accent: "flare" as const,
  },
];

export function WhyIgnyt() {
  return (
    <Section id="why" className="relative scroll-mt-24">
      <Aurora tone="arc" className="opacity-50" />

      <SectionHeading
        id="why"
        eyebrow="Why IGNYT"
        title="Six reasons, all checkable"
        lead="Nothing on this list is a feeling. Each one describes something the application does, in terms specific enough to be wrong."
        className="mb-16"
      />

      <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {REASONS.map((reason, index) => {
          const Icon = reason.icon;
          const isFlare = reason.accent === "flare";

          return (
            <RevealItem
              as="li"
              key={reason.id}
              index={index % 3}
              className={cn(reason.span && "lg:col-span-2")}
            >
              <Surface
                lit={reason.span ? "flare" : undefined}
                className="flex h-full flex-col p-7 sm:p-8"
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
                    "mt-6 font-black tracking-[-0.025em] text-chalk",
                    reason.span ? "text-[24px] sm:text-[28px]" : "text-[19px]",
                  )}
                >
                  {reason.title}
                </h3>

                <p
                  className={cn(
                    "mt-3.5 leading-[1.7] text-ash",
                    reason.span ? "max-w-2xl text-[16px]" : "text-[14.5px]",
                  )}
                >
                  {reason.body}
                </p>
              </Surface>
            </RevealItem>
          );
        })}
      </ul>
    </Section>
  );
}
