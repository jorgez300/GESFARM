
let Filtros = {
    PR_Vigencia: null,
    PR_Id: null
}

let Lista = null;
Current = null;

$(document).ready(function () {
    GetAutoPresentacionService();
    ListaPresentacionService(Filtros, Init);
});


$("#BtnAgregar").click(() => {

    $("#ModalPresentacion").modal("show");
    $("#DivPresentacionId").addClass('d-none');
    Current = null;

});

$("#BtnFiltrar").click(() => {
    Buscar();
});

$("#BtnGuardar").click(() => {

    Current = {
        PR_Id: $('#TxtId').val() != '' ? $('#TxtId').val() : null,
        PR_Descrip: $("#TxtDescripcion").val(),
        PR_Vigencia: ($("#ChkVigente").prop('checked')) ? 1 : 0
    };

    console.log('current BtnGuardar', Current)

    if (Current.PR_Id == null) {
        GuardarPresentacion();
    } else {
        ActualizarPresentacion();
    }


});

$("#BtnCerrar").click(() => {
    CloseModal();
});


const Init = (data) => {
    Lista = data;
    InitTable();

}

const SetFiltros = () => {

    Filtros.PR_Vigencia = null;
    Filtros.PR_Id = $('#PresentacionValue').val() != '' ? $('#PresentacionValue').val() : null;

}

const CleanFiltros = () => {

    if (Filtros.PR_Id != null) {
        Filtros.PR_Vigencia = null;
        Filtros.PR_Id = null;

        $('#PresentacionValue').val('');
        $('#Presentacion').val('');
    }



}


const GetAutoPresentacionService = () => {

    AutoPresentacionService((data) => {
        InitAutocomplete('Presentacion', data);
    });

}

const Buscar = () => {
    SetFiltros();
    GetAutoPresentacionService();
    ListaPresentacionService(Filtros, Init);
}

const InitTable = () => {
    $("#TablePresentacion").empty();

    Lista.forEach((item) => {

        $("#TablePresentacion").append(
            `
                    <tr>
                        <td>${item.PR_Id}</td>
                        <td>${item.PR_Descrip}</td>
                        <td>${(item.PR_Vigencia == 1) ? 'SI' : 'NO'}</td>
                        <td><label onclick="EditarPresentacion('${item.PR_Id}')">Editar</label></td>
                        <td><label onclick="EliminarPresentacion('${item.PR_Id}')">Eliminar</label></td>
                    </tr>
            `
        )

    });


}

const EditarPresentacion = (id) => {

    console.log(id);
    $("#DivPresentacionId").removeClass('d-none');

    Lista.forEach((item) => {

        Current = null;

        if (item.PR_Id == id) {

            Current = {
                PR_Id: item.PR_Id,
                PR_Descrip: item.PR_Descrip,
                PR_Vigencia: item.PR_Vigencia
            };

            console.log('current editar', Current )

            OpenModal();

        }

    });

}

const EliminarPresentacion = (id) => {

    Lista.forEach((item) => {
        if (item.PR_Id == id) {
            Current = {
                PR_Id: item.PR_Id,
                PR_Descrip: item.PR_Descrip,
                PR_Vigencia: item.PR_Vigencia
            };
        }
    });

    if (Current == null) {
        return;
    }

    EliminarPresentacionService(Current, () => {
        CleanFiltros();
        Buscar();
    });

}


const ActualizarPresentacion = () => {

    Current = {
        PR_Id: $("#TxtId").val(),
        PR_Descrip: $("#TxtDescripcion").val(),
        PR_Vigencia: ($("#ChkVigente").prop('checked')) ? 1 : 0
    };

    ActualizarPresentacionService(Current, () => {
        CloseModal();
    });

}

const GuardarPresentacion = () => {

    Current = {
        PR_Id: null,
        PR_Descrip: $("#TxtDescripcion").val(),
        PR_Vigencia: ($("#ChkVigente").prop('checked')) ? 1 : 0
    };

    AgregarPresentacionService(Current, () => {
        CloseModal();
    });

}


const OpenModal = () => {
    CleanModal();
    SetModal();
    $("#ModalPresentacion").modal("show");
}

const CloseModal = () => {
    CleanModal();
    Current = null;
    Buscar();
    $("#ModalPresentacion").modal("hide");


}

const CleanModal = () => {

    $("#TxtId").val('');
    $("#TxtDescripcion").val('');
    $("#ChkVigente").prop('checked', 0);

}

const SetModal = () => {

    $("#TxtId").val(Current.PR_Id);
    $("#TxtDescripcion").val(Current.PR_Descrip);
    $("#ChkVigente").prop('checked', Current.PR_Vigencia);


}