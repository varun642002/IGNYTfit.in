import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Open Graph / Twitter card image, generated at build time.
 *
 * Inherited by every route (Next.js applies the root `opengraph-image` unless
 * a segment overrides it), which keeps one social preview for the whole site
 * instead of a static asset that drifts from the brand.
 *
 * Note: `next/og` uses Satori, which supports only a flex-based subset of CSS
 * — no `gap` shorthand on some versions, no grid, and every element that has
 * more than one child needs an explicit `display: flex`.
 *
 * The logo is the supplied master, read off disk and inlined as a data URI.
 * Satori cannot fetch a relative URL during a build, and the alternative —
 * redrawing the mark as inline paths, which is what this did before — is
 * exactly the second copy of the logo this project should not have.
 */
export default async function OpengraphImage() {
  const logo = await readFile(
    path.join(process.cwd(), "public", "logo-official.png"),
  );
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 76,
        background:
          "linear-gradient(135deg, #000000 0%, #0b0c0f 52%, #140a04 100%)",
        color: "#ffffff",
        fontFamily: "sans-serif",
        position: "relative",
      }}
    >
      {/* Flare bloom behind the mark */}
      <div
        style={{
          position: "absolute",
          top: -160,
          right: -120,
          width: 620,
          height: 620,
          borderRadius: 999,
          background:
            "radial-gradient(circle, rgba(255,106,26,0.40) 0%, rgba(255,106,26,0) 68%)",
          display: "flex",
        }}
      />
      {/* Arc bloom, bottom-left */}
      <div
        style={{
          position: "absolute",
          bottom: -220,
          left: -140,
          width: 640,
          height: 640,
          borderRadius: 999,
          background:
            "radial-gradient(circle, rgba(61,123,255,0.30) 0%, rgba(61,123,255,0) 68%)",
          display: "flex",
        }}
      />

      <div style={{ display: "flex", alignItems: "center" }}>
        <div
          style={{
            width: 96,
            height: 96,
            borderRadius: 26,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginRight: 26,
            overflow: "hidden",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logoSrc} width={96} height={96} alt="" />
        </div>
        <div
          style={{
            fontSize: 52,
            fontWeight: 900,
            letterSpacing: 12,
            display: "flex",
          }}
        >
          IGNYT
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            fontSize: 74,
            fontWeight: 800,
            lineHeight: 1.08,
            letterSpacing: -2,
            maxWidth: 940,
            display: "flex",
          }}
        >
          Transform your fitness journey
        </div>
        <div
          style={{
            fontSize: 31,
            color: "#9d9fa8",
            marginTop: 26,
            maxWidth: 900,
            lineHeight: 1.4,
            display: "flex",
          }}
        >
          Workouts, nutrition, fasting, supplements, hydration, Health Connect
          and progress — in one offline-first app.
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center" }}>
        <div
          style={{
            display: "flex",
            padding: "14px 26px",
            borderRadius: 999,
            background: "#ff6a1a",
            color: "#200800",
            fontSize: 27,
            fontWeight: 800,
            marginRight: 22,
          }}
        >
          Get it on Google Play
        </div>
        <div style={{ fontSize: 27, color: "#9d9fa8", display: "flex" }}>
          {site.domain}
        </div>
      </div>
    </div>,
    size,
  );
}
