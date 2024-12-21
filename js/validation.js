class FormValidator {
    static validateUsername(username) {
        if (username.length < 3) {
            return 'Username must be at least 3 characters long';
        }
        
        if (!/^[a-zA-Z0-9_]+$/.test(username)) {
            return 'Username can only contain letters, numbers, and underscores';
        }
        
        return null;
    }

    static validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return 'Please enter a valid email address';
        }
        
        return null;
    }

    static validatePassword(password) {
        if (password.length < 8) {
            return 'Password must be at least 8 characters long';
        }
        
        if (!/(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])/.test(password)) {
            return 'Password must include uppercase, lowercase, number, and special character';
        }
        
        return null;
    }

    static validateConfirmPassword(password, confirmPassword) {
        if (password !== confirmPassword) {
            return 'Passwords do not match';
        }
        
        return null;
    }
}
