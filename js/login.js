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
    $("#signInId").hide();

    // Useful data for your client-side scripts:
    profile = googleUser.getBasicProfile();

    console.log("ID: " + profile.getId()); // Don't send this directly to your server!
    console.log('Full Name: ' + profile.getName());
    console.log('Given Name: ' + profile.getGivenName());
    console.log('Family Name: ' + profile.getFamilyName());
    console.log("Image URL: " + profile.getImageUrl());
    console.log("Email: " + profile.getEmail());
    showSidebarMessage('Welcome ' + profile.getGivenName() + '!');
    showSidebarMessage('Your email ' + profile.getEmail() + '!');

    // The ID token you need to pass to your backend:
    const id_token = googleUser.getAuthResponse().id_token;
    console.log("ID Token: " + id_token);

    window.location.replace(window.location.origin + '/login?username=' + profile.getEmail());

}

