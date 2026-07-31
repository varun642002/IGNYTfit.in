"use client";

import { useEffect } from "react";
import { RefreshCw, TriangleAlert } from "lucide-react";
import { Aurora } from "@/components/ui/Aurora";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

/**
 * Route-level error boundary — the 500 page.
 *
 * Renders inside the root layout, so the visitor keeps the header, the footer
 * and a way out. The error itself is logged rather than displayed: production
 * digests are opaque to a reader anyway, and raw messages can leak
 * implementation detail. The digest is shown, because that is the one string
 * worth quoting in a support email.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Unhandled route error:", error);
  }, [error]);

  return (
    <section className="relative flex min-h-[76vh] items-center overflow-hidden py-24">
      <Aurora tone="flare" drift={false} />

      <Container className="text-center">
        <span className="mx-auto grid size-16 place-items-center rounded-card border border-bad/30 bg-bad/10">
          <TriangleAlert aria-hidden className="size-7 text-bad" />
        </span>

        <h1 className="mt-9 text-[clamp(1.8rem,4.4vw,2.8rem)] font-black tracking-[-0.035em]">
          Something went wrong on our side
        </h1>
        <p className="mx-auto mt-5 max-w-lg text-[16.5px] leading-[1.7] text-ash">
          This one is on us, not on you. Try again — and if it keeps happening,
          tell us and we will fix it.
        </p>

        {error.digest ? (
          <p className="mt-6 inline-block rounded-pill border border-hairline bg-carbon px-4 py-2 font-mono text-[12.5px] text-ash-dim">
            Reference: {error.digest}
          </p>
        ) : null}

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button size="lg" onClick={reset}>
            <RefreshCw aria-hidden className="size-4" />
            Try again
          </Button>
          <ButtonLink href="/contact" variant="outline" size="lg">
            Report the problem
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
