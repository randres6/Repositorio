var banderadatos = false;

function mySubmitFunction(evt) {
    evt.preventDefault();
    return false;
}

function validardatos() {
    valornombres = document.getElementById("nombres").value;
    valorapellidos = document.getElementById("apellidos").value;
    valoredad = document.getElementById("edad").value;
    valorcorreo = document.getElementById("email").value;
    valortelefono = document.getElementById("telefono").value;

    if (valornombres && valorapellidos && valoredad && valorcorreo && valortelefono != "") {
        if (valoredad >= 18) {
            return banderadatos = true;
        } else {
            return banderadatos = false;
        }
    }

}

function guardar() {

    valornombres = document.getElementById("nombres").value;
    valorapellidos = document.getElementById("apellidos").value;
    valoredad = document.getElementById("edad").value;
    valorcorreo = document.getElementById("email").value;
    valortelefono = document.getElementById("telefono").value;
    valorimagen = document.getElementById("imagenperfil").value;

    var newrarreglo = {
        "nombres": valornombres,
        "apellidos": valorapellidos,
        "edad": valoredad,
        "correo": valorcorreo,
        "telefono": valortelefono,
        "imagen": valorimagen
    };

    localStorage.setItem('datos', JSON.stringify(newrarreglo));
    document.getElementById("imagenguardada").setAttribute("src",valorimagen);
    document.getElementById("imagenguardada").setAttribute("width","150px");
    return document.getElementById("guardar").setAttribute("data-target", "#guardarok");

}

function verificar() {
    var auxiliar = localStorage.getItem('datos');
    var almacenado = JSON.parse(auxiliar);
    if (almacenado != null) {
        document.getElementById("nombres").value = almacenado.nombres;
        document.getElementById("apellidos").value = almacenado.apellidos;
        document.getElementById("edad").value = almacenado.edad;
        document.getElementById("email").value = almacenado.correo;
        document.getElementById("telefono").value = almacenado.telefono;
        document.getElementById("imagenperfil").value = almacenado.imagen;
        document.getElementById("imagenguardada").setAttribute("src",almacenado.imagen);
        document.getElementById("imagenguardada").setAttribute("width","150px");

    } else {
        return;
    }
}


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    verificar();

    var botonguardar = document.getElementById("guardar");
    botonguardar.addEventListener("click", function () {

        if (validardatos()) {
            guardar();
        } else {
            document.getElementById("guardar").removeAttribute("data-target");
        }
    })

});