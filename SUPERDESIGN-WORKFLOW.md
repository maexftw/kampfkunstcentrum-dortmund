# SuperDesign Workflow Guide

This folder uses a **SuperDesign**-based workflow for UI design and iteration.

## Core Principles

- **Design-first approach**: Generate UI mockups, components, and wireframes in SuperDesign canvas before implementing
- **Iterative exploration**: Fork and explore multiple design directions simultaneously
- **Seamless IDE integration**: Designs live in `.superdesign/design_iterations/` and can be directly edited

## SuperDesign Extension Setup

1. **Install** the SuperDesign extension in Cursor/VS Code
2. **Open canvas**: `Ctrl/Cmd + Shift + P` → `SuperDesign: Open Canva`
3. **Design rules**: Refer to `.cursor/rules/design.mdc` for full design agent instructions
4. **Custom mode** (recommended for Cursor): Create a custom mode using the system prompt from `design.mdc` for better performance

## Design Workflow (4 Steps)

### 1. Layout Design
- **Output**: ASCII wireframe + component breakdown
- Present layout options to user
- Wait for approval before proceeding

### 2. Theme Design
- **Output**: CSS theme file via tool call
- Define colors, fonts, spacing, shadows using CSS variables (OKLCH format)
- Save to `.superdesign/design_iterations/theme_*.css`
- Reference example styles in `design.mdc` (neo-brutalism, modern dark mode)
- Wait for approval before proceeding

### 3. Animation Design
- **Output**: Micro-syntax animation spec
- Define transitions, hover states, loading indicators
- Document timing, easing, and interaction patterns
- Wait for approval before proceeding

### 4. Generate HTML
- **Output**: Single-file HTML in `.superdesign/design_iterations/`
- Naming convention: `{design_name}_{n}.html`
- For iterations: `{current_file_name}_{n}.html` (e.g., `ui_1.html` → `ui_1_1.html`)
- Include theme CSS, Tailwind CDN, Flowbite if needed
- Use Google Fonts, Lucide icons, Unsplash/Placehold.co for images

## Key Rules

### File Management
- **All designs** go into `.superdesign/design_iterations/`
- **Never** save design files outside this folder
- **Always** use tool calls (write, edit, etc.) — never output pseudo-code

### Styling Conventions
- Use **Flowbite** as base library (unless specified otherwise)
- Avoid indigo/blue unless requested
- Generate **responsive** designs
- For components: ensure background contrasts with UI (dark bg for light components)
- Use `!important` for CSS properties that might be overridden by Tailwind/Flowbite

### Scripts & Assets
- Tailwind: `<script src="https://cdn.tailwindcss.com"></script>`
- Flowbite: `<script src="https://cdn.jsdelivr.net/npm/flowbite@2.0.0/dist/flowbite.min.js"></script>`
- Icons: Lucide via `<script src="https://unpkg.com/lucide@latest/dist/umd/lucide.min.js"></script>`
- Images: Use real URLs only (Unsplash, Placehold.co) — no fake URLs

### Workflow Enforcement
- **Step-by-step confirmation**: Do not skip ahead to theme before layout is approved
- **Always use tool calls**: Do NOT output text like "Called tool: write..." or `<tool-call>...</tool-call>`
- **Must follow 4-step flow**: Layout → Theme → Animation → HTML

## Local Development Flow

Once a design is approved in SuperDesign:

1. **Copy/adapt** HTML from `.superdesign/design_iterations/` into main project files
2. **Test locally**: Open in browser or use live server
3. **Commit & push** to GitHub
4. **Cloudflare Pages** auto-deploys preview URLs per PR
5. **QA check**: Console errors, network, accessibility, performance
6. **Merge to main** → Production deploy

## Quality Gates (Pre-Merge)

- ✅ No console errors
- ✅ No 404/500 responses
- ✅ Preview URL manually tested
- ✅ Stable page load (no layout shifts)
- ✅ Interactive elements functional
- ✅ A11y basics: focus states, alt text, prefers-reduced-motion
- ✅ Performance: optimized assets, minimal initial JS

## Four Roles in Workflow

1. **Architect**: Creates short plan (max 10 lines) with goals, assumptions, risks, file list
2. **Implementer**: Builds minimal working version, documents assumptions for PR
3. **QA (Browser Agent)**: Opens preview URL, checks console/network/A11y, suggests fixes
4. **Release**: Creates PR with preview link, monitors production post-merge

## Git Integration

- **Small, focused PRs** preferred
- **Commit frequently** during local development
- **Push to GitHub** triggers Cloudflare Pages preview
- **Document assumptions** in PR text if requirements are unclear

## Memory Notes

- This workspace uses SuperDesign for **UI design iteration**
- Refer to `.cursor/rules/design.mdc` for full agent instructions
- When in doubt, follow the 4-step workflow: Layout → Theme → Animation → HTML
- Always save designs to `.superdesign/design_iterations/`

