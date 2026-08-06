import type { CSSProperties, ReactNode } from "react";
import Link from "next/link";
import { CalendarClock, Mail } from "lucide-react";
import { Aurora } from "@/components/ui/Aurora";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Particles } from "@/components/ui/Particles";
import { ReadingProgress } from "@/components/ui/ReadingProgress";
import { Surface } from "@/components/ui/Surface";
import { legalRoutes } from "@/lib/routes";
import { legalUpdatedLabel, site } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * The legal suite's shared shell and prose primitives.
 *
 * Each document — privacy, terms, health data, deletion, cookies, disclaimer —
 * supplies a title, a summary and an array of sections. The heading hierarchy,
 * anchors, table of contents, "last updated" stamp and cross-links are all
 * generated here, so six documents cannot drift into six different layouts.
 *
 * The documents' own text is not this component's business. It lives in the
 * page files as data and is rendered verbatim; this file owns only how it looks.
 * That separation is why the entire site could be rebuilt without a single word
 * of the policies changing.
 *
 * Legal copy is set wider and looser than the marketing copy — 15px on a 1.8
 * line height at a comfortable measure. These are documents somebody may
 * genuinely have to read all the way through, so the priority is stamina
 * rather than impact.
 */

export interface LegalSectionSpec {
  /** Anchor id — also the table-of-contents target. */
  id: string;
  heading: string;
  body: ReactNode;
}

/* ------------------------------------------------------- prose primitives */

export function P({ children }: { children: ReactNode }) {
  return <p className="mt-4 text-[15px] leading-[1.8] text-ash">{children}</p>;
}

export function List({
  children,
  ordered = false,
}: {
  children: ReactNode;
  ordered?: boolean;
}) {
  const Tag = ordered ? "ol" : "ul";
  return (
    <Tag
      className={cn(
        "mt-4 flex flex-col gap-2.5 pl-5 text-[15px] leading-[1.72] text-ash",
        ordered ? "list-decimal" : "list-disc",
      )}
    >
      {children}
    </Tag>
  );
}

export function LI({ children }: { children: ReactNode }) {
  return <li className="marker:text-arc">{children}</li>;
}

export function Strong({ children }: { children: ReactNode }) {
  return <strong className="font-semibold text-chalk">{children}</strong>;
}

/** Callout for the points a reader must not miss. */
export function Note({
  children,
  tone = "arc",
}: {
  children: ReactNode;
  tone?: "arc" | "flare" | "warn";
}) {
  const tones = {
    arc: "border-arc/30 bg-arc/8",
    flare: "border-flare/30 bg-flare/8",
    warn: "border-warn/30 bg-warn/8",
  };
  return (
    <div
      className={cn(
        "mt-5 rounded-panel border p-5 text-[14.5px] leading-[1.7] text-ash",
        tones[tone],
      )}
    >
      {children}
    </div>
  );
}

/** Definition-style table used for "what we collect and why". */
export function DataTable({
  caption,
  rows,
}: {
  caption: string;
  rows: Array<[string, string, string]>;
}) {
  return (
    <div className="mt-5 overflow-x-auto rounded-panel border border-hairline">
      <table className="w-full min-w-[560px] border-collapse text-left text-[14px]">
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr className="bg-carbon-2">
            {["Data", "Why it is handled", "Where it lives"].map((header) => (
              <th
                key={header}
                scope="col"
                className="border-b border-hairline px-4 py-3 text-[11.5px] font-bold uppercase tracking-[0.14em] text-ash-dim"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map(([data, why, where]) => (
            <tr key={data} className="align-top">
              <th
                scope="row"
                className="border-b border-hairline-soft px-4 py-3 font-semibold text-chalk"
              >
                {data}
              </th>
              <td className="border-b border-hairline-soft px-4 py-3 text-ash">
                {why}
              </td>
              <td className="border-b border-hairline-soft px-4 py-3 text-ash">
                {where}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ----------------------------------------------------------- the document */

export function LegalPage({
  title,
  summary,
  sections,
  currentPath,
}: {
  title: string;
  summary: string;
  sections: LegalSectionSpec[];
  currentPath: string;
}) {
  return (
    <>
      {/* Fixed to the viewport, so it survives the navbar tucking itself away on the
          way down — which is what left these pages with no progress indicator for the
          entire time anyone was reading them. */}
      <ReadingProgress />
      <section
        aria-labelledby="legal-title"
        className="relative overflow-hidden border-b border-hairline-soft py-20 sm:py-24"
      >
        {/* The same ambient layer every other hero carries — drifting bloom and
            the ember field — so the legal suite does not read as a different
            website. Both are gated on the motion tier and render nothing at all
            below "full". */}
        <Aurora tone="arc" className="opacity-60" />
        <Particles
          className="pointer-events-none absolute inset-0 -z-10 size-full"
          count={24}
        />

        <Container>
          {/*
            The same staged entrance the other heroes use, so the legal suite
            opens like the rest of the site rather than appearing abruptly.

            It stops at the header. The document body below — the sections, the
            prose, the table of contents — is deliberately still: these are
            pages somebody may have to read carefully, and animating the text
            of a privacy policy would be pure friction.
          */}
          <div className="stage" style={{ "--d": 0 } as CSSProperties}>
            <Eyebrow tone="arc" live={false} className="mb-5">
              Legal
            </Eyebrow>
          </div>
          <h1
            id="legal-title"
            className="stage text-fade-down text-[clamp(2.1rem,5vw,3.4rem)] font-black leading-[1.06] tracking-[-0.035em]"
            style={{ "--d": 1 } as CSSProperties}
          >
            {title}
          </h1>
          <p
            className="stage mt-6 max-w-2xl text-[16.5px] leading-[1.72] text-ash"
            style={{ "--d": 2 } as CSSProperties}
          >
            {summary}
          </p>
          <p
            className="stage mt-7 inline-flex items-center gap-2 rounded-pill border border-hairline bg-carbon/70 px-4 py-2 text-[13px] text-ash-dim"
            style={{ "--d": 3 } as CSSProperties}
          >
            <CalendarClock aria-hidden className="size-4" />
            Last updated{" "}
            <time dateTime={site.legalUpdated}>{legalUpdatedLabel}</time>
          </p>
        </Container>
      </section>

      <Container className="py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[250px_minmax(0,1fr)] lg:gap-16">
          {/* Table of contents. Sticky on desktop, so a long document never
              loses the reader's place inside it. */}
          <nav
            aria-labelledby="legal-toc-heading"
            className="lg:sticky lg:top-[104px] lg:self-start"
          >
            <h2
              id="legal-toc-heading"
              className="text-[11px] font-bold uppercase tracking-[0.2em] text-ash-dim"
            >
              On this page
            </h2>
            <ol className="mt-5 flex flex-col gap-1">
              {sections.map((section, index) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className="flex gap-3 rounded-lg py-1.5 text-[13.5px] leading-snug text-ash transition-colors duration-300 hover:text-chalk"
                  >
                    <span className="tabular-nums text-ash-dim">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {section.heading}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <article className="max-w-3xl">
            {sections.map((section, index) => (
              /*
                Each section rises as it enters, on the same scroll timeline as
                every other list on the site, so the legal suite reads with the
                same rhythm as the rest.

                `.rise-item` moves and fades only — it can never leave text
                hidden — and the fade completes near the viewport edge, so no
                paragraph is ever parked at partial opacity where somebody might
                be trying to read it. That is the one property a legal document
                cannot compromise on.
              */
              <section
                key={section.id}
                id={section.id}
                aria-labelledby={`${section.id}-heading`}
                className="rise-item scroll-mt-32 border-b border-hairline-soft py-9 first:pt-0 last:border-b-0"
                style={{ "--i": Math.min(index, 3) } as CSSProperties}
              >
                <h2
                  id={`${section.id}-heading`}
                  className="flex items-baseline gap-3.5 text-[21px] font-bold tracking-[-0.025em] text-chalk sm:text-[23px]"
                >
                  <span className="text-[13px] font-black tabular-nums text-arc">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {section.heading}
                </h2>
                {section.body}
              </section>
            ))}

            <Surface className="mt-12 p-7">
              <h2 className="text-[18px] font-bold tracking-[-0.02em]">
                Questions about this?
              </h2>
              <p className="mt-2.5 text-[14.5px] leading-[1.7] text-ash">
                Email us and we will answer. For requests about your own data,
                include the Google account address you use with IGNYT.
              </p>
              <a
                href={`mailto:${site.email.privacy}`}
                className="mt-5 inline-flex items-center gap-2 text-[14.5px] font-semibold text-arc transition-colors hover:text-arc-bright"
              >
                <Mail aria-hidden className="size-4" />
                {site.email.privacy}
              </a>
            </Surface>

            <nav aria-label="Other legal documents" className="mt-10">
              <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-ash-dim">
                Related documents
              </h2>
              <ul className="mt-4 flex flex-wrap gap-2">
                {legalRoutes
                  .filter((route) => route.path !== currentPath)
                  .map((route) => (
                    <li key={route.path}>
                      <Link
                        href={route.path}
                        className="inline-flex rounded-pill border border-hairline bg-carbon/70 px-4 py-2 text-[13.5px] font-semibold text-ash transition-[color,border-color] duration-300 hover:border-arc/50 hover:text-chalk"
                      >
                        {route.label}
                      </Link>
                    </li>
                  ))}
              </ul>
            </nav>
          </article>
        </div>
      </Container>
    </>
  );
}
