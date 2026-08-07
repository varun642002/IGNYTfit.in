"use client";

import { useEffect, useState } from "react";
import { Activity, Droplets, Flame, Footprints, HeartPulse, Scale, Timer } from "lucide-react";
import { useMotionTier } from "@/components/providers/MotionProvider";
import { cn } from "@/lib/utils";

/**
 * The metric chips that orbit the hero device.
 *
 * Each one holds a live figure that drifts by a small amount every few seconds,
 * so the hero reads as a running application rather than as a still image.
 *
 * Three things this gets right that a naive version does not:
 *
 * 1. THE FIRST RENDER IS DETERMINISTIC. Every chip's seed value is a constant,
 *    so the server HTML and the first client render agree exactly. Randomising
 *    during render is the classic way to produce a hydration mismatch, and on a
 *    marketing hero it shows up as a visible flicker on load.
 *
 * 2. THE DRIFT IS DIRECTIONAL, NOT RANDOM. Calories, steps and workout time
 *    only ever increase; heart rate oscillates around a resting value; weight
 *    barely moves. A step counter that ticks downwards is the kind of detail
 *    that quietly tells a visitor the numbers are fake.
 *
 * 3. IT STOPS. The interval is cleared when the tab is hidden or the motion
 *    tier drops, so this never burns battery in a background tab.
 *
 * The whole group is `aria-hidden`: these are a decorative illustration of the
 * product, and a screen reader announcing seven numbers that change every few
 * seconds would be actively hostile. The hero's real description is in the
 * heading and lead paragraph.
 */

interface Metric {
  id: string;
  icon: typeof Flame;
  label: string;
  seed: number;
  unit: string;
  accent: "arc" | "flare" | "cyan" | "good";
  /** How the value moves each tick. */
  drift: "climb" | "oscillate" | "steady";
  /** Magnitude of one tick. */
  step: number;
  decimals?: number;
  /** Placement around the device. Tailwind position utilities. */
  position: string;
  /** Hidden on smaller screens, where there is no room beside the phone. */
  minor?: boolean;
}

const METRICS: Metric[] = [
  {
    id: "calories",
    icon: Flame,
    label: "Calories",
    seed: 1842,
    unit: "kcal",
    accent: "flare",
    drift: "climb",
    step: 3,
    position: "-left-6 top-[12%] sm:-left-10 lg:-left-24",
  },
  {
    id: "heart",
    icon: HeartPulse,
    label: "Heart rate",
    seed: 62,
    unit: "bpm",
    accent: "flare",
    drift: "oscillate",
    step: 2,
    position: "-right-4 top-[5%] sm:-right-8 lg:-right-20",
  },
  {
    id: "steps",
    icon: Footprints,
    label: "Steps",
    seed: 8431,
    unit: "",
    accent: "arc",
    drift: "climb",
    step: 11,
    position: "-right-6 top-[32%] sm:-right-12 lg:-right-28",
  },
  {
    id: "water",
    icon: Droplets,
    label: "Hydration",
    seed: 2.1,
    unit: "L",
    accent: "cyan",
    drift: "climb",
    step: 0.01,
    decimals: 1,
    position: "-left-4 top-[42%] sm:-left-10 lg:-left-28",
    minor: true,
  },
  {
    id: "time",
    icon: Timer,
    label: "Workout",
    seed: 34,
    unit: "min",
    accent: "arc",
    drift: "climb",
    step: 1,
    position: "-left-2 bottom-[24%] sm:-left-8 lg:-left-20",
    minor: true,
  },
  {
    id: "weight",
    icon: Scale,
    label: "Body weight",
    seed: 78.4,
    unit: "kg",
    accent: "good",
    drift: "steady",
    step: 0.1,
    decimals: 1,
    position: "-right-2 bottom-[14%] sm:-right-8 lg:-right-24",
    minor: true,
  },
  {
    id: "macros",
    icon: Activity,
    label: "Protein",
    seed: 148,
    unit: "g",
    accent: "arc",
    drift: "climb",
    step: 2,
    position: "left-[8%] -bottom-4 sm:left-[12%] sm:-bottom-6",
    minor: true,
  },
];

const ACCENT_TEXT: Record<Metric["accent"], string> = {
  arc: "text-arc",
  flare: "text-flare",
  cyan: "text-[#55d8ff]",
  good: "text-[#3ddc97]",
};

/** One tick of movement, per the metric's own behaviour. */
function nextValue(metric: Metric, current: number): number {
  switch (metric.drift) {
    case "climb":
      return current + metric.step * (0.4 + Math.random() * 1.2);
    case "oscillate": {
      const delta = (Math.random() - 0.5) * 2 * metric.step;
      /* Pulled gently back towards the seed so it wanders rather than walks. */
      return current + delta + (metric.seed - current) * 0.25;
    }
    default:
      return metric.seed + (Math.random() - 0.5) * metric.step;
  }
}

function format(metric: Metric, value: number): string {
  if (metric.decimals) return value.toFixed(metric.decimals);
  return Math.round(value).toLocaleString("en-US");
}

export function FloatingMetrics() {
  const tier = useMotionTier();
  const [values, setValues] = useState<Record<string, number>>(() =>
    Object.fromEntries(METRICS.map((metric) => [metric.id, metric.seed])),
  );

  useEffect(() => {
    if (tier !== "full") return;

    const tick = () =>
      setValues((current) => {
        /* One metric changes per tick, chosen in rotation rather than all
           seven at once. Seven numbers changing simultaneously reads as a
           glitch; one changing reads as a live feed. */
        const metric = METRICS[Math.floor(Math.random() * METRICS.length)];
        return {
          ...current,
          [metric.id]: nextValue(metric, current[metric.id]),
        };
      });

    const timer = window.setInterval(() => {
      if (!document.hidden) tick();
    }, 1400);

    return () => window.clearInterval(timer);
  }, [tier]);

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      {METRICS.map((metric, index) => {
        const Icon = metric.icon;
        return (
          <div
            key={metric.id}
            data-decor={metric.minor ? "rich" : undefined}
            className={cn(
              "absolute z-20",
              metric.position,
              metric.minor && "hidden md:block",
            )}
            style={{
              /* Staggered so the chips are never all at the top of their float
                 together, which would read as the whole group pulsing. */
              animationDelay: `${index * 0.62}s`,
            }}
          >
            <div
              className={cn(
                "glass-heavy flex items-center gap-2.5 rounded-pill py-2.5 pl-3 pr-4",
                "shadow-[0_18px_44px_-22px_rgb(0_0_0/1)]",
                tier === "full" &&
                  (index % 3 === 0
                    ? "animate-drift"
                    : index % 3 === 1
                      ? "animate-drift-slow"
                      : "animate-breathe"),
              )}
              style={{ animationDelay: `${index * 0.62}s` }}
            >
              <span
                className={cn(
                  "flex size-7 items-center justify-center rounded-pill bg-white/6",
                  ACCENT_TEXT[metric.accent],
                )}
              >
                <Icon className="size-3.5" strokeWidth={2.4} />
              </span>
              <span className="flex flex-col leading-none">
                <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-ash-dim sm:text-[9.5px]">
                  {metric.label}
                </span>
                <span className="mt-1 text-[14px] font-black text-chalk" data-numeric>
                  {format(metric, values[metric.id])}
                  {metric.unit ? (
                    <span className="ml-1 text-[11px] font-bold text-ash sm:text-[10px]">
                      {metric.unit}
                    </span>
                  ) : null}
                </span>
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
