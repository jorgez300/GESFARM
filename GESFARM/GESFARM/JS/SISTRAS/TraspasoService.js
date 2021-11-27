const GeneraJsonTraspasoService = (Callback) => {
    $.ajax({
        url: "/GESFARM/api/Traspaso/GeneraJsonTraspaso",
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

const EscribeJsonTraspasoService = (Item, Callback, ErrorCallback) => {
    $.ajax({
        url: "/GESFARM/api/Traspaso/EscribeJsonTraspaso",
        method: "POST",
        timeout: 0,
        headers: {
            "Content-Type": "application/json"
        },
        data: JSON.stringify(Item)
    }).done(function (response) {
        Callback(response);
    }).fail(function (response) {
        ErrorCallback(response.responseJSON);
        HandleError(response.responseJSON);
    })

}

const ComparacionTraspasoService = (Callback) => {
    $.ajax({
        url: "/GESFARM/api/Traspaso/ComparacionTraspaso",
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