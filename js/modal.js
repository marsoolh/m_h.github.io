/* =============================================================
  FILE: js/modal.js
  PURPOSE: Resume popup open/close behavior.
  EDIT: Popup text lives in index.html inside #resumeModal.
============================================================= */
(function () {
  const resumeModal = document.querySelector("#resumeModal");
  const resumeTriggers = document.querySelectorAll(".resume-trigger");
  const closeModalButtons = document.querySelectorAll("[data-close-modal]");

  if (!resumeModal) return;

  const openModal = () => {
    resumeModal.classList.add("open");
    resumeModal.setAttribute("aria-hidden", "false");
  };

  const closeModal = () => {
    resumeModal.classList.remove("open");
    resumeModal.setAttribute("aria-hidden", "true");
  };

  resumeTriggers.forEach((button) => {
    button.addEventListener("click", openModal);
  });

  closeModalButtons.forEach((button) => {
    button.addEventListener("click", closeModal);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeModal();
  });
})();
