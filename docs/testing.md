# Testing

This project has no backend, no auth, and no routing. The risk surface is narrow: calculation logic must be correct (or at least consistently funny), and the UI must update the receipt in real time without errors.

The strategy is therefore minimal: unit-test the pure calculation functions, and manually verify the mobile layout before any release.

---

## Testing Approach and Rationale

The only testable logic is in `app.js`: the functions that compute vehicle cost, weather tax, enjoyment discount, and the final total. These are pure functions with no side effects, so unit tests are cheap and reliable.

DOM behavior (real-time receipt updates) is not unit-tested. It is verified manually on a mobile viewport. The DOM glue code is thin enough that breakage is immediately visible.

No integration or E2E tests are in scope for V1. There is no server, no database, no network call to stub.

---

## Choosing Test Depth

| Change type | Test required |
|---|---|
| Modifying a calculation function | Unit test covering the change |
| Adding a new cost variable | Unit test for the new function |
| Changing DOM event wiring | Manual mobile viewport check |
| Changing CSS / styling | Manual visual check |
| Changing copy or labels | No test required |

---

## Test Design Conventions

- Test files live alongside the source: `app.test.js` next to `app.js`.
- Each test describes a behavior in plain language: `"vehicle cost: Uber charges $2 per km"`.
- Fixtures are inline literals — no shared setup objects. Calculation functions take plain numbers.
- Tests must not touch the DOM. Import only the pure calculation exports.
- One assertion per test where practical. If a function has multiple cases, write multiple tests.

---

## Running the Checks

No build step is required. Tests run with Node.js directly using a test runner that supports ES modules, or with a bundler-free setup.

**Recommended: Vitest (zero-config, runs without a build)**

```bash
# Install once
npm install --save-dev vitest

# Run tests
npx vitest run

# Watch mode during development
npx vitest
```

If no package.json exists yet, initialize first:

```bash
npm init -y
```

Vitest will pick up any `*.test.js` files automatically.

**Manual mobile verification:**
1. Open `index.html` in a browser (no server needed for V1 — `file://` protocol is sufficient).
2. Open DevTools → toggle device toolbar → select iPhone SE (375×667).
3. Interact with all form controls and confirm the receipt updates in real time.
4. Confirm layout does not break at 375px width.

---

## Evidence Required Before Promotion

- `npx vitest run` exits with 0 (all calculation unit tests pass).
- Manual mobile check completed on a 375px viewport with no layout breaks and no console errors.

Both checks are required. A green test run does not substitute for the manual check.

---

## Automation and Feedback Loops

- **Local:** `npx vitest` in watch mode during development.
- **Pre-merge:** `npx vitest run` must pass before merging to `main`. No CI pipeline exists for V1; this is a manual gate.
- No automated mobile screenshot or E2E runner is configured for V1.

---

## Known Risks and Gaps

- DOM behavior is not automatically tested. A bug in the event wiring would not be caught by the unit suite — only by the manual check.
- No cross-browser automated testing. Manual check is Chrome DevTools only unless the developer tests on a real device.
- If the project grows (more variables, a download feature, social sharing), an E2E layer (Playwright) should be evaluated at that point.

---

## Maintenance Guidance

- Keep calculation functions pure. If a function starts reading from the DOM, extract the value and pass it in — do not test DOM state.
- If a calculation rule changes for comedic effect, update the corresponding unit test first (red), then change the function (green).
- This guide is updated when new cost variables are added or when the test tooling changes.
