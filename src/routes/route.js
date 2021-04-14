const express = require('express');
const router = express.Router();

// controladores
const home = require("../controllers/inicio");
const generar = require("../controllers/generar");

// rutas
exports.getHome = async (res, req) =>
{
    return res.render("inicio");

};

// router.get("/", async (req, res) => await home.getHome(req, res));
router.post("/", async (req, res) => await home.postHome(req, res));

router.get("/generar", async (req, res) => await generar.generarHTML());


module.exports = router;