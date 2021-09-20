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
                    'rgba(255, 99, 132, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)'
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
                    'rgba(255, 99, 132, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)'
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


    $("#IndTotalVentas").html(new Intl.NumberFormat('de-DE').format(Data.DiaActual.Venta));
    $("#IndTotalCosto").html(new Intl.NumberFormat('de-DE').format(Data.DiaActual.Costo));
    $("#IndTotalUtilidad").html(new Intl.NumberFormat('de-DE').format(Data.DiaActual.Utilidad));
    $("#IndPorcenUtilidad").html(new Intl.NumberFormat('de-DE').format(Data.DiaActual.PorCentajeUtilidad) + " %");
    $("#IndTotalFacturasEmitidas").html(new Intl.NumberFormat('de-DE').format(Data.DiaActual.Facturas));

}