const botonTerminosCondiciones = document.getElementById("boton-terminos");
const botonPrivacidad = document.getElementById("boton-privacidad");

const botonCerrarTerminos = document.getElementById("boton-cerrar-modal-terminos");
const botonCerrarPrivacidad = document.getElementById("boton-cerrar-modal-privacidad");

const overlayTerminos = document.getElementById("overlay-terminos");
const overlayPrivacidad = document.getElementById("overlay-privacidad");


///-------

const okTermsConditions = document.getElementById("okTermsConditions");

const boton_reservar = document.getElementById("boton_reservar");

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