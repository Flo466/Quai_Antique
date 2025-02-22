const nameInput = document.getElementById("NameInput");
const firstNameInput = document.getElementById("FirstNameInput");
const emailInput = document.getElementById("EmailInput");
const passwordInput = document.getElementById("PasswordInput");
const validatePasswordInput = document.getElementById("ValidatePasswordInput");
const btnValidation = document.getElementById("btn-validation-inscription");
const signupForm = document.getElementById("signupForm");

// Listeners
nameInput.addEventListener("keyup", validateForm);
firstNameInput.addEventListener("keyup", validateForm);
emailInput.addEventListener("keyup", validateForm);
passwordInput.addEventListener("keyup", validateForm);
validatePasswordInput.addEventListener("keyup", validateForm);
btnValidation.addEventListener("click", signupUser)

// Validate form
function validateForm() {
    const nameIsOk = validateRequired(nameInput);
    const firstNameIsOk = validateRequired(firstNameInput);
    const emailIsOk = validateMail(emailInput);
    const passwordIsOk = validatePassword(passwordInput);
    const passwordConfirmIsOk = validateConfirmationPassword(passwordInput, validatePasswordInput);

    if(nameIsOk && firstNameIsOk && emailIsOk && passwordIsOk && passwordConfirmIsOk) {
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

function validatePassword(input) {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/;
    const passwordUser = input.value;
    if(passwordUser.match(passwordRegex)) {
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

function validateConfirmationPassword(inputPwd, inputConfirmPwd) {
    if(inputPwd.value == inputConfirmPwd.value) {
        inputConfirmPwd.classList.add("is-valid")
        inputConfirmPwd.classList.remove("is-invalid")
        return true;
    }
    else {
        inputConfirmPwd.classList.remove("is-valid")
        inputConfirmPwd.classList.add("is-invalid")
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

function signupUser() {

    let dataForm = new FormData(signupForm);

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let sanitizedFirstName = sanitizeHtml(dataForm.get("firstName").trim());
    let sanitizedLastName = sanitizeHtml(dataForm.get("name").trim());
    let sanitizedEmail = sanitizeHtml(dataForm.get("email").trim());
    let sanitizedPassword = sanitizeHtml(dataForm.get("password").trim());

    let raw = JSON.stringify({
        "firstName": sanitizedFirstName,
        "lastName": sanitizedLastName,
        "email": sanitizedEmail,
        "password": sanitizedPassword
    });

    let requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };

    fetch(apiURL + "registration", requestOptions)
    .then((response) => {
        if(response.ok) {
            return response.json()
        }
        else {
            alert("erreur lors de l'inscription")
        }  
    })
    .then((result) => {
        alert((dataForm.get("firstName")?.trim() ?? "Utilisateur") + ", votre inscription a bien été effectuée.");
        document.location.href = "/signin"
        console.log(result)
    })
    .catch((error) => console.error(error));
}