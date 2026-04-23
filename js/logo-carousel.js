document.addEventListener('DOMContentLoaded', function () {
  const track = document.querySelector('.logo-track');
  if (!track) return;

  const items = Array.from(track.children);
  if (!items.length) return;

  const cloneCount = 4; // na końcu masz powtórzone 4 pierwsze loga
  const originalCount = items.length - cloneCount;

  let index = 0;
  let timer = null;

  const HOLD_TIME = 2200; // postój
  const MOVE_TIME = 700;  // czas przesunięcia

  function getItemWidth() {
    const firstItem = track.children[0];
    return firstItem ? firstItem.getBoundingClientRect().width : 0;
  }

  function setPosition(withAnimation = true) {
    const step = getItemWidth();
    if (!step) return;

    if (withAnimation) {
      track.classList.add('is-animating');
    } else {
      track.classList.remove('is-animating');
    }

    track.style.transform = `translateX(-${index * step}px)`;
  }

  function nextSlide() {
    index += 1;
    setPosition(true);

    setTimeout(() => {
      if (index >= originalCount) {
        index = 0;
        setPosition(false);
      }
    }, MOVE_TIME);
  }

  function startLoop() {
    stopLoop();
    timer = setInterval(nextSlide, HOLD_TIME + MOVE_TIME);
  }

  function stopLoop() {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
  }

  let resizeTimeout = null;

  function handleResize() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      setPosition(false);
      startLoop();
    }, 150);
  }

  setPosition(false);

  setTimeout(() => {
    startLoop();
  }, HOLD_TIME);

  window.addEventListener('resize', handleResize);
});