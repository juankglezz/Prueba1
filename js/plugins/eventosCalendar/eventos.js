var arrEventos = [];
var arrTempEven, idtemp, arrTemp, fechaInicio;
var texto = '';
var mesActual = new Date();
var index = 0;


function obtenerId(ids) {
    idtemp = ids;
    var mes;
    var nombreMes = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
    fechaInicio = nombreMes[parseInt(ids.substring(20, 22)) - 1] + ' ' + ids.substring(22, 24) + ', ' + ids.substring(16, 20);
    document.getElementById('fecInicio').innerHTML = fechaInicio;
    showLightbox();
}
function showLightbox() {
    //alert("Evita repetir los titulos de los eventos")
    document.getElementById('over').style.display = 'block';
    document.getElementById('fade').style.display = 'block';
}
function guardar() { //verificar el tipo de evento si es dia unico o varios dias, si es evento de cada semana etc.
    arrTempEven = new Array();
    arrTempEven[0] = idtemp;
    arrTempEven[1] = document.getElementById('titulo').value;
    if (arrTempEven[1] !== '') {
        arrTempEven[2] = fechaInicio;
        arrTempEven[4] = document.getElementById('tipoEvento').value;
        //validar el tipo de evento si es unico no poner fecha final, si es de varios dias habilitar fecha final
        arrTempEven[3] = document.getElementById('fecFinal').value;
        arrTempEven[5] = randomColor({
            luminosity: 'light'
        });
        var divs = document.getElementById(arrTempEven[0]);
        arrTempEven[6] = detectarIndexEvento(divs);
        anadirEvento(idtemp);
    } else {
        alert('Evento no creado, falto el TITULO intenta nuevamente');
        setTimeout(function () {
            document.getElementById('fade').style.display = 'block';
            document.getElementById('over').style.display = 'block';
        }, 0);
    }
}
function detectarIndexEvento(elemento) {
    var etiqueta = elemento.getElementsByTagName('tr');
    if (etiqueta[0] == null) {
        index = 0;
        index++;
        return index;
    } else {
        for (i = 0; i < etiqueta.length; i++) {
            index = etiqueta[i].id;
        }
        index++;
        return index
    }
}
function anadirEvento(ids) {
    arrEventos.push(arrTempEven);
    var divs = document.getElementById(ids);
    var tabla = divs.getElementsByTagName('tbody');
    tabla[0].style.height = '14px';
    var contenido = tabla[0].innerHTML;
    tabla[0].innerHTML = contenido + '<tr class=contenidoEvento id=' + detectarIndexEvento(divs)
    + ' bgcolor =' + arrTempEven[5] + ' style="text-align: center;"><td>' + arrTempEven[1] + '</td></tr>';
    tablaEventos();
}
function hideLightbox() {
    document.getElementById('fade').style.display = 'none';
    document.getElementById('over').style.display = 'none';
    document.getElementById('guardar').disabled = false;
    document.getElementById('editar').disabled = true;
}
//cambiar por la tabla de jquery datatables
function tablaEventos() { //imprime la tabla de los eventos
    for (i = 0; i < arrEventos.length; i++) {
        if (arrEventos[i][1] !== "") {
            var divs = document.getElementById(arrEventos[i][0]);
            texto += '<tr><td>' + arrEventos[i][1] + '</td><td>' + arrEventos[i][2] + '</td><td>' + arrEventos[i][3]
            + '</td><td>' + arrEventos[i][4] + '</td><td style=\'text-align:center;\'>' +
            '<div class=\'btn-group\'><button class=\'btn btn-sm\' onclick=\'editarEvento(this.id);tablaEventos();\' id=\''
            + arrEventos[i][0] + i + '\'><span class=\'elusive icon-pencil\'></span></button>' +
            '<button onclick=\'eliminarEvento(this.id);\' id=\'' + arrEventos[i][0] + arrEventos[i][6]
            + '\' class=\'btn btn-sm\'><span class=\'elusive icon-trash\'></span>'
            + '</button></div></td></tr>';
        }
    }
    document.getElementById('cambio').innerHTML = texto;
    texto = '';
}
//-------------------Eliminar evento----------------------------
function paginacion() {
    document.getElementById('paginador').innerHTML = '';
    var p = new Paginador(document.getElementById('paginador'), document.getElementById('tblDatos'), 13
    );
    p.Mostrar();
}
Paginador = function (divPaginador, tabla, tamPagina) {
    this.miDiv = divPaginador;
    this.tabla = tabla;
    this.tamPagina = tamPagina;
    this.pagActual = 1;
    this.paginas = Math.floor((this.tabla.rows.length - 1) / this.tamPagina);
    this.SetPagina = function (num) {
        if (num < 0 || num > this.paginas)
            return;
        this.pagActual = num;
        var min = 1 + (this.pagActual - 1) * this.tamPagina;
        var max = min + this.tamPagina - 1;
        for (var i = 1; i < this.tabla.rows.length; i++) {
            if (i < min || i > max)
                this.tabla.rows[i].style.display = 'none';
            else
                this.tabla.rows[i].style.display = '';
        }
        this.miDiv.firstChild.rows[0].cells[1].innerHTML = this.pagActual;
    }
    this.Mostrar = function () {
        var tblPaginador = document.createElement('table');
        var fil = tblPaginador.insertRow(tblPaginador.rows.length);
        var ant = fil.insertCell(fil.cells.length);
        ant.innerHTML = 'Anterior';
        ant.className = 'paginacion';
        var self = this;
        ant.onclick = function () {
            if (self.pagActual == 1)
                return;
            self.SetPagina(self.pagActual - 1);
        }
        var num = fil.insertCell(fil.cells.length);
        num.innerHTML = '';
        num.className = 'pag_num';
        var sig = fil.insertCell(fil.cells.length);
        sig.innerHTML = 'Siguiente';
        sig.className = 'paginacion';
        sig.onclick = function () {
            if (self.pagActual == self.paginas)
                return;
            self.SetPagina(self.pagActual + 1);
        }
        this.miDiv.appendChild(tblPaginador);
        if (this.tabla.rows.length - 1 > this.paginas * this.tamPagina)
            this.paginas += this.paginas + 1;
        this.SetPagina(this.pagActual);
    }
}
//----------------Fin eliminar evento---------------------------
function editarEvento(ids) {
    var ids2 = ids.substring(0, 24);
    var index = ids.substring(24);
    arrTemp = arrEventos[index];
    document.getElementById('guardar').disabled = true;
    document.getElementById('editar').disabled = false;
    document.getElementById("fecIniSelect").style.visibility = "initial";
    document.getElementById("fecInicio").style.visibility = "collapse";
    showLightbox();
    arrEventos.splice(index, 1, arrTemp);
    idtemp = ids;
}
function editado() {
    var ids2 = idtemp.substring(0, 24);//obteniendo el id
    var index = idtemp.substring(24);//obteniendo el indice de la posision del arreglo
    arrTemp = arrEventos[index];
    arrTemp[1] = document.getElementById('titulo').value;
    arrTemp[2] = document.getElementById('fecIniSelect').value;
    arrTemp[3] = document.getElementById('fecFinal').value;
    arrTemp[4] = document.getElementById('tipoEvento').value;
    tablaEventos();
    var divs = document.getElementById(ids2);
    if (divs !== null) {
        var elementos = divs.getElementsByTagName('tr');
        for (i = 0; i < elementos.length; i++)
            if (elementos[i].id == arrEventos[index][6]) {
                elementos[i].style.background = arrEventos[index][5];
                elementos[i].innerHTML = arrEventos[index][1];
                break;
            }
    }
}
function eliminarEvento(ids) {
    var ids2 = ids.substring(0, 24); //id del dia
    index = ids.substring(24); //indice del evento del dia
    var divs = document.getElementById(ids2);
    if (divs !== null) {
        var elementos = divs.getElementsByTagName('tr');
        for (i = 0; i < elementos.length; i++)
            if (elementos[i].id == arrEventos[index - 1][6]) {
                elementos[i].style.background = '#F2F3F4';
                elementos[i].innerHTML = '';
                break;
            }
    }
    eliminarDato(ids); //realizar una busqueda y eliminar el evento correcto 
    alert('Evento eliminado');
    tablaEventos();
    paginacion();
}
function eliminarDato(ids) {
    for (var i = arrEventos.length; i--;) {
        var ide = arrEventos[i][0] + arrEventos[i][6];
        if (ide == ids) {
            arrEventos[i][1] = "";
            arrEventos[i][2] = "";
            arrEventos[i][3] = "";
            arrEventos[i][4] = "";
            arrEventos[i][5] = "";
            //arrEventos.splice(i, 1 );
        }
    }
}
function pintar() {
    if (arrEventos !== null) {
        for (i = 0; i < arrEventos.length; i++) {
            arrTemp = arrEventos[i];
            var inicioEvento = arrTemp[2];
            var finEvento = arrTemp[3];
            var tipoEvento = arrTemp[4];
            ids = arrTemp[0];
            var divs = document.getElementById(ids);
            var contenido
            if (divs !== null) {
                var elemento = divs.getElementsByTagName('tbody');
                switch (tipoEvento) {
                    case 'Dia Unico':
                        //evitar la impresion repetida de los eventos
                        pintarId(ids, arrTemp);
                        break;
                    case 'Varios dias':
                        var inicio = inicioEvento.indexOf(' ');
                        var fin = finEvento.indexOf(' ');
                        var diaInicio = inicioEvento.substring((inicio + 1), (inicio + 3));
                        var diaFinal = finEvento.substring((fin + 1), (fin + 3));
                        var diaDiferencia = diaFinal - diaInicio;
                        var id = arrTemp[0];
                        var dia = id.substring(22);
                        pintarId(ids, arrTemp);
                        for (i = 1; i <= diaDiferencia; i++) {
                            id = id.substring(0, 22);
                            dia++;
                            id = id + dia;
                            pintarId(id, arrTemp);
                        }
                        break;
                    case 'Semanal':
                        //pintar cada dia en un mismo "miercoles" por todo el mes hasta que manualmente sea eliminado
                        //validar el id del elemento a pintar si es el que le corresponde
                        pintarId(ids, arrTemp);
                        var inicio = inicioEvento.indexOf(' ');
                        var dia = ids.substring(22);
                        var mes = ids.substring(20, 22);

                        ids = ids.substring(0, 22);
                        for (i = 0; i < 5; i++) {
                            dia = parseInt(dia) + 7;
                            if (mes == 01 || mes == 03 || mes == 05 || mes == 07 || mes == 08 || mes == 10 || mes == 12) {//31dias
                                if (dia > 31) {
                                    dia -= 31;
                                    mes++;
                                    if (dia < 10)
                                        ids = ids.substring(0, 20) + mes + "0" + dia;
                                    else
                                        ids = ids.substring(0, 20) + mes + dia;
                                    arrTemp[0] = ids;
                                    anadirEvento2(ids, arrTemp);
                                }
                            } else if (mes == 4 || mes == 6 || mes == 9 || mes == 11) {//30
                                if (dia > 30) {
                                    dia -= 30;
                                    mes++;
                                    if (dia < 10)
                                        ids = ids.substring(0, 20) + mes + "0" + dia;
                                    else
                                        ids = ids.substring(0, 20) + mes + dia;
                                    arrTemp[0] = ids;
                                    anadirEvento2(ids, arrTemp);
                                }
                            } else if (mes == 2) {//28 o 29(cuando es bisiesto)
                                if ((mes % 2) == 0) {
                                    if (dia > 29) {
                                        dia -= 29;
                                        mes++;
                                        if (dia < 10)
                                            ids = ids.substring(0, 20) + mes + "0" + dia;
                                        else
                                            ids = ids.substring(0, 20) + mes + dia;
                                        arrTemp[0] = ids;
                                        anadirEvento2(ids, arrTemp);
                                    } else {
                                        dia -= 28;
                                        mes++;
                                        if (dia < 10)
                                            ids = ids.substring(0, 20) + mes + "0" + dia;
                                        else
                                            ids = ids.substring(0, 20) + mes + dia;
                                        arrTemp[0] = ids;
                                        anadirEvento2(ids, arrTemp);
                                    }
                                }
                            }
                            if (dia < 10)
                                ids = ids.substring(0, 20) + mes + "0" + dia;
                            else
                                ids = ids.substring(0, 20) + mes + dia;

                            pintarId(ids, arrTemp);
                        }
                        break;
                    case 'Mensual':
                        //cada mes se pinta el mismo dia
                        // al cambiar de mes se pinta y se agrega el evento del mes siguiente al arreglo
                        var inicio = inicioEvento.indexOf(' ');
                        var diaInicio = inicioEvento.substring((inicio + 1), (inicio + 3));
                        var id = arrTemp[0];
                        var mes = id.substring(20, 22);
                        var año = id.substring(16, 20);
                        aplicarEstilos(elemento);
                        if (parseInt(mes) >= 12) {
                            mes = 1;
                            año++;
                        }
                        else
                            mes++;
                        if (mes < 10)
                            idtemp = id.substring(0, 16) + año + "0" + mes + id.substring(22);
                        else
                            idtemp = id.substring(0, 16) + año + mes + id.substring(22);
                        arrTemp[0] = idtemp;
                        anadirEvento2(idtemp, arrTemp);
                        contenido = elemento[0].innerHTML;
                        elemento[0].innerHTML = "";
                        elemento[0].innerHTML = contenido + '<tr class=contenidoEvento id=' + arrTemp[6]
                        + ' bgcolor =' + arrTemp[5] + ' style="text-align: center"><td>' + arrTemp[1] + '</td></tr>';
                        contenido = '';
                        break;
                    case 'Anual':
                        //cada año se pinta el mismo dia del mismo mes
                        var inicio = inicioEvento.indexOf(' ');
                        var diaInicio = inicioEvento.substring((inicio + 1), (inicio + 3));
                        var id = arrTemp[0];
                        var mes = id.substring(20, 22);
                        var año = id.substring(16, 20);
                        año++;
                        idtemp = id.substring(0, 16) + año + mes + id.substring(22);
                        arrTemp[0] = idtemp;
                        anadirEvento2(idtemp, arrTemp);

                        aplicarEstilos(elemento);
                        var contenido = elemento[0].innerHTML;
                        elemento[0].innerHTML = "";
                        elemento[0].innerHTML = contenido + '<tr class=contenidoEvento id=' + arrTemp[6]
                        + ' bgcolor =' + arrEventos[i][5] + ' style="text-align: center;"><td>' + arrEventos[i][1] + '</td></tr>';
                        contenido = '';
                        break;
                }
            }
        }
    }
}
function anadirEvento2(ids, arr) {
    arrEventos.push(arr);
    var divs = document.getElementById(ids);
    if (divs !== null) {
        var tabla = divs.getElementsByTagName('tbody');
        tabla[0].style.height = '14px';
        var contenido = tabla[0].innerHTML;
        tabla[0].innerHTML = contenido + '<tr class=contenidoEvento id=' + arr[6]
        + ' bgcolor =' + arr[5] + ' style="text-align: center;"><td>' + arr[1] + '</td></tr>';
    }
}
function aplicarEstilos(elemento) {
    elemento[0].style.background = arrTemp[5];
    elemento[0].style.fontSize = '12px';
    elemento[0].style.textAlign = 'center';
}
function pintarId(ids, arr) { //tomara los valores del arreglo para pintar cada vez que cambia de mes dependiendo del id
    var divs = document.getElementById(ids);
    if (divs !== null) {
        var elementos = divs.getElementsByTagName('tbody');
        elementos[0].style.background = arr[5];
        elementos[0].style.fontSize = '12px';
        elementos[0].style.textAlign = 'center';
        var contenido = elementos[0].innerHTML;
        elementos[0].innerHTML = "";
        elementos[0].innerHTML = contenido + '<tr class=contenidoEvento id=' + arr[6]
        + ' bgcolor =' + arr[5] + ' style="text-align: center"><td>' + arr[1] + '</td></tr>';
        contenido = '';
    }
}
