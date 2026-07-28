/* =========================================================
   Dominic Obeng Koranteng — portfolio
   No dependencies. Everything degrades if JavaScript fails.
   ========================================================= */
(function () {
  'use strict';

  var $  = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Theme ---------- */
  var root   = document.documentElement;
  var toggle = $('#theme-toggle');

  function label() {
    if (!toggle) return;
    var dark = root.getAttribute('data-theme') === 'dark';
    toggle.setAttribute('aria-label', dark ? 'Switch to light theme' : 'Switch to dark theme');
  }
  label();

  if (toggle) {
    toggle.addEventListener('click', function () {
      var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('theme', next); } catch (e) {}
      label();
    });
  }

  /* ---------- Mobile menu ---------- */
  var menu   = $('#menu');
  var burger = $('#menutoggle');

  function closeMenu() {
    if (!menu || !burger) return;
    menu.classList.remove('is-open');
    burger.setAttribute('aria-expanded', 'false');
    burger.setAttribute('aria-label', 'Open menu');
  }

  if (burger && menu) {
    burger.addEventListener('click', function () {
      var open = menu.classList.toggle('is-open');
      burger.setAttribute('aria-expanded', String(open));
      burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    });
    $$('a', menu).forEach(function (a) { a.addEventListener('click', closeMenu); });
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && menu && menu.classList.contains('is-open')) {
      closeMenu();
      burger.focus();
    }
  });

  document.addEventListener('click', function (e) {
    if (!menu || !menu.classList.contains('is-open')) return;
    if (!menu.contains(e.target) && !burger.contains(e.target)) closeMenu();
  });

  /* ---------- Reveal on scroll ---------- */
  var revealables = $$('.reveal');

  if (reduced || !('IntersectionObserver' in window)) {
    revealables.forEach(function (el) { el.classList.add('is-in'); });
  } else {
    var revealer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-in');
        revealer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

    revealables.forEach(function (el) { revealer.observe(el); });
  }

  /* ---------- Active section + axis label ---------- */
  var sections = $$('main section[id]');
  var links    = $$('.menu a[href^="#"]');
  var axisLbl  = $('#axis-label');

  var titles = {};
  sections.forEach(function (s) {
    var h = $('.rail__title', s) || $('h1', s);
    titles[s.id] = h ? h.textContent.trim() : 'Intro';
  });

  if ('IntersectionObserver' in window && sections.length) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var id = entry.target.id;
        links.forEach(function (a) {
          a.classList.toggle('is-active', a.getAttribute('href') === '#' + id);
        });
        if (axisLbl) axisLbl.textContent = titles[id] || 'Intro';
      });
    }, { rootMargin: '-35% 0px -55% 0px', threshold: 0 });

    sections.forEach(function (s) { spy.observe(s); });
  }

  /* ---------- Scroll position: axis fill, sticky bar, back to top ---------- */
  var fill   = $('#axis-fill');
  var fillM  = $('#axis-fill-m');
  var topbar = $('#topbar');
  var totop  = $('#totop');
  var ticking = false;

  function onScroll() {
    var y   = window.scrollY || document.documentElement.scrollTop;
    var max = document.documentElement.scrollHeight - window.innerHeight;
    var pct = max > 0 ? Math.min(100, (y / max) * 100) : 0;

    if (fill)  fill.style.height = pct + '%';
    if (fillM) fillM.style.width = pct + '%';
    if (topbar) topbar.classList.toggle('is-stuck', y > 8);
    if (totop)  totop.classList.toggle('is-on', y > 600);

    ticking = false;
  }

  window.addEventListener('scroll', function () {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(onScroll);
  }, { passive: true });

  window.addEventListener('resize', onScroll, { passive: true });
  onScroll();

  if (totop) {
    totop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
    });
  }

  /* ---------- Footer year ---------- */
  var year = $('#year');
  if (year) year.textContent = new Date().getFullYear();
})();
