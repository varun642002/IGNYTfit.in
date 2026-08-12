"use client";

import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

/**
 * The framer-motion half of <Magnetic>.
 *
 * Split out so the library is fetched only when the effect will actually run —
 * a pointer device on the full motion tier. On a phone this file is never
 * requested, which is the point: it was 121KB of the initial bundle for an
 * effect that cannot fire without a cursor.
 *
 * The spring is what sells the effect; a linear follow feels mechanical, and
 * the overshoot on release is most of the perceived quality.
 */
export default function MagneticMotion({
  children,
  strength,
  className,
}: {
  children: ReactNode;
  strength: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const config = { stiffness: 260, damping: 18, mass: 0.4 };
  const springX = useSpring(x, config);
  const springY = useSpring(y, config);

  /* The child leans slightly further than the wrapper, which produces a small
     parallax between a button's face and its label. */
  const innerX = useTransform(springX, (value) => value * 0.35);
  const innerY = useTransform(springY, (value) => value * 0.35);

  return (
    <motion.span
      ref={ref}
      className={className}
      style={{ x: springX, y: springY, display: "inline-flex" }}
      onPointerMove={(event) => {
        if (event.pointerType !== "mouse") return;
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        x.set((event.clientX - (rect.left + rect.width / 2)) * strength);
        y.set((event.clientY - (rect.top + rect.height / 2)) * strength);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      <motion.span style={{ x: innerX, y: innerY, display: "inline-flex" }}>
        {children}
      </motion.span>
    </motion.span>
  );
}
