"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Logo } from "@/components/brand/Logo";
import { ButtonLink } from "@/components/ui/Button";
import { navRoutes } from "@/lib/routes";
import { cn } from "@/lib/utils";

/**
 * The site header.
 *
 * At the top of a page it is a plain transparent bar. As soon as the page moves
 * it contracts into a floating glass capsule — narrower, inset from the edges,
 * lifted off the top. That single transition is the header's whole idea: the
 * navigation gets out of the way of the hero, then becomes a distinct object
 * once there is content behind it to be distinct from.
 *
 * Deliberately free of any animation library. This component is above the fold
 * on every route, so anything it imports lands in the critical path. The
 * capsule transition, the active pill and the mobile sheet are all plain CSS
 * transitions, which the compositor runs for nothing.
 *
 * The reading-progress hairline along the top is written straight to a CSS
 * custom property inside a rAF-throttled passive scroll handler — no state, no
 * re-render, one composited transform per frame.
 */
export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const progressRef = useRef<HTMLSpanElement>(null);
  const lastY = useRef(0);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const y = window.scrollY;
      setScrolled(y > 10);

      /*
       * Hide on the way down, return on the way up.
       *
       * This gives long pages back the 64px the header occupies, and the bar is
       * never more than one upward flick away — which is why it is acceptable
       * on a site where the header carries the primary call to action.
       *
       * The 8px threshold matters: without it, the sub-pixel scroll jitter that
       * a smooth-scroll library produces flips the direction every frame and
       * the header strobes. It also never hides in the first 300px, where the
       * reader is still in the hero and the nav is the only orientation they
       * have.
       */
      const delta = y - lastY.current;
      if (Math.abs(delta) > 8) {
        setHidden(delta > 0 && y > 300);
        lastY.current = y;
      }

      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;
      const ratio = scrollable > 0 ? Math.min(y / scrollable, 1) : 0;
      progressRef.current?.style.setProperty("transform", `scaleX(${ratio})`);
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  /* Close the mobile sheet on navigation. Adjusting state during render — the
     pattern React documents for "derive from a changed prop" — avoids the extra
     commit an effect costs and stops the sheet flashing on the new route before
     it closes. */
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setMenuOpen(false);
  }

  /* Lock body scroll while the sheet is open, and restore exactly what was
     there before — not a hard-coded "auto", which would clobber any other
     scroll lock that happened to be active. */
  useEffect(() => {
    if (!menuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const isActive = (path: string) =>
    path === "/" ? pathname === "/" : pathname.startsWith(path);

  /* The sheet must never be left off-screen: if it is open, the header stays
     put regardless of scroll direction. */
  const tucked = hidden && !menuOpen;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50",
        "transition-transform duration-500 ease-glide motion-reduce:transition-none",
        tucked ? "-translate-y-full" : "translate-y-0",
      )}
    >
      {/* Reading progress. Purely decorative — the same information is in the
          scrollbar — so it is hidden from assistive technology. */}
      <span
        aria-hidden
        ref={progressRef}
        className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-[linear-gradient(90deg,var(--color-arc),var(--color-flare))]"
      />

      <div
        className={cn(
          "mx-auto transition-[max-width,padding,margin] duration-500 ease-glide",
          scrolled
            ? "mt-3 max-w-[1120px] px-4 sm:px-6"
            : "mt-0 max-w-[1440px] px-5 sm:px-8",
        )}
      >
        <div
          className={cn(
            "flex h-[64px] items-center justify-between gap-4",
            "transition-[background-color,border-color,box-shadow,border-radius,padding] duration-500 ease-glide",
            scrolled
              ? "glass-heavy rounded-pill px-3 shadow-[0_18px_50px_-28px_rgb(0_0_0/1)] sm:px-4"
              : "rounded-none border border-transparent bg-transparent px-0",
          )}
        >
          <Link
            href="/"
            className="shrink-0 rounded-xl"
            aria-label="IGNYT — home"
          >
            <Logo priority size={34} />
          </Link>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-0.5">
              {navRoutes.map((route) => (
                <li key={route.path}>
                  <Link
                    href={route.path}
                    aria-current={isActive(route.path) ? "page" : undefined}
                    className={cn(
                      "relative inline-flex h-9 items-center rounded-pill px-3.5 text-[14px] font-semibold",
                      "transition-colors duration-300 ease-glide",
                      isActive(route.path)
                        ? "text-chalk"
                        : "text-ash hover:text-chalk",
                    )}
                  >
                    {/* The active pill sits behind the label rather than being
                        a border on it, so the text never shifts by a pixel when
                        the route changes. */}
                    {isActive(route.path) ? (
                      <span
                        aria-hidden
                        className="absolute inset-0 rounded-pill border border-arc/35 bg-arc/12"
                      />
                    ) : null}
                    <span className="relative">{route.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <ButtonLink
              href="/download"
              size="sm"
              className="hidden sm:inline-flex"
            >
              Download
            </ButtonLink>

            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              className="grid size-10 place-items-center rounded-pill border border-hairline bg-carbon/70 text-chalk transition-colors hover:border-arc/50 lg:hidden"
            >
              {menuOpen ? (
                <X aria-hidden className="size-5" />
              ) : (
                <Menu aria-hidden className="size-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/*
        Mobile sheet.

        Kept mounted and collapsed with a `grid-template-rows` transition rather
        than conditionally rendered, so it animates open and shut without an
        animation library and without measuring height in JavaScript. `invisible`
        while closed keeps its links out of the tab order — a collapsed menu
        whose contents are still focusable is a keyboard trap.
      */}
      <div
        id="mobile-menu"
        className={cn(
          "mx-3 mt-2 grid overflow-hidden transition-[grid-template-rows,opacity] duration-[400ms] ease-glide lg:hidden",
          menuOpen
            ? "grid-rows-[1fr] opacity-100"
            : "invisible grid-rows-[0fr] opacity-0",
        )}
      >
        <div className="min-h-0">
          <div className="glass-heavy rounded-card p-3">
            <nav aria-label="Mobile">
              <ul className="flex flex-col gap-1">
                {navRoutes.map((route) => (
                  <li key={route.path}>
                    <Link
                      href={route.path}
                      tabIndex={menuOpen ? undefined : -1}
                      aria-current={isActive(route.path) ? "page" : undefined}
                      className={cn(
                        "flex items-center rounded-panel px-4 py-3 text-[15px] font-semibold transition-colors",
                        isActive(route.path)
                          ? "bg-arc/14 text-chalk"
                          : "text-ash hover:bg-white/5 hover:text-chalk",
                      )}
                    >
                      {route.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <ButtonLink
              href="/download"
              className="mt-3 w-full"
              tabIndex={menuOpen ? undefined : -1}
            >
              Download IGNYT
            </ButtonLink>
          </div>
        </div>
      </div>
    </header>
  );
}
