# andrearc.com — Redesign Implementation Spec

> Status: PLANNING ONLY. No code changes, no commits, no dependency installs.
> This document is the executable plan derived from the UX/UI audit (pass 1) and the design strategy (pass 2).
> An implementing agent should follow this without re-deciding design questions, unless a real technical limitation appears.

---

## 0. Repository facts this spec is grounded on

Verified by reading the code (not assumed):

- **Stack:** Next.js 16 (App Router), React 19, Tailwind 4, TypeScript. `frontend/package.json`.
- **Deploy:** static export to GitHub Pages. `next.config.ts`: `output: 'export'`, `images: { unoptimized: true }`, `reactCompiler: true`. `.nojekyll` + `.github/workflows/deploy.yml`. Strapi runs locally at build time only (`frontend/.env.production`: `STRAPI_URL=http://localhost:1337`).
- **Layout:** `frontend/src/app/layout.tsx` — `<body class="h-screen overflow-hidden grid grid-cols-12 gap-x-4 px-8 pt-8 pb-4">`, sidebar `col-span-3`, content `col-span-9`. No breakpoints anywhere (grep for `sm:/md:/lg:/@media` = 0 hits except one `md:flex-row!` in `article-client.tsx`).
- **Fonts:** `Geist`/`Geist_Mono` imported in `layout.tsx` but never applied; `globals.css` sets `font-family: Arial, Helvetica, sans-serif`.
- **Projects:** hardcoded in `frontend/src/app/projects/page.tsx` (4 items). No Strapi content-type for projects. Demos + repos are real URLs.
- **Articles:** Strapi demo seed data — Latin lorem ipsum bodies, generic titles ("This shrimp is awesome", "What's inside a Black Hole"), `siteName: "Strapi Blog"`. `backend/data/data.json`. NOT real content.
- **Article schema:** `backend/src/api/article/content-types/article/schema.json` — title, description (max 80), slug (uid), cover (media), author/category relations, `blocks` dynamiczone, stray `Motivation` field.
- **Contact:** `mailto: a.romeracosta@gmail.com` (space after `mailto:`) in `topbar.tsx` and `sidebar.tsx`.
- **Resume:** `resume/page.tsx` is a placeholder; nav "Resume" opens `/resume_andrea_romera_costa.pdf` (100KB, exists in `public/`).
- **Images:** `public/golden_core_preview.png` 2.8MB, `fitness_app_preview.png` 2.1MB, `portfolio_preview.png` 1.6MB, `azeriand_library_preview.png` 424KB. Served via plain `<img>`, unoptimized.
- **Design system:** `azeriand-library` (own component lib), used in `layout.tsx`. Root `package.json` depends on `azeriand-library@^1.17.6` (published + versioned). Its `dist/styles.css` contains Storybook-oriented globals: `body{margin:0;background-color:#1a1a1a;height:100vh;overflow:hidden}` and `:root{...background-color:#242424;color:#ffffffde}`.
- **console.log in prod paths:** `articles/page.tsx`, `articles/[slug]/page.tsx`, `articles/[slug]/article-client.tsx`.
- **Color tokens:** `globals.css` — `--background:#FFEFDC`, blue `#17a7ee`, purple `#9b8ce9`, orange `#f59e31`, red `#f54c4a`.

---

## 1. Guiding principle (do not violate)

Direction: *"A warm, editorial portfolio, clearly made by someone who not only uses components but designs and maintains her own system."*

Positioning: *"Frontend developer who designs and builds her own component system."*

Seniority is shown through decisions, context and results — never claimed with grandiose copy.

Preserve as identity: warm palette, section color-coding, card visual language, current hover lift, "Available for new projects" badge, sidebar (reduced, not removed), public demos/repos, `azeriand-library` as the strategic differentiator.

---

## 2. Locked decisions (do not re-debate)

- Hybrid architecture: one-page Home + dedicated pages for depth.
- Home order: Hero → Selected Work → Azeriand Library → About (brief) → Articles (secondary) → Contact → Footer.
- Routes: `/`, `/projects`, `/projects/[slug]`, `/articles`, `/articles/[slug]`, `/library`. Resume = direct PDF link (no placeholder route).
- Nav: desktop minimal sidebar; tablet compact top nav; mobile top bar + drawer.
- Hero = Direction C (technical/design-engineer), copy finalized in §10.
- Projects: no filters yet. Home = 1 featured + 2 secondary. `/projects` = full list. `/projects/[slug]` = compact case study.
- Case study: Header → Snapshot → Context → Challenge → Approach → Key decisions → Result/Learnings → Next. 250–400 words, KEY DECISIONS prioritized. Never invent metrics; mark `[CONTENT NEEDED]`.
- Library: Home section + own page; not a Storybook duplicate.
- Skills: no dominant 14-icon grid; reorganize into capabilities with tech as supporting evidence.
- Typography: apply Geist correctly first. No serif unless a concrete hierarchy reason emerges after seeing the result.
- Motion: max 5 patterns, always under `prefers-reduced-motion`. No parallax/shaders/scroll-hijacking/long or decorative effects.

---

## 3. P0 — Critical foundation

Goal: make the site structurally sound (responsive, scrollable, correct links, clean semantics/assets) WITHOUT redesigning the UI yet.

| ID | File | Component | Problem | Exact change | Expected behavior | Acceptance criteria | Risk | Deps |
|---|---|---|---|---|---|---|---|---|
| P0.1a | `src/app/layout.tsx` | RootLayout | `h-screen overflow-hidden` blocks natural scroll; fixed 12-col grid breaks mobile | Remove `h-screen overflow-hidden` from body; make the sidebar/content grid responsive (single column below a breakpoint, 12-col at desktop); keep warm padding | Page scrolls naturally; on narrow widths content stacks | No fixed viewport clipping; vertical scroll works at 360px width; no horizontal overflow | Med (touches global layout) | — |
| P0.1b | global CSS / `azeriand-library` import | styles cascade | Library `dist/styles.css` sets `body{height:100vh;overflow:hidden;background:#1a1a1a}` and dark `:root` — **HYPOTHESIS, must verify in runtime** whether it wins the cascade | Verify computed `body` styles in browser. If library globals leak, scope/override them in `globals.css` (re-assert warm background, `overflow` visible, height auto) | Warm background and natural scroll regardless of library import order | Verified in devtools: body bg = `#FFEFDC`, `overflow-y` not hidden | Med | P0.1a |
| P0.2 | `topbar.tsx`, `sidebar.tsx` | contact links | `'mailto: a.romeracosta@gmail.com'` has a space after `mailto:` | Change to `mailto:a.romeracosta@gmail.com` | Clicking opens mail client reliably | No space; link opens compose window | Trivial | — |
| P0.3 | `src/app/resume/` + `topbar.tsx`/`sidebar.tsx` | Resume | `/resume` is a placeholder route while nav opens the PDF | Delete the `/resume` route; keep a single Resume action = open `/resume_andrea_romera_costa.pdf` as `<a href target="_blank" rel="noopener noreferrer">` | Only one resume path exists; no dead route | Navigating `/resume` no longer serves placeholder text | Low | — |
| P0.4 | `articles/page.tsx`, `articles/[slug]/page.tsx`, `articles/[slug]/article-client.tsx` | data fetch | `console.log` in production code paths | Remove all `console.log` | Clean console in prod build | grep for `console.log` in `src/` = 0 | Trivial | — |
| P0.5 | `topbar.tsx` | external nav | Library/Resume use `onClick`+`window.open`; Projects/Articles use `<Link>` | Externals become `<a target="_blank" rel="noopener noreferrer">` with ↗ indicator; internals stay `<Link>` | Consistent, indexable, middle-click friendly nav | No `window.open` for nav; externals have `rel="noopener"` | Low | — |
| P0.6 | `projects/page.tsx`, `articles/*`, `homepage.tsx`, `article-client.tsx` | `<img>` | Images lack `alt`, and lack `width`/`height`/`aspect-ratio` (CLS risk) | Add descriptive `alt`; add `width`/`height` or a fixed `aspect-ratio` wrapper | No layout shift on image load; images have alt | Every `<img>` has non-empty `alt`; preview images reserve space | Low | — |
| P0.7 | `sidebar.tsx`, `layout.tsx`, all pages | semantics | Global `<h1>` lives in sidebar (present on every page); cards use `<p class="font-bold">` as titles; topbar is a `Card` not `<nav>` | Establish one `<h1>` per page (page-owned, not sidebar); wrap nav in `<nav>`; ensure `<main>` per page; card titles use real headings | Correct document outline | Each route has exactly one `<h1>`; `<nav>`/`<main>` present | Med | P0.1 |
| P0.8 | investigation | — | Identify any additional P1 blockers | Confirm: does removing `overflow-hidden` break the intended "app-shell" scroll of inner content? Confirm sidebar can reflow. Confirm library CSS scoping approach. | Documented findings before P1 | Short note added to this file under "P0 findings" | Low | P0.1, P0.1b |

Do NOT in P0: change palette, typography, hero, or component visuals. This phase is structural only.

---

## 4. P1 — Information architecture + hero

Goal: in 10 seconds a visitor understands who Andrea is and what she does.

### Navigation
- **Labels:** Work · About · Articles · Library ↗ · [Contact] (CTA).
- Internal = `<Link>`. External (Library Storybook, Resume PDF) = `<a target="_blank" rel="noopener noreferrer">` with ↗.
- Contact is a visually distinct CTA, present on all viewports.

### Sidebar (desktop) — minimal, identity-preserving
- Keep: small brand mark, name "Andrea Romera", role "Frontend Developer", "Available for new projects" badge, quick actions (Resume, Contact).
- **Remove from sidebar:** full-width `azeriand.png` logo (shrink to a small mark), the 14-icon tech grid.
- **Move to About:** the tech stack, regrouped by capability (§ Skills).

### Responsive behavior
- **Desktop (≥1024px):** minimal sidebar column + content column.
- **Tablet (640–1023px):** sidebar collapses into a compact top nav band (brand + name/role + Contact). Hero becomes single column.
- **Mobile (<640px):** top bar (mark + hamburger) + slide-in drawer containing nav, Contact, Resume, availability badge. Content is single column.

### Hero (Direction C)
Must contain: name, positioning headline, short supporting copy, availability, primary CTA, secondary CTA to Library, a real visual (not decoration). Copy finalized in §10. Anchor links from nav scroll to Home sections; dedicated pages for depth.

### CTA hierarchy
1. Primary: Explore the work (to Selected Work / `/projects`).
2. Secondary: See the library (`/library`).
3. Persistent: Contact.

### Wireframes

Desktop:
```
┌─────────────────────────────────────────────────────────────┐
│ [◆AR]      Work   About   Articles   Library↗      [Contact] │  nav, sticky, low weight, ~64px tall
├──────────────┬──────────────────────────────────────────────┤
│ SIDEBAR      │ HERO                                          │
│ ~24% width   │ h1 name                                       │
│ ◆ mark       │ positioning headline (largest text on page)  │
│ Andrea R.    │ supporting sentence                           │
│ Frontend Dev │ ● Available for new projects                  │
│ ● Available  │ [Explore the work]  [See the library↗]        │
│ [Resume][✉]  │        ┌───────────────────────────┐          │
│              │        │ real preview (component/    │  ~48% of hero │
│ spacing 32px │        │ featured project)           │          │
│ between blks │        └───────────────────────────┘          │
└──────────────┴──────────────────────────────────────────────┘
Reading order: name → headline → CTA → visual → sidebar identity
```

Tablet:
```
┌─────────────────────────────────────────────┐
│ ◆ Andrea Romera · Frontend Dev     [Contact] │  compact top band, ~56px
├─────────────────────────────────────────────┤
│ HERO (single column)                        │
│ h1 name                                     │
│ headline                                    │
│ supporting sentence                         │
│ ● Available                                 │
│ [Explore the work] [See the library↗]       │
│ ┌─────────────────────────────────────────┐ │
│ │ real preview                            │ │
│ └─────────────────────────────────────────┘ │
└─────────────────────────────────────────────┘
Spacing: 24px vertical rhythm. Reading order top→bottom.
```

Mobile:
```
┌───────────────────────────┐
│ ◆AR                  [☰]  │  top bar ~48px; tap target ≥44px
├───────────────────────────┤
│ HERO                      │
│ h1 name                   │
│ headline                  │
│ supporting sentence       │
│ ● Available               │
│ [Explore the work]        │  full-width buttons
│ [See the library↗]        │
│ ┌───────────────────────┐ │
│ │ preview (16:9)        │ │
│ └───────────────────────┘ │
└───────────────────────────┘
Drawer (☰): Work · About · Articles · Library↗ · Contact · Resume · ● Available
Spacing: 16px gutters, 20–24px block rhythm.
```

Do NOT in P1: restyle tokens/typography (that's P2), build case studies (P3).

---

## 5. P2 — Visual system (evolve, don't rebuild)

Reuse `globals.css` tokens + `azeriand-library`. Modify only what's listed.

### Typography
- Family: **Geist** for UI/body (already imported — just apply the CSS variable to `<body>` and remove Arial). `Geist_Mono` for code/inline tech.
- Scale (rem): Display 3.0 / H1 2.25 / H2 1.5 / H3 1.25 / Body 1.0 / Small 0.875 / Caption 0.75.
- Weights: 700 headings, 600 emphasis, 400 body.
- Line-height: 1.1 display, 1.2 headings, 1.6 body.
- No serif unless, after applying Geist, a concrete hierarchy need appears (document it then).

### Color (keep warm identity)
- Keep: `--background #FFEFDC`, blue `#17a7ee`, purple `#9b8ce9`, orange `#f59e31`, red `#f54c4a`.
- Add tokens: `--text-strong`, `--text-muted`, `--border`, `--surface`, `--focus`.
- **Contrast (must verify, HYPOTHESIS):** accent-on-light-surface pairs (`#17A7EE` on `#E0E4EE`; `#f59e31` on `#F5CF9F`) likely fail AA for small text. Measure each pair; if <4.5:1, darken the text token for that context (not the brand accent). Replace all `style={{color:'black'}}` inline uses with `--text-strong`.

### Spacing
- 4pt base scale: 4, 8, 12, 16, 24, 32, 48, 64. Replace magic values (`gap-x-14`, `[2rem]`, `min-h-[22.25rem]`).

### Radius
- Keep `rounded-xl` (0.75rem) as the base — it's part of the identity.

### Shadows
- Two levels: rest (subtle/none) and hover (existing `.card:hover` shadow). Tokenize.

### Buttons (consolidate in the library, remove inline color overrides)
- primary (filled accent), secondary (mate), ghost (text), icon-only (requires `aria-label`).

### Cards
- base, featured (hero/selected work), compact (article/related), interactive (hover lift + focus). Parameterized by color for section coding.

### Tags
- New reusable component replacing the hardcoded `'Design Library'` Badge; variant per category; used by articles and project stack.

### Links
- internal (text + focus-visible), external (↗ + `rel="noopener"`), hover (underline/emphasis), focus (visible ring).

Reuse vs modify:
- REUSE: color tokens, `rounded-xl`, `.card:hover` transition, `azeriand-library` Button/Card/Badge/Avatar primitives.
- MODIFY: remove Arial, add text/border/surface/focus tokens, replace inline colors and `!important`, replace hardcoded Badge with Tag.
- DO NOT rebuild the design system from scratch.

---

## 6. P3 — Content + case studies

### Content reality check (verified)
- **Projects** are real (hardcoded in `projects/page.tsx`) with real demos/repos. Best case-study candidates:
  1. **Golden·Core** — richest: live demo (`golden-core.andrearc.com/demo`), repo, largest stack (JS/React/Vite/Tailwind/Next/Vercel/Node/Postgres/Blob). Strongest story potential.
  2. **Azeriand Library** — strategic differentiator; demo (Storybook) + repo + published npm package. High signal for systems thinking.
  - (Fitness App and Portfolio remain simple cards for now.)
- **Articles** are Strapi demo seed data (Latin lorem ipsum, generic titles, `siteName: "Strapi Blog"`). NOT real content — see §8 strategy.

### Case study content (do not invent data)

**Golden·Core**
- Context: `[CONTENT NEEDED]` — what it is, who it's for. Reusable seed from card: "A premium event photography platform to share, discover, and relive memories in one private space."
- Challenge: `[CONTENT NEEDED]` — the real problem being solved (e.g. private galleries, scale of photos, access control?).
- Approach: `[CONTENT NEEDED]` — high-level how.
- Key decisions: `[CONTENT NEEDED]` — 2–3 real technical decisions + why (e.g. why Next+Vercel, why Blob storage, why Postgres, auth model). This is the highest-value block.
- Result: `[CONTENT NEEDED]` — do NOT invent metrics. If none exist, mark pending.
- Learnings: `[CONTENT NEEDED]`.
- Verifiable now: live demo URL, repo URL, stack (from the icons already listed).

**Azeriand Library**
- Context: reusable UI component library for consistent interfaces (from card).
- Challenge: `[CONTENT NEEDED]` — what inconsistency/pain motivated building it.
- Approach: `[CONTENT NEEDED]` — architecture (component API style, theming via color/intensity/appearance props observed in usage).
- Key decisions: partially inferable from real usage (`appearance`, `color`, `intensity`, `noPadding` prop patterns) — confirm with Andrea before stating.
- Result: verifiable — published npm package `azeriand-library@^1.17.6`, versioned, **used in production on this very site** (dogfooding).
- Learnings: `[CONTENT NEEDED]`.
- Verifiable now: Storybook URL, repo URL, npm version, in-production usage.

### Data model for future case studies (avoid hardcoding)
Add a Strapi `project` collection-type (mirrors article schema style):
```
project (collectionType)
  title: string
  slug: uid(targetField: title)
  tagline: string (max ~120)         // one-line for cards
  role: string                        // e.g. "Solo project"
  year: string | integer
  status: enum ["live","wip","archived"]
  featured: boolean                   // drives Home featured slot
  order: integer                      // manual sort
  cover: media (single)
  gallery: media (multiple, optional)
  demoUrl: string (optional)
  repoUrl: string (optional)
  stack: relation/tags or json string[] // tech list
  caseStudy (component, optional):
    context: text
    challenge: text
    approach: text
    keyDecisions: repeatable component { title, body }
    result: text (nullable → renders "coming soon" if empty)
    learnings: text
  seo (component): metaTitle, metaDescription, shareImage
```
Migration note: keep static export working — Strapi is build-time only, so `generateStaticParams` reads `project` like it reads `article`. Until the model exists, projects stay hardcoded; do not block P0–P2 on this.

Do NOT in P3: convert Fitness/Portfolio into full case studies; invent results/metrics.

---

## 7. P4 — Azeriand Library page (`/library`)

Portfolio piece, not Storybook docs. Answer, in order:
1. What it is — one-liner.
2. Why I built it — the consistency problem across my projects. `[CONTENT NEEDED]` for the personal reason.
3. What it solves — reusable, themeable UI primitives.
4. How it's designed — component API pattern (`appearance` / `color` / `intensity` / `noPadding`), observed in real usage; confirm before publishing claims.
5. How it's used — 2–3 representative components shown live/as images, not the full catalog.
6. How it shows systems thinking — versioned + published npm package, consumed by this site (dogfooding).
7. Where to see it — Storybook ↗.
8. Repo — GitHub ↗.

Data sources:
- Verifiable from repo: package name/version (`azeriand-library@^1.17.6`), in-production usage, Storybook/repo URLs.
- Manual: motivation, design rationale, roadmap → `[CONTENT NEEDED]`.

Do NOT: paste Storybook, list every component, duplicate prop tables.

---

## 8. Articles strategy (decision)

The current articles are Strapi demo data (lorem ipsum). Options and decision:
- **Decision:** Keep the Articles feature and infrastructure (it works and demonstrates content modeling + rendering), but **do NOT surface demo lorem-ipsum articles publicly**. Until Andrea writes ≥1 real article:
  - Home "Articles" section renders only if real (non-seed) articles exist; otherwise it is hidden (no empty/lorem state shown to recruiters).
  - Replace the hardcoded `'Design Library'` badge with the real Strapi `category` relation.
- Lower visual weight than Projects. Rename to "Writing/Notes" if cadence is low.
- `[CONTENT NEEDED]`: at least one real article, and cleanup/replacement of the seed dataset in `backend/data/data.json`.

---

## 9. Skills strategy

From "I know these technologies" to "this is how I use technology."
- Remove the 14-icon grid as a dominant, omnipresent element.
- In About, group as capabilities with a short contextual sentence each, tech as supporting evidence:
  - **Build UIs:** React, Next.js, TypeScript, Tailwind.
  - **Systematize:** own component library (azeriand-library), Storybook.
  - **Ship:** Vercel, GitHub Pages, Vite.
  - **Backend/data when needed:** Node, Strapi, Postgres, Blob storage.
- Keep icons as small supporting visuals WITH `aria-label`, not a wall.

---

## 10. Copy strategy

### Language decision
Analyzed: `lang="en"` in HTML, English UI/copy, recruiter/LinkedIn reach, but Andrea is ES. **Decision: A) English** as the single primary language. Rationale: widest recruiter reach, current content is already English, avoids i18n complexity in a static export. Do NOT implement translation now. (Revisit bilingual only if targeting ES-only market.)

Tone: first person, technical-but-human, short sentences, zero corporate filler, zero "crafting digital experiences".

### Proposed copy (draft — confirm before shipping)
- **Hero headline:** "I design my own component system and build products with it."
- **Hero supporting:** "I'm Andrea, a frontend developer focused on design systems. This site — projects, writing, UI — runs on my own library, azeriand-library."
- **Availability:** "Available for new projects" (keep).
- **Primary CTA:** "Explore the work" · **Secondary CTA:** "See the library ↗"
- **About (brief, ~120–160 words):** `[CONTENT NEEDED]` for personal specifics — draft skeleton: who (frontend dev who builds her own tools) / how (systems thinking, detail, consistency) / what interests me (reusable systems, DX, coherent UI) / what differentiates me (own design system in production).
- **Project card descriptions:** reuse existing one-liners; they're fine as taglines. Add role + status.
- **Library intro:** "I built and maintain my own component system so my projects stay consistent — and this site uses it in production."
- **Contact:** "Want to talk? Reach out for questions or just a friendly chat." (reuse existing sidebar copy, fix email).

Generic copy to remove/rewrite: empty bio `<p>`, hardcoded 'Design Library' badge, resume placeholder text, `siteName "Strapi Blog"`.

---

## 11. SEO / metadata

Per page (via App Router `metadata`):
- **Home:** title "Andrea Romera — Frontend Developer & Design Systems"; description = positioning; OG image = a real preview.
- **/projects:** "Work — Andrea Romera"; description of the project set.
- **/projects/[slug]:** per-project title/description from the model; OG = project cover.
- **/articles + [slug]:** per-article from Strapi (once real).
- **/library:** "Azeriand Library — my component system".
- Add: `metadataBase`, canonical URLs, one `<h1>` per page (aligns with P0.7), `lang="en"`.
- Static export friendly: generate `sitemap.xml` + `robots.txt` (a `robots.txt` already exists in `backend/public`; frontend needs its own).
- Structured data: only `Person` JSON-LD on Home (real value for recruiters). Skip the rest.
- No ornamental SEO.

---

## 12. Implementation order (small, reversible commits)

| Step | Objective | Modify | New | Deps | Risk | Effort | Acceptance | Don't touch yet |
|---|---|---|---|---|---|---|---|---|
| P0.1 Layout foundation | Scroll + responsive shell | `layout.tsx`, `globals.css` | — | — | Med | M | Scroll works, no h-overflow @360px | visuals, hero |
| P0.2 Contact fixes | Fix mailto | `topbar.tsx`, `sidebar.tsx` | — | — | Triv | S | mailto opens client | — |
| P0.3 Resume cleanup | Remove dead route | `topbar.tsx`, `sidebar.tsx`, del `resume/` | — | — | Low | S | one resume path | — |
| P0.4 Console cleanup | Remove logs | 3 article files | — | — | Triv | S | 0 console.log | — |
| P0.5 Nav consistency | Unify links | `topbar.tsx` | — | — | Low | S | externals `<a rel>` | — |
| P0.6 Asset foundation | alt + dimensions | project/article/home imgs | — | — | Low | M | no CLS, alt present | formats (P6) |
| P0.7 Semantic cleanup | outline/landmarks | pages, `sidebar.tsx` | — | P0.1 | Med | M | 1 h1/page, nav/main | — |
| P0.8 Verify library CSS | confirm cascade | investigate | — | P0.1 | Low | S | findings noted | — |
| P1.1 Navigation | new labels/CTA | `topbar.tsx` | `nav` cmp | P0 | Med | M | Work/About/Articles/Library/Contact | — |
| P1.2 Sidebar minimal | slim identity | `sidebar.tsx` | — | P1.1 | Med | M | no 14-grid, mark small | — |
| P1.3 Mobile drawer | responsive nav | `topbar/sidebar` | `drawer` cmp | P1.1 | Med | M | drawer opens/traps focus/Esc | — |
| P1.4 Hero | positioning | `homepage.tsx` | `hero` cmp | P1.1–3 | Med | M | 10s clarity, 2 CTAs, visual | tokens |
| P2.1 Typography | apply Geist | `layout.tsx`, `globals.css` | — | P1 | Low | S | Geist rendered, no Arial | — |
| P2.2 Color tokens | text/border/etc + AA | `globals.css`, cmps | — | P2.1 | Med | M | no inline color, AA pass | — |
| P2.3 Components | buttons/cards/tags/links | library + cmps | `Tag` | P2.2 | Med | M | tag replaces badge | — |
| P3.1 Project model | schema | — | Strapi `project` type | P2 | Med | M | builds statically | Fitness/Portfolio CS |
| P3.2 Case study tpl | reusable page | `projects/[slug]` | case-study cmps | P3.1 | Med | L | 2 studies render | invented data |
| P4.1 Library page | `/library` | — | `library/page.tsx` | P2 | Low | M | answers 8 Qs | Storybook dump |
| P5.x Accessibility | pass checklist | many | — | P1–P4 | Low | M | see §13 | — |
| P6.x Performance | images/fonts | assets, config | — | P0.6 | Low | M | see §14 | — |

Order minimizes regressions: structure → IA/hero → visual tokens → content → library → a11y/perf hardening.

---

## 13. P5 — Accessibility checklist

| Item | Component affected | Expected behavior | Acceptance |
|---|---|---|---|
| Semantic headings | all pages, cards | logical h1→h2→h3, cards use headings not `<p>` | axe: no heading-order errors |
| Single H1 | each route | one page-owned h1 | exactly 1 `<h1>` per page |
| nav / main / footer | layout, pages | real landmarks | present + unique |
| Skip link | layout | "Skip to content" to `<main>` | visible on focus, works |
| Keyboard nav | nav, cards, CTAs, drawer | tab order logical, all reachable | no keyboard trap (except intended drawer) |
| focus-visible | buttons/links/cards | clear visible ring (replace faint `.card.click:focus`) | ring visible on tab |
| Icon-only buttons | sidebar, topbar, social | have `aria-label` | every icon button labeled |
| alt text | all images | descriptive alt | no empty/generic alt |
| External links | nav, project links | `rel="noopener noreferrer"`, ↗ announced | present |
| Touch targets | social/stack/nav mobile | ≥44×44px | measured ≥44px |
| Drawer | mobile drawer | focus trap while open, returns focus on close | verified |
| Escape | drawer | closes drawer | Esc closes |
| Reduced motion | motion patterns | disable reveal/compaction, keep essential feedback | honors `prefers-reduced-motion` |
| Contrast | text tokens | AA (4.5:1 text) | measured per pair |

---

## 14. P6 — Performance

Distinguish demonstrated vs hypothesis:

- **DEMONSTRATED problems:**
  - Oversized PNGs (2.8/2.1/1.6MB) served unoptimized via `<img>` (`du` + `next.config`). Fix: convert to WebP/AVIF, resize to render size, add `width/height`/`aspect-ratio`, `loading="lazy"` + `decoding="async"` for below-the-fold. `output:'export'` means do it manually or in `scripts/download-strapi-images.js`.
  - Geist loaded but unused / Arial applied (fonts). Fix: apply Geist, ensure `font-display: swap`, drop unused weights.
  - Missing image dimensions → CLS risk. Fix in P0.6.
- **HYPOTHESIS — must measure Web Vitals (Lighthouse/field):**
  - LCP is currently the 2.8MB hero preview (likely, not measured). Verify after image optimization.
  - CLS magnitude (predicted from missing dimensions, not measured).
  - Bundle/CSS size impact — measure after P2; only act if a real regression shows.
- Third-party: none significant beyond fonts. Keep it that way.
- Constraint: keep the site fast — no autoplay video hero, no full-screen blur/backdrop-filter, no shaders; animate only transform/opacity.

---

## 15. Definition of Done (global)

- **UX:** who-she-is clear in <10s; Contact CTA obvious everywhere; Work reachable in ≤1 interaction; Library clearly differentiated.
- **Responsive:** works on mobile/tablet/desktop; no horizontal overflow; natural scroll.
- **Accessibility:** keyboard operable; visible focus; correct semantics/landmarks; AA contrast; reduced-motion honored.
- **Performance:** images optimized + dimensioned; LCP reasonable (measured post-optimization); no needlessly heavy assets.
- **Code quality:** no inline color hacks; no needless `!important`; no `console.log`; reusable components; no avoidable duplication.
- **Visual:** warm identity preserved; sidebar recognizable; section color-coding intact; card language intact; Library reads as the differentiator.

---

## 16. Final decision table

| Element | KEEP | MODIFY | REMOVE | ADD |
|---|---|---|---|---|
| Warm palette `#FFEFDC` + accents | ✅ | | | |
| Section color-coding | ✅ (formalize) | ✅ | | |
| Card language + hover lift | ✅ | | | |
| "Available" badge | ✅ | (reposition) | | |
| Public demos/repos | ✅ | | | |
| azeriand-library as differentiator | ✅ | | | ✅ `/library` page + Home section |
| Sidebar | | ✅ (minimal, responsive) | | |
| Full-width sidebar logo | | ✅ (shrink to mark) | | |
| 14-icon tech grid | | ✅ (regroup in About) | ✅ (from sidebar) | |
| Typography (Arial) | | ✅ (Geist) | | |
| Inline `style={{color}}` + `!important` | | | ✅ | ✅ text tokens |
| Nav (mixed Link/window.open) | | ✅ (unify) | | ✅ drawer, Contact CTA |
| Hero | | | | ✅ (Direction C) |
| About section | | | | ✅ |
| Project case studies | | ✅ (2 first) | | ✅ `/projects/[slug]`, Strapi `project` model |
| Articles | ✅ (infra) | ✅ (real tags, lower weight) | ✅ (public lorem-ipsum) | ✅ real content `[CONTENT NEEDED]` |
| `/resume` placeholder | | | ✅ | ✅ single PDF link |
| Hardcoded 'Design Library' badge | | | ✅ | ✅ Tag component |
| `console.log` in prod | | | ✅ | |
| Motion | | ✅ (5 patterns) | | ✅ reduced-motion |
| SEO/metadata | | ✅ | | ✅ per-page + sitemap/robots |

## What I would NOT do
1. Not turn it into dark mode — the warm palette is the identity.
2. Not remove the sidebar entirely — slim it, keep it as the signature.
3. Not add project filters yet — only 4 projects; it's friction (Hick's).
4. Not fill the home with animations — max 5 motion patterns.
5. Not introduce a serif purely for aesthetics — only for a real hierarchy reason.
6. Not turn `/library` into a Storybook duplicate — it's a portfolio piece.
7. Not invent metrics or results for case studies — mark `[CONTENT NEEDED]`.
8. Not build a contact form — static export; `mailto:` + links are enough.
9. Not overload the hero — one headline, one supporting line, two CTAs, one visual.
10. Not rebuild azeriand-library from scratch — reuse and elevate it.
11. Not publish the lorem-ipsum demo articles to recruiters.
12. Not rewrite the whole design system — evolve `globals.css` tokens + library.

---

## 17. Final recommendation

1. **Architecture:** hybrid — one-page Home (Hero → Selected Work → Library → About → Articles → Contact → Footer) + dedicated `/projects`, `/projects/[slug]`, `/articles`, `/articles/[slug]`, `/library`; Resume = PDF link.
2. **Homepage:** Direction-C hero with real visual → 1 featured + 2 secondary projects → Library differentiator → brief About with grouped skills → (conditional) real articles → Contact → footer with "built with Next + azeriand-library".
3. **Navigation:** minimal identity sidebar (desktop) → compact top band (tablet) → top bar + focus-trapped drawer (mobile); unified links; persistent Contact CTA.
4. **Visual system:** keep warm palette, color-coding, `rounded-xl`, hover lift; apply Geist; add text/border/surface/focus tokens; AA contrast; consolidate buttons/cards; add Tag; kill inline colors and `!important`.
5. **Projects:** no filters; Golden·Core + Azeriand Library as the first two compact case studies; Strapi `project` model so future ones aren't hardcoded.
6. **Library:** Home section + `/library` page framed around why/decisions/dogfooding + Storybook/repo links; few representative components.
7. **Content:** English; first-person, technical-but-human; reuse existing taglines; mark `[CONTENT NEEDED]` for case-study depth, About specifics, and real articles; never invent data.
8. **Exact order:** P0 (structure) → P1 (IA + hero) → P2 (visual tokens) → P3 (case studies + model) → P4 (library) → P5/P6 (a11y + perf hardening), in the step table of §12.

### If this were my portfolio, what would I implement first tomorrow morning?
Ship **P0.1–P0.5 in one focused session, as 5 tiny commits**:
1. Remove `h-screen`/`overflow-hidden` and make the layout grid stack responsively (natural scroll, no horizontal overflow at 360px) — verify the azeriand-library CSS isn't forcing `overflow:hidden` in the browser while I'm there.
2. Fix the `mailto:` space in both files.
3. Delete the `/resume` placeholder route and point Resume to the PDF via a real `<a rel="noopener">`.
4. Strip the `console.log`s.
5. Unify nav links (externals → `<a target="_blank" rel="noopener">`).

That single morning turns the site from "desktop-only, with a dead route and a broken contact link" into a structurally sound, mobile-usable, correctly-linked base — with zero risk to the visual identity — so every later phase (hero, tokens, case studies) lands on solid ground.
