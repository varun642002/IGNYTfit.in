import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * The official IGNYT logo, as supplied.
 *
 * `public/logo-official.png` is the master and the only definition of the mark
 * anywhere in this project. Every icon the site ships — the manifest icons, the
 * Apple touch icon, the favicon — is a resize of that one file, produced by
 * `npm run icons`. Nothing here is redrawn, traced or reconstructed, so there
 * is no second version of the logo that can drift away from the real one.
 *
 * The artwork is square with its own near-black ground, which matches the
 * site's `#08090d` surface. It therefore needs no tile, plate or container
 * behind it — the earlier ember gradient tile existed to hold a bare bolt
 * glyph, and the supplied mark already carries its own.
 */
export const LOGO_SRC = "/logo-official.png";

/**
 * The mark on its own.
 *
 * `sizes` is set from the rendered width so Next.js serves an appropriately
 * scaled file rather than the 1254px master to a 36px navbar slot.
 */
export function LogoMark({
  className,
  size = 36,
  priority = false,
  title,
}: {
  className?: string;
  /** Rendered pixel size — drives the responsive `sizes` hint. */
  size?: number;
  /** Set on the above-the-fold instance only. */
  priority?: boolean;
  /** Provide only when the mark stands alone as a meaningful image. */
  title?: string;
}) {
  return (
    <Image
      src={LOGO_SRC}
      alt={title ?? ""}
      aria-hidden={title ? undefined : true}
      width={size}
      height={size}
      sizes={`${size}px`}
      priority={priority}
      className={cn("rounded-[10px] object-contain", className)}
    />
  );
}

/**
 * Full lockup: mark + "IGNYT" wordmark.
 *
 * The wordmark beside the mark is real text, not part of the image, so it stays
 * crisp at every size and remains selectable and searchable. The logo artwork
 * contains its own wordmark too, but at navbar size that is illegible detail —
 * it reads as texture and the text carries the name.
 */
export function Logo({
  className,
  markClassName,
  wordClassName,
  showWord = true,
  priority = false,
}: {
  className?: string;
  markClassName?: string;
  wordClassName?: string;
  showWord?: boolean;
  priority?: boolean;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark
        size={36}
        priority={priority}
        className={cn("size-9 shrink-0", markClassName)}
      />
      {showWord ? (
        <span
          className={cn(
            "text-[19px] font-black tracking-[0.16em] text-text",
            wordClassName,
          )}
        >
          IGNYT
        </span>
      ) : null}
    </span>
  );
}
