document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.tab');
    const headerHeight = document.querySelector('.header').offsetHeight;
    const topBarHeight = document.querySelector('.top-bar').offsetHeight;
    const totalHeaderHeight = headerHeight + topBarHeight;
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
                top: section.offsetTop - totalHeaderHeight,
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

    const loginButton = document.getElementById('login-button');
    const logoutButton = document.getElementById('logout-button');
    const loginPage = document.getElementById('login-page');
    const loginSubmit = document.getElementById('login-submit');
    const closeLogin = document.getElementById('close-login');

    loginButton.addEventListener('click', () => {
        loginPage.style.display = 'flex';
    });

    loginSubmit.addEventListener('click', (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Signed in
                loginPage.style.display = 'none';
                loginButton.style.display = 'none';
                logoutButton.style.display = 'block';
                checkAuthState();
            })
            .catch((error) => {
                console.error('Error signing in:', error);
            });
    });

    logoutButton.addEventListener('click', () => {
        firebase.auth().signOut().then(() => {
            // Sign-out successful
            loginButton.style.display = 'block';
            logoutButton.style.display = 'none';
            checkAuthState();
        }).catch((error) => {
            console.error('Error signing out:', error);
        });
    });

    closeLogin.addEventListener('click', () => {
        loginPage.style.display = 'none';
    });

    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            loginButton.style.display = 'none';
            logoutButton.style.display = 'block';
            document.getElementById('post-form').style.display = 'block';
        } else {
            loginButton.style.display = 'block';
            logoutButton.style.display = 'none';
            document.getElementById('post-form').style.display = 'none';
        }
    });

    // Function to check the authentication state and show/hide post form
    function checkAuthState() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                document.getElementById('post-form').style.display = 'block';
            } else {
                document.getElementById('post-form').style.display = 'none';
            }
        });
    }

    // Add event listener to the post form
    document.getElementById('new-post-form').addEventListener('submit', function (e) {
        e.preventDefault();
        const title = document.getElementById('post-title').value;
        const content = document.getElementById('post-content').value;
        const date = document.getElementById('post-date').value;

        const sanitizedData = validateAndSanitizePostData(title, content, date);
        if (sanitizedData) {
            const postId = db.collection('posts').doc().id;

            db.collection('posts').doc(postId).set({
                ...sanitizedData,
                userId: firebase.auth().currentUser.uid, // Store the user's ID
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            }).then(() => {
                alert('Post added successfully!');
                window.location.reload();
            }).catch((error) => {
                console.error("Error adding post: ", error);
            });
        } else {
            alert('Invalid input data!');
        }
    });

    // Fetch and display posts from the database
    db.collection('posts').onSnapshot((snapshot) => {
        const postsList = document.getElementById('blogs-list');
        postsList.innerHTML = '';
        snapshot.forEach((doc) => {
            const post = doc.data();
            const postElement = document.createElement('li');
            postElement.innerHTML = `<b>${post.title}</b><p>Date Published: ${post.date}</p><p>${post.content}</p>`;
            postsList.appendChild(postElement);
        });
    });
});

// Function to validate and sanitize post data
function validateAndSanitizePostData(title, content, date) {
    // Simple validation checks
    if (!title || !content || !date) {
        return false;
    }

    // Sanitize inputs to prevent XSS
    const sanitizedTitle = title.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    const sanitizedContent = content.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    const sanitizedDate = date; // Assuming date is in a valid format

    return {
        title: sanitizedTitle,
        content: sanitizedContent,
        date: sanitizedDate
    };
}
