"use client";

import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRichMotion } from "@/components/providers/MotionProvider";

/**
 * Three-dimensional tilt towards the cursor.
 *
 * Used on the hero phone and on the showcase cards. The rotation is small on
 * purpose — eight degrees at the corners. A card that swings thirty degrees is
 * a demo of a technique; a card that leans just enough to catch its highlight
 * differently is a physical object sitting under a light.
 *
 * Two details do most of the work:
 *
 *   - `perspective` lives on the wrapper, not on the rotating element, so the
 *     vanishing point stays fixed while the child turns. Putting it on the
 *     child makes the whole thing feel like it is being scaled rather than
 *     rotated.
 *   - `transformStyle: preserve-3d` on the inner element lets anything inside
 *     it (the floating metric chips) sit at its own Z depth and separate
 *     properly as the card turns.
 *
 * Off entirely for touch, reduced motion and low-power devices.
 */
export function Tilt({
  children,
  className,
  max = 8,
  perspective = 1400,
}: {
  children: ReactNode;
  className?: string;
  /** Maximum rotation in degrees, reached at the corners. */
  max?: number;
  perspective?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const rich = useRichMotion();

  /* Normalised pointer position, -0.5 … 0.5 from the element's centre. */
  const px = useMotionValue(0);
  const py = useMotionValue(0);

  const config = { stiffness: 150, damping: 20, mass: 0.6 };
  const sx = useSpring(px, config);
  const sy = useSpring(py, config);

  /* Y follows horizontal movement and X follows vertical, inverted — that is
     what makes the surface feel like it is being pushed rather than steered. */
  const rotateY = useTransform(sx, [-0.5, 0.5], [-max, max]);
  const rotateX = useTransform(sy, [-0.5, 0.5], [max, -max]);

  if (!rich) return <div className={className}>{children}</div>;

  return (
    <div
      ref={ref}
      className={className}
      style={{ perspective }}
      onPointerMove={(event) => {
        if (event.pointerType !== "mouse") return;
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        px.set((event.clientX - rect.left) / rect.width - 0.5);
        py.set((event.clientY - rect.top) / rect.height - 0.5);
      }}
      onPointerLeave={() => {
        px.set(0);
        py.set(0);
      }}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          willChange: "transform",
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
