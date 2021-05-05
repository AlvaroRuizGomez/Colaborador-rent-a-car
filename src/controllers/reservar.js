const Joi = require('joi');
const fetch = require("node-fetch");
const geolocation = require("./geolocation");

const session = require('express-session');

const URI_BACKEND = `${process.env.URL_BACKEND}:${process.env.PORT_BACKEND}/reservar`;

exports.getReservar = async (req, res) => {
    return res.redirect("/");

};


exports.postReservar = async (req, res ) => 
{

    // console.log(req.useragent);
    const isSchemaValid = await ControlSchema(req.body);

    if (isSchemaValid === false) {
        //TODO: mejorar
        res.status(404).send("Not found");
        console.error("schema invalido");
        return;
    }

    const location = await geolocation.GetIPTimeZone(req);
    
    // Bot check
    if (location.agent && location.agent.isBot === true) {
        return res.send({});
    }

    const body = { 
        "token": process.env.TOKEN_FOR_BACKEND_ACCESS, 
        "useragent": req.useragent,
        "location": location,
        ...req.body
    };

    //enviamos al backedn la informacion
    const responseRaw = await fetch(URI_BACKEND, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(body)
    });

    const dataResponse = await responseRaw.json();

    // TODO: seguridad comprobar que proviene del backend
    if (dataResponse.token !== "") {

    }

    if (dataResponse.isOk === false)
    {
        if (dataResponse.errorFormulario !== "") {
            return res.render("inicio");
        }

    }


};


const ControlSchema = async (body) => 
{

    const schema = Joi.object({
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