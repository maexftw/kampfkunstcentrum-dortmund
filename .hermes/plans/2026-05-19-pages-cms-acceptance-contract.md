# Pages CMS Acceptance Contract (Kampfkunstcentrum Dortmund)

## Scope and assumptions
- Static site is `index.html` plus two linked legal pages: `impressum.html` and `datenschutz.html`.
- Current site has no package manager/build step (pure static HTML/CSS/JS).
- First implementation pass is content-editing only for:
  - texts
  - training times
  - offers/programs
  - contact info
  - images
- SEO is optional and out of scope for first pass. No SEO-related fields (including any `seo_toggle`) are exposed in CMS in phase 1.
- `live-site.html` is considered a source-of-truth variant; implementation target is the repository current files.
- This document is the authoritative first-pass CMS acceptance contract for the Pages CMS integration branch.

## Editable collections and fields

### 1) `site_settings`
Global site values
- `site_title` (string) e.g. "Kampfkunstcentrum Dortmund - Wing Chun & Krav Maga"
- `site_tagline` (string)
- `phone_e164` (string, optional if not displayed)
- `email` (string)
- `hero_badge` (string)
- `hero_title` (string)
- `hero_subtitle` (string)
- `copyright_year` (int)

### 2) `hero`
- `hero_image.url`
- `hero_image.alt`
- `primary_cta.label` + `primary_cta.anchor`
- `secondary_cta.label` + `secondary_cta.anchor`

### 3) `sections.willkommen`
- `badge`, `title`, `description`
- `intro_points[]` (array of short text)
- `feature_box_title`
- `feature_box_paragraphs[]`

### 4) `sections.vergleich`
For each art in comparison cards:
- `name`
- `subtitle`
- `highlights[]` (array of bullet text)
- `duration_text`

### 5) `collections.programs`
Editable per program document (`program_slug` = wing-chun / krav-maga)
- `title`, `slug`, `anchor_id`
- `intro` (rich text / structured content blocks)
- `subsections[]` where each entry is:
  - `heading`
  - `body` (rich text / list / table text)
- `learning_notes` (free text block)

### 6) `sections.ueber_mich`
- `badge`, `title`
- `trainer_name`
- `intro_text`
- `quotes[]`
- `values[]` (bullets)
- `differentiators[]`
- `experience_years`
- `bio_sections[]` (heading + body)

### 7) `sections.kontakt`
- `section_title`
- `lead_text`
- `email_label`
- `email_address`
- `email_href`
- `address.title`
- `address.lines[]`
- `maps_query`
- `maps_url`
- `cta_label`

### 8) `trainingszeiten` (repeatable collection)
- `day` (enum: Montag–Sonntag)
- `sessions[]` with fields:
  - `time_start`
  - `time_end`
  - `discipline` (Wing Chun / Krav Maga)
  - `audience` (e.g. Kids, Teens, Erwachsene)
  - `session_label`
  - `spots_status` (enum: frei / begrenzt / voll / warteliste)
  - `spots_text`
- `availability_note` (e.g. "Stand: März 2026")

### 9) `media`
- `hero_image` as above
- `favicon` path
- `apple_touch_icon` path
- `og_image` URL

### 10) `footer`
- `footer_logo_text`
- `footer_tagline`
- `impressum_url`
- `datenschutz_url`

## Non-goals (explicitly out of scope)
- No redesign, no re-architecture of styling/layout.
- No new routes, no API/backends, no authentication.
- No package-manager build pipeline changes.
- No content migration automation for legacy old pages.
- No SEO overhaul (meta templates, sitemap, schema expansion, etc. deferred).
- No legal page content changes in this first pass.

## Quality gates

### Must-pass before implementation-complete
1) Schema completeness:
- All required fields above are present in Pages CMS and have valid types.
- `trainingszeiten` supports 4+ days with multiple sessions/day and preserves current visible structure.
- `hero_image` and all required text fields render at least in fallback mode.

2) Content mapping validation:
- Every existing section in index maps to one CMS source object:
  - willkommen, vergleich, wing-chun, krav-maga, ueber-mich, kontakt, trainingszeiten, footer
- No page section disappears after rendering from CMS data.

3) Static deploy verification:
- `index.html` remains static and runnable without build step.
- `impressum.html` and `datenschutz.html` links still resolve.
- No broken section anchors from nav.
- No 404s for mandatory referenced assets (`favicon`, `apple-touch-icon`, `og-image`).

4) Data safety:
- HTML escaping/sanitization for CMS text fields that allow rich formatting.
- No user input forms or runtime token handling introduced.

5) Review gates:
- Client-side smoke test passes: hero, nav, CTA links, schedule badges, contact mail links, and map link all visible and functional.

## Definition of completeness

Implementation-complete:
- Pages CMS collections + field groups are implemented.
- A publish workflow writes CMS content into static files deterministically.
- A non-breaking rendering pass proves full parity for listed editable scope.
- QA gates 1–4 pass and test diff is documented.

Client-ready:
- Implementation-complete + client approval of content parity on preview URL.
- Owner validates at least:
  - at least one text edit round (all section types) and save/publish cycle succeeds
  - one schedule edit with add/change/remove session
  - one image swap + alt text update
- Final acceptance signed by owner and non-goals confirmed unchanged.

## Open decisions for unblock
- Resolved for phase one: `impressum.html` and `datenschutz.html` stay static and are intentionally excluded from CMS control unless the client explicitly asks later.
- Resolved: `seo_toggle` is intentionally **not** part of phase-1 CMS schema; any SEO controls remain out-of-scope.

## Kanban execution graph

Dedicated board: `kampfkunstcentrum-dortmund-cms`

1. **PM/spec gate** — finalize acceptance contract from this file and confirm non-goals.
2. **Discovery / reusable pattern** — read the Baker & Charlie Pages CMS approach and extract only reusable config/content/media patterns; good Gemini CLI lane.
3. **Implementation** — create Pages CMS config/content model, extract editable content, preserve static deploy/no build-step unless discovery proves a minimal build is necessary; finish as `review-required`, not client-ready.
4. **Code/config review** — verify schema, data safety, static deploy preservation, and no scope creep.
5. **Visual QA / preview** — local/preview browser smoke on desktop/mobile, console/network/404 checks, image and nav checks.
6. **PM/ship gate** — declare whether implementation is ready for client test; client-ready only after review + tests + visual QA/preview + owner/client edit-cycle check.

## Resume prompt for future agents

Repo: `/home/llm/workspaces/kampfkunstcentrum-dortmund`
Branch: `agent/pages-cms-plan`
Plan: `.hermes/plans/2026-05-19-pages-cms-acceptance-contract.md`
Goal: connect this static client site to Pages CMS so the customer can edit texts, training times, offers/programs, contact info, and images. SEO, redesign, legal-page editing, backend/auth, and deployment-pipeline rewrites are out of scope for phase one. Keep work on preview/PR branches; do not merge or push to `main` until explicitly approved. Client-ready requires code/config review, tests, visual QA/preview, PM/ship gate, and a successful customer edit/publish cycle.