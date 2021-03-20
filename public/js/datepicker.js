$.datepicker.regional['es'] = {
    closeText: 'Cerrar',
    prevText: '< Ant',
    nextText: 'Sig >',
    currentText: 'Hoy',
    monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
    monthNamesShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
    dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
    dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Juv', 'Vie', 'Sáb'],
    dayNamesMin: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá'],
    weekHeader: 'Sm',
    dateFormat: 'dd/mm/yy',
    firstDay: 1,
    isRTL: false,
    showMonthAfterYear: false,
    yearSuffix: ''
};
$.datepicker.setDefaults($.datepicker.regional['es']);


$(function () {
    $("#fechaRecogida").datepicker({ dateFormat: 'D,dd-mm-yy', minDate: '1d' });
    $(".datepicker").datepicker("setDate", new Date());
    $(".triggerRec").click(function () {
        $("#fechaRecogida").datepicker("show");
    });
});

$(function () {
    $("#fechaDevolucion").datepicker({ dateFormat: 'D,dd-mm-yy', minDate: '1d' });
    $(".datepicker").datepicker("setDate", new Date());
    $(".triggerDev").click(function () {
        $("#fechaDevolucion").datepicker("show");
    });
});


$('.clockpicker').clockpicker();
