var product = {};
//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCT_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {

            let nameCar = getQueryVariable("product");
            product = resultObj.data;

            let productNameHTML = document.getElementById("productName");
            let productDescriptionHTML = document.getElementById("productDescription");
            let productCostCurrencyHTML = document.getElementById("productCost");
            let productSoldCountHTML = document.getElementById("productSoldCount");
            let productCategoryHTML = document.getElementById("productCategory");

            productNameHTML.innerHTML = nameCar.replace(/%20/g, " ");
            productDescriptionHTML.innerHTML = product.description;
            productCostCurrencyHTML.innerHTML = product.currency + " - " + product.cost;
            productSoldCountHTML.innerHTML = product.soldCount;
            productCategoryHTML.innerHTML = product.category;
            sessionStorage.setItem("relacionados", JSON.stringify(resultObj.data.relatedProducts));
        }
    });
});

var visualScore = "";
var info = {};
var element = {};

document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            info = resultObj.data;
            let element = document.getElementById("infoDescription");
            for (let i = 0; i < info.length; i++) {

                for (let j = 0; j < info[i].score; j++) {
                    visualScore = visualScore + `<span class="fa fa-star checked"></span>`
                }

                for (let j = 0; j < 5 - info[i].score; j++) {
                    visualScore = visualScore + `<span class="fa fa-star"></span>`

                }


                element.innerHTML += `
                <br />
                <p><strong>Usuario: </strong>  ${info[i].user} \xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0 <strong> Fecha: </strong> ${info[i].dateTime}</p>
                <p><strong>Puntuacion: </strong> \xa0\xa0\  ${info[i].score} \xa0\xa0\ ` + visualScore + ` </p>
                <p><strong>Comentario: </strong> ${info[i].description}</p>
                <br />
                <hr style="border-top: 4px dotted pink;" />
                `
                visualScore = ``
            }
            function stars(vacias, llenas) {
                for (let j = 0; j < llenas; j++) {
                    visualScore = visualScore + `<span class="fa fa-star checked"></span>`


                }


                for (let j = 0; j < vacias; j++) {
                    visualScore = visualScore + `<span class="fa fa-star"></span>`
                }
                return visualScore;

            }
        }
    });
});

function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) {
            return pair[1];
        }
    }
    return (false);
}
//muestro productos relacionados mediante informacion guardada en sessionStorage
var related = {};
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_URL).then(function (resultObj) {
        var relacionados = sessionStorage.getItem("relacionados");
        relacionados = JSON.parse(relacionados)
        console.log(relacionados);
        

        if (resultObj.status === "ok") {
            related = resultObj.data;
            let relatedCar = document.getElementById("productRelated");
            for (let i = 0; i < relacionados.length; i++) {

                relatedCar.innerHTML += `
            <a href="product-info.html?product=`+ related[relacionados[i]].name + `" class="list-group-item list-group-item-action">
                <div class="row">
                    <div class="col-3">
                        <img src="` + related[i].imgSrc + `" alt="` + related[relacionados[i]].description + `" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">`+ related[i].name + ` - ` + related[relacionados[i]].currency + related[relacionados[i]].cost + `</h4>
                           
                            <small class="text-muted">` + related[relacionados[i]].soldCount + ` artículos</small>
                        </div>
                        <p class="mb-1">` + related[relacionados[i]].description + `</p>
                    </div>
                </div>
            </a>
            `
            }
        }
    });
});


//fecha
var fecha = new Date;
var year = fecha.getFullYear();
var month = fecha.getMonth() + 1;
if (month < 10) {
    month = "0" + month;
}
var day = fecha.getDate();
if (day < 10) {
    day = "0" + day
}
var hora = fecha.getHours()
var minutos = fecha.getMinutes()
var segundos = fecha.getSeconds();
fecha = year + "-" + month + "-" + day + " " + hora + ":" + minutos + ":" + segundos;
document.getElementById("fecha").innerHTML = fecha

//nombre introducido por el usuario al iniciar sesion
var username = localStorage.getItem("email");
document.getElementById("usuario").innerHTML = username;


// puntuacion
$(document).ready(function () {
    // Check Radio-box
    $(".rating input:radio").attr("checked", false);

    $('.rating input').click(function () {
        $(".rating span").removeClass('checked');
        $(this).parent().addClass('checked');
    });

    $('input:radio').change(
        function () {
            var userRating = this.value;
            document.getElementById("puntuacion").innerHTML = userRating
        });
});

// Imprimimos nuevo comentario

document.getElementById("nuevoComentario").addEventListener('click', (event) => {
    //nuevo comentario info
    var comentario = document.getElementById("comment").value;
    
             userRating = document.getElementById("puntuacion").innerHTML

            for (let j = 0; j < userRating; j++) {
                visualScore = visualScore + `<span class="fa fa-star checked"></span>`
            }

            for (let j = 0; j < 5 - userRating; j++) {
                visualScore = visualScore + `<span class="fa fa-star"></span>`

            }
            
            

                document.getElementById("infoDescription").innerHTML += `
    <br />
    <p><strong>Usuario: </strong>  ${username} \xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0 <strong> Fecha: </strong> ${fecha}</p>
    <p><strong>Puntuacion: </strong> \xa0\xa0\  ${userRating} \xa0\xa0\ ` + visualScore + ` </p>
    <p><strong>Comentario: </strong> ${comentario}</p>
    <br />
    <hr style="border-top: 4px dotted pink;" />
    `
                visualScore = ``
            });