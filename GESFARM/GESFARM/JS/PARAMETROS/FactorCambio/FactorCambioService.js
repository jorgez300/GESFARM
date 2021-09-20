const ListaFactorCambioService = (Callback) => {
    $.ajax({
        url: "/GESFARM/api/FactorCambio/Lista",
        method: "POST",
        timeout: 0,
        headers: {
            "Content-Type": "application/json"
        }/*,
        data: JSON.stringify(Filtros),*/
    }).done(function (response) {
        Callback(response);
    })

}

const AgregarFactorCambioService = (Item, Callback) => {
    $.ajax({
        url: "/GESFARM/api/FactorCambio/Agregar",
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

const EliminarFactorCambioService = (Item, Callback) => {
    $.ajax({
        url: "/GESFARM/api/FactorCambio/Eliminar",
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

const ActualizarFactorCambioService = (Item, Callback) => {
    $.ajax({
        url: "/GESFARM/api/FactorCambio/Actualizar",
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