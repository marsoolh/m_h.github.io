// Add an event listener to all tab elements
document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', scrollToSection);
});

// Function to scroll to the clicked section
function scrollToSection(event) {
    const sectionId = event.target.getAttribute('data-section');
    const section = document.getElementById(sectionId);

    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
        });
    }
}
