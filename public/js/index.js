//mostrar edad
const checkboxRangoEdad = document.getElementById("rangoedad");
const desplegable_edad = document.getElementById("desplegable_edad");


//cards
const cards = document.getElementsByClassName("card");

for (let i = 0; i < cards.length; i++)
{
    cards[i].addEventListener("click", async (evento) =>
    {
        // evento.preventDefault();
        
        const selectedVehiculo = cards[i].lastElementChild.lastElementChild.lastElementChild.value;
        const formulario = document.getElementById(selectedVehiculo);

        let link = formulario.href;
        link = link.split("fechaRecogida=")[0] +  "fechaRecogida=" + document.getElementById("fechaRecogida").value + link.split("fechaRecogida=")[1];
        link = link.split("horaRecogida=")[0] + "horaRecogida=" + document.getElementById("horaRecogida").value + link.split("horaRecogida=")[1];
        link = link.split("fechaDevolucion=")[0] + "fechaDevolucion=" + document.getElementById("fechaDevolucion").value + link.split("fechaDevolucion=")[1];
        link = link.split("horaDevolucion=")[0] + "horaDevolucion=" + document.getElementById("horaDevolucion").value + link.split("horaDevolucion=")[1];
        if (document.getElementById("rangoedad").checked === true)
        {
            link = link.split("conductor_con_experiencia=")[0] + "conductor_con_experiencia=on" + link.split("conductor_con_experiencia=")[1];
            link = link.split("edad_conductor=")[0] + "edad_conductor=25" + link.split("edad_conductor=")[1];
            
        }
        else
        {
            link = link.split("conductor_con_experiencia=")[0] + "conductor_con_experiencia=off" + link.split("conductor_con_experiencia=")[1];
            link = link.split("edad_conductor=")[0] + "edad_conductor=" + document.getElementById("edad_conductor").value + link.split("edad_conductor=")[1];
        }

        link = link.split("anyos_carnet=")[0] + "anyos_carnet=" + document.getElementById("anyos_carnet").value + link.split("anyos_carnet=")[1];
        link += "numeroDias=" + document.getElementById("numerodiasHidden").value;

        formulario.href = link;

//"http://localhost:8080/car/
// peugeot108.html?id=peugeot108&success=xIieCQdYG6eUpzg2nYf5L&fase=2&idioma=es&vehiculo=peugeot108
// &fechaRecogida=Sab,17-07-2021&horaRecogida=09:00
// &fechaDevolucion=Vie,23-07-2021&horaDevolucion=20:00
// &conductor_con_experiencia=off
// &edad_conductor=22
// &anyos_carnet=2&numeroDias=7"


    });

}


const CheckRangoEdad = async () => {

    if (checkboxRangoEdad.checked === true) {
        desplegable_edad.classList.remove("visible");
        desplegable_edad.classList.add("invisible");
        desplegable_edad.style.maxHeight = null;
        desplegable_edad.style.marginBottom = null;
        desplegable_edad.style.overflow = "hidden";
    }
    else {
        desplegable_edad.classList.remove("invisible");
        desplegable_edad.classList.add("visible");
        desplegable_edad.style.maxHeight = "70px";
        desplegable_edad.style.marginBottom = "15px";

        setTimeout(() => {
            desplegable_edad.style.overflow = "visible";
        }, 300);
        

    }

}

checkboxRangoEdad.addEventListener("click", CheckRangoEdad );

const boton = document.getElementById("boton-idioma-seleccionado");

boton.addEventListener("click", async () =>
{

    const contenido = document.getElementById("idioma-contenido");
    if (contenido.classList.contains("idioma-contenido-show") === true)
    {

        contenido.classList.remove("idioma-contenido-show");
    }
    else
    {
        contenido.classList.add("idioma-contenido-show");
    }
    
});

window.onclick = async (evento) => 
{
    if (evento.target.matches(".boton-idioma-seleccionado") === false && 
        evento.target.matches(".bandera") === false
    )
    {
        const listadoIdiomas = document.getElementById("idioma-contenido");
        if (listadoIdiomas.classList.contains("idioma-contenido-show"))
        {
            listadoIdiomas.classList.remove("idioma-contenido-show");
        }
    }
}
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

const ComprobarIntervaloFechas = async () => {


    const fechaRecogida = await ObtenerFecha(inputFechaRecogida.value, inputHoraRecogida.value);
    const fechaDevolucion = await ObtenerFecha(inputFechaDevolucion.value, inputHoraDevolucion.value);

    const diasDecimales = (new Date(fechaDevolucion) - new Date(fechaRecogida)) / 86400000;
    let numerodias = Math.ceil(diasDecimales);
    let traDias = undefined;
    if (numerodias === 1)
    {
        traDias = document.getElementById("traDia").value;
    }
    else if (numerodias < 0) {
        traDias = document.getElementById("traDias").value;
        numerodias = 0;

    }
    else
    {
        traDias = document.getElementById("traDias").value;
        
    }
    inputHiddenNumeroDias.value = numerodias;
    numerodiasInput.innerHTML = `${numerodias} ${traDias}`;
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



window.onload = function () {
    CheckRangoEdad();
};
