import {
  BarChart3,
  CloudUpload,
  HeartPulse,
  Infinity as InfinityIcon,
  ShieldCheck,
  Target,
  type LucideIcon,
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import { cn } from "@/lib/utils";

/**
 * Why the app is worth trusting, as opposed to what it does.
 *
 * `CoreFeatures` answers "what does it track"; this answers "why would I let it
 * near my health data", which is the question an OAuth reviewer and a
 * privacy-minded user are both actually asking. Each claim here is one the app
 * can substantiate — nothing aspirational.
 */
interface Reason {
  title: string;
  detail: string;
  Icon: LucideIcon;
  accent: "ember" | "pulse" | "cyan" | "good" | "warn";
}

const ACCENTS = {
  ember: "text-ember bg-ember/12 border-ember/25",
  pulse: "text-pulse-strong bg-pulse/12 border-pulse/25",
  cyan: "text-cyan bg-cyan/12 border-cyan/25",
  good: "text-good bg-good/12 border-good/25",
  warn: "text-warn bg-warn/12 border-warn/25",
} as const;

const REASONS: Reason[] = [
  {
    title: "Accurate Tracking",
    detail:
      "Nutrition figures come from a curated food catalogue, and every logged entry stores its own snapshot — so correcting a food later never rewrites the history of what you already ate.",
    Icon: Target,
    accent: "ember",
  },
  {
    title: "Privacy Focused",
    detail:
      "Your data is stored on your device by default. No advertising, no ad-tracking SDKs, no third-party analytics, and your health data is never sold.",
    Icon: ShieldCheck,
    accent: "good",
  },
  {
    title: "Google Health Connect Integration",
    detail:
      "Supported health and fitness data synchronises through Google Health Connect only after you grant permission, only for the data types the features you use require, and only for as long as you allow it.",
    Icon: HeartPulse,
    accent: "pulse",
  },
  {
    title: "Modern Analytics",
    detail:
      "Weight trends, training volume, weekly progress and body measurements are charted from the moment you log them — no spreadsheet, no manual export.",
    Icon: BarChart3,
    accent: "cyan",
  },
  {
    title: "Secure Cloud Sync",
    detail:
      "Optional and off by default. Turn it on and your data follows you to a new device, protected by your account and rules that restrict every user's data to that user alone.",
    Icon: CloudUpload,
    accent: "pulse",
  },
  {
    title: "Designed for Long-Term Fitness Success",
    detail:
      "Habits, streaks, personal records and progress photos are built for the months after motivation runs out — the point at which most tracking apps get deleted.",
    Icon: InfinityIcon,
    accent: "warn",
  },
];

export function WhyChoose() {
  return (
    <Section id="why-ignyt">
      <SectionHeading
        id="why-ignyt"
        eyebrow="Why IGNYT"
        title={
          <>
            Why Choose <span className="text-gradient">IGNYT</span>?
          </>
        }
        lead="Six reasons the app is built the way it is — and what each one means in practice."
      />

      <RevealGroup
        as="ul"
        className="mt-14 grid list-none gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {REASONS.map((reason, revealIndex) => (
          <RevealItem
            index={revealIndex}
            as="li"
            key={reason.title}
            className="h-full"
          >
            <Card className="h-full p-6">
              <span
                className={cn(
                  "grid size-11 place-items-center rounded-tile border",
                  ACCENTS[reason.accent],
                )}
              >
                <reason.Icon
                  aria-hidden
                  className="size-[21px]"
                  strokeWidth={2.1}
                />
              </span>
              <h3 className="mt-5 text-[16.5px] font-bold text-text">
                {reason.title}
              </h3>
              <p className="mt-2 text-[14px] leading-relaxed text-text-mute">
                {reason.detail}
              </p>
            </Card>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
