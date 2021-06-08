const formularioNews = document.getElementById("subscribe-blog");
const botonNews = document.getElementById("boton_suscripcion");
const emailInput = document.getElementById("subscribe-field");
const contestacion = document.getElementById("contestacion");

botonNews.addEventListener("click", async (evento) =>
{

    evento.preventDefault();

    const emailIsValid = await CheckEmail(emailInput);

    if (emailInput.value === "" || emailIsValid === false)
    {
        return;
    }

    const body = {
        "email": emailInput.value
    };

    const responseRaw = await fetch("/newsletter", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(body)
    });

    const dataResponse = await responseRaw.json();

    if (dataResponse.isOk === true)
    {
        if (formularioNews.classList.contains("visible") === true)
        {
            formularioNews.classList.remove("visible");
            formularioNews.classList.add("invisible");

            contestacion.classList.remove("invisible");
            contestacion.classList.add("visible");

        }

    }

});


const CheckEmail = async (inputGeneric) =>
{
    const regex = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gm;

    const m = regex.exec(inputGeneric.value);
    let isValid = false;
    if (m !== null)
    {
        isValid = true;
    }
    
    return isValid;

};