import { AppScreen } from "@/components/device/AppScreens";
import { PhoneShell } from "@/components/device/PhoneShell";
import { ScreenRail } from "@/components/screenshots/ScreenRail";
import { screens, type ScreenMeta } from "@/lib/screens";

/**
 * The screen gallery.
 *
 * A server component: every phone in the rail is static markup, and the only
 * client code involved is <ScreenRail>'s two arrow buttons. Sixteen device
 * mockups, each with self-drawing charts, for the cost of one small event
 * handler.
 *
 * Cards are `w-[236px]` with a `sm:` step rather than a percentage, so the rail
 * shows a consistent number of phones at every width and the snap points stay
 * predictable — a percentage-width carousel snaps to a different position on
 * every device, which is how these end up feeling loose.
 */
export function ScreenGallery({
  items = screens,
  className,
}: {
  items?: ScreenMeta[];
  className?: string;
}) {
  return (
    <ScreenRail label="IGNYT app screens" className={className}>
      {items.map((screen) => (
        <figure
          key={screen.id}
          className="w-[236px] shrink-0 snap-center sm:w-[262px]"
        >
          <PhoneShell
            glow={false}
            label={`IGNYT ${screen.title} screen. ${screen.description}`}
          >
            <AppScreen id={screen.id} />
          </PhoneShell>

          <figcaption className="mt-6 px-1">
            <h3 className="text-[15.5px] font-bold tracking-[-0.02em] text-chalk">
              {screen.title}
            </h3>
            <p className="mt-2 text-[13.5px] leading-[1.6] text-ash">
              {screen.description}
            </p>
          </figcaption>
        </figure>
      ))}
    </ScreenRail>
  );
}
