import type { Metadata } from "next";
import { PhoneShell } from "@/components/device/PhoneShell";
import { ShotScreen } from "@/components/device/ShotScreen";
import { AppIdentity } from "@/components/home/AppIdentity";
import { BuiltFor } from "@/components/home/BuiltFor";
import { DownloadCta } from "@/components/home/DownloadCta";
import { Features } from "@/components/home/Features";
import { Hero } from "@/components/home/Hero";
import { Showcase } from "@/components/home/Showcase";
import { Stats } from "@/components/home/Stats";
import { Story } from "@/components/home/Story";
import { WhyIgnyt } from "@/components/home/WhyIgnyt";
import { appSchema, JsonLd } from "@/components/seo/JsonLd";
import { createMetadata } from "@/lib/seo";
import { claim } from "@/lib/shots";
import { site } from "@/lib/site";

export const metadata: Metadata = createMetadata({
  title: site.seoTitle,
  description: site.seoDescription,
  socialTitle: site.ogTitle,
  socialDescription: site.ogDescription,
  path: "/",
  keywords: ["fitness tracker", "gym log app", "nutrition tracker Android"],
  absoluteTitle: true,
});

/**
 * The home page.
 *
 * The order is set by what a first-time reader — including a Google OAuth
 * reviewer — needs, in the order they need it:
 *
 *   Hero         what it is, what it does, who makes it, how to get it
 *   Showcase     the product itself, screen by screen
 *   Story        how it is used, told through the scroll
 *   Features     everything it tracks
 *   Screenshots  what the whole app looks like
 *   Why          the arguments, each one checkable
 *   Stats        the numbers behind those arguments
 *   Built for    who it is for, stated in situations
 *   Download     how to get it
 *   Identity     the same facts again, as a table a reviewer can check
 *
 * Everything here is public. Nothing on this page is behind a sign-in, which
 * is itself one of Google's homepage requirements.
 */
export default function HomePage() {
  return (
    <>
      <JsonLd data={appSchema} />

      <Hero />
      <Showcase />

      {/*
        One device per beat, in the same order as the beats inside <Story>:
        train, eat, measure, keep.

        These four screens also appear in the hero carousel. Reuse across
        surfaces is deliberate and sanctioned — there are fourteen distinct
        captures and more places than that which want a device. The alternative
        was an empty column or a drawn mockup, and both are worse. `claim`
        still guarantees no screen repeats WITHIN this scene.

        Rendered here, on the server, and handed to the scene as markup — so
        <Story> stays the section's only client component.
      */}
      <Story
        visuals={claim("home-story", [
          "workout",
          "food-log",
          /* The "measure" beat used the Log Weight screen. That capture has
             been removed; the Progress screen carries the body-weight chart
             too, so it takes the slot. */
          "progress",
          "tools",
        ]).map((id) => (
          <PhoneShell key={id} glow={false} notch={false}>
            <ShotScreen id={id} sizes="320px" />
          </PhoneShell>
        ))}
      />
      <Features />

      {/* The screenshot rail that used to sit here is gone. It rendered drawn
          mockups, and every real capture the home page can show is already
          spent on the hero and the product tour. /screenshots is the full
          catalogue, and the tour links to it. */}
      <WhyIgnyt />
      <Stats />
      <BuiltFor />
      <DownloadCta />

      {/*
        Last on the page: the name and purpose as labelled facts, for a reviewer
        who needs to check them rather than read them, and for anyone hunting
        for the support address or the policy links.

        It used to sit directly below the hero. Moving it down does not weaken
        the verification case — the purpose is already stated above the fold in
        the hero and in the meta description, and nothing in Google's homepage
        requirements asks for a particular position. It reads better here: a
        fact table is a footer-ish thing, and putting it between the hero and
        the first real section interrupted the page for every visitor who is
        not a reviewer.
      */}
      <AppIdentity />
    </>
  );
}
