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
};


const InitTable = (Data) => {
    console.log(Data.Lista);


    $("#TableMinMax").empty();


    Data.Lista.forEach((item) => {

        var HL = "";

        if (item.Existen < item.Minimo)
        {
            HL = "bg-warning"
        }

        if (item.Existen > item.Maximo) {
            HL = "bg-danger"
        }

        if (item.Existen >= item.Minimo && item.Existen <= item.Maximo) {
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
