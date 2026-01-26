const ONE_HOUR = 60 * 60 * 1000; // 1 hour in milliseconds

// Check if user is logged in and session is not expired
function isLoggedIn() {
    const item = localStorage.getItem('github_logged_in');
    if (!item) return false;

    try {
        const data = JSON.parse(item);
        const now = Date.now();
        if (now - data.timestamp > ONE_HOUR) {
            localStorage.removeItem('github_logged_in');
            return false;
        }
        return data.status === 'yes';
    } catch (e) {
        localStorage.removeItem('github_logged_in');
        return false;
    }
}

// Refresh login timestamp (rolling expiration)
function refreshLoginTime() {
    const item = localStorage.getItem('github_logged_in');
    if (!item) return;
    const data = JSON.parse(item);
    data.timestamp = Date.now();
    localStorage.setItem('github_logged_in', JSON.stringify(data));
}

// Soft login function
function softLogin(username = 'abcd') {
    const now = Date.now();
    localStorage.setItem('github_logged_in', JSON.stringify({ status: 'yes', timestamp: now }));
    localStorage.setItem('github_user', JSON.stringify({ login: username }));

    // Redirect back to the original page if stored
    const redirectAfterLogin = localStorage.getItem('post_login_redirect') || '/';
    localStorage.removeItem('post_login_redirect');
    window.location.href = redirectAfterLogin;
}

// Logout function
function logout() {
    localStorage.removeItem('github_logged_in');
    localStorage.removeItem('github_user');
    alert('Logged out');
    window.location.href = '/login.html';
}

// Call this on protected pages to enforce login
function enforceLogin() {
    if (!isLoggedIn()) {
        localStorage.setItem('post_login_redirect', window.location.href);
        window.location.href = '/login.html';
    } else {
        refreshLoginTime();
    }
}

// Get logged-in user (demo purposes)
function getUser() {
    const user = localStorage.getItem('github_user');
    return user ? JSON.parse(user) : null;
}
