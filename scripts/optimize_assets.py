"""Optimize already-present local artwork. Does not fetch or scrape images.
Run manually with Python + Pillow after adding/replacing authorized source assets.
"""
from pathlib import Path
import json
from PIL import Image
root=Path(__file__).resolve().parents[1]
source=root/'public/images'
output=root/'public/assets/optimized'
output.mkdir(parents=True,exist_ok=True)
report=[]
for path in sorted(source.glob('*.jpg')):
    image=Image.open(path).convert('RGB')
    bound=(2560,1440) if path.stem.startswith('hero') else (900,1200)
    image.thumbnail(bound)
    destination=output/f'{path.stem}.webp'
    image.save(destination,format='WEBP',quality=83,method=6)
    report.append({'id':path.stem,'source':str(path.relative_to(root/'public')),'file':str(destination.relative_to(root/'public')),'width':image.width,'height':image.height,'bytes':destination.stat().st_size})
(output.parent/'manifest.json').write_text(json.dumps(report,indent=2)+'\n')
print(f'{len(report)} local images optimized; {sum(x["bytes"] for x in report):,} bytes.')
