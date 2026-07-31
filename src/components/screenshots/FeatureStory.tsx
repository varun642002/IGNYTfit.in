import type { CSSProperties, ReactNode } from "react";
import Image from "next/image";
import { PhoneShell } from "@/components/device/PhoneShell";
import { Aurora } from "@/components/ui/Aurora";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Tilt } from "@/components/ui/Tilt";
import { cn } from "@/lib/utils";

/**
 * One full-height chapter of the product story.
 *
 * The rules this component enforces, because they are what stop the page
 * turning back into a gallery:
 *
 *   - ONE device per section. Never a row of them. A single phone at size is a
 *     product shot; five phones side by side is documentation.
 *   - The device alternates side each chapter, so the eye is handed across the
 *     page rather than falling down a single column.
 *   - Everything around the device is decoration and is `aria-hidden`. The
 *     accessible content is the heading, the lead and the three points.
 *
 * The floating cards and the section graphic are illustration, not data. They
 * reinforce what the screen behind them does — a route drawing itself beside
 * the running screen, macro rings filling beside nutrition — and they animate
 * on the scroll timeline, so they cost no JavaScript and follow the reader's
 * own pace.
 */

export interface StoryChapter {
  id: string;
  eyebrow: string;
  title: string;
  lead: string;
  points: [string, string, string];
  tone: "arc" | "flare";
  /** A real screenshot path, or a drawn mockup passed as markup. */
  shot?: string;
  screen?: ReactNode;
  /** Decorative graphic rendered behind and beside the device. */
  graphic?: ReactNode;
  /** Small glass chips that orbit the device. */
  chips?: Array<{ label: string; value: string; position: string }>;
}

export function FeatureStory({
  chapter,
  index,
}: {
  chapter: StoryChapter;
  index: number;
}) {
  /* Odd chapters put the device on the left. */
  const deviceFirst = index % 2 === 1;

  return (
    <section
      id={chapter.id}
      aria-labelledby={`${chapter.id}-heading`}
      className="relative flex min-h-screen scroll-mt-20 items-center overflow-hidden py-24 sm:py-28"
    >
      <Aurora tone={chapter.tone} />

      {/* Chapter seam. A single lit hairline where one chapter meets the last,
          so sections never hard-cut into each other. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(61,123,255,0.35)_30%,rgba(255,106,26,0.28)_70%,transparent)]"
      />

      <Container wide>
        <div
          className={cn(
            "grid items-center gap-16 lg:gap-24",
            "lg:grid-cols-[minmax(0,1fr)_minmax(0,420px)]",
          )}
        >
          {/* ---------------------------------------------------------- copy */}
          <div className={cn(deviceFirst && "lg:order-2")}>
            <Eyebrow tone={chapter.tone} className="mb-7">
              {chapter.eyebrow}
            </Eyebrow>

            {/* Plain text. The per-word mask reveal that used to be here was
                removed for clipping headings — see the note in globals.css. */}
            <h2
              id={`${chapter.id}-heading`}
              className="text-fade-down text-[clamp(2.4rem,6.2vw,4.5rem)] font-black leading-[0.98] tracking-[-0.045em]"
            >
              {chapter.title}
            </h2>

            <p className="mt-8 max-w-xl text-[17px] leading-[1.75] text-ash sm:text-[18.5px]">
              {chapter.lead}
            </p>

            <ul className="mt-10 flex flex-col gap-4">
              {chapter.points.map((point, pointIndex) => (
                <li
                  key={point}
                  className="rise-item flex gap-4 text-[15.5px] leading-[1.6] text-ash"
                  style={{ "--i": pointIndex } as CSSProperties}
                >
                  <span
                    aria-hidden
                    className={cn(
                      "mt-[9px] h-px w-8 shrink-0",
                      chapter.tone === "arc" ? "bg-arc" : "bg-flare",
                    )}
                  />
                  {point}
                </li>
              ))}
            </ul>
          </div>

          {/* -------------------------------------------------------- device */}
          <div
            className={cn(
              "relative mx-auto w-full max-w-[320px] sm:max-w-[360px]",
              deviceFirst && "lg:order-1",
            )}
          >
            {chapter.graphic}

            <Tilt max={9}>
              <div data-decor="ambient" className="animate-drift">
                <PhoneShell
                  label={`IGNYT — ${chapter.title}`}
                  /* No camera housing over a real capture: the screenshot has
                     its own status bar, and covering it would hide part of the
                     actual interface. */
                  notch={!chapter.shot}
                >
                  {chapter.shot ? (
                    /* `object-contain`, never `object-cover`. The frame is
                       9:19.5 and the captures are 737×1600 — close, but cover
                       would still shave a sliver off an edge, and no part of
                       the interface may be cut. */
                    <Image
                      src={chapter.shot}
                      alt=""
                      fill
                      sizes="(min-width: 640px) 360px, 90vw"
                      className="object-contain"
                    />
                  ) : (
                    chapter.screen
                  )}
                </PhoneShell>
              </div>
            </Tilt>

            {/* Orbiting figures. Illustration, not live data. */}
            {chapter.chips?.map((chip, chipIndex) => (
              <div
                key={chip.label}
                aria-hidden
                data-decor="rich"
                className={cn(
                  "glass-heavy absolute z-20 hidden rounded-pill py-2.5 pl-3.5 pr-4 md:block",
                  "shadow-[0_18px_44px_-22px_rgb(0_0_0/1)]",
                  chipIndex % 2 === 0 ? "animate-drift" : "animate-drift-slow",
                  chip.position,
                )}
                style={{ animationDelay: `${chipIndex * 0.7}s` }}
              >
                <span className="block text-[9.5px] font-bold uppercase tracking-[0.14em] text-ash-dim">
                  {chip.label}
                </span>
                <span
                  className="mt-1 block text-[15px] font-black text-chalk"
                  data-numeric
                >
                  {chip.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ========================================================================
   Decorative graphics
   ------------------------------------------------------------------------
   Each one draws itself on the scroll timeline using the primitives already
   in globals.css. All are `aria-hidden`: they illustrate the screen beside
   them and carry no information of their own.
   ===================================================================== */

/** A running route drawing itself across the panel. */
export function RouteGraphic() {
  return (
    <div
      aria-hidden
      data-decor="rich"
      className="pointer-events-none absolute inset-[-18%] -z-10 hidden lg:block"
    >
      <svg viewBox="0 0 400 400" className="size-full">
        <path
          d="M40,330 C90,300 70,230 130,215 C190,200 180,140 240,130 C300,120 320,70 360,60"
          fill="none"
          stroke="var(--color-arc)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="620"
          className="draw-path opacity-45"
          style={{ "--len": 620 } as CSSProperties}
        />
        {[
          [40, 330],
          [130, 215],
          [240, 130],
          [360, 60],
        ].map(([cx, cy], i) => (
          <circle
            key={i}
            cx={cx}
            cy={cy}
            r="4"
            fill="var(--color-arc)"
            className="opacity-70"
          />
        ))}
      </svg>
    </div>
  );
}

/** Three macro rings filling as they scroll in. */
export function MacroGraphic() {
  const RINGS: Array<[string, number, string]> = [
    ["Protein", 0.78, "var(--color-arc)"],
    ["Carbs", 0.64, "var(--color-flare)"],
    ["Fat", 0.55, "var(--color-good)"],
  ];

  return (
    <div
      aria-hidden
      data-decor="rich"
      className="pointer-events-none absolute -left-[26%] top-1/2 z-20 hidden -translate-y-1/2 lg:block"
    >
      <div className="glass-heavy flex flex-col gap-4 rounded-card p-5">
        {RINGS.map(([label, value, colour]) => {
          const r = 26;
          const c = 2 * Math.PI * r;
          return (
            <div key={label} className="flex items-center gap-3">
              <svg viewBox="0 0 64 64" className="size-11 -rotate-90">
                <circle
                  cx="32"
                  cy="32"
                  r={r}
                  fill="none"
                  stroke="rgba(255,255,255,0.09)"
                  strokeWidth="6"
                />
                <circle
                  cx="32"
                  cy="32"
                  r={r}
                  fill="none"
                  stroke={colour}
                  strokeWidth="6"
                  strokeLinecap="round"
                  className="draw-ring"
                  style={
                    {
                      "--len": c * value,
                      "--gap": c - c * value,
                    } as CSSProperties
                  }
                />
              </svg>
              <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-ash">
                {label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/** A consistency heatmap filling in, week by week. */
export function StreakGraphic() {
  return (
    <div
      aria-hidden
      data-decor="rich"
      className="pointer-events-none absolute -right-[24%] top-[12%] z-20 hidden lg:block"
    >
      <div className="glass-heavy rounded-card p-5">
        <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.16em] text-ash-dim">
          Consistency
        </p>
        <div className="grid grid-cols-7 gap-1.5">
          {Array.from({ length: 28 }).map((_, i) => {
            /* Deterministic, not random: a random pattern re-rolls between the
               server and the client and produces a hydration mismatch. */
            const on = [0, 1, 3, 4, 6, 7, 8, 10, 11, 13, 14, 15, 17, 18, 20, 21, 22, 24, 25, 27].includes(i);
            return (
              <span
                key={i}
                className={cn(
                  "size-3 rounded-[3px]",
                  on ? "bg-flare/80" : "bg-white/8",
                )}
                style={{
                  animation: on
                    ? `fade-in 400ms var(--ease-glide) both ${i * 22}ms`
                    : undefined,
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

/** Weekly training volume growing out of the baseline. */
export function VolumeGraphic() {
  const BARS = [0.32, 0.46, 0.4, 0.58, 0.54, 0.72, 0.68, 0.86, 1];

  return (
    <div
      aria-hidden
      data-decor="rich"
      className="pointer-events-none absolute -left-[22%] bottom-[10%] z-20 hidden lg:block"
    >
      <div className="glass-heavy rounded-card p-5">
        <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.16em] text-ash-dim">
          Weekly volume
        </p>
        <div className="flex h-20 items-end gap-1.5">
          {BARS.map((value, i) => (
            <span
              key={i}
              className="grow-bar w-2.5 rounded-t-sm bg-[linear-gradient(180deg,var(--color-arc),rgba(61,123,255,0.25))]"
              style={
                { height: "100%", "--to": value, "--i": i } as CSSProperties
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/** The HYROX format, as eight runs alternating with eight stations. */
export function RaceGraphic() {
  return (
    <div
      aria-hidden
      data-decor="rich"
      className="pointer-events-none absolute -right-[26%] top-1/2 z-20 hidden -translate-y-1/2 lg:block"
    >
      <div className="glass-heavy rounded-card p-5">
        <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.16em] text-ash-dim">
          Race format
        </p>
        <div className="flex flex-col gap-1.5">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="flex items-center gap-2">
              <span
                className="h-1.5 rounded-pill bg-flare"
                style={{
                  width: 34,
                  animation: `fade-in 360ms var(--ease-glide) both ${i * 70}ms`,
                }}
              />
              <span
                className="h-1.5 rounded-pill bg-arc"
                style={{
                  width: 22,
                  animation: `fade-in 360ms var(--ease-glide) both ${i * 70 + 35}ms`,
                }}
              />
            </div>
          ))}
        </div>
        <p className="mt-3 text-[11px] font-bold text-ash">8 runs · 8 stations</p>
      </div>
    </div>
  );
}

/** A weight trend settling downward over ninety days. */
export function TrendGraphic() {
  return (
    <div
      aria-hidden
      data-decor="rich"
      className="pointer-events-none absolute -right-[24%] bottom-[14%] z-20 hidden lg:block"
    >
      <div className="glass-heavy rounded-card p-5">
        <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.16em] text-ash-dim">
          90-day trend
        </p>
        <svg viewBox="0 0 120 50" className="h-16 w-32 overflow-visible">
          <path
            d="M2,10 C20,14 26,8 40,18 C54,28 62,24 78,34 C92,42 104,40 118,44"
            fill="none"
            stroke="var(--color-good)"
            strokeWidth="2.5"
            strokeLinecap="round"
            className="draw-path"
            style={{ "--len": 200 } as CSSProperties}
          />
        </svg>
      </div>
    </div>
  );
}
