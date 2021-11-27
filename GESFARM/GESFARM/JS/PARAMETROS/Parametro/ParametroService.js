const ListaParametroService = (Filtros, Callback) => {
    $.ajax({
        url: "/GESFARM/api/Parametros/Lista",
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

const AgregarParametroService = (Item, Callback) => {
    $.ajax({
        url: "/GESFARM/api/Parametros/Agregar",
        method: "POST",
        timeout: 0,
        headers: {
            "Content-Type": "application/json"
        },
        data: JSON.stringify(Item),
    }).done(function (response) {
        Callback(response);
    }).fail(function (response) {
        HandleError(response.responseJSON);
    })

}

const EliminarParametroService = (Item, Callback) => {
    $.ajax({
        url: "/GESFARM/api/Parametros/Eliminar",
        method: "POST",
        timeout: 0,
        headers: {
            "Content-Type": "application/json"
        },
        data: JSON.stringify(Item),
    }).done(function (response) {
        Callback(response);
    }).fail(function (response) {
        HandleError(response.responseJSON);
    })

}

const ActualizarParametroService = (Item, Callback) => {
    $.ajax({
        url: "/GESFARM/api/Parametros/Actualizar",
        method: "POST",
        timeout: 0,
        headers: {
            "Content-Type": "application/json"
        },
        data: JSON.stringify(Item),
    }).done(function (response) {
        Callback(response);
    }).fail(function (response) {
        HandleError(response.responseJSON);
    })

}
