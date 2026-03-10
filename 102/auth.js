// Authorization using Vercel, https://vercel.com/syntrofins-projects
// Add maincontent wrapper
// 1. Create the wrapper element
const wrapper = document.createElement('div');

// 2. Apply your class and style
wrapper.className = 'maincontent';
wrapper.style.display = 'none'; // This injects style="display: none;"

// 3. Move all existing body children into the wrapper
while (document.body.firstChild) {
    wrapper.appendChild(document.body.firstChild);
}

// 4. Put the wrapper back into the body
document.body.appendChild(wrapper);



// Add Login-popup first
// 1. Inject the HTML first
document.body.insertAdjacentHTML('afterbegin', `
<div class="login">
    <h1>Syntrofin Login!!</h1>
    <div class="login-container">
        <input id="user" placeholder="User ID" autocomplete="username">
        <input id="pass" type="password" placeholder="Password" autocomplete="current-password">
        <button id="login-btn">Login</button>
    </div>
    <div id="test-msg" style="color: red; margin-top: 10px;"></div>
</div>
`);

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
