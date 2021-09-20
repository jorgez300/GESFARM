﻿function InitSelect(id, data, txt) {

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