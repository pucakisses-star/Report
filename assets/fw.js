(function () {
  'use strict';
  var root = document.documentElement;

  /* Theme */
  var themeBtn = document.getElementById('theme-toggle');
  function currentTheme() {
    if (root.dataset.theme === 'dark' || root.dataset.theme === 'light') return root.dataset.theme;
    return 'light';
  }
  function syncThemeBtn() {
    if (!themeBtn) return;
    var dark = currentTheme() === 'dark';
    themeBtn.setAttribute('aria-pressed', String(dark));
    themeBtn.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
    var sun = themeBtn.querySelector('.i-sun');
    var moon = themeBtn.querySelector('.i-moon');
    if (sun && moon) { sun.style.display = dark ? 'block' : 'none'; moon.style.display = dark ? 'none' : 'block'; }
  }
  try {
    var stored = localStorage.getItem('theme');
    if (stored === 'dark' || stored === 'light') root.dataset.theme = stored;
  } catch (e) {}
  if (themeBtn) {
    themeBtn.addEventListener('click', function () {
      var next = currentTheme() === 'dark' ? 'light' : 'dark';
      root.dataset.theme = next;
      try { localStorage.setItem('theme', next); } catch (e) {}
      syncThemeBtn();
    });
  }
  syncThemeBtn();

  /* Mobile nav */
  var navBtn = document.getElementById('nav-toggle');
  var mobileNav = document.getElementById('mobile-nav');
  if (navBtn && mobileNav) {
    navBtn.addEventListener('click', function () {
      var open = mobileNav.classList.toggle('open');
      navBtn.setAttribute('aria-expanded', String(open));
    });
  }

  /* Scroll reveal */
  var revealed = document.querySelectorAll('.rv');
  if (window.IntersectionObserver && revealed.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.12 });
    revealed.forEach(function (el) { io.observe(el); });
  } else {
    revealed.forEach(function (el) { el.classList.add('in'); });
  }

  /* Newsletter signup: compose an email */
  var nl = document.getElementById('newsletter-form');
  if (nl) {
    nl.addEventListener('submit', function (e) {
      e.preventDefault();
      var email = ((document.getElementById('nl-email') || {}).value || '').trim();
      location.href = 'mailto:freeworcestercoalition@gmail.com?subject=' +
        encodeURIComponent('Newsletter signup') + '&body=' +
        encodeURIComponent('Please subscribe me to the Free Worcester newsletter.' + (email ? '\n\nEmail: ' + email : ''));
    });
  }

  /* Contact form: compose an email */
  var form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = (document.getElementById('cf-name') || {}).value || '';
      var subject = ((document.getElementById('cf-subject') || {}).value || '').trim() ||
        'Message from the Free Worcester website';
      var message = (document.getElementById('cf-message') || {}).value || '';
      var body = message + (name.trim() ? '\n\n— ' + name.trim() : '');
      location.href = 'mailto:freeworcestercoalition@gmail.com?subject=' +
        encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
    });
  }
})();
