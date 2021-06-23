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


// idiomas
const boton = document.getElementById("boton-idioma-seleccionado");

boton.addEventListener("click", async () => {

    const contenido = document.getElementById("idioma-contenido");
    if (contenido.classList.contains("idioma-contenido-show") === true) {

        contenido.classList.remove("idioma-contenido-show");
    }
    else {
        contenido.classList.add("idioma-contenido-show");
    }

});


// --- inicio colapse 
// <!----------------------------- Informacion Collapse------------------------------->
    
const coll = document.getElementsByClassName("collapsable");
for (let i = 0; i < coll.length; i++)
{
    coll[i].addEventListener("click", async (evento) =>
    {

        const flecha = coll[i].children[0].lastElementChild;
        if (flecha.classList.contains("arrow_down") === false)
        {
            flecha.classList.add("arrow_down");

        }
        else
        {
            flecha.classList.remove("arrow_down");
        }



    });

}

//antiguo codigo
        // const coll = document.getElementsByClassName("collapsable");
        // var arr = document.querySelector('.arrow');
        // var i;

        // arr.addEventListener
        // ('click', function(event)
        // {
        //     event.target.classList.toggle('down');
        // for (i = 0; i < coll.length; i++)
        // {
        //     coll[i].addEventListener("click", function () {
        //         this.classList.toggle("active");
        //         var content = this.nextElementSibling;
        //         if (content.style.display === "block") {
        //             content.style.display = "none";
        //         } else {
        //             content.style.display = "block";
        //         }
        //     })
        // }
        //     }
        // );
    



// --- fin colapse

window.onclick = async (evento) => {
    if (evento.target.matches(".boton-idioma-seleccionado") === false &&
        evento.target.matches(".bandera") === false
    ) {
        const listadoIdiomas = document.getElementById("idioma-contenido");
        if (listadoIdiomas.classList.contains("idioma-contenido-show")) {
            listadoIdiomas.classList.remove("idioma-contenido-show");
        }
    }
}

//---- fin idiomas


