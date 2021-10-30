$(document).ready(function () {
    GeneraJsonTraspasoService((data) => {
        console.log(data);
        OpenFile(data, 'hola.json');
    });
});



