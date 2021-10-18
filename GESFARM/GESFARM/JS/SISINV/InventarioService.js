﻿const DetalleService = (Filtros, Callback) => {
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

const ListaEquivalentesTotalesService = (Filtros, Callback) => {
    $.ajax({
        url: "/GESFARM/api/Prod_x_Pa/ListaEquivalentesTotales",
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
