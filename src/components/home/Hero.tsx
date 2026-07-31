import type { CSSProperties } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { PhoneScene, type SceneSlide } from "@/components/device/PhoneScene";
import { FloatingMetrics } from "@/components/home/FloatingMetrics";
import { LogoMark } from "@/components/brand/Logo";
import { Aurora } from "@/components/ui/Aurora";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Magnetic } from "@/components/ui/Magnetic";
import { Particles } from "@/components/ui/Particles";
import { ShotScreen } from "@/components/device/ShotScreen";
import { claim, shot } from "@/lib/shots";
import { site } from "@/lib/site";

/**
 * The hero.
 *
 * It has one job that outranks every aesthetic consideration: a visitor — or a
 * Google OAuth reviewer — has to know what IGNYT is, what it does and who it is
 * for without scrolling. So the structure is fixed and deliberate:
 *
 *   h1            the application name, exactly "IGNYT" and nothing else
 *   subheading    what category of product it is
 *   description   the specific things it tracks, named
 *   actions       download, and a way further in
 *   facts         platform, price, offline, Health Connect
 *
 * The `h1` being the bare product name is not a stylistic choice. Google's
 * verification compares the application name on the home page against the name
 * on the consent screen, and this site was rejected once for exactly that
 * mismatch. Do not append a tagline to it.
 *
 * The entrance is staged — logo, name, subheading, description, buttons, facts,
 * device — each 90ms after the last, driven by the `.stage` class in CSS. No
 * JavaScript takes part, so it plays during first paint instead of waiting for
 * hydration, which is why there is no splash screen in front of it.
 */

/**
 * The six screens the hero cycles through, in narrative order: what today looks
 * like, then training, eating, the week, the records, the body.
 *
 * Real screenshots, pulled from the registry. `claim` fails the build if this
 * list ever repeats a screen.
 */
const HERO_SHOTS = claim("home-hero", [
  "home",
  "workout",
  "food-log",
  "progress",
  "records",
  /* Was the Log Weight screen. That capture is gone — it carried a real body
     weight and target — so the calculators screen takes the slot. */
  "calculators",
]);

const HERO_FACTS = [
  "Free on Android",
  `Android ${site.app.minAndroid}+`,
  "Works fully offline",
  "Google Health Connect",
];

export function Hero() {
  const slides: SceneSlide[] = HERO_SHOTS.map((id, index) => {
    const meta = shot(id);
    return {
      id,
      label: meta.screen,
      description: `IGNYT — ${meta.screen}. ${meta.purpose}.`,
      /* Only the first slide is eager: it is the largest above-the-fold image
         on the site. The other five are fetched as the carousel reaches them. */
      screen: <ShotScreen id={id} priority={index === 0} sizes="320px" />,
    };
  });

  return (
    <section
      aria-labelledby="hero-heading"
      className="relative overflow-hidden pb-24 pt-12 sm:pb-32 sm:pt-16 lg:pb-40 lg:pt-20"
    >
      <Aurora tone="mixed" />

      {/* Drifting embers. Renders nothing below the "full" motion tier. */}
      <Particles className="pointer-events-none absolute inset-0 -z-10 size-full" />

      {/* Horizon. A single lit hairline low in the hero, giving the device
          something to stand on and separating the fold from the section below
          without a hard border across the page. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-px bg-[linear-gradient(90deg,transparent,rgba(61,123,255,0.42)_34%,rgba(255,106,26,0.3)_66%,transparent)]"
      />

      <Container>
        <div className="grid items-center gap-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,460px)] lg:gap-12">
          {/* --------------------------------------------------------- copy */}
          <div className="text-center lg:text-left">
            <div
              className="stage flex justify-center lg:justify-start"
              style={{ "--d": 0 } as CSSProperties}
            >
              <LogoMark
                size={88}
                priority
                title="IGNYT"
                className="size-[74px] sm:size-[88px]"
              />
            </div>

            <h1
              id="hero-heading"
              className="stage mt-7 text-[clamp(3.4rem,11vw,6.25rem)] font-black leading-[0.92] tracking-[-0.055em]"
              style={{ "--d": 1 } as CSSProperties}
            >
              <span className="text-arc-gradient">IGNYT</span>
            </h1>

            <p
              className="stage mt-5 text-[clamp(1.2rem,3vw,1.75rem)] font-bold leading-[1.24] tracking-[-0.03em] text-chalk"
              style={{ "--d": 2 } as CSSProperties}
            >
              Your Complete Fitness &amp; Nutrition Tracker
            </p>

            <p
              className="stage mx-auto mt-6 max-w-xl text-[16.5px] leading-[1.72] text-ash lg:mx-0 lg:text-[17.5px]"
              style={{ "--d": 3 } as CSSProperties}
            >
              Track workouts, nutrition, calories, macros, hydration, fasting,
              body weight, progress, and Google Health Connect in one powerful
              application.
            </p>

            <div
              /* `items-center`, not `items-stretch`. <Magnetic> renders an
                 inline-flex wrapper, so stretching it to full width leaves the
                 button itself sitting at natural width against the left edge of
                 a stretched span — which reads as a broken centre on mobile. */
              className="stage mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start"
              style={{ "--d": 4 } as CSSProperties}
            >
              <Magnetic>
                <ButtonLink href="/download" size="lg" variant="flare">
                  Download App
                  <ArrowRight aria-hidden className="size-[18px]" />
                </ButtonLink>
              </Magnetic>
              <Magnetic strength={0.18}>
                <ButtonLink href="#features" size="lg" variant="outline">
                  Explore Features
                </ButtonLink>
              </Magnetic>
            </div>

            {/* The facts a reviewer scans for, as chips rather than buried in
                the paragraph above. */}
            <ul
              className="stage mt-9 flex flex-wrap justify-center gap-2 lg:justify-start"
              style={{ "--d": 5 } as CSSProperties}
            >
              {HERO_FACTS.map((fact) => (
                <li
                  key={fact}
                  className="inline-flex items-center gap-2 rounded-pill border border-hairline bg-carbon/60 px-3.5 py-2 text-[13px] font-semibold text-ash"
                >
                  <Sparkles aria-hidden className="size-3.5 text-arc" />
                  {fact}
                </li>
              ))}
            </ul>
          </div>

          {/* ------------------------------------------------------- device */}
          <div
            className="stage relative mx-auto w-full max-w-[286px] sm:max-w-[320px]"
            style={{ "--d": 6 } as CSSProperties}
          >
            <PhoneScene
              slides={slides}
              realShots
              showSelector={false}
              interval={3800}
              overlay={<FloatingMetrics />}
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
