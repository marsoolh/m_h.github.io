/* =============================================================
  FILE: js/script.js
  PURPOSE: Small page-level scripts.
  NOTE: This file should be loaded after navigation.js, modal.js, and reveal.js.
============================================================= */
(function () {
  const year = document.querySelector("#year");
  if (year) year.textContent = new Date().getFullYear();
})();
