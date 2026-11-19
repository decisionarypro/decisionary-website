"""Daily site check for decisionarypro.com (standard library only, no tracking: plain HTTP, no JS).
- Every page in sitemap.xml + robots.txt, llms.txt, sitemap.xml must answer 200 and have a <title>.
- Every same-site link, script, stylesheet and image on those pages must answer 200.
- Every page's og:image must answer 200.
- Sitemap pages must be indexable, self-canonical and have reciprocal language alternates.
- The three Tally forms and the Cal.com booking page must return their expected page titles.
Extra sites (e.g. the AI model schedule once it is live): EXTRA_URLS="https://a/ https://b/".
Exit code 1 when anything fails, so GitHub emails the repo owner. Summary goes to stdout and the Actions summary.
Usage: python3 .github/scripts/site_check.py [base_url]"""
import os, re, sys, urllib.request, urllib.error, urllib.parse
from concurrent.futures import ThreadPoolExecutor
from html.parser import HTMLParser

BASE = (sys.argv[1] if len(sys.argv) > 1 else 'https://decisionarypro.com').rstrip('/')
HOST = urllib.parse.urlparse(BASE).netloc
UA = {'User-Agent': 'decisionary-site-check'}
CONTACT_PAGES = {
    'https://tally.so/r/Nqr1lN': 'Project inquiry',
    'https://tally.so/r/2jXGag': '프로젝트 문의',
    'https://tally.so/r/q5L1D8': 'プロジェクトのお問い合わせ',
    'https://cal.com/decisionary/project-call': 'Project call',
}


class SearchMetadata(HTMLParser):
    def __init__(self, html):
        super().__init__()
        self.lang = ''
        self.canonicals = []
        self.alternates = []
        self.noindex = False
        self.feed(html)

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == 'html':
            self.lang = attrs.get('lang', '')
        if tag == 'link':
            rel = attrs.get('rel', '').lower().split()
            if 'canonical' in rel:
                self.canonicals.append(attrs.get('href', ''))
            if 'alternate' in rel and 'hreflang' in attrs:
                self.alternates.append((attrs['hreflang'], attrs.get('href', '')))
        if tag == 'meta' and attrs.get('name', '').lower() in {'robots', 'googlebot', 'bingbot', 'yeti'}:
            self.noindex |= blocks_indexing(attrs.get('content', ''))


def blocks_indexing(value):
    return bool(re.search(r'\b(?:noindex|none)\b', value, re.I))


def check_search_metadata(pages, metadata, fails):
    for url, page in metadata.items():
        if page.canonicals != [url]:
            fails.append(('canonical', url, ', '.join(page.canonicals) or 'missing'))
        if page.noindex:
            fails.append(('noindex', url, 'indexing blocked'))
        alternates = dict(page.alternates)
        if len(alternates) != len(page.alternates) or not page.lang or alternates.get(page.lang) != url:
            fails.append(('hreflang', url, 'missing self-reference or repeated language'))
        for lang, target in alternates.items():
            if target not in pages:
                fails.append(('hreflang target', url, target or 'empty URL'))
                continue
            other = metadata.get(target)
            if other and ((lang != 'x-default' and other.lang != lang) or (page.lang, url) not in other.alternates):
                fails.append(('hreflang reciprocal', url, target))


def fetch(url, body=True, check_indexing=False):
    try:
        req = urllib.request.Request(url, headers=UA, method='GET')
        with urllib.request.urlopen(req, timeout=20) as r:
            html = r.read().decode('utf-8', 'replace') if body else ''
            if check_indexing and any(blocks_indexing(header) for header in r.headers.get_all('X-Robots-Tag', [])):
                html += '<meta name="robots" content="noindex">'
            return r.status, html
    except urllib.error.HTTPError as e:
        return e.code, ''
    except Exception as e:
        return 'ERR ' + type(e).__name__, ''

def main():
    st, sm = fetch(BASE + '/sitemap.xml')
    pages = re.findall(r'<loc>([^<]+)</loc>', sm)
    if st != 200 or not pages:
        print('sitemap.xml failed:', st); return 1
    extra = os.environ.get('EXTRA_URLS', '').split()
    fixed = [BASE + '/robots.txt', BASE + '/llms.txt', BASE + '/sitemap.xml']
    fails, assets, ogs, metadata = [], set(), set(), {}
    page_urls = set(pages)

    with ThreadPoolExecutor(8) as ex:
        results = list(ex.map(lambda u: (u, *fetch(u, check_indexing=u in page_urls)), pages + extra))
    for url, code, html in results:
        if code != 200:
            fails.append(('page', url, code)); continue
        if url in page_urls:
            metadata[url] = SearchMetadata(html)
        if url.endswith('/') or url.endswith('.html'):
            if not re.search(r'<title>\s*[^<\s]', html): fails.append(('no title', url, ''))
            for m in re.finditer(r'<meta[^>]+property="og:image"[^>]+content="([^"]+)"', html): ogs.add(m.group(1))
            for m in re.finditer(r'(?:href|src)="([^"#]+)', html):
                link = urllib.parse.urljoin(url, m.group(1))
                p = urllib.parse.urlparse(link)
                if p.scheme in ('http', 'https') and p.netloc == HOST:
                    assets.add(p._replace(query='', fragment='').geturl())
    check_search_metadata(page_urls, metadata, fails)
    checks = sorted((assets | ogs | set(fixed)) - page_urls)
    with ThreadPoolExecutor(8) as ex:
        for url, code in ex.map(lambda u: (u, fetch(u, body=False)[0]), checks):
            if code != 200: fails.append(('og:image' if url in ogs else 'link', url, code))

    with ThreadPoolExecutor(4) as ex:
        for url, code, html in ex.map(lambda u: (u, *fetch(u)), CONTACT_PAGES):
            title = re.search(r'<title[^>]*>(.*?)</title>', html, re.I | re.S)
            if code != 200:
                fails.append(('inquiry or booking', url, code))
            elif not title or CONTACT_PAGES[url].casefold() not in title[1].casefold():
                fails.append(('inquiry or booking', url, 'unexpected page title'))

    lines = ['## Site check: %s' % BASE, '',
             '- pages: %d, links/assets: %d, og images: %d' % (len(pages) + len(extra), len(checks), len(ogs)),
             '- inquiry/booking pages: %d' % len(CONTACT_PAGES),
             '- result: %s' % ('OK' if not fails else '%d problem(s)' % len(fails)), '']
    if fails:
        lines += ['| kind | url | status |', '|---|---|---|'] + ['| %s | %s | %s |' % f for f in fails]
    out = '\n'.join(lines)
    print(out)
    if os.environ.get('GITHUB_STEP_SUMMARY'):
        with open(os.environ['GITHUB_STEP_SUMMARY'], 'a') as f: f.write(out + '\n')
    return 1 if fails else 0

if __name__ == '__main__':
    sys.exit(main())
