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
            <Crossfade slotKey={active.id} durationMs={reduce ? 0 : 620}>
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
            All six copy blocks, stacked in a single grid cell.

            THIS IS WHAT RESERVES THE HEIGHT, and that is the whole point. Only
            one block is ever visible, but the grid cell is sized to the tallest
            of them, so advancing a slide cannot resize this column.

            Rendering only the active block — which is what this did, first
            through AnimatePresence and then through <Crossfade> — meant the
            column was as tall as whatever copy happened to be showing. The six
            entries differ by several lines of text, so every transition
            resized this column, and `items-center` on the grid then re-centred
            the device beside it. Measured on mobile: a single layout shift
            scoring 0.399, which is most of a Lighthouse performance score on
            its own. It was there from the beginning and had simply never been
            counted, because the page used to spend its opening fading in from
            transparent and layout shifts are only scored against content the
            visitor can actually see.

            Both halves still cross over at the same instant — the property
            `popLayout` was chosen for, and the reason the copy must not wait
            for the device: a third of a second where the words say "Dashboard"
            and the phone already shows the workout reads as a bug rather than
            as a transition. The copy settles at 500ms and the device at 620ms,
            so the text arrives just before the picture. That ordering is
            deliberate; reversed, the words feel like they are chasing.

            Same technique as <Story>, for the same reason.
          */}
          <div className="grid">
            {slides.map((slide, slideIndex) => (
              <div
                key={slide.id}
                aria-hidden={slideIndex !== index}
                className={cn(
                  "col-start-1 row-start-1",
                  !reduce &&
                    "transition-[opacity,transform] duration-500 ease-glide",
                  slideIndex === index
                    ? "translate-y-0 opacity-100"
                    : "pointer-events-none translate-y-3 opacity-0",
                )}
              >
                {slide.aside}
              </div>
            ))}
          </div>
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
