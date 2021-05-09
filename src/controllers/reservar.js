const Joi = require('joi');
const fetch = require("node-fetch");
const geolocation = require("./geolocation");

const session = require('express-session');

const URI_RESERVAR_BACKEND = `${process.env.URL_BACKEND_BASE}:${process.env.PORT_BACKEND}${process.env.ENDPOINT_RESERVAR_BACKEND}`;

exports.getReservar = async (req, res) => {
    return res.redirect("/");

};


exports.postReservar = async (req, res ) => 
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

    const body = { 
        "token": process.env.TOKEN_FOR_BACKEND_ACCESS, 
        "useragent": req.useragent,
        "location": location,
        ...req.body
    };

    //enviamos al backedn la informacion
    const responseRaw = await fetch(URI_RESERVAR_BACKEND, {
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
    if (dataResponse.token !== "") {

    }

    if (dataResponse.isOk === false)
    {
        return res.status(404).send("Not found");
    }


    let data = {"test": "test"};
    if (dataResponse.data.length <= 0)
    {
        data = {};
    }
    else
    {
        data = {
            "data": dataResponse.data,
            "formdata": req.body,
            "success": req.body.success,
        };
    }

    res.render("reservas", data );    

};


const ControlSchema = async (body) => 
{

    const schema = Joi.object({
        "conductor_con_experiencia": Joi.string().required(),
        "fase": Joi.number().required(),
        success: Joi.string().required(),
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