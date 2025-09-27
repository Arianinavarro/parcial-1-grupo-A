document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const errorMessage = document.getElementById('error-message');
    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const username = event.target.username.value.trim();
        const password = event.target.password.value.trim();
        const validUser = 'ana';
        const validPass = '123';
        if (username === validUser && password === validPass) {
            sessionStorage.setItem('isLoggedIn', 'true');
            window.location.href = 'index.html';
        } else {
            errorMessage.style.display = 'block';
        }
    });
});
