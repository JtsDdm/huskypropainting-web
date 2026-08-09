/* ============================================================
   HUSKY PRO PAINTING — analytics.js
   Google Analytics 4: G-CPGRKPT6ZS
   Google Ads:         AW-18235385879

   Conversion labels in use (all "Website" type in the Ads account):
     nnNaCPruitEcEJfQp_dD  — Phone call  → fired here, on any tel: click
     blU9CIH9usgcEJfQp_dD  — Form sent   → fired inline in /thank-you.html

   This file is the ONLY place a phone-call conversion is fired. Do not add
   an onclick="gtag_report_conversion(...)" to tel: links — that fires a
   second time and blocks the dialer while it waits for the callback.
   ============================================================ */

// ── GA4 ────────────────────────────────────────────────────
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

// ── GOOGLE ADS ─────────────────────────────────────────────
var ADS_CONVERSION_ID  = 'AW-18235385879';
var ADS_LABEL_PHONE    = 'nnNaCPruitEcEJfQp_dD';   // "Phone call" conversion action

gtag('config', ADS_CONVERSION_ID);

function firePhoneConversion() {
  gtag('event', 'conversion', {
    send_to: ADS_CONVERSION_ID + '/' + ADS_LABEL_PHONE,
    value: 1.0,
    currency: 'USD'
  });
}

// ── UTM CAPTURE ────────────────────────────────────────────
// Store UTMs in sessionStorage so GHL CRM attribution survives page navigation
(function() {
  var params = new URLSearchParams(window.location.search);
  ['utm_source','utm_medium','utm_campaign','utm_term','utm_content','gclid'].forEach(function(key) {
    var val = params.get(key);
    if (val) sessionStorage.setItem(key, val);
  });
})();

// ── PHONE CLICK TRACKING ───────────────────────────────────
// Covers every tel: link on every page. The click is never cancelled, so the
// dialer opens natively even if the Ads tag is blocked or slow to respond.
document.addEventListener('click', function(e) {
  var el = e.target.closest('a[href^="tel:"]');
  if (el) {
    gtag('event', 'generate_lead', { event_category: 'phone_call', event_label: el.href });
    firePhoneConversion();
  }
});

// ── GHL FORM SUBMISSION TRACKING ──────────────────────────
// LeadConnector iframes post a message to the parent when the form is submitted
window.addEventListener('message', function(e) {
  var data = e.data;
  if (!data) return;

  // GHL sends either an object or a JSON string
  if (typeof data === 'string') {
    try { data = JSON.parse(data); } catch(err) { return; }
  }

  var isSubmission =
    data.type === 'form_submitted' ||          // most common
    data.event === 'form_submitted' ||         // alternate key
    data.event_id === 'form_submitted' ||      // older versions
    (data.action && data.action === 'submit'); // fallback

  if (isSubmission) {
    gtag('event', 'generate_lead', { event_category: 'form_submission', event_label: 'ghl_estimate_form' });
    // Conversion fired by GHL automation — do not double-fire here
  }
});
