$(document).ready(function () {
    GetListaProductos();
});


$("#BtnFiltrar").click(() => {
    DetalleService(
        {
            "F_Anio": "2021",
            "F_Mes": "06",
            "F_CodProd": $("#CodProdValue").val()
        }
        ,
        Init);
})



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