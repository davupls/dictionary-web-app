const fontBtn = document.getElementById('font-btn');
const fontOptions = document.getElementById('font-options');

fontBtn.addEventListener('click', () => {
  const isExpanded = fontBtn.getAttribute('aria-expanded') === 'true';
  fontBtn.setAttribute('aria-expanded', !isExpanded);
  fontOptions.hidden = isExpanded;
});

fontOptions.addEventListener('click', (e) => {
  if (e.target.tagName === 'LI') {
    const selectedFont = e.target.dataset.font;
    document.body.style.fontFamily = selectedFont;
    // Optionally update button text to reflect the selected font
    fontBtn.innerHTML = `${e.target.textContent} <span class="arrow">&#x25BC;</span>`;
    // Close the dropdown
    fontBtn.setAttribute('aria-expanded', 'false');
    fontOptions.hidden = true;
  }
});