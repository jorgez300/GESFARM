﻿const ListaPrinActService = (Filtros, Callback) => {
    $.ajax({
        url: "/GESFARM/api/PrinAct/Lista",
        method: "POST",
        timeout: 0,
        headers: {
            "Content-Type": "application/json"
        },
        data: JSON.stringify(Filtros),
    }).done(function (response) {
        Callback(response);
    })

}

const AgregarPrinActService = (Item, Callback) => {
    $.ajax({
        url: "/GESFARM/api/PrinAct/Agregar",
        method: "POST",
        timeout: 0,
        headers: {
            "Content-Type": "application/json"
        },
        data: JSON.stringify(Item),
    }).done(function (response) {
        Callback(response);
    })

}

const EliminarPrinActService = (Item, Callback) => {
    $.ajax({
        url: "/GESFARM/api/PrinAct/Eliminar",
        method: "POST",
        timeout: 0,
        headers: {
            "Content-Type": "application/json"
        },
        data: JSON.stringify(Item),
    }).done(function (response) {
        Callback(response);
    })

}

const ActualizarPrinActService = (Item, Callback) => {
    $.ajax({
        url: "/GESFARM/api/PrinAct/Actualizar",
        method: "POST",
        timeout: 0,
        headers: {
            "Content-Type": "application/json"
        },
        data: JSON.stringify(Item),
    }).done(function (response) {
        Callback(response);
    })

}