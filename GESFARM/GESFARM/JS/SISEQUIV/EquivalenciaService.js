const ListaPrinActService = (Filtros, Callback) => {
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
    }).fail(function (response) {
        HandleError(response.responseJSON);
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
    }).fail(function (response) {
        HandleError(response.responseJSON);
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
    }).fail(function (response) {
        HandleError(response.responseJSON);
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
    }).fail(function (response) {
        HandleError(response.responseJSON);
    })

}

const ListaProdxPrincActService = (Filtros, Callback) => {
    $.ajax({
        url: "/GESFARM/api/Prod_x_Pa/ListaProdxPrincAct",
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

const ListaEquivalentesService = (Filtros, Callback) => {
    $.ajax({
        url: "/GESFARM/api/Prod_x_Pa/ListaEquivalentes",
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

const ListaTotalesProdxPrincActService = (Filtros, Callback) => {
    $.ajax({
        url: "/GESFARM/api/Prod_x_Pa/ListaTotalesProdxPrincAct",
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

const AgregarEquivalenciaService = (Item, Callback) => {
    $.ajax({
        url: "/GESFARM/api/Equivalencia/Agregar",
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

const EliminarEquivalenciaService = (Item, Callback) => {
    $.ajax({
        url: "/GESFARM/api/Equivalencia/Eliminar",
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