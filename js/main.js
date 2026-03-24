/* ============================================================
   HUSKY PRO PAINTING — main.js
   Animations, nav behavior, form handler
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ── FADE-UP ANIMATIONS ON SCROLL ──────────────────────
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));


  // ── ACTIVE NAV LINK ON SCROLL ──────────────────────────
  const sections  = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      if (window.scrollY >= section.offsetTop - 120) {
        current = section.id;
      }
    });
    navLinks.forEach(link => {
      link.classList.toggle(
        'active',
        link.getAttribute('href') === '#' + current
      );
    });
  }, { passive: true });


  // ── MOBILE NAV TOGGLE ─────────────────────────────────
  const burger    = document.querySelector('.nav-burger');
  const mobileNav = document.querySelector('.nav-mobile');

  if (burger && mobileNav) {
    burger.addEventListener('click', () => {
      mobileNav.classList.toggle('open');
      burger.setAttribute(
        'aria-expanded',
        mobileNav.classList.contains('open')
      );
    });

    // Close mobile nav when a link is clicked
    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('open');
      });
    });
  }




  // ── NAV SHADOW ON SCROLL ───────────────────────────────
  const nav = document.querySelector('nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.style.boxShadow = window.scrollY > 40
        ? '0 2px 24px rgba(0,0,0,.13)'
        : '0 2px 20px rgba(0,0,0,.08)';
    }, { passive: true });
  }

});
