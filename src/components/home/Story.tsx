"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { Database, LineChart, UtensilsCrossed, Dumbbell } from "lucide-react";
import { useMotionTier } from "@/components/providers/MotionProvider";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { cn } from "@/lib/utils";

/**
 * The scroll-told narrative.
 *
 * Four beats describing what a training block actually looks like in IGNYT.
 * The scene holds still while the reader scrolls through it, and each beat
 * takes over from the last.
 *
 * ARCHITECTURE — worth reading before changing anything here.
 *
 * The layout is `position: sticky`. GSAP does NOT pin it. That division is
 * deliberate: ScrollTrigger's pinning works by injecting a spacer element and
 * rewriting the pinned node's position, which is powerful and also the single
 * most common source of "my layout jumps at the section boundary" bugs —
 * especially underneath a smooth-scroll library. Sticky positioning is native,
 * cannot desynchronise, and survives every resize for free.
 *
 * What GSAP is actually used for is the part CSS cannot express: a single
 * scrubbed progress value across the whole scene, from which the active beat
 * and the progress rail are both derived. That is real work, and it is why the
 * library is here rather than being imported out of habit.
 *
 * COST CONTROL. GSAP and ScrollTrigger together are around 70KB. They are
 * imported dynamically, after hydration, and only when the motion tier is
 * "full" — so a low-power phone or a reduced-motion visitor never downloads
 * them at all. Those visitors get the fallback below, which is the same four
 * beats as an ordinary scrolling list with CSS reveals.
 */

const BEATS = [
  {
    id: "train",
    icon: Dumbbell,
    kicker: "Train",
    title: "Log the set while the bar is still loaded.",
    body: "Weight and reps carry over from last session, so you are confirming a number rather than remembering one. The rest timer starts itself, and a personal record is flagged the moment you beat it.",
    stat: "7 240 kg",
    statLabel: "Session volume",
    accent: "flare" as const,
  },
  {
    id: "eat",
    icon: UtensilsCrossed,
    kicker: "Eat",
    title: "Log the meal without waiting for a network.",
    body: "3,160 foods live on the device, so search returns instantly in a basement gym with no signal. Calories, macros and the five micronutrients most apps ignore update the moment anything changes.",
    stat: "3,160",
    statLabel: "Foods offline",
    accent: "good" as const,
  },
  {
    id: "measure",
    icon: LineChart,
    kicker: "Measure",
    title: "Read the trend, not the noise.",
    body: "Scale weight moves three ways in a week. A smoothed 90-day line separates the signal from the salty dinner, with body fat, lean mass and twelve weeks of training volume charted beside it.",
    stat: "90 days",
    statLabel: "Smoothed trend",
    accent: "arc" as const,
  },
  {
    id: "keep",
    icon: Database,
    kicker: "Keep",
    title: "It stays yours.",
    body: "Cloud backup is opt-in and off by default. Health Connect data is exchanged on-device through Android and never touches an IGNYT server. Export everything to JSON or CSV whenever you want it.",
    stat: "Off by default",
    statLabel: "Cloud sync",
    accent: "arc" as const,
  },
];

const ACCENT_TEXT = {
  arc: "text-arc",
  flare: "text-flare",
  good: "text-[#3ddc97]",
} as const;

const ACCENT_BG = {
  arc: "bg-arc",
  flare: "bg-flare",
  good: "bg-[#3ddc97]",
} as const;

export function Story({
  visuals = [],
}: {
  /**
   * One server-rendered device per beat, in the same order as BEATS.
   *
   * Currently empty, and deliberately so. Every screenshot the home page can
   * show is already spent — six in the hero carousel and six more in the
   * product tour — and a screen may not appear twice on one surface. Rather
   * than repeat one here, this scene runs on typography alone, which is how it
   * was first built and reads perfectly well.
   *
   * Pass devices in if new captures become available.
   */
  visuals?: ReactNode[];
}) {
  const sceneRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLSpanElement>(null);
  const [active, setActive] = useState(0);
  const tier = useMotionTier();
  const rich = tier === "full";

  useEffect(() => {
    if (!rich) return;
    const scene = sceneRef.current;
    if (!scene) return;

    let cleanup: (() => void) | undefined;
    let cancelled = false;

    void (async () => {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (cancelled) return;

      gsap.registerPlugin(ScrollTrigger);

      const trigger = ScrollTrigger.create({
        trigger: scene,
        start: "top top",
        end: "bottom bottom",
        /* One scrubbed value for the whole scene. Both the rail and the active
           beat read from it, so they can never disagree — which is exactly the
           failure a per-beat IntersectionObserver implementation produces at
           the boundaries. */
        onUpdate: (self) => {
          const progress = self.progress;
          railRef.current?.style.setProperty(
            "transform",
            `scaleY(${Math.max(progress, 0.02)})`,
          );

          const next = Math.min(
            Math.floor(progress * BEATS.length),
            BEATS.length - 1,
          );
          setActive((current) => (current === next ? current : next));
        },
      });

      cleanup = () => trigger.kill();
    })();

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, [rich]);

  /* ------------------------------------------------------------- fallback
     Without rich motion this is simply four sections in a column. Same words,
     same order, no pinning, no library. */
  if (!rich) {
    return (
      <section
        id="story"
        aria-labelledby="story-heading"
        className="cv-auto relative py-16 sm:py-32"
      >
        <Container>
          <Eyebrow className="mb-5">How it works</Eyebrow>
          <h2
            id="story-heading"
            className="text-fade-down max-w-2xl text-[clamp(2rem,4.8vw,3.35rem)] font-black leading-[1.04]"
          >
            Four things, done properly.
          </h2>

          <ol className="mt-16 flex flex-col gap-14">
            {BEATS.map((beat) => {
              const Icon = beat.icon;
              return (
                <li key={beat.id} className="rise max-w-2xl">
                  <div className="flex items-center gap-3">
                    <Icon
                      aria-hidden
                      className={cn("size-5", ACCENT_TEXT[beat.accent])}
                    />
                    <span
                      className={cn(
                        "text-[11px] font-bold uppercase tracking-[0.22em]",
                        ACCENT_TEXT[beat.accent],
                      )}
                    >
                      {beat.kicker}
                    </span>
                  </div>
                  <h3 className="mt-4 text-[clamp(1.5rem,3.4vw,2.1rem)] font-black leading-[1.14] tracking-[-0.03em]">
                    {beat.title}
                  </h3>
                  <p className="mt-4 text-[16px] leading-[1.72] text-ash">
                    {beat.body}
                  </p>
                </li>
              );
            })}
          </ol>
        </Container>
      </section>
    );
  }

  return (
    <section
      id="story"
      aria-labelledby="story-heading"
      ref={sceneRef}
      /* Four viewports of scroll for four beats. `eager` in spirit: no
         content-visibility here, because the sticky child must be able to
         participate in scrolling before it is painted. */
      className="relative"
      style={{ height: `${BEATS.length * 100}vh` }}
    >
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        {/* The bloom takes the colour of the active beat, which is most of what
            makes the scene feel like it is progressing rather than just
            swapping text. */}
        <div
          aria-hidden
          data-decor="ambient"
          className="pointer-events-none absolute left-1/2 top-1/2 -z-10 size-[min(900px,120vw)] -translate-x-1/2 -translate-y-1/2 rounded-pill blur-[140px] transition-[background] duration-1000 ease-glide"
          style={{
            background: `radial-gradient(circle, ${
              BEATS[active].accent === "flare"
                ? "rgba(255,106,26,0.17)"
                : BEATS[active].accent === "good"
                  ? "rgba(61,220,151,0.14)"
                  : "rgba(61,123,255,0.19)"
            } 0%, transparent 66%)`,
          }}
        />

        <Container>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,64px)_minmax(0,1fr)_minmax(0,320px)] lg:gap-14">
            {/* Progress rail. The filled portion is a scaled child, so the
                scrub writes one composited transform per frame. */}
            <div className="hidden lg:block">
              <div className="relative h-[280px] w-px bg-hairline">
                <span
                  ref={railRef}
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-full origin-top scale-y-0 bg-[linear-gradient(180deg,var(--color-arc),var(--color-flare))]"
                />
              </div>
              <ol className="mt-8 flex flex-col gap-3">
                {BEATS.map((beat, index) => (
                  <li key={beat.id}>
                    <span
                      className={cn(
                        "text-[11px] font-bold uppercase tracking-[0.18em] transition-colors duration-500",
                        index === active ? "text-chalk" : "text-ash-dim",
                      )}
                    >
                      {beat.kicker}
                    </span>
                  </li>
                ))}
              </ol>
            </div>

            <div>
              <Eyebrow className="mb-6">How it works</Eyebrow>

              {/* Every beat stays in the DOM and is stacked in one grid cell.
                  Only opacity, transform and blur change, so switching beats is
                  a compositor operation — nothing is mounted or unmounted mid
                  scroll, which is what keeps this at 60fps. */}
              <div className="grid">
                <h2 id="story-heading" className="sr-only">
                  How IGNYT works
                </h2>

                {BEATS.map((beat, index) => {
                  const Icon = beat.icon;
                  const isActive = index === active;
                  return (
                    <div
                      key={beat.id}
                      aria-hidden={!isActive}
                      className={cn(
                        "col-start-1 row-start-1 max-w-2xl",
                        "transition-[opacity,transform,filter] duration-700 ease-glide",
                        isActive
                          ? "pointer-events-auto translate-y-0 opacity-100 blur-0"
                          : "pointer-events-none translate-y-6 opacity-0 blur-[6px]",
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={cn(
                            "grid size-10 place-items-center rounded-panel border border-hairline bg-carbon",
                            ACCENT_TEXT[beat.accent],
                          )}
                        >
                          <Icon aria-hidden className="size-5" strokeWidth={2} />
                        </span>
                        <span
                          className={cn(
                            "text-[11px] font-bold uppercase tracking-[0.22em]",
                            ACCENT_TEXT[beat.accent],
                          )}
                        >
                          {beat.kicker}
                        </span>
                      </div>

                      <h3 className="mt-6 text-[clamp(1.9rem,4.6vw,3.1rem)] font-black leading-[1.06] tracking-[-0.035em]">
                        {beat.title}
                      </h3>

                      <p className="mt-6 max-w-xl text-[16.5px] leading-[1.75] text-ash">
                        {beat.body}
                      </p>

                      <div className="mt-9 inline-flex items-baseline gap-3 rounded-pill border border-hairline bg-carbon/70 px-5 py-3">
                        <span
                          className={cn(
                            "text-[22px] font-black tracking-[-0.03em]",
                            ACCENT_TEXT[beat.accent],
                          )}
                          data-numeric
                        >
                          {beat.stat}
                        </span>
                        <span className="text-[12px] font-semibold uppercase tracking-[0.14em] text-ash-dim">
                          {beat.statLabel}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Mobile beat indicator. */}
              <div className="mt-10 flex gap-1.5 lg:hidden">
                {BEATS.map((beat, index) => (
                  <span
                    key={beat.id}
                    aria-hidden
                    className={cn(
                      "h-1 flex-1 rounded-pill transition-colors duration-500",
                      index <= active
                        ? ACCENT_BG[BEATS[active].accent]
                        : "bg-hairline",
                    )}
                  />
                ))}
              </div>
            </div>

            {/*
              The device for the active beat.

              Hidden below `lg`, where the copy already fills the viewport and a
              phone would push the heading off-screen. All four are stacked in
              one grid cell and only their opacity, transform and blur change —
              nothing mounts or unmounts mid-scroll, so switching beats stays a
              compositor operation.

              `aria-hidden` throughout: these are illustrations of the words
              beside them, and the words are the content.
            */}
            <div aria-hidden className="relative hidden lg:grid">
              {visuals.map((visual, index) => (
                <div
                  key={BEATS[index]?.id ?? index}
                  className={cn(
                    "col-start-1 row-start-1",
                    "transition-[opacity,transform,filter] duration-700 ease-glide",
                    index === active
                      ? "scale-100 opacity-100 blur-0"
                      : "scale-[0.93] opacity-0 blur-[10px]",
                  )}
                >
                  {visual}
                </div>
              ))}
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}
