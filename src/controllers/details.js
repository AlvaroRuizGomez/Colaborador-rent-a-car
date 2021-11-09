const Joi = require('joi');
const fetch = require("node-fetch");
const geolocation = require("./geolocation");
const locations = require("./locations");
const obtenerVars = require("./obtenervariablesentorno");
const logicDiferenciaFechas = require("./logicDiferenciaFechas");
const logicHelper = require("./logicHelper");
const path = require("path");


exports.getShowDetails = async (req, res, languageBrowser) => {
    return res.redirect("/");
};


exports.postShowDetails = async (req, res, languageBrowser) =>
{
    // console.log(req.useragent);
    const isSchemaValid = await ControlSchema(req.body);

    if (isSchemaValid === false) {
        //TODO: mejorar
        console.error("details.js control schema invalido");
        return res.status(404).send("Not found");
    }

    const location = await geolocation.GetIPTimeZone(req);

    // Bot check
    if (location.agent && location.agent.isBot === true) {
        return res.status(404).send("Not found");
    }

    const diferenciaDias = await logicDiferenciaFechas.DiferenciaFechaRecogidaDevolucion(req.body);

    if (req.body.edad_conductor - 0 < 21 || req.body.edad_conductor - 0 > 90 || req.body.anyos_carnet - 0 < 2 || diferenciaDias === false) {
        return res.redirect("/");
    }

    // console.log("accept language=" + req.headers["accept-language"]);

    const locationLanguage = await locations.GenerateLocationBrowser(
        languageBrowser,
        req.headers["accept-language"].toLowerCase()
        // req.headers["accept-language"].split(",")[0].split("-")[0]
    );

    const isAvifSupported = await logicHelper.IsAvifSupported(req.get("Accept"));


    res.render(path.join(__dirname, "../../public/reservar.html"), {
        "isAvifSupported": isAvifSupported,
        "success": req.body.sucess,
        "locations": locationLanguage,
        "formdata": req.body,
    });

    // aqui
    // res.redirect(301, '/article');

    const body = {
        "token": process.env.TOKEN_FOR_BACKEND_ACCESS,
        "useragent": req.useragent,
        "location": location,
        "id": req.body.success,
        "fase": req.body.fase,
        "conductor_con_experiencia": req.body.conductor_con_experiencia,

    };

    // enviamos al backedn la informacion
    const responseRaw = await fetch(obtenerVars.URI_UPDATE_STATS_BACKEND, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(body)
    });

    const dataResponse = await responseRaw.json();

    if (dataResponse === undefined) {

    }
    
    if (dataResponse.isOk === false) {
        return res.status(404).send("Not found");
    }

    // TODO: seguridad comprobar que proviene del backend
    if (dataResponse.token !== "") {

    }
    
};



const ControlSchema = async (body) => {

    const schema = Joi.object({
        success: Joi.string().required(),
        fase: Joi.number().required(),
        idioma: Joi.string().required(),
        conductor_con_experiencia: Joi.string().required(),
        fechaRecogida: Joi.string().required(),
        horaRecogida: Joi.string().required(),
        fechaDevolucion: Joi.string().required(),
        horaDevolucion: Joi.string().required(),
        imagen_vehiculo: Joi.string().required(),
        descripcion_vehiculo: Joi.string().required(),
        pax_vehiculo: Joi.number().required(),
        puertas_vehiculo: Joi.number().required(),
        aireacondicionado_vehiculo: Joi.number().required(),
        transmision_vehiculo: Joi.string().required(),
        tooltip_cambio: Joi.string().required(),
        alt_cambio: Joi.string().required(),
        tooltip_vehiculo_tiene: Joi.string().required(),
        tooltip_kilometraje: Joi.string().required(),
        alt_kilometraje: Joi.string().required(),
        kilometraje: Joi.string().required(),
        tooltip_cancelaciones: Joi.string().required(),
        alt_cancelaciones: Joi.string().required(),
        cancelaciones: Joi.string().required(),
        tooltip_modificaciones: Joi.string().required(),
        alt_modificacion: Joi.string().required(),
        modificaciones: Joi.string().required(),
        porcentaje: Joi.string().required(),
        tooltip_suplementogenerico_suplemento_noche_fuera_entrega: Joi.string().required(),
        location_suplementogenerico_suplemento_noche_fuera_entrega: Joi.string().required(),
        tooltip_suplementogenerico_sin_suplemento_tiempo_fuera_entrega: Joi.string(),
        location_suplementogenerico_sin_suplemento_tiempo_fuera_entrega: Joi.string(),
        suplementoportipoChofer: Joi.number().required(),
        preciototaldias: Joi.number().required(),
        tooltip_alt_precio_total: Joi.string().required(),
        diasEntreRecogidaDevolucion: Joi.number().required(),
        location_dias: Joi.string().required(),
        vehiculo: Joi.string().required()
        
    });
    
    const options = {
        abortEarly: false,
        allowUnknown: false,
        stripUnknown: false
    };
    const validation = schema.validate(body, options);
    let isValid = false;
    console.log("validation=" + validation.error);
    if (validation.error === undefined) {
        isValid = true;
    }

    return isValid;

}

