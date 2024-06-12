document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.tab');
    const headerHeight = document.querySelector('.header').offsetHeight;
    const topBarHeight = document.querySelector('.top-bar').offsetHeight;
    const totalHeaderHeight = headerHeight + topBarHeight;
    const hamburger = document.getElementById('hamburger');
    const hamburgerMenu = document.getElementById('hamburger-menu');

    tabs.forEach(tab => {
        tab.addEventListener('click', jumpToSection);
    });

    function jumpToSection(event) {
        const sectionId = event.target.getAttribute('data-section');
        const section = document.getElementById(sectionId);

        if (section) {
            window.scrollTo({
                top: section.offsetTop - totalHeaderHeight,
                behavior: 'smooth'
            });

            if (hamburgerMenu.classList.contains('active')) {
                hamburgerMenu.classList.remove('active');
            }
        }
    }

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
                loginPage.style.display = 'none';
                loginButton.style.display = 'none';
                logoutButton.style.display = 'block';
                document.getElementById('post-form').style.display = 'block';
            })
            .catch((error) => {
                console.error('Error signing in:', error);
            });
    });

    logoutButton.addEventListener('click', () => {
        firebase.auth().signOut().then(() => {
            loginButton.style.display = 'block';
            logoutButton.style.display = 'none';
            document.getElementById('post-form').style.display = 'none';
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

    document.getElementById('new-post-form').addEventListener('submit', function (e) {
        e.preventDefault();
        const title = document.getElementById('post-title').value;
        const content = document.getElementById('post-content').value;
        const date = document.getElementById('post-date').value;
        const link = document.getElementById('post-link').value;

        const sanitizedData = validateAndSanitizePostData(title, content, date, link);
        if (sanitizedData) {
            const postId = firebase.firestore().collection('posts').doc().id;

            firebase.firestore().collection('posts').doc(postId).set({
                ...sanitizedData,
                userId: firebase.auth().currentUser.uid,
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            }).then(() => {
                console.log('Post added successfully!');
                document.getElementById('new-post-form').reset();
                fetchPosts();
                generatePostHTML(sanitizedData); // Generate HTML for manual addition to GitHub
            }).catch((error) => {
                console.error("Error adding post: ", error);
            });
        } else {
            alert('Invalid input data!');
        }
    });

    function fetchPosts() {
        firebase.firestore().collection('posts').onSnapshot((snapshot) => {
            const postsList = document.getElementById('blogs-list');
            postsList.innerHTML = ''; // Clear the current list
            snapshot.forEach((doc) => {
                const post = doc.data();
                const postElement = document.createElement('li');
                if (post.link) {
                    postElement.innerHTML = `<a href="${post.link}" target="_blank"><b>${post.title}</b></a><p>Date Published: ${post.date}</p><p>${post.content}</p>`;
                } else {
                    postElement.innerHTML = `<a href="#" data-index="${doc.id}" class="post-title"><b>${post.title}</b></a><p>Date Published: ${post.date}</p><p>${post.content}</p>`;
                }
                postsList.appendChild(postElement);
            });
            addPostClickListeners();
        });
    }

    function addPostClickListeners() {
        document.querySelectorAll('.post-title').forEach(title => {
            title.addEventListener('click', (event) => {
                event.preventDefault();
                const index = event.target.getAttribute('data-index');
                const post = firebase.firestore().collection('posts').doc(index).get().then((doc) => {
                    if (doc.exists) {
                        const post = doc.data();
                        alert(`Title: ${post.title}\nDate: ${post.date}\n\n${post.content}`);
                    } else {
                        console.error("No such document!");
                    }
                }).catch((error) => {
                    console.error("Error getting document:", error);
                });
            });
        });
    }

    function generatePostHTML(post) {
        const postHTML = post.link
            ? `<li>\n<a href="${post.link}" target="_blank"><b>${post.title}</b></a>\n<p>Date Published: ${post.date}</p>\n<p>${post.content}</p>\n</li>`
            : `<li>\n<a href="#" class="post-title"><b>${post.title}</b></a>\n<p>Date Published: ${post.date}</p>\n<p>${post.content}</p>\n</li>`;
        console.log('Add the following HTML to your GitHub repository:\n', postHTML);
    }

    fetchPosts(); // Fetch posts for everyone on initial load
});

function validateAndSanitizePostData(title, content, date, link) {
    if (!title || !content || !date) {
        return false;
    }

    const sanitizedTitle = title.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    const sanitizedContent = content.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    const sanitizedDate = date;
    const sanitizedLink = link ? link.replace(/</g, "&lt;").replace(/>/g, "&gt;") : '';

    return {
        title: sanitizedTitle,
        content: sanitizedContent,
        date: sanitizedDate,
        link: sanitizedLink
    };
}
