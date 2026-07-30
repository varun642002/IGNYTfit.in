import type { Metadata } from "next";
import { ArrowLeft, Compass } from "lucide-react";
import { LogoMark } from "@/components/brand/Logo";
import { Aurora } from "@/components/ui/Aurora";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Magnetic } from "@/components/ui/Magnetic";
import { navRoutes } from "@/lib/routes";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Page not found",
  description: "The page you were looking for does not exist on IGNYT.",
  path: "/404",
  noIndex: true,
});

export default function NotFound() {
  return (
    <section className="relative flex min-h-[76vh] items-center overflow-hidden py-24">
      <Aurora tone="arc" />

      <Container className="text-center">
        <LogoMark size={60} className="mx-auto size-15" />

        {/*
          The numeral is real, visible text rather than a decorative shape, so
          it has to clear the 3:1 contrast floor for large text. It is set in
          the arc gradient, which is comfortably above that — do not drop it to
          a low-opacity white "watermark", which is the usual treatment and
          fails the check every time.
        */}
        <p className="text-arc-gradient mt-10 text-[clamp(5rem,17vw,11rem)] font-black leading-[0.85] tracking-[-0.06em]">
          404
        </p>

        <h1 className="mt-6 text-[clamp(1.7rem,4.2vw,2.7rem)] font-black tracking-[-0.035em]">
          This page never made it past warm-up
        </h1>
        <p className="mx-auto mt-5 max-w-lg text-[16.5px] leading-[1.7] text-ash">
          The link is broken or the page has moved. Here is the way back.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Magnetic>
            <ButtonLink href="/" size="lg">
              <ArrowLeft aria-hidden className="size-4" />
              Back to home
            </ButtonLink>
          </Magnetic>
          <Magnetic strength={0.18}>
            <ButtonLink href="/features" variant="outline" size="lg">
              <Compass aria-hidden className="size-4" />
              Browse features
            </ButtonLink>
          </Magnetic>
        </div>

        <nav aria-label="All pages" className="mt-14">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-ash-dim">
            Or go straight to
          </p>
          <ul className="mt-5 flex flex-wrap items-center justify-center gap-2">
            {navRoutes.map((route) => (
              <li key={route.path}>
                <ButtonLink href={route.path} variant="outline" size="sm">
                  {route.label}
                </ButtonLink>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </section>
  );
}
