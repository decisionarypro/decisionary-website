/* Scope check tool: one question at a time, then a risk score and the 3 things to settle first.
   Text and links for the page language come from <script id="sc-data">. Answers stay in the page;
   only the score and answer digits travel with the inquiry form and the cookie-free statistics. */
(function () {
  var root = document.getElementById('sc');
  var dataEl = document.getElementById('sc-data');
  if (!root || !dataEl) return;
  var D = JSON.parse(dataEl.textContent), L = D.t, lang = D.lang;
  var stage = document.getElementById('sc-stage');

  // risk points per answer: 0 = settled, 1 = partly, 2 = open
  var META = [
    { cat: 0 }, { cat: 0 }, { cat: 1 }, { cat: 2 }, { cat: 2, skipIf: { q: 3, v: 0 } },
    { cat: 2 }, { cat: 3 }, { cat: 4 }, { cat: 4 }, { cat: 4 }
  ];
  var BAND_MAX = [30, 60, 100], BAND_KEY = ['low', 'mid', 'high'];
  // shape as well as color, so the level reads at a glance and without color
  var ICON = {
    low: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>',
    mid: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7.5v5.5M12 16.5v.01"/></svg>',
    high: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3.5l9.5 16.5h-19z"/><path d="M12 10v4.5M12 17.5v.01"/></svg>'
  };
  var CHECK = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>';
  var ans = META.map(function () { return null; });
  var step = 0, advancing = null, tracked = false;
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  // visit source (?src=…): read when needed, because site.js stores it after this script has run
  function getSrc() {
    var ok = /^[a-z0-9_-]{1,40}$/i, v = new URLSearchParams(location.search).get('src');
    if (v && ok.test(v)) return v;
    try { v = sessionStorage.getItem('decisionary-src'); } catch (e) { v = ''; }
    return v && ok.test(v) ? v : '';
  }

  function track(name, data) { try { if (window.umami && window.umami.track) window.umami.track(name, data); } catch (e) {} }
  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
  function fmt(s, o) { return s.replace(/\{(\w+)\}/g, function (_, k) { return o[k]; }); }
  // a question is skipped when it does not apply (API docs when there is no integration)
  function skipped(i) { var s = META[i].skipIf; return !!s && ans[s.q] === s.v; }
  function steps() { return META.map(function (_, i) { return i; }).filter(function (i) { return !skipped(i); }); }

  // ---- internal report (copy as text / save as PDF). Everything is built in the page; nothing is sent. ----
  var projName = '';
  function strip(s) { return String(s).replace(/<br\s*\/?>/gi, ' ').replace(/<[^>]+>/g, ''); }
  function today() {
    var d = new Date(), p = function (n) { return (n < 10 ? '0' : '') + n; };
    return d.getFullYear() + '-' + p(d.getMonth() + 1) + '-' + p(d.getDate());
  }
  // a report that travels inside a company links back with its own source tag
  // a result link: the answer digits ride after #, which browsers never send to the server
  function resultUrl(code, src) { return location.origin + location.pathname + '?src=' + src + '#r=' + code; }
  var shared = false;
  // opened with answers in the address: #r= is a colleague's shared link, #m= is your own result after a
  // language switch. Fills the answers and returns 'r' or 'm'; a link that does not fit the questions is ignored.
  function readShared() {
    var m = /^#([rm])=([012s]{10})$/.exec(location.hash), i;
    if (!m) return false;
    var c = m[2].split('');
    for (i = 0; i < META.length; i++) ans[i] = c[i] === 's' ? null : Number(c[i]);
    for (i = 0; i < META.length; i++) {
      if (skipped(i) ? c[i] !== 's' : c[i] === 's') { ans = META.map(function () { return null; }); return false; }
    }
    return m[1];
  }
  // keep the result in the address and in the footer language links, so a language switch keeps it
  function setHash(code, kind) {
    var h = code ? '#' + kind + '=' + code : '';
    try { history.replaceState(null, '', location.pathname + location.search + h); } catch (e) {}
    Array.prototype.forEach.call(document.querySelectorAll('.foot-langs a'), function (a) {
      var href = a.getAttribute('href') || '';
      if (href.indexOf('scope-check.html') > -1) a.setAttribute('href', href.split('#')[0] + h);
    });
  }
  // the statistics script loads after this one; a shared view on page load waits for it briefly
  function trackSoon(name, data) {
    var n = 0;
    (function t() { if (window.umami && window.umami.track) track(name, data); else if (n++ < 20) setTimeout(t, 250); })();
  }
  // one row per question; status 0 settled, 1 partly, 2 open, 3 not applicable
  function rows() {
    return META.map(function (m, i) {
      var sk = skipped(i);
      return { n: i + 1, cat: L.cats[m.cat], q: L.q[i][0], a: sk ? '—' : L.q[i][1][ans[i]], st: sk ? 3 : ans[i] };
    });
  }
  function reportText(r) {
    var band = L.bands[r.b], top = r.risks.slice(0, 3), more = r.risks.length - top.length, t = [];
    t.push('[' + L.title + ']', L.repDate + ': ' + today());
    t.push('', '■ ' + L.repSum, L.rlabel + ' ' + r.score + '/100 (' + fmt(L.chip, { b: band[0] }) + ', ' + L.ends[1] + ')', strip(band[1]));
    t.push('', '■ ' + L.todoH);
    if (top.length) top.forEach(function (i, n) { t.push((n + 1) + '. ' + L.q[i][2], '   - ' + L.q[i][3]); });
    else t.push(strip(L.none));
    if (more > 0) t.push(fmt(L.repMore, { n: more }));
    t.push('', '■ ' + L.repAns);
    rows().forEach(function (w) { t.push(w.n + '. [' + w.cat + '] ' + w.q, '   → ' + w.a + ' (' + L.repSt[w.st] + ')'); });
    t.push('', '※ ' + strip(L.note), L.repBy + ': ' + resultUrl(r.code, 'report'));
    return t.join('\n');
  }
  function copyText(text, ok, fail) {
    function legacy() {
      var ta = document.createElement('textarea');
      ta.value = text; ta.setAttribute('readonly', ''); ta.style.position = 'fixed'; ta.style.opacity = '0';
      document.body.appendChild(ta); ta.select();
      var done = false; try { done = document.execCommand('copy'); } catch (e) {}
      ta.remove(); (done ? ok : fail)();
    }
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(ok, legacy);
    else legacy();
  }
  // the printable report lives outside the tool; print CSS (scope-check.css) shows only it while body has .sc-printing
  function printReport(r) {
    var band = L.bands[r.b], top = r.risks.slice(0, 3), more = r.risks.length - top.length;
    var old = document.getElementById('sc-print'); if (old) old.remove();
    var el = document.createElement('div');
    el.id = 'sc-print'; el.className = 'sc-print';
    el.innerHTML = '<header class="scp-h"><p class="scp-k">' + esc(L.title) + '</p><h1>' + esc(projName || L.title) + '</h1>' +
      '<p class="scp-meta">' + esc(L.repDate) + ' ' + today() + '</p></header>' +
      '<section><h2>' + esc(L.repSum) + '</h2><p class="scp-score">' + esc(L.rlabel) + ' <b>' + r.score + '</b>/100 · ' + esc(fmt(L.chip, { b: band[0] })) + '</p>' +
      '<p>' + esc(strip(band[1])) + '</p></section>' +
      '<section><h2>' + esc(L.todoH) + '</h2>' +
      (top.length ? '<ol>' + top.map(function (i) { return '<li><b>' + esc(L.q[i][2]) + '</b><br><span class="scp-why">' + esc(L.q[i][3]) + '</span></li>'; }).join('') + '</ol>'
        : '<p>' + esc(strip(L.none)) + '</p>') +
      (more > 0 ? '<p class="scp-more">' + esc(fmt(L.repMore, { n: more })) + '</p>' : '') + '</section>' +
      '<section><h2>' + esc(L.repAns) + '</h2><table><thead><tr><th>#</th>' +
      L.repCols.map(function (c) { return '<th>' + esc(c) + '</th>'; }).join('') + '</tr></thead><tbody>' +
      rows().map(function (w) {
        return '<tr data-st="' + w.st + '"><td>' + w.n + '</td><td>' + esc(w.cat) + '</td><td>' + esc(w.q) + '</td><td>' + esc(w.a) + '</td><td class="scp-st">' + esc(L.repSt[w.st]) + '</td></tr>';
      }).join('') + '</tbody></table></section>' +
      '<footer class="scp-f"><p>' + esc(strip(L.note)) + '</p><p>' + esc(L.repBy) + ' · ' + esc(resultUrl(r.code, 'report')) + '</p></footer>';
    document.body.appendChild(el);
    // the browser suggests the page title as the PDF file name
    var title = document.title;
    document.title = L.repFile + (projName ? '_' + projName.replace(/[\\\/:*?"<>|]+/g, ' ').trim() : '') + '_' + today();
    document.body.classList.add('sc-printing');
    function restore() { document.body.classList.remove('sc-printing'); document.title = title; window.removeEventListener('afterprint', restore); }
    window.addEventListener('afterprint', restore);
    // some mobile browsers never fire afterprint; the title comes back after a minute
    setTimeout(function () { document.title = title; }, 60000);
    window.print();
  }

  function show(html, focusSel) {
    stage.innerHTML = '<div class="sc-screen">' + html + '</div>';
    var f = focusSel && stage.querySelector(focusSel);
    if (f) f.focus({ preventScroll: true });
    // keep the tool in view when the screen changes
    var top = root.getBoundingClientRect().top;
    if (top < 0 || top > window.innerHeight * 0.5) root.scrollIntoView({ block: 'start', behavior: reduce ? 'auto' : 'smooth' });
  }

  function startScreen() {
    show('<p class="sc-eyebrow">' + L.eyebrow + '</p>' +
      '<h1 class="sc-h1" id="sc-title" tabindex="-1">' + L.h1 + '</h1>' +
      '<p class="sc-lede">' + L.lede + '</p>' +
      '<button type="button" class="sc-btn" id="sc-go">' + L.start + '</button>' +
      '<p class="sc-fine">' + L.fine + '</p>', '#sc-title');
    bindStart();
  }
  function bindStart() {
    var go = document.getElementById('sc-go');
    if (go) go.onclick = function () { track('tool_start', { tool: 'scope-check', lang: lang }); step = 0; question(); };
  }

  function question() {
    var list = steps(), i = list[step], q = L.q[i];
    // numbering stays out of 10 even when a question is skipped
    var n = i + 1, total = META.length;
    show('<div class="sc-qbar"><button type="button" class="sc-back" id="sc-back">' + L.back + '</button>' +
      '<span class="sc-track" aria-hidden="true"><i style="width:' + Math.round(i / total * 100) + '%"></i></span>' +
      '<span class="sc-count"><span class="visually-hidden">' + L.qWord + ' </span>' + n + ' / ' + total + '</span></div>' +
      '<p class="sc-cat">' + L.cats[META[i].cat] + '</p>' +
      '<h2 class="sc-q" id="sc-q" tabindex="-1">' + esc(q[0]) + '</h2>' +
      '<div class="sc-opts">' + q[1].map(function (a, v) {
        return '<button type="button" class="sc-opt" data-v="' + v + '" aria-pressed="' + (ans[i] === v) + '"><span>' + esc(a) + '</span><span class="sc-dot">' + CHECK + '</span></button>';
      }).join('') + '</div>', '#sc-q');
    document.getElementById('sc-back').onclick = function () { clearTimeout(advancing); if (step > 0) { step--; question(); } else { startScreen(); } };
    stage.querySelectorAll('.sc-opt').forEach(function (b) {
      b.onclick = function () {
        clearTimeout(advancing);
        ans[i] = Number(b.dataset.v);
        stage.querySelectorAll('.sc-opt').forEach(function (o) { o.setAttribute('aria-pressed', String(o === b)); });
        // a short pause so the choice is seen before the next question
        advancing = setTimeout(function () {
          if (step + 1 < steps().length) { step++; question(); } else { result(); }
        }, reduce ? 0 : 260);
      };
    });
  }

  function compute() {
    var list = steps(), got = 0, max = 0;
    list.forEach(function (i) { got += ans[i]; max += 2; });
    var score = Math.round(got / max * 100);
    var b = 0; while (score > BAND_MAX[b]) b++;
    var risks = list.filter(function (i) { return ans[i] > 0; }).sort(function (a, c) { return ans[c] - ans[a] || a - c; });
    var code = META.map(function (_, i) { return skipped(i) ? 's' : ans[i]; }).join('');
    return { score: score, b: b, key: BAND_KEY[b], risks: risks, code: code };
  }

  function result() {
    var r = compute(), band = L.bands[r.b], top = r.risks.slice(0, 3), more = r.risks.length - top.length;
    var SRC = getSrc();
    if (shared) { if (!tracked) { tracked = true; trackSoon('shared_view', { band: r.key, lang: lang }); } }
    else if (!tracked) { tracked = true; track('tool_complete', { tool: 'scope-check', score: r.score, band: r.key, answers: r.code, lang: lang }); }
    setHash(r.code, shared ? 'r' : 'm');
    var chip = fmt(L.chip, { b: band[0] });
    // the inquiry form's hidden fields carry the score, the answers, the language and the visit source
    var href = D.form + '?case=' + encodeURIComponent('scope-check-' + r.score + '-' + r.code + '-' + lang) + (SRC ? '&src=' + encodeURIComponent(SRC) : '');
    show('<h2 class="visually-hidden" id="sc-rt" tabindex="-1">' + L.rlabel + ' ' + r.score + '/100, ' + esc(chip) + '</h2>' +
      // someone opened a colleague's result link: say so, and offer their own check first
      (shared ? '<div class="sc-shared"><p>' + L.shBanner + '</p><button type="button" class="sc-rbtn sc-rgo" id="sc-mine">' + L.shStart + '</button></div>' : '') +
      '<div class="sc-risk" data-b="' + r.key + '">' +
      '<p class="sc-rlabel">' + L.rlabel + '</p>' +
      '<div class="sc-score" aria-hidden="true"><b>' + r.score + '</b><small>/ 100</small><span class="sc-band">' + ICON[r.key] + esc(chip) + '</span></div>' +
      '<div class="sc-scale" aria-hidden="true"><div class="sc-bar"><i id="sc-fill"></i></div><div class="sc-ends"><span>' + L.ends[0] + '</span><span>' + L.ends[1] + '</span><span>' + L.ends[2] + '</span></div></div>' +
      '<p class="sc-verdict">' + band[1] + '</p></div>' +
      '<div class="sc-todo"><h3>' + L.todoH + '</h3>' +
      (top.length ? '<ol>' + top.map(function (i) {
        return '<li><span class="sc-act">' + esc(L.q[i][2]) + '</span><span class="sc-why">' + esc(L.q[i][3]) + '</span></li>';
      }).join('') + '</ol>' : '<p class="sc-none">' + L.none + '</p>') +
      (more > 0 ? '<p class="sc-more">' + fmt(L.more, { n: more }) + '</p>' : '') + '</div>' +
      // the inquiry button is the main next step, so it comes before the save panel
      '<div class="sc-cta"><a class="sc-btn sc-block" id="sc-send" href="' + href + '" target="_blank" rel="noopener" aria-label="' + esc(band[2] + ' (' + L.newWin + ')') + '">' + band[2] + ' <span aria-hidden="true">↗</span></a>' +
      '<p class="sc-sub">' + band[3] + '</p>' +
      '<div class="sc-links"><a class="sc-link" href="' + D.book + '" target="_blank" rel="noopener" aria-label="' + esc(L.book + ' (' + L.newWin + ')') + '"><span class="sc-t">' + L.book + '</span><span class="sc-ic" aria-hidden="true">↗</span></a>' +
      (D.cases ? '<a class="sc-link" id="sc-cases" href="' + D.cases + '"><span class="sc-t">' + L.cases + '</span><span class="sc-ic" aria-hidden="true">→</span></a>' : '') +
      '<button type="button" class="sc-link" id="sc-again"><span class="sc-t">' + L.again + '</span></button></div></div>' +
      '<div class="sc-rep"><h3>' + L.repH + '</h3><p class="sc-rdesc">' + L.repDesc + '</p>' +
      '<div class="sc-rbtns"><button type="button" class="sc-rbtn sc-rshare" id="sc-share"><span id="sc-share-t">' + L.shBtn + '</span></button>' +
      '<button type="button" class="sc-rbtn" id="sc-rcopy"><span id="sc-rcopy-t">' + L.repCopy + '</span></button>' +
      '<button type="button" class="sc-rbtn" id="sc-rdoc" aria-expanded="false" aria-controls="sc-rdocp">' + L.repDoc + '</button></div>' +
      '<div class="sc-rdoc" id="sc-rdocp" hidden><label class="sc-rlab" for="sc-rname">' + L.repName + '</label>' +
      '<div class="sc-rrow"><input class="sc-rin" id="sc-rname" type="text" maxlength="60" autocomplete="off" enterkeyhint="done" placeholder="' + esc(L.repPh) + '" value="' + esc(projName) + '">' +
      '<button type="button" class="sc-rbtn sc-rgo" id="sc-rpdf">' + L.repPdf + '</button></div>' +
      '<p class="sc-rfine">' + L.repFine + '</p></div></div>' +
      '<p class="sc-note">' + L.note + '</p>', '#sc-rt');
    // the bar fills from 0 to the score once the result is shown
    var fill = document.getElementById('sc-fill');
    requestAnimationFrame(function () { requestAnimationFrame(function () { fill.style.width = r.score + '%'; }); });
    document.getElementById('sc-send').onclick = function () { track('inquiry_click', { location: 'tool', case: 'scope-check', band: r.key, lang: lang, src: SRC || 'none' }); };
    // back to the site: similar projects led by the founder (tool → site traffic)
    var cases = document.getElementById('sc-cases');
    if (cases) cases.onclick = function () { track('tool_to_site_click', { tool: 'scope-check', to: 'cases', band: r.key, lang: lang }); };
    function restart() { ans = META.map(function () { return null; }); tracked = false; shared = false; setHash(''); step = 0; question(); }
    document.getElementById('sc-again').onclick = restart;
    var mine = document.getElementById('sc-mine');
    if (mine) mine.onclick = function () { track('tool_start', { tool: 'scope-check', lang: lang, from: 'shared' }); restart(); };
    // share the result link: the phone's share sheet (KakaoTalk, LINE, Zalo, WhatsApp …) or a copied link on a computer
    document.getElementById('sc-share').onclick = function () {
      var url = resultUrl(r.code, 'share'), b = document.getElementById('sc-share-t');
      var text = L.rlabel + ' ' + r.score + '/100 (' + chip + '). ' + L.shText;
      function done(msg) { b.textContent = msg; setTimeout(function () { b.textContent = L.shBtn; }, 1800); }
      var touch = window.matchMedia && matchMedia('(pointer: coarse)').matches;
      if (touch && navigator.share) {
        navigator.share({ title: L.title, text: text, url: url }).then(function () { track('share_click', { method: 'share', band: r.key, lang: lang }); }, function () {});
      } else {
        copyText(url, function () { done(L.shCopied); track('share_click', { method: 'copy', band: r.key, lang: lang }); }, function () { done(L.copyFail); });
      }
    };
    // internal report: the project name stays in this page (kept for "start over"), only band and language are counted
    var nameIn = document.getElementById('sc-rname');
    nameIn.oninput = function () { projName = nameIn.value.trim(); };
    document.getElementById('sc-rcopy').onclick = function () {
      var b = document.getElementById('sc-rcopy-t');
      function done(msg) { b.textContent = msg; setTimeout(function () { b.textContent = L.repCopy; }, 1800); }
      copyText(reportText(r), function () { done(L.copied); track('report_copy', { band: r.key, lang: lang }); }, function () { done(L.copyFail); });
    };
    // "save as document" opens the project-name field; the name is used only in the document
    var docBtn = document.getElementById('sc-rdoc'), docPanel = document.getElementById('sc-rdocp');
    docBtn.onclick = function () {
      var open = docPanel.hidden;
      docPanel.hidden = !open; docBtn.setAttribute('aria-expanded', String(open));
      if (open) nameIn.focus();
    };
    function savePdf() { track('report_pdf', { band: r.key, lang: lang, named: projName ? 'yes' : 'no' }); printReport(r); }
    nameIn.onkeydown = function (e) { if (e.key === 'Enter') { e.preventDefault(); savePdf(); } };
    document.getElementById('sc-rpdf').onclick = savePdf;
  }

  root.classList.add('is-ready');
  function openFromHash() {
    var kind = readShared();
    if (!kind) return false;
    shared = kind === 'r';
    tracked = !shared; // your own result was already counted when you finished it
    result();
    return true;
  }
  if (!openFromHash()) bindStart();
  // another result link pasted into the same tab changes only the # part, so the page does not reload
  window.addEventListener('hashchange', function () { if (/^#[rm]=/.test(location.hash)) openFromHash(); });
})();
