import { LogoMark } from "@/components/brand/Logo";
import { cn } from "@/lib/utils";

/**
 * Branded loading indicator for a genuine async boundary.
 *
 * Use it wherever a real Suspense boundary is introduced — a dynamically
 * imported widget, or a route segment that fetches at request time:
 *
 *     <Suspense fallback={<LoadingState label="Loading screenshots…" />}>
 *
 * The route-level fallback at `app/loading.tsx` is a separate, simpler
 * component. This one takes a label and is meant to sit inside a page that has
 * already painted, so it does not try to fill the viewport the way that one
 * does.
 */
export function LoadingState({
  label = "Loading IGNYT…",
  className,
}: {
  label?: string;
  className?: string;
}) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        "flex min-h-[48vh] flex-col items-center justify-center gap-6",
        className,
      )}
    >
      <span className="relative grid size-16 place-items-center">
        <span
          aria-hidden
          data-decor="ambient"
          className="absolute inset-0 animate-halo rounded-pill bg-arc/30"
        />
        <LogoMark size={40} className="relative size-10" />
      </span>
      <p className="text-[14px] font-semibold text-ash-dim">{label}</p>
    </div>
  );
}
