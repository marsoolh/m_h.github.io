document.addEventListener("DOMContentLoaded", function () {
    const tabs = document.querySelectorAll('.tab');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const sectionId = tab.getAttribute('data-section');
            const section = document.getElementById(sectionId);

            if (section) {
                window.scrollTo({
                    top: section.offsetTop - 100, // Adjust this value as needed
                    behavior: "smooth"
                });
            }
        });
    });
});
