import type { Metadata } from "next";
import { Clock, Wrench } from "lucide-react";
import { LogoMark } from "@/components/brand/Logo";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { createMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = createMetadata({
  title: "Scheduled maintenance",
  description: "IGNYT's website is briefly offline for scheduled maintenance.",
  path: "/maintenance",
  noIndex: true,
});

/**
 * Maintenance page.
 *
 * Kept out of the sitemap and marked `noindex`. To put the site behind it,
 * point traffic here at the edge (a Vercel rewrite or a proxy rule) — nothing
 * in the application needs to change, and the app itself keeps working
 * offline regardless.
 */
export default function MaintenancePage() {
  return (
    <section className="relative flex min-h-[75vh] items-center overflow-hidden py-24">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 -z-10 size-[680px] -translate-x-1/2 rounded-full blur-[110px]"
        style={{
          background:
            "radial-gradient(circle, rgba(62,130,247,0.18) 0%, rgba(0,0,0,0) 68%)",
        }}
      />

      <Container className="text-center">
        <LogoMark size={48} className="mx-auto size-12" />

        <span className="mt-8 inline-flex items-center gap-2 rounded-full border border-hairline bg-carbon/70 px-3.5 py-1.5 text-[12px] font-semibold text-ash">
          <Wrench aria-hidden className="size-3.5 text-arc-bright" />
          Scheduled maintenance
        </span>

        <h1 className="mt-6 text-[clamp(1.9rem,4.4vw,2.9rem)] font-black">
          We are making {site.name} better
        </h1>
        <p className="mx-auto mt-5 max-w-lg text-[16px] leading-relaxed text-ash">
          This website is briefly offline while we deploy an update. The IGNYT
          app on your phone is unaffected — it works offline and does not depend
          on this site.
        </p>

        <p className="mt-7 inline-flex items-center gap-2 text-[14px] text-ash-dim">
          <Clock aria-hidden className="size-4" />
          Normally back within a few minutes
        </p>

        <div className="mt-9 flex justify-center">
          <ButtonLink href={`mailto:${site.email.support}`} variant="outline">
            Contact support
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
