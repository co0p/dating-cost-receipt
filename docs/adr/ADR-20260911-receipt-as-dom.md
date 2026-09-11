# ADR-20260911 — Receipt Rendered as Styled HTML DOM

**Decision:** Render the receipt as styled HTML DOM elements, not as a canvas element or a server-generated image.

**Status:** Accepted

---

## Context

The receipt is the primary visual output of the app and must update in real time as inputs change. For V1, users share it by taking a screenshot. A post-V1 enhancement (PRD §7) would add an `html2canvas` "Download Receipt" button. The choice of rendering approach determines update complexity, shareability, and the path to that future enhancement.

## Alternatives

**Canvas rendering**
- Pro: Pixel-perfect control over the receipt appearance.
- Con: Requires re-drawing the entire receipt on every input change. Significantly more code. Text layout (word wrap, alignment) is manual. Does not degrade gracefully on older devices.

**Server-generated image**
- Pro: Consistent rendering across devices.
- Con: Requires a backend. Violates the no-backend constraint. Not viable.

**Styled HTML DOM (chosen)**
- Pro: Updates are simple `textContent` writes. CSS handles all layout. Browser handles text rendering, accessibility, and scaling. The `html2canvas` post-V1 path works directly on DOM elements.
- Con: Receipt appearance may vary slightly across browsers and OS font rendering. Acceptable for a satirical joke app.

## Rationale

DOM rendering is the only approach that satisfies real-time updates with no build complexity and no backend. It is directly compatible with the planned `html2canvas` download feature. The visual fidelity trade-off (minor cross-browser font differences) is irrelevant at this product's level of seriousness.

## Consequences

- **Better:** Real-time receipt updates are trivial — write to `textContent`, CSS does the rest.
- **Better:** `html2canvas` download feature (post-V1) works without any architecture change.
- **Better:** Receipt is accessible (screen readers can read it).
- **Harder:** Pixel-perfect print-style alignment requires careful CSS (monospaced font, fixed widths for label/value columns). Not a technical risk, but requires attention to detail in styling.

## Related

- [ADR-20260911-vanilla-js.md](ADR-20260911-vanilla-js.md)
