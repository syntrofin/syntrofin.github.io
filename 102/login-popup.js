document.addEventListener('DOMContentLoaded', () => {
    document.body.insertAdjacentHTML('afterbegin', `
    <div class="login">
        <h1>Syntrofin Login!!</h1>
        <div class="login-container">
            <input id="user" placeholder="User ID">
            <input id="pass" type="password" placeholder="Password">
            <button id="login-btn">Login</button>
        </div>
        <div id="test-msg" style="color: red; margin-top: 10px;"></div>
    </div>
    `);
});


