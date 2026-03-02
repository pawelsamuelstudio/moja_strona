(async function () {
  const path = window.location.pathname.toLowerCase();
  const isPL = path.includes("pl.html");

  const headerFile = isPL ? "headerpl.html" : "header.html";
  const footerFile = isPL ? "footerpl.html" : "footer.html";

  async function inject(id, file) {
    const el = document.getElementById(id);
    if (!el) return;

    const res = await fetch(file);
    el.innerHTML = await res.text();
  }

  await inject("site-header", headerFile);
  await inject("site-footer", footerFile);
})();