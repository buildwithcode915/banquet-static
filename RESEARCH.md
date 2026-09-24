# Website research and implemented decisions

Reviewed 24 September 2026. Design inspiration only; no third-party photos, copy, reviews, or venue claims were imported.

- [Royal Cliff venue tour](https://www.royalcliffineagan.com/venue-tour): clear descriptions of spaces and a route from browsing to arranging a visit. Applied as a three-step planning section and a direct visit/contact action. A virtual tour requires actual venue assets, so none is fabricated.
- [The Covenant Place gallery](https://www.thecovenantplace.com/gallery): prominent visual browsing with a visit invitation. Applied as large editorial image sliders and a contact route beside venue planning content.
- [W3C carousel pattern](https://www.w3.org/WAI/ARIA/apg/patterns/carousel/): labelled controls, keyboard operation, stopping rotation on focus, and appropriate slide announcements. Applied to both sliders: previous/next, selectors, optional play/pause, focus pause, hover pause, visibility-aware timers, and live announcements for manual changes. Rotation starts only on request. Touch swipe is also supported.

Other refinements: FAQ disclosures that work without JavaScript, responsive layouts, lazy-loaded gallery photos, prioritized first hero image, and reduced-motion styles. Existing generated photographs remain explicitly labelled inspiration.

## Validation

`npm test` exercises slider wrapping, direct selection, arrow keys, play, timer advancement, focus pause, active-slide accessibility, and cleanup. `npm run build` produces the static `out/` deliverable. Browser visual QA remains pending because the earlier browser security policy blocked local-file preview.
