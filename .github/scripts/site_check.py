"""Daily site check for decisionarypro.com (standard library only, no tracking: plain HTTP, no JS).
- Every page in sitemap.xml + robots.txt, llms.txt, sitemap.xml must answer 200 and have a <title>.
- Every same-site link, script, stylesheet and image on those pages must answer 200.
- Every page's og:image must answer 200.
Extra sites (e.g. the AI model schedule once it is live): EXTRA_URLS="https://a/ https://b/".
Exit code 1 when anything fails, so GitHub emails the repo owner. Summary goes to stdout and the Actions summary.
Usage: python3 .github/scripts/site_check.py [base_url]"""
import os, re, sys, urllib.request, urllib.error, urllib.parse
from concurrent.futures import ThreadPoolExecutor

BASE = (sys.argv[1] if len(sys.argv) > 1 else 'https://decisionarypro.com').rstrip('/')
HOST = urllib.parse.urlparse(BASE).netloc
UA = {'User-Agent': 'decisionary-site-check'}

def fetch(url, body=True):
    try:
        req = urllib.request.Request(url, headers=UA, method='GET')
        with urllib.request.urlopen(req, timeout=20) as r:
            return r.status, (r.read().decode('utf-8', 'replace') if body else '')
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
    fails, assets, ogs = [], set(), set()

    with ThreadPoolExecutor(8) as ex:
        results = list(ex.map(lambda u: (u, *fetch(u)), pages + extra))
    for url, code, html in results:
        if code != 200:
            fails.append(('page', url, code)); continue
        if url.endswith('/') or url.endswith('.html'):
            if not re.search(r'<title>\s*[^<\s]', html): fails.append(('no title', url, ''))
            for m in re.finditer(r'<meta[^>]+property="og:image"[^>]+content="([^"]+)"', html): ogs.add(m.group(1))
            for m in re.finditer(r'(?:href|src)="([^"#]+)', html):
                link = urllib.parse.urljoin(url, m.group(1))
                p = urllib.parse.urlparse(link)
                if p.scheme in ('http', 'https') and p.netloc == HOST:
                    assets.add(p._replace(query='', fragment='').geturl())
    checks = sorted((assets | ogs | set(fixed)) - set(pages))
    with ThreadPoolExecutor(8) as ex:
        for url, code in ex.map(lambda u: (u, fetch(u, body=False)[0]), checks):
            if code != 200: fails.append(('og:image' if url in ogs else 'link', url, code))

    lines = ['## Site check: %s' % BASE, '',
             '- pages: %d, links/assets: %d, og images: %d' % (len(pages) + len(extra), len(checks), len(ogs)),
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
