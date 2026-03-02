(function() {
    // 1. THE "SHIELD": Hide body immediately to prevent flickering
    const style = document.createElement('style');
    style.id = 'auth-shield';
    style.innerHTML = 'body { display: none !important; }';
    document.head.appendChild(style);

    const currentPath = window.location.pathname;
    const isLoginPage = currentPath.includes('login.html');

    async function checkGlobalAuth() {
        try {
            const response = await fetch('https://auth-phi-seven.vercel.app', {
                method: 'GET',
                credentials: 'include' 
            });

            if (response.ok) {
                if (isLoginPage) {
                    // LOGGED IN & ON LOGIN PAGE: Send them to their destination or index
                    let destination = document.referrer;
                    if (!destination || destination.includes('login.html')) {
                        destination = "index.html";
                    }
                    window.location.replace(destination);
                } else {
                    // LOGGED IN & ON PRIVATE PAGE: Just show the page!
                    liftShield(); 
                }
            } else {
                // NOT LOGGED IN: If they aren't on login.html, kick them there
                if (!isLoginPage) {
                    window.location.replace("login.html");
                } else {
                    liftShield(); // Let them see the login box
                }
            }
        } catch (err) {
            console.error("Auth check failed:", err);
            liftShield(); // Fallback so page isn't permanently blank
        }
    }

    function liftShield() {
        const shield = document.getElementById('auth-shield');
        if (shield) shield.remove();
        if (document.body) document.body.style.display = 'block';
    }

    // Run check immediately
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", checkGlobalAuth);
    } else {
        checkGlobalAuth();
    }

    // THE MANUAL LOGIN (Triggered by button)
    window.login = async function() {
        const userEl = document.getElementById('user');
        const passEl = document.getElementById('pass');
        const msg = document.getElementById('test-msg');
        if (!userEl || !passEl) return;

        try {
            const response = await fetch('https://auth-phi-seven.vercel.app', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include', 
                body: JSON.stringify({ userId: userEl.value, password: passEl.value })
            });

            if (response.ok) {
                // Successful login: Redirect to index or original destination
                window.location.replace("index.html");
            } else {
                if (msg) msg.innerText = "Invalid Login";
            }
        } catch (err) {
            if (msg) msg.innerText = "Connection Error";
        }
    };
})();
