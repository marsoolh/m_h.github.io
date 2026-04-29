/* =============================================================
  FILE: js/navigation.js
  PURPOSE: Mobile menu toggle + active section highlighting.
  EDIT: No edits usually needed unless nav IDs/classes change.
============================================================= */
(function () {
  const menuToggle = document.querySelector("#menuToggle");
  const navMenu = document.querySelector("#navMenu");
  const navLinks = document.querySelectorAll(".nav a");
  const sections = document.querySelectorAll("main section[id]");

  if (!menuToggle || !navMenu) return;

  menuToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });

  const activeObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        navLinks.forEach((link) => {
          link.classList.toggle(
            "active",
            link.getAttribute("href") === `#${entry.target.id}`
          );
        });
      });
    },
    {
      rootMargin: "-35% 0px -55% 0px",
      threshold: 0
    }
  );

  sections.forEach((section) => activeObserver.observe(section));
})();
