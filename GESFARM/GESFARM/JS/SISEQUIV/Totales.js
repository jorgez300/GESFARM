$(document).ready(function () {
    GetListaPrincipioActivoService();
    ListaTotalesProdxPrincActService(Filtros, Init);
});

let Filtros = {
    EXISTEN: null,
    PRIN_ACT: null
}

let FiltrosEquivalentes = {
    CODPROD: null,
    PRIN_ACT: null
}

let Lista = [];
let ListaEquivalentes = [];

const Init = (data) => {
    Lista = data;
    InitTable();
}

$("#BtnFiltrar").click(() => {
    SetFiltros();
    ListaTotalesProdxPrincActService(Filtros, Init);
})

const InitTable = () => {
    $("#TableTotalesProdxPrincAct").empty();

    Lista.forEach((item) => {

        $("#TableTotalesProdxPrincAct").append(
            `
                    <tr>
                        <td>${item.ID_PA}</td>
                        <td>${item.PA_DESCRIP}</td>
                        <td>${item.PROD_X_PA}</td>
                        <td>${item.TOTAL}</td>
                        <td><label onclick="Equivalentes('${item.ID_PA}')">Equivalentes</label></td>
                    </tr>
            `
        )
    });


}


const SetFiltros = () => {

    Filtros.EXISTEN = $('#SelClas').find(":selected").val();
    Filtros.PRIN_ACT = $('#PrinActValue').val();

}

const GetListaPrincipioActivoService = () => {

    ListaPrincipioActivoService((data) => {
        InitAutocomplete('PrinAct', data);
    });

}



$("#BtnCerrarModalEquivalentes").click(() => {
    CloseModalEquivalentes();
})

$("#BtnBuscarEquivalentes").click(() => {
    SetFiltrosEquivalentes();
    ListaEquivalentesService(FiltrosEquivalentes, InitEquivalentes);
})




const Equivalentes = (id) => {
    console.log(id);
    $("#PrinActEquiv").val(id);
    SetFiltrosEquivalentes();
    ListaProdxPrincActService(FiltrosEquivalentes, InitEquivalentes);
}

const SetFiltrosEquivalentes = () => {

    FiltrosEquivalentes.PRIN_ACT = $("#PrinActEquiv").val();

}

const InitEquivalentes = (data) => {
    ListaEquivalentes = data;
    InitTableEquivalentes();
}

const InitTableEquivalentes = () => {
    $("#TableEquivalentes").empty();

    ListaEquivalentes.forEach((item) => {

        $("#TableEquivalentes").append(
            `
                    <tr>
                        <td>${item.CODIGO}</td>
                        <td>${item.DESCRIPCION}</td>
                        <td>${item.EXISTEN}</td>
                        <td>${item.COSTO}</td>
                        <td>${item.PRECIO}</td>
                    </tr>
            `
        )
    });

    if (ListaEquivalentes.length > 0) {
        OpenModalEquivalentes();
    } else {
        toastr.warning("No se encontraron equivalentes", 'Advertencia')
        CloseModalEquivalentes();
    }



}

const OpenModalEquivalentes = (id, dsc) => {
    $("#ModalEquivalentes").modal("show");
}

const CloseModalEquivalentes = () => {
    $("#ModalEquivalentes").modal("hide");
}
