$(document).ready(function () {
    GetListaProductos();
});

let filtro =
{
    F_CodProd: null
}

let FiltrosEquivalentes = {
    CODIGO: null,
    EXISTEN: null
}

$("#BtnFiltrar").click(() => {
    SetFiltros(null);
    Buscar();
})

$("#BtnReportarFalla").click(() => {
    ReportarFalla();
})


let Falla = {
    CodProd: null,
    Cantidad: 1
}

const ReportarFalla = () => {

    if (Producto == null) {
        toastr.error("Producto no seleccionado", "Error")
        return;
    }
    else {

        Falla.CodProd = Producto.CodProd;
        ReportarFallaService(Falla, () => {

            toastr.success("Falla registrada", "Realizado");

        });

    }



}

const Buscar = () => {

    if (filtro.F_CodProd == null) {
        toastr.warning('Seleccione un producto', 'Advertencia');
        return;
    }

    DetalleService(filtro, Init);

    EquivalentesTotalesService(FiltrosEquivalentes, InitEquivalentes);
}

const SetFiltros = (val) => {

    if (val != null) {
        filtro.F_CodProd = val;
        FiltrosEquivalentes.CODIGO = val;
        FiltrosEquivalentes.EXISTEN = 'T';
    }
    else {
        filtro.F_CodProd = ($('#CodProdValue').val() == '') ? null : $('#CodProdValue').val();
        FiltrosEquivalentes.CODIGO = ($('#CodProdValue').val() == '') ? null : $('#CodProdValue').val();
        FiltrosEquivalentes.EXISTEN = 'T';
    }

}



const Init = (Data) => {
    InitTable(Data);
    InitGrafica(Data);
};

let Producto = null;

const InitTable = (Data) => {

    $("#TableDetalle").empty();
    $("#TableInstancia").empty();

    var HL = "";

    Producto = Data.Item[0];

    if (Data.Item[0].Existen < Data.Item[0].Minimo || Data.Item[0].Existen == 0) {
        HL = "bg-warning"
    }

    if (Data.Item[0].Existen > Data.Item[0].Maximo && Data.Item[0].Existen != 0) {
        HL = "bg-danger"
    }

    if (Data.Item[0].Existen >= Data.Item[0].Minimo && Data.Item[0].Existen <= Data.Item[0].Maximo && Data.Item[0].Existen != 0) {
        HL = "bg-success"
    }

    if (Data.Item[0].Existen == 0) {
        $("#BtnReportarFalla").attr('disabled', false);
    }
    else {
        $("#BtnReportarFalla").attr('disabled', true);
    }

    $("#TableDetalle").append(
        `
                    <tr class="${HL}">
                        <td>${Data.Item[0].CodProd}</td>
                        <td>${Data.Item[0].Descrip}</td>
                        <td>${Data.Item[0].SeVenden}</td>
                        <td>${Data.Item[0].Existen}</td>
                        <td>${Data.Item[0].Minimo}</td>
                        <td>${Data.Item[0].Maximo}</td>
                        <td>${Data.Item[0].Sobran}</td>
                    </tr>
            `
    )

    $("#TableInstancia").append(
        `
                    <tr>
                        <td>${Data.Item[0].Instancia}</td>
                        <td>${Data.Item[0].PrincAct}</td>
                        <td>${Data.Item[0].Pres}</td>
                        <td>${Data.Item[0].Costo}</td>
                        <td>${Data.Item[0].Precio}</td>
                    </tr>
            `
    )

}

var ChPromedioMensual = new Chart();

const InitGrafica = (Data) => {
    console.log(Data.Item);
    console.log(Data.Ventas);

    ChPromedioMensual.destroy();

    var ctx = document.getElementById('ChPromedioMensual');
    ctx.height = 500;
    ChPromedioMensual = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: Data.Ventas.Periodo,
            datasets: [{
                label: 'Cantidad Vendido Mensual',
                data: Data.Ventas.Vendido,
                backgroundColor: [
                    'rgba(54, 162, 235, 0.2)'
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });


}

const GetListaProductos = () => {

    ListaProductosService((data) => {
        InitAutocomplete('CodProd', data);
    });

}

const InitEquivalentes = (Data) => {
    InitTableEquivalentes(Data.ListaEquivalentes);
    InitIndicadores(Data);
};


const InitTableEquivalentes = (Data) => {

    $("#TableEquivalentes").empty();

    Data.forEach((item) => {

        $("#TableEquivalentes").append(
            `
                    <tr>
                        <td><a onclick="BuscarRef('${item.CODIGO}','${item.DESCRIPCION}')">${item.CODIGO}</a></td>
                        <td>${item.DESCRIPCION}</td>
                        <td>${item.PA_DESCRIP}</td>
                        <td>${item.PR_DESCRIP}</td>
                        <td>${item.EXISTEN}</td>
                        <td>${FormatNumber(item.COSTO)}</td>
                        <td>${FormatNumber(item.PRECIO)}</td>
                    </tr>
            `
        )
    });
}

const InitIndicadores = (Data) => {

    $("#IndTotalItems").text(Data.TotalItem);
    $("#IndTotalExistencia").text(Data.TotalEXisten);

}

const BuscarRef = (CODIGO, DESCRIPCION) => {

    $("#CodProd").val(CODIGO + " - " + DESCRIPCION);
    $("#CodProdValue").val(CODIGO);

    SetFiltros(CODIGO);

    Buscar();

}