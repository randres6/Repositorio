//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
const PETICION = "https://japdevdep.github.io/ecommerce-api/product/5678.json";
const COMENTARIOS = "https://japdevdep.github.io/ecommerce-api/product/5678-comments.json";
const AUTOS_REL = "https://japdevdep.github.io/ecommerce-api/product/all.json";

var Arreglo = {};
var Comments = {};
var autorel = {};

function showRelated() {

    getJSONData(AUTOS_REL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            autorel = resultObj.data;

            let htmlContentToAppend = "";
            var currentRel = Arreglo["relatedProducts"];
            for (let k = 0; k < currentRel.length; k++) {
                var numRel = currentRel[k];
                for (let j = 0; j < autorel.length; j++) {

                    if (j === numRel) {

                        htmlContentToAppend += `
                        <td>
                            <div class="col-lg-5 col-md-5 col-5">
                                <div class="d-block mb-4 h-100">
                                    <h3>` + autorel[j].name + `</h3>
                                    <p>` + autorel[j].description + `</p>
                                </div>
                                <div class="d-block mb-4 h-100">
                                    <img class="img-fluid img-thumbnail" src="` + autorel[j]["imgSrc"] + `" alt="">
                                </div>
                            </div>
                        </td>
                        `
                    }
                }
            }
            document.getElementById("relatedAutosContainer").innerHTML = htmlContentToAppend;
        }
    })
}

function showImagesGallery() {

    let htmlContentToAppend = "";

    for (let i = 0; i < Arreglo["images"].length; i++) {
        let imageSrc = Arreglo["images"][i];

        htmlContentToAppend += `
        <td>
        <div>
            <div>
                <img class="img-fluid img-thumbnail" src="` + imageSrc + `" alt="">
            </div>
        </div>
        </td>
        `
        document.getElementById("fotosonyx").innerHTML = htmlContentToAppend;
    }

}

function showControl() {

    let htmlContentToAppend = "";

    htmlContentToAppend += `
        <br>
        <form>    
    
          <label>Ingrese Comentario: <textarea type="text" id="comingresado" cols="50" rows="3"></textarea></label>
          <br>
          <label>Ingrese Puntuación:</label>
          <input type="number" id="puntuacioningresada" min="1" max="5">
          <button id="comentar"> Enviar </button>
    
    
        </form>
        `
    document.getElementById("agregarcom").innerHTML = htmlContentToAppend;

}


function showCategoriesList() {

    let htmlContentToAppend = "";

    let category = Arreglo;

    htmlContentToAppend += `
        <div class="list-group-item list-group-item-action">
            <div class="row">

                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1">`+ category.name + `</h4>
                        <small class="text-muted">` + category.soldCount + ` unidades actualmente vendidas</small>
    
                    </div>
                </div>
                
                    <div class="d-flex w-100 justify-content-between">
                        <p class="mb-1">` + category.description + `</p>
                    </div>
                    <br>
                        <div>
                            <p> Precio: ` + category.cost + ` ` + category.currency + `  </p>
                        </div>
                    

                </div>
            </div>
        </div>
        
        `
    document.getElementById("productoinfo").innerHTML = htmlContentToAppend;

}


function showRating(estrellas) {
    let stars = "";
    var html = "";
    for (let i = 1; i <= estrellas; i++) {
        stars += '<i class="fa fa-star checked"></i>';
    }

    return html = `<span>  ${stars}</span>`;

}

function showComentarios() {
    getJSONData(COMENTARIOS).then(function (resultObj) {
        if (resultObj.status === "ok") {
            Comments = resultObj.data;


            let htmlContentToAppend = "";

            for (let i = 0; i < Comments.length; i++) {

                htmlContentToAppend += `
                

                <div>
                       <p> ` + Comments[i].description + `</p>
                       <p> Usuario: ` + Comments[i].user + `<p>
                       <p> Fecha: ` + Comments[i].dateTime + ` </p>
                        ` + showRating(Comments[i].score); `

                </div> 

                              
                `

            }
            document.getElementById("comentarios").innerHTML = htmlContentToAppend;
        }
    })
}


document.addEventListener("DOMContentLoaded", function (e) {
    document.getElementById("usuarioing").innerHTML = "Usuario: " + localStorage.Nombre;
    getJSONData(PETICION).then(function (resultObj) {
        if (resultObj.status === "ok") {
            Arreglo = resultObj.data;
            showCategoriesList();
            showImagesGallery();
            showRelated();
            showComentarios();
            showControl();



        }


    })

});

