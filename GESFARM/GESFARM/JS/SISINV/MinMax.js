$(document).ready(function () {
    //DetalleService(
    //    {
    //        "F_Anio": "2021",
    //        "F_Mes": "06",
    //        "F_CodProd": "075926011010093"
    //    }
    //    ,
    //    Init);
});


$("#BtnFiltrar").click(() => {

    MinMaxService(
        {
            "F_Anio": "2021",
            "F_Mes": "06",
            "F_Accion": $('#SelClas').find(":selected").val(),
            "F_CodProd": ""
        }
        ,
        Init);

})



const Init = (Data) => {
    InitTable(Data);
    InitIndicadores(Data);
};


const InitTable = (Data) => {
    console.log(Data.Lista);


    $("#TableMinMax").empty();


    Data.Lista.forEach((item) => {

        var HL = "";

        if (item.Existen < item.Minimo || item.Existen == 0)
        {
            HL = "bg-warning"
        }

        if (item.Existen > item.Maximo && item.Existen != 0) {
            HL = "bg-danger"
        }

        if (item.Existen >= item.Minimo && item.Existen <= item.Maximo && item.Existen != 0) {
            HL = "bg-success"
        }

        $("#TableMinMax").append(
            `
                    <tr class="${HL}">
                        <td>${item.CodProd}</td>
                        <td>${item.Descrip}</td>
                        <td>${item.SeVenden}</td>
                        <td>${item.Existen}</td>
                        <td>${item.Minimo}</td>
                        <td>${item.Maximo}</td>
                        <td>${item.Sobran}</td>
                    </tr>
            `
        )

    });


}

const InitIndicadores = (Data) => {

    $("#IndExistenciaCero").html(new Intl.NumberFormat('de-DE').format(Data.IndExistenciaCero));
    $("#IndExistencia").html(new Intl.NumberFormat('de-DE').format(Data.IndExistencia));
    $("#IndSobrante").html(new Intl.NumberFormat('de-DE').format(Data.IndSobrante));
    $("#IndFaltante").html(new Intl.NumberFormat('de-DE').format(Data.IndFaltante));
    $("#IndOK").html(new Intl.NumberFormat('de-DE').format(Data.IndOK));
    $("#IndTotal").html(new Intl.NumberFormat('de-DE').format(Data.IndTotal));

}
