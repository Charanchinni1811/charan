document.addEventListener('DOMContentLoaded', () => {
    const startLoginBtn = document.getElementById('start-login-btn');
    
    startLoginBtn.addEventListener('click', () => {
        // Redirect to login page
        window.location.href = '/public/login.html';
    });
});