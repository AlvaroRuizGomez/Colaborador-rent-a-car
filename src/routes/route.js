const express = require('express');
const router = express.Router();

// controladores
const home = require("../controllers/inicio");
const reservar = require("../controllers/reservar");
const details = require("../controllers/details");
const generar = require("../controllers/generar");
const locations = require("../controllers/locations");
const newsletter = require("../controllers/newsletter");
const challange = require("../controllers/challange");
const live = require("../controllers/live");

const templates = require("../controllers/getTemplate");


// rutas

router.get("/cookie_policy", async (req, res) => await home.GetCookiePolicy(req, res));
router.get("/grcsp616afffa_f826_4461_85c3_941ee6973aff_0_0_3sct30c0d50e_2191_4857_9e5d_aed703100472", async (req, res) => await home.SecurityReportGet(req, res))
router.post("/grcsp616afffa_f826_4461_85c3_941ee6973aff_0_0_3sct30c0d50e_2191_4857_9e5d_aed703100472", async (req, res) => await home.SecurityReport(req, res))

router.get("/", async (req, res) => await home.getHome(req, res));
router.post("/busqueda", async (req, res) => await home.postHome(req, res));
router.get("/busqueda", async (req, res) => await home.redirectToHome(req, res));

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

router.get("/correcto", async (req, res) => await reservar.GetCorrecto(req, res) );
router.get("/nocorrecto", async (req, res) => await reservar.GetNoCorrecto(req, res));

// router.post("/peticionpago", async (req, res) => await reservar.PeticionPago(req, res));
router.post(process.env.ENDPOINT_NOTIFICACION_PAYGATEWAY, async (req, res) => await reservar.NotificacionPago(req, res));

router.post("/newsletter", async (req, res) => await newsletter.ProcesarEmail(req, res));
router.get("/newsletter", async (req, res) => await home.redirectToHome(req, res));


// router.get(process.env.ENDPOINT_CACHE, async (req, res) => await generar.GenerarWebCache(req, res));

// router.post(process.env.ENDPOINT_LOCATION, async (req, res) => await locations.GenerarLocations(req, res));
router.post("/location", async (req, res) => await locations.Frontend_TO_Backend(req, res) );

router.post(process.env.ENDPOINT_TEMPLATE_FRONTEND, async (req, res) => await templates.GetTemplate(req, res));
router.post(process.env.ENDPOINT_DETALLE_TEMPLATE_FRONTEND, async (req, res) => await templates.DetalleTemplate(req, res));
router.get(`/islive_0_QJFs_a_IiW_mFtZS2_f_A_BQ_NTib_Y3O6Ik_D0WNH9I`, async (req, res) => await live.IsLive(req, res));

router.get("/robots.txt" ,async (req, res) => await home.GetRobots(req, res));

router.get("/?XDEBUG_SESSION_START=phpstorm", async (req, res) => { res.status(404).send(""); })

router.get("/dcd4d28a1af026de6d64f69376648d30.txt", async (req, res) => await challange.URIDetectify(req, res));


router.get("/.well-known/acme-challenge/qsYVY7rPFlj946jCH427V9bZRQyB6mBHJ0YXU2WUhyc", async (req, res) => await challange.URIChallangeFirstPart(req, res));
router.get("/.well-known/acme-challenge/vIxo9rFF0Gc0cOkv5HoVTXv0PMarxGCfjo1x6v_N8Fs", async (req, res) => await challange.URIChallangeSecondPart(req, res));
// router.get("/.well-known/acme-challenge/*", async (req, res) => await challange.URIChallange(req, res));

// /?__debugger__=yes&cmd=resource&f=style.css
// /?x=&x[]=
module.exports = router;