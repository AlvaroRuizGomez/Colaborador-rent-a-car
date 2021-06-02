//mostrar edad
const checkboxRangoEdad = document.getElementById("rangoedad");
const desplegable_edad = document.getElementById("desplegable_edad");


//cards
const cards = document.getElementsByClassName("card");

for (let i = 0; i < cards.length; i++)
{
    cards[i].addEventListener("click", async (evento) =>
    {
        const location = document.getElementById("idioma_directo").value;
        const success = document.getElementById("success_directo").value;
        const fase = document.getElementById("fase_directo").value;
        let selectedVehiculo = "";
        if (evento.target.lastElementChild.name === "vehiculo")
        {
            selectedVehiculo = evento.target.lastElementChild.value;
        }
        else
        {
            selectedVehiculo = evento.target.lastElementChild.lastElementChild.value;
        }

        const body = {
            "idioma": location,
            "success": success,
            "fase": fase,
            "vehiculo": selectedVehiculo
        };

        fetch("/direct", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(body)
        });
        
        // const dataResponse = await responseRaw.json();

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
