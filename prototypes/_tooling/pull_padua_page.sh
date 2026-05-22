#!/usr/bin/env bash
# Pull a Padua page's HTML + deduped (largest-resolution) images into a reference folder.
# Usage: pull_padua_page.sh <url-path> <folder-name>
# Example: pull_padua_page.sh /advisers-licensees advisers-licensees

set -e

URL_PATH="$1"
FOLDER="$2"
BASE_URL="https://www.paduasolutions.com"
TARGET="/Users/spencerdavis/Documents/VSC Code/padua-marketing/prototypes/reference/$FOLDER"

mkdir -p "$TARGET/images"
cd "$TARGET"

# 1. Download the HTML
echo "  → Downloading $BASE_URL$URL_PATH"
curl -sL "$BASE_URL$URL_PATH" -o page.html -w "    HTTP %{http_code}, %{size_download}b HTML\n"

# 2. Extract image URLs, dedupe to base resolution (no -p-NNN suffix)
grep -oE 'https?://[^"'"'"' )]+\.(jpg|jpeg|png|webp|svg|gif|ico)' page.html | sort -u > _all_image_urls.txt

# Pick base-resolution version of each image (no -p-NNN before extension).
# For images that ONLY have -p-NNN variants (no base file exists), pick the largest variant.
python3 <<'PYEOF' > _deduped_image_urls.txt
import re
from collections import defaultdict

urls = []
with open('_all_image_urls.txt') as f:
    urls = [l.strip() for l in f if l.strip()]

# Group by image identity (strip -p-NNN before extension)
groups = defaultdict(list)
for url in urls:
    # Get the path part after the last / minus extension
    # e.g. .../652f73fd35a19db1501ac6e4_DSC_1334-p-2600.jpg
    # → identity = .../652f73fd35a19db1501ac6e4_DSC_1334
    m = re.match(r'^(.+?)(-p-\d+)?(\.[a-z]+)$', url, re.I)
    if m:
        identity = m.group(1)
        groups[identity].append(url)

# For each group, prefer the base (no -p suffix); else pick largest -p variant
deduped = []
for identity, variants in groups.items():
    bases = [v for v in variants if not re.search(r'-p-\d+\.', v)]
    if bases:
        deduped.append(bases[0])
    else:
        # No base; pick the largest -p variant
        def size_of(url):
            m = re.search(r'-p-(\d+)\.', url)
            return int(m.group(1)) if m else 0
        largest = max(variants, key=size_of)
        deduped.append(largest)

for u in sorted(deduped):
    print(u)
PYEOF

UNIQUE_COUNT=$(wc -l < _deduped_image_urls.txt | tr -d ' ')
echo "    Found $UNIQUE_COUNT unique images (deduped from $(wc -l < _all_image_urls.txt | tr -d ' '))"

# 3. Download deduped images
while IFS= read -r url; do
  fname=$(basename "${url%%\?*}" | python3 -c "import sys, urllib.parse; print(urllib.parse.unquote(sys.stdin.read().strip()))")
  # Skip if already exists (shared assets across pages)
  if [ -f "images/$fname" ]; then
    continue
  fi
  curl -sL "$url" -o "images/$fname"
done < _deduped_image_urls.txt

# 4. Cleanup temp files
rm _all_image_urls.txt

DOWNLOADED=$(ls images/ | wc -l | tr -d ' ')
TOTAL_SIZE=$(du -sh . 2>/dev/null | cut -f1)
echo "    ✓ $DOWNLOADED images saved, total $TOTAL_SIZE"
