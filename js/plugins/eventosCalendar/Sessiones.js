function validarCamposSesion(form) {
    var formulario = document.getElementById(form);
    var campos = formulario.getElementsByTagName('input');
    for (var i = 0; i < campos.length; i++) {
        if (campos[i].value == "" || campos[i].value == " ") {
            alert("Campos vacios Inténtalo nuevamente");
            return false;
        }
    }
    return true;
}