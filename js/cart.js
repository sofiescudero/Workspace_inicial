var carrito = [];
//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
  getJSONData(CART_URL).then(function (resultObj) {
    if (resultObj.status === "ok") {

      carrito = resultObj.data.articles;
      let cartItems = document.getElementById("cartItems");
      for (let i = 0; i < carrito.length; i++) {

        cartItems.innerHTML += `
                <tr style="margin: auto; text-align: center;">
                <td><a href="product-info.html?product=`+ carrito[i].name + `" class="list-group-item list-group-item-action"> 
                <img style="max-width:100px; max-height:100px;"  src="` + carrito[i].src + `" class="img-thumbnail"></a></td>
                <td><h4 class="mb-1">`+ carrito[i].name + `</h4></td>
                <td><p> Cantidad: <input name="cantidad" id="cantidad`+ [i] + `" style="width: 1.5cm; border: 0;" min="1" type="number" value="` + carrito[i].count + `"></p></td>
                <td><p>` + carrito[i].currency + ` - ` + carrito[i].unitCost + `</p></td>
                <td id="valor`+ [i] + `">` + carrito[i].unitCost * carrito[i].count + `</td>
                </tr>`


        carrito.map(function (dato) {
          if (dato.currency == "USD") {
            dato.unitCost = dato.unitCost * 40;
            dato.currency = "UYU"
          }
          return dato;
        });
      }
      for (let i = 0; i < 2; i++) {
        document.getElementById("cantidad" + [i]).addEventListener('click',
          function refresh() {

            //tomo el valor en el elemento con id "cantidad[i]"
            var qty = document.getElementById("cantidad" + [i]).value;

            // tomo el elemento con el id "valor[i]" para modificar luego
            var valorTotal = document.getElementById("valor" + [i]);

            // modifico valorTotal por la multiplicacion entre la cantidad y el valor unitario
            valorTotal.innerHTML = qty * carrito[i].unitCost;

            // tomo el elemento con el id "subtotal" para modificar luego
            var subtotal = document.getElementById("subtotal");

            // modifico subtotal por el valor en la variable valorTotal
            subtotal.innerHTML = parseInt(document.getElementById("valor0").innerHTML) + parseInt(document.getElementById("valor1").innerHTML);
            var tarifa = 500;
            var empaqueYManejo = 150;
            document.getElementById("tarifa").innerHTML = tarifa;
            document.getElementById("empaque").innerHTML = empaqueYManejo;
            document.getElementById("totalFinal").innerHTML = tarifa + empaqueYManejo + parseInt(subtotal.innerHTML);
          })

        // sumamos
        // tomo el elemento con el id "subtotal" para modificar luego
        var subtotal = document.getElementById("subtotal");
        // modifico subtotal por el valor en la variable valorTotal
        subtotal.innerHTML = parseInt(document.getElementById("valor0").innerHTML) + parseInt(document.getElementById("valor1").innerHTML);
        var tarifa = 500;
        var empaqueYManejo = 150;
        document.getElementById("tarifa").innerHTML = tarifa;
        document.getElementById("empaque").innerHTML = empaqueYManejo;
        document.getElementById("totalFinal").innerHTML = tarifa + empaqueYManejo + parseInt(subtotal.innerHTML);
      }
    }
  })
});

document.addEventListener("DOMContentLoaded", function (e) {
  getJSONData(CART_URL).then(function (resultObj) {
    if (resultObj.status === "ok") {

      var cantidad = resultObj.data.articles[1].unitCost
      var nuevoValor = cantidad * 42.46

    }
  })
});

function finalizada() {
  alert("Felicidades, has completado tu compra. El total es " + "UYU - " + document.getElementById("totalFinal").innerHTML)
}