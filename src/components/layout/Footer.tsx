import { Mail } from "lucide-react";
import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import {
  GithubIcon,
  InstagramIcon,
  LinkedinIcon,
  XIcon,
} from "@/components/brand/SocialIcons";
import { Container } from "@/components/ui/Container";
import { PlayStoreButton } from "@/components/ui/PlayStoreButton";
import { Seam } from "@/components/ui/Aurora";
import { footerGroups } from "@/lib/routes";
import { site } from "@/lib/site";

const socials = [
  { href: site.links.github, label: "IGNYT on GitHub", Icon: GithubIcon },
  {
    href: site.links.instagram,
    label: "IGNYT on Instagram",
    Icon: InstagramIcon,
  },
  { href: site.links.x, label: "IGNYT on X", Icon: XIcon },
  { href: site.links.linkedin, label: "IGNYT on LinkedIn", Icon: LinkedinIcon },
];

/**
 * Site footer.
 *
 * The oversized wordmark across the bottom is the one piece of pure typography
 * on the site — clipped by the page edge, sitting at low opacity behind the
 * legal line. It gives the page a definite end, which a grid of links alone
 * never does.
 *
 * It is `aria-hidden` and rendered as a decorative span: the accessible brand
 * name is the real one in the lockup above it, and having a screen reader
 * announce "IGNYT" twice at the end of every page would be noise.
 *
 * Every link group is driven by the route registry, so adding a page in
 * `lib/routes.ts` puts it in the footer, the sitemap and the navigation at once
 * — there is no second list here to fall out of step.
 */
export function Footer() {
  return (
    <footer className="relative mt-auto overflow-hidden border-t border-hairline-soft bg-void-2">
      <Seam tone="arc" />

      <Container className="relative py-16 sm:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr_1fr]">
          <div>
            <Logo size={40} />
            <p className="mt-5 max-w-xs text-[14.5px] leading-[1.7] text-ash">
              {site.shortDescription}
            </p>
            <PlayStoreButton size="md" className="mt-6" />
          </div>

          {footerGroups.map((group) => {
            const id = `footer-${group.heading.toLowerCase()}`;
            return (
              <nav key={group.heading} aria-labelledby={id}>
                <h2
                  id={id}
                  className="text-[11px] font-bold uppercase tracking-[0.2em] text-ash-dim"
                >
                  {group.heading}
                </h2>
                <ul className="mt-5 flex flex-col gap-3">
                  {group.routes.map((route) => (
                    <li key={route.path}>
                      <Link
                        href={route.path}
                        className="inline-flex min-h-6 items-center text-[14.5px] text-ash transition-colors duration-300 hover:text-chalk"
                      >
                        {route.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            );
          })}

          <div>
            <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-ash-dim">
              Connect
            </h2>
            <a
              href={`mailto:${site.email.support}`}
              className="mt-5 inline-flex min-h-6 items-center gap-2 text-[14.5px] text-ash transition-colors duration-300 hover:text-chalk"
            >
              <Mail aria-hidden className="size-4" />
              {site.email.support}
            </a>
            <ul className="mt-6 flex flex-wrap items-center gap-2.5">
              {socials.map(({ href, label, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="grid size-10 place-items-center rounded-pill border border-hairline bg-carbon text-ash transition-[color,border-color,transform] duration-300 ease-glide hover:-translate-y-0.5 hover:border-arc/50 hover:text-chalk"
                  >
                    <Icon className="size-[18px]" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-hairline-soft pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[13px] text-ash-dim">
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p className="max-w-lg text-[13px] leading-relaxed text-ash-dim">
            IGNYT is not a medical device and does not provide medical advice.{" "}
            <Link
              href="/disclaimer"
              className="text-ash underline underline-offset-4 transition-colors hover:text-chalk"
            >
              Read the disclaimer
            </Link>
            .
          </p>
        </div>
      </Container>

      {/* Oversized wordmark. Clipped by the footer's own `overflow-hidden`.

          The glyphs live in a pseudo-element rather than a text node. At 3.5%
          opacity this is texture, not content — but as real text it read to
          contrast auditors as a 1.05:1 failure, which is the correct call for
          text and the wrong one for a watermark. Rendering identical; the
          element simply no longer claims to be something legible. */}
      <span
        aria-hidden
        className="pointer-events-none block select-none text-center font-black leading-[0.78] tracking-[-0.06em] text-chalk/[0.035] after:content-['IGNYT']"
        style={{ fontSize: "clamp(5rem, 21vw, 19rem)" }}
      />
    </footer>
  );
}
