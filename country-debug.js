(() => {
  const root = document.querySelector('#countryPage');
  if (!root) return;
  window.setTimeout(async () => {
    if (!root.querySelector('.skeleton')) return;
    root.innerHTML = '<section class="page-hero compact"><span class="kicker">DIAGNOSTIC</span><h1>External diagnostic script executed.</h1><p id="diag-result">Checking country data…</p></section>';
    const result = document.querySelector('#diag-result');
    try {
      const response = await fetch('data.json', { cache: 'no-store' });
      if (!response.ok) throw new Error('data.json HTTP ' + response.status);
      const data = await response.json();
      result.textContent = 'data.json loaded successfully. Country records: ' + (Array.isArray(data.countries) ? data.countries.length : 'missing') + '. country.js did not render the page.';
    } catch (error) {
      result.textContent = 'Diagnostic script ran, but data.json failed: ' + (error && error.message ? error.message : String(error));
    }
  }, 5000);
})();