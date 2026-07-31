import { cn } from "@/lib/utils";
import { site } from "@/lib/site";

/**
 * Google Play triangle, drawn inline so the store call to action costs no
 * network request and stays crisp at any size.
 *
 * These four colours are Google's, and the shape is theirs; it is reproduced
 * here only as the store's own identifying glyph on a link that goes to that
 * store, which is what it is for.
 */
function PlayGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 512 512" className={className} aria-hidden focusable="false">
      <path
        fill="#00d0ff"
        d="M47 24 300 256 47 488c-9-6-15-17-15-31V55c0-14 6-25 15-31z"
      />
      <path fill="#00f076" d="M47 24c7-5 17-5 27 1l273 155-47 76z" />
      <path fill="#ffc900" d="M347 332 300 256l47-76 79 45c22 13 22 49 0 62z" />
      <path fill="#f43249" d="M47 488c7 5 17 5 27-1l273-155-47-76z" />
    </svg>
  );
}

/**
 * Store call to action.
 *
 * An IGNYT-styled button rather than Google's supplied badge artwork, so it
 * sits inside this design system instead of on top of it. If a Play listing
 * review ever asks for the official badge, drop the asset from Google's Play
 * brand toolkit into `public/` and swap this component's inner markup — every
 * caller across the site picks the change up with no other edits.
 */
export function PlayStoreButton({
  className,
  size = "lg",
  label = "Google Play",
}: {
  className?: string;
  size?: "md" | "lg";
  label?: string;
}) {
  return (
    <a
      href={site.links.play}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "group relative isolate inline-flex items-center gap-3.5 overflow-hidden rounded-pill",
        "border border-hairline bg-[linear-gradient(180deg,var(--color-carbon-2),var(--color-carbon))]",
        "text-left shadow-[inset_0_1px_0_0_rgba(255,255,255,0.07)]",
        "transition-[transform,border-color,box-shadow] duration-300 ease-glide",
        "hover:-translate-y-0.5 hover:border-arc/55",
        "hover:shadow-[0_20px_50px_-20px_rgba(61,123,255,0.75),inset_0_1px_0_0_rgba(255,255,255,0.12)]",
        "active:translate-y-0 active:scale-[0.985]",
        size === "lg" ? "h-[58px] px-6" : "h-12 px-4.5",
        className,
      )}
    >
      <PlayGlyph className={size === "lg" ? "size-6" : "size-5"} />
      <span className="flex flex-col leading-none">
        <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-ash-dim">
          Download on
        </span>
        <span
          className={cn(
            "mt-1.5 font-bold text-chalk",
            size === "lg" ? "text-[15.5px]" : "text-[14px]",
          )}
        >
          {label}
        </span>
      </span>
    </a>
  );
}
