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

  // FOOTER
  await inject("site-footer", "/footer.html");

  // REVIEWS
  await inject("reviews", "/reviews.html");

  // START CAROUSEL
  initReviewCarousel();

  // YEAR
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

})();

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