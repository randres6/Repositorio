//Funcion que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
const PETICION_WEB = "https://japdevdep.github.io/ecommerce-api/product/all.json";
var categoriesArray = [];
var currentCategoriesArray = [];
const ORDER_BY_DESC_PRECIO = "Desc Precio";
const ORDER_BY_ASC_PRECIO = "Asc Precio";
const ORDER_BY_RELEVANCIA = "Relevancia";

var minCount = undefined;
var maxCount = undefined;

function getJSONData(ejemplo) {
    var text = {};
    return fetch(ejemplo)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw Error(response.statusText);
            }
        })
}
function showCategoriesList() {

    let htmlContentToAppend = "";
    for (let i = 0; i < currentCategoriesArray.length; i++) {
        let category = currentCategoriesArray[i];

        if (((minCount == undefined) || (minCount != undefined && parseInt(category.cost) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(category.cost) <= maxCount))) {

            htmlContentToAppend += `
            



            <div class="col-md-4">
            <a href="categories.html" class="card mb-4 shadow-sm custom-card">
              <img class="bd-placeholder-img card-img-top" src="` + category.imgSrc + `">
              <h5 class="card-title">`+ category.name + `</h5>
              <div class="card-body">
              <p class="card-text"> ` + category.description + ` </p>
              <p class="card-text">  Precio: ` + category.cost + ` ` + category.currency + ` </p>
              <small class="text-muted">` + category.soldCount + ` unidades actualmente vendidas</small>
              </div>
            </a>
          </div>
            `




            // <a href="product-info.html" class="list-group-item list-group-item-action">
            // <div class="list-group-item list-group-item-action">
            //     <div class="row">
            //         <div class="col-3">
            //             <img src="` + category.imgSrc + `" alt="` + category.description + `" class="img-thumbnail">


            //         </div>
            //         <div class="col">
            //             <div class="d-flex w-100 justify-content-between">
            //                 <h4 class="mb-1">`+ category.name + `</h4>
            //                 <small class="text-muted">` + category.soldCount + ` unidades actualmente vendidas</small>

            //             </div>
            //             <div>
            //                     <p> ` + category.description + ` </p>
            //                     <p> Precio: ` + category.cost + ` ` + category.currency + `  </p>
            //                 </div>


            //         </div>
            //     </div>
            // </div>
            // </a>
            // <div class="col-md-4">
            // <a href="product-info.html" class="card mb-4 shadow-sm custom-card">
            //     <img class="bd-placeholder-img card-img-top" src="` + category.imgSrc + `" alt="` + category.description + `>                    
            //         <div class="card-body">
            //             <h5 class="card-title">`+ category.name + `</h5>
            //             <p class="card-text"> ` + category.description + ` </p>
            //             <p class="card-text">  Precio: ` + category.cost + ` ` + category.currency + ` </p>
            //             <small class="text-muted">` + category.soldCount + ` unidades actualmente vendidas</small>
            //         </div>
            // </a>
            // </div>

        }
        document.getElementById("demo").innerHTML = htmlContentToAppend;
    }
}

function sortCategories(criteria, array) {
    let result = [];
    if (criteria === ORDER_BY_DESC_PRECIO) {
        result = array.sort(function (a, b) {
            let aCount = parseInt(a.cost);
            let bCount = parseInt(b.cost);

            if (aCount > bCount) { return -1; }
            if (aCount < bCount) { return 1; }
            return 0;
        });
    } else if (criteria === ORDER_BY_ASC_PRECIO) {
        result = array.sort(function (a, b) {
            let aCount = parseInt(a.cost);
            let bCount = parseInt(b.cost);

            if (bCount > aCount) { return -1; }
            if (bCount < aCount) { return 1; }
            return 0;
        });
    } else if (criteria === ORDER_BY_RELEVANCIA) {
        result = array.sort(function (a, b) {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);

            if (aCount > bCount) { return -1; }
            if (aCount < bCount) { return 1; }
            return 0;
        });
    }
    return result;
}


function sortAndShowCategories(sortCriteria, categoriesArray) {
    currentSortCriteria = sortCriteria;

    if (categoriesArray != undefined) {
        currentCategoriesArray = categoriesArray;
    }

    currentCategoriesArray = sortCategories(currentSortCriteria, currentCategoriesArray);

    //Muestro las categorías ordenadas
    showCategoriesList();
}

document.addEventListener("DOMContentLoaded", function () {

    document.getElementById("usuarioing").innerHTML = "Usuario: " + localStorage.Nombre;
    getJSONData(PETICION_WEB).then(function (data) {
        currentCategoriesArray = data;
        showCategoriesList();
    });

    document.getElementById("filtrarprecio").addEventListener("click", function () {
        //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
        //de productos por categoría.
        minCount = document.getElementById("preciominimo").value;
        maxCount = document.getElementById("preciomaximo").value;

        if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0) {
            minCount = parseInt(minCount);
        }
        else {
            minCount = undefined;
        }

        if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0) {
            maxCount = parseInt(maxCount);
        }
        else {
            maxCount = undefined;
        }

        showCategoriesList();
    });

    document.getElementById("limpiarfiltro").addEventListener("click", function () {
        document.getElementById("preciominimo").value = "";
        document.getElementById("preciomaximo").value = "";

        minCount = undefined;
        maxCount = undefined;

        showCategoriesList();
    });

    document.getElementById("preciodesc").addEventListener("click", function () {
        sortAndShowCategories(ORDER_BY_DESC_PRECIO);
    });

    document.getElementById("precioasc").addEventListener("click", function () {
        sortAndShowCategories(ORDER_BY_ASC_PRECIO);
    });
    document.getElementById("relevancia").addEventListener("click", function () {
        sortAndShowCategories(ORDER_BY_RELEVANCIA);
    });

});


