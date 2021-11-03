$(document).ready(function () {
    GetAutoPrincipioActivoService();
    ListaTotalesService(Filtros, Init);
});

let Filtros = {
    EXISTEN: null,
    PRIN_ACT: null
}

let FiltrosEquivalentes = {
    ID_PR: null,
    ID_PA: null
}

let Lista = [];
let ListaEquivalentes = [];

const Init = (data) => {
    Lista = data;
    InitTable();
}

$("#BtnFiltrar").click(() => {
    SetFiltros();
    ListaTotalesService(Filtros, Init);
})

const InitTable = () => {
    $("#TableTotalesProdxPrincAct").empty();

    Lista.forEach((item) => {

        $("#TableTotalesProdxPrincAct").append(
            `
                    <tr>
                        <td>${item.ID_PA}</td>
                        <td>${item.PA_DESCRIP}</td>
                        <td>${item.PR_DESCRIP}</td>
                        <td>${item.TOTAL_EEPP}</td>
                        <td>${item.TOTAL}</td>
                        <td><label onclick="Equivalentes('${item.ID_PA}', '${item.ID_PR}')">Equivalentes</label></td>
                    </tr>
            `
        )
    });


}


const SetFiltros = () => {

    Filtros.EXISTEN = $('#SelClas').find(":selected").val();
    Filtros.PRIN_ACT = $('#PrinActValue').val();

}

const GetAutoPrincipioActivoService = () => {

    AutoPrincipioActivoService((data) => {
        InitAutocomplete('PrinAct', data);
    });

}



$("#BtnCerrarModalEquivalentes").click(() => {
    CloseModalEquivalentes();
})




const Equivalentes = (ID_PA, ID_PR) => {

    $("#PrinActEquiv").val(ID_PA);
    $("#PresEquiv").val(ID_PR);
    SetFiltrosEquivalentes();
    ListaDetalleEquivalentesEEPPService(FiltrosEquivalentes, InitEquivalentes);
}

const SetFiltrosEquivalentes = () => {

    FiltrosEquivalentes.ID_PA = $("#PrinActEquiv").val();
    FiltrosEquivalentes.ID_PR = $("#PresEquiv").val();

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
                        <td>${item.PA_DESCRIP}</td>
                        <td>${item.PR_DESCRIP}</td>
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
