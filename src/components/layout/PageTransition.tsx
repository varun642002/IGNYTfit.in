"use client";

import { usePathname } from "next/navigation";
import { useState, type ReactNode } from "react";

/**
 * Animates each route as it arrives — every route except the one the visitor
 * landed on.
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
 * WHY THE FIRST ROUTE IS EXEMPT. `page-in` opens at `opacity: 0`, and this
 * wrapper holds the entire page. On a first load that made every candidate for
 * largest-contentful-paint transparent for the first 520ms — so Chrome skipped
 * the whole document and settled on the wordmark in the header, which is the
 * one piece of chrome rendered outside this element. A fade is a fine way to
 * announce a route the reader chose to visit; it is a poor way to open a page
 * they are still waiting for. The staged hero entrance is what greets them
 * instead, and since that one only moves, it costs nothing.
 *
 * Under `prefers-reduced-motion` the animation is neutralised by the global
 * reduced-motion block, and the page simply appears.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  /* The route this visit began on. Adjusting state during render is the
     pattern React documents for deriving from a changed prop, and it is what
     keeps the class off the very first paint — an effect would set it one
     frame late, which is a visible flash of the animation starting. */
  const [landed, setLanded] = useState(pathname);
  const [navigated, setNavigated] = useState(false);

  if (pathname !== landed) {
    setLanded(pathname);
    setNavigated(true);
  }

  return (
    <div key={pathname} className={navigated ? "page-enter" : undefined}>
      {children}
    </div>
  );
}
