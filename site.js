(function () {
  'use strict';

  var LANGS = ['en', 'ko', 'ja', 'zh-Hans', 'zh-Hant', 'vi', 'th', 'id', 'ms'];
  var NAMES = { en: 'English', ko: '한국어', ja: '日本語', 'zh-Hans': '简体中文', 'zh-Hant': '繁體中文', vi: 'Tiếng Việt', th: 'ไทย', id: 'Bahasa Indonesia', ms: 'Bahasa Melayu' };
  var CJK = ['ko', 'ja', 'zh-Hans', 'zh-Hant'];
  var STORE = 'decisionary-lang';
  var MAIL = 'hello@decisionarypro.com';
  // inquiry forms on Tally; languages without their own form use the English one
  var FORMS = { ko: 'https://tally.so/r/2jXGag', ja: 'https://tally.so/r/q5L1D8', en: 'https://tally.so/r/Nqr1lN' };
  var params = new URLSearchParams(location.search);
  // ?notrack excludes this browser from the visit statistics (Umami reads umami.disabled); ?track turns it back on
  try {
    if (params.has('notrack')) localStorage.setItem('umami.disabled', '1');
    if (params.has('track')) localStorage.removeItem('umami.disabled');
  } catch (e) {}
  // visit source tag (?src=wishket etc.): kept for this tab only and passed to the inquiry form's hidden field
  var SRC_OK = /^[a-z0-9_-]{1,40}$/i;
  var SRC = (function () {
    var v = params.get('src');
    try {
      if (v && SRC_OK.test(v)) sessionStorage.setItem('decisionary-src', v);
      else v = sessionStorage.getItem('decisionary-src');
    } catch (e) {}
    return v && SRC_OK.test(v) ? v : '';
  })();
  function formHref(extra) {
    var q = [];
    if (extra) q.push(extra);
    if (SRC) q.push('src=' + encodeURIComponent(SRC));
    return (FORMS[cur] || FORMS.en) + (q.length ? '?' + q.join('&') : '');
  }
  var root = document.documentElement;
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  // English source text comes from the page itself
  var textNodes = $$('[data-i18n]');
  var ariaNodes = $$('[data-i18n-aria]');
  var EN = {};
  textNodes.forEach(function (n) { if (!(n.dataset.i18n in EN)) EN[n.dataset.i18n] = n.textContent; });
  ariaNodes.forEach(function (n) { if (!(n.dataset.i18nAria in EN)) EN[n.dataset.i18nAria] = n.getAttribute('aria-label'); });
  try { var extra = JSON.parse(($('#i18n-en') || {}).textContent || '{}'); Object.keys(extra).forEach(function (k) { EN[k] = extra[k]; }); } catch (e) {}
  var enTitle = document.title;

  var dict = {};
  var cur = 'en';
  function tr(k) { return Object.prototype.hasOwnProperty.call(dict, k) ? dict[k] : (EN[k] != null ? EN[k] : ''); }

  // ---------- language URLs ----------
  // Each language has its own pages (/ko/, /ja/ ...); English lives at the root and is the default.
  var SLUGS = { en: '', ko: 'ko', ja: 'ja', 'zh-Hans': 'zh-hans', 'zh-Hant': 'zh-hant', vi: 'vi', th: 'th', id: 'id', ms: 'ms' };
  var PAGE_LANG = LANGS.indexOf(root.getAttribute('lang')) > -1 ? root.getAttribute('lang') : 'en';
  function localeUrl(l) {
    var path = location.pathname.replace(/^\/(ko|ja|zh-hans|zh-hant|vi|th|id|ms)(\/|$)/, '/');
    var q = new URLSearchParams(location.search); q.delete('lang');
    var qs = q.toString();
    return (SLUGS[l] ? '/' + SLUGS[l] : '') + path + (qs ? '?' + qs : '') + location.hash;
  }
  function browserLang() {
    var list = navigator.languages || [navigator.language || 'en'];
    for (var i = 0; i < list.length; i++) {
      var v = String(list[i]).toLowerCase();
      if (v.indexOf('zh') === 0) return /(tw|hk|mo|hant)/.test(v) ? 'zh-Hant' : 'zh-Hans';
      var b = v.split('-')[0];
      if (b === 'en') return 'en';
      if (['ko', 'ja', 'vi', 'th', 'id', 'ms'].indexOf(b) > -1) return b;
    }
    return 'en';
  }
  function remember(l) { try { localStorage.setItem(STORE, l); } catch (e) {} }
  // Which language should this visit see? Only explicit choices redirect: ?lang= (old links) or a
  // language the visitor picked before. The browser language never redirects (search engines must see
  // the page as it is); it only offers a hint to switch, further below.
  var SAVED = (function () { var s = null; try { s = localStorage.getItem(STORE); } catch (e) {} return LANGS.indexOf(s) > -1 ? s : null; })();
  var wantLang = (function () {
    var q = params.get('lang');
    if (LANGS.indexOf(q) > -1) { remember(q); return q; }
    if (PAGE_LANG !== 'en') return PAGE_LANG;
    return SAVED || PAGE_LANG;
  })();
  // only redirect to a language this page actually has (its hreflang alternates); pages that exist in
  // fewer languages (service pages, the scope check, 404) stay as they are instead of landing on a missing URL
  var HAS = {};
  Array.prototype.forEach.call(document.querySelectorAll('link[rel="alternate"][hreflang]'), function (l) { HAS[l.getAttribute('hreflang')] = true; });
  if ((wantLang !== PAGE_LANG || params.has('lang')) && HAS[wantLang]) {
    var next = localeUrl(wantLang);
    if (next !== location.pathname + location.search + location.hash) { location.replace(next); return; }
  }

  // ---------- language hint: the browser prefers another language this page has ----------
  var HINT = {
    en: ['This page is also available in English.', 'View in English', 'Close'],
    ko: ['이 페이지는 한국어로도 볼 수 있습니다.', '한국어로 보기', '닫기'],
    ja: ['このページは日本語でもご覧いただけます。', '日本語で見る', '閉じる'],
    'zh-Hans': ['此页面也有简体中文版本。', '查看中文版', '关闭'],
    'zh-Hant': ['此頁面也有繁體中文版本。', '查看中文版', '關閉'],
    vi: ['Trang này có phiên bản tiếng Việt.', 'Xem bằng tiếng Việt', 'Đóng'],
    th: ['หน้านี้มีภาษาไทยด้วย', 'ดูภาษาไทย', 'ปิด'],
    id: ['Halaman ini tersedia dalam Bahasa Indonesia.', 'Lihat dalam Bahasa Indonesia', 'Tutup'],
    ms: ['Halaman ini tersedia dalam Bahasa Melayu.', 'Lihat dalam Bahasa Melayu', 'Tutup']
  };
  (function () {
    var b = browserLang();
    if (SAVED || params.has('lang') || b === PAGE_LANG || !HAS[b] || !HINT[b]) return;
    var t = HINT[b], box = document.createElement('div');
    box.className = 'lang-hint';
    box.setAttribute('role', 'region');
    box.setAttribute('aria-label', t[0]);
    box.lang = b;
    box.innerHTML = '<p>' + t[0] + '</p><a class="lang-hint-go" href="' + localeUrl(b) + '">' + t[1] + '</a>' +
      '<button type="button" class="lang-hint-x" aria-label="' + t[2] + '"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg></button>';
    document.body.appendChild(box);
    box.querySelector('.lang-hint-go').addEventListener('click', function () { remember(b); });
    box.querySelector('.lang-hint-x').addEventListener('click', function () { remember(PAGE_LANG); box.remove(); });
  })();

  // ---------- state for interactive blocks ----------
  var who = params.get('who') === 'agency' ? 'agency' : 'business';

  function mailto(subject) { return 'mailto:' + MAIL + '?subject=' + encodeURIComponent(subject); }

  function renderDynamic() {
    stopFx();
    // case buttons open the inquiry form; the hidden "case" field records which case it came from
    $$('[data-form-case]').forEach(function (a) {
      var id = a.dataset.formCase;
      var label = id === 'scope' ? 'scope-definition' : /^\d+$/.test(id) ? id + ' ' + tr('c' + id + '_ind') : id;
      a.href = formHref('case=' + encodeURIComponent(label));
    });
    $$('[data-form]').forEach(function (a) { a.href = formHref(); });
    $$('[data-who]').forEach(function (b) { b.setAttribute('aria-pressed', String(b.dataset.who === who)); });
    var title = $('#cta-title');
    if (title) {
      var ag = who === 'agency';
      title.textContent = tr(ag ? 'h_ctaAg' : 'h_ctaBiz');
      $('#cta-lede').textContent = tr(ag ? 'h_ctaAgLede' : 'h_ctaBizLede');
      var subject = tr(ag ? 'h_subjAg' : 'h_subjBiz');
      $('#subj').textContent = subject;
      $('#cta-mail').href = mailto(subject);
    }
    var menuBtn = $('#menu-btn');
    if (menuBtn) $('#menu-label').textContent = tr(menuBtn.getAttribute('aria-expanded') === 'true' ? 'h_close' : 'h_menu');
    $$('[data-val-dot]').forEach(function (d) { d.setAttribute('aria-label', tr('h_point') + ' ' + (Number(d.dataset.valDot) + 1)); });
    $$('[data-ref-note]').forEach(function (n) { n.hidden = cur === 'en' || cur === 'ko'; });
    // languages written without spaces leave some hero word slots empty
    $$('.hero h1 .w').forEach(function (w) { w.hidden = !w.textContent.trim(); });
    refreshFx();
  }

  // ---------- motion: typed headings and counting numbers ----------
  // Each heading/number waits (text hidden, number at its start value) until it reaches the
  // upper three quarters of the viewport and stays there briefly, then plays. When it leaves
  // the viewport completely it is reset, so it plays again on the next visit.
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var items = [];
  function graphemes(s) {
    if (window.Intl && Intl.Segmenter) return Array.from(new Intl.Segmenter(cur, { granularity: 'grapheme' }).segment(s), function (x) { return x.segment; });
    return Array.from(s);
  }
  function halt(it) {
    if (it.timer) { clearInterval(it.timer); it.timer = 0; }
    if (it.raf) { cancelAnimationFrame(it.raf); it.raf = 0; }
  }
  // keep the brand name out of browser auto-translation
  function brand(el) {
    var t = el.textContent;
    if (t.indexOf('Decisionary') < 0 || el.children.length) return;
    var parts = t.split('Decisionary');
    el.textContent = '';
    parts.forEach(function (p, i) {
      if (i) { var s = document.createElement('span'); s.setAttribute('translate', 'no'); s.textContent = 'Decisionary'; el.appendChild(s); }
      if (p) el.appendChild(document.createTextNode(p));
    });
  }
  function restore(it) {
    halt(it);
    if (it.full != null) { it.el.textContent = it.full; brand(it.el); }
    if (it.label) { it.el.removeAttribute('aria-label'); it.label = false; }
    it.el.classList.remove('tw-wait');
  }
  function prime(it) {
    halt(it);
    var el = it.el;
    var full = el.textContent;
    it.full = full;
    it.state = 'done';
    if (it.kind === 'type') {
      if (!full.trim()) return;
      if (!el.hasAttribute('aria-label')) { el.setAttribute('aria-label', full); it.label = true; }
      it.on = document.createElement('span');
      it.off = document.createElement('span');
      it.on.className = 'tw-on'; it.off.className = 'tw-off';
      it.on.setAttribute('aria-hidden', 'true'); it.off.setAttribute('aria-hidden', 'true');
      it.off.textContent = full;
      el.textContent = '';
      el.appendChild(it.on); el.appendChild(it.off);
      el.classList.add('tw-wait');
    } else {
      var m = full.match(/^(\D*)(\d+)(.*)$/);
      if (!m) return;
      var prev = el.previousElementSibling ? (el.previousElementSibling.textContent.match(/\d+/) || [])[0] : null;
      it.m = m; it.to = Number(m[2]); it.from = prev ? Number(prev) : 0;
      if (it.to - it.from < 2) return;
      el.textContent = m[1] + it.from + m[3];
    }
    it.state = 'primed';
  }
  function play(it) {
    if (it.state !== 'primed') return;
    it.state = 'running';
    var el = it.el;
    if (it.kind === 'type') {
      el.classList.remove('tw-wait');
      var parts = graphemes(it.full), i = 0;
      var step = Math.max(22, Math.min(60, 1100 / parts.length));
      it.timer = setInterval(function () {
        i++;
        it.on.textContent = parts.slice(0, i).join('');
        it.off.textContent = parts.slice(i).join('');
        if (i >= parts.length) { restore(it); it.state = 'done'; }
      }, step);
    } else {
      var start = 0;
      var tick = function (now) {
        if (!start) start = now;
        var p = Math.min(1, (now - start) / 1100);
        var eased = 1 - Math.pow(1 - p, 3);
        el.textContent = it.m[1] + Math.round(it.from + (it.to - it.from) * eased) + it.m[3];
        if (p < 1) it.raf = requestAnimationFrame(tick); else { it.raf = 0; restore(it); it.state = 'done'; }
      };
      it.raf = requestAnimationFrame(tick);
    }
  }
  // before text changes (language, contact toggle): show final text; waiting items are re-primed afterwards
  function stopFx() {
    items.forEach(function (it) {
      if (it.state === 'running') { restore(it); it.state = 'done'; }
      else if (it.state === 'primed') { restore(it); it.state = 'reprime'; }
    });
  }
  function refreshFx() { items.forEach(function (it) { if (it.state === 'reprime') prime(it); }); }
  var fxStarted = false;
  var FX_EVENTS = ['scroll', 'wheel', 'touchstart', 'pointerdown', 'keydown'];
  function startFx() {
    if (fxStarted) return;
    fxStarted = true;
    if (reduceMotion || !('IntersectionObserver' in window)) return;
    // Nothing is hidden until the visitor first scrolls or interacts, so the page as loaded (and as
    // crawlers that never scroll render it) always shows every heading and number in full.
    var arm = function () {
      FX_EVENTS.forEach(function (t) { window.removeEventListener(t, arm, true); });
      var below = function (el) { return el.getBoundingClientRect().top >= innerHeight * 0.75; };
      $$('.chap-n b, .chap h2, .page-head h1, .cta h2').forEach(function (el) { if (below(el)) items.push({ el: el, kind: 'type' }); });
      $$('.fig-n em').forEach(function (el) { if (below(el)) items.push({ el: el, kind: 'count' }); });
      items.forEach(function (it) { it.el._fx = it; prime(it); });
      var trigger = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          var it = en.target._fx;
          clearTimeout(it.dwell);
          if (en.isIntersecting) it.dwell = setTimeout(function () { play(it); }, 120);
        });
      }, { rootMargin: '0px 0px -25% 0px', threshold: 0 });
      // each effect plays once per visit; scrolling back shows the finished text
      items.forEach(function (it) { trigger.observe(it.el); });
    };
    FX_EVENTS.forEach(function (t) { window.addEventListener(t, arm, { capture: true, passive: true }); });
  }

  function apply() {
    stopFx();
    textNodes.forEach(function (n) { n.textContent = tr(n.dataset.i18n); if (!n._fx) brand(n); });
    ariaNodes.forEach(function (n) { n.setAttribute('aria-label', tr(n.dataset.i18nAria)); });
    var tk = document.body.dataset.titleKey;
    document.title = cur === 'en' ? enTitle : (dict[tk] || enTitle);
    root.lang = cur;
    root.className = root.className.replace(/\b(l-[\w-]+|cjk)\b/g, '').trim();
    root.classList.add('l-' + cur);
    if (CJK.indexOf(cur) > -1) root.classList.add('cjk');
    var name = $('#lang-name');
    if (name) name.textContent = NAMES[cur];
    $$('[data-lang]').forEach(function (b) { b.setAttribute('aria-current', String(b.dataset.lang === cur)); });
    renderDynamic();
  }

  // ---------- language menu ----------
  var langBtn = $('#lang-btn');
  var langList = $('#lang-list');
  function closeLang() { if (langBtn) { langBtn.setAttribute('aria-expanded', 'false'); langList.hidden = true; } }
  if (langBtn) {
    langBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      var open = langBtn.getAttribute('aria-expanded') !== 'true';
      langBtn.setAttribute('aria-expanded', String(open));
      langList.hidden = !open;
      closeMenu();
      if (open) { var c = $('[aria-current="true"]', langList); if (c) c.focus(); }
    });
  }
  // language links (footer) go to the other language's URL; remember the choice for root visits
  $$('[data-lang]').forEach(function (a) {
    a.addEventListener('click', function () { remember(a.dataset.lang); });
  });

  // ---------- menu overlay ----------
  var menuBtn = $('#menu-btn');
  var overlay = $('#overlay');
  function closeMenu() { if (menuBtn && menuBtn.getAttribute('aria-expanded') === 'true') { menuBtn.setAttribute('aria-expanded', 'false'); overlay.hidden = true; renderDynamic(); } }
  if (menuBtn) {
    menuBtn.addEventListener('click', function () {
      var open = menuBtn.getAttribute('aria-expanded') !== 'true';
      menuBtn.setAttribute('aria-expanded', String(open));
      overlay.hidden = !open;
      closeLang();
      renderDynamic();
    });
    $$('a', overlay).forEach(function (a) { a.addEventListener('click', closeMenu); });
  }
  document.addEventListener('click', function (e) { if (langList && !langList.hidden && !e.target.closest('.lsel')) closeLang(); });
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    if (langList && !langList.hidden) { closeLang(); langBtn.focus(); }
    else if (overlay && !overlay.hidden) { closeMenu(); menuBtn.focus(); }
  });

  // ---------- case cells and detail panels ----------
  function openCase(id, toggle) {
    $$('[data-case]').forEach(function (c) {
      var on = c.dataset.case === id && !(toggle && c.getAttribute('aria-expanded') === 'true');
      c.setAttribute('aria-expanded', String(on));
    });
    $$('[data-case-panel]').forEach(function (p) {
      var cell = $('[data-case="' + p.dataset.casePanel + '"]');
      p.hidden = !cell || cell.getAttribute('aria-expanded') !== 'true';
    });
  }
  $$('[data-case]').forEach(function (c) { c.addEventListener('click', function () { openCase(c.dataset.case, true); }); });
  $$('[data-open-case]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      e.preventDefault();
      openCase(a.dataset.openCase, false);
      var p = $('#case-panel-' + a.dataset.openCase);
      if (p) p.scrollIntoView({ block: 'center', behavior: scrollMode(e) });
    });
  });

  // ---------- in-page links ----------
  // Smooth scrolling only for pointer clicks. Keyboard activation (event.detail 0),
  // the skip link and reduced-motion users jump instantly.
  function scrollMode(e) { return reduceMotion || (e && e.detail === 0) ? 'auto' : 'smooth'; }
  document.addEventListener('click', function (e) {
    var a = e.target.closest('a[href*="#"]');
    if (!a || e.defaultPrevented || a.classList.contains('skip-link')) return;
    var url = new URL(a.href, location.href);
    if (url.origin !== location.origin || url.pathname !== location.pathname || url.hash.length < 2) return;
    var target = document.getElementById(decodeURIComponent(url.hash.slice(1)));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: scrollMode(e) });
    history.pushState(null, '', url.hash);
  });

  // ---------- roles rings ----------
  var ring = 2;
  function showRing(i) {
    ring = (i + 3) % 3;
    $$('[data-ring]').forEach(function (b) { b.setAttribute('aria-pressed', String(Number(b.dataset.ring) === ring)); });
    $$('[data-ring-vis]').forEach(function (r) { r.classList.toggle('on', Number(r.dataset.ringVis) === ring); });
    $$('[data-ring-body]').forEach(function (b) { b.hidden = Number(b.dataset.ringBody) !== ring; });
    var l = $('#r3-label'); if (l) l.classList.toggle('on', ring === 2);
    var c = $('#ring-counter'); if (c) c.textContent = '0' + (ring + 1) + ' / 03';
  }
  $$('[data-ring]').forEach(function (b) { b.addEventListener('click', function () { showRing(Number(b.dataset.ring)); }); });
  if ($('#ring-prev')) {
    $('#ring-prev').addEventListener('click', function () { showRing(ring - 1); });
    $('#ring-next').addEventListener('click', function () { showRing(ring + 1); });
  }

  // ---------- before-we-start carousel ----------
  var val = 0;
  function showVal(i, dir) {
    var next = (i + 5) % 5;
    // slide in from the side the user moved toward (dots: compare positions)
    dir = dir || (next > val ? 'next' : 'prev');
    val = next;
    $$('[data-val]').forEach(function (v) {
      v.hidden = Number(v.dataset.val) !== val;
      if (!v.hidden) v.dataset.dir = dir;
    });
    $$('[data-val-dot]').forEach(function (d) { d.setAttribute('aria-pressed', String(Number(d.dataset.valDot) === val)); });
    var c = $('#val-counter'); if (c) c.textContent = '0' + (val + 1) + ' / 05';
  }
  $$('[data-val-dot]').forEach(function (d) { d.addEventListener('click', function () { showVal(Number(d.dataset.valDot)); }); });
  if ($('#val-prev')) {
    $('#val-prev').addEventListener('click', function () { showVal(val - 1, 'prev'); });
    $('#val-next').addEventListener('click', function () { showVal(val + 1, 'next'); });
  }

  // ---------- contact: business or agency ----------
  $$('[data-who]').forEach(function (b) {
    b.addEventListener('click', function () {
      stopFx();
      who = b.dataset.who;
      $$('[data-who]').forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); });
      renderDynamic();
    });
  });

  // ---------- phone CTA bar: shown between the hero and the contact section ----------
  var mcta = $('.m-cta');
  if (mcta && 'IntersectionObserver' in window) {
    // hide only while the contact section's own form button is on screen, not for the whole section
    var heroEl = $('.hero'), contactEl = $('#contact .fit [data-form]') || $('#contact'), seen = { hero: true, contact: false };
    var barIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { seen[en.target === heroEl ? 'hero' : 'contact'] = en.isIntersecting; });
      var on = !seen.hero && !seen.contact;
      document.body.classList.toggle('mcta-on', on);
      mcta.setAttribute('aria-hidden', String(!on));
      mcta.tabIndex = on ? 0 : -1;
    });
    if (heroEl) barIO.observe(heroEl);
    if (contactEl) barIO.observe(contactEl);
  }

  // ---------- visit statistics (Umami, cookie-free; no personal data in any value) ----------
  var LOCS = [['.sc', 'tool'], ['.m-cta', 'mobile-bar'], ['.hdr', 'header'], ['.overlay', 'menu'], ['.hero', 'hero'], ['.page-head', 'top'],
    ['.scope-sec', 'scope'], ['[data-case-panel]', 'case'], ['.cs-act', 'case'], ['.lp-body', 'body'], ['#contact', 'contact'], ['.foot', 'footer']];
  function where(el) {
    for (var i = 0; i < LOCS.length; i++) if (el.closest(LOCS[i][0])) return LOCS[i][1];
    return 'other';
  }
  function track(name, data) {
    try { if (window.umami && typeof window.umami.track === 'function') window.umami.track(name, data); } catch (e) {}
  }
  document.addEventListener('click', function (e) {
    var el = e.target.closest('a, button');
    if (!el) return;
    if (el.matches('[data-form], [data-form-case]')) {
      track('inquiry_click', { location: where(el), case: el.dataset.formCase || '', src: SRC || 'none' });
    } else if (el.matches('a[href^="https://cal.com/"]')) {
      track('booking_click', { location: where(el) });
    } else if (el.matches('a[href^="mailto:"]')) {
      track('email_click', { location: where(el) });
    } else if (el.matches('[data-who]')) {
      track('audience_toggle', { who: el.dataset.who });
    } else if (el.matches('[data-open-case]')) {
      track('case_open', { case: el.dataset.openCase, from: 'figure' });
    } else if (el.matches('[data-case]') && el.getAttribute('aria-expanded') === 'true') {
      // the cell's own handler has just opened it
      track('case_open', { case: el.dataset.case, from: 'tab' });
    } else if (el.matches('a[href$="scope-check.html"]')) {
      track('tool_entry_click', { tool: 'scope-check', location: where(el) });
    } else if (el.matches('[data-lang]')) {
      track('language_select', { to: el.dataset.lang, from: PAGE_LANG });
    }
  });

  // the page is already rendered in its language; wire up dynamic text and effects
  cur = PAGE_LANG;
  dict = {};
  apply();
  startFx();
})();
