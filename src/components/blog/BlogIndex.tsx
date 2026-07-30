"use client";

import { ArrowRight, Clock } from "lucide-react";
import Link from "next/link";
import { useMemo, useState, type CSSProperties } from "react";
import { Spotlight } from "@/components/ui/Spotlight";
import { Surface } from "@/components/ui/Surface";
import { formatPostDate, usedCategories, type Post } from "@/lib/blog";
import { cn } from "@/lib/utils";

/**
 * Article list with client-side category filtering.
 *
 * The full post list is rendered on the server and passed in, so the page is
 * fully indexable and readable before hydration — filtering only ever hides
 * what is already there, and never fetches.
 *
 * The lead article is given a wide card with its own accent edge. A blog index
 * where every entry is the same size tells the reader nothing about what to
 * read first, and this one is ordered by date for exactly that reason.
 */
export function BlogIndex({ posts }: { posts: Post[] }) {
  const [active, setActive] = useState<string>("All");

  const visible = useMemo(
    () => (active === "All" ? posts : posts.filter((p) => p.category === active)),
    [active, posts],
  );

  const filters = ["All", ...usedCategories];
  const [lead, ...rest] = visible;

  return (
    <>
      <div
        role="group"
        aria-label="Filter articles by category"
        className="no-scrollbar mask-fade-x -mx-5 flex gap-2 overflow-x-auto px-5 sm:mx-0 sm:flex-wrap sm:justify-center sm:px-0"
      >
        {filters.map((filter) => (
          <button
            key={filter}
            type="button"
            onClick={() => setActive(filter)}
            aria-pressed={active === filter}
            className={cn(
              "shrink-0 rounded-pill border px-4 py-2 text-[13.5px] font-semibold",
              "transition-[color,background-color,border-color] duration-300 ease-glide",
              active === filter
                ? "border-arc/45 bg-arc/12 text-chalk"
                : "border-hairline bg-carbon/60 text-ash hover:border-arc/35 hover:text-chalk",
            )}
          >
            {filter}
          </button>
        ))}
      </div>

      <p aria-live="polite" className="sr-only">
        {visible.length} article{visible.length === 1 ? "" : "s"} shown
      </p>

      {lead ? (
        <ul className="mt-12 grid list-none gap-5">
          {/* ------------------------------------------------------- lead */}
          <li className="rise-item" style={{ "--i": 0 } as CSSProperties}>
            <Spotlight tone="flare" className="rounded-card">
              <Surface lit="flare" interactive className="relative p-8 sm:p-10">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-pill border border-flare/35 bg-flare/12 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-flare">
                    {lead.category}
                  </span>
                  <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-ash-dim">
                    Latest
                  </span>
                </div>

                <h2 className="mt-5 max-w-3xl text-[clamp(1.6rem,3.6vw,2.5rem)] font-black leading-[1.1] tracking-[-0.035em]">
                  <Link
                    href={`/blog/${lead.slug}`}
                    className="transition-colors duration-300 hover:text-flare"
                  >
                    {lead.title}
                    <span className="absolute inset-0" aria-hidden />
                  </Link>
                </h2>

                <p className="mt-5 max-w-2xl text-[16px] leading-[1.72] text-ash">
                  {lead.description}
                </p>

                <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-[13px] text-ash-dim">
                  <time dateTime={lead.published}>
                    {formatPostDate(lead.published)}
                  </time>
                  <span className="inline-flex items-center gap-1.5">
                    <Clock aria-hidden className="size-3.5" />
                    {lead.readingMinutes} min read
                  </span>
                  <span className="inline-flex items-center gap-1.5 font-semibold text-flare">
                    Read the article
                    <ArrowRight aria-hidden className="size-3.5" />
                  </span>
                </div>
              </Surface>
            </Spotlight>
          </li>

          {/* ------------------------------------------------------ the rest */}
          {rest.length > 0 ? (
            <li>
              <ul className="grid list-none gap-5 md:grid-cols-2">
                {rest.map((post, index) => (
                  <li
                    key={post.slug}
                    className="rise-item h-full"
                    style={{ "--i": Math.min(index + 1, 8) } as CSSProperties}
                  >
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

                        <h2 className="mt-4 text-[20px] font-bold leading-snug tracking-[-0.025em]">
                          <Link
                            href={`/blog/${post.slug}`}
                            className="transition-colors duration-300 hover:text-arc-bright"
                          >
                            {post.title}
                            <span className="absolute inset-0" aria-hidden />
                          </Link>
                        </h2>

                        <p className="mt-3 text-[14.5px] leading-[1.68] text-ash">
                          {post.description}
                        </p>

                        <div className="mt-auto flex items-center justify-between pt-6">
                          <time
                            dateTime={post.published}
                            className="text-[13px] text-ash-dim"
                          >
                            {formatPostDate(post.published)}
                          </time>
                          <span className="inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-arc">
                            Read
                            <ArrowRight aria-hidden className="size-3.5" />
                          </span>
                        </div>
                      </Surface>
                    </Spotlight>
                  </li>
                ))}
              </ul>
            </li>
          ) : null}
        </ul>
      ) : (
        <p className="mt-12 text-center text-[15px] text-ash">
          Nothing published in that category yet.
        </p>
      )}
    </>
  );
}
