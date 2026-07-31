/**
 * Single source of truth for every piece of site-wide identity: URLs, contact
 * details, store links and social handles.
 *
 * Nothing else in the codebase should hard-code a URL or an email address. If
 * a value can differ between preview and production it is read from an env
 * var here and nowhere else.
 */

/**
 * Canonical origin, without a trailing slash.
 *
 * Set `NEXT_PUBLIC_SITE_URL` in the deployment environment. On Vercel preview
 * deployments `VERCEL_URL` is used so that Open Graph images and canonical
 * links resolve to the preview host rather than production.
 */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_ENV === "preview" && process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "https://ignytfit.in")
).replace(/\/$/, "");

/**
 * The one switch that controls the home page's `<title>`.
 *
 * Google's OAuth verification compares the application name shown on the home
 * page against the name on the consent screen. Verification was rejected twice,
 * and `<title>` was the last surface that was not a literal match — every other
 * signal (application-name, og:site_name, the h1, JSON-LD `name`, the manifest)
 * already read exactly "IGNYT".
 *
 * So the title is the bare product name while verification is outstanding. That
 * costs search-result keywords; the meta description, the h1's subheading and
 * the JSON-LD description all still carry the full "complete fitness and
 * nutrition tracker" explanation, so the loss is smaller than it looks and is
 * not worth a third rejection.
 *
 * FLIP THIS TO `true` ONCE GOOGLE HAS APPROVED VERIFICATION. Nothing else needs
 * to change: `seoTitle` below reads from it, and it is the only place in the
 * codebase where the home page title is decided.
 */
export const oauthVerificationApproved = false;

export const site = {
  /** Always rendered exactly as "IGNYT". */
  name: "IGNYT",
  legalName: "IGNYT",
  domain: siteUrl.replace(/^https?:\/\//, ""),
  url: siteUrl,
  tagline: "Your complete fitness companion",
  description:
    "IGNYT is an offline-first Android fitness app for workout tracking, food logging, macros, fasting, hydration, supplements, weight and Health Connect — with your data stored on your device by default.",
  shortDescription:
    "Track workouts, nutrition, fasting, supplements, hydration, Health Connect and progress in one offline-first fitness app.",

  /**
   * Home-page SEO, kept apart from `description` because they answer different
   * questions. `description` is the product blurb reused across the site;
   * these two are written for a search result and for a Google OAuth reviewer
   * skimming the tab title, so they lead with the product category.
   */
  /* Driven entirely by `oauthVerificationApproved` above — see the note there
     for why this is the bare product name until Google approves. */
  seoTitle: oauthVerificationApproved
    ? "IGNYT – Complete Fitness & Nutrition Tracker"
    : "IGNYT",
  seoDescription:
    "IGNYT is a complete fitness and nutrition tracking application that helps users monitor workouts, calories, macros, hydration, fasting, body weight, progress, and Google Health Connect data.",
  /* Same reasoning as seoTitle: every surface that states a name now states
     exactly the name, and nothing else. The description carries the pitch. */
  ogTitle: "IGNYT",
  ogDescription:
    "Track workouts, nutrition, calories, hydration, fasting, progress, and Health Connect data with IGNYT.",

  /** One sentence answering "what is this". Google rejected verification for a
   *  home page that did not outline the application's purpose, so this is
   *  stated outright rather than implied by the feature list. */
  purpose:
    "IGNYT is an Android fitness and nutrition tracking application. It records your workouts, meals and body measurements, and — with your permission — synchronises supported health data through Google Health Connect, so your training and nutrition live in one place instead of five apps.",
  androidPackage: "com.varun.ignyt",
  locale: "en_US",
  themeColor: "#000000",

  /**
   * Release facts, mirrored from `android/app/build.gradle`. Update here when
   * the app ships — every page reads these rather than hard-coding a number.
   */
  app: {
    version: "1.0.40",
    versionCode: 9,
    /** minSdk 26. */
    minAndroid: "8.0",
    minAndroidName: "Oreo",
    /** compileSdk / targetSdk 36. */
    targetSdk: 36,
  },

  email: {
    support: "support@ignytfit.in",
    privacy: "support@ignytfit.in",
    business: "support@ignytfit.in",
  },

  links: {
    play: "https://play.google.com/store/apps/details?id=com.varun.ignyt",
    github: "https://github.com/varun642002/IGNYTfit",
    githubApp: "https://github.com/varun642002/Ignyt-testing-",
    instagram: "https://instagram.com/ignytfit",
    x: "https://x.com/ignytfit",
    linkedin: "https://www.linkedin.com/company/ignytfit",
  },

  /** Shared "last updated" stamp for the legal suite. */
  /* One stamp for the whole legal suite, so bumping it moves the date on every legal page,
     not only the one that changed. That is the trade this shares: the privacy policy's own
     text promises a new "last updated" whenever it changes, and a policy that changed
     silently is worse than a terms page whose date moved without its wording moving. */
  legalUpdated: "2026-08-01",
} as const;

/** Absolute URL helper — every canonical/OG/JSON-LD URL goes through this. */
export function absoluteUrl(path = "/"): string {
  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

/** Human-readable form of `site.legalUpdated`, e.g. "30 July 2026". */
export const legalUpdatedLabel = new Date(site.legalUpdated).toLocaleDateString(
  "en-GB",
  { day: "numeric", month: "long", year: "numeric" },
);
