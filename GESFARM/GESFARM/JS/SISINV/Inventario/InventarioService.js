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
    })

}

const ListaProductosService = (Callback) => {
    $.ajax({
        url: "/GESFARM/api/Inventario/ListaProductos",
        method: "POST",
        timeout: 0,
        headers: {
            "Content-Type": "application/json"
        }
    }).done(function (response) {
        Callback(response);
    })

}