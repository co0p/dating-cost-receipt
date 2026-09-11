# ADR-20260911 — Vanilla JS, No Framework

**Decision:** Use vanilla JavaScript (no framework) for all client-side logic.

**Status:** Accepted

---

## Context

The project is a static single-page app deployed to GitHub Pages. The PRD explicitly states "Vanilla JS is sufficient." A framework would need to either be loaded from a CDN (adding an external runtime dependency and failure point) or compiled to static output (adding a build pipeline). The app has no component hierarchy worth abstracting: one form, one receipt panel, and a handful of event listeners.

## Alternatives

**Alpine.js via CDN**
- Pro: Reactive data binding with minimal syntax.
- Con: External CDN dependency. Load failure = broken app. Adds ~15KB.

**Vue or React compiled to static**
- Pro: Familiar DX for some developers.
- Con: Requires a build pipeline (Vite, webpack, etc.) and introduces npm dependency management. Overhead is not justified for this scope.

## Rationale

The calculation logic is simple arithmetic. The DOM updates are straightforward (write a string to an element's `textContent`). A framework solves no real problem here and adds either an external dependency or a build step. Vanilla JS keeps the deployment model as simple as possible: no `node_modules`, no `package.json` required for the app itself (only for the test runner).

## Consequences

- **Better:** Zero runtime dependencies. The app works from `file://` with no server. No CDN outage can break it.
- **Better:** No build pipeline to maintain or fail.
- **Harder:** If the app grows significantly in complexity (more variables, component reuse, dark mode with reactive state), the lack of a reactive model will increase DOM wiring verbosity. Revisit at that point.

## Related

- [ADR-20260911-receipt-as-dom.md](ADR-20260911-receipt-as-dom.md)
