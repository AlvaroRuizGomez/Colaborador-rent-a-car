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


///----



botonTerminosCondiciones.addEventListener("click", async (evento) =>
{
    
    if (overlayTerminos.classList[1] === "modal-invisible") 
    {
        document.body.style.overflow = "hidden";
        document.querySelector("html").scrollTop = window.scrollY;

        overlayTerminos.classList.remove("modal-invisible");
        overlayTerminos.classList.add("modal-visible");
    }


});


botonCerrarTerminos.addEventListener("click", async (evento) => {

    console.log("dsdf");
    if (overlayTerminos.classList[1] === "modal-visible") {
        overlayTerminos.classList.remove("modal-visible");
        overlayTerminos.classList.add("modal-invisible");
        document.body.style.overflow = null;

    }
    


});



overlayTerminos.addEventListener("click", async (evento) => {

    const divOverlay = evento.target;

    if (divOverlay.classList[1] === "modal-visible") {
        divOverlay.classList.remove("modal-visible");
        divOverlay.classList.add("modal-invisible");
        document.body.style.overflow = null;

    }

});

//-----------

botonPrivacidad.addEventListener("click", async (evento) => {

    if (overlayPrivacidad.classList[1] === "modal-invisible") {
        document.body.style.overflow = "hidden";
        document.querySelector("html").scrollTop = window.scrollY;

        overlayPrivacidad.classList.remove("modal-invisible");
        overlayPrivacidad.classList.add("modal-visible");
    }


});


botonCerrarPrivacidad.addEventListener("click", async (evento) => {

    console.log("dsdf");
    if (overlayPrivacidad.classList[1] === "modal-visible") {
        overlayPrivacidad.classList.remove("modal-visible");
        overlayPrivacidad.classList.add("modal-invisible");
        document.body.style.overflow = null;

    }



});



overlayPrivacidad.addEventListener("click", async (evento) => {

    const divOverlay = evento.target;

    if (divOverlay.classList[1] === "modal-visible") {
        divOverlay.classList.remove("modal-visible");
        divOverlay.classList.add("modal-invisible");
        document.body.style.overflow = null;

    }

});

boton_reservar.addEventListener("click", (evento) =>
{
    evento.preventDefault();

    if (okTermsConditions.value !== "SI")
    {
        return;
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


/// ---------- INPUTS

inputNombre.addEventListener("change", async (evento) =>
{

    if (inputNombre.value !== "")
    {
        const tareaNombre = document.getElementById("tareaNombre");
        if (tareaNombre.classList[1] === "no-visible")
        {
            tareaNombre.classList.remove("no-visible");
            tareaNombre.classList.add("visible");
        }

    }
    else
    {
        const tareaNombre = document.getElementById("tareaNombre");
        if (tareaNombre.classList[1] === "visible") {
            tareaNombre.classList.remove("visible");
            tareaNombre.classList.add("no-visible");
        }
    }

});

inputApellidos.addEventListener("change", async (evento) => {
    
    if (inputApellidos.value !== "") {
        const tareaApellidos = document.getElementById("tareaApellidos");
        if (tareaApellidos.classList[1] === "no-visible") {
            tareaApellidos.classList.remove("no-visible");
            tareaApellidos.classList.add("visible");
        }

    }
    else {
        const tareaApellidos = document.getElementById("tareaApellidos");
        if (tareaApellidos.classList[1] === "visible") {
            tareaApellidos.classList.remove("visible");
            tareaApellidos.classList.add("no-visible");
        }
    }

});

inputEmail.addEventListener("change", async (evento) => {
    if (inputEmail.value !== "") {
        const tareaEmail = document.getElementById("tareaEmail");
        if (tareaEmail.classList[1] === "no-visible") {
            tareaEmail.classList.remove("no-visible");
            tareaEmail.classList.add("visible");
        }

    }
    else {
        const tareaEmail = document.getElementById("tareaEmail");
        if (tareaEmail.classList[1] === "visible") {
            tareaEmail.classList.remove("visible");
            tareaEmail.classList.add("no-visible");
        }
    }


});

inputTelefono.addEventListener("change", async (evento) => {
    if (inputTelefono.value !== "") {
        const tareaTelefono = document.getElementById("tareaTelefono");
        if (tareaTelefono.classList[1] === "no-visible") {
            tareaTelefono.classList.remove("no-visible");
            tareaTelefono.classList.add("visible");
        }

    }
    else {
        const tareaTelefono = document.getElementById("tareaTelefono");
        if (tareaTelefono.classList[1] === "visible") {
            tareaTelefono.classList.remove("visible");
            tareaTelefono.classList.add("no-visible");
        }
    }


});