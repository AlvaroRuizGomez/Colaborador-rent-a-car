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

        document.getElementById("fechaRecogida_input").value = document.getElementById("fechaRecogida").value;
        document.getElementById("fechaDevolucion_input").value = document.getElementById("fechaDevolucion").value;
        document.getElementById("horaRecogida_input").value = document.getElementById("horaRecogida").value;
        document.getElementById("horaDevolucion_input").value = document.getElementById("horaDevolucion").value;
        if (document.getElementById("rangoedad").checked === true)
        {
            document.getElementById("conductor_con_experiencia_input").value = "on";
        }
        else
        {
            document.getElementById("conductor_con_experiencia_input").value = "off";
        }
        
        const formulario = document.getElementById(selectedVehiculo);
        formulario.submit();

    });

}


const CheckRangoEdad = async () => {

    if (checkboxRangoEdad.checked === true) {
        desplegable_edad.classList.remove("visible");
        desplegable_edad.classList.add("invisible");
    }
    else {
        desplegable_edad.classList.remove("invisible");
        desplegable_edad.classList.add("visible");
    }

}

checkboxRangoEdad.addEventListener("click", CheckRangoEdad );

window.onload = function () {
    CheckRangoEdad();
};
