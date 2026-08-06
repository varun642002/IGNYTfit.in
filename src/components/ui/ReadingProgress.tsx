/**
 * How far through a long document the reader is.
 *
 * A **server component**. There is no `"use client"`, no scroll listener and no
 * requestAnimationFrame loop: the fill comes from a scroll-driven CSS animation
 * (`animation-timeline: scroll(root block)`) declared in globals.css, which the
 * compositor runs without touching the main thread. It costs nothing at
 * runtime and needs no hydration, so the bar is correct from the first paint
 * rather than after the bundle lands.
 *
 * WHY THIS EXISTS WHEN THE NAVBAR ALREADY HAS ONE.
 * The navbar draws the same line, but the navbar hides itself on the way down
 * to give long pages back its 64px. On a 9,400px privacy policy that means the
 * indicator is gone for the whole time you are reading and only returns when
 * you scroll up — exactly when you have stopped needing it. This one is fixed
 * to the viewport and owes nothing to the header, so it stays.
 *
 * Decorative, and marked so. The same information is in the scrollbar, and a
 * progress bar announced to a screen reader is noise rather than content.
 */
export function ReadingProgress() {
  return (
    /* `sticky`, not `fixed`, and that is not a style preference.
     *
     * Page content renders inside `.page-enter`, which carries a transform for the route
     * transition. A transform — even the identity one this settles on — makes that element
     * the containing block for any `position: fixed` descendant, so a fixed bar here is
     * positioned against the whole 9,400px page rather than the viewport and scrolls away
     * with it. Measured: top resolved to -8445px. The navbar avoids this only by living
     * outside that wrapper.
     *
     * Sticky resolves against the scroll container instead, so it is unaffected and pins to
     * the top of the viewport exactly as intended. `h-0` keeps it out of the flow so it adds
     * no space above the hero; the line itself is drawn by the child. */
    <div
      aria-hidden
      data-decor="reading-progress"
      className="read-progress pointer-events-none sticky top-0 z-[60] h-0"
    >
      <i className="block h-px w-full bg-[linear-gradient(90deg,var(--color-arc),var(--color-flare))]" />
    </div>
  );
}
