# Discovery handoff: Baker & Charlie -> Kampfkunstcentrum (read-only)

Task: t_cd59a7d2
Date: 2026-05-19

## 1) Is Baker workspace present and comparable?
- Yes: `/home/llm/workspaces/bakerandcharlie-qa-ready` exists.
- Confirmed branch is `codex/baker-final-site-structure-qa-ready` with tracked changes present locally
  (`git -C /home/llm/workspaces/bakerandcharlie-qa-ready status --short --branch`).
- Comparison is valid for first-pass CMS pattern because both are static HTML sites and Baker already has Pages CMS wiring.

## 2) Reusable patterns in Baker worth copying first
### A) CMS schema-first config
- Reusable file: `.pages.yml`
- In-use fields/patterns:
  - `media.input` + `media.output` image handling (`images` -> `/images`).
  - Multiple `content` entries as file-based models (`content/site.json`, `content/home.json`, `content/gallery.json`, `content/menu.json`, …).
  - Strong nested-object schema with object/list fields and list constraints.
  - Optional booleans and fallback defaults.
- Reference: `/home/llm/workspaces/bakerandcharlie-qa-ready/.pages.yml` lines 1-10 + 76-81 + 365-369 etc.

### B) JSON source-of-truth
- Reusable structure:
  - Global settings in `content/site.json`.
  - Page/section-specific content in dedicated files.
  - This allows non-technical edits from CMS UI only.
- Reference: `PAGES-CMS-SETUP.md` lists editable files: `content/site.json`, `content/home.json`, `content/gallery.json`, `content/menu.json`.

### C) Declarative client-side hydration layer
- Reusable file: `scripts/content-loader.js`
- Core mechanics in this project:
  - `loadContent()` reads `document.body.dataset.page`.
  - Fetches JSON files via `fetchJson('content/*.json')` and updates DOM by ID via utility helpers.
  - Post-render lifecycle hooks:
    - sets `window.cmsContentDidRender = true`
    - dispatches `new CustomEvent("cms:content-rendered", { detail: { page }})`.
- Reference snippets:
  - Loader include: `<script src="scripts/content-loader.js"></script>` near footer of `index.html`.
  - Event + readiness flags near file end in `scripts/content-loader.js` lines 594-630.

### D) Contract + checks
- Reusable test mindset: explicit integration checks and local run command.
- `package.json` test script has CMS+visual checks (`test:content-loader`, `test:insta-modal`, `test:mobile-layout`, etc).
- `PAGES-CMS-SETUP.md` local check recipe: `node server-node.js` then `node tests/content-loader.test.js`.
- `server-node.js` exposes simple static server with readyness log line: `Node dev server started at http://127.0.0.1:${port}`.

## 3) What is **not** directly reusable (adaptation needed)
- Baker is mostly **multi-page** with page switching (`body[data-page="home|products|people|gallery|menu"`), while Kampfkunst is a **single-page anchor site** with IDs:
  - `willkommen`, `vergleich`, `wing-chun`, `krav-maga`, `ueber-mich`, `kontakt`, `trainingszeiten` in `/home/llm/workspaces/kampfkunstcentrum-dortmund/index.html`.
- Target currently has no `data-page`, no CMS loader, and no `content-loader` references.
- Existing target scripts are mostly animation/reveal + copy helper; no content hydration layer exists (`js/main.js` is generic UI JS).
- Cookies/popup logic is custom in `index.html` and must be preserved or mirrored (not part of Baker pattern).

## 4) Target site mapping (scope from acceptance contract)
Source sections and likely CMS domains (first-pass, no SEO redesign):
- **Global/site settings**
  - Logo/header text + nav CTA + email/copy + legal links + media defaults.
  - `index.html` contains static nav/contact/footer text and logo.
- **Hero block**
  - Badge, title, subtitle, hero image URL/alt, CTA labels + anchors.
  - `index.html` hero lines around top and image source in hero section.
- **Sections**
  - `willkommen`: title/subtitle, long body text and checklist items.
  - `vergleich`: two discipline cards and bullet lists.
  - `wing-chun`: very long rich text + headings + lists; should be section-block list in CMS.
  - `krav-maga`: similarly long rich text section.
  - `ueber-mich`: trainer profile text, values, differentiators.
  - `kontakt`: email, address lines, map link, contact CTA.
  - `trainingszeiten`: sessions by day + status chips + “stand” note.
- **Assets/branding**
  - Hero image and possibly section images (if any) should be CMS-backed with fallback.

## 5) Concrete proposed structure for Kampfkunstzentrum (minimal first pass)
Create/extend in `/home/llm/workspaces/kampfkunstcentrum-dortmund`:
- Keep static host no build-step.
- Add CMS config + content files:
  - `.pages.yml`
  - `content/site_settings.json` (global text, hero CTA, contact, footer)
  - `content/sections.welcome.json` (welcome section content)
  - `content/sections.vergleich.json` (two cards)
  - `content/programs.json` (wing-chun, krav-maga rich content blocks)
  - `content/sections.about_trainer.json` (ueber-mich)
  - `content/sections.contact.json` (kontakt)
  - `content/trainingszeiten.json` (days + sessions + status)
  - `content/media.json` (hero image + optional OG / icon paths)
- Add lightweight hydrator script (adapted from Baker style):
  - `scripts/kampf-content-loader.js` reads above JSON and injects into known selectors in SPA-style one-page DOM.
  - Supports `cms:content-rendered` and `window.cmsContentReady` compatibility for testability/other scripts.
- Keep `index.html` mostly static but replace hard-coded strings with IDs/data attributes where script writes content.
- Ensure existing cookie-banner/popup scripts continue to execute independently.

## 6) Risks / blockers to call out before implementation
1. Rich HTML fields in `wing-chun`/`krav-maga` need a clean schema (rich text blocks or Markdown-like structure) and sanitation strategy.
2. Training sessions include both capacity status and label formatting; CMS enum model must keep current badge semantics (`frei`, `begrenzt`, `voll`, `warteliste`).
3. Current legal pages (`impressum.html`, `datenschutz.html`) are static and intentionally out of scope per acceptance contract.
4. Existing anchors in nav (`#kontakt`, `#trainingszeiten`, etc.) must remain stable after hydration.
5. Baker contains test coverage that is tightly coupled to its class names/ids; Kampf must add its own lightweight smoke checks.

## 7) Exact next-step artifacting for implementation worker
- Start from acceptance contract in:
  - `/home/llm/workspaces/kampfkunstcentrum-dortmund/.hermes/plans/2026-05-19-pages-cms-acceptance-contract.md`
  - `/home/llm/workspaces/kampfkunstcentrum-dortmund/.hermes/plans/2026-05-19_070625-pages-cms-integration.md`
- Then implement CMS model first in this order:
  1) `.pages.yml` schema, 2) `content/*.json`, 3) hydrator, 4) `index.html` hook points, 5) smoke checks.
- Keep branch `agent/pages-cms-plan` for this phase.