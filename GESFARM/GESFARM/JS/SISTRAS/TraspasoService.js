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