import type { ReactNode } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Reveal, RevealItem } from "@/components/ui/Reveal";
import { site } from "@/lib/site";

/**
 * The application's identity, stated as labelled facts.
 *
 * Google's OAuth verification rejected this site twice: once for a home page
 * that "does not explain the purpose of your app", and once because "the app
 * name IGNYT configured for your OAuth consent screen does not match the app
 * name on your home page".
 *
 * The prose elsewhere on this page answers both, but prose has to be
 * interpreted. This does not: the application name appears as a labelled value
 * equal to the string on the consent screen, and the purpose appears as a
 * labelled value beside it. A reviewer — or a matcher — never has to infer
 * which words on the page are the product's name.
 *
 * Deliberately plainer than everything around it. It reads as a fact table
 * rather than as marketing, which is exactly the point: the rest of this page
 * is trying to sell, and this block is only trying to be checkable. Resist the
 * urge to make it prettier.
 *
 * THE COPY BELOW IS VERBATIM AND LOAD-BEARING. It was written against specific
 * verification feedback. Restyle it freely; do not reword it.
 */
const FACTS: Array<{ label: string; value: ReactNode }> = [
  { label: "Application name", value: site.name },
  { label: "Application type", value: "Android mobile application" },
  { label: "Category", value: "Health & Fitness" },
  {
    /* A pill rather than plain text, matching the badge in the download
       section — the two state the same fact and must not read as two
       unrelated claims. */
    label: "Application status",
    value: (
      <span className="inline-flex items-center gap-2 rounded-pill border border-flare/30 bg-flare/10 px-3 py-1 text-[13px] font-semibold text-flare">
        <span aria-hidden className="size-1.5 rounded-pill bg-flare" />
        Pending Google Play release
      </span>
    ),
  },
  {
    label: "Purpose",
    value:
      "Fitness and nutrition tracking — workouts, calories, macros, hydration, fasting, body weight and progress.",
  },
  {
    label: "Data requested",
    value:
      "Google Health Connect: steps, distance, active energy, calories burned, exercise sessions, weight, hydration, and — where the device supports them — sleep and heart rate.",
  },
  {
    /* Verification asks the home page to "explain with transparency the purpose
       for which your app requests user data" — a separate question from what
       the app does and from which data it reads. This answers it directly: what
       each permission is used for, and what happens to the data afterwards. */
    label: "Why that data is requested",
    value:
      "Solely to display and calculate the user's own fitness figures inside the app: steps and active energy complete the daily calorie balance against food logged, exercise sessions populate workout history, and weight and hydration feed the progress charts. Permission is requested only for the data types a feature actually needs, at the point that feature is used, and can be revoked at any time from device settings. The data is never used for advertising, marketing or profiling, is never sold or shared with data brokers, and is not used to train any model.",
  },
  {
    label: "Website",
    value: (
      <a
        href={site.url}
        className="inline-flex min-h-6 items-center text-arc-bright transition-colors hover:text-chalk"
      >
        {site.domain}
      </a>
    ),
  },
  {
    label: "Support contact",
    value: (
      <a
        href={`mailto:${site.email.support}`}
        className="inline-flex min-h-6 items-center text-arc-bright transition-colors hover:text-chalk"
      >
        {site.email.support}
      </a>
    ),
  },
  {
    label: "Policies",
    value: (
      <span className="inline-flex flex-wrap gap-x-3 gap-y-1">
        <Link href="/privacy" className="text-arc-bright transition-colors hover:text-chalk">
          Privacy Policy
        </Link>
        <span aria-hidden className="text-ash-dim">
          ·
        </span>
        <Link href="/terms" className="text-arc-bright transition-colors hover:text-chalk">
          Terms &amp; Conditions
        </Link>
        <span aria-hidden className="text-ash-dim">
          ·
        </span>
        <Link
          href="/data-deletion"
          className="text-arc-bright transition-colors hover:text-chalk"
        >
          Delete Account
        </Link>
      </span>
    ),
  },
];

export function AppIdentity() {
  return (
    <section
      id="app-identity"
      aria-labelledby="app-identity-heading"
      className="scroll-mt-28 border-y border-hairline-soft bg-void-2 py-16 sm:py-20"
    >
      <Container>
        <Reveal>
          <h2
            id="app-identity-heading"
            className="text-[12px] font-bold uppercase tracking-[0.2em] text-ash-dim"
          >
            Application details
          </h2>

          {/* Staggered, like every other grid of comparable items on this site — Stats,
              BuiltFor and WhyIgnyt all cascade their children. This one arrived as a single
              block, which read as a slab landing rather than a list being written out, and
              was the only grid of its kind not doing it.

              The stagger is a scroll offset rather than a delay (see RevealItem), so it
              follows the reader's own pace instead of playing catch-up after a flick. */}
          <dl className="mt-8 grid gap-x-12 gap-y-6 sm:grid-cols-2 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)]">
            {FACTS.map((fact, index) => (
              <RevealItem
                key={fact.label}
                index={index}
                className="flex flex-col gap-1.5 border-l-2 border-hairline pl-4"
              >
                <dt className="text-[11.5px] font-semibold uppercase tracking-[0.12em] text-ash-dim">
                  {fact.label}
                </dt>
                <dd className="text-[15px] leading-[1.7] text-ash">
                  {fact.label === "Application name" ? (
                    <strong className="text-[18px] font-black tracking-[0.1em] text-chalk">
                      {fact.value}
                    </strong>
                  ) : (
                    fact.value
                  )}
                </dd>
              </RevealItem>
            ))}
          </dl>
        </Reveal>
      </Container>
    </section>
  );
}
