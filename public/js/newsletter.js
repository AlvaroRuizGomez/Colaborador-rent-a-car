const botonNews = document.getElementById("boton_suscripcion");

botonNews.addEventListener("click", async (evento) =>
{
    
    evento.preventDefault();
    
    const formularioNews = document.getElementById("subscribe-blog");
    const emailInput = document.getElementById("subscribe-field");
    const contestacion = document.getElementById("contestacion");

    const emailIsValid = await CheckEmail(emailInput);

    if (emailInput.value === "" || emailIsValid === false)
    {
        return;
    }
    const idiomaInput = document.getElementById("idioma_newsletter");
    const body = {
        "idioma": idiomaInput.value,
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
        const titulo = document.getElementById("formulario-newsletter-titulo");
        const email = document.getElementById("formulario-newsletter-email");
        const grupo = document.getElementById("formulario-newsletter-grupo");

        const contestacion = document.getElementById("contestacion");

        if (contestacion.classList.contains("invisible-sinocupar") === true)
        {
            contestacion.classList.remove("invisible-sinocupar");
            contestacion.classList.add("visible-ocupar");
            contestacion.classList.add("formulario-newsletter-blanco");
            contestacion.classList.add("titulo-formulario-newsletter");

            setTimeout(() => {
                
                contestacion.classList.add("invisible-sinocupar");

                contestacion.classList.remove("visible-ocupar");
                contestacion.classList.remove("formulario-newsletter-blanco");
                contestacion.classList.remove("titulo-formulario-newsletter");

                titulo.classList.remove("invisible-sinocupar");
                titulo.classList.add("visible-ocupar");

                email.classList.remove("invisible-sinocupar");
                email.classList.add("visible-ocupar");

                grupo.classList.remove("invisible-sinocupar");
                grupo.classList.add("visible-ocupar");

                emailInput.value = ""
                

            }, 2000);
            
        }

        if (titulo.classList.contains("invisible-sinocupar") === false)
        {
            titulo.classList.add("invisible-sinocupar");
        }

        if (email.classList.contains("invisible-sinocupar") === false) {
            email.classList.add("invisible-sinocupar");
        }

        if (grupo.classList.contains("invisible-sinocupar") === false) {
            
            grupo.classList.remove("formulario-newsletter-grupo");
            grupo.classList.add("invisible-sinocupar");
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