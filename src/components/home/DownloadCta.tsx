import { ShieldCheck, Smartphone, WifiOff } from "lucide-react";
import { LogoMark } from "@/components/brand/Logo";
import { Aurora, Seam } from "@/components/ui/Aurora";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Magnetic } from "@/components/ui/Magnetic";
import { PlayStoreButton } from "@/components/ui/PlayStoreButton";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/lib/site";

/**
 * The closing call to action.
 *
 * The release status is stated plainly rather than being hidden behind an
 * enthusiastic button. IGNYT is not on Google Play yet, so a bare "Download
 * now" would be a promise the next tap cannot keep — and the same fact is
 * already stated in the Application details block, where a reviewer will
 * compare the two. They must not disagree.
 *
 * This is the last thing on the page, so it carries the brightest light on the
 * site: the bloom is at full strength and the mark sits directly in it.
 */
export function DownloadCta() {
  return (
    <section
      id="download"
      aria-labelledby="download-heading"
      className="cv-auto relative scroll-mt-24 overflow-hidden py-28 sm:py-36"
    >
      <Seam tone="flare" />
      <Aurora tone="mixed" />

      <Container>
        <Reveal className="mx-auto max-w-3xl text-center">
          <div className="flex justify-center">
            <div className="relative">
              <span
                aria-hidden
                data-decor="ambient"
                className="absolute inset-[-60%] animate-breathe rounded-pill blur-[52px]"
                style={{
                  background:
                    "radial-gradient(circle, rgba(255,106,26,0.34), transparent 70%)",
                }}
              />
              <LogoMark size={80} className="relative size-20" />
            </div>
          </div>

          <h2
            id="download-heading"
            className="text-fade-down mt-9 text-[clamp(2.4rem,6.2vw,4.25rem)] font-black leading-[1.02] tracking-[-0.045em]"
          >
            Download IGNYT
          </h2>

          <p className="mx-auto mt-6 max-w-xl text-[17px] leading-[1.72] text-ash">
            One free Android application for workouts, nutrition, calories,
            macros, hydration, fasting, body weight, progress and Google Health
            Connect. No account required to start, and nothing to pay.
          </p>

          <div className="mt-11 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Magnetic>
              <PlayStoreButton size="lg" />
            </Magnetic>
            <Magnetic strength={0.18}>
              <ButtonLink href="/download" size="lg" variant="outline">
                Release details
              </ButtonLink>
            </Magnetic>
          </div>

          {/* Same wording as the Application details block. If one changes, the
              other has to change with it. */}
          <p className="mt-7 inline-flex items-center gap-2 rounded-pill border border-flare/30 bg-flare/10 px-4 py-2 text-[13px] font-semibold text-flare">
            <span aria-hidden className="size-1.5 rounded-pill bg-flare" />
            Pending Google Play release
          </p>

          <ul className="mt-12 flex flex-wrap items-center justify-center gap-x-9 gap-y-4">
            {[
              { icon: Smartphone, label: `Android ${site.app.minAndroid} or later` },
              { icon: WifiOff, label: "Core features work offline" },
              { icon: ShieldCheck, label: "Cloud backup off by default" },
            ].map(({ icon: Icon, label }) => (
              <li
                key={label}
                className="inline-flex items-center gap-2.5 text-[14px] font-medium text-ash"
              >
                <Icon aria-hidden className="size-4 text-arc" strokeWidth={2.2} />
                {label}
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
