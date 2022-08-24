$(document).ready(function () {
    $("#FilFecha").val(formatDate(null, '-'))
    $("#FilFecha").attr("max", formatDate(null, '-'))
});


let Falla = {
    Fecha: null
}


$("#BtnFiltrar").click(() => {
    Listar();
})

const Listar = () => {

    Falla.Fecha = $("#FilFecha").val();

    ListaFallasService(Falla, InitTable);

}

let CostoTotal = 0;

const InitTable = (Data) => {

    $("#TableFalla").empty();

    CostoTotal = 0;
    Data.forEach((item) => {

        let HL = '';

        if (item.Existen > 0) {
            HL = "bg-success"
        }

        $("#TableFalla").append(
            `
                    <tr class="${HL}">
                        <td>${item.CodProd}</td>
                        <td>${item.Descrip}</td>
                        <td>${item.Cantidad}</td>
                        <td>${FormatNumber(item.Costo)}</td>
                        <td>${item.Existen}</td>
                        <td>${item.Promedio}</td>                     
                        <td>${item.Minimo}</td>
                        <td>${item.Maximo}</td>
                    </tr>
            `
        )

        CostoTotal = CostoTotal + item.Costo;


    });

    $("#IndCosto").html(FormatNumber(CostoTotal))


}