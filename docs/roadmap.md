# Roadmap

Product direction and sequencing for Date-A-Base. Each entry states the user outcome, current confidence, and ordering rationale.

> A feature moves to **Done** only when its user outcome is verified and the evidence is linked here.
> Source of truth: if a feature is not in Done with a passing test link, it is not considered shipped.

---

## Done

### V1 — Core Receipt Calculator

- **Job story:** When I finish a date, I want to enter its details and see a satirical cost receipt, so I can laugh about it with friends or share it on social media.
- **Evidence:** 31 unit tests passing (`npx vitest run`), deployed at https://co0p.github.io/dating-cost-receipt/
- **Delivered:** 2026-09-11

---

## Partial

---

## Planned

### Download Receipt Button

- **Job story:** When I want to share my receipt, I want to download it as an image, so I don't have to manually crop a screenshot.
- **Why next:** Requires `html2canvas` library integration. Core receipt must exist first (it does).
- **Open question:** Whether to load `html2canvas` from a CDN or bundle it. Resolve at implementation time.

### Dark Mode

- **Job story:** When I'm using the app at night or in a dark bar, I want a dark UI mode, so the screen doesn't blind me — while keeping the receipt looking like paper.
- **Why after Download:** Purely aesthetic enhancement. Does not affect calculation logic.

---

## Rules

- Features move left to right: Planned → Partial → Done. Never skip Partial.
- A feature enters Partial when its increment is approved.
- A feature enters Done only when its evidence link resolves to a current verification record.
- Do not add implementation detail here — link to the ADR or use case for that.
