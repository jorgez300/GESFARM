$("#BtnFiltrar").click(() => {
    Buscar();
})

$(document).ready(function () {
    GetListaProductos();
    GetAutoPrincipioActivoService();
    GetAutoPresentacionService();
    //ListaDetalleProductosService(Filtros, Init);
});

let Filtros = {
    CODIGO: null,
    ID_PA: null,
    ID_PR: null
}

let FiltrosEquivalentes = {
    CODIGO: null,
    EXISTEN: null
}

let FiltrosPrincAct = {
    PXP_CodProd: null
}
let AsignacionPA = {
    PXP_PaId: null,
    PXP_CodProd: null
}


let FiltrosPresentacion = {
    EEPP_PR_Id: null,
    EEPP_CodProd: null
}

let AsignacionPR = {
    EEPP_PR_Id: null,
    EEPP_CodProd: null
}



let Lista = [];
let ListaEquivalentes = [];
let ListaPrincAct = [];
let ListaPresentacion = [];


const GetListaProductos = () => {
    ListaProductosService((data) => {
        InitAutocomplete('CodProd', data);
    });
}

const GetAutoPrincipioActivoService = () => {
    AutoPrincipioActivoService((data) => {
        InitAutocomplete('PrinAct', data);
        InitAutocomplete('PrinActAsig', data);
        InitSelect('Existen', [{ ID: 'T', DSC: 'TODOS' }, { ID: 'S', DSC: 'SI' }, { ID: 'N', DSC: 'NO' }])
    });
}

const GetAutoPresentacionService = () => {
    AutoPresentacionService((data) => {
        InitAutocomplete('Pres', data);
        InitAutocomplete('Presentacion', data);
    });
}


const Buscar = () => {
    SetFiltros();
    ListaDetalleProductosService(Filtros, Init);

}

const SetFiltros = () => {

    Filtros.CODIGO = $('#CodProdValue').val() != '' ? $('#CodProdValue').val() : null;
    Filtros.ID_PA = $('#PrinActValue').val() != '' ? $('#PrinActValue').val() : null;
    Filtros.ID_PR = $('#PresValue').val() != '' ? $('#PresValue').val() : null;

}

const Init = (data) => {
    Lista = data;
    InitTable();
}

const InitTable = () => {
    $("#TableDetalleProductos").empty();

    Lista.forEach((item) => {

        $("#TableDetalleProductos").append(
            `
                    <tr>
                        <td>${item.CODIGO}</td>
                        <td>${item.DESCRIPCION}</td>
                        <td>${item.EXISTEN}</td>
                        <td>${item.ID_PA}</td>
                        <td>${item.PA_DESCRIP}</td>
                        <td>${item.ID_PR}</td>
                        <td>${item.PR_DESCRIP}</td>
                        <td><label onclick="Equivalentes('${item.CODIGO}')">Equivalentes</label></td>
                        <td><label onclick="PrincAct('${item.CODIGO}','${item.DESCRIPCION}' )">Principio Activo</label></td>
                        <td><label onclick="Presentaciones('${item.CODIGO}','${item.DESCRIPCION}')">Presentacion</label></td>
                    </tr>
            `
        )
    });


}











$("#BtnCerrarModalEquivalentes").click(() => {
    CloseModalEquivalentes();
})

$("#BtnBuscarEquivalentes").click(() => {
    SetFiltrosEquivalentes();
    ListaEquivalentesProductoService(FiltrosEquivalentes, InitEquivalentes);
})


const OpenModalEquivalentes = (id, dsc) => {
    $("#ModalEquivalentes").modal("show");
}

const CloseModalEquivalentes = () => {
    $("#ModalEquivalentes").modal("hide");
}


const Equivalentes = (id) => {
    $("#CodprodEquiv").val(id)
    SetFiltrosEquivalentes();
    ListaEquivalentesProductoService(FiltrosEquivalentes, InitEquivalentes);
}

const SetFiltrosEquivalentes = () => {

    FiltrosEquivalentes.CODIGO = $("#CodprodEquiv").val();
    FiltrosEquivalentes.EXISTEN = $("#Existen").val();

}


const InitEquivalentes = (data) => {
    ListaEquivalentes = data;
    InitTableEquivalentes();
}

const InitTableEquivalentes = () => {
    $("#TableEquivalentes").empty();

    ListaEquivalentes.forEach((item) => {

        $("#TableEquivalentes").append(
            `
                    <tr>
                        <td>${item.CODIGO}</td>
                        <td>${item.DESCRIPCION}</td>
                        <td>${item.EXISTEN}</td>
                        <td>${item.PA_DESCRIP}</td>
                        <td>${item.PR_DESCRIP}</td>
                    </tr>
            `
        )
    });

    if (ListaEquivalentes.length > 0) {
        OpenModalEquivalentes();
    } else {
        toastr.warning("No se encontraron equivalentes", 'Advertencia')
    }

}












let FlagValidaAsignacionPA = false;


$("#BtnAsignar").click(() => {
    AsignarPrincAct();
})

const AsignarPrincAct = () => {

    AsignacionPA.PXP_PaId = $('#PrinActAsigValue').val();

    if (AsignacionPA.PXP_PaId == '') {
        toastr.error('Seleccione un principio activo', 'Error');
        return;
    }

    ValidaAsignacionPA(AsignacionPA.PXP_PaId);

    if (FlagValidaAsignacionPA) {
        toastr.error('Principio activo ya asignado', 'Error');
        return;
    }

    AsignarPrincActService(AsignacionPA, () => {

        ListaPrincActXProd(FiltrosPrincAct, InitPrincAct);
        //Buscar();
    })

}

const ValidaAsignacionPA = (id) => {

    FlagValidaAsignacionPA = false;
    ListaPrincAct.forEach(function (item) {
        if (item.PA_Id == id) {
            FlagValidaAsignacionPA = true;
        }
    });

}

$("#BtnCerrarModal").click(() => {
    CloseModal();
})

const PrincAct = (id, dsc) => {

    OpenModal(id, dsc);
}

const OpenModal = (id, dsc) => {
    CleanModal();
    $('#LblProd').text(id + ' - ' + dsc);
    $("#ModalProdxPrincAct").modal("show");
    FiltrosPrincAct.PXP_CodProd = id;
    AsignacionPA.PXP_CodProd = id;
    ListaPrincActXProd(FiltrosPrincAct, InitPrincAct);

}

const CloseModal = () => {
    $("#ModalProdxPrincAct").modal("hide");
    CleanModal();
    Buscar();
}

const CleanModal = () => {
    $("#TableProdxPrincActDetalle").empty();
    $('#PrinActAsig').val('');
    $('#PrinActAsigValue').val('');

}

const InitPrincAct = (data) => {
    ListaPrincAct = data;

    $("#TableProdxPrincActDetalle").empty();

    ListaPrincAct.forEach((item) => {
        $("#TableProdxPrincActDetalle").append(
            `
                    <tr>
                        <td>${item.PA_Id}</td>
                        <td>${item.PA_Descrip}</td>
                        <td><label onclick="DesvincularPrincAct(${item.PA_Id})">Eliminar</label></td>
                    </tr>
            `
        )

    });
}

const DesvincularPrincAct = (ID_PA) => {

    AsignacionPA.PA_Id = ID_PA;

    DesvincularPrincActService(AsignacionPA, () => {

        ListaPrincActXProd(FiltrosPrincAct, InitPrincAct);
        //Buscar();
    })

}











let FlagValidaAsignacionPR = false;


$("#BtnAsignarPresentacion").click(() => {
    AsignarPresentacion();
})

const AsignarPresentacion = () => {

    AsignacionPR.EEPP_PR_Id = $('#PresentacionValue').val();

    if (AsignacionPR.EEPP_PR_Id == '') {
        toastr.error('Seleccione una presentacion', 'Error');
        return;
    }

    ValidaAsignacionPR(AsignacionPR.EEPP_PR_Id);

    if (FlagValidaAsignacionPR) {
        toastr.error('Presentacion ya asignada', 'Error');
        return;
    }

    AsignarPresentacionService(AsignacionPR, () => {
        ListaPresXProd(FiltrosPresentacion, InitPresentacion);
        //Buscar();
    })

}

const ValidaAsignacionPR = (id) => {

    FlagValidaAsignacionPR = false;

    if (ListaPresentacion.length > 0) {
        FlagValidaAsignacionPR = true;
    }

}

$("#BtnCerrarModalPresentacion").click(() => {
    CloseModalPresentacion();
})

const Presentaciones = (id, dsc) => {

    OpenModalPresentacion(id, dsc);
}


const OpenModalPresentacion = (id, dsc) => {
    CleanModalPresentacion();
    $('#LblProdPresentacion').text(id + ' - ' + dsc);
    $("#ModalPresentacion").modal("show");
    FiltrosPresentacion.EEPP_CodProd = id;
    AsignacionPR.EEPP_CodProd = id;
    ListaPresXProd(FiltrosPresentacion, InitPresentacion);

}

const CloseModalPresentacion = () => {
    $("#ModalPresentacion").modal("hide");
    CleanModalPresentacion();
    Buscar();
}

const CleanModalPresentacion = () => {
    $("#TablePresentacion").empty();
    $('#Presentacion').val('');
    $('#PresentacionValue').val('');

}


const InitPresentacion = (data) => {
    ListaPresentacion = data;

    $("#TablePresentacion").empty();

    ListaPresentacion.forEach((item) => {
        $("#TablePresentacion").append(
            `
                    <tr>
                        <td>${item.PR_Id}</td>
                        <td>${item.PR_Descrip}</td>
                        <td><label onclick="DesvinculaPresentacion('${item.PR_Id}')">Eliminar</label></td>
                    </tr>
            `
        )
    });
}

const DesvinculaPresentacion = (ID_PR) => {

    AsignacionPR.EEPP_PR_Id = ID_PR;

    DesvinculaPresentacionService(AsignacionPR, () => {

        ListaPresXProd(FiltrosPresentacion, InitPresentacion);
        //Buscar();
    })

}

