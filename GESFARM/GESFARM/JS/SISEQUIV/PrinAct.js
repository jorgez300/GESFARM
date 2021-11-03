
let Filtros = {
    PA_Vigencia: null,
    PA_Id: null
}
let Lista = null;
let Current = null;

$(document).ready(function () {
    GetAutoPrincipioActivoService();
    ListaPrinActService(Filtros, Init);
});


$("#BtnAgregar").click(() => {

    $("#ModalPrinAct").modal("show");
    $("#DivPrinActId").addClass('d-none');
    Current = null;

});

$("#BtnFiltrar").click(() => {
    Buscar();
});

$("#BtnGuardar").click(() => {

    Current = {
        PA_Id: $('#TxtId').val() != '' ? $('#TxtId').val() : null,
        PA_Descrip: $("#TxtDescripcion").val(),
        PA_Vigencia: ($("#ChkVigente").prop('checked')) ? 1 : 0
    };

    if (Current.PA_Id == null) {
        GuardarPrinAct();
    } else {
        ActualizarPrinAct();
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

    Filtros.PA_Vigencia = null;
    Filtros.PA_Id = $('#PrinActValue').val() != '' ? $('#PrinActValue').val() : null;

}

const CleanFiltros = () => {

    if (Filtros.PA_Id != null) {
        Filtros.PA_Vigencia = null;
        Filtros.PA_Id = null;

        $('#PrinActValue').val('');
        $('#PrinAct').val('');
    }



}


const GetAutoPrincipioActivoService = () => {

    AutoPrincipioActivoService((data) => {
        InitAutocomplete('PrinAct', data);
    });

}

const Buscar = () => {
    SetFiltros();
    GetAutoPrincipioActivoService();
    ListaPrinActService(Filtros, Init);
}

const InitTable = () => {
    $("#TablePrinAct").empty();

    Lista.forEach((item) => {

        $("#TablePrinAct").append(
            `
                    <tr>
                        <td>${item.PA_Id}</td>
                        <td>${item.PA_Descrip}</td>
                        <td>${(item.PA_Vigencia == 1) ? 'SI' : 'NO'}</td>
                        <td><label onclick="EditarPrinAct('${item.PA_Id}')">Editar</label></td>
                        <td><label onclick="EliminarPrinAct('${item.PA_Id}')">Eliminar</label></td>
                    </tr>
            `
        )

    });


}

const EditarPrinAct = (id) => {

    console.log(id);
    $("#DivPrinActId").removeClass('d-none');

    Lista.forEach((item) => {

        Current = null;

        if (item.PA_Id == id) {

            Current = {
                PA_Id: item.PA_Id,
                PA_Descrip: item.PA_Descrip,
                PA_Vigencia: item.PA_Vigencia
            };

            OpenModal();

        }

    });

}

const EliminarPrinAct = (id) => {

    Lista.forEach((item) => {
        if (item.PA_Id == id) {
            Current = {
                PA_Id: item.PA_Id,
                PA_Descrip: item.PA_Descrip,
                PA_Vigencia: item.PA_Vigencia
            };
        }
    });

    if (Current == null) {
        return;
    }

    EliminarPrinActService(Current, () => {
        CleanFiltros();
        Buscar();
    });

}


const ActualizarPrinAct = () => {

    Current = {
        PA_Id: $("#TxtId").val(),
        PA_Descrip: $("#TxtDescripcion").val(),
        PA_Vigencia: ($("#ChkVigente").prop('checked')) ? 1 : 0
    };

    ActualizarPrinActService(Current, () => {
        CloseModal();
    });

}

const GuardarPrinAct = () => {

    Current = {
        PA_Id: null,
        PA_Descrip: $("#TxtDescripcion").val(),
        PA_Vigencia: ($("#ChkVigente").prop('checked')) ? 1 : 0
    };

    AgregarPrinActService(Current, () => {
        CloseModal();
    });

}


const OpenModal = () => {
    CleanModal();
    SetModal();
    $("#ModalPrinAct").modal("show");
}

const CloseModal = () => {
    CleanModal();
    Current = null;
    Buscar();
    $("#ModalPrinAct").modal("hide");


}

const CleanModal = () => {

    $("#TxtId").val('');
    $("#TxtDescripcion").val('');
    $("#ChkVigente").prop('checked', 0);

}

const SetModal = () => {

    $("#TxtId").val(Current.PA_Id);
    $("#TxtDescripcion").val(Current.PA_Descrip);
    $("#ChkVigente").prop('checked', Current.PA_Vigencia);


}
