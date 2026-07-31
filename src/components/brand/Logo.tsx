import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * The official IGNYT logo, as supplied.
 *
 * `public/logo-official.png` is the master and the only definition of the mark
 * anywhere in this project. Every icon the site ships — the manifest icons, the
 * Apple touch icon, the favicon, the Open Graph card — is a resize of that one
 * file, produced by `npm run icons`. Nothing here is redrawn, traced or
 * reconstructed, so there is no second version of the logo that can drift away
 * from the real one.
 *
 * Do not add an SVG fallback, an inline path, or a "simplified" mark for small
 * sizes. That is exactly how a project ends up with two logos.
 *
 * The artwork is square with its own black ground, which is why it needs no
 * tile, plate or container behind it on this site — the page is pure black and
 * the mark sits directly on it.
 */
export const LOGO_SRC = "/logo-official.png";

/**
 * The mark on its own.
 *
 * `sizes` is derived from the rendered width so Next.js serves an appropriately
 * scaled file rather than handing the 1254px master to a 36px navbar slot.
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
      className={cn("rounded-[22%] object-contain", className)}
    />
  );
}

/**
 * Full lockup: mark + "IGNYT" wordmark.
 *
 * The wordmark beside the mark is real text rather than part of the image, so
 * it stays crisp at every size and remains selectable, searchable and
 * translatable. The artwork carries its own wordmark too, but at navbar size
 * that is illegible detail — there it reads as texture, and the text carries
 * the name.
 *
 * The wide letter-spacing is not decoration: it matches the spacing inside the
 * supplied artwork, so the two wordmarks agree when they appear near each other.
 */
export function Logo({
  className,
  markClassName,
  wordClassName,
  showWord = true,
  priority = false,
  size = 36,
}: {
  className?: string;
  markClassName?: string;
  wordClassName?: string;
  showWord?: boolean;
  priority?: boolean;
  size?: number;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark
        size={size}
        priority={priority}
        className={cn("shrink-0", markClassName)}
      />
      {showWord ? (
        <span
          className={cn(
            "text-[19px] font-black leading-none tracking-[0.18em] text-chalk",
            wordClassName,
          )}
        >
          IGNYT
        </span>
      ) : null}
    </span>
  );
}
