const emailInput = document.getElementById("EmailInput");
const pwdInput = document.getElementById("PasswordInput");
const btnSignin = document.getElementById("btn-signin");
const signinForm = document.getElementById("signinForm");

btnSignin.addEventListener("click", checkCredentials);


function checkCredentials() {
    let dataForm = new FormData(signinForm);

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let raw = JSON.stringify({
        "username": dataForm.get("email"),
        "password": dataForm.get("password")
    });

    let requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };

    fetch(apiURL + "login", requestOptions)
    .then((response) => {
        if (!response.ok) {
            // Ajout de la classe d'erreur sur les champs email et mot de passe en cas d'erreur
            emailInput.classList.add("is-invalid");
            pwdInput.classList.add("is-invalid");
            throw new Error("Réponse non valide du serveur");
        }
        return response.json();  // Retourne la promesse pour la prochaine étape
    })
    .then((result) => {
        if (result?.apiToken) {
            const token = result.apiToken;
            setToken(token);
            setCookie(roleCookieName, result.roles?.[0] ?? "defaultRole", 7);
            window.location.replace("/");
        } else {
            throw new Error("apiToken manquant dans la réponse");
        }        
    })
    .catch((error) => {
        // Affiche l'erreur dans la console
        console.error(error);
    });
};