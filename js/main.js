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


  // ── ESTIMATE FORM HANDLER ──────────────────────────────
  // Replace the TODO below with your GHL webhook URL
  const form = document.getElementById('estimate-form');

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const btn = form.querySelector('button[type="submit"]');
      const originalText = btn.textContent;
      btn.textContent = 'Sending...';
      btn.disabled = true;

      const data = Object.fromEntries(new FormData(form).entries());

      // TODO: Replace with your GHL form webhook URL
      // const GHL_WEBHOOK = 'https://services.leadconnectorhq.com/hooks/YOUR_ID';
      // await fetch(GHL_WEBHOOK, { method: 'POST', body: JSON.stringify(data), headers: { 'Content-Type': 'application/json' } });

      // Simulated success — remove this when real webhook is connected
      await new Promise(r => setTimeout(r, 800));

      btn.textContent = '✓ Sent! We\'ll call you within 24 hours.';
      btn.style.background = '#22c55e';

      // Fire Meta Pixel lead event if pixel is loaded
      if (typeof fbq !== 'undefined') {
        fbq('track', 'Lead', {
          content_name: 'Free Estimate Request',
          content_category: data.service || 'painting'
        });
      }

      // Fire GA4 event if analytics is loaded
      if (typeof gtag !== 'undefined') {
        gtag('event', 'generate_lead', {
          event_category: 'Contact Form',
          event_label: data.service || 'general'
        });
      }
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
