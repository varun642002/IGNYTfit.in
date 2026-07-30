import Image from "next/image";
import { shot } from "@/lib/shots";

/**
 * A real screenshot, rendered to fill a <PhoneShell>.
 *
 * The single way an app image reaches the page. Every caller passes a registry
 * id rather than a path, so a screenshot can never be referenced by a filename
 * that has moved, and `shot()` throws at build time on an unknown id instead of
 * rendering a broken image.
 *
 * `object-contain`, never `object-cover`. The frame is 9:19.5 and the captures
 * are 737×1600 and 540×1170 — close, but cover would still shave an edge, and
 * no part of the interface may be cut.
 *
 * The image is decorative: `alt=""`. The screen it shows is described in the
 * heading and body copy next to it, and a screen reader announcing "Workout
 * screen" twice helps nobody. Where a device stands alone, PhoneShell's `label`
 * carries the description instead.
 */
export function ShotScreen({
  id,
  priority = false,
  sizes = "(min-width: 640px) 360px, 90vw",
}: {
  /** Registry id from `lib/shots.ts`. */
  id: string;
  priority?: boolean;
  sizes?: string;
}) {
  const entry = shot(id);

  return (
    <Image
      src={entry.src}
      alt=""
      fill
      sizes={sizes}
      priority={priority}
      className="object-contain"
    />
  );
}
