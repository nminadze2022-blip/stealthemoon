document.addEventListener("DOMContentLoaded", () => {
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  const header = document.querySelector(".site-header");
  let scrollRafId;

  const updateHeaderOnScroll = () => {
    if (!header) return;
    const shouldBeScrolled = window.scrollY > 12;
    header.classList.toggle("scrolled", shouldBeScrolled);
  };

  window.addEventListener("scroll", () => {
    if (scrollRafId) cancelAnimationFrame(scrollRafId);
    scrollRafId = requestAnimationFrame(updateHeaderOnScroll);
  });

  updateHeaderOnScroll();

  const orbit = document.querySelector(".orbit");
  if (!orbit) return;

  let pointerRafId;

  const handleMove = (event) => {
    const rect = orbit.getBoundingClientRect();
    const x = (event.clientX - (rect.left + rect.width / 2)) / rect.width;
    const y = (event.clientY - (rect.top + rect.height / 2)) / rect.height;

    const maxTranslate = 10;
    const translateX = -(x * maxTranslate);
    const translateY = -(y * maxTranslate);

    orbit.style.transform = `translate3d(${translateX}px, ${translateY}px, 0)`;
  };

  const onPointerMove = (event) => {
    if (pointerRafId) cancelAnimationFrame(pointerRafId);
    pointerRafId = requestAnimationFrame(() => handleMove(event));
  };

  window.addEventListener("pointermove", onPointerMove);

  window.addEventListener("blur", () => {
    orbit.style.transform = "translate3d(0, 0, 0)";
  });
});

