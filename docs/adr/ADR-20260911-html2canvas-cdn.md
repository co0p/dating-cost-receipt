# ADR-20260911 — html2canvas Loaded from CDN

**Decision:** Load `html2canvas` from a public CDN (`cdnjs`) as a `<script>` tag rather than bundling it or avoiding it entirely.

**Status:** Accepted

---

## Context

The Download Receipt feature requires rendering the receipt DOM element as a PNG image client-side. `html2canvas` is the standard library for this. The project has no build pipeline — all files are served as-is from the repository root. Bundling a library without a build step means checking in a vendor file. Loading from CDN means the first external runtime dependency is introduced, which the original engineering principles explicitly discouraged.

## Alternatives

**Bundle `html2canvas` as a vendored file**
- Pro: No external runtime dependency. Works offline. No CDN outage risk.
- Con: ~300KB vendor file checked into the repository. No automatic updates. Requires manual re-download on version changes.

**Add a build pipeline (npm + rollup/vite)**
- Pro: Proper dependency management, tree-shaking, versioned lockfile.
- Con: Introduces a build step, contradicting the no-build-pipeline constraint. Significantly increases project complexity for a single library.

**Load from CDN (chosen)**
- Pro: No build step. No vendored file. One `<script>` tag. Version is explicit in the URL.
- Con: First external runtime dependency. CDN outage or URL change = download button broken. Requires graceful degradation.

**Use the Web Share API / canvas API directly**
- Pro: No external dependency.
- Con: Web Share API does not reliably produce a downloadable image from a DOM element across browsers. The canvas approach requires reimplementing what `html2canvas` does — not justified for this project's scope.

## Rationale

The CDN approach is the only path that satisfies the no-build-pipeline constraint while delivering the feature. The risk (CDN outage) is mitigated by: (1) graceful degradation — if `html2canvas` fails to load, the button shows an error message rather than crashing; (2) the feature is non-critical — the app is fully usable without it (users can still screenshot). `cdnjs` is a well-operated CDN with high availability. The version is pinned in the URL (`1.4.1`), preventing surprise breaking changes.

This decision supersedes the "no external runtime dependencies" principle from `CONSTITUTION.md` for this specific, scoped use case only. The principle still holds for all other features.

## Consequences

- **Better:** Download Receipt feature ships without a build pipeline.
- **Better:** No large vendor file in the repository.
- **Harder:** The app now has one external runtime dependency. CDN unavailability breaks the download button (not the rest of the app).
- **Harder:** The `CONSTITUTION.md` no-external-dependencies principle now has a documented exception. Future contributors must check this ADR before adding further CDN dependencies.

## Related

- [ADR-20260911-vanilla-js.md](ADR-20260911-vanilla-js.md) — dependency philosophy this decision builds on
- `CONSTITUTION.md#engineering-principles` — the rule this decision creates an exception to
