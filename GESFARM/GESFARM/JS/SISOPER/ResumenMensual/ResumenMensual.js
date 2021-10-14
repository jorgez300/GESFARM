$(document).ready(function () {
    ResumenMensualService(Init);
});


$("#BtnFiltrar").click(() => {

})


const Init = (Data) => {
    InitGrafCostoVenta(Data);
    InitGrafFacturas(Data);
    InitGrafCostoUtilidad(Data);
    InitGrafPorcenUtilidad(Data);
    InitGrafCantidad(Data);
    InitGrafMtoXVenta(Data);
    InitIndicadores(Data);
};

var ctxCostoVenta = null;
var ChartCostoVenta = new Chart();

const InitGrafCostoVenta = (Data) => {

    console.log(Data);

    ChartCostoVenta.destroy();

    ctxCostoVenta = document.getElementById('ChartCostoVenta');
    ChartCostoVenta = new Chart(ctxCostoVenta, {
        type: 'bar',
        data: {
            labels: Data.Meses.Periodo,
            datasets: [{
                label: 'Costo',
                data: Data.Meses.Costo,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)'
                ],
                borderWidth: 1
            }, {
                label: 'Venta',
                data: Data.Meses.Venta,
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


var ctxFacturas = null;
var ChartFacturas = new Chart();

const InitGrafFacturas = (Data) => {

    console.log(Data);

    ChartFacturas.destroy();

    ctxFacturas = document.getElementById('ChartFacturas');
    ChartFacturas = new Chart(ctxFacturas, {
        type: 'bar',
        data: {
            labels: Data.Meses.Periodo,
            datasets: [{
                label: 'Facturas',
                data: Data.Meses.Facturas,
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


var ctxCostoUtilidad = null;
var ChartCostoUtilidad = new Chart();

const InitGrafCostoUtilidad = (Data) => {

    console.log(Data);

    ChartCostoUtilidad.destroy();

    ctxCostoUtilidad = document.getElementById('ChartCostoUtilidad');
    ChartCostoUtilidad = new Chart(ctxCostoUtilidad, {
        type: 'bar',
        data: {
            labels: Data.Meses.Periodo,
            datasets: [{
                label: 'Costo',
                data: Data.Meses.Costo,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)'
                ],
                borderWidth: 1
            }, {
                label: 'Utilidad',
                data: Data.Meses.Utilidad,
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

var ctxPorcenUtilidad = null;
var ChartPorcenUtilidad = new Chart();

const InitGrafPorcenUtilidad = (Data) => {

    console.log(Data);

    ChartPorcenUtilidad.destroy();

    ctxPorcenUtilidad = document.getElementById('ChartPorcenUtilidad');
    ChartPorcenUtilidad = new Chart(ctxPorcenUtilidad, {
        type: 'bar',
        data: {
            labels: Data.Meses.Periodo,
            datasets: [{
                label: '% Utilidad',
                data: Data.Meses.PorCentajeUtilidad,
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

var ChartCantidad = new Chart();
var ctxCantidad = null;

const InitGrafCantidad = (Data) => {

    console.log(Data);

    ChartCantidad.destroy();

    ctxCantidad = document.getElementById('ChartCantidad');
    ChartCantidad = new Chart(ctxCantidad, {
        type: 'bar',
        data: {
            labels: Data.Meses.Periodo,
            datasets: [{
                label: 'Articulo por venta',
                data: Data.Meses.Cantidad,
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

var ChartMtoXVenta = new Chart();
var ctxMtoXVenta = null;


const InitGrafMtoXVenta = (Data) => {

    console.log(Data);

    ChartMtoXVenta.destroy();

    ctxMtoXVenta = document.getElementById('ChartMtoXVenta');
    ChartMtoXVenta = new Chart(ctxMtoXVenta, {
        type: 'bar',
        data: {
            labels: Data.Meses.Periodo,
            datasets: [{
                label: 'Monto por venta',
                data: Data.Meses.MtoXVenta,
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

const InitIndicadores = (Data) => {


    $("#IndTotalVentas").html(FormatNumber(Data.MesActual.Venta));
    $("#IndTotalCosto").html(FormatNumber(Data.MesActual.Costo));
    $("#IndTotalUtilidad").html(FormatNumber(Data.MesActual.Utilidad));
    $("#IndPorcenUtilidad").html(FormatNumber(Data.MesActual.PorCentajeUtilidad) + " %");
    $("#IndTotalFacturasEmitidas").html(FormatNumber(Data.MesActual.Facturas));
    $("#IndTotalCantidad").html(FormatNumber(Data.MesActual.Cantidad));
    $("#IndTotalMtoXVenta").html(FormatNumber(Data.MesActual.MtoXVenta));

}
