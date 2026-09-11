# Deployment

Date-A-Base is a static web application. There is no server, no build pipeline, and no deployment tooling. The repository root is the deployable unit.

---

## Deployment Model

- **Hosting:** GitHub Pages, serving the `main` branch root directly.
- **Deployable unit:** `index.html`, `style.css`, `app.js`, and any image assets in the repository root.
- **No build step.** Files are served as-is. What is in the repository is what users see.

This model is appropriate because the project has no secrets, no server-side logic, and no environment-specific configuration. The simplest possible deployment surface matches the simplest possible app.

---

## Release Trigger and Versioning

- **Trigger:** Merge to `main`. GitHub Pages deploys automatically within ~30 seconds.
- **Versioning:** None for V1. The live site always reflects the tip of `main`.
- **Owner:** Any contributor with write access to the repository can release by merging to `main`.
- **Required evidence before merge:** All calculation unit tests pass (`npx vitest run`) and the manual mobile viewport check is complete.

---

## Environments

| Environment | URL | Purpose |
|---|---|---|
| Production | `https://<username>.github.io/dating-cost-receipt/` | Live site for users |
| Local | `file:///path/to/index.html` | Development and verification |

There is no staging environment. Local verification on a 375px viewport substitutes for a staging check.

---

## Deployment Procedure

GitHub Pages deploys automatically when `main` is updated. There is no manual deployment action.

**Pre-merge checklist:**
1. Run `npx vitest run` — must exit 0.
2. Open `index.html` locally in Chrome DevTools at 375px — confirm receipt updates in real time and no console errors appear.
3. Merge the PR to `main`.
4. Wait ~30 seconds, then open the production URL and confirm the change is live.

---

## Rollback

If a bad change reaches production:
1. Revert the offending commit: `git revert <sha>` and push to `main`.
2. GitHub Pages redeploys automatically within ~30 seconds.
3. Confirm the production URL is back to the expected state.

There is no data loss risk (no backend, no persistence). Rollback is always safe.

---

## Deployment Checklist

- [ ] `npx vitest run` exits 0
- [ ] Manual mobile check at 375px passes
- [ ] PR merged to `main`
- [ ] Production URL verified after deploy

---

## Configuration and Secrets

No configuration or secrets exist for this project. All behavior is hard-coded in `app.js`. There are no environment variables, no API keys, and no `.env` files.

---

## Health Signals

After deploying, verify:
- The production URL loads without a 404.
- The receipt updates when form inputs change.
- No JavaScript errors appear in the browser console.

No uptime monitoring or alerting is configured for V1. GitHub Pages availability is GitHub's responsibility.

---

## Operational Risks

- **GitHub Pages outage:** No mitigation for V1. The site is unavailable until GitHub resolves the incident.
- **Breaking change in `main`:** Mitigated by the pre-merge test and manual check gate.
- **Asset caching:** GitHub Pages may cache aggressively. If a deploy does not appear, instruct users to hard-refresh (`Cmd+Shift+R`).
