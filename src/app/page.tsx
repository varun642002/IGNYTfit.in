import type { Metadata } from "next";
import { AboutIgnyt } from "@/components/home/AboutIgnyt";
import { AppIdentity } from "@/components/home/AppIdentity";
import { AppPreview } from "@/components/home/AppPreview";
import { Comparison } from "@/components/home/Comparison";
import { CoreFeatures } from "@/components/home/CoreFeatures";
import { DownloadCta } from "@/components/home/DownloadCta";
import { FeatureGrid } from "@/components/home/FeatureGrid";
import { Hero } from "@/components/home/Hero";
import { HowItWorks } from "@/components/home/HowItWorks";
import { LovedFor } from "@/components/home/LovedFor";
import { Stats } from "@/components/home/Stats";
import { WhyChoose } from "@/components/home/WhyChoose";
import { appSchema, JsonLd } from "@/components/seo/JsonLd";
import { createMetadata } from "@/lib/seo";
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

export default function HomePage() {
  return (
    <>
      <JsonLd data={appSchema} />
      {/* Order is set by what a first-time reader — including a Google OAuth
          reviewer — needs, in the order they need it: what it is, that it is
          real, what it does, how it works, what it looks like, who it is for,
          and how to get it. Everything here is public; nothing is behind a
          sign-in. */}
      <Hero />
      <Stats />
      <CoreFeatures />
      <HowItWorks />
      <AppPreview />
      <FeatureGrid />
      <WhyChoose />
      <Comparison />
      <LovedFor />
      <AboutIgnyt />
      <DownloadCta />
      {/* Last on the page. The name and purpose as labelled facts — for a
          reviewer who needs to check them rather than read them, and for anyone
          looking for the support address or the policy links.

          It sat directly below the hero. Moving it down does not weaken the
          verification case: the purpose is already stated above the fold in the
          hero and in the meta description, and nothing in Google's homepage
          requirements asks for a particular position. It reads better here —
          a fact table is a footer-ish thing, and putting it between the hero
          and the first real section interrupted the page for every visitor who
          is not a reviewer. */}
      <AppIdentity />
    </>
  );
}
