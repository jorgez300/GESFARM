
$(document).ready(function () {
    GetListaPrincipioActivoService();
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

    if (Current == null) {
        GuardarPrinAct();
    } else {
        ActualizarPrinAct();
    }


});

$("#BtnCerrar").click(() => {
    CloseModal();
});


let Filtros = {
    Vigencia: null,
    Id: null
}
let Lista = null;
let Current = null;

const Init = (data) => {
    Lista = data;
    InitTable();

}

const SetFiltros = () => {

    Filtros.Vigencia = null;
    Filtros.Id = $('#PrinActValue').val() != '' ? $('#PrinActValue').val() : null;

}

const CleanFiltros = () => {

    if (Filtros.Id != null) {
        Filtros.Vigencia = null;
        Filtros.Id = null;

        $('#PrinActValue').val('');
        $('#PrinAct').val('');
    }



}


const GetListaPrincipioActivoService = () => {

    ListaPrincipioActivoService((data) => {
        InitAutocomplete('PrinAct', data);
    });

}

const Buscar = () => {
    SetFiltros();
    GetListaPrincipioActivoService();
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
