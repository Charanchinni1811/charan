class AccountRegistration {
    constructor() {
        this.form = document.getElementById('registrationForm');
        this.username = document.getElementById('username');
        this.email = document.getElementById('email');
        this.password = document.getElementById('password');
        this.confirmPassword = document.getElementById('confirmPassword');
        
        this.usernameError = document.getElementById('usernameError');
        this.emailError = document.getElementById('emailError');
        this.passwordError = document.getElementById('passwordError');
        this.confirmPasswordError = document.getElementById('confirmPasswordError');
        
        this.initEventListeners();
    }

    initEventListeners() {
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.validateForm();
        });

        // Real-time validation
        this.username.addEventListener('input', () => this.validateField(
            this.username, 
            FormValidator.validateUsername, 
            this.usernameError
        ));

        this.email.addEventListener('input', () => this.validateField(
            this.email, 
            FormValidator.validateEmail, 
            this.emailError
        ));

        this.password.addEventListener('input', () => this.validateField(
            this.password, 
            FormValidator.validatePassword, 
            this.passwordError
        ));

        this.confirmPassword.addEventListener('input', () => this.validateConfirmPasswordField());
    }

    validateField(inputElement, validationFunction, errorElement) {
        const errorMessage = validationFunction(inputElement.value.trim());
        errorElement.textContent = errorMessage || '';
        return !errorMessage;
    }

    validateConfirmPasswordField() {
        const errorMessage = FormValidator.validateConfirmPassword(
            this.password.value, 
            this.confirmPassword.value
        );
        this.confirmPasswordError.textContent = errorMessage || '';
        return !errorMessage;
    }

    validateForm() {
        const isUsernameValid = this.validateField(
            this.username, 
            FormValidator.validateUsername, 
            this.usernameError
        );
        
        const isEmailValid = this.validateField(
            this.email, 
            FormValidator.validateEmail, 
            this.emailError
        );
        
        const isPasswordValid = this.validateField(
            this.password, 
            FormValidator.validatePassword, 
            this.passwordError
        );
        
        const isConfirmPasswordValid = this.validateConfirmPasswordField();

        if (isUsernameValid && isEmailValid && isPasswordValid && isConfirmPasswordValid) {
            this.submitRegistration();
        }
    }}
