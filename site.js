(function () {
  'use strict';

  var LANGS = ['en', 'ko', 'ja', 'zh-Hans', 'zh-Hant', 'vi', 'th', 'id', 'ms'];
  var NAMES = { en: 'English', ko: '한국어', ja: '日本語', 'zh-Hans': '简体中文', 'zh-Hant': '繁體中文', vi: 'Tiếng Việt', th: 'ไทย', id: 'Bahasa Indonesia', ms: 'Bahasa Melayu' };
  var CJK = ['ko', 'ja', 'zh-Hans', 'zh-Hant'];
  var STORE = 'decisionary-lang';
  var MAIL = 'hello@decisionarypro.com';
  // inquiry forms on Tally; languages without their own form use the English one
  var FORMS = { ko: 'https://tally.so/r/2jXGag', ja: 'https://tally.so/r/q5L1D8', en: 'https://tally.so/r/Nqr1lN' };
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
  var cache = {};
  function tr(k) { return Object.prototype.hasOwnProperty.call(dict, k) ? dict[k] : (EN[k] != null ? EN[k] : ''); }

  function preferred() {
    var q = new URLSearchParams(location.search).get('lang');
    if (LANGS.indexOf(q) > -1) return q;
    try { var s = localStorage.getItem(STORE); if (LANGS.indexOf(s) > -1) return s; } catch (e) {}
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

  // ---------- state for interactive blocks ----------
  var who = 'business';

  function mailto(subject) { return 'mailto:' + MAIL + '?subject=' + encodeURIComponent(subject); }

  function renderDynamic() {
    stopFx();
    // case buttons open the inquiry form; the hidden "case" field records which case it came from
    $$('[data-form-case]').forEach(function (a) {
      var id = a.dataset.formCase;
      a.href = (FORMS[cur] || FORMS.en) + '?case=' + encodeURIComponent(id + ' ' + tr('c' + id + '_ind'));
    });
    $$('[data-form]').forEach(function (a) { a.href = FORMS[cur] || FORMS.en; });
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
  function restore(it) {
    halt(it);
    if (it.full != null) it.el.textContent = it.full;
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
        var p = Math.min(1, (now - start) / 1600);
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
  function startFx() {
    if (fxStarted) return;
    fxStarted = true;
    if (reduceMotion || !('IntersectionObserver' in window)) return;
    $$('.chap-n b, .chap h2, .page-head h1, .cta h2').forEach(function (el) { items.push({ el: el, kind: 'type' }); });
    $$('.fig-n em').forEach(function (el) { items.push({ el: el, kind: 'count' }); });
    items.forEach(function (it) { it.el._fx = it; prime(it); });
    var trigger = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        var it = en.target._fx;
        clearTimeout(it.dwell);
        if (en.isIntersecting) it.dwell = setTimeout(function () { play(it); }, 120);
      });
    }, { rootMargin: '0px 0px -25% 0px', threshold: 0 });
    var leave = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        var it = en.target._fx;
        if (!en.isIntersecting && it.state === 'done') prime(it);
      });
    }, { threshold: 0 });
    items.forEach(function (it) { trigger.observe(it.el); leave.observe(it.el); });
  }

  function apply() {
    stopFx();
    textNodes.forEach(function (n) { n.textContent = tr(n.dataset.i18n); });
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

  function setLang(l, save) {
    if (LANGS.indexOf(l) < 0) l = 'en';
    var done = function () {
      cur = l;
      if (save) { try { localStorage.setItem(STORE, l); } catch (e) {} }
      apply();
      startFx();
    };
    if (l === 'en') { dict = {}; return done(); }
    if (cache[l]) { dict = cache[l]; return done(); }
    fetch('/i18n/' + l + '.json', { cache: 'force-cache' })
      .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
      .then(function (d) { cache[l] = d; dict = d; done(); })
      .catch(function () { dict = {}; l = 'en'; done(); });
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
    $$('[data-lang]').forEach(function (b) {
      b.addEventListener('click', function () { setLang(b.dataset.lang, true); closeLang(); langBtn.focus(); });
    });
  }

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
      if (p) p.scrollIntoView({ block: 'center' });
    });
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
  function showVal(i) {
    val = (i + 5) % 5;
    $$('[data-val]').forEach(function (v) { v.hidden = Number(v.dataset.val) !== val; });
    $$('[data-val-dot]').forEach(function (d) { d.setAttribute('aria-pressed', String(Number(d.dataset.valDot) === val)); });
    var c = $('#val-counter'); if (c) c.textContent = '0' + (val + 1) + ' / 05';
  }
  $$('[data-val-dot]').forEach(function (d) { d.addEventListener('click', function () { showVal(Number(d.dataset.valDot)); }); });
  if ($('#val-prev')) {
    $('#val-prev').addEventListener('click', function () { showVal(val - 1); });
    $('#val-next').addEventListener('click', function () { showVal(val + 1); });
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

  setLang(preferred(), new URLSearchParams(location.search).has('lang'));
})();
