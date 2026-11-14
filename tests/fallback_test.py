"""Ensure Marketplace controls extension works when theme CSS/theme.js are NOT injected."""
from pathlib import Path
from playwright.sync_api import sync_playwright
root=Path(__file__).resolve().parents[1]
script=(root/'LiquidChrome-Controls.js').read_text()
mock='''<script>Object.defineProperty(window,'localStorage',{configurable:true,value:{getItem(){return null},setItem(){}}});window.Spicetify={Menu:{Item:class{register(){}}},Player:{data:{item:{uri:'spotify:track:demo'}},addEventListener(){}},colorExtractor:async()=>({VIBRANT:'#f0a1c4'})};</script>'''
html='''<!DOCTYPE html><html><head><style>:root{--spice-main:#070914;--spice-button:#bcb5ff;--spice-text:#eee;}</style>'''+mock+'''</head><body><div class="Root__top-container"><div class="Root__nav-bar">Library</div><div class="Root__main-view">Library screen</div><div class="Root__now-playing-bar">Player</div></div><script>'''+script+'''</script></body></html>'''
with sync_playwright() as p:
 b=p.chromium.launch(headless=True,executable_path='/usr/bin/chromium',args=['--no-sandbox'])
 page=b.new_page();page.set_content(html);page.wait_for_function('window.LiquidChrome?.version === "2.0.0"')
 assert page.locator('#liquidchrome-css-fallback').count()==1
 assert page.locator('#lc-launch').count()==1
 page.click('#lc-launch');assert page.locator('#lc-dialog').is_visible()
 page.locator('#lc-opacity').fill('51');page.wait_for_timeout(410)
 bg=page.evaluate('getComputedStyle(document.querySelector(".Root__main-view")).backgroundColor')
 assert '0.51' in bg,f'Material did not update: {bg}'
 assert page.evaluate('getComputedStyle(document.documentElement).getPropertyValue("--lc-glass").trim()')=='0.51'
 print('EXTENSION-ONLY FALLBACK PASS',bg)
 b.close()
