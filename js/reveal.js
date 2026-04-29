/* =============================================================
  FILE: js/reveal.js
  PURPOSE: Smooth reveal-on-scroll animation.
  EDIT: Add class="reveal" to any element you want animated.
============================================================= */
(function () {
  const revealItems = document.querySelectorAll(".reveal");

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.14 }
  );

  revealItems.forEach((item) => revealObserver.observe(item));
})();
