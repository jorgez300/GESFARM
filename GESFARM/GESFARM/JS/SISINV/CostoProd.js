﻿$("#BtnFiltrar").click(() => {

    GetCostoProd();
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

$("#BtnCerrarHist").click(() => {

    CloseModalHist();
})

$("#BtnCalculo").click(() => {

    CalculoMasivo();
})

$("#BtnInstancias").click(() => {

    OpenModalInsUtil();

})

$("#BtnCerrarInsUtil").click(() => {

    CloseModalInsUtil();

})


let Tasa = null;
let PorcUtil = null;


$(document).ready(function () {

    SetValidation();
    GetListaProductos();
    GetListaInstancia();
    GetListaProveedores();
    GetParametros();
    GetPorcentajesInstancias();

});

const GetParametros = () => {

    GetCostoParaService((r) => {

        Tasa = parseFloat(r.Tasa.replace(",", "."));
        PorcUtil = parseFloat(r.PorcUtil.replace(",", "."));

        $("#IndTasa").text(FormatNumber(Tasa));
        $("#IndUtilidad").text(FormatNumber(PorcUtil));

    })

}


const GetListaProductos = () => {

    ListaProductosService((data) => {
        InitAutocomplete2('Producto', data, () => {

            prd = null;

        });
    });

}

const GetListaInstancia = () => {

    ListaInstanciaService((data) => {
        InitAutocomplete2('Instancia', data, () => {

            prd = null;

        });
    });

}

const GetListaProveedores = () => {

    ListaProveedoresService((data) => {
        InitAutocomplete2('TxtProv', data, () => {

            prd = null;

        });
    });

}


let prd = null;

const GetCostoProd = () => {

    let Filtros = {
        Codigo: "-1",
        Instancia: -1
    }

    if ($('#ProductoValue').val() != '') {
        Filtros.Codigo = $('#ProductoValue').val()
    }

    if ($('#InstanciaValue').val() != '') {
        Filtros.Instancia = $('#InstanciaValue').val()
    }


    GetCostoProdService(Filtros, (r) => {

        prd = r;
        InitTableDatos();

    })

}

let Seleccionado = null;

const InitTableDatos = () => {

    $("#TableCosto").empty();

    if (!prd) {
        return;
    }


    prd.Producto.forEach((item) => {


        if ($("#Estado").val() == "S") {

            if (item.CP_CostoUSD != "0") {

                $("#TableCosto").append(
                    `
                        <tr>
                            <td>${item.CP_Codprod}</td>
                            <td>${item.CP_Descrip}</td>
                            <td>${(item.CP_CostoUSD == "0") ? "No registrado" : FormatNumber(item.CP_CostoUSD)}</td >
                            <td class="text-success"><span id="Reg${item.CP_Codprod}" Codigo="${item.CP_Codprod}" Descripcion="${item.CP_Descrip}" class="Registrar">Registrar<span></td>
                            <td class="text-success"><span id="Hist${item.CP_Codprod}" Codigo="${item.CP_Codprod}" Descripcion="${item.CP_Descrip}" class="Historico ${(item.CP_CostoUSD == "0") ? "d-none" : ""}">Historico<span></td>
                        </tr>
                    `
                )

            }

        }

        if ($("#Estado").val() == "N") {

            if (item.CP_CostoUSD == "0") {

                $("#TableCosto").append(
                    `
                        <tr>
                            <td>${item.CP_Codprod}</td>
                            <td>${item.CP_Descrip}</td>
                            <td>${(item.CP_CostoUSD == "0") ? "No registrado" : FormatNumber(item.CP_CostoUSD)}</td >
                            <td class="text-success"><span id="Reg${item.CP_Codprod}" Codigo="${item.CP_Codprod}" Descripcion="${item.CP_Descrip}" class="Registrar">Registrar<span></td>
                            <td class="text-success"><span id="Hist${item.CP_Codprod}" Codigo="${item.CP_Codprod}" Descripcion="${item.CP_Descrip}" class="Historico ${(item.CP_CostoUSD == "0") ? "d-none" : ""}">Historico<span></td>
                        </tr>
                    `
                )

            }

        }

        if ($("#Estado").val() == "T") {


            $("#TableCosto").append(
                `
                    <tr>
                        <td>${item.CP_Codprod}</td>
                        <td>${item.CP_Descrip}</td>
                        <td>${(item.CP_CostoUSD == "0") ? "No registrado" : FormatNumber(item.CP_CostoUSD)}</td >
                        <td class="text-success"><span id="Reg${item.CP_Codprod}" Codigo="${item.CP_Codprod}" Descripcion="${item.CP_Descrip}" class="Registrar">Registrar<span></td>
                        <td class="text-success"><span id="Hist${item.CP_Codprod}" Codigo="${item.CP_Codprod}" Descripcion="${item.CP_Descrip}" class="Historico ${(item.CP_CostoUSD == "0") ? "d-none" : ""}">Historico<span></td>
                    </tr>
                `
            )

        }



    });


    $('.Registrar').click((a) => {

        Seleccionado = {
            CP_Codprod: a.currentTarget.getAttribute("Codigo"),
            CP_Descrip: a.currentTarget.getAttribute("Descripcion")
        }

        OpenModal();

    });

    $('.Historico').click((a) => {

        Seleccionado = {
            CP_Codprod: a.currentTarget.getAttribute("Codigo"),
            CP_Descrip: a.currentTarget.getAttribute("Descripcion")
        }

        OpenModalHist();

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

    if (CostoUSD == null || CostoUSD == 0) {
        toastr.warning("Calcule precios", "Mensaje")
        return;
    }

    if ($("#TxtProvValue").val() == '') {
        toastr.warning("Ingrese proveedor", "Mensaje")
        return;
    }


    let DataGuardar = {
        Item: {
            CP_Codprod: $("#TxtId").val(),
            CP_CostoUSD: CostoUSD.replace(",", "."),
            CP_Proveedor: $("#TxtProvValue").val()
        }
    }

    SetCostoProdService(DataGuardar, (r) => {

        GetCostoProd();
        CloseModal();

    })

}

const CalculoMasivo = () => {

    SetCalculoService(() => {

        toastr.success("Calculo realizado correctamente", "Mensaje");

    })

}



const CloseModalInsUtil = () => {

    $("#ModalInsUtil").modal("hide");

}

const OpenModalInsUtil = () => {
    GetPorcentajesInstancias();
    $("#ModalInsUtil").modal("show");
}

let PorcInstancias = [];

const GetPorcentajesInstancias = () => {

    GetInstancias((resp) => {

        PorcInstancias = resp.PorcInstancias;
        InitTableInsUtil();
    })

}

const InitTableInsUtil = () => {

    $("#TableInsUtil").empty();

    PorcInstancias.forEach((item) => {

        $("#TableInsUtil").append(
            `
                    <tr>
                        <td class="text-center">${item.CodInst}</td>
                        <td>${item.Descrip}</td>
                        <td><input type="text" class="form-control Number w-25" maxlenght="2" id="InputInsUtil${item.CodInst}" value="${item.Utilidad}"></td>
                        <td class="text-success"><span id="GuardarInsUtil${item.CodInst}" Codigo="${item.CodInst}" class="GuardarInsUtil">Guardar<span></td>
                    </tr>
            `
        )
    });

    SetValidation();

    $('.GuardarInsUtil').click((a) => {

        let Filtros = {
            Item: {
                CP_Id: a.currentTarget.getAttribute("Codigo")
            }

        }

        //EliminaHistService(Filtros, () => {

        //    SetModalHist();

        //})

    });


}


const CloseModal = () => {

    CleanModal();
    $("#ModalCosto").modal("hide");
    Seleccionado = null;

}

const OpenModal = () => {
    CleanModal();
    SetModal();
    $("#ModalCosto").modal("show");
}

const CleanModal = () => {

    CostoUSD = null;
    CostoBs = null;
    PrecioBs = null;
    PrecioUSD = null;


    $("#TxtId").val('');
    $("#TxtDesc").val('');
    $("#TxtProv").val('');
    $("#TxtProvValue").val('');
    $("#TxtCostoUSD").val('');
    $("#TxtCostoBs").val('');
    $("#TxtPrecioBs").val('');
    $("#TxtPrecioUSD").val('');

}

const SetModal = () => {


    $("#TxtId").val(Seleccionado.CP_Codprod);
    $("#TxtDesc").val(Seleccionado.CP_Descrip);


}






const CloseModalHist = () => {

    CleanModalHist();
    $("#ModalHist").modal("hide");
    Seleccionado = null;

}

const OpenModalHist = () => {
    CleanModalHist();
    SetModalHist();
    $("#ModalHist").modal("show");
}

const CleanModalHist = () => {

    $("#TableHistCosto").empty();

}

const SetModalHist = () => {

    Historico = [];

    let Filtros = {
        Codigo: Seleccionado.CP_Codprod
    }

    GetHistoricoService(Filtros, (r) => {

        Historico = r.Historico;
        InitTableHist();

    })

}

let Historico = [];

const InitTableHist = () => {

    $("#TableHistCosto").empty();

    Historico.forEach((item) => {

        $("#TableHistCosto").append(
            `
                    <tr>
                        <td>${item.CP_FechaAct}</td>
                        <td>${item.CP_Codprod}</td>
                        <td>${item.CP_Descrip}</td>
                        <td>${FormatNumber(item.CP_Tasa)}</td>
                        <td>${FormatNumber(item.CP_CostoUSD)}</td >
                        <td>${item.CP_ProveedorDsc}</td>
                        <td class="text-success"><span id="EliminarHist${item.CP_Id}" Codigo="${item.CP_Id}" class="EliminarHist">Eliminar<span></td>
                    </tr>
            `
        )
    });


    $('.EliminarHist').click((a) => {

        let Filtros = {
            Item: {
                CP_Id: a.currentTarget.getAttribute("Codigo")
            }

        }

        EliminaHistService(Filtros, () => {

            SetModalHist();

        })


    });


}