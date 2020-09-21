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
    // Realizo una petición web del JSON para buscar el arreglo donde contiene 
    //la lista de todos los productos

    getJSONData(AUTOS_REL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            //se guarda todo el arreglo en la varibale autorel
            autorel = resultObj.data;

            let htmlContentToAppend = "";

            //sabiendo que el valor de productos relacionados es un arreglo se declara
            //una variable para guardar especificamente el arreglo con los valores de los 
            //autos a buscar en el JSON general de todos los autos
            var currentRel = Arreglo["relatedProducts"];

            //Se define un for para recorrer el arreglo de productos relacionados
            for (let k = 0; k < currentRel.length; k++) {

                //se guarda por cada vez que el for hace un ciclo el valor relacionado actual
                var numRel = currentRel[k];

                //se define otro for pero esta vez tomando en cuenta el arreglo general de autos
                //y comparando el valor de de relación por cada ciclo
                for (let j = 0; j < autorel.length; j++) {

                    //siendo j igual al valor de producto relacionado entonces puede obtener los datos.
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

    let CarruselTotal = "";
    let CarruselCuerpo = "";



    for (let i = 0; i < Arreglo["images"].length; i++) {
        let imageSrc = Arreglo["images"][i];
        if (i == 0) {
            //Un unico div del carrusel debe poseer la clase carousel-item active, el resto
            //debe tener la clase carousel-item así permite que se mueva el carrusel
            CarruselCuerpo += `

            <div class="carousel-item active">
                <img src="` + imageSrc + `" class="d-block w-100" alt="">
            </div>
          `

        } else {
            CarruselCuerpo += `

            <div class="carousel-item">
                <img src="` + imageSrc + `" class="d-block w-100" alt="">
            </div>
          `

        }


    }
    //Se junta toda la parte HTML que requiere el carrusel de fotos del producto

    CarruselTotal += `

       
            <div class="col col-6">
                <div id="carouselExampleControls" style="width: 20pc;" class="carousel slide" data-ride="carousel">
                    <div class="carousel-inner">
                    `
        + CarruselCuerpo +
        ` 
                    </div>
                    <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="sr-only">Previous</span>
                  </a>
                  <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="sr-only">Next</span>
                  </a>
                </div>
            </div>
        



       
        `

    document.getElementById("carrusel").innerHTML = CarruselTotal;

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

