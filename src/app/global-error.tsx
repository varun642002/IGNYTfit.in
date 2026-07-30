"use client";

import { useEffect } from "react";

/**
 * Last-resort boundary for errors thrown by the root layout itself.
 *
 * It replaces the entire document, so it must render its own `<html>` and
 * `<body>` and cannot rely on the design system, fonts or global stylesheet —
 * all styling here is inline on purpose.
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
          background: "#08090d",
          color: "#f7f4ef",
          fontFamily:
            "ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
          padding: "24px",
          textAlign: "center",
        }}
      >
        <main style={{ maxWidth: 480 }}>
          {/* Plain <img>, not next/image: global-error replaces the root layout
              when the app itself has failed, so it must not depend on anything
              that could be the thing that broke. The file is the same official
              logo master every other surface uses.
              eslint-disable-next-line @next/next/no-img-element */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo-official.png"
            width="52"
            height="52"
            alt=""
            style={{ borderRadius: 12 }}
          />
          <h1
            style={{
              fontSize: 28,
              fontWeight: 800,
              margin: "24px 0 0",
              letterSpacing: "-0.02em",
            }}
          >
            IGNYT could not load
          </h1>
          <p
            style={{
              color: "#aaa9b0",
              fontSize: 15,
              lineHeight: 1.6,
              margin: "14px 0 0",
            }}
          >
            An unexpected error stopped the page from rendering. Reloading
            usually fixes it.
          </p>
          <button
            type="button"
            onClick={reset}
            style={{
              marginTop: 28,
              padding: "14px 24px",
              borderRadius: 18,
              border: "none",
              background: "#ff5a1f",
              color: "#150500",
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
