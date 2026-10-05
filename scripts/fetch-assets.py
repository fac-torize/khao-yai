"""Optional refresh of verified original photos. Requires network; preserve visible attribution."""
import json, urllib.request
from pathlib import Path
project = Path(__file__).resolve().parent.parent
assets = json.loads((project / 'public/places/image-origins.json').read_text())
for name, url in assets.items():
    request = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    with urllib.request.urlopen(request, timeout=30) as response:
        (project / f'public/places/{name}.jpg').write_bytes(response.read())
