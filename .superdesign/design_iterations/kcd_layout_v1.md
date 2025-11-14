# Kampfkunstcentrum Dortmund – Layout v1 (Under-Construction Focus)

> **Constraint note:** All textual content comes directly from the current live page (`Hier entsteht…`, `Wir bauen…`, bullet items, and email contact). The layout only reorders and styles existing copy—no invented claims, stats, or certifications.

## Goals & Target Signals
- Communicate clearly that the new internet presence is under construction.
- Highlight the three “Was kommt als Nächstes?” bullet points as upcoming modules.
- Make the contact email highly visible on every breakpoint.

## Desktop Wireframe (ASCII)
```
┌──────────────────────────────────────────────────────────────────────┐
│ Slim announcement bar: “WIP” + email link                            │
├──────────────────────────────────────────────────────────────────────┤
│ Header: wordmark (text) + simple nav anchors (Status | Update | Mail)│
├──────────────────────────────────────────────────────────────────────┤
│ HERO (two-column)                                                    │
│ ┌──────────────────────────────┐  ┌───────────────────────────────┐  │
│ │H1: Hier entsteht…            │  │Progress Card                  │  │
│ │P: Wir bauen…                 │  │ • “Was kommt als Nächstes?”   │  │
│ │Badge row (WIP, Neuaufbau)    │  │ • Bullet items as stacked tags│  │
│ │CTA Button → mailto           │  │ • Secondary ghost button      │  │
│ └──────────────────────────────┘  └───────────────────────────────┘  │
├──────────────────────────────────────────────────────────────────────┤
│ Upcoming Modules strip (cards)                                       │
│ [Wing Chun & Krav Maga] [Trainingszeiten & Probetraining] [Infos…]   │
│ Each card: same text as bullet item, icon placeholder, subtle border │
├──────────────────────────────────────────────────────────────────────┤
│ Contact Panel                                                         │
│ ┌──────────────────────────────┐  ┌───────────────────────────────┐  │
│ │“Bis dahin…” paragraph        │  │ Email chip + copy CTA button  │  │
│ │Large mailto button (full width)│ │ Secondary text repeating mail│ │
│ └──────────────────────────────┘  └───────────────────────────────┘  │
├──────────────────────────────────────────────────────────────────────┤
│ Footer: wordmark, anchor links (Status, Update, Kontakt), imprint stub│
└──────────────────────────────────────────────────────────────────────┘
```

## Mobile Wireframe (Key Stacking)
```
┌───────────────┐
│ Announcement  │
├───────────────┤
│ Header w/ burger│
├───────────────┤
│ Hero text      │
│ CTA button     │
├───────────────┤
│ Progress card  │
├───────────────┤
│ Upcoming cards │ (horizontal scroll chips)
├───────────────┤
│ Contact panel  │
├───────────────┤
│ Footer links   │
└───────────────┘
```

## Component Breakdown & Rationale
1. **Announcement Bar**: Repeats “Hier entsteht…” context + email so visitors instantly know the status and contact option without scrolling.
2. **Hero Stack**: Reuses the existing H1 + paragraph, but pairs them with badges and a primary button linking to the email address for stronger visual hierarchy.
3. **Progress Card**: Converts the “Was kommt als Nächstes?” heading + bullet list into a stylized card with progress indicators—text remains identical, presentation improves scannability.
4. **Upcoming Modules Strip**: Each bullet item becomes a card/chip; the text is unchanged, but layout suggests roadmap structure while staying within the provided wording.
5. **Contact Panel**: The “Bis dahin…” paragraph and email line become the centerpiece of a supportive panel with copy-to-clipboard/mailto controls; again, text itself stays verbatim.
6. **Footer**: Simple anchor list referencing the same sections plus legal placeholder; no additional info introduced.

## Accessibility & Best Practices
- Large typography, 4.5:1 contrast, focus-visible outlines for CTA and chips.
- Repeated email link ensures keyboard and screen-reader discoverability.
- Motion reduced to subtle fade/scale respecting `prefers-reduced-motion`.

## Next Step
Proceed to **Theme Design** (color palette + typography tokens in `css/variables.css`) while keeping all textual strings untouched.


