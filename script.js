document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.tab');
    const headerHeight = document.querySelector('.header').offsetHeight;
    const hamburger = document.getElementById('hamburger');
    const hamburgerMenu = document.getElementById('hamburger-menu');

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
                top: section.offsetTop - headerHeight,
                behavior: 'smooth'
            });

            // Close the hamburger menu if open
            if (hamburgerMenu.classList.contains('active')) {
                hamburgerMenu.classList.remove('active');
            }
        }
    }

    // Toggle hamburger menu
    hamburger.addEventListener('click', () => {
        hamburgerMenu.classList.toggle('active');
    });
});
