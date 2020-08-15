//Funcion que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
const PETICION_WEB = "https://japdevdep.github.io/ecommerce-api/product/all.json";
var categoriesArray = [];

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
function showCategoriesList(array) {

    let htmlContentToAppend = "";
    for (let i = 0; i < array.length; i++) {
        let category = array[i];

        htmlContentToAppend += `
        <div class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="` + category.imgSrc + `" alt="` + category.description + `" class="img-thumbnail">
                    
                    
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1">`+ category.name + `</h4>
                        <small class="text-muted">` + category.soldCount + ` unidades actualmente vendidas</small>
                        
                    </div>
                    <div>
                            <p> ` + category.description + ` </p>
                            <p> Precio: ` + category.cost + ` ` + category.currency + `  </p>
                        </div>
                    

                </div>
            </div>
        </div>
        `

        document.getElementById("demo").innerHTML = htmlContentToAppend;
    }
}
document.addEventListener("DOMContentLoaded", function () {

    getJSONData(PETICION_WEB).then(function (data) {
        categoriesArray = data;
        showCategoriesList(categoriesArray);
    });
});