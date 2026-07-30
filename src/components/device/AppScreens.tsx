import type { CSSProperties } from "react";
import {
  ACCENT,
  AppHeader,
  Bars,
  Chip,
  Head,
  Meter,
  Ring,
  Row,
  Screen,
  Spark,
  Stat,
  TabBar,
  Tile,
  type Accent,
} from "@/components/device/atoms";
import type { ScreenId } from "@/lib/screens";
import { cn } from "@/lib/utils";

/**
 * Every IGNYT app screen, drawn as live markup.
 *
 * These are not screenshots. Each screen is composed from the atoms in
 * `atoms.tsx`, which means they are vector-sharp at any size, weigh nothing,
 * animate their own charts on scroll, restyle with the design tokens, and — the
 * part that matters most — contain no client components. Sixteen animated app
 * screens that ship zero JavaScript.
 *
 * The figures shown are illustrative sample data, exactly as a product
 * screenshot shows one particular person's numbers. They are internally
 * consistent (the dashboard's calorie total matches the food log's, the weight
 * trend matches the progress chart) because a mockup that contradicts itself is
 * the first thing a careful reader notices.
 */

/* -------------------------------------------------------------- dashboard */

/**
 * The Home screen, following the shipped layout: brand header, a greeting card
 * with the weekly-goal ring, then "Today's summary" as a two-column grid of
 * tinted tiles.
 *
 * The tile tints are the app's own: calories green, workout violet, steps
 * orange, active minutes blue, water cyan, sleep violet.
 */
function Dashboard() {
  const SUMMARY: Array<{
    value: string;
    unit?: string;
    label: string;
    goal: string;
    tint: string;
    accent: Accent;
  }> = [
    { value: "1,842", label: "Calories", goal: "/ 2,553 kcal", tint: "rgba(61,220,151,0.09)", accent: "good" },
    { value: "1", unit: "/ 1", label: "Workout", goal: "Completed", tint: "rgba(139,110,255,0.10)", accent: "arc" },
    { value: "8,431", label: "Steps", goal: "/ 10,000", tint: "rgba(255,106,26,0.09)", accent: "flare" },
    { value: "64", unit: "min", label: "Active Minutes", goal: "/ 60 min", tint: "rgba(61,123,255,0.10)", accent: "arc" },
    { value: "2.1", unit: "L", label: "Water", goal: "/ 3.0 L", tint: "rgba(85,216,255,0.09)", accent: "cyan" },
    { value: "7h 12", label: "Sleep", goal: "Health Connect", tint: "rgba(139,110,255,0.10)", accent: "arc" },
  ];

  return (
    <Screen>
      <AppHeader />

      <Tile>
        <div className="flex items-center justify-between gap-[3cqw]">
          <div className="min-w-0">
            <p className="text-[4.4cqw] font-black leading-tight tracking-[-0.02em]">
              Good afternoon, Athlete
            </p>
            <p className="mt-[1.4cqw] text-[2.9cqw] font-medium text-ash">
              Consistency creates results.
            </p>
            <div className="mt-[2.6cqw] flex gap-[2cqw]">
              <Chip accent="flare">🔥 21 days</Chip>
              <Chip accent="good">On track</Chip>
            </div>
          </div>
          <Ring value={1} size={24} accent="arc">
            <span className="text-[4cqw] font-black leading-none" data-numeric>
              100%
            </span>
          </Ring>
        </div>
      </Tile>

      <div className="flex items-center justify-between">
        <p className="text-[2.7cqw] font-bold uppercase tracking-[0.14em] text-ash-dim">
          Today&rsquo;s summary
        </p>
        <span className="text-[2.7cqw] font-bold text-arc">View All</span>
      </div>

      <div className="grid grid-cols-2 gap-[2.6cqw]">
        {SUMMARY.map((item) => (
          <div
            key={item.label}
            className="rounded-[4cqw] border border-white/6 p-[3.4cqw]"
            style={{ backgroundColor: item.tint }}
          >
            <p className="text-[5cqw] font-black leading-none tracking-[-0.03em]" data-numeric>
              {item.value}
              {item.unit ? (
                <span className="ml-[1cqw] text-[2.7cqw] font-bold text-ash">
                  {item.unit}
                </span>
              ) : null}
            </p>
            <p className="mt-[1.6cqw] text-[2.8cqw] font-semibold leading-none">
              {item.label}
            </p>
            <p className="mt-[1cqw] text-[2.4cqw] font-medium leading-none text-ash-dim">
              {item.goal}
            </p>
          </div>
        ))}
      </div>

      <TabBar active={0} />
    </Screen>
  );
}

/* ---------------------------------------------------------------- workout */

/**
 * The Workout tab, following the shipped layout: the week's four headline
 * figures, quick actions, routine filters, then the routine list.
 *
 * This is the app's training home, not a live logging session — an earlier
 * version drew a set-by-set logging screen here, which is a real screen but not
 * this tab.
 */
function Workout() {
  const WEEK: Array<{ value: string; unit?: string; label: string; sub: string; accent: Accent }> = [
    { value: "7", label: "Workouts", sub: "Goal 5", accent: "arc" },
    { value: "6h 43m", label: "Total Time", sub: "Goal 5h", accent: "good" },
    { value: "17", label: "PRs", sub: "This Week", accent: "flare" },
    { value: "32,304", unit: "kg", label: "Volume", sub: "+56% vs last week", accent: "arc" },
  ];

  return (
    <Screen>
      <AppHeader />

      <div className="flex items-center justify-between">
        <p className="text-[2.7cqw] font-bold uppercase tracking-[0.14em] text-ash-dim">
          This week
        </p>
        <span className="text-[2.7cqw] font-bold text-arc">Week 1 of 8 ›</span>
      </div>

      <div className="grid grid-cols-2 gap-[2.6cqw]">
        {WEEK.map((item) => (
          <Tile key={item.label} className="p-[3.4cqw]">
            <span
              className="grid size-[7cqw] place-items-center rounded-[2.2cqw]"
              style={{
                backgroundColor: `${ACCENT[item.accent].stroke}1f`,
                color: ACCENT[item.accent].stroke,
              }}
            >
              <span className="text-[3cqw] font-black">●</span>
            </span>
            <p className="mt-[2.4cqw] text-[5cqw] font-black leading-none tracking-[-0.03em]" data-numeric>
              {item.value}
              {item.unit ? (
                <span className="ml-[0.8cqw] text-[2.6cqw] font-bold text-ash">
                  {item.unit}
                </span>
              ) : null}
            </p>
            <p className="mt-[1.4cqw] text-[2.8cqw] font-semibold leading-none">
              {item.label}
            </p>
            <p
              className={cn(
                "mt-[1cqw] text-[2.4cqw] font-medium leading-none",
                item.sub.startsWith("+") ? "text-good" : "text-ash-dim",
              )}
            >
              {item.sub}
            </p>
          </Tile>
        ))}
      </div>

      <p className="text-[2.7cqw] font-bold uppercase tracking-[0.14em] text-ash-dim">
        Quick actions
      </p>
      <div className="grid grid-cols-4 gap-[2cqw]">
        {["New Routine", "Favorites", "Library", "Start Empty"].map((action) => (
          <div
            key={action}
            className="rounded-[3cqw] border border-white/7 bg-white/4 px-[1.6cqw] py-[2.8cqw] text-center"
          >
            <p className="text-[3.4cqw] font-black leading-none text-arc">+</p>
            <p className="mt-[1.6cqw] text-[2.2cqw] font-bold leading-tight">
              {action}
            </p>
          </div>
        ))}
      </div>

      <div className="flex gap-[1.8cqw]">
        {["All", "Push", "Pull", "Legs", "Upper"].map((filter, index) => (
          <Chip key={filter} accent={index === 0 ? "arc" : undefined}>
            {filter}
          </Chip>
        ))}
      </div>

      <Tile className="p-[3.4cqw]">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[3.6cqw] font-bold leading-none">Run</p>
            <p className="mt-[1.4cqw] text-[2.6cqw] font-medium text-ash-dim">
              1 Exercise · 4 min · Outdoor Running
            </p>
          </div>
          <span className="text-[2.4cqw] text-ash-dim">★</span>
        </div>
        <div className="mt-[3cqw] flex items-end justify-between">
          <div>
            <p className="text-[2.2cqw] font-bold uppercase tracking-[0.12em] text-ash-dim">
              Last performed
            </p>
            <p className="mt-[0.8cqw] text-[2.8cqw] font-semibold">7 days ago</p>
          </div>
          <span className="grid size-[8cqw] place-items-center rounded-pill bg-arc text-[3cqw] font-black text-[#00102e]">
            ▶
          </span>
        </div>
      </Tile>

      <TabBar active={1} />
    </Screen>
  );
}

/* --------------------------------------------------------------- exercise */

function Exercise() {
  return (
    <Screen>
      <Head title="Bench Press" meta="Chest · Barbell" />

      <Tile>
        <div className="flex gap-[2cqw]">
          <Chip accent="flare">Chest</Chip>
          <Chip>Triceps</Chip>
          <Chip>Front delts</Chip>
        </div>
        <div className="mt-[3.2cqw] space-y-[2.2cqw]">
          {[
            "Set shoulder blades down and back on the bench.",
            "Lower to mid-chest with elbows at roughly 45°.",
            "Drive through the floor and press to lockout.",
          ].map((step, index) => (
            <div key={step} className="flex gap-[2.6cqw]">
              <span className="text-[2.9cqw] font-black text-flare">
                {String(index + 1).padStart(2, "0")}
              </span>
              <p className="flex-1 text-[2.9cqw] font-medium leading-[1.45] text-ash">
                {step}
              </p>
            </div>
          ))}
        </div>
      </Tile>

      <Tile lit="arc">
        <div className="flex items-baseline justify-between">
          <p className="text-[3.2cqw] font-bold">Estimated 1RM</p>
          <span className="text-[3.2cqw] font-black text-arc" data-numeric>
            104 kg
          </span>
        </div>
        <div className="mt-[2cqw]">
          <Spark points={[0.22, 0.3, 0.28, 0.44, 0.52, 0.61, 0.7, 0.84]} accent="arc" height={24} />
        </div>
      </Tile>

      <TabBar active={1} />
    </Screen>
  );
}

/* --------------------------------------------------------------- food log */

/**
 * The Food Log tab, following the shipped layout: a date stepper, the calorie
 * budget card with its ring and remaining figure, the three nutrition shortcuts
 * (Diet Plan, Insights, Recipes), then meals with per-item macros.
 */
function FoodLog() {
  return (
    <Screen>
      <div className="flex items-center gap-[2cqw]">
        <span className="grid size-[7cqw] shrink-0 place-items-center rounded-pill border border-white/8 text-[2.6cqw] text-ash">
          ‹
        </span>
        <span className="flex-1 rounded-pill border border-white/8 bg-white/4 py-[2cqw] text-center text-[2.9cqw] font-semibold">
          Thursday, July 30, 2026
        </span>
        <span className="grid size-[7cqw] shrink-0 place-items-center rounded-pill border border-white/8 text-[2.6cqw] text-ash">
          ›
        </span>
      </div>

      <Tile lit="arc">
        <div className="flex items-center gap-[3.4cqw]">
          <Ring value={0.72} size={24} accent="good">
            <span className="text-[4cqw] font-black leading-none" data-numeric>
              1,842
            </span>
            <span className="mt-[0.6cqw] text-[2.1cqw] font-bold text-ash-dim">
              KCAL EATEN
            </span>
          </Ring>
          <div className="min-w-0 flex-1">
            <p className="text-[2.9cqw] font-medium text-ash">
              Eat up to{" "}
              <span className="font-black text-arc" data-numeric>
                2,553
              </span>{" "}
              Cal
            </p>
            <div className="mt-[2cqw] h-[1.6cqw] overflow-hidden rounded-pill bg-white/8">
              <div className="h-full w-[72%] rounded-pill bg-arc" />
            </div>
            <p className="mt-[1.6cqw] text-[2.5cqw] font-medium text-ash-dim">
              72% of daily goal
            </p>
          </div>
          <div className="shrink-0 text-right">
            <p className="text-[2.3cqw] font-medium text-ash-dim">Remaining</p>
            <p className="text-[4.2cqw] font-black leading-tight" data-numeric>
              711
            </p>
            <p className="text-[2.2cqw] font-medium text-ash-dim">kcal</p>
          </div>
        </div>
      </Tile>

      <div className="grid grid-cols-3 gap-[2.4cqw]">
        {[
          ["Diet Plan", "Build your meal plan"],
          ["Insights", "See your progress"],
          ["Recipes", "Healthy recipes"],
        ].map(([title, sub]) => (
          <Tile key={title} className="p-[3cqw]">
            <p className="text-[2.9cqw] font-bold leading-tight">{title}</p>
            <p className="mt-[1cqw] text-[2.2cqw] font-medium leading-tight text-ash-dim">
              {sub}
            </p>
          </Tile>
        ))}
      </div>

      <Tile className="p-[3.4cqw]">
        <div className="flex items-center justify-between">
          <p className="text-[3.2cqw] font-bold">🌞 Breakfast</p>
          <p className="text-[2.7cqw] font-bold text-arc" data-numeric>
            695 of 638 Cal
          </p>
        </div>
        <div className="mt-[3cqw] space-y-[2.6cqw]">
          {[
            ["Instant Oats", "50 g", "P 7g  C 34g  F 4g", "190"],
            ["Whey Protein", "100 g", "P 80g  C 8g  F 6g", "400"],
            ["Banana", "118 piece", "P 1g  C 27g  F 0g", "105"],
          ].map(([name, qty, macros, kcal]) => (
            <div key={name} className="flex items-center gap-[2.6cqw]">
              <div className="min-w-0 flex-1">
                <p className="truncate text-[3cqw] font-bold leading-tight">
                  {name}
                </p>
                <p className="mt-[0.6cqw] text-[2.3cqw] font-medium leading-tight text-ash-dim">
                  {qty} · {macros}
                </p>
              </div>
              <span className="shrink-0 text-[2.9cqw] font-bold" data-numeric>
                {kcal}
                <span className="ml-[0.6cqw] text-[2.1cqw] text-ash-dim">
                  kcal
                </span>
              </span>
            </div>
          ))}
        </div>
      </Tile>

      <TabBar active={2} />
    </Screen>
  );
}

/* ------------------------------------------------------------ food search */

function FoodSearch() {
  return (
    <Screen>
      <Head title="Search" meta="3,160 foods · offline" />

      <div className="flex items-center gap-[2.6cqw] rounded-pill border border-white/9 bg-white/5 px-[4cqw] py-[2.8cqw]">
        <span className="text-[3.2cqw] text-ash-dim">⌕</span>
        <span className="text-[3.2cqw] font-semibold text-ash">chicken breast</span>
      </div>

      <div className="flex gap-[2cqw]">
        <Chip accent="good">All</Chip>
        <Chip>Recent</Chip>
        <Chip>Favourites</Chip>
        <Chip>Mine</Chip>
      </div>

      <div className="space-y-[2.2cqw]">
        {[
          ["Chicken breast, raw", "100 g · 165 kcal · 31 P", "165"],
          ["Chicken breast, grilled", "100 g · 195 kcal · 29 P", "195"],
          ["Chicken breast, roasted", "100 g · 177 kcal · 30 P", "177"],
          ["Chicken thigh, skinless", "100 g · 209 kcal · 26 P", "209"],
          ["Chicken mince, 5% fat", "100 g · 143 kcal · 22 P", "143"],
        ].map(([title, meta, kcal]) => (
          <Row key={title} title={title} meta={meta} value={kcal} accent="good" glyph="🍗" />
        ))}
      </div>

      <Chip className="self-start">⌸ Scan barcode</Chip>

      <TabBar active={2} />
    </Screen>
  );
}

/* -------------------------------------------------------------- nutrition */

function Nutrition() {
  return (
    <Screen>
      <Head title="Nutrition" meta="7-day average" />

      <Tile lit="arc">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[3cqw] font-semibold text-ash">Protein per kg</p>
            <p className="mt-[1.2cqw] text-[6.4cqw] font-black leading-none text-arc" data-numeric>
              1.89 g
            </p>
          </div>
          <Ring value={0.86} size={24} accent="arc">
            <span className="text-[2.8cqw] font-black" data-numeric>
              86%
            </span>
          </Ring>
        </div>
      </Tile>

      <Tile>
        <p className="text-[3.2cqw] font-bold">Micronutrients</p>
        <div className="mt-[3cqw] space-y-[2.6cqw]">
          <Meter label="Fibre" value={0.74} detail="28 / 38 g" accent="good" index={0} />
          <Meter label="Iron" value={0.62} detail="11 / 18 mg" accent="flare" index={1} />
          <Meter label="Calcium" value={0.81} detail="810 / 1000 mg" accent="arc" index={2} />
          <Meter label="Vitamin C" value={0.94} detail="85 / 90 mg" accent="good" index={3} />
          <Meter label="Sodium" value={0.48} detail="1.1 / 2.3 g" accent="cyan" index={4} />
        </div>
      </Tile>

      <TabBar active={2} />
    </Screen>
  );
}

/* -------------------------------------------------------------- diet plan */

function DietPlan() {
  return (
    <Screen>
      <Head title="Diet plan" meta="Lean bulk · Week 3" action={<Chip accent="flare">Edit</Chip>} />

      <Tile lit="flare">
        <div className="flex items-baseline justify-between">
          <p className="text-[3.2cqw] font-bold">Adherence</p>
          <span className="text-[4.4cqw] font-black text-flare" data-numeric>
            88%
          </span>
        </div>
        <div className="mt-[2.6cqw]">
          <Bars
            values={[0.9, 0.82, 1, 0.74, 0.95, 0.68, 0.88]}
            accent="flare"
            height={17}
            labels={["M", "T", "W", "T", "F", "S", "S"]}
          />
        </div>
      </Tile>

      <div className="space-y-[2.2cqw]">
        {[
          ["07:00", "Oats + whey", "612 kcal", true],
          ["12:30", "Chicken + rice", "742 kcal", true],
          ["16:00", "Yoghurt + nuts", "288 kcal", true],
          ["20:00", "Salmon + potato", "708 kcal", false],
        ].map(([time, meal, kcal, done]) => (
          <Row
            key={time as string}
            title={meal as string}
            meta={time as string}
            value={kcal as string}
            accent="flare"
            glyph="•"
            done={done as boolean}
          />
        ))}
      </div>

      <TabBar active={2} />
    </Screen>
  );
}

/* ---------------------------------------------------------------- fasting */

function Fasting() {
  return (
    <Screen>
      <Head title="Fasting" meta="16:8 protocol" />

      <div className="flex flex-col items-center py-[2cqw]">
        <Ring value={0.79} size={54} stroke={4.4} accent="arc">
          <span className="text-[8cqw] font-black leading-none" data-numeric>
            12:41
          </span>
          <span className="mt-[1.4cqw] text-[2.7cqw] font-bold text-ash-dim">
            OF 16:00
          </span>
        </Ring>
        <Chip accent="arc" className="mt-[3.4cqw]">
          Stage · Fat burning
        </Chip>
      </div>

      <div className="grid grid-cols-2 gap-[2.6cqw]">
        <Tile className="p-[3.2cqw]">
          <Stat value="20:00" caption="Started" accent="arc" />
        </Tile>
        <Tile className="p-[3.2cqw]">
          <Stat value="12:00" caption="Ends" accent="arc" />
        </Tile>
      </div>

      <Tile>
        <div className="flex items-baseline justify-between">
          <p className="text-[3.2cqw] font-bold">Streak</p>
          <span className="text-[3.2cqw] font-black text-flare" data-numeric>
            14 days
          </span>
        </div>
        <div className="mt-[2.6cqw]">
          <Bars values={[1, 1, 0.9, 1, 1, 0.85, 1]} accent="arc" height={15} labels={["M", "T", "W", "T", "F", "S", "S"]} />
        </div>
      </Tile>

      <TabBar active={3} />
    </Screen>
  );
}

/* ------------------------------------------------------------------ water */

function Water() {
  return (
    <Screen>
      <Head title="Hydration" meta="2.1 of 3.0 L" />

      <div className="flex items-center gap-[5cqw] py-[2cqw]">
        {/* The bottle. A clipped box with a fill layer that rises on scroll —
            the `fill-level` keyframe translates it up to `--to`. */}
        <div className="relative h-[42cqw] w-[22cqw] shrink-0 overflow-hidden rounded-[5cqw] border border-white/12 bg-white/4">
          <div
            className="fill-level absolute inset-x-0 bottom-0 h-full bg-[linear-gradient(180deg,rgba(85,216,255,0.85),rgba(61,123,255,0.5))]"
            style={{ "--to": 0.7 } as CSSProperties}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-[5cqw] font-black" data-numeric>
              70%
            </span>
          </div>
        </div>

        <div className="flex-1 space-y-[2.4cqw]">
          <Stat value="2.1" unit="L" caption="Logged today" accent="cyan" />
          <div className="flex flex-wrap gap-[2cqw]">
            <Chip accent="cyan">+250 ml</Chip>
            <Chip accent="cyan">+500 ml</Chip>
            <Chip accent="cyan">+750 ml</Chip>
          </div>
        </div>
      </div>

      <Tile>
        <p className="text-[3.2cqw] font-bold">Last 7 days</p>
        <div className="mt-[2.6cqw]">
          <Bars
            values={[0.8, 0.94, 0.72, 1, 0.86, 0.62, 0.7]}
            accent="cyan"
            height={17}
            labels={["M", "T", "W", "T", "F", "S", "S"]}
            highlight={6}
          />
        </div>
      </Tile>

      <TabBar active={3} />
    </Screen>
  );
}

/* ------------------------------------------------------------ supplements */

function Supplements() {
  return (
    <Screen>
      <Head title="Supplements" meta="4 of 5 taken today" />

      <Tile lit="good">
        <div className="flex items-baseline justify-between">
          <p className="text-[3.2cqw] font-bold">30-day adherence</p>
          <span className="text-[4.4cqw] font-black text-[#3ddc97]" data-numeric>
            92%
          </span>
        </div>
        <div className="mt-[2.4cqw]">
          <Meter label="Consistency" value={0.92} accent="good" />
        </div>
      </Tile>

      <div className="space-y-[2.4cqw]">
        {[
          ["Creatine", "5 g · morning", true, "C"],
          ["Vitamin D3", "2000 IU · morning", true, "D"],
          ["Omega 3", "2 g · with lunch", true, "O"],
          ["Magnesium", "400 mg · evening", true, "M"],
          ["Zinc", "15 mg · evening", false, "Z"],
        ].map(([name, dose, done, glyph]) => (
          <Row
            key={name as string}
            title={name as string}
            meta={dose as string}
            accent="good"
            glyph={glyph as string}
            done={done as boolean}
          />
        ))}
      </div>

      <Chip accent="flare" className="self-start">
        ⚠ Zinc runs out in 4 days
      </Chip>

      <TabBar active={3} />
    </Screen>
  );
}

/* --------------------------------------------------------- health connect */

function HealthConnect() {
  return (
    <Screen>
      <Head title="Health Connect" meta="Synced 4 minutes ago" />

      <Tile lit="arc">
        <div className="flex items-center gap-[3cqw]">
          <div className="relative flex size-[3cqw] shrink-0">
            <span className="absolute inset-0 animate-halo rounded-pill bg-arc" />
            <span className="relative size-[3cqw] rounded-pill bg-arc" />
          </div>
          <div className="flex-1">
            <p className="text-[3.4cqw] font-bold">Connected</p>
            <p className="mt-[0.8cqw] text-[2.7cqw] font-medium text-ash-dim">
              17 data types · on-device only
            </p>
          </div>
        </div>
      </Tile>

      <div className="grid grid-cols-2 gap-[2.6cqw]">
        <Tile className="p-[3.2cqw]">
          <Stat value="8,431" caption="Steps" accent="arc" />
        </Tile>
        <Tile className="p-[3.2cqw]">
          <Stat value="62" unit="bpm" caption="Resting HR" accent="flare" />
        </Tile>
        <Tile className="p-[3.2cqw]">
          <Stat value="7h 12" caption="Sleep" accent="cyan" />
        </Tile>
        <Tile className="p-[3.2cqw]">
          <Stat value="486" unit="kcal" caption="Active" accent="good" />
        </Tile>
      </div>

      <Tile>
        <p className="text-[3.2cqw] font-bold">Permissions</p>
        <div className="mt-[2.8cqw] space-y-[2.2cqw]">
          {[
            ["Steps", true],
            ["Heart rate", true],
            ["Sleep", true],
            ["Body fat", false],
          ].map(([label, granted]) => (
            <div key={label as string} className="flex items-center justify-between">
              <span className="text-[3cqw] font-semibold text-ash">
                {label as string}
              </span>
              <span
                className={
                  granted
                    ? "h-[3.6cqw] w-[7cqw] rounded-pill bg-arc"
                    : "h-[3.6cqw] w-[7cqw] rounded-pill bg-white/14"
                }
              />
            </div>
          ))}
        </div>
      </Tile>

      <TabBar active={3} />
    </Screen>
  );
}

/* ----------------------------------------------------------------- weight */

function Weight() {
  return (
    <Screen>
      <Head title="Weight" meta="90-day trend" />

      <Tile lit="good">
        <div className="flex items-end justify-between">
          <Stat value="78.4" unit="kg" caption="Today" accent="good" />
          <Chip accent="good">−2.6 kg · 90 d</Chip>
        </div>
        <div className="mt-[3cqw]">
          <Spark points={[0.92, 0.86, 0.9, 0.78, 0.72, 0.75, 0.63, 0.55, 0.48, 0.4]} accent="good" height={30} />
        </div>
      </Tile>

      <div className="grid grid-cols-2 gap-[2.6cqw]">
        <Tile className="p-[3.2cqw]">
          <Stat value="14.2" unit="%" caption="Body fat" accent="arc" />
        </Tile>
        <Tile className="p-[3.2cqw]">
          <Stat value="67.3" unit="kg" caption="Lean mass" accent="flare" />
        </Tile>
      </div>

      <Tile>
        <p className="text-[3.2cqw] font-bold">Measurements</p>
        <div className="mt-[2.8cqw] space-y-[2.2cqw]">
          <Row title="Chest" value="104 cm" meta="+1.5 cm" accent="good" glyph="C" />
          <Row title="Waist" value="82 cm" meta="−3.0 cm" accent="good" glyph="W" />
          <Row title="Arm" value="38.5 cm" meta="+0.8 cm" accent="good" glyph="A" />
        </div>
      </Tile>

      <TabBar active={3} />
    </Screen>
  );
}

/* --------------------------------------------------------------- progress */

/**
 * The Progress tab: the week's four figures with goal bars, the training-volume
 * chart with its range selector, then personal records.
 */
function Progress() {
  return (
    <Screen>
      <div>
        <p className="text-[5.6cqw] font-black leading-none tracking-[-0.03em]">
          Progress
        </p>
        <p className="mt-[1.4cqw] text-[2.8cqw] font-medium leading-none text-ash">
          Your training, body and performance insights
        </p>
      </div>

      <div className="grid grid-cols-2 gap-[2.6cqw]">
        <Tile className="p-[3.4cqw]">
          <p className="text-[5cqw] font-black leading-none" data-numeric>
            7
          </p>
          <p className="mt-[1.4cqw] text-[2.7cqw] font-semibold leading-none">
            Workouts
          </p>
          <div className="mt-[2cqw] h-[1.2cqw] overflow-hidden rounded-pill bg-white/8">
            <div className="h-full w-full rounded-pill bg-arc" />
          </div>
          <p className="mt-[1.4cqw] text-[2.3cqw] text-ash-dim">of 5</p>
        </Tile>
        <Tile className="p-[3.4cqw]">
          <p className="text-[5cqw] font-black leading-none" data-numeric>
            6h 43m
          </p>
          <p className="mt-[1.4cqw] text-[2.7cqw] font-semibold leading-none">
            Training Time
          </p>
          <div className="mt-[2cqw] h-[1.2cqw] overflow-hidden rounded-pill bg-white/8">
            <div className="h-full w-full rounded-pill bg-good" />
          </div>
          <p className="mt-[1.4cqw] text-[2.3cqw] text-ash-dim">of 5h 0m</p>
        </Tile>
        <Tile className="p-[3.4cqw]">
          <p className="text-[5cqw] font-black leading-none" data-numeric>
            32,304
            <span className="ml-[0.8cqw] text-[2.6cqw] font-bold text-ash">
              kg
            </span>
          </p>
          <p className="mt-[1.4cqw] text-[2.7cqw] font-semibold leading-none">
            Volume
          </p>
          <p className="mt-[1.4cqw] text-[2.4cqw] font-semibold text-good">
            ▲ +56% vs last week
          </p>
        </Tile>
        <Tile className="p-[3.4cqw]">
          <p className="text-[5cqw] font-black leading-none" data-numeric>
            17
          </p>
          <p className="mt-[1.4cqw] text-[2.7cqw] font-semibold leading-none">
            PRs
          </p>
          <p className="mt-[1.4cqw] text-[2.4cqw] font-semibold text-flare">
            ▲ +6 vs last week
          </p>
        </Tile>
      </div>

      <Tile>
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[3.2cqw] font-bold">Training Volume</p>
            <p className="mt-[1.4cqw] text-[4.4cqw] font-black leading-none" data-numeric>
              27,304
              <span className="ml-[0.8cqw] text-[2.6cqw] font-bold text-ash">
                kg
              </span>
            </p>
            <p className="mt-[1.2cqw] text-[2.4cqw] font-semibold text-good">
              ▲ +56% vs last week
            </p>
          </div>
          <Chip>This Week ⌄</Chip>
        </div>
        <div className="mt-[3cqw]">
          <Bars
            values={[1, 0.42, 0.24, 0.04, 0.04, 0.04, 0.04]}
            accent="arc"
            height={20}
            labels={["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]}
          />
        </div>
      </Tile>

      <Tile>
        <p className="text-[3.2cqw] font-bold">Personal records</p>
        <div className="mt-[2.8cqw] space-y-[2.2cqw]">
          <Row title="Machine Shrugs" meta="Jul 28" value="60 kg" accent="arc" glyph="▲" />
          <Row title="Back Squat" meta="Jul 27" value="120 kg" accent="arc" glyph="▲" />
          <Row title="Lat Pulldown" meta="Jul 24" value="70 kg" accent="arc" glyph="▲" />
        </div>
      </Tile>

      <TabBar active={3} />
    </Screen>
  );
}

/* ---------------------------------------------------------- notifications */

function Notifications() {
  return (
    <Screen>
      <Head title="Reminders" meta="6 schedules active" />

      <div className="space-y-[2.4cqw]">
        {[
          ["Water", "Every 2h · 08:00–20:00", true, "arc"],
          ["Training", "Mon, Wed, Fri · 06:30", true, "flare"],
          ["Meals", "4 times daily", true, "good"],
          ["Supplements", "08:00 and 21:00", true, "good"],
          ["Weigh-in", "Daily · 07:00", true, "cyan"],
          ["Fasting window", "Opens 12:00", false, "arc"],
        ].map(([label, detail, on, accent]) => (
          <Tile key={label as string} className="p-[3.2cqw]">
            <div className="flex items-center justify-between gap-[3cqw]">
              <div className="min-w-0 flex-1">
                <p className="truncate text-[3.3cqw] font-bold">{label as string}</p>
                <p className="mt-[0.8cqw] truncate text-[2.7cqw] font-medium text-ash-dim">
                  {detail as string}
                </p>
              </div>
              <span
                className="h-[4cqw] w-[7.6cqw] shrink-0 rounded-pill"
                style={{
                  backgroundColor: on
                    ? accent === "flare"
                      ? "#ff6a1a"
                      : accent === "good"
                        ? "#3ddc97"
                        : accent === "cyan"
                          ? "#55d8ff"
                          : "#3d7bff"
                    : "rgba(255,255,255,0.14)",
                }}
              />
            </div>
          </Tile>
        ))}
      </div>

      <TabBar active={4} />
    </Screen>
  );
}

/* ---------------------------------------------------------------- profile */

/**
 * The Profile tab: identity, the four lifetime figures, current body progress,
 * then the account list.
 *
 * The body figures here are illustrative, like every other number in these
 * mockups. The reference screenshot showed a real person's weight and a BMI
 * classification, which is not something to publish on a marketing page.
 */
function Profile() {
  return (
    <Screen>
      <div className="flex items-center gap-[3.4cqw]">
        <div className="grid size-[13cqw] shrink-0 place-items-center rounded-pill bg-[linear-gradient(140deg,#3d7bff,#1b47c4)] text-[4.6cqw] font-black">
          A
        </div>
        <div>
          <p className="text-[4.6cqw] font-black leading-none">Athlete</p>
          <p className="mt-[1.4cqw] text-[2.8cqw] font-medium text-ash">
            Stronger every day.
          </p>
        </div>
      </div>

      <Tile className="p-[3.4cqw]">
        <div className="flex items-center justify-between">
          {[
            ["21", "Day Streak", "flare"],
            ["327", "Workouts", "arc"],
            ["836", "PRs", "flare"],
            ["318", "Total hrs", "arc"],
          ].map(([value, label, accent]) => (
            <div key={label as string} className="text-center">
              <p
                className={cn(
                  "text-[4.2cqw] font-black leading-none",
                  accent === "flare" ? "text-flare" : "text-arc",
                )}
                data-numeric
              >
                {value as string}
              </p>
              <p className="mt-[1.2cqw] text-[2.2cqw] font-semibold leading-none text-ash-dim">
                {label as string}
              </p>
            </div>
          ))}
        </div>
      </Tile>

      <div className="flex items-center justify-between">
        <p className="text-[2.7cqw] font-bold uppercase tracking-[0.14em] text-ash-dim">
          Current progress
        </p>
        <span className="text-[2.7cqw] font-bold text-arc">View All</span>
      </div>

      <Tile>
        <div className="grid grid-cols-2 gap-y-[3.4cqw]">
          {[
            ["Weight", "78.4", "kg", "▼ 2.4 kg vs last 30 days", "good"],
            ["Body Fat", "14.2", "%", "▼ 1.1% vs last 30 days", "good"],
            ["Muscle Mass", "67.3", "kg", "▲ 0.8 kg vs last 30 days", "arc"],
            ["BMI", "24.1", "", "Healthy range", "good"],
          ].map(([label, value, unit, delta, tone]) => (
            <div key={label as string}>
              <p className="text-[2.7cqw] font-semibold text-ash">
                {label as string}
              </p>
              <p className="mt-[1cqw] text-[4.4cqw] font-black leading-none" data-numeric>
                {value as string}
                {unit ? (
                  <span className="ml-[0.7cqw] text-[2.4cqw] font-bold text-ash">
                    {unit as string}
                  </span>
                ) : null}
              </p>
              <p
                className={cn(
                  "mt-[1.2cqw] text-[2.3cqw] font-semibold leading-none",
                  tone === "good" ? "text-good" : "text-arc",
                )}
              >
                {delta as string}
              </p>
            </div>
          ))}
        </div>
      </Tile>

      <Tile className="p-[3.2cqw]">
        <div className="space-y-[2.6cqw]">
          <Row title="Personal Information" meta="Update your profile details" accent="arc" glyph="›" />
          <Row title="Fitness Goals" meta="View and edit your goals" accent="arc" glyph="›" />
          <Row title="Achievements" meta="Badges, milestones & records" accent="flare" glyph="›" />
        </div>
      </Tile>

      <TabBar active={4} />
    </Screen>
  );
}

/* --------------------------------------------------------------- settings */

function Settings() {
  return (
    <Screen>
      <Head title="Settings" />

      <Tile lit="good">
        <p className="text-[3.3cqw] font-bold">Your data</p>
        <p className="mt-[1.2cqw] text-[2.8cqw] font-medium leading-[1.5] text-ash-dim">
          Stored on this device. Export any time.
        </p>
        <div className="mt-[3cqw] flex gap-[2cqw]">
          <Chip accent="good">Export JSON</Chip>
          <Chip accent="good">Export CSV</Chip>
        </div>
      </Tile>

      <div className="space-y-[2.2cqw]">
        {[
          ["Cloud sync", "Off", false],
          ["Drive backup", "Off", false],
          ["Health Connect", "On", true],
          ["Notifications", "On", true],
        ].map(([label, state, on]) => (
          <Tile key={label as string} className="p-[3.2cqw]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[3.2cqw] font-bold">{label as string}</p>
                <p className="mt-[0.6cqw] text-[2.6cqw] font-semibold text-ash-dim">
                  {state as string}
                </p>
              </div>
              <span
                className={
                  on
                    ? "h-[4cqw] w-[7.6cqw] rounded-pill bg-[#3ddc97]"
                    : "h-[4cqw] w-[7.6cqw] rounded-pill bg-white/14"
                }
              />
            </div>
          </Tile>
        ))}
      </div>

      <div className="flex gap-[2cqw]">
        <Chip>Units · Metric</Chip>
        <Chip>Theme · Dark</Chip>
      </div>

      <TabBar active={4} />
    </Screen>
  );
}

/* ----------------------------------------------------------- achievements */

/** Achievements & Records, reached from Progress. Twenty badges in total. */
function Achievements() {
  return (
    <Screen>
      <Chip className="self-start">← Progress</Chip>

      <div className="flex items-center gap-[2.6cqw]">
        <span className="grid size-[9cqw] place-items-center rounded-[2.6cqw] bg-flare/15 text-[4cqw]">
          🏆
        </span>
        <p className="text-[4.8cqw] font-black leading-none tracking-[-0.025em]">
          Achievements
        </p>
      </div>

      <Tile lit="arc">
        <div className="flex items-baseline justify-between">
          <p className="text-[3.2cqw] font-bold">14 of 20 unlocked</p>
          <span className="text-[3.4cqw] font-black text-arc" data-numeric>
            70%
          </span>
        </div>
        <div className="mt-[2.4cqw] h-[1.8cqw] overflow-hidden rounded-pill bg-white/10">
          <div className="h-full w-[70%] rounded-pill bg-arc" />
        </div>
      </Tile>

      <div className="space-y-[2.2cqw]">
        {[
          ["14-Day Streak", "Train 14 days in a row", "Jul 19"],
          ["7-Day Streak", "Train 7 days in a row", "Jul 12"],
          ["First Workout", "Complete your first workout", "Jul 11"],
          ["25 Workouts", "Log 25 workouts", "Jul 11"],
          ["50 Workouts", "Log 50 workouts", "Jul 11"],
        ].map(([title, meta, date]) => (
          <Tile key={title} className="p-[3cqw]">
            <Row title={title} meta={meta} value={date} accent="flare" glyph="🏆" />
          </Tile>
        ))}
      </div>

      <TabBar active={3} />
    </Screen>
  );
}

/* ----------------------------------------------------------------- habits */

/** Habit Tracker — "Build consistency. Build you." */
function Habits() {
  return (
    <Screen>
      <Chip className="self-start">← Progress</Chip>

      <div>
        <div className="flex items-center gap-[2.6cqw]">
          <span className="grid size-[9cqw] place-items-center rounded-[2.6cqw] bg-flare/15 text-[3.6cqw]">
            🔁
          </span>
          <p className="text-[4.8cqw] font-black leading-none tracking-[-0.025em]">
            Habit Tracker
          </p>
        </div>
        <p className="mt-[1.8cqw] text-[2.8cqw] font-medium text-ash">
          Build consistency. Build you.
        </p>
      </div>

      <Tile className="p-[3cqw]">
        <div className="flex items-center gap-[2.4cqw]">
          <span className="flex-1 rounded-[2.6cqw] border border-white/9 px-[3cqw] py-[2.4cqw] text-[2.7cqw] text-ash-dim">
            New habit (e.g. Drink 3L water)
          </span>
          <span className="rounded-[2.6cqw] bg-arc px-[3.4cqw] py-[2.4cqw] text-[2.7cqw] font-bold text-[#00102e]">
            + Add
          </span>
        </div>
      </Tile>

      <div className="space-y-[2.4cqw]">
        {[
          ["Training", "🔥 12 day streak", "Best: 14 · 5/7 this week", "arc"],
          ["Clean diet", "🔥 9 day streak", "Best: 11 · 6/7 this week", "good"],
          ["Sleep", "🔥 6 day streak", "Best: 8 · 4/7 this week", "arc"],
        ].map(([name, streak, best, accent]) => (
          <Tile key={name as string} className="p-[3.2cqw]">
            <div className="flex items-center gap-[3cqw]">
              <span
                className="grid size-[8cqw] shrink-0 place-items-center rounded-[2.4cqw] text-[3cqw]"
                style={{
                  backgroundColor: `${ACCENT[accent as Accent].stroke}1f`,
                }}
              >
                ✓
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[3.2cqw] font-bold leading-tight">
                  {name as string}
                </p>
                <p className="mt-[0.8cqw] text-[2.4cqw] font-medium leading-tight text-ash-dim">
                  {streak as string} · {best as string}
                </p>
              </div>
              <span className="size-[5.4cqw] shrink-0 rounded-[1.8cqw] border border-white/18" />
            </div>
          </Tile>
        ))}
      </div>

      <TabBar active={3} />
    </Screen>
  );
}

/* ------------------------------------------------------------------ tools */

/** The Tools tab — "Everything you need to train smarter". */
function Tools() {
  return (
    <Screen>
      <div>
        <p className="text-[5.6cqw] font-black leading-none tracking-[-0.03em]">
          Tools
        </p>
        <p className="mt-[1.4cqw] text-[2.8cqw] font-medium leading-none text-ash">
          Everything you need to train smarter
        </p>
      </div>

      <Tile className="p-[3.2cqw]">
        <div className="flex items-center justify-around">
          {[
            ["21", "Day Streak"],
            ["327", "Workouts"],
            ["836", "PRs"],
          ].map(([value, label]) => (
            <div key={label} className="text-center">
              <p className="text-[4.4cqw] font-black leading-none text-arc" data-numeric>
                {value}
              </p>
              <p className="mt-[1.2cqw] text-[2.3cqw] font-semibold leading-none text-ash-dim">
                {label}
              </p>
            </div>
          ))}
        </div>
      </Tile>

      <p className="text-[2.6cqw] font-bold uppercase tracking-[0.14em] text-ash-dim">
        Training
      </p>
      <div className="grid grid-cols-2 gap-[2.4cqw]">
        {[
          ["Training Plan", "HYROX schedule & routines"],
          ["Library", "Exercises & equipment"],
          ["Goals", "Smart goal engine & targets"],
          ["Log Weight", "Weight, trend & history"],
        ].map(([title, sub]) => (
          <Tile key={title} className="p-[3cqw]">
            <p className="text-[2.9cqw] font-bold leading-tight">{title}</p>
            <p className="mt-[1cqw] text-[2.2cqw] font-medium leading-tight text-ash-dim">
              {sub}
            </p>
          </Tile>
        ))}
      </div>

      <p className="text-[2.6cqw] font-bold uppercase tracking-[0.14em] text-ash-dim">
        Health
      </p>
      <Tile lit="arc" className="p-[3.2cqw]">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[3cqw] font-bold">Health Connect</p>
            <p className="mt-[1cqw] text-[2.3cqw] font-medium text-ash-dim">
              Sync with apps, track all metrics
            </p>
          </div>
          <Chip accent="arc">✓ Connected</Chip>
        </div>
      </Tile>

      <p className="text-[2.6cqw] font-bold uppercase tracking-[0.14em] text-ash-dim">
        Nutrition
      </p>
      <div className="grid grid-cols-2 gap-[2.4cqw]">
        {[
          ["Food Log", "Meals, macros & budget"],
          ["Calculator", "BMI, BMR, TDEE & macros"],
        ].map(([title, sub]) => (
          <Tile key={title} className="p-[3cqw]">
            <p className="text-[2.9cqw] font-bold leading-tight">{title}</p>
            <p className="mt-[1cqw] text-[2.2cqw] font-medium leading-tight text-ash-dim">
              {sub}
            </p>
          </Tile>
        ))}
      </div>

      <TabBar active={0} />
    </Screen>
  );
}

/* ----------------------------------------------------------------- router */

const SCREENS: Record<ScreenId, () => React.JSX.Element> = {
  dashboard: Dashboard,
  workout: Workout,
  exercise: Exercise,
  "food-log": FoodLog,
  "food-search": FoodSearch,
  nutrition: Nutrition,
  "diet-plan": DietPlan,
  fasting: Fasting,
  water: Water,
  supplements: Supplements,
  "health-connect": HealthConnect,
  weight: Weight,
  progress: Progress,
  notifications: Notifications,
  profile: Profile,
  settings: Settings,
  achievements: Achievements,
  habits: Habits,
  tools: Tools,
};

/** Renders one app screen by id. */
export function AppScreen({ id }: { id: ScreenId }) {
  const Component = SCREENS[id];
  return <Component />;
}
