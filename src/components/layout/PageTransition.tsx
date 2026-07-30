"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/**
 * Animates each route as it arrives.
 *
 * Almost nothing happens here in JavaScript: the pathname becomes the element's
 * `key`, React therefore replaces the node on every navigation, and a CSS
 * animation (`.page-enter`) plays on the fresh one. That is the entire
 * mechanism.
 *
 * The obvious alternative — wrapping every route in AnimatePresence — costs the
 * animation runtime in the bundle of every page on the site, and in the App
 * Router the outgoing tree unmounts before an exit animation could play anyway,
 * so the extra weight buys only the half of the effect this already does.
 *
 * Under `prefers-reduced-motion` the animation is neutralised by the global
 * reduced-motion block, and the page simply appears.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  return (
    <div key={pathname} className="page-enter">
      {children}
    </div>
  );
}
