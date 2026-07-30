/**
 * "Built for" — who IGNYT is for, and what it does for each of them.
 *
 * This section stands where a testimonial wall usually goes. IGNYT has no
 * published reviews to quote, and inventing named users with invented praise
 * would be fabricating evidence on the page Google's OAuth reviewer reads.
 *
 * It also does a job the testimonials could not: OAuth verification explicitly
 * asks the home page to state who the application is for. So this is not a
 * substitute that merely avoids a problem — it is the stronger section.
 *
 * Each entry is written as a real situation, in the reader's own words, with
 * the specific capability that answers it.
 */

import {
  Dumbbell,
  HeartPulse,
  ShieldCheck,
  Timer,
  TrendingDown,
  WifiOff,
  type LucideIcon,
} from "lucide-react";

export interface Audience {
  id: string;
  /** Who they are, in three or four words. */
  who: string;
  /** The problem, stated the way they would state it. */
  situation: string;
  /** What IGNYT actually does about it. */
  answer: string;
  icon: LucideIcon;
  accent: "arc" | "flare";
}

export const audiences: Audience[] = [
  {
    id: "lifter",
    who: "Lifters running a programme",
    situation:
      "You need last week's numbers while the bar is still loaded, not after you have dug through a spreadsheet.",
    answer:
      "Weight and reps carry over from your last session, the rest timer starts itself, and a personal record is flagged the moment you beat it.",
    icon: Dumbbell,
    accent: "flare",
  },
  {
    id: "cutting",
    who: "Anyone in a cut or a gain",
    situation:
      "Scale weight moves three ways in a week and you cannot tell whether the deficit is working or you just had a salty dinner.",
    answer:
      "A smoothed 90-day trend line separates signal from noise, with body fat and lean mass tracked next to it.",
    icon: TrendingDown,
    accent: "arc",
  },
  {
    id: "faster",
    who: "Intermittent fasters",
    situation:
      "You are running 16:8 across a shifting schedule and counting the hours in your head.",
    answer:
      "A live countdown with your current stage, plus a history of every completed fast and the streak behind it.",
    icon: Timer,
    accent: "arc",
  },
  {
    id: "connected",
    who: "People already wearing something",
    situation:
      "Your watch has the steps, your scale has the weight, and your training log has neither.",
    answer:
      "IGNYT reads 17 Health Connect data types straight from Android, so the numbers arrive without a second account.",
    icon: HeartPulse,
    accent: "arc",
  },
  {
    id: "offline",
    who: "Anyone training somewhere with no signal",
    situation:
      "The gym is in a basement and your tracking app spins on a loading screen between sets.",
    answer:
      "Logging, food search, timers and charts all run on-device. Aeroplane mode changes nothing.",
    icon: WifiOff,
    accent: "flare",
  },
  {
    id: "private",
    who: "People who want to keep their data",
    situation:
      "Health data is the most personal thing you own, and most apps treat it as inventory.",
    answer:
      "Cloud backup is opt-in and off by default, export to JSON or CSV is one tap, and your information is never sold.",
    icon: ShieldCheck,
    accent: "arc",
  },
];
