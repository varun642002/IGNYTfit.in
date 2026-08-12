"use client";

import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

/**
 * The framer-motion half of <Tilt>.
 *
 * Split out so the library is only fetched on a pointer device running the
 * full motion tier. Two details do most of the work:
 *
 *   - `perspective` lives on the wrapper, not on the rotating element, so the
 *     vanishing point stays fixed while the child turns. Putting it on the
 *     child makes the whole thing feel like it is being scaled rather than
 *     rotated.
 *   - `transformStyle: preserve-3d` on the inner element lets anything inside
 *     it (the floating metric chips) sit at its own Z depth and separate
 *     properly as the card turns.
 */
export default function TiltMotion({
  children,
  className,
  max,
  perspective,
}: {
  children: ReactNode;
  className?: string;
  max: number;
  perspective: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

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
