# KCD Animation Spec v1

> Scope: Micro interactions for the under-construction layout. Motions emphasize clarity (status + contact) and respect `prefers-reduced-motion`.

## Principles
- **Subtle lift**: Use max 4px translate to keep the calm tone of a WIP notice.
- **Staggered reveals**: Sections fade+slide with 80ms cadence when they enter viewport.
- **Reduced Motion**: All transitions disabled when `prefers-reduced-motion: reduce`.

## Tokens
- Duration fast: `var(--duration-fast)` (160 ms)
- Duration base: `var(--duration-base)` (260 ms)
- Easing: `var(--ease-snap)` (cubic-bezier(0.16, 1, 0.3, 1))
- Distance: `clamp(6px, 1vw, 10px)`

## Component Behaviors

| Component | Trigger | Animation | Notes |
|-----------|---------|-----------|-------|
| Announcement bar | Page load | Fade-in from 0.7 opacity + upward slide `translateY(-6px)` | Delay 120 ms so body paints first |
| Hero badges | On hover | Slight scale `1.03`, background to `var(--kcd-panel-strong)` with 0.2 opacity overlay | Use `transition: transform var(--duration-fast) var(--ease-snap)` |
| Primary CTA | Hover/focus | TranslateY(-2px) + shadow to `var(--shadow-strong)` | Already defined in theme; add `focus-visible` ring using `box-shadow: 0 0 0 3px var(--kcd-focus)` |
| Progress chips | On reveal | `opacity: 0 → 1`, `translateY(8px → 0)`, stagger 80 ms per item | Use `@keyframes kcd-chip-in` |
| Module cards | Hover | Border color to `var(--kcd-accent)`, background lighten, slight rotate `rotateX(0.5deg)` | Keep transform origin center |
| Contact mail chip | Hover/focus | Pulse border dash offset using CSS animation `dash-move 1.2s linear infinite` | Pause animation on `prefers-reduced-motion` |
| Footer links | Focus | Underline slides in via `background-size` transition (0 to 100%) | Avoid extra text |

## Keyframes

```
@keyframes kcd-reveal-up {
  0% { opacity: 0; transform: translateY(10px); }
  100% { opacity: 1; transform: translateY(0); }
}

@keyframes dash-move {
  to { stroke-dashoffset: 20; }
}
```

Apply `kcd-reveal-up` to `.hero-shell > *`, `.modules-strip`, `.contact-panel`.

## Interaction Hooks
- Add `data-animate="chip"` to each `.progress-chip` for JS-controlled stagger if CSS-only sequencing becomes cumbersome.
- Intersection Observer snippet (optional) to add `.is-visible` class when sections enter viewport; fallback to always-visible if JS disabled.

## Reduced Motion Handling
```
@media (prefers-reduced-motion: reduce) {
  .hero-shell > *,
  .modules-strip,
  .progress-chip,
  .contact-panel,
  .announcement-bar,
  .mailto-chip {
    animation: none !important;
    transition-duration: 0.01ms !important;
  }
  .mailto-chip {
    border-style: solid;
  }
}
```

## Implementation Notes
- For the dash animation, use pseudo-element on `.mailto-chip` instead of SVG to keep DOM simple.
- Intersection Observer config: `rootMargin: '0px 0px -15% 0px'`, threshold `0.15`.
- Ensure focus styles remain even if animations are disabled.

