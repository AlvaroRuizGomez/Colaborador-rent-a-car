const botonCondiciones = document.getElementsByClassName("boton_modal");
let botonesCerrar = document.getElementsByClassName("details-modal-close");
const overlay = document.getElementsByClassName("overlay-transparente");
const botonesEnlacesInteres = document.getElementsByClassName("enlace_interes_modal");
const overlayAnimacion = document.getElementById("overlay-animacion-contenido");

for (let i = 0; i < botonCondiciones.length; i++)
{
    
    overlay[i].addEventListener("click", async (evento) =>
    {

        const divOverlay = evento.target;

        if (divOverlay.classList[1] === "modal-visible") {
            divOverlay.classList.remove("modal-visible");
            divOverlay.classList.add("modal-invisible");
            document.body.style.overflow = null;

        }

    });

   

    botonCondiciones[i].addEventListener("click", async (evento)=> 
    {
        
        // const divOverlay = evento.target.parentElement.nextElementSibling;
        let divOverlay = evento.target.parentElement.parentElement.parentElement.lastElementChild.firstElementChild;

        let botonesCerrar = document.getElementsByClassName("details-modal-close");
        if (divOverlay.classList[1] !== "modal-invisible")
        {
            divOverlay = evento.target.parentElement.parentElement.parentElement.lastElementChild.firstElementChild;
        }

        if (divOverlay.classList[1] === "modal-invisible")
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

            if (divOverlay[o].classList[1] === "modal-visible") {
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

        const flecha = elementosColapsables[i].children[0].lastElementChild;

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

inputFechaDevolucion.addEventListener("focusout", async (evento) =>
{
    intervalo = setInterval(async (evento) => {
        await ComprobarIntervaloFechas();
        
    }, 500);

});

inputFechaRecogida.addEventListener("focusout", async (evento) => {
    intervalo = setInterval(async (evento) => {
        await ComprobarIntervaloFechas();

    }, 500);

});


const inputHoraRecogida = document.getElementById("horaRecogida");
const inputHoraDevolucion = document.getElementById("horaDevolucion");
const numerodiasInput = document.getElementById("numerodias");
const inputHiddenNumeroDias = document.getElementById("numerodiasHidden");

const ComprobarIntervaloFechas = async () =>
{

    const fechaRecogida = await ObtenerFecha(inputFechaRecogida.value, inputHoraRecogida.value);
    const fechaDevolucion = await ObtenerFecha(inputFechaDevolucion.value, inputHoraDevolucion.value);

    const numerodias = (new Date(fechaDevolucion) - new Date(fechaRecogida)) / 86400000;
    inputHiddenNumeroDias.value = Math.ceil(numerodias);
    numerodiasInput.innerHTML = Math.ceil(numerodias);
    clearInterval(intervalo);

};

const ObtenerFecha = async (fecha, hora) =>
{
    
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

