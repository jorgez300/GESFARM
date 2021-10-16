$(document).ready(function () {
    GetListaInstancia();
});

let filtro =
{
    F_CodInst: null
}

$("#BtnFiltrar").click(() => {
    SetFiltros();
    Buscar();
})


const SetFiltros = () => {

    filtro.F_CodInst = ($('#CodInstancia').val() == '') ? null : $('#CodInstancia').val();

}

const Buscar = () => {

    if (filtro.F_CodInst == null) {
        toastr.warning('Seleccione una instancia', 'Advertencia');
        return;
    }

    InstanciasDetalleService(filtro, Init);


}

const Init = (Data) => {
    InitTable(Data);
    InitTotales(Data);
};


const InitTable = (Data) => {

    $("#TableInstancia").empty();

    Data.Productos.forEach((item) => {

        $("#TableInstancia").append(
            `
                    <tr>
                        <td>${item.CodProd}</td>
                        <td>${item.Descrip}</td>
                        <td>${item.PrincAct}</td>
                        <td>${item.SeVenden}</td>
                        <td>${item.Existen}</td>
                        <td>${item.Minimo}</td>
                        <td>${item.Maximo}</td>
                        <td>${item.Sobran}</td>
                        <td>${item.Costo}</td>
                        <td>${item.Precio}</td>
                    </tr>
            `
        )

    });
}



const InitTotales = (Data) => {
    $("#IndItemTotales").text(Data.TotalItems);
    $("#IndExistencia").text(Data.TotalExisten);
}


const GetListaInstancia = () => {

    ListaInstanciaService((data) => {
        InitSelect('CodInstancia', data);
        $("#CodInstancia").removeClass("custom-select-sm");
        $("#CodInstancia").addClass("custom-select");
    });

}