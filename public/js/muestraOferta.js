const botonCondiciones = document.getElementsByClassName("boton_modal");
const botonesCerrar = document.getElementsByClassName("boton-cerrar-modal");
const overlay = document.getElementsByClassName("overlay-transparente");



for (let i = 0; i < botonCondiciones.length; i++)
{
    
    overlay[i].addEventListener("click", async (evento) =>
    {

        const divOverlay = evento.target;

        if (divOverlay.classList[1] === "modal-visible") {
            divOverlay.classList.remove("modal-visible");
            divOverlay.classList.add("modal-invisible");
            document.body.style.overflow = null;

        }

    });

    botonesCerrar[i].addEventListener("click", async (evento) =>
    {
        let divOverlay = evento.target.parentElement.parentElement.parentElement;

        if (divOverlay.classList[1] !== "modal-visible")
        {
            divOverlay = evento.target.parentElement.parentElement.parentElement.parentElement;
        }

        if (divOverlay.classList[1] === "modal-visible")
        {
            divOverlay.classList.remove("modal-visible");
            divOverlay.classList.add("modal-invisible");
            document.body.style.overflow = null;

        }
        else
        {
            

        }


    });

    botonCondiciones[i].addEventListener("click", async (evento)=> 
    {
        
        // const divOverlay = evento.target.parentElement.nextElementSibling;
        const divOverlay = evento.target.parentElement.parentElement.parentElement.lastElementChild.firstElementChild;

        if (divOverlay.classList[1] !== "modal-invisible")
        {
            divOverlay = evento.target.parentElement.parentElement.parentElement.lastElementChild.firstElementChild;
        }

        if (divOverlay.classList[1] === "modal-invisible")
        {
            document.body.style.overflow = "hidden";
            document.querySelector("html").scrollTop = window.scrollY;
            
            divOverlay.classList.remove("modal-invisible");
            divOverlay.classList.add("modal-visible");
        }
    });
}
