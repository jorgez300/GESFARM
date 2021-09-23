const ResumenDiarioService = (Callback) => {
    $.ajax({
        url: "/GESFARM/api/ResumenDiario/Data",
        method: "POST",
        timeout: 0,
        headers: {
            "Content-Type": "application/json"
        }/*,
        data: JSON.stringify(Filtros),*/
    }).done(function (response) {
        Callback(response);
    }).fail(function (response) {
        HandleError(response.responseJSON);
    })

}