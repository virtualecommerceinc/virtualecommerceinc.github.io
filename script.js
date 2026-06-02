/* =========================================================
   VirtualEcommerce Inc. — Global Script
   Vanilla JS, no dependencies. Shared across all pages.
   ========================================================= */
(function () {
  'use strict';
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Mobile nav ---------- */
  function initNav() {
    var toggle = document.querySelector('.nav-toggle');
    var nav = document.querySelector('.nav');
    if (!toggle || !nav) return;
    toggle.addEventListener('click', function () {
      var open = document.body.classList.toggle('nav-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) {
        document.body.classList.remove('nav-open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && document.body.classList.contains('nav-open')) {
        document.body.classList.remove('nav-open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.focus();
      }
    });
  }

  /* ---------- Scroll reveal ---------- */
  function initReveal() {
    var els = document.querySelectorAll('.reveal');
    if (!els.length) return;
    if (reduceMotion || !('IntersectionObserver' in window)) {
      els.forEach(function (el) { el.classList.add('in'); });
      return;
    }
    var ioAlive = false;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          ioAlive = true;
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    els.forEach(function (el) { io.observe(el); });
    // Robustness: some sandboxed/non-composited iframes never fire
    // IntersectionObserver AND never advance CSS transitions. If THIS observer
    // hasn't fired, force the visible end-state inline so content is never
    // permanently stuck at opacity 0. (Scoped to a local flag so other
    // page scripts adding .in elsewhere don't mask a dead observer.)
    setTimeout(function () {
      if (!ioAlive) {
        els.forEach(function (el) {
          el.style.transition = 'none';
          el.style.opacity = '1';
          el.style.transform = 'none';
          el.classList.add('in');
        });
      }
    }, 800);
  }

  /* ---------- Videos: honor reduced motion + lazy load ---------- */
  function initVideos() {
    var vids = document.querySelectorAll('video[data-autoplay]');
    vids.forEach(function (v) {
      if (reduceMotion) {
        // Do not autoplay — poster stays visible as a still frame.
        v.removeAttribute('autoplay');
        v.pause();
        return;
      }
      var play = function () {
        var p = v.play();
        if (p && p.catch) { p.catch(function () {}); }
      };
      if (v.hasAttribute('data-eager')) { play(); return; }
      if ('IntersectionObserver' in window) {
        var io = new IntersectionObserver(function (entries) {
          entries.forEach(function (e) {
            if (e.isIntersecting) { play(); io.unobserve(v); }
          });
        }, { threshold: 0.25 });
        io.observe(v);
      } else { play(); }
    });
  }

  /* ---------- Footer year ---------- */
  function initYear() {
    var y = document.querySelector('[data-year]');
    if (y) y.textContent = new Date().getFullYear();
  }

  /* ---------- Signature demo: "run your site with a sentence" ---------- */
  function initDemo() {
    var stage = document.querySelector('[data-demo]');
    if (!stage) return;

    var caret = stage.querySelector('.caret');
    var bubble = stage.querySelector('.demo__bubble');
    var pv = {
      headline: stage.querySelector('.preview__h'),
      btn: stage.querySelector('.preview__btn'),
      banner: stage.querySelector('.preview__banner'),
      img: stage.querySelector('.preview__img'),
      flash: stage.querySelector('.flash')
    };

    var scripts = [
      {
        prompt: "Change my headline to \u201CNow Open Sundays\u201D and make the button green.",
        reply: "Done \u2014 headline updated and button set to green.",
        apply: function () {
          pv.headline.textContent = 'Now Open Sundays';
          pv.btn.classList.add('is-green');
        },
        reset: function () {
          pv.headline.textContent = 'Family Appliances, Done Right';
          pv.btn.classList.remove('is-green');
        }
      },
      {
        prompt: "Add a 10% off banner to the top of my page.",
        reply: "Banner added to the top of your site.",
        apply: function () { pv.banner.classList.add('show'); },
        reset: function () { pv.banner.classList.remove('show'); }
      },
      {
        prompt: "Swap my hero photo for the new fridge image.",
        reply: "Hero image swapped for the new fridge photo.",
        apply: function () { pv.img.classList.add('is-fridge'); pv.img.textContent = 'fridge.jpg'; },
        reset: function () { pv.img.classList.remove('is-fridge'); pv.img.textContent = 'hero.jpg'; }
      }
    ];

    if (reduceMotion) {
      // Static, accessible end-state: show first prompt applied, no looping.
      caret.textContent = scripts[0].prompt;
      caret.style.setProperty('--noblink', '1');
      caret.classList.add('no-caret');
      bubble.textContent = scripts[0].reply;
      scripts[0].apply();
      return;
    }

    var i = 0;
    function typePrompt(text, done) {
      caret.textContent = '';
      bubble.textContent = '';
      var n = 0;
      (function tick() {
        if (n <= text.length) {
          caret.textContent = text.slice(0, n);
          n++;
          setTimeout(tick, 26 + Math.random() * 28);
        } else {
          setTimeout(done, 360);
        }
      })();
    }
    function flash() {
      if (!pv.flash) return;
      pv.flash.classList.add('on');
      setTimeout(function () { pv.flash.classList.remove('on'); }, 280);
    }
    function run() {
      var s = scripts[i];
      typePrompt(s.prompt, function () {
        flash();
        s.apply();
        bubble.textContent = s.reply;
        setTimeout(function () {
          s.reset();
          i = (i + 1) % scripts.length;
          run();
        }, 2600);
      });
    }
    // Kick off when visible to save cycles
    if ('IntersectionObserver' in window) {
      var started = false;
      var start = function () { if (!started) { started = true; run(); } };
      var io = new IntersectionObserver(function (entries) {
        if (entries[0].isIntersecting) { start(); io.disconnect(); }
      }, { threshold: 0.3 });
      io.observe(stage);
      // Fallback: start anyway if IO hasn't fired (sandboxed iframes).
      setTimeout(start, 1000);
    } else { run(); }
  }

  /* ---------- init ---------- */
  function ready(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }
  ready(function () {
    initNav();
    initReveal();
    initVideos();
    initYear();
    initDemo();
  });
})();
