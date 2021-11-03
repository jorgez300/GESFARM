function InitSelect(id, data, txt) {

    $('#' + id).replaceWith(`
      <select id="${id}" name="${id}" class="custom-select-sm form-control">
      </select>
    `);

    $('#' + id).attr("disabled", false);
    $('#' + id).empty();


    if (data.length == 0) {
        $('#' + id).append(`<option value="">Vacio</option>`);
        $('#' + id).attr("disabled", true);
    }
    if (txt != null) {

        $("#" + id).empty();
        $('#' + id).append(`<option value="">${txt}</option>`);
    }


    data.forEach(function (item) {
        $("#" + id).append('<option value="' + item.ID + '">' + item.DSC + '</option>');
    });

}

function InitSelect2(id, data, txt, funcion) {

    $('#' + id).replaceWith(`
      <select id="${id}" name="${id}" class="custom-select-sm form-control">
      </select>
    `);

    $('#' + id).attr("disabled", false);
    $('#' + id).empty();


    if (data.length == 0) {
        $('#' + id).append(`<option value="">Vacio</option>`);
        $('#' + id).attr("disabled", true);
    }
    if (txt != null) {

        $("#" + id).empty();
        $('#' + id).append(`<option value="">${txt}</option>`);
    }


    data.forEach(function (item) {
        $("#" + id).append('<option value="' + item.ID + '">' + item.DSC + '</option>');
    });


    $('#' + id).change(function () {
        funcion(this);
    });

    //$('#' + id).change(funcion(this));
}

function InitAutocomplete(id, data) {
    if (data.length == 0) {
        return;
    }

    $("#" + id).after("<input type='hidden' id='" + id + "Value'/>");

    $("#" + id).keydown(function () {
        $("#" + id + 'Value').val("");
        //if ($("#" + id).val.length == 0) {
        //    $("#" + id + 'Value').val("");
        //}

    })

    $("#" + id).bind("paste", function () {
        setTimeout(function () {
            $("#" + id).autocomplete("search", $("#" + id).val());
        }, 0);
    });

    var AutocompleteSource = [];
    data.forEach(function (item) {
        AutocompleteSource.push({ label: item.DSC, value: item.ID })
    });
    $("#" + id).autocomplete({
        source: function (request, response) {
            var results = $.ui.autocomplete.filter(AutocompleteSource, request.term);
            response(results.slice(0, 200));
        },
        select: function (e, ui) {
            $("#" + id).val(ui.item.label);
            $("#" + id + 'Value').val(ui.item.value);



            e.preventDefault();
            return false;
        }
        , focus: function (event, ui) {
            return false;
        }
    });


    $("#" + id).blur(function () {
        if ($("#" + id + 'Value').val().length == 0) {

            $("#" + id).val('');
        }
    });
}

function InitAutocomplete2(id, data, funcion) {
    if (data.length == 0) {
        return;
    }

    $("#" + id).after("<input type='hidden' id='" + id + "Value'/>");

    $("#" + id).keydown(function () {
        $("#" + id + 'Value').val("");
        console.log('limpio');
        //if ($("#" + id).val.length == 0) {
        //    $("#" + id + 'Value').val("");
        //}

    })

    $("#" + id).bind("paste", function () {
        setTimeout(function () {
            $("#" + id).autocomplete("search", $("#" + id).val());
        }, 0);
    });

    var AutocompleteSource = [];
    data.forEach(function (item) {
        AutocompleteSource.push({ label: item.DSC, value: item.ID })
    });
    $("#" + id).autocomplete({
        source: function (request, response) {
            var results = $.ui.autocomplete.filter(AutocompleteSource, request.term);
            response(results.slice(0, 200));
        },
        select: function (e, ui) {
            $("#" + id).val(ui.item.label);
            $("#" + id + 'Value').val(ui.item.value);

            console.log("#" + id + 'Value', ui.item.value);

            funcion(ui.item.value);

            e.preventDefault();
            return false;
        }
        , focus: function (event, ui) {
            return false;
        }
    });
}

const HandleError = (Error) => {
    toastr.error(Error.Mensaje, "Error");
    console.log(Error.Ex)
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
    }).fail(function (response) {
        HandleError(response.responseJSON);
    })

}

const AutoPresentacionService = (Callback) => {
    $.ajax({
        url: "/GESFARM/api/Presentacion/Auto",
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

const AutoPrincipioActivoService = (Callback) => {
    $.ajax({
        url: "/GESFARM/api/PrinAct/Auto",
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

const ListaInstanciaService = (Callback) => {
    $.ajax({
        url: "/GESFARM/api/Instancias/ListaInstancias",
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

$(document).ajaxStop(function () {
    $(".modal_load").hide();
});
$(document).ajaxStart(function () {
    $(".modal_load").show();
});


const FormatNumber = (data) => {

    return new Intl.NumberFormat('de-DE').format(data)
}

function OpenFile(base64URL, titulo) {
    if (base64URL.length > 100) {
        $("#AdjLink").remove();
        $("#sidebar").append(`<a class='d-none' id='AdjLink' download='${titulo}' href='${base64URL}'>aaaa</a>`);
        $('#AdjLink')[0].click();
    }
    else {
        toastr.error("Adjunto no accesible");
    }
}