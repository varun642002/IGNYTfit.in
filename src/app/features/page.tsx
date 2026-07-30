import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ShieldCheck, WifiOff, Zap } from "lucide-react";
import { AppScreen } from "@/components/device/AppScreens";
import { PhoneShell } from "@/components/device/PhoneShell";
import { DownloadCta } from "@/components/home/DownloadCta";
import { appSchema, breadcrumbSchema, JsonLd } from "@/components/seo/JsonLd";
import { ButtonLink } from "@/components/ui/Button";
import { PageHero } from "@/components/ui/PageHero";
import { PlayStoreButton } from "@/components/ui/PlayStoreButton";
import { RevealItem } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Spotlight } from "@/components/ui/Spotlight";
import { Surface } from "@/components/ui/Surface";
import { ACCENT_CLASSES, features } from "@/lib/features";
import { featuredScreens } from "@/lib/screens";
import { createMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const metadata: Metadata = createMetadata({
  title: "Features",
  description:
    "Everything IGNYT does: workout tracking, food logging, calorie and macro tracking, micronutrients, diet plans, fasting, water, supplements, weight, progress charts, goals, achievements, Health Connect, reminders, cloud backup and full offline support.",
  path: "/features",
  keywords: [
    "IGNYT features",
    "workout tracking app features",
    "macro tracking app",
    "micronutrient tracker",
    "fasting tracker Android",
  ],
});

/** The three commitments that shape how every feature is built. */
const PRINCIPLES = [
  {
    Icon: WifiOff,
    title: "Offline first, not offline capable",
    body: "The database, the timers, the charts and the search index all live on the device. A connection is a bonus, never a requirement — nothing degrades when you lose signal in a basement gym.",
  },
  {
    Icon: ShieldCheck,
    title: "Private by default",
    body: "No advertising SDKs and no behavioural tracking. Health data is never used for advertising or profiling, Cloud Sync and Health Connect are both opt-in and independently revocable, and your data exports in full whenever you ask.",
  },
  {
    Icon: Zap,
    title: "Fast enough to use mid-set",
    body: "Logging a set is one tap. Search returns instantly because it never leaves the phone. If a feature would slow the log-a-set path down, it goes somewhere else.",
  },
];

export default function FeaturesPage() {
  return (
    <>
      <JsonLd data={appSchema} />
      <JsonLd data={breadcrumbSchema([{ name: "Features", path: "/features" }])} />

      <PageHero
        eyebrow="Features"
        tone="flare"
        title={
          <>
            Everything IGNYT does,{" "}
            <span className="text-flare-gradient">properly</span>
          </>
        }
        lead="No feature here is a checkbox. Each one is built to survive a real training week — including the days with no signal, no time and no motivation."
      >
        <PlayStoreButton />
        <ButtonLink href="/screenshots" variant="outline" size="lg">
          See the screens
          <ArrowRight aria-hidden className="size-4" />
        </ButtonLink>
      </PageHero>

      <Section id="all-features">
        <SectionHeading
          id="all-features"
          eyebrow="The full list"
          title="Everything in one app"
          lead="Training, nutrition, hydration, supplementation and body composition, sharing one set of numbers instead of five apps that disagree with each other."
          className="mb-16"
        />

        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            const accent = ACCENT_CLASSES[feature.accent];
            const Icon = feature.icon;

            return (
              <RevealItem as="li" key={feature.id} index={index % 3}>
                <Spotlight
                  tone={feature.accent === "flare" ? "flare" : "arc"}
                  className="h-full rounded-card"
                >
                  {/* `scroll-mt` clears the fixed header when the home page's
                      feature cards deep-link to these anchors. */}
                  <Surface
                    id={feature.id}
                    className="flex h-full scroll-mt-28 flex-col p-7"
                  >
                    <span
                      className={cn(
                        "grid size-11 place-items-center rounded-panel border",
                        accent.bg,
                        accent.border,
                        accent.text,
                      )}
                    >
                      <Icon aria-hidden className="size-5" strokeWidth={2} />
                    </span>
                    <h2 className="mt-6 text-[18px] font-bold tracking-[-0.02em] text-chalk">
                      {feature.title}
                    </h2>
                    <p className="mt-3 text-[14.5px] leading-[1.68] text-ash">
                      {feature.description}
                    </p>
                  </Surface>
                </Spotlight>
              </RevealItem>
            );
          })}
        </ul>
      </Section>

      <Section id="principles" className="border-y border-hairline-soft bg-void-2">
        <SectionHeading
          id="principles"
          eyebrow="How it is built"
          title="Three rules the whole app follows"
          className="mb-16"
        />

        <ul className="grid gap-4 lg:grid-cols-3">
          {PRINCIPLES.map((principle, index) => (
            <RevealItem as="li" key={principle.title} index={index}>
              <Surface
                className="h-full p-8"
                lit={index === 1 ? "arc" : undefined}
              >
                <principle.Icon
                  aria-hidden
                  className="size-6 text-flare"
                  strokeWidth={2.1}
                />
                <h3 className="mt-6 text-[19px] font-bold tracking-[-0.025em]">
                  {principle.title}
                </h3>
                <p className="mt-3.5 text-[14.5px] leading-[1.7] text-ash">
                  {principle.body}
                </p>
              </Surface>
            </RevealItem>
          ))}
        </ul>
      </Section>

      <Section id="features-preview">
        <SectionHeading
          id="features-preview"
          eyebrow="In context"
          title="What that looks like on screen"
          lead="The same features, in the app itself."
          className="mb-16"
        />

        {/* Static devices rather than the interactive rail: this page is already
            long, and three still phones make the point without adding a second
            scroll surface to a page that is mostly a list. */}
        <div className="flex flex-wrap items-end justify-center gap-8">
          {featuredScreens.slice(0, 3).map((screen, index) => (
            <Link
              key={screen.id}
              href={`/screenshots#${screen.id}`}
              className="group flex flex-col items-center gap-5"
            >
              <PhoneShell
                glow={index === 1}
                label={`The IGNYT ${screen.title} screen`}
                className={cn(
                  "transition-transform duration-500 ease-glide group-hover:-translate-y-1.5",
                  index === 1
                    ? "w-[224px] xl:w-[252px]"
                    : "hidden w-[196px] opacity-80 transition-opacity group-hover:opacity-100 sm:block xl:w-[222px]",
                )}
              >
                <AppScreen id={screen.id} />
              </PhoneShell>
              <span className="text-[14px] font-semibold text-ash transition-colors group-hover:text-chalk">
                {screen.title}
              </span>
            </Link>
          ))}
        </div>
      </Section>

      <DownloadCta />
    </>
  );
}
