$(document).ready(function () {
    ListaPrinActService(Filtros, Init);
});


$("#BtnAgregar").click(() => {

    $("#ModalPrinAct").modal("show");
    Current = null;

    AgregarPrinAct();
});

$("#BtnGuardar").click(() => {

    if (Current == null) {
        GuardarPrinAct();
    } else {
        ActualizarPrinAct();
    }


});

$("#BtnCerrar").click(() => {
    CerrarPrinAct();
});





let Filtros = {
    Vigencia: null
}
let Lista = null;
let Current = null;

const Init = (data) => {
    Lista = data;
    InitTable();

}


const InitTable = () => {
    $("#TablePrinAct").empty();

    Lista.forEach((item) => {

        $("#TablePrinAct").append(
            `
                    <tr>
                        <td>${item.PA_Id}</td>
                        <td>${item.PA_Descrip}</td>
                        <td>${item.PA_Vigencia}</td>

                        <td><label onclick="EditarFactor('${item.PA_Id}')">Editar</label></td>
                        <td><label onclick="EliminarFactor('${item.PA_Id}')">Eliminar</label></td>
                    </tr>
            `
        )

    });


}

const EditarPrinAct = (id) => {

    console.log(id);

    let valor = null;

    Lista.forEach((item) => {

        if (item.Fecha == id) {
           
            Current = {
                PA_Id: item.PA_Id,
                PA_Descrip: item.PA_Descrip,
                PA_Vigencia: item.PA_Vigencia
            };

        }

    });



    $("#TxtFecha").val(id);
    $("#TxtTasa").val(valor);

    $("#ModalPrinAct").modal("show");

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
        Current = null;
    });

}

const AgregarPrinAct = () => {

    if (Current == null) {
        return;
    }

    AgregarPrinActService(Current, () => {

        $("#ModalPrinAct").modal("hide");
        Current = null;
    });

}

const ActualizarPrinAct = () => {

    if (Current == null) {
        return;
    }

    ActualizarPrinActService(Current, () => {
        $("#ModalPrinAct").modal("hide");
        Current = null;
    });

}

const CerrarPrinAct = () => {

    $("#ModalPrinAct").modal("hide");
    Current = null;

}