const botonTerminosCondiciones = document.getElementById("boton-terminos");
const botonPrivacidad = document.getElementById("boton-privacidad");

const botonCerrarTerminos = document.getElementById("boton-cerrar-modal-terminos");
const botonCerrarPrivacidad = document.getElementById("boton-cerrar-modal-privacidad");

const overlayTerminos = document.getElementById("overlay-terminos");
const overlayPrivacidad = document.getElementById("overlay-privacidad");


const botonCerrarModal = document.getElementById("botonCerrarModal");

function handleFullWidthSizing() {
    const scrollbarWidth = window.innerWidth - document.body.clientWidth   
    document.getElementsByClassName("container")[0].style.width = `calc(100vw - ${scrollbarWidth}px)`;
}

handleFullWidthSizing();

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


botonCerrarModal.addEventListener("click", async (evento) =>
{
    let divOverlay = document.getElementById("overlay-boton-reservar");
    // const divOverlay = evento.target.parentElement.parentElement.parentElement.parentElement;

    if (divOverlay.classList.contains("modal-visible") === true) {
        divOverlay.classList.remove("modal-visible");
        divOverlay.classList.add("modal-invisible");
        document.body.style.overflow = null;

    }

});

boton_reservar.addEventListener("click", async (evento) =>
{
    evento.preventDefault();

    boton_reservar.disabled = true;
    
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

    const isValidTelefono = await CheckInput(inputTelefono, iconoErrorTelf, "tareaTelefono");
    const isValidEmail = await CheckInput(inputEmail, iconoErrorEmail, "tareaEmail");
    const isValidApellidos = await CheckInput(inputApellidos, iconoErrorApell, "tareaApellidos");
    const isValidNombre = await CheckInput(inputNombre, iconoErrorNombre, "tareaNombre");

    const regex = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gm;
    const isValidTypeEmail = await CheckType(inputEmail, iconoErrorEmail, "tareaEmail", regex);

    const isValid = checkIsAllValid(isValidTelefono, isValidEmail, isValidApellidos, isValidNombre, isValidTypeEmail);
    if (isValid === false)
    {
        return;
    }

    if (icono_error_formulario.classList.contains("visible") === true)
    {
        icono_error_formulario.classList.remove("visible");
        icono_error_formulario.classList.add("no-visible");
    }

    if (document.getElementById("Sr").checked === true)
    {
        document.getElementById("sr_input").value = "Sr";

    }
    else if (document.getElementById("Sra").checked === true)
    {
        document.getElementById("sr_input").value = "Sra";
    }
    
    let datosFormulario = {};
    
// relleno
    datosFormulario["descripcion_vehiculo"] = document.getElementById("descripcion_vehiculo").value;
    datosFormulario["fechaRecogida"] = document.getElementById("fechaRecogida").value;
    datosFormulario["horaRecogida"] = document.getElementById("horaRecogida").value;
    datosFormulario["fechaDevolucion"] = document.getElementById("fechaDevolucion").value;
    datosFormulario["horaDevolucion"] = document.getElementById("horaDevolucion").value;
    datosFormulario["dias"] = document.getElementById("dias").value;
    datosFormulario["alquiler"] = document.getElementById("alquiler").value;
    datosFormulario["conductor_con_experiencia"] = document.getElementById("conductor_con_experiencia").value;
    datosFormulario["total_suplmento_tipo_conductor"] = document.getElementById("total_suplmento_tipo_conductor").value;
    datosFormulario["pagoRecogida"] = document.getElementById("pagoRecogida").value;
    datosFormulario["pago_online"] = document.getElementById("pago_online").value;
    datosFormulario["trato"] = document.getElementById("sr_input").value;
    datosFormulario["numero_sillas_nino"] = document.getElementById("child_seat").value;
    datosFormulario["numero_booster"] = document.getElementById("booster_seat").value;
    datosFormulario["nombre"] = document.getElementById("nombre").value;
    datosFormulario["apellidos"] = document.getElementById("apellidos").value;
    datosFormulario["email"] = document.getElementById("email").value;
    datosFormulario["telefono"] = document.getElementById("telefono").value;
    datosFormulario["idioma"] = document.getElementById("idioma").value;

//relleno


    // document.getElementById("child_seat_input").value = document.getElementById("child_seat").value;
    // document.getElementById("booster_seat_input").value = document.getElementById("booster_seat").value;

    // document.getElementById("nombre_input").value = document.getElementById("nombre").value;
    // document.getElementById("apellidos_input").value = document.getElementById("apellidos").value;
    // document.getElementById("email_input").value = document.getElementById("email").value;
    // document.getElementById("telefono_input").value = document.getElementById("telefono").value;
    
    const uri = document.getElementById("formulario-reservar").attributes[1].nodeValue;
    // const uri = formulario_reservar.;
    // formulario_reservar.submit();

    // mostrar animacion
    await MostrarOverlayAnimacion(evento);

    // enviar el formulario
    const responseRaw = await fetch(uri, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(datosFormulario)
    });

    const datos = await responseRaw.json();

    // contestacion del servidor
    console.log("datos");

    
    // ocultar overlay
    setTimeout(async () => {
        await OcultarOverlayAnimacion(evento);
        // mostrar Formulario CC
        await MostrarOverlayFormularioCC(evento);
    
    
        const relleno = document.getElementById("relleno-modal-reservar");
    
        const trozoHtml = document.createElement("p");
        trozoHtml.innerHTML = "Numero Registro:" + datos.numeroRegistro;
    
        relleno.appendChild(trozoHtml);
    }, 3000);
    
    

    
});


const MostrarOverlayAnimacion = async (evento) =>
{
    let divOverlay = document.getElementById("overlay-animacion");
    // let divOverlay = evento.target.parentElement.parentElement.children[3];

    // if (divOverlay.classList.contains("btnReserva") === false) {
    //     divOverlay = evento.target.parentElement.children[3];
    // }

    if (divOverlay.classList.contains("modal-invisible") === true) {

        document.body.style.overflow = "hidden";
        document.querySelector("html").scrollTop = window.scrollY;

        divOverlay.classList.remove("modal-invisible");
        divOverlay.classList.add("modal-visible");

    }

};

const OcultarOverlayAnimacion = async (evento) =>
{

    
    let divOverlay = document.getElementById("overlay-animacion");

    // let divOverlay = evento.target.parentElement.parentElement.children[3];

    // if (divOverlay.classList.contains("btnReserva") === false) {
    //     divOverlay = evento.target.parentElement.children[3];
    // }

    if (divOverlay.classList.contains("modal-visible") === true) {

        document.body.style.overflow = null;

        divOverlay.classList.remove("modal-visible");
        divOverlay.classList.add("modal-invisible");

    }


};




const MostrarOverlayFormularioCC = async (evento) => {
    // let divOverlay = evento.target.parentElement.parentElement.children[1];
    
    // if (divOverlay.classList.contains("btnReserva") === false) {
        //     divOverlay = evento.target.parentElement.children[1];
        // }
        
    let divOverlay = document.getElementById("overlay-boton-reservar");
    if (divOverlay.classList.contains("modal-invisible") === true) {

        document.body.style.overflow = "hidden";
        document.querySelector("html").scrollTop = window.scrollY;

        divOverlay.classList.remove("modal-invisible");
        divOverlay.classList.add("modal-visible");

    }

};



const checkIsAllValid = (isValidTelefono, isValidEmail, isValidApellidos, isValidNombre, isValidTypeEmail) =>
{
    let isValid = false;

    if (isValidTelefono === true && 
        isValidEmail === true &&
        isValidApellidos === true &&
        isValidNombre === true &&
        isValidTypeEmail === true)
    {
        isValid = true;

    }

    return isValid;
};

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

    let isValid = false;
    if (inputGeneric.value !== "")
    {
        const tarea = document.getElementById(tareaString);
        isValid = true;
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

    return isValid;
};





const CheckType = async (inputGeneric, iconoError, tareaString, regex) =>
{

    
    // const regex = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gm;

    const m = regex.exec(inputGeneric.value);
    let isValid = false;
    if (m === null)
    {
        const tarea = document.getElementById(tareaString);
        if (tarea.classList.contains("visible") === true) {
            tarea.classList.remove("visible");
            tarea.classList.add("no-visible");
            isValid = true;
        }

        if (iconoError.classList.contains("no-visible") === true) {
            iconoError.classList.remove("no-visible");
            iconoError.classList.add("visible");
            isValid = false;
        }

    }
    else
    {
        const tarea = document.getElementById(tareaString);
        isValid = true;
        if (tarea.classList.contains("no-visible") === true) {
            tarea.classList.remove("no-visible");
            tarea.classList.add("visible");
            isValid = false;
        }

        if (iconoError.classList.contains("visible") === true) {
            iconoError.classList.remove("visible");
            iconoError.classList.add("no-visible");
            isValid = true;
        }
    }
    return isValid;

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




// idiomas
const boton = document.getElementById("boton-idioma-seleccionado");

boton.addEventListener("click", async () => {

    const contenido = document.getElementById("idioma-contenido");
    if (contenido.classList.contains("idioma-contenido-show") === true) {

        contenido.classList.remove("idioma-contenido-show");
    }
    else {
        contenido.classList.add("idioma-contenido-show");
    }

});

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