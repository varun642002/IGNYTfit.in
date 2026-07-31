import { Check } from "lucide-react";
import { PhoneScene, type SceneSlide } from "@/components/device/PhoneScene";
import { Aurora } from "@/components/ui/Aurora";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section, SectionHeading } from "@/components/ui/Section";
import { ShotScreen } from "@/components/device/ShotScreen";
import { claim, shot } from "@/lib/shots";

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

/**
 * Six real screens, deliberately none of the six the hero cycles through, so
 * scrolling from the fold into the tour shows the reader something new rather
 * than repeating the carousel they have just watched.
 *
 * `claim` fails the build if this list ever repeats a screen within the tour.
 */
const SHOWCASE: Array<{ id: string; label: string; body: string; points: [string, string, string] }> = [
  {
    id: "hyrox",
    label: "Training plans",
    body: "An eight-week HYROX programme at beginner, intermediate or advanced level — and a live stopwatch that runs the real eight-run, eight-station race format.",
    points: [
      "Five structured sessions a week, tracked against the plan",
      "Race Simulation with a 90-minute estimate to pace against",
      "Your own routines run alongside the programme",
    ],
  },
  {
    id: "analytics",
    label: "Analytics",
    body: "Volume, completed sets, estimated calories and average frequency across any window from seven days to a full year.",
    points: [
      "Ranges from 7 days to 1 year on every chart",
      "Weekly activity by sets, duration or volume",
      "Training time and workout count side by side",
    ],
  },
  {
    id: "muscle-balance",
    label: "Muscle balance",
    body: "Thirty days of work plotted across six muscle groups against the thirty before it, so a programme drifting towards what you enjoy shows up as a shape.",
    points: [
      "Six muscle groups, this month against last",
      "Sessions, volume and training time compared month on month",
      "All-time totals: current streak, longest streak, workouts logged",
    ],
  },
  {
    id: "achievements",
    label: "Achievements",
    body: "Twenty badges covering streaks and workout milestones, each stamped with the date you unlocked it.",
    points: [
      "Twenty achievements, with progress towards the locked ones",
      "Streaks at 7 and 14 days, milestones to fifty workouts",
      "Every badge dated, so the timeline is real",
    ],
  },
  {
    id: "habits",
    label: "Habits",
    body: "The behaviours underneath the training — turn up, eat properly, sleep — each with its own streak and personal best.",
    points: [
      "Add any habit you like, not a fixed list",
      "Current streak and personal best held per habit",
      "Weekly and monthly completion counts",
    ],
  },
  {
    id: "tools",
    label: "Tools",
    body: "Training plans, the exercise library, the goal engine, weight logging, Health Connect and the calculators, gathered in one place.",
    points: [
      "Health Connect, connected and syncing on-device",
      "BMI, BMR, TDEE, macro and heart-rate-zone calculators",
      "Smart goal engine that sets targets from your body stats",
    ],
  },
];

claim("home-showcase", SHOWCASE.map((entry) => entry.id));

export function Showcase() {
  const slides: SceneSlide[] = SHOWCASE.map(({ id, label, body, points }) => {
    const meta = shot(id);

    return {
      id,
      label,
      description: `IGNYT — ${meta.screen}. ${meta.purpose}.`,
      screen: <ShotScreen id={id} sizes="330px" />,
      aside: (
        <div>
          <Eyebrow tone="arc" className="mb-5">
            {label}
          </Eyebrow>
          <h3 className="text-[clamp(1.7rem,3.6vw,2.5rem)] font-black leading-[1.08] tracking-[-0.035em]">
            {meta.screen}
          </h3>
          <p className="mt-5 max-w-lg text-[16px] leading-[1.72] text-ash">
            {body}
          </p>
          <ul className="mt-7 flex flex-col gap-3.5">
            {points.map((point) => (
              <li key={point} className="flex gap-3 text-[15px] leading-[1.6] text-ash">
                <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-pill bg-arc/14 text-arc">
                  <Check aria-hidden className="size-3" strokeWidth={3.5} />
                </span>
                {point}
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
        lead="Every screen below is a real screenshot of the current Android build, shown exactly as captured."
        className="mb-20"
      />

      <PhoneScene slides={slides} layout="split" interval={5200} realShots />
    </Section>
  );
}
