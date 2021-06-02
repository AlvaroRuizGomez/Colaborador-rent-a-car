const botonTerminosCondiciones = document.getElementById("boton-terminos");
const botonPrivacidad = document.getElementById("boton-privacidad");

const botonCerrarTerminos = document.getElementById("boton-cerrar-modal-terminos");
const botonCerrarPrivacidad = document.getElementById("boton-cerrar-modal-privacidad");

const overlayTerminos = document.getElementById("overlay-terminos");
const overlayPrivacidad = document.getElementById("overlay-privacidad");


///------- formulario conductor

const okTermsConditions = document.getElementById("okTermsConditions");
const boton_reservar = document.getElementById("boton_reservar");

const inputNombre = document.getElementById("nombre");
const inputApellidos = document.getElementById("apellidos");
const inputEmail = document.getElementById("email");
const inputTelefono = document.getElementById("telefono");

const iconoErrorNombre = document.getElementById("iconoErrorNombre");
const iconoErrorApell = document.getElementById("iconoErrorApell");
const iconoErrorEmail = document.getElementById("iconoErrorEmail");
const iconoErrorTelf = document.getElementById("iconoErrorTelf");



///----



botonTerminosCondiciones.addEventListener("click", async (evento) =>
{
    
    if (overlayTerminos.classList.contains("modal-invisible") === true)
    {
        document.body.style.overflow = "hidden";
        document.querySelector("html").scrollTop = window.scrollY;

        overlayTerminos.classList.remove("modal-invisible");
        overlayTerminos.classList.add("modal-visible");
    }


});


botonCerrarTerminos.addEventListener("click", async (evento) => {

    console.log("dsdf");
    if (overlayTerminos.classList.contains("modal-visible") === true) {
        overlayTerminos.classList.remove("modal-visible");
        overlayTerminos.classList.add("modal-invisible");
        document.body.style.overflow = null;

    }
    


});



overlayTerminos.addEventListener("click", async (evento) => {

    const divOverlay = evento.target;

    if (divOverlay.classList.contains("modal-visible") === true) {
        divOverlay.classList.remove("modal-visible");
        divOverlay.classList.add("modal-invisible");
        document.body.style.overflow = null;

    }

});

//-----------

botonPrivacidad.addEventListener("click", async (evento) => {

    if (overlayPrivacidad.classList.contains("modal-invisible") === true) {
        document.body.style.overflow = "hidden";
        document.querySelector("html").scrollTop = window.scrollY;

        overlayPrivacidad.classList.remove("modal-invisible");
        overlayPrivacidad.classList.add("modal-visible");
    }


});


botonCerrarPrivacidad.addEventListener("click", async (evento) => {

    if (overlayPrivacidad.classList.contains("modal-visible") === true) {
        overlayPrivacidad.classList.remove("modal-visible");
        overlayPrivacidad.classList.add("modal-invisible");
        document.body.style.overflow = null;

    }



});



overlayPrivacidad.addEventListener("click", async (evento) => {

    const divOverlay = evento.target;

    if (divOverlay.classList.contains("modal-visible") === true) {
        divOverlay.classList.remove("modal-visible");
        divOverlay.classList.add("modal-invisible");
        document.body.style.overflow = null;

    }

});

boton_reservar.addEventListener("click", (evento) =>
{
    evento.preventDefault();
    
    const icono_error_formulario = document.getElementById("icono_error_formulario");
    
    if (okTermsConditions.checked === false)
    {
        if (icono_error_formulario.classList.contains("no-visible") === true) 
        {
            icono_error_formulario.classList.remove("no-visible");
            icono_error_formulario.classList.add("visible");
        }
        
        return;
    }

    CheckInput(inputTelefono, iconoErrorTelf, "tareaTelefono");
    CheckInput(inputEmail, iconoErrorEmail, "tareaEmail");
    CheckInput(inputApellidos, iconoErrorApell, "tareaApellidos");
    CheckInput(inputNombre, iconoErrorNombre, "tareaNombre");

    CheckType(inputEmail, iconoErrorEmail, "tareaEmail");

    if (icono_error_formulario.classList.contains("visible") === true)
    {
        icono_error_formulario.classList.remove("visible");
        icono_error_formulario.classList.add("no-visible");
    }

    const descripcion_vehiculo = document.getElementById("descripcion_vehiculo").value;
    const fechaRecogida = document.getElementById("fechaRecogida").value;
    const horaRecogida = document.getElementById("horaRecogida").value;
    const fechaDevolucion = document.getElementById("fechaDevolucion").value;
    const horaDevolucion = document.getElementById("horaDevolucion").value;
    const dias = document.getElementById("dias").value;
    const alquiler = document.getElementById("alquiler").value;
    const conductor_joven = document.getElementById("conductor_joven").value;
    const pagoRecogida = document.getElementById("pagoRecogida").value;
    const pago_online = document.getElementById("pago_online").value;

    const senyor = document.getElementById("Sr").value;
    const senyora = document.getElementById("Sr").value;




});

okTermsConditions.addEventListener("click", (evento)=>
{

    if (okTermsConditions.checked === true)
    {
        if (icono_error_formulario.classList.contains("visible") === true)
        {
            icono_error_formulario.classList.remove("visible");
            icono_error_formulario.classList.add("no-visible");
        }

    }


});


/// ---------- INPUTS



const CheckInput = async (inputGeneric, iconoError, tareaString) =>
{

    if (inputGeneric.value !== "")
    {
        const tarea = document.getElementById(tareaString);
        
        if (tarea.classList.contains("no-visible") === true)
        {
            tarea.classList.remove("no-visible");
            tarea.classList.add("visible");
    
        }
        
        if (iconoError.classList.contains("visible") === true)
        {
            iconoError.classList.remove("visible");
            iconoError.classList.add("no-visible");
    
        }
    
    }
    else
    {
        const tarea = document.getElementById(tareaString);
        if (tarea.classList.contains("visible") === true)
        {
            tarea.classList.remove("visible");
            tarea.classList.add("no-visible");
        }

        if (iconoError.classList.contains("no-visible") === true)
        {
            iconoError.classList.remove("no-visible");
            iconoError.classList.add("visible");

        }
    
    }
};





const CheckType = async (inputGeneric, iconoError, tareaString, regex) =>
{

    
    // const regex = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gm;

    const m = regex.exec(inputGeneric.value);

    if (m === null)
    {
        const tarea = document.getElementById(tareaString);
        if (tarea.classList.contains("visible") === true) {
            tarea.classList.remove("visible");
            tarea.classList.add("no-visible");
        }

        if (iconoError.classList.contains("no-visible") === true) {
            iconoError.classList.remove("no-visible");
            iconoError.classList.add("visible");

        }

    }
    else
    {
        const tarea = document.getElementById(tareaString);
        if (tarea.classList.contains("no-visible") === true) {
            tarea.classList.remove("no-visible");
            tarea.classList.add("visible");

        }

        if (iconoError.classList.contains("visible") === true) {
            iconoError.classList.remove("visible");
            iconoError.classList.add("no-visible");

        }
    }


};

inputNombre.addEventListener("change", async (evento) =>
{

    CheckInput(inputNombre, iconoErrorNombre, "tareaNombre");
});

inputApellidos.addEventListener("change", async (evento) => {
    
    CheckInput(inputApellidos, iconoErrorApell, "tareaApellidos");


});

inputEmail.addEventListener("change", async (evento) => {
    const regex = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gm;
    CheckInput(inputEmail, iconoErrorEmail, "tareaEmail");
    CheckType(inputEmail, iconoErrorEmail, "tareaEmail", regex);

});

inputTelefono.addEventListener("change", async (evento) => {
    // const regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/gm;
    CheckInput(inputTelefono, iconoErrorTelf, "tareaTelefono");
    // CheckType(inputTelefono, iconoErrorTelf, "tareaTelefono", regex);
});