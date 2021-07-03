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
            // formulario[8].value = "on";
        }
        else
        {
            link = link.split("conductor_con_experiencia=")[0] + "conductor_con_experiencia=off" + link.split("conductor_con_experiencia=")[1];
            // formulario[8].value = "off";
        }

        link = link.split("edad_conductor=")[0] + "edad_conductor=" + document.getElementById("edad_conductor").value + link.split("edad_conductor=")[1];
        
        
        formulario.href = link;

        // link.split("?")[1].split("&")[6].split("=")[1] = document.getElementById("fechaRecogida").value;
        // link.split("?")[1].split("&")[7].split("=")[1] = document.getElementById("horaRecogida").value;
        // link.split("?")[1].split("&")[8].split("=")[1] = document.getElementById("fechaDevolucion").value;


        //"http://localhost:8080/es/car.html?id=peugeot108&success=kjRubJJZL2LwIAHC9J2tJ&fase=2&&idioma=es&vehiculo=peugeot108&fechaRecogida=&horaRecogida=&fechaDevolucion=&horaDevolucion=&conductor_con_experiencia=&"


        // formulario[4].value = document.getElementById("fechaRecogida").value;
        // formulario[5].value = document.getElementById("horaRecogida").value;
        // formulario[6].value = document.getElementById("fechaDevolucion").value;
        // formulario[7].value = document.getElementById("horaDevolucion").value;


        
        // formulario.submit();

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
