# Known Issues

Issues discovered and documented but not yet resolved. Each entry includes the impact, root cause, and the workaround or planned fix.

---

## KI-001 — iOS Safari: Download Receipt opens image in new tab instead of saving

**Severity:** Low — feature degrades gracefully; workaround exists.
**Affects:** iOS Safari (all versions).
**Discovered:** 2026-09-11

**Behaviour:**
On iOS Safari, tapping "Download Receipt" opens the PNG image in a new browser tab rather than saving it to the device's camera roll or downloads folder.

**Root cause:**
iOS Safari does not honour the `download` attribute on anchor tags for `data:` URIs. This is a long-standing browser restriction unrelated to the app's implementation.

**Workaround:**
After the image opens in a new tab, long-press the image and select "Add to Photos" or "Save to Files" from the share sheet.

**Fix:**
The Web Share API (`navigator.share({ files: [blob] })`) supports direct image sharing on iOS Safari 15.4+. This would replace the anchor-click approach for supported browsers. Planned as a future enhancement — not blocking current functionality.

**Related:**
- `docs/ui.md#shareability` — documents this limitation as a known UI decision consequence.
- `docs/adr/ADR-20260911-html2canvas-cdn.md` — html2canvas CDN decision.
