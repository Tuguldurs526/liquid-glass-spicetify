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
  const FALLBACK_CSS = __EMBED_CSS__;
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
