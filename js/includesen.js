(async function () {

  async function inject(id, file) {
    const el = document.getElementById(id);
    if (!el) return;

    const res = await fetch(file, { cache: "no-cache" });

    if (!res.ok) {
      console.error("Cannot load:", file, res.status);
      return;
    }

    el.innerHTML = await res.text();
  }

  // Only footer
  await inject("site-footer", "/footer.html");

  // Year in footer
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

})();