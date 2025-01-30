const nameInput = document.getElementById("NameInput");
const firstNameInput = document.getElementById("FirstNameInput");
const emailInput = document.getElementById("EmailInput");
// const passwordInput = document.getElementById("PasswordInput");
// const validaterPasswordInput = document.getElementById("ValidaterPasswordInput");
const btnValidation = document.getElementById("btn-validation-inscription");

// Listeners
nameInput.addEventListener("keyup", validateForm);
firstNameInput.addEventListener("keyup", validateForm);
emailInput.addEventListener("keyup", validateForm);
// passwordInput.addEventListener("keyup", validateForm);
// validaterPasswordInput.addEventListener("keyup", validateForm);

// Validate form
function validateForm() {
    const nameIsOk = validateRequired(nameInput);
    const firstNameIsOk = validateRequired(firstNameInput);
    const emailIsOk = validateMail(emailInput);

    if(nameIsOk && firstNameIsOk && emailIsOk) {
        btnValidation.disabled = false;
    }
    else {
        btnValidation.disabled = true;
    }
};

function validateMail(input) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mailUser = input.value;
    if(mailUser.match(emailRegex)) {
        input.classList.add("is-valid");
        input.classList.remove("is-invalid");
        return true;
    }
    else {
        input.classList.remove("is-valid");
        input.classList.add("is-invalid");
        return false;
    }
};

function validateRequired(input) {
    if(input.value != "") {
        input.classList.add("is-valid");
        input.classList.remove("is-invalid");
        return true;
    }
    else {
        input.classList.remove("is-valid");
        input.classList.add("is-invalid");
        return false;
    }
};