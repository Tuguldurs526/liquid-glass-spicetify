# LIQUID CHROME 2.0.0

- Rewrote the theme stylesheet around live, shared CSS material tokens; removed unused settings and conflicting media-query overrides.
- Fixed Marketplace controls loading separately by embedding a CSS fallback in the controls extension.
- Rebuilt the Studio appearance panel with a persistent settings engine, accessible keyboard navigation, edge launcher and correct live input binding.
- Added Obsidian as a fourth material finish, extra reflection and glow sliders, and 7 accent swatches.
- Fixed album accent fetching through `Spicetify.colorExtractor` with stale-response protection.
- Improved glass surfaces, chrome button shells, consistent cards/track rows, small-window behavior and motion reduction.
- Migrates v1 settings automatically; compatibility with theme-only installation retained.
- Added real computed-style browser regression tests and extension-only fallback tests.

> This release has been tested in a simulated Chromium UI, not inside the recipient's Spotify Desktop installation.
