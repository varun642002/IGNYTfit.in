"use client";

import { useEffect, useRef } from "react";
import { useRichMotion } from "@/components/providers/MotionProvider";

/**
 * The drifting ember field behind the hero.
 *
 * A canvas rather than a few dozen animated divs: forty independently moving,
 * independently fading points as DOM nodes means forty elements the style and
 * layout engines have to consider every frame, whereas a canvas is one element
 * and one paint.
 *
 * The particles rise slowly and re-enter from the bottom, which is the only
 * behaviour here that carries meaning — everything on this page moves upward,
 * because the product is about progress. They are not random dots for texture.
 *
 * Cost control, in order of how much each one saves:
 *
 *   - Never runs below the "full" motion tier, so a low-power device or a
 *     reduced-motion preference gets nothing at all.
 *   - Pauses entirely when scrolled out of view (IntersectionObserver) and when
 *     the tab is hidden. The hero is off screen for most of a visit.
 *   - Device pixel ratio is capped at 2. A 3x phone would otherwise ask the GPU
 *     to fill nine times the pixels for an effect nobody can resolve.
 *   - No allocation inside the frame loop: particles are created once and
 *     mutated in place, so this never triggers garbage collection mid-scroll.
 */
export function Particles({
  className,
  count = 42,
}: {
  className?: string;
  count?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rich = useRichMotion();

  useEffect(() => {
    if (!rich) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0;
    let height = 0;
    let raf = 0;
    let visible = true;

    type Particle = {
      x: number;
      y: number;
      r: number;
      speed: number;
      drift: number;
      alpha: number;
      warm: boolean;
      phase: number;
    };

    const particles: Particle[] = [];

    const seed = (particle: Particle, initial: boolean) => {
      particle.x = Math.random() * width;
      particle.y = initial ? Math.random() * height : height + 12;
      particle.r = 0.6 + Math.random() * 1.8;
      particle.speed = 0.12 + Math.random() * 0.38;
      particle.drift = (Math.random() - 0.5) * 0.16;
      particle.alpha = 0.16 + Math.random() * 0.42;
      /* Roughly one in five is warm. The field is overwhelmingly the arc blue,
         with the occasional orange ember — the same ratio the rest of the site
         uses for its two accents. */
      particle.warm = Math.random() < 0.2;
      particle.phase = Math.random() * Math.PI * 2;
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();

    for (let i = 0; i < count; i += 1) {
      const particle: Particle = {
        x: 0,
        y: 0,
        r: 1,
        speed: 0.2,
        drift: 0,
        alpha: 0.3,
        warm: false,
        phase: 0,
      };
      seed(particle, true);
      particles.push(particle);
    }

    let last = performance.now();

    const frame = (now: number) => {
      /* Normalised against a 60fps step, so the field drifts at the same real
         speed on a 120Hz display as on a 60Hz one — and does not lurch when a
         frame is dropped. Clamped so a background tab that resumes after ten
         seconds does not teleport every particle off the top. */
      const step = Math.min((now - last) / 16.667, 3);
      last = now;

      ctx.clearRect(0, 0, width, height);

      for (const p of particles) {
        p.y -= p.speed * step;
        p.phase += 0.01 * step;
        p.x += (p.drift + Math.sin(p.phase) * 0.12) * step;

        if (p.y < -12) seed(p, false);
        if (p.x < -12) p.x = width + 12;
        if (p.x > width + 12) p.x = -12;

        /* Fade out over the top third rather than vanishing at the edge. */
        const fade = p.y < height * 0.34 ? Math.max(p.y / (height * 0.34), 0) : 1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.warm
          ? `rgba(255,144,83,${p.alpha * fade})`
          : `rgba(122,168,255,${p.alpha * fade})`;
        ctx.fill();
      }

      raf = requestAnimationFrame(frame);
    };

    const start = () => {
      if (raf) return;
      last = performance.now();
      raf = requestAnimationFrame(frame);
    };

    const stop = () => {
      if (!raf) return;
      cancelAnimationFrame(raf);
      raf = 0;
    };

    const observer = new IntersectionObserver(
      (entries) => {
        visible = entries.some((entry) => entry.isIntersecting);
        if (visible && !document.hidden) start();
        else stop();
      },
      { threshold: 0 },
    );
    observer.observe(canvas);

    const onVisibility = () => {
      if (document.hidden || !visible) stop();
      else start();
    };
    document.addEventListener("visibilitychange", onVisibility);

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);

    return () => {
      stop();
      observer.disconnect();
      resizeObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [rich, count]);

  if (!rich) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      data-decor="rich"
      className={className}
    />
  );
}
