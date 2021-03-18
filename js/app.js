// formulario
const elementoFormulario = document.getElementById("formulario-index");
const btEnviarIndex = document.getElementById("bt-enviar-index");
const conductorExperienciado = document.getElementById("conductor_con_experiencia");
const fechaDevolucion = document.getElementById("fechaDevolucion");
const horaDevolucion = document.getElementById("horaDevolucion");
const conductorExperiencia = document.getElementById("conductor_con_experiencia");


const URL_BACKEND = "http://localhost:3000/api";


elementoFormulario.addEventListener("submit", async (evento) => {
    evento.preventDefault();

    //prevenir que no de otra vez click en el boton
    btEnviarIndex.disabled = true;

    const dataFromForm = {
        fechaDevolucionValue: fechaDevolucion.value,
        horaDevolucionValue: horaDevolucion.value,
        conductorExperienciaValue: conductorExperiencia.value
    };

    try
    {
        //enviamos al backend
        const responseRaw = await fetch(URL_BACKEND, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(dataFromForm),
        });
    
        const responseData = await responseRaw.json();

    }
    catch (error)
    {
        console.error(`Error: ${error}`);
    }

});


