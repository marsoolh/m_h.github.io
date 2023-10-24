document.addEventListener("DOMContentLoaded", function () {
    const aboutTab = document.querySelector('.tab[data-section="about"]');
    const educationTab = document.querySelector('.tab[data-section="education"]');
    const experienceTab = document.querySelector('.tab[data-section="work"]');
    const projectsTab = document.querySelector('.tab[data-section="projects"]');
    // Remove the reference to the "Contact" tab
    // const contactTab = document.querySelector('.tab[data-section="contact"]');
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

    // Remove the event listener for the "Contact" tab
    /*
    contactTab.addEventListener('click', () => {
        scrollToSection('contact');
    });
    */

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevent the default form submission
        // Collect form data
        const formData = new FormData(contactForm);
        // Send the data to the specified email address (e.g., chat@gmail.com)
        // You may use a server-side script to send the email.
        // Example: fetch('send_email.php', { method: 'POST', body: formData });
        // Replace 'send_email.php' with the actual server-side script.
        alert('Message sent successfully!'); // For demonstration purposes
    });

    function scrollToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            window.scrollTo({
                top: section.offsetTop - 100,
                behavior: "smooth"
            });
        }
    }
});
