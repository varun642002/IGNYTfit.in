/**
 * The numbers the site is allowed to put on screen.
 *
 * Every figure here is a property of the shipped product and can be checked by
 * opening the app or this repository. None of them is a usage statistic.
 *
 * That is a deliberate constraint, not an oversight. Install counts, "meals
 * logged" totals and uptime percentages are the usual filler for this section,
 * and there is no source for any of them — IGNYT is at version 1.0.40 and the
 * Play Console figures are not in this repository. Inventing them would put
 * unverifiable claims on the exact page Google's OAuth reviewer reads, which is
 * a poor trade for four large numerals.
 *
 * Counts that can be derived from data are derived, so they cannot drift out of
 * step with the product the way a hard-coded number silently does.
 */

import { features } from "@/lib/features";
import { screens } from "@/lib/screens";
import { site } from "@/lib/site";

export interface Metric {
  /** The numeric part, animated by <Counter>. */
  value: number;
  /** Rendered before the number — currency marks, mostly. */
  prefix?: string;
  /** Rendered after the number, e.g. "%" or "+". */
  suffix?: string;
  label: string;
  /** How a reader could confirm this themselves. Shown under the figure. */
  evidence: string;
}

/**
 * The four headline figures.
 *
 * Ordered by how surprising they are to somebody who has not used the app:
 * the offline food database is the one people react to, so it leads.
 */
export const headlineMetrics: Metric[] = [
  {
    value: 3160,
    label: "Foods, fully offline",
    evidence: "Bundled database — searchable in aeroplane mode",
  },
  {
    value: 17,
    label: "Health Connect data types",
    evidence: "Each permission granted separately, on-device",
  },
  {
    value: features.length,
    label: "Tracking modules",
    evidence: "Training, nutrition, body and platform features",
  },
  {
    value: 100,
    suffix: "%",
    label: "Core features work offline",
    evidence: "Logging, search, timers and charts need no connection",
  },
];

/**
 * Secondary facts, shown as a text row rather than as counters. These are the
 * ones that answer "what does it cost and what does it take from me".
 */
export const supportingFacts: Array<{ label: string; value: string }> = [
  { label: "Price", value: "Free tier + premium" },
  { label: "Your data is sold to", value: "Nobody" },
  { label: "Screens", value: `${screens.length}` },
  { label: "Requires", value: `Android ${site.app.minAndroid}+` },
  { label: "Version", value: site.app.version },
];
