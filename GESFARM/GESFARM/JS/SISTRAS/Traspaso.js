let Archivos = {
    ArchivoMVP: {
        ARCHIVO: null,
        ORIGEN: null,
        DATA: null
    },
    ArchivoVP: {
        ARCHIVO: null,
        ORIGEN: null,
        DATA: null
    },
    ArchivoFFD: {
        ARCHIVO: null,
        ORIGEN: null,
        DATA: null
    }
}

let Lista = [];

$("#BtnGenerar").click(() => {
    GeneraJsonTraspasoService((data) => {
        OpenFile(data.DATA, data.ARCHIVO);
    });
});

$("#BtnEvaluar").click(() => {
    ComparacionTraspasoService((data) => {
        Lista = data.COMPARACION;
        InitComparacion();
    });
});

$("#BtnSubir").click(() => {

    if (!Archivos.ArchivoMVP.DATA) {
        toastr.error("Seleccione archivo de traspaso MVP", "Error")
    }
    if (!Archivos.ArchivoVP.DATA) {
        toastr.error("Seleccione archivo de traspaso VP", "Error")
    }
    if (!Archivos.ArchivoFFD.DATA) {
        toastr.error("Seleccione archivo de traspaso FFD", "Error")
    }

    EscribeJsonTraspasoService(
        Archivos,
        () => {
            toastr.success("Archivos subido", "Completado");
            ResetForm();
        },
        () => {
            ResetForm();
        },
    );
});

const ResetForm = () => {

    Lista = [];

    $("#ArchivoTraspasoFFD").siblings(".custom-file-label").addClass("selected").html('Elegir archivo de traspaso FFD');
    $("#ArchivoTraspasoFFD").val('');
    $("#ArchivoTraspasoMVP").siblings(".custom-file-label").addClass("selected").html('Elegir archivo de traspaso MVP');
    $("#ArchivoTraspasoMVP").val('');
    $("#ArchivoTraspasoVP").siblings(".custom-file-label").addClass("selected").html('Elegir archivo de traspaso VP');
    $("#ArchivoTraspasoVP").val('');
    Archivos = {
        ArchivoMVP: {
            ARCHIVO: null,
            ORIGEN: null,
            DATA: null
        },
        ArchivoVP: {
            ARCHIVO: null,
            ORIGEN: null,
            DATA: null
        },
        ArchivoFFD: {
            ARCHIVO: null,
            ORIGEN: null,
            DATA: null
        }
    }

}

$("#ArchivoTraspasoFFD").on("change", function () {
    if (document.querySelector("#ArchivoTraspasoFFD").files[0].type != 'application/json') {
        event.preventDefault();
        toastr.error("Archivo invalido", "Error")
    }
    else {
        var fileName = $(this).val().split("\\").pop();
        $(this).siblings(".custom-file-label").addClass("selected").html(fileName);
        Archivos.ArchivoFFD.ARCHIVO = fileName;
        SetBase64("FFD");
    }
});

$("#ArchivoTraspasoMVP").on("change", function () {
    if (document.querySelector("#ArchivoTraspasoMVP").files[0].type != 'application/json') {
        event.preventDefault();
        toastr.error("Archivo invalido", "Error")
    }
    else {

        var fileName = $(this).val().split("\\").pop();
        $(this).siblings(".custom-file-label").addClass("selected").html(fileName);
        Archivos.ArchivoMVP.ARCHIVO = fileName;
        SetBase64("MVP");
    }
});

$("#ArchivoTraspasoVP").on("change", function () {
    if (document.querySelector("#ArchivoTraspasoVP").files[0].type != 'application/json') {
        event.preventDefault();
        toastr.error("Archivo invalido", "Error")
    }
    else {

        var fileName = $(this).val().split("\\").pop();
        $(this).siblings(".custom-file-label").addClass("selected").html(fileName);
        Archivos.ArchivoVP.ARCHIVO = fileName;
        SetBase64("VP");
    }
});


$(document).ready(function () {
    null;
});


const SetBase64 = (ORIGEN) => {

    var reader = new FileReader();


    if (ORIGEN == "FFD") {
        reader.readAsDataURL(document.querySelector("#ArchivoTraspasoFFD").files[0]);
    }
    if (ORIGEN == "MVP") {
        reader.readAsDataURL(document.querySelector("#ArchivoTraspasoMVP").files[0]);
    }
    if (ORIGEN == "VP") {
        reader.readAsDataURL(document.querySelector("#ArchivoTraspasoVP").files[0]);
    }

    reader.onload = function () {
        if (ORIGEN == "FFD") {
            Archivos.ArchivoFFD.DATA = reader.result;
        }
        if (ORIGEN == "MVP") {
            Archivos.ArchivoMVP.DATA = reader.result;
        }
        if (ORIGEN == "VP") {
            Archivos.ArchivoVP.DATA = reader.result;
        }
    };
    reader.onerror = function (error) {
        toastr.error("No se pudo leer el archivo de traspaso", "Error");
    };

}

const InitComparacion = () => {

    $("#TableComparacion").empty();

    Lista.forEach((item) => {

        $("#TableComparacion").append(
            `
                    <tr>
                        <td>${item.BASE_TR_Codigo}</td>

                        <td class="cellFFD" nowrap>${item.FFD_TR_Descrip}</td>
                        <td class="cellFFD" nowrap>${item.FFD_TR_Existen}</td>
                        <td class="cellFFD" nowrap>${item.FFD_TR_Promedio}</td>
                        <td class="cellFFD" nowrap>${item.FFD_TR_Minimo}</td>
                        <td class="cellFFD" nowrap>${item.FFD_TR_Maximo}</td>
                        <td class="cellFFD" nowrap>${item.FFD_TR_Id_Pa}</td>
                        <td class="cellFFD" nowrap>${item.FFD_TR_PrincAct}</td>
                        <td class="cellFFD" nowrap>${item.FFD_TR_Id_Pr}</td>
                        <td class="cellFFD" nowrap>${item.FFD_TR_Presentacion}</td>
                        <td class="cellFFD" nowrap>${item.FFD_TR_Costo}</td>
                        <td class="cellFFD" nowrap>${item.FFD_TR_Precio}</td>

                        <td class="cellVP" nowrap>${item.MVP_TR_Descrip}</td>
                        <td class="cellVP" nowrap>${item.MVP_TR_Existen}</td>
                        <td class="cellVP" nowrap>${item.MVP_TR_Promedio}</td>
                        <td class="cellVP" nowrap>${item.MVP_TR_Minimo}</td>
                        <td class="cellVP" nowrap>${item.MVP_TR_Maximo}</td>
                        <td class="cellVP" nowrap>${item.MVP_TR_Id_Pa}</td>
                        <td class="cellVP" nowrap>${item.MVP_TR_PrincAct}</td>
                        <td class="cellVP" nowrap>${item.MVP_TR_Id_Pr}</td>
                        <td class="cellVP" nowrap>${item.MVP_TR_Presentacion}</td>
                        <td class="cellVP" nowrap>${item.MVP_TR_Costo}</td>
                        <td class="cellVP" nowrap>${item.MVP_TR_Precio}</td>

                        <td class="cellMVP" nowrap>${item.VP_TR_Descrip}</td>
                        <td class="cellMVP" nowrap>${item.VP_TR_Existen}</td>
                        <td class="cellMVP" nowrap>${item.VP_TR_Promedio}</td>
                        <td class="cellMVP" nowrap>${item.VP_TR_Minimo}</td>
                        <td class="cellMVP" nowrap>${item.VP_TR_Maximo}</td>
                        <td class="cellMVP" nowrap>${item.VP_TR_Id_Pa}</td>
                        <td class="cellMVP" nowrap>${item.VP_TR_PrincAct}</td>
                        <td class="cellMVP" nowrap>${item.VP_TR_Id_Pr}</td>
                        <td class="cellMVP" nowrap>${item.VP_TR_Presentacion}</td>
                        <td class="cellMVP" nowrap>${item.VP_TR_Costo}</td>
                        <td class="cellMVP" nowrap>${item.VP_TR_Precio}</td>

                    </tr>
            `
        )
    });
}