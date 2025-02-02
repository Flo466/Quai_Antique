const tokenCookieName = "accestoken";
const roleCookieName = "admin"
const signoutBtn = document.getElementById("signout-btn");

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

function setCookie(name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
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