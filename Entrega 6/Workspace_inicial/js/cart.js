const LISTADO_CARRITO = "https://japdevdep.github.io/ecommerce-api/cart/654.json";

var Arreglo = {};
var Carrito = {};
var accusubtotal = 0;
var accutotal = 0;
var costoenvio = 0;
var acumulador1 = 0;
var banderapago = false;

//La funcion validar pago sirve para emitir una alerta por cada campo vacío en el modal de forma de pago
function validarpago() {
  if (document.getElementById("transfer").checked == false) {
    if (document.getElementById("numtarjeta").value == "") {
      return alert("Ingrese Número de tarjeta");
    } else {
      if (document.getElementById("codigosec").value == "") {
        return alert("Código de seguridad");

      } else {
        if (document.getElementById("fechaexp").value == "") {
          return alert("Ingrese Fecha de expiración de tarjeta");
        } else {
          //Se define una variable llamada banderapago que sirva para hacer la validación final de la compra
          banderapago = true;
          //una vez se validan todos los elementos se setea el atributo del button para salir del modal
          return document.getElementById("guardarpago").setAttribute("data-dismiss", "modal");
        }
      }
    }
  } else {
    if (document.getElementById("credito").checked == false) {
      if (document.getElementById("bancaria").value == "") {
        return alert("Ingrese correo de transferencia Bancaria");
      } else {
        banderapago = true;
        return document.getElementById("guardarpago").setAttribute("data-dismiss", "modal");
      }
    }
  }

}
//La siguiente función valida los campos del carrito antes de emitir una alerta de que la compra fue hecha exitosamente
function validacion() {
  if (document.getElementById("direccion").value == "") {
    return alert("El campo dirección está vacío");
  } else {
    if (document.getElementById("pais").value == "") {
      return alert("El campo pais está vacío");
    } else {
      if (banderapago != true) {
        return alert("Ingrese un metodo de pago");

      } else {
        alert("la compra se realizó");
        //Una vez finalizada la compra se redirige a la página principal del e-commerce
        return window.location.href = "home.html";

      }
    }
  }
}


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


//la funcion tiposenvio lo que hace es setear el porcentaje correspondiente según la selección del formulario por el usuario
function tiposenvio() {
  var porcentaje = 0;
  if (document.getElementById("premium").checked) {
    return porcentaje = 0.15;
  } else {
    if (document.getElementById("express").checked) {
      return porcentaje = 0.07;
    } else {
      return porcentaje = 0.05;
    }
  }

}



//formadepago se encarga de habilitar o deshabilitar los campos segun la opción seleccionada para llenar en el modal forma de pago
function formadepago() {
  if (document.getElementById("transfer").checked) {
    document.getElementById("bancaria").disabled = false;
    document.getElementById("numtarjeta").disabled = true;
    document.getElementById("codigosec").disabled = true;
    document.getElementById("fechaexp").disabled = true;

  } else {
    if (document.getElementById("credito").checked) {

      document.getElementById("numtarjeta").disabled = false;
      document.getElementById("codigosec").disabled = false;
      document.getElementById("fechaexp").disabled = false;
      document.getElementById("bancaria").disabled = true;

    }
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
  costoenvio = Math.round(accusubtotal * tiposenvio());
  envio.innerHTML = "UYU " + costoenvio;
  totalgral.innerHTML = "UYU " + (accusubtotal + costoenvio);
  formadepago();

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
        <th><button type="button" id="eliminar`+ i + `" class="fa fa-trash"></button></th>
        <tr>
         `

    document.getElementById("cartlist").innerHTML = htmlContentToAppend;
  }
  return;

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

      var premium = document.getElementById("premium");
      var express = document.getElementById("express");
      var standard = document.getElementById("standard");

      //Se configura un eventlistener por cada metodo de pago
      premium.addEventListener("click", function () {
        valoresFinanles();
      });
      express.addEventListener("click", function () {
        valoresFinanles();
      });
      standard.addEventListener("click", function () {
        valoresFinanles();
      });

      var transferencia = document.getElementById("transfer");
      var tarjetacredito = document.getElementById("credito");

      transferencia.addEventListener("click", function () {
        formadepago();
      });

      tarjetacredito.addEventListener("click", function () {
        formadepago();
      });

      var botoncomprar = document.getElementById("comprar");
      botoncomprar.addEventListener("click", function () {
        validacion();

      });

      //Borrar el contenido de los campos segun la forma de pago seleccionada
      var seleccionpago = document.getElementsByName("radiopago");
      for (let i = 0; i < seleccionpago.length; i++) {
        seleccionpago[i].addEventListener("click", function () {
          if (document.getElementById("transfer").checked == true) {
            document.getElementById("numtarjeta").value = "";
            document.getElementById("codigosec").value = "";
            document.getElementById("fechaexp").value = "";
            return;
          } else {
            document.getElementById("bancaria").value = "";
            return;
          }

        });
      }

      //Por cada vez que se presiona el botón del modal se pone el false la bandera de pago
      //vuelve a true cuandos se presiona el botón guardar de nuevo
      var botonformadepago = document.getElementById("formadepagoboton");
      botonformadepago.addEventListener("click", function () {
        banderapago = false;

      });
      //Con el botón de guardar forma de pago se disparan las validaciones
      var botonpago = document.getElementById("guardarpago");
      botonpago.addEventListener("click", function () {
        validarpago();


      });
      //por cada botón de eliminar que es presionado se elimina el indice del arreglo Carrito y se publica nuevamente la tabla 
      var botoneliminar = document.getElementsByClassName("fa fa-trash");
      for (let i = 0; i < botoneliminar.length; i++) {
        botoneliminar[i].addEventListener("click", function () {
          Carrito.splice(i, 1);
          listadoCarrito();
          valoresFinanles();
          eventosup();
          return;
        });
      }


    }
  })
});