// Function to toggle visibility
function showContent() {
    const loginBox = document.querySelector('.login');
    const mainContent = document.querySelector('.maincontent');
    if (loginBox) loginBox.style.display = 'none';
    if (mainContent) mainContent.style.display = 'block';
}

// 1. AUTOMATED CHECK ON PAGE LOAD
window.addEventListener('load', async () => {
    try {
        const check = await fetch('https://auth-phi-seven.vercel.app/api/auth', {
            method: 'GET',
            credentials: 'include' 
        });
        
        if (check.ok) {
            showContent();
        } else {
            // Redirect logic if not on home page
            const path = window.location.pathname;
            if (path !== "/" && path !== "/index.html") {
                // window.location.href = "https://www.syntrofin.com"; 
            }
        }
    } catch (err) {
        console.error("Auth check failed:", err);
    }
});

// 2. THE MANUAL LOGIN
async function login() {
    const userEl = document.getElementById('user');
    const passEl = document.getElementById('pass');
    
    // Check if elements exist on the current page before grabbing values
    if (!userEl || !passEl) return;

    const response = await fetch('https://auth-phi-seven.vercel.app/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', 
        body: JSON.stringify({ userId: userEl.value, password: passEl.value })
    });

    if (response.ok) {
        showContent();
    } else {
        alert("Invalid Login");
    }
}

// 3. ATTACH EVENT LISTENER SAFELY
// Using a check because not every page may have a login button
document.addEventListener('click', (e) => {
    if (e.target && e.target.id === 'login-btn') {
        login();
    }
});
