import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

/**
 * The ambient light behind a section.
 *
 * This is the site's whole background treatment: a couple of very large, very
 * soft radial blooms sitting behind the content on a pure black field. Nothing
 * here is an image and nothing here is a canvas — each bloom is one div with a
 * radial gradient and a heavy blur, which the compositor handles for free.
 *
 * Two rules keep it from turning into wallpaper:
 *
 *   1. Blooms are always `aria-hidden` and `pointer-events-none`. They are
 *      lighting, never content, and must never intercept a click.
 *   2. Opacity stays low. On a pure black page the eye picks up a 12% bloom
 *      easily; at 30% it stops being light and starts being a purple smear
 *      that fights every piece of text laid over it.
 *
 * `data-decor="ambient"` lets MotionProvider freeze the drift animation on a
 * device that cannot afford it, without this component knowing anything about
 * the motion tier.
 */

type Tone = "arc" | "flare" | "mixed";

const TONES: Record<Tone, [string, string]> = {
  arc: ["rgba(61,123,255,0.20)", "rgba(27,71,196,0.14)"],
  flare: ["rgba(255,106,26,0.17)", "rgba(201,69,0,0.12)"],
  mixed: ["rgba(61,123,255,0.19)", "rgba(255,106,26,0.13)"],
};

export function Aurora({
  tone = "arc",
  className,
  drift = true,
}: {
  tone?: Tone;
  className?: string;
  /** Slow vertical breathing. Off for sections behind dense text. */
  drift?: boolean;
}) {
  const [primary, secondary] = TONES[tone];

  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 -z-10 overflow-hidden",
        className,
      )}
    >
      <div
        data-decor={drift ? "ambient" : undefined}
        className={cn(
          "absolute left-1/2 top-[-30%] size-[min(1100px,140vw)] -translate-x-1/2 rounded-pill blur-[130px]",
          drift && "animate-breathe",
        )}
        style={
          {
            background: `radial-gradient(circle, ${primary} 0%, transparent 66%)`,
          } as CSSProperties
        }
      />
      <div
        data-decor={drift ? "ambient" : undefined}
        className={cn(
          "absolute bottom-[-35%] right-[-10%] size-[min(820px,110vw)] rounded-pill blur-[140px]",
          drift && "animate-drift-slow",
        )}
        style={
          {
            background: `radial-gradient(circle, ${secondary} 0%, transparent 68%)`,
          } as CSSProperties
        }
      />
    </div>
  );
}

/**
 * A single hairline of light running along the top edge of a section.
 *
 * Used as the seam between sections instead of a border. A plain 1px border on
 * black reads as a table rule; a gradient that brightens in the middle and
 * fades at both ends reads as two planes meeting under a light, which is the
 * effect the whole page is going for.
 */
export function Seam({
  tone = "arc",
  className,
}: {
  tone?: "arc" | "flare";
  className?: string;
}) {
  const colour =
    tone === "arc" ? "rgba(61,123,255,0.55)" : "rgba(255,106,26,0.5)";

  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-x-0 top-0 h-px",
        className,
      )}
      style={{
        background: `linear-gradient(90deg, transparent, ${colour} 32%, ${colour} 68%, transparent)`,
      }}
    />
  );
}
