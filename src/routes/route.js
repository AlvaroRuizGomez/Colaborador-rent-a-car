const express = require('express');
const router = express.Router();

// controladores
const home = require("../controllers/inicio");
const reservar = require("../controllers/reservar")
const generar = require("../controllers/generar");

// rutas
// exports.getHome = async (res, req) =>
// {
//     return res.render("inicio");

// };

router.get("/", async (req, res) => await home.getHome(req, res));
router.post("/", async (req, res) => await home.postHome(req, res));

router.post("/reservar", async (req, res) => await reservar.postReservar(req, res));
router.get("/reservar", async (req, res) => await reservar.getReservar(req, res));

router.get("/generar", async (req, res) => await generar.generarHTML());


module.exports = router;