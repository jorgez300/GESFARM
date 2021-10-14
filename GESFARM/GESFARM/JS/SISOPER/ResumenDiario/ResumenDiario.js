$(document).ready(function () {
    ResumenDiarioService(Init);
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
            labels: Data.Diario.Periodo,
            datasets: [{
                label: 'Costo',
                data: Data.Diario.Costo,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)'
                ],
                borderWidth: 1
            }, {
                label: 'Venta',
                data: Data.Diario.Venta,
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
            labels: Data.Diario.Periodo,
            datasets: [{
                label: 'Facturas',
                data: Data.Diario.Facturas,
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
            labels: Data.Diario.Periodo,
            datasets: [{
                label: 'Costo',
                data: Data.Diario.Costo,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)'
                ],
                borderWidth: 1
            }, {
                label: 'Utilidad',
                data: Data.Diario.Utilidad,
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
            labels: Data.Diario.Periodo,
            datasets: [{
                label: '% Utilidad',
                data: Data.Diario.PorCentajeUtilidad,
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
            labels: Data.Diario.Periodo,
            datasets: [{
                label: 'Articulo por venta',
                data: Data.Diario.Cantidad,
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
            labels: Data.Diario.Periodo,
            datasets: [{
                label: 'Monto por venta',
                data: Data.Diario.MtoXVenta,
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

    $("#IndTotalVentas").html(FormatNumber(Data.DiaActual.Venta));
    $("#IndTotalCosto").html(FormatNumber(Data.DiaActual.Costo));
    $("#IndTotalUtilidad").html(FormatNumber(Data.DiaActual.Utilidad));
    $("#IndPorcenUtilidad").html(FormatNumber(Data.DiaActual.PorCentajeUtilidad) + " %");
    $("#IndTotalFacturasEmitidas").html(FormatNumber(Data.DiaActual.Facturas));
    $("#IndTotalCantidad").html(FormatNumber(Data.DiaActual.Cantidad));
    $("#IndTotalMtoXVenta").html(FormatNumber(Data.DiaActual.MtoXVenta));

}