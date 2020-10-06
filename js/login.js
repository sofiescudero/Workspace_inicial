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