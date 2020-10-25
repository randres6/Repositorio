const LISTADO_CARRITO = "https://japdevdep.github.io/ecommerce-api/cart/654.json";

var Arreglo = {};
var Carrito = {};
var accusubtotal = 0;
var accutotal = 0;
var costoenvio = 0;
var acumulador1 = 0;

//eventosup se encarga de actualizar los subtotales por cada evento disparado al cambiar la cantidad de los articulos
function eventosup() {
  //se crea un arreglo por cada input con la clase cantidad
  var ingreso = document.getElementsByClassName("cantidad");


  for (let i = 0; i < ingreso.length; i++) {
    //el addeventlistener dispara los eventos por cada vez que se cambie la cantidad de los articulos
    ingreso[i].addEventListener("change", function () {
      subtotalact = document.getElementById("subtotal" + i);
      acumulador1 = Carrito[i].currency + ` ` + ingreso[i].value * Carrito[i].unitCost;
      subtotalact.innerHTML = acumulador1;
      valoresFinanles();
    });
  }
}
//valoresFinales lo que hace es actualizar los valores generales segun la cantidad ingresada por el usuario
function valoresFinanles() {
  accusubtotal = 0;
  var valores = document.getElementsByClassName("cantidad");

  for (let i = 0; i < valores.length; i++) {

    if (Carrito[i].currency === "USD") {
      var cambio = (valores[i].value * Carrito[i].unitCost) * 40;
      accusubtotal = cambio + accusubtotal;
    } else {
      accusubtotal = valores[i].value * Carrito[i].unitCost + accusubtotal;
    }
  }
  var subtotalgral = document.getElementById("subtotal");
  var totalgral = document.getElementById("total");
  var envio = document.getElementById("envio");
  subtotalgral.innerHTML = "UYU " + accusubtotal;
  envio.innerHTML = "UYU " + costoenvio;
  totalgral.innerHTML = "UYU " + (accusubtotal + costoenvio);

}
//en listadoCarrito armo la tabla de los articulos seteando el HTML con la información del json
function listadoCarrito() {
  let htmlContentToAppend = "";
  for (let i = 0; i < Carrito.length; i++) {

    let category = Carrito[i];

    htmlContentToAppend += `
        <tr>
        <th scope="row">` + category.name + `</th>
        <td>` + category.currency + ` ` + category.unitCost + `</td>
        <td><input type="number" min="1" class="cantidad" value="` + category.count + `"></td>
        <td><p id="subtotal`+ i + `">` + category.currency + ` ` + category.count * category.unitCost + `</p></td>
        <th><img src="` + category.src + `" width="100" height="100" alt=""></th>
        <tr>
         `

    document.getElementById("cartlist").innerHTML = htmlContentToAppend;
  }
}
document.addEventListener("DOMContentLoaded", function (event) {
  document.getElementById("usuarioing").innerHTML = "Usuario: " + localStorage.Nombre;

  getJSONData(LISTADO_CARRITO).then(function (resultObj) {
    if (resultObj.status === "ok") {
      Arreglo = resultObj.data;
      Carrito = Arreglo.articles;
      listadoCarrito();
      valoresFinanles();
      eventosup();
    }
  })
});












