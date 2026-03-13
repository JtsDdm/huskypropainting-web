/* ============================================================
   HUSKY PRO PAINTING — analytics.js
   Meta Pixel + Google Analytics 4
   INSTRUCCIONES:
   1. Reemplaza PIXEL_ID con tu ID de Meta Pixel
   2. Reemplaza GA4_ID con tu ID de Google Analytics 4
   3. Descomenta ambos bloques cuando tengas los IDs
   ============================================================ */


// ── META PIXEL ─────────────────────────────────────────────
// Reemplaza PIXEL_ID con tu número (ej: 1234567890123456)
/*
!function(f,b,e,v,n,t,s){
  if(f.fbq)return;n=f.fbq=function(){
    n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)
  };
  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
  n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];
  s.parentNode.insertBefore(t,s)
}(window, document,'script','https://connect.facebook.net/en_US/fbevents.js');

fbq('init', 'PIXEL_ID');
fbq('track', 'PageView');
*/


// ── GOOGLE ANALYTICS 4 ─────────────────────────────────────
// Reemplaza GA4_ID con tu ID (ej: G-XXXXXXXXXX)
/*
window.dataLayer = window.dataLayer || [];
function gtag(){ dataLayer.push(arguments); }
gtag('js', new Date());
gtag('config', 'GA4_ID');
*/


// ── CONVERSION EVENTS ──────────────────────────────────────
// Estos eventos se disparan automáticamente desde main.js
// cuando el formulario es enviado:
//   fbq('track', 'Lead')       → Meta
//   gtag('event', 'generate_lead') → GA4
//
// Para Meta Conversions API (server-side) necesitas
// configurar el webhook en tu backend o en GHL.
// Ver: https://developers.facebook.com/docs/marketing-api/conversions-api
