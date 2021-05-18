const Joi = require('joi');
const fetch = require("node-fetch");
const geolocation = require("./geolocation");
const locations = require("./locations");

const session = require('express-session');

const URI_UPDATE_STATS_BACKEND = `${process.env.URL_BACKEND}:${process.env.PORT_BACKEND}${process.env.ENDPOINT_UPDATE_STATS_BACKEND}`;

exports.getShowDetails = async (req, res, languageBrowser) => {
    return res.redirect("/");
};


exports.postShowDetails = async (req, res, languageBrowser) =>
{
    // console.log(req.useragent);
    const isSchemaValid = await ControlSchema(req.body);

    if (isSchemaValid === false) {
        //TODO: mejorar
        console.error("control schema invalido");
        return res.status(404).send("Not found");
    }

    const location = await geolocation.GetIPTimeZone(req);

    // Bot check
    if (location.agent && location.agent.isBot === true) {
        return res.status(404).send("Not found");
    }

    const locationLanguage = await locations.GenerateLocationBrowser(
        languageBrowser,
        req.headers["accept-language"].split(",")[1].split(";")[0]
    );

    res.render("reservar2", {
        "success": req.body.sucess,
        "locations": locationLanguage,
        "formdata": req.body,
    });


    const body = {
        "token": process.env.TOKEN_FOR_BACKEND_ACCESS,
        "useragent": req.useragent,
        "location": location,
        "id": req.body.success,
        "fase": req.body.fase,
        "conductor_con_experiencia": req.body.conductor_con_experiencia,

    };

    // enviamos al backedn la informacion
    const responseRaw = await fetch(URI_UPDATE_STATS_BACKEND, {
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
        imagen_vehiculo: Joi.string().required(),
        descripcion_vehiculo: Joi.string().required(),
        pax_vehiculo: Joi.number().required(),
        puertas_vehiculo: Joi.number().required(),
        aireacondicionado_vehiculo: Joi.number().required(),
        transmision_vehiculo: Joi.string().required(),
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
        tooltip_suplementogenerico_suplemento_noche_fuera_entrega: Joi.string().required(),
        location_suplementogenerico_suplemento_noche_fuera_entrega: Joi.string().required(),
        tooltip_preciosSuplementoPorTipoChofer_undefined: Joi.string().required(),
        location_preciosSuplementoPorTipoChofer_undefined: Joi.string().required(),
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

    if (validation.error === undefined) {
        isValid = true;
    }

    return isValid;

}

