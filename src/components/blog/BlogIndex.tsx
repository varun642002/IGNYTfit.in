"use client";

import { ArrowRight, Clock } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Badge, Card } from "@/components/ui/Card";
import { formatPostDate, usedCategories, type Post } from "@/lib/blog";
import { cn } from "@/lib/utils";

/**
 * Article list with client-side category filtering.
 *
 * The full post list is rendered on the server and passed in, so the page is
 * fully indexable and readable before hydration — filtering only ever hides
 * what is already there, it never fetches.
 */
export function BlogIndex({ posts }: { posts: Post[] }) {
  const [active, setActive] = useState<string>("All");

  const visible = useMemo(
    () =>
      active === "All" ? posts : posts.filter((p) => p.category === active),
    [active, posts],
  );

  const filters = ["All", ...usedCategories];

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
              "shrink-0 rounded-full border px-4 py-2 text-[13.5px] font-semibold transition-colors duration-200",
              active === filter
                ? "border-flare/45 bg-flare/12 text-flare"
                : "border-hairline bg-carbon/60 text-ash hover:border-hairline/80 hover:text-chalk",
            )}
          >
            {filter}
          </button>
        ))}
      </div>

      <p aria-live="polite" className="sr-only">
        {visible.length} article{visible.length === 1 ? "" : "s"} shown
      </p>

      <ul className="mt-12 grid list-none gap-5 md:grid-cols-2">
        {visible.map((post, index) => (
          <li
            key={post.slug}
            className="rise-item h-full"
            style={{ "--i": Math.min(index, 6) } as React.CSSProperties}
          >
            <Card interactive className="h-full p-7">
              <div className="flex flex-wrap items-center gap-3">
                <Badge tone="flare">{post.category}</Badge>
                <span className="flex items-center gap-1.5 text-[12.5px] text-ash-dim">
                  <Clock aria-hidden className="size-3.5" />
                  {post.readingMinutes} min read
                </span>
              </div>

              <h2 className="mt-4 text-[20px] font-bold leading-snug">
                <Link href={`/blog/${post.slug}`} className="hover:text-flare">
                  {post.title}
                  <span className="absolute inset-0" aria-hidden />
                </Link>
              </h2>

              <p className="mt-3 text-[14.5px] leading-relaxed text-ash">
                {post.description}
              </p>

              <div className="mt-6 flex items-center justify-between">
                <time
                  dateTime={post.published}
                  className="text-[13px] text-ash-dim"
                >
                  {formatPostDate(post.published)}
                </time>
                <span className="inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-flare">
                  Read
                  <ArrowRight aria-hidden className="size-3.5" />
                </span>
              </div>
            </Card>
          </li>
        ))}
      </ul>

      {visible.length === 0 ? (
        <p className="mt-12 text-center text-[15px] text-ash">
          Nothing published in that category yet.
        </p>
      ) : null}
    </>
  );
}
