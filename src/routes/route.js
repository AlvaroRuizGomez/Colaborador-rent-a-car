const express = require('express');
const router = express.Router();

// controladores
const home = require("../controllers/inicio");
const reservar = require("../controllers/reservar")
const generar = require("../controllers/generar");
const locations = require("../controllers/locations");


// rutas
router.get("/", async (req, res) => await home.getHome(req, res));
router.post("/", async (req, res) => await home.postHome(req, res));

// router.get("/undefined", async (req, res) => await home.getHome(req, res));

//rutas idiomas
router.get("/alquiler-coches", async (req, res) => await home.getHome(req, res, "es"));
router.get("/autonoleggio", async (req, res) => await home.getHome(req, res, "it"));
router.get("/rentacar", async (req, res) => await home.getHome(req, res, "en"));
router.get("/mietwagen", async (req, res) => await home.getHome(req, res, "de"));

router.post("/reservar", async (req, res) => await reservar.postReservar(req, res));
router.get("/reservar", async (req, res) => await reservar.getReservar(req, res));

router.get("/generar", async (req, res) => await generar.generarHTML(req, res));

// router.post(process.env.ENDPOINT_LOCATION, async (req, res) => await locations.GenerarLocations(req, res));
router.get("/location", async (req, res, next) =>
{
    await locations.Frontend_TO_Backend(req, res, next);
});

//quitar
// locations.Frontend_TO_Backend();

module.exports = router;