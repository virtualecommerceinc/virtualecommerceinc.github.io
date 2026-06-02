/* =========================================================
   VirtualEcommerce Inc. — Tweaks panel (vanilla, no framework)
   Loaded only on index.html. Hidden until the host activates
   edit mode; invisible/inert on a normal GitHub Pages deploy.
   Implements the host edit-mode protocol via postMessage and
   persists choices to localStorage for live preview refreshes.
   ========================================================= */
(function () {
  'use strict';

  var DEFAULTS = /*EDITMODE-BEGIN*/{
    "accent": "#FF2EC4",
    "primary": "#2E7BFF",
    "headline": "We bring your business into the ",
    "keyword": "AI age",
    "animatedBg": true,
    "glow": 50
  }/*EDITMODE-END*/;

  var STORE = 'vei_tweaks_v1';
  var state = Object.assign({}, DEFAULTS);
  try { Object.assign(state, JSON.parse(localStorage.getItem(STORE) || '{}')); } catch (e) {}

  var ACCENTS = ['#FF2EC4', '#FFB020', '#A06BFF', '#22D3EE', '#FF5C7A'];
  var PRIMARIES = ['#2E7BFF', '#3B82F6', '#5468FF', '#0EA5E9'];

  /* ---------- apply tweaks to the live page ---------- */
  function hexToSoft(hex) {
    // lighten a hex toward white for the --blue-soft companion
    var n = parseInt(hex.slice(1), 16);
    var r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
    r = Math.round(r + (255 - r) * 0.45);
    g = Math.round(g + (255 - g) * 0.45);
    b = Math.round(b + (255 - b) * 0.45);
    return 'rgb(' + r + ',' + g + ',' + b + ')';
  }
  function apply() {
    var root = document.documentElement;
    root.style.setProperty('--magenta', state.accent);
    root.style.setProperty('--blue', state.primary);
    root.style.setProperty('--blue-2', state.primary);
    root.style.setProperty('--blue-soft', hexToSoft(state.primary));
    root.style.setProperty('--glow-blue', '0 0 ' + (20 + state.glow * 1.4) + 'px -8px ' + state.primary + 'cc');

    var aurora = document.querySelector('.hero__aurora');
    if (aurora) aurora.style.display = state.animatedBg ? '' : 'none';

    var lead = document.getElementById('hlLead');
    var word = document.getElementById('hlWord');
    if (lead) lead.textContent = state.headline;
    if (word) word.textContent = state.keyword;
  }

  function persist() {
    try { localStorage.setItem(STORE, JSON.stringify(state)); } catch (e) {}
    window.parent.postMessage({ type: '__edit_mode_set_keys', edits: state }, '*');
  }
  function set(key, val) { state[key] = val; apply(); persist(); buildSwatchStates(); }

  apply();

  /* ---------- panel UI ---------- */
  var panel, swatchEls = {};
  function injectStyles() {
    var css = '' +
      '#vei-tweaks{position:fixed;right:18px;bottom:18px;z-index:9999;width:300px;max-width:calc(100vw - 36px);' +
        'background:rgba(13,15,23,0.94);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.14);' +
        'border-radius:18px;box-shadow:0 30px 80px -20px rgba(0,0,0,0.8);color:#F4F6FC;' +
        'font-family:Inter,system-ui,sans-serif;display:none;overflow:hidden}' +
      '#vei-tweaks.open{display:block}' +
      '#vei-tweaks .tw-head{display:flex;align-items:center;justify-content:space-between;padding:14px 16px;border-bottom:1px solid rgba(255,255,255,0.09);cursor:grab}' +
      '#vei-tweaks .tw-head b{font-family:"Space Grotesk",sans-serif;font-size:.95rem}' +
      '#vei-tweaks .tw-x{width:28px;height:28px;border-radius:8px;display:grid;place-items:center;color:#AEB4C7}' +
      '#vei-tweaks .tw-x:hover{background:rgba(255,255,255,0.08);color:#fff}' +
      '#vei-tweaks .tw-body{padding:6px 16px 18px;max-height:70vh;overflow:auto}' +
      '#vei-tweaks .tw-sec{font-size:.68rem;letter-spacing:.12em;text-transform:uppercase;color:#767C90;margin:16px 0 9px;font-weight:600}' +
      '#vei-tweaks .tw-row{margin-bottom:6px}' +
      '#vei-tweaks .tw-lbl{font-size:.82rem;color:#AEB4C7;margin-bottom:8px;display:flex;justify-content:space-between}' +
      '#vei-tweaks .tw-sw{display:flex;gap:8px;flex-wrap:wrap}' +
      '#vei-tweaks .tw-sw button{width:30px;height:30px;border-radius:8px;border:2px solid transparent;cursor:pointer;transition:transform .15s}' +
      '#vei-tweaks .tw-sw button:hover{transform:scale(1.08)}' +
      '#vei-tweaks .tw-sw button[aria-pressed="true"]{border-color:#fff;box-shadow:0 0 0 2px rgba(0,0,0,0.5) inset}' +
      '#vei-tweaks input[type=text]{width:100%;background:#11141f;border:1px solid rgba(255,255,255,0.14);border-radius:10px;color:#fff;padding:10px 12px;font:inherit;font-size:.9rem}' +
      '#vei-tweaks input[type=text]:focus{outline:none;border-color:var(--blue,#2E7BFF)}' +
      '#vei-tweaks input[type=range]{width:100%;accent-color:var(--blue,#2E7BFF)}' +
      '#vei-tweaks .tw-toggle{display:flex;align-items:center;justify-content:space-between;width:100%;background:#11141f;border:1px solid rgba(255,255,255,0.14);border-radius:10px;padding:10px 12px;color:#fff;font:inherit;font-size:.9rem;cursor:pointer}' +
      '#vei-tweaks .tw-pip{width:38px;height:22px;border-radius:999px;background:#2c3140;position:relative;transition:.2s}' +
      '#vei-tweaks .tw-pip::after{content:"";position:absolute;top:2px;left:2px;width:18px;height:18px;border-radius:50%;background:#fff;transition:.2s}' +
      '#vei-tweaks .tw-toggle[aria-pressed="true"] .tw-pip{background:var(--blue,#2E7BFF)}' +
      '#vei-tweaks .tw-toggle[aria-pressed="true"] .tw-pip::after{transform:translateX(16px)}';
    var s = document.createElement('style'); s.textContent = css; document.head.appendChild(s);
  }

  function buildSwatchStates() {
    if (swatchEls.accent) swatchEls.accent.forEach(function (b) { b.setAttribute('aria-pressed', b.dataset.val === state.accent); });
    if (swatchEls.primary) swatchEls.primary.forEach(function (b) { b.setAttribute('aria-pressed', b.dataset.val === state.primary); });
    if (swatchEls.bg) swatchEls.bg.setAttribute('aria-pressed', !!state.animatedBg);
  }

  function swatchRow(label, colors, current, onPick, store) {
    var row = el('div', 'tw-row');
    row.appendChild(el('div', 'tw-lbl', label));
    var wrap = el('div', 'tw-sw');
    swatchEls[store] = [];
    colors.forEach(function (c) {
      var b = document.createElement('button');
      b.type = 'button'; b.dataset.val = c; b.style.background = c;
      b.setAttribute('aria-label', label + ' ' + c);
      b.setAttribute('aria-pressed', c === current);
      b.addEventListener('click', function () { onPick(c); });
      wrap.appendChild(b); swatchEls[store].push(b);
    });
    row.appendChild(wrap); return row;
  }
  function el(tag, cls, txt) { var e = document.createElement(tag); if (cls) e.className = cls; if (txt != null) e.textContent = txt; return e; }

  function build() {
    injectStyles();
    panel = el('div'); panel.id = 'vei-tweaks';
    panel.setAttribute('role', 'dialog'); panel.setAttribute('aria-label', 'Tweaks');

    var head = el('div', 'tw-head');
    head.appendChild(el('b', null, 'Tweaks'));
    var x = el('button', 'tw-x'); x.type = 'button'; x.setAttribute('aria-label', 'Close tweaks'); x.innerHTML = '&times;';
    x.addEventListener('click', dismiss); head.appendChild(x);
    panel.appendChild(head);

    var body = el('div', 'tw-body');

    body.appendChild(el('div', 'tw-sec', 'Brand color'));
    body.appendChild(swatchRow('Primary', PRIMARIES, state.primary, function (c) { set('primary', c); }, 'primary'));
    body.appendChild(swatchRow('Accent', ACCENTS, state.accent, function (c) { set('accent', c); }, 'accent'));

    body.appendChild(el('div', 'tw-sec', 'Hero headline'));
    var r1 = el('div', 'tw-row'); r1.appendChild(el('div', 'tw-lbl', 'Opening line'));
    var i1 = document.createElement('input'); i1.type = 'text'; i1.value = state.headline;
    i1.addEventListener('input', function () { set('headline', i1.value); }); r1.appendChild(i1); body.appendChild(r1);
    var r2 = el('div', 'tw-row'); r2.appendChild(el('div', 'tw-lbl', 'Gradient keyword'));
    var i2 = document.createElement('input'); i2.type = 'text'; i2.value = state.keyword;
    i2.addEventListener('input', function () { set('keyword', i2.value); }); r2.appendChild(i2); body.appendChild(r2);

    body.appendChild(el('div', 'tw-sec', 'Motion & glow'));
    var tg = document.createElement('button'); tg.type = 'button'; tg.className = 'tw-toggle';
    tg.setAttribute('aria-pressed', !!state.animatedBg);
    tg.innerHTML = '<span>Animated background</span><span class="tw-pip"></span>';
    tg.addEventListener('click', function () { set('animatedBg', !state.animatedBg); });
    swatchEls.bg = tg;
    var tgRow = el('div', 'tw-row'); tgRow.appendChild(tg); body.appendChild(tgRow);

    var gr = el('div', 'tw-row'); var grl = el('div', 'tw-lbl');
    grl.appendChild(el('span', null, 'Glow intensity')); var grv = el('span', null, state.glow + '%'); grl.appendChild(grv);
    gr.appendChild(grl);
    var rg = document.createElement('input'); rg.type = 'range'; rg.min = 0; rg.max = 100; rg.value = state.glow;
    rg.addEventListener('input', function () { grv.textContent = rg.value + '%'; set('glow', +rg.value); });
    gr.appendChild(rg); body.appendChild(gr);

    panel.appendChild(body);
    document.body.appendChild(panel);
    makeDraggable(panel, head);
    buildSwatchStates();
  }

  function makeDraggable(box, handle) {
    var sx, sy, ox, oy, dragging = false;
    handle.addEventListener('mousedown', function (e) {
      if (e.target.closest('.tw-x')) return;
      dragging = true; sx = e.clientX; sy = e.clientY;
      var r = box.getBoundingClientRect(); ox = r.left; oy = r.top;
      box.style.right = 'auto'; box.style.bottom = 'auto'; box.style.left = ox + 'px'; box.style.top = oy + 'px';
      e.preventDefault();
    });
    window.addEventListener('mousemove', function (e) {
      if (!dragging) return;
      box.style.left = (ox + e.clientX - sx) + 'px';
      box.style.top = (oy + e.clientY - sy) + 'px';
    });
    window.addEventListener('mouseup', function () { dragging = false; });
  }

  /* ---------- host protocol ---------- */
  function openPanel() { if (!panel) build(); panel.classList.add('open'); }
  function closePanel() { if (panel) panel.classList.remove('open'); }
  function dismiss() { closePanel(); window.parent.postMessage({ type: '__edit_mode_dismissed' }, '*'); }

  window.addEventListener('message', function (e) {
    var t = e && e.data && e.data.type;
    if (t === '__activate_edit_mode') openPanel();
    else if (t === '__deactivate_edit_mode') closePanel();
  });
  window.parent.postMessage({ type: '__edit_mode_available' }, '*');
})();
