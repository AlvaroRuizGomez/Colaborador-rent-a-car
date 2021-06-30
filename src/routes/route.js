const express = require('express');
const router = express.Router();

// controladores
const home = require("../controllers/inicio");
const reservar = require("../controllers/reservar");
const details = require("../controllers/details");
const generar = require("../controllers/generar");
const locations = require("../controllers/locations");
const newsletter = require("../controllers/newsletter");


// rutas
router.get("/", async (req, res) => await home.getHome(req, res));
router.post("/", async (req, res) => await home.postHome(req, res));

// router.post("/direct", async (req, res) => await home.postHomeDirect(req, res));
// router.get("/direct", async (req, res) => await home.redirectToHome(req, res));
router.get("/car/*", async (req, res) => await home.postHomeDirect(req, res));

//rutas idiomas
router.get("/alquiler-coches", async (req, res) => await home.getHome(req, res, "es"));
router.get("/autonoleggio", async (req, res) => await home.getHome(req, res, "it"));
router.get("/rentacar", async (req, res) => await home.getHome(req, res, "en"));
router.get("/mietwagen", async (req, res) => await home.getHome(req, res, "de"));


// rutas detalles
router.post("/detalles", async (req, res) => await details.postShowDetails(req, res, "es"));
router.post("/dettagli", async (req, res) => await details.postShowDetails(req, res, "it"));
router.post("/details", async (req, res) => await details.postShowDetails(req, res, "en"));
router.post("/einzelheiten", async (req, res) => await details.postShowDetails(req, res, "de")); 

router.get("/detalles", async (req, res) => await details.getShowDetails(req, res, "es"));
router.get("/dettagli", async (req, res) => await details.getShowDetails(req, res, "it"));
router.get("/details", async (req, res) => await details.getShowDetails(req, res, "en"));
router.get("/einzelheiten", async (req, res) => await details.getShowDetails(req, res, "de"));


router.get("/reservar", async (req, res) => await reservar.getReservar(req, res, "es"));
router.get("/prenotazione", async (req, res) => await reservar.getReservar(req, res, "it"));
router.get("/reserve", async (req, res) => await reservar.getReservar(req, res, "en"));
router.get("/buchen", async (req, res) => await reservar.getReservar(req, res, "de"));

router.post("/reservar", async (req, res) => await reservar.postRealizarReserva(req, res, "es"));
router.post("/prenotazione", async (req, res) => await reservar.postRealizarReserva(req, res, "it"));
router.post("/reserve", async (req, res) => await reservar.postRealizarReserva(req, res, "en" ));
router.post("/buchen", async (req, res) => await reservar.postRealizarReserva(req, res, "de"));


router.post("/newsletter", async (req, res) => await newsletter.ProcesarEmail(req, res));
router.get("/newsletter", async (req, res) => await home.redirectToHome(req, res));


router.get(process.env.ENDPOINT_CACHE, async (req, res) => await generar.GenerarWebCache(req, res));

// router.post(process.env.ENDPOINT_LOCATION, async (req, res) => await locations.GenerarLocations(req, res));
router.get("/location", async (req, res) => await locations.Frontend_TO_Backend(req, res) );



module.exports = router;