/* ============================================================
   HUSKY PRO PAINTING — analytics.js
   Google Analytics 4: G-CPGRKPT6ZS
   ============================================================ */

// Inject gtag.js dynamically
(function() {
  var s = document.createElement('script');
  s.async = true;
  s.src = 'https://www.googletagmanager.com/gtag/js?id=G-CPGRKPT6ZS';
  document.head.appendChild(s);
})();

window.dataLayer = window.dataLayer || [];
function gtag(){ dataLayer.push(arguments); }
gtag('js', new Date());
gtag('config', 'G-CPGRKPT6ZS');

// ── CONVERSION EVENTS ──────────────────────────────────────
// Track phone number clicks
document.addEventListener('click', function(e) {
  var el = e.target.closest('a[href^="tel:"]');
  if (el) {
    gtag('event', 'generate_lead', { event_category: 'phone_call', event_label: el.href });
  }
});
