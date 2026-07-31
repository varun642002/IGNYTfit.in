/**
 * The screenshot registry.
 *
 * Every image of the application anywhere on this site comes from here. The
 * files in `public/screenshots/` are byte-identical to the captures supplied —
 * not cropped, not recoloured, not retouched. The screenshot is the source of
 * truth; the frame, the lighting and the motion around it are the presentation.
 *
 * WHAT WAS IN THE SUPPLIED SET
 *
 * Sixteen files, of which fourteen are distinct screens:
 *
 *   shot-07 and shot-08 are byte-identical (verified by hash) — the same Home
 *   capture supplied twice. Only shot-07 is registered.
 *
 *   shot-05 and shot-10 are the same Habit Tracker screen captured twice, at
 *   11:40 and 15:29. Not byte-identical, but the same screen, so registering
 *   both would put the same interface on the page twice. Only shot-05 is
 *   registered — it is the cleaner capture.
 *
 *   shot-12 (Profile) and shot-04 (Log Weight) have been DELETED from the
 *   repository, not merely left unregistered. Between them they showed a real
 *   body weight, a target weight, the remaining difference and a BMI reading
 *   classified "Obese" — personal health data about an identifiable person.
 *
 *   Unregistering it was not enough. Anything under `public/` is served
 *   verbatim at its path whether or not a page links to it, so the file was
 *   still reachable at /screenshots/shot-12.jpg on the live domain. The file
 *   itself had to go. If a Profile screen is wanted here later, capture a fresh
 *   one with placeholder body figures.
 *
 * THE NO-DUPLICATE RULE IS ENFORCED, NOT DOCUMENTED
 *
 * `assertUniqueShots()` runs at module load, which means at build time. If two
 * entries ever point at the same file the build fails with the offending path,
 * rather than the duplicate reaching the page and being spotted by a reader.
 */

export interface Shot {
  /** Stable key, used to reference a shot from a page. */
  id: string;
  /** Public path. Never edit the file it points at. */
  src: string;
  /** The screen as it is named inside the app. */
  screen: string;
  /** What this screen is used to illustrate on the site. */
  purpose: string;
  /** Native pixel dimensions, for correct aspect handling. */
  width: number;
  height: number;
}

export const shots: Shot[] = [
  {
    id: "home",
    src: "/screenshots/shot-07.jpg",
    screen: "Home",
    purpose: "Today at a glance — the greeting card and today's summary",
    width: 540,
    height: 1170,
  },
  {
    id: "workout",
    src: "/screenshots/shot-15.jpg",
    screen: "Workout",
    purpose: "The training week, quick actions and routines",
    width: 737,
    height: 1600,
  },
  {
    id: "hyrox",
    src: "/screenshots/shot-01.jpg",
    screen: "Training Plan — HYROX",
    purpose: "The eight-week schedule and race simulation",
    width: 737,
    height: 1600,
  },
  {
    id: "food-log",
    src: "/screenshots/shot-16.jpg",
    screen: "Food Log",
    purpose: "The calorie budget, meals and per-item macros",
    width: 737,
    height: 1600,
  },
  {
    id: "progress",
    src: "/screenshots/shot-13.jpg",
    screen: "Progress",
    purpose: "The week's figures and the training-volume chart",
    width: 737,
    height: 1600,
  },
  {
    id: "analytics",
    src: "/screenshots/shot-06.jpg",
    screen: "Workout Analytics",
    purpose: "Volume, sets, calories and frequency across any range",
    width: 737,
    height: 1600,
  },
  {
    id: "muscle-balance",
    src: "/screenshots/shot-03.jpg",
    screen: "Workout Analytics — muscle distribution",
    purpose: "The radar chart and month-on-month comparison",
    width: 737,
    height: 1600,
  },
  {
    id: "records",
    src: "/screenshots/shot-09.jpg",
    screen: "Progress — records and quick access",
    purpose: "The consistency heatmap, weekly goal and personal records",
    width: 737,
    height: 1600,
  },
  {
    id: "achievements",
    src: "/screenshots/shot-14.jpg",
    screen: "Achievements & Records",
    purpose: "Twenty badges, fourteen unlocked, each with its date",
    width: 737,
    height: 1600,
  },
  {
    id: "habits",
    src: "/screenshots/shot-05.jpg",
    screen: "Habit Tracker",
    purpose: "Streaks and weekly completion for each habit",
    width: 737,
    height: 1600,
  },
  /* No Log Weight entry — shot-04 has been deleted, for the same reason as the
     Profile capture. It showed a real current weight, a target weight and the
     remaining difference. Anything under public/ is served at its path whether
     or not a page links to it, so the file itself had to go, not just the
     registry row. */
  {
    id: "calculators",
    src: "/screenshots/shot-02.jpg",
    screen: "Calculators — heart rate zones",
    purpose: "Maximum heart rate and the five training zones",
    width: 737,
    height: 1600,
  },
  {
    id: "tools",
    src: "/screenshots/shot-11.jpg",
    screen: "Tools",
    purpose: "Training, health and nutrition tools in one place",
    width: 737,
    height: 1600,
  },

  /* No Profile entry. The capture that would have filled it has been deleted
     from the repository — see the note at the top of this file. Do not
     reinstate it by pointing a new entry at shot-12.jpg; that file no longer
     exists and `assertShotFilesExist()` below will fail the build if it is
     referenced. */
];

/**
 * Fails the build if any file is registered twice.
 *
 * Runs at module load, so a duplicate is a build error rather than something a
 * reader notices on the live site.
 */
function assertUniqueShots(): void {
  const seen = new Map<string, string>();
  for (const shot of shots) {
    const previous = seen.get(shot.src);
    if (previous) {
      throw new Error(
        `Screenshot registry: ${shot.src} is used by both "${previous}" and "${shot.id}". Every screenshot must appear exactly once.`,
      );
    }
    seen.set(shot.src, shot.id);
  }
}

assertUniqueShots();

/**
 * Fails the build if a registered screenshot is not actually on disk.
 *
 * This exists because of shot-12. A capture was removed from the project for
 * containing personal health data, and the failure mode of getting that wrong
 * is silent: the entry stays in the registry, the page renders an <Image> at a
 * path with nothing behind it, and the first person to notice is a visitor
 * looking at a blank frame.
 *
 * Runs at module load — so at build time — and only on the server, where the
 * filesystem exists. Every consumer of this module is a server component; if
 * that ever stops being true, this import is the thing that will say so.
 */
function assertShotFilesExist(): void {
  if (typeof window !== "undefined") return;

  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const fs = require("node:fs") as typeof import("node:fs");
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const path = require("node:path") as typeof import("node:path");

  for (const entry of shots) {
    const file = path.join(process.cwd(), "public", entry.src);
    if (!fs.existsSync(file)) {
      throw new Error(
        `Screenshot registry: "${entry.id}" points at ${entry.src}, which does not exist in public/. Either restore the file or remove the entry.`,
      );
    }
  }
}

assertShotFilesExist();

/** Look a shot up by id. Throws rather than rendering a broken image. */
export function shot(id: string): Shot {
  const found = shots.find((entry) => entry.id === id);
  if (!found) throw new Error(`Screenshot registry: no shot with id "${id}".`);
  return found;
}

/**
 * Uniqueness is enforced PER SURFACE, not globally.
 *
 * The brief asks that a screenshot never appear twice — and separately, that
 * the full screenshot always remain available on the dedicated Screenshots
 * page. Those two rules cannot both hold globally: if `/screenshots` is the
 * complete catalogue, then anything the home page shows is by definition its
 * second appearance.
 *
 * So the rule is applied where it actually protects the reader:
 *
 *   `/screenshots` is the catalogue. Every distinct screen appears there,
 *   exactly once.
 *
 *   Every other surface — the hero, the product tour, the storytelling scene,
 *   the download page — draws from the same pool, and no screen may appear
 *   twice WITHIN one surface.
 *
 *   Reuse ACROSS surfaces is permitted, on the owner's explicit instruction.
 *   There are fourteen distinct captures and more places than that which want a
 *   device, so the alternatives were leaving sections empty or inventing
 *   mockups. Reuse is the better of the three: the same screen appearing in the
 *   hero and again beside a different argument reads as the product, not as a
 *   mistake, because the surrounding copy differs.
 *
 * `claim()` fails the build if a surface lists a screen twice.
 */
export function claim(surface: string, ids: string[]): string[] {
  const seen = new Set<string>();
  for (const id of ids) {
    // Also validates the id exists — `shot` throws on an unknown one.
    shot(id);
    if (seen.has(id)) {
      throw new Error(
        `Screenshot registry: "${id}" is used twice on the "${surface}" surface. A screen may appear only once per surface.`,
      );
    }
    seen.add(id);
  }
  return ids;
}
