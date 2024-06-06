document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.tab');
    const sections = document.querySelectorAll('.section');

    // Add an event listener to all tab elements
    tabs.forEach(tab => {
        tab.addEventListener('click', scrollToSection);
    });

    // Function to scroll to the clicked section
    function scrollToSection(event) {
        const sectionId = event.target.getAttribute('data-section');
        const section = document.getElementById(sectionId);

        if (section) {
            section.scrollIntoView({
                // Remove behavior option for instant scrolling
                // behavior: 'smooth',
            });
        }
    }
    
    // Optionally, activate the first section by default
    if (sections.length > 0) {
        sections[0].classList.add('active');
    }
});
