const Joi = require('joi');
const fetch = require("node-fetch");
const geolocation = require("./geolocation");


// const URI_UPDATE_STATS_BACKEND = `${process.env.URL_BACKEND}:${process.env.PORT_BACKEND}${process.env.ENDPOINT_UPDATE_STATS_BACKEND}`;
const URI_REALIZAR_RESERVA_BACKEND = `${process.env.URL_BACKEND}:${process.env.PORT_BACKEND}${process.env.ENDPOINT_REALIZAR_RESERVA_BACKEND}`;

exports.getReservar = async (req, res, languageBrowser) => {
    return res.redirect("/");

};


exports.postRealizarReserva = async (req, res, language ) => 
{

    // console.log(req.useragent);
    const isSchemaValid = await ControlSchema(req.body);

    if (isSchemaValid === false) {
        //TODO: mejorar
        console.error("reservar.js control schema invalido");
        return res.status(404).send("Not found");
    }

    const location = await geolocation.GetIPTimeZone(req);
    
    // Bot check
    if (location.agent && location.agent.isBot === true) {
        return res.status(404).send("Not found");
    }

    const body = { 
        "token": process.env.TOKEN_FOR_BACKEND_ACCESS, 
        "useragent": req.useragent,
        "location": location,
        ...req.body
    };

    //enviamos al backedn la informacion
    const responseRaw = await fetch(URI_REALIZAR_RESERVA_BACKEND, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(body)
    });
    
    const dataResponse = await responseRaw.json();

    if (dataResponse === undefined)
    {

    }

    // TODO: seguridad comprobar que proviene del backend
    if (dataResponse.token !== "")
    {
        return res.status(404).send("Not found");
    }

    const locationLanguage = await locations.GenerateLocationBrowser(req.body.idioma);

    if (dataResponse.isOk === false)
    {
        return res.render("inicio",
        {
            "success": req.body.success,
            "errorFormulario": dataResponse.errorFormulario,
            "locations": locationLanguage
        });
    }

    res.render("reservacompletada", {
        "success": req.body.success,
        "errorFormulario": dataResponse.errorFormulario,
        "locations": locationLanguage
    });    

};


const ControlSchema = async (body) => 
{

    const schema = Joi.object({
        
        descripcion_vehiculo: Joi.string().required(),
        fechaRecogida: Joi.string().required(),
        horaRecogida: Joi.string().required(),
        fechaDevolucion: Joi.string().required(),
        horaDevolucion: Joi.string().required(),
        dias: Joi.number().required(),
        alquiler: Joi.number().required(),
        total_suplmento_tipo_conductor: Joi.number().required(),
        pagoRecogida: Joi.string().required(),
        pago_online: Joi.number().required(),
        titulo: Joi.string().required(),
        child_seat: Joi.number().required(),
        booster_seat: Joi.number().required(),
        conductor_con_experiencia: Joi.string().required(),
        email: Joi.string().required(),
        nombre: Joi.string().required(),
        apellidos: Joi.string().required(),
        telefono: Joi.string().required(),
        idioma: Joi.string().required(),

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