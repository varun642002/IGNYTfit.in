import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/lib/site";

/**
 * The application's identity, stated as labelled facts.
 *
 * Google's OAuth verification rejected this site twice: once for a home page
 * that "does not explain the purpose of your app", and once because "the app
 * name IGNYT configured for your OAuth consent screen does not match the app
 * name on your home page".
 *
 * The prose above already answers both, but prose has to be interpreted. This
 * does not: the application name appears as a labelled value equal to the
 * string on the consent screen, and the purpose appears as a labelled value
 * next to it. A reviewer — or a matcher — does not have to infer which words on
 * the page are the product's name.
 *
 * Deliberately plain. It reads as a fact table rather than marketing, which is
 * the point: everything else on this page is trying to sell, and this is the
 * one block that is only trying to be checkable.
 */
const FACTS: Array<{ label: string; value: React.ReactNode }> = [
  { label: "Application name", value: site.name },
  { label: "Application type", value: "Android mobile application" },
  { label: "Category", value: "Health & Fitness" },
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
    /* Google's verification asks the home page to "explain with transparency
       the purpose for which your app requests user data" — which is a separate
       question from what the app does, and from which data it reads. This
       answers it directly: what each permission is used for, and what happens
       to the data afterwards. */
    label: "Why that data is requested",
    value:
      "Solely to display and calculate the user's own fitness figures inside the app: steps and active energy complete the daily calorie balance against food logged, exercise sessions populate workout history, and weight and hydration feed the progress charts. Permission is requested only for the data types a feature actually needs, at the point that feature is used, and can be revoked at any time from device settings. The data is never used for advertising, marketing or profiling, is never sold or shared with data brokers, and is not used to train any model.",
  },
  {
    label: "Website",
    value: (
      <a
        href={site.url}
        className="text-ember transition-colors hover:text-ember-strong"
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
        className="text-ember transition-colors hover:text-ember-strong"
      >
        {site.email.support}
      </a>
    ),
  },
  {
    label: "Policies",
    value: (
      <span className="inline-flex flex-wrap gap-x-3 gap-y-1">
        <Link
          href="/privacy"
          className="text-ember transition-colors hover:text-ember-strong"
        >
          Privacy Policy
        </Link>
        <span aria-hidden className="text-text-dim">
          ·
        </span>
        <Link
          href="/terms"
          className="text-ember transition-colors hover:text-ember-strong"
        >
          Terms &amp; Conditions
        </Link>
        <span aria-hidden className="text-text-dim">
          ·
        </span>
        <Link
          href="/data-deletion"
          className="text-ember transition-colors hover:text-ember-strong"
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
      className="scroll-mt-24 border-y border-line bg-surface/30 py-14 sm:py-16"
    >
      <Container>
        <Reveal>
          <h2
            id="app-identity-heading"
            className="text-[13px] font-bold uppercase tracking-[0.16em] text-text-dim"
          >
            Application details
          </h2>

          <dl className="mt-7 grid gap-x-10 gap-y-5 sm:grid-cols-2 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)]">
            {FACTS.map((fact) => (
              <div
                key={fact.label}
                className="flex flex-col gap-1 border-l-2 border-line pl-4"
              >
                <dt className="text-[12px] font-semibold uppercase tracking-[0.1em] text-text-dim">
                  {fact.label}
                </dt>
                <dd className="text-[15px] leading-relaxed text-text-mute">
                  {fact.label === "Application name" ? (
                    <strong className="text-[17px] font-black tracking-[0.08em] text-text">
                      {fact.value}
                    </strong>
                  ) : (
                    fact.value
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </Container>
    </section>
  );
}
