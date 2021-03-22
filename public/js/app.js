// formulario
// const elementoFormulario = document.getElementById("formulario-index");
// const btEnviarIndex = document.getElementById("bt-enviar-index");

// const fechaDevolucion = document.getElementById("fechaDevolucion");
// const horaDevolucion = document.getElementById("horaDevolucion");
// const fechaRecogida = document.getElementById("fechaRecogida");
// const horaRecogida = document.getElementById("horaRecogida");
// const conductorExperiencia = document.getElementById("conductor_con_experiencia");


// const URL_FRONTEND = "/muestraoferta";


// elementoFormulario.addEventListener("submit", async (evento) => {
//     evento.preventDefault();

//     //prevenir que no de otra vez click en el boton
//     btEnviarIndex.disabled = true;

//     const dataForm = {
//         fechaDevolucionValue: fechaDevolucion.value,
//         horaDevolucionValue: horaDevolucion.value,
//         fechaRecogidaValue: fechaRecogida.value,
//         horaRecogidaValue: horaRecogida.value,
//         conductorExperienciaValue: conductorExperiencia.value,

//     };

//     try
//     {
//         //enviamos al backend
//         let res = await fetch(URL_FRONTEND, {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify(dataForm),
//         });
//         console.log(res);
    
//     }
//     catch (error)
//     {
//         console.error(`Error: ${error}`);
//     }

// });


