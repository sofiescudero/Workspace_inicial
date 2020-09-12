//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

var product = {};

function showImagesGallery(array) {

    let htmlContentToAppend = "";

    for (let i = 0; i < array.length; i++) {
        let imageSrc = array[i];

        htmlContentToAppend += `
        <div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100">
                <img class="img-fluid img-thumbnail" src="` + imageSrc + `" alt="">
            </div>
        </div>
        `

        document.getElementById("productImagesGallery").innerHTML = htmlContentToAppend;
    }
}

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

            //Muestro las imagenes en forma de galería
            showImagesGallery(product.images);
        }
    });
});

var visualScore = "";
var info = {};

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
                console.log(element)
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


document.getElementById("usuario").innerHTML = localStorage.getItem("email")
var f = new Date();

document.getElementById("fecha").innerHTML = f


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




var related = {};
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            related = resultObj.data;
            let relatedCar = document.getElementById("productRelated");
            relatedCar.innerHTML += `
            <a href="product-info.html?product=`+ related[1].name + `" class="list-group-item list-group-item-action">
                <div class="row">
                    <div class="col-3">
                        <img src="` + related[1].imgSrc + `" alt="` + related[1].description + `" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">`+ related[1].name + ` - ` + related[1].currency + related[1].cost + `</h4>
                           
                            <small class="text-muted">` + related[1].soldCount + ` artículos</small>
                        </div>
                        <p class="mb-1">` + related[1].description + `</p>
                    </div>
                </div>
            </a>
            `
        }
    });
});

var relatedDos = {};
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            relatedDos = resultObj.data;
            let relatedCarDos = document.getElementById("productRelatedDos");
            relatedCarDos.innerHTML += `
            <a href="product-info.html?product=`+ relatedDos[3].name + `" class="list-group-item list-group-item-action">
                <div class="row">
                    <div class="col-3">
                        <img src="` + relatedDos[3].imgSrc + `" alt="` + relatedDos[3].description + `" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">`+ relatedDos[3].name + ` - ` + relatedDos[3].currency + relatedDos[3].cost + `</h4>
                           
                            <small class="text-muted">` + relatedDos[3].soldCount + ` artículos</small>
                        </div>
                        <p class="mb-1">` + relatedDos[3].description + `</p>
                    </div>
                </div>
            </a>
            `
        }
    });
});


