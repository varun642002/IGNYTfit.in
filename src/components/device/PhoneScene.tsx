"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { Crossfade } from "@/components/ui/Crossfade";
import { PhoneShell } from "@/components/device/PhoneShell";
import { Tilt } from "@/components/ui/Tilt";
import { useMotionTier } from "@/components/providers/MotionProvider";
import { cn } from "@/lib/utils";

export interface SceneSlide {
  id: string;
  /** Label shown on the selector beneath the device. */
  label: string;
  /** Server-rendered screen markup. */
  screen: ReactNode;
  /** Accessible description of this screen. */
  description: string;
  /**
   * Optional server-rendered copy shown beside the device in `split` layout.
   *
   * Passed in as already-rendered markup rather than as a render function,
   * because a function cannot cross the server/client boundary — and rendering
   * it here would drag the copy for all six slides into the client bundle.
   */
  aside?: ReactNode;
}

/**
 * The animated device.
 *
 * Slides advance on a timer and can be driven manually from the selector below
 * the phone. The screens themselves are passed in as already-rendered server
 * markup, so this component animates between them without any of the sixteen
 * app screens becoming client components — the interactivity lives here and
 * nowhere else.
 *
 * Transition design: the outgoing screen falls away and dims while the incoming
 * one rises into place, both on the house `--ease-glide` curve. It is a
 * deliberate step away from a crossfade, which on a device mockup reads as two
 * translucent screens overlapping rather than as one screen replacing another.
 *
 * The autoplay timer stops when the section is off screen, when the tab is
 * hidden, and whenever the pointer is over the device — nobody wants the screen
 * to change out from under them while they are reading it.
 */
export function PhoneScene({
  slides,
  className,
  interval = 4200,
  overlay,
  showSelector = true,
  layout = "stacked",
  deviceClassName,
  realShots = false,
}: {
  slides: SceneSlide[];
  className?: string;
  /** Milliseconds per slide. */
  interval?: number;
  overlay?: ReactNode;
  showSelector?: boolean;
  /**
   * `stacked` — device with the selector underneath (the hero and galleries).
   * `split`   — copy on one side, device on the other (the product showcase).
   */
  layout?: "stacked" | "split";
  deviceClassName?: string;
  /**
   * Set when the slides are real screenshots rather than vector screens.
   *
   * Suppresses the frame's camera housing: a capture already contains the
   * device's own status bar, and drawing a notch over it hides part of the
   * actual interface.
   */
  realShots?: boolean;
}) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const tier = useMotionTier();
  /* The provider already resolves prefers-reduced-motion into the tier, so
     there is no second source of truth to keep in step. */
  const reduce = tier === "none";

  /* Only run the timer while the device is actually on screen. */
  useEffect(() => {
    const node = containerRef.current;
    if (!node || typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => setVisible(entries.some((entry) => entry.isIntersecting)),
      { threshold: 0.25 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    /* Under reduced motion the slides still advance — the screens are the
       content, and freezing on one would hide fifteen of them — but the
       transition itself is instant, handled in the variants below. */
    if (paused || !visible || slides.length < 2) return;

    const timer = window.setInterval(
      () => setIndex((current) => (current + 1) % slides.length),
      interval,
    );
    return () => window.clearInterval(timer);
  }, [paused, visible, interval, slides.length]);

  useEffect(() => {
    const onVisibility = () => setPaused(document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  const active = slides[index];

  const device = (
    <div
      className={deviceClassName}
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <Tilt max={7}>
        {/* The gentle idle float. A CSS animation rather than a motion value:
            it runs on the compositor indefinitely without a single frame of
            JavaScript, and the tilt transform above composes with it cleanly
            because the two live on separate elements. */}
        <div
          data-decor="ambient"
          className={cn(tier === "full" && "animate-drift")}
        >
          <PhoneShell
            label={active.description}
            overlay={overlay}
            notch={!realShots}
          >
            <Crossfade
              slotKey={active.id}
              variant="screen"
              durationMs={reduce ? 0 : 620}
            >
              {active.screen}
            </Crossfade>
          </PhoneShell>
        </div>
      </Tilt>
    </div>
  );

  const selector =
    showSelector && slides.length > 1 ? (
      <div
        role="tablist"
        aria-label="App screens"
        className={cn(
          "mask-fade-x no-scrollbar flex snap-x snap-mandatory gap-2 overflow-x-auto pb-1",
          layout === "split" ? "mt-8" : "mt-9 px-1 sm:justify-center",
        )}
      >
        {slides.map((slide, slideIndex) => {
          const selected = slideIndex === index;
          return (
            <button
              key={slide.id}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => setIndex(slideIndex)}
              className={cn(
                "shrink-0 snap-start rounded-pill border px-4 py-2 text-[13px] font-semibold",
                "transition-[color,background-color,border-color] duration-300 ease-glide",
                selected
                  ? "border-arc/55 bg-arc/14 text-chalk"
                  : "border-hairline bg-carbon/60 text-ash hover:border-arc/35 hover:text-chalk",
              )}
            >
              {slide.label}
            </button>
          );
        })}
      </div>
    ) : null;

  /* The live region announces a slide change to a screen reader without
     stealing focus. `atomic` so the whole sentence is read rather than only the
     word that changed. */
  const announcer = (
    <p aria-live="polite" aria-atomic className="sr-only">
      Showing {active.label}
    </p>
  );

  if (layout === "split") {
    return (
      <div
        ref={containerRef}
        className={cn(
          // grid-cols-1 is NOT redundant. Without an explicit base column the implicit one is
          // sized to content, so on a phone this resolved to a 560px column inside a 335px
          // container and the whole page scrolled sideways. Tailwind's grid-cols-1 is
          // minmax(0,1fr), which is what lets the column shrink below its content.
          "grid grid-cols-1 items-center gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,380px)] lg:gap-16",
          className,
        )}
      >
        <div>
          {/*
            `popLayout`, not `wait`.

            With `mode="wait"` the incoming copy does not mount until the
            outgoing copy has finished leaving, so a 0.42s transition actually
            takes 0.84s end to end — while the screen beside it finishes in
            0.62s. The result is a full third of a second where the words say
            "Dashboard" and the phone is already showing the workout, which
            reads as a bug rather than as a transition.

            `popLayout` starts both halves at the same instant. The copy is
            given the shorter duration so it settles just before the device
            does; that ordering is deliberate — the reverse makes the text feel
            like it is chasing the picture.
          */}
          <Crossfade
            slotKey={active.id}
            variant="copy"
            durationMs={reduce ? 0 : 500}
          >
            {active.aside}
          </Crossfade>
          {selector}
        </div>

        <div className="mx-auto w-full max-w-[300px] sm:max-w-[330px]">
          {device}
        </div>

        {announcer}
      </div>
    );
  }

  return (
    <div ref={containerRef} className={cn("w-full", className)}>
      {device}
      {selector}
      {announcer}
    </div>
  );
}
