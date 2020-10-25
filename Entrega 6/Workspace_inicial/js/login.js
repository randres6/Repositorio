//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
 

});

document.getElementById("guardarusuario").addEventListener("click", function(){

    let usuario = document.getElementById("dato")

    
        if (usuario.value === '') {
            return alert("El campo nombre está vacio");
        } else {
            localStorage.Nombre = usuario.value;
        }
        // si el campo está vacío, muestra un alert indicando el error
        //si el campo no está vacío, guarda al usuario 

});