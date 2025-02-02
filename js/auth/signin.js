const emailInput = document.getElementById("EmailInput");
const pwdInput = document.getElementById("PasswordInput");
const btnSignin = document.getElementById("btn-signin");

btnSignin.addEventListener("click", checkCredentials);


function checkCredentials() {
    // API call checking credentiails in DDB
    if (emailInput.value == "test@mail.com" && pwdInput.value == "123") {

        // We will need to retrieve the real token
        const token = "fehfzkhfeoziehfihermfoheomfhiomehfiohefm";
        // Place this token ok cookie
        setToken(token);

        setCookie(roleCookieName, "client", 7);
        window.location.replace("/");
    }
    else {
        emailInput.classList.add("is-invalid");
        pwdInput.classList.add("is-invalid");
    }
};


