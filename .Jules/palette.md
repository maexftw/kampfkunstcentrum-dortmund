## 2025-10-30 - [Project Initialization & UX Audit]
**Learning:** The initial state of the project had CSS for advanced features (reveal animations, mobile menu) but lacked the necessary JavaScript to activate them, creating a broken experience for mobile users. Always verify that design-intent matches functional implementation.

**Action:** Implemented `IntersectionObserver` for reveal animations and a robust mobile menu toggle with ARIA attributes (`aria-expanded`).

## 2025-10-30 - [Accessibility Enhancements]
**Learning:** Using only color (red/green) for status indicators in a training schedule is insufficient for color-blind users. Adding clear icons (✓/✕) alongside the text significantly improves readability for all users.

**Action:** Added visual icons to the training schedule status labels. Implemented a "Skip to Content" link for keyboard/screen reader users.

## 2025-10-30 - [Visual Delight & "De-Generic" Design]
**Learning:** Generic hero sections can be elevated with simple CSS touches like text gradients (`-webkit-background-clip: text`) and refined `cubic-bezier` transitions on interactive cards, making the site feel more "premium" without increasing load times.

**Action:** Refined the Hero title with gradients and added bouncy, interactive hover effects to comparison cards.
