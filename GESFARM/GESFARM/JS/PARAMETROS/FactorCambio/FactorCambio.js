$(document).ready(function () {
    ListaFactorCambioService(Init);
});


$("#BtnAgregar").click(() => {

    $("#ModalFactorCambio").modal("show");
    Current = null;

    AgregarFactor();
});

$("#BtnGuardar").click(() => {

    if (Current == null) {
        GuardarFactor();
    } else {
        ActualizarFactor();
    }


});

$("#BtnCerrar").click(() => {
    CerrarFactor();
});






let Lista = null;
let Current = null;

const Init = (data) => {
    Lista = data;
    InitTable();

}


const InitTable = () => {
    $("#TableFactorCambio").empty();

    Lista.forEach((item) => {

        $("#TableFactorCambio").append(
            `
                    <tr>
                        <td>${item.Fecha}</td>
                        <td>${new Intl.NumberFormat('de-DE').format(item.Tasa)}</td>
                        <td><label onclick="EditarFactor('${item.Fecha}')">Editar</label></td>
                        <td><label onclick="EliminarFactor('${item.Fecha}')">Eliminar</label></td>
                    </tr>
            `
        )

    });


}

const EditarFactor = (id) => {

    console.log(id);

    let valor = null;

    Lista.forEach((item) => {

        if (item.Fecha == id) {
            valor = new Intl.NumberFormat('de-DE').format(item.Tasa);

            Current = {
                Fecha: item.Fecha,
                Tasa: item.Tasa
            };

        }

    });



    $("#TxtFecha").val(id);
    $("#TxtTasa").val(valor);

    $("#ModalFactorCambio").modal("show");

}

const EliminarFactor = (id) => {

    Lista.forEach((item) => {

        if (item.Fecha == id) {

            Current = {
                Fecha: item.Fecha,
                Tasa: item.Tasa
            };

        }

    });

    if (Current == null) {
        return;
    }

    EliminarFactorCambioService(Current, () => {

        Current = null;
    });

}

const AgregarFactor = () => {

    if (Current == null) {
        return;
    }

    AgregarFactorCambioService(Current, () => {

        $("#ModalFactorCambio").modal("hide");
        Current = null;
    });

}

const ActualizarFactor = () => {



    if (Current == null) {
        return;
    }

    Current.Tasa = new Intl.NumberFormat('en-US').format($("#TxtTasa").val()) ;

    ActualizarFactorCambioService(Current, () => {

        $("#ModalFactorCambio").modal("hide");
        Current = null;
    });

}

const CerrarFactor = () => {

    $("#ModalFactorCambio").modal("hide");
    Current = null;

}