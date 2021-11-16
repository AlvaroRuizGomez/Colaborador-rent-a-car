const botonCondiciones = document.getElementsByClassName("boton_modal");
let botonesCerrar = document.getElementsByClassName("details-modal-close");
const overlay = document.getElementsByClassName("overlay-transparente");
const botonesEnlacesInteres = document.getElementsByClassName("enlace_interes_modal");
const overlayAnimacion = document.getElementById("overlay-animacion-contenido");
const botonModificar = document.getElementById("bt-enviar-index");


for (let i = 0; i < botonCondiciones.length; i++)
{
    
    overlay[i].addEventListener("click", async (evento) =>
    {

        const divOverlay = evento.target;

        if (divOverlay.classList.contains("modal-visible") === true) {
            divOverlay.classList.remove("modal-visible");
            divOverlay.classList.add("modal-invisible");
            document.body.style.overflow = null;

        }

    });

    botonCondiciones[i].addEventListener("click", async (evento)=> 
    {
        
        const divOverlay = document.getElementById(`overlay_${botonCondiciones[i].id.split("_")[1]}`);

        divOverlay.addEventListener("click", async (evento) => {

            const divOverlay = evento.target;

            if (divOverlay.classList.contains("modal-visible") === true) {
                divOverlay.classList.remove("modal-visible");
                divOverlay.classList.add("modal-invisible");
                document.body.style.overflow = null;

            }

        });


        let botonesCerrar = document.getElementsByClassName("details-modal-close");

        if (divOverlay.classList.contains("modal-invisible") === true)
        {
            document.body.style.overflow = "hidden";
            document.querySelector("html").scrollTop = window.scrollY;
            
            divOverlay.classList.remove("modal-invisible");
            divOverlay.classList.add("modal-visible");
        }
    });
}


for (let p = 0; p < botonesCerrar.length; p++ )
{
    botonesCerrar[p].addEventListener("click", (evento) => 
    {

        let divOverlay = document.getElementsByClassName("overlay-transparente");

        let botonesCerrar = document.getElementsByClassName("details-modal-close");
        for (let o = 0; o < divOverlay.length; o++) {

            if (divOverlay[o].classList.contains("modal-visible") === true) {
                divOverlay[o].classList.remove("modal-visible");
                divOverlay[o].classList.add("modal-invisible");
                document.body.style.overflow = null;

            }

        }

    });


}


// idiomas
const botonIdioma = document.getElementById("boton-idioma-seleccionado");

botonIdioma.addEventListener("click", async () => {

    const contenido = document.getElementById("idioma-contenido");
    if (contenido.classList.contains("idioma-contenido-show") === true) {

        contenido.classList.remove("idioma-contenido-show");
    }
    else {
        contenido.classList.add("idioma-contenido-show");
    }

});


// --- inicio colapse 
// <!----------------------------- Informacion Collapse------------------------------->
    
const elementosColapsables = document.getElementsByClassName("collapsable");
for (let i = 0; i < elementosColapsables.length; i++)
{
    elementosColapsables[i].addEventListener("click", async (evento) =>
    {

        if (evento.target.parentElement.className === "content noselect") return;

        const flecha = elementosColapsables[i].children[0].children[0].lastElementChild;

        if (flecha.classList.contains("arrow_down") === false)
        {
            flecha.classList.add("arrow_down");

        }
        else
        {
            flecha.classList.remove("arrow_down");
        }



    });

}


// --- fin colapse



// enlaces de interes

for (let i = 0; i < botonesEnlacesInteres.length; i++)
{
    botonesEnlacesInteres[i].addEventListener("click", (evento) =>
    {

        let divOverlay = evento.target.parentElement.lastElementChild;

        if (divOverlay.classList.contains("modal-invisible") === true)
        {

            document.body.style.overflow = "hidden";
            document.querySelector("html").scrollTop = window.scrollY;

            divOverlay.classList.remove("modal-invisible");
            divOverlay.classList.add("modal-visible");

        }
        


    });

}

window.onclick = async (evento) => {
    if (evento.target.matches(".boton-idioma-seleccionado") === false &&
        evento.target.matches(".bandera") === false
    ) {
        const listadoIdiomas = document.getElementById("idioma-contenido");
        if (listadoIdiomas.classList.contains("idioma-contenido-show")) {
            listadoIdiomas.classList.remove("idioma-contenido-show");
        }
    }
}

//---- fin idiomas


//---- set tiempo

const inputFechaDevolucion = document.getElementById("fechaDevolucion");
const inputFechaRecogida = document.getElementById("fechaRecogida");
let intervalo = undefined;

inputFechaDevolucion.addEventListener("focusout", async (evento) => {
    intervalo = setInterval(async (evento) => {
        await ComprobarIntervaloFechas();
        clearInterval(intervalo);

    }, 500);

});

inputFechaRecogida.addEventListener("focusout", async (evento) => {
    intervalo = setInterval(async (evento) => {
        await ComprobarIntervaloFechas();
        clearInterval(intervalo);
    }, 500);

});


const inputHoraRecogida = document.getElementById("horaRecogida");
const inputHoraDevolucion = document.getElementById("horaDevolucion");
const numerodiasInput = document.getElementById("numerodias");
const inputHiddenNumeroDias = document.getElementById("numerodiasHidden");


// let idiomaDias = document.getElementById("");
// let idiomaDia = undefined;

const ComprobarIntervaloFechas = async () => {


    const fechaRecogida = await ObtenerFecha(inputFechaRecogida.value, inputHoraRecogida.value);
    const fechaDevolucion = await ObtenerFecha(inputFechaDevolucion.value, inputHoraDevolucion.value);

    const diasDecimales = (new Date(fechaDevolucion) - new Date(fechaRecogida)) / 86400000;
    let numerodias = Math.ceil(diasDecimales);
    let traDias = undefined;
    if (numerodias === 1) {
        traDias = document.getElementById("traDia").value;
    }
    else if (numerodias < 0)
    {
        traDias = document.getElementById("traDias").value;
        numerodias = 0;

    }
    else {
        traDias = document.getElementById("traDias").value;

    }
    inputHiddenNumeroDias.value = numerodias;
    numerodiasInput.innerHTML = `${numerodias} ${traDias}`;

    // cambiar formulario
    let fechaDateForm = new Date(fechaRecogida);
    let diaForm = fechaDateForm.getDate();
    let mesForm = fechaDateForm.getMonth() + 1;
    let anyoForm = fechaDateForm.getFullYear();

    document.getElementById("fechaRecogidaForm").value = `${diaForm}-${mesForm}-${anyoForm}`;

    fechaDateForm = new Date(fechaDevolucion);
    diaForm = fechaDateForm.getDate();
    mesForm = fechaDateForm.getMonth() + 1;
    anyoForm = fechaDateForm.getFullYear();

    document.getElementById("fechaDevolucionForm").value = `${diaForm}-${mesForm}-${anyoForm}`;
    
    if (numerodias <= 0)
    {
        botonModificar.disabled = true;
    }
    else
    {
        botonModificar.disabled = false;
    }

    return true;


};

const ObtenerFecha = async (fecha, hora) => {

    const splited = fecha.split(",")[1].split("-");
    const dia = splited[0];
    const mes = splited[1];
    const anyo = splited[2];

    const fechaRecogida = new Date(`${anyo}-${mes}-${dia}T${hora}`);
    return fechaRecogida;

};

///------

setTimeout(async () => {
    const contenido = document.getElementById("contenido-ofertas");

    overlayAnimacion.classList.remove("visible");
    overlayAnimacion.classList.add("invisible");

    contenido.classList.remove("invisible");
    
}, 4000);

