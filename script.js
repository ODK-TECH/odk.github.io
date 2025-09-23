// script.js (defer loaded)
// DOM helpers
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

// NAV toggle (mobile)
const navToggle = $('.nav-toggle');
const navMenu = $('#primary-menu');
navToggle && navToggle.addEventListener('click', () => {
  const expanded = navToggle.getAttribute('aria-expanded') === 'true';
  navToggle.setAttribute('aria-expanded', String(!expanded));
  navMenu.classList.toggle('show');
});

// Smooth scroll for in-page anchors
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (!href || href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({behavior: 'smooth', block: 'start'});
      // hide mobile nav after click
      if (navMenu.classList.contains('show')) {
        navMenu.classList.remove('show');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    }
  });
});

// Theme toggle (persist)
const themeToggle = $('#theme-toggle');
const root = document.documentElement;
const stored = localStorage.getItem('theme');
if (stored) root.setAttribute('data-theme', stored);
else {
  // set based on prefers-color-scheme
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  root.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
}
const updateThemeIcon = () => {
  const icon = themeToggle.querySelector('i');
  const theme = root.getAttribute('data-theme');
  if (icon) icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
};
updateThemeIcon();

themeToggle && themeToggle.addEventListener('click', () => {
  const cur = root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
  const next = cur === 'dark' ? 'light' : 'dark';
  root.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  updateThemeIcon();
});

// Populate dynamic year in footer
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Accessibility: close nav on ESC
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    if (navMenu.classList.contains('show')) {
      navMenu.classList.remove('show');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  }
});
