$(document).ready(function () {
    GetListaPrincipioActivoService();
    ListaTotalesProdxPrincActService(Filtros, Init);
});

let Filtros = {
    EXISTEN: null,
    PRIN_ACT: null
}

let Lista = [];

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
                        <td><label onclick="Detalle('${item.ID_PA}')">Detalle</label></td>
                    </tr>
            `
        )
    });


}

const Detalle = (id) => {

    console.log(id);
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