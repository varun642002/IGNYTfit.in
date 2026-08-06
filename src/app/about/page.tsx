import type { Metadata } from "next";
import {
  Accessibility,
  Brain,
  Building2,
  Cloud,
  Compass,
  Database,
  FileHeart,
  Gauge,
  HeartPulse,
  Layers,
  Lock,
  Rocket,
  Ruler,
  ShieldCheck,
  Sparkles,
  Target,
  Watch,
  type LucideIcon,
} from "lucide-react";
import { DownloadCta } from "@/components/home/DownloadCta";
import { breadcrumbSchema, JsonLd } from "@/components/seo/JsonLd";
import { Aurora } from "@/components/ui/Aurora";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal, RevealItem } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Spotlight } from "@/components/ui/Spotlight";
import { Surface } from "@/components/ui/Surface";
import { createMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

export const metadata: Metadata = createMetadata({
  title: "About",
  description:
    "Why IGNYT exists: the mission, the vision, the problems it solves, the values it is built on, the technology behind it, and what is planned next.",
  path: "/about",
  keywords: [
    "about IGNYT",
    "IGNYT mission",
    "fitness app roadmap",
    "privacy first fitness app",
  ],
});

/**
 * The six problems IGNYT was built to remove.
 *
 * Rendered as a ledger — problem on the left, what the app does about it on the
 * right, a hairline between each — rather than as six cards. The pairing is the
 * whole point of this content, and a card grid hides it: cards are read as a
 * list of features, while a two-column row is read as a claim and its answer.
 */
const PROBLEMS = [
  {
    problem: "Your data is scattered across five apps",
    solution:
      "Workouts in one app, calories in another, fasting in a third, weight in a spreadsheet. None of them share a number, so none of them can tell you anything useful. IGNYT keeps one data model for all of it.",
  },
  {
    problem: "Everything useful is behind a subscription",
    solution:
      "Macro targets, charts and exports are routinely paywalled elsewhere. In IGNYT the core tracking features are free, and your own data is never held behind a subscription.",
  },
  {
    problem: "Fitness apps assume you are always online",
    solution:
      "Gyms have terrible signal. IGNYT keeps the food database, timers, charts and search on the device, so a dead connection changes nothing.",
  },
  {
    problem: "Health data is quietly monetised",
    solution:
      "Bodyweight, sleep and heart rate are unusually sensitive. IGNYT ships no advertising SDKs and never uses health data for advertising, marketing or profiling — and every sync is opt-in.",
  },
  {
    problem: "Nutrition tracking stops at calories",
    solution:
      "Most apps count three macros and stop. IGNYT tracks protein per kilogram of bodyweight plus the micronutrients — fibre, iron, calcium — that actually change how you feel.",
  },
  {
    problem: "Leaving an app means losing your history",
    solution:
      "Export is a first-class feature: full JSON backup, or CSV per data type, on demand. If you outgrow IGNYT, your training history comes with you.",
  },
];

interface Value {
  title: string;
  body: string;
  Icon: LucideIcon;
}

const VALUES: Value[] = [
  {
    title: "Health first",
    body: "Every number in the app is there to support a decision about training or eating. Nothing is included to drive engagement, and nothing nags you for opening the app less often.",
    Icon: HeartPulse,
  },
  {
    title: "Privacy first",
    body: "Local storage is the default, not a setting. Cloud sync, Google sign-in and Health Connect are each independently optional and independently revocable.",
    Icon: Lock,
  },
  {
    title: "Simple experience",
    body: "One tap to log a set. Three to log a meal. If a new feature would slow down the paths people use every day, it goes somewhere else in the app.",
    Icon: Sparkles,
  },
  {
    title: "Continuous improvement",
    body: "IGNYT ships in small, frequent releases driven by real training use — a food database cleanup, a rest-timer fix, a chart that was hard to read.",
    Icon: Compass,
  },
  {
    title: "Innovation with restraint",
    body: "New platform capabilities like Health Connect get adopted when they make the app genuinely better, not because they are new.",
    Icon: Rocket,
  },
];

const STACK = [
  {
    name: "Next.js",
    role: "This website",
    body: "The site you are reading: statically generated, dark-first, with no third-party scripts.",
    Icon: Layers,
  },
  {
    name: "Capacitor + Android",
    role: "The app shell",
    body: "A web core packaged as a native Android application, with Kotlin plugins for the parts that must be native.",
    Icon: Building2,
  },
  {
    name: "Firebase",
    role: "Optional cloud sync",
    body: "Firestore, with security rules that restrict every document to the account that owns it. Off unless you sign in.",
    Icon: Cloud,
  },
  {
    name: "Health Connect",
    role: "On-device health data",
    body: "Android's own health data layer, read through 17 individually granted permissions and never proxied through a server.",
    Icon: HeartPulse,
  },
  {
    name: "On-device database",
    role: "Local-first storage",
    body: "Your logs, the 3,160-item food database and every chart live in app-sandboxed storage on the phone.",
    Icon: Database,
  },
  {
    name: "Offline-first architecture",
    role: "How it all fits",
    body: "The device is the source of truth. The cloud, when enabled, is a copy — not the other way round.",
    Icon: Gauge,
  },
];

const ROADMAP = [
  {
    title: "AI coach",
    body: "Programme suggestions grounded in your own logged volume, recovery and adherence — not a generic template.",
    Icon: Brain,
  },
  {
    title: "AI nutrition",
    body: "Faster logging from natural descriptions of a meal, with the same database and the same macros behind it.",
    Icon: Sparkles,
  },
  {
    title: "Wearables",
    body: "Deeper integration with watches and straps for live heart rate during a session.",
    Icon: Watch,
  },
  {
    title: "Apple Health",
    body: "An iOS client with the same local-first guarantees, reading from Apple Health the way the Android build reads Health Connect.",
    Icon: Accessibility,
  },
  {
    title: "Web dashboard",
    body: "A read-and-plan surface on a bigger screen for programme design and long-range analysis.",
    Icon: Ruler,
  },
  {
    title: "Medical records",
    body: "Blood work and medical report tracking, held to the same on-device standard as the rest of your health data.",
    Icon: FileHeart,
  },
  {
    title: "Enterprise features",
    body: "Coach and team tooling: shared programmes, athlete rosters and progress reviews.",
    Icon: Target,
  },
];

const COMMITMENTS = [
  {
    title: "Privacy",
    body: "No advertising SDKs and no data brokers. Health data is never used for advertising or profiling, and the only analytics collected are anonymous crash and performance metrics.",
    Icon: Lock,
  },
  {
    title: "Security",
    body: "Local data sits in app-sandboxed storage. Cloud data is protected by your Google account and by Firestore rules that scope every document to a single user.",
    Icon: ShieldCheck,
  },
  {
    title: "Accuracy",
    body: "The food database is curated and de-duplicated rather than crowd-sourced without review, and health values are read from Health Connect rather than estimated.",
    Icon: Target,
  },
  {
    title: "Reliability",
    body: "Offline-first means the app cannot be taken down by a server outage. Your data is on your phone, and it exports in full whenever you ask.",
    Icon: Gauge,
  },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "About", path: "/about" }])} />

      <PageHero
        eyebrow="About IGNYT"
        tone="flare"
        title={
          <>
            Built for people who actually{" "}
            <span className="text-flare-gradient">train</span>
          </>
        }
        lead="IGNYT started as one person's training log and grew into a complete fitness system — because the alternative was six apps, three subscriptions and a spreadsheet that nobody kept up to date."
      />

      {/* ------------------------------------------------------------ origin
          The "six to one" statement, set as display type rather than as a card.
          It is the single sentence the rest of the page argues for, so it gets
          the page's largest numerals and nothing else competes with it. */}
      <Section id="origin" className="relative">
        <Aurora tone="flare" className="opacity-55" />

        <div className="grid gap-14 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)] lg:gap-20">
          <Reveal>
            <Eyebrow tone="flare" className="mb-7">
              Where it came from
            </Eyebrow>
            <p className="flex items-baseline gap-5 font-black leading-none tracking-[-0.055em]">
              <span className="text-flare-gradient text-[clamp(4.5rem,13vw,8.5rem)]">
                6
              </span>
              <span className="text-[clamp(1.6rem,4vw,2.6rem)] text-ash-dim">
                →
              </span>
              <span className="text-arc-gradient text-[clamp(4.5rem,13vw,8.5rem)]">
                1
              </span>
            </p>
            <p className="mt-6 max-w-sm text-[15px] leading-[1.7] text-ash-dim">
              Tracking one training block used to mean a workout logger, a
              calorie counter, a fasting timer, a water reminder, a supplement
              checklist and a weight spreadsheet — reconciled by hand every
              Sunday.
            </p>
          </Reveal>

          <div className="flex flex-col gap-6">
            <Reveal direction="left">
              <Surface lit="flare" className="p-8 sm:p-10">
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-flare">
                  Our mission
                </p>
                <h2
                  id="origin-heading"
                  className="mt-5 text-[clamp(1.5rem,3vw,2.05rem)] font-black leading-[1.16] tracking-[-0.03em]"
                >
                  Make consistent training and honest nutrition tracking easy
                  enough that people keep doing it.
                </h2>
                <p className="mt-5 text-[15px] leading-[1.72] text-ash">
                  Most fitness journeys do not fail on knowledge — they fail on
                  friction. IGNYT exists to remove the friction: one app, one set
                  of numbers, no paywall in the middle of a workout, and no
                  requirement to be online at the moment you need it most.
                </p>
              </Surface>
            </Reveal>

            <Reveal direction="left">
              <Surface className="p-8 sm:p-10">
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-arc">
                  Our vision
                </p>
                <h2 className="mt-5 text-[clamp(1.5rem,3vw,2.05rem)] font-black leading-[1.16] tracking-[-0.03em]">
                  A complete health picture that belongs to the person it
                  describes.
                </h2>
                <p className="mt-5 text-[15px] leading-[1.72] text-ash">
                  Training, nutrition, sleep, hydration, body composition and
                  blood work all describe the same body. They belong in one place
                  — and that place should be the device in your pocket, under
                  your control, exportable at any moment.
                </p>
              </Surface>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* ----------------------------------------------------------- ledger */}
      <Section
        id="problems"
        className="border-y border-hairline-soft bg-void-2"
      >
        <SectionHeading
          id="problems"
          eyebrow="What it replaces"
          title="Six complaints, answered one at a time"
          lead="Each of these is a specific thing that was wrong with tracking a training block. The right-hand column is what IGNYT does about it."
          className="mb-16"
        />

        <ul className="mx-auto max-w-4xl">
          {PROBLEMS.map((item, index) => (
            <RevealItem
              as="li"
              key={item.problem}
              index={index}
              className="grid gap-3 border-t border-hairline-soft py-8 last:border-b sm:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] sm:gap-10"
            >
              <h3 className="flex gap-4 text-[17px] font-bold leading-[1.35] tracking-[-0.02em] text-chalk">
                <span
                  aria-hidden
                  className="mt-1 text-[12px] font-black tabular-nums text-flare"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                {item.problem}
              </h3>
              <p className="text-[15px] leading-[1.72] text-ash">
                {item.solution}
              </p>
            </RevealItem>
          ))}
        </ul>
      </Section>

      {/* ----------------------------------------------------------- values */}
      <Section id="values" className="relative">
        <Aurora tone="arc" className="opacity-50" />

        <SectionHeading
          id="values"
          eyebrow="Core values"
          title="Five rules that decide what gets built"
          lead="Every feature request is measured against these. Most of what IGNYT does not do was rejected by one of them."
          className="mb-16"
        />

        <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {VALUES.map((value, index) => (
            <RevealItem
              as="li"
              key={value.title}
              index={index % 3}
              /* The first value spans two columns. "Health first" is the rule the
                 other four serve, and a five-item grid needs somewhere for the
                 odd item to go anyway. */
              className={cn(index === 0 && "lg:col-span-2")}
            >
              <Spotlight tone="arc" className="h-full rounded-card">
                <Surface
                  lit={index === 0 ? "arc" : undefined}
                  className="flex h-full flex-col p-7 sm:p-8"
                >
                  <span className="grid size-11 place-items-center rounded-panel border border-arc/30 bg-arc/12 text-arc-bright">
                    <value.Icon aria-hidden className="size-5" strokeWidth={2} />
                  </span>
                  <h3
                    className={cn(
                      "mt-6 font-black tracking-[-0.025em] text-chalk",
                      index === 0 ? "text-[24px] sm:text-[27px]" : "text-[18px]",
                    )}
                  >
                    {value.title}
                  </h3>
                  <p
                    className={cn(
                      "mt-3.5 leading-[1.7] text-ash",
                      index === 0 ? "max-w-2xl text-[16px]" : "text-[14.5px]",
                    )}
                  >
                    {value.body}
                  </p>
                </Surface>
              </Spotlight>
            </RevealItem>
          ))}
        </ul>
      </Section>

      {/* ------------------------------------------------------------ stack
          A specification table rather than cards. This section is engineering
          detail, and a fact table is how engineering detail is read — the role
          column is set in mono so the six rows scan vertically. */}
      <Section id="technology" className="border-y border-hairline-soft bg-void-2">
        <SectionHeading
          id="technology"
          eyebrow="Technology"
          title="Modern architecture, deliberately boring where it counts"
          lead="The interesting engineering is in staying offline-first. Everything else is chosen to be predictable."
          className="mb-16"
        />

        <Reveal className="mx-auto max-w-4xl overflow-hidden rounded-card border border-hairline">
          <dl className="divide-y divide-hairline-soft">
            {STACK.map((item) => (
              <div
                key={item.name}
                className="grid gap-3 bg-carbon/60 p-6 sm:grid-cols-[minmax(0,240px)_minmax(0,1fr)] sm:gap-8 sm:p-7"
              >
                <dt className="flex items-start gap-3.5">
                  <span className="grid size-9 shrink-0 place-items-center rounded-panel border border-arc/25 bg-arc/10 text-arc-bright">
                    <item.Icon
                      aria-hidden
                      className="size-[17px]"
                      strokeWidth={2.1}
                    />
                  </span>
                  <span>
                    <span className="block text-[16px] font-bold leading-tight tracking-[-0.02em] text-chalk">
                      {item.name}
                    </span>
                    <span className="mt-1.5 block font-mono text-[11.5px] uppercase tracking-[0.1em] text-ash-dim">
                      {item.role}
                    </span>
                  </span>
                </dt>
                <dd className="text-[14.5px] leading-[1.7] text-ash sm:pt-1">
                  {item.body}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </Section>

      {/* ---------------------------------------------------------- roadmap */}
      <Section id="roadmap" className="relative">
        <Aurora tone="mixed" className="opacity-45" />

        <SectionHeading
          id="roadmap"
          eyebrow="Roadmap"
          title="What comes next"
          lead="Planned direction, not shipping dates. Nothing here is in the app yet — when it lands, it lands in a release note first."
          className="mb-16"
        />

        <div className="relative mx-auto max-w-3xl">
          {/* The rail runs arc → flare down the whole sequence — the same
              gradient the storytelling scene uses for its progress. */}
          <span
            aria-hidden
            className="absolute bottom-6 left-[27px] top-6 w-px bg-[linear-gradient(180deg,transparent,var(--color-arc)_12%,var(--color-flare)_88%,transparent)] opacity-45"
          />

          <ol className="flex flex-col gap-8">
            {ROADMAP.map((item, index) => (
              <RevealItem
                as="li"
                key={item.title}
                index={index}
                className="flex gap-6"
              >
                {/* The ring sits on the rail. Its solid background is what
                    punches the rail out behind it — a shadow spread in the page
                    colour would have to be updated if the background changed. */}
                <span className="relative z-10 grid size-14 shrink-0 place-items-center rounded-panel border border-hairline bg-void text-arc-bright">
                  <item.Icon aria-hidden className="size-5" strokeWidth={2} />
                </span>
                <div className="pt-2.5">
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="text-[18px] font-bold tracking-[-0.025em]">
                      {item.title}
                    </h3>
                    <span className="rounded-pill border border-hairline bg-carbon px-2.5 py-1 text-[10.5px] font-bold uppercase tracking-[0.16em] text-ash-dim">
                      Planned
                    </span>
                  </div>
                  <p className="mt-2.5 max-w-xl text-[15px] leading-[1.72] text-ash">
                    {item.body}
                  </p>
                </div>
              </RevealItem>
            ))}
          </ol>
        </div>
      </Section>

      {/* ------------------------------------------------------ commitments */}
      <Section
        id="commitment"
        className="border-t border-hairline-soft bg-void-2"
      >
        <SectionHeading
          id="commitment"
          eyebrow="Our commitment"
          title="Four promises we hold ourselves to"
          className="mb-16"
        />

        <ul className="grid gap-px overflow-hidden rounded-card border border-hairline bg-hairline sm:grid-cols-2 lg:grid-cols-4">
          {COMMITMENTS.map((item, index) => (
            <RevealItem
              as="li"
              key={item.title}
              index={index}
              className="flex flex-col bg-carbon p-7"
            >
              <item.Icon
                aria-hidden
                className="size-6 text-good"
                strokeWidth={2.1}
              />
              <h3 className="mt-6 text-[17px] font-bold tracking-[-0.02em]">
                {item.title}
              </h3>
              <p className="mt-3 text-[14px] leading-[1.68] text-ash">
                {item.body}
              </p>
            </RevealItem>
          ))}
        </ul>

        {/*
          What used to sit here was "Join thousands of people building healthier
          lifestyles with IGNYT". There is no source for that number — the app is
          at version 1.0.40 and the Play listing has not been released — so it
          has been replaced with something checkable. See lib/metrics.ts for the
          same reasoning applied to the home page.
        */}
        {/* A plain div, not a Container. Section already renders one, and a Container inside
            a Container applies the horizontal padding twice — this block sat 32px inside the
            rail every other section on the page keeps. */}
        <div className="mt-16 text-center">
          <Reveal>
            <p className="mx-auto max-w-2xl text-[16px] leading-[1.75] text-ash">
              IGNYT is free, runs on Android {site.app.minAndroid} and later, and
              works with no connection at all. One logged set, one honest meal
              and one consistent week at a time.
            </p>
          </Reveal>
        </div>
      </Section>

      <DownloadCta />
    </>
  );
}
