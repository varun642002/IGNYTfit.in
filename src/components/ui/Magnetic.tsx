"use client";

import dynamic from "next/dynamic";
import type { ReactNode } from "react";
import { useRichMotion } from "@/components/providers/MotionProvider";

/**
 * Makes a child lean towards the cursor.
 *
 * The element follows the pointer by a fraction of the distance from its own
 * centre, so it reads as a slight magnetic attraction rather than as something
 * chasing the mouse. `strength` is that fraction; above about 0.4 it stops
 * feeling like a physical object and starts feeling broken.
 *
 * This shell carries no animation library. The implementation is fetched only
 * when the effect can actually run — there is no cursor to be magnetic towards
 * on a touch screen, and framer-motion was 121KB of initial JavaScript that
 * every phone downloaded, parsed and hydrated for nothing.
 *
 * `ssr: false` is safe here precisely because the wrapper is decorative: the
 * children are rendered by this shell on the server either way, so nothing
 * about the markup or its content depends on the effect loading.
 */
const MagneticMotion = dynamic(() => import("./MagneticMotion"), {
  ssr: false,
});

export function Magnetic({
  children,
  strength = 0.28,
  className,
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const rich = useRichMotion();

  if (!rich) return <span className={className}>{children}</span>;

  return (
    <MagneticMotion strength={strength} className={className}>
      {children}
    </MagneticMotion>
  );
}
