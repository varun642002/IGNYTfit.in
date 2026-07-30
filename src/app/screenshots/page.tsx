import type { Metadata } from "next";
import { DownloadCta } from "@/components/home/DownloadCta";
import { RealGallery } from "@/components/screenshots/RealGallery";
import { ScreenGallery } from "@/components/screenshots/ScreenGallery";
import { breadcrumbSchema, JsonLd } from "@/components/seo/JsonLd";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { PlayStoreButton } from "@/components/ui/PlayStoreButton";
import { createMetadata } from "@/lib/seo";
import { screens } from "@/lib/screens";

export const metadata: Metadata = createMetadata({
  title: "Screenshots",
  description:
    "See every major IGNYT screen: dashboard, workout tracking, exercise details, food log, food search, nutrition analysis, diet plans, fasting, water, supplements, Health Connect, weight, progress, reminders, profile and settings.",
  path: "/screenshots",
  keywords: [
    "IGNYT screenshots",
    "fitness app screenshots",
    "workout tracker screenshots",
    "food log app screens",
  ],
});

export default function ScreenshotsPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([{ name: "Screenshots", path: "/screenshots" }])}
      />

      <PageHero
        eyebrow="Screenshots"
        /* Never hard-code the count here. It said "Sixteen" while the lead
           below read from `screens.length` and said nineteen, because three
           screens were added and only one of the two numbers moved. */
        title={
          <>
            Every screen.{" "}
            <span className="text-arc-gradient">One fitness system.</span>
          </>
        }
        lead={`A guided tour of all ${screens.length} screens — from the first set you log to the analytics that tell you whether the last twelve weeks actually worked.`}
      >
        <PlayStoreButton />
        <ButtonLink href="/features" variant="outline" size="lg">
          Read the feature list
        </ButtonLink>
      </PageHero>

      {/* The real build first. Whatever the vector mockups gain in sharpness,
          a prospective user wants to see the actual application before they
          see an illustration of it. */}
      <section
        aria-labelledby="screens-real-heading"
        className="cv-auto border-b border-hairline-soft py-20 sm:py-24"
      >
        <Container wide>
          <h2
            id="screens-real-heading"
            className="text-[clamp(1.6rem,3.4vw,2.2rem)] font-black tracking-[-0.03em]"
          >
            The app itself
          </h2>
          <p className="mt-4 max-w-2xl text-[16px] leading-[1.7] text-ash">
            Screenshots from the current Android build — training plans, food
            logging, analytics, achievements, habits and the tools underneath
            them.
          </p>
          <div className="mt-12">
            <RealGallery />
          </div>
        </Container>
      </section>

      {/* Two rails of eight rather than one long one. A single rail that long
          takes a dozen swipes to reach the end and gives no sense of how much is
          left; splitting it into "during a session" and "the result" makes the
          set legible at a glance. */}
      <section
        aria-labelledby="screens-train-heading"
        className="cv-auto py-20 sm:py-24"
      >
        <Container>
          <h2
            id="screens-train-heading"
            className="text-[clamp(1.6rem,3.4vw,2.2rem)] font-black tracking-[-0.03em]"
          >
            Training and nutrition
          </h2>
          <p className="mt-4 max-w-2xl text-[16px] leading-[1.7] text-ash">
            The screens you touch during a session and around a meal.
          </p>
        </Container>
        <div className="mt-12 px-5 sm:px-8">
          <div className="mx-auto max-w-[1440px]">
            <ScreenGallery items={screens.slice(0, 8)} />
          </div>
        </div>
      </section>

      <section
        aria-labelledby="screens-body-heading"
        className="cv-auto border-t border-hairline-soft py-20 sm:py-24"
      >
        <Container>
          <h2
            id="screens-body-heading"
            className="text-[clamp(1.6rem,3.4vw,2.2rem)] font-black tracking-[-0.03em]"
          >
            Body, data and settings
          </h2>
          <p className="mt-4 max-w-2xl text-[16px] leading-[1.7] text-ash">
            Everything that tracks the result rather than the session.
          </p>
        </Container>
        <div className="mt-12 px-5 sm:px-8">
          <div className="mx-auto max-w-[1440px]">
            <ScreenGallery items={screens.slice(8)} />
          </div>
        </div>
      </section>

      <DownloadCta />
    </>
  );
}
