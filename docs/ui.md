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

**Canonical label examples (from shipped copy):**

| Input value | Receipt label |
|---|---|
| Walking | "Foot power (dignity: intact)" |
| Uber | "Uber (surge pricing, obviously)" |
| Rented Helicopter | "Helicopter (no regrets, only debt)" |
| Raining | "Rain tax (hair completely ruined)" |
| Blizzard | "Blizzard hazard pay (maniac)" |
| Outfit level 1 | "Outfit: rolled out of bed" |
| Outfit level 5 | "Outfit: Renaissance painting" |
| Ex mentioned | "Ex mention penalty" |
| 3 silences | "Silence tax (3 painful)" |
| Michelin star | "Food: Michelin star (propose now)" |
| Enjoyment 1 | "Enjoyment (send help)" |
| Enjoyment 10 | "Enjoyment (where have you been)" |
| 4 laughs | "Joke credit (4 laughs)" |

**Examples of incorrect tone:**
- "Transportation: $20.00"
- "Discount: -$30.00"
- "Weather surcharge: $15.00"

**Rationale:** The comedic copy is the product. Neutral labels make it look like a real expense tracker. New variables must follow the same pattern — the label must contain a parenthetical that delivers the joke.

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

**Decision:** A "Download Receipt" button renders the receipt panel as a 2× PNG via `html2canvas` and triggers a browser download. The button is placed outside the receipt panel so it does not appear in the captured image.

**Decision:** Filename pattern: `<yyyy-mm-dd>-<name1>-<name2>.png`, with both names lowercased and sanitized (spaces → hyphens, non-alphanumeric stripped). Falls back to `receipt.png` when date or names are empty.

**Known limitation:** iOS Safari does not honour the `download` attribute on anchor tags for data URIs — it opens the image in a new tab instead of saving it. This is a browser restriction, not a fixable bug. Users on iOS can long-press the image to save it manually.

---

## Action Buttons

**Decision:** Two action buttons live below the receipt panel: "Download Receipt" (primary, red) and "New Date" (secondary, grey).

**Decision:** "New Date" resets all form inputs to their defaults and re-runs `updateReceipt`, returning the receipt to its initial state. It does not prompt for confirmation.

**Rationale:** The reset button removes friction for users who want to calculate a second date without manually clearing every field. No confirmation needed — the form has no persistent state to protect.
