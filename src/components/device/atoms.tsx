import type { CSSProperties, ReactNode } from "react";
import { HomeIndicator, StatusBar } from "@/components/device/PhoneShell";
import { cn } from "@/lib/utils";

/**
 * The parts every phone screen is assembled from.
 *
 * Two rules hold this together:
 *
 * 1. EVERYTHING SIZES IN `cqw`. Not px, not rem. The phone declares itself a
 *    container, so `4cqw` means "4% of the phone's width" and every screen is
 *    resolution-independent — the same components render the 480px hero device
 *    and a 96px carousel thumbnail with no variants and no breakpoints.
 *
 * 2. Data graphics animate through CSS custom properties, never through state.
 *    A ring takes `--len`/`--gap`, a bar takes `--to`, and the scroll-driven
 *    keyframes in globals.css do the rest. These mockups therefore contain no
 *    client components at all: sixteen animated app screens that ship zero
 *    JavaScript and stay fully rendered with scripting disabled.
 *
 * The numbers shown are illustrative sample data for a mockup of the app's
 * interface — the same way a product screenshot shows one person's numbers.
 */

/* --------------------------------------------------------------- palette */

export type Accent = "arc" | "flare" | "good" | "cyan";

export const ACCENT: Record<Accent, { stroke: string; text: string; bg: string }> =
  {
    arc: { stroke: "#3d7bff", text: "text-arc", bg: "bg-arc" },
    flare: { stroke: "#ff6a1a", text: "text-flare", bg: "bg-flare" },
    good: { stroke: "#3ddc97", text: "text-[#3ddc97]", bg: "bg-[#3ddc97]" },
    cyan: { stroke: "#55d8ff", text: "text-[#55d8ff]", bg: "bg-[#55d8ff]" },
  };

/* ----------------------------------------------------------- scaffolding */

/** Full-bleed screen: status bar, scrollable body, home indicator. */
export function Screen({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex size-full flex-col bg-[linear-gradient(180deg,#0a0c11,#000_42%)] text-chalk",
        className,
      )}
    >
      <StatusBar />
      <div className="flex min-h-0 flex-1 flex-col gap-[2.6cqw] px-[6cqw] pb-[9cqw] pt-[2cqw]">
        {children}
      </div>
      <HomeIndicator />
    </div>
  );
}

/** Screen title with an optional right-hand action. */
export function Head({
  title,
  meta,
  action,
}: {
  title: string;
  meta?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex items-start justify-between gap-[3cqw]">
      <div className="min-w-0">
        <p className="text-[5.6cqw] font-black leading-none tracking-[-0.03em]">
          {title}
        </p>
        {meta ? (
          <p className="mt-[1.6cqw] text-[3.1cqw] font-medium leading-none text-ash">
            {meta}
          </p>
        ) : null}
      </div>
      {action}
    </div>
  );
}

/** A raised panel inside the app UI. */
export function Tile({
  children,
  className,
  lit,
}: {
  children: ReactNode;
  className?: string;
  lit?: Accent;
}) {
  return (
    <div
      className={cn(
        "rounded-[4.5cqw] border border-white/7 bg-[linear-gradient(180deg,rgba(255,255,255,0.045),rgba(255,255,255,0.012))] p-[4cqw]",
        lit && "shadow-[0_0_0_1px_rgba(255,255,255,0.03)]",
        className,
      )}
      style={
        lit
          ? ({
              boxShadow: `0 0 0 1px ${ACCENT[lit].stroke}33, 0 6cqw 12cqw -8cqw ${ACCENT[lit].stroke}66`,
            } as CSSProperties)
          : undefined
      }
    >
      {children}
    </div>
  );
}

/** Small pill label. */
export function Chip({
  children,
  accent,
  className,
}: {
  children: ReactNode;
  accent?: Accent;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-[1.2cqw] rounded-pill px-[2.6cqw] py-[1.2cqw] text-[2.7cqw] font-bold leading-none",
        accent
          ? cn(ACCENT[accent].text, "bg-white/6")
          : "bg-white/7 text-ash",
        className,
      )}
    >
      {children}
    </span>
  );
}

/* ------------------------------------------------------------ data graphics */

/**
 * Circular progress.
 *
 * The dash pattern is "visible arc, remainder", so the sweep is already the
 * right length before anything animates; only the offset moves. Rotated -90°
 * so zero is at the top, which is the only orientation anyone reads a
 * progress ring in.
 */
export function Ring({
  value,
  size = 30,
  stroke = 3.4,
  accent = "flare",
  children,
  className,
}: {
  /** 0–1. */
  value: number;
  /** Diameter in cqw. */
  size?: number;
  /** Stroke width in cqw. */
  stroke?: number;
  accent?: Accent;
  children?: ReactNode;
  className?: string;
}) {
  /* Geometry is computed in a 100-unit viewBox and scaled by the container, so
     the circumference maths stays readable and exact. */
  const r = 50 - (stroke / size) * 100 * 0.5;
  const circumference = 2 * Math.PI * r;
  const arc = circumference * Math.min(Math.max(value, 0), 1);

  return (
    <div
      className={cn("relative shrink-0", className)}
      style={{ width: `${size}cqw`, height: `${size}cqw` }}
    >
      <svg viewBox="0 0 100 100" className="size-full -rotate-90">
        <circle
          cx="50"
          cy="50"
          r={r}
          fill="none"
          stroke="rgba(255,255,255,0.09)"
          strokeWidth={(stroke / size) * 100}
        />
        <circle
          cx="50"
          cy="50"
          r={r}
          fill="none"
          stroke={ACCENT[accent].stroke}
          strokeWidth={(stroke / size) * 100}
          strokeLinecap="round"
          className="draw-ring"
          style={
            {
              "--len": arc,
              "--gap": circumference - arc,
            } as CSSProperties
          }
        />
      </svg>
      {children ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center leading-none">
          {children}
        </div>
      ) : null}
    </div>
  );
}

/** Labelled horizontal bar — macros, adherence, goal progress. */
export function Meter({
  label,
  value,
  detail,
  accent = "arc",
  index = 0,
}: {
  label: string;
  /** 0–1. */
  value: number;
  detail?: string;
  accent?: Accent;
  index?: number;
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <span className="text-[2.9cqw] font-semibold text-ash">{label}</span>
        {detail ? (
          <span className="text-[2.9cqw] font-bold" data-numeric>
            {detail}
          </span>
        ) : null}
      </div>
      <div className="mt-[1.5cqw] h-[1.9cqw] overflow-hidden rounded-pill bg-white/8">
        {/* The bar grows on the vertical `grow-bar` keyframe rotated into the
            horizontal axis by transform-origin, which keeps one keyframe
            serving both orientations. */}
        <div
          className="h-full origin-left rounded-pill"
          style={
            {
              background: ACCENT[accent].stroke,
              transform: `scaleX(${value})`,
              "--to": value,
              "--i": index,
            } as CSSProperties
          }
        />
      </div>
    </div>
  );
}

/** Vertical bar chart — weekly volume, hydration history, streaks. */
export function Bars({
  values,
  accent = "flare",
  height = 22,
  labels,
  highlight,
}: {
  /** Each 0–1. */
  values: number[];
  accent?: Accent;
  /** Chart height in cqw. */
  height?: number;
  labels?: string[];
  /** Index rendered in full accent; the rest are dimmed. */
  highlight?: number;
}) {
  return (
    <div>
      <div
        className="flex items-end gap-[1.6cqw]"
        style={{ height: `${height}cqw` }}
      >
        {values.map((value, index) => (
          <div key={index} className="flex h-full flex-1 items-end">
            <div
              className="grow-bar w-full rounded-t-[1.2cqw] rounded-b-[0.5cqw]"
              style={
                {
                  height: "100%",
                  "--to": Math.max(value, 0.04),
                  "--i": index,
                  background:
                    highlight === undefined || highlight === index
                      ? `linear-gradient(180deg, ${ACCENT[accent].stroke}, ${ACCENT[accent].stroke}55)`
                      : "rgba(255,255,255,0.13)",
                } as CSSProperties
              }
            />
          </div>
        ))}
      </div>
      {labels ? (
        <div className="mt-[1.6cqw] flex gap-[1.6cqw]">
          {labels.map((label, index) => (
            <span
              key={index}
              className="flex-1 text-center text-[2.4cqw] font-semibold text-ash-dim"
            >
              {label}
            </span>
          ))}
        </div>
      ) : null}
    </div>
  );
}

/**
 * Line chart that draws itself.
 *
 * `--len` must be at least the path's true length for the dash trick to hide it
 * completely at the start. It is over-estimated rather than measured: measuring
 * needs `getTotalLength()`, which needs the DOM, which would make every one of
 * these a client component. An over-estimate simply means the line starts
 * drawing a fraction later, which nobody can see.
 */
export function Spark({
  points,
  accent = "good",
  height = 26,
  fill = true,
  label,
}: {
  /** Each 0–1, evenly spaced left to right. */
  points: number[];
  accent?: Accent;
  height?: number;
  fill?: boolean;
  label?: string;
}) {
  const width = 100;
  const step = width / (points.length - 1);
  const coords = points.map((point, index) => [
    index * step,
    40 - point * 34 - 3,
  ]);

  const line = coords
    .map(([x, y], index) => `${index === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`)
    .join(" ");
  const area = `${line} L${width},40 L0,40 Z`;
  const gradientId = `spark-${accent}-${points.length}-${Math.round(points[0] * 100)}`;

  return (
    <div style={{ height: `${height}cqw` }} className="relative w-full">
      <svg
        viewBox="0 0 100 40"
        preserveAspectRatio="none"
        className="size-full overflow-visible"
      >
        {fill ? (
          <>
            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="0%"
                  stopColor={ACCENT[accent].stroke}
                  stopOpacity="0.34"
                />
                <stop
                  offset="100%"
                  stopColor={ACCENT[accent].stroke}
                  stopOpacity="0"
                />
              </linearGradient>
            </defs>
            <path d={area} fill={`url(#${gradientId})`} />
          </>
        ) : null}
        <path
          d={line}
          fill="none"
          stroke={ACCENT[accent].stroke}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
          className="draw-path"
          style={{ "--len": 220 } as CSSProperties}
        />
      </svg>
      {label ? (
        <span className="absolute right-0 top-0 text-[2.6cqw] font-bold text-ash">
          {label}
        </span>
      ) : null}
    </div>
  );
}

/** A list row: icon block, title, subtitle, trailing value. */
export function Row({
  title,
  meta,
  value,
  accent = "arc",
  glyph,
  done,
}: {
  title: string;
  meta?: string;
  value?: string;
  accent?: Accent;
  /** One or two characters — an initial, a unit, a count. */
  glyph?: string;
  done?: boolean;
}) {
  return (
    <div className="flex items-center gap-[3cqw]">
      <div
        className="flex size-[8.5cqw] shrink-0 items-center justify-center rounded-[2.6cqw] text-[3.1cqw] font-black"
        style={{
          backgroundColor: `${ACCENT[accent].stroke}1f`,
          color: ACCENT[accent].stroke,
        }}
      >
        {done ? "✓" : glyph}
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-[3.4cqw] font-bold leading-tight">{title}</p>
        {meta ? (
          <p className="mt-[0.6cqw] truncate text-[2.7cqw] font-medium leading-tight text-ash-dim">
            {meta}
          </p>
        ) : null}
      </div>
      {value ? (
        <span className="shrink-0 text-[3.1cqw] font-bold" data-numeric>
          {value}
        </span>
      ) : null}
    </div>
  );
}

/** Big single figure with a caption. */
export function Stat({
  value,
  unit,
  caption,
  accent,
}: {
  value: string;
  unit?: string;
  caption: string;
  accent?: Accent;
}) {
  return (
    <div>
      <p
        className={cn(
          "text-[7cqw] font-black leading-none tracking-[-0.04em]",
          accent && ACCENT[accent].text,
        )}
        data-numeric
      >
        {value}
        {unit ? (
          <span className="ml-[1cqw] text-[3.2cqw] font-bold text-ash">
            {unit}
          </span>
        ) : null}
      </p>
      <p className="mt-[1.4cqw] text-[2.8cqw] font-semibold leading-none text-ash-dim">
        {caption}
      </p>
    </div>
  );
}

/** Bottom tab bar. The active tab is passed by index. */
export function TabBar({ active = 0 }: { active?: number }) {
  /* Simple geometric glyphs rather than an icon font: at 4cqw these read as
     shapes anyway, and it keeps the mockups free of a runtime dependency. */
  const tabs = ["Home", "Train", "Food", "Body", "You"];

  return (
    <div className="mt-auto flex items-center justify-between rounded-[5cqw] border border-white/7 bg-white/4 px-[4cqw] py-[2.6cqw]">
      {tabs.map((tab, index) => (
        <div key={tab} className="flex flex-col items-center gap-[1.2cqw]">
          <div
            className={cn(
              "size-[3.6cqw] rounded-[1.1cqw]",
              index === active ? "bg-flare" : "bg-white/22",
            )}
          />
          <span
            className={cn(
              "text-[2.3cqw] font-bold leading-none",
              index === active ? "text-chalk" : "text-ash-dim",
            )}
          >
            {tab}
          </span>
        </div>
      ))}
    </div>
  );
}
