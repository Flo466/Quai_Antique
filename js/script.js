const tokenCookieName = "accestoken";
const roleCookieName = "client"
const signoutBtn = document.getElementById("signout-btn");
const apiURL = "https://127.0.0.1:8000/api/";

signoutBtn.addEventListener("click", signOut);

function getRole() {
    return getCookie(roleCookieName);
}

function signOut() {
    eraseCookie(tokenCookieName);
    eraseCookie(roleCookieName)
;    window.location.reload();
}

function setToken(token) {
    setCookie(tokenCookieName, token, 7)
};

function getToken() {
    return getCookie(tokenCookieName);
}

function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        let date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

function getCookie(name) {
    let nameEQ = name + "=";
    let ca = document.cookie.split(';');
    for(const element of ca) {
        let c = element;
        while (c.startsWith(' ')) c = c.substring(1,c.length);
        if (c.startsWith(nameEQ)) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

function eraseCookie(name) {   
    document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

function isConnected() {
    return getToken() !== null && getToken() !== undefined && getToken() !== "";
}

function showAndHideElementsForRole() {
    const userConnected = isConnected();
    const role = getRole();

    let allelementsToEdit = document.querySelectorAll('[data-show]');

    allelementsToEdit.forEach(element => {
        switch(element.dataset.show) {
            case 'disconnected':
                if(userConnected) {
                    element.classList.add("d-none");
                }
                break;
            case 'connected':
                if(!userConnected) {
                    element.classList.add("d-none");
                }
                break;
            case 'admin':
                if(!userConnected || role != "admin") {
                    element.classList.add("d-none");
                }
                break;
            case 'client':
                if(!userConnected || role != "client") {
                    element.classList.add("d-none");
                }
                break;
        }
    })
};

function sanitizeHtml(text) {
    const tempHtml = document.createElement("div");
    tempHtml.textContent = text;
    return tempHtml.innerHTML
};

function getInfoUser() {
    const myHeaders = new Headers();
    myHeaders.append("X-AUTH-TOKEN", getToken())

    let requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
    };

    fetch(apiURL+"account/me", requestOptions)
    .then((response) => {
        if(response.ok) {
            return response.json()
        }
        else {
            console.log("Cannot get user informations")
        }  
    })
    .then((result) => {
        return result;
    })
    .catch((error) => console.error(error));
};