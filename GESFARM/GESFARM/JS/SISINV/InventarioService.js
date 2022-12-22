const DetalleService = (Filtros, Callback) => {
    $.ajax({
        url: "/GESFARM/api/Inventario/Detalle",
        method: "POST",
        timeout: 0,
        headers: {
            "Content-Type": "application/json"
        },
        data: JSON.stringify(Filtros),
    }).done(function (response) {
        Callback(response);
    }).fail(function (response) {
        HandleError(response.responseJSON);
    })

}

const ReportarFallaService = (Data, Callback) => {
    $.ajax({
        url: "/GESFARM/api/Inventario/ReportarFalla",
        method: "POST",
        timeout: 0,
        headers: {
            "Content-Type": "application/json"
        },
        data: JSON.stringify(Data),
    }).done(function (response) {
        Callback(response);
    }).fail(function (response) {
        HandleError(response.responseJSON);
    })

}

const ListaFallasService = (Filtros, Callback) => {
    $.ajax({
        url: "/GESFARM/api/Inventario/ListaFallas",
        method: "POST",
        timeout: 0,
        headers: {
            "Content-Type": "application/json"
        },
        data: JSON.stringify(Filtros),
    }).done(function (response) {
        Callback(response);
    }).fail(function (response) {
        HandleError(response.responseJSON);
    })

}

const MinMaxService = (Filtros, Callback) => {
    $.ajax({
        url: "/GESFARM/api/Inventario/MinMax",
        method: "POST",
        timeout: 0,
        headers: {
            "Content-Type": "application/json"
        },
        data: JSON.stringify(Filtros),
    }).done(function (response) {
        Callback(response);
    }).fail(function (response) {
        HandleError(response.responseJSON);
    })

}

const EquivalentesTotalesService = (Filtros, Callback) => {
    $.ajax({
        url: "/GESFARM/api/DetalleEquivalente/EquivalentesTotales",
        method: "POST",
        timeout: 0,
        headers: {
            "Content-Type": "application/json"
        },
        data: JSON.stringify(Filtros),
    }).done(function (response) {
        Callback(response);
    }).fail(function (response) {
        HandleError(response.responseJSON);
    })

}


const InstanciasDetalleService = (Filtros, Callback) => {
    $.ajax({
        url: "/GESFARM/api/Instancias/Detalle",
        method: "POST",
        timeout: 0,
        headers: {
            "Content-Type": "application/json"
        },
        data: JSON.stringify(Filtros),
    }).done(function (response) {
        Callback(response);
    }).fail(function (response) {
        HandleError(response.responseJSON);
    })

}

const GetCostoParaService = (Callback) => {
    $.ajax({
        url: "/GESFARM/api/CostoProd/Parametros",
        method: "POST",
        timeout: 0,
        headers: {
            "Content-Type": "application/json"
        }
    }).done(function (response) {
        Callback(response);
    }).fail(function (response) {
        HandleError(response.responseJSON);
    })

}

const GetCostoProdService = (Filtros, Callback) => {
    $.ajax({
        url: "/GESFARM/api/CostoProd/GetCostoProd",
        method: "POST",
        timeout: 0,
        headers: {
            "Content-Type": "application/json"
        },
        data: JSON.stringify(Filtros),
    }).done(function (response) {
        Callback(response);
    }).fail(function (response) {
        HandleError(response.responseJSON);
    })

}

const GetHistoricoService = (Filtros, Callback) => {
    $.ajax({
        url: "/GESFARM/api/CostoProd/GetHistorico",
        method: "POST",
        timeout: 0,
        headers: {
            "Content-Type": "application/json"
        },
        data: JSON.stringify(Filtros),
    }).done(function (response) {
        Callback(response);
    }).fail(function (response) {
        HandleError(response.responseJSON);
    })

}

const SetCostoProdService = (Filtros, Callback) => {
    $.ajax({
        url: "/GESFARM/api/CostoProd/Guardar",
        method: "POST",
        timeout: 0,
        headers: {
            "Content-Type": "application/json"
        },
        data: JSON.stringify(Filtros),
    }).done(function (response) {
        Callback(response);
    }).fail(function (response) {
        HandleError(response.responseJSON);
    })

}

const EliminaHistService = (Filtros, Callback) => {
    $.ajax({
        url: "/GESFARM/api/CostoProd/EliminaHist",
        method: "POST",
        timeout: 0,
        headers: {
            "Content-Type": "application/json"
        },
        data: JSON.stringify(Filtros),
    }).done(function (response) {
        Callback(response);
    }).fail(function (response) {
        HandleError(response.responseJSON);
    })

}

const SetCalculoService = (Callback) => {
    $.ajax({
        url: "/GESFARM/api/CostoProd/Calculo",
        method: "POST",
        timeout: 0,
        headers: {
            "Content-Type": "application/json"
        }
    }).done(function (response) {
        Callback(response);
    }).fail(function (response) {
        HandleError(response.responseJSON);
    })

}

const GetInstancias = (Callback) => {
    $.ajax({
        url: "/GESFARM/api/CostoProd/GetInstancias",
        method: "POST",
        timeout: 0,
        headers: {
            "Content-Type": "application/json"
        }
    }).done(function (response) {
        Callback(response);
    }).fail(function (response) {
        HandleError(response.responseJSON);
    })

}

const GuardarUtilInsService = (Filtros, Callback) => {
    $.ajax({
        url: "/GESFARM/api/CostoProd/GuardarUtilIns",
        method: "POST",
        timeout: 0,
        headers: {
            "Content-Type": "application/json"
        },
        data: JSON.stringify(Filtros),
    }).done(function (response) {
        Callback(response);
    }).fail(function (response) {
        HandleError(response.responseJSON);
    })

}


const GetDatosReporteService = (Callback) => {
    $.ajax({
        url: "/GESFARM/api/CostoProd/GetDatosReporte",
        method: "POST",
        timeout: 0,
        headers: {
            "Content-Type": "application/json"
        }
    }).done(function (response) {
        Callback(response);
    }).fail(function (response) {
        HandleError(response.responseJSON);
    })

}