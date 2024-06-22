document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.tab a, .dropdown-content a');
    const headerHeight = document.querySelector('.header').offsetHeight;

    // Function to smoothly scroll to the section
    function scrollToSection(event) {
        const href = event.target.getAttribute('href');
        if (href && href.startsWith("#")) {
            event.preventDefault();
            const sectionId = href.substring(1);
            const section = document.getElementById(sectionId);

            if (section) {
                const offsetPosition = section.offsetTop - headerHeight;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                // Close the hamburger menu if open
                const hamburgerMenu = document.getElementById('hamburger-menu');
                if (hamburgerMenu.classList.contains('active')) {
                    hamburgerMenu.classList.remove('active');
                }
            }
        }
    }

    // Add an event listener to all tab and dropdown elements
    tabs.forEach(tab => {
        tab.addEventListener('click', scrollToSection);
    });

    // Toggle hamburger menu
    const hamburger = document.getElementById('hamburger');
    const hamburgerMenu = document.getElementById('hamburger-menu');
    hamburger.addEventListener('click', () => {
        hamburgerMenu.classList.toggle('active');
    });

    // Theme toggle functionality
    const themeToggleButton = document.getElementById('theme-toggle');
    themeToggleButton.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        document.body.classList.toggle('light-mode');

        document.querySelectorAll('.header, .container, .footer, .tab, .hamburger-menu, .about-me-intro, .about-me-details, .education-item, .certification-item, .professional-experience-section').forEach(element => {
            element.classList.toggle('dark-mode');
            element.classList.toggle('light-mode');
        });
    });
});
