var USDtoUY = 40
var carrito = [];
let valorEnvio = 0.15;
//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

function mostrarCarritoList(carrito) {
  let cartItems = document.getElementById("cartItems");
  for (let i = 0; i < carrito.length; i++) {

    cartItems.innerHTML += `
                <tr class="producto" id="`+ i + `" style="margin: auto; text-align: center;">
                <td><a href="product-info.html?product=`+ carrito[i].name + `" class="list-group-item list-group-item-action"> 
                <img style="max-width:100px; max-height:100px;"  src="` + carrito[i].src + `" class="img-thumbnail"></a></td>
                <td><h4 class="mb-1">`+ carrito[i].name + `</h4></td>
                <td><p> Cantidad: <input name="cantidad" onclick="modificarValor(carrito);" class="cantidad" id="cantidad`+ [i] + `" style="width: 1.5cm; border: 0;" min="1" type="number" value="` + carrito[i].count + `"></p></td>
                <td><p>` + carrito[i].currency + ` - ` + carrito[i].unitCost + `</p></td>
                <td id="valor`+ [i] + `">` + carrito[i].unitCost * carrito[i].count + `</td>
                <td><img id="eliminar`+ i + `" style="max-width: 1cm; max-height: 1cm;"  src="img/trash.png" class="img-thumbnail"></td>
                </tr>`


    carrito.map(function (dato) {
      if (dato.currency == "USD") {
        dato.unitCost = dato.unitCost * USDtoUY;
        dato.currency = "UYU";
      }
      return dato;
    })
  }
}

function modificarValor(carrito) {
  for (let i = 0; i < carrito.length; i++) {

    // tomo el elemento con el id "valor[i]" para modificar luego
    var valorTotal = document.getElementById("valor" + [i]);
    var precioEnvio = document.getElementById("valorEnvio");  
    var qty = document.getElementById("cantidad" + [i]).value;

    // modifico valorTotal por la multiplicacion entre la cantidad y el valor unitario
    valorTotal.innerHTML = qty * carrito[i].unitCost;
    // tomo el elemento con el id "subtotal" para modificar luego
    var subtotal = document.getElementById("subtotal");

    var total = [0];
    var cantidadDeProductos = document.getElementsByClassName("producto").length;

    for (let j = 0; j < cantidadDeProductos; j++) {
      if (cantidadDeProductos == 0) {
        borrarCarrito(carrito);
      } else {
        total = parseInt(total) + parseInt(document.getElementById("valor" + [j]).innerHTML);
      }
    }

    subtotal.innerHTML = total
    var tarifa = 500;
    var empaqueYManejo = 150;
    document.getElementById("tarifa").innerHTML = tarifa;
    document.getElementById("empaque").innerHTML = empaqueYManejo;

    checkEnvio();
    precioEnvio.innerHTML = valorEnvio * subtotal.innerHTML;
    document.getElementById("totalFinal").innerHTML = parseInt(precioEnvio.innerHTML) + tarifa + empaqueYManejo + parseInt(subtotal.innerHTML);
    document.getElementById("finalizarCompra").innerHTML = "UYU - $" + document.getElementById("totalFinal").innerHTML;

  }
}

$('#myModal').on('shown.bs.modal', function () {
  $('#myInput').trigger('focus');
})

function checkEnvio() {
  var envioSeleccionado = document.getElementsByName('envio');

  for (i = 0; i < envioSeleccionado.length; i++) {
    if (envioSeleccionado[i].checked)
      valorEnvio = envioSeleccionado[i].value;
    console.log(envioSeleccionado);
    
  }
}



function finalizarCompra(event) {
  borrarCarrito();
  $('.modal-backdrop.show').remove();
  alert(`Has finalizado tu compra, felicitaciones!`);
  event.preventDefault();
}

function eliminar() {

  if (document.getElementsByClassName("cantidad").length == 0) {
    borrarCarrito();
  } else {

    $(".eliminar").click(function (event) {
      var id = $(this).data("id");
      console.log(carrito.splice(id, 1));
      modificarValor(carrito)
      document.getElementById(i).remove();
    })
  }
}

function borrarCarrito() {
  nuevoCarro = document.getElementById("productosCarro");
  nuevoCarro.innerHTML = `
<h1 style="text-align: center; margin: 15%;">  Tu carrito está vacío, busca algo para comprar <a href="index.html"> aquí </a>
</h1>`
}



document.addEventListener("DOMContentLoaded", function (e) {
  getJSONData(CART_URL).then(function (resultObj) {
    if (resultObj.status === "ok") {
      carrito = resultObj.data.articles;
      mostrarCarritoList(carrito);
      modificarValor(carrito);
    }
  })
});


$('.nav-link').click(function () {
  document.getElementById("formaDePago").innerHTML = document.getElementById(this.id).innerText;
});

function payment() {
  document.getElementById("formaDePago").innerHTML = "Tarjeta de crédito"
}


var infoStillMissing = false

document.getElementById("guardarDatos").addEventListener("click", function (a) {

  name = document.getElementById("username").value

  cardNum = document.getElementById("cardNumber").value.length

  cvv = document.getElementById("cvv").value
  infoStillMissing = false
  if (name.length < 3) {
    alert("Tu nombre completo no puede tener menos de 3 caracteres")
    infoStillMissing = true
  }

  if ((cardNum < 12) || (cardNum > 16)) {
    alert("No has ingresado un número de tarjeta válido")
    infoStillMissing = true;
  }

  if (cvv.length <= 2) {
    alert("No has escrito un código de seguridad válido")
    infoStillMissing = true;
  }

  if (!infoStillMissing) {
    a.preventDefault();
    document.getElementById("disabledButton").disabled = false;

  }
  if (a.preventDefault) a.preventDefault();
  return false;
});



var buyForm = document.getElementById("buying-info");
buyForm.addEventListener("submit", function (e) {

  let calle = document.getElementById("calle");
  let numero = document.getElementById("num");
  let formaDePago = document.getElementById("formaDePago");
  let infoMissing = false;


  if (calle.value === "") {
    infoMissing = true;

  }

  if (numero.value === "") {
    infoMissing = true;
  }

  if (formaDePago.innerHTML === "No has seleccionado una forma de pago") {
    alert("No has seleccionado una forma de pago")
    infoMissing = true;
  }

  if (!infoMissing) {

    finalizarCompra(event);

  }

  //Esto se debe realizar para prevenir que el formulario se envíe (comportamiento por defecto del navegador)
  if (e.preventDefault) e.preventDefault();
  return false;
});



const URL_DATA = "https://restcountries.eu/rest/v2/all";

var pais = {}
getJSONData(URL_DATA).then(function (resultObj) {
  if (resultObj.status === "ok") {

    paises = resultObj.data


    for (let i = 0; i < paises.length; i++) {
      let opcionesPais = document.getElementById("pais"); {
        opcionesPais.innerHTML += ` 
          <option value="` + paises[i].name + `">` + paises[i].name + `</option>
      `
      }
    }
  }
})