"use client";

import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRichMotion } from "@/components/providers/MotionProvider";

/**
 * Makes a child lean towards the cursor.
 *
 * The element follows the pointer by a fraction of the distance from its own
 * centre, so it reads as a slight magnetic attraction rather than as something
 * chasing the mouse. `strength` is that fraction; above about 0.4 it stops
 * feeling like a physical object and starts feeling broken.
 *
 * This is one of the few places framer-motion genuinely earns its weight. The
 * spring is what sells it — a linear follow feels mechanical, and the overshoot
 * on release is most of the perceived quality.
 *
 * Pointer tracking is skipped entirely on touch (`pointerType`), on reduced
 * motion and on low-power devices: there is no cursor to be magnetic towards,
 * and the listeners would be pure cost.
 */
export function Magnetic({
  children,
  strength = 0.28,
  className,
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const rich = useRichMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const config = { stiffness: 260, damping: 18, mass: 0.4 };
  const springX = useSpring(x, config);
  const springY = useSpring(y, config);

  /* The child leans slightly further than the wrapper, which produces a small
     parallax between a button's face and its label. */
  const innerX = useTransform(springX, (value) => value * 0.35);
  const innerY = useTransform(springY, (value) => value * 0.35);

  if (!rich) return <span className={className}>{children}</span>;

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
