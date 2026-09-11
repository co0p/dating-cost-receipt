# Architecture

Date-A-Base is a single-page static web application. There is no server, no API, and no build pipeline. All components run in the user's browser.

---

## C4 Level 2 — Container View

```
┌──────────────────────────────────────────────────────────────────────┐
│  User's Browser                                                      │
│                                                                      │
│  ┌───────────────┐    loads     ┌──────────────────┐                 │
│  │  index.html   │ ────────────▶│    app.js        │                 │
│  │               │              │                  │                 │
│  │  Markup &     │◀─ updates ── │  - Event wiring  │                 │
│  │  form shell   │   receipt    │  - DOM reads     │                 │
│  └───────────────┘              │  - DOM writes    │                 │
│         │                       └────────┬─────────┘                 │
│         │ links                          │ imports                   │
│         ▼                                ▼                            │
│  ┌───────────────┐              ┌──────────────────┐                 │
│  │  style.css    │              │    calc.js       │                 │
│  │               │              │                  │                 │
│  │  App styles + │              │  Pure functions  │                 │
│  │  Receipt theme│              │  No DOM access   │                 │
│  └───────────────┘              └──────────────────┘                 │
└──────────────────────────────────────────────────────────────────────┘

Hosted on: GitHub Pages (static file serving, no server-side logic)
```

---

## Containers

### `index.html`
- Entry point and markup shell.
- Declares all form inputs and receipt output elements with stable IDs.
- Loads `style.css` and `app.js` (as `type="module"`). No inline scripts or styles.

### `app.js`
- DOM event wiring only. Reads form input values, calls `calc.js` functions, writes results to receipt DOM nodes.
- Imports pure calculation functions from `calc.js`.
- Reacts to `input` and `change` events on all form elements; updates receipt in real time.
- No calculation logic. No network calls. No storage reads or writes.

### `calc.js`
- All pure calculation functions: `vehicleCost`, `weatherTax`, `outfitSurcharge`, `exPenalty`, `silenceTax`, `foodModifier`, `laughDiscount`, `enjoymentDiscount`, `calculateTotal`.
- No DOM access. Safe to import in Node.js (used by Vitest).
- Single source of truth for all cost rules and constants (`BASE_COST`, `VEHICLE_MULTIPLIERS`, `WEATHER_TAX`, `OUTFIT_SURCHARGES`, `FOOD_MODIFIERS`).

### `style.css`
- All visual styling.
- Two distinct themes in one file: the app UI (clean, modern, mobile-first) and the receipt (monospaced font, off-white background, jagged top edge via SVG mask).
- No runtime style injection from JS.

### GitHub Pages (external)
- Serves the repository root of `main` as static files.
- No server-side processing. No CDN configuration required.

---

## Data Flow

```
User input (form event)
        │
        ▼
app.js reads form values
        │
        ▼
calc.js pure functions → computed cost breakdown
        │
        ▼
app.js writes results to receipt DOM nodes
        │
        ▼
Browser renders updated receipt
```

No data leaves the browser. No state persists between sessions.

---

## Dependency Direction

```
index.html → app.js (type="module")
index.html → style.css
app.js     → calc.js (ES module import)
style.css  → (no imports)
calc.js    → (no imports)
```

`app.js` queries the DOM by stable IDs defined in `index.html` — it does not import HTML structure by name. `calc.js` has no knowledge of the DOM or `app.js`.

---

## Constraints

- No build pipeline. All files are served as-is from the repository root.
- No framework runtime.
- One permitted external runtime dependency: `html2canvas` loaded from CDN on page load. All other features must remain dependency-free. See [ADR-20260911-html2canvas-cdn](adr/ADR-20260911-html2canvas-cdn.md).
- `calc.js` must remain DOM-free. Any function that touches `document` belongs in `app.js`.
- `app.js` must remain calculation-free. Any arithmetic belongs in `calc.js`.
