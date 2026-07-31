"use client";

import { useEffect } from "react";

/**
 * Last-resort boundary for errors thrown by the root layout itself.
 *
 * It replaces the entire document, so it must render its own `<html>` and
 * `<body>` and cannot rely on the design system, the font or the global
 * stylesheet — any of which could be the thing that failed. Every style here is
 * inline on purpose, and the colour values are hard-coded rather than read from
 * tokens for exactly the same reason.
 *
 * Keep the values in step with globals.css by hand when the palette changes:
 *   #000000  --color-void
 *   #ffffff  --color-chalk
 *   #9d9fa8  --color-ash
 *   #ff6a1a  --color-flare
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Root layout error:", error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#000000",
          color: "#ffffff",
          fontFamily:
            "ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
          padding: "24px",
          textAlign: "center",
        }}
      >
        <main style={{ maxWidth: 480 }}>
          {/*
            Plain <img>, not next/image. This boundary replaces the root layout
            when the application itself has failed, so it must not depend on
            anything that might be what broke. The file is the same official
            logo master every other surface uses.
          */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo-official.png"
            width="56"
            height="56"
            alt=""
            style={{ borderRadius: 13 }}
          />
          <h1
            style={{
              fontSize: 30,
              fontWeight: 800,
              margin: "26px 0 0",
              letterSpacing: "-0.03em",
            }}
          >
            IGNYT could not load
          </h1>
          <p
            style={{
              color: "#9d9fa8",
              fontSize: 15,
              lineHeight: 1.65,
              margin: "14px 0 0",
            }}
          >
            An unexpected error stopped the page from rendering. Reloading
            usually fixes it.
          </p>
          {error.digest ? (
            <p
              style={{
                color: "#80828b",
                fontSize: 12.5,
                fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
                margin: "18px 0 0",
              }}
            >
              Reference: {error.digest}
            </p>
          ) : null}
          <button
            type="button"
            onClick={reset}
            style={{
              marginTop: 30,
              padding: "15px 26px",
              borderRadius: 999,
              border: "none",
              background: "#ff6a1a",
              color: "#200800",
              fontSize: 15,
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            Reload the page
          </button>
        </main>
      </body>
    </html>
  );
}
