let Filtros = null;

let Lista = null;
let Current = null;
let Existe = false;

$(document).ready(function () {

    ListaParametroService(Filtros, Init);
});

$("#BtnAgregar").click(() => {

    $("#ModalParametro").modal("show");
    Current = null;

});

$("#BtnFiltrar").click(() => {
    Buscar();
});

$("#BtnCerrar").click(() => {
    CloseModal();
});

$("#BtnGuardar").click(() => {

    if ($('#TxtId').val() == '' || $("#TxtValor").val() == '') {
        toastr.warning("Revise datos requeridos", "Advertencia");
        return;
    }

    if ($("#Tipo").val() == 'N') {
        Current = {
            PAR_Id: $('#TxtId').val(),
            PAR_Valor_Numerico: $("#TxtValor").val(),
            PAR_Valor_Texto: null
        };
    }
    if ($("#Tipo").val() == 'T') {
        Current = {
            PAR_Id: $('#TxtId').val(),
            PAR_Valor_Numerico: null,
            PAR_Valor_Texto: $("#TxtValor").val()
        };
    }

    Existe = false;

    Lista.forEach((item) => {

        if (item.PAR_Id == $('#TxtId').val()) {
            Existe = true;
        }

    })

    if (Existe) {
        ActualizarParametro();
    }
    else {
        GuardarParametro();
    }


});

const Buscar = () => {
    ListaParametroService(Filtros, Init);
}

const Init = (data) => {
    Lista = data;
    InitTable();

}

const InitTable = () => {
    $("#TableParametro").empty();

    Lista.forEach((item) => {

        $("#TableParametro").append(
            `
                    <tr>
                        <td>${item.PAR_Id}</td>
                        <td>${(item.PAR_Valor_Numerico == null) ? '' : item.PAR_Valor_Numerico }</td>
                        <td>${(item.PAR_Valor_Texto == null) ? '' : item.PAR_Valor_Texto}</td>
                        <td><label onclick="EditarParametro('${item.PAR_Id}')">Editar</label></td>
                        <td><label onclick="EliminarParametro('${item.PAR_Id}')">Eliminar</label></td>
                    </tr>
            `
        )
    });

}

const EditarParametro = (id) => {

    Lista.forEach((item) => {

        Current = null;

        if (item.PAR_Id == id) {

            Current = {
                PAR_Id: item.PAR_Id,
                PAR_Valor_Numerico: item.PAR_Valor_Numerico,
                PAR_Valor_Texto: item.PAR_Valor_Texto
            };

            OpenModal();

        }

    });

}

const EliminarParametro = (id) => {

    Lista.forEach((item) => {
        if (item.PAR_Id == id) {
            Current = {
                PAR_Id: item.PAR_Id,
                PAR_Valor_Numerico: item.PAR_Valor_Numerico,
                PAR_Valor_Texto: item.PAR_Valor_Texto
            };
        }
    });

    if (Current == null) {
        return;
    }

    EliminarParametroService(Current, () => {
        Buscar();
    });

}

const ActualizarParametro = () => {

    if ($("#Tipo").val() == 'N') {
        Current = {
            PAR_Id: $('#TxtId').val(),
            PAR_Valor_Numerico: $("#TxtValor").val(),
            PAR_Valor_Texto: null
        };
    }
    if ($("#Tipo").val() == 'T') {
        Current = {
            PAR_Id: $('#TxtId').val(),
            PAR_Valor_Numerico: null,
            PAR_Valor_Texto: $("#TxtValor").val()
        };
    }

    ActualizarParametroService(Current, () => {
        CloseModal();
    });

}

const GuardarParametro = () => {

    if ($("#Tipo").val() == 'N') {
        Current = {
            PAR_Id: $('#TxtId').val(),
            PAR_Valor_Numerico: $("#TxtValor").val(),
            PAR_Valor_Texto: null
        };
    }
    if ($("#Tipo").val() == 'T') {
        Current = {
            PAR_Id: $('#TxtId').val(),
            PAR_Valor_Numerico: null,
            PAR_Valor_Texto: $("#TxtValor").val()
        };
    }

    AgregarParametroService(Current, () => {
        CloseModal();
    });

}


const OpenModal = () => {
    CleanModal();
    SetModal();
    $("#ModalParametro").modal("show");
}

const CloseModal = () => {
    CleanModal();
    Current = null;
    Buscar();
    $("#ModalParametro").modal("hide");


}


const CleanModal = () => {

    $("#TxtId").val('');
    $("#TxtValor").val('');

}

const SetModal = () => {

    $("#TxtId").val(Current.PAR_Id);

    if (Current.PAR_Valor_Texto != null) {
        $("#Tipo").val('T');
        $("#TxtValor").val(Current.PAR_Valor_Texto);

    }

    if (Current.PAR_Valor_Numerico != null) {
        $("#Tipo").val('N');
        $("#TxtValor").val(Current.PAR_Valor_Numerico);

    }
}