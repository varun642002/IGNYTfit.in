import type { Metadata } from "next";
import { AppScreen } from "@/components/device/AppScreens";
import { DownloadCta } from "@/components/home/DownloadCta";
import {
  FeatureStory,
  MacroGraphic,
  RaceGraphic,
  RouteGraphic,
  StreakGraphic,
  TrendGraphic,
  VolumeGraphic,
  type StoryChapter,
} from "@/components/screenshots/FeatureStory";
import { breadcrumbSchema, JsonLd } from "@/components/seo/JsonLd";
import { ButtonLink } from "@/components/ui/Button";
import { PageHero } from "@/components/ui/PageHero";
import { PlayStoreButton } from "@/components/ui/PlayStoreButton";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Screenshots",
  description:
    "See IGNYT in use: workout tracking, HYROX training plans and race simulation, food logging and macros, training analytics, body composition and heart rate zones.",
  path: "/screenshots",
  keywords: [
    "IGNYT screenshots",
    "fitness app screenshots",
    "HYROX training app",
    "workout tracker screenshots",
    "food log app screens",
  ],
});

/**
 * The product story, told one chapter at a time.
 *
 * This page used to be a gallery — sixteen devices in a grid, which reads as
 * documentation. It is now six full-height chapters, each with a single phone
 * as its hero and an animated graphic that reinforces what that screen does.
 *
 * WHICH IMAGE EACH CHAPTER USES, AND WHY
 *
 * Four chapters use real screenshots of the shipped build, and two use the
 * drawn mockups. That is deliberate rather than a shortfall: a chapter gets a
 * real screenshot only where the frame has been positively identified. Where it
 * has not, it gets the vector mockup — which is verified against the app,
 * stays sharp at any size and animates its own charts. Guessing which
 * screenshot is which and captioning it wrongly would be worse than either.
 *
 * ON THE ANIMATIONS AROUND THE DEVICE
 *
 * They are data graphics, not characters: a route drawing itself, macro rings
 * filling, a consistency grid completing, volume bars growing, the race format
 * assembling, a weight trend settling. Animated athletes would need licensed
 * Lottie or Rive assets, which this project does not have and which would cost
 * 150–250KB of runtime before the first frame — against a target of 60fps and
 * a Lighthouse score above 95.
 */
const CHAPTERS: StoryChapter[] = [
  {
    id: "training",
    eyebrow: "Training",
    title: "Every set, while the bar is still loaded.",
    lead: "The week opens on four numbers that matter — sessions, time under the bar, records and total volume — then hands you straight to the routine you are part-way through.",
    points: [
      "Weight and reps carry over from your last session, so you confirm a number rather than remember one",
      "The rest timer starts itself and keeps counting on the lock screen",
      "A personal record is flagged the moment you beat it",
    ],
    tone: "arc",
    screen: <AppScreen id="workout" />,
    graphic: <VolumeGraphic />,
    chips: [
      { label: "Session volume", value: "32,304 kg", position: "-right-16 top-[14%]" },
      { label: "This week", value: "7 workouts", position: "-right-20 bottom-[26%]" },
    ],
  },
  {
    id: "hyrox",
    eyebrow: "HYROX",
    title: "Eight weeks of structure. Then the race itself.",
    lead: "A full HYROX programme at beginner, intermediate or advanced level, tracked week by week — and a live stopwatch that runs the real eight-run, eight-station format when you are ready to test it.",
    points: [
      "An eight-week structured schedule with five sessions a week",
      "Race Simulation times the full format with a 90-minute estimate to pace against",
      "Progress tracked against the plan rather than guessed at",
    ],
    tone: "flare",
    shot: "/screenshots/shot-01.jpg",
    graphic: <RaceGraphic />,
    chips: [
      { label: "Programme", value: "Week 1 of 8", position: "-left-20 top-[18%]" },
      { label: "Est. time", value: "90 min", position: "-left-16 bottom-[22%]" },
    ],
  },
  {
    id: "nutrition",
    eyebrow: "Nutrition",
    title: "A calorie budget that answers back.",
    lead: "Log a meal and the remaining figure moves immediately. 3,160 foods live on the device, so search returns instantly in a basement gym with no signal at all.",
    points: [
      "Calories eaten, budget and remaining — on one card, always current",
      "Protein, carbohydrate and fat per item, not just per day",
      "Diet plans, insights and recipes one tap from the log",
    ],
    tone: "arc",
    screen: <AppScreen id="food-log" />,
    graphic: <MacroGraphic />,
    chips: [
      { label: "Remaining", value: "711 kcal", position: "-right-16 top-[20%]" },
      { label: "Offline foods", value: "3,160", position: "-right-20 bottom-[24%]" },
    ],
  },
  {
    id: "analytics",
    eyebrow: "Analytics",
    title: "Twelve weeks, not twelve hours.",
    lead: "Training volume, completed sets, estimated calories and average frequency across any window from seven days to a year — because a training block is the unit fitness actually happens in.",
    points: [
      "Ranges from 7 days to 1 year, on every chart",
      "Volume, sets, duration and frequency tracked together",
      "Personal records listed with the increment and the date",
    ],
    tone: "arc",
    shot: "/screenshots/shot-06.jpg",
    graphic: <RouteGraphic />,
    chips: [
      { label: "8-week volume", value: "142,047 kg", position: "-left-20 top-[16%]" },
      { label: "Completed sets", value: "368", position: "-left-16 bottom-[26%]" },
    ],
  },
  {
    id: "body",
    eyebrow: "Body",
    title: "The trend, not the noise.",
    lead: "Scale weight moves three ways in a week. A smoothed trend line separates the signal from the salty dinner, with body fat, lean mass and every tape measurement charted beside it.",
    points: [
      "Weight, BMI, body fat, lean mass, muscle mass, waist, chest, arms and legs",
      "Ranges from 7 days to a full year, with a goal and an estimated completion date",
      "Progress photos stored on the device, dated and private",
    ],
    tone: "flare",
    shot: "/screenshots/shot-04.jpg",
    graphic: <TrendGraphic />,
    chips: [
      { label: "Trend", value: "Down", position: "-right-16 top-[22%]" },
      { label: "Tracked metrics", value: "9", position: "-right-20 bottom-[20%]" },
    ],
  },
  {
    id: "zones",
    eyebrow: "Health",
    title: "Know which effort you are actually in.",
    lead: "Your maximum heart rate worked out from your age, split into five training zones — each with its percentage band and the exact beats per minute it corresponds to.",
    points: [
      "Five zones, from active recovery through to maximum effort",
      "Optional resting heart rate for a more accurate range",
      "Alongside BMI, BMR, TDEE and macro calculators in the same place",
    ],
    tone: "arc",
    shot: "/screenshots/shot-02.jpg",
    graphic: <StreakGraphic />,
    chips: [
      { label: "Max heart rate", value: "195 bpm", position: "-left-20 top-[20%]" },
      { label: "Zones", value: "5", position: "-left-16 bottom-[24%]" },
    ],
  },
];

export default function ScreenshotsPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([{ name: "Screenshots", path: "/screenshots" }])}
      />

      <PageHero
        eyebrow="The product"
        title={
          <>
            Six things IGNYT does{" "}
            <span className="text-arc-gradient">better than five apps</span>
          </>
        }
        lead="Training, HYROX, nutrition, analytics, body composition and heart rate — each one on its own screen, and all of them sharing the same set of numbers."
      >
        <PlayStoreButton />
        <ButtonLink href="/features" variant="outline" size="lg">
          Read the feature list
        </ButtonLink>
      </PageHero>

      {CHAPTERS.map((chapter, index) => (
        <FeatureStory key={chapter.id} chapter={chapter} index={index} />
      ))}

      <DownloadCta />
    </>
  );
}
