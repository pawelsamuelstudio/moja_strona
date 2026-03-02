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

  // EN VERSION
  await inject("site-header", "/header.html");
  await inject("site-footer", "/footer.html");

  // Hamburger
  const hamburger = document.getElementById("hamburger");
  const mobileMenu = document.getElementById("mobileMenu");

  if (hamburger && mobileMenu && !hamburger.dataset.bound) {
    hamburger.dataset.bound = "1";

    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      mobileMenu.classList.toggle("active");
    });

    mobileMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        mobileMenu.classList.remove("active");
      });
    });
  }

  // Rok w stopce
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

})();