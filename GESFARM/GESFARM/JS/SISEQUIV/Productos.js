$(document).ready(function () {
    GetListaProductos();
    GetListaPrincipioActivoService();
    ListaProdxPrincActService(Filtros, Init);
});

let Filtros = {
    CODPROD: null,
    PRIN_ACT: null
}

let FiltrosDetalle = {
    CODPROD: null,
    PRIN_ACT: null
}

let FiltrosEquivalentes = {
    F_CodProd: null
}

let Asignacion = {
    CODPROD: null,
    PA_ID: null
}

let Lista = [];
let ListaDetalle = [];
let ListaEquivalentes = [];

const GetListaProductos = () => {

    ListaProductosService((data) => {
        InitAutocomplete('CodProd', data);
    });

}

const GetListaPrincipioActivoService = () => {

    ListaPrincipioActivoService((data) => {
        InitAutocomplete('PrinAct', data);
        InitAutocomplete('PrinActAsig', data);
        InitSelect('Existen', [{ ID: 'S', DSC: 'SI' }, { ID: 'N', DSC: 'NO' }, { ID: 'T', DSC: 'TODOS' }])
    });

}


$("#BtnFiltrar").click(() => {
    Buscar();
})

const Init = (data) => {
    Lista = data;
    InitTable();
}

const InitTable = () => {
    $("#TableProdxPrincAct").empty();

    Lista.forEach((item) => {

        $("#TableProdxPrincAct").append(
            `
                    <tr>
                        <td>${item.CODIGO}</td>
                        <td>${item.DESCRIPCION}</td>
                        <td>${item.EXISTEN}</td>
                        <td>${item.ID_PA}</td>
                        <td>${item.PA_DESCRIP}</td>
                        <td><label onclick="Detalle('${item.CODIGO}','${item.DESCRIPCION}' )">Detalle</label></td>
                        <td><label onclick="Equivalentes('${item.CODIGO}')">Equivalentes</label></td>
                    </tr>
            `
        )
    });


}

const Buscar = () => {
    SetFiltros();
    ListaProdxPrincActService(Filtros, Init);

}

const SetFiltros = () => {

    Filtros.CODPROD = $('#CodProdValue').val() != '' ? $('#CodProdValue').val() : null;
    Filtros.PRIN_ACT = $('#PrinActValue').val() != '' ? $('#PrinActValue').val() : null;

}



$("#BtnAsignar").click(() => {
    AgregarEquivalencia();
})

$("#BtnCerrarModal").click(() => {
    CloseModal();
})

const Detalle = (id, dsc) => {

    OpenModal(id, dsc);
}

const InitDetalle = (data) => {
    ListaDetalle = data;

    $("#TableProdxPrincActDetalle").empty();

    ListaDetalle.forEach((item) => {
        if (item.PA_DESCRIP != 'NO') {
            $("#TableProdxPrincActDetalle").append(
                `
                    <tr>
                        <td>${item.ID_PA}</td>
                        <td>${item.PA_DESCRIP}</td>
                        <td><label onclick="EliminarEquivalencia('${item.CODIGO}', ${item.ID_PA})">Eliminar</label></td>
                    </tr>
            `
            )
        }

    });
}

const OpenModal = (id, dsc) => {
    CleanModal();
    $('#LblProd').text(id + ' - ' + dsc);
    $("#ModalProdxPrincAct").modal("show");
    FiltrosDetalle.CODPROD = id;
    Asignacion.CODPROD = id;
    ListaProdxPrincActService(FiltrosDetalle, InitDetalle);

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

const EliminarEquivalencia = (CODIGO, ID_PA) => {

    Asignacion.PA_ID = ID_PA;

    EliminarEquivalenciaService(Asignacion, () => {

        ListaProdxPrincActService(FiltrosDetalle, InitDetalle);
        Buscar();
    })

}

let ValidaEquiv = false;

const AgregarEquivalencia = () => {

    Asignacion.PA_ID = $('#PrinActAsigValue').val();

    if (Asignacion.PA_ID == '') {
        toastr.error('Seleccione un principio activo', 'Error');
        return;
    }

    ValidaEquivalencia(Asignacion.PA_ID);

    if (ValidaEquiv) {
        toastr.error('Principio activo ya asignado', 'Error');
        return;
    }

    AgregarEquivalenciaService(Asignacion, () => {

        ListaProdxPrincActService(FiltrosDetalle, InitDetalle);
        Buscar();
    })

}

const ValidaEquivalencia = (id) => {

    ValidaEquiv = false;
    ListaDetalle.forEach(function (item) {
        if (item.ID_PA == id) {
            ValidaEquiv = true;
        }
    });



}




$("#BtnCerrarModalEquivalentes").click(() => {
    CloseModalEquivalentes();
})

$("#BtnBuscarEquivalentes").click(() => {
    SetFiltrosEquivalentes();
    ListaEquivalentesService(FiltrosEquivalentes, InitEquivalentes);
})




const Equivalentes = (id) => {
    $("#CodprodEquiv").val(id)
    SetFiltrosEquivalentes();
    ListaEquivalentesService(FiltrosEquivalentes, InitEquivalentes);
}

const SetFiltrosEquivalentes = () => {

    FiltrosEquivalentes.F_CodProd = $("#CodprodEquiv").val();

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
                    </tr>
            `
        )
    });

    if (ListaEquivalentes.length > 0) {
        OpenModalEquivalentes();
    } else {
        toastr.warning("No se encontraron equivalentes", 'Advertencia')
        CloseModalEquivalentes();
    }



}

const OpenModalEquivalentes = (id, dsc) => {
    $("#ModalEquivalentes").modal("show");
}

const CloseModalEquivalentes = () => {
    $("#ModalEquivalentes").modal("hide");
}








