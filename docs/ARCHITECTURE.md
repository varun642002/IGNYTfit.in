# Architecture

How IGNYTfit is put together, and the reasoning behind the decisions that are
not obvious from reading the code.

---

## Shape of the thing

A statically generated Next.js App Router site. Every route is prerendered at
build time — there is no database, no API layer, no request-time rendering and
no server state. What ships is HTML, CSS, a small JS bundle, and a handful of
icons.

That constraint is deliberate. A marketing and legal site has no reason to run
code per request, and making it impossible to do so removes an entire class of
production incident.

```
Build ──► 30 prerendered routes ──► CDN
                                     │
                            (no origin to fail)
```

---

## Folder structure

```
src/
  app/                      One directory per route (App Router)
    layout.tsx              Root shell: fonts, metadata, nav, footer, JSON-LD
    page.tsx                Home
    <route>/page.tsx        Each marketing / legal page
    blog/[slug]/page.tsx    Article pages, prerendered via generateStaticParams
    blog/rss.xml/route.ts   RSS feed, force-static
    robots.ts               → /robots.txt
    sitemap.ts              → /sitemap.xml
    manifest.ts             → /manifest.webmanifest
    opengraph-image.tsx     → /opengraph-image (generated at build)
    icon.svg, icon1.png,    Favicon set, picked up by the metadata API
      apple-icon.png
    not-found.tsx           404
    error.tsx               500 (route-level boundary)
    global-error.tsx        500 for failures in the root layout itself
    offline / maintenance   Standalone states, both noindex

  components/
    brand/                  Logo lockup, bolt mark, third-party social glyphs
    device/                 Phone frame + vector reproductions of the app UI
    home/                   Home page sections
    screenshots/            Carousel, gallery, lightbox
    blog/                   Article rendering and the filterable index
    contact/                Contact form
    legal/                  Legal document shell and prose primitives
    layout/                 Navbar, footer
    seo/                    JSON-LD helpers
    ui/                     Buttons, cards, sections, counters, accordion, reveals

  lib/
    site.ts                 URLs, email, store links, app version — one source
    routes.ts               Route registry (drives nav, footer, sitemap)
    features.ts             The sixteen product features
    screens.ts              Copy for the sixteen app screens
    blog.ts                 Article content as typed blocks
    faq.ts                  FAQ content, also feeds FAQPage structured data
    seo.ts                  createMetadata(): canonical, OG, Twitter, robots
    utils.ts                cn()
```

### Two rules that keep it from rotting

1. **No hard-coded URLs, email addresses or version numbers outside
   `lib/site.ts`.** When the app shipped 1.0.35 there was exactly one line to
   change; before that constant existed, three files disagreed.
2. **Adding a page means adding it to `lib/routes.ts`.** Navigation, the
   footer and the sitemap all read from that registry, so there is no second
   list to forget.

---

## Content as data, not markup

Features, app screens, FAQ entries and blog articles all live in `lib/` as
typed arrays, and components render them. This is why:

- **Copy edits do not touch layout code.** Changing a feature description is a
  one-line change in a data file.
- **The compiler enforces completeness.** `ScreenId` is a union; adding a new
  screen id is a build error until both its copy and its visuals exist.
- **Structured data cannot drift from the page.** The FAQ rendered on
  `/contact` and the `FAQPage` JSON-LD are generated from the same array, so
  they cannot disagree — which is exactly the kind of mismatch search consoles
  flag.

Blog articles are typed content blocks rather than MDX. For a dozen articles,
MDX would add a toolchain, a parser and a class of runtime failure in exchange
for authoring convenience we do not need. A malformed article here is a build
error.

---

## The device mockups

`components/device/` reproduces the IGNYT app UI as vectors and text — not as
screenshots.

- **Sharp everywhere.** They are DOM, so they render at the device's native
  resolution rather than at whatever a PNG was exported at.
- **Kilobytes, not megabytes.** Sixteen screens cost less than one phone-sized
  screenshot would.
- **They cannot go stale.** They are built from the same colour tokens as the
  app (`www/css/tokens.css` in the app repo), so a brand change propagates
  instead of requiring sixteen re-exports.

Sizing works through **container queries**, not a transform.

`PhoneShell` declares `container-type: inline-size` on the glass, and every
component inside a screen sizes in `cqw` — percentages of the phone's own
width. So the device is sized by ordinary CSS width, and its contents follow:

```tsx
<PhoneShell className="w-[250px] xl:w-[286px]">
  <AppScreen id="dashboard" />
</PhoneShell>
```

One set of screen components therefore renders the 320px hero device, the
250px device on `/download` and a 236px gallery card identically, with no
breakpoints, no JavaScript measurement and no variants.

This replaced a `transform: scale()` approach, which had a real defect: a
scaled element is laid out at full size and only *painted* smaller, so below
its design width the layout box spilled past the container and dragged the
document's scroll width with it — requiring an `overflow-hidden` clipper on
every instance to avoid horizontal scroll on mobile. Container queries have no
such gap between layout and paint, so the clipper is gone.

### The screens animate themselves

Rings, bars and line charts inside the mockups draw as they scroll into view,
driven by `animation-timeline: view()` in `globals.css` and parameterised
through custom properties (`--len`, `--gap`, `--to`). No screen is a client
component: sixteen animated app screens ship **zero JavaScript**.

---

## Animation

Four mechanisms, each used only where it is the cheapest thing that works.

| Mechanism | Used for | Cost |
| --- | --- | --- |
| Scroll-driven CSS (`animation-timeline: view()`) | All reveals, every chart in the mockups | Zero JS, compositor-run |
| CSS transitions | Hovers, the navbar capsule, the mobile sheet, beat switching | Zero JS |
| Framer Motion | Pointer-driven work: magnetic buttons, 3D tilt, screen transitions | Loaded on the routes that use it |
| GSAP ScrollTrigger | One scrubbed progress value for the storytelling scene | Dynamically imported, `full` tier only |

**Reveals are CSS, not Framer.** `components/ui/Reveal.tsx` is a *server*
component that emits a class name and nothing else. A `whileInView`
implementation pulls the animation runtime into the initial bundle of every
route that reveals anything, and server-renders everything below the fold at
`opacity: 0` — so content waits on hydration to become visible, and never
appears at all without scripting.

**Transform and opacity animate on separate ranges.** The opacity ramp
finishes at `entry 55%`, while the element is still near the viewport edge, so
nothing is ever parked at partial opacity where someone might try to read it.
Automated contrast audits flag mid-fade text, correctly.

### Motion tiers

`MotionProvider` publishes `full` / `lite` / `none` on `<html data-motion>`,
derived from `prefers-reduced-motion`, `deviceMemory`, `hardwareConcurrency`
and a two-second frame-rate sample taken after mount. It only ever demotes.

- `full` — Lenis smooth scroll, the particle field, parallax, the pinned scene.
- `lite` — reveals, hovers and counters. No continuous rAF work at all.
- `none` — nothing moves on its own.

Lenis and GSAP are both `import()`ed at runtime and are never fetched below
`full`, so a low-power phone downloads neither.

### Two behaviours worth knowing before editing

- **`AnimatePresence mode="wait"` doubles a transition's duration.** The
  incoming child does not mount until the outgoing one has finished leaving.
  In `PhoneScene`'s split layout that made the copy lag a third of a second
  behind the device, so the words described one screen while another was
  shown. It uses `popLayout`.
- **The pinned scene uses `position: sticky`, not ScrollTrigger pinning.**
  GSAP pinning injects a spacer and rewrites the pinned node's position, which
  is the usual source of layout jumps at a section boundary — especially under
  a smooth-scroll library. GSAP here only computes the scrub value.

---

## Styling

Tailwind v4 with a `@theme` block in `globals.css`. Colour tokens mirror the
Android client so the site and the product read as one brand.

**Do not hand-write vendor prefixes.** Lightning CSS, which Tailwind v4 runs,
collapses a standard + prefixed pair down to whichever form it believes the
build targets need — and with the prefixed declaration written last it will
discard the standard one. That shipped a navbar with no `backdrop-filter` in
Firefox. Declare the standard property; the build adds prefixes.

The palette is two accents and nothing else. `arc` (electric blue) carries
structure and interaction; `flare` (neon orange) is reserved for energy — the
bolt, records, streaks and the single primary action on a page. `good`, `warn`
and `bad` exist but only ever carry meaning, never decoration.

Every text colour clears WCAG AA against pure black as normal-size text. There
is no headroom on `#000000`, so re-measure before darkening any of them.

Two utilities carry non-obvious cost:

- `.cv-auto` (`content-visibility: auto`) lets the browser skip layout and
  paint for off-screen sections. Its `contain-intrinsic-size` should stay near
  a real section height — under-declaring it makes the page grow as you scroll
  and shortens the scroll thumb under the reader's cursor.
- `overflow-x: clip` on `html` is a safety net for the decorative bloom
  layers, which are deliberately wider than the viewport. `clip` rather than
  `hidden` so it does not become a scroll container and break `sticky` — which
  the storytelling scene depends on.

---

## Server and client boundary

Almost everything is a server component. Client components are the ones that
genuinely need state or events:

| Component | Why it is a client component |
| --- | --- |
| `MotionProvider` | Owns the motion tier and the Lenis instance |
| `Navbar` | Scroll state, mobile sheet, focus and scroll-lock management |
| `PageTransition` | Reads `usePathname` to key the route animation |
| `PhoneScene` | Slide index, autoplay timer, screen transitions |
| `Story` | GSAP scrub value and the active beat |
| `ScreenRail` | Arrow buttons and their disabled states |
| `Counter` | Animation frame loop |
| `Magnetic` / `Tilt` / `Spotlight` | Pointer position |
| `FloatingMetrics` | Live metric values |
| `ContactForm` | Form state and validation |
| `BlogIndex` | Category filtering |

`Reveal`, `Accordion` and every device screen are **server** components.
Reveals are pure CSS, the accordion is native `<details>`, and the screens are
static markup whose charts animate on a scroll timeline.

Where a client component needs rendered content — the showcase copy, the
storytelling devices, the gallery phones — it receives it as a `ReactNode`
**prop** rather than building it. That keeps the interactive shell on the
client and the content on the server. A render *function* cannot be used for
this: functions do not cross the server/client boundary.

---

## SEO

`lib/seo.ts` exposes one `createMetadata()` helper that every page calls. It
produces the canonical URL, Open Graph, Twitter card and robots directives
from a single input, which is why no page is missing a canonical tag — there
is no path through the code that produces metadata without one.

Structured data lives in `components/seo/JsonLd.tsx`:

| Schema | Where |
| --- | --- |
| `Organization` + `WebSite` | Root layout (every page) |
| `SoftwareApplication` | Home, Features, Download |
| `BreadcrumbList` | Every sub-page |
| `FAQPage` | Contact |
| `Blog` / `BlogPosting` | Blog index and articles |
| `WebPage` | Legal suite |

---

## Security

A strict CSP set in `next.config.ts`, with no third-party origins allowed at
all — the site loads no analytics, no tag manager, no CDN scripts and no
runtime fonts, so everything can be locked to `'self'`.

`'unsafe-inline'` is required on `script-src` for the Next.js bootstrap and
flight data. Using a nonce instead would force every response to be
dynamically rendered, trading full static generation for a marginal gain
against a site with no user input and no third-party script surface.
`'unsafe-eval'` is added in development only, where React needs it.
