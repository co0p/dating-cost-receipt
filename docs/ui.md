# UI Decisions

Durable interaction patterns, visual principles, and accessibility rules for Date-A-Base. Update when a recurring UI decision changes. This is not a component catalog or a screen-by-screen walkthrough.

---

## Layout Model

**Decision:** Mobile-first, single-column on narrow screens; two-column (form + receipt side-by-side) on wider screens if implemented.

**Rationale:** The primary use case is a user on their phone at a bar or on the way home. The 375px portrait viewport is the baseline. The layout must be fully usable with one thumb.

**Consequences:** Desktop layout is an enhancement, not the design target. Do not sacrifice mobile usability to improve desktop presentation.

---

## Form Panel

**Decision:** The form is the top section on mobile. All inputs use large tap targets (minimum 44×44px touch area per WCAG 2.1 AA).

**Decision:** Sliders use native `<input type="range">` for maximum mobile compatibility. No custom slider library.

**Decision:** Vehicle selection uses radio buttons or a native `<select>` — not a custom dropdown. Native controls are faster to tap and require no JS to open.

**Rationale:** Native controls match the "app-like" feel without adding custom component complexity. They are accessible by default.

---

## Receipt Panel

**Decision:** The receipt is styled to look like a printed restaurant receipt: monospaced font, off-white/cream paper background, jagged top and bottom edges (CSS clip-path or SVG border), faded ink color (`#333` or similar, not pure black).

**Decision:** The receipt panel must fit within a standard smartphone screenshot aspect ratio (~9:16). This is the primary share mechanism for V1 — users screenshot it.

**Rationale:** The receipt aesthetic is the core comedic payoff of the app. It must be visually distinct from the form. If the receipt looks like a generic card, the joke lands less.

**Consequences:** The receipt width is constrained. Line item labels must be short enough to fit on one line in a monospaced font at mobile font sizes.

---

## Real-Time Updates

**Decision:** The receipt updates on every `input` event — no submit button. There is no "Calculate" action.

**Rationale:** Watching the total change as you drag the enjoyment slider is part of the comedic experience. A submit button breaks the immediacy.

**Consequences:** The calculation function runs on every keystroke. It must be fast (sub-1ms for these simple arithmetic operations — not a concern).

---

## Tone and Copy

**Decision:** All labels, line items, and helper text must be satirical and playful. Dry or neutral copy is not permitted in the receipt output.

**Examples of correct tone:**
- "Base Cost (For leaving the house): $10.00"
- "Rain Tax (Hair ruined): $15.00"
- "Enjoyment Discount (Actually laughed at my joke): -$30.00"

**Examples of incorrect tone:**
- "Transportation: $20.00"
- "Discount: -$30.00"

**Rationale:** The comedic copy is the product. Neutral labels make it look like a real expense tracker.

---

## Accessibility

**Minimum bar for V1:**
- All form inputs have visible `<label>` elements.
- Color is not the only means of communicating a value (e.g., a negative total also shows a minus sign and/or "REFUND" text, not just green color).
- The receipt is legible at default browser font size (no sub-12px text).

Full WCAG AA compliance is a post-V1 goal.

---

## Shareability

**Decision:** The receipt component must be visually self-contained within a ~375px wide, ~600px tall area. This ensures it fits in a single screenshot without scrolling on most phones.

**Decision:** No "Download Receipt" button in V1. Users share via screenshot. The `html2canvas` download feature is explicitly a post-V1 enhancement (see `prd.md` §7).
