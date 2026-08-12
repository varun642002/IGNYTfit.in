"use client";

import dynamic from "next/dynamic";
import type { ReactNode } from "react";
import { useRichMotion } from "@/components/providers/MotionProvider";

/**
 * Three-dimensional tilt towards the cursor.
 *
 * Used on the hero phone and on the showcase cards. The rotation is small on
 * purpose — eight degrees at the corners. A card that swings thirty degrees is
 * a demo of a technique; a card that leans just enough to catch its highlight
 * differently is a physical object sitting under a light.
 *
 * This shell carries no animation library. Tilt follows a cursor, so on a
 * touch screen it can never fire — loading framer-motion for it there was pure
 * cost. The implementation is fetched only on a pointer device running the
 * full motion tier; everywhere else this renders a plain wrapper, exactly as
 * the previous `if (!rich)` branch did.
 */
const TiltMotion = dynamic(() => import("./TiltMotion"), { ssr: false });

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
  const rich = useRichMotion();

  if (!rich) return <div className={className}>{children}</div>;

  return (
    <TiltMotion className={className} max={max} perspective={perspective}>
      {children}
    </TiltMotion>
  );
}
