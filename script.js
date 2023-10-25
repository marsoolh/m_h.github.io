document.addEventListener("DOMContentLoaded", function () {
    const aboutTab = document.querySelector('.tab[data-section="about"]');
    const educationTab = document.querySelector('.tab[data-section="education"]');
    const experienceTab = document.querySelector('.tab[data-section="work"]');
    const projectsTab = document.querySelector('.tab[data-section="projects"]');
    const contactTab = document.querySelector('.tab[data-section="contact"]'); // New "Contact" tab
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

    // Event listener for the "Contact" tab
    contactTab.addEventListener('click', () => {
        scrollToSection('contact');
    });

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault(); // Prevent the default form submission

        // Collect form data
        const formData = new FormData(contactForm);

        // Send the data to the Formspree endpoint
        try {
            const response = await fetch('https://formspree.io/f/meqbnlek', {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                alert('Message sent successfully!');
                // You can add additional actions here if needed
            } else {
                alert('Message could not be sent. Please try again later.');
            }
        } catch (error) {
            console.error('Error sending the form data:', error);
            alert('An error occurred while sending the message. Please try again later.');
        }
    });
});
