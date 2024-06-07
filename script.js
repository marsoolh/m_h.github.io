document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.tab, .mobile-tab');
    const sections = document.querySelectorAll('.section');
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const mobileNav = document.querySelector('.mobile-nav');

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

        // Close the mobile nav after selection
        if (mobileNav.classList.contains('active')) {
            mobileNav.classList.remove('active');
        }
    }

    // Toggle the mobile nav menu
    hamburgerMenu.addEventListener('click', () => {
        mobileNav.classList.toggle('active');
    });

    // Optionally, activate the first section by default
    if (sections.length > 0) {
        sections[0].classList.add('active');
    }
});
