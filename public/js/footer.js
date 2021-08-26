// FORZAR ROTACION
// if (window.DeviceOrientationEvent) {
//     window.addEventListener('deviceorientation', function () {


//     }, false);
//     document.getElementById("doeSupported").innerText = "Supported!";
// }



// var supportsOrientationChange = "onorientationchange" in window,
//     orientationEvent = supportsOrientationChange ? "orientationchange" : "resize";

// window.addEventListener(orientationEvent, function (evento) {
//     if (window.orientation == 90) {
//         rotate(this, -90);
//     }
//     else {
//         rotate(this, 90);
//     }
// });

// screen.orientation.lock('portrait');

// function rotate(el, degs) {
//     iedegs = degs / 90;
//     if (iedegs < 0) iedegs += 4;
//     transform = 'rotate(' + degs + 'deg)';
//     iefilter = 'progid:DXImageTransform.Microsoft.BasicImage(rotation=' + iedegs + ')';
//     styles = {
//         transform: transform,
//         '-webkit-transform': transform,
//         '-moz-transform': transform,
//         '-o-transform': transform,
//         filter: iefilter,
//         '-ms-filter': iefilter
//     };
//     $(el).css(styles);
// }


// --------

const botonesInformacionInteres = document.getElementsByClassName("interes-link-footer");
const overlayInteres = document.getElementsByClassName("overlay-footer-interes-link");

const botonesCerrarModal = document.getElementsByClassName("modal-heigh-75");
const overlayFooter = document.getElementsByClassName("overlay-transparente-footer");

for (let i = 0; i < botonesInformacionInteres.length; i++) {
    botonesInformacionInteres[i].addEventListener("click", (evento) => {

        let divOverlay = document.getElementById(`overlay-footer-interes-link-${botonesInformacionInteres[i].id}`);

        if (divOverlay.classList.contains("modal-invisible") === true) {

            document.body.style.overflow = "hidden";
            document.querySelector("html").scrollTop = window.scrollY;

            divOverlay.classList.remove("modal-invisible");
            divOverlay.classList.add("modal-visible");

        }



    });

    botonesCerrarModal[i].addEventListener("click", async (evento) => {


        let divOverlay = document.getElementById(`overlay-footer-interes-link-${botonesCerrarModal[i].id}`);

        if (divOverlay.classList[1] === "modal-visible") {
            divOverlay.classList.remove("modal-visible");
            divOverlay.classList.add("modal-invisible");
            document.body.style.overflow = null;

        }

    });

    overlayFooter[i].addEventListener("click", async (evento) => 
    {

        // const divOverlay = document.getElementById(`${overlayFooter[i].id}`);
        const divOverlay = overlayFooter[i];

        if (divOverlay.classList.contains("modal-visible") === true) {
            divOverlay.classList.remove("modal-visible");
            divOverlay.classList.add("modal-invisible");
            document.body.style.overflow = null;

        }
        else
        {
            divOverlay.classList.remove("modal-invisible");
            divOverlay.classList.add("modal-invisible");
            document.body.style.overflow = null;
        }

    });

}


const inputAnyosCar = document.getElementById('anyos_carnet');
const inputEdadCondu = document.getElementById('edad_conductor');

if (inputAnyosCar)
{
    inputAnyosCar.addEventListener('invalid', function (evento) {
        CheckCarnetEdad(inputEdadCondu.value - 0, inputAnyosCar.value - 0, evento);
    })
    
    inputAnyosCar.addEventListener('change', function (evento) {
        evento.target.setCustomValidity('');
        CheckCarnetEdad(inputEdadCondu.value - 0, inputAnyosCar.value - 0, evento);
    })

}

if (inputEdadCondu)
{
    inputEdadCondu.addEventListener('invalid', function (evento) {
        CheckCarnetEdad(inputEdadCondu.value - 0, inputAnyosCar.value - 0, evento);
    });
    
    inputEdadCondu.addEventListener('change', function (evento) {
        evento.target.setCustomValidity('');
        CheckCarnetEdad(inputEdadCondu.value - 0, inputAnyosCar.value - 0, evento);
    });

}



const CheckCarnetEdad = (edadConductor, edadCarnet, evento) => {
    let textoValidacion = "";
    if (edadConductor > 70) {
        textoValidacion = document.getElementById("error_validacion_edad_conductor_mas_70").value;

    }
    else if (edadConductor <= 20) {
        textoValidacion = document.getElementById("error_validacion_edad_conductor_menos_20").value;
        // event.target.setCustomValidity("<%=it.locations.%>");
    }
    else if (edadConductor >= 21 && edadConductor <= 70 && edadCarnet < 2) {
        textoValidacion = document.getElementById("error_validacion_carnet_2_anyos").value;
        // event.target.setCustomValidity("<%=it.locations.error_validacion_carnet_2_anyos %>");
    }
    evento.target.setCustomValidity(textoValidacion);
};

const cerrar_clock = document.getElementById("cerrar_clock").value;
const anterior_clock = document.getElementById("anterior_clock").value;
const siguiente_clock = document.getElementById("siguiente_clock").value;
const hoy_clock = document.getElementById("hoy_clock").value;
const enero = document.getElementById("enero").value;
const febrero = document.getElementById("febrero").value;
const marzo = document.getElementById("marzo").value;
const abril = document.getElementById("abril").value;
const mayo = document.getElementById("mayo").value;
const junio = document.getElementById("junio").value;
const julio = document.getElementById("julio").value;
const agosto = document.getElementById("agosto").value;
const septiembre = document.getElementById("septiembre").value;
const octubre = document.getElementById("octubre").value;
const noviembre = document.getElementById("noviembre").value;
const diciembre = document.getElementById("diciembre").value;
const corto_enero = document.getElementById("corto_enero").value;
const corto_febrero = document.getElementById("corto_febrero").value;
const corto_marzo = document.getElementById("corto_marzo").value;
const corto_abril = document.getElementById("corto_abril").value;
const corto_mayo = document.getElementById("corto_mayo").value;
const corto_junio = document.getElementById("corto_junio").value;
const corto_julio = document.getElementById("corto_julio").value;
const corto_agosto = document.getElementById("corto_agosto").value;
const corto_septiembre = document.getElementById("corto_septiembre").value;
const corto_octubre = document.getElementById("corto_octubre").value;
const corto_noviembre = document.getElementById("corto_noviembre").value;
const corto_diciembre = document.getElementById("corto_diciembre").value;
const domingo = document.getElementById("domingo").value;
const lunes = document.getElementById("lunes").value;
const martes = document.getElementById("martes").value;
const miercoles = document.getElementById("miercoles").value;
const jueves = document.getElementById("jueves").value;
const viernes = document.getElementById("viernes").value;
const sabado = document.getElementById("sabado").value;
const corto_domingo = document.getElementById("corto_domingo").value;
const corto_lunes = document.getElementById("corto_lunes").value;
const corto_martes = document.getElementById("corto_martes").value;
const corto_miercoles = document.getElementById("corto_miercoles").value;
const corto_jueves = document.getElementById("corto_jueves").value;
const corto_viernes = document.getElementById("corto_viernes").value;
const corto_sabado = document.getElementById("corto_sabado").value;
const min_domingo = document.getElementById("min_domingo").value;
const min_lunes = document.getElementById("min_lunes").value;
const min_martes = document.getElementById("min_martes").value;
const min_miercoles = document.getElementById("min_miercoles").value;
const min_jueves = document.getElementById("min_jueves").value;
const min_viernes = document.getElementById("min_viernes").value;
const min_sabado = document.getElementById("min_sabado").value;

const botonVerPrecios = document.getElementById("boton-VerPrecios");

if(typeof $ !== 'undefined')
{

    $.datepicker.regional['es'] = {
            closeText: cerrar_clock,
            prevText: anterior_clock ,
            nextText: siguiente_clock ,
            currentText: hoy_clock ,
            monthNames: [enero, febrero, marzo, abril, mayo, junio, julio, agosto, septiembre, octubre, noviembre, diciembre],
            monthNamesShort: [corto_enero, corto_febrero, corto_marzo, corto_abril, corto_mayo, corto_junio, corto_julio, corto_agosto, corto_septiembre, corto_octubre, corto_noviembre, corto_diciembre],
            dayNames: [domingo, lunes, martes, miercoles, jueves, viernes, sabado],
            dayNamesShort: [corto_domingo, corto_lunes, corto_martes, corto_miercoles, corto_jueves, corto_viernes, corto_sabado],
            dayNamesMin: [min_domingo, min_lunes, min_martes, min_miercoles, min_jueves, min_viernes, min_sabado],
            weekHeader: 'Sm',
            dateFormat: 'dd/mm/yy',
            firstDay: 1,
            isRTL: false,
            showMonthAfterYear: false,
            yearSuffix: ''
    };
    $.datepicker.setDefaults($.datepicker.regional['es']);
        
    $(function () 
    {
        $("#fechaRecogida").datepicker({ dateFormat: 'D,dd-mm-yy', minDate: '1d' });
        if (botonVerPrecios)
        {
            //    comprobar que no machaque la fecha desde muestraoferta.html
            $("#fechaRecogida").datepicker("setDate", new Date());
    
        }
    });
        
    $(function () 
    {
    
        $("#fechaDevolucion").datepicker({ dateFormat: 'D,dd-mm-yy', minDate: '1d' });
        
        $fecha = new Date();
        $fecha.setDate($fecha.getDate() + 3);
        
        if (botonVerPrecios)
        {
            $("#fechaDevolucion").datepicker("setDate", $fecha);
    
        }
    });
    
    
    $(".triggerRec").click(function () {
        $("#fechaRecogida").datepicker("show");
    });
    
    $(".triggerDev").click(function () {
        $("#fechaDevolucion").datepicker("show");
    });
    
    $('.clockpicker').clockpicker();
}

