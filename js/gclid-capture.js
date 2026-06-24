(function() {
  const params = new URLSearchParams(window.location.search);
  const gclid = params.get('gclid');

  if (!gclid) return;

  function injectGclid() {
    const iframe = document.getElementById('inline-BCBxB8UhwNJGJPzIodqH')
                || document.querySelector('iframe[src*="BCBxB8UhwNJGJPzIodqH"]');

    if (iframe) {
      const src = iframe.src;
      const separator = src.includes('?') ? '&' : '?';
      iframe.src = src + separator + 'gclid=' + encodeURIComponent(gclid);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectGclid);
  } else {
    injectGclid();
  }
})();
