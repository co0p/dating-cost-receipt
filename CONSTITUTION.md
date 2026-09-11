# CONSTITUTION.md

**Project:** Date-A-Base (Dating Cost Calculator)
**Platform:** Mobile-First Static Web Application
**Deployment:** GitHub Pages

---

## Engineering Principles

- No backend, no build step required. The project is static assets only: `index.html`, `style.css`, `app.js`, `calc.js`, and images.
- All logic is client-side. No external API calls, no data persistence, no cookies. One exception: `localStorage` is used to persist the dark mode UI preference (key: `theme`). No personal data is stored.
- One scoped external runtime dependency is permitted: `html2canvas` loaded from CDN for the Download Receipt feature. All other features must remain dependency-free. See [ADR-20260911-html2canvas-cdn](docs/adr/ADR-20260911-html2canvas-cdn.md).
- Satirical tone is a product constraint. Calculation rules must optimize for comedic effect, not financial accuracy.
- Keep dependencies minimal. Prefer zero-dependency vanilla JS. If a framework is introduced it must compile to static output with no runtime server requirement.
- Calculation logic must be pure functions in `calc.js` (input → output, no side effects). This keeps them testable and auditable.
- The DOM is the state. No state management library. The form drives the receipt in real time via direct DOM manipulation.

---

## Architecture Boundaries

- `index.html` — entry point and markup only. No inline scripts or styles beyond the minimum for initial render.
- `calc.js` — all pure calculation functions. No DOM access. Safe to import in Node.js for testing.
- `app.js` — DOM event wiring only. Reads form inputs, calls `calc.js` functions, writes to receipt DOM nodes. No calculation logic.
- `style.css` — all styling, including the receipt theme (monospaced font, paper texture, jagged edges).
- Images and assets — static files only, no generated or fetched assets.
- Dependency direction: `index.html` → `app.js` → `calc.js`, and `index.html` → `style.css`. No reverse imports.
- No build pipeline. If a build step is introduced, it must produce a self-contained `dist/` of static files.

See [docs/architecture.md](docs/architecture.md) for the C4 Level 2 container view.

---

## Testing Strategy

- Unit tests cover all pure calculation functions in `calc.js`: base cost, vehicle multiplier, weather tax, outfit surcharge, ex penalty, silence tax, food modifier, laugh discount, enjoyment discount, total derivation, and filename sanitization.
- No integration or E2E tests required. There is no server, no auth, and no routing.
- Manual browser testing on a 375px viewport (iPhone SE baseline) before any release.
- Tests must pass before merging to `main`.

See [docs/testing.md](docs/testing.md) for commands, conventions, and evidence requirements.

---

## Performance Envelope

- Initial page load under 2 seconds on a standard 4G connection (~10 Mbps).
- CSS animations must run at 60fps. No janky transitions on the receipt update.
- One external network request is permitted on page load: `html2canvas` from CDN (~300KB). All other assets must be served from the repository.
- Total asset weight target (excluding html2canvas): under 200KB uncompressed.

---

## Documentation And ADR Policy

- ADRs are stored in [docs/adr/](docs/adr/) and linked from this file when they affect architectural boundaries.
- Write an ADR when a decision is structural, hard to reverse, or non-obvious from the code.
- Do not write an ADR for implementation details, bug fixes, or styling choices.
- Architecture is documented in [docs/architecture.md](docs/architecture.md). Update it when the file structure or data flow changes.
- Domain vocabulary is documented in [docs/domain.md](docs/domain.md).
- UI decisions are documented in [docs/ui.md](docs/ui.md).

**Active ADRs:**
- [ADR-20260911-vanilla-js](docs/adr/ADR-20260911-vanilla-js.md) — No framework; vanilla JS for zero-dependency static output.
- [ADR-20260911-receipt-as-dom](docs/adr/ADR-20260911-receipt-as-dom.md) — Receipt rendered as styled HTML DOM, not canvas or image.
- [ADR-20260911-html2canvas-cdn](docs/adr/ADR-20260911-html2canvas-cdn.md) — html2canvas loaded from CDN; first and only permitted external runtime dependency.

---

## Release And Deployment

- Release trigger: merge to `main` branch on GitHub. GitHub Pages serves the `main` branch root directly.
- No versioning scheme for V1. The deployed state is always the tip of `main`.
- Rollback: revert the offending commit and push to `main`.

See [docs/deployment.md](docs/deployment.md) for the full release runbook.

---

## Delivery and Documentation

- A feature is not considered shipped until it is verified manually on a mobile viewport and the relevant calculation tests pass.
- Product roadmap is tracked in [docs/roadmap.md](docs/roadmap.md).
- `prd.md` is the source of truth for product intent. This constitution governs engineering guardrails, not product scope.
- Do not modify `prd.md` to record technical decisions; use ADRs and this constitution instead.
