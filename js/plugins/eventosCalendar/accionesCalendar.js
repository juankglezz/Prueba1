var arrEventos = [];
function cerrarSesion() {//envía la alerta para evitar cerrar la sesión por accidente
    var r = confirm("¿Estas seguro de cerrar la sesión?")
    var x;
    if (r == true) {
        return true
    } else {
        return false
    }
}
function validarFechas(inicio, fin, ids) {//esta validación es para cuando se va agregar un nuevo evento en la base de datos
    var fec = new Date();
    var fecini = document.getElementById(inicio).value;
    var fecfin = document.getElementById(fin).value;
    if (fecfin < fecini) {
        alert("La Fecha final no puede ser un día anterior de la fecha inicio")
        return false;
    }
    if (parseInt(fecini.substring(0, 4) + fecini.substring(5, 7) + fecini.substring(8, 10)) < ((fec.getFullYear) + (fec.getMonth() + 1) +
            (fec.getDate() < 10 ? "0" + fec.getDate() : fec.getDate()))) {
        alert("Lo siento no puedes agregar un evento o tarea en este día " + document.getElementById(inicio).value + "");
        return false;
    }
    for (var i = 0; i < arrEventos.length; i++) {
        if (fecini == arrEventos[i][4] && arrEventos[i][1] != ids) {
            if (arrEventos[i][8] == document.getElementById("demoTimepicker").value) {
                alert("No se pueden juntar dos Citas en un mismo horario");
                return false;
            }
        }
    }
    return true;
}
var events = [];
function cargarEventos(eventoscalendario) {//agrega los eventos guardados en la base de datos
    if (eventoscalendario != null) {
        arrEventos = eventoscalendario;
        for (var i = 0; i < arrEventos.length; i++) {
            var dia = arrEventos[i][4].substring(8);
            var mes = arrEventos[i][4].substring(5, 7);
            var anio = arrEventos[i][4].substring(0, 4);
            var hr = arrEventos[i][8].substring(0, 2);
            var min = arrEventos[i][8].substring(3, 5);
            var diafin = arrEventos[i][5].substring(8);
            var mesfin = arrEventos[i][5].substring(5, 7);
            var aniofin = arrEventos[i][5].substring(0, 4);
            var hrfin = arrEventos[i][9].substring(0, 2);
            var minfin = arrEventos[i][9].substring(3, 5);
            fecInicio = new Date(anio, mes - 1, dia, hr, min);
            fecFin = new Date(aniofin, mesfin - 1, diafin, hrfin, minfin);
            if (arrEventos[i][3] == "True") {
                var bol = true;
                fecFin = fecInicio;
            } else {
                var bol = false;
            }
            if (arrEventos[i][2] == 1) {
                var tipo = 'event-green';
                titulo = "Tarea";
            } else {
                var tipo = 'event-blue';
                titulo = "Cita";
            }
            if (anio == "") {
                i++
            }
            events[i] = {
                title: arrEventos[i][0],
                start: fecInicio,
                end: fecFin,
                allDay: bol,
                id: arrEventos[i][2],
                info: arrEventos[i][6],
                className: tipo
            }
            dia = mes = anio = hr = min = diafin = mesfin = aniofin = hrfin = minfin = fecInicio = fecFin = bol = null;
        }
    }
}
var direccion;
var titulo;
var info;
function DiaSemana(fecha, pos, elementos) {
    var fechas = fecha.substring(4, 6) + "/" + fecha.substring(6) + "/" + fecha.substring(0, 4);
    var Fecha_hoy = new Date(fechas);
    var diaSemana = Fecha_hoy.getDay();
    if (fecha.substring(6) < 7) {
        DomingySabado(pos, elementos, "bottom");
    } else {
        DomingySabado(pos, elementos, "top")
    }
    function DomingySabado(pos, elementos, posPopup) {
        var popup = posPopup;
        if (diaSemana == 0) {
            popup = "right";
            pinta(pos, elementos, popup);
        } else if (diaSemana == 6) {
            popup = "left";
            pinta(pos, elementos, popup);
        } else {
            pinta(pos, elementos, popup);
        }
    }

}

function obtenerId(ids) {//se obtiene el identificador del elemento que se hizo clic 
    idtemp = ids;
    var fec = new Date();
    var fechaInicio = ids.substring(0, 4) + '-' + ids.substring(4, 6) + '-' + ids.substring(6, 8);
    var dia = (fec.getDate() < 10 ? "0" + fec.getDate() : fec.getDate());
    var fecha = (fec.getFullYear() + "" + (fec.getMonth() + 1) + dia);
    for (var i = 0; i < arrEventos.length; i++) {
        if (fechaInicio == arrEventos[i][4]) {
            if (arrEventos[i][3] == "True") {
                document.getElementById(ids).click();
            }
        }
    }
    if (parseInt(ids.substring(0)) < fecha) {
        document.getElementById(ids).click();
    } else {

        document.getElementById('fecInicio').value = fechaInicio;
        document.getElementById('fecFin').value = fechaInicio;
    }
}
//function pintarDias() {
//    for (var i = 0; i < arrEventos.length; i++) {
//        fecha_inicio = arrEventos[i][4];
//        var dia_inicio = fecha_inicio.substring(8, 10);
//        var mes_inicio = fecha_inicio.substring(5, 7);
//        var anio_inicio = fecha_inicio.substring(0, 4);
//        fecha_final = arrEventos[i][5];
//        var dia_final = fecha_final.substring(8, 10);
//        var mes_final = fecha_final.substring(5, 7);
//        var anio_final = fecha_final.substring(0, 4);
//        idstemp = anio_inicio + mes_inicio + dia_inicio;
//        mes_inicio = parseInt(mes_inicio);
//        pintar(idstemp, i);//pintamos el evento principal el inicio
//        var fecha_diferencia = dia_final - dia_inicio;
//        var divs = document.getElementById(idstemp);
//        if (divs != null) {
//            var elementos = divs.getElementsByTagName('tbody');
//            if (fecha_diferencia != 0) {
//                if (fecha_diferencia < 0) {
//                    if (mes_inicio == 01 || mes_inicio == 03 || mes_inicio == 05 || mes_inicio == 07 || mes_inicio == 08 ||
//                            mes_inicio == 10 || mes_inicio == 12) {
//                        fecha_diferencia = (dia_inicio - 31) + ((0 - dia_final) * -1);
//                    } else if (mes_inicio == 4 || mes_inicio == 6 || mes_inicio == 9 || mes_inicio == 11) {
//                        dia_inicio = parseInt(dia_inicio) - 30;
//                        fecha_diferencia = (dia_inicio * -1) + parseInt(dia_final);
//                    } else if (mes_inicio == 2) {
//                        if ((mes_inicio % 2) == 0) {
//                            if (dia_inicio > 29) {
//                                fecha_diferencia = (dia_inicio - 29) + ((0 - dia_final) * -1);
//                            } else {
//                                fecha_diferencia = (dia_inicio - 28) + ((0 - dia_final) * -1);
//                            }
//                        }
//                    }
//                }
//            }
//            var dia_inicio = fecha_inicio.substring(8, 10);//obtenemos nuevamente el día para calcular si se debe aumentar el mes
//            if (arrEventos[i][3] == "True") {
//                continue;
//            } else {
//                for (var j = 0; j < fecha_diferencia; j++) {
//                    dia_inicio++;
//                    if (mes_inicio == 01 || mes_inicio == 03 || mes_inicio == 05 || mes_inicio == 07 || mes_inicio == 08 || mes_inicio == 10 ||
//                            mes_inicio == 12) {//31dias
//                        if (dia_inicio >= 31) {
//                            dia_inicio -= 31;
//                            if (mes_inicio == 12) {
//                                anio_inicio++;
//                                mes_inicio = "0" + 1;
//                            }
//                        }
//                    } else if (mes_inicio == 4 || mes_inicio == 6 || mes_inicio == 9 || mes_inicio == 11) {//30
//                        if (dia_inicio > 30) {
//                            dia_inicio -= 30;
//                            mes_inicio++;
//                        }
//                    } else if (mes_inicio == 2) {//28 o 29(cuando es bisiesto)
//                        if ((mes_inicio % 2) == 0) {
//                            if (dia_inicio > 29) {
//                                dia_inicio -= 29;
//                            } else {
//                                dia_inicio -= 28;
//                            }
//                            mes_inicio++;
//                        }
//                    }
//                    if (mes_inicio < 10) {
//                        mes_inicio = "0" + parseInt(mes_inicio);
//                    }
//                    if (dia_inicio < 10)
//                        idstemp = anio_inicio + mes_inicio + "0" + dia_inicio;
//                    else
//                        idstemp = anio_inicio + mes_inicio + dia_inicio;
//                    pintar(idstemp, i);//pintamos los siguientes días del evento de su duración
//                }
//            }
//        }
//    }
//}
//function repinta() {
//    for (var i = 0; i < arrEventos.length; i++) {
//        fecha_inicio = arrEventos[i][4];
//        var dia_inicio = fecha_inicio.substring(8, 10);
//        var mes_inicio = fecha_inicio.substring(5, 7);
//        var anio_inicio = fecha_inicio.substring(0, 4);
//        fecha_final = arrEventos[i][5];
//        var dia_final = fecha_final.substring(8, 10);
//        var mes_final = fecha_final.substring(5, 7);
//        var anio_final = fecha_final.substring(0, 4);
//        idstemp = anio_inicio + mes_inicio + dia_inicio;
//        var divs = document.getElementById(idstemp);
//        if (divs != null) {
//            var elementos = divs.getElementsByTagName('tbody');
//            elementos[0].innerHTML = "";
//            var fecha_diferencia = dia_final - dia_inicio;
//            var divs = document.getElementById(idstemp);
//            if (divs != null) {
//                var elementos = divs.getElementsByTagName('tbody');
//                if (fecha_diferencia != 0) {
//                    if (fecha_diferencia < 0) {
//                        if (mes_inicio == 01 || mes_inicio == 03 || mes_inicio == 05 || mes_inicio == 07 || mes_inicio == 08 ||
//                                mes_inicio == 10 || mes_inicio == 12) {
//                            fecha_diferencia = (dia_inicio - 31) + ((0 - dia_final) * -1);
//                        } else if (mes_inicio == 4 || mes_inicio == 6 || mes_inicio == 9 || mes_inicio == 11) {
//                            dia_inicio = parseInt(dia_inicio) - 30;
//                            fecha_diferencia = (dia_inicio * -1) + parseInt(dia_final);
//                        } else if (mes_inicio == 2) {
//                            if ((mes_inicio % 2) == 0) {
//                                if (dia_inicio > 29) {
//                                    fecha_diferencia = (dia_inicio - 29) + ((0 - dia_final) * -1);
//                                } else {
//                                    fecha_diferencia = (dia_inicio - 28) + ((0 - dia_final) * -1);
//                                }
//                            }
//                        }
//                    }
//                }
//                var dia_inicio = fecha_inicio.substring(8, 10);
//                if (arrEventos[i][3] == "True") {
//                    continue;
//                } else {
//                    for (var j = 0; j < fecha_diferencia; j++) {
//                        dia_inicio++;
//                        if (mes_inicio == 01 || mes_inicio == 03 || mes_inicio == 05 || mes_inicio == 07 || mes_inicio == 08 ||
//                                mes_inicio == 10 || mes_inicio == 12) {//31dias
//                            if (dia_inicio >= 31) {
//                                dia_inicio -= 31;
//                                if (mes_inicio == 12) {
//                                    anio_inicio++;
//                                    mes_inicio = "0" + 1;
//                                }
//                            }
//                        } else if (mes_inicio == 4 || mes_inicio == 6 || mes_inicio == 9 || mes_inicio == 11) {//30
//                            if (dia_inicio > 30) {
//                                dia_inicio -= 30;
//                                mes_inicio++;
//                            }
//                        } else if (mes_inicio == 2) {//28 o 29(cuando es bisiesto)
//                            if ((mes_inicio % 2) == 0) {
//                                if (dia_inicio > 29) {
//                                    dia_inicio -= 29;
//                                } else {
//                                    dia_inicio -= 28;
//                                }
//                                mes_inicio++;
//                            }
//                        }
//                        if (mes_inicio < 10) {
//                            mes_inicio = "0" + parseInt(mes_inicio);
//                        }
//                        if (dia_inicio < 10)
//                            idstemp = anio_inicio + mes_inicio + "0" + dia_inicio;
//                        else
//                            idstemp = anio_inicio + mes_inicio + dia_inicio;
//                        var divs = document.getElementById(idstemp);
//                        if (divs != null) {
//                            var elementos = divs.getElementsByTagName('tbody');
//                            elementos[0].innerHTML = "";
//                        }
//                    }
//                }
//            }
//        }
//    }
//    pintarDias();
//}
//function pintar(ids, pos) {
//    var divs = document.getElementById(ids);
//    if (divs != null) {
//        var elementos = divs.getElementsByTagName('tbody');
//        elementos[0].style.fontSize = '12px';
//        elementos[0].style.textAlign = 'center';
//        DiaSemana(ids, pos, elementos);
//    }
//}
//si es una cita tiene notas iníciales y finales una tarea puede tener notas finales
function cita_evento() {
    var tipos = document.getElementsByName("tipo");
    for (var i = 0; i < tipos.length; i++) {
        if (tipos[i].checked && tipos[i].value == "1") {
            document.getElementById("ntsIni").className = "collapse";
            document.getElementById("prioridad").className = "col-md-6 collapse in";
            document.getElementById("prioridad").style.visibility = "visible";
            document.getElementById("estado").className = "col-md-6";
            document.getElementById("horario").className = "collapse";
            break;
        } else {
            document.getElementById("ntsIni").className = "form-group collapse in";
            document.getElementById("ntsIni").style.visibility = "visible";
            document.getElementById("prioridad").className = "collapse";
            document.getElementById("estado").className = "form-group";
            duracionEvento();
        }
    }
}
function duracionEvento() {
    if (document.getElementById("duracion").checked) {
        document.getElementById("fini").className = "col-md-9 collapse in";
        document.getElementById("fini").style.visibility = "visible";
        document.getElementById("horario").className = "collapse";
        document.getElementById("ffin").className = "collapse";
    } else {
        document.getElementById("fini").className = "col-md-4";
        document.getElementById("ffin").className = "collapse in";
        document.getElementById("ffin").style.visibility = "visible";
        var tipos = document.getElementsByName("tipo");
        if (tipos[1].checked && tipos[1].value == "1") {
            document.getElementById("horario").className = "collapse";
        } else {
            document.getElementById("horario").className = "collapse in";
            document.getElementById("horario").style.visibility = "visible";
        }
    }
}
//si es una cita se definirá con un horario dentro de ese horario seleccionado no podrán añadirse mas 
//horario inicio y fin(inicio = 8:00AM - Fin = 9:30AM)

//$('.demoPopover').popover({
//    trigger: 'hover',
//    placement: pospopup
//});
// onmouseover="popup(\'' + posPopup + '\');"
function pinta(pos, elementos, posPopup) {
    if (arrEventos[pos][2] == 1) {//tareas
        var contenido = elementos[0].innerHTML;
        elementos[0].innerHTML = "";
        elementos[0].innerHTML = contenido + '<tr onmouseover="popup();" class="demoPopover" title="Tarea" ' +
            'data-placement="' + posPopup + '" data-content="Notas: ' + arrEventos[pos][6] + ' &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Fin: ' + arrEventos[pos][7] +
            '" style="text-align: center; background: #27ae60;' + ' border-top: 1px solid white;"><td' + ' style="color: white;">' +
            '<span class= "elusive icon-list-alt"> &nbsp;&nbsp;' + arrEventos[pos][0] + '</span></td></tr>';
        contenido = '';
    } else {//citas
        var contenido = elementos[0].innerHTML;
        elementos[0].innerHTML = "";
        elementos[0].innerHTML = contenido + '<tr onmouseover="popup();" class="demoPopover" title="Cita" ' +
            'data-placement="' + posPopup + '" data-content="Notas: ' + arrEventos[pos][6] + ' &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Fin: ' + arrEventos[pos][7] +
            '" style="text-align: center; background: #2980b9;' + ' border-top: 1px solid white;"><td' + ' style="color: white;">' +
            '<span class= "elusive icon-group"> &nbsp;&nbsp;' + arrEventos[pos][0] + '</span></td></tr>';
        contenido = '';
    }
}
var mes = new Date();
mes = mes.getMonth() + 1;
function Presione() {
    if (document.getElementById("prev").focus()) {
    }
    if (document.getElementById("next").click()) {
        alert("presione next")
    }
}