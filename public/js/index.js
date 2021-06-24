//mostrar edad
const checkboxRangoEdad = document.getElementById("rangoedad");
const desplegable_edad = document.getElementById("desplegable_edad");


//cards
const cards = document.getElementsByClassName("card");

for (let i = 0; i < cards.length; i++)
{
    cards[i].addEventListener("click", async (evento) =>
    {
        evento.preventDefault();
        
        const selectedVehiculo = cards[i].lastElementChild.lastElementChild.lastElementChild.value;
        const formulario = document.getElementById(selectedVehiculo);

        formulario[4].value = document.getElementById("fechaRecogida").value;
        formulario[5].value = document.getElementById("horaRecogida").value;
        formulario[6].value = document.getElementById("fechaDevolucion").value;
        formulario[7].value = document.getElementById("horaDevolucion").value;

        if (document.getElementById("rangoedad").checked === true)
        {
            formulario[8].value = "on";
        }
        else
        {
            formulario[8].value = "off";
        }
        
        formulario.submit();

    });

}


const CheckRangoEdad = async () => {

    if (checkboxRangoEdad.checked === true) {
        desplegable_edad.classList.remove("visible");
        desplegable_edad.classList.add("invisible");
        desplegable_edad.style.maxHeight = null;
        desplegable_edad.style.marginBottom = null;
    }
    else {
        desplegable_edad.classList.remove("invisible");
        desplegable_edad.classList.add("visible");
        desplegable_edad.style.maxHeight = "26px";
        desplegable_edad.style.marginBottom = "15px";
        

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


window.onload = function () {
    CheckRangoEdad();
};
