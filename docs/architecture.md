# Architecture

Date-A-Base is a single-page static web application. There is no server, no API, and no build pipeline. All components run in the user's browser.

---

## C4 Level 2 — Container View

```
┌─────────────────────────────────────────────────────────────────┐
│  User's Browser                                                 │
│                                                                 │
│  ┌───────────────┐    reads/writes DOM    ┌──────────────────┐  │
│  │  index.html   │ ──────────────────────▶│    app.js        │  │
│  │               │                        │                  │  │
│  │  Markup &     │◀── updates receipt ─── │  - Event wiring  │  │
│  │  form shell   │                        │  - Calculation   │  │
│  └───────────────┘                        │    functions     │  │
│         │                                 └──────────────────┘  │
│         │ links                                    │             │
│         ▼                                          ▼             │
│  ┌───────────────┐                        (pure functions,       │
│  │  style.css    │                         no DOM dependency)    │
│  │               │                                              │
│  │  App styles + │                                              │
│  │  Receipt theme│                                              │
│  └───────────────┘                                              │
└─────────────────────────────────────────────────────────────────┘

Hosted on: GitHub Pages (static file serving, no server-side logic)
```

---

## Containers

### `index.html`
- Entry point and markup shell.
- Declares the form inputs and the receipt output area.
- Links `style.css` and `app.js`. No inline scripts or styles beyond the minimum for initial render.

### `app.js`
- All calculation logic and DOM event handling.
- Pure calculation functions (vehicle cost, weather tax, enjoyment discount, total) are exported separately from the DOM wiring.
- Reacts to form `input` and `change` events; updates receipt DOM nodes in real time.
- No network calls, no storage reads or writes.

### `style.css`
- All visual styling.
- Two distinct themes in one file: the app UI (clean, modern, mobile-first) and the receipt (monospaced font, paper texture, jagged edges).
- No runtime style injection from JS.

### GitHub Pages (external)
- Serves the repository root of `main` as static files.
- No server-side processing. No CDN configuration required for V1.

---

## Data Flow

```
User input (form event)
        │
        ▼
app.js reads form values
        │
        ▼
Pure calculation functions → computed cost breakdown
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
index.html → app.js
index.html → style.css
app.js     → (no imports for V1 — vanilla JS)
style.css  → (no imports)
```

No reverse dependencies. `app.js` does not import `index.html` structure by name — it queries the DOM by stable IDs and classes defined in `index.html`.

---

## Constraints

- No build pipeline for V1. All files are served as-is.
- No framework runtime. If a framework is introduced later, it must compile to self-contained static output.
- No external runtime dependencies (CDN fonts, remote images, analytics scripts) that would add load time or create failure points.
