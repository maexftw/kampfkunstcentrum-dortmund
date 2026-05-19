# Kampfkunstcentrum Dortmund — Pages CMS Integration Plan

## Goal

Enable the client to edit the most important website content themselves via Pages CMS, while keeping the existing static site deployable on Cloudflare Pages/GitHub Pages style hosting.

Editable content scope confirmed by user:

- Page/body texts
- Training times / schedule
- Offers / programs / disciplines
- Contact information
- Images
- SEO is optional for this phase, not required for the first CMS pass

## Workflow rule

Use MaexMax / GStack-first workflow:

1. Keep scope narrow; avoid yak-shaving.
2. Plan and gate before broad implementation.
3. Use Kanban for durable execution and review gates.
4. Use native WSL Gemini CLI for isolated read-only or first-pass tasks where suitable, to save Codex quota.
5. Use Codex/Spark only for fast core implementation/review work.
6. Do not call the project client-ready until review, tests, visual QA/preview, PM gate, and ship gate pass.

## Current repo context

Repository: `https://github.com/maexftw/kampfkunstcentrum-dortmund`

Local workspace:

```text
/home/llm/workspaces/kampfkunstcentrum-dortmund
```

Current site shape:

- Static HTML/CSS/JS project
- Main files: `index.html`, `datenschutz.html`, `impressum.html`, `css/`, `js/`
- No package manager or build step currently present
- Existing docs mention Cloudflare Pages with:
  - Framework: `None`
  - Build command: empty
  - Output: `/`

Smoke-test baseline from clone:

```text
200 /
200 /index.html
200 /datenschutz.html
200 /impressum.html
200 /robots.txt
200 /sitemap.xml
```

Known small baseline note:

- `index.html` references `/favicon.ico` and `/apple-touch-icon.png`, but those files are currently absent.

## Proposed technical approach

Use Pages CMS in the same spirit as the Baker & Charlie setup: keep the site static, extract editable content into structured files, and expose those files through a CMS config so the client edits content without touching HTML.

Recommended first implementation direction:

1. Add a Pages CMS config file, likely `.pages.yml` or the repo-specific config format used by the previous Baker & Charlie implementation after discovery.
2. Introduce structured content files, likely under `content/` or `data/`, for:
   - `site` / global metadata and contact
   - `home` / primary page sections and text blocks
   - `training-times` / schedule entries
   - `offers` / programs such as Wing Chun and Krav Maga
   - `images` / gallery or referenced media
3. Refactor `index.html` only as much as needed for content-driven generation or CMS-safe editing.
4. Preserve static hosting simplicity. Avoid adding a full framework unless the CMS integration truly requires it.
5. Keep legal pages editable only if low-risk; otherwise leave `impressum.html` and `datenschutz.html` static for now unless client explicitly needs them in CMS.

## Important discovery task before implementation

Before writing CMS config, inspect the Baker & Charlie repo/setup and identify the exact Pages CMS pattern already proven in this user's workflow:

- Config filename and schema
- Content folder conventions
- Media upload path
- Git branch / auth assumptions
- Whether Cloudflare Pages needs any build step

Do not invent a new CMS pattern if the Baker & Charlie pattern is reusable.

## Kanban execution graph

Board slug:

```text
kampfkunstcentrum-dortmund
```

Planned cards:

1. **PM/spec gate — Pages CMS acceptance contract**
   - Assignee: `pm`
   - Output: exact editable fields, non-goals, acceptance checklist.
   - No implementation.

2. **Discovery — compare Baker & Charlie Pages CMS pattern**
   - Assignee: `analyst`
   - Gemini lane candidate: yes, read-only repo inspection if available.
   - Output: reusable config/content/media pattern and risks.

3. **Implementation — wire Pages CMS content model**
   - Assignee: `default` unless a dedicated frontend profile is available.
   - Parent: PM/spec + discovery.
   - Output: branch changes only, no push to main, no client-ready claim.

4. **Review gate — code/config review**
   - Assignee: `reviewer`
   - Parent: implementation.
   - Output: approve or block with required fixes.

5. **Visual QA / preview gate**
   - Assignee: `reviewer`
   - Parent: review gate.
   - Output: browser-tested local/preview evidence, responsive check, console/network issues.

6. **PM / ship gate**
   - Assignee: `pm`
   - Parent: visual QA.
   - Output: client-ready yes/no, feedback needed, ship decision.

## Suggested acceptance criteria

The CMS pass counts as implementation-complete when:

- Client-editable text content exists in CMS-editable structured files.
- Training times can be edited without touching HTML.
- Offers/programs can be added/edited/reordered where practical.
- Contact fields can be edited centrally.
- Images can be uploaded/referenced through the CMS media path.
- Existing public pages still load.
- Static deploy remains simple.
- No secrets or private data are introduced.

The project counts as client-ready only when:

- Code/config review passes.
- Local or preview visual QA passes for desktop/mobile.
- Console/network checks are clean or documented.
- PM/ship gate explicitly says ready.

## Files likely to change in implementation

Likely:

- `.pages.yml` or equivalent Pages CMS config
- `content/**` or `data/**`
- `index.html`
- possibly `js/**` if content hydration is needed
- possibly `css/**` only for CMS-driven image/content layout fixes
- `README.md` or a short CMS editor note if needed

Avoid unless necessary:

- Introducing a framework/build pipeline
- Rewriting the full design
- Editing legal text content beyond making it link-safe/static

## Validation plan

Minimum local validation:

```bash
cd /home/llm/workspaces/kampfkunstcentrum-dortmund
python3 -m http.server 4173
```

Then verify:

- `/`
- `/index.html`
- `/impressum.html`
- `/datenschutz.html`
- console errors
- missing local assets
- mobile viewport smoke
- CMS config syntax/shape according to Pages CMS docs or the Baker & Charlie precedent

## Open questions for later, not blockers for first plan

- Should legal pages also be editable in CMS, or remain static/legal-controlled?
- Should SEO fields be added as optional hidden/advanced CMS fields now, even if not required?
- What exact live preview/deploy target should be used for final QA?

## Kanban IDs

Created on board `kampfkunstcentrum-dortmund`:

| Stage | Task ID | Assignee | Status at creation |
|---|---:|---|---|
| PM/spec gate — Pages CMS acceptance contract | `t_2084401e` | `pm` | ready |
| Discovery — reuse Baker & Charlie Pages CMS pattern | `t_978f1d44` | `analyst` | ready |
| Implementation — wire Pages CMS content model | `t_ed5d75d2` | `default` | todo, gated by spec + discovery |
| Review gate — Pages CMS code/config review | `t_94ae83a5` | `reviewer` | todo |
| Visual QA gate — browser preview and responsive smoke | `t_f900864b` | `reviewer` | todo |
| PM/ship gate — client-ready decision | `t_17981689` | `pm` | todo |
