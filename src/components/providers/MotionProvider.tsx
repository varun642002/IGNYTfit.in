"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";

/**
 * How much motion this visit gets.
 *
 *   full — everything: Lenis smooth scroll, parallax, particles, pinned scenes.
 *   lite — reveals, hovers and counters only. No continuous rAF work, no
 *          smooth-scroll hijacking, no particle field.
 *   none — the user asked for reduced motion. Nothing moves on its own.
 *
 * The tier is published on `<html data-motion>` as well as through context, so
 * CSS can respond to it without every animated element having to subscribe.
 */
export type MotionTier = "full" | "lite" | "none";

const MotionContext = createContext<MotionTier>("full");

/** Read the current motion tier. Safe to call from any client component. */
export function useMotionTier(): MotionTier {
  return useContext(MotionContext);
}

/** Convenience: true when continuous, decorative animation is permitted. */
export function useRichMotion(): boolean {
  return useMotionTier() === "full";
}

/**
 * Best guess at what this device can afford, from the platform's own signals.
 *
 * Intentionally conservative. Guessing "lite" wrongly costs a particle field;
 * guessing "full" wrongly costs a janky first scroll on the cheap Android phone
 * that a good share of this audience actually owns.
 */
function readCapability(): MotionTier {
  if (typeof window === "undefined") return "full";

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return "none";
  }

  /* `deviceMemory` and `hardwareConcurrency` are both absent on some browsers.
     Absence is not evidence of a weak device, so only ever act on a value that
     is actually present. */
  const memory = (navigator as Navigator & { deviceMemory?: number })
    .deviceMemory;
  if (typeof memory === "number" && memory <= 4) return "lite";

  const cores = navigator.hardwareConcurrency;
  if (typeof cores === "number" && cores > 0 && cores <= 4) return "lite";

  return "full";
}

/**
 * Subscribes to the only capability signal that can change during a visit: the
 * user turning reduced-motion on or off at the OS level.
 */
function subscribeToCapability(onChange: () => void): () => void {
  const query = window.matchMedia("(prefers-reduced-motion: reduce)");
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

/** The server has no device to measure, so it assumes the full treatment. */
const serverCapability = (): MotionTier => "full";

/**
 * Root motion provider: owns the tier, and owns Lenis.
 *
 * Lenis lives here rather than in its own provider because the two decisions
 * are the same decision — if this visit is not getting rich motion, it is not
 * getting scroll hijacking either, and splitting them across two components
 * meant two client boundaries that always had to agree.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  const frameRef = useRef<number | undefined>(undefined);

  /*
   * Device capability, read through useSyncExternalStore rather than through a
   * `useState` + `useEffect` pair.
   *
   * This is the difference between "render, then correct yourself" and "render
   * the right thing": the hook gives React a server snapshot and a client
   * snapshot, so the value is correct on the very first client render instead
   * of arriving in a second pass. Setting it from inside an effect would also
   * be a cascading render, which React's lint rules correctly reject.
   */
  const capability = useSyncExternalStore(
    subscribeToCapability,
    readCapability,
    serverCapability,
  );

  /* Set only by the frame-rate sampler below, never cleared. */
  const [underperforming, setUnderperforming] = useState(false);

  const tier: MotionTier =
    underperforming && capability === "full" ? "lite" : capability;

  /* ------------------------------------------------- live frame-rate check
   *
   * The capability signals above are only a guess — a mid-range phone with
   * eight cores can still drop frames under a thermal cap, and a powerful
   * laptop can be busy with something else. This samples real frame times for
   * two seconds after mount and demotes if the page is not holding up.
   *
   * It only ever demotes. Promoting back to "full" mid-session would make
   * particles and parallax appear out of nowhere while somebody is reading,
   * which is worse than staying conservative.
   *
   * The setState here is inside a requestAnimationFrame callback, not the
   * effect body — it is a subscription reporting back, which is exactly what
   * effects are for.
   */
  useEffect(() => {
    if (tier !== "full") return;

    let frames = 0;
    let slowFrames = 0;
    let last = performance.now();
    const started = last;
    let raf = 0;

    const sample = (now: number) => {
      const delta = now - last;
      last = now;
      frames += 1;
      // 22ms ≈ below ~45fps. One slow frame is noise; a third of them is not.
      if (delta > 22) slowFrames += 1;

      if (now - started < 2000) {
        raf = requestAnimationFrame(sample);
        return;
      }

      if (frames > 20 && slowFrames / frames > 0.33) setUnderperforming(true);
    };

    raf = requestAnimationFrame(sample);
    return () => cancelAnimationFrame(raf);
  }, [tier]);

  /* -------------------------------------------------- publish to the DOM */
  useEffect(() => {
    document.documentElement.dataset.motion = tier;
  }, [tier]);

  /* ------------------------------------------------------------ Lenis */
  useEffect(() => {
    if (tier !== "full") return;

    let cancelled = false;
    let lenis: import("lenis").default | undefined;

    // Dynamic import keeps Lenis out of the initial bundle entirely: it is
    // fetched after hydration, and never at all on a reduced-motion or
    // low-power visit.
    void import("lenis").then(({ default: Lenis }) => {
      if (cancelled) return;

      lenis = new Lenis({
        duration: 1.05,
        // Exponential ease-out. Matches --ease-glide closely enough that a
        // scroll and a transition read as the same physics.
        easing: (t: number) => 1 - Math.pow(1 - t, 3.2),
        smoothWheel: true,
        // Never on touch. Mobile browsers already have excellent native
        // inertia, and overriding it costs a frame budget the phone does not
        // have while also breaking pull-to-refresh.
        syncTouch: false,
        touchMultiplier: 1.6,
      });

      const raf = (time: number) => {
        lenis?.raf(time);
        frameRef.current = requestAnimationFrame(raf);
      };
      frameRef.current = requestAnimationFrame(raf);
    });

    return () => {
      cancelled = true;
      if (frameRef.current !== undefined) cancelAnimationFrame(frameRef.current);
      lenis?.destroy();
    };
  }, [tier]);

  return <MotionContext value={tier}>{children}</MotionContext>;
}
