//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

//Al dar submit al form nos redirige a index.html y cambia el valor de logged a true
if (window.location == "login.html") {
    localStorage.setItem("logged", false);
}

document.addEventListener("DOMContentLoaded", function (e) {
    document.getElementById("form1").addEventListener("submit", (evento) => {
        evento.preventDefault();
        localStorage.setItem("logged", false);
        var inputEmail = document.getElementById("email");
        localStorage.setItem("email", inputEmail.value);
        location.href = "index.html";
        localStorage.setItem("logged", true);
    })
});

let auth2; // The Sign-In object.
let googleUser; // The current user.
let profile;

/**
 * Calls startAuth after Sign in V2 finishes setting up.
 */
const appStart = function () {
    gapi.load('auth2', initSigninV2);
};

function onSignIn(googleUser) {
    localStorage.setItem("logged", false);
    // Useful data for your client-side scripts:
    profile = googleUser.getBasicProfile();
    var inputEmail = profile.getName()
    localStorage.setItem("email", inputEmail);
    location.href = "index.html";
    localStorage.setItem("logged", true);
}

