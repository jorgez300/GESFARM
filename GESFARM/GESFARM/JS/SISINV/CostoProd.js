$("#BtnFiltrar").click(() => {

    GetCostoProd();
})


$("#BtnRegistrar").click(() => {

    if (!prd) {
        toastr.warning("Seleccione producto");
        return;
    }
    GetCostoProd();
    OpenModal();
})

$("#BtnCalcular").click(() => {

    Calcular();
})

$("#BtnGuardar").click(() => {

    Guardar();
})

$("#BtnCerrar").click(() => {

    CloseModal();
})

let Tasa = null;
let PorcUtil = null;


$(document).ready(function () {

    SetValidation();
    GetListaProductos();
    GetParametros();

});

const GetParametros = () => {

    GetCostoParaService((r) => {

        Tasa = parseFloat(r.Tasa.replace(",", "."));
        PorcUtil = parseFloat(r.PorcUtil.replace(",", "."));

    })

}


const GetListaProductos = () => {

    ListaProductosService((data) => {
        InitAutocomplete2('Producto', data, () => {

            prd = null;

        });
    });

}


let prd = null;

const GetCostoProd = () => {

    if (!$('#ProductoValue').val()) {
        toastr.warning("Seleccione producto");
        return;
    }

    let Filtros = {
        Codigo: $('#ProductoValue').val()
    }

    GetCostoProdService(Filtros, (r) => {

        prd = r;
        InitTableDatos();

    })

}

const InitTableDatos = () => {

    $("#TableCosto").empty();

    if (!prd) {
        return;
    }


    prd.Producto.forEach((item) => {

        $("#TableCosto").append(
            `
                    <tr>
                        <td>${item.CP_Codprod}</td>
                        <td>${item.CP_Descrip}</td>
                        <td>${(item.CP_CostoUSD == "0") ? "No registrado" : item.CP_CostoUSD}</td>
                    </tr>
            `
        )
    });


}


let CostoUSD = null;

let CostoBs = null;
let PrecioBs = null;
let PrecioUSD = null;

const Calcular = () => {

    CostoUSD = $("#TxtCostoUSD").val().replace(",", ".");

    if (isNaN(PrecioUSD)) {
        return;
    }

    CostoBs = CostoUSD * Tasa;

    PrecioUSD = (CostoUSD / (100 - PorcUtil)) * 100;

    PrecioBs = PrecioUSD * Tasa;

    console.log("CostoUSD", CostoUSD)
    console.log("CostoBs", CostoBs)
    console.log("PrecioUSD", PrecioUSD)
    console.log("PrecioBs", PrecioBs)

    $("#TxtCostoBs").val(FormatNumber(CostoBs));
    $("#TxtPrecioBs").val(FormatNumber(PrecioBs));
    $("#TxtPrecioUSD").val(FormatNumber(PrecioUSD));

}


const Guardar = () => {

    let DataGuardar = {
        Item: {
            CP_Codprod: $("#TxtId").val(),
            CP_CostoUSD: CostoUSD.replace(",", ".")
        }
    }

    SetCostoProdService(DataGuardar, (r) => {

        GetCostoProd();
        CloseModal();

    })

}


const OpenModal = () => {
    CleanModal();
    SetModal();
    $("#ModalCosto").modal("show");
}

const CloseModal = () => {

    CleanModal();
    $("#ModalCosto").modal("hide");

}

const CleanModal = () => {



    $("#TxtId").val('');
    $("#TxtDesc").val('');
    $("#TxtCostoUSD").val('');
    $("#TxtCostoBs").val('');
    $("#TxtPrecioBs").val('');
    $("#TxtPrecioUSD").val('');

}

const SetModal = () => {

    prd.Producto.forEach((item) => {

        $("#TxtId").val(item.CP_Codprod);
        $("#TxtDesc").val(item.CP_Descrip);

    });

}