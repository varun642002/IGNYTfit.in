import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Calculator,
  Clock,
  Download,
  FileJson,
  HeartPulse,
  LifeBuoy,
  ScrollText,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import { DownloadCta } from "@/components/home/DownloadCta";
import { breadcrumbSchema, JsonLd } from "@/components/seo/JsonLd";
import { Aurora } from "@/components/ui/Aurora";
import { ButtonLink } from "@/components/ui/Button";
import { PageHero } from "@/components/ui/PageHero";
import { RevealItem } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Spotlight } from "@/components/ui/Spotlight";
import { Surface } from "@/components/ui/Surface";
import { formatPostDate, sortedPosts } from "@/lib/blog";
import { createMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = createMetadata({
  title: "Resources",
  description:
    "Everything you need to get the most out of IGNYT: setup guides, how the calculations work, data export and portability, Health Connect help, and the policies that govern your data.",
  path: "/resources",
  keywords: [
    "IGNYT guides",
    "IGNYT help",
    "fitness app setup guide",
    "Health Connect setup",
    "export fitness data",
  ],
});

interface Resource {
  title: string;
  body: string;
  href: string;
  cta: string;
  Icon: LucideIcon;
}

const GUIDES: Resource[] = [
  {
    title: "Installation and setup",
    body: "Install from Google Play, set your profile and targets, and log your first workout — four steps, with the optional bits marked optional.",
    href: "/download#get-started",
    cta: "Read the setup guide",
    Icon: Download,
  },
  {
    title: "Connecting Health Connect",
    body: "Which of the 17 data types IGNYT reads, how partial permissions behave, and how to revoke access at any time.",
    href: "/health-data",
    cta: "Health Connect reference",
    Icon: HeartPulse,
  },
  {
    title: "Exporting your data",
    body: "Full JSON backup or CSV per data type, on demand. What each export contains and how to move to a new device.",
    href: "/data-deletion#delete-on-device",
    cta: "Export and portability",
    Icon: FileJson,
  },
  {
    title: "Troubleshooting",
    body: "Reminders not firing, Health Connect showing nothing, sync stuck — the fixes for the problems people actually hit.",
    href: "/contact#faq",
    cta: "Open the FAQ",
    Icon: LifeBuoy,
  },
];

const REFERENCE: Resource[] = [
  {
    title: "How targets are calculated",
    body: "Calorie and macro targets come from standard equations applied to your height, weight, age and activity level — and every one of them is editable.",
    href: "/features#macro-tracking",
    cta: "See the feature detail",
    Icon: Calculator,
  },
  {
    title: "The food database",
    body: "3,160 curated entries with per-100 g values, bundled with the app so search works offline. Custom foods and barcodes fill the gaps.",
    href: "/features#food-logging",
    cta: "How food logging works",
    Icon: BookOpen,
  },
  {
    title: "Privacy and data handling",
    body: "What is stored on your device, what is uploaded only if you opt in, and what is never collected at all.",
    href: "/privacy",
    cta: "Read the privacy policy",
    Icon: ShieldCheck,
  },
  {
    title: "All policies",
    body: "Privacy, terms, health data, data deletion, cookies and the medical, fitness, nutrition and supplement disclaimers.",
    href: "/terms",
    cta: "Browse the legal suite",
    Icon: ScrollText,
  },
];

/**
 * One directory entry.
 *
 * Numbered, because this page is an index and an index that does not number
 * itself gives the reader no sense of how much there is. The arrow is the only
 * thing that moves on hover — these are navigation, and navigation should feel
 * immediate rather than staged.
 */
function ResourceRow({
  item,
  index,
  tone,
}: {
  item: Resource;
  index: number;
  tone: "arc" | "flare";
}) {
  return (
    <RevealItem as="li" index={index % 2}>
      <Spotlight tone={tone} className="h-full rounded-card">
        <Surface interactive className="relative flex h-full flex-col p-7 sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <span
              className={
                tone === "flare"
                  ? "grid size-11 place-items-center rounded-panel border border-flare/30 bg-flare/12 text-flare"
                  : "grid size-11 place-items-center rounded-panel border border-arc/30 bg-arc/12 text-arc-bright"
              }
            >
              <item.Icon aria-hidden className="size-5" strokeWidth={2} />
            </span>
            <span className="text-[12px] font-black tabular-nums text-ash-dim">
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>

          <h3 className="mt-6 text-[18px] font-bold tracking-[-0.025em] text-chalk">
            <Link
              href={item.href}
              className="transition-colors duration-300 hover:text-chalk"
            >
              {item.title}
              <span className="absolute inset-0" aria-hidden />
            </Link>
          </h3>

          <p className="mt-3 text-[14.5px] leading-[1.7] text-ash">
            {item.body}
          </p>

          <span
            className={
              tone === "flare"
                ? "mt-6 inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-flare"
                : "mt-6 inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-arc"
            }
          >
            {item.cta}
            <ArrowUpRight
              aria-hidden
              className="size-3.5 transition-transform duration-300 ease-glide group-hover/spot:-translate-y-0.5 group-hover/spot:translate-x-0.5"
            />
          </span>
        </Surface>
      </Spotlight>
    </RevealItem>
  );
}

export default function ResourcesPage() {
  const latest = sortedPosts.slice(0, 3);

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([{ name: "Resources", path: "/resources" }])}
      />

      <PageHero
        eyebrow="Resources"
        title={
          <>
            Everything you need to{" "}
            <span className="text-arc-gradient">
              get set up and stay set up
            </span>
          </>
        }
        lead="Setup guides, how the numbers are calculated, how to get your data out, and the policies that govern all of it — in one place."
      >
        <ButtonLink href="/download" size="lg">
          Install IGNYT
        </ButtonLink>
        <ButtonLink href="/blog" variant="outline" size="lg">
          Read the blog
        </ButtonLink>
      </PageHero>

      <Section id="guides" className="relative">
        <Aurora tone="flare" className="opacity-50" />
        <SectionHeading
          id="guides"
          eyebrow="Guides"
          tone="flare"
          title="Getting started and getting unstuck"
          lead="Four walkthroughs covering install, permissions, export and the problems people actually run into."
          className="mb-14"
        />
        <ul className="grid gap-4 sm:grid-cols-2">
          {GUIDES.map((item, index) => (
            <ResourceRow
              key={item.title}
              item={item}
              index={index}
              tone="flare"
            />
          ))}
        </ul>
      </Section>

      <Section
        id="reference"
        className="border-y border-hairline-soft bg-void-2"
      >
        <SectionHeading
          id="reference"
          eyebrow="Reference"
          title="How IGNYT works under the hood"
          lead="Where the numbers come from, what is in the database, and what happens to your data."
          className="mb-14"
        />
        <ul className="grid gap-4 sm:grid-cols-2">
          {REFERENCE.map((item, index) => (
            <ResourceRow key={item.title} item={item} index={index} tone="arc" />
          ))}
        </ul>
      </Section>

      <Section id="reading" className="relative">
        <Aurora tone="arc" className="opacity-45" />
        <SectionHeading
          id="reading"
          eyebrow="Reading"
          title="Latest from the blog"
          lead="Practical writing on training and nutrition — no supplements to sell."
          className="mb-14"
        />

        <ul className="grid gap-4 md:grid-cols-3">
          {latest.map((post, index) => (
            <RevealItem as="li" key={post.slug} index={index}>
              <Spotlight tone="arc" className="h-full rounded-card">
                <Surface
                  interactive
                  className="relative flex h-full flex-col p-7"
                >
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="rounded-pill border border-hairline bg-carbon-2 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-ash">
                      {post.category}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-[12.5px] text-ash-dim">
                      <Clock aria-hidden className="size-3.5" />
                      {post.readingMinutes} min
                    </span>
                  </div>

                  <h3 className="mt-4 text-[18px] font-bold leading-snug tracking-[-0.025em]">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="transition-colors duration-300 hover:text-arc-bright"
                    >
                      {post.title}
                      <span className="absolute inset-0" aria-hidden />
                    </Link>
                  </h3>

                  <p className="mt-3 text-[14px] leading-[1.68] text-ash">
                    {post.description}
                  </p>

                  <time
                    dateTime={post.published}
                    className="mt-auto pt-6 text-[13px] text-ash-dim"
                  >
                    {formatPostDate(post.published)}
                  </time>
                </Surface>
              </Spotlight>
            </RevealItem>
          ))}
        </ul>

        <div className="mt-12 flex justify-center">
          <ButtonLink href="/blog" variant="outline">
            All articles
            <ArrowRight aria-hidden className="size-4" />
          </ButtonLink>
        </div>
      </Section>

      <Section
        id="support"
        className="border-t border-hairline-soft bg-void-2"
      >
        <SectionHeading
          id="support"
          eyebrow="Still stuck"
          title="Talk to a person"
          lead={`Messages reach a real inbox at ${site.email.support}, and we answer every one — usually within two working days.`}
          className="mb-12"
        />
        <div className="flex justify-center">
          <ButtonLink href="/contact" size="lg">
            Contact support
            <ArrowRight aria-hidden className="size-4" />
          </ButtonLink>
        </div>
      </Section>

      <DownloadCta />
    </>
  );
}
