import type { Metadata } from "next";
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
import { shot } from "@/lib/shots";

export const metadata: Metadata = createMetadata({
  title: "Features",
  description:
    "See IGNYT in use: workout tracking, HYROX training plans and race simulation, food logging and macros, training analytics, body composition and heart rate zones.",
  path: "/features",
  keywords: [
    "IGNYT features",
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
 * WHICH IMAGE EACH CHAPTER USES
 *
 * Every chapter uses a real screenshot of the shipped build, pulled from the
 * registry in `lib/shots.ts` by id. No vector mockups appear on this page.
 *
 * Each screenshot is used exactly once, across the whole site. The registry
 * enforces that at build time rather than trusting anyone to remember — see
 * `assertUniqueShots()`.
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
    shot: shot("workout").src,
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
    shot: shot("hyrox").src,
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
    shot: shot("food-log").src,
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
    shot: shot("analytics").src,
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
    shot: shot("weight").src,
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
    shot: shot("calculators").src,
    graphic: <StreakGraphic />,
    chips: [
      { label: "Max heart rate", value: "195 bpm", position: "-left-20 top-[20%]" },
      { label: "Zones", value: "5", position: "-left-16 bottom-[24%]" },
    ],
  },
  {
    id: "today",
    eyebrow: "Every day",
    title: "The whole day, before you have scrolled.",
    lead: "Calories, workout, steps, active minutes, water and sleep — six figures against six goals, with the weekly target as a single ring beside them.",
    points: [
      "Six of today's numbers against their goals, on one screen",
      "A weekly goal ring that fills as the week goes on",
      "Sleep and steps arrive from Health Connect without a second account",
    ],
    tone: "arc",
    shot: shot("home").src,
    graphic: <StreakGraphic />,
    chips: [
      { label: "Weekly goal", value: "Tracked", position: "-right-16 top-[18%]" },
      { label: "Metrics today", value: "6", position: "-right-20 bottom-[24%]" },
    ],
  },
  {
    id: "balance",
    eyebrow: "Balance",
    title: "Find the muscle group you keep avoiding.",
    lead: "Thirty days of work plotted across six muscle groups against the thirty before it, so a programme drifting towards what you enjoy shows up as a shape rather than as a feeling.",
    points: [
      "Six muscle groups, this month against last",
      "Sessions, volume and training time compared month on month",
      "All-time totals: current streak, longest streak, workouts logged",
    ],
    tone: "flare",
    shot: shot("muscle-balance").src,
    graphic: <VolumeGraphic />,
    chips: [
      { label: "Groups tracked", value: "6", position: "-left-20 top-[16%]" },
      { label: "Comparison", value: "30 days", position: "-left-16 bottom-[24%]" },
    ],
  },
  {
    id: "week",
    eyebrow: "The week",
    title: "Seven days, four numbers, one chart.",
    lead: "Workouts against goal, time under the bar, total volume and records — then the week's training volume broken down by day, so a heavy Monday and an empty Thursday are both obvious.",
    points: [
      "Goal bars on the figures, not just the figures",
      "Volume by day across the week",
      "Body weight charted underneath, over any range",
    ],
    tone: "arc",
    shot: shot("progress").src,
    graphic: <TrendGraphic />,
    chips: [
      { label: "This week", value: "+56%", position: "-right-16 top-[20%]" },
      { label: "Volume", value: "32,304 kg", position: "-right-20 bottom-[22%]" },
    ],
  },
  {
    id: "records",
    eyebrow: "Records",
    title: "Proof the programme is working.",
    lead: "A consistency heatmap, the weekly goal, and every personal record with the increment and the date it was set — then eleven ways into the detail underneath.",
    points: [
      "A heatmap of the week, and a weekly goal that completes",
      "Personal records with how much you added and when",
      "Exercise, nutrition, body and plan progress, reports and photos",
    ],
    tone: "flare",
    shot: shot("records").src,
    graphic: <RouteGraphic />,
    chips: [
      { label: "Records held", value: "836", position: "-left-20 top-[18%]" },
      { label: "Weekly goal", value: "100%", position: "-left-16 bottom-[26%]" },
    ],
  },
  {
    id: "achievements",
    eyebrow: "Achievements",
    title: "Earned for turning up repeatedly.",
    lead: "Twenty badges covering streaks and workout milestones, each stamped with the date you unlocked it — rewarding the thing that actually produces results rather than one good week.",
    points: [
      "Twenty achievements, with progress towards the ones still locked",
      "Every badge dated, so the timeline is real",
      "Streaks at 7 and 14 days, milestones from first workout to fiftieth",
    ],
    tone: "flare",
    shot: shot("achievements").src,
    graphic: <StreakGraphic />,
    chips: [
      { label: "Unlocked", value: "14 of 20", position: "-right-16 top-[20%]" },
      { label: "Longest streak", value: "17 days", position: "-right-20 bottom-[24%]" },
    ],
  },
  {
    id: "habits",
    eyebrow: "Habits",
    title: "Build consistency. Build you.",
    lead: "The behaviours underneath the training — turn up, eat properly, sleep. Each keeps its own streak, its personal best, and how many days you have hit it this week and this month.",
    points: [
      "Add any habit you like, not a fixed list",
      "Current streak and personal best held per habit",
      "Weekly and monthly completion counts side by side",
    ],
    tone: "arc",
    shot: shot("habits").src,
    graphic: <MacroGraphic />,
    chips: [
      { label: "Habits active", value: "3", position: "-left-20 top-[20%]" },
      { label: "Best streak", value: "8 days", position: "-left-16 bottom-[24%]" },
    ],
  },
  {
    id: "tools",
    eyebrow: "Tools",
    title: "Everything you need to train smarter.",
    lead: "Training plans, the exercise library, the goal engine, weight logging, Health Connect, the food log and the calculators — gathered in one place rather than buried in settings.",
    points: [
      "Training: plans, library, goals and weight logging",
      "Health: Health Connect, connected and syncing on-device",
      "Nutrition: the food log and the BMI, BMR, TDEE and macro calculators",
    ],
    tone: "arc",
    shot: shot("tools").src,
    graphic: <RaceGraphic />,
    chips: [
      { label: "Workouts logged", value: "327", position: "-right-16 top-[18%]" },
      { label: "Health Connect", value: "Connected", position: "-right-20 bottom-[24%]" },
    ],
  },
];

export default function ScreenshotsPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([{ name: "Features", path: "/features" }])}
      />

      <PageHero
        eyebrow="Features"
        title={
          <>
            One app where{" "}
            <span className="text-arc-gradient">five used to be</span>
          </>
        }
        lead="Training, HYROX, nutrition, analytics, records, habits and the tools underneath them — every screen below is the real application, shown exactly as captured."
      >
        <PlayStoreButton />
        <ButtonLink href="/download" variant="outline" size="lg">
          Release details
        </ButtonLink>
      </PageHero>

      {CHAPTERS.map((chapter, index) => (
        <FeatureStory key={chapter.id} chapter={chapter} index={index} />
      ))}

      <DownloadCta />
    </>
  );
}
