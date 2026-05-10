// ============================================================
//  PORTFOLIO SCRIPT — script.js (defer loaded)
// ============================================================

// DOM helpers
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

// ============================================================
//  NAV TOGGLE (mobile)
// ============================================================
const navToggle = $('.nav-toggle');
const navMenu   = $('#primary-menu');

navToggle && navToggle.addEventListener('click', () => {
  const expanded = navToggle.getAttribute('aria-expanded') === 'true';
  navToggle.setAttribute('aria-expanded', String(!expanded));
  navMenu.classList.toggle('show');
});

// ============================================================
//  SMOOTH SCROLL for in-page anchors
// ============================================================
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (!href || href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // hide mobile nav after click
      if (navMenu.classList.contains('show')) {
        navMenu.classList.remove('show');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    }
  });
});

// ============================================================
//  THEME TOGGLE (persist across sessions)
// ============================================================
const themeToggle = $('#theme-toggle');
const root        = document.documentElement;

// Apply stored or system preference on load
const stored = localStorage.getItem('theme');
if (stored) {
  root.setAttribute('data-theme', stored);
} else {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  root.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
}

const updateThemeIcon = () => {
  const icon  = themeToggle.querySelector('i');
  const theme = root.getAttribute('data-theme');
  icon.className = theme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
};

updateThemeIcon();

// ✅ FIX: Simplified toggle — removed redundant ternary
themeToggle && themeToggle.addEventListener('click', () => {
  const current = root.getAttribute('data-theme') || 'light';
  const next    = current === 'dark' ? 'light' : 'dark';
  root.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  updateThemeIcon();
});

// ============================================================
//  FOOTER YEAR
// ============================================================
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ============================================================
//  ACCESSIBILITY — close nav on ESC
// ============================================================
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && navMenu.classList.contains('show')) {
    navMenu.classList.remove('show');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.focus();
  }
});

// ============================================================
//  SCROLL-TRIGGERED REVEAL ANIMATION
// ✅ ENHANCEMENT: Elements with class="reveal" fade in on scroll
// ============================================================
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      // Unobserve after reveal so it only plays once
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => {
  revealObserver.observe(el);
});

// ============================================================
//  ACTIVE NAV LINK ON SCROLL
// ✅ ENHANCEMENT: Highlights the current section in the nav
// ============================================================
const sections    = document.querySelectorAll('section[id]');
const navLinks    = document.querySelectorAll('.nav-menu a[href^="#"]');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
      });
    }
  });
}, {
  // Trigger when section is ~30% into the viewport
  rootMargin: '-30% 0px -60% 0px',
  threshold: 0
});

sections.forEach(section => sectionObserver.observe(section));

// ============================================================
//  BACK-TO-TOP BUTTON
// ✅ ENHANCEMENT: Show after scrolling 400px, scroll to top on click
// ============================================================
const backToTop = $('#back-to-top');

if (backToTop) {
  window.addEventListener('scroll', () => {
    backToTop.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ============================================================
//  NAV SHADOW ON SCROLL
// ✅ ENHANCEMENT: Adds subtle shadow to nav once user starts scrolling
// ============================================================
const nav = $('.nav');

if (nav) {
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 10);
  }, { passive: true });
}
