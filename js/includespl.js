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

  // Footer
  await inject("site-footer", "/footerpl.html");
  initFooterAccordion();

  // Opinie
  await inject("opinie", "/opinie.html");

  // Karuzela opinii
  initReviewCarousel();

  // Rok w stopce
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
})();

function initFooterAccordion() {
  const accordions = document.querySelectorAll(".footer-accordion");
  if (!accordions.length) return;

  const mobileBreakpoint = 760;
  const isMobileOrTablet = () => window.innerWidth <= mobileBreakpoint;

  function closeAccordion(item) {
    const button = item.querySelector(".footer-accordion-toggle");
    const content = item.querySelector(".footer-accordion-content");
    if (!button || !content) return;

    item.classList.remove("active");
    button.setAttribute("aria-expanded", "false");
    content.style.maxHeight = "0px";
    content.style.marginTop = "0px";
  }

  function openAccordion(item) {
    const button = item.querySelector(".footer-accordion-toggle");
    const content = item.querySelector(".footer-accordion-content");
    if (!button || !content) return;

    item.classList.add("active");
    button.setAttribute("aria-expanded", "true");
    content.style.marginTop = "14px";
    content.style.maxHeight = content.scrollHeight + "px";
  }

  function resetAccordionState() {
    accordions.forEach((item) => {
      const button = item.querySelector(".footer-accordion-toggle");
      const content = item.querySelector(".footer-accordion-content");
      if (!button || !content) return;

      if (isMobileOrTablet()) {
        item.classList.remove("active");
        button.setAttribute("aria-expanded", "false");
        content.style.maxHeight = "0px";
        content.style.marginTop = "0px";
      } else {
        item.classList.remove("active");
        button.setAttribute("aria-expanded", "true");
        content.style.maxHeight = "none";
        content.style.marginTop = "18px";
      }
    });
  }

  accordions.forEach((item) => {
    const button = item.querySelector(".footer-accordion-toggle");
    if (!button) return;

    button.addEventListener("click", () => {
      if (!isMobileOrTablet()) return;

      const isOpen = item.classList.contains("active");

      if (isOpen) {
        closeAccordion(item);
      } else {
        openAccordion(item);
      }
    });
  });

  window.addEventListener("resize", resetAccordionState);
  resetAccordionState();
}

function initReviewCarousel() {
  const reviewCarousel = document.querySelector(".review-carousel");
  if (!reviewCarousel) return;

  const reviewTrack = reviewCarousel.querySelector(".review-carousel__track");
  const reviewSlides = Array.from(reviewCarousel.querySelectorAll(".review-slide"));
  const reviewPrev = reviewCarousel.querySelector(".review-carousel__arrow--prev");
  const reviewNext = reviewCarousel.querySelector(".review-carousel__arrow--next");

  if (!reviewTrack || !reviewSlides.length) return;

  let reviewIndex = 0;
  let reviewInterval = null;

  function showReview(index) {
    reviewIndex = (index + reviewSlides.length) % reviewSlides.length;
    reviewTrack.style.transform = `translateX(-${reviewIndex * 100}%)`;
  }

  function stopAutoplay() {
    if (reviewInterval) {
      clearInterval(reviewInterval);
      reviewInterval = null;
    }
  }

  function startAutoplay() {
    stopAutoplay();
    reviewInterval = setInterval(() => {
      showReview(reviewIndex + 1);
    }, 4000);
  }

  if (reviewPrev) {
    reviewPrev.addEventListener("click", () => {
      showReview(reviewIndex - 1);
      startAutoplay();
    });
  }

  if (reviewNext) {
    reviewNext.addEventListener("click", () => {
      showReview(reviewIndex + 1);
      startAutoplay();
    });
  }

  reviewCarousel.addEventListener("mouseenter", stopAutoplay);
  reviewCarousel.addEventListener("mouseleave", startAutoplay);

  showReview(0);
  startAutoplay();
}