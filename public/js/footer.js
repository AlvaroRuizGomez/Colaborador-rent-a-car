const botonesInformacionInteres = document.getElementsByClassName("interes-link-footer");
const botonesCerrarModal = document.getElementsByClassName("modal-heigh-75");
const overlayFooter = document.getElementsByClassName("overlay-transparente");

for (let i = 0; i < botonesInformacionInteres.length; i++) {
    botonesInformacionInteres[i].addEventListener("click", (evento) => {

        let divOverlay = document.getElementById("overlay-footer-interes-link");

        if (divOverlay.classList.contains("modal-invisible") === true) {

            document.body.style.overflow = "hidden";
            document.querySelector("html").scrollTop = window.scrollY;

            divOverlay.classList.remove("modal-invisible");
            divOverlay.classList.add("modal-visible");

        }



    });

    botonesCerrarModal[i].addEventListener("click", async (evento) => {
        // let divOverlay = document.getElementById("");
        let divOverlay = document.getElementById("overlay-footer-interes-link");

        // if (divOverlay.classList[1] !== "modal-visible") {
        //     divOverlay = evento.target.parentElement.parentElement.parentElement.parentElement;
        // }

        if (divOverlay.classList[1] === "modal-visible") {
            divOverlay.classList.remove("modal-visible");
            divOverlay.classList.add("modal-invisible");
            document.body.style.overflow = null;

        }

    });

    overlayFooter[i].addEventListener("click", async (evento) => 
    {

        const divOverlay = document.getElementById("overlay-footer-interes-link");

        if (divOverlay.classList.contains("modal-visible") === true) {
            divOverlay.classList.remove("modal-visible");
            divOverlay.classList.add("modal-invisible");
            document.body.style.overflow = null;

        }
        else
        {
            divOverlay.classList.remove("modal-invisible");
            divOverlay.classList.add("modal-invisible");
            document.body.style.overflow = null;
        }

    });

}

