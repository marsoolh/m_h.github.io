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

    const contactModal = document.getElementById('contactModal');
    const closeModal = document.getElementById('closeModal');
    const contactFormContainer = document.getElementById('contactFormContainer');

    closeModal.addEventListener('click', () => {
        // Close the contact modal
        contactModal.style.display = 'none';
    });

    // Function to load "contact.html" content into the modal
    function loadContactForm() {
        fetch('contact.html')
            .then(response => response.text())
            .then(data => {
                contactFormContainer.innerHTML = data;
            })
            .catch(error => {
                console.error('Error loading contact form:', error);
            });
    }
});
