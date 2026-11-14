from pathlib import Path
import json
root=Path(__file__).resolve().parent
css=(root/'LiquidChrome/user.css').read_text(encoding='utf-8')
src=(root/'runtime.template.js').read_text(encoding='utf-8')
built=src.replace('__EMBED_CSS__',json.dumps(css,ensure_ascii=False))
for name in ('LiquidChrome/theme.js','LiquidChrome-Controls.js'):
 (root/name).write_text(built,encoding='utf-8')
print('Wrote runtime to theme.js and LiquidChrome-Controls.js',len(built),'characters')
