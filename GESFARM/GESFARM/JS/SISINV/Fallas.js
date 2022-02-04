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


const InitTable = (Data) => {

    $("#TableFalla").empty();


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
                        <td>${item.Existen}</td>
                        <td>${item.Promedio}</td>                     
                        <td>${item.Minimo}</td>
                        <td>${item.Maximo}</td>
                    </tr>
            `
        )

    });


}