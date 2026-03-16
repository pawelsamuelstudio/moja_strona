(async function () {
  async function inject(id, file) {
    const el = document.getElementById(id);
    if (!el) return;

    const res = await fetch(file, { cache: "no-cache" });
    if (!res.ok) {
      console.error("Nie mogę wczytać:", file, res.status);
      return;
    }
    el.innerHTML = await res.text();
  }

  // Tylko footer
  await inject("site-footer", "/footerpl.html");

  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
})();