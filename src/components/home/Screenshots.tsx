import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ScreenGallery } from "@/components/screenshots/ScreenGallery";
import { Aurora } from "@/components/ui/Aurora";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/Section";
import { featuredScreens, screens } from "@/lib/screens";

/**
 * The screenshot rail on the home page.
 *
 * Shows the seven headline screens; the full set of sixteen lives on
 * `/screenshots`. Deliberately not wrapped in <Section>, because the rail has
 * to bleed past the container's gutters — a gallery that stops at the text
 * margin reads as a boxed widget rather than as something continuing off the
 * edge of the page.
 */
export function Screenshots() {
  return (
    <section
      id="screenshots"
      aria-labelledby="screenshots-heading"
      className="cv-auto relative scroll-mt-24 py-24 sm:py-32 lg:py-40"
    >
      <Aurora tone="arc" className="opacity-50" />

      <Container>
        <SectionHeading
          id="screenshots"
          eyebrow="Every screen"
          title="See it before you install it"
          lead="No mock data dressed up as a product. These are the real screens, drawn from the same design tokens the app ships with."
          className="mb-16"
        />
      </Container>

      {/* Full-bleed rail with the container's gutter as padding, so the first
          card lines up with the heading above it while the rest run off-screen. */}
      <div className="px-5 sm:px-8">
        <div className="mx-auto max-w-[1440px]">
          <ScreenGallery items={featuredScreens} />
        </div>
      </div>

      <Container>
        <Reveal className="mt-4 text-center">
          <Link
            href="/screenshots"
            className="inline-flex items-center gap-2 text-[15px] font-semibold text-arc transition-colors hover:text-arc-bright"
          >
            See all {screens.length} screens
            <ArrowRight aria-hidden className="size-4" />
          </Link>
        </Reveal>
      </Container>
    </section>
  );
}
