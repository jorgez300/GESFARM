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


const ListaPresentacionService = (Filtros, Callback) => {
    $.ajax({
        url: "/GESFARM/api/Presentacion/Lista",
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

const AgregarPresentacionService = (Item, Callback) => {
    $.ajax({
        url: "/GESFARM/api/Presentacion/Agregar",
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

const EliminarPresentacionService = (Item, Callback) => {
    $.ajax({
        url: "/GESFARM/api/Presentacion/Eliminar",
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

const ActualizarPresentacionService = (Item, Callback) => {
    $.ajax({
        url: "/GESFARM/api/Presentacion/Actualizar",
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





const ListaPrincActXProd = (Filtros, Callback) => {
    $.ajax({
        url: "/GESFARM/api/Equivalencia/ListaPrincActXProd",
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

const AsignarPrincActService = (Item, Callback) => {
    $.ajax({
        url: "/GESFARM/api/Equivalencia/Asignar",
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

const DesvincularPrincActService = (Item, Callback) => {
    $.ajax({
        url: "/GESFARM/api/Equivalencia/Desvincular",
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

const ListaPresXProd = (Filtros, Callback) => {
    $.ajax({
        url: "/GESFARM/api/EEPP/ListaPresXProd",
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

const AsignarPresentacionService = (Item, Callback) => {
    $.ajax({
        url: "/GESFARM/api/EEPP/Asignar",
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

const DesvinculaPresentacionService = (Item, Callback) => {
    $.ajax({
        url: "/GESFARM/api/EEPP/Desvincular",
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











const ListaDetalleProductosService = (Filtros, Callback) => {
    $.ajax({
        url: "/GESFARM/api/DetalleEquivalente/Lista",
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

const ListaEquivalentesProductoService = (Filtros, Callback) => {
    $.ajax({
        url: "/GESFARM/api/DetalleEquivalente/ListaEquivalentesProducto",
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






const ListaTotalesService = (Filtros, Callback) => {
    $.ajax({
        url: "/GESFARM/api/Totales/ListaTotales",
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

const ListaDetalleEquivalentesEEPPService = (Filtros, Callback) => {
    $.ajax({
        url: "/GESFARM/api/DetalleEquivalente/ListaDetalleEquivalentesEEPP",
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




//const ListaTotalesProdxPrincActService = (Filtros, Callback) => {
//    $.ajax({
//        url: "/GESFARM/api/Prod_x_Pa/ListaTotalesProdxPrincAct",
//        method: "POST",
//        timeout: 0,
//        headers: {
//            "Content-Type": "application/json"
//        },
//        data: JSON.stringify(Filtros),
//    }).done(function (response) {
//        Callback(response);
//    }).fail(function (response) {
//        HandleError(response.responseJSON);
//    })

//}



//const ListaProdxPresService = (Filtros, Callback) => {
//    $.ajax({
//        url: "/GESFARM/api/EEPP/ListaProdxPres",
//        method: "POST",
//        timeout: 0,
//        headers: {
//            "Content-Type": "application/json"
//        },
//        data: JSON.stringify(Filtros),
//    }).done(function (response) {
//        Callback(response);
//    }).fail(function (response) {
//        HandleError(response.responseJSON);
//    })

//}