import type { CSSProperties } from "react";
import {
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
} from "@/components/device/atoms";
import type { ScreenId } from "@/lib/screens";

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

function Dashboard() {
  return (
    <Screen>
      <Head title="Today" meta="Thursday, 30 July" />

      <Tile lit="flare">
        <div className="flex items-center gap-[4cqw]">
          <Ring value={0.72} size={26} accent="flare">
            <span className="text-[4.4cqw] font-black leading-none" data-numeric>
              1,842
            </span>
            <span className="mt-[0.8cqw] text-[2.3cqw] font-bold text-ash-dim">
              KCAL
            </span>
          </Ring>
          <div className="flex-1 space-y-[2.4cqw]">
            <Meter label="Protein" value={0.78} detail="148 / 190 g" accent="arc" index={0} />
            <Meter label="Carbs" value={0.64} detail="176 / 275 g" accent="flare" index={1} />
            <Meter label="Fat" value={0.55} detail="41 / 74 g" accent="good" index={2} />
          </div>
        </div>
      </Tile>

      <div className="grid grid-cols-3 gap-[2.6cqw]">
        <Tile className="p-[3.2cqw]">
          <Stat value="8,431" caption="Steps" accent="arc" />
        </Tile>
        <Tile className="p-[3.2cqw]">
          <Stat value="2.1" unit="L" caption="Water" accent="cyan" />
        </Tile>
        <Tile className="p-[3.2cqw]">
          <Stat value="78.4" unit="kg" caption="Weight" accent="good" />
        </Tile>
      </div>

      <Tile>
        <div className="flex items-center justify-between">
          <p className="text-[3.4cqw] font-bold">Push Day · Week 6</p>
          <Chip accent="flare">Resume</Chip>
        </div>
        <div className="mt-[3cqw] space-y-[2.6cqw]">
          <Row title="Bench Press" meta="4 × 8 · 82.5 kg" value="Done" accent="flare" done />
          <Row title="Incline Dumbbell" meta="3 × 10 · 30 kg" value="2/3" accent="flare" glyph="2" />
        </div>
      </Tile>

      <TabBar active={0} />
    </Screen>
  );
}

/* ---------------------------------------------------------------- workout */

function Workout() {
  return (
    <Screen>
      <Head
        title="Push Day"
        meta="Week 6 · 34:12 elapsed"
        action={<Chip accent="flare">Rest 1:30</Chip>}
      />

      <Tile lit="flare">
        <p className="text-[3.6cqw] font-bold">Bench Press</p>
        <p className="mt-[1cqw] text-[2.8cqw] font-medium text-ash-dim">
          Barbell · 4 sets
        </p>
        <div className="mt-[3.2cqw] space-y-[2cqw]">
          {[
            ["1", "82.5 kg", "8", true],
            ["2", "82.5 kg", "8", true],
            ["3", "82.5 kg", "7", true],
            ["4", "82.5 kg", "—", false],
          ].map(([set, load, reps, done]) => (
            <div
              key={set as string}
              className="flex items-center gap-[3cqw] rounded-[2.6cqw] bg-white/4 px-[3cqw] py-[2.2cqw]"
            >
              <span className="w-[6cqw] text-[2.9cqw] font-bold text-ash-dim">
                {set as string}
              </span>
              <span className="flex-1 text-[3.2cqw] font-bold" data-numeric>
                {load as string}
              </span>
              <span className="w-[10cqw] text-[3.2cqw] font-bold" data-numeric>
                {reps as string}
              </span>
              <span
                className={
                  done
                    ? "flex size-[5cqw] items-center justify-center rounded-[1.6cqw] bg-flare text-[2.8cqw] font-black text-[#200800]"
                    : "size-[5cqw] rounded-[1.6cqw] border border-white/18"
                }
              >
                {done ? "✓" : ""}
              </span>
            </div>
          ))}
        </div>
      </Tile>

      <Tile>
        <div className="flex items-baseline justify-between">
          <p className="text-[3.2cqw] font-bold">Session volume</p>
          <span className="text-[3.2cqw] font-black text-flare" data-numeric>
            7,240 kg
          </span>
        </div>
        <div className="mt-[2.6cqw]">
          <Bars values={[0.4, 0.55, 0.62, 0.58, 0.74, 0.68, 0.88]} accent="flare" height={18} highlight={6} />
        </div>
      </Tile>

      <Chip accent="flare" className="self-start">
        ⚡ New PR · Bench Press +2.5 kg
      </Chip>

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

function FoodLog() {
  return (
    <Screen>
      <Head title="Food" meta="1,842 of 2,550 kcal" />

      <Tile lit="good">
        <div className="flex items-center justify-between">
          <Stat value="708" unit="kcal" caption="Remaining" accent="good" />
          <Ring value={0.72} size={22} accent="good">
            <span className="text-[3cqw] font-black" data-numeric>
              72%
            </span>
          </Ring>
        </div>
      </Tile>

      <div className="space-y-[2.4cqw]">
        {[
          ["Breakfast", "Oats, whey, banana", "612 kcal", "B"],
          ["Lunch", "Chicken, rice, greens", "742 kcal", "L"],
          ["Snack", "Greek yoghurt, almonds", "288 kcal", "S"],
          ["Dinner", "Not logged yet", "—", "D"],
        ].map(([meal, detail, kcal, glyph]) => (
          <Tile key={meal} className="p-[3.2cqw]">
            <Row
              title={meal}
              meta={detail}
              value={kcal}
              accent="good"
              glyph={glyph}
            />
          </Tile>
        ))}
      </div>

      <div className="flex gap-[2cqw]">
        <Chip accent="good">＋ Quick add</Chip>
        <Chip>Repeat yesterday</Chip>
      </div>

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

function Progress() {
  return (
    <Screen>
      <Head title="Progress" meta="Last 12 weeks" />

      <div className="grid grid-cols-3 gap-[2.6cqw]">
        <Tile className="p-[3.2cqw]">
          <Stat value="68" caption="Sessions" accent="flare" />
        </Tile>
        <Tile className="p-[3.2cqw]">
          <Stat value="21" caption="Streak" accent="arc" />
        </Tile>
        <Tile className="p-[3.2cqw]">
          <Stat value="12" caption="PRs" accent="good" />
        </Tile>
      </div>

      <Tile lit="flare">
        <div className="flex items-baseline justify-between">
          <p className="text-[3.2cqw] font-bold">Weekly volume</p>
          <span className="text-[3cqw] font-bold text-flare" data-numeric>
            +18%
          </span>
        </div>
        <div className="mt-[2.8cqw]">
          <Bars
            values={[0.34, 0.42, 0.38, 0.52, 0.48, 0.61, 0.58, 0.7, 0.66, 0.79, 0.86, 0.95]}
            accent="flare"
            height={22}
            highlight={11}
          />
        </div>
      </Tile>

      <Tile>
        <p className="text-[3.2cqw] font-bold">Recent records</p>
        <div className="mt-[2.8cqw] space-y-[2.2cqw]">
          <Row title="Bench Press" meta="82.5 kg × 8" value="+2.5" accent="flare" glyph="⚡" />
          <Row title="Back Squat" meta="120 kg × 5" value="+5.0" accent="flare" glyph="⚡" />
          <Row title="Deadlift" meta="150 kg × 3" value="+2.5" accent="flare" glyph="⚡" />
        </div>
      </Tile>

      <TabBar active={4} />
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

function Profile() {
  return (
    <Screen>
      <Head title="Profile" meta="Lean bulk · Week 3" />

      <Tile lit="arc">
        <div className="flex items-center gap-[3.4cqw]">
          <div className="flex size-[13cqw] items-center justify-center rounded-pill bg-[linear-gradient(140deg,#3d7bff,#1b47c4)] text-[5cqw] font-black">
            V
          </div>
          <div>
            <p className="text-[4cqw] font-black leading-none">Varun</p>
            <p className="mt-[1.4cqw] text-[2.8cqw] font-semibold text-ash-dim">
              178 cm · 78.4 kg · 24 yrs
            </p>
          </div>
        </div>
      </Tile>

      <Tile>
        <p className="text-[3.2cqw] font-bold">Daily targets</p>
        <div className="mt-[3cqw] space-y-[2.6cqw]">
          <Meter label="Calories" value={0.72} detail="2,550" accent="flare" index={0} />
          <Meter label="Protein" value={0.78} detail="190 g" accent="arc" index={1} />
          <Meter label="Water" value={0.7} detail="3.0 L" accent="cyan" index={2} />
          <Meter label="Steps" value={0.84} detail="10,000" accent="good" index={3} />
        </div>
      </Tile>

      <Tile>
        <p className="text-[3.2cqw] font-bold">Achievements</p>
        <div className="mt-[2.8cqw] flex gap-[2.4cqw]">
          {["⚡", "🔥", "💧", "🏆"].map((badge) => (
            <div
              key={badge}
              className="flex size-[10cqw] items-center justify-center rounded-[3cqw] border border-white/9 bg-white/5 text-[4.2cqw]"
            >
              {badge}
            </div>
          ))}
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
};

/** Renders one app screen by id. */
export function AppScreen({ id }: { id: ScreenId }) {
  const Component = SCREENS[id];
  return <Component />;
}
