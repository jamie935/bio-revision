#!/usr/bin/env python3
"""Download exactly the Higher Paper 1 corpus linked by PMT; retain provenance.

The publisher PDFs and extracted text stay in an ignored local cache. We publish
original learning material, source URLs and checksums, not copies of exam papers.
Requires Python 3 and Poppler's pdftotext (no Python package dependencies).
"""
from concurrent.futures import ThreadPoolExecutor
from hashlib import sha256
from html.parser import HTMLParser
from pathlib import Path
from urllib.request import Request, urlopen
from urllib.parse import urljoin, quote
import datetime, json, re, subprocess

ROOT = Path(__file__).resolve().parents[1]
INDEX = 'https://www.physicsandmathstutor.com/past-papers/gcse-physics/edexcel-paper-1/'
CACHE = ROOT / '.source-cache'

class Links(HTMLParser):
    def __init__(self):
        super().__init__(); self.links = []; self.href = None; self.label = ''
    def handle_starttag(self, tag, attrs):
        if tag == 'a': self.href = dict(attrs).get('href'); self.label = ''
    def handle_data(self, data):
        if self.href: self.label += data
    def handle_endtag(self, tag):
        if tag == 'a' and self.href:
            self.links.append((self.label.strip(), urljoin(INDEX, self.href)))
            self.href = None

def get(url):
    return urlopen(Request(quote(url, safe=':/%?=&'), headers={'User-Agent': 'AviPhysicsLearning/1.0 (personal educational research)'}), timeout=90).read()

def download(item):
    label, url = item
    year = re.search(r'20\d{2}', label)
    paper = year.group() if year else 'specimen'
    kind = 'questions' if ' QP ' in label else 'mark-scheme'
    path = CACHE / f'{paper}-{kind}.pdf'
    if not path.exists(): path.write_bytes(get(url))
    data = path.read_bytes()
    if not data.startswith(b'%PDF'): raise ValueError(f'Not a PDF: {url}')
    txt = path.with_suffix('.txt')
    subprocess.run(['pdftotext', '-layout', str(path), str(txt)], check=True)
    text = txt.read_text()
    pages = text.split('\f')
    # Preserve page boundaries so every analysis record can point to the source.
    (CACHE / f'{paper}-{kind}-pages.json').write_text(json.dumps(pages, ensure_ascii=False))
    print(f'{paper} {kind}: {len(pages)-1} pages, {len(data):,} bytes', flush=True)
    return {'paper': paper, 'kind': kind, 'title': label, 'url': url,
            'sha256': sha256(data).hexdigest(), 'bytes': len(data), 'pages': len(pages)-1}

def main():
    CACHE.mkdir(parents=True, exist_ok=True)
    parser = Links(); parser.feed(get(INDEX).decode())
    links = [(label, url) for label, url in parser.links if 'Paper 1 (H)' in label and ('.pdf' in url.lower())]
    links = list(dict.fromkeys(links))
    if len(links) != 18: raise ValueError(f'Corpus changed: expected 18 Higher PDFs; found {len(links)}. Review the index.')
    with ThreadPoolExecutor(max_workers=4) as pool: sources = list(pool.map(download, links))
    for paper in sorted(set(s['paper'] for s in sources)):
        if {s['kind'] for s in sources if s['paper']==paper} != {'questions','mark-scheme'}:
            raise ValueError(f'Missing pair for {paper}')
    manifest = {'indexUrl': INDEX, 'retrievedAt': datetime.datetime.now(datetime.timezone.utc).isoformat(),
                'qualification': 'Pearson Edexcel GCSE Physics 1PH0', 'paperCode': '1PH0/1H',
                'tier': 'Higher', 'durationMinutes': 105, 'marksPerPaper': 100, 'sources': sources}
    (ROOT/'data').mkdir(exist_ok=True)
    (ROOT/'data'/'sources.json').write_text(json.dumps(manifest, ensure_ascii=False, indent=2)+'\n')

if __name__=='__main__': main()
