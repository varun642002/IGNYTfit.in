import {
  Activity,
  BellRing,
  Calculator,
  CalendarDays,
  Camera,
  ChartNoAxesColumn,
  ChefHat,
  CloudUpload,
  Droplets,
  Dumbbell,
  FileBarChart,
  Flag,
  Flame,
  HeartPulse,
  Leaf,
  LibraryBig,
  Moon,
  NotebookPen,
  Pill,
  Repeat,
  Scale,
  Target,
  Timer,
  TrendingUp,
  Trophy,
  UtensilsCrossed,
  WifiOff,
  type LucideIcon,
} from "lucide-react";

/**
 * Which of the two brand accents a feature is drawn in — plus two supporting
 * hues for the hydration and body-composition families, so a grid of eighteen
 * cards has some rhythm without turning into a colour wheel.
 */
export type FeatureAccent = "flare" | "arc" | "cyan" | "good";

export interface Feature {
  title: string;
  /** One sentence. Kept short enough to read in a card at a glance. */
  description: string;
  icon: LucideIcon;
  accent: FeatureAccent;
  /** Anchor id on /features, also used by the home grid's deep links. */
  id: string;
}

/**
 * The sixteen capabilities the product ships today.
 *
 * Ordered by how a new user meets them: train, eat, drink, supplement,
 * measure, then the platform features that support all of it.
 */
export const features: Feature[] = [
  {
    id: "workout-tracking",
    title: "Workout tracking",
    description:
      "Log sets, reps and load live, with an automatic rest timer and personal records detected as you lift.",
    icon: Dumbbell,
    accent: "flare",
  },
  {
    id: "food-logging",
    title: "Food logging",
    description:
      "Log meals by breakfast, lunch, dinner and snacks, with favourites and repeat-yesterday for the meals you eat weekly.",
    icon: UtensilsCrossed,
    accent: "good",
  },
  {
    id: "calorie-counter",
    title: "Calorie counter",
    description:
      "Calories in, calories burned and calories remaining, recalculated the moment anything changes.",
    icon: Flame,
    accent: "flare",
  },
  {
    id: "macro-tracking",
    title: "Macro tracking",
    description:
      "Protein, carbohydrate and fat tracked against targets derived from your bodyweight and goal.",
    icon: ChartNoAxesColumn,
    accent: "arc",
  },
  {
    id: "micronutrients",
    title: "Micronutrients",
    description:
      "Fibre, iron, calcium, vitamin C and sodium, so the gaps calorie apps ignore stop being invisible.",
    icon: Leaf,
    accent: "good",
  },
  {
    id: "diet-plans",
    title: "Diet plans",
    description:
      "Build a repeatable weekly plan with meals and timings, then score how closely you actually followed it.",
    icon: NotebookPen,
    accent: "flare",
  },
  {
    id: "fasting",
    title: "Fasting",
    description:
      "16:8 or any custom window, with a live countdown, current stage and a history of every completed fast.",
    icon: Timer,
    accent: "arc",
  },
  {
    id: "water-tracker",
    title: "Water tracker",
    description:
      "One-tap hydration logging with quick-add sizes and reminders spaced across your waking hours.",
    icon: Droplets,
    accent: "cyan",
  },
  {
    id: "supplement-tracker",
    title: "Supplement tracker",
    description:
      "Your full stack with doses, timings, 30-day adherence and a warning before you run out.",
    icon: Pill,
    accent: "good",
  },
  {
    id: "weight-tracking",
    title: "Weight tracking",
    description:
      "Scale weight, body fat, lean mass and tape measurements, smoothed into a trend you can actually read.",
    icon: Scale,
    accent: "good",
  },
  {
    id: "progress-charts",
    title: "Progress charts",
    description:
      "Training volume, streaks, session counts and every personal record across a full training block.",
    icon: TrendingUp,
    accent: "flare",
  },
  {
    id: "goals",
    title: "Goals & targets",
    description:
      "Calorie, protein, water, step and training targets derived from your body stats and the goal you picked, not from a generic default.",
    icon: Target,
    accent: "arc",
  },
  {
    id: "achievements",
    title: "Achievements",
    description:
      "Streaks, milestones and long-run consistency badges — earned for showing up repeatedly rather than for one good week.",
    icon: Trophy,
    accent: "flare",
  },
  {
    id: "habit-tracker",
    title: "Habit tracker",
    description:
      "The behaviours underneath the training. Each habit keeps its own streak, its personal best, and weekly and monthly completion counts.",
    icon: Repeat,
    accent: "good",
  },
  {
    id: "training-plans",
    title: "Training plans",
    description:
      "Structured multi-week programmes, including an eight-week HYROX schedule at beginner, intermediate and advanced levels, with progress tracked week by week.",
    icon: CalendarDays,
    accent: "flare",
  },
  {
    id: "race-simulation",
    title: "HYROX race simulation",
    description:
      "A live stopwatch through the full race format — eight runs and eight stations, with a 90-minute estimate to pace yourself against.",
    icon: Flag,
    accent: "flare",
  },
  {
    id: "heart-rate-zones",
    title: "Heart rate zones",
    description:
      "Your maximum heart rate from your age, split into five training zones — from active recovery to maximum effort — each with its percentage band and exact bpm range.",
    icon: Activity,
    accent: "arc",
  },
  {
    id: "exercise-library",
    title: "Exercise library",
    description:
      "Every movement with its equipment, target muscles and technique cues — and your own history against each one.",
    icon: LibraryBig,
    accent: "arc",
  },
  {
    id: "calculator",
    title: "Body calculator",
    description:
      "BMI, BMR, TDEE and macro splits worked out from your own measurements, so targets start from arithmetic rather than a guess.",
    icon: Calculator,
    accent: "arc",
  },
  {
    id: "reports",
    title: "Reports",
    description:
      "Weekly and monthly summaries pulling training, nutrition and body data into one review you can actually act on.",
    icon: FileBarChart,
    accent: "arc",
  },
  {
    id: "progress-photos",
    title: "Progress photos",
    description:
      "A dated photo timeline stored on your device, because twelve weeks of change is easier to see than to read off a chart.",
    icon: Camera,
    accent: "good",
  },
  {
    id: "recipes",
    title: "Recipes",
    description:
      "Meals with their macros already worked out, ready to log in one tap and to drop straight into a diet plan.",
    icon: ChefHat,
    accent: "good",
  },
  {
    id: "health-connect",
    title: "Health Connect",
    description:
      "Reads 17 Android Health Connect data types — steps, heart rate, sleep, body composition — entirely on-device.",
    icon: HeartPulse,
    accent: "arc",
  },
  {
    id: "notifications",
    title: "Smart reminders",
    description:
      "Independent local schedules for water, training, meals, supplements, weigh-ins and fasting windows.",
    icon: BellRing,
    accent: "flare",
  },
  {
    id: "cloud-backup",
    title: "Cloud backup",
    description:
      "Optional, off by default. Sign in and your data follows you to a new device; stay signed out and it never leaves.",
    icon: CloudUpload,
    accent: "arc",
  },
  {
    id: "dark-theme",
    title: "Dark theme",
    description:
      "Built dark first, tuned for legibility in a badly lit gym at seven in the morning.",
    icon: Moon,
    accent: "arc",
  },
  {
    id: "offline-support",
    title: "Offline support",
    description:
      "Every core feature — logging, search, timers, charts — works with no connection at all.",
    icon: WifiOff,
    accent: "good",
  },
];

/** Tailwind classes per accent, so cards and icons stay consistent. */
export const ACCENT_CLASSES: Record<
  FeatureAccent,
  { text: string; bg: string; border: string; glow: string }
> = {
  flare: {
    text: "text-flare",
    bg: "bg-flare/12",
    border: "border-flare/30",
    glow: "rgba(255,106,26,0.30)",
  },
  arc: {
    text: "text-arc-bright",
    bg: "bg-arc/12",
    border: "border-arc/30",
    glow: "rgba(61,123,255,0.30)",
  },
  cyan: {
    text: "text-[#55d8ff]",
    bg: "bg-[#55d8ff]/12",
    border: "border-[#55d8ff]/30",
    glow: "rgba(85,216,255,0.24)",
  },
  good: {
    text: "text-[#3ddc97]",
    bg: "bg-[#3ddc97]/12",
    border: "border-[#3ddc97]/30",
    glow: "rgba(61,220,151,0.26)",
  },
};
