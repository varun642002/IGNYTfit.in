import { Check } from "lucide-react";
import { AppScreen } from "@/components/device/AppScreens";
import { PhoneScene, type SceneSlide } from "@/components/device/PhoneScene";
import { Aurora } from "@/components/ui/Aurora";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section, SectionHeading } from "@/components/ui/Section";
import { screens, type ScreenId } from "@/lib/screens";

/**
 * Product showcase.
 *
 * Six screens, each with its own copy, advancing on a timer and selectable by
 * hand. The device sits on the right and the words change beside it — which is
 * the arrangement that lets someone read a claim and see it at the same moment,
 * rather than scrolling between the two.
 *
 * Everything here except the transition itself is server-rendered: the screens
 * and all six copy blocks are static markup handed to <PhoneScene> as props, so
 * the only JavaScript this section adds is the slide timer and the crossfade.
 */

const SHOWCASE: Array<{ id: ScreenId; label: string }> = [
  { id: "dashboard", label: "Dashboard" },
  { id: "workout", label: "Workout tracking" },
  { id: "nutrition", label: "Nutrition" },
  { id: "weight", label: "Progress" },
  { id: "progress", label: "Analytics" },
  { id: "health-connect", label: "Health Connect" },
];

export function Showcase() {
  const slides: SceneSlide[] = SHOWCASE.map(({ id, label }) => {
    const meta = screens.find((screen) => screen.id === id)!;

    return {
      id,
      label,
      description: `IGNYT ${meta.title} screen. ${meta.description}`,
      screen: <AppScreen id={id} />,
      aside: (
        <div>
          <Eyebrow tone="arc" className="mb-5">
            {label}
          </Eyebrow>
          <h3 className="text-[clamp(1.7rem,3.6vw,2.5rem)] font-black leading-[1.08] tracking-[-0.035em]">
            {meta.title}
          </h3>
          <p className="mt-5 max-w-lg text-[16px] leading-[1.72] text-ash">
            {meta.description}
          </p>
          <ul className="mt-7 flex flex-col gap-3.5">
            {meta.benefits.map((benefit) => (
              <li key={benefit} className="flex gap-3 text-[15px] leading-[1.6] text-ash">
                <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-pill bg-arc/14 text-arc">
                  <Check aria-hidden className="size-3" strokeWidth={3.5} />
                </span>
                {benefit}
              </li>
            ))}
          </ul>
        </div>
      ),
    };
  });

  return (
    <Section id="showcase" className="relative">
      <Aurora tone="arc" className="opacity-70" />

      <SectionHeading
        id="showcase"
        eyebrow="Product tour"
        title="Six screens. One training log."
        lead="Everything below is the actual interface, drawn live rather than screenshotted — so it stays sharp at any size and animates its own data as you read."
        className="mb-20"
      />

      <PhoneScene slides={slides} layout="split" interval={5200} />
    </Section>
  );
}
