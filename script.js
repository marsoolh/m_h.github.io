// Define the scrollToSection function
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const aboutTab = document.querySelector('.tab[data-section="about"]');
    const educationTab = document.querySelector('.tab[data-section="education"]');
    const experienceTab = document.querySelector('.tab[data-section="work"]');
    const projectsTab = document.querySelector('.tab[data-section="projects"]');
    const contactTab = document.querySelector('.tab[data-section="contact"]');
    const contactForm = document.getElementById('contactForm');

    aboutTab.addEventListener('click', () => {
        scrollToSection('about');
    });

    educationTab.addEventListener('click', () => {
        scrollToSection('education');
    });

    experienceTab.addEventListener('click', () => {
        scrollToSection('work');
    });

    projectsTab.addEventListener('click', () => {
        scrollToSection('projects');
    });

    contactTab.addEventListener('click', () => {
        // Show the contact modal and load "contact.html" content
        contactModal.style.display = 'block';
        loadContactForm(); // Function to load contact form content
    });

   
