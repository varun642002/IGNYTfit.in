"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Counts up to `value` the first time it scrolls into view.
 *
 * Hand-rolled on IntersectionObserver and one `requestAnimationFrame` loop
 * rather than an animation library. The library version pulled a full runtime
 * into the initial bundle of the home page purely to tween four integers, which
 * costs far more main-thread time during hydration than the effect is worth.
 *
 * The final value is server-rendered inside the visually-hidden span, so the
 * real number is in the HTML for search engines, for screen readers and for
 * anyone who never runs the script. The animated span is decorative and marked
 * `aria-hidden` — a counter that reads "3,000… 3,140… 3,160" to a screen reader
 * is noise, not information.
 */
export function Counter({
  value,
  duration = 1800,
  prefix = "",
  suffix = "",
  className,
}: {
  value: number;
  /** Milliseconds. */
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  /* `null` means "not counting" — the final value is what renders. The tween
     only ever writes a number here, so nothing is set synchronously during the
     first render and there is no cascading update on mount. */
  const [display, setDisplay] = useState<number | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    /* Respect reduced motion, and skip the mechanism entirely where
       IntersectionObserver is unavailable. The final value is already on screen
       in both cases, so there is nothing to fall back to. */
    const reduce = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduce || typeof IntersectionObserver === "undefined") return;

    let raf = 0;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        observer.disconnect();

        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min((now - start) / duration, 1);
          /* Quintic ease-out. Steeper than the CSS reveals use on purpose: a
             counter wants to arrive near its final value early and then settle
             the last few digits, which reads as a mechanism coming to rest
             rather than as a number sliding to a stop. */
          const eased = 1 - Math.pow(1 - t, 5);
          setDisplay(t < 1 ? Math.round(eased * value) : null);
          if (t < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value, duration]);

  const final = `${prefix}${value.toLocaleString("en-US")}${suffix}`;
  const shown =
    display === null
      ? final
      : `${prefix}${display.toLocaleString("en-US")}${suffix}`;

  return (
    <span ref={ref} className={className} data-numeric>
      <span aria-hidden>{shown}</span>
      <span className="sr-only">{final}</span>
    </span>
  );
}
