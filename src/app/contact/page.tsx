import type { Metadata } from "next";
import {
  Briefcase,
  Bug,
  HelpCircle,
  Lightbulb,
  LifeBuoy,
  Mail,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import {
  GithubIcon,
  InstagramIcon,
  LinkedinIcon,
  XIcon,
} from "@/components/brand/SocialIcons";
import { ContactForm } from "@/components/contact/ContactForm";
import { breadcrumbSchema, faqSchema, JsonLd } from "@/components/seo/JsonLd";
import { Accordion } from "@/components/ui/Accordion";
import { Aurora } from "@/components/ui/Aurora";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal, RevealItem } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Surface } from "@/components/ui/Surface";
import { allFaqs, faqGroups } from "@/lib/faq";
import { createMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = createMetadata({
  title: "Contact",
  description:
    "Get in touch with the IGNYT team — support, technical issues, bug reports, feature requests, privacy requests and business enquiries — plus answers to the questions we are asked most.",
  path: "/contact",
  keywords: [
    "IGNYT support",
    "contact IGNYT",
    "IGNYT bug report",
    "fitness app support",
  ],
});

interface Channel {
  title: string;
  body: string;
  Icon: LucideIcon;
  subject: string;
  accent: string;
}

const CHANNELS: Channel[] = [
  {
    title: "Support",
    body: "Something is not working the way the app says it should. Include your device model and Android version.",
    Icon: LifeBuoy,
    subject: "Support request",
    accent: "text-flare",
  },
  {
    title: "General questions",
    body: "How a feature works, whether something is possible, or what is planned next.",
    Icon: HelpCircle,
    subject: "General question",
    accent: "text-arc-bright",
  },
  {
    title: "Technical issues",
    body: "Sync trouble, Health Connect permissions, notifications not firing, or import and export problems.",
    Icon: Wrench,
    subject: "Technical issue",
    accent: "text-cyan",
  },
  {
    title: "Bug reports",
    body: "A crash, a wrong number, or a screen that will not load. Steps to reproduce it help enormously.",
    Icon: Bug,
    subject: "Bug report",
    accent: "text-bad",
  },
  {
    title: "Feature requests",
    body: "Tell us what is missing from your training week. Requests genuinely shape the roadmap.",
    Icon: Lightbulb,
    subject: "Feature request",
    accent: "text-warn",
  },
  {
    title: "Business enquiries",
    body: "Partnerships, coaching tools, press, or anything commercial.",
    Icon: Briefcase,
    subject: "Business enquiry",
    accent: "text-good",
  },
];

const COMMUNITY = [
  {
    label: "GitHub",
    handle: "Source, issues and releases",
    href: site.links.github,
    Icon: GithubIcon,
  },
  {
    label: "Instagram",
    handle: "@ignytfit",
    href: site.links.instagram,
    Icon: InstagramIcon,
  },
  { label: "X", handle: "@ignytfit", href: site.links.x, Icon: XIcon },
  {
    label: "LinkedIn",
    handle: "IGNYT",
    href: site.links.linkedin,
    Icon: LinkedinIcon,
  },
];

export default function ContactPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Contact", path: "/contact" }])} />
      <JsonLd data={faqSchema(allFaqs)} />

      <PageHero
        eyebrow="Contact"
        title={
          <>
            Talk to the people who{" "}
            <span className="text-arc-gradient">build IGNYT</span>
          </>
        }
        lead="No ticket queue and no chatbot. Messages go to a real inbox, and we answer every one — usually within two working days."
      />

      {/*
        The form leads.

        It used to sit below six channel cards, which meant the one thing people
        come to this page to do was three screens down. Sections on a contact
        page should be ordered by what the visitor wants, not by what is easiest
        to lay out.

        Deliberately quiet: no spotlight, no tilt, no word reveal on the
        heading. This is a task, and a form that animates while you are filling
        it in is a form that feels slow.
      */}
      <Section id="form" className="relative scroll-mt-24">
        <Aurora tone="arc" className="opacity-40" drift={false} />

        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-16">
          <div>
            <Eyebrow tone="arc" className="mb-5">
              Send a message
            </Eyebrow>
            <h2
              id="form-heading"
              className="text-[clamp(2rem,4.4vw,3rem)] font-black leading-[1.06] tracking-[-0.035em]"
            >
              Write to us
            </h2>
            <p className="mt-5 max-w-xl text-[16.5px] leading-[1.72] text-ash">
              Required fields are marked. Nothing you send here is used for
              marketing, and we reply to everything.
            </p>

            <Reveal className="mt-10">
              <ContactForm />
            </Reveal>
          </div>

          <Reveal direction="left" className="lg:pt-14">
            <Surface className="h-full p-7">
              <h3 className="text-[17px] font-bold tracking-[-0.02em]">
                Before you write
              </h3>
              <ul className="mt-6 flex flex-col gap-5 text-[14px] leading-[1.65] text-ash">
                <li>
                  <span className="font-semibold text-chalk">
                    Reporting a bug?
                  </span>{" "}
                  Device model, Android version, and what you were doing when it
                  happened.
                </li>
                <li>
                  <span className="font-semibold text-chalk">
                    Data or deletion request?
                  </span>{" "}
                  Write from the Google account address you use with IGNYT so we
                  can verify it is you.
                </li>
                <li>
                  <span className="font-semibold text-chalk">
                    Health Connect issue?
                  </span>{" "}
                  Check the FAQ below first — nine times out of ten it is a
                  permission that was never granted.
                </li>
                <li>
                  <span className="font-semibold text-chalk">
                    Never send credentials.
                  </span>{" "}
                  We will never ask for your password or a recovery code.
                </li>
              </ul>

              <div className="mt-7 border-t border-hairline-soft pt-6">
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-ash-dim">
                  Or email directly
                </p>
                <a
                  href={`mailto:${site.email.support}`}
                  className="mt-3 inline-flex items-center gap-2 text-[15px] font-semibold text-arc transition-colors hover:text-arc-bright"
                >
                  <Mail aria-hidden className="size-4" />
                  {site.email.support}
                </a>
              </div>
            </Surface>
          </Reveal>
        </div>
      </Section>

      {/* -------------------------------------------------------- channels
          A ledger, not six cards. These are six variations on "email us with a
          useful subject line", and giving each one a full card implied six
          separate destinations. */}
      <Section
        id="channels"
        className="border-y border-hairline-soft bg-void-2 scroll-mt-24"
      >
        <SectionHeading
          id="channels"
          eyebrow="How can we help"
          title="Pick the closest fit"
          lead="It all reaches the same inbox — choosing a category just pre-fills the subject line so we can prioritise properly."
          className="mb-14"
        />

        <ul className="mx-auto grid max-w-4xl gap-px overflow-hidden rounded-card border border-hairline bg-hairline sm:grid-cols-2">
          {CHANNELS.map((channel, index) => (
            <RevealItem as="li" key={channel.title} index={index % 2}>
              <a
                href={`mailto:${site.email.support}?subject=${encodeURIComponent(
                  `[IGNYT] ${channel.subject}`,
                )}`}
                className="group flex h-full gap-4 bg-carbon p-6 transition-colors duration-300 hover:bg-carbon-2"
              >
                <channel.Icon
                  aria-hidden
                  className={`mt-0.5 size-5 shrink-0 transition-transform duration-300 ease-glide group-hover:scale-110 ${channel.accent}`}
                  strokeWidth={2.1}
                />
                <span className="min-w-0">
                  <span className="block text-[16px] font-bold tracking-[-0.02em] text-chalk">
                    {channel.title}
                  </span>
                  <span className="mt-2 block text-[14px] leading-[1.65] text-ash">
                    {channel.body}
                  </span>
                  <span className="mt-3 inline-block text-[13px] font-semibold text-arc opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                    Email about {channel.title.toLowerCase()}
                    <span className="sr-only"> — opens your mail client</span>
                  </span>
                </span>
              </a>
            </RevealItem>
          ))}
        </ul>
      </Section>

      {/* ------------------------------------------------------------- FAQ */}
      <Section id="faq" className="scroll-mt-24">
        <SectionHeading
          id="faq"
          eyebrow="FAQ"
          title="Answers to what we are asked most"
          lead="Grouped by topic. If your question is not here, the form above reaches a person."
          className="mb-14"
        />

        <div className="mx-auto max-w-3xl">
          {faqGroups.map((group) => (
            <div key={group.id} id={group.id} className="scroll-mt-32 pb-10">
              <h3 className="mb-4 text-[11px] font-bold uppercase tracking-[0.2em] text-arc">
                {group.label}
              </h3>
              <Accordion items={group.items} name={`faq-${group.id}`} />
            </div>
          ))}
        </div>
      </Section>

      {/* ------------------------------------------------------- community */}
      <Section
        id="community"
        className="border-t border-hairline-soft bg-void-2"
      >
        <SectionHeading
          id="community"
          eyebrow="Community"
          title="Find us elsewhere"
          className="mb-14"
        />

        <ul className="mx-auto grid max-w-4xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {COMMUNITY.map((item, index) => (
            <RevealItem as="li" key={item.label} index={index}>
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full flex-col items-center gap-3 rounded-card border border-hairline-soft bg-carbon p-7 text-center transition-[transform,border-color] duration-[400ms] ease-glide hover:-translate-y-1 hover:border-arc/45"
              >
                <span className="grid size-12 place-items-center rounded-panel border border-hairline bg-carbon-2 text-ash transition-[color,transform] duration-[400ms] ease-glide group-hover:scale-105 group-hover:text-chalk">
                  <item.Icon className="size-5" />
                </span>
                <span className="text-[16px] font-bold text-chalk">
                  {item.label}
                </span>
                <span className="text-[13px] text-ash-dim">{item.handle}</span>
              </a>
            </RevealItem>
          ))}
        </ul>
      </Section>
    </>
  );
}
