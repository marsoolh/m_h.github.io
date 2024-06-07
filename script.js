document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.tab');
    const sections = document.querySelectorAll('.section');

    // Add an event listener to all tab elements
    tabs.forEach(tab => {
        tab.addEventListener('click', jumpToSection);
    });

    // Function to jump directly to the clicked section
    function jumpToSection(event) {
        const sectionId = event.target.getAttribute('data-section');
        const section = document.getElementById(sectionId);

        if (section) {
            window.scrollTo({
                top: section.offsetTop,
                behavior: 'auto'
            });
        }
    }

    // Optionally, activate the first section by default
    if (sections.length > 0) {
        sections[0].classList.add('active');
    }
});
