/* LIQUID CHROME 2.0 — shared theme / Marketplace controls runtime.
   This script is also installed as theme.js for manual Spicetify themes.
   Its embedded stylesheet allows the Marketplace controls extension to work
   even when Marketplace does not inject optional theme.js.
   No remote requests. MIT. */
(() => {
  'use strict';
  const VERSION = '2.0.0';
  if (window.__LiquidChromeV2 === VERSION) return;
  window.__LiquidChromeV2 = VERSION;
  const FALLBACK_CSS = "/* LIQUID CHROME 2.0 | Spicetify Theme | MIT\n   All appearance controls use --lc-* variables. No remote resources.\n   Variables are written on documentElement by theme.js or LiquidChrome-Controls.js.\n   Layout-preserving selectors: no modification of Spotify playback logic. */\n:root {\n  color-scheme:dark;\n  --lc-theme-ready:1;\n  --lc-accent:var(--spice-button,#bcb5ff); --lc-accent-rgb:188,181,255; --lc-accent-ink:#090d16;\n  --lc-glass:.82; --lc-blur:23px; --lc-radius:19px; --lc-glow:.48; --lc-shine:.67;\n  --lc-spacing:1; --lc-sat:1.16;\n  --lc-fg:var(--spice-text,#f2f4ff);\n  --lc-muted:var(--spice-subtext,#a8b1c9);\n  --lc-base:var(--spice-main,#090c14);\n  --lc-surface:rgba(17,21,33,var(--lc-glass));\n  --lc-hairline:rgba(222,232,255,calc(.08 + var(--lc-shine) * .17));\n  --lc-ease:cubic-bezier(.2,.78,.2,1);\n  --lc-shadow:0 17px 45px rgba(0,0,0,.32),inset 0 1px rgba(255,255,255,calc(var(--lc-shine)*.16));\n  --lc-radius-inner:max(7px,calc(var(--lc-radius) - 6px));\n  --lc-font:Inter,'Segoe UI Variable','SF Pro Display','Segoe UI',Arial,sans-serif;\n}\n/* Finishes are designed as materials, not merely label changes. */\n:root[data-lc-finish=\"mirror\"] {--lc-shine:.98;--lc-sat:1.3;--lc-shadow:0 24px 65px rgba(0,0,0,.5),inset 0 2px rgba(255,255,255,.27),inset 0 -2px rgba(20,28,49,.6);}\n:root[data-lc-finish=\"satin\"] {--lc-shine:.17;--lc-sat:.94;--lc-shadow:0 10px 25px rgba(0,0,0,.21),inset 0 1px rgba(255,255,255,.055);}\n:root[data-lc-finish=\"obsidian\"] {--lc-shine:.48;--lc-sat:.85;--lc-shadow:0 19px 53px rgba(0,0,0,.54),inset 0 1px rgba(255,255,255,.12);}\n:root[data-lc-motion=\"off\"] *, :root[data-lc-motion=\"off\"] *::before,:root[data-lc-motion=\"off\"] *::after {animation-duration:.001ms !important;transition-duration:.001ms !important;}\nbody,#main,.Root,.Root__top-container {color:var(--lc-fg);background-color:var(--lc-base) !important;}\n.Root__top-container {isolation:isolate;position:relative;\n  background-image:radial-gradient(ellipse 58% 75% at -7% -10%,rgba(var(--lc-accent-rgb),calc(var(--lc-glow)*.29)),transparent 72%),\n    radial-gradient(ellipse 62% 68% at 96% 105%,rgba(var(--lc-accent-rgb),calc(var(--lc-glow)*.21)),transparent 80%),\n    linear-gradient(138deg,rgba(255,255,255,.021),transparent 35%,rgba(255,255,255,.024)) !important;\n}\n.Root__top-container::before {content:\"\";position:absolute;inset:-14% -8%;z-index:0;pointer-events:none;\n  background:conic-gradient(from 44deg at 68% 48%,transparent 0deg,rgba(var(--lc-accent-rgb),calc(var(--lc-glow)*.13)) 66deg,transparent 140deg,rgba(238,247,255,.042) 225deg,transparent 315deg);\n  filter:blur(70px);opacity:.85;animation:lc-aurora 27s ease-in-out infinite alternate;}\n@keyframes lc-aurora {0%{transform:translate3d(-2%,0,0) rotate(-3deg)}100%{transform:translate3d(2%,2%,0) rotate(5deg)}}\n.Root__globalNav,.Root__nav-bar,.Root__main-view,.Root__right-sidebar,.Root__now-playing-bar {position:relative;z-index:1;min-width:0;}\n.Root__globalNav {background:transparent!important;box-shadow:none!important;}\n/* Opaque app wrappers would otherwise hide the composited glass. */\n.Root__main-view .main-view-container,.Root__main-view .main-view-container__scroll-node,\n.Root__main-view .main-home-homeHeader,.Root__main-view .main-actionBarBackground-background,\n.Root__main-view .main-entityHeader-backgroundColor,.Root__main-view [data-testid=\"overscroll-background\"],\n.Root__nav-bar .main-yourLibraryX-libraryContainer,\n.Root__right-sidebar .main-nowPlayingView-nowPlayingView,\n.Root__right-sidebar .main-nowPlayingView-nowPlayingWidget,\n.Root__now-playing-bar .main-nowPlayingBar-nowPlayingBar {background:transparent!important;}\n/* Material panels: fogged glass, metallic upper edge, soft basal shadow. */\n.Root__nav-bar,.Root__main-view,.Root__right-sidebar,.Root__now-playing-bar {position:relative;\n  border-radius:var(--lc-radius)!important;border:1px solid var(--lc-hairline)!important;\n  background:linear-gradient(155deg,rgba(255,255,255,calc(var(--lc-shine)*.19)),rgba(255,255,255,.018) 24%,transparent 48%,rgba(var(--lc-accent-rgb),calc(var(--lc-glow)*.065)) 100%),\n    linear-gradient(0deg,rgba(6,9,16,.16),transparent 22%),var(--lc-surface)!important;\n  backdrop-filter:blur(var(--lc-blur)) saturate(var(--lc-sat))!important;\n  -webkit-backdrop-filter:blur(var(--lc-blur)) saturate(var(--lc-sat))!important;\n  box-shadow:var(--lc-shadow)!important;\n  transition:background-color .28s ease,border-radius .26s ease,backdrop-filter .25s ease,box-shadow .3s ease;\n}\n.Root__nav-bar::after,.Root__main-view::after,.Root__right-sidebar::after,.Root__now-playing-bar::after {\n  content:\"\";position:absolute;inset:0;border-radius:inherit;padding:1px;pointer-events:none;z-index:4;\n  background:linear-gradient(127deg,rgba(255,255,255,calc(var(--lc-shine)*.7)),rgba(255,255,255,.06) 20%,transparent 47%,rgba(var(--lc-accent-rgb),calc(var(--lc-shine)*.28)) 78%,rgba(255,255,255,calc(var(--lc-shine)*.42)));\n  -webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);\n  -webkit-mask-composite:xor;mask-composite:exclude;\n}\n.Root__main-view,.Root__right-sidebar,.Root__nav-bar {overflow:hidden;}\n.Root__now-playing-bar {overflow:visible;margin:0 6px 6px!important;}\n.Root__top-container,.Root__top-container button,.Root__top-container input,.Root__top-container textarea {font-family:var(--lc-font);}\n.Root__main-view h1,.Root__main-view h2,.Root__main-view h3 {letter-spacing:-.045em;}\n.Root__main-view h1 {font-weight:780;}\n.Root__main-view h2 {font-weight:740;}\n.Root__top-container a:hover {color:var(--lc-fg);}\n/* Search and global controls */\n.Root__globalNav [data-testid=\"search-input\"],.Root__globalNav input[type=\"search\"],\n.Root__globalNav [role=\"searchbox\"],.Root__globalNav .main-globalNav-searchInputContainer,\n.Root__globalNav [role=\"search\"] > div {border-radius:999px!important;\n  background:rgba(191,205,243,.075)!important;border:1px solid rgba(234,243,255,calc(.08 + var(--lc-shine)*.15))!important;\n  box-shadow:inset 0 1px rgba(255,255,255,.085),0 10px 25px rgba(0,0,0,.13)!important;\n}\n.Root__globalNav button {transition:background .25s ease,transform .25s var(--lc-ease);}\n.Root__globalNav button:hover {transform:translateY(-1px);}\n/* Sidebar navigation */\n.Root__nav-bar [role=\"listitem\"],.Root__nav-bar [data-testid=\"rootlist-item\"],\n.Root__nav-bar .main-yourLibraryX-listRow,.Root__nav-bar .main-yourLibraryX-libraryItem {\n  border-radius:var(--lc-radius-inner);transition:background .24s,transform .26s var(--lc-ease),box-shadow .24s;\n}\n.Root__nav-bar [role=\"listitem\"]:hover,.Root__nav-bar [data-testid=\"rootlist-item\"]:hover,\n.Root__nav-bar .main-yourLibraryX-listRow:hover,.Root__nav-bar .main-yourLibraryX-libraryItem:hover {\n  background:linear-gradient(105deg,rgba(var(--lc-accent-rgb),calc(var(--lc-glow)*.33)),rgba(255,255,255,.06))!important;\n  box-shadow:inset 2px 0 rgba(var(--lc-accent-rgb),.54);\n}\n.Root__nav-bar [aria-current=\"page\"],.Root__nav-bar [aria-selected=\"true\"] {background:rgba(var(--lc-accent-rgb),.16)!important;}\n.Root__nav-bar img {border-radius:calc(var(--lc-radius-inner) - 3px);}\n/* Cards and artist tiles */\n.Root__main-view .main-card-card,.Root__main-view [data-testid=\"card-click-handler\"],\n.Root__main-view .main-card-cardContainer {border-radius:var(--lc-radius-inner)!important;transition:transform .32s var(--lc-ease),background .23s,box-shadow .3s;}\n.Root__main-view .main-card-card {padding:calc(13px * var(--lc-spacing));\n  background:linear-gradient(145deg,rgba(255,255,255,calc(var(--lc-shine)*.14)),rgba(255,255,255,.025) 50%,rgba(var(--lc-accent-rgb),calc(var(--lc-glow)*.10)))!important;\n  border:1px solid rgba(239,246,255,calc(var(--lc-shine)*.09));box-shadow:inset 0 1px rgba(255,255,255,.09),0 8px 20px rgba(0,0,0,.12)!important;\n}\n.Root__main-view .main-card-card:hover {transform:translateY(-3px);\n  background:linear-gradient(145deg,rgba(var(--lc-accent-rgb),calc(var(--lc-glow)*.43)),rgba(255,255,255,.065) 50%,rgba(255,255,255,.018))!important;\n  box-shadow:0 16px 46px rgba(0,0,0,.28),inset 0 1px rgba(255,255,255,.19),0 0 0 1px rgba(var(--lc-accent-rgb),.22)!important;\n}\n.Root__main-view .main-card-card img,.Root__main-view .main-cardImage-imageWrapper img {border-radius:calc(var(--lc-radius-inner) - 5px)!important;}\n/* Tracks and playlist row hover */\n.Root__main-view [data-testid=\"tracklist-row\"],.Root__main-view .main-trackList-trackListRow {border-radius:9px;transition:background .22s,box-shadow .22s;}\n.Root__main-view [data-testid=\"tracklist-row\"]:hover,.Root__main-view .main-trackList-trackListRow:hover {\n  background:linear-gradient(90deg,rgba(var(--lc-accent-rgb),calc(var(--lc-glow)*.27)),rgba(255,255,255,.045))!important;box-shadow:inset 2px 0 rgba(var(--lc-accent-rgb),.54);\n}\n.Root__main-view [aria-selected=\"true\"][data-testid=\"tracklist-row\"] {background:rgba(var(--lc-accent-rgb),.18)!important;}\n.Root__main-view .main-trackList-trackListHeaderStuck,.Root__main-view .main-topBar-background {\n  background:rgba(11,15,24,var(--lc-glass))!important;backdrop-filter:blur(var(--lc-blur))!important;border-bottom:1px solid var(--lc-hairline);\n}\n/* Player: luminous alloy central control, native seeking remains interactive. */\n.Root__now-playing-bar .main-nowPlayingBar-nowPlayingBar {border:0!important;}\n.Root__now-playing-bar button[data-testid=\"control-button-playpause\"],.Root__main-view button[data-testid=\"play-button\"],\n.Root__main-view .main-playButton-PlayButton {background:linear-gradient(148deg,#ffffff 0%,#e0e6f4 25%,#a6afc6 52%,#f5f9ff 79%,#9eaac4 100%)!important;\n  border:1px solid rgba(255,255,255,.62)!important;color:#11192a!important;\n  box-shadow:inset 0 2px rgba(255,255,255,.78),inset 0 -2px 3px rgba(16,28,49,.24),0 7px 17px rgba(0,0,0,.36),0 0 calc(12px + 20px * var(--lc-glow)) rgba(var(--lc-accent-rgb),calc(var(--lc-glow)*.35))!important;\n  transition:transform .2s var(--lc-ease),box-shadow .23s;\n}\n.Root__now-playing-bar button[data-testid=\"control-button-playpause\"] svg,.Root__main-view button[data-testid=\"play-button\"] svg {fill:currentColor!important;color:#11192a!important;}\n.Root__now-playing-bar button[data-testid=\"control-button-playpause\"]:hover,.Root__main-view button[data-testid=\"play-button\"]:hover {transform:scale(1.06);}\n.Root__now-playing-bar .main-trackInfo-container img,.Root__now-playing-bar [data-testid=\"cover-art-image\"] {border-radius:calc(var(--lc-radius-inner) - 3px)!important;box-shadow:0 8px 20px rgba(0,0,0,.3);}\n.Root__now-playing-bar [data-testid=\"playback-position\"],.Root__now-playing-bar [data-testid=\"playback-duration\"] {font-variant-numeric:tabular-nums;}\n.Root__now-playing-bar .progress-bar__bg,.Root__now-playing-bar .volume-bar__bg,\n.Root__now-playing-bar .progress-bar__slider,.Root__now-playing-bar .volume-bar__slider {border-radius:99px;background:rgba(199,214,240,.17)!important;}\n.Root__now-playing-bar .progress-bar__fg,.Root__now-playing-bar .volume-bar__fg {border-radius:99px;\n  background:linear-gradient(90deg,var(--lc-accent),rgba(240,246,255,.96))!important;\n  box-shadow:0 0 calc(5px + 11px * var(--lc-glow)) rgba(var(--lc-accent-rgb),.5);\n}\n/* Pills, toggles, menu: quiet luxury, not a neon Christmas tree. */\n.Root__main-view button[aria-pressed=\"true\"],.Root__nav-bar button[aria-pressed=\"true\"],\n.Root__now-playing-bar button[aria-checked=\"true\"],.Root__top-container [role=\"switch\"][aria-checked=\"true\"] {color:var(--lc-accent)!important;}\n.Root__main-view .main-chip-chip,.Root__main-view [data-testid=\"filter-pill\"],\n.Root__nav-bar .main-yourLibraryX-filterButton {border-radius:999px!important;}\n.Root__main-view .main-chip-chip[aria-selected=\"true\"],.Root__main-view button[aria-checked=\"true\"] {\n  background:var(--lc-accent)!important;color:var(--lc-accent-ink)!important;\n}\n.Root__main-view button[aria-checked=\"true\"] * {color:var(--lc-accent-ink)!important;}\n.tippy-box,.main-contextMenu-menu,#context-menu,[data-encore-id=\"popover\"],[role=\"menu\"],[role=\"dialog\"]:not(#lc-settings) {\n  border-radius:var(--lc-radius-inner)!important;border:1px solid var(--lc-hairline)!important;\n  background:linear-gradient(148deg,rgba(255,255,255,calc(var(--lc-shine)*.13)),transparent 46%),rgba(18,21,33,.96)!important;\n  box-shadow:0 24px 70px rgba(0,0,0,.48),inset 0 1px rgba(255,255,255,.1)!important;backdrop-filter:blur(var(--lc-blur));\n}\n[role=\"menuitem\"] {border-radius:9px;}\n[role=\"menuitem\"]:hover {background:rgba(var(--lc-accent-rgb),.16)!important;}\n.Root__right-sidebar img {border-radius:var(--lc-radius-inner);box-shadow:0 12px 29px rgba(0,0,0,.2);}\n.Root__main-view :is(button,a,[role=\"button\"]):focus-visible,.Root__nav-bar :is(button,a):focus-visible,\n.Root__now-playing-bar button:focus-visible {outline:2px solid var(--lc-accent)!important;outline-offset:3px;}\n.Root__main-view ::-webkit-scrollbar,.Root__nav-bar ::-webkit-scrollbar,.Root__right-sidebar ::-webkit-scrollbar {width:7px;}\n.Root__main-view ::-webkit-scrollbar-thumb,.Root__nav-bar ::-webkit-scrollbar-thumb,.Root__right-sidebar ::-webkit-scrollbar-thumb {background:rgba(206,216,239,.22);border-radius:99px;}\n/* Compact density is intentionally visible, without rearranging Spotify's columns. */\n:root[data-lc-density=\"compact\"] {--lc-spacing:.70;}\n:root[data-lc-density=\"compact\"] .Root__main-view .main-card-card {padding:7px!important;}\n:root[data-lc-density=\"compact\"] .Root__nav-bar .main-yourLibraryX-listRow {padding-top:4px!important;padding-bottom:4px!important;}\n:root[data-lc-finish=\"obsidian\"] .Root__main-view,:root[data-lc-finish=\"obsidian\"] .Root__nav-bar {background:linear-gradient(135deg,rgba(255,255,255,.085),transparent 31%),rgba(4,7,13,var(--lc-glass))!important;}\n/* Small-window adaptations don't override user settings. */\n@media(max-width:1100px){.Root__now-playing-bar{margin:0 4px 4px!important;}.Root__main-view .main-card-card:hover{transform:translateY(-1px);}}\n@media(max-width:750px){.Root__top-container::before{display:none;}.Root__now-playing-bar{margin:0 2px 2px!important;}.Root__nav-bar::after,.Root__main-view::after,.Root__right-sidebar::after{opacity:.65;}}\n@media(prefers-reduced-motion:reduce){.Root__top-container::before{animation:none!important;}.Root__main-view .main-card-card,.Root__now-playing-bar button{transition-duration:.001ms!important;transform:none!important;}}\n\n/* LIQUID CHROME / Studio — self-contained control interface. */\n#lc-host,#lc-host * {box-sizing:border-box;}\n#lc-host {position:fixed;inset:0;z-index:2147483000;pointer-events:none;color:#f0f2ff;font:13px/1.5 var(--lc-font);}\n#lc-host.lc-open {pointer-events:auto;}\n#lc-host .lc-scrim {position:absolute;inset:0;background:rgba(1,3,10,.64);opacity:0;transition:opacity .28s ease;}\n#lc-host.lc-open .lc-scrim {opacity:1;}\n#lc-host .lc-panel {position:absolute;right:16px;top:14px;bottom:14px;width:min(440px,calc(100vw - 32px));\n  border-radius:25px;border:1px solid rgba(225,235,255,.23);\n  background:linear-gradient(147deg,rgba(255,255,255,.15),transparent 27%),linear-gradient(165deg,rgba(24,29,45,.98),rgba(10,14,24,.99) 72%);\n  box-shadow:0 22px 85px #000b,inset 0 1px rgba(255,255,255,.15);backdrop-filter:blur(26px);\n  transform:translateX(calc(100% + 50px));visibility:hidden;transition:transform .39s cubic-bezier(.16,1,.3,1),visibility .39s;overflow:hidden;display:flex;flex-direction:column;}\n#lc-host.lc-open .lc-panel {transform:translateX(0);visibility:visible;}\n#lc-host .lc-header {padding:27px 26px 20px;display:flex;align-items:start;justify-content:space-between;border-bottom:1px solid rgba(255,255,255,.09);}\n#lc-host .lc-overline {color:#b2bdda;font-size:10px;letter-spacing:.22em;font-weight:800;margin-bottom:9px;}\n#lc-host h2 {font-size:27px;font-weight:800;letter-spacing:-.065em;margin:0;line-height:1.1;color:#f3f6ff;}\n#lc-host h2 i {font-style:normal;color:#c1bafe;}\n#lc-host .lc-close {width:37px;height:37px;border-radius:50%;color:#f8faff;background:#ffffff12;border:1px solid #ffffff26;cursor:pointer;font-size:21px;}\n#lc-host .lc-body {padding:21px 26px 25px;flex:1;overflow-y:auto;scrollbar-color:#4a5266 transparent;scrollbar-width:thin;display:flex;flex-direction:column;gap:22px;}\n#lc-host .lc-live {display:flex;align-items:center;justify-content:space-between;gap:12px;border:1px solid #ffffff23;border-radius:15px;padding:12px 14px;\n  background:linear-gradient(110deg,rgba(var(--lc-accent-rgb),.11),#ffffff08);}\n#lc-host .lc-live strong {font-size:11px;letter-spacing:.08em;text-transform:uppercase;}\n#lc-host .lc-live small {font-size:10px;color:#afb8d2;}\n#lc-host .lc-orb {height:40px;width:40px;border-radius:50%;flex-shrink:0;background:radial-gradient(circle at 29% 23%,#fff 0%,var(--lc-accent) 19%,#3a4358 56%,#050813 80%);box-shadow:inset -3px -4px 7px #02040b99,0 0 24px rgba(var(--lc-accent-rgb),calc(var(--lc-glow)*.75));}\n#lc-host .lc-section {display:flex;flex-direction:column;gap:11px;}\n#lc-host .lc-caption {font-size:10px;letter-spacing:.2em;font-weight:850;color:#b2bede;text-transform:uppercase;}\n#lc-host .lc-sub {font-size:11px;line-height:1.5;color:#9da9c3;}\n#lc-host .lc-chiprow {display:flex;flex-wrap:wrap;gap:7px;}\n#lc-host button {font:inherit;cursor:pointer;}\n#lc-host .lc-chip {font-size:11px;font-weight:750;color:#cbd2e6;border:1px solid #ffffff26;background:#ffffff0c;border-radius:10px;padding:9px 12px;transition:background .18s,transform .18s;}\n#lc-host .lc-chip:hover {background:#ffffff18;transform:translateY(-1px);}\n#lc-host .lc-chip[aria-pressed=\"true\"] {background:var(--lc-accent);color:var(--lc-accent-ink);border-color:transparent;}\n#lc-host .lc-swatches {display:grid;grid-template-columns:repeat(7,minmax(0,1fr));gap:8px;}\n#lc-host .lc-swatch {width:100%;aspect-ratio:1;border-radius:12px;border:2px solid transparent;background:var(--swatch);box-shadow:inset 0 1px rgba(255,255,255,.4),0 8px 19px #0003;}\n#lc-host .lc-swatch[aria-pressed=\"true\"] {outline:2px solid #fff;outline-offset:2px;transform:scale(.94);}\n#lc-host .lc-field {display:flex;align-items:center;justify-content:space-between;gap:12px;font-size:12px;font-weight:650;color:#e0e5f4;}\n#lc-host .lc-range {display:grid;grid-template-columns:1fr 45px;align-items:center;gap:14px;}\n#lc-host input[type=\"range\"] {width:100%;accent-color:var(--lc-accent);cursor:pointer;}\n#lc-host input[type=\"color\"] {height:33px;width:46px;border-radius:9px;background:#ffffff15;padding:2px;border:1px solid #ffffff38;cursor:pointer;}\n#lc-host output {text-align:right;color:#b6c2dd;font-size:11px;font-variant-numeric:tabular-nums;}\n#lc-host .lc-divider {border:0;border-top:1px solid #ffffff17;margin:0;}\n#lc-host .lc-row {display:flex;align-items:center;justify-content:space-between;gap:12px;}\n#lc-host .lc-row label {font-size:12px;}\n#lc-host input[type=\"checkbox\"] {width:18px;height:18px;accent-color:var(--lc-accent);cursor:pointer;}\n#lc-host .lc-reset {background:transparent;color:#c8d0e4;border:1px solid #ffffff29;padding:12px;border-radius:11px;}\n#lc-host .lc-reset:hover {background:#ffffff12;}\n#lc-host .lc-footer {padding:15px 26px;border-top:1px solid #ffffff15;color:#8e9bb7;font-size:10px;display:flex;justify-content:space-between;}\n#lc-host :is(button,input):focus-visible {outline:2px solid var(--lc-accent);outline-offset:3px;}\n#lc-launch {position:fixed;right:11px;top:51%;transform:translateY(-50%);z-index:2147482900;display:grid;place-items:center;\n  width:35px;height:48px;background:linear-gradient(160deg,#f5f7ff,#9da7bf 53%,#5d6c91);border:1px solid #fff6;border-radius:13px 4px 4px 13px;\n  box-shadow:0 8px 24px #0008;color:#111525;opacity:.55;cursor:pointer;font-size:20px;transition:opacity .2s,width .2s;}\n#lc-launch:hover,#lc-launch:focus-visible {opacity:1;width:44px;}\n@media(max-width:650px){#lc-host .lc-panel{inset:0;width:100%;border-radius:0;}#lc-host .lc-body{padding:16px 21px;}#lc-launch{top:40%;}}\n@media(prefers-reduced-motion:reduce){#lc-host .lc-scrim,#lc-host .lc-panel{transition:none;}}\n";
  const KEY = 'liquidchrome:settings:v2';
  const KEY_OLD = 'liquidchrome:settings:v1';
  const ROOT = document.documentElement;
  const DEFAULTS = Object.freeze({
    accentMode:'scheme', customAccent:'#bcb5ff', finish:'liquid',
    opacity:82, blur:23, radius:19, glow:48, shine:67,
    density:'comfortable', motion:true, launcher:true
  });
  const COLORS = Object.freeze({
    Pearl:'#d9dff7', Glacier:'#82d8ee', Lilac:'#bcb5ff',
    Orchid:'#db9dff', Aurora:'#79e8c9', Molten:'#ffb187', Rose:'#f1a4c9'
  });
  const LIMITS = Object.freeze({
    opacity:[38,96],blur:[0,46],radius:[8,34],glow:[0,100],shine:[0,100]
  });
  const clamp = (n,low,high) => Math.max(low,Math.min(high,Number.isFinite(+n)?+n:low));
  const validHex = x => typeof x==='string' && /^#[a-f0-9]{6}$/i.test(x);
  const hexRgb = hex => [1,3,5].map(i=>parseInt(hex.slice(i,i+2),16));
  const rgbHex = a => '#'+a.map(n=>Math.round(clamp(n,0,255)).toString(16).padStart(2,'0'));
  const luminance = hexRgb => hexRgb.map(v=>{let x=v/255;return x<=.04045?x/12.92:((x+.055)/1.055)**2.4;}).reduce((s,n,i)=>s+n*[.2126,.7152,.0722][i],0);
  const mix = (hex1,hex2,part) => rgbHex(hexRgb(hex1).map((n,i)=>n*(1-part)+hexRgb(hex2)[i]*part));
  const hexFromString = raw => {
    if (validHex(raw)) return raw.toLowerCase();
    if (/^[a-f0-9]{6}$/i.test(raw||'')) return '#'+String(raw).toLowerCase();
    if (/^#[a-f0-9]{3}$/i.test(raw||'')) return '#'+raw.slice(1).split('').map(x=>x+x).join('').toLowerCase();
    const rgb=String(raw||'').match(/^rgba?\(\s*(\d+)\s*[, ]\s*(\d+)\s*[, ]\s*(\d+)/i);
    return rgb ? rgbHex(rgb.slice(1).map(Number)) : null;
  };
  function safeAlbumColor(raw) {
    const hex=hexFromString(raw);if(!hex)return null;
    const l=luminance(hexRgb(hex));
    // Lift black album covers so an accent remains visible on charcoal.
    return l<.14?mix(hex,'#e2e9fc',.43):l>.70?mix(hex,'#657ca9',.20):hex;
  }
  function safeRead(key) {try{return JSON.parse(localStorage.getItem(key)||'null');}catch{return null;}}
  function normalize(data) {
    const result={...DEFAULTS};
    if(data && typeof data==='object') {
      for(const name of Object.keys(DEFAULTS))if(Object.hasOwn(data,name))result[name]=data[name];
    }
    for(const [key,range] of Object.entries(LIMITS))result[key]=clamp(result[key],...range);
    if(result.finish==='matte')result.finish='satin';
    if(result.density==='normal')result.density='comfortable';
    if(!['scheme','album','custom'].includes(result.accentMode))result.accentMode='scheme';
    if(!['liquid','mirror','satin','obsidian'].includes(result.finish))result.finish='liquid';
    if(!['comfortable','compact'].includes(result.density))result.density='comfortable';
    if(!validHex(result.customAccent))result.customAccent=DEFAULTS.customAccent;
    result.motion=Boolean(result.motion);result.launcher=Boolean(result.launcher);
    return result;
  }
  let state=normalize(safeRead(KEY)||safeRead(KEY_OLD));
  const live={panel:null,launcher:null,previousFocus:null,albumColor:null,albumUri:null,sequence:0,attached:false};
  function writeCSSVariable(name,value){ROOT.style.setProperty(name,String(value),'important');}
  function ensureThemeStyles() {
    if(getComputedStyle(ROOT).getPropertyValue('--lc-theme-ready').trim()==='1')return;
    if(document.getElementById('liquidchrome-css-fallback'))return;
    const style=document.createElement('style');style.id='liquidchrome-css-fallback';style.textContent=FALLBACK_CSS;
    (document.head||document.documentElement).append(style);
  }
  function schemeAccent() {
    const raw=getComputedStyle(ROOT).getPropertyValue('--spice-button').trim();
    return hexFromString(raw) || DEFAULTS.customAccent;
  }
  function apply() {
    ensureThemeStyles();
    ROOT.dataset.lcVersion='2';
    ROOT.dataset.lcFinish=state.finish;
    ROOT.dataset.lcDensity=state.density==='compact'?'compact':'comfortable';
    ROOT.dataset.lcMotion=state.motion?'on':'off';
    writeCSSVariable('--lc-glass',(state.opacity/100).toFixed(2));
    writeCSSVariable('--lc-blur',state.blur+'px');
    writeCSSVariable('--lc-radius',state.radius+'px');
    writeCSSVariable('--lc-glow',(state.glow/100).toFixed(2));
    writeCSSVariable('--lc-shine',(state.shine/100).toFixed(2));
    const color=(state.accentMode==='album' ? live.albumColor : state.accentMode==='custom' ? state.customAccent : schemeAccent()) || state.customAccent;
    const normalized=hexFromString(color)||DEFAULTS.customAccent;
    const rgb=hexRgb(normalized);
    writeCSSVariable('--lc-accent',normalized);
    writeCSSVariable('--lc-accent-rgb',rgb.join(','));
    writeCSSVariable('--lc-accent-ink',luminance(rgb)>.35?'#0a1020':'#f7faff');
    if(live.launcher)live.launcher.hidden=!state.launcher;
    updatePanel();
  }
  function persist(){try{localStorage.setItem(KEY,JSON.stringify(state));}catch{/* visual changes still work */}}
  function update(partial) {
    state=normalize({...state,...partial});
    persist();apply();
    if(partial.accentMode==='album') updateAlbum();
  }
  async function updateAlbum() {
    if(state.accentMode!=='album')return;
    const S=window.Spicetify;
    const uri=S?.Player?.data?.item?.uri;
    if(!uri || typeof S?.colorExtractor!=='function')return;
    const token=++live.sequence;
    if(uri===live.albumUri && live.albumColor){apply();return;}
    try {
      const colors=await S.colorExtractor(uri);
      if(token!==live.sequence || state.accentMode!=='album' || S.Player?.data?.item?.uri!==uri)return;
      const chosen=colors?.VIBRANT_NON_ALARMING || colors?.VIBRANT || colors?.LIGHT_VIBRANT || colors?.PROMINENT;
      const resolved=safeAlbumColor(chosen);
      if(resolved){live.albumUri=uri;live.albumColor=resolved;apply();}
    } catch(err) {console.debug('[Liquid Chrome] Album color unavailable',err);}
  }
  const chip = (text,field,value) => `<button type="button" class="lc-chip" data-field="${field}" data-value="${value}" aria-pressed="false">${text}</button>`;
  const slider = (text,field,min,max,unit) => `<div class="lc-section"><div class="lc-field"><label for="lc-${field}">${text}</label><output id="lc-out-${field}"></output></div><div class="lc-range"><input type="range" id="lc-${field}" data-field="${field}" min="${min}" max="${max}" step="1"/><span class="lc-sub">${unit}</span></div></div>`;
  function markup() {return `<div class="lc-scrim" data-action="close"></div>
    <section class="lc-panel" role="dialog" aria-modal="true" aria-label="Liquid Chrome Studio" id="lc-dialog" tabindex="-1">
      <header class="lc-header"><div><div class="lc-overline">MATERIAL DESIGN SYSTEM / V2</div><h2>LIQUID CHROME<i>.</i></h2></div>
      <button class="lc-close" type="button" aria-label="Close customizer" data-action="close">×</button></header>
      <div class="lc-body">
        <div class="lc-live"><div><strong>Live material preview</strong><br/><small id="lc-status">Changes apply immediately</small></div><div class="lc-orb" aria-hidden="true"></div></div>
        <section class="lc-section"><div class="lc-caption">01 / Chromatic signature</div>
          <div class="lc-swatches">${Object.entries(COLORS).map(([name,c])=>`<button type="button" class="lc-swatch" title="${name}" aria-label="${name} accent" data-palette="${name}" style="--swatch:${c}" aria-pressed="false"></button>`).join('')}</div>
          <div class="lc-chiprow">${chip('Theme colors','accentMode','scheme')}${chip('Album-reactive','accentMode','album')}${chip('Custom','accentMode','custom')}</div>
          <div class="lc-field"><label for="lc-customAccent">Custom accent</label><input type="color" id="lc-customAccent" data-field="customAccent"/></div>
          <div class="lc-sub">Album mode follows Spotify artwork when a track color is available. Otherwise your custom accent is used.</div>
        </section><hr class="lc-divider"/>
        <section class="lc-section"><div class="lc-caption">02 / Surface finish</div><div class="lc-chiprow">
          ${chip('Liquid','finish','liquid')}${chip('Mirror','finish','mirror')}${chip('Satin','finish','satin')}${chip('Obsidian','finish','obsidian')}</div></section>
        ${slider('Glass opacity','opacity',38,96,'%')}
        ${slider('Backdrop blur','blur',0,46,'px')}
        ${slider('Corner radius','radius',8,34,'px')}
        ${slider('Ambient glow','glow',0,100,'%')}
        ${slider('Chrome reflection','shine',0,100,'%')}
        <hr class="lc-divider"/>
        <section class="lc-section"><div class="lc-caption">03 / Interaction</div>
          <div class="lc-chiprow">${chip('Comfortable','density','comfortable')}${chip('Compact','density','compact')}</div>
          <div class="lc-row"><label for="lc-motion">Ambient motion</label><input type="checkbox" id="lc-motion" data-field="motion"/></div>
          <div class="lc-row"><label for="lc-launcher-toggle">Show edge launcher</label><input type="checkbox" id="lc-launcher-toggle" data-field="launcher"/></div>
        </section><button type="button" class="lc-reset" data-action="reset">Reset all to defaults</button>
        <p class="lc-sub">Keyboard: Alt + Shift + C. Settings remain on this device. Nothing is uploaded.</p>
      </div><div class="lc-footer"><span>LIQUID CHROME / STUDIO</span><span>02.00</span></div>
    </section>`;}
  function createPanel() {
    if(live.panel)return;
    const el=document.createElement('div');el.id='lc-host';el.innerHTML=markup();
    document.body.append(el);live.panel=el;
    el.addEventListener('click',event=>{
      const action=event.target.closest('[data-action]');
      if(action?.dataset.action==='close')closePanel();
      if(action?.dataset.action==='reset') {live.albumColor=null;live.albumUri=null;update({...DEFAULTS});}
      const sw=event.target.closest('[data-palette]');
      if(sw)update({accentMode:'custom',customAccent:COLORS[sw.dataset.palette]});
      const btn=event.target.closest('button.lc-chip');
      if(btn)update({[btn.dataset.field]:btn.dataset.value});
    });
    el.addEventListener('input',event=>{
      const field=event.target.dataset?.field;if(!field)return;
      const element=event.target;
      if(field==='customAccent')update({customAccent:element.value,accentMode:'custom'});
      else if(field==='motion'||field==='launcher')update({[field]:element.checked});
      else if(Object.hasOwn(LIMITS,field))update({[field]:Number(element.value)});
    });
    updatePanel();
  }
  function updatePanel() {
    if(!live.panel)return;
    const host=live.panel;
    for(const el of host.querySelectorAll('.lc-chip'))el.setAttribute('aria-pressed',String(state[el.dataset.field]===el.dataset.value));
    for(const el of host.querySelectorAll('.lc-swatch'))el.setAttribute('aria-pressed',String(state.accentMode==='custom'&&COLORS[el.dataset.palette]?.toLowerCase()===state.customAccent.toLowerCase()));
    for(const field of Object.keys(LIMITS)){
      const input=host.querySelector('#lc-'+field);if(input)input.value=state[field];
      const output=host.querySelector('#lc-out-'+field);if(output)output.textContent=state[field]+(['blur','radius'].includes(field)?'px':'%');
    }
    const custom=host.querySelector('#lc-customAccent');if(custom)custom.value=state.customAccent;
    const motion=host.querySelector('#lc-motion');if(motion)motion.checked=state.motion;
    const launcher=host.querySelector('#lc-launcher-toggle');if(launcher)launcher.checked=state.launcher;
    const status=host.querySelector('#lc-status');if(status)status.textContent=state.accentMode==='album'?(live.albumColor?'Album color active':'Waiting for track color'):'Changes apply immediately';
  }
  function openPanel(){createPanel();live.previousFocus=document.activeElement;live.panel.classList.add('lc-open');live.panel.querySelector('#lc-dialog').focus();}
  function closePanel(){live.panel?.classList.remove('lc-open');if(live.previousFocus?.isConnected)live.previousFocus.focus?.();live.previousFocus=null;}
  function toggle(){if(live.panel?.classList.contains('lc-open'))closePanel();else openPanel();}
  function createLauncher() {
    if(document.getElementById('lc-launch')){live.launcher=document.getElementById('lc-launch');return;}
    const b=document.createElement('button');b.type='button';b.id='lc-launch';b.title='Liquid Chrome Studio · Alt+Shift+C';b.setAttribute('aria-label','Open Liquid Chrome appearance settings');b.textContent='✦';
    document.body.append(b);b.addEventListener('click',openPanel);live.launcher=b;
  }
  function registerSpotify() {
    if(live.attached)return true;
    const S=window.Spicetify;
    if(!S?.Menu?.Item || !S?.Player)return false;
    try {
      new S.Menu.Item('Liquid Chrome · Studio',false,openPanel).register();
      S.Player.addEventListener?.('songchange',()=>{live.albumUri=null;updateAlbum();});
      live.attached=true;updateAlbum();return true;
    }catch(error){console.debug('[Liquid Chrome] Spotify integration deferred',error);return false;}
  }
  function onKey(event) {
    if(event.altKey&&event.shiftKey&&event.code==='KeyC') {event.preventDefault();toggle();}
    if(event.key==='Escape'&&live.panel?.classList.contains('lc-open')) {event.stopPropagation();closePanel();}
    if(event.key==='Tab'&&live.panel?.classList.contains('lc-open')){
      const controls=[...live.panel.querySelectorAll('button:not([disabled]),input:not([disabled])')];
      const first=controls[0],last=controls[controls.length-1];if(!first)return;
      if(event.shiftKey&&(document.activeElement===first||document.activeElement?.id==='lc-dialog')) {event.preventDefault();last.focus();}
      else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus();}
    }
  }
  function init() {
    ensureThemeStyles();createLauncher();apply();document.addEventListener('keydown',onKey,true);
    if(!registerSpotify()){
      let attempts=0;
      const retry=setInterval(()=>{if(registerSpotify()||++attempts>=60)clearInterval(retry);},500);
    }
  }
  window.LiquidChrome={version:VERSION,openSettings:openPanel,closeSettings:closePanel,
    applySettings:apply,getSettings:()=>({...state}),setSettings:update,
    reset:()=>{live.albumColor=null;update({...DEFAULTS});}};
  if(document.body)init();else document.addEventListener('DOMContentLoaded',init,{once:true});
})();
