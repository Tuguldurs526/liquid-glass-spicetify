"""Browser regression tests using an in-memory Spotify DOM (network disabled)."""
from pathlib import Path
import re,base64,json
from playwright.sync_api import sync_playwright
ROOT=Path(__file__).resolve().parents[1]
html=(ROOT/'preview/index.html').read_text()
css=(ROOT/'LiquidChrome/user.css').read_text()
js=(ROOT/'LiquidChrome/theme.js').read_text()
html=html.replace('<link rel="stylesheet" href="../LiquidChrome/user.css"/>', '<style>'+css+'</style>')
html=html.replace('<script src="../LiquidChrome/theme.js"></script>', '<script>'+js+'</script>')
for name in ('chrome-souls','aurora','molten','opal','noir','green'):
 img='data:image/jpeg;base64,'+base64.b64encode((ROOT/'assets'/f'{name}.jpg').read_bytes()).decode('ascii')
 html=html.replace('../assets/'+name+'.jpg',img)

def render(page,saved=None):
 store=json.dumps(saved or {}).replace('</','<\\/')
 mock='''<script>window.__testStore=STORE;Object.defineProperty(window,'localStorage',{configurable:true,value:{getItem(k){return this._d[k]??null},setItem(k,v){this._d[k]=v;},_d:window.__testStore}});</script>'''.replace('STORE',store)
 page.set_content(html.replace('</head>',mock+'</head>'),wait_until='load')
 page.wait_for_function('window.LiquidChrome?.version === "2.0.0"')

errors=[]
with sync_playwright() as p:
 browser=p.chromium.launch(headless=True,executable_path='/usr/bin/chromium',args=['--no-sandbox'])
 page=browser.new_page(viewport={'width':1440,'height':900},device_scale_factor=1)
 page.on('pageerror',lambda err: errors.append(str(err)))
 render(page)
 assert page.locator('#lc-launch').is_visible()
 page.click('#open-settings');assert page.locator('#lc-dialog').is_visible();page.screenshot(path=str(ROOT/'screenshots'/'studio.png'),full_page=True)
 def prop(name):return page.evaluate('name => getComputedStyle(document.documentElement).getPropertyValue(name).trim()',name)
 def panel_css(name):return page.evaluate('name => getComputedStyle(document.querySelector(".Root__main-view"))[name]',name)
 print('INITIAL', {'glass':prop('--lc-glass'),'blur':prop('--lc-blur'),'radius':prop('--lc-radius'),'glow':prop('--lc-glow'),'accent':prop('--lc-accent')})
 before_bg=panel_css('backgroundColor')
 page.locator('#lc-opacity').fill('40');page.wait_for_timeout(360);assert prop('--lc-glass')=='0.40';assert panel_css('backgroundColor')!=before_bg,'Opacity did not change rendered material'
 page.locator('#lc-blur').fill('39');page.wait_for_function('getComputedStyle(document.querySelector(".Root__main-view")).backdropFilter.includes("39px")');assert prop('--lc-blur')=='39px'
 page.locator('#lc-radius').fill('29');page.wait_for_function('getComputedStyle(document.querySelector(".Root__main-view")).borderRadius.includes("29px")');assert prop('--lc-radius')=='29px'
 old_ambient=page.evaluate('getComputedStyle(document.querySelector(".Root__top-container")).backgroundImage')
 page.locator('#lc-glow').fill('92');page.wait_for_timeout(360);assert prop('--lc-glow')=='0.92';assert page.evaluate('getComputedStyle(document.querySelector(".Root__top-container")).backgroundImage')!=old_ambient,'Glow background not affected'
 old_border=panel_css('borderTopColor')
 page.locator('#lc-shine').fill('13');page.wait_for_timeout(360);assert prop('--lc-shine')=='0.13';assert panel_css('borderTopColor')!=old_border,'Shine border not affected'
 page.locator('[data-field="finish"][data-value="mirror"]').click();assert page.locator('html').get_attribute('data-lc-finish')=='mirror'
 page.locator('[data-field="accentMode"][data-value="custom"]').click();page.locator('#lc-customAccent').fill('#ff7733');assert prop('--lc-accent')=='#ff7733'
 page.locator('[data-field="density"][data-value="compact"]').click();assert page.locator('html').get_attribute('data-lc-density')=='compact'
 page.locator('#lc-motion').uncheck();assert page.locator('html').get_attribute('data-lc-motion')=='off'
 page.screenshot(path=str(ROOT/'screenshots'/'studio-custom.png'),full_page=True)
 page.locator('[data-action="close"]').last.click();assert not page.locator('#lc-dialog').is_visible()
 saved=page.evaluate('window.__testStore');assert 'liquidchrome:settings:v2' in saved
 # Simulate a restart by rendering into a new isolated page with the same saved settings.
 fresh=browser.new_page(viewport={'width':1440,'height':900},device_scale_factor=1)
 fresh.on('pageerror',lambda err:errors.append(str(err)))
 render(fresh,saved)
 assert fresh.evaluate('getComputedStyle(document.documentElement).getPropertyValue("--lc-accent").trim()')=='#ff7733', 'Accent persistence failed'
 assert fresh.evaluate('getComputedStyle(document.documentElement).getPropertyValue("--lc-glass").trim()')=='0.40', 'Glass persistence failed'
 fresh.keyboard.press('Alt+Shift+c');assert fresh.locator('#lc-dialog').is_visible(), 'Hotkey failed'
 fresh.locator('[data-action="reset"]').click()
 assert fresh.evaluate('getComputedStyle(document.documentElement).getPropertyValue("--lc-glass").trim()')=='0.82','Reset failed'
 fresh.locator('[data-field="accentMode"][data-value="album"]').click()
 fresh.wait_for_timeout(120)
 assert fresh.evaluate('getComputedStyle(document.documentElement).getPropertyValue("--lc-accent").trim()')=='#bcb5ff','Album color failed'
 fresh.locator('[data-action="close"]').last.click();fresh.wait_for_timeout(470);fresh.screenshot(path=str(ROOT/'screenshots'/'desktop.png'),full_page=True)
 print('DESKTOP PASS')
 fresh.set_viewport_size({'width':800,'height':650});fresh.screenshot(path=str(ROOT/'screenshots'/'compact.png'),full_page=True)
 assert fresh.locator('#lc-launch').is_visible()
 fresh.set_viewport_size({'width':480,'height':850});fresh.screenshot(path=str(ROOT/'screenshots'/'narrow.png'),full_page=True)
 fresh.click('#lc-launch');fresh.wait_for_function('document.querySelector("#lc-host").classList.contains("lc-open")');fresh.wait_for_timeout(470);assert fresh.locator('#lc-dialog').is_visible()
 assert fresh.locator('#lc-customAccent').is_visible()
 assert not errors,f'JavaScript errors: {errors}'
 print('ALL BROWSER TESTS PASS')
 browser.close()
