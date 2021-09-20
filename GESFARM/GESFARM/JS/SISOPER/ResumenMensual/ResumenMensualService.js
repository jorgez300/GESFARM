const ResumenMensualService = (Callback) => {
    $.ajax({
        url: "/GESFARM/api/ResumenMensual/Data",
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