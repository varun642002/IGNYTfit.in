import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import { JsonLd, organizationSchema } from "@/components/seo/JsonLd";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { PageTransition } from "@/components/layout/PageTransition";
import { MotionProvider } from "@/components/providers/MotionProvider";
import { site, siteUrl } from "@/lib/site";
import "./globals.css";

/**
 * One font, self-hosted by `next/font` at build time — no runtime request to
 * Google, no layout shift, and one less origin to allow in the CSP.
 *
 * Geist Mono was deliberately not added: `next/font` preloads every declared
 * face, so a second family would put ~30KB on the critical path to style a
 * version number and a package name. Those use the system monospace stack,
 * which costs nothing to fetch.
 */
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: site.seoTitle,
    // Every page supplies a bare title; the brand is appended here once.
    template: `%s · ${site.name}`,
  },
  description: site.seoDescription,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  category: "health",
  alternates: { canonical: "/" },
  manifest: "/manifest.webmanifest",
  openGraph: {
    type: "website",
    url: site.url,
    siteName: site.name,
    title: site.ogTitle,
    description: site.ogDescription,
    locale: site.locale,
  },
  twitter: {
    card: "summary_large_image",
    title: site.ogTitle,
    description: site.ogDescription,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  appleWebApp: {
    capable: true,
    title: site.name,
    statusBarStyle: "black-translucent",
  },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: site.themeColor,
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geistSans.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-void text-chalk">
        {/*
          No-JavaScript safety net.

          The scroll reveals are pure CSS and degrade to "visible" on their own,
          but the hero's staged entrance and the phone-scene transitions start
          from a hidden state. Without scripting those states are never cleared,
          so this restores them. When scripting is available the rule never
          applies, because it lives inside <noscript>.
        */}
        <noscript>
          <style>{`
            .stage,
            .page-enter,
            [style*="opacity:0"],
            [style*="opacity: 0"] {
              opacity: 1 !important;
              transform: none !important;
              filter: none !important;
              animation: none !important;
            }
          `}</style>
        </noscript>

        {/* First tab stop on every page. */}
        <a
          href="#main"
          className="sr-only left-4 top-4 z-[100] rounded-pill bg-flare px-5 py-2.5 text-[14px] font-bold text-[#200800] focus:not-sr-only focus:fixed"
        >
          Skip to main content
        </a>

        <JsonLd data={organizationSchema} />

        <MotionProvider>
          <Navbar />

          {/* Clears the fixed 64px header. */}
          <main id="main" className="flex-1 pt-[64px]">
            <PageTransition>{children}</PageTransition>
          </main>

          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
