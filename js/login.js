//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

//Al dar submit al form nos redirige a index.html y cambia el valor de logged a true
sessionStorage.setItem("logged", false);
document.addEventListener("DOMContentLoaded", function(e){
   document.getElementById("form1").addEventListener("submit", (evento)=> {
       evento.preventDefault();
       location.href = "index.html";
       sessionStorage.setItem("logged") = true;
       return true;
   })
   function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
  }
  var id_token = googleUser.getAuthResponse().id_token;
  postAJAX('/server/sign-in', {id_token: id_token})
  .then(function(user) {
      // The user is now signed in on the server too
      // and the user should now have a session cookie
      // for the whole site. 
      evento.preventDefault();
      document.location.href = "index.html"+ user.username;
       sessionStorage.setItem("logged") = true;
       return true;
  })
  
});