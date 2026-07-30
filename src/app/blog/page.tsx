import type { Metadata } from "next";
import { Rss } from "lucide-react";
import { BlogIndex } from "@/components/blog/BlogIndex";
import { DownloadCta } from "@/components/home/DownloadCta";
import { breadcrumbSchema, JsonLd } from "@/components/seo/JsonLd";
import { Aurora } from "@/components/ui/Aurora";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { sortedPosts } from "@/lib/blog";
import { createMetadata } from "@/lib/seo";
import { absoluteUrl, site } from "@/lib/site";

export const metadata: Metadata = createMetadata({
  title: "Blog",
  description:
    "Practical, evidence-informed writing on training, nutrition, body composition, fasting, hydration and recovery from the team behind IGNYT.",
  path: "/blog",
  keywords: [
    "fitness blog",
    "nutrition articles",
    "training advice",
    "protein intake guide",
    "progressive overload",
  ],
});

/** `Blog` schema listing every published article. */
const blogSchema = {
  "@context": "https://schema.org",
  "@type": "Blog",
  "@id": absoluteUrl("/blog#blog"),
  name: `${site.name} Blog`,
  url: absoluteUrl("/blog"),
  description:
    "Practical, evidence-informed writing on training, nutrition and body composition.",
  publisher: { "@id": absoluteUrl("/#organization") },
  blogPost: sortedPosts.map((post) => ({
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.published,
    url: absoluteUrl(`/blog/${post.slug}`),
  })),
};

export default function BlogPage() {
  return (
    <>
      <JsonLd data={blogSchema} />
      <JsonLd data={breadcrumbSchema([{ name: "Blog", path: "/blog" }])} />

      <PageHero
        eyebrow="Blog"
        tone="flare"
        title={
          <>
            Training and nutrition,{" "}
            <span className="text-flare-gradient">without the mythology</span>
          </>
        }
        lead="Short, practical articles on the things people actually get stuck on — protein targets, progression, scale weight, fasting windows. No supplements to sell, no miracle protocols."
      />

      <section aria-label="Articles" className="relative py-20 sm:py-24">
        <Aurora tone="arc" className="opacity-40" drift={false} />

        <Container>
          <BlogIndex posts={sortedPosts} />

          <p className="mt-16 flex justify-center">
            <a
              href="/blog/rss.xml"
              className="inline-flex items-center gap-2.5 rounded-pill border border-hairline bg-carbon/70 px-5 py-3 text-[14px] font-semibold text-ash transition-[color,border-color,transform] duration-300 ease-glide hover:-translate-y-0.5 hover:border-arc/50 hover:text-chalk"
            >
              <Rss aria-hidden className="size-4" />
              Subscribe via RSS
            </a>
          </p>
        </Container>
      </section>

      <DownloadCta />
    </>
  );
}
