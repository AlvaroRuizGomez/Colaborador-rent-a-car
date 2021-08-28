const botonNews = document.getElementById("boton_suscripcion");

botonNews.addEventListener("click", async (evento) =>
{
    
    evento.preventDefault();
    
    const formularioNews = document.getElementById("subscribe-blog");
    const emailInput = document.getElementById("subscribe-field");
    // const contestacion = document.getElementById("contestacion");

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
    
    const titulo = document.getElementById("formulario-newsletter-titulo");
    const email = document.getElementById("formulario-newsletter-email");
    const grupo = document.getElementById("formulario-newsletter-grupo");

    const contestacionBien = document.getElementById("contestacion");
    const contestacionMal = document.getElementById("contestacionmal");

    if (dataResponse.isOk === true)
    {

        if (contestacionBien.classList.contains("invisible-sinocupar") === true)
        {
            contestacionBien.classList.remove("invisible-sinocupar");
            contestacionBien.classList.add("visible-ocupar");
            contestacionBien.classList.add("formulario-newsletter-blanco");
            contestacionBien.classList.add("titulo-formulario-newsletter");

            if (titulo.classList.contains("invisible-sinocupar") === false) {
                titulo.classList.add("invisible-sinocupar");
            }

            if (email.classList.contains("invisible-sinocupar") === false) {
                email.classList.add("invisible-sinocupar");
            }

            if (grupo.classList.contains("invisible-sinocupar") === false) {

                grupo.classList.remove("formulario-newsletter-grupo");
                grupo.classList.add("invisible-sinocupar");
            }

            setTimeout(() => {
                
                contestacionBien.classList.add("invisible-sinocupar");

                contestacionBien.classList.remove("visible-ocupar");
                contestacionBien.classList.remove("formulario-newsletter-blanco");
                contestacionBien.classList.remove("titulo-formulario-newsletter");

                titulo.classList.remove("invisible-sinocupar");
                email.classList.remove("invisible-sinocupar");
                grupo.classList.remove("invisible-sinocupar");

                emailInput.value = ""
                

            }, 2000);
            
        }

        

    }
    else
    {

        if (contestacionMal.classList.contains("invisible-sinocupar") === true) 
        {
            contestacionMal.classList.remove("invisible-sinocupar");
            contestacionMal.classList.add("visible-ocupar");
            contestacionMal.classList.add("formulario-newsletter-blanco");
            contestacionMal.classList.add("titulo-formulario-newsletter");

            if (titulo.classList.contains("invisible-sinocupar") === false) {
                titulo.classList.add("invisible-sinocupar");
            }

            if (email.classList.contains("invisible-sinocupar") === false) {
                email.classList.add("invisible-sinocupar");
            }

            if (grupo.classList.contains("invisible-sinocupar") === false) {

                grupo.classList.remove("formulario-newsletter-grupo");
                grupo.classList.add("invisible-sinocupar");
            }


            setTimeout(() => {

                contestacionMal.classList.add("invisible-sinocupar");

                contestacionMal.classList.remove("visible-ocupar");
                contestacionMal.classList.remove("formulario-newsletter-blanco");
                contestacionMal.classList.remove("titulo-formulario-newsletter");

                titulo.classList.remove("invisible-sinocupar");
                email.classList.remove("invisible-sinocupar");
                grupo.classList.remove("invisible-sinocupar");

                emailInput.value = ""


            }, 2000);

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