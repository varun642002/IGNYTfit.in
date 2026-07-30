import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * The device frame.
 *
 * Drawn in CSS rather than shipped as an image. A PNG of a phone is typically
 * 200–400KB, goes soft on a high-density display, cannot be recoloured, and
 * cannot have live content composited inside it — whereas this is a handful of
 * divs the compositor renders at any resolution for nothing.
 *
 * What makes it read as metal rather than as a grey rectangle:
 *
 *   - Two nested frames. The outer is the polished rail, the inner is the
 *     matte bezel. Real hardware has both, and the 1px difference between them
 *     is most of the effect.
 *   - The rail gradient runs light at the top-left to dark at the bottom-right,
 *     matching the single implied light source used everywhere else on the site.
 *   - A specular streak across the glass at about 20°, at 4% opacity. Higher
 *     and it looks like a smudge; absent and the screen looks like a hole.
 *
 * The screen content is `overflow-hidden` inside its own rounded box, so a
 * screen component can be laid out as an ordinary flow document and simply be
 * clipped by the glass.
 */
export function PhoneShell({
  children,
  className,
  /** Rendered above the glass — floating chips, glow, badges. */
  overlay,
  glow = true,
  label,
  notch = true,
}: {
  children: ReactNode;
  className?: string;
  overlay?: ReactNode;
  glow?: boolean;
  /** Accessible description of what the screen shows. */
  label?: string;
  /**
   * Draws the camera housing over the top of the glass.
   *
   * Turn it OFF for real screenshots. A captured screenshot already contains
   * the device's own status bar, and painting a notch on top of it covers part
   * of the actual interface — which misrepresents the app. The frame is
   * presentation; the screenshot inside it stays untouched.
   */
  notch?: boolean;
}) {
  return (
    <div className={cn("relative", className)}>
      {/* Light bed. Sits behind the device and gives it something to stand on;
          without it the phone floats on pure black with no relationship to the
          page at all. */}
      {glow ? (
        <div
          aria-hidden
          data-decor="ambient"
          className="pointer-events-none absolute inset-x-[-28%] top-[6%] -z-10 h-[86%] animate-breathe rounded-pill blur-[90px]"
          style={{
            background:
              "radial-gradient(closest-side, rgba(61,123,255,0.30), rgba(255,106,26,0.10) 62%, transparent 80%)",
          }}
        />
      ) : null}

      {/* Outer rail */}
      <div
        className={cn(
          "relative aspect-[9/19.5] w-full rounded-[13%] p-[1.6%]",
          "bg-[linear-gradient(150deg,#4a4f58_0%,#22252b_18%,#0e1013_46%,#191c21_72%,#3a3e46_100%)]",
          "shadow-[0_60px_120px_-50px_rgb(0_0_0/1),0_0_0_1px_rgb(255_255_255/0.05)]",
        )}
      >
        {/* Matte bezel */}
        <div className="relative size-full rounded-[11.5%] bg-[#050607] p-[2.2%] shadow-[inset_0_0_0_1px_rgb(255_255_255/0.06)]">
          {/*
            Glass.

            `container-type: inline-size` is what lets one set of screen
            components work at every size the phone appears at. Everything
            inside sizes in `cqw` — percentages of the container's width — so
            the hero phone, the showcase phone and a 120px carousel thumbnail
            all render the identical layout instead of needing three variants.
          */}
          <div
            role={label ? "img" : undefined}
            aria-label={label}
            aria-hidden={label ? undefined : true}
            className="relative size-full overflow-hidden rounded-[10%] bg-void [container-type:inline-size]"
          >
            {children}

            {/* Specular streak. `mix-blend-overlay` so it lifts whatever is
                underneath rather than washing it out with flat white. */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 mix-blend-overlay"
              style={{
                background:
                  "linear-gradient(196deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0) 34%, rgba(255,255,255,0) 68%, rgba(255,255,255,0.045) 100%)",
              }}
            />

            {/* Inner edge shadow, so the content sits *under* the glass. */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-[10%] shadow-[inset_0_0_18px_2px_rgb(0_0_0/0.55)]"
            />
          </div>

          {/* Camera housing. Never drawn over a real screenshot — see `notch`. */}
          {notch ? (
            <div
              aria-hidden
              className="absolute left-1/2 top-[2.4%] h-[3.1%] w-[26%] -translate-x-1/2 rounded-pill bg-black"
            >
              <div className="absolute right-[14%] top-1/2 size-[38%] -translate-y-1/2 rounded-pill bg-[#0d1420] shadow-[inset_0_0_0_1px_rgb(61_123_255/0.28)]" />
            </div>
          ) : null}
        </div>

        {/* Side hardware. Purely decorative, but their absence is noticed even
            when nobody can say why. */}
        <div
          aria-hidden
          className="absolute -left-[0.9%] top-[19%] h-[5%] w-[1.1%] rounded-l-sm bg-[linear-gradient(90deg,#3d434c,#1a1d22)]"
        />
        <div
          aria-hidden
          className="absolute -left-[0.9%] top-[27%] h-[8%] w-[1.1%] rounded-l-sm bg-[linear-gradient(90deg,#3d434c,#1a1d22)]"
        />
        <div
          aria-hidden
          className="absolute -right-[0.9%] top-[24%] h-[11%] w-[1.1%] rounded-r-sm bg-[linear-gradient(270deg,#3d434c,#1a1d22)]"
        />
      </div>

      {overlay}
    </div>
  );
}

/**
 * The status bar inside a mockup.
 *
 * The time is fixed at 06:41 across every screen on the site. A "current" time
 * would differ between the server render and the client, which is a hydration
 * mismatch for no benefit — and an early hour is the honest one for an app
 * whose dark theme exists for badly lit gyms at seven in the morning.
 */
export function StatusBar() {
  return (
    <div
      aria-hidden
      className="flex items-center justify-between px-[8%] pb-1 pt-[4.5%] text-[clamp(6px,2.6cqw,11px)] font-semibold text-chalk"
    >
      <span data-numeric>06:41</span>
      <div className="flex items-center gap-[3%]">
        {/* Signal */}
        <svg viewBox="0 0 18 12" className="h-[0.85em] w-auto" fill="currentColor">
          <rect x="0" y="8" width="3" height="4" rx="1" opacity="0.9" />
          <rect x="5" y="5.5" width="3" height="6.5" rx="1" opacity="0.9" />
          <rect x="10" y="3" width="3" height="9" rx="1" opacity="0.9" />
          <rect x="15" y="0" width="3" height="12" rx="1" opacity="0.45" />
        </svg>
        {/* Battery */}
        <svg viewBox="0 0 26 12" className="h-[0.8em] w-auto">
          <rect
            x="0.5"
            y="0.5"
            width="22"
            height="11"
            rx="3.5"
            fill="none"
            stroke="currentColor"
            strokeOpacity="0.45"
          />
          <rect x="2.5" y="2.5" width="15" height="7" rx="2" fill="currentColor" />
          <path
            d="M24 4.5v3a2 2 0 0 0 0-3z"
            fill="currentColor"
            fillOpacity="0.45"
          />
        </svg>
      </div>
    </div>
  );
}

/** The gesture bar at the bottom of the glass. */
export function HomeIndicator() {
  return (
    <div
      aria-hidden
      className="absolute inset-x-0 bottom-[1.4%] flex justify-center"
    >
      <div className="h-[3px] w-[32%] rounded-pill bg-chalk/35" />
    </div>
  );
}
