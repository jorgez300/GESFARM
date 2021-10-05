$(document).ready(function () {
    GetListaProductos();
});

let filtro = 
{
    F_CodProd: null
}

$("#BtnFiltrar").click(() => {
    SetFiltros(null);
    Buscar();
})

const Buscar = () => {

    if (filtro.F_CodProd == null) {
        toastr.warning('Seleccione un producto', 'Advertencia');
        return;
    }

    DetalleService(filtro, Init);

    ListaEquivalentesTotalesService(filtro, InitEquivalentes);

}

const SetFiltros =(val) => {
    
    if (val != null) {
        filtro.F_CodProd = val;
    }
    else {
        filtro.F_CodProd = ($('#CodProdValue').val() == '') ? null : $('#CodProdValue').val();
    }
    console.log(filtro.F_CodProd)
}




const Init = (Data) => {
    InitTable(Data);
    InitGrafica(Data);
};


const InitTable = (Data) => {

    $("#TableDetalle").empty();

    Data.Item.forEach((item) => {
        var HL = "";

        if (item.Existen < item.Minimo) {
            HL = "bg-warning"
        }
        if (item.Existen > item.Maximo) {
            HL = "bg-danger"
        }
        if (item.Existen >= item.Minimo && item.Existen <= item.Maximo) {
            HL = "bg-success"
        }
        $("#TableDetalle").append(
            `
                    <tr class="${HL}">
                        <td>${item.CodProd}</td>
                        <td>${item.Descrip}</td>
                        <td>${item.SeVenden}</td>
                        <td>${item.Existen}</td>
                        <td>${item.Minimo}</td>
                        <td>${item.Maximo}</td>
                        <td>${item.Sobran}</td>
                    </tr>
            `
        )
    });
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

const GetListaProductos = () =>{

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
                        <td>${item.EXISTEN}</td>
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