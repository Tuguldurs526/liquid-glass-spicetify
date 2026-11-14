# LIQUID CHROME 2.0 · Spicetify

A premium dark-metal / iridescent-glass Spotify theme with a **working** real-time appearance studio. MIT license.

> Browser screenshots are from a simulated Spotify interface. Real Spotify Desktop compatibility depends on the client version and the selectors it ships with.

## What's fixed in 2.0

The v1 controls UI could load separately from the theme CSS when installed from Marketplace, so settings could appear to save without altering the Spotify surface. v2 includes a **self-contained, CSS-injecting controls extension**, with the same engine in the optional `theme.js`. Both read and write the same settings key. If both are loaded, an initialization guard prevents duplicates.

All sliders now modify variables directly used by Spotify UI selectors. The extension provides its own CSS fallback if the theme is missing, so testing it in Marketplace cannot silently result in inert controls. The native theme remains usable without JavaScript.

## Files

- `LiquidChrome/color.ini` — seven Spicetify schemes: Obsidian, Titanium, Ultraviolet, Mercury, Molten, Aurora, Rose.
- `LiquidChrome/user.css` — redesigned premium theme. Does not require JS.
- `LiquidChrome/theme.js` — optional customization runtime for *manual* theme installs.
- `LiquidChrome-Controls.js` — the **same** customization runtime, packaged as a **Marketplace extension**.
- `manifest.json` — Marketplace theme and extension entries.
- `preview/index.html` — interactive Spotify-like preview, using generated artwork.
- `LIQUID_CHROME_PREVIEW.html` — single-file portable preview.
- `tests/` — browser tests for settings, persistence, computed CSS and extension-only fallback.

## INSTALLATION — manually on Windows

1. Copy the **entire** `LiquidChrome` folder into `%APPDATA%\spicetify\Themes\`. The folder must directly contain `color.ini`, `user.css` and `theme.js`.
2. In PowerShell run:

```powershell
spicetify config current_theme LiquidChrome color_scheme Obsidian
spicetify config inject_css 1 replace_colors 1 inject_theme_js 1
spicetify apply
```

3. After Spotify reloads, press **Alt + Shift + C**, open **Liquid Chrome · Studio** from the Spotify profile menu, or click the discreet **✦ launcher** on the right edge.

**Do not enable both an old v1 customization extension and v2.** Remove the old `LiquidChrome-Controls.js` installation first and install the v2 one instead. The v2 `theme.js` and v2 extension can coexist, but only one is needed.

## INSTALLATION — from Marketplace

The theme and controls can appear as two Marketplace entries:

1. Install **Liquid Chrome** in Marketplace → Themes.
2. Install **Liquid Chrome Studio** in Marketplace → Extensions.
3. Reopen Spotify if the interface doesn't update. Use **Alt + Shift + C** or the right-hand Studio launcher.

Installing the *theme alone* does not guarantee Marketplace will inject `theme.js`. That's why the **Studio controls extension** is published separately. Conversely, Studio can inject a complete theme CSS fallback and work independently, but the named color schemes require the theme package.

## Settings

| Control | What it changes |
|---|---|
| Theme / Custom / Album-reactive color | Highlight colors for selection, controls, glow, panels and Studio itself |
| 7 curated accent swatches | One-click appearance changes |
| Liquid / Mirror / Satin / Obsidian finish | Metallic shine, depth, shadows and surface material |
| Glass opacity (38–96%) | Actual panel background opacity |
| Backdrop blur (0–46 px) | Blur behind library, content and player panels |
| Corner radius (8–34 px) | Panel and card radii |
| Ambient glow (0–100%) | Glow behind panels, cards and controls |
| Chrome reflection (0–100%) | Metallic rim, highlight and hairline intensity |
| Compact / Comfortable | Card padding and sidebar row spacing |
| Ambient motion | Enables or disables atmosphere and component transitions |
| Show edge launcher | Toggle the Studio shortcut button |

Settings save automatically in localStorage under `liquidchrome:settings:v2`; compatible v1 saved values are imported, including the old Satin/Matte finish preference.

**Album-reactive color** relies on Spicetify's official `colorExtractor` wrapper. It applies an album-color accent rather than redrawing the entire theme, which avoids text contrast disasters. If the track doesn't have a suitable palette, the custom accent remains as fallback.

## Troubleshooting / proving your settings really applied

Make sure the correct theme and extension are enabled. Then enable Spotify Developer Tools (Spicetify `spicetify enable-devtools`) and open the console, and check:

```js
window.LiquidChrome?.version                 // "2.0.0"
window.LiquidChrome?.getSettings?.()         // Current settings
getComputedStyle(document.documentElement).getPropertyValue('--lc-glass')
```

Drag **Glass opacity** to 40%. The last expression should read `0.40`, and the actual panel color will become more transparent after its short material transition. If `window.LiquidChrome` is undefined, the JavaScript was never injected; install/enable **Liquid Chrome Studio** in Marketplace, or set `inject_theme_js 1` for a manual installation.

For theme CSS changes, ensure `spicetify config inject_css 1 replace_colors 1` and run `spicetify apply`. Spotify updates may invalidate individual class selectors, so open a GitHub issue with the Spotify/Spicetify version and a screenshot if a specific view no longer matches.

## Publishing

Add the public GitHub repository topic `spicetify-themes` (and `spicetify-extensions` if you list the controls extension). Keep both `manifest.json` entries and their referenced files at the committed paths.

## Build and tests

```bash
python build.py
node --check LiquidChrome/theme.js
node --check LiquidChrome-Controls.js
python tests/browser_test.py
python tests/fallback_test.py
```

Tests run in Chromium against a local simulated Spotify DOM. They verify actual computed values and visual properties, not just that an input received a new value. They **cannot** replace testing in the real Spotify desktop client.

## Compatibility

Designed for current Spicetify/Xpui Spotify desktop builds. No external CSS, fonts, tracking, or API keys are required.

Based on the official Spicetify theme structure and API wrapper docs:
- https://spicetify.app/docs/development/themes
- https://spicetify.app/docs/development/api-wrapper/functions/color-extractor
- https://github.com/spicetify/marketplace/wiki/Publishing-to-Marketplace
